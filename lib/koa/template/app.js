'use strict'
const path = require('path')
const Koa = require('koa')
// 内置Request Body的解析器
const bodyParser = require('koa-bodyparser')()
// 文件上传处理
const koaBody = require('koa-body')
// 静态资源中间件
const staticCache = require('koa-static-cache')
const cors = require('koa2-cors')
const helmet = require("koa-helmet")
const {historyApiFallback} = require('koa2-connect-history-api-fallback')
const compress = require('koa-compress')

const config = require('./config')
const publicRouter = require('./routes/public.js')
const privateRouter = require('./routes/private')
const { loggerMiddleware } = require('./middlewares/logger')
const { errorHandler, responseHandler } = require('./middlewares/response')
const { corsHandler } = require('./middlewares/cors')

const app = new Koa()

// Logger
// 必须放在第一个中间件，才能保证所以的请求及操作会先经过logger进行记录再到下一个中间件。
app.use(loggerMiddleware)

// 这个插件会将所有的资源都压缩  默认为br
// 可以通过ctx.compress = false 阻止压缩
app.use(compress({
  threshold: 1024,
  gzip: {
    flush: require('zlib').constants.Z_SYNC_FLUSH  // 开启gzip
  },
  // br: false  // 是否进行br压缩
}))

// Error Handler
app.use(errorHandler)

//文件上传, body处理
app.use(koaBody({
  multipart: true,
  formidable: {
      maxFileSize: 200*1024*1024,    // 设置上传文件大小最大限制，默认2M
      //设置文件的默认保存目录，不设置则保存在系统临时目录下  os
      // uploadDir: path.resolve(__dirname, './static'),
      // keepExtensions: true
  }
}))

// Global Middlewares
// app.use(bodyParser)

//spa 应用返回index.html 页面路由由web router 控制
app.use(historyApiFallback({whiteList: ['/api']}))

app.use(staticCache(config.publicDir))
app.use(staticCache(config.www))

// Cors
app.use(cors(corsHandler))

// Helmet
app.use(helmet())

// Routes
app.use(publicRouter.routes(), publicRouter.allowedMethods())
app.use(privateRouter.routes(), privateRouter.allowedMethods())

// Response
app.use(responseHandler)

module.exports = app

