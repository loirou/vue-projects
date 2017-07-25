/**
* Created by gyr on 16/11/4.
*
* Des: 收益计算器
*
*/
<template>
<public-object-top msg="收益计算器" back="true">
</public-object-top>
<pb-padding-top></pb-padding-top>
<div class="calculator-content">
  <div class="calculatorTop">
    <div class="box-content">
      <div class="benefit clearfix">
        <div class="benefit-box">
          <span class="benefit-tit">年化收益率(%)</span>
          <span class="benefit-num">{{{item.num | handleNum}}}</span>
        </div>
        <i class="box-con-line"></i>
      </div>
      <div class="deadline">
        <div class="deadline-box">
          <span class="deadline-tit">期限(天)</span>
          <span class="deadline-num">{{item.date}}</span>
        </div>
      </div>
    </div>
    <div class="profit-compare">收益对比(元)</div>
    <chart-line></chart-line>
  </div>
  <div class="calculatorBot clearfix">
    <span class="bot-amount">
                <input @blur="onBlur" type="number" class="bot-input" v-model="biddingAmount" placeholder="请输入金额" />
            </span>
    <span v-if="this.status==='1'" class="bot-buy" @click="buy()">立即购买</span>
    <span v-if="this.status!=='1'" class="refuse-buy">立即购买</span>
  </div>
</div>
</template>

<script>
import public_ObjectTop from '../common/public_ObjectTop.vue';
import public_pTop from '../common/public_ptop.vue';
import chart_line from '../chart/line';
import Toast from 'mint-ui/lib/toast';

export default {
  data() {
    return {
      user: JSON.parse(this.Storage.get('USER')),
      item: {
        num: '',
        date: ''
      },
      biddingAmount: '',
      status: '',
      chart: []
    }
  },
  components: {
    "public-object-top": public_ObjectTop,
    "pb-padding-top": public_pTop,
    "chart-line": chart_line
  },
  filters: {
    handleNum(val) {
      val = val + "";
      var row = val.split(".");
      if (!row[1]) {
        row[1] = "00";
      }
      return "<b style='font-size: .9rem;font-weight: normal;'>" + row[0] + "</b>." + row[1];
    }
  },
  ready() {
    this.biddingAmount = this.$route.query.biddingAmount;
    this.item.num = this.$route.query.rate;
    this.item.date = this.$route.query.duration;
    this.status = this.$route.query.status;
    //初始化收益数据 默认金额起投金额
    this.chart[0] = Math.floor(0.0035 * parseFloat(this.item.date) * parseFloat(this.biddingAmount) / 365);
    this.chart[1] = Math.floor(0.0323 * parseFloat(this.item.date) * parseFloat(this.biddingAmount) / 365);
    this.chart[2] = Math.floor(0.035 * parseFloat(this.item.date) * parseFloat(this.biddingAmount) / 365);
    this.chart[3] = Math.floor(parseFloat(this.item.num) / 100 * parseFloat(this.item.date) * parseFloat(this.biddingAmount) / 365);
    this.chart[4] = Math.floor(parseFloat(this.item.num) / 100 * parseFloat(this.item.date) * parseFloat(this.biddingAmount) * 0.8 / 365);
    this.$broadcast('chartChange', this.chart);
  },
  methods: {
    buy: function() {
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
        name: 'pay-money',
        params: {
          targetId: this.$route.params.targetId
        },
        query: {
          targetType: this.$route.query.targetType
        }
      });
    },
    onBlur: function() {
      var chartNum = parseFloat(this.item.num) / 100 * parseFloat(this.item.date) * parseFloat(this.biddingAmount);
      var chartLast = parseInt(chartNum * 4 / 5);
      //银行活期
      this.chart[0] = Math.floor(0.01 * parseFloat(this.item.date) * parseFloat(this.biddingAmount) / 365);
      //余额宝
      this.chart[1] = Math.floor(0.03 * parseFloat(this.item.date) * parseFloat(this.biddingAmount) / 365);
      //货币基金
      this.chart[2] = Math.floor(0.026 * parseFloat(this.item.date) * parseFloat(this.biddingAmount) / 365);
      this.chart[3] = Math.floor(chartNum / 365);
      this.chart[4] = Math.floor(chartLast / 365);
      this.$broadcast('chartChange', this.chart);
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";

.calculator-content {
    .calculatorTop {
        padding-top: $status-bar-height;
        background: #fff;
        .chart-line {
            padding-bottom: 0.4rem;
            margin-top: 0.3rem;
        }
        .box-content {
            height: 2.4rem;
            border-bottom: $public-border solid #efefef;
            background: url("../../static/images/info_calculator.png") no-repeat;
            background-size: 100% 2.4rem;
            font-family: PingFangSC-Light;
            .benefit {
                width: 50%;
                height: 100%;
                float: left;
                .benefit-box {
                    padding-top: 0.66rem;
                    text-align: right;
                    padding-right: 0.5rem;
                    .benefit-tit {
                        line-height: 0.3rem;
                        display: block;
                        font-size: 0.24rem;
                        font-weight: lighter;
                        color: #666;
                    }
                    .benefit-num {
                        height: 0.9rem;
                        line-height: 0.9rem;
                        color: #f75959;
                        display: block;
                        font-size: 0.5rem;
                    }
                }
                .box-con-line {
                    margin-top: -1.2rem;
                    margin-left: 3.2rem;
                    display: block;
                    height: 1.02rem;
                    width: 0.02rem;
                    background: #efefef;
                }
            }
            .deadline {
                float: left;
                width: 50%;
                .deadline-box {
                    padding-top: 0.66rem;
                    text-align: left;
                    padding-left: 0.5rem;
                    .deadline-tit {
                        line-height: 0.3rem;
                        font-size: 0.24rem;
                        color: #666;
                        display: block;
                    }
                    .deadline-num {
                        height: 0.9rem;
                        line-height: 0.9rem;
                        display: block;
                        color: #000;
                        font-size: 0.9rem;
                    }
                }
            }
        }
        .profit-compare {
            padding: 0.3rem 0.3rem 0;
            font-size: 0.26rem;
            color: #000;
        }
        .chart {
            width: 5.8rem;
            height: 3.66rem;
            padding: 0.3rem 0.3rem 0.4rem;
            background: url("../../static/images/info-chart.png") no-repeat;
            background-size: 5.82rem 3.66rem;
            background-position: 0.3rem 0;
        }
    }
    .calculator-space {
        height: 2.15rem;
    }
    .calculatorBot {
        position: fixed;
        bottom: 0;
        z-index: 100;
        width: $custom-max-width;
        height: 0.88rem;
        background: #fff;
        .bot-amount {
            float: left;
            width: 3.6rem;
            margin: 0.16rem 0.3rem;
            border-bottom: $public-border solid #efefef;
            .bot-input {
                height: 0.55rem;
                border: none;
                font-size: 0.28rem;
                color: #000;
            }
        }
        .bot-buy {
            float: right;
            height: 100%;
            line-height: 0.88rem;
            width: 2rem;
            background: #83bdfe;
            font-size: 0.3rem;
            color: #fff;
            text-align: center;
        }
        .refuse-buy {
            float: right;
            height: 100%;
            line-height: 0.88rem;
            width: 2rem;
            background: #dcdcdc;
            font-size: 0.3rem;
            color: #fff;
            text-align: center;
        }
    }
}
</style>
