/**
* Created by gyr on 17/7/2.
*
* Des: 我的卡券(本标的可以使用的卡券 从购买页面进去)
*
*/

<template>
<!--顶部显示小问号 需要传递参数icon="true"-->
<public-object-top msg="我的卡券" back="true" coupon="true"></public-object-top>
<pb-padding-top></pb-padding-top>
<pb-wx-des des="加息券使用说明" go-msg="coupon-declare"></pb-wx-des>
<div class="coupon-msg">
  <div class="coupon2-top">
    <div class="coupon2-left">
      不使用加息券
    </div>
    <!--点击此处需要返回count==0 既没有加息券-->
    <div class="coupon2-right" v-bind:class="{'coupon2-right-choose':not_choose.flag}" @click="selectCoupon(not_choose,true)"></div>
  </div>
  <div class="coupon-section clearfix" v-bind:class="{'coupon-choose-yes':item.checked}" v-for="item in couponList" track-by="$index" @click="selectCoupon(item)">
    <div class="coupon-msg-list">
      <div class="coupon-top"></div>
      <div class="coupon-item clearfix">
        <div class="coupon-left">
          <div class="coupon-rate">
            <!--需要加过滤器 过滤利率和当利率的0的时候过滤成文字不使用加息券-->
            <span>+</span><span class="rate">{{item.value | getRate}}</span><span>%</span>
          </div>
        </div>
        <div class="coupon-right">
          <ul>
            <li>适用标的：{{item.categoryScopeDesc}}</li>
            <li>金额限制：{{item.quotaDesc}}</li>
          </ul>
        </div>
      </div>
      <div class="coupon-bottom">
        <span>{{item.expirationTime | getDate}}</span>
      </div>
    </div>
  </div>
  <div class="coupon-button" @click="goBack">
    <span>确定</span>
  </div>
</div>
</template>

<script>
import public_ObjectTop from '../common/public_ObjectTop.vue';
import public_pTop from '../common/public_ptop.vue';
import public_wxDeclare from '../common/public_wxdeclare.vue';
import http_url from '../../common/js/http-url.js';

export default {
  props: ["coupon", "not_choose"],
  data() {
    return {
      couponList: []
      //                notChoose:{
      //                    value:"0",
      //                    count:"1",
      //                    flag:false
      //                }

    }
  },
  components: {
    "public-object-top": public_ObjectTop,
    "pb-padding-top": public_pTop,
    "pb-wx-des": public_wxDeclare

  },
  created() {
    this.couponList = this.coupon;

  },
  filters: {
    getDate: function(expirationTime) {
      return "有效期至：" + (new Date(expirationTime)).Format("yyyy-MM-dd");
    },
    getRate: function(val) {
      return val * 100;
    }
  },
  methods: {
    selectCoupon: function(coupon, use = false) {
      //传递两个参数 通过判断确定是使用加息券 还是不使用 从而决定怎么走
      //此方法只是为了少处理数据
      //点击的时候 判断当前项和列表项
      if (use) {
        this.couponList.forEach(function(item, index) {
          var newCoupon = JSON.parse(JSON.stringify(item)); //拷贝原始对象
          newCoupon.checked = false;
          //通过$set方法修改为当前选中的那条数据
          this.couponList.$set(index, newCoupon);
        }.bind(this));
        this.not_choose.flag = true;
      } else {
        this.not_choose.flag = false;
        this.couponList.forEach(function(item, index) {
          if (item.id == coupon.id || item.checked) {
            var newCoupon = JSON.parse(JSON.stringify(item));
            newCoupon.checked = item.id == coupon.id;
            //通过$set方法修改为当前选中的那条数据
            this.couponList.$set(index, newCoupon);
          }
        }.bind(this));
      }
      this.$dispatch('changeCurCoupon', coupon);
    },
    goBack: function() {
      this.$dispatch('on-back');
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";
.coupon-msg{
    padding-top:$status-bar-height;
    padding-bottom: 1.18rem;
    .coupon2-top{
        margin-top: .3rem;
        height: .9rem;
        padding: 0 .3rem;
        background: #fff;
        .coupon2-left{
            float: left;
            padding: .3rem;
            font-size: .28rem;
            color: #999;
        }
        .coupon2-right{
            float: right;
            padding: .26rem 0;
            width: .38rem;
            height: .38rem;
            background: url("../../static/images/coupon-choose1.png") no-repeat 0 .26rem;
            background-size: .38rem .38rem;
        }
        .coupon2-right-choose{
            background: url("../../static/images/coupon-choose2.png") no-repeat 0 .26rem;
            background-size: .38rem .38rem;
        }
    }
    .coupon-button{
        z-index: 998;
        position: fixed;
        bottom: 0;
        width: 100%;
        max-width: $custom-max-width;
        span{
            float: left;
            width: 100%;
            height: .88rem;
            line-height: .88rem;
            font-size: .3rem;
            color: #fff;
            background: #f75c5c;
            text-align: center;
            letter-spacing: .05rem;
        }
    }
    .coupon-section{
        margin: .3rem .3rem 0;
        width: 5.8rem;
        background: url("../../static/images/coupon-choose1.png") no-repeat right center ;
        background-size: .38rem .38rem;
        .coupon-msg-list{
            float: left;
            .coupon-top{
                width: 5.2rem;
                height: .1rem;
                background: url("../../static/images/coupon-choose-bg1.png") no-repeat;
                background-size: 5.2rem .1rem;
            }
            .coupon-item{
                padding: .3rem 0 0 .3rem;
                width: 4.9rem;
                background:#fff;
                div{
                    float: left;
                }
                .coupon-left{
                    padding-right: .36rem;
                    .coupon-rate{
                        font-size: .3rem;
                        color: #f75c5c;
                        .rate{
                            font-size: .6rem;
                        }
                    }
                }
                .coupon-right{
                    width:2.9rem;
                    ul li{
                        font-size: .22rem;
                        color: #999;
                    }
                }
            }
            .coupon-bottom{
                padding:.24rem 0 .2rem .4rem;
                width: 4.8rem;
                height: .22rem;
                line-height: .22rem;
                background: url("../../static/images/coupon-choose-bg.png") no-repeat;
                background-size: 5.2rem .66rem;
                span{
                    float: left;
                    height: .22rem;
                    font-size: .22rem;
                    color: #ccc;
                    letter-spacing: .02rem;
                }
            }
        }
    }
    .coupon-choose-yes{
        background: url("../../static/images/coupon-choose2.png") no-repeat right center ;
        background-size: .38rem .38rem;
    }
}

</style>
