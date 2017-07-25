/**
* Created by gyr on 17/15/2.
*
* Des: 我的-我的卡券说明
*/

<template>
    <div class="coupon-declare">
        <public-object-top msg="我的卡券" back="true"></public-object-top>
        <pb-padding-top></pb-padding-top>
        <div class="coupon-container">
            <div class="coupon-title">加息券介绍</div>
            <div class="coupon-content-section">
                <div>什么是加息券？</div>
                <p>加息券是汇赚钱向理财用户提供的一种加息优惠券，使用加息券后即可为所投标的增加利息直至加息期结束，例如购买一款年化收益率8%周期180天的标的，如使用一款加息期为180天加息1%的加息券，则意味着这款标的理财用户将获得年化收益率9%且周期为180天的理财收益。
                </p>
            </div>
            <div class="coupon-content-section">
                <div>如何获得加息券？</div>
                <p>当前加息券均有汇赚钱运营团队定向发放，在不同的时间段中，我们会选择不同维度的用户，提供相应的加息券。</p>
            </div>
            <div class="coupon-content-section">
                <div>加息券可以无限加息吗？</div>
                <p>每一次购买动作仅可使用一张加息券，且有些加息券只能使用在一些指定标的中，不能在一次购买中，使用多张加息券叠加利息。
                </p>
            </div>
        </div>
    </div>


</template>

<script>
    import public_ObjectTop from '../common/public_ObjectTop.vue';
    import public_pTop from '../common/public_ptop.vue';
    import http_url from '../../common/js/http-url.js';

    export default {
        data () {
            return {

            }
        },
        components:{
            "public-object-top":public_ObjectTop,
            "pb-padding-top":public_pTop
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../common/css/common";
    .coupon-declare{
        //padding-top:.88rem;
        //padding-top:$public-nav-height;
        .coupon-container{
            padding: .3rem;
            background-color: #fff;
            .coupon-title{
                text-align: center;
                font-size: .28rem;
                color: #000;
                font-weight: bold;
            }
            .coupon-content-section{
                margin-top: .2rem;
                div{
                    font-size: .24rem;
                }
                p{
                    margin: .1rem 0;
                    font-size: .24rem;
                //color: #333;
                }
            }

        }
    }
</style>