/* Global configuration */

const path = require('path')

module.exports = {
  port: 3010, /* 项目访问的端口 */
  secret: '<secret>', // token 反向解密(隐私)
  publicDir: path.resolve(__dirname, './public'), /* 静态资源缓存 */
  logPath: path.resolve(__dirname, './logs/app.log'), /* 项目日志输出路径 */

  // mongoDB 数据库配置
  mongoDB: {
    host: '127.0.0.1',
    port: 27017,
    database: 'webserver',
    username: 'xiaoyimi',
    password: 'root'
  },

  // Redis 数据库配置
  Redis: {
    host: '217.0.0.1',
    port: 6379
  },

  // SMTP 服务配置
  SMTP: {
    host: 'smtp.qq.com', /* 不得更改 */
    user: '2590856083@qq.com', /* 发送发邮箱 */
    pass: '<pass_code>' /* 邮箱(发送)授权口令 */
  },

  // 验证码
  VCode: {
    get code () {
      return () => {
        return Math.random().toString().slice(2,6).toUpperCase() /* 随机验证码生成 */
      }
    },
    get expire () {
      return () => {
        return (+new Date()) + 60 * 1000 /* 验证码有效期 60 s */
      }
    } 
  },

  /* Token */
  Token: {
    hour: 6, /* 有效时长 */
    expire () { { return (+new Date()) + (1000 * 60 * 60 * this.hour) } }
  }
}
