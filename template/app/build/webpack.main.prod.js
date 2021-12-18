/**
 * Electron main process
 */
 const webpackMerge = require('webpack-merge');
 const mainBaseConfig = require('./webpack.main.base.js');
 
 const mainProdConfig = {
   mode: 'production',
 };
 
 module.exports = webpackMerge.merge(mainBaseConfig, mainProdConfig);
 