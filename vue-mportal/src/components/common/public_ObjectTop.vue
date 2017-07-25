/**
* Created by gyr on 16/10/08.
*
* Des: 公共顶部
*
*/
<template>
<div id='public-ObjectTop' class="top" v-bind:style="{display:flag}">
  <a v-if="showBack" @click="goBack" class="back"><span class="icon-back" :class="backCls"></span></a>
  <h1 v-cloak>{{msg}}</h1>
  <span class="top-right">
    <slot name="right"></slot>
  </span>
  <!-- <span v-if="icon" class="bankIcon" @click="goDeclare('declare')"></span>
  <span v-if="coupon" class="bankIcon" @click="goDeclare('coupon-declare')"></span> -->
</div>
</template>
<script>
export default {
  props: ['msg', 'back', 'backRoute', 'icon', 'mode', 'selfBack', 'coupon'],
  data() {
    return {
      wxFlag: false,
      flag: 'block'
    }
  },
  created() {
    //微信时 顶部导航去掉
    this.wxFlag = JSON.parse(this.Storage.get('wxBrowser'));
    //console.log(this.wxFlag);
    if (this.wxFlag) {
      this.flag = 'none';
      return
    }
  },
  computed: {
    showBack: function() {
      return (this.back || this.selfBack) ? true : false;
    },
    backCls: function() {
      return this.mode == 'white' ? 'white' : 'black';
    }
  },
  methods: {
    goBack: function() {
      //广播事件
      if (this.selfBack) {
        this.$dispatch('on-back');
        return false;
      }
      //是否定义返回到具体路由
      if (this.backRoute) {
        router.go({
          name: this.backRoute
        });
        return false;
      }
      history.back();
    },
    goDeclare: function(msg) {
      router.go({
        name: msg
      });
    }
  }
}
</script>
<style lang="sass" scoped>
@import "../../common/css/common";
.top {
    //display: none;
    padding-top: $status-bar-height;
    z-index: 998;
    position: fixed;
    top: 0;
    width: 100%;
    max-width: $custom-max-width;
    height: 0.88rem;
    line-height: 0.88rem;
    background: #fff;
    text-align: center;
    border-bottom: $public-border solid #efefef;
    h1 {
        position: absolute;
        width: 100%;
        font-size: 0.36rem;
    };
    .back {
        z-index: 20;
        position: relative;
        height: 0.63rem;
        line-height: 100%;
        width: 0.22rem;
        float: left;
        padding-top: 0.23rem;
        padding-left: 0.3rem;
        padding-right: .3rem;
        .icon-back {
            display: inline-block;
            background-size: 0.22rem 0.42rem;
            background-repeat: no-repeat;
            height: 0.42rem;
            position: relative;
            width: 0.22rem;
        }
        .icon-back.black {
            background-image: url('../../static/images/left-back.png');
        }
        .icon-back.white {
            background-image: url('../../static/images/left-back-white.png');
        }
    }
    .top-right {
        z-index: 20;
        position: relative;
        float: right;
        margin-right: 0.3rem;
        // margin-top: 0.23rem;
    }
    .bankIcon {
        z-index: 20;
        position: relative;
        float: right;
        padding-top: 0.23rem;
        padding-left: 0.3rem;
        padding-right: .3rem;
        width: 0.42rem;
        height: 0.42rem;
        background: url("../../static/images/bankwh.png") no-repeat;
        background-size: 0.42rem 0.42rem;
    }
}
</style>
