/**
* Created by gyr on 16/10/26.
*
* Des: 我的-投资记录 下面小组件描述( 起息日)
*
*/
<template>
    <ul class="conBottom clearfix">
        <li>
            <span class="buy-day">{{msg}} <i>{{start}}</i></span>
        </li>
        <li>
            <span class="end-day">{{endText}} <i>{{end}}</i></span>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            start:String,
            end:String,
            endText: String,
            msg:String
        },
        data() {
            return {}
        }
    }
</script>

<style lang="sass" scoped>
    .conBottom{
        height: .7rem;
        line-height: .7rem;
        padding: 0 .3rem;
        li{
            width: 50%;
            float: left;
            font-size: .24rem;
            letter-spacing: 0.01rem;
            font-weight: lighter;
            color: #666666;
            .buy-day{
                float: left;
                padding-left: .36rem;
                background: url("../../static/images/buyDay.png") no-repeat;
                background-size: .3rem .3rem;
                background-position: 0 .2rem;
            }
            .end-day{
                float: right;
                padding-left: .36rem;
                background: url("../../static/images/endDay.png") no-repeat;
                background-size: .3rem .3rem;
                background-position: 0 .2rem;
            }
        }
    }
</style>