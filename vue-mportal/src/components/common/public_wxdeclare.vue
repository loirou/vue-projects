/**
* Created by gyr on 17/3/08.
*
* Des: 微信 卡券和银行卡说明
*
*/
<template>
<div class="declare" v-bind:style="{display:isShow}" @click="goDeclare(goMsg)">
  <div class="declare-des" v-text="des"></div>
  <div class="declare-right">
    <slot name="right"></slot>
  </div>
</div>
</template>
<script>
export default {
  props: ['des', 'goMsg', 'always'],
  data() {
    return {
      wxFlag: false,
      isShow: 'none',
      go: ''
    }
  },
  created() {
    //微信时 顶部导航去掉
    this.wxFlag = JSON.parse(this.Storage.get('wxBrowser'));
    //console.log(this.wxFlag);
    if (this.wxFlag || this.always) {
      this.isShow = 'block';
      this.go = this.goMsg;
      return
    }
  },
  methods: {
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
.declare {
    //width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    background: #fff9e3;
    border-bottom: $public-border solid #e7e7e7;
    padding: 0 0.3rem;
    .declare-des {
        float: left;
        width: 4rem;
        background: url("../../static/images/my-2.png") no-repeat left center;
        background-size: 0.28rem 0.28rem;
        font-size: 0.24rem;
        color: #666;
        padding-left: 0.4rem;
    }

    .declare-right {
        float: right;
    }
}
</style>
