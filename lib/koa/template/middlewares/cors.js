'use strict'

const corsHandler = {
    origin: function (ctx) {
        if (ctx.url === '/test') {
            // 这里可以配置不运行跨域的接口地址
            return false;
        }
        // return '*';
        return "http://localhost:3000"
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 60 * 10, //秒
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}


module.exports = {
    corsHandler
}
