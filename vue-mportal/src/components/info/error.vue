/**
 * Created by gyr on 14/12/16.
 *
 * Des: error page 错误页面
 *
 */

<template>
<div class="error">
  <pb-object-top :msg="title" self-back="true"></pb-object-top>
  <div class="error-page">
    <div v-if="errorType==1">
      <div class="error-img"></div>
      <div class="error-msg">您的登录超时了</div>
      <div class="error-tip">不要担心，请点击左上角，重新进入汇赚钱！</div>
    </div>
    <div v-if="errorType==2">
      <div class="error-img2"></div>
      <div class="error-msg">小汇迷路了，请与客服联系，带小汇回家！</div>
      <div class="error-tip">电话：<a class="phone" href="tel:10109888" target="_blank">10109888</a>（周一至周日09:00-24:00）</div>
    </div>
    <div v-if="errorType==3">
      <div class="error-img3"></div>
      <div class="error-msg" style="margin-top: .1rem;">哎呀，出错了！<span v-text="errorCode"></span></div>
      <div class="error-tip">可能原因：网络信号弱；程序员罢工...</div>
      <div class="error-tip">请退出重试</div>
    </div>
    <div class="help-msg" v-if="errorType!='2'">
      <p class="content">
        客服电话：<a class="phone" href="tel:10109888" target="_blank">10109888</a>（周一至周日09:00-24:00）
      </p>
    </div>
  </div>
</div>
</template>


<script>
import public_ObjectTop from '../common/public_ObjectTop.vue';
import MsgBox from '../../plugins/messagebox/index.js';
import Cashbox from '../../common/js/cashbox.js';

export default {
  data() {
    return {
      title: '出错了',
      errorMsg: '哎呀，出错了(可能原因：网络信号弱；程序员罢工)',
      errorCode: '',
      errorType: 3, //默认错误类型
    };
  },
  created() {
    var code = this.$route.query.code;
    if (code) {
      switch (code) {
        case '410':
          this.errorType = 1;
          this.title = '登录超时';
          break;
        case '11008':
          this.errorType = 2;
          this.title = '联系客服';
          break;
        default:
          this.errorType = 3;
          this.title = '出错了';
      }
      this.errorCode = `错误码：${code}`;
    }
  },
  events: {
    'on-back': function() {
      Cashbox.exit();
    }
  },
  components: {
    "pb-object-top": public_ObjectTop
  }
}
</script>
<style lang="sass" scoped>
@import "../../common/css/common";

.error .error-page {
    padding-top: 0.88rem;
    width: $custom-max-width;
    text-align: center;
    .error-img {
        margin: .7rem ($custom-max-width - 4.38rem)/2 0;
        width: 4.38rem;
        height: 3.35rem;
        background: url("../../static/images/error-01.png") no-repeat;
        background-size: 4.38rem 3.35rem;
    }
    .error-img2 {
        margin: 1.4rem ($custom-max-width - 2.4rem)/2 0;
        width: 2.4rem;
        height: 2.45rem;
        background: url("../../static/images/error-02.png") no-repeat;
        background-size: 2.4rem 2.45rem;
    }
    .error-img3 {
        margin: .6rem ($custom-max-width - 3.06rem)/2 0;
        width: 3.06rem;
        height: 3.13rem;
        background: url("../../static/images/error-03.png") no-repeat;
        background-size: 3.06rem 3.13rem;
    }
    .error-msg {
        color: #333;
        font-size: 0.26rem;
        text-align: center;
        margin-top: .4rem;
    }
    .error-tip {
        color: #999;
        font-size: 0.24rem;
        text-align: center;
        margin-top: .10rem;
    }
    .btn-exit {
        width: 1.22rem;
        height: .5rem;
        margin-top: .5rem;
        border: $public-border solid #f75c5c;
        border-radius: 0.5rem;
        outline: none;
        color: #f75c5c;
        font-size: .24rem;
        background: transparent;
    }
    .help-msg {
      width: $custom-max-width;
      bottom: .4rem;
      position: fixed;
      .content {
        margin-top: .05rem;
        font-size: .22rem;
        color: #999999;
      }
    }
    .phone {
      color: #F75A5A;
    }
}
</style>
