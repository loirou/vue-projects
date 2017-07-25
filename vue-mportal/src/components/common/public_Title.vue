/**
 * Created by Darren on 16/09/30.
 *
 * Des: 资产显示Title
 *
 */

<template>
<!-- 头部 -->
<div class="title">
  <a v-if="!isWechat" @click="exit" class="back"><span class="icon-back black"></span></a>
  <span class="title-Image" @click="go('my-account')"></span>
  <div class="title-Num" v-text="title"></div>
  <span class="title-Ask" v-show="ask" @click="go('info-note')"></span>
</div>
</template>

<script>
import Cashbox from '../../common/js/cashbox.js';
export default {
  props: ['title', 'ask'],
  data: function() {
    return {
      isWechat: this.Helper.isWechatBrowser(), // 是否微信
    }
  },
  methods: {
    go: function(msg) {
      router.go({
        name: msg
      })
    },
    exit: function() {
      Cashbox.exit();
    },
  }
}
</script>

<style lang="sass" scoped>
@import '../../common/css/common.scss';

.title {
    height: 0.88rem;
    line-height: 0.88rem;
    margin-bottom: 0.15rem;
    padding-top: 0.1rem;
    text-align: center;

    .back {
        margin-right: -.1rem;
        z-index: 20;
        position: relative;
        height: 0.63rem;
        line-height: 100%;
        width: 0.22rem;
        float: left;
        padding-top: 0.2rem;
        padding-left: 0.3rem;
        .icon-back {
            display: inline-block;
            background-size: 0.22rem 0.42rem;
            background-repeat: no-repeat;
            height: 0.42rem;
            position: relative;
            width: 0.22rem;
            background-image: url('../../static/images/left-back-white.png');
        }
    }
    .title-Image {
        float: left;
        width: 0.6rem;
        height: 0.6rem;
        background: url('../../static/images/my-5.png') no-repeat;
        background-size: 0.6rem 0.6rem;
        margin-left: 0.3rem;
        //border: 0.03rem solid rgba(255,255,255,0.6);
        //border-radius: 0.6rem;
        margin-top: 0.1rem;
    }
    .title-Num {
        position: absolute;
        float: left;
        margin-left: 1.32rem;
        width: $custom-max-width - 2*1.32rem;
        letter-spacing: 0.05rem;
        font-size: 0.36rem;
        color: #fff;
    }
    .title-Ask {
        float: right;
        width: 0.8rem;
        height: 100%;
        background: url('../../static/images/my-7.png') no-repeat 0 0.25rem;
        background-size: 0.43rem 0.37rem;
    }
    .title-CallBack-Info {
        float: right;
        display: inline-block;
        height: 100%;
        .info-Imge {
            float: left;
            width: 0.8rem;
            height: 100%;
            display: inline-block;
            background: url('../../static/images/my-7.png') no-repeat 0 0.25rem;
            background-size: 0.43rem 0.37rem;
        }
        .info-Num {
            float: left;
            width: 0.24rem;
            height: 0.24rem;
            display: inline-block;
            background: url('../../static/images/my-6.png');
            background-size: 0.24rem 0.24rem;
            position: absolute;
            right: 0.3rem;
            top: 0.1rem;
            color: #ffffff;
            font-size: 0.2rem;
            text-align: center;
            line-height: 0.235rem;
        }
    }
}
</style>
