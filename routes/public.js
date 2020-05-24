/* API Interface without checking Token. */

const Router = require('koa-router')
const Controllers = require('../controllers')

const router = new Router({ prefix: '/api' })

router.get('/testpublic', Controllers.test.testpublic)

module.exports = router
