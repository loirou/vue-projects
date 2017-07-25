/**
 * Created by gyr on 16/16/6.
 *
 * Des: 产品详情2-固收产品详情
 *
 */
 
<template>
<div class="info2">
    <pb-title-con :title="title_1">
        <div class="info-person">
            <div class="info clearfix">
                <span class="info-title">转让方</span>
                <span class="info-content" v-text="proInfo2_details.transferor"></span>
            </div>
            <div class="info clearfix">
                <span class="info-title">增信方式</span>
                <span class="info-content" v-text="proInfo2_details.ortherTrust"></span>
            </div>
            <div class="info clearfix">
                <span class="info-title">担保机构</span>
                <span class="info-content" v-text="proInfo2_details.guaranteeOrg"></span>
            </div>
        </div>
    </pb-title-con>

    <pb-title-con :title="title_2">
        <div class="info-introduce" v-text="proInfo2_details.description"></div>
    </pb-title-con>

    <!-- <pb-title-con v-if="flagType" :title="title_3">
        <div class="info-introduce">测试写死</div>
    </pb-title-con> -->
    <!-- <pb-title-con :title="title_3">
        <div class="info-introduce">测试写死</div>
    </pb-title-con>

    <pb-title-con v-else :title="title_4">
        <div class="info-introduce">测试写死</div>
    </pb-title-con> -->
</div> 
</template>


<script>

import public_Title_Content from '../common/public_Title_Content.vue';

import http_url from '../../common/js/http-url.js';

export default {
 	data () {
	 	return {
            title_1:"产品详情",
            title_2:"项目介绍",
            title_3:"交易结构",
            title_4:"还款来源",
            proInfo2_details: {
                transferor:"",
                ortherTrust:"",
                guaranteeOrg:"",
                description:""
            }
	 	}
 	},
 	components: {
        "pb-title-con":public_Title_Content
 	},
    created:function(){
        this.$http({
            method:"GET",
            url:http_url.buy_proInfo_fix+this.$route.params.targetId
        }).then((response) => {
            if(response.data.code == 200){
                this.data_processing(response.data.data);
            }else{
                console.error(response.data.code);
            }

        }, (response) => {
            console.error(response);
        });
    },
    methods: {
        menu_go_list: function (msg) {
          router.go(msg)
        },
        data_processing:function(info_data){
            this.proInfo2_details.transferor = info_data.transferor;
            this.proInfo2_details.ortherTrust = info_data.ortherTrust;
            this.proInfo2_details.guaranteeOrg = info_data.guaranteeOrg;
            this.proInfo2_details.description = info_data.description;

        }
    }
}
</script>
<style lang="sass" scoped>
.info2{
    .info-person{
        padding: .24rem 0;
        .info{
            margin-top: .3rem;
            &:nth-of-type(1){
                margin: 0;
             }
            .info-title{
                float: left;
                width: 1.3rem;
                text-align: center;
                font-size: .22rem;
                color: #999999;
            }
            .info-content{
                float: left;
                // margin-left: .3rem;
                width: 4.4rem;
                word-wrap:break-word;
                word-break:break-all;
                font-size: .22rem;
            }
        }
    }
    .info-introduce{
        padding: .24rem 0;
        line-height: .36rem;
        font-size: .22rem;
        color: #999999;
    }
}

</style>






