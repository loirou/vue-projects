/**
 * Created by Darren on 16/09/11.
 *
 * Des: 主程序模块
 *
 */

<template>
<div>
  <router-view></router-view>
  <div class="menu-Footer" v-show="showMenu">
    <div class="menu" @click="menu('home')">
      <span class="menu-1" :class="currentPath == '/home' ? 'menu-1-Active': ''"></span>
      <a v-link="{ path: '/home', force: true, activeClass:'active'}">首页</a>
    </div>
    <div class="menu" @click="menu('fixed')">
      <span class="menu-3" :class="currentPath == '/fixed' ? 'menu-3-Active': ''"></span>
      <a v-link="{ path: '/fixed', force: true, activeClass:'active'}">固收</a>
    </div>
    <div class="menu" @click="menu('decentralization')">
      <span class="menu-2" :class="currentPath == '/decentralization' ? 'menu-2-Active': ''"></span>
      <a v-link="{ path: '/decentralization', force: true, activeClass:'active'}">散标</a>
    </div>
    <div class="menu" @click="menu('my')">
      <span class="menu-4" :class="currentPath == '/my' ? 'menu-4-Active': ''"></span>
      <a v-link="{ path: '/my', force: true, activeClass:'active'}">我的</a>
    </div>
  </div>
</div>
</template>

<script>
import http_url from '../common/js/http-url.js';
import MetaService from '../services/meta.js';

export default {
  data() {
    return {
      currentPath: '',
      showMenu: false
    }
  },
  created: function() {
    this.getSupportedBanks();
  },
  methods: {
    menu: function(routeName) {
      if (this.$route.name === routeName) {
        this.$broadcast('on-route-reload', routeName);
      }
      router.go({
        name: routeName
      });
    },
    // 支持的银行卡
    getSupportedBanks: function() {
      const banks = JSON.parse(this.Storage.get('BANKS')) || [];
      if (banks.length > 0) {
        return;
      }
      MetaService.getSupportedBanks({
        ignoreError: true
      }).then((res) => {
        if (res.data.code == 200) {
          const list = res.data.data.items;
          // 存到缓存里
          this.Storage.set('BANKS', JSON.stringify(list));
        }
      });
    },
  },
  route: {
    data: function(transition) {
      // 需要显示menu菜单的几个路由
      const routesWithMenu = ['home', 'fixed', 'decentralization', 'my'];
      // index 页面不显示menu
      if (routesWithMenu.includes(this.$route.name)) {
        this.showMenu = true;
      } else {
        this.showMenu = false;
      }
      transition.next({
        currentPath: transition.to.path
      });
    }
  },
  events: {
    'dispatch-toggle-money-mask': function(hidden) {
      // 接收子组件dispatch出来的事件
      // 通知其他子组件显示、隐藏金额
      this.$broadcast('broadcast-toggle-money-mask', hidden);
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../common/css/common";

.menu-Footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: $custom-max-width;
    height: 0.78rem;
    padding: 0.15rem 0;
    border-top: 0.06rem solid rgba(239,239,239,0.5); //#efefef;
    -webkit-background-clip: padding-box;
    /* for Safari */
    background-clip: padding-box;
    /* for IE9+, Firefox 4+, Opera, Chrome */
    background-color: #ffffff;
    .menu {
        float: left;
        width: 25%;
        text-align: center;
        a {
            margin-top: 0.1rem;
            color: #bfbbb8;
            font-size: 0.2rem;
            display: inline-block;
        }
        .active {
            color: #f98484;
        }
        .menu-1 {
            width: 100%;
            height: 0.4rem;
            display: block;
            background: url('../static/images/1.png') no-repeat 0.595rem 0;
            background-size: 0.42rem 0.42rem;
        }
        .menu-1-Active {
            @extend .menu-1;
            background: url('../static/images/1-1.png') no-repeat 0.595rem 0;
            background-size: 0.42rem 0.42rem;
        }
        .menu-2 {
            @extend .menu-1;
            background: url('../static/images/2.png') no-repeat 0.595rem 0;
            background-size: 0.42rem 0.42rem;
        }
        .menu-2-Active {
            @extend .menu-2;
            background: url('../static/images/2-1.png') no-repeat 0.595rem 0;
            background-size: 0.42rem 0.42rem;
        }
        .menu-3 {
            @extend .menu-1;
            background: url('../static/images/3.png') no-repeat 0.62rem 0;
            background-size: 0.42rem 0.42rem;
        }
        .menu-3-Active {
            @extend .menu-3;
            background: url('../static/images/3-1.png') no-repeat 0.62rem 0;
            background-size: 0.42rem 0.42rem;
        }
        .menu-4 {
            @extend .menu-1;
            background: url('../static/images/4.png') no-repeat 0.589rem 0;
            background-size: 0.42rem 0.42rem;
        }
        .menu-4-Active {
            @extend .menu-4;
            background: url('../static/images/4-1.png') no-repeat 0.589rem 0;
            background-size: 0.42rem 0.42rem;
        }
    }
}
</style>
