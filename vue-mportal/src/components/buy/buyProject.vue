/**
* Created by gyr on 16/10/10.
*
* Des: 项目投资页面
*
*/

<template>
<div>
    <div v-if="project.items.flag == 1">
        <public-object-top msg="项目投资" back="true"></public-object-top>
        <public-buy-title :date="project.date"></public-buy-title>
        <buy-project-child :items="project.items" :coupon="coupon" :target_type="targetType"></buy-project-child>
    </div>
    <!--我的可用卡券组件-->
    <div v-if="project.items.flag == 2">
        <my-coupon-use :coupon="project.couponList" :not_choose="notChoose"></my-coupon-use>
    </div>
    <!--输入资金密码组件-->
    <div v-if="project.items.flag == 3">
        <public-safety></public-safety>
    </div>
</div>
</template>
<script>
import public_ObjectTop from '../common/public_ObjectTop.vue';
import public_BuyTitle from '../common/public_BuyTitle.vue';
import buyProject_child from './buyProject_child.vue';
import my_coupon_use from '../my/my_coupon_use.vue'
import public_safety from '../common/public_safety';
import Toast from 'mint-ui/lib/toast';
import Security from '../../common/js/security.js';

import http_url from '../../common/js/http-url.js';

export default {
    data() {
            return {
                project: {
                    date: {
                        currentDate: "",
                        debtStartDate: "",
                        debtEndDate: "",
                        duration: ""
                    },
                    items: {
                        stepAmount: "",
                        unitMaxAmount: "",
                        amount: "",
                        balance: "",
                        showAmount: "",
                        flag: "1",
                        duration: "",
                        interestRate: "",
                        discountRate: "",
                        couponValue:""
                    },
                    couponList:[],
                    selectedCoupon:{},
                    next_address: "buy-finish"
                },
                targetType:'',
                coupon:{
                    couponValue:'',
                    count:'',
                    couponId:''
                },
                notChoose:{
                    value:"0",
                    count:"1",
                    flag:false
                },
                count:""
            }
        },
        components: {
            "public-object-top": public_ObjectTop,
            "public-buy-title": public_BuyTitle,
            "buy-project-child": buyProject_child,
             "my-coupon-use": my_coupon_use,
            "public-safety": public_safety
        },
        created() {
            this.targetType = this.$route.query.targetType;
            //需要拿到卡券count值 且不是散标的时候 然后判断是否有加息券 来判断是否执行加载可用加息券的方法
            this.count = this.$route.query.countValue;
            if(this.count != 0 &&  this.targetType == 1){
                this.getCouponUse();//有可用加息券的时候才会执行此方法
            }else{
                this.coupon.couponValue = "0"
            }

            var user = JSON.parse(this.Storage.get('USER'));
            //需要先设置资金密码
            if (user.isSetPwd != '1') {
                Toast({
                    message: '请先设置资金密码',
                    position: 'top',
                    duration: 2000
                });
                router.go({ name: 'my-fund-pwd-set' });
                return;
            }

            this.$http({
                method: "POST",
                url: http_url.buy_financing,
                body: {
                    "type": this.$route.query.targetType,
                    "id": this.$route.params.targetId
                }
            }).then((response) => {
                if (response.data.code == 200) {
                    this.data_processing(response.data.data);
                }
            });

            this.$on('clickNextPage', this.go_finish_page);
        },
        methods: {
            data_processing: function(info_data) {
                this.project.date.currentDate = info_data.currentDate; //当前时间
                this.project.date.debtStartDate = info_data.debtStartDate; //起息日
                this.project.date.debtEndDate = info_data.debtEndDate; //标的结束时间
                this.project.date.duration = info_data.duration; //投资期限

                this.project.items.amount = info_data.biddingStartAmount; //起投金额
                this.project.items.stepAmount = info_data.biddingStepAmount; //Step
                this.project.items.unitMaxAmount = info_data.biddingEndAmount; //最高金额
                this.project.items.balance = info_data.balance; //账户可用余额
                this.project.items.duration = info_data.duration; //投资期限
                this.project.items.interestRate = info_data.interestRate; //投资利率
                this.project.items.discountRate = info_data.discountRate; //优惠利率


                /**
                 * 判断计算器页面是否传值
                 *
                 * Des:
                 *   1：如果未进入计算器页面或进入页面为输入金额，则直接使用服务器
                 *      端返回属性 "起投金额" biddingStartAmount
                 *   2：如果进入过计算器页面，并输入购买金额，则使用输入金额为初始化数值
                 *
                 */
                let calculator_num = this.$route.query.biddingAmount;
                let result = 0;
                if (calculator_num === '' || calculator_num === null || calculator_num === undefined) {
                    result = info_data.biddingStartAmount;
                } else {
                    result = this.$route.query.biddingAmount;
                }
                this.project.items.showAmount = result;
            },
            go_finish_page: function(param) {
                this.$http({
                    method: "POST",
                    url: http_url.buy_password,
                    body: {
                        "targetType": this.$route.query.targetType,
                        "targetId": this.$route.params.targetId,
                        "biddingAmount": this.project.items.showAmount,
                        "operateOrigin": "1",
                        "financelPassword": Security.encrypt(param),
                        "couponId":this.coupon.couponId
                    }
                }).then((response) => {
                    if (response.data.code == 200) {
                        router.go({
                            name: this.project.next_address,
                            params: {
                                id: response.data.data
                            }
                        });
                    }
                });
            },
            getCouponUse: function (){
                var projectId = this.$route.params.targetId;
                this.$http({
                    method:"GET",
                    url: http_url.coupon + "/1/" +projectId+ "/list"//350为项目id 需要从标的详情传过来
                }).then((res)=>{
                    if(res.data.code == 200){
                        this.project.couponList = res.data.data;
                        this.project.couponList[0].checked = true;
                        this.project.selectedCoupon = this.project.couponList[0];
                        this.coupon.couponValue = this.project.selectedCoupon.value;
                        this.coupon.couponId = this.project.selectedCoupon.id;
                        this.project.items.couponValue = this.project.selectedCoupon.value;
                        this.coupon.count = this.project.selectedCoupon.count;
                    }
                })
            }
        },
        events: {
            "on-back": function() {
                this.project.items.flag = "1";
            },
            //使用不用加息券改变显示的加息利率
            "changeCurCoupon": function(newCoupon) {
                this.coupon.couponValue = newCoupon.value;
                this.coupon.couponId = newCoupon.id;
                this.project.items.couponValue = newCoupon.value;
                this.coupon.count = newCoupon.count;
            }
        }
}
</script>

<style lang="sass" scoped>

</style>
