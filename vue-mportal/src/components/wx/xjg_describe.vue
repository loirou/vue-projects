/**
* Created by wd on 6/3/17
*
* Des: 汇存钱介绍 改成消息推送 暂且保留页面
*
*/
<template>
	<pb-object-top msg="汇存钱介绍" back="true"></pb-object-top>
	<div class="xjg-describe">
		<div class="container">
			<div class="head">汇存钱</div>
			<div class="content">
				<p>汇存钱是一款活期理财产品，对接陆金所货币基金，随存随取，手续费用低。同时作为一款货币基金年化收益高达3.8%，是余额宝的数倍。未来汇和金服将会扩大产品链条，为客户提供更加多元化、多样化选择，满足客户不同的投资需求。</p>
			</div>
		</div>
	</div>
</template>

<script>
	import public_ObjectTop from '../common/public_ObjectTop.vue';

	export default {
		data() {
			return {};
		},
		components: {
			"pb-object-top": public_ObjectTop
		}
	}
</script>


<style lang="sass" scoped>
	@import "../../common/css/common";

	.xjg-describe {
		padding-top: $status-bar-height;
		.container {
			padding: .3rem;
			background-color: #fff;
			.head {
				text-align: center;
				font-size: .28rem;
				color: #000;
				font-weight: bold;
			}
			.content {
				margin-top: .3rem;
				color: #666;
				line-height: .4rem;
			}
		}
	}
</style>
