/**
 * Created by Darren on 16/10/10.
 * Type: 公共组件
 * Des : 下一页面公共组件
 *
 */
 
<template>
	<div class="property-info clearfix">
        <slot name="image"></slot>
        <slot></slot>
        <slot name="right"></slot>
    </div>
</template>

<script>
export default {
 	data () {
	 	return {
	 		msg: 'Hello from vue-loader!App!'
	 	}
 	}
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";
.property-info{
	border-bottom: $public-border solid #efefef;
	padding: 0.2rem 0;
	&:last-child{
        border-bottom: none;
    };
}
</style>
























