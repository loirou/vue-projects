/**
* Created by Darren on 16/11/02.
*
* Des: 输入密码
*
*/

<template>
<div class="corroboration">
  <div class="input clearfix">
    <span></span>
    <input type="password" placeholder="请输入资金密码" v-model="password">
  </div>
  <div class="commit">
    <pb-button @click="go_next_page">
      安全验证
    </pb-button>
  </div>
</div>
</template>
<script>
import public_ObjectTop from '../common/public_ObjectTop.vue';
import public_button from '../common/public_button.vue';
export default {
  data() {
    return {
      password: ""
    }
  },
  components: {
    "pb-object-top": public_ObjectTop,
    "pb-button": public_button
  },
  methods: {
    go_next_page: function() {
      this.$dispatch('clickNextPage', this.password);
    }

  }
}
</script>
<style lang="sass" scoped>
@import "../../common/css/common";
.corroboration {
    .input{
        background-color: #ffffff;
        span{
            float: left;
            // width: .48rem;
            width: 1.18rem;
            height: .8rem;
            background: url("../../static/images/password-1.png") no-repeat .3rem .16rem;
            background-size: .48rem .48rem;
            // margin-left: .3rem;
        }
        input{
            float: left;
            width: 80%;
            max-width: $custom-max-width - 1.18rem;
            height: .48rem;
            line-height: .48rem;
            font-size: .26rem;
            border: none;
            margin-top: .16rem;
        }
    }
    .commit{
        margin-top: .8rem;
        text-align: center;
    }
}
</style>
