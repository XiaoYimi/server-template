/* Check token */
const koaJwt = require('koa-jwt')
const jsonWebToken = require('jsonwebtoken')
const config = require('../config')

const jwtMiddleware = koaJwt({ secret: config.secret })

/* Decrypt token data, and save to ctx.jswData */
module.exports = (ctx, next) => {
  try {
    if (typeof ctx.request.headers.authorization === 'string') {
      const token = ctx.request.headers.authorization.slice(7)
      ctx.jwtData = jsonWebToken.verify(token, config.secret)
    } else {
      throw { code: 401, message: 'No Authorization' }
    }
  } catch (err) {
    throw { code: 401, message: err.message }
  }
  next()
}
