'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')
const jwtMiddleware = require('../middlewares/jwt')

const router = new Router()
router.prefix('/api/private')
router.use(jwtMiddleware)

router.post('/logout', controllers.user.logout)
router.post('/uploadFile', controllers.file.upload)
router.post('/getFileList', controllers.file.getList)
router.post('/delete', controllers.file.deleteFile)
router.post('/cookie', controllers.session.cookie)

module.exports = router
