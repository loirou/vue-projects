/**
* Created by gyr on 16/10/13.
*
* Des: 散标固收及首页 每个标的详情组件
*   1:可以购买
*   2:预售(倒计时)
*   3:售罄
*   4:到期
*/

<template>
<div class="con" :class="theme" @click="go_info('product')">
  <div class="conTop pre-sale" v-if="item.status=='2'">
    <div class="box-tit clearfix">
      <span class="box-tit-left">
        <span class="box-tit-icon"></span>
      <span>{{item.targetName}}</span>
      </span>
      <span class="box-tags"><slot name="box-center"></slot></span>
      <slot name="box-right"></slot>
    </div>
    <div class="box-content-t">
      <div class="benefit clearfix">
        <div class="benefit-box">
          <span class="benefit-tit">年化收益率(%)</span>
          <span class="benefit-num">{{{item.interestRate | handleNum}}}{{{item.discountRate | handleNum true }}}</span>
        </div>
        <i class="box-con-line-left"></i>
      </div>
      <div class="deadline">
        <div class="deadline-box">
          <span class="deadline-tit">期限(天)</span>
          <span class="deadline-num">{{item.duration}}</span>
        </div>
        <i class="box-con-line-right"></i>
      </div>
      <div class="time-left">
        <div class="time-left-box">
          <span class="time-left-tit">发售倒计时</span>
          <span class="time-left-ctt">
            <span class="section"><label class="num" v-text="days"></label><label class="des">天</label></span>
            <span class="section"><label class="num" v-text="hours"></label><label class="des">时</label></span>
            <span class="section"><label class="num" v-text="minutes"></label><label class="des">分</label></span>
            <span class="section"><label class="num" v-text="seconds"></label><label class="des">秒</label></span>
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="conTop" v-else>
    <div class="box-tit clearfix">
      <span class="box-tit-left">
        <span class="box-tit-icon"></span>
      <span>{{item.targetName}}</span>
      </span>
      <span class="box-tags"><slot name="box-center"></slot></span>
      <slot name="box-right"></slot>
    </div>
    <div class="box-content">
      <div class="benefit clearfix">
        <div class="benefit-box">
          <span class="benefit-tit">年化收益率(%)</span>
          <span class="benefit-num">
            {{{item.interestRate | handleNum}}}{{{item.discountRate | handleNum true }}}
            <!--此部分有加息券才显示 且在列表页不显示 只在我的投资记录 投标中显示 -->
            <span v-if="item.couponValue && item.couponValue!=0" class="coupon-tag">
              {{item.couponValue | getCoupon}}
            </span>
          <!--此部分有加息券才显示-->
          </span>
        </div>
        <i class="box-con-line"></i>
      </div>
      <div class="deadline">
        <div class="deadline-box">
          <span class="deadline-tit">期限(天)</span>
          <span class="deadline-num">{{item.duration}}</span>
        </div>
      </div>
    </div>
  </div>
  <slot name="des"></slot>
  <slot v-if="item.status!='2'"></slot>
</div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
      msg: ''
    }
  },
  created() {
    var totalSeconds = this.item.countdown || 0;
    //倒计时
    if (totalSeconds > 0) {
      var countInterval = setInterval(function() {
        // 剩余天数
        var days = parseInt(totalSeconds / 60 / 60 / 24);
        // 天数转成秒数
        var daysToSeconds = days * 24 * 60 * 60;
        // 剩余小时
        var hours = parseInt((totalSeconds - daysToSeconds) / 60 / 60);
        // 小时转成秒数
        var hoursToSeconds = hours * 60 * 60;
        // 剩余分钟
        var minutes = parseInt((totalSeconds - daysToSeconds - hoursToSeconds) / 60);
        // 分钟转成秒数
        var minutesToSeconds = minutes * 60;
        // 剩余秒数
        var seconds = totalSeconds - daysToSeconds - hoursToSeconds - minutesToSeconds;
        // 如果是一位数，前面补0
        this.days = days < 10 ? ('0' + days) : days;
        this.hours = hours < 10 ? ('0' + hours) : hours;
        this.minutes = minutes < 10 ? ('0' + minutes) : minutes;
        this.seconds = seconds < 10 ? ('0' + seconds) : seconds;

        totalSeconds--;
        if (totalSeconds < 0) {
          this.item.status = '1';
          clearInterval(countInterval);
        }
      }.bind(this), 1000);
    }
  },
  methods: {
    go_info: function(name) {
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
      if (this.item.discountRate || this.item.couponValue) { //只要后面有加息的情况 样式就改变
        style = "style='font-size: .3rem;'";
        return "<b style='font-size: .6rem;font-weight: normal;'>" + row[0] + "</b><label " + style + ">." + row[1] + "</label>";
      } else {
        style = "style='font-size: .4rem;'";
        return "<b style='font-size: .6rem;font-weight: normal;'>" + row[0] + "</b><label " + style + ">." + row[1] + "</label>";
      }
    },
    getCoupon(val) {
      if (!val) return '';
      val = "+" + parseFloat(val * 100).toFixed(2);
      return val;
    }
  },
  computed: {
    theme: function() {
      let color = 'blue';
      const status = this.item.status;
      switch (status) {
        case "2":
          color = 'yellow'
          break;
        case "3":
        case "4":
          color = 'gray';
          break;
        default:
          color = 'blue';
          break;
      }
      return color;
    },
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";

.con {
    margin-top: 0.2rem;
    background: #ffffff;
    .conTop {
        .box-tit {
            .box-tit-left {
                float: left;
                margin-left: 0.3rem;
                height: 0.26rem;
                line-height: 0.28rem;
                font-size: 0.26rem;
                // color: #333;
                margin-top: 0.26rem;
                margin-right: 0.06rem;
                .box-tit-icon {
                    float: left;
                    width: 0.06rem;
                    height: 0.26rem;
                    border-radius: 0.03rem;
                    margin-right: 0.12rem;
                }
            }
            .box-tags {
                margin-top: 0.26rem;
                float: left;
                line-height: 0.26rem;
            }
        }
        .box-content {
            height: 1.3rem;
            border-bottom: $public-border solid #efefef;
            font-family: PingFangSC-Light;
            .benefit {
                width: 50%;
                height: 100%;
                float: left;
                .benefit-box {
                    padding-top: 0.24rem;
                    padding-left: 1rem;
                    .benefit-tit {
                        line-height: 0.3rem;
                        display: block;
                        font-size: 0.24rem;
                        //font-weight: lighter;
                        color: #cccccc;
                    }
                    .benefit-num {
                        height: 0.6rem;
                        line-height: 0.6rem;
                        color: #f75959;
                        display: block;
                        font-size: 0.4rem;
                        position: relative;
                        // padding-top: 0.08rem;
                        .coupon-tag {
                            top: 0.04rem;
                            //left: .8rem;
                            position: absolute;
                            background: url("../../static/images/product-tag.png") no-repeat;
                            background-size: 0.7rem 0.3rem;
                            //width: .7rem;
                            //height: .3rem;
                            padding-top: 0.15rem;
                            font-size: 0.3rem;
                        }
                    }
                }
                .box-con-line {
                    margin-top: -.86rem;
                    margin-left: $custom-max-width*0.5;
                    display: block;
                    height: 0.76rem;
                    width: $public-border;
                    background: #efefef;
                }
            }
            .deadline {
                float: left;
                .deadline-box {
                    padding-top: 0.24rem;
                    padding-left: 0.6rem;
                    .deadline-tit {
                        line-height: 0.3rem;
                        font-size: 0.24rem;
                        color: #cccccc;
                        display: block;
                    }
                    .deadline-num {
                        // padding-top: 0.08rem;
                        height: 0.6rem;
                        line-height: 0.6rem;
                        display: block;
                        color: #000;
                        font-size: 0.6rem;
                    }
                }
            }
        }
        .box-content-t {
            height: 1.25rem;
            border-bottom: $public-border solid #efefef;
            font-family: PingFangSC-Light;
            .benefit {
                width: $custom-max-width * 0.38;
                height: 100%;
                float: left;
                //padding-left: .3rem;
                .benefit-box {
                    padding-top: 0.24rem;
                    padding-left: 0.35rem;
                    .benefit-tit {
                        line-height: 0.3rem;
                        display: block;
                        font-size: 0.24rem;
                        //font-weight: lighter;
                        color: #cccccc;
                    }
                    .benefit-num {
                        height: 0.6rem;
                        line-height: 0.6rem;
                        color: #f75959;
                        display: block;
                        font-size: 0.4rem;
                    }
                }
                .box-con-line-left {
                    margin-top: -.86rem;
                    margin-left: $custom-max-width * 0.38;
                    display: block;
                    height: 0.76rem;
                    width: $public-border;
                    background: #efefef;
                }
            }
            .deadline {
                width: $custom-max-width * 0.24;
                float: left;
                text-align: center;
                overflow: hidden;
                .deadline-box {
                    padding-top: 0.24rem;
                    .deadline-tit {
                        line-height: 0.3rem;
                        font-size: 0.24rem;
                        color: #cccccc;
                        display: block;
                    }
                    .deadline-num {
                        height: 0.6rem;
                        line-height: 0.6rem;
                        display: block;
                        color: #000;
                        font-size: 0.5rem;
                    }
                }
                .box-con-line-right {
                    margin-top: -.86rem;
                    margin-left: $custom-max-width * 0.24 - 0.01rem;
                    display: block;
                    height: 0.76rem;
                    width: $public-border;
                    background: #efefef;
                }
            }
            .time-left {
                width: $custom-max-width * 0.38;
                float: left;
                height: 100%;
                .time-left-box {
                    padding-top: 0.24rem;
                    padding-left: 0.4rem;
                    .time-left-tit {
                        line-height: 0.3rem;
                        font-size: 0.24rem;
                        color: #cccccc;
                        display: block;
                    }
                    .time-left-ctt {
                        height: 0.6rem;
                        line-height: 0.6rem;
                        display: block;
                        color: #000;
                        font-size: 0.6rem;
                        // padding-top: 0.08rem;
                        .section {
                            box-sizing: border-box;
                            display: inline-block;
                            float: left;
                            width: 0.36rem;
                            height: 0.44rem;
                            background-color: #f1f1f1;
                            border-radius: 0.04rem;
                            border: 1px solid #cccccc;
                            font-size: 0.16rem;
                            color: #000000;
                            margin-right: 0.08rem;
                            text-align: center;
                            font-family: PingFangSC-Medium;
                            label {
                                width: 100%;
                                display: block;
                                float: left;
                                //height: .22rem;
                                line-height: 0.22rem;
                            }
                            .num {
                                padding-top: 0.02rem;
                                //margin-top: -0.02rem;
                            }
                            .des {
                                filter: Alpha(Opacity=50);
                                opacity: 0.5;
                                margin-top: -0.03rem;
                            }
                        }
                        :last-child {
                            margin-right: 0;
                        }
                    }
                }
            }
        }
    }
}

.con.lg {
    margin-top: 0.2rem;
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
.con.yellow .box-tit-left {
    color: #333;
}
.con.blue .box-tit-left {
    color: #333;
}
.con.gray .box-tit-left {
    color: #ccc;
}
</style>
