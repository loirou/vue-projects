/**
* Created by gyr on 16/10/14.
* Type: 公共组件
* Des : 散标固收及首页 右侧小标题组件
*
*/

<template>
<div v-if="status != '4' " class="box-right clearfix">
  <span v-for="tag in tag" track-by="$index" class="box-tit-right" :style="{color:tag.color,borderColor:tag.color}">{{tag.text}}</span>
</div>
<div v-else class="repay clearfix">
  <span class="box-tit-repay"></span>
</div>
</template>

<script>
export default {
  props: ['tag', 'status'],
  ready() {
    this.tag = JSON.parse(this.tag);
    if (this.tag == null || this.tag[0] == undefined) {
      return
    } else {
      if (this.status == 3) {
        for (var i = 0; i < this.tag.length; i++) {
          this.tag[i].color = '#ccc';
        }
      } else {
        return
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";

.box-right {
    // margin-right: 0.3rem;
    .box-tit-right {
        // float: right;
        margin-top: 0.21rem;
        margin-left: 0.06rem;
        // border: 1px solid #ffb046;
        border-radius: 0.64rem;
        font-size: 0.16rem;
        font-weight: lighter;
        text-align: center;
        padding: 0 0.1rem;
        border-width: $public-border;
        border-style: solid;
    }

}
.repay {
    .box-tit-repay {
        position: absolute;
        right: 0;
        margin-top: -.26rem;
        width: 1.33rem;
        height: 1.24rem;
        background: url("../../static/images/repay.png") no-repeat;
        background-size: 1.33rem 1.24rem;
    }
}
</style>
