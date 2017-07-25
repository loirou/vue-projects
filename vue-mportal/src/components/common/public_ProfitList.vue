/**
 * Created bu wd on 03/20/17
 *
 * Des: 我的收益顶部
 *
 */

 <template>
 	<div class="profit-total">
 		<div class="title">
 			<span class="title-center">总收益(元)</span>
 			<span :class="{'open-eye': (!user.hideAmount), 'close-eye': user.hideAmount}" @click="openCloseEye"></span>
 		</div>
 		<div class="title title-big">
 			<span class="money-big" v-show="!user.hideAmount" v-text="msg.bigTotal"></span>
 			<span class="money-big" v-show="user.hideAmount" v-text="bigTotalMk"></span>
 			<span class="money-sm" v-show="!user.hideAmount" v-text="msg.smTotal"></span>
 			<span class="money-sm" v-show="user.hideAmount" v-text="smTotalMK"></span>
 		</div>
 	</div>
 	<div class="profit-list clearfix">
 		<div class="list-left" @click="goto('my-history-profit')">
 			<span class="list-center">定期收益(元)</span>
 			<span class="money-md" v-show="!user.hideAmount" v-text="msg.hzqInterest"></span>
 			<span class="money-md" v-show="user.hideAmount" v-text="hzqInterestMk"></span>
 		</div>
 		<div class="list-right" @click="goto('')">
 			<span class="list-center">活期收益(元)</span>
 			<span class="money-md" v-show="!user.hideAmount" v-text="msg.hcqInterest"></span>
 			<span class="money-md" v-show="user.hideAmount" v-text="hcqInterestMk"></span>
 		</div>
 	</div>
 </template>

<script type="text/babel">
import AccountService from '../../services/account.js';
import HttpUrl from '../../common/js/http-url.js';

export default {
  props: ['msg'],
  data() {
    let user = JSON.parse(this.Storage.get('USER')) || {};
    return {
      totalprofit: '',
      bigTotalMk: '*****',
      smTotalMK: '',
      hzqInterestMk: '*****',
      hcqInterestMk: '*****',
      user: user
    };
  },
  methods: {
    //页面跳转
    goto: function(routername) {
      let cashboxToken = this.Storage.get('CASHBOX_TOKEN');
      if (routername) {
        router.go({
          name: routername
        })
      } else {
        window.location.href = `${HttpUrl.hcq}?token=${cashboxToken}&from=/my/profit&r=${Math.random()}`;
      }
    },
    //控制眼睛的开关
    openCloseEye() {
      this.user.hideAmount = !this.user.hideAmount;
      this.Storage.set('USER', JSON.stringify(this.user));
      // 通知父组件隐藏金额(其他组件也需要显示、隐藏金额的功能)
      this.$dispatch('dispatch-toggle-money-mask', this.user.hideAmount);
      
      AccountService.setAmountHiddenState({
        ignoreError: true,
        body: {
          hide: this.user.hideAmount
        }
      }).then((res) => {
        if (res.data.code !== 200) {
          this.user.hideAmount = !this.user.hideAmount;
          this.Storage.set('USER', JSON.stringify(this.user));
        }
      }, (err) => {
        this.user.hideAmount = !this.user.hideAmount;
        this.Storage.set('USER', JSON.stringify(this.user));
      });
    }
  }
}
</script>


<style lang="sass" scoped>
	.profit-total {
		padding-top: 0.44rem;
		padding-bottom: 0.36rem;
		.title {
			text-align: center;
			.title-center {
				margin-right: 0.2rem;
				display: inline-block;
				vertical-align: middle;
				font-size: 0.26rem;
				color: rgba(255,255,255,0.8);
				text-align: center;
			}
			.open-eye {
				margin-top: 0.02rem;
				display: inline-block;
				vertical-align: middle;
				width: 0.31rem;
				height: 0.21rem;
				background: url('../../static/images/my-1.png') no-repeat 0 0;
				background-size: 0.31rem 0.21rem;
			}
			.close-eye {
				margin-top: 0.02rem;
				display: inline-block;
				width: 0.31rem;
				height: 0.28rem;
				vertical-align: middle;
				background: url('../../static/images/myClose-1.png') no-repeat 0 0;
				background-size: 0.31rem 0.21rem;
			}
			.money-big {
				font-size: 0.64rem;
				color: #fff;
				line-height: 0.7rem;
			}
			.money-sm {
				font-size: 0.46rem;
				color: #fff;
			}
		}
		.title-big {
			height: 0.64rem;
		}
	}
	.profit-list {
		padding: 0 0.55rem;
		.list-left{
			float: left;
			width: 50%;
			text-align: center;
			-webkit-box-sizing: border-box;
				 -moz-box-sizing: border-box;
				 			box-sizing: border-box;
		}
		.list-right {
			float: left;
			width: 50%;
			text-align: center;
			border-left: 1px solid rgba(255,255,255,0.2);
			-webkit-box-sizing: border-box;
			   -moz-box-sizing: border-box;
			  			box-sizing: border-box;
		}
		.list-center {
			display: block;
			font-size: 0.22rem;
			color: rgba(255,255,255,0.8);
		}
		.money-md {
			display: block;
			font-size: 0.32rem;
			color: #fff;
			height: 0.4rem;
			line-height: 0.4rem;

		}
	}
</style>
