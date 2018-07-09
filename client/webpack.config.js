const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.s?css$/,
      use: ExtractTextPlugin.extract({
        use: [
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }]
      })
    }] 
  },
  mode: 'development',
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
    historyApiFallback: true,
    publicPath: '/dist/',
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  devtool: 'cheap-module-eval-source-map',
  performance: {
    hints: false
  }
}