'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')
const userServices = require('../services').user
const { InvalidQueryError } = require('../lib/error')
const user = {}
user.login = async (ctx, next) => {
    // console.log(userServices)
    const {username, password} = ctx.request.body
    console.log('user', username, password)
    if (!username || !password) {
        throw new InvalidQueryError()
    }
    const person = await userServices.login({
        username: username,
        password: password
    })
    console.log('person', person)
    if (!person) {
        // let register =  await userServices.register({
        //     username,
        //     password
        // })
        // if (register.type === 'success') {
        //     ctx.result = {
        //         username,
        //         id: register.data._id
        //     }
        //     ctx.jwt = jwt.sign({
        //         data: register.data._id,
        //         // 设置 token 过期时间
        //         exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
        //     }, config.secret)
        //     ctx.msg = '用户注册成功'
        //     ctx.code = 1
        // }
        ctx.msg = '账号： user, 密码： 112233'
        ctx.code = 2
        ctx.result = {
            username: 'user',
            password: '112233'
        }
    } else {
        ctx.jwt = jwt.sign({
            data: user._id,
            // 设置 token 过期时间
            exp: Math.floor(Date.now() / 1000) + (60 * 60) * 12, // 60 seconds * 60 minutes  * 12 = 12 hour
        }, config.secret)
        ctx.result = {
            username
        }
        ctx.msg = 'login success'
    }
    return next()
}

user.logout = (ctx, next) => {
    console.log(ctx.jwtData)
    ctx.result={
        username: ''
    }
    ctx.msg = '退出成功'
    return next()
}

module.exports = user

