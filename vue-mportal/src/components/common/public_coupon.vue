/**
* Created by gyr on 17/2/7.
*
* Des:我的-卡券信息组件
*
*/
<template>
    <div class="coupon-section">
        <div class="coupon-item clearfix">
            <div class="coupon-left clearfix">
                <span class="coupon-tag" :style="{color:getColor,borderColor:getColor}" v-text="getName"></span>
                <div class="coupon-rate" :style="{color:getColor}" >
                    <span class="rate" v-html="getRate"></span>
                </div>
            </div>
            <div class="coupon-right">
                <ul>
                    <li v-text="item.categoryScopeDesc"></li>
                    <li v-text="item.quotaDesc"></li>
                    <li v-text="getDate"></li>
                </ul>
            </div>
        </div>
        <div v-if="item.status == 4" class="coupon-button coupon-button-use" @click="go_fixed_list('fixed')">
            立即使用
        </div>
        <div v-if="item.status == 5"  class="coupon-button coupon-button-stop">
            已使用
        </div>
        <div v-if="item.status == 6"  class="coupon-button coupon-button-stop">
            已过期
        </div>
    </div>
</template>
<script>
export default {
    props: ["item"],
    data() {
        return {

        }
    },
    computed: {
        getColor: function (){
            var status = this.item.status;
            if(status != 4){
                return '#ccc';
            }else{
                return '#f75c5c';
            }
        },
        getRate: function (){
            var rate = parseFloat(this.item.value * 100);
            return "+" + "<span style='font-size: .6rem;font-weight: normal;'>" + rate + "</span> %" ;
        },
        getDate: function (){
            var expirationTime = this.item.expirationTime;
            return "有效期：" + (new Date(expirationTime)).Format("yyyy年MM月dd日");
        },
        getName: function (){
            var name = this.item.name;
            name = "加息券";
            return name;
        }
    },
    methods: {
        go_fixed_list: function (msg){
            router.go({name:msg});
        }
    }
}
</script>
<style lang="sass" scoped>
@import "../../common/css/common";
.coupon-section{
    margin: .3rem .3rem 0;
    width: 5.8rem;
    .coupon-item{
        width: 5.28rem;
        padding: .3rem .2rem .3rem .3rem;
        border-top: $public-border solid #eee;
        border-left: $public-border solid #eee;
        border-right: $public-border solid #eee;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background:#fff;
        div{
            float: left;
        }
        .coupon-left{
            width: 1.5rem;
            height: 1.12rem;
            .coupon-tag{
                float: left;
                font-weight: lighter;
                text-align: center;
                padding: 0 .1rem;
                border-width: $public-border;
                border-style: solid;
                font-size: .2rem;
                border-radius: .64rem;

            }
            .coupon-rate{
                width: 100%;
                font-size: .3rem;
                padding: .08rem 0 0 0;
                .rate{
                    font-size: .3rem;
                }
            }
        }
        .coupon-right{
            width: 2.76rem;
            margin-top: .22rem;
            margin-left:.32rem;
            padding-left:.5rem;
            border-left:$public-border solid #f0f0f0;
            ul li{
                 padding-left: .1rem;
                 font-size: .22rem;
                 background: url("../../static/images/point.png") no-repeat left .14rem;
                 background-size: .04rem .04rem;
                 color: #999;
            }
        }
    }
    .coupon-button{
        padding-top: .4rem;
        height: .55rem;
        text-align: center;
        font-size: .26rem;
        color: #fff;
        letter-spacing: .02rem;
    }
    .coupon-button-use{
        background: url("../../static/images/coupon-bg1.png") no-repeat;
        background-size: 5.8rem .95rem;
    }
    .coupon-button-stop{
        background: url("../../static/images/coupon-bg2.png") no-repeat;
        background-size: 5.8rem .95rem;
    }
}
</style>
