/**
 * Created by Darren on 16/09/11.
 *
 * Des: 我的
 *
 */

<template>
<div class="my">
  <pb-bck-top>
    <pb-title title="我的"></pb-title>
    <pb-show-num :info="info"></pb-show-num>
  </pb-bck-top>
  <ul class="myProfit">
    <pb-financial-list v-for="item in items" :profit="item" :info="info"></pb-financial-list>
  </ul>
  <my-list></my-list>
</div>
</template>

<script>
import public_ShowNum from './common/public_ShowNum';
import public_BackgroundTop from './common/public_BackgroundTop';
import public_Title from './common/public_Title';
import public_FinancialList from './common/public_FinancialList.vue';
import my_list from './my/my_list';
import http_url from '../common/js/http-url.js';

export default {
  data() {
    return {
      info: {
        yesterdayInterest: ":",
        totalInterest: ":",
        totalAssets: ":",
        // accountId: "",
        // investorId: "",
        // isSetPwd: '',
        // isBindBank: ''
      },
      items: [{
        amount: '',
        isNumber: true, //左侧投资金额是否显示
        isCurrent: true, //活期理财还是活期理财，true代表定期
        isIcon: true, //是否显示右侧箭头
        data: {
          title: '定期投资', //左侧标题
          subtitle: '投资金额(元)', //左侧下方副标题
          describe: '投资记录' //右侧投资记录标志
        },
        routerName: 'my-invest-record',
        currentRoute: '/my',
      }, {
        amount: '',
        isNumber: true, //左侧投资金额是否显示
        isCurrent: false, //定期理财还是活期理财，true代表定期
        isIcon: false, //是否显示右侧箭头
        data: {
          title: '活期投资', //左侧标题
          subtitle: '投资金额(元)', //左侧下方副标题
          describe: '投资记录' //右侧投资记录标志
        },
        routerName: '',
        currentRoute: '/my', //小金罐
      }]
    }
  },
  components: {
    "pb-show-num": public_ShowNum,
    'pb-bck-top': public_BackgroundTop,
    'pb-title': public_Title,
    "pb-financial-list": public_FinancialList,
    'my-list': my_list
  },
  created: function() {
    this.init();
  },
  methods: {
    init: function() {
      this.getMyAssets();
      this.assetsInfo();
    },
    //汇赚钱中期我的资产数据获取 屏蔽掉了之前的数据赋值 data_processing 方法
    assetsInfo: function() {
      this.$http({
        method: "GET",
        url: http_url.pb_my_assets
      }).then((response) => {
        if (response.data.code == 200) {
          this.info.yesterdayInterest = String(response.data.data.freebalance);
          this.info.totalAssets = String(response.data.data.totalBalance);
          this.info.totalInterest = String(response.data.data.totalInterest);
          this.items[0].amount = String(response.data.data.regularInvestment);
          const currentInvestment = response.data.data.currentInvestment;
          this.items[1].amount = String(currentInvestment);
          this.items[1].isIcon = currentInvestment > 0 ? true : false;
        }
      });
    },
    getMyAssets: function() {
      this.$http({
        method: "GET",
        url: http_url.my
      }).then((res) => {
        if (res.data.code == 200) {

          var data = res.data.data;
          // this.data_processing(data);
          //通知子级组件
          this.$broadcast('on-info-change', data);
          //更新storage的数据
          var user = JSON.parse(this.Storage.get('USER'));
          user.isSetPwd = data.isSetPwd;
          user.isBindBank = data.isBindBank;
          this.Storage.set('USER', JSON.stringify(user));
        }
      });
    },
    data_processing: function(info_data) {
      this.info["yesterdayInterest"] = info_data.yesterdayInterest; //昨日收益
      this.info["totalInterest"] = info_data.totalInterest; //累计收益
      this.info["totalAssets"] = info_data.totalAssets; //总资产
    },
  },
  events: {
    'on-route-reload': function() {
      this.init();
    },
  },
}
</script>

<style lang="sass" scoped>
@import '../common/css/common.scss';

.bottom-img-container {
    position: relative;
    width: $custom-max-width;
    overflow: hidden;
}
.bottom-img-x {
    height: 1.13rem;
    width: $custom-max-width*2;
    margin-top: 0.25rem;
}
.bottom-img {
    height: 1.13rem;
    width: $custom-max-width*2;
    margin-top: 0.25rem;
    position: absolute;
    overflow: hidden;
}

.bottom-img1,
.bottom-img1-1 {
    background: url('../static/images/my-wave-01.png') no-repeat;
    background-size: $custom-max-width*2 1.13rem;
}

.bottom-img2,
.bottom-img2-1 {
    background: url('../static/images/my-wave-02.png') no-repeat;
    background-size: $custom-max-width*2 1.13rem;
}

.bottom-img3,
.bottom-img3-1 {
    background: url('../static/images/my-wave-03.png') no-repeat;
    background-size: $custom-max-width*2 1.13rem;
}

.bottom-img4,
.bottom-img4-1 {
    background: url('../static/images/my-wave-04.png') no-repeat;
    background-size: $custom-max-width*2 1.13rem;
}

$img1-timer: 10s;
$img2-timer: 20s;
$img3-timer: 30s;
$img4-timer: 50s;

.bottom-img1 {
    animation: moveout $img1-timer infinite;
    animation-timing-function: linear;
    -webkit-animation: moveout $img1-timer infinite;
    -webkit-animation-timing-function: linear;
}
.bottom-img2 {
    animation: moveout $img2-timer infinite;
    animation-timing-function: linear;
    -webkit-animation: moveout $img2-timer infinite;
    -webkit-animation-timing-function: linear;
}
.bottom-img3 {
    animation: moveout $img3-timer infinite;
    animation-timing-function: linear;
    -webkit-animation: moveout $img3-timer infinite;
    -webkit-animation-timing-function: linear;
}
.bottom-img4 {
    animation: moveout $img4-timer infinite;
    animation-timing-function: linear;
    -webkit-animation: moveout $img4-timer infinite;
    -webkit-animation-timing-function: linear;
}
.bottom-img1-1 {
    animation: movein $img1-timer infinite;
    animation-timing-function: linear;
    -webkit-animation: movein $img1-timer infinite;
    -webkit-animation-timing-function: linear;
}
.bottom-img2-1 {
    animation: movein $img2-timer infinite;
    animation-timing-function: linear;
    -webkit-animation: movein $img2-timer infinite;
    -webkit-animation-timing-function: linear;
}
.bottom-img3-1 {
    animation: movein $img3-timer infinite;
    animation-timing-function: linear;
    -webkit-animation: movein $img3-timer infinite;
    -webkit-animation-timing-function: linear;
}
.bottom-img4-1 {
    animation: movein $img4-timer infinite;
    animation-timing-function: linear;
    -webkit-animation: movein $img4-timer infinite;
    -webkit-animation-timing-function: linear;
}
@keyframes movein {
    from {
        left: -$custom-max-width*3;
    }
    to {
        left: -$custom-max-width;
    }
}
/* Safari and Chrome */
@-webkit-keyframes movein {
    from {
        left: -$custom-max-width*3;
    }
    to {
        left: -$custom-max-width;
    }
}
@keyframes moveout {
    from {
        left: -$custom-max-width;
    }
    to {
        left: $custom-max-width;
    }
}
/* Safari and Chrome */
@-webkit-keyframes moveout {
    from {
        left: -$custom-max-width;
    }
    to {
        left: $custom-max-width;
    }
}

.my {
    // margin-bottom: 1.14rem;
    padding-bottom: $status-bottom;
  .myProfit{
    margin-top: .2rem;
  }
}
</style>
