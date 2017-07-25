/**
 * Created by Darren on 16/09/28.
 *
 * Des: 资产显示公共模块
 *
 */

<template>
<!-- 中部 -->
<div id='public-ShowNum' class="center">
  <div class="center-1 clearfix">
    <span class="center-1-1"></span>
    <span class="center-1-2">总资产(元)</span>
    <span class="open-eyes" @click="toggleMask()" :class="{'close-eyes':user.hideAmount}"></span>
  </div>
  <div class="center-2" @click="goList('my-asset')">{{{info.totalAssets | handleNum }}}</div>
</div>
<!-- 下部 -->
<div class="bottom clearfix">
  <div class="bottom-1">
    <div class="dec-1">可用余额(元)</div>
    <div class="num-1">{{{info.yesterdayInterest | hiddenAsset }}}</div>
  </div>
  <div class="bottom-3" @click="goList('profit')">
    <div class="dec-3">累计收益(元)</div>
    <div class="num-3">{{{info.totalInterest | hiddenAsset }}}</div>
  </div>
</div>
</template>

<script>
import AccountService from '../../services/account.js';

export default {
  props: ['info'],
  data() {
    let user = JSON.parse(this.Storage.get('USER')) || {};
    user.hideAmount = user.hideAmount || false;
    return {
      user: user,
    }
  },
  methods: {
    // show or hide money information
    toggleMask: function() {
      this.toggleMaskStorage();
      AccountService.setAmountHiddenState({
        ignoreError: true,
        body: {
          hide: this.user.hideAmount
        }
      });
    },
    // 对storage中的是否隐藏金额字段取反
    toggleMaskStorage: function() {
      this.user.hideAmount = !this.user.hideAmount;
      this.Storage.set('USER', JSON.stringify(this.user));
      // 通知父组件隐藏金额(其他组件也需要显示、隐藏金额的功能)
      this.$dispatch('dispatch-toggle-money-mask', this.user.hideAmount);
    },
    goList: function(msg) {
        router.go({
            name: msg
        })
    }
  },
  filters: {
    hiddenAsset(val, sub) {
      if (!val || val === ":") return ':';
      if (this.user.hideAmount) {
        return "<span style='font-size: .32rem;font-weight: normal;'>*****</span>";
      } else {
        return "<span style='font-size: .32rem;font-weight: normal;'>" + val + "</span>";
      }
    },
    handleNum(val, sub) {
      if (!val || val === ":") return ':';
      if (this.user.hideAmount) {
        return "<span style='font-size: .64rem;font-weight: normal;'>*****</span>";
      } else {
        var row = val.split(".");
        var style = '';
        if (this.info.totalAssets) {
          style = "style='font-size: .46rem;'";
          return "<span style='font-size: .64rem;font-weight: normal;'>" + row[0] + "</span><label " + style + ">." + row[1] + "</label>";
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";

.center {
  margin-top: 0.1rem;
  text-align: center;
  .center-1 {
    height: 0.5rem;
    line-height: 0.5rem;
    display: inline-block;
    .center-1-1 {
      float: left;
      display: inline-block;
      width: 0.28rem;
      height: 100%;
      background: url('../../static/images/my-2.png') no-repeat 0 0.1rem;
      background-size: 0.28rem 0.28rem;
      //margin-left: 2.05rem;
    }
    .center-1-2 {
      float: left;
      font-size: 0.26rem;
      margin-left: 0.12rem;
      color: rgba(255,255,255,0.6);
    }
    .open-eyes {
      float: left;
      display: inline-block;
      width: 0.31rem;
      height: 100%;
      margin-left: 0.2rem;
      background: url('../../static/images/my-1.png') no-repeat 0 0.13rem;
      background-size: 0.31rem 0.21rem;
    }
    .close-eyes {
      float: left;
      display: inline-block;
      width: 0.31rem;
      height: 100%;
      margin-left: 0.2rem;
      background: url('../../static/images/myClose-1.png') no-repeat 0 0.13rem;
      background-size: 0.31rem 0.21rem;
    }
  }
  .center-2 {
    text-align: center;
    font-family: PingfangSC-Light;
    margin-top: -.22rem;
    margin-bottom: 0.22rem;
    font-size: .64rem;
  }
}
.bottom {
  margin-top: 0.1rem;
  padding: 0 .55rem;
  .bottom-1 {
    float: left;
    width: 50%;
    -moz-box-sizing: border-box;
    /* Firefox */
    -webkit-box-sizing: border-box;
    /* Safari */
    border-right: $public-border solid rgba(255,255,255,0.2);
    .dec-1 {
      text-align: center;
      font-size: 0.22rem;
      color: rgba(255,255,255,0.6);
    }
    .num-1 {
      font-size: 0.32rem;
      text-align: center;
    }
  }
  .bottom-3 {
    float: left;
    width: 50%;
    .dec-3 {
      text-align: center;
      font-size: 0.22rem;
      color: rgba(255,255,255,0.6);
    }
    .num-3 {
      font-size: 0.32rem;
      text-align: center;
    }
  }
}
</style>
