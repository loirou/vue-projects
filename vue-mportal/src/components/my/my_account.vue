/**
* Created by youhy on 16/12/16.
*
* Des: 账号信息页面
*
*/
<template>
    <pb-object-top msg="账户信息" back="true"></pb-object-top>
    <pb-padding-top></pb-padding-top>
    <div class="account">
        <ul class="account-detail">
            <li class="account-list">
                <span class="account-title">姓名</span>
                <span class="account-content">{{name}}</span>
            </li>
            <li class="account-list">
                <span class="account-title">身份证</span>
                <span class="account-content">{{idNo}}</span>
            </li>
            <li class="account-list">
                <span class="account-title">手机号</span>
                <span class="account-content">{{mobile}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
    import public_ObjectTop from '../common/public_ObjectTop.vue';
    import public_pTop from '../common/public_ptop.vue';
    export default {
        data() {
            var user = JSON.parse(this.Storage.get('USER'));
            return {
                name: user.name,
                idNo: user.idNo,
                mobile: user.maskMobile
            };
        },
        components: {
            "pb-object-top": public_ObjectTop,
            "pb-padding-top":public_pTop,
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../common/css/common";

    .account{
        //padding-top: 1.18rem+$status-bar-height;
        //padding-top:$public-nav-height+ .3rem+$status-bar-height;
        padding-top:.3rem+$status-bar-height;
        .account-detail{
            padding-left: .3rem;
            background: #fff;
            .account-list{
                clear: both;
                border-bottom: $public-border solid #efefef;
                height: .88rem;
                line-height: .88rem;
                .account-title{
                    float: left;
                    font-size: .28rem;
                    color: #000;
                }
                .account-content{
                    float: right;
                    padding-right: .3rem;
                    font-size: .28rem;
                    color: #999;
                }
                .account-status{
                    color: #f75c5c;
                }
            }
            :last-child{
                border-bottom: none;
            }
        }
    }
</style>
