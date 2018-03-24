var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

var config = require('./webpack.base.config.js')

// Use webpack dev server
config.entry = [
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server',
  './assets/js/index'
]

// override django's STATIC_URL for webpack bundles
config.output.publicPath = 'http://localhost:3000/assets/bundles/'

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
    new BundleTracker({filename: './webpack-stats.json'}),
    new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development'),
      }}),
  
])
// Optons is a feature of `babel-loader` for Webpack (not Babel itself).
// It enables caching results in ./node_modules/.cache/babel-loader/
// directory for faster rebuilds.

config.module.rules.push(
    { test: /\.jsx?$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader', 
        options: { 
            cacheDirectory: true, 
            plugins: ['react-hot-loader/babel'], 
        },
    }
)

config.mode = 'development'

module.exports = config