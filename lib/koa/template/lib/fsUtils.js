const path = require('path')
const fs = require('fs')

const readdir = (path) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject({
          type: 'error', 
          error: err
        })
      } else {
        resolve(files)
      }
    })
  })
}

const getFileStat = (path) => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, file) => {
      if (err) {
        reject(err)
      } else {
        resolve(file)
      }
    })
  })
}

module.exports = {
  readdir,
  getFileStat
}