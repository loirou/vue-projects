/**
 * Created by youhy on 12/12/16.
 *
 * Des: custom service page
 *
 */

<template>
<div class="service">
  <pb-object-top msg="客服中心" back="true"></pb-object-top>
  <pb-padding-top></pb-padding-top>
  <div class="container">
    <pb-menu-next class="head" class="clearfix">
      <div slot="image" class="icon-phone"></div>
      <div class="head-center">
        <div class="title">10109888</div>
        <div class="sub-title">周一至周日09:00-24:00</div>
      </div>
      <div class="head-right" slot="right">
        <a class="btn-phone" href="tel:10109888" target="_blank">
      		<span class="btn-icon"></span><span class="btn-text">拨打</span>
      	</a>
      </div>
    </pb-menu-next>
    <div class="detail">
      <pb-menu-next class="detail-item" v-for="item in items" track-by="$index">
        <span class="title">{{item.title}}</span>
        <span sloat="right" class="content">{{item.content}}</span>
      </pb-menu-next>
    </div>
  </div>
</div>
</template>



<script>
import public_ObjectTop from '../common/public_ObjectTop.vue';
import public_pTop from '../common/public_ptop.vue';
import public_Menunext from '../common/public_Menunext';
export default {
  data() {
    return {
      items: [{
        title: '客服微信',
        content: 'iboxpay_service_test'
      }, {
        title: '官方微信',
        content: 'h2finance_service'
      }]
    };
  },
  components: {
    "pb-menu-next": public_Menunext,
    "pb-object-top": public_ObjectTop,
    "pb-padding-top": public_pTop
  }
}
</script>
<style lang="sass" scoped>
	@import "../../common/css/common";

	.service {
		.container {
			//padding-top: .88rem;
			//padding-top: $public-nav-height;
			.head {
				background-color: #fff;
				margin-top: .3rem;
				padding: .4rem .3rem;
				.icon-phone {
					display: inline-block;
					float: left;
	        		background: url('../../static/images/service-phone.png') no-repeat;
	        		background-size: .82rem .82rem;
	        		width: .82rem;
	        		height: .82rem;
				}
				.head-center {
					float: left;
					margin-left: .3rem;
					.title {
						font-weight: bold;
						font-size: .32rem;
						color: #000;
					}
					.sub-title {
						font-size: .22rem;
						color: #666;
					}
				}
				.head-right {
					float: right;
					margin-top: .12rem;
					.btn-phone {
						display: inline-block;
						font-size: .22rem;
						color: #f75c5c;
						width: 1.2rem;
						height: .5rem;
						line-height: .5rem;
						text-align: center;
						border: $public-border solid #f75c5c;
						border-radius: .5rem;
						.btn-icon {
							display: inline-block;
							float: left;
							margin: .12rem .02rem 0 .2rem;
			        		background: url('../../static/images/dial.png') no-repeat;
			        		background-size: .26rem .26rem;
			        		width: .26rem;
			        		height: .26rem;
						}
						.btn-text {
							float: left;
						}
					}
				}
			}
			.detail {
				background-color: #fff;
				margin-top: .3rem;
				padding-left: .3rem;
				.title {
					font-size: .28rem;
					color: #000;
				}
				.content {
					float: right;
					margin-right: .3rem;
					font-size: .24rem;
					color: #cccccc;
				}
			}
		}
	}
</style>
