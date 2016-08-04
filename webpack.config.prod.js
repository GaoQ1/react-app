var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [{
    entry: {
      app: path.resolve(__dirname, 'src/818/index.js'),
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
        path: path.resolve(__dirname, 'dist/818'),
        filename: 'js/bundle.min.js'
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
                loader: "file-loader?name=./img/[name].[ext]?[hash]"
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
          require('postcss-px2rem')({remUnit:75})
        ],
    plugins: [
        new ExtractTextPlugin("styles.css", { allChunks: true }),
        new HtmlWebpackPlugin({
          filename: './index.html',
          template: './src/818/index.html',
          hash: true
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"production"'
          },

          __CLIENT__: true,
          __SERVER__: false,
          __DEVELOPMENT__: false,
          __DEVTOOLS__: false
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        // new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
    ]
},{
    entry: './src/818/client.config.js',
    output: {
      path: './dist/818',
      filename: 'client.config.js'
    }
}];
