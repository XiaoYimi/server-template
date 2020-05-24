/* return data in specified format */
const { logger } = require('./logger')

/* Only return field code, msg, data */
const responseHandler = ctx => {
  if (ctx.body !== undefined) {
    ctx.type = 'json'
    ctx.body = {
      code: ctx.body.code || ctx.status,
      msg: ctx.body.msg || '',
      data: ctx.body.data || null
    }
  }
}

/* If other middleware error, will exec this block code */
const errorHandler = (ctx, next) => {
  return next().catch(err => {
    console.log('errorHandler', err.code)
    if (err.code == null) { logger.error(err.stack) }
    ctx.body = {
      code: err.code || -1,
      msg: err.message.trim(),
      data: null
    }
    ctx.status = 200
    return Promise.resolve()
  })
}

module.exports = {
  responseHandler,
  errorHandler
}
