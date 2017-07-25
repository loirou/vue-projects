/**
 * Created by Darren on 16/10/27.
 *
 * Des: 产品详情2-散标借款人详情
 *  1、车贷  2、房贷 3、信用贷 4、企业贷 99、其他
 *  当前只判断是否为车贷，既是否为1
 *  车贷：用途     信贷：用途、描述
 *
 */
 
<template>
<div class="info2">
    <!-- <div class="info-person">
        <div class="title">
          <span>借款人详情</span>
        </div>
        <div class="content">
          <div class="info clearfix">
            <span class="info-title">姓名</span>
            <span class="info-content" v-text="proInfo2_details.name"></span>
          </div>
          <div class="info clearfix">
            <span class="info-title">年龄</span>
            <span class="info-content" v-text="proInfo2_details.age"></span>
          </div>
          <div class="info clearfix">
            <span class="info-title">性别</span>
            <span class="info-content" v-text="proInfo2_details.sex"></span>
          </div>
          <div class="info clearfix">
            <span class="info-title">身份证号</span>
            <span class="info-content" v-text="proInfo2_details.idNoMask"></span>
          </div>
          <div class="info clearfix">
            <span class="info-title">学历</span>
            <span class="info-content" v-text="proInfo2_details.degree"></span>
          </div>
          <div class="info clearfix">
            <span class="info-title">职位</span>
            <span class="info-content" v-text="proInfo2_details.position"></span>
          </div>
          <div class="info clearfix">
            <span class="info-title">收入</span>
            <span class="info-content" v-text="proInfo2_details.income"></span>
          </div>
          <div class="info clearfix">
            <span class="info-title">户口所在地</span>
            <span class="info-content" v-text="proInfo2_details.address"></span>
          </div>
        </div>
    </div> -->

    <!-- <div class="info-pro">
        <div class="title">
          <span>项目详情</span>
        </div>
        <div class="content" v-text="proInfo2_details.description"></div>
    </div> -->

    <!-- <div class="info-examine">
        <div class="title">
          <span>通过审核资料</span>
        </div>
        <div class="content">
            <pb-show-img :info="info_Image_1"></pb-show-img>
            <pb-show-img :info="info_Image_2"></pb-show-img>
            <pb-show-img :info="info_Image_3"></pb-show-img>
            <pb-show-img :info="info_Image_4"></pb-show-img>
        </div>
    </div> -->

    <pb-title-con :title="title_1">
        <div class="info-person">
            <div class="info clearfix">
                <span class="info-title">姓名</span>
                <span class="info-content" v-text="proInfo2_details.name"></span>
            </div>
            <div class="info clearfix">
                <span class="info-title">年龄</span>
                <span class="info-content" v-text="proInfo2_details.age"></span>
            </div>
            <div class="info clearfix">
                <span class="info-title">性别</span>
                <span class="info-content" v-text="proInfo2_details.sex"></span>
            </div>
            <div class="info clearfix">
                <span class="info-title">职业</span>
                <span class="info-content" v-text="proInfo2_details.position"></span>
            </div>
            <div class="info clearfix">
                <span class="info-title">借款用途</span>
                <span class="info-content" v-text="proInfo2_details.purpose"></span>
            </div>
            <div class="info clearfix">
                <span class="info-title">借款描述</span>
                <span class="info-content" v-text="proInfo2_details.description"></span>
            </div>
            <div class="info clearfix">
                <span class="info-title">申请地区</span>
                <span class="info-content" v-text="proInfo2_details.address"></span>
            </div>
        </div>
    </pb-title-con>

    <pb-title-con v-if="flag != '1'" :title="title_2">
        <div v-text="proInfo2_details.description"></div>
    </pb-title-con>

    <pb-title-con v-if="flag == '1'" :title="title_2">
        <div class="info-des">
            <div class="info clearfix">
                <span class="info-title">车辆品牌</span>
                <span class="info-content" v-text="proInfo2_details.pawn.name"></span>
            </div>
            <div class="info clearfix">
                <span class="info-title">评估价值</span>
                <span class="info-content" v-text="proInfo2_details.pawn.prance"></span>
            </div>
            <div class="info">
                <div class="info-title-des">车辆照片</div>
                <div class="info-img clearfix">
                    <span v-for="url in info_Image_1.urls" track-by="$index">
                        <img :src="url">
                    </span>
                </div>
            </div>
        </div>
    </pb-title-con>

    <pb-title-con v-if="flag == '1'" :title="title_3">
        <div class="info-approve" v-for="approve in approveListCD">
            <div class="approve-title">
                <div class="show clearfix">
                    <span class="approve-list" :class="approve.color"></span>
                    <span class="des" v-text="approve.title"></span>
                    <span class="approve-check"></span>
                </div>
            </div>
        </div>
    </pb-title-con>

    <pb-title-con v-if="flag != '1'" :title="title_3">
        <div class="info-approve" v-for="approve in approveListXD">
            <div class="approve-title">
                <div class="show clearfix">
                    <span class="approve-list" :class="approve.color"></span>
                    <span class="des" v-text="approve.title"></span>
                    <span class="approve-check"></span>
                </div>
            </div>
        </div>
    </pb-title-con>
</div> 
</template>


<script>
import public_show_img from '../common/public_showImg.vue';

import public_Title_Content from '../common/public_Title_Content.vue';

import http_url from '../../common/js/http-url.js';

export default {
    props: ["type_info"],
 	data () {
	 	return {
            title_1:"借款人详情",
            title_2:"项目详情",
            title_3:"信息认证",
            flag: this.type_info.assetType,
            proInfo2_details: {
                name:"",
                age:"",
                sex:"",
                position:"",
                description:"",
                address:"",
                pawn:{
                    name:"",
                    prance:""
                }



            },
            approveListCD:[
                {title:"身份认证",color:"info-1"},
                {title:"第三方数据源认证",color:"info-2"},
                {title:"联系人认证",color:"info-5"},
                {title:"借款用途认证",color:"info-6"},
                {title:"产权认证",color:"info-3"}
            ],
            approveListXD:[
                {title:"身份认证",color:"info-1"},
                {title:"第三方数据源认证",color:"info-2"},
                {title:"联系人认证",color:"info-5"},
                {title:"借款用途认证",color:"info-6"},
                {title:"银行流水认证",color:"info-3"}
            ],
            info_Image_1:{
                title:"身份认证",
                color:"info-1",
                urls:[]
            }
            // info_Image_2:{
            //     title:"第三方数据源认证",
            //     color:"info-2",
            //     urls:[
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg"
            //     ]
            // },
            // info_Image_3:{
            //     title:"借款用途认证",
            //     color:"info-3",
            //     urls:[
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg"
            //     ]
            // },
            // info_Image_4:{
            //     title:"产权认证",
            //     color:"info-3",
            //     urls:[
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg"
            //     ]
            // },
            // info_Image_5:{
            //     title:"联系人认证",
            //     color:"info-5",
            //     urls:[
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg"
            //     ]
            // },
            // info_Image_6:{
            //     title:"银行流水认证",
            //     color:"info-6",
            //     urls:[
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg",
            //         "./dist/images/test-1.jpg"
            //     ]
            // }

	 	}
 	},
 	components: {
 		"pb-show-img":public_show_img,
        "pb-title-con":public_Title_Content
 	},
    created:function(){

        this.$http({
            method:"GET",
            url:http_url.buy_proInfo_deatils+this.$route.params.targetId
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
            
            if(this.flag === 1){
                var list = info_data.pawn.img;
                list.forEach(function(item,index,array){
                    item = http_url.img_url + item;
                    this.info_Image_1.urls.$set(index, item);
                })
            }

            this.proInfo2_details = info_data;

            if(this.proInfo2_details.sex == 0)
                this.proInfo2_details.sex = "女";
            else if(this.proInfo2_details.sex == 1)
                this.proInfo2_details.sex = "男";
            
            if(this.proInfo2_details.position == 0)
                this.proInfo2_details.position = "个体从业者";
            else if(this.proInfo2_details.position == 1)
                this.proInfo2_details.position = "上班族";
        }
    }
}
</script>
<style lang="sass" scoped>
@import "../../common/css/common";
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
                width: 4.1rem;
                word-wrap:break-word;
                word-break:break-all;
                font-size: .22rem;
                color: #333;
            }
        }
    }
    .info-des{
        @extend .info-person;
        .info-title-des{
            width: 1.3rem;
            text-align: center;
            font-size: .22rem;
            color: #999999;
        }
        .info-img{
            // padding: .22rem .3rem .3rem .3rem;
            margin-top: 0.06rem;
            span{
                float: left;
                margin-left: .08rem;
                margin-top: .08rem;
                width: 1.39rem;
                height: 1.39rem;
                &:nth-of-type(4n+1){
                    margin-left: 0;
                }
                img{
                    width: 1.39rem;
                    height: 1.39rem;
                }
            }
        }
    }
}

.info-approve{
    .approve-title{
        height: .76rem;
        line-height: .76rem;
        .show{
            border-bottom: $public-border solid #efefef;
            .approve-list{
                float: left;
                width: .12rem;
                height: .12rem;
                border-radius: .1rem;
                margin-top: .32rem;
            }
            .des{
                float: left;
                line-height: .76rem;
                color: #666666;
                font-size: .26rem;
                margin-left: .2rem;
            }
            .info-1{
                background: #FFE0B2;
            }
            .info-2{
                background: #3CBDD1;
            }
            .info-3{
                background: #FF734D;
            }
            .info-5{
                background: #75AEF5;
            }
            .info-6{
                background: #FFB74D;
            }
            .approve-check{
                float: right;
                width: .24rem;
                height: .19rem;
                background: url("../../static/images/checkicon.png") no-repeat;
                background-size: .24rem .19rem;
                margin-top: .285rem;
            }
        }
    }
}
// .info-person{
//     margin-top: .3rem;
//     background: #ffffff;
//     .title{
//         border-bottom: $public-border solid #efefef;
//         height: .76rem;
//         span{
//             border-left: .04rem solid #f75c5c;
//             margin-left: .3rem;
//             padding-left: .26rem;
//             line-height: .76rem;
//             font-size: .28rem;
//         }
//     }
//     .content{
//         padding: .24rem 0 .24rem .3rem;
//         .info{
//             margin-top: .3rem;
//             &:nth-of-type(1){
//                 margin: 0;
//             }
//             .info-title{
//                 float: left;
//                 display: inline-block;
//                 width: 1.3rem;
//                 text-align: center;
//                 font-size: .22rem;
//                 color: #999999;
//             }
//             .info-content{
//                 float: left;
//                 display: inline-block;
//                 margin-left: .3rem;
//                 width: 4.4rem;
//                 word-wrap:break-word;
//                 word-break:break-all;
//                 font-size: .22rem;
//             }
//         }
//     }
// }

// .info-pro{
//     margin-top: .3rem;
//     background: #ffffff;
//     .title{
//         border-bottom: $public-border solid #efefef;
//         height: .76rem;
//         span{
//             border-left: .04rem solid #f75c5c;
//             margin-left: .3rem;
//             padding-left: .26rem;
//             line-height: .76rem;
//             font-size: .28rem;
//         }
//     }
//     .content{
//         font-size: .22rem;
//         color: #999999;
//         padding: .24rem .3rem;
//         word-wrap:break-word;
//         word-break:break-all;
//     }
// }

// .info-examine{
//     margin-top: .3rem;
//     background: #ffffff;
//     .title{
//         border-bottom: $public-border solid #efefef;
//         height: .76rem;
//         span{
//             border-left: .04rem solid #f75c5c;
//             margin-left: .3rem;
//             padding-left: .26rem;
//             line-height: .76rem;
//             font-size: .28rem;
//         }
//     }
// }
// v-cloak
[v-cloak] {
  display: none;
}
</style>






