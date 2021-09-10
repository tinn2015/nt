'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')

const router = new Router()
router.prefix('/api')

// router.get('/test', controllers.test.test)
router.get('/test', async (ctx) => {
  // ctx.request.url = '/index.html'
  // if (ctx.is('text/html')) {
  //   ctx.request.url = '../website/index.html'
  // }
  ctx.response.body = 'dasdas'
})

router.post('/login', controllers.user.login)

module.exports = router
