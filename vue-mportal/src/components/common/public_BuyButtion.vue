/**
* Created by Darren on 16/11/01.
*
* Des: 购买确定按钮
*   1:可以购买  2:预售(倒计时)   3:售罄
*
*/

<template>
<div>
  <div v-if="info_1.status === '1'" class='public-Buy-Buttion clearfix'>
    <div class="btn-Buy-1" @click="go_info('pay-money')">
      <div class="calculator-1" @click="go_calculator('profit-calculator')"></div>
      <span>立即购买</span>
    </div>
    <!--立即购买的时候需要带过去加息券幅度 和count有无加息券 且散标的时候显示无加息券-->
  </div>

  <div v-if="info_1.status === '2'" class='public-Buy-Buttion clearfix'>
    <div class="btn-Buy-2 clearfix">
      <div class="calculator-2" @click="go_calculator('profit-calculator')"></div>
      <span class="title">距发售</span>
      <span v-text="times.days" class="time"></span>
      <em>:</em>
      <span v-text="times.hours" class="time"></span>
      <em>:</em>
      <span v-text="times.minutes" class="time"></span>
      <em>:</em>
      <span v-text="times.seconds" class="time"></span>
    </div>
  </div>
  <div v-if="info_1.status==='3'||info_1.status==='4'" class='public-Buy-Buttion clearfix'>
    <div class="btn-Buy-3">
      <div class="calculator-2" @click="go_calculator('profit-calculator')"></div>
      <span v-text="info_1.status==='3'?'已售罄':'还款中'"></span>
    </div>
  </div>
</div>
</template>
<script>
import Toast from 'mint-ui/lib/toast';

export default {
  props: ["info_1", "times", "coupon"],
  data() {
    return {
      user: JSON.parse(this.Storage.get('USER')),
      duration: '',
      // days: '00',
      // hours: '00',
      // minutes: '00',
      // seconds: '00'
    }
  },
  computed: {
    totalRate: function() {
      //console.log(this.info_1.status);
      if (!this.info_1.discountRate) {
        this.info_1.discountRate = 0;
      }
      var total = (this.info_1.interestRate + this.info_1.discountRate) * 100;
      return total.toFixed(2);
    }
  },
  methods: {
    goBack: function() {
      history.back();
    },
    go_info: function(msg) {
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
      router.go({
        name: msg,
        params: {
          targetId: this.$route.params.targetId
        },
        query: {
          targetType: this.$route.query.targetType,
          //couponValue:this.coupon_data.couponValue,
          countValue: this.coupon.count
        }
      });
    },
    go_calculator: function(msg) {
      router.go({
        name: msg,
        params: {
          targetId: this.$route.params.targetId
        },
        query: {
          targetType: this.$route.query.targetType,
          rate: this.totalRate,
          duration: this.info_1.duration,
          status: this.info_1.status,
          biddingAmount: this.info_1.biddingStartAmount

        }
      });
    }
  }
}
</script>
<style lang="sass" scoped>
@import "../../common/css/common";

.public-Buy-Buttion {
    z-index: 998;
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: $custom-max-width;
    .calculator-1 {
        float: left;
        width: 0.88rem;
        height: 0.88rem;
        background: url("../../static/images/Buy/calculator.png") no-repeat 0.2rem 0.165rem;
        background-size: 0.42rem 0.56rem;
        background-color: #de5353;
    }
    .calculator-2 {
        @extend .calculator-1;
        background: url("../../static/images/Buy/calculator_2.png") no-repeat 0.24rem 0.165rem;
        background-size: 0.42rem 0.56rem;
        background-color: #cfcfcf;
    }
    .btn-Buy-1 {
        float: left;
        width: 100%;
        max-width: $custom-max-width;
        height: 0.88rem;
        line-height: 0.88rem;
        text-align: center;
        font-size: 0.3rem;
        color: #fff;
        background: #f75c5c;
    }
    .btn-Buy-2 {
        @extend .btn-Buy-1;
        color: #666;
        background: #dcdcdc;
        .time {
            float: left;
            margin-top: 0.26rem;
            width: 0.36rem;
            line-height: 0.36rem;
            background: #666666;
            color: #fff;
            font-size: 0.22rem;
            border-radius: 4px;
        }
        .title {
            float: left;
            font-size: 0.26rem;
            color: #666;
            background: #dcdcdc;
            border-radius: 0.05rem;
            margin-left: 20%;
            margin-right: 0.2rem;
        }
        em {
            float: left;
            color: #666666;
            width: 0.14rem;
        }
    }
    .btn-Buy-3 {
        @extend .btn-Buy-1;
        color: #666;
        background: #dcdcdc;
    }
}
</style>
