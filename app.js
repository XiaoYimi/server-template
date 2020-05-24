/* Project Entry File */

/* Require Dependencies */
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const koaHelmet = require('koa-helmet')
const koaStaticCache = require('koa-static-cache')
const koa2Cors = require('koa2-cors') 

/* Require Local Sources */
const config = require('./config')

/* Require API Router */
const publicRouter = require('./routes/public')
const privateRouter = require('./routes/private')

/* Require Custom Middlewares */
const { loggerMiddleware } = require('./middlewares/logger')
const { errorHandler, responseHandler } = require('./middlewares/response')
const { corsHandler } = require('./middlewares/cors')

/* Entry Start */
const app = new Koa()

/* Use Middlewares */

/* it must be first middleware, able to output it's all log after request and response. */
app.use(loggerMiddleware)

/* if middleware error, will output error */
app.use(errorHandler)

/* Deal data format */
app.use(bodyParser())

/* save static source to config.publicDir(./public) */
app.use(koaStaticCache(config.publicDir))

/* Defend against hack attack */
app.use(koaHelmet())

/* Deal CORS Request */
app.use(koa2Cors(corsHandler))

/* Declare API Router */
app.use(publicRouter.routes(), publicRouter.allowedMethods())
app.use(privateRouter.routes(), privateRouter.allowedMethods())

/* It must be last middleware, able to return data in specified format  */
app.use(responseHandler)

module.exports = app
