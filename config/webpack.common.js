var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackCommonConfig = [{
  entry: {
    app: path.resolve(__dirname, '../src/southeastAsia/index.js'),
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
      'redux-thunk'
    ]
  },
  output: {
      path: path.resolve(__dirname, '../dist/southeastAsia'),
      filename: 'dongnanya/js/bundle.min.js'
  },
  module: {
      loaders: [
          {
              test: /\.js[x]?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel-loader',
              query: {
                presets: ['react', 'es2015', 'stage-0'],
                plugins:[ "transform-runtime",
                          'react-html-attrs',
                          'transform-class-properties',
                          'transform-decorators-legacy'
                        ]
              }
          },
          {
              test: /\.(css|less)$/,
              loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[local]!postcss-loader!less-loader')
          },
          {   test: /\.(jpe?g|png|jpg|eot|woff|ttf|svg|gif)$/,
              loader: "file-loader?name=./dongnanya/img/[name].[ext]?[hash]"
          },
          {
              test: /\.(jpe?g|jpg|png|gif|svg)$/i,
              loader: 'img?minimize&progressive=true&optimizationLevel=5'
          },
          {
              test: /\.json$/,
              loader: 'json'
          }
      ]
  },
  postcss: [
        require('postcss-px2rem')({remUnit:75}),
        require('autoprefixer')({browsers : ['> 1%', 'last 4 versions', 'iOS > 6']}),
        require('cssnano')()
      ],
  plugins: [
      new ExtractTextPlugin("styles.css", { allChunks: true }),
      new HtmlWebpackPlugin({
        filename: './dongnanya.html',
        template: './src/southeastAsia/dongnanya.html',
        hash: true
      }),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'dongnanya/vendor.js')
  ],
  node: {
    global: 1,
    crypto: 'empty',
    module: 0,
    Buffer: 0,
    clearImmediate: 0,
    setImmediate: 0
  }
}]

webpackCommonConfig.push({
  entry: path.resolve(__dirname, '../src/southeastAsia/client.config.js'),
  output: {
    path: path.resolve(__dirname, '../dist/southeastAsia/dongnanya'),
    filename: 'client.config.js'
  }
});

module.exports = webpackCommonConfig;
