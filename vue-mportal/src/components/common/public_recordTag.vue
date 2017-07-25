/**
* Created by gyr on 16/10/26.
*
* Des: 我的-投资记录 右上角小组件
*
*/
<template>
    <span class="conTopRight">购买金额 <i class="rightNum">{{price}}</i></span>
</template>

<script>
    export default {
        props:['price'],
        data() {
            return {}
        }
    }
</script>

<style lang="sass" scoped>
    .conTopRight{
        float: right;
        margin-top: .26rem;
        padding: 0 .3rem 0 .3rem;
        height: .26rem;
        line-height: .28rem;
        font-size: .24rem;
        color: #666;
        background: url("../../static/images/my-invester-1.png") no-repeat;
        background-size: .26rem .26rem;
        // background-position: 0 0.065rem ;
        letter-spacing: .01rem;
        .rightNum{
            color: #f75c5c;
            font-weight: normal;
        }
    }
</style>
