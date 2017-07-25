/**
* Created by gyr on 16/10/08.
*
* Des: 散标列表主页
*
*/

<template>
<pb-object-top msg='散标理财' self-back="true"></pb-object-top>
<pb-padding-top></pb-padding-top>
<div class="scatterCont">
  <mt-loadmore :top-loading-text="topLoadingText" :bottom-pull-text="bottomPullText" :bottom-drop-text="bottomDropText" :bottom-loading-text="bottomLoadingText" :top-method="loadTop" :auto-fill="autoFill" :bottom-all-loaded="allLoaded" :bottom-method="loadBottom">
    <pb-object-child :item="item" v-for="item in items">
      <pb-object-tag slot="box-center" :status="item.status" :tag="item.tag"></pb-object-tag>
      <pb-object-des slot="des" :price="item.amount" :type="item.repaymentType"></pb-object-des>
      <pb-object-line :scale="item.biddingProgress" v-if="item.status!='4'"></pb-object-line>
    </pb-object-child>
    <pb-no-more-data v-show="noPage"></pb-no-more-data>
  </mt-loadmore>
  <pb-no-data class="empty" v-if="showEmpty" msg="敬请期待"></pb-no-data>
</div>
</template>

<script>
import public_ObjectTop from './common/public_ObjectTop.vue';
import public_pTop from './common/public_ptop.vue';
import public_ObjectChild from './common/public_ObjectChild.vue';
import public_ObjectDes from './common/public_ObjectDes.vue';
import public_ObjectLine from './common/public_ObjectLine.vue';
import public_ObjectTag from './common/public_ObjectTag.vue';
import public_no_data from './common/public_no_data.vue';
import public_no_more_data from './common/public_no_more_data.vue';
import Cashbox from '../common/js/cashbox.js';

import 'mint-ui/lib/style.css'
import Loadmore from 'mint-ui/lib/loadmore';

import http_url from '../common/js/http-url.js';

export default {
  data() {
    return {
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
    "pb-object-top": public_ObjectTop,
    "pb-padding-top": public_pTop,
    "pb-object-child": public_ObjectChild,
    "pb-object-des": public_ObjectDes,
    "pb-object-line": public_ObjectLine,
    "pb-object-tag": public_ObjectTag,
    "mt-loadmore": Loadmore,
    "pb-no-data": public_no_data,
    "pb-no-more-data": public_no_more_data
  },
  ready() {
    this.init();
  },
  methods: {
    init: function() {
      this.loadData();
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
        paginate: {
          "pageNum": this.page,
          "pageSize": 5
        }
      };
      this.$http({
        method: "GET",
        url: http_url.list_targetList_decentralization,
        params: {
          where: JSON.stringify(where)
        }
      }).then((res) => {
        if (res.data.code == 200) {
          //是否显示数据为空
          this.pagesCount = res.data.data.paginate.pagesCount; //总页数赋值
          this.showEmpty = res.data.data.paginate.totalCount == 0 ? true : false;
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
  },
  events: {
    'on-back': function() {
      Cashbox.exit();
    },
    'on-route-reload': function() {
      this.init();
    },
  }
}
</script>

<style lang="sass" scoped>
@import "../common/css/common";

.scatterCont {
    //padding-top: 0.88rem+$status-bar-height;
    //padding-top: $public-nav-height+$status-bar-height;
    padding-top: $status-bar-height;
    padding-bottom: $status-bottom;
    .empty {
        margin-top: 1.8rem;
    }
}
</style>
