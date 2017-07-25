/**
* Created by wd on 3/3/17
*
* Des: 汇赚钱介绍 改成消息推送 暂且保留页面
*
*/
<template>
	<div class="hzq-describe">
		<pb-object-top msg="汇赚钱介绍" back="true">
		</pb-object-top>
		<div class="container">
			<div class="head">汇赚钱</div>
			<div>
				<p>汇赚钱是一款理财平台产品，期限配置灵活，平台标的期限主要为15-180天资产，可根据用户资金使用需求灵活配置不同期限标的。平台资产优选市面上T0支付类、车辆质押类、二手车库存质押类、含场景消费金融类资产，坚持资产分散、类别分散、区域分散、额度分散等原则以更好的满足用户资金安全的需求。</p>
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
	.hzq-describe {
		padding-top: .88rem;
		.container {
			padding: .3rem;
			background-color: #fff;
			.head {
				text-align: center;
				font-size: .28rem;
			}
		}
	}
</style>
