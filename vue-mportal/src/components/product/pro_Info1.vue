/**
 * Created by Darren on 16/10/20.
 *
 * Des: 产品详情主页
 *
 */

<template>
<div>
  <pb-padding-top></pb-padding-top>
  <div class="info">
    <!--有加息券显示此部分 count=0 没有加息券 count=1有一张加息券 count=2有多张加息券 且是固收 type是1-->
    <div class="coupon-msg" v-bind:class="{'coupon-msg-clock':isShow}">
      <div class="coupon-des" v-text="coupon_data.tip"></div>
    </div>
    <!--有加息券显示此部分-->
    <div class="top">
      <div class="title">
        <span v-text="info_1.targetName"></span>
      </div>
      <div class="tag">
        <span class="title2" v-for="tag in tag" track-by="$index" v-text="tag.text" :style="{color:tag.color,borderColor:tag.color}"></span>
      </div>
      <div class="receive">
        <div class="des">预期年化收益(%)</div>
        <div class="num">
          <span class="base-rate" v-text="totalRate"></span>
          <!--有加息券显示此部分 count=0 没有加息券 count=1有一张加息券 count=2有多张加息券 且是固收 type是1-->
          <span class="clearfix coupon-rate" v-bind:class="{'coupon-clock':isShow}">
                        <span class="coupon-tag"></span>
          <span class="coupon-content">{{coupon_data.couponValue | getRate}}</span>
          </span>
          <!--有加息券显示此部分-->
        </div>
      </div>
      <div class="des clearfix info-des">
        <div class="des-info">
          <div class="des">期限(天)</div>
          <div class="num" v-text="info_1.duration"></div>
        </div>
        <div class="des-info">
          <div class="des">起投(元)</div>
          <div class="num" v-text="info_1.biddingStartAmount"></div>
        </div>
        <div class="des-info">
          <div class="des">剩余(天)</div>
          <div class="num" v-text="info_1.residualDays"></div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <pb-object-line v-if="info_1.biddingProgress != undefined" :scale="info_1.biddingProgress">
      </pb-object-line>
    </div>
  </div>

  <!-- <div class="info-menu-list" v-for="item in info.items" track-by="$index">
       <pb-menu-next v-for="show_list in item" track-by="$index">
            <span sloat="image" class="info-list-img" :class="show_list.flg"></span>
            <span class="info-list-des" v-cloak>{{show_list.title}}</span>
            <span sloat="right" class="info-list-right">{{show_list.value}}</span>
       </pb-menu-next>
    </div> -->

  <div class="info-menu-list" v-for="item in info_items" track-by="$index">
    <pb-menu-next v-for="show_list in item" track-by="$index">
      <span sloat="image" class="info-list-img" :class="show_list.type"></span>
      <span class="info-list-des" v-cloak>{{show_list.title}}</span>
      <span sloat="right" class="info-list-right" :class="show_list.type+'-value'">{{show_list.value}}</span>
    </pb-menu-next>
  </div>

  <slot></slot>
</div>
</template>


<script>
import public_Menunext from '../common/public_Menunext';
import public_pTop from '../common/public_ptop.vue';
import public_ObjectLine from '../common/public_ObjectLine.vue';

export default {
  props: ["info_1", "coupon_data", "target_type"],
  data() {
    this.info_1 = this.info_1 || {};
    return {
      scale: 60,
      info_list: [],
      items: [],
      tagList: [],
      data_list: [{
          type: "timeStart",
          title: "起息日期",
          value: "T+1"
        },
        {
          type: "timeEnd",
          title: "结息日期",
          value: ""
        }
      ]
    }
  },
  components: {
    "pb-menu-next": public_Menunext,
    "pb-padding-top": public_pTop,
    "pb-object-line": public_ObjectLine
  },
  computed: {
    totalRate: function() {
      if (!this.info_1.discountRate) {
        this.info_1.discountRate = 0;
      }
      var total = ((this.info_1.interestRate || 0) + (this.info_1.discountRate || 0)) * 100;
      return total.toFixed(2);
    }, //基础利率和活动利率加起来显示的数据 如有加息券需要加上加息券的利率
    dateList: function() {
      //用于兼容返回时间数组为空的情况，无法将时间栏显示出来
      this.data_list[1].value = "T+" + this.info_1.duration;
      return this.data_list;
    },
    moneyList: function() {
      if (this.info_1.moneyList) {
        for (let i = 0; i < this.info_1.moneyList.length; i++) {
          switch (this.info_1.moneyList[i].type) {
            case "money1":
              this.info_1.moneyList[i]["title"] = "融资金额";
              break;
            case "money2":
              this.info_1.moneyList[i]["title"] = "可投金额";
              break;
            case "money3":
              this.info_1.moneyList[i]["title"] = "间隔金额";
              break;
            case "money4":
              this.info_1.moneyList[i]["title"] = "投资上限";
              break;
          }
        }
        // console.log(this.infos.items.moneyList);
        return this.info_1.moneyList;
      } else {
        return [];
      }
    },
    typeList: function() {
      if (this.info_1.typeList) {
        for (let i = 0; i < this.info_1.typeList.length; i++) {
          switch (this.info_1.typeList[i].type) {
            case "way":
              this.info_1.typeList[i]["title"] = "还款方式";
              break;
          }
        }
        // console.log(this.infos.items.typeList);
        return this.info_1.typeList;
      } else {
        return [];
      }
    },
    info_items: function() {
      this.info_list[0] = this.dateList;
      this.info_list[1] = this.moneyList;
      this.info_list[2] = this.typeList;

      return this.info_list;
    },
    tag: function() {
      if (this.info_1.tag == null) {
        return;
      } else {
        this.tagList = JSON.parse(this.info_1.tag);
        return this.tagList;
      }
    },
    isShow: function() {
      if (this.target_type && this.coupon_data.count) {
        var flag = false;
        //散标和没有卡券时候不显示
        if (this.target_type != 1 || this.coupon_data.count == 0) {
          return false
        } else {
          flag = true;
        }
        return flag;
      }

    }
  },
  filters: {
    getRate(val) {
      if (!val) return '';
      val = "+" + val * 100; // + ".0";
      return val;
    }
  }
}
</script>
<style lang="sass" scoped>
@import "../../common/css/common";

.info {
    //padding-top: $public-nav-height;
    background: #ffffff;
    .coupon-msg {
        display: none;
        width: 100%;
        height: 0.32rem;
        line-height: 0.32rem;
        padding: 0.14rem 0.3rem;
        background: #83bdfe;
        .coupon-des {
            padding-left: 0.42rem;
            font-size: 0.24rem;
            color: #fff;
            background: url("../../static/images/product-info.png") no-repeat;
            background-size: 0.32rem 0.32rem;
        }
        span {
            font-size: 0.24rem;
            color: #fff;
        }
    }
    .coupon-msg-clock {
        display: block;
    }
    .top {
        padding-top: 0.3rem;
        padding-left: 0.6rem;
        padding-right: 0.6rem;
    }
    .bottom {
        margin-top: 0.1rem;
    }
    .title {
        text-align: center;
    }
    .title span {
        font-size: 0.3rem;
        color: #000;
    }
    .tag {
        text-align: center;
        margin-top: 0.1rem;
        span {
            display: inline-block;
            border-radius: 0.64rem;
            margin-left: 0.08rem;
            font-size: 0.22rem;
            font-weight: lighter;
            text-align: center;
            padding: 0 0.1rem;
            border-width: $public-border;
            border-style: solid;
        }
    }
    .receive {
        margin-top: 0.35rem;
        text-align: center;
        .des {
            font-size: 0.22rem;
            color: #999;
        }
        .num {
            color: #f75c5c;
            margin-top: -0.15rem;
            .base-rate {
                font-size: 0.9rem;
            }
            .coupon-rate {
                display: none;
                width: 1rem;
                height: 100%;
                padding-top: 0.2rem;
                .coupon-tag {
                    display: block;
                    background: url("../../static/images/product-tag.png") no-repeat;
                    background-size: 0.7rem 0.3rem;
                    background-position-x: 0.15rem;
                    width: 100%;
                    height: 0.3rem;
                }
                .coupon-content {
                    font-size: 0.5rem;
                    margin-top: -0.12rem;
                    display: inline-block;
                    margin-left: -0.1rem;
                }
            }
            .coupon-clock {
                display: inline-block;
            }
        }
    }
    .info-des {
        margin-top: 0.16rem;
    }
    .des {
        span {
            float: left;
        }
        .des-info {
            float: left;
            width: 1.5rem;
            // width: 1rem;
            text-align: center;
            &:nth-of-type(2) {
                width: 2.2rem;
                // text-align: center;
                border-left: $public-border solid #efefef;
                border-right: $public-border solid #efefef;
                box-sizing: border-box;
                -moz-box-sizing: border-box;
                /* Firefox */
                -webkit-box-sizing: border-box;
                /* Safari */
            }
            &:nth-of-type(3) {
                // text-align: right;
            }
            .des {
                font-size: 0.22rem;
                color: #999;
            }
            .num {
                font-size: 0.36rem;
                color: #666666;
            }
        }
    }
}
.info-menu-list {
    margin-top: 0.3rem;
    background-color: #ffffff;
    padding-left: 0.3rem;
    .info-list-img {
        float: left;
        display: inline-block;
        width: 0.48rem;
        height: 0.48rem;
    }
    .info-list-des {
        float: left;
        font-size: 0.28rem;
        margin-left: 0.3rem;
        line-height: 0.461rem;
    }
    .info-list-right {
        float: right;
        font-size: 0.28rem;
        color: #999;
        line-height: 0.461rem;
        margin-right: 0.3rem;
    }
    .property-right {
        float: right;
        display: inline-block;
        width: 0.16rem;
        height: 0.28rem;
        background: url('../../static/images/right-next.png') no-repeat;
        background-size: 0.16rem 0.28rem;
        margin-right: 0.3rem;
        margin-top: 0.06rem;
    }
    .timeStart {
        background: url('../../static/images/Buy/buy_1.png') no-repeat 0 0 /.48rem 0.48rem;
    }
    .timeEnd {
        background: url('../../static/images/Buy/buy_2.png') no-repeat 0 0 /.48rem 0.48rem;
    }
    .money1 {
        background: url('../../static/images/Buy/buy_3.png') no-repeat 0 0 /.48rem 0.48rem;
    }
    .money2 {
        background: url('../../static/images/Buy/buy_4.png') no-repeat 0 0 /.48rem 0.48rem;
    }
    .money3 {
        background: url('../../static/images/Buy/buy_5.png') no-repeat 0 0 /.48rem 0.48rem;
    }
    .money4 {
        background: url('../../static/images/Buy/buy_6.png') no-repeat 0 0 /.48rem 0.48rem;
    }
    .way {
        background: url('../../static/images/Buy/buy_8.png') no-repeat 0 0 /.48rem 0.48rem;
    }
    .about {
        background: url('../../static/images/Buy/buy_7.png') no-repeat 0 0 /.48rem 0.48rem;
    }
    .info-list-right.money2-value {
        color: #f75c5c;
    }
}
.line {
    margin-left: 0.55rem;
    display: block;
    height: 0.6rem;
    width: 0.02rem;
    background: #efefef;
}
// v-cloak
[v-cloak] {
    display: none;
}
</style>
