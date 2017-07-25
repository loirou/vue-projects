/**
 * Created by Darren on 16/10/20.
 *
 * Des: 产品详情主页
 *
 */
<template>
    <div class="pro-info">
        <pb-object-top msg="产品详情" back="true"></pb-object-top>
        <mt-loadmore v-if="!showMore"
            :bottom-method="loadMore"
            :bottom-status.sync="bottomStatus"
            :auto-fill="false" transition="pro1">
            <pro-info-1 :info_1="info_1" :coupon_data="couponData" :target_type="type_info.targetType">
                <div class="view-more"><span>向上拖动，查看更多</span></div>
            </pro-Info-1>
            <div slot="bottom" class="loading-more">
                <i v-show="bottomStatus === 'loading'"></i>
            </div>
        </mt-loadmore>
        <mt-loadmore v-if="showMore"
            :top-method="loadTop"
            :top-status="topStatus"
            :auto-fill="false" transition="pro2">
            <pro-info-2 class="container" :type_info="type_info">
                <div class="view-top"><span>向下拖动，返回详情</span></div>
            </pro-Info-2>
            <div slot="top" class="mint-loadmore-top">
            </div>
        </mt-loadmore>

        <pb-btn-buy :info_1="info_1" :times="times" :coupon="couponData"></pb-btn-buy>
    </div>
</template>

<script>
import public_ObjectTop from '../common/public_ObjectTop.vue';
import public_pTop from '../common/public_ptop.vue';
import public_BuyButtion from '../common/public_BuyButtion.vue';
import pro_Info1 from './pro_Info1.vue';
import pro_Info2 from './pro_Info2.vue';

import Loadmore from 'mint-ui/lib/loadmore';

import http_url from '../../common/js/http-url.js';


export default {

    data() {
        return {
            showMore: false,
            bottomStatus: '',
            topStatus: '',
            info_1: {},
            info_2: {},
            times:{
                days: '00',
                hours: '00',
                minutes: '00',
                seconds: '00'
            },
            type_info:{
                assetType:"",
                targetType:"",
                targetId:""
            },
            couponData:{}
        }
    },
    components: {
        "pro-info-1": pro_Info1,
        "pro-info-2": pro_Info2,
        "pb-object-top": public_ObjectTop,
         "pb-padding-top":public_pTop,
        "pb-btn-buy": public_BuyButtion,
        "mt-loadmore": Loadmore
    },
    created:function(){
        this.$http({
            method:"POST",
            url:http_url.buy_info1,
            body:{
                "type":this.$route.query.targetType,
                "id":this.$route.params.targetId
            }
        }).then((response) => {
            if(response.data.code == 200){
                this.data_processing(response.data.data);
            }
        }, (response) => {
            console.error(response);
        });
        //获取有无加息券数据
        this.getCouponData();
    },
    methods: {
        getCouponData: function(){
            var projectId = this.$route.params.targetId;
            var targetType = this.$route.query.targetType;
            if(targetType == 1) {
                this.$http({
                    method:"GET",
                    url: http_url.coupon + "/1/" +projectId+ "/tip" //350为项目id 需要从标的详情传过来
                }).then((res)=>{
                    //console.log(res);
                    if(res.data.code == 200){
                        var data = res.data.data;
                        this.couponData = data;
                    }
                })
            }

        },
        data_processing:function(info_data){
            this.info_1 = info_data;
            if(this.info_1.status === "2"){
                this.info_1.residualDays = "未开始";
            }
            this.type_info.assetType = info_data.assetType;
            this.type_info.targetType = info_data.targetType;

            this.time(info_data.countdown);
        },
        menu_go_list: function(msg) {
            router.go(msg);
        },
        loadMore: function(id) {
            this.$http({
                method:"POST",
                url:http_url.buy_info1,
                body:{
                    "type":this.$route.query.targetType,
                    "id":this.$route.params.targetId
                }
            }).then((response) => {
                setTimeout(function() {
                    this.showMore = true;
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                    window.scrollY = 0;
                    this.$broadcast('onBottomLoaded', id);
                }.bind(this), 500);
                if(response.data.code == 200){
                    this.info_2 = response.data.data;
                }else{
                    console.error(response.data);
                }

            }, (response) => {
                console.error(response.data);
            });
        },
        loadTop: function(id) {
                this.showMore = false;
                this.$broadcast('onTopLoaded', id);
        },
        time: function(countdown){
            var totalSeconds = countdown || 0;
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
                    this.times.days = days < 10 ? ('0' + days) : days;
                    this.times.hours = hours < 10 ? ('0' + hours) : hours;
                    this.times.minutes = minutes < 10 ? ('0' + minutes) : minutes;
                    this.times.seconds = seconds < 10 ? ('0' + seconds) : seconds;

                    totalSeconds--;
                    if (totalSeconds < 0) {
                        this.info_1.status = '1';
                        clearInterval(countInterval);
                    }
                }.bind(this), 1000);
            }
        }
    }
}
</script>

<style lang="sass" scoped>
    @import "../../common/css/common";
.info{
    // padding: 1.18rem .8rem .3rem .8rem;
    padding-top: 1.18rem;
    background: #ffffff;
    .top{
        padding-left: .6rem;
        padding-right: .6rem;
    }
    .bottom{
        margin-top: .1rem;
    }
    .title{
        text-align: center;
    }
    .title span{
        font-size: .3rem;
        color: #000;
    }
    .tag{
        text-align: center;
        margin-top: .1rem;
            span{
            display: inline-block;
            border-radius: .64rem .64rem .64rem .64rem;
            width: 1.08rem;
            height: .32rem;
            line-height: .32rem;
            font-size: .22rem;
            font-weight: lighter;
            text-align: center;
            color: #ffb046;
            border: $public-border solid #ffb046;
        }
    }
    .receive{
        margin-top: .35rem;
        text-align: center;
        .des{
            font-size: .22rem;
            color: #999;
        }
        .num{
            font-size: .9rem;
            color: #f75c5c;
        }
    }
    .des{
        span{
            float: left;
        }
        .des-info{
            float: left;
            width: 1.5rem;
            // width: 1rem;
            text-align: center;
            &:nth-of-type(2){
                width: 2.2rem;
                // text-align: center;
                border-left: $public-border solid #efefef;
                border-right: $public-border solid #efefef;
                box-sizing:border-box;
                -moz-box-sizing:border-box; /* Firefox */
                -webkit-box-sizing:border-box; /* Safari */
            }
            &:nth-of-type(3){
                // text-align: right;
            }
            .des{
                font-size: .22rem;
                color: #999;
            }
            .num{
                font-size: .36rem;
                color: #666666;
            }
        }
    }
}
.info-menu-list{
    margin-top: .3rem;
    background-color: #ffffff;
    padding-left: .3rem;
    .info-list-img{
        float: left;
        display: inline-block;
        width: 0.48rem;
        height: 0.48rem;
    }
    .info-list-des{
        float: left;
        font-size: .28rem;
        margin-left: .3rem;
        line-height: .461rem;
    }
    .info-list-right{
        float: right;
        font-size: .28rem;
        color: #999;
        line-height: .461rem;
        margin-right: .3rem;
    }
    .property-right{
        float: right;
        display: inline-block;
        width: 0.16rem;
        height: 0.28rem;
        background: url('../../static/images/right-next.png') no-repeat;
        background-size: .16rem .28rem;
        margin-right: .3rem;
        margin-top: .06rem;
    }
    .timeStart{
        background:url('../../static/images/Buy/buy_1.png') no-repeat 0 0 /.48rem .48rem;
    }
    .timeEnd{
        background:url('../../static/images/Buy/buy_2.png') no-repeat 0 0 /.48rem .48rem;
    }
    .Money1{
        background:url('../../static/images/Buy/buy_3.png') no-repeat 0 0 /.48rem .48rem;
    }
    .Money2{
        background:url('../../static/images/Buy/buy_4.png') no-repeat 0 0 /.48rem .48rem;
    }
    .Money3{
        background:url('../../static/images/Buy/buy_5.png') no-repeat 0 0 /.48rem .48rem;
    }
    .Money4{
        background:url('../../static/images/Buy/buy_6.png') no-repeat 0 0 /.48rem .48rem;
    }
    .Money4{
        background:url('../../static/images/Buy/buy_6.png') no-repeat 0 0 /.48rem .48rem;
    }
    .way{
        background:url('../../static/images/Buy/buy_8.png') no-repeat 0 0 /.48rem .48rem;
    }
    .about{
        background:url('../../static/images/Buy/buy_7.png') no-repeat 0 0 /.48rem .48rem;
    }
}
.line{
    margin-left: .55rem;
    display: block;
    height: .6rem;
    width: .02rem;
    background: #efefef;
}
.pro-info {
    padding-bottom: .88rem;
}
.view-more {
    padding: .3rem 0;
    text-align: center;
    font-size: .22rem;
    color: #666;
    span {
        display: inline-block;
        background: url("../../static/images/up.png") no-repeat;
        background-size: .2rem .2rem;
        height: .2rem;
        line-height: .2rem;
        padding-left: .32rem;
    }
}
.view-top {
    //margin-top: $public-nav-height;
    //margin-top: .88rem;
    height: .88rem;
    line-height: .88rem;
    //padding: .3rem 0;
    text-align: center;
    font-size: .22rem;
    color: #666;
    span {
        display: inline-block;
        background: url("../../static/images/down.png") no-repeat;
        background-size: .2rem .2rem;
        height: .2rem;
        line-height: .2rem;
        padding-left: .32rem;
    }
}
.loading-more {
    //padding: .3rem 0;
    text-align: center;
    font-size: .22rem;
    color: #666;
    i {
        display: inline-block;
        background: url("../../static/images/loading.gif") no-repeat;
        background-size: .32rem .32rem;
        width: .32rem;
        height: .32rem;
        line-height: .32rem;
    }
}
// v-cloak
[v-cloak] {
  display: none;
}

.pro1-transition {
  transition: transform .3s ease-in-out;
}
.pro1-enter {
  transform: translate3d(0, -100%, 0);
}
.pro1-leave {
    display: none;
}

.pro2-transition {
  transition: transform .3s ease-in-out;
}
.pro2-enter {
  transform: translate3d(0, 100%, 0);
}
.pro2-leave {
    display: none;
}
</style>
