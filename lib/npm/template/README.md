# NBridge
一个 TypeScript 的 umd 类库模板，已添加polyfill

### 使用

```shell
npm start         # 同 npm run watch

npm run dev       # 同 npm run watch

npm run watch     # 以 webpack mode = development 构建 umd 文件，并对源文件进行修改监听

npm run doc       # 使用 @hb/hbpress 生成文档，更多用法请查阅其文档

npm build         # 以 webpack mode = production 构建 umd 文件，输出至 ./dist

npm test          # 使用 jest 运行 ./tests 内的用例，在 ./coverage 生成测试报告

npm run lint-fix  #使用 tslint 格式化 ts 文件
```

### 文件说明

 - `scripts`              必要的构建、记录脚本
 - `src`                  源代码
 - `tests`               `jest`测试代码
 - `.babelrc`            `babel`配置
 - `.npmrc`              `npm`公司源
 - `exp.sh`               作为`npm`包发布审批的必要基本
 - `gulpfile.js`         `gulp`构建脚本
 - `package.json`        `npm`包信息
 - `READMIN.md`           提供项目说明
 - `tsconfig.json`       `TypeScript`编译配置
 - `tslint.json`         `tslint`代码风格配置
 - `webpack.config.js`   `webpack`配置

### 注意

1. 项目默认添加了`polyfill`，如不需要请删除相关 `@babel/polyfill` 的依赖和代码
2. 如有需要请自行修改`webpack.config.js`、`gulpfile.js`、`.tslint.json`、`.babelrc`、`tslint.json`等配置文件
