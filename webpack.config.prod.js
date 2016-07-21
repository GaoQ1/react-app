var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
      path.resolve(__dirname, 'src/818/index.js')
    ],
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
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!less-loader')
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
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle:false,sourcemap:false,compress: {warnings: false}})
    ]
};
