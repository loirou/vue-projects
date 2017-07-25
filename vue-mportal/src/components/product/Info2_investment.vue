/**
 * Created by Darren on 16/10/20.
 *
 * Des: 产品详情主页
 *
 */
 
<template>

</template>


<script>
import public_ObjectTop from '../common/public_ObjectTop.vue';
import pro_Info1 from './pro_Info1.vue';
import pro_Info2 from './pro_Info2.vue';
export default {
    data () {
        return {
            scale: 60
        }
    },
    components: {
        "pro-info-1":pro_Info1,
        "pro-info-2":pro_Info2,
        "pb-object-top":public_ObjectTop
    },
    ready: function() {
        
    },
    methods: {
        menu_go_list: function (msg) {
          router.go(msg)
        }
    }
}
</script>
<style lang="sass" scoped>

.line{
    margin-left: .55rem;
    display: block;
    height: .6rem;
    width: .02rem;
    background: #efefef;
}
// v-cloak
[v-cloak] {
  display: none;
}
</style>






