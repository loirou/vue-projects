/**
* Created by Darren on 16/12/06.
*
* Des: 公共小标题内容展示框
*
*/

<template>
    <div class="info-content">
        <div class="title">
          <span v-text="title"></span>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import public_ObjectTop from './public_ObjectTop.vue';
    import public_putPassword from './public_putPassword.vue';

    export default {
        props:['title'],
        data () {
            return {

            }
        },
        components:{
            "public-object-top":public_ObjectTop,
            "pb-password":public_putPassword
        }
    }
</script>

<style lang="sass" scoped>
@import "../../common/css/common";
.info-content{
    margin-top: .3rem;
    background: #ffffff;
    .title{
        border-bottom: $public-border solid #efefef;
        height: .76rem;
        span{
            border-left: .06rem solid #f75c5c;
            margin-left: .3rem;
            padding-left: .26rem;
            line-height: .76rem;
            font-size: .28rem;
        }
    }
    .content{
        // padding: .24rem .3rem .24rem .3rem;
        padding: 0 .3rem 0 .3rem;
        .info{
            margin-top: .3rem;
            &:nth-of-type(1){
                margin: 0;
            }
            .info-title{
                float: left;
                display: inline-block;
                width: 1.3rem;
                text-align: center;
                font-size: .22rem;
                color: #999999;
            }
            .info-content{
                float: left;
                display: inline-block;
                margin-left: .3rem;
                width: 4.4rem;
                word-wrap:break-word;
                word-break:break-all;
                font-size: .22rem;
            }
        }
    }
}

</style>