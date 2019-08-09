/*
* webpack配置打包
*/
var webpack = require('webpack');
var webpackConfig = require('./webpack.prod.config');

console.log(
  ' 温馨提示:\n' +  
  ' 正在打包中，请稍候。。。\n'
);

webpack(webpackConfig, function (err, stats) {  
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n');

  console.log(' \n打包结束\n');
});


