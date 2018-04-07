const path = require('path');

/* eslint-disable import/no-extraneous-dependencies */
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
/* eslint-enable import/no-extraneous-dependencies */

const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
  devtool: 'source-map',
  entry: './index.js',
  output: {
    path: buildPath,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CleanWebpackPlugin(buildPath),
    new MiniCssExtractPlugin(),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        map: {
          inline: false,
        },
        discardComments: {
          removeAll: true,
        },
      },
    }),
  ],
};
