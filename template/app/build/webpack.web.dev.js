/**
 * Web Develop
 */
 const webpackMerge = require('webpack-merge');
 const renderBaseConfig = require('./webpack.render.base.js');
 
 const { resolve } = require('./utils')
 
 const webDevConfig = {
   mode: 'development',
   devServer: {
     static: resolve('/dist'),
     compress: true,
     host: '0.0.0.0', // webpack-dev-server启动时要指定ip，不能直接通过localhost启动，不指定会报错
     port: 7001, // 启动端口为 7001 的服务
     hot: true,
     open: true,
   },
   target: 'web',
 };
 
 module.exports = webpackMerge.merge(renderBaseConfig, webDevConfig);