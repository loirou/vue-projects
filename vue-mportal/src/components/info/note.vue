/**
 * Created by youhy on 09/12/16.
 *
 * Des: security page
 *
 */

<template>
<div class="note">
  <pb-object-top msg="特别说明" back="true"></pb-object-top>
  <pb-padding-top></pb-padding-top>
  <div class="container">
    <div class="logo"></div>
    <div class="content">
      <note-item class="note-item" v-for="item in items" :note="item"></note-item>
    </div>
  </div>
</div>
</template>


<script>
import public_ObjectTop from '../common/public_ObjectTop.vue';
import note_item from './note_item.vue';
import public_pTop from '../common/public_ptop.vue';
export default {
  data() {
    return {
      items: [{
        title: '升级说明',
        content: `汇赚钱升级至1.1版本<br/>
          此次升级内容包括：<br/>
          1.整合定期理财和活期理财（汇存钱），汇存钱在钱盒中的入口仍会保留一段时间；<br/>
          2.理财中心以钱包的样式呈现，进入汇赚钱后，用户即可看到账户中的总资产、账户余额、收益等信息，同时将账户功能入口放在首页面，方便用户对个人理财账户的管理；<br/>
          3.个人中心中除了个人信息的查询外，新增了活期、定期理财的记录及历史收益等信息；<br/>
          4.标的样式上的微调；<br/>
          5.解决了一些历史遗留的Bug。
        `,
        date: '2017.05.24'
      }, {
        title: '2017年春节期间提现到账时间通知',
        content: '2016年9月30日（周五）00:00至2016年10月7日24:00（周五）发起的提现预计将于2016年10月8日（周六）到账。给您带来的不便，我们深表歉意！感谢您对我公司的大力支持，谢谢！',
        date: '2016.12.31'
      }, {
        title: '风险提示',
        content: '聚诚宝项目筹集资金用于深圳盒子支付信息技术有限公司特约商户的T+1应收银联清算资金之用。为保障投资人的利益，易安财产保险股份有限公司为本产品提供信用保证保险。若转让方未能履行回购义务，易安保险将对投资人的本金和利息提供100%全额赔付，最大限度保护投资人利益。',
        date: '2016.12.18'
      }, {
        title: '系统维护通知',
        content: '由于恒丰银行系统维护升级，导致2016年9月8日8:00-18:00平台暂不支持提现操作。请您避开该时段进行提现操作。给您带来的不便，我们深表歉意！感谢您对我公司的大力支持，谢谢！',
        date: '2016.12.15'
      }, {
        title: '提现说明',
        content: '您提出提现请求，汇和金服会在1个工作日内进行审核，如遇到双休日或是法定节假日将会顺延。',
        date: '2016.12.13'
      }]
    };
  },
  components: {
    "pb-object-top": public_ObjectTop,
    "note-item": note_item,
    "pb-padding-top": public_pTop
  }
}
</script>
<style lang="sass" scoped>
	@import "../../common/css/common";

	.note {
		background-color: #fff;

		.container {
            font-family: 'PingfangSC-Light';
			//padding-top: .88rem;
			//padding-top: $public-nav-height;
            $logo-left: ($custom-max-width - 4.02rem)/2;
            .logo {
                display: inline-block;
                margin: .4rem $logo-left .35rem $logo-left;
                background: url('../../static/images/info-note.png') no-repeat;
                background-size: 4.02rem 1.26rem;
                width: 4.02rem;
                height: 1.26rem;
            }
			.content {
				padding: 0 .3rem .2rem .3rem;
                .note-item {
                    margin-bottom: .3rem;
                }
                :last-child {
                    border-bottom: 0;
                }
			}
		}

	}
</style>
