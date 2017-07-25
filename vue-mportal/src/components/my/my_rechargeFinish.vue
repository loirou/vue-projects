/**
* Created by Darren_YCDing on 16/12/13.
*
* Des: 充值完成页面
*
*/
<template>
<div>
  <pb-object-top msg="充值结果"></pb-object-top>
  <pb-padding-top></pb-padding-top>
  <div class="finish">
    <div v-if="payStatus==1">
      <div class="finish-total">
        <span class="finish-title finish-pl3">充值金额</span>
        <span class="finish-content finish-num">{{finish.amount | handleNum}}</span>
      </div>
      <ul class="finish-detail">
        <li class="finish-list">
          <span class="finish-title">充值账户</span>
          <span class="finish-content">{{mobile}}</span>
        </li>
        <li class="finish-list">
          <span class="finish-title">手续费</span>
          <span class="finish-content">{{finish.serviceFee | handleNum}}</span>
        </li>
        <li class="finish-list">
          <span class="finish-title">到账金额</span>
          <span class="finish-content">{{finish.orderAmount | handleNum}}</span>
        </li>
        <li class="finish-list">
          <span class="finish-title">预计到账时间</span>
          <span class="finish-content">{{finish.arrivalTime}}</span>
        </li>
        <li class="finish-list">
          <span class="finish-title">操作状态</span>
          <span class="finish-content finish-status">处理中...</span>
        </li>
      </ul>
    </div>
    <div class="recharge-fail" v-else>
      <div class="fail-icon"></div>
      <div class="recharge-msg" v-text="errorMsg"></div>
    </div>
    <div class="withdraw-btn">
      <pb-button cls="btn-lg" @click="submit">完成</pb-button>
    </div>
    <!-- <div class="recharge-msg" v-text="queryParams"></div> -->
  </div>
</div>
</template>
<script>
import public_ObjectTop from '../common/public_ObjectTop.vue';
import public_pTop from '../common/public_ptop.vue';
import public_button from '../common/public_button';
import http_url from '../../common/js/http-url.js';

export default {
  data() {
    var user = JSON.parse(this.Storage.get('USER')) || {};
    return {
      finish: {
        amount: 0,
        serviceFee: 0,
        orderAmount: 0
      },
      mobile: user.maskMobile,
      payStatus: this.$route.query.payStatus,
      errorDesc: this.$route.query.errorDesc,
      queryParams: JSON.stringify(this.$route.query)
    };
  },
  computed: {
    errorMsg: function() {
      var result = this.$route.query.errorDesc || '充值失败';
      var code = this.$route.query.errorCode;
      if (code) {
        result += ('(' + code + ')');
      }
      return result;
    }
  },
  ready() {
    if (this.payStatus == 1) {
      this.loadData();
    }
  },
  components: {
    "pb-object-top": public_ObjectTop,
    "pb-padding-top": public_pTop,
    "pb-button": public_button
  },
  methods: {
    loadData: function() {
      var orderNo = this.$route.query.orderNo;
      var tpfToken = this.Storage.get('CASHBOX_TOKEN');
      this.$http({
        method: "GET",
        url: http_url.my_recharge_finish + orderNo + '/' + tpfToken
      }).then((res) => {
        if (res.data.code == 200) {
          this.finish = res.data.data;
        }
      });
    },
    submit: function() {
      router.go({
        name: 'assets-list'
      });
    }
  },
  filters: {
    handleNum(val) {
      var str;
      var num = val;
      num = Math.round(val * 100) / 100;
      num = num.toString();
      var res = num.split('.'); //分成数组
      if (res.length == 1) {
        str = num.toString() + ".00";
        str = '￥' + str + '元';
        return str;
      }
      if (res.length > 1) {
        if (res[1].length < 2) {
          str = num.toString() + "0";
          str = '￥' + str + '元';
          return str;
        } else {
          str = num.toString();
          str = '￥' + num + '元';
          return str;
        }
      }
    }
  }
}
</script>


<style lang="sass" scoped>
@import "../../common/css/common";

.finish{
    padding-top: $status-bar-height;
    .finish-total{
        clear: both;
        margin-top: .3rem;
        border-bottom: 0.3rem solid #efefef;
        height: .88rem;
        line-height: .88rem;
        background: #fff;
        .finish-pl3{
            padding-left: .3rem;
        }
        .finish-title{
            float: left;
            font-size: .26rem;
            color: #000;
        }
        .finish-content{
            float: right;
            padding-right: .3rem;
            font-size: .26rem;
            color: #999;
        }
        .finish-num{
            color: #f75c5c;
        }
    }
    .finish-detail{
        padding-left: .3rem;
        background: #fff;
        .finish-list{
            clear: both;
            border-bottom: $public-border solid #efefef;
            height: .88rem;
            line-height: .88rem;
            .finish-title{
                float: left;
                font-size: .26rem;
                color: #000;
            }
            .finish-content{
                float: right;
                padding-right: .3rem;
                font-size: .26rem;
                color: #999;
            }
            .finish-status{
                color: #f75c5c;
            }
        }
        :last-child{
            border-bottom: none;
        }
    }
    .withdraw-btn{
        margin-top: .8rem;
        width: 100%;
        max-width: $custom-max-width;
        text-align: center;
    }
}
.recharge-fail {
    margin-top: 1.8rem;
    .fail-icon {
        margin-left: ($custom-max-width - 2.6rem) / 2;
        background: url("../../static/images/sad.png") no-repeat;
        background-size: 2.6rem 1.52rem;
        width: 2.6rem;
        height: 1.52rem;
    }
    .recharge-msg {
        margin-top: .26rem;
        text-align: center;
        font-size: .24rem;
        color: #999;
    }
}
</style>
