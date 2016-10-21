var webpackMerge = require('webpack-merge');
var path = require('path');
var webpackCommonConfig = require('./webpack.common');

var webpackDevConfig = {
  devServer: {
      inline: true,
      contentBase: path.resolve(__dirname, '../dist/southeastAsia/'),
      port: 4000,
      historyApiFallback: true
  },
  devtool: 'cheap-module-source-map',
  cache: true,
  debug: true
}

webpackCommonConfig.map((value,item) => {
  if(item === 0){
    webpackCommonConfig[item] = webpackMerge(webpackCommonConfig[item],webpackDevConfig);
  }
});

module.exports = webpackCommonConfig;
