/**
* Created by youhaiyang on 10/25/16.
*
* Des: 充值
*
*/
<template>
<div>
  <div v-if="flag">
    <pb-object-top msg="充值" back="true" icon="true"></pb-object-top>
    <pb-padding-top></pb-padding-top>
    <div class="recharge">
      <div class="recharge-form">
        <pb-form-item class="recharge-item">
          <span class="recharge-tip" slot="image">充值金额</span>
          <span class="recharge-data"><input type="number" pattern="[0-9]*" class="recharge-input" placeholder="请输入充值金额" v-model="money.put_charge" @blur="onBlur"></span>
        </pb-form-item>
        <pb-form-item class="recharge-item">
          <span class="recharge-tip" slot="image">手续费</span>
          <span class="recharge-data" v-text="money.procedure_charge"></span>
        </pb-form-item>
        <pb-form-item class="recharge-item">
          <span class="recharge-tip" slot="image">扣款总额</span>
          <span class="recharge-data" v-text="money.fact_charge"></span>
        </pb-form-item>
      </div>
      <div class="recharge-type">
        <div class="title">请选择支付方式</div>
        <div class="type-list">
          <div class="type-item" @click="selectRechargeType(2)">
            <div class="item-left">
              <div>POS充值</div>
              <div class="tip">理财充值不支持信用卡</div>
            </div>
            <div class="item-right item-right-bank" :class="rechargeType===2?'item-checked':'item-unchecked'"></div>
          </div>
          <div class="type-item" disabled @click="selectRechargeType(1)">
            <div class="item-left">
              <div>银行卡充值</div>
              <div class="tip">
                <span>{{selectedBank.bankName+selectedBank.remark}}</span>
                <span v-if="operate_flag">暂未绑定银行卡</span>
                <span v-if="rechargeType===1">
                  <button class="btn-card" @click.stop.prevent="changeBank" v-text="operate_status"></button>
                </span>
              </div>
            </div>
            <div class="item-right item-right-bank" :class="rechargeType===1?'item-checked':'item-unchecked'"></div>
          </div>
        </div>
      </div>
      <div class="recharge-btn">
        <pb-button cls="btn-lg" @click="handleNext()">下一步</pb-button>
      </div>
    </div>
    <pb-popup-bottom title="选择银行卡" :show.sync="bankPopup">
      <div class="bank-list-container">
        <pb-bank-section class="bank-item" v-for="item in bankList" :bank="item" mode="sm" @click="selectBank(item)"></pb-bank-section>
        <div class="bank-item recharge-item" @click="menu_go_card('my-add-bank')">使用新卡充值</div>
      </div>
    </pb-popup-bottom>
  </div>
  <div v-else>
    <pb-safety></pb-safety>
  </div>
  <div style="display:none;">
    <form id="frm_cash" method="get" action="opencashboxapp://cashboxapppay">
      <input type="hidden" id="appCode" name="appCode" :value.sync="appCode" />
      <input type="hidden" id="orderNo" name="orderNo" :value.sync="orderNo" />
      <input type="hidden" id="orderAmount" name="orderAmount" :value.sync="orderAmountPOS" />
      <input type="hidden" id="returnUrl" name="returnUrl" :value.sync="returnUrl" />
    </form>
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
import Toast from 'mint-ui/lib/toast';
import MsgBox from '../../plugins/messagebox/index.js'; //消息提示框
import http_url from '../../common/js/http-url.js';
import Cashbox from '../../common/js/cashbox.js';
import Security from '../../common/js/security.js';
import Data from '../../common/js/data.js';

export default {
  data() {
    return {
      appCode: Data.APP_CODE,
      orderNo: '',
      orderAmountPOS: 0,
      returnUrl: http_url.recharge_callback_url + '/' + Math.random(),
      flag: true, //充值页面-资金密码输入页面  切换标记
      bankPopup: false, //银行列表弹出层是否显示
      rechargeType: 2, //充值方式 1、银行卡  2、POS
      popupData: false, //错误弹窗是否显示-密码输入页面
      errorCon: '', //错误内容-密码输入页面
      next_address: "recharge-finish", //结果地址路由名称
      //选中的银行卡
      selectedBank: {
        bankCode: "",
        bankName: "",
        remark: "",
        bankAccount: ""
      },
      //银行卡列表
      bankList: [],
      //金额信息
      money: {
        //put_charge: 0,
        procedure_charge: 0, //手续费
        fact_charge: 0 //总金额
      },
      operate_status: "", //显示操作
      operate_flag: false //是否显示绑卡提示
    };
  },
  created: function() {
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
    this.$http({
      method: "GET",
      url: http_url.my_bank_list
    }).then((response) => {
      if (response.data.code == 200) {
        this.data_processing(response.data.data);
      }
    });
  },
  computed: {
    // //充值方式样式选择  银行卡、POS
    // checkedCls: function() {
    //   return this.rechargeType === 1 ? 'item-checked' : 'item-unchecked';
    // }
  },
  components: {
    "pb-object-top": public_ObjectTop,
    "pb-padding-top": public_pTop,
    "pb-bank-section": public_bank_section,
    "pb-form-item": public_menunext,
    "pb-button": public_button,
    "pb-popup-bottom": public_popup_bottom,
    "pb-safety": public_safety
  },
  methods: {
    //处理银行列表数据请求  默认第一条为选中数据
    data_processing: function(info_data) {
      this.bankList = info_data;

      if (info_data.length < 1) {
        this.operate_status = "绑卡";
        this.operate_flag = true;
      } else {
        this.operate_status = "更换";
        this.operate_flag = false;
      }

      this.bankList.forEach(function(item, index) {
        if (index == 0) {
          this.selectedBank.bankCode = item.bankCode;
          this.selectedBank.bankName = item.bankName;
          this.selectedBank.remark = item.remark;
          this.selectedBank.bankAccount = item.bankAccount;
          item.checked = true;
        }
      }.bind(this));
    },
    //失去焦点数据请求，返回费用
    onBlur: function() {
      var reg = new RegExp("^[0-9]+(.[0-9]{1,2})?$");
      var put_charge = parseFloat(this.money.put_charge);
      //金额不为空 并且符合最多两位小数
      if (put_charge && reg.test(put_charge)) {
        this.reloadFee();
      } else {
        //如果不合法 且没有值  手续费和总额归0
        if (!put_charge) {
          this.money.procedure_charge = 0;
          this.money.fact_charge = 0;
        }
      }
    },
    //提交到输入资金密码页面
    handleNext: function() {
      //两位小数
      var reg = new RegExp("^[0-9]+(.[0-9]{1,2})?$");
      var put_charge = parseFloat(this.money.put_charge);
      //判断输入金额是否为0和空
      if (put_charge === 0 || !put_charge) {
        MsgBox.alert('请输入充值金额！');
        return false;
      }
      //判断输入金额是否为小数点后两位
      if (!reg.test(put_charge)) {
        MsgBox.alert('小数点后不能超过2位！');
        return false;
      }
      if (put_charge && reg.test(put_charge)) {
        //校验
        if (put_charge < 10) {
          MsgBox.alert('最低充值金额10元！');
          return false;
        }
        if (this.rechargeType == 1 && this.bankList.length == 0) {
          MsgBox.alert('未绑定银行卡！');
          return false;
        }
        this.flag = false;
      } else {
        return false;
      }

    },
    //更换充值方式
    selectRechargeType: function(type) {
      //暂不支持银行卡代扣
      if (type == 1) {
        MsgBox.alert('功能开发中，敬请期待!');
        return false;
      }
      this.rechargeType = type;
      this.reloadFee();
    },
    //获取手续费
    reloadFee: function() {
      //获取手续费
      if (this.money.put_charge > 0) {
        var url = '';
        switch (this.rechargeType) {
          case 1: //银行卡
            url = http_url.my_recharge_procedure_bank;
            break;
          case 2: //POS机
            url = http_url.my_recharge_procedure_pos;
            break;
        }
        this.$http({
          method: "GET",
          url: url + this.money.put_charge
        }).then((response) => {
          if (response.data.code == 200) {
            this.money.procedure_charge = parseInt(response.data.data);
            this.money.fact_charge = parseInt(response.data.data) + parseInt(this.money.put_charge);
          }
        });
      }
    },
    //更换银行卡-弹出银行卡列表
    changeBank: function() {
      if (this.operate_flag) {
        router.go({
          name: 'my-add-bank'
        });
      } else {
        this.bankPopup = true;
      }
    },
    //银行卡列表选择
    selectBank: function(bank) {
      this.bankList.forEach(function(item, index) {
        //尽量少处理数据，只需要改变上次选中的和本次选中的
        //判断 选中项 和 上一次选中项  均进入判断
        if (item.id == bank.id || item.checked) {
          //复制对象
          var newBank = JSON.parse(JSON.stringify(item));
          //分别重置 选中项和上一次选中项 bankCode值
          newBank.checked = item.investorBankId == bank.investorBankId;
          //通过$set方法触发绑定修改
          this.bankList.$set(index, newBank);
        }
      }.bind(this));
      //重新赋值选中展示银行卡对象
      this.selectedBank = bank;
      //关闭银行卡list
      this.bankPopup = false;
    },
    //充值
    recharge: function(password) {
      var url = '';
      var paymentType = '';
      var callback = null;
      var data = {
        amount: this.money.put_charge, //金额
        fundPassword: Security.encrypt(password), //密码
        paymentChannel: Data.PAYMENT_CHANNEL, //"IBOXPAY", //默认
        rechargeChannel: Data.RECHARGE_CHANNEL, //1代表汇赚钱
        salesId: Data.SALES_ID, //销售平台
      };
      //POS和银行卡充值参数不同
      switch (this.rechargeType) {
        case 1:
          url = http_url.my_recharge_bank;
          callback = this.bankRechargeCallback;
          data.paymentType = 'WH';
          data.bankAccount = this.selectedBank.bankAccount;
          break;
        case 2:
          url = http_url.my_recharge_pos;
          callback = this.posRechargeCallback;
          data.paymentType = 'POS';
          data.token = this.Storage.get('CASHBOX_TOKEN'); //POS预下单需要tpfToken
          break;
      }
      this.$http({
        method: "POST",
        url: url,
        timeout: 120000, //超时时间两分钟
        ignoreError: true,
        body: data
      }).then((res) => {
        var code = res.data.code;
        if (code == 200 || code == 11003) {
          callback(res);
        } else if (code == 410) {
          window.location.href = '/info/error?code=' + code;
        } else {
          MsgBox.alert(code === 500 ? '网络异常，请稍后再试！' : res.data.msg);
        }
      });
    },
    //银行卡充值成功回调
    bankRechargeCallback: function(res) {
      res.data.data = res.data.data || {};
      router.go({
        name: this.next_address,
        params: {
          random: Math.random()
        },
        query: {
          orderNo: res.data.data.paymentOrderNo || '',
          payStatus: 1
        }
      });
    },
    //pos充值成功回调
    posRechargeCallback: function(res) {
      //交易订单号
      this.orderNo = res.data.data.paymentOrderNo;
      //交易金额，传给SDK需要乘以100，以分为单位
      this.orderAmountPOS = parseInt(res.data.data.totalAmount * 100);
      //打开POS充值界面,
      //使用setTimeout，否则数据未同步
      setTimeout(function() {
        this.openPOS();
      }.bind(this));
    },
    //打开POS充值界面
    openPOS: function() {
      var tradeNo = this.orderNo;
      var that = this;
      //判断是否支持新版api
      Cashbox.callNative('getClientInfo', {}, function(res) {
        if (res.status == -1) { //如果支持新版
          var options = {
            outTradeNo: tradeNo,
            amount: that.orderAmountPOS,
            appCode: that.appCode,
            isCallback: 1, //又汇赚钱来处理返回结果，使用回调方式，不再传callbackUrl
            //callbackUrl: that.returnUrl
          };
          Cashbox.callNative('toSwipe', options, function(res) {
            var orderNo = ''; //订单号
            var errorCode = ''; //错误码
            var errorDesc = ''; //错误信息
            //status=1成功，status=0失败
            if (res.status == 1) {
              orderNo = res.data.outTradeNo;
            } else {
              errorCode = res.errorCode;
              errorDesc = res.errorDesc;
            }
            router.go({
              name: that.next_address,
              params: {
                random: Math.random()
              },
              query: {
                // 把status=0换成2，与opencashboxapp方式保持一致
                payStatus: res.status == 1 ? 1 : 0,
                errorCode: errorCode,
                errorDesc: errorDesc,
                orderNo: orderNo
              }
            });
          });
        } else { //如果不支持新版
          var sdkForm = document.getElementById('frm_cash');
          sdkForm.submit();
        }
      });
    },
    //跳转到添加银行卡界面
    menu_go_card: function(msg) {
      router.go({
        name: msg
      });
    }
  },
  events: {
    //设置title返回按钮广播效果
    "on-back": function() {
      this.flag = true;
    },
    //设置密码输入页面确定操作
    "clickNextPage": function(password) {
      this.recharge(password);
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";

.recharge {
    padding-top: $status-bar-height;
    .bank-section {
        margin-top: 0.3rem;
        padding: 0.24rem 0.3rem;
    }

    .recharge-form {
        margin-top: 0.3rem;
        background-color: #ffffff;
        padding-left: 0.3rem;
        .recharge-item {
            font-size: 0.28rem;
            line-height: 0.48rem;
            .recharge-tip {
                display: inline-block;
                width: 1.15rem;
            }

            .recharge-data {
                margin-left: 0.4rem;
                color: #F75C5C;
            }

            .recharge-input {
                font-size: 0.28rem;
                color: #F75C5C;
                border: none;
            }
        }
    }

    .recharge-btn {
        margin-top: 0.8rem;
        width: 100%;
        max-width: $custom-max-width;
        text-align: center;
    }

    .recharge-type {
        margin-top: 0.3rem;
        .title {
            font-size: 0.22rem;
            color: #999;
            padding-left: 0.3rem;
        }
        .type-list {
            margin-top: 0.16rem;
            background: #fff;
            padding-left: 0.3rem;
            .type-item {
                border-bottom: $public-border solid #efefef;
                color: #000;
                display: inline-block;
                width: 100%;
                padding-top: 0.25rem;
                padding-bottom: 0.25rem;
                div {
                    font-size: 0.28rem;
                }
                &:last-child {
                    border: none;
                    padding-top: 0.3rem;
                    padding-bottom: 0.3rem;
                }
                .item-left {
                    float: left;
                }
                .item-right {
                    margin-right: 0.3rem;
                    float: right;
                }
                .item-right-bank {
                    margin-top: 0.15rem;
                }
                .item-checked {
                    background: url("../../static/images/rd-checked.png") no-repeat;
                    background-size: 0.4rem 0.4rem;
                    width: 0.4rem;
                    height: 0.4rem;
                }
                .item-unchecked {
                    background: url("../../static/images/rd-unchecked.png") no-repeat;
                    background-size: 0.4rem 0.4rem;
                    width: 0.4rem;
                    height: 0.4rem;
                }
                .tip {
                    font-size: 0.22rem;
                    color: #999;
                    height: 0.32rem;
                }
                .btn-card {
                    width: 0.85rem;
                    height: 0.32rem;
                    border: $public-border solid #F75C5C;
                    color: #f75c5c;
                    border-radius: 0.5rem;
                    font-size: 0.2rem;
                    background: #fff;
                    outline: none;
                }
            }
            .type-item[disabled] {
                color: #ccc;
                .tip {
                    color: #ccc;
                }
            }
        }
    }
}

.bank-list-container {
    min-height: 1.13rem;
    max-height: 4.52rem;
    overflow: scroll;
    .recharge-item {
        font-size: 0.28rem;
        color: #000000;
        height: 0.52rem;
        line-height: 0.52rem;
        background: url("../../static/images/right-next.png") no-repeat 5.5rem 0.3rem;
        background-size: 0.16rem 0.28rem;
    }
}

.bank-item {
    margin-left: 0.3rem;
    padding: 0.2rem 0.3rem 0.2rem 0;
    border-bottom: $public-border solid #efefef;
    &:last-child {
        border-bottom: none;
    }

}
</style>
