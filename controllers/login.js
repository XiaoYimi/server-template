/* Controller Login */

const jsonWebToken = require('jsonwebtoken')

const config = require('../config')
const userService = require('../services/user')

const { CodeError, ForbiddenError, InvalidQueryError, NotFindError } = require('../lib/error')

const login = {
  async login (ctx, next) {
    const { username, password } = ctx.query /* password 必须 MD5 加密过 */

    if (!username || !password) { throw new InvalidQueryError() }

    const queryRes = await userService.login({
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
            exp: config.Token.expire()
          }, config.secret)
        }
      }
    }

    next()
  }
}

module.exports = login
