/**
 * Created by youhy on 09/12/16.
 *
 * Des: security page
 *
 */

<template>
    <div class="qa">
        <pb-object-top msg="常见问题" back="true"></pb-object-top>
        <pb-padding-top></pb-padding-top>
        <div class="container">
        	<div class="content">
            	<qa-item class="qa-item" v-for="item in items" :qa.sync="item"></qa-item>
            </div>
        </div>
    </div>
</template>


<script>
import qa_item from './qa_item.vue';
import public_ObjectTop from '../common/public_ObjectTop.vue';
import public_pTop from '../common/public_ptop.vue';
export default {
    data() {
        return {
        	items: [{
        		bg: 'clock',
        		title: '1、汇和金服理财是一个什么样的平台？',
        		content: '汇和金服将严谨的风控管理体系和全新的经营理念融合为一体，以互联网为依托、以客户为中心、以诚信为基石，致力于为全国几十万盒子支付用户提供一站式金融服务，搭建一个稳健可靠的金融信息服务平台。',
        		expanded: false
        	},{
        		bg: 'clock',
        		title: '2、我的资金安全吗？',
        		content: '汇和金服的互联网金融产品均符合央行最近出台的指导意见，资金均托管在银行，确保了资金的安全性、合规性。',
        		expanded: false
        	},{
        		bg: 'clock',
        		title: '3、可以用信用卡充值吗？',
        		content: '汇和金服的平台只接受借记卡充值，支持全国绝大多数银联借记卡。',
        		expanded: false
        	},{
        		bg: 'clock',
        		title: '4、一次最多可以充多少钱？',
        		content: '在汇和金服平台充值，单次额度最多10万，单日不限总额；',
        		expanded: false
        	},{
                bg: 'clock',
                title: '5、充值后，资金多久到账？',
                content: '资金T+1到账，正常情况下在第一个工作日14：00前到账。',
                expanded: false
            },{
                bg: 'clock',
                title: '6、投标之前，需要准备什么？',
                content: '为了保障您的资金安全，在您做任何资金相关的操作时，需输入资金密码；投标之前需先在“我的账户”—“设置”中设置资金密码，用以后续投标、提现等。',
                expanded: false
            },{
                bg: 'clock',
                title: '7、投标成功后，何时开始计息？',
                content: 'T+1计息；售罄后的第一个工作日开始计息，到期还本付息。',
                expanded: false
            },{
                bg: 'clock',
                title: '8、如何返息，何时返还本金？',
                content: '汇赚钱标的的返息标准为到期还本付息模式，即当您购买一支标的后，标的周期到期后的第一个工作日，会将该标的的本金及利息返还至您的余额中。',
                expanded: false
            },{
                bg: 'clock',
                title: '9、在封闭期内是否可以支取本金？',
                content: '封闭期内不可支取本金，需等到产品约定的到期日才可支取本金。',
                expanded: false
            },{
                bg: 'clock',
                title: '10、 提现前需要绑定银行卡吗？',
                content: '提现前需绑定银行卡，银行卡户主名必须与实名认证的用户名完全相同。',
                expanded: false
            },{
                bg: 'clock',
                title: '11、提现到账时间？',
                content: '最迟T+2到账。',
                expanded: false
            },{
                bg: 'clock',
                title: '12、提现后会有短信提醒吗？',
                content: '有的，在售罄后、资金回款时、充值到账及提现成功时，均会有短信通知。',
                expanded: false
            },{
                bg: 'clock',
                title: '13、年化收益是什么概念？',
                content: '年化收益率是把当前收益率（日收益率、周收益率、月收益率）换算成年收益率来计算的，是一种理论收益率。比如您投资了100000元购买一款年化收益率10%，投资周期60天的理财产品，60天后，您的实际收益约为1643.8元（100000*10%365*60）。',
                expanded: false
            },{
                bg: 'clock',
                title: '14、还没办理盒子POS机可以购买产品吗？',
                content: '新版汇赚钱上线后，除了原本通过盒子支付POS机充值外，我们还增加了绑定银行卡充值的功能，需要您绑定支持银行的借记卡进行绑卡充值。此外，我们正在积极开发新的支付方式，在不久的未来，我们将开放网银支付的方式，绑卡即可完成充值。',
                expanded: false
            },{
                bg: 'clock',
                title: '15、是否可以转让？是否可以提前退出？',
                content: '不可以转让，不可以提前退出。',
                expanded: false
            },{
                bg: 'clock',
                title: '16、购买标的是否有手续费，如何计算？',
                content: '购买标的没有手续费，但充值时，每笔充值将由支付平台收取0.5%的手续费，活动期间充值手续费全免。如需提现，每笔提现手续费25元封顶。盒子理财每笔充值和提现额度为100000以内，但由于不同银行卡规则不同，额度由银行卡充值提现额度为准。',
                expanded: false
            }]
        };
    },
    components: {
        "pb-object-top": public_ObjectTop,
        "qa-item": qa_item,
        "pb-padding-top":public_pTop
    }
}
</script>
<style lang="sass" scoped>
	@import "../../common/css/common";

	.qa {
		background-color: #fff;

		.container {
            font-family: 'PingfangSC-Light';
			//padding-top: .88rem;
			//padding-top: $public-nav-height;
			.content {
				padding: 0 0 0 .3rem;
                .qa-item {
                    border-bottom: $public-border solid #efefef;
                }
                :last-child {
                    border-bottom: 0;
                }
			}
		}

	}
</style>
