/**
* Created by gyr on 16/11/29.
*
* Des:我的-银行卡信息
*
*/
<template>
<div class="bank clearfix" :style="{'background-image':getBankBg}">
  <div class="bank-icon">
    <div class="bank-icon-msg">
      <span></span>
      <img :src="getBankIcon" />
    </div>
  </div>
  <div class="bank-msg">
    <p>{{bank.bankName}}</p>
    <span class="bank-type">储蓄卡</span>
    <div class="bank-card">
      {{bank.bankAccountMask}}
    </div>
  </div>
  <div class="bank-radio" v-show="selectable">
    <span :class="getCheckedCls"></span>
  </div>
</div>
</template>
<script>
export default {
  props: ['bank', 'selectable'],
  data() {
    return {
      checked: false,
    };
  },
  computed: {
    getCheckedCls: function() {
      return this.checked ? 'bank-checked' : 'bank-unchecked';
    },
    getBankIcon: function() {
      var bankCode = this.bank.bankCode;
      return require(`../../static/images/bank/${bankCode}.png`);
    },
    getBankBg: function() {
      var bankCode = this.bank.bankCode;
      var bg = require(`../../static/images/bankbg/${bankCode}.png`);
      return `url(${bg})`;
    }
  },
  events: {
    // 接收父组件通知选中状态
    'on-toggle-checked': function(item) {
      if (item.bankAccount == this.bank.bankAccount) {
        this.checked = item.checked;
      }
    }
  }
}
</script>
<style lang="sass" scoped>
@import "../../common/css/common";
.bank {
    margin: 0.3rem 0.2rem 0;
    width: 6rem;
    height: 1.6rem;
    background-size: 6rem 1.6rem;
    .bank-icon {
        float: left;
        width: 1.1rem;
        height: 1.6rem;
        .bank-icon-msg {
            margin: 0 0.2rem 0.24rem;
            width: 0.7rem;
            height: 0.7rem;
            position: relative;
            span {
                border-radius: 0.7rem;
                top: 0.2rem;
                position: absolute;
                opacity: 0.8;
                width: 0.7rem;
                height: 0.7rem;
                background: #fff;
                -moz-opacity: 0.8;
                -khtml-opacity: 0.8;
                display: inline-block;
            }
            img {
                top: 0.2rem;
                position: absolute;
                display: inline-block;
                width: 0.5rem;
                height: 0.5rem;
                margin: 0.1rem;
                z-index: 1;
            }
        }
    }
    .bank-msg {
        float: left;
        width: 4.3rem;
        height: 1.6rem;
        color: #fff;
        p {
            padding-top: 0.2rem;
            font-size: 0.26rem;
        }
        .bank-type {
            display: block;
            //padding-top: .05rem;
            font-size: 0.2rem;
        }
        .bank-card {
            padding-top: 0.25rem;
            height: 0.28rem;
            line-height: 0.28rem;
            font-size: 0.28rem;
            .bank-card-left {
                float: left;
                padding-top: 0.05rem;
                //filter:alpha(opacity:60);
                opacity: 0.6;
                -moz-opacity: 0.6;
                -khtml-opacity: 0.6;
            }
            .bank-card-right {
                float: left;
                padding-left: 0.2rem;
            }
        }
    }

    .bank-radio {
        float: right;
        margin-top: .6rem;
        margin-right: .2rem;
        span {
            display: block;
        }
        .bank-unchecked {
            background: url("../../static/images/rd-unchecked.png") no-repeat;
            background-size: 0.4rem 0.4rem;
            width: 0.4rem;
            height: 0.4rem;
        }
        .bank-checked {
            background: url("../../static/images/rd-checked-light.png") no-repeat;
            background-size: 0.4rem 0.4rem;
            width: 0.4rem;
            height: 0.4rem;
        }
    }
}
</style>
