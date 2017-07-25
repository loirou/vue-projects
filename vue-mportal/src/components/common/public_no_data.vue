/**
 * created by youhaiyang on 31/12/2016
 *
 * no data
 */

<template>
<div class="no-data">
  <div class="icon"></div>
  <div class="message" v-text="msg||'暂无数据'"></div>
</div>
</template>
<script>
export default {
  props: ['msg'],
  data() {
    return {};
  }
}
</script>
<style lang="sass" scoped>
@import "../../common/css/common";
.no-data {
	background-color:#efefef;
	.icon {
		margin-left: ($custom-max-width - 2.4rem) / 2;
    background: url("../../static/images/no-data-1.png") no-repeat;
    background-size: 2.4rem 1.64rem;
    width: 2.4rem;
    height: 1.64rem;
	}
	.message {
		margin-top: .26rem;
		text-align: center;
		font-size: .24rem;
		color: #999;
	}
}
.no-data.data-2 {
	.icon {
		margin-left: ($custom-max-width - 2.6rem) / 2;
	    background: url("../../static/images/no-data-2.png") no-repeat;
	    background-size: 2.6rem 1.52rem;
	    width: 2.6rem;
	    height: 1.52rem;
	}
}
</style>
