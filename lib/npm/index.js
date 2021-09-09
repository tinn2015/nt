const chalk = require('chalk')
const generateTemplate = require('../../utils/copyTemplate')

const copyUtil = require('../../utils/copyTemplate')
function init (...args) {
  console.log(chalk.green('create npm template'))

  // 开始生成模版
  generateTemplate(args[0])
}

module.exports = init