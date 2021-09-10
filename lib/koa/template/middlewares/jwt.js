'use strict'

const koaJwt = require('koa-jwt')
const jwt = require('jsonwebtoken')
const config = require('../config')
const jwtMiddleware = koaJwt({ secret: config.secret })

module.exports = async  function (ctx, next) {
  // 将 token 中的数据解密后存到 ctx 中
  try { 
    console.log('ctx.request.headers',ctx.request, ctx.request.headers['Authorization'])
    if (typeof ctx.request.header['authorization'] === 'string') {
      const token = ctx.request.headers.authorization
      ctx.jwtData = jwt.verify(token, config.secret)
      console.log('jwt token', token, ctx.jwtData)
    } else {
      throw {code: 401, message: 'no authorization'}
    }
  } catch (err) {
    throw {code: 401, message: err.message}
  }
  await next()
}

