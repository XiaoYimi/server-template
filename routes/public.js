/* API Interface without checking Token. */

const Router = require('koa-router')
const Controllers = require('../controllers')

const router = new Router({ prefix: '/api' })

router.get('/login', Controllers.login.login)

router.get('/getcode', Controllers.login.getcode)

module.exports = router
