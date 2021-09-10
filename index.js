#!/usr/bin/env node

const packageJson = require('./package.json')
const { program } = require('commander')
const chalk = require('chalk');

program.version(packageJson.version, '-v, --vers', 'output the current version');

program
  .option('-k, --koa', '生成koa模版')
  .option('-n, --npm', '生成npm模版')
  .action((options, command) => {
    if (options.koa) {
      console.log('koa')
    } else if (options.npm) {
      console.log('npm')
    } else {
      console.log(chalk.red('请通过 nt --help 查看命令'))
    }
  })  

program
  .command('initKoa <projectName>')
  .description('create koa template')
  // .option('-t, --template <templateName>', 'template 参数')  // 相当于 t=templateName
  .action((projectName, templateName) => {
    const initKoa = require('./lib/koa')
    initKoa(projectName, 'koa')
  })

  program
  .command('initNpm <projectName>')
  .description('create npm template')
  .action((projectName) => {
    const initNpm = require('./lib/npm')
    initNpm(projectName, 'npm')
  })

// 处理命令行参数的方法， 这个必须添加
program.parse(process.argv)