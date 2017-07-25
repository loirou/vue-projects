/**
* Created by gyr on 16/10/11.
* Type:非公共组件
* Des: 我的-资产明细 list组件
*
*/

<template>
<div class="list-content">
  <div class="property">
    <mt-loadmore :top-loading-text="topLoadingText" :bottom-pull-text="bottomPullText" :bottom-drop-text="bottomDropText" :bottom-loading-text="bottomLoadingText" :top-method="loadTop" :auto-fill="autoFill" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded">
      <div class="property-body">
        <pb-menu-next class="assetsList" v-for="item in items" track-by="$index">
          <span class="listLeft">
                        <span class="title">{{item.title}}</span>
          <span class="date">{{item.date}}</span>
          </span>
          <span sloat="right" class="listRight">
                        <span class="titCon" >
                            <i class="symbol" v-show="item.title|isPlus">+{{item.amount}}</i>
                            <i class="symbol reduce" v-show="item.title|isReduce">-{{item.amount}}</i>
                            <i class="symbol frozen" v-show="item.title|isFrozen">{{item.amount}}</i>
                            <i class="symbol frozen" v-show="item.title|isInvest">{{item.amount}}</i>
                        </span>
          <span class="dateCon">{{item.memo}}</span>
          </span>
        </pb-menu-next>
        <pb-no-more-data v-show="noPage"></pb-no-more-data>
      </div>
    </mt-loadmore>
  </div>
  <pb-no-data class="empty data-2" v-if="showEmpty"></pb-no-data>
</div>
</template>

<script>
import public_Menunext from '../common/public_Menunext';
import public_no_data from '../common/public_no_data.vue';
import public_no_more_data from '../common/public_no_more_data.vue';
import Loadmore from 'mint-ui/lib/loadmore';
import http_url from '../../common/js/http-url.js';
import 'mint-ui/lib/style.css'

export default {
  data() {
    return {
      showEmpty: false, //是否显示空数据图片
      items: null,
      investorId: "",
      noPage: false, //是否显示底部数据加载完毕提示
      autoFill: false, //true:全部加载 并填充容器  false:逐页加载
      bottomPullText: "",
      bottomDropText: "",
      bottomLoadingText: null,
      page: 0, //初始化当前页数
      pagesCount: 1, //初始化总页数
      allLoaded: false, //数据是否加载完毕
      topLoadingText: "刷新中"
    }
  },
  filters: {
    isPlus(title) {
      if (title == '充值' || title == '本息') {
        return true;
      } else {
        return false;
      }
    },
    isFrozen(title) {
      if (title == '冻结') {
        return true
      } else {
        return false;
      }
    },
    isInvest(title) {
      if (title == '投资') {
        return true
      } else {
        return false;
      }
    },
    isReduce(title) {
      if (title == '提现') {
        return true;
      } else {
        return false;
      }
    },
  },
  components: {
    "pb-menu-next": public_Menunext,
    "mt-loadmore": Loadmore,
    "pb-no-data": public_no_data,
    "pb-no-more-data": public_no_more_data
  },
  created() {
    this.loadData();
  },
  computed: {
    info_height: function() {
      var count = document.documentElement.style.fontSize.replace("px", "");
      var clientWidth = document.documentElement.clientWidth;
      var clientHeight = document.documentElement.clientHeight;
      var font_size = 100 * (clientWidth / 640);
      var height_rem = clientHeight / font_size;
      var height_info = (height_rem - 0.88).toFixed(2);
      return height_info + 'rem';
    }
  },
  methods: {
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
        "data": {},
        "paginate": {
          "pageNum": this.page,
          "pageSize": 10
        }
      };
      this.$http({
        method: "GET",
        url: http_url.list_assetsList,
        params: {
          where: JSON.stringify(where)
        }
      }).then((response) => {
        if (response.data.code == 200) {
          this.pagesCount = response.data.data.paginate.pagesCount; //总页数赋值
          //是否显示数据为空
          this.showEmpty = response.data.data.paginate.totalCount == 0 ? true : false;
          //当当前页小于总页数
          //如果是第一页，执行赋值操作  (默认总页数大于1 因前置条件当前页小鱼总页数)
          if (this.items == null || this.page == 1) {
            this.items = response.body.data.items;
          } else {
            //如果不是第一页，执行插入操作
            for (var i = 0; i < response.body.data.items.length; i++) {
              this.items.push(response.body.data.items[i]);
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
    loadData2: function(id, refresh = false) {
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
        "data": {},
        "paginate": {
          "pageNum": this.page,
          "pageSize": 10
        }
      };
      this.$http({
        method: "GET",
        url: http_url.list_assetsListForce,
        params: {
          where: JSON.stringify(where)
        }
      }).then((response) => {
        if (response.data.code == 200) {
          this.pagesCount = response.data.data.paginate.pagesCount; //总页数赋值
          if (that.items == null || this.page == 1) {
            that.items = response.body.data.items;
          } else {
            for (var i = 0; i < response.body.data.items.length; i++) {
              that.items.push(response.body.data.items[i]);
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
    //下拉强制刷新
    loadTop(id) {
      this.loadData2(id, true);
    },
    //上拉加载更多数据
    loadBottom(id) {
      // this.allLoaded = true;// 若数据已全部获取完毕
      this.loadData(id);
    }
  }
}
</script>

<style lang="sass">
.mint-loadmore-bottom {
    display: none;
}
.mint-loadmore-top {
    /*margin-top: -0.59rem;*/
    /*margin-top: -1.7rem;*/
}
.mint-loadmore-content {
    // transform: translate3d(0,0,0) !important;
}
</style>

<style lang="sass" scoped>
@import "../../common/css/common";

.list-content {
    //background-color: #ffffff;
    //padding-top: 0.88rem;
    //padding-top: $public-nav-height;
    .property {
        background-color: #ffffff;
        .property-body {
            //margin-top: .9rem;
        }
        .assetsList {
            height: 0.63rem;
            padding-top: 0.3rem;
            padding-left: 0.3rem;
            .listLeft {
                float: left;
                width: 50%;
                .title {
                    display: block;
                    line-height: 0.28rem;
                    font-size: 0.28rem;
                    color: #000;
                }
                .date {
                    display: block;
                    padding-top: 0.1rem;
                    line-height: 0.24rem;
                    font-size: 0.22rem;
                    font-family: PingFangSC-Light;
                    color: #999;
                }
            }
            .listRight {
                float: right;
                padding-right: 0.3rem;
                .titCon {
                    display: block;
                    line-height: 0.28rem;
                    text-align: right;
                    font-size: 0.28rem;
                    color: #f75c5c;
                    .symbol {
                        padding-right: 0.05rem;
                        //font-size: .24rem;
                    }
                }

                .reduce {
                    color: #76cf32;
                }
                .frozen {
                    color: #999;
                }
                .dateCon {
                    display: block;
                    padding-top: 0.1rem;
                    line-height: 0.24rem;
                    font-size: 0.22rem;
                    font-family: PingFangSC-Light;
                    color: #999;
                }
            }
        }

    }

    .empty {
        margin-top: 1.8rem;
    }
}
</style>
