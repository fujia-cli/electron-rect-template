const webpack = require('webpack');
const { resolve } = require('./utils');

module.exports = {
  entry: {
    // It is also possible split lodash from this.
    reacts: ['react', 'react-dom', 'redux', 'react-redux', 'lodash']
  },
  output: {
    library: '[name]',
    filename: '[name].dll.js',
    path: resolve('/dist/dll'),
  },
  plugins: [
    // new variable
    new webpack.DllPlugin({
      name: '[name]',
      path: resolve('/dist/dll/[name].manifest.json'),
    }),
  ]
};
