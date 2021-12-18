/**
 * Electron main process
 */
 const webpackMerge = require('webpack-merge');
 const mainBaseConfig = require('./webpack.main.base.js');
 
 const mainDevConfig = {
   mode: 'development',
 };
 
 module.exports = webpackMerge.merge(mainBaseConfig, mainDevConfig);
