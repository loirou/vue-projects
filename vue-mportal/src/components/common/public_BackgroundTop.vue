/**
 * Created by Darren on 16/09/30.
 *
 * Des: 资产显示Top背景
 *
 */

<template>
<div class="my-Top clearfix">
  <div class="point">
    <slot></slot>
  </div>
</div>
</template>

<style lang="sass" scoped>
@import "../../common/css/common";
.my-Top{
	// padding-top: $status-bar-height;
	padding-bottom: .6rem;
	color: #ffffff;
	background: url('../../static/images/home-bg.png') no-repeat;
	.point{
		// padding-bottom: .6rem;
		// height: 100%;
		// background: url('../../static/images/my-4.png') repeat;
		// background-size: 5.48rem 2.76rem;
	}
}

</style>
