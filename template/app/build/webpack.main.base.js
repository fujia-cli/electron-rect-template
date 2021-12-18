const webpack = require('webpack');

const { resolve } = require('./utils');

module.exports = {
  entry: resolve('/core/main.ts'),
  output: {
    filename: 'main.js',
    path: resolve('/dist')
  },
  target: 'electron-main',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __dirname: '__dirname',
    }),
  ]
};
