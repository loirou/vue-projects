/**
* Created by gyr on 16/11/30.
*
* Des: 我的-我的银行卡说明
*
*/

<template>
<pb-object-top msg="银行卡说明" back="true">
</pb-object-top>
<pb-padding-top></pb-padding-top>
<div class="declare-content">
  <div class="declare-body">
    <div class="clearfix">
      <span class="image"></span>
      <span class="des">支持绑定的银行卡及限额</span>
    </div>
    <div class="table">
      <div class="title clearfix">
        <div class="left">银行卡名称</div>
        <div class="right">
          <div class="top">限额</div>
          <div class="down">
            <div>实时单笔</div>
            <div>实时限额</div>
          </div>
        </div>
      </div>
      <div class="infos">
        <div class="info" v-for="item in banks" track-by="$index">
          <span class="info-1">{{item.bankName}}</span>
          <span class="info-2">{{item.singleDesc}}</span>
          <span class="info-2">{{item.singleDayDesc}}</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import public_ObjectTop from '../common/public_ObjectTop.vue';
import public_pTop from '../common/public_ptop.vue';

export default {
  data() {
    const banks = JSON.parse(this.Storage.get('BANKS')) || [];
    return {
      banks: banks
    }
  },
  components: {
    "pb-object-top": public_ObjectTop,
    "pb-padding-top": public_pTop
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";

.declare-content {
    padding: 0.2rem+$status-bar-height 0.2rem 0.2rem;
    //padding-top:$public-nav-height+.2rem+$status-bar-height;
    padding-top: 0.2rem+$status-bar-height;
    .declare-body {
        padding: 0.28rem 0.3rem 0.3rem;
        background-color: #ffffff;
        border: $public-border solid #dddddd;
        box-sizing: border-box;
        border-radius: 10px;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        .image {
            float: left;
            width: 0.34rem;
            height: 0.34rem;
            background: url('../../static/images/des.png') no-repeat;
            background-size: 0.34rem 0.34rem;
        }
        .des {
            float: left;
            color: #000;
            font-size: 0.28rem;
            margin-top: -0.04rem;
            margin-left: 0.1rem;
        }
        .table {
            margin-top: 0.22rem;
            .title {
                background-color: #fafafa;
                border: $public-border solid #dddddd;
                box-sizing: border-box;
                -moz-box-sizing: border-box;
                -webkit-box-sizing: border-box;
                .left {
                    float: left;
                    text-align: center;
                    line-height: 1rem;
                    font-size: 0.24rem;
                    color: #666;
                    width: 2.46rem;
                }
                .right {
                    float: left;
                    width: 2.86rem;
                    text-align: center;
                    .top {
                        font-size: 0.24rem;
                        color: #666;
                        height: 0.5rem;
                        line-height: 0.5rem;
                        border-left: $public-border solid #dddddd;
                        box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        -webkit-box-sizing: border-box;
                    }
                    .down div {
                        float: left;
                        text-align: center;
                        width: 1.43rem;
                        height: 0.5rem;
                        line-height: 0.5rem;
                        font-size: 0.22rem;
                        color: #666;
                        border-top: $public-border solid #dddddd;
                        border-left: $public-border solid #dddddd;
                        box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        -webkit-box-sizing: border-box;
                    }
                }
            }
            .infos .info {
                height: 0.5rem;
                border-bottom: $public-border solid #dddddd;
                border-left: $public-border solid #dddddd;
                border-right: $public-border solid #dddddd;
                box-sizing: border-box;
                -moz-box-sizing: border-box;
                -webkit-box-sizing: border-box;
                span {
                    float: left;
                    font-size: 0.22rem;
                    color: #999;
                    text-align: center;
                    line-height: 0.5rem;
                }
                .info-1 {
                    width: 2.46rem;
                }
                .info-2 {
                    width: 1.43rem;
                    border-left: $public-border solid #dddddd;
                    box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    -webkit-box-sizing: border-box;
                }
            }
        }
    }
}
</style>
