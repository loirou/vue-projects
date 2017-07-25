/**
 * Created by wd on 03/21/17
 *
 * Des: 理财组件
 *
 */

<template>
<li class="financial-list clearfix" @click="goList(profit.routerName)">
  <div class="list-lf">
    <h3 class="title" v-text="profit.data.title"></h3>
    <span class="describe" v-text="profit.data.subtitle"></span>
    <span class="number" v-if="profit.isNumber" v-text="profit.amount | maskMoney"></span>
  </div>
  <div class="list-rt" v-if="profit.isIcon">
    <span class="image"></span>
  </div>

  <div class="list-rt" v-if="!profit.isCurrent&&profit.amount<=0">
    <span class="btn">立即赚钱</span>
  </div>
  <div class="list-rt" v-else>
    <!-- <slot></slot> -->
    <div class="title" :class="{'line-height-1': profit.isNumber,'line-height-2': !profit.isNumber}" v-text="profit.data.describe"></div>
    <div class="describe" v-if="!profit.isNumber" v-text="profit.yesterdayInterest | maskMoney"></div>
  </div>
</li>
</template>

 <script >
import HttpUrl from '../../common/js/http-url.js';

export default {
  props: ['profit', 'info'],
  data() {
    let user = JSON.parse(this.Storage.get('USER')) || {};
    return {
      user: user,
    }
  },
  methods: {
    goList: function(route) {
      let cashboxToken = this.Storage.get('CASHBOX_TOKEN');
      if (route) {
        router.go({
          name: route
        })
      } else {
        const currentRoute = this.profit.currentRoute;
        window.location.href = `${HttpUrl.hcq}?token=${cashboxToken}&from=${currentRoute}&r=${Math.random()}`;
      }
    }
  },
  filters: {
    //显示隐藏金额
    maskMoney: function(val) {
      if (this.user.hideAmount) {
        return '*****';
      }
      return val;
    }
  },
  events: {
    'broadcast-toggle-money-mask': function(hidden) {
      let user = JSON.parse(this.Storage.get('USER')) || {};
      // 实时更新显示隐藏金额
      this.user = user;
    }
  }
}
</script>

 <style lang="sass" scoped>
@import '../../common/css/common.scss';

.financial-list {
    list-style: none;
    padding: 0.4rem 0.3rem;
    background: #fff;
    height: 0.7rem;
    border-bottom: $public-border solid #efefef;
    &:last-child {
        border: none;
    }
    .list-lf {
        float: left;
        .title {
            margin-bottom: 0.2rem;
            font-size: 0.3rem;
            line-height: 0.3rem;
            color: #000;
            font-weight: bold;
        }
        .describe {
            display: inline-block;
            font-size: 0.24rem;
            line-height: 0.24rem;
            color: #999;
            vertical-align: middle;
            letter-spacing: 0.02rem;
        }
        .number {
            margin-left: 0.12rem;
            display: inline-block;
            font-size: 0.26rem;
            line-height: 0.26rem;
            color: #f75c5c;
            vertical-align: middle;
        }
    }
    .list-rt {
        margin: 0 auto;
        float: right;
        height: 0.7rem;
        .image {
            margin-left: 0.2rem;
            display: block;
            width: 0.16rem;
            height: 100%;
            background: url('../../static/images/right-next.png') 0 50% no-repeat;
            background-size: 0.16rem 0.28rem;
        }
        .title {
            font-size: 0.24rem;
            color: #999;
        }
        .line-height-1 {
            line-height: 0.7rem;
        }
        .line-height-2 {
            line-height: 0.24rem;
        }
        .describe {
            margin-top: 0.2rem;
            font-size: 0.28rem;
            color: #f75c5c;
            text-align: right;
        }
        .btn {
            margin-top: 0.1rem;
            display: block;
            width: 1.4rem;
            height: 0.5rem;
            text-align: center;
            line-height: 0.5rem;
            font-size: 0.26rem;
            color: #f75c5c;
            border: $public-border solid #f75c5c;
            border-radius: 0.5rem;
        }
    }
}
</style>
