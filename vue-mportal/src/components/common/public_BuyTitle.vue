/**
* Created by gyr on 16/10/10.
*
* Des: 购买详情及项目投资 顶部(今日投资-开始计息-可退出)
*
*/

<template>
<div>
    <pb-padding-top></pb-padding-top>
    <div class="bg">
        <div class="oneFloor">
            <div class="titIcon"></div>
            <div class="titCon clearfix">
                <span class="todayInvest">今日投资<i v-text="time_today"></i></span>
                <span class="startBearing">起息日期 <i v-text="time_1"></i></span>
                <span class="loginOut">结息日期<i v-text="time_2"></i></span>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import public_pTop from '../common/public_ptop.vue';
export default {
    props: ['date'],
    data() {
        return {};
    },
    computed: {
        time_today: function() {
            return new Date().Format('yyyy-MM-dd');
        },
        time_1: function() {
            return "T+1";
        },
        time_2: function() {
            if (!this.date.duration) return '';
            var time = "T+" + this.date.duration;
            return time;
        },
    },
    components: {
        "pb-padding-top":public_pTop
    }
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";

    .bg{
        background: #efefef;
        //padding-top: .88rem+$status-bar-height;
        //padding-top: $public-nav-height+$status-bar-height;
        padding-top: $status-bar-height;
        .oneFloor{
            background: #fff;
            width:100%;
            height:1.6rem;
            border-top: $public-border solid #efefef;
            padding-top:.2rem;
            .titIcon{
                background: url("../../static/images/scatter/pf-01.png") no-repeat;
                width: 5.33rem;
                height: .69rem;
                margin:0 auto;
                background-size: 5.33rem .69rem ;
            }
            .titCon{
                padding: 0 .4rem;
                //text-align: center;
                .todayInvest{
                    float: left;
                    font-size:.26rem;
                    i{
                        display: block;
                        font-size:.22rem;
                        color:#999999;
                    }
                }
                .startBearing{
                    display: inline-block;
                    // margin-left:0.2rem;
                    font-size:.26rem;
                    width: 1.2rem;
                    margin-left: 1rem;
                    text-align: center;
                    i{
                        display: inline-block;
                        font-size:.22rem;
                        color:#999999;
                    }
                }
                .loginOut{
                    float: right;
                    font-size:.26rem;
                    text-align: center;
                    margin-right:.03rem;
                    i{
                        display: block;
                        font-size:.22rem;
                        color:#999999;
                    }
                }
            }
        }

    }

</style>