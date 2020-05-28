/* Controller Login */

const Redis = require('koa-redis')
const jsonWebToken = require('jsonwebtoken')
const nodeMailer = require('nodemailer')

const config = require('../config')
const userService = require('../services/user')
const { pattern, checkRegex } = require('../lib/regex')
const { CodeError, ForbiddenError, InvalidQueryError, NotFindError } = require('../lib/error')

// redis 实例
const Store = new Redis().client

const login = {
  // 邮箱获取验证码(POST)
  async getcode (ctx, next) {
    // ctx.request.body
    const { email } = ctx.query
    
    if (!checkRegex(pattern.email, email)) {
      ctx.body = { msg: '邮箱格式错误' }
      next ()
      return false
    }
    
    const redisExpire = await Store.hget(config.Redis.hash, 'expire')

    if (redisExpire && (+new Date()) - redisExpire < 0) {
      ctx.body = {
        msg: '获取验证码过于频繁,请稍后 60s 再来'
      }
      next()
      return false
    }

    // 定义发送者信息
    const transporter = nodeMailer.createTransport({
      host: config.SMTP.host,
      service: 'qq',
      auth: {
        user: config.SMTP.user,
        pass: config.SMTP.pass
      }
    })

    // 定义接收方
    const receiver = {
      code: config.VCode.code,
      expire: config.VCode.expire,
      email: email,
      user: email + ' 用户'
    }

    // 配置 nodeMailer 选项
    const mailerOptions = {
      from: `《认证邮件》 <${config.SMTP.user}>`,
      to: receiver.email,
      subject: `${config.name} 注册码`,
      html: `尊敬的 ${receiver.user}, 您正在${config.name}注册信息, 验证码为:${receiver.code}; 打死也不要告诉其它人...`
    }

    // 发送邮件
    await transporter.sendMail(mailerOptions, (error, info) => {
      if (error) {
        sendState = false
        return console.log('nodeMailer send faild', error)
      }
      else {
        sendState = true
        Store.hmset(config.Redis.hash, 'code', receiver.code, 'expire', receiver.expire, 'email', receiver.email)
      }
    })

    ctx.body = {
      code: 200,
      msg: '验证码已发送,可能因网络会有所延迟'
    }
    next()
  },

  // 登录
  async login (ctx, next) {
    // ctx.request.body
    const { username, password } = ctx.query /* password 必须 MD5 加密过 */

    if (!username || !password) { throw new InvalidQueryError() }

    const queryRes = await userService.isExistsUser({
      username: username,
      password: password
    })

    if (!queryRes) {
      ctx.body = {
        msg: '用户不存在'
      }
    } else {
      ctx.body = {
        code: 200,
        msg: 'OK',
        data: {
          token: jsonWebToken.sign({
            data: queryRes._id,
            exp: config.Token.expire
          }, config.secret)
        }
      }
    }
    next()
  }
}

module.exports = login
