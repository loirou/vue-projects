/**
* Created by gyr on 16/10/18.
*
* Des: 提现完成页面
*
*/
<template>
    <pb-object-top msg="提现"></pb-object-top>
    <pb-padding-top></pb-padding-top>
    <div class="finish">
        <div class="finish-total">
            <span class="finish-title finish-pl3">提现</span>
            <span class="finish-content finish-num">{{finish.amount | handleNum}}</span>
        </div>
        <ul class="finish-detail">
            <li class="finish-list">
                <span class="finish-title">提现账户</span>
                <span class="finish-content">{{finish.mobile}}</span>
            </li>
            <li class="finish-list">
                <span class="finish-title">发行卡</span>
                <span class="finish-content">{{finish.bankName}}</span>
            </li>
            <li class="finish-list">
                <span class="finish-title">银行卡号</span>
                <span class="finish-content">{{finish.bankAccountMask}}</span>
            </li>
            <li class="finish-list">
                <span class="finish-title">手续费</span>
                <span class="finish-content">{{finish.serviceFee | handleNum}}</span>
            </li>
            <li class="finish-list">
                <span class="finish-title">到账金额</span>
                <span class="finish-content">{{finish.orderAmount | handleNum}}</span>
            </li>
            <li class="finish-list">
                <span class="finish-title">预计到账时间</span>
                <span class="finish-content">{{finish.arrivalTime}}</span>
            </li>
            <li class="finish-list">
                <span class="finish-title">操作状态</span>
                <span class="finish-content finish-status">处理中...</span>
            </li>
        </ul>
        <div class="withdraw-btn">
            <pb-button cls="btn-lg" @click="submit">完成</pb-button>
        </div>
    </div>
</template>
<script>
    import public_ObjectTop from '../common/public_ObjectTop.vue';
    import public_pTop from '../common/public_ptop.vue';
    import public_button from '../common/public_button';
    import http_url from '../../common/js/http-url.js';
    export default {
        data() {
            return {
                finish:{}
            };
        },
        components: {
            "pb-object-top": public_ObjectTop,
            "pb-padding-top":public_pTop,
            "pb-button": public_button
        },
        methods: {
            loadData: function(){
                var orderNo = this.$route.params.orderNo;
                this.$http({
                    method:"GET",
                    url:http_url.my_withdraw_finish + orderNo
                }).then((response) => {
                    if(response.data.code == 200 ){
                        this.finish = response.body.data;
                    }
                });
            },
            submit: function(){
                router.go('/my');
            }
        },
        ready(){
            this.loadData();
        },
        filters:{
            handleNum(val){
                var str;
                var num=val;
                num = Math.round(val*100)/100;
                num = num.toString();
                var res = num.split('.');//分成数组
                if(res.length==1){
                    str = num.toString() + ".00";
                    str = '￥' + str + '元';
                    return str;
                }
                if(res.length > 1){
                    if(res[1].length < 2){
                        str = num.toString() + "0";
                        str = '￥' + str + '元';
                        return str;
                    }else{
                        str = num.toString();
                        str = '￥' + num + '元';
                        return str;
                    }
                }
            }
            //处理操作状态 不要删除 目前写死的
    //            handleStatus(val){
    //                // console.log(val);
    //                switch (val){
    //                    case 'P':
    //                        val='预申请';
    //                        break;
    //                    case 'R':
    //                        val='申请';
    //                        break;
    //                    case 'A':
    //                        val='批准';
    //                        break;
    //                    case 'E':
    //                        val='执行完成';
    //                        break;
    //                    case 'B':
    //                        val='回退';
    //                        break;
    //                    case 'D':
    //                        val='拒绝';
    //                        break;
    //                    case 'F':
    //                        val='失败';
    //                        break;
    //                }
    //                return val;
    //            }
        }
    }
</script>

<style lang="sass" scoped>
@import "../../common/css/common";

.finish{
    padding-top: $status-bar-height;
    .finish-total{
        clear: both;
        margin-top: .3rem;
        border-bottom: 0.3rem solid #efefef;
        height: .88rem;
        line-height: .88rem;
        background: #fff;
        .finish-pl3{
            padding-left: .3rem;
        }
        .finish-title{
            float: left;
            font-size: .26rem;
            color: #000;
        }
        .finish-content{
            float: right;
            padding-right: .3rem;
            font-size: .26rem;
            color: #999;
        }
        .finish-num{
            color: #f75c5c;
        }
    }
    .finish-detail{
        padding-left: .3rem;
        background: #fff;
        .finish-list{
            clear: both;
            border-bottom: $public-border solid #efefef;
            height: .88rem;
            line-height: .88rem;
            .finish-title{
                float: left;
                font-size: .26rem;
                color: #000;
            }
            .finish-content{
                float: right;
                padding-right: .3rem;
                font-size: .26rem;
                color: #999;
            }
            .finish-status{
                color: #f75c5c;
            }
        }
        :last-child{
            border-bottom: none;
        }
    }
    .withdraw-btn{
        margin-top: .8rem;
        width: 100%;
        max-width: $custom-max-width;
        text-align: center;
    }
}
</style>
