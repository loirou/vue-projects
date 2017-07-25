/**
 * Created by Darren on 16/09/11.
 *
 * Desc: 测试路由
 *
 */

<template>
<div class="home">
  <pb-bck-top>
    <pb-title :mobile="mobile" ask="true"></pb-title>
    <pb-show-num :info="info"></pb-show-num>
  </pb-bck-top>
  <my-menu :coupon="coupon"></my-menu>

  <div class="ibox-swipe-body">
    <ibox-swipe :auto="4000" :prevent="false">
      <ibox-swipe-item class="bg-1" @click="activity('activity-revision')"></ibox-swipe-item>
      <ibox-swipe-item class="bg-2" @click="activity('activity-coupon')"></ibox-swipe-item>
      <ibox-swipe-item class="bg-3" @click="activity('activity-wyjh')"></ibox-swipe-item>
    </ibox-swipe>
  </div>

  <div class="scatterCont">
    <pb-object-child :item="item" v-for="item in items" class="lg">
      <pb-object-tag slot="box-center" :tag="item.tag" :status="item.status"></pb-object-tag>
      <pb-object-des slot="des" :price="item.amount" :type="item.repaymentType"></pb-object-des>
      <pb-object-line :scale="item.biddingProgress" v-if="item.status!='4'"></pb-object-line>
    </pb-object-child>
  </div>
  <home-index-object></home-index-object>
</div>
</template>

<script>
import public_ObjectChild from './common/public_ObjectChild.vue';
import public_ObjectDes from './common/public_ObjectDes.vue';
import public_ObjectTag from './common/public_ObjectTag.vue';
import public_ObjectLine from './common/public_ObjectLine.vue';

import Swipe from 'mint-ui/lib/swipe';
import SwipeItem from 'mint-ui/lib/swipe-item';
import HttpUrl from '../common/js/http-url.js';

import public_ShowNum from './common/public_ShowNum';
import public_BackgroundTop from './common/public_BackgroundTop';
import public_Title from './common/public_Title';
import my_menu from './my/my_menu';
import home_indexObject from './home/home_indexObject';


export default {
  data() {
    return {
      items: [],
      mobile: "",
      info: {
        yesterdayInterest: ":",
        totalInterest: ":",
        totalAssets: ":",
      },
      coupon: ""
    }
  },
  components: {
    "pb-object-child": public_ObjectChild,
    "pb-object-des": public_ObjectDes,
    "pb-object-tag": public_ObjectTag,
    "pb-object-line": public_ObjectLine,
    "ibox-swipe": Swipe,
    "ibox-swipe-item": SwipeItem,

    "pb-show-num": public_ShowNum,
    'pb-bck-top': public_BackgroundTop,
    'pb-title': public_Title,
    'my-menu': my_menu,
    "home-index-object": home_indexObject
  },
  ready() {
    this.init();
  },
  methods: {
    init: function() {
      this.loadData();
      this.assetsInfo();
      this.getCoupon();
    },
    loadData: function() {
      this.$http({
        method: "GET",
        url: HttpUrl.list_home
      }).then((response) => {
        if (response.data.code == 200) {
          this.items = response.data.data;
        }
      });
    },
    //汇赚钱中期我的资产数据获取
    assetsInfo: function() {
      this.$http({
        method: "GET",
        url: HttpUrl.pb_my_assets
      }).then((response) => {
        if (response.data.code == 200) {
          this.info.yesterdayInterest = String(response.data.data.freebalance);
          this.info.totalAssets = String(response.data.data.totalBalance);
          this.info.totalInterest = String(response.data.data.totalInterest);
        }
      });
    },
    getCoupon: function() {
      this.$http({
        method: "GET",
        url: `${HttpUrl.coupon_unread_count}/1`, // "http://172.21.1.205:8090/coupon-api/coupon/unread_count/1/10000"
      }).then((res) => {
        if (res.data.code == 200) {
          this.coupon = res.data.data;
        }
      })
    },

    activity: function(name) {
      router.go({
        name: name
      })
    },
  },
  events: {
    'on-back': function() {
      this.Util.Cashbox.exit();
    },
    'on-route-reload': function() {
      this.init();
    },
  }
}
</script>

<style lang="sass" scoped>
@import "../common/css/common";

.home{
	padding-bottom: $status-bottom + .14rem;
	.bg-1{
		display: block;
		width: 100%;
		height: 100%;
		background: url("../static/images/banner/banner-1.png") no-repeat;
		background-size: $custom-max-width 1.7rem;
	}
	.bg-2{
		//background: #48d58e;
		display: block;
		width: 100%;
		height: 100%;
		background: url("../static/images/banner/banner-2.png") no-repeat;
		background-size: $custom-max-width 1.7rem;
		// background-size: $custom-max-width 4rem+$status-bar-height ;
	}
	.bg-3{
		//background: #ffa022;
		display: block;
		width: 100%;
		height: 100%;
		background: url("../static/images/banner/banner-3.png") no-repeat;
		background-size: $custom-max-width 1.7rem;
		// background-size: $custom-max-width 4rem+$status-bar-height ;
	}
}
.ibox-swipe-body{
	position: relative;
	height: 1.7rem;
	margin-top:.2rem;
	background-color: #ffffff;
	// height: 4rem+$status-bar-height;
	// .ibox-swipe{
	// 	height: 4rem;
	// 	text-align: center;
	// 	border-bottom-left-radius: 3rem .5rem !important;
	//  	border-bottom-right-radius: 3rem .5rem !important;
	//  	z-index: 100;
	// }
}

.loadmore-bottom{
	font-size:.22rem;
	color:#666;
	text-align: center;
}

.home-header {
	position: absolute !important;
	background: transparent !important;
	color: #fff !important;
	border-bottom: none !important;
}





</style>
