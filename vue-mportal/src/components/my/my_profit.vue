/**
 * Created by wd on 03/16/17
 *
 * Des: 我的收益页面
 *
 */

 <template>
 		<div>
 			<pb-object-top msg="我的收益" back="true" back-route="my"></pb-object-top>
 			<pb-padding-top></pb-padding-top>
 			<div class="my-profit">
 				<pb-profit-list :msg="info"></pb-profit-list>
 			</div>
 			<ul class="my-financial">
 				<pb-financial-list v-for="item in items" :profit='item' :info='info'></pb-financial-list>
 			</ul>
 		</div>
 </template>

 <script>
 	//引入头部
 	import public_ObjectTop from '../common/public_ObjectTop.vue';
 	import public_pTop from '../common/public_ptop.vue';
 	import public_ProfitList from '../common/public_ProfitList.vue';
 	import public_FinancialList from '../common/public_FinancialList.vue';
 	import http_url from '../../common/js/http-url.js';
 	export default {
 		data() {
 			return {
 				info: {
 					totalInterest: '',
 					hcqInterest: '',
 					hcqYesterayInterest: '',
 					hzqInterest: '',
 					hzqYesterdayInterest: '',
 				},
 				items: [
 					{
            yesterdayInterest: '0.00',
	 					isNumber: false,//左侧投资金额是否显示
	 					isCurrent: true,//活期理财还是活期理财，true代表定期
	 					isIcon: true, //是否显示右侧箭头
	 					data: {
	 						title: '定期理财',//左侧标题
	 						subtitle: '安心之选，收益稳健',//左侧下方副标题
	 						describe: '昨日收益'//右侧投资记录标志
	 					},
	 					routerName: 'my-history-profit', //跳转页面的路由
            currentRoute: '/my/profit',
 					}, {
            yesterdayInterest: '0.00',
	 					isNumber: false, //左侧投资金额是否显示
	 					isCurrent: false, //定期理财还是活期理财，true代表定期
	 					isIcon: true, //是否显示右侧箭头
	 					data: {
	 						title: '活期投资',//左侧标题
	 						subtitle: '10元起投 存取灵活',//左侧下方副标题
	 						describe: '昨日收益'//右侧投资记录标志
	 					},
	 					routerName: '', //跳转页面的路由
            currentRoute: '/my/profit',
 					}
 				]
 			};
 		},
 		created() {
 			this.loadData();
 		},
 		components: {
 			"pb-object-top": public_ObjectTop,
 			"pb-padding-top":public_pTop,
 			"pb-profit-list": public_ProfitList,
 			"pb-financial-list": public_FinancialList
 		},
 		methods: {
 			loadData() {
 				this.$http({
 					method: 'GET',
 					url: http_url.pb_my_receive
 				}).then((res) => {
 					if (res.data.code == 200) {
 						let hzqInterestList = '',
 						hcqInterestList = '';
 						res.data.data.bigTotal = this.handleData(res.data.data.totalInterest).bigTotal;//处理总收益大写部分
 						res.data.data.smTotal = this.handleData(res.data.data.totalInterest).smTotal;//处理总收益小写部分
 						hzqInterestList = this.handleData(res.data.data.hzqInterest);
 						res.data.data.hzqInterest = hzqInterestList.bigTotal +hzqInterestList.smTotal;//处理汇赚钱余额
 						hcqInterestList = this.handleData(res.data.data.hcqInterest);
 						res.data.data.hcqInterest = hcqInterestList.bigTotal + hcqInterestList.smTotal;//处理汇存钱余额
 						this.info = res.data.data;
 					}
 				})
 			},
 			handleData(data) {
 				if (typeof(data) != 'string') {
 					data = String(data);
 				}
 				let integer = data.split(".")[0],
 						score = data.split(".")[1];
 				if (score&&score.length>2) {
 					score.length = 2;
 				}
 				if (integer&&integer.length>3) {
 					integer = this.handleInteger(integer);
 				}
 				score = "." + score;
 				return {
 					bigTotal: integer,
 					smTotal: score
 				}
 			},
 			handleInteger(integer) {
 				let i = Math.floor(integer.length/3),
 						r = integer.length%3,
 						arr = [],
 						str = "";
 				for (; i >= 0; i--) {
 					if (i > 0) {
 						str = integer.substr(r+3*(i-1),3);
 						arr.unshift(str);
 					}else{
 						if (r > 0) {
 							str = integer.substr(0,r);
 							arr.unshift(str);
 						}
 					}
 				}
 				return arr.join(",");
 			}
 		},
 	}
 </script>

<style lang="sass" scoped>
@import "../../common/css/common";

.my-profit {
  padding-bottom: 0.55rem;
  background: url(../../static/images/profit-bg.png) no-repeat;
  background-size: $custom-max-width,2.82rem;
}
</style>
