'use strict'

const { logger } = require('./logger')

// 这个middleware用于将ctx.result中的内容最终回传给客户端
const responseHandler = (ctx) => {
  if (ctx.result !== undefined) {
    ctx.type = 'json'
    ctx.jwt && ctx.set('WWW-Authenticate', ctx.jwt)
    // ctx.compress && ctx.set('Content-Encoding', 'gzip')
    ctx.body = {
      code: ctx.code || 200,
      msg: ctx.msg || '',
      data: ctx.result
    }
  }
  console.log('reponse body', ctx.body)
}

// 这个middleware处理在其它middleware中出现的异常,我们在next()后面进行异常捕获，出现异常直接进入这个中间件进行处理
const errorHandler = (ctx, next) => {
  return next().catch(err => {
    if (err.code == null) {
      logger.error(err.stack)
    }
    ctx.body = {
      code: err.code || -1,
      data: null,
      msg: err.message.trim()
    }
    // 保证返回状态是 200
    ctx.status = 200 
    return Promise.resolve()
  })
}

module.exports = {
  responseHandler,
  errorHandler
}

