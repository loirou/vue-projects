/**
 * webpack 配置文件
 * 增加webpack.gulp.config.js目的是为了gulp传参
 * @type {[type]}
 */
var webpackConfig = require('./webpack.gulp.config.js');
module.exports = Object.create(webpackConfig('dev-cache'));
