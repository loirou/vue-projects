/**
 * Created by Darren on 16/09/11.
 *
 * Notice: 入口文件
 * work  : 启动前的加载，注入，实例化
 *
 */

import Vue from 'vue'; // vue
import VueRouter from 'vue-router'; // vue-router
import VueResource from 'vue-resource'; // vue-resource
import Indicator from 'mint-ui/lib/indicator'; // loading
import MsgBox from './plugins/messagebox/index.js'; // 消息提示框
import routerConfig from './router/index'; // 路由配置文件
import Storage from './common/js/storage.js'; // 缓存工具类
import Helper from './common/js/helper.js'; // 帮助类

import NProgress from 'nprogress'; // 进度条
import 'nprogress/nprogress.css'; // 进度条样式

require("./common/js/reset.js"); // 全局加载重置js
require('./common/css/reset.css'); // 全局加载重置css
require('./common/css/common.css'); // 全局css样式

import 'mint-ui/lib/swipe/style.css'; // 引入mint-ui上下拉动加载样式
import './common/css/mint-ui.scss'; // 引入修改后上下拉动字体颜色大小
require('./static/images/favicon.ico');

Vue.use(VueRouter); // 加载vue-router
Vue.use(VueResource); // 加载Resource
Vue.use(Storage); // 本地存储插件
Vue.use(Helper); // 帮助类插件

// 全局ajax请求拦截器
// 不要用箭头函数，否则this崩溃啊~~~
Vue.http.options.emulateJSON = true; // 自动格式化json
Vue.http.interceptors.push(function(request, next) {
  var token = this.Storage.get('TOKEN');
  //微信访问需要传递 source
  if (this.Helper.isWechatBrowser()) {
    request.headers.set('source', 'wechat');
  }
  if (token) {
    request.headers.set('token', token);
  }
  // POST方式需要改变请求参数格式为string
  if (request.method === 'POST') {
    request.body = JSON.stringify(request.body);
  }

  /*
   * loading start
   * 'snake'
   * 'fading-circle'
   * 'double-bounce'
   * 'triple-bounce'
   */
  // 忽略loading效果
  const ignoreIndicator = request.ignoreIndicator === true;
  if (!ignoreIndicator) {
    Indicator.open({spinnerType: 'snake'});
  }

  // 是否忽略公共错误处理
  var ignoreError = request.ignoreError === true;
  next((response) => {
    //loading end
    setTimeout(function() {
      Indicator.close();
    }, 200);
    if (response.status !== 200) {
      //console.error(response);
      MsgBox.alert('网络异常，请稍后再试！');
      return;
    }
    var code = response.body.code;
    if (code === 410) {
      window.location.href = '/info/error?code=' + code;
    } else if (code !== 200 && !ignoreError) {
      //如果设置了忽略公共错误处理，则跳出
      MsgBox.alert(code === 500
        ? '网络异常，请稍后再试！'
        : response.body.msg);
    }
    return response;
  });
});

// 创建一个路由器实例
// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置
const router = new VueRouter({
  history: true,
  //保存页面切换的位置滚动
  saveScrollPosition: true
});
routerConfig(router);

router.beforeEach(function(transition) {
  // 开启顶部进度条
  NProgress.start();
  transition.next();
});
router.afterEach(function(transition) {
  // 关闭顶部进度条
  NProgress.done();
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  var _this = new Vue();
  //来自微信 存在本地标识
  if (_this.Helper.isWechatBrowser()) {
    _this.Storage.set("wxBrowser", true);
    //微信设置导航title
    let title = transition.to.title || '汇赚钱';
    _this.Helper.setWechatTitle(title);
  }
});

// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
// 顺序很重要
// 现在我们可以启动应用了！
var App = Vue.extend({});
router.start(App, '#app');
window.router = router;
