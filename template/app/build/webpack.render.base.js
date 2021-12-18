/**
 * Electron render process
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const webpack = require('webpack');

// const smp = new SpeedMeasurePlugin();

const { resolve } = require('./utils');

module.exports = {
  entry: {
    index: resolve('/gui/app.tsx'),
    setting: resolve('/gui/pages/setting/app.tsx')
  },
  output: {
    filename: '[name].[hash].js',
    path: resolve('/dist')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@gui': resolve('/gui'),
      '@pages': resolve('/gui/pages'),
      '@components': resolve('/gui/components'),
      '@assets': resolve('/assets'),
    },
  },
  target: 'electron-renderer',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
              name: '[name]_[hash].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            // options: {
            //   modules: {
            //     localIdentName: '[name]__[local]__[hash:base64:5]',
            //   },
            // },
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    // new webpack.DllReferencePlugin({
    //   manifest: resolve('/dist/dll/reacts.manifest.json')
    // }),
    new HtmlWebpackPlugin({
      template: resolve('/gui/index.html'),
      filename: resolve('/dist/index.html'),
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: resolve('/gui/pages/setting/index.html'),
      filename: resolve('/dist/setting.html'),
      chunks: ['setting']
    }),
    // new AddAssetHtmlPlugin({
    //   filepath: resolve('/dist/dll/reacts.dll.js'),
    // }),
    // new HtmlWebpackTagsPlugin({
    //   scripts: 'dll/reacts.dll.js',
    //   append: true,
    // }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('/assets'),
          to: resolve('/dist/assets')
        },
        {
          from: resolve('/configs'),
          to: resolve('/dist/configs')
        },
      ]
    }),
  ]
};
