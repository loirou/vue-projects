/**
* Created by gyr on 16/10/26.
*
* Des: 我的-投资记录-还款中 选项卡2
*
*/
<template>
<div>
  <div class="repay-content">
    <mt-loadmore :top-loading-text="topLoadingText" :bottom-pull-text="bottomPullText" :bottom-drop-text="bottomDropText" :top-method="loadTop" :auto-fill="autoFill" :bottom-method="loadBottom">
      <pb-record-object :item="item" status-repay="IRP" v-for="item in items">
        <pb-record-tag slot="box-right" :price="item.biddingAmount"></pb-record-tag>
        <pb-record-des slot="des" :start="item.debtStartDate" :end="item.debtEndDate" msg="起息日" end-text="到期日"></pb-record-des>
      </pb-record-object>
      <pb-no-more-data v-if="noPage">
        <pb-no-more-data>
    </mt-loadmore>
  </div>
  <pb-no-data class="empty data-2" v-if="showEmpty"></pb-no-data>
</div>
</template>

<script>
import public_recordObject from '../common/public_recordObject.vue';
import public_recordDes from '../common/public_recordDes.vue';
import public_recordTag from '../common/public_recordTag.vue';
import public_no_data from '../common/public_no_data.vue';
import public_no_more_data from '../common/public_no_more_data.vue';
import 'mint-ui/lib/style.css'
import Loadmore from 'mint-ui/lib/loadmore';
import http_url from '../../common/js/http-url.js';
export default {
  data() {
    return {
      showEmpty: false, //是否显示空数据图片
      items: null,
      noPage: false,
      autoFill: false, //true:全部加载 并填充容器  false:逐页加载
      bottomPullText: "上拉加载",
      bottomDropText: "释放加载",
      page: 0,
      pagesCount: 1,
      topLoadingText: "刷新中"
    }
  },
  components: {
    "pb-record-object": public_recordObject,
    "pb-record-des": public_recordDes,
    "pb-record-tag": public_recordTag,
    "mt-loadmore": Loadmore,
    "pb-no-data": public_no_data,
    "pb-no-more-data": public_no_more_data
  },
  ready() {
    this.loadData();
  },
  methods: {
    loadData: function(id, refresh = false) {
      if (refresh) {
        this.page = 0;
				this.noPage = false;
      }

      if (this.page >= this.pagesCount) {
        //如果没有数据 先把 noPage设为true  过后设为false
        this.noPage = true;
        this.$broadcast('onBottomLoaded', id);
        return false;
      }

      this.page += 1;
      var where = {
        "data": {
          "status": "IRP"
        },
        "paginate": {
          "pageNum": this.page,
          "pageSize": 5
        }
      };
      this.$http({
        method: "GET",
        url: http_url.my_record,
        params: {
          "where": JSON.stringify(where)
        }
      }).then((res) => {
        if (res.data.code == 200) {
          //是否显示数据为空
          this.showEmpty = res.body.data.paginate.totalCount == 0 ? true : false;
          this.pagesCount = res.body.data.paginate.pagesCount; //总页数赋值
          if (this.items == null || this.page == 1) {
            this.items = res.body.data.items;
          } else {
            for (var i = 0; i < res.body.data.items.length; i++) {
              this.items.push(res.body.data.items[i]);
            }
          }
          if (refresh) {
            //如果刷新 回归下拉初始位置
            this.$broadcast('onTopLoaded', id);
          } else {
            //回归上拉初始位置
            this.$broadcast('onBottomLoaded', id);
          }
        }
      })
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
  }
}
</script>

<style lang="sass" scoped>
.empty {
    margin-top: 1.8rem;
}
</style>
