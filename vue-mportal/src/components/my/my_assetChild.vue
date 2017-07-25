/**
* Created by gyr on 16/10/12.
* Type:非公共组件
* Des: 我的-资产一览 list组件
*
*/

<template>
<pb-menu-next class="totalList">
  <span sloat="image" class="list {{'dot-'+item.code}}"></span>
  <span class="listLeft">{{item.title}}</span>
  <span sloat="right" class="listRight">{{item.amount}}</span>
</pb-menu-next>
</template>

<script>
import public_Menunext from '../common/public_Menunext';

export default {
  props: ['item'],
  data() {
    return {
    }
  },
  filters: {
    getType(title) {
      var className = '';
      switch (this.item.title) {
        case '可用金额':
          className = 'listKY';
          break;
        case '冻结金额':
          className = 'listDJ';
          break;
        case '待收本金':
          className = 'listDSBJ';
          break;
        case '待收利息':
          className = 'listDSLX';
          break;
        case '累计收益':
          className = 'listLJ';
          break;
        case '在途金额':
          className = 'listZT';
          break;
      }
      return className;
    }
  },
  components: {
    "pb-menu-next": public_Menunext
  }
}
</script>

<style lang="sass" scoped>
.totalList {
    padding-right: 0.3rem;
    height: 0.47rem;
    width: 5.8rem;
    margin-left: 0.3rem;

    .list {
        float: left;
        margin-top: 0.15rem;
        border-radius: 0.24rem;
        width: 0.12rem;
        height: 0.12rem;
    }

    .dot-KYJE {
      background: #fe5556;
    }
    .dot-LJSY {
      background: #eb87bf;
    }
    .dot-DSLX {
      background: #3cbdd1;
    }
    .dot-DSBJ {
      background: #ffe0b2;
    }
    .dot-DJJE {
      background: #ffb74d;
    }
    .dot-ZTJE {
      background: #75aef5;
    }
    .dot-HCQ {
      background:#69C49B;
    }

    .listLeft {
        float: left;
        margin-left: 0.23rem;
        font-size: 0.28rem;
        color: #666;

        line-height: 0.47rem;
    }

    .listRight {
        float: right;
        font-size: 0.28rem;
        color: #000;

        line-height: 0.47rem;
    }

}
</style>
