const webpack = require('webpack')
module.exports={
    configureWebpack: {

        plugins: [
     
           new webpack.ProvidePlugin({
     
             $:"jquery",
     
             jQuery:"jquery",
     
             "windows.jQuery":"jquery"
     
           })
     
         ]
     
     },
     // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
    devServer: {
      port: '8080',
      host:"127.0.0.1",
    },
    publicPath: './',
 
}