var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

var config = {
  entry: {
    app: path.resolve(__dirname, 'app/index.js'),
    test: path.resolve(__dirname, 'app/test.js'),
    vendors: [
      'react', 'react-dom', 'react-bootstrap', 'react-redux', 'redux', 
      'moment', 'lodash', 'jquery', 'jquery-ui/datepicker'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    //filename: 'bundle.js'
    filename: "[name].js"
  },
  resolve: {
    extentions: ['', 'js', 'jsx']
  },
  module: {
    loaders: [
      // Babel loader (for ES2015 and JSX)
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {presets: ['stage-0', 'es2015', 'react']}
      },
      // CSS and Style loader
      {
        test: /\.css$/,
        include: PATHS.app,
        //loader: "style-loader!css-loader"
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      // { 
      //  test: /\.less$/, 
      //  loader: "style-loader!css-loader!less-loader" 
      // },
      { 
        test: /\.gif$/, 
        loader: "url-loader?mimetype=image/gif" 
      },
      { 
        test: /\.png$/, 
        loader: "url-loader?mimetype=image/png" 
      },
      { 
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, 
        loader: "url-loader?mimetype=application/font-woff" 
      },
      { 
        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, 
        loader: "url-loader?mimetype=application/font-[ext]" 
      }
    ]
  },
  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    // new HtmlWebpackPlugin({
    //   title: 'TRS Work Scheduler'
    // }),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new ExtractTextPlugin("css/styles.css")
  ]
};

if (TARGET === 'start' || !TARGET) {
  config = merge(config, {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: './build',
      historyApiFallback: true,
      hot: true,
      inline: true,
      // stats: 'errors-only',
      stats: 'info',
      host: 'localhost',
      port: '9000',
      watch: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

module.exports = config;
