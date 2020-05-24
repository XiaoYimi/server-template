/* Log output */

const fs = require('fs')
const path = require('path')
const log4js = require('log4js')

const config = require('../config')

/* Get Logs File */
const logsDir = path.parse(config.logPath).dir

/* If no exists logsDir, will auto make dir. */
if (!fs.existsSync(logsDir)) { fs.mkdirSync(logsDir) }

/* log4js configuration. */ 
log4js.configure({
  appenders: {
    console: { type: 'console' },
    dateFile: { type: 'dateFile', filename: config.logPath, pattern: '-yyyy-MM-dd' }
  },
  categories: {
    default: {
      appenders: ['console', 'dateFile'],
      level: 'info'
    }
  }
})

/* Log Object */
const logger = log4js.getLogger('[Default]')

const loggerMiddleware = async (ctx, next) => {
  const stime = new Date()
  await next()
  const ms = new Date() - stime
  const remoteAddress = ctx.headers['x-forwarded-for'] || ctx.ip || ctx.ips || (ctx.socket && (ctx.socket.remoteAddress || (ctx.socket.socket && ctx.socket.socket.remoteAddress)))
  let logText = ` ${remoteAddress} ${ctx.method} ${ctx.url} ${ctx.status} ${ms}ms 请求参数: ${JSON.stringify(ctx.request.body)} 响应结果: ${JSON.stringify(ctx.body)}`
  // 写入项目日志并打印日志
  logger.info(logText)
}

module.exports = {
  logger,
  loggerMiddleware
}
