/**
* Created by Darren on 16/11/04.
*
* Des: 安全密码
*
*/

<template>
    <public-object-top msg="安全验证" back="true" self-back="true"></public-object-top>
    <pb-padding-top></pb-padding-top>
    <pb-password class="pssword-top"></pb-password>
</template>

<script>
    import public_ObjectTop from './public_ObjectTop.vue';
    import public_pTop from '../common/public_ptop.vue';
    import public_putPassword from './public_putPassword.vue';

    export default {
        data () {
            return {

            }
        },
        components:{
            "public-object-top":public_ObjectTop,
            "pb-password":public_putPassword,
            "pb-padding-top":public_pTop
        }
    }
</script>

<style lang="sass" scoped>
@import "../../common/css/common";
.pssword-top{
    //padding-top: 1.18rem+$status-bar-height;
    //padding-top: $public-nav-height +.3rem+$status-bar-height;
    padding-top: .3rem+$status-bar-height;
}

</style>