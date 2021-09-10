const mysql  = require('mysql')
const config  = require('../config/index')
const { logger } = require('../middlewares/logger')

const connection = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.username,
  password: config.mysql.password,
  database: config.mysql.database
})

connection.connect(function (err) {
  if (err) {
    logger.error(err)
  } else {
    console.log(`mysql success: ${config.mysql.host}:${config.mysql.port}`)
  }
  
})



const query = function (sql, values) {
  console.log('sql', sql)
  return new Promise((resolve, reject) => {
    connection.query(sql, values, function (error, results, fields) {
      if (error) {
        reject(error)
      } else {
        console.log('sql result', values, results)
        if(results.length){
          resolve(results)
        } else {
          resolve()
        }
        
      }
    })
  })
}

// 建表
let user = `
  create table if not exists users(
    id int not null auto_increment,
    username VARCHAR(100) NOT NULL COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '密码',
    createTime timestamp default current_timestamp comment '创建时间',
    PRIMARY KEY (id)
  )
`

query(user, [])

const stopMysqlConnection = function () {
  connection.end()
}

module.exports = {
  query,
  stopMysqlConnection
}
