const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.common.js')

module.exports = (env) => {
  
  return merge(common, {
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      historyApiFallback: true,
      hot: true,
      host: 'localhost',
      disableHostCheck: true,
      open: true,
      port: 3000,
      stats: 'minimal'
    },
    devtool: 'eval',
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      rules: [
          {
              test: /\.css$/,
              use: [ 'style-loader', 'css-loader' ]
          }
      ]
    }
  })
}
