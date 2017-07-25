/**
* Created by gyr on 17/3/17.
*
* Des: 我的-我的收益-历史收益
*
*/

<template>
	<div class="hisPro">
		<public-object-top msg="历史收益" back="true"></public-object-top>
		<pb-padding-top></pb-padding-top>
		<div class="proTitle">
			<div class="titleTop ">
				<span class="yesterdayPro">昨日收益</span>
				<span class="eyes" @click="toggleMask()" :class="{'close-eyes':user.hideAmount}"></span>
			</div>
			<div class="titleBottom">{{{profit | filterNum}}}</div>
		</div>
		<div class=proDetail>
			<div class="detailTitle">
				<span>金额(元)</span>
				<span>时间</span>
			</div>
			<mt-loadmore :top-loading-text="topLoadingText" :bottom-pull-text="bottomPullText" :bottom-drop-text="bottomDropText" :bottom-loading-text="bottomLoadingText" :top-method="loadTop" :auto-fill="autoFill" :bottom-all-loaded="allLoaded" :bottom-method="loadBottom">
				<div class="detail">
					<pb-menu-next class="detailSection" v-for="item in items"  track-by="$index">
						<span sloat="image">{{item.amount}}</span>
						<span sloat="right">{{item.DATE | getDate}}</span>
					</pb-menu-next>
				</div>
				<pb-no-more-data v-if="noPage"></pb-no-more-data>
			</mt-loadmore>
			<pb-no-data class="empty data-2" v-if="showEmpty" msg="暂无数据..."></pb-no-data>
		</div>
	</div>
</template>

<script>
import public_ObjectTop from '../common/public_ObjectTop.vue';
import public_pTop from '../common/public_ptop.vue';
import public_Menunext from '../common/public_Menunext';
import public_no_data from '../common/public_no_data.vue';
import public_no_more_data from '../common/public_no_more_data.vue';
import 'mint-ui/lib/style.css'
import Loadmore from 'mint-ui/lib/loadmore';
import http_url from '../../common/js/http-url.js';
export default {
	data() {
		let user = JSON.parse(this.Storage.get('USER')) || {};
		user.hideAmount = user.hideAmount || false;
		return {
			user: user,
			profit:"",
//			items:[
//				{amount:"7.30",time:"2017.03.06"},
//				{amount:"77.99",time:"2017.03.06"},
//				{amount:"180.55",time:"2017.03.06"},
//				{amount:"7.30",time:"2017.03.06"},
//				{amount:"7.30",time:"2017.03.06"},
//				{amount:"7.30",time:"2017.03.06"},
//				{amount:"7.30",time:"2017.03.06"},
//				{amount:"7.30",time:"2017.03.06"},
//				{amount:"7.30",time:"2017.03.06"},
//				{amount:"7.30",time:"2017.03.06"}
//			],
			showEmpty: false, //是否显示空数据图片
			items: null,
			noPage: false,
			autoFill: false, //true:全部加载 并填充容器  false:逐页加载
			bottomPullText: "上拉加载",
			bottomDropText: "释放加载",
			bottomLoadingText: null,
			page: 0,
			pagesCount: 1, //初始化总页数
			allLoaded: false, //数据是否加载完毕
			topLoadingText: "刷新中"
		}
	},
	components: {
		"public-object-top":public_ObjectTop,
		"pb-padding-top":public_pTop,
		"pb-menu-next": public_Menunext,
		"mt-loadmore": Loadmore,
		"pb-no-data": public_no_data,
		"pb-no-more-data": public_no_more_data
	},
	created() {
		this.loadData();
	},
	filters: {
		filterNum(val) {
			if(!val) return ;
			if (this.user.hideAmount) {
				return "<span style='font-size: .64rem;font-weight: normal;'>*****</span>";
			} else {
				var row = val.split(".");
				var style = '';
				style = "style='font-size: .46rem;'";
				return "<span style='font-size: .64rem;font-weight: normal;'>" + row[0] + "</span><label " + style + ">." + row[1] + "</label>";
			}
		},
		getDate: function (val){
			return (new Date(val)).Format("yyyy.MM.dd");
		}
	},
	methods : {
		toggleMask() {
			this.user.hideAmount = !this.user.hideAmount;
			this.Storage.set('USER', JSON.stringify(this.user));
		},
		loadData: function(id, refresh = false) {
			if (refresh) {
				this.page = 0;
				this.noPage = false;
			}
			if (this.page >= this.pagesCount) {
				this.noPage = true;
				this.$broadcast('onBottomLoaded', id);
				return false;
			}
			var that = this;
			this.page += 1;
			var where = {
				"paginate": {
					"pageNum": this.page,
					"pageSize": 10
				}
			};
			this.$http({
				method: "GET",
				url: http_url.pb_my_receive_his,
				params: {
					where: JSON.stringify(where)
				}
			}).then((res) => {
				if (res.data.code == 200) {
					//是否显示数据为空
					this.pagesCount = res.data.data.paginate.pagesCount; //总页数赋值
					this.showEmpty = res.data.data.paginate.totalCount == 0 ? true : false;
					this.profit = res.data.data.hzqYesterdayInterest;
					if (that.items == null || this.page == 1) {
						that.items = res.body.data.items;
					} else {
						for (var i = 0; i < res.body.data.items.length; i++) {
							that.items.push(res.body.data.items[i]);
						}
					}
					if (refresh) {
						//如果刷新 回归下拉初始位置
						this.$broadcast('onTopLoaded', id);
					} else {
						//回归上拉初始位置
						that.$broadcast('onBottomLoaded', id);
					}
				}
			});
		},
		loadTop(id) {
			//下拉刷新
			this.loadData(id, true);
		},
		loadBottom(id) {
			//上拉加载更多数据
			//this.allLoaded = true;// 若数据已全部获取完毕
			//console.log("bottom");
			this.loadData(id);
		}
	}
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";

.hisPro{
	.proTitle{
		padding: .6rem 0;
		width: 100%;
		height: 1.1rem;
		text-align: center;
		background: url("../../static/images/history-bg.png") no-repeat;
		background-size: $custom-max-width 2.3rem;
		.titleTop{
			display: inline-block;
			height:.45rem;
			line-height: .45rem;
			.yesterdayPro{
				float: left;
				font-size: .26rem;
				color: rgba(255,255,255,0.8);
			}
			.eyes{
				float: left;
				width: .31rem;
				height: .45rem;
				margin-left: 0.2rem;
				background: url('../../static/images/my-1.png') no-repeat center ;
				background-size: 0.31rem 0.21rem;
			}
			.close-eyes{
				float: left;
				width: .31rem;
				height: .45rem;
				margin-left: 0.2rem;
				background: url('../../static/images/myClose-1.png') no-repeat center ;
				background-size: 0.31rem 0.21rem;
			}
		}
		.titleBottom{
			height:.55rem;
			line-height: .55rem;
			font-size: .64rem;
			color: #fff;
		}
	}
	.proDetail{
		.detailTitle{
			height: .8rem;
			line-height: .8rem;
			background: #efefef;
			font-size: .28rem;
			color: #000;
			padding: 0 .3rem;
			:last-child{
				float: right;
			}
		}
		.detail{
			background:#fff;
			.detailSection{
				height: .44rem;
				line-height: .44rem;
				margin-left: .3rem;
				padding-right: .3rem;
				:first-child{
					font-size: .28rem;
					color: #f75c5c;
				}
				:last-child{
					float: right;
					font-size: .24rem;
					color: #666;
				}
			}
		}
	}
}
</style>
