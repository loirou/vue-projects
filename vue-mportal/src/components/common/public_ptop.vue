/**
* Created by gyr on 17/3/07.
*
* Des: 公共顶部padding-top
*
*/
<template>
    <div v-bind:style="{'padding-top':value}"></div>
</template>
<script>
export default {
    data() {
        return {
            wxFlag:false,
            value:'.88rem'
        }
    },
    created() {
        //微信时 顶部导航去掉
        this.wxFlag = JSON.parse(this.Storage.get('wxBrowser'));
        //console.log(this.wxFlag);
        if(this.wxFlag){
            this.value = '0';
            return
        }
    }
}
</script>
<style lang="sass" scoped>


</style>
