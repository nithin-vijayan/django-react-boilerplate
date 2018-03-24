var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var config = require('./webpack.base.config.js')

config.output.path = require('path').resolve('./assets/dist')

config.plugins = config.plugins.concat([
  new BundleTracker({filename: './webpack-stats-prod.json'}),

  // removes a lot of debugging code in React
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
  }}),

])

config.optimization.minimizer.push(
    // minifies your code
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      uglifyOptions: {
        compress: false,
        ecma: 6,
        mangle: true
      },
      sourceMap: true
    })
)

config.mode = 'production'

// Add a loader for JSX files
config.module.rules.push({ test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' },
)

module.exports = config