/**
 * Created by youhy on 09/12/16.
 *
 * Des: security page
 *
 */

<template>
    <div class="security">
        <pb-object-top msg="安全保障" back="true"></pb-object-top>
		<pb-padding-top></pb-padding-top>
        <div class="container">
            <div class="logo"></div>
            <div class="content">
                <div class="section">
                	<span class="icon icon1"></span>
                	<span class="text">资产配置更安全，平台资产优选市面上T0支付类、车辆质押类、二手车库存质押类、含场景消费金融类资产，坚持资产分散、类别分散、区域分散、额度分散 等原则以更好的满足用户资金安全的需求</span>
                </div>
                <div class="section">
                	<span class="icon icon2"></span>
                	<span class="text">第三方保证配置更放心，平台引入第三方保险公司、担保公司为平台资产提供第三方履约保证或担保，以更好地满足用户资金避险的需求</span>
                </div>
                <div class="section">
                	<span class="icon icon3"></span>
                	<span class="text">平台同时设立风险保证金及备用金专用账户，当风险发生时，依次计提保证金账户、备用金账户中资金用于资金兑付
平台即将引入银行资金存管，避免平台道德风险</span>
                </div>
                <div class="section">
                	<span class="icon icon4"></span>
                	<span class="text">平台采用用户大数据分析系统，根据用户购买习惯，合理 为每个用户打造独一无二的界面展示，成功解决行业标的展示痛点，增加标的购买效率</span>
                </div>
                <div class="section">
                	<span class="icon icon5"></span>
                	<span class="text">平台开创“避雷针”体系，即产品账务风险分散原则，即每个独立的产品均由独立的财务体系及账户进行单独核算，减少单个产品运营不善对整个平台及其他用户的影响</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import public_ObjectTop from '../common/public_ObjectTop.vue';
import public_pTop from '../common/public_ptop.vue';
export default {
    data() {
        return {

        };
    },
    components: {
        "pb-object-top": public_ObjectTop,
		"pb-padding-top":public_pTop
    }
}
</script>
<style lang="sass" scoped>
	@import "../../common/css/common";

	.security {
		background-color: #fff;

		.container {
			//padding-top: .88rem;
			//padding-top: $public-nav-height;
			.logo {
        		background: url('../../static/images/security.jpg') no-repeat;
        		background-size: $custom-max-width 4.17rem;
        		width: $custom-max-width;
        		height: 4.17rem;
			}
			.content {
				padding: .1rem .3rem;
				.section {
					font-size: .24rem;
					color: #666666;
					font-family: 'PingFangSC-Light';
					border-bottom: $public-border solid #efefef;
					padding: .3rem 0;
					.icon { 
						display: inline-block;
						float: left;
						margin-right: .2rem;
					}
					.icon1 {
		        		background: url('../../static/images/security1.png') no-repeat;
		        		background-size: .32rem .4rem;
		        		width: .32rem;
		        		height: .4rem;
					}
					.icon2 {
		        		background: url('../../static/images/security2.png') no-repeat;
		        		background-size: .32rem .32rem;
		        		width: .32rem;
		        		height: .32rem;
					}
					.icon3 {
		        		background: url('../../static/images/security3.png') no-repeat;
		        		background-size: .32rem .32rem;
		        		width: .32rem;
		        		height: .32rem;
					}
					.icon4 {
		        		background: url('../../static/images/security4.png') no-repeat;
		        		background-size: .32rem .32rem;
		        		width: .32rem;
		        		height: .32rem;
					}
					.icon5 {
		        		background: url('../../static/images/security5.png') no-repeat;
		        		background-size: .32rem .32rem;
		        		width: .32rem;
		        		height: .32rem;
					}
					.text {
						display: inline-block;
						line-height: .38rem;
						width: $custom-max-width - .3rem - .32rem - .2rem - .3rem;
					}
				}
				:last-child{
	                border-bottom: none;
	            }
			}
		}

	}
</style>
