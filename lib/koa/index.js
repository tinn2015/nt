const chalk = require('chalk')
const generateTemplate = require('../../utils/copyTemplate')

function init (...args) {
  console.log(chalk.green('create koa template'))

  // 开始生成模版
  generateTemplate(args[0], args[1])
}

module.exports = init