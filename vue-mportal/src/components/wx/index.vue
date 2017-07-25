/**
* Created by wd on 7/3/17
*
* Des: 微信端中转页
*
*/
<template>
</template>
<script>
import HttpUrl from '../../common/js/http-url.js';
import MsgBox from '../../plugins/messagebox/index.js';
import Indicator from 'mint-ui/lib/indicator'; //loading

export default {
  data() {
    return {};
  },
  ready() {
    Indicator.open();
    // 来自微信 存在本地标识
    if (this.Helper.isWechatBrowser()) {
      this.Storage.set("wxBrowser", true);
      // 微信设置导航title
      // let title = transition.to.title;
      this.Helper.setWechatTitle('汇赚钱');

      //浏览器本地没有TOKEN,去微信获取code值
      // if (!this.Storage.get('TOKEN')) {
      let url = HttpUrl.wx_oauth;
      let callback = HttpUrl.wx_callback;
      const route = this.$route.query.route;
      if (route) {
        callback = `${callback}?route=${route}`;
      }
      window.location.href = `${url}?callback=${encodeURIComponent(callback)}`; // 跳转到后台地址
      // }
    } else {
      // 如果不是微信浏览器，跳到错误页
      window.location.href = '/info/error?code=404';
    }
    setTimeout(() => {
      Indicator.close();
    }, 500);
  }
}
</script>
