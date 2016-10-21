var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var webpackCommonConfig = require('./webpack.common');

var webpackProdConfig = {
  devtool: 'source-map',
  debug: false,
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
}

webpackCommonConfig.map((value,item) => {
  if(item === 0){
    webpackCommonConfig[item] = webpackMerge(webpackCommonConfig[item],webpackProdConfig);
  }
});

module.exports = webpackCommonConfig;
