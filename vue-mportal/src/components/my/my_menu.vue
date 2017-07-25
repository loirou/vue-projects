/**
 * Created by Darren on 16/09/11.
 *
 * Des: 我的
 *
 */

<template>
<!-- 内容 -->
<div class="content clearfix">
  <div class="main" @click="menu_go('my-bankcard')">
    <div class="main-Imag-2"></div>
    <div class="main-Des">银行卡</div>
  </div>
  <div v-if="!weixin" class="main" @click="menu_go('my-recharge')">
    <div class="main-Imag-3"></div>
    <div class="main-Des">充值</div>
  </div>
  <!--当请求来自微信的时候弹窗 提示去APP充值-->
  <div v-else class="main" @click="weixinRecharge()">
    <div class="weixin-main-Imag-3"></div>
    <div class="weixin-main-Des">充值</div>
  </div>
  <div class="main" @click="menu_go('my-withdraw')">
    <div class="main-Imag-4"></div>
    <div class="main-Des">提现</div>
  </div>
  <div class="main" @click="menu_go('my-coupon')">
    <div class="main-Imag-1"></div>
    <div v-bind:class="{'main-point':newCoupon}"></div>
    <div class="main-Des">加息券</div>
  </div>
</div>
</template>

<script>
import Toast from 'mint-ui/lib/toast';
import MsgBox from '../../plugins/messagebox/index.js'; //消息提示框

export default {
  props: ['coupon'],
  data() {
    return {
      user: JSON.parse(this.Storage.get('USER')),
      hasNewCoupon: true,
      weixin: false, //请求来自微信
    }
  },
  created() {
    this.weixin = JSON.parse(this.Storage.get('wxBrowser'));
  },
  computed: {
    newCoupon: function() {
      //大于0 是未读 都显示小点
      if (this.coupon > 0) {
        this.hasNewCoupon = true;
      } else {
        this.hasNewCoupon = false;
      }
      return this.hasNewCoupon
    }
  },
  methods: {
    menu_go: function(name) {
      // 为了避免微信返回按钮无法返回的问题
      // 在入口处进行限制
      switch (name) {
        case 'my-withdraw':
          // 如果未设置资金密码，先跳转到资金密码设置页面
          if (this.user.isSetPwd != '1') {
            Toast({
              message: '请先设置资金密码',
              position: 'top',
              duration: 2000
            });
            router.go({
              name: 'my-fund-pwd-set'
            });
            return;
          }
          // 如果未添加银行卡，先跳转到银行卡页面
          if (this.user.isBindBank != '1') {
            Toast({
              message: '请先绑定银行卡',
              position: 'top',
              duration: 2000
            });
            router.go({
              name: 'my-bankcard'
            });
            return;
          }
          break;
        case 'my-recharge':
          //如果未设置资金密码，先跳转到资金密码设置页面
          if (this.user.isSetPwd != '1') {
            Toast({
              message: '请先设置资金密码',
              position: 'top',
              duration: 2000
            });
            router.go({
              name: 'my-fund-pwd-set'
            });
            return;
          }
          break;
        default:
      }
      router.go({
        name: name
      });
    },
    weixinRecharge: function() {
      if (this.weixin) {
        MsgBox.alert('请到钱盒APP进行充值');
      }
    }
  }
}
</script>

<style lang="sass" scoped>
/*内容*/
.content {
    // margin-top: -0.02rem;
    background-color: #ffffff;
    .main {
        float: left;
        position: relative;
        width: 25%;
        height: 1.46rem;
        padding: 0.24rem 0 0.3rem;
        text-align: center;
        -webkit-box-sizing: border-box;
        /* Safari */
        .main-Des {
            width: 100%;
            text-align: center;
            font-size: 0.24rem;
            margin-top: 0.08rem;
            color: #666;
        }
        .weixin-main-Des {
            width: 100%;
            text-align: center;
            font-size: 0.24rem;
            margin-top: 0.08rem;
            color: #ccc;
        }
        .main-Imag-1 {
            height: 0.6rem;
            //width: .6rem;
            background: url('../../static/images/w-1.png') no-repeat;
            background-size: 0.6rem 0.6rem;
            margin-left: 33%;
        }
        .main-Imag-2 {
            @extend .main-Imag-1;
            background: url('../../static/images/w-2.png') no-repeat;
            background-size: 0.6rem 0.6rem;
            margin-left: 32%;
        }
        .main-Imag-3 {
            @extend .main-Imag-1;
            background: url('../../static/images/w-3.png') no-repeat;
            background-size: 0.6rem 0.6rem;
            margin-left: 35%;
        }
        .weixin-main-Imag-3 {
            @extend .main-Imag-1;
            background: url('../../static/images/w-3-1.png') no-repeat;
            background-size: 0.6rem 0.6rem;
            margin-left: 35%;
        }
        .main-Imag-4 {
            @extend .main-Imag-1;
            background: url('../../static/images/w-4.png') no-repeat;
            background-size: 0.6rem 0.6rem;
            margin-left: 33%;
        }
        .main-point {
            position: absolute;
            top: 0.25rem;
            right: 0.51rem;
            //display: inline-block;
            width: 0.14rem;
            height: 0.14rem;
            border-radius: 0.14rem;
            background: #ff2500;
        }
    }
}
</style>
