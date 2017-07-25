var gulp = require('gulp');
var webpack = require('webpack');
var del = require('del');
var minifycss = require('gulp-minify-css'); //压缩css
var uglify = require('gulp-uglify'); //压缩js
var rename = require('gulp-rename'); //重命名
var webpackconfig = require('./webpack.gulp.config');
var gutil = require('gulp-util');

/**
 *  清理生产目录文件
 */
gulp.task('clean', function(cb) {
    // del(['./dist/*.js', './dist/*.css', './dist/images', './dist/*.map']).then(paths => {
    //     console.log('删除文件和文件夹成功\n', paths.join('\n'));
    //     cb();
    // });

    del(['./dist']).then(paths => {
        // console.log('删除文件和文件夹成功\n', paths.join('\n'));
        cb();
    });
});

/**
 *  任务名称：webpack - 开发环境
 *  任务内容：webpack打包，执行之前优先执行clean
 */
gulp.task('webpack-dev', ['clean'], function(cb) {
    // modify some webpack config options
    var myConfig = Object.create(webpackconfig('dev'));

    //把索引0的插件替换掉
    myConfig.plugins[0] = new webpack.DefinePlugin({
        __ENV__: JSON.stringify("dev"),
    });

    // run webpack
    webpack(myConfig, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        cb();
    });
});

gulp.task('webpack-dev-deploy', ['clean'], function(cb) {
   // modify some webpack config options
   var myConfig = Object.create(webpackconfig('dev-deploy'));

   //把索引0的插件替换掉
   myConfig.plugins[0] = new webpack.DefinePlugin({
       __ENV__: JSON.stringify("dev"),
   });

   // run webpack
   webpack(myConfig, function(err, stats) {
       if (err) throw new gutil.PluginError("webpack:build", err);
       cb();
   });
});

/**
 *  任务名称：webpack - 测试环境
 *  任务内容：webpack打包，执行之前优先执行clean
 */
gulp.task('webpack-qa', ['clean'], function(cb) {
    // modify some webpack config options
    var myConfig = Object.create(webpackconfig('qa'));

    //把索引0的插件替换掉
    myConfig.plugins[0] = new webpack.DefinePlugin({
        __ENV__: JSON.stringify("qa")
    });

    // run webpack
    webpack(myConfig, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        cb();
    });
});
gulp.task('webpack-qa-deploy', ['clean'], function(cb) {
   // modify some webpack config options
   var myConfig = Object.create(webpackconfig('qa-deploy'));

   //把索引0的插件替换掉
   myConfig.plugins[0] = new webpack.DefinePlugin({
       __ENV__: JSON.stringify("qa")
   });

   // run webpack
   webpack(myConfig, function(err, stats) {
       if (err) throw new gutil.PluginError("webpack:build", err);
       cb();
   });
});

/**
 *  任务名称：webpack - 生产环境
 *  任务内容：webpack打包，执行之前优先执行clean
 */
gulp.task('webpack-prod', ['clean'], function(cb) {
    // modify some webpack config options
    var myConfig = Object.create(webpackconfig('prod'));
    //myConfig.plugins = myConfig.plugins.concat(
    //    new webpack.DefinePlugin({
    //        __ENV__: JSON.stringify("prod")
    //    })
    //);
    //把索引0的插件替换掉
    myConfig.plugins[0] = new webpack.DefinePlugin({
        __ENV__: JSON.stringify("prod")
    });

    // run webpack
    webpack(myConfig, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        //gutil.log("[webpack:build]", stats.toString({
        //    colors: true
        //}));
        cb();
    });
});

/**
 *  任务名称：style
 *  任务内容：压缩css文件
 */
gulp.task('style', function() {
    gulp.src('./dist/*.css')
        //.pipe(rename({suffix:'.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist'));
});

/**
 *  任务名称：image
 *  任务内容：拷贝图片文件到dist目录
 *  注：css中的文件webpack会自动打包，但是动态引用的图片需要手动打包过来
 */
gulp.task('image', function() {
    gulp.src(['./src/static/images/bank/*', './src/static/images/bankbg/*'], { base: './src/static' })
        .pipe(gulp.dest('dist'));
});

/**
 *  任务名称：script
 *  任务内容：压缩js文件
 */
gulp.task('script', function() {
    gulp.src('./dist/*.js')
        //.pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

/**
 *  任务名称：默认任务
 *  任务流程：clean -> webpack -> style -> script
 */
gulp.task('default', ['webpack-dev'], function() {
    gulp.start('style', 'script')
});

gulp.task('dev', ['webpack-dev'], function() {
    gulp.start('style', 'script')
});

gulp.task('dev-deploy', ['webpack-dev-deploy'], function() {
    gulp.start('style', 'script')
});

gulp.task('test', ['webpack-qa'], function() {
    gulp.start('style', 'script')
});

gulp.task('test-deploy', ['webpack-qa-deploy'], function() {
    gulp.start('style', 'script')
});

gulp.task('prod', ['webpack-prod'], function() {
    gulp.start('style', 'script')
});
