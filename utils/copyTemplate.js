const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')
const Spinner = require('clui').Spinner


function generateTemplate (projectName) {
  const targetDir = path.join(process.cwd(), projectName)
  if (fs.existsSync(targetDir)) {
    // 文件夹已存在
    inquirer.prompt([{
      name: 'overwrite',
      type: 'confirm',
      message: `${projectName} 已存在是否要覆盖？`,
      validate: function (input) {
        console.log(input)
        if (input.lowerCase !== 'y' && input.lowerCase !== 'n') {
          return 'Please input y/n!'
        } else {
          return true
        }
      }
    }]).then(answers => {
      if (answers['overwrite']) {
        // 删除原有文件夹
        deleteFloderRecursive(targetDir)
        fs.mkdirSync(targetDir)
        startSpinner()
        copyTtemplate(targetDir)
      }
    }).catch(err => {
      console.log(chalk.red(err))
    })
  } else {
    fs.mkdirSync(targetDir)
    copyTtemplate(targetDir)
  }
}

// 复制模版
function copyTtemplate (targetPath) {
  const temPath = path.resolve(__dirname, '../lib/npm/template')
  function readAndCopyFile (temPath, targetPath) {
    fs.readdirSync(temPath).forEach((file) => {
      let curPath = temPath + '/' + file
      let stat = fs.statSync(curPath)
      let fileTargetPath = targetPath + '/' + file
      if (stat.isDirectory()) {
        // 文件夹递归复制
        fs.mkdirSync(fileTargetPath)
        readAndCopyFile(curPath, fileTargetPath)
      } else {
        const file = fs.readFileSync(curPath, 'utf8')
        fs.writeFileSync(fileTargetPath, file, 'utf8')
      }
    })
  }

  readAndCopyFile(temPath, targetPath)
}

// 递归删除文件夹
function deleteFloderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      let curPath = path + '/' + file
      // 文件夹
      if (fs.lstatSync(curPath).isDirectory()) {
        // 递归删除
        deleteFloderRecursive(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

// loaidng
const time = new Spinner('Generating template 0 seconds...')
let second = 0
function startSpinner () {
  // 开始计时
  time.start()
  setInterval(() => {
    second++
    time.message(`Generating template ${second} seconds...`)
    if (second > Math.random() * 10 + 1) {
      stopSpinner()
    }
  }, 1000)
}

function stopSpinner () {
  time.stop()
  process.stdout.write('\n');
  process.exit(0);
}

module.exports = generateTemplate