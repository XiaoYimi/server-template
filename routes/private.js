/* API Interface to check Token. */

const Router = require('koa-router')
const JWTMiddleware = require('../middlewares/jwt')
const Controllers = require('../controllers')

const router = new Router({ prefix: '/api' })
router.use(JWTMiddleware)

router.get('/testprivate', Controllers.test.testprivate)

module.exports = router
