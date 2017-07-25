/**
 * Created by Darren on 16/10/10.
 * Type: 非公共组件
 * Des : “我的”页面功能列表
 *
 */
<template>
<div class="property" v-for="section in sections">
  <pb-menu-next v-for="item in section.items" track-by="$index" @click="menu_go_list(item)">
    <span sloat="image" class="property-img" :class=item.flg></span>
    <span class="property-des" v-cloak>{{item.title}}</span>
    <span sloat="right" class="property-right">
        <span class="right-icon"></span>
    <span class="right-text" v-text="item.subTitle"></span>
    </span>
  </pb-menu-next>
</div>
</template>
<script>
import public_Menunext from '../common/public_Menunext';
export default {
  data() {
    return {
      info: {},
      sections: [{
        code: 'ASSETS',
        title: '我的',
        items: [{
          code: 'MY_ASSET',
          title: '资产一览',
          flg: 'my-asset',
          router_name: "my-asset",
        }, {
          code: 'ASSETS_DETAIL',
          title: "资金明细",
          flg: "assets_list",
          router_name: "assets-list",
        }, {
          code: 'MY_ASSET',
          title: '我的收益',
          flg: 'my-profit',
          router_name: "profit",
        }, {
          code: 'ACCOUNT_PASSWORD',
          title: "资金密码",
          flg: "password",
          router_name: '', // this.info.isSetPwd == "1" ? "my-fund-pwd-change" : "my-fund-pwd-set"
        }]
      }, {
        code: 'INFO',
        title: '关于我们',
        items: [{
          title: "客服中心",
          flg: "listen",
          router_name: "info-service"
        }, {
          title: "帮助中心",
          flg: "help",
          router_name: "info-qa"
        }, {
          title: "关于我们",
          flg: "about_us",
          router_name: "info-about"
        }]
      }]
    }
  },
  components: {
    "pb-menu-next": public_Menunext
  },
  events: {
    //父级异步请求成功后的广播事件
    'on-info-change': function(info) {
      this.info = info;
      for (var i = 0; i < this.sections.length; i++) {
        var section = this.sections[i];
        if (section.code === 'ASSETS' || section.code === 'ACCOUNT') {
          var itemCopy = JSON.parse(JSON.stringify(section));
          itemCopy.items.forEach(function(item) {
            //资金密码需要动态路由
            if (item.code === 'ACCOUNT_PASSWORD') {
              if (info.isSetPwd == '1') {
                item.router_name = 'my-fund-pwd-change';
                item.subTitle = '修改';
              } else {
                item.router_name = 'my-fund-pwd-set';
                item.subTitle = '设置';
              }
            }
          });
          //必须用$set重新设置，否则数组更新出发不了vue双向绑定
          this.sections.$set(i, itemCopy);
        }
      }
    }
  },
  methods: {
    menu_go_list: function(item) {
      router.go({
        name: item.router_name,
        params: item.params,
        query: item.query
      });
    }
  }
}
</script>
<style lang="sass" scoped>
.property {
  margin-top: .3rem;
  background-color: #ffffff;
  padding-left: .3rem;
  .property-right {
    float: right;
    font-size: .24rem;
    color: #999999;
    line-height: .48rem;
    padding-right: .3rem;
    .right-text {
      float: right;
      display: inline-block;
      margin-right: .1rem;
    }
    .right-icon {
      float: right;
      display: inline-block;
      margin-top: .1rem;
      width: 0.16rem;
      height: 0.28rem;
      background: url('../../static/images/right-next.png') no-repeat;
      background-size: .16rem .28rem;
    }
  }
  .property-des {
    float: left;
    font-size: .28rem;
    margin-left: .3rem;
    line-height: .48rem;
  }
  .property-img {
    float: left;
    display: inline-block;
    width: 0.48rem;
    height: 0.48rem;
    // background-size: ".39rem .34rem"；
  }
  .assets_list {
    background: url('../../static/images/paper.png') no-repeat 0 0 /.48rem .48rem;
  }
  .listen {
    background: url('../../static/images/listen.png') no-repeat 0 0 /.48rem .48rem;
  }
  .help {
    background: url('../../static/images/help.png') no-repeat 0 0 /.48rem .48rem;
  }
  .about_us {
    background: url('../../static/images/about-us.png') no-repeat 0 0 /.48rem .48rem;
  }
  .password {
    background: url('../../static/images/password-4.png') no-repeat 0 0 /.48rem .48rem;
  }
  .my-asset {
    background: url('../../static/images/assets.png') no-repeat 0 0 /.48rem .48rem;
  }
  .my-profit {
    background: url('../../static/images/chart.png') no-repeat 0 0 /.48rem .48rem;
  }
}
[v-cloak] {
  display: none;
}
</style>
