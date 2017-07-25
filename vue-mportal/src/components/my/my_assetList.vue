/**
* Created by gyr on 16/10/11.
*
* Des: 我的-资产明细页面
*
*/

<template>
    <public-object-top msg="资产明细" back="true" back-route="my"></public-object-top>
    <pb-padding-top></pb-padding-top>
    <my-asset-child ></my-asset-child>
</template>

<script>
    import public_ObjectTop from '../common/public_ObjectTop.vue';
    import public_pTop from '../common/public_ptop.vue';
    import my_assetListChild from './my_assetListChild.vue';

    export default {
        data () {
            return {

            }
        },
        components:{
            "public-object-top":public_ObjectTop,
            "pb-padding-top":public_pTop,
            "my-asset-child":my_assetListChild
        }
    }
</script>

<style lang="sass" scoped>

</style>