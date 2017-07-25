/**
* Created by JOJO on 17/03/20.
*
* Des: 首页 精选活期
*
*
*
*/

<template>
<div id="home-indexObject">
  <div class="homeTop">
    <span>精选活期</span>
    <span>灵活 安全 高收益</span>
  </div>
  <div class="indexObject clearfix" @click="gotoHcq()">
    <div class="objectLeft">
      <p>汇存钱 · 小金贯</p>
      <div class="">
        <span>灵活存取</span>
        <span>10元起投</span>
      </div>
    </div>
    <div class="objectRight">
      <p v-text="rate"></p>
      <div>七日年化收益率(%)</div>
    </div>
  </div>
</div>
</template>


<script>
import HttpUrl from '../../common/js/http-url.js';

export default {
  data() {
    return {
      rate: '3.80'
    }
  },
  methods: {
    gotoHcq: function() {
      let cashboxToken = this.Storage.get('CASHBOX_TOKEN');
      window.location.href = `${HttpUrl.hcq}?token=${cashboxToken}&from=/home&r=${Math.random()}`;
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";

#home-indexObject {
    padding: .2rem 0;
    background: #ffffff;
    margin-top: .2rem;
    .homeTop {
        height: .91rem;
        line-height: .91rem;
        padding: 0 .3rem;
        border-bottom: $public-border solid #efefef;
        span {
            font-size: .26rem;
            color: #999;
        }
        :first-child {
            font-size: .3rem;
            font-weight: bold;
            color: #000;
            padding-right: .2rem;

        }
    }
    .indexObject {
        height: 1.6rem;
        padding: 0 .3rem;
        .objectLeft {
            text-align: left;
            float: left;
            div{
                margin-top: 0.08rem;
            }
            p {
                font-size: .28rem;
                color: #333;
                margin-top: 0.5rem;
            }
            span {
                font-size: .2rem;
                color: #f75c5c;
                padding: 0 .1rem;
                border: $public-border solid #f75c5c;
                -moz-border-radius: .5rem;
                -webkit-border-radius: .5rem;
                border-radius: .5rem;
            }
        }
        .objectRight {
            text-align: right;
            font-size: .28rem;
            float: right;
            color: #ccc;
            margin-top: .3rem;
            p {
                font-size: .6rem;
                color: #f75c5c;
            }
            div{
                margin-top: -0.09rem;
                font-size: .24rem;
            }
        }
    }
}

</style>
