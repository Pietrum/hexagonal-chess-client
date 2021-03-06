const webpack = require('webpack');
const path = require('path');

const debug = process.env.NODE_ENV !== "production";
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: debug ? 'inline-source-map' : false,
  entry: [
    './scripts/game.js',
    './styles/main.scss',
  ],
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextWebpackPlugin.extract({
        use: [{
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        }],
      }),
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['env', 'es2015'],
        },
      }, {
        loader: 'eslint-loader',
      }],
    }],
  },
  output: {
    filename: 'js/main.[chunkhash].min.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    // globals
    new CleanWebpackPlugin('dist'),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new ExtractTextWebpackPlugin('css/main.[contenthash].css'),
  ].concat(debug ? [
    // develompent only
  ] : [
    // production only
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ]),
};
