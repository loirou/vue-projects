/**
* Created by gyr on 16/10/26.
*
* Des: 散标固收及首页 每个标的详情描述(一次性还本付息)小组件
*
*/
<template>
<ul class="box-bottom clearfix">
  <li>
    <span class="sb-sand">{{handleType}}</span>
  </li>
  <li>
    <span class="sb-snap">融资金额 <span class="start-amount">{{price}}元</span></span>
  </li>
</ul>
</template>

<script>
export default {
  props: ['price', 'type'],
  data() {
    return {}
  },
  computed: {
    handleType: function() {
      var typeDes = '';
      switch (this.type) {
        case 'ETP':
          typeDes = '等额本息还款';
          break;
        case 'EPP':
          typeDes = '等本还款';
          break;
        case 'IOP':
          typeDes = '每期偿还利息';
          break;
        case 'SPM':
          typeDes = '到期还本付息';

      }
      return typeDes;
    }
  }
}
</script>

<style lang="sass" scoped>
.box-bottom {
    font-family: PingFangSC-Light;
    padding: 0.11rem 0 0.08rem;
    li {
        line-height: 0.24rem;
        width: 50%;
        float: left;
        font-size: 0.24rem;
        color: #666666;
        .sb-sand {
            margin-left: 0.3rem;
            background: url("../../static/images/scatter/h-a-1.png") no-repeat;
            background-position: 0 -0.01rem;
            display: inline-block;
            height: 0.3rem;
            line-height: 0.3rem;
            padding-left: 0.4rem;
            background-size: 0.3rem 0.3rem;
        }
        .sb-snap {
            float: right;
            margin-right: 0.3rem;
            padding-left: 0.4rem;
            background: url("../../static/images/scatter/h-a-2.png") no-repeat;
            background-position: 0 -0.01rem;
            background-size: 0.3rem 0.3rem;
            height: 0.3rem;
            line-height: 0.3rem;
        }
        .start-amount {
            color: #f75959;
        }
    }
}
</style>
