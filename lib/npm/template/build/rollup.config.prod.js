process.env.NODE_ENV = 'production';

const { terser } = require('rollup-plugin-terser');
const filesize =  require('rollup-plugin-filesize')
const configList = require('./rollup.config');

const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}

configList.map((config, index) => {

  config.output.sourcemap = false;
  config.plugins = [
    ...config.plugins,
    ...[
      terser(
        {
          compress: {
            pure_funcs: ['console.log'] // 去掉console.log函数
          }    
        }
      ),
      filesize()
    ]
  ]

  return config
})
module.exports = configList;