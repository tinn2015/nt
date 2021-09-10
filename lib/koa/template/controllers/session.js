const session = {}

session.cookie = (ctx, next) => {
  console.log('cookies', ctx.cookies)
  ctx.cookies.set('sid', '11234455', {
    // domain: 'localhost',
    // path: '/cookie',
    // maxAge: 60 * 60 * 1000,
    // expires: new Date() + 6 * 3600 * 1000
  })
  ctx.result = {}
  next()
}

module.exports = session