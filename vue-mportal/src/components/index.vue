/**
 * Created by youhy on 14/12/16
 *
 * Des: 首页，用于获取用户信息、中转页
 *
 */
<template>
</template>

<script>
import HttpUrl from '../common/js/http-url.js';
import MsgBox from '../plugins/messagebox/index.js';
import Cashbox from '../common/js/cashbox.js';

export default {
  data() {
    return {};
  },
  created() {
    // 写在created里而不是ready，钱盒sdk越早初始化越好
    Cashbox.init();
  },
  ready() {
    // 如果请求来自微信
    if (this.Helper.isWechatBrowser()) {
      this.initWechat();
    } else {
      this.initCashbox();
    }
  },
  methods: {
    initWechat: function() {
      var openid = this.Helper.request("openid");
      if (!openid) {
        this.gotoError(404);
        return false;
      }
      this.$http({
        method: 'GET',
        ignoreError: true,
        url: HttpUrl.wx_authorize + openid
      }).then((res) => {
        // 路由跳转参数
        const route = this.$route.query.route;
        if (res.data.code == 200) {
          this.Storage.set('TOKEN', res.data.data.token);
          this.Storage.set('USER', JSON.stringify(res.data.data));
          this.$broadcast('on-toggle-menu', true);
          if (route) {
            this.goto(route);
          } else {
            this.goto('/home');
          }
        } else if (res.data.code == 404) {
          // 返回404说明未绑定，跳到绑定页面
          let path = `/wechat/bind/${res.data.data.openid}`;
          if (route) {
            path = `${path}?route=${route}`;
          }
          this.goto(path);
        } else {
          this.gotoError(res.data.code);
        }
      }, (res) => {
        this.gotoError(404);
      });
    },
    initCashbox: function() {
      this.Storage.clear();
      // 钱盒TOKEN
      var cashboxToken = this.Helper.request('token');
      if (cashboxToken) {
        this.login(cashboxToken);
      } else {
        // 新版app的url不会传入token值，需要主动获取
        Cashbox.callNative('getToken', {}, function(res) {
          if (res && res.data && res.data.tpfToken) {
            cashboxToken = res.data.tpfToken;
            this.login(cashboxToken);
          } else {
            this.gotoError(404);
            return false;
          }
        }.bind(this));
      }
    },
    login: function(cashboxToken) {
      this.$http({
        method: "GET",
        ignoreError: true,
        url: HttpUrl.login + cashboxToken
      }).then((response) => {
        if (response.data.code == 200) {
          // save tpf token in localstorage for pos recharge
          this.Storage.set('CASHBOX_TOKEN', cashboxToken);
          // login user token
          this.Storage.set('TOKEN', response.data.data.token);
          // user info
          this.Storage.set('USER', JSON.stringify(response.data.data));
          this.$broadcast('on-toggle-menu', true);
          window.location.href = '/home';
        } else {
          this.gotoError(response.data.code);
        }
      }, (response) => {
        this.gotoError(404);
      });
    },
    gotoError: function(code) {
      this.goto('/info/error?code=' + code);
    },
    goto: function(path) {
      window.location.href = path;
    }
  }
}
</script>
