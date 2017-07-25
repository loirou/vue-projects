/**
* Created by gyr on 16/10/10.
*
* Des:项目投资组件
*
*/

<template>
<div class="investCon">
  <div class="twoFloor">
    <div class="investMsg">
      <span>投资金额</span>
      <i>金额为{{items.stepAmount}}倍数，单笔最高{{items.unitMaxAmount}}</i>
    </div>
    <div class="amount">
      <span class="amountMinus" @click="minus()"></span>
      <input class="amountNum" type="number" v-model="items.showAmount" @blur="onBlur" />
      <span class="amountAdd" @click="add()"></span>
    </div>
    <!--此部分处理加息券 当无可用加息券 或者targetType==0即散标的时候 都是无可用加息券 否则显示最高加息力度的优惠券 从上个页面路由带过来-->
    <div class="couponTit">
      <span class="coupon-title">加息券</span>
      <div v-if="coupon.count != 0 && target_type == 1" class="coupon-have" @click="go_coupon()">
        <!--<span class="coupon-rate">+<i v-text="coupon.couponValue"></i>%</span>-->
        <span class="coupon-rate">{{coupon.couponValue | getRate}}</span>
        <span class="coupon-icon"></span>
      </div>
      <div v-else class="coupon-no">
        无可用加息券
      </div>
    </div>
    <!--加息券部分-->
    <div class="investTit">
      <span class="earnings">预计收益 <i v-text="profit"></i><i>元</i></span>
      <span class="balance">可用余额 <i>{{items.balance|balance}}</i><i>元</i></span>
    </div>
  </div>
  <div class="investBtn">
    <pb-button @click="go_Password('safety_check')">立即投资</pb-button>
    <div class="top">
      <span class="des">账户余额不足？</span>
      <span class="pay" @click="go('/my/recharge')">充值</span>
    </div>
  </div>
</div>
</template>

<script>
import public_button from '../common/public_button';
import MsgBox from '../../plugins/messagebox/index.js'; //消息提示框
import http_url from '../../common/js/http-url.js';

export default {
  props: ['items', 'coupon', 'target_type'],
  data() {
    return {
      weixin: false //判断请求是否来自微信的标识
    }
  },
  components: {
    "pb-button": public_button
  },
  methods: {
    go_Password: function() {
      //如果账户余额不足
      //如果请求来自微信 需要点击时候弹窗提示账户余额不足，请至钱盒充值后购买
      this.weixin = JSON.parse(this.Storage.get('wxBrowser'));
      if (parseFloat(this.items.showAmount) > parseFloat(this.items.balance)) {
        if (this.weixin) {
          MsgBox.alert('账户余额不足,请至钱盒APP充值后购买');
        } else {
          MsgBox.alert('账户余额不足,请充值');
        }
      } else {
        this.items.flag = "3";
      }
    },
    go_coupon: function() {
      this.items.flag = "2";
    },
    go: function(url) {
      //如果请求来自微信 需要点击时候弹窗提示账户余额不足，请至钱盒充值后购买
      this.weixin = JSON.parse(this.Storage.get('wxBrowser'));
      if (this.weixin) {
        MsgBox.alert('请至钱盒APP充值后购买');
      } else {
        router.go(url);
      }

    },
    minus: function() {
      if (this.items.showAmount <= this.items.amount) {
        return;
      } else {
        this.items.showAmount = parseFloat(this.items.showAmount) - parseFloat(this.items.stepAmount);
        this.items.showAmount = this.items.showAmount.toFixed(2);
      }
    },
    add: function() {
      if (this.items.showAmount >= this.items.unitMaxAmount) {
        return;
      } else {
        this.items.showAmount = parseFloat(this.items.showAmount) + parseFloat(this.items.stepAmount);
        this.items.showAmount = this.items.showAmount.toFixed(2);
      }
    },
    onBlur: function() {
      if (this.items.showAmount >= this.items.unitMaxAmount) {
        this.items.showAmount = this.items.unitMaxAmount;
      }
    }
  },
  computed: {
    profit: function() {

      var showAmount = this.items.showAmount; //投资金额
      var duration = this.items.duration; //投资期限
      var interestRate = this.items.interestRate; //投资利率
      var discountRate = this.items.discountRate; //优惠利率
      var couponRate = this.items.couponValue ? this.items.couponValue : "0"; //加息券利率
      var rate = parseFloat(interestRate) + parseFloat(discountRate) + parseFloat(couponRate); //最终利率
      var money = showAmount * rate / 365 * duration;

      //             console.log("投资金额"+showAmount);
      //             console.log("投资期限"+duration);
      //             console.log("投资利率"+interestRate);
      //             console.log("优惠利率"+discountRate);
      //             console.log("加息券利率"+couponRate);
      //
      //             console.log(rate);
      //             console.log(money);

      money = money + "";
      return money.substring(0, money.lastIndexOf('.') + 3);
    }
  },
  filters: {
    getRate: function(val) {
      if (val == 0) {
        return "不使用加息券";
      } else {
        return "+" + val * 100 + "%";
      }
    },
    balance: function(val) {
      val = val + "";
      return val.substring(0, val.lastIndexOf('.') + 3);
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";

.investCon {
    // position: fixed;
    height: 8.35rem-$status-bar-height;
    bottom: 0;
    background: #fff;
    margin-top: 0.3rem;
    width: 100%;
    .twoFloor {
        padding-top: 0.2rem;
        margin: 0 0.3rem;
        .investMsg {
            span {
                font-size: 0.28rem;
                color: #333333;
                display: block;
            }
            i {
                margin-top: 0.05rem;
                font-size: 0.22rem;
                color: #999999;
                display: block;
            }
        }
        .amount {
            margin-top: 0.4rem;
            width: 100%;
            height: 0.66rem;
            line-height: 0.66rem;
            padding-bottom: 0.3rem;
            border-bottom: $public-border solid #efefef;
            text-align: center;
            .amountAdd {
                background: url("../../static/images/scatter/pf_20.png") no-repeat;
                width: 0.66rem;
                height: 0.66rem;
                background-size: 0.66rem 0.66rem;
                float: right;
            }
            .amountNum {
                border: none;
                //width: 4.48rem;
                width: 4rem;
                height: 100%;
                font-family: PingFangSC-Light;
                font-size: 0.6rem;
                color: #f75a5a;
                text-align: center;
            }
            .amountNum:-ms-input-placeholder {
                color: #f75a5a;
            }

            .amountNum::-webkit-input-placeholder {
                color: #f75a5a;
            }
            .amountMinus {
                background: url("../../static/images/scatter/pf_17.png") no-repeat;
                width: 0.66rem;
                height: 0.66rem;
                background-size: 0.66rem 0.66rem;
                float: left;
            }
        }
        .couponTit {
            height: 0.8rem;
            line-height: 0.8rem;
            .coupon-title {
                font-size: 0.28rem;
                color: #333;
            }
            .coupon-have {
                float: right;
                .coupon-rate {
                    float: left;
                    margin-right: 0.2rem;
                    margin-top: 0.08rem;
                    font-size: 0.24rem;
                    color: #f75b5b;
                }
                .coupon-icon {
                    float: left;
                    margin-top: 0.3rem;
                    width: 0.16rem;
                    height: 0.28rem;
                    background: url('../../static/images/right-next.png') no-repeat;
                    background-size: 0.16rem 0.28rem;
                }
            }
            .coupon-no {
                float: right;
                font-size: 0.24rem;
                color: #c8c7cc;
                padding-top: 0.05rem;
            }
        }
        .investTit {
            padding-top: 0.3rem;
            width: 100%;
            height: 0.6rem;
            border-bottom: $public-border solid #efefef;
            i {
                color: #f75b5b;
            }
            .earnings {
                background: url("../../static/images/scatter/pf_32.png") no-repeat;
                background-size: 0.36rem 0.36rem;
                line-height: 0.36rem;
                height: 0.36rem;
                display: inline-block;
                padding-left: 0.4rem;
                float: left;
                color: #666666;
                font-size: 0.24rem;
            }
            .balance {
                background: url("../../static/images/scatter/pf_29.png") no-repeat;
                background-size: 0.34rem 0.33rem;
                padding-left: 0.4rem;
                height: 0.36rem;
                line-height: 0.36rem;
                display: inline-block;
                float: right;
                color: #666666;
                font-size: 0.24rem;
            }
        }
    }
    .investBtn {
        margin-top: 0.8rem;
        text-align: center;
        .top {
            margin-top: 0.24rem;
        }
        .des {
            font-size: 0.22rem;
            color: #999999;
        }
        .pay {
            font-size: 0.24rem;
            color: #f75b5b;
            text-decoration: underline;
        }
    }
}
</style>
