/**
 * Created by youhy on 08/12/16.
 *
 * Des: about page
 *
 */

<template>
    <div class="about">
        <pb-object-top msg="品牌介绍" back="true"></pb-object-top>
		<pb-padding-top></pb-padding-top>
        <div class="container">
            <div class="logo"></div>
            <div class="detail">
                <div class="corp">
                    <div class="title"><i class="icon-corp"></i><span>公司介绍</span></div>
                    <div class="content">
                        <p>汇和金服信息技术有限公司，在深圳市政府的关怀和支持下，2014年开始筹备，于2015年7月在深圳注册成立，注册实缴资金1000万。汇和金服能够娴熟运用互联网与信息技术创新手段，以安全高效的风险管控体系为基础，为中小微商户与合格投资者等提供专业、高效、安全、贴心的综合性金融信息服务。汇和金服致力于通过大数据技术、优质服务及模式创新，提升金融信息服务效率，成为支付领域领先且具有深远影响力的金融信息服务平台。汇和金服拥有一支技术高超、经验丰富、精诚合作的高效率团队。</p>
                    </div>
                </div>
                <div class="prod">
                    <div class="title"><i class="icon-prod"></i><span>产品介绍</span></div>
                    <div class="content">
                        <p>汇和金服致力于向小微商户提供高价值，高效率，更安全的互联网金融信息服务。汇和金服不断深入探索用户需求，不断加强自身的业务创新能力，结合当下的大数据风控技术，不断丰富和完善产品线条，尽最大努力满足客户需求。目前汇和金服拥有拳头产品汇赚钱和汇存钱。</p>
                        <p>汇赚钱是一款理财平台产品，期限配置灵活，平台标的期限主要为15-180天资产，可根据用户资金使用需求灵活配置不同期限标的。平台资产优选市面上T0支付类、车辆质押类、二手车库存质押类、含场景消费金融类资产，坚持资产分散、类别分散、区域分散、额度分散等原则以更好的满足用户资金安全的需求。</p>
                        <p>汇存钱是一款活期理财产品，对接陆金所货币基金，随存随取，手续费用低。同时作为一款货币基金年化收益高达3.8%，是余额宝的数倍。未来汇和金服将会扩大产品链条，为客户提供更加多元化、多样化选择，满足客户不同的投资需求。</p>
                    </div>
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

	.about {
		background-color: #fff;

		.container {
			//padding-top: .88rem;
			//padding-top: $public-nav-height;
			.logo {
        		background: url('../../static/images/info-about.png') no-repeat;
        		background-size: $custom-max-width 4.17rem;
        		width: $custom-max-width;
        		height: 4.17rem;
			}
			.detail {
				margin-top: .4rem;
				padding: 0 .3rem .3rem .3rem;
				.title {
					font-size: .28rem;
					color: #f75c5c;
				}
				.prod {
					margin-top: .5rem;
				}
				.content {
					margin-top: .26rem;
				}
				.content p {
					font-family: 'PingFangSC-Light';
					font-size: .24rem;
					color: #999999;
					line-height: .38rem;
				}
			}
		}

		.icon-corp {
			display: inline-block;
			float: left;
			margin-right: .14rem;
			background: url('../../static/images/info-corp.png') no-repeat;
			background-size: .34rem .34rem;
			width: .34rem;
			height: .34rem;
		}
		.icon-prod {
			display: inline-block;
			float: left;
			margin-right: .14rem;
			background: url('../../static/images/info-prod.png') no-repeat;
			background-size: .34rem .34rem;
			width: .34rem;
			height: .34rem;
		}
	}
</style>
