/**
* Created by youhaiyang on 16/10/16.
*
* Des: 提现
*
*/
<template>
    <div>
        <div v-if="flag">
            <pb-object-top msg="提现" back="true"></pb-object-top>
            <pb-padding-top></pb-padding-top>
            <div class="withdraw-content">
                <pb-bank-section class="bank-section" :bank="selectedBank" @click="changeBank"></pb-bank-section>
                <div class="tip">可提现金额 <span v-text="freeBalance" class="free-balance"></span> 元</div>
                <div class="withdraw-form">
                    <pb-form-item class="withdraw-item">
                        <span class="withdraw-tip" slot="image">提现金额</span>
                        <span class="withdraw-data"><input @blur="onBlur" type="number" v-model="withdraw.amount" class="withdraw-input" placeholder="请输入提现金额"></span>
                    </pb-form-item>
                    <pb-form-item class="withdraw-item">
                        <span class="withdraw-tip" slot="image">手续费</span>
                        <span class="withdraw-data">{{counterFee}}</span>
                    </pb-form-item>
                </div>
                <div class="tip">您提出提现要求，汇和金服会在一个工作日内审核。</div>
                <div class="withdraw-btn">
                    <pb-button cls="btn-lg" @click="submit">下一步</pb-button>
                </div>
            </div>
            <pb-popup-bottom title="选择银行卡" :show.sync="bankPopup">
                <div class="bank-list-container">
                    <pb-bank-section class="bank-item" :bank="item" v-for="item in bankList" mode="sm" @click="selectBank(item)"></pb-bank-section>
                    <div class="bank-item recharge-item" @click="menu_go_card('my-add-bank')" >提现到新卡</div>
                </div>
            </pb-popup-bottom>
        </div>
        <div v-else>
            <pb-safety></pb-safety>
        </div>
    </div>

</template>
<script>
import public_ObjectTop from '../common/public_ObjectTop';
import public_pTop from '../common/public_ptop.vue';
import public_bank_section from '../common/public_bank_section';
import public_menunext from '../common/public_Menunext';
import public_button from '../common/public_button';
import public_popup_bottom from '../common/public_popup_bottom';
import public_safety from '../common/public_safety';
import http_url from '../../common/js/http-url.js';
import Toast from 'mint-ui/lib/toast';
import MsgBox from '../../plugins/messagebox/index.js'; //消息提示框
import Security from '../../common/js/security.js';

export default {
    data() {
            return {
                bankPopup: false,
                flag: true,
                counterFee: '0.00',
                next_address: "withdraw-finish",
                bankList: [],
                freeBalance: 0,
                selectedBank: {},
                withdraw: {
                    amount: "",
                    fundPassword: "",
                    operateOrigin: "CASHBOX",
                    bankAccount: ""
                }
            };
        },
        created() {
            var user = JSON.parse(this.Storage.get('USER'));
            //如果未设置资金密码，先跳转到资金密码设置页面
            if (user.isSetPwd != '1') {
                Toast({
                    message: '请先设置资金密码',
                    position: 'top',
                    duration: 2000
                });
                router.go({
                    name: 'my-fund-pwd-set'
                });
                return;
            }
            //如果未添加银行卡，先跳转到银行卡页面
            if (user.isBindBank != '1') {
                Toast({
                    message: '请先绑定银行卡',
                    position: 'top',
                    duration: 2000
                });
                router.go({
                    name: 'my-bankcard'
                });
                return;
            }
        },
        ready() {
            this.loadAcquiesceBank();
            this.loadFreeBalance();
        },
        components: {
            "pb-object-top": public_ObjectTop,
            "pb-padding-top":public_pTop,
            "pb-bank-section": public_bank_section,
            "pb-form-item": public_menunext,
            "pb-button": public_button,
            "pb-popup-bottom": public_popup_bottom,
            "pb-safety": public_safety
        },
        methods: {
            submit: function() {
                var reg = new RegExp("^[0-9]+(.[0-9]{1,2})?$");
                this.withdraw.amount = parseFloat(this.withdraw.amount);
                if (this.withdraw.amount > this.freeBalance) {
                  MsgBox.alert('可提现金额不足！')
                  return false;
                }
                if (this.withdraw.amount && reg.test(this.withdraw.amount)) {
                    this.flag = false;
                } else {
                    return false;
                }
            },
            changeBank: function() {
                this.bankPopup = true;
            },
            selectBank: function(bank) {
                this.bankList.forEach(function(item, index) {
                    //尽量少处理数据，只需要改变上次选中的和本次选中的

                    if (item.investorBankId == bank.investorBankId || item.checked) {
                        //复制对象
                        var newBank = JSON.parse(JSON.stringify(item));
                        newBank.checked = item.investorBankId == bank.investorBankId;
                        this.bankList.$set(index, newBank);
                    }
                }.bind(this));
                this.selectedBank = bank;
                this.bankPopup = false;
            },
            go_withdraw_finish: function(password) {
                //子组件输入密码完成之后触发这个post请求 成功之后跳到提现完成页面，失败提示后台返回的msg错误绑定到弹窗上
                this.withdraw.amount = parseFloat(this.withdraw.amount);
                this.withdraw.fundPassword = Security.encrypt(password);
                this.withdraw.bankAccount = this.selectedBank.bankAccount;
                this.$http({
                    method: "POST",
                    url: http_url.my_withdraw,
                    body: this.withdraw
                }).then((res) => {
                    if (res.data.code == 200) {
                        router.go({
                            name: this.next_address,
                            params: {
                                orderNo: res.data.data
                            }
                        });
                    }
                });
            },
            loadAcquiesceBank: function() {
                this.$http({
                    method: "GET",
                    url: http_url.my_bank_list
                }).then((response) => {
                    if (response.data.code == 200) {
                        this.bankList = response.body.data;
                        if (this.bankList && this.bankList.length > 0) {
                          this.bankList[0].checked = true;
                          this.selectedBank = this.bankList[0];
                        }
                    }
                });
            },
            //可提现金额
            loadFreeBalance: function() {
                this.$http({
                    method: "GET",
                    url: http_url.my_free_balance
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.freeBalance = res.data.data;
                    }
                });
            },
            onBlur: function() {
                var reg = new RegExp("^[0-9]+(.[0-9]{1,2})?$");
                this.withdraw.amount = parseFloat(this.withdraw.amount);
                if (this.withdraw.amount && reg.test(this.withdraw.amount)) {
                    var amount = this.withdraw.amount;
                    this.$http({
                        method: "GET",
                        url: http_url.my_withdraw_procedure + amount
                    }).then((response) => {
                        if (response.data.code == 200) {
                            this.counterFee = response.body.data;
                        }
                    });
                }
            },
            //跳转到添加银行卡界面
            menu_go_card: function(msg) {
                router.go({name:msg});
            }
        },
        events: {
            "on-back": function() {
                this.flag = true;
            },
            "clickNextPage": function(password) {
                this.go_withdraw_finish(password);
            }
        }
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";

.withdraw-content {
    padding-top: $status-bar-height;
    .bank-section {
        margin-top: .3rem;
        padding: .24rem .3rem;
    }
    .free-balance {
        color: #F75C5C;
    }
    .withdraw-form {
        margin-top: .16rem;
        background-color: #ffffff;
        padding-left: .3rem;
        .withdraw-item {
            font-size: .28rem;
            line-height: .48rem;
            .withdraw-tip {
                display: inline-block;
                width: 1.15rem;
            }
            .withdraw-data {
                margin-left: .4rem;
                color: #F75C5C;
            }
            .withdraw-input {
                font-size: .28rem;
                color: #F75C5C;
                border: none;
            }
        }
    }
    .tip {
        margin-left: .3rem;
        margin-top: .16rem;
        font-size: .22rem;
        color: #999999;
    }
    ;
    .withdraw-btn {
        margin-top: .8rem;
        width: 100%;
        max-width: $custom-max-width;
        text-align: center;
    }
}
;
.bank-list-container {
    min-height: 1.13rem;
    max-height: 4.52rem;
    overflow: scroll;
    .recharge-item{
        font-size: .28rem;
        color: #000000;
        height: .52rem;
        line-height: .52rem;
        background: url("../../static/images/right-next.png") no-repeat 5.5rem .3rem;
        background-size: .16rem .28rem;
    }
};
.bank-item {
    margin-left: .3rem;
    padding: .2rem .3rem .2rem 0;
    border-bottom: $public-border solid #efefef;
    &:last-child {
        border-bottom: none;
    }
    ;
};
</style>
