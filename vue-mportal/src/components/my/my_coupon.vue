/**
* Created by gyr on 17/7/2.
*
* Des: 我的-我的卡券(全部卡券 从我的页面进入)
*
*/

<template>
<public-object-top msg="我的卡券" back="true" coupon="true">
  <span slot="right" class="tip-icon" @click="goTo('coupon-declare')"></span>
</public-object-top>
<pb-padding-top></pb-padding-top>
<pb-wx-des des="加息券使用说明" go-msg="coupon-declare"></pb-wx-des>
<div class="coupon-msg">
  <mt-loadmore :top-loading-text="topLoadingText" :bottom-pull-text="bottomPullText" :bottom-drop-text="bottomDropText" :bottom-loading-text="bottomLoadingText" :top-method="loadTop" :auto-fill="autoFill" :bottom-all-loaded="allLoaded" :bottom-method="loadBottom">
    <public-coupon :item="item" v-for="item in items" track-by="$index"></public-coupon>
    <pb-no-more-data v-show="noPage"></pb-no-more-data>
  </mt-loadmore>
</div>
<pb-no-data class="empty data-2" v-if="showEmpty" msg="暂无卡券"></pb-no-data>
</template>

<script>
import public_ObjectTop from '../common/public_ObjectTop.vue';
import public_pTop from '../common/public_ptop.vue';
import public_wxDeclare from '../common/public_wxdeclare.vue';
import public_coupon from '../common/public_coupon.vue';
import public_no_data from '../common/public_no_data.vue';
import public_no_more_data from '../common/public_no_more_data.vue';
import http_url from '../../common/js/http-url.js';
import Loadmore from 'mint-ui/lib/loadmore';

import 'mint-ui/lib/style.css'

export default {
  data() {
    return {
      items: [],
      showEmpty: false, //是否显示空数据图片
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
    "public-object-top": public_ObjectTop,
    "pb-padding-top": public_pTop,
    "public-coupon": public_coupon,
    "mt-loadmore": Loadmore,
    "pb-no-data": public_no_data,
    "pb-no-more-data": public_no_more_data,
    "pb-wx-des": public_wxDeclare
  },
  created() {
    this.getCouponList();
  },
  methods: {
    goTo: function(routeName) {
      router.go({
        name: routeName
      });
    },
    getCouponList: function(id, refresh = false) {
      if (refresh) {
        this.page = 0;
				this.noPage = false;
      }
      if (this.page >= this.pagesCount) {
        this.noPage = true;
        this.$broadcast('onBottomLoaded', id);
        return false;
      }
      this.page += 1;
      var where = {
        "paginate": {
          "pageNum": this.page,
          "pageSize": 5
        }
      };
      this.$http({
        method: "GET",
        url: http_url.coupon + "/1/list",
        params: {
          where: JSON.stringify(where)
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.pagesCount = res.body.data.paginate.pagesCount;
          this.showEmpty = res.data.data.paginate.totalCount == 0 ? true : false;
          if (this.items == null || this.page == 1) {
            this.items = res.body.data.items;
          } else {
            for (var i = 0; i < res.body.data.items.length; i++) {
              this.items.push(res.body.data.items[i]);
            }
          }
          if (refresh) {
            this.$broadcast('onTopLoaded', id);
          } else {
            this.$broadcast('onBottomLoaded', id);
          }
        }

      });
    },
    loadTop(id) {
      this.getCouponList(id, true);
    },
    loadBottom(id) {
      this.getCouponList(id);
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";

.coupon-msg {
    //padding-top:.88rem+$status-bar-height;
    //padding-top:$public-nav-height+$status-bar-height;
    padding-top: $status-bar-height;
}
.empty {
    margin-top: 1.8rem;
}
.tip-icon {
    z-index: 20;
    display: inline-block;
    margin-top: 0.23rem;
    width: 0.42rem;
    height: 0.42rem;
    background: url("../../static/images/bankwh.png") no-repeat;
    background-size: 0.42rem 0.42rem;
}
</style>
