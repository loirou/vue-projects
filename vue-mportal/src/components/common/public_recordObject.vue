/**
* Created by gyr on 16/10/26.
*
* Des: 我的-投资记录-还款中和已还清 中间部分公共组件
* statusRepay: IRP: 还款中，NCL：已结清
*
*/

<template>
<div class="con" :class="theme" @click="go_info('product')">
  <div class="clearfix">
    <span class="conTopLeft">
      <span class="box-tit-icon"></span>
      <span>{{item.targetName}}</span>
    </span>
    <slot name="box-right"></slot>
  </div>
  <div class="conMiddle clearfix" :class="{'coupon': hasCoupon}">
    <div class="rate">
      <span class="rate-tit">年化收益率(%)</span>
      <span class="rate-num">
        <!--此部分有加息券才显示-->
        <span v-if="hasCoupon"  class="coupon-tag"></span>
        <!--此部分有加息券才显示-->
        {{{item.interestRate | handleNum}}}{{{plusRate | handleNum true }}}
      </span>
    </div>
    <span class="middleLine"></span>
    <div class="deadline">
      <span class="deadline-tit">期限(天)</span>
      <span class="deadline-num">{{item.duration}}</span>
    </div>
    <span class="middleLine"></span>
    <div class="benefit">
      <span class="benefit-tit" v-text="profitTitle||'预计总收益(元)'"></span>
      <span class="benefit-num">{{{item.preInterest | handlePreInterest}}}</span>
    </div>
  </div>
  <slot name="des"></slot>
</div>
</template>

<script>
export default {
  props: ['item', "statusRepay", "profitTitle"],
  data() {
    return {
      hasCoupon: this.item.couponValue && this.item.couponValue!=0
    }
  },
  filters: {
    handleNum(val, sub) {
      if (!val) return '';
      val = parseFloat(val * 100).toFixed(2);
      if (sub === true) {
        return "<b style='font-size: .3rem;font-weight: normal;'>+" + val + "</b>";
      }
      var row = val.split(".");
      var style = '';
      if (this.item.discountRate)
        style = "style='font-size: .3rem;'";
      return "<b style='font-size: .5rem;font-weight: normal;'>" + row[0] + "</b><label " + style + ">." + row[1] + "</label>";
    },
    handlePreInterest(val) {

      if (!val) return "<b style='font-size: .5rem;font-weight: normal;'>" + 0 + "</b>.00";
      //val = parseFloat(val).toFixed(2).floor;
      val = val + "";
      val = val.substring(0, val.lastIndexOf('.') + 3);
      var row = val.split(".");
      if (!row[1]) {
        row[1] = "00";
      }
      return "<b style='font-size: .5rem;font-weight: normal;'>" + row[0] + "</b>." + row[1];
    }
  },
  methods: {
    go_info: function(name) {
      //还款中
      if (this.statusRepay === "IRP") {
        router.go({
          name: name,
          params: {
            targetId: this.item.targetId
          },
          query: {
            targetType: this.item.targetType
          }
        });
      }
    }
  },
  computed: {
    theme: function() {
      let color = 'blue';
      const type = this.item.targetType;
      const status = this.statusRepay;
      switch (status) {
        // 还款中
        case "IRP":
          // 固收
          if (type == 1) {
            color = 'blue';
          } else {
            // 散标
            color = 'yellow';
          }
          break;
        // 已结清
        case "NCL":
          color = 'gray';
          break;
        default:
          color = 'blue';
          break;
      }
      return color;
    },
    plusRate: function() {
      var discountRate = "";
      discountRate = this.item.discountRate ? this.item.discountRate : this.item.couponValue;
      return discountRate;
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";

.con {
    margin-top: 0.2rem;
    background: #fff;
    .conTopLeft {
        float: left;
        margin-top: 0.26rem;
        padding: 0 0.36rem 0 0.3rem;
        border-bottom-right-radius: 0.96rem;
        border-top-right-radius: 0.96rem;
        height: .26rem;
        line-height: .28rem;
        font-size: .26rem;
        color: #fff;
        .box-tit-icon {
            float: left;
            width: 0.06rem;
            height: 0.26rem;
            border-radius: 0.03rem;
            margin-right: 0.12rem;
        }
    }
    .conMiddle {
        padding-left: 0.3rem;
        height: 1.21rem;
        line-height: 1.21rem;
        //width: 100%;
        border-bottom: $public-border solid #efefef;
        .rate {
            float: left;
            width: 1.9rem;
            height: 0.71rem;
            padding: 0.25rem 0;
            .rate-tit {
                display: block;
                height: 0.25rem;
                line-height: 0.25rem;
                font-size: 0.2rem;
                color: #cccccc;
                font-family: PingFangSC-Light;
            }
            .rate-num {
                position: relative;
                padding-top: 0.05rem;
                height: 0.5rem;
                line-height: 0.5rem;
                color: #f75959;
                display: block;
                font-size: 0.3rem;
                font-family: PingFangSC-Light;
                .coupon-tag {
                    display: block;
                    float: right;
                    top: 0.06rem;
                    left: 1rem;
                    position: absolute;
                    background: url("../../static/images/product-tag.png") no-repeat;
                    background-size: 0.7rem 0.3rem;
                    width: 0.7rem;
                    height: 0.3rem;
                }
            }
        }
        .deadline {
            float: left;
            width: 1.63rem;
            height: 0.71rem;
            padding: 0.25rem 0;
            text-align: center;
            .deadline-tit {
                display: block;
                height: 0.25rem;
                line-height: 0.25rem;
                font-size: 0.2rem;
                font-weight: lighter;
                color: #cccccc;
                font-family: PingFangSC-Light;
            }
            .deadline-num {
                padding-top: 0.05rem;
                font-family: PingFangSC-Light;
                height: 0.5rem;
                line-height: 0.5rem;
                color: #000;
                display: block;
                font-size: 0.5rem;
            }
        }
        .benefit {
            float: left;
            width: 1.74rem;
            height: 0.71rem;
            padding: 0.25rem 0;
            text-align: left;
            padding-left: 0.4rem;
            .benefit-tit {
                display: block;
                height: 0.25rem;
                line-height: 0.25rem;
                font-size: 0.2rem;
                font-weight: lighter;
                color: #cccccc;
                font-family: PingFangSC-Light;
            }
            .benefit-num {
                padding-top: 0.05rem;
                //margin-right: .28rem;
                height: 0.5rem;
                line-height: 0.5rem;
                color: #f75959;
                display: block;
                font-size: 0.3rem;
                font-family: PingFangSC-Light;
            }
        }
        .middleLine {
            margin-top: 0.29rem;
            float: left;
            height: 0.7rem;
            width: 1px;
            background: #efefef;
        }
    }

    .conMiddle.coupon {
      height: 1.31rem;
      line-height: 1.31rem;
    }
    .conMiddle.coupon .rate .rate-num {
      padding-top: .15rem;
    }
    .conMiddle.coupon .deadline .deadline-num {
      padding-top: .15rem;
    }
    .conMiddle.coupon .benefit .benefit-num {
      padding-top: .15rem;
    }
    .conMiddle.coupon .middleLine {
      height: .8rem;
    }
}

.con.yellow .box-tit-icon {
    background-color: #ff6d15;
}
.con.blue .box-tit-icon {
    background-color: #83bdfe;
}
.con.gray .box-tit-icon {
    background-color: #ccc;
}
.con.yellow .conTopLeft {
    color: #333;
}
.con.blue .conTopLeft {
    color: #333;
}
.con.gray .conTopLeft {
    color: #ccc;
}
</style>
