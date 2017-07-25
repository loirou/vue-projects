var path = require('path'); // NodeJS中的Path对象，用于处理目录的对象，提高开发效率。
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin"); // 将组件中的样式提取出来
var HtmlWebpackPlugin = require('html-webpack-plugin'); // html模板插入代码
var vue = require("vue-loader"); // webpack的loader插件
var WebpackMd5Hash = require('webpack-md5-hash'); // 解决webpack原生hash变化问题，组件内容改变会导致vendor的hash也改变
var WebpackSftpClient = require('webpack-sftp-client');

function getPlugins(env) {
  // webpck插件
  var plugins = [
    // 全局变量，处理不同环境加载不同的配置
    // 保证这个plugin放在第一个，gulp里会根据数组索引替换掉
    // 这个地方还必须保留，否则在本地开发会报异常"__ENV__未定义"
    new webpack.DefinePlugin({__ENV__: JSON.stringify('dev')}),
    new WebpackMd5Hash(),
    // // 提框架js(很少有变动)到vendor.js文件中，便于缓存
    // new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: '/js/[name].[chunkhash:8].js'}),
    // 将样式统一发布到style.css中
    new ExtractTextPlugin("/css/style.[contenthash:8].css", {
      allChunks: true,
      disable: false
    }),
    // linux下此插件导致webpack报错不能打包
    // new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: "index.html", //原始模板
      filename: "index.html", //输出新文件
      inject: true
    }),
    // 使用 ProvidePlugin 加载使用率高的依赖库
    new webpack.ProvidePlugin({$: 'webpack-zepto'}),
  ];

  // 开发环境不能用chunkhash，否则报错
  if (env !== 'dev-cache') {
    plugins.push(new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: '/js/[name].[chunkhash:8].js'}));
  } else {
    plugins.push(new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: '/js/[name].[hash:8].js'}));
  }

  if (env === 'dev-deploy') {
    plugins.push(new WebpackSftpClient({
      port: '22',
      host: '172.21.1.204',
      username: 'root',
      password: 'h2finance',
      path: './dist/',
      remotePath: '/data/nginx/hzq/',
      // Show details of uploading for files
      verbose: false,
    }));
  } else if (env === 'qa-deploy') {
    plugins.push(new WebpackSftpClient({
      port: '22',
      host: '172.21.1.231',
      username: 'root',
      password: 'h2finance',
      path: './dist/',
      remotePath: '/data/nginx/hzq/',
      // Show details of uploading for files
      verbose: false,
    }));
  }

  return plugins;
}

// 编译输入路径
// var entry = ['./src/main'];
var entry = {
  index: './src/main',
  vendor: ['vue', 'vue-router', 'vue-resource', 'mint-ui/lib/indicator']
}
// 编译输出路径
var buildPath = "/dist/";

function getOutput(env) {
  // 开发环境不能用chunkhash，否则报错
  return {
    path: __dirname + buildPath,
    filename: env === 'dev-cache' ? '/js/build.[hash:8].js' : '/js/build.[chunkhash:8].js',
    chunkFilename: env === 'dev-cache' ? '/js/[name].[hash:8].js' : '/js/[name].[chunkhash:8].js'
  }
}

// 模块导入
module.exports = function(env) {
  return {
    debug: true,
    entry: entry,
    output: getOutput(env),
    // 服务器配置相关，自动刷新!
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      grogress: true
    },
    module: {
      // 加载器
      loaders: [
        {
          // 解析.vue文件
          test: /\.vue$/,
          loader: 'vue'
        }, {
          // 转化ES6的语法
          // 让webpack去验证文件是否是.js结尾将其转换
          test: /\.js$/,
          // 通过babel转换
          loader: 'babel',
          // 不用转换的node_modules文件夹
          exclude: /node_modules/
        }, {
          // 编译css并自动添加css前缀
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!cssnext-loader")
        }, {
          //.scss 文件想要编译，scss就需要这些东西！来编译处理
          //install css-loader style-loader sass-loader node-sass --save-dev
          test: /\.scss$/,
          loader: 'style!css!sass?sourceMap'
        }, {
          // 图片转化，小于2K(2048)自动转化为base64的编码
          // 如果limit设置的太大，大部分图片都会被打包到build.js里，导致首页js文件过大
          test: /\.(png|jpg|gif)$/,
          loader: 'url-loader?limit=2048&name=/images/[name].[hash:8].[ext]'
        }, {
          //html模板编译？
          test: /\.(html|tpl)$/,
          loader: 'html-loader'
        }, {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader"
        }, {
          // 处理favicon.ico图片
          test: /\.(ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader?name=/images/[name].[ext]"
        }
      ]
    },
    // .vue的配置。需要单独出来配置
    vue: {
      loaders: {
        css: ExtractTextPlugin.extract('vue-style-loader', 'css-loader', 'sass-loader'),
        sass: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!sass-loader')
      }
    },
    // 转化成es5的语法
    babel: {
      presets: [
        'es2015', "stage-0"
      ],
      plugins: ['transform-runtime']
    },
    resolve: {
      // require时省略的扩展名，如：require('module') 不需要module.js
      extensions: [
        '', '.js', '.vue'
      ],
      //别名
      alias: {}
    },
    plugins: getPlugins(env),
    // 开启source-map，webpack有多种source-map，在官网文档可以查到
    devtool: 'eval-source-map'
  }
};
