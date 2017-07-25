/**
 * Created by Darren on 16/10/27.
 *
 * Des: 产品详情主页2
 *
 */
 
<template>
<div>
    <pb-padding-top></pb-padding-top>
    <div class="info-body-2">
        <slot></slot>
        <div class="tab-menu clearfix">
            <div v-bind:class="{ active: isCheck[0] }" @click="tabToggle(tab1)">
              <span>借款详情</span>
            </div>
            <div v-bind:class="{ active: isCheck[1] }" @click="tabToggle(tab2)">
              <span>风控措施</span>
            </div>
            <div v-bind:class="{ active: isCheck[2] }" @click="tabToggle(tab3)">
              <span>投资信息</span>
            </div>
        </div>

        <!-- <info2-details></info2-details> -->
        <component :is='acquiesce' keep-alive :type_info="type_info"></component>

    </div>
</div>
</template>


<script>
import info2_details from './info2_details.vue';
import public_pTop from '../common/public_ptop.vue';
import info2_fixed_details from './info2_fixedDetails.vue';
import pro_info_list from './pro_info_list.vue';
import info2_risk from './info2_risk.vue';



export default {
    props: ["type_info"],
 	data () {
	 	return {
            acquiesce:'',
            tab1:'',
            tab2:'info2-risk',
            tab3:'info2-investment',
            type:''
	 	}
 	},
 	components: {
        "info2-details":info2_details,
        "info2-investment":pro_info_list,
        "info2-risk": info2_risk,
        "info2-fixed-details":info2_fixed_details,
        "pb-padding-top":public_pTop
 	},
    created() {
        this.checkType();
    },
    methods: {
        menu_go_list: function (msg) {
            router.go(msg)
        },
        tabToggle: function(tabView) {
            this.acquiesce = tabView;
        },
        checkType: function(){
            this.type = this.type_info.targetType;
            if(this.type=="0"){
                this.acquiesce = 'info2-details';
                this.tab1 = 'info2-details';
            }else{
                this.acquiesce = 'info2-fixed-details';
                this.tab1 = 'info2-fixed-details';
            }
        }
    },
    computed: {
        isCheck() {
            switch (this.acquiesce){
                case this.tab2 :
                    return [false,true,false];
                    break;
                case this.tab3 :
                    return [false,false,true];
                    break;
                default :
                    return [true,false,false];
            }
        }
    }
}
</script>
<style lang="sass" scoped>
@import "../../common/css/common";

.tab-menu{
    // background: $red;
    background: #fff;
    height: .58rem;
    padding-top: .23rem;
    div{
        float: left;
        width: 2.133rem;
        height: .4rem;
        text-align: center;
        box-sizing:border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
        span{
            display: inline-block;
            height: .58rem;
            font-size: .28rem;
            color: #666666;
        }
        &:nth-of-type(2){
            border-left: $public-border solid #efefef;
            border-right: $public-border solid #efefef;
        }
    }
}

.active span{
    color: #f75c5c !important;
    border-bottom:.02rem solid #f75c5c;
}
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






