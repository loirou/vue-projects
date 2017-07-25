/**
* Created by gyr on 16/10/25.
* Type:非公共组件
* Des: 产品详情单页面-投资信息
*
*/
<template>
    <div>
        <pb-no-data class="empty data-2" v-if="showEmpty"></pb-no-data>
        <div class="property" v-else>
            <pb-menu-next class="info-title clearfix">
                <span class="title-left">投资人/时间</span>
                <span class="title-right">投资金额(元)</span>
            </pb-menu-next>
            <pb-menu-next class="info-content clearfix" v-for="item in items" track-by="$index">
                <span sloat="image" class="content-left">
                    <span class="conName">{{item.user}}</span>
                    <span class="conDate">{{item.inverstDate}}</span>
                </span>
                <span sloat="right" class="content-right">{{item.amount}}</span>
            </pb-menu-next>
        </div>
    </div>
</template>
<script>
    import public_Menunext from '../common/public_Menunext';
    import public_no_data from '../common/public_no_data.vue';

    import http_url from '../../common/js/http-url.js';

    export default {
        props: ["type_info"],
        data() {
            return {
                showEmpty: false,//是否显示空数据图片
                items:[
                    // {name: '186****3906', date:'2016-08-02 13:50', amount: "420,000.00" },
                    // {name: '186****4906', date:'2016-08-02 13:51', amount: "50,000.00" },
                    // {name: '186****6906', date:'2016-08-02 13:52', amount: "200,000.00" },
                    // {name: '186****3906', date:'2016-08-02 13:50', amount: "60,000.00" },
                    // {name: '186****3906', date:'2016-08-02 13:59', amount: "20,000.00" },
                    // {name: '186****3906', date:'2016-08-02 13:50', amount: "10,000.00" },
                    // {name: '186****3906', date:'2016-08-02 13:50', amount: "10,000.00" }
                ]
            }
        },
        components: {
            "pb-menu-next": public_Menunext,
            "pb-no-data": public_no_data
        },
        created:function(){
            this.$http({
                method:"POST",
                url:http_url.buy_proInfo_list,
                body:{
                    "type":this.$route.query.targetType,
                    "id":this.$route.params.targetId
                }
            }).then((res) => {
                if(res.data.code == 200){
                    //是否显示数据为空
                    this.showEmpty = res.data.data.length == 0 ? true : false;
                    this.data_processing(res.data.data);
                }
            });
        },
        methods:{
            data_processing:function(info_data){
                this.items = info_data;
            }
        }
    }
</script>

<style lang="sass" scoped>
    .property{
        background-color: #fff;
        padding: 0 .3rem;
        margin-top: .3rem;
        .info-title{
            height: .47rem;
            line-height: .47rem;
            color: #999;
            font-size: .24rem;
            .title-left{
                float: left;
            }
            .title-right{
                float: right;
            }
        }
        .info-content{
            height: .77rem;
            line-height: .77rem;
            color: #333;
            //font-family: "San Francisco";
            letter-spacing: .01rem;
            .content-left{
                float: left;
                .conName{
                    height: .26rem;
                    line-height: .26rem;
                    margin-top: .1rem;
                    display: block;
                    font-size: .26rem;
                }
                .conDate{
                    padding-top: .15rem;
                    height: .2rem;
                    line-height: .2rem;
                    display: block;
                    font-size: .2rem;
                    color: #999;
                }
            }
            .content-right{
                float: right;
                font-size: .26rem;
            }
        }
    }
    .empty {
        margin-top: 1.8rem;
    }
</style>


