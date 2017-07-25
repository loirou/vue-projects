/**
 * helper tools
 */
import Cashbox from './cashbox.js';

export default {
  install(Vue) {

    // 处理钱盒android版的返回事件
    window.onBack = function() {
      // 路由跳转配置
      const backConfig = {
        // 需要退出汇赚钱的路由
        exitRoutes: [
          'home', 'fixed', 'decentralization', 'my'
        ],
        // 需要直接跳转的路由
        // 一般都是从其他页面直接跳转过来的路由
        // 不能直接返回上一页，需要跳转到指定页
        gotoRoutes: [
          {
            name: 'recharge-finish',
            to: 'home'
          }, {
            name: 'withdraw-finish',
            to: 'home'
          }, {
            name: 'my-bankcard',
            to: 'home'
          }, {
            name: 'buy-finish',
            to: 'my'
          }, {
            name: 'my-invest-record',
            to: 'my'
          }, {
            name: 'assets-list',
            to: 'my'
          }, {
            name: 'profit',
            to: 'my'
          }
        ]
      };
      // 当前路由
      const routeName = window.router.app.$route.name;
      // 需要退出汇赚钱的路由
      for (var i = 0; i < backConfig.exitRoutes.length; i++) {
        const item = backConfig.exitRoutes[i];
        if (item === routeName) {
          Cashbox.exit();
          return;
        }
      }
      // 需要直接跳转的路由
      for (var i = 0; i < backConfig.gotoRoutes.length; i++) {
        const item = backConfig.gotoRoutes[i];
        if (item.name === routeName) {
          window.router.go({name: item.to});
          return;
        }
      }
      // 如果没有特殊配置，则浏览器自动返回
      history.back();
    };

    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    Date.prototype.Format = function(fmt) { //author: meizz
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
            ? (o[k])
            : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    };

    // 对象常量Object.freeze方法扩展
    // 只用Object.freeze只能保证对象的首层常量属性
    Object.deepFreeze = function(obj) {
      // 获取对象所有的属性并循环递归处理
      var propNames = Object.getOwnPropertyNames(obj);
      propNames.forEach(function(name) {
        var prop = obj[name];
        if (typeof prop == 'object' && prop !== null) {
          // 递归调用deepFreeze方法冻结常量属性
          Object.deepFreeze(prop);
        }
      });
      return Object.freeze(obj);
    };

    Vue.prototype.Helper = {
      request: function(key) {
        var sValue = location.search.match(new RegExp("[\?\&]" + key + "=([^\&]*)(\&?)", "i"));
        return sValue
          ? sValue[1]
          : sValue;
      },
      //验证是否支持银行卡
      verifyBank: function(bankCode, banks) {
        if (!banks || banks.length == 0) {
          return true
        }
        var result = false;
        banks.forEach(function(item) {
          if (item.bankCode == bankCode) {
            result = true;
            return;
          }
        });
        return result;
      },
      //验证是否是微信浏览器
      isWechatBrowser: function() {
        var browserInfo = window.navigator.userAgent.toLowerCase();
        if (browserInfo.match(/MicroMessenger/i) == 'micromessenger') {
          return true;
        } else {
          return false;
        }
      },
      //公共微信设置title方法 http://www.deboy.cn/set-wechat-title-in-vuejs-spa.html
      setWechatTitle: function(title) {
        document.title = title;
        var mobile = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(mobile)) {
          var iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          //iframe.setAttribute('src', '/favicon.ico');

          var iframeCallback = function() {
            setTimeout(function() {
              iframe.removeEventListener('load', iframeCallback);
              document.body.removeChild(iframe)
            }, 0)
          };
          iframe.addEventListener('load', iframeCallback);
          document.body.appendChild(iframe);
        }
      },
      // 除去小数点后面多余的0
      // num: 原始数字
      // retainCount: 保留几个0
      // 如：trimZero(20.00, 1) = "20.0"
      trimZero: function(num, retainCount = 2) {
        // 转换成字符串处理
        num += '';
        if (isNaN(num)) {
          return num;
        }
        const numArr = num.split('.');
        if (numArr.length <= 1 || numArr[1].length <= retainCount) {
          // 如果小数位数小于要保留的位数，直接返回
          let zeroStr = '';
          for (let i = 0; i < retainCount; i++)
            zeroStr += '0';
          return `${num}.${zeroStr}`;
        }
        const retainStr = numArr[1].splice(0, retainCount);
        return `${numArr[0]}.${retainStr}`;
      },
      // 身份证号加密
      maskIdNo: function(idNo) {
        return `${idNo.substr(0,3)}***********${idNo.substr(14)}`;
      },
    };
  }
}
