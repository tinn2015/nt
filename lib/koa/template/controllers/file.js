const { resolveSoa } = require('dns')
const fs = require('fs')
const path = require('path')
const config = require('../config/index')
const {readdir, getFileStat} = require('../lib/fsUtils')
const file = {}

const origin = 'http://' + config.host + ':' +config.port

file.upload = (ctx, next) => {
  console.log('files', ctx.request.files)

  let file = ctx.request.files.file
  let fileName = file.name
  let fileSavePath = path.resolve(__dirname, '../static/' + fileName)
  const reader = fs.createReadStream(file.path)
  const write = fs.createWriteStream(fileSavePath)
  reader.pipe(write)
  ctx.msg = '上传成功'
  ctx.result= {
    path: 'localhost:3000/' + fileName
  }
  next()
}

file.getList = async (ctx, next) => {
  let fileDir =  path.resolve(__dirname, '../static/')
  let list = []
  let files = await readdir(fileDir)
  let promises = files.map(fileName => {
    return new Promise(async (resolve) => {
      const file = await getFileStat(fileDir + '/' +  fileName)
      console.log('file stat',file)
      list.push({
        name: fileName,
        size: file.size,
        url: origin + '/' + fileName,
        path: fileDir + '/' +  fileName
      })
      console.log('finish', list.length, files.length)
      resolve()
    })
  })
  await Promise.all(promises)
  console.log('获取文件列表', promises, list)
  ctx.result = {
    list
  }
  ctx.msg = '获取文件列表成功'
  next()
}

file.deleteFile = (ctx, next) => {
  const {filePath} = ctx.request.body
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err)
    }
  })
  ctx.result = {}
  ctx.msg = '删除成功'
  next()
}

module.exports = file