const path = require('path');
// const buble = require('@rollup/plugin-buble'); // babel汇总
const typescript = require('rollup-plugin-typescript2')
const {eslint} = require('rollup-plugin-eslint');
const RollupJson = require('@rollup/plugin-json')
const RollupNodeResolve = require('@rollup/plugin-node-resolve');
const RollupCommonjs = require('@rollup/plugin-commonjs')
const babel = require('rollup-plugin-babel');

const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}
module.exports = [
  {
    input: resolveFile('src/index.ts'),
    output: {
      file: resolveFile('dist/NBridge.js'),
      format: 'umd',
      name: 'NBridge',
    }, 
    plugins: [
      eslint(),
      typescript({
        tsconfig : resolveFile('tsconfig.json'),
        abortOnError : false,
      }),
      RollupNodeResolve.nodeResolve(),
      RollupCommonjs({
        include : /\/node_modules\//,
      }),
      babel({
        exclude: 'node_modules/**', // 只编译我们的源代码
        runtimeHelpers: true
      }),
      RollupJson()
    ],
  },
]