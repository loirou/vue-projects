/**
* Created by gyr on 16/10/11.
*
* Des: 我的-资产一览页面
*
*/
<template>
<public-object-top msg="资产一览" back="true"></public-object-top>
<pb-padding-top></pb-padding-top>
<div class="assetsCont">
  <my-asset-svg v-if="items.length" :items="items" :total="totalNum"></my-asset-svg>
</div>
<div class="section">
  <div class="property">
    <my-asset-child :item="item" v-for="item in items" track-by="$index"></my-asset-child>
  </div>
</div>
</template>
<script>
import public_ObjectTop from '../common/public_ObjectTop.vue';
import public_pTop from '../common/public_ptop.vue';
import my_assetSvg from './my_assetSvg.vue';
import my_assetChild from './my_assetChild.vue';

import http_url from '../../common/js/http-url.js';

export default {
  data() {
    return {
      items: [],
      // amountInfo: {
      //   freeBalance: 0, // 可用金额
      //   frozenBalance: 0, // 冻结金额
      //   interestBalance: 0, // 待收利息
      //   principalBalance: 0, // 待收本金
      //   totalInterest: 0, // 累计收益
      //   ztBalance: 0, // 在途金额
      //   hcqBalance: 0, // 汇存钱余额
      // },
      accountId: "",
      totalNum: 0,
    }
  },
  components: {
    "public-object-top": public_ObjectTop,
    "pb-padding-top": public_pTop,
    "my-asset-svg": my_assetSvg,
    "my-asset-child": my_assetChild
  },
  created() {
    this.accountId = this.$route.params.accountId;
    this.loadData();
  },
  methods: {
    loadData: function() {
      this.$http({
        method: "GET",
        url: http_url.list_assets
      }).then((res) => {
        if (res.data.code == 200) {
          const amountObj = res.data.data;
          this.amountInfo = amountObj;
          let total = 0;
          total += amountObj.freeBalance;
          total += amountObj.frozenBalance;
          total += amountObj.interestBalance;
          total += amountObj.principalBalance;
          total += amountObj.totalInterest;
          total += amountObj.ztBalance;
          total += amountObj.hcqBalance;
          this.totalNum = total;

          let amountItems = [{
            code: 'KYJE',
            title: '可用金额',
            amount: amountObj.freeBalance.toFixed(2),
          }, {
            code: 'DJJE',
            title: '冻结金额',
            amount: amountObj.frozenBalance.toFixed(2),
          }, {
            code: 'DSBJ',
            title: '待收本金',
            amount: amountObj.principalBalance.toFixed(2),
          }, {
            code: 'DSLX',
            title: '待收利息',
            amount: amountObj.interestBalance.toFixed(2),
          }, {
            code: 'LJSY',
            title: '累计收益',
            amount: amountObj.totalInterest.toFixed(2),
          }, {
            code: 'ZTJE',
            title: '在途金额',
            amount: amountObj.ztBalance.toFixed(2),
          }, {
            code: 'HCQ',
            title: '汇存钱',
            amount: amountObj.hcqBalance.toFixed(2),
          }, ];
          this.items = amountItems;
        }
      });
    }
  }
}
</script>
<style lang="sass" scoped>
@import "../../common/css/common";

.assetsCont {
  padding-top: $status-bar-height;
  background: #fff;
}
.section {
  margin-top:.3rem;
  .section-title {
    font-size: 0.22rem;
    color: #999;
    padding-left: 0.3rem;
  }
  .property {
    margin-top: .16rem;
    background: #fff;
  }
}
</style>
