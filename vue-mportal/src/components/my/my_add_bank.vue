/**
* Created by gyr on 17/1/10.
*
* Des:我的-添加银行卡
*
*/
<template>
<pb-object-top :msg="title" back="true" icon="true">
  <span slot="right" class="tip-icon" @click="goTo('declare')"></span>
</pb-object-top>
<pb-padding-top></pb-padding-top>
<pb-wx-des des="支持银行卡及额度说明" go-msg="declare"></pb-wx-des>
<div class="add-bank-card">
  <div class="step1" v-if="step=='1'">
    <div class="add-form">
      <!--需要判断当身份证号不存在的时候 姓名和身份证号是可以输入的 -->
      <pb-form-item class="add-item">
        <span class="add-tip" slot="image">持卡人</span>
        <span v-if="info.idNo" class="add-data">{{info.name}}</span>
        <input v-else class="add-data-input" v-model="info.name">
      </pb-form-item>
      <pb-form-item class="add-item">
        <span class="add-tip" slot="image">身份证</span>
        <span v-if="info.idNo" class="add-data">{{info.idNo}}</span>
        <input v-else class="add-data-input" v-model="idNo">
      </pb-form-item>
      <pb-form-item class="add-item">
        <input v-model="info.cardCode" type="number" pattern="[0-9]*" class="add-input" placeholder="请输入您的银行储蓄卡卡号" />
      </pb-form-item>
    </div>
    <div class="add-treaty">
      <span class="agree" @click="changeIcon" v-bind:class="{agree2:show}"></span> 同意
      <span class="treaty-agree" @click="goTo('info-treaty')">《三方支付服务协议》</span>
    </div>
    <div class="add-btn">
      <pb-button cls="btn-lg" @click="next">
        下一步
      </pb-button>
    </div>
  </div>
  <div class="step2" v-if="step == '2'">
    <pb-bank-section class="bank-section" :bank="selectedBank" mode="sm"></pb-bank-section>
    <div class="add-form">
      <pb-form-item class="add-item">
        <span class="add-tip" slot="image">持卡人</span>
        <span class="add-data">{{info.name}}</span>
      </pb-form-item>
      <pb-form-item class="add-item">
        <span class="add-tip" slot="image">身份证</span>
        <span class="add-data" v-text="idNo"></span>
      </pb-form-item>

    </div>
    <div class="add-phone">
      <div class="title">请输入银行卡预留手机号</div>
      <div class="phone-list">
        <pb-form-item class="phone-item">
          <span slot="image"><input type="number" pattern="[0-9]*" v-model="info.mobile" class="add-input phone" placeholder="手机号"/></span>
        </pb-form-item>
        <pb-form-item class="phone-item">
          <span slot="image"><input id="txtCaptcha" class="add-input captcha" v-model="info.captcha" placeholder="请输入验证码" type="number" pattern="[0-9]*"/></span>
          <span @click="sendCaptcha" slot="right" class="list-right"><i :class="{'gray':captchaStatus}">{{captchaAreaText}}</i></span>
        </pb-form-item>
      </div>
    </div>
    <div class="add-btn">
      <pb-button cls="btn-lg" @click="submit">
        完成
      </pb-button>
    </div>
  </div>
</div>
</template>

<script>
import public_ObjectTop from '../common/public_ObjectTop';
import public_pTop from '../common/public_ptop.vue';
import public_wxDeclare from '../common/public_wxdeclare.vue';
import public_menunext from '../common/public_Menunext';
import public_bank_section from '../common/public_bank_section';
import public_button from '../common/public_button';
import MsgBox from '../../plugins/messagebox/index.js'; //消息提示框
import http_url from '../../common/js/http-url.js';

export default {
  props: [],
  data() {
    return {
      captchaAreaText: "发送校验码",
      captchaStatus: false,
      timer: null,
      title: '添加银行卡',
      step: '1',
      con: null,
      captcha: null,
      show: false,
      info: {
        name: '',
        idNo: '',
        cardCode: null,
        mobile: null,
        captcha: null
      },
      selectedBank: {
        bankCode: '',
        bankName: '',
        remark: ''
      },
      idNo: ''
    }
  },
  ready() {
    var userStr = this.Storage.get('USER');
    if (userStr) {
      var userInfo = JSON.parse(userStr);
      this.info.name = userInfo.name;
      this.info.idNo = userInfo.idNo;
      this.info.mobile = userInfo.mobile;
    }
  },
  components: {
    "pb-object-top": public_ObjectTop,
    "pb-padding-top": public_pTop,
    "pb-wx-des": public_wxDeclare,
    "pb-bank-section": public_bank_section,
    "pb-form-item": public_menunext,
    "pb-button": public_button
  },
  methods: {
    //银行卡绑定第一步
    next: function() {

      var patrn = [];
      patrn[0] = /^[A-Za-z0-9]{12,24}$/; //验证银行卡号
      patrn[1] = /^[\u4E00-\u9FA5]{2,5}$/; //验证名字
      patrn[2] = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/; //;验证身份证号
      if (this.info.idNo) {
        if (!patrn[0].test(this.info.cardCode)) {
          MsgBox.alert('请输入正确的银行卡号');
        } else if (!this.show) {
          MsgBox.alert('请阅读协议,并同意');
        } else {
          this.getCard()
        }
      } else {
        if (!patrn[1].test(this.info.name)) {
          MsgBox.alert('请输入您的姓名');
        } else if (!patrn[2].test(this.idNo)) {
          MsgBox.alert('请输入正确的身份证号');
        } else if (!patrn[0].test(this.info.cardCode)) {
          MsgBox.alert('请输入正确的银行卡号');
        } else if (!this.show) {
          MsgBox.alert('请阅读协议,并同意');
        } else {
          this.getCard()
        }
      }
    },
    getCard: function() {
      this.idNo = this.idNo ? this.idNo : this.info.idNo;
      this.$http({
        method: "GET",
        url: http_url.my_add_bank_code + this.info.cardCode
      }).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.cardType != "1") {
            MsgBox.alert('请使用储蓄卡！');
            return false;
          }

          const banks = JSON.parse(this.Storage.get('BANKS')) || [];
          var isBankValid = this.Helper.verifyBank(res.data.data.bankCode, banks);
          if (!isBankValid) {
            MsgBox.alert('暂不支持' + (res.data.data.bankName || '该银行卡') + ',请更换银行卡！');
            return false;
          }
          var remark = this.info.cardCode.substr(this.info.cardCode.length - 4);
          this.selectedBank.bankCode = res.data.data.bankCode;
          this.selectedBank.bankName = res.data.data.bankName;
          this.selectedBank.remark = '尾号为' + remark + '储蓄卡';
          this.step = '2';
        }
      });
    },
    //阅读协议
    changeIcon: function() {
      if (!this.show) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    //提交信息到后台
    submit: function() {
      this.info.idNo = this.idNo;
      var patrn2 = [];
      patrn2[0] = /^1[3|4|5|7|8]\d{9}$/;
      if (!patrn2[0].exec(this.info.mobile)) {
        MsgBox.alert('请输入正确的手机号');
      } else if (!this.info.captcha) {
        MsgBox.alert('请输入验证码');
      } else {
        this.$http({
          method: "POST",
          url: http_url.my_add_bank,
          body: this.info
        }).then((res) => {
          if (res.data.code == 200) {
            console.log(res.data);
            // 更新storage中存储的状态
            let user = JSON.parse(this.Storage.get('USER'));
            // 已经绑定银行卡
            user.isBindBank = '1';
            // 写入姓名和身份证号，防止下次绑卡重复输入身份证
            user.name = this.info.name;
            user.idNo = this.Helper.maskIdNo(this.idNo);
            this.Storage.set('USER', JSON.stringify(user));
            router.go({
              name: 'my-bankcard'
            });
          }
        });
      }
    },
    sendCaptcha: function() {
      if (!this.captchaStatus) {
        this.postCaptchay();
      }
    },
    postCaptchay: function() {
      //请求服务器验证码
      if (!this.info.mobile) return;
      var body = {
        "operationType": "BINDBANK",
        "mobile": this.info.mobile
      };
      this.$http({
        method: "POST",
        url: http_url.my_bank_captcha,
        body: body
      }).then((res) => {
        if (res.data.code === 200) {
          document.getElementById('txtCaptcha').focus();
          this.waitCaptcha();
        }
      });
    },
    waitCaptcha: function() {
      //验证码倒计时
      var _this = this;
      this.captchaStatus = true;
      var currentSecond = 60;
      this.captchaAreaText = "60s";
      this.timer = setInterval(() => {
        currentSecond--;
        _this.captchaAreaText = currentSecond + "s";
        if (currentSecond == 0) {
          clearInterval(_this.timer);
          this.captchaStatus = false;
          this.captchaAreaText = "发送校验码";
        }
      }, 1000);
    },
    goTo: function(routeName) {
      router.go({
        name: routeName
      });
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";

.add-bank-card {
    //padding-top: .88rem+$status-bar-height;
    //padding-top: $public-nav-height+$status-bar-height;
    padding-top: $status-bar-height;
    .step1 {
        .add-form {
            margin-top: 0.3rem;
            background-color: #ffffff;
            padding-left: 0.3rem;
            .add-item {
                font-size: 0.28rem;
                line-height: 0.48rem;
                color: #000;
                .add-tip {
                    display: inline-block;
                    width: 0.9rem;
                }
                .add-data {
                    margin-left: 0.4rem;
                    color: #999;
                }
                .add-data-input {
                    margin-left: 0.4rem;
                    color: #999;
                    font-size: 0.28rem;
                    border: none;
                    line-height: 0.48rem;
                }
                .add-input {
                    width: 100%;
                    font-size: 0.28rem;
                    color: #999;
                    border: none;
                }
            }
        }
        .add-btn {
            margin-top: 0.8rem;
            width: 100%;
            max-width: $custom-max-width;
            text-align: center;
        }
        .add-treaty {
            margin-top: 0.16rem;
            height: 0.32rem;
            text-align: left;
            line-height: 0.32rem;
            margin-left: 0.3rem;
            font-size: 0.22rem;
            color: #999;
            .agree {
                float: left;
                width: 0.32rem;
                padding-right: 0.12rem;
                height: 100%;
                background: url("../../static/images/rd-unchecked.png") no-repeat;
                background-size: 0.32rem 0.32rem;
            }
            .agree2 {
                float: left;
                width: 0.32rem;
                padding-right: 0.12rem;
                height: 100%;
                background: url("../../static/images/rd-checked.png") no-repeat;
                background-size: 0.32rem 0.32rem;
            }
            .treaty-agree {
                font-size: 0.22rem;
                color: #83bdfe;
                text-decoration: underline;
            }
        }
    }
    .step2 {
        .bank-section {
            margin-top: 0.3rem;
            padding: 0.24rem 0.3rem;
        }
        .add-form {
            margin-top: 0.3rem;
            background-color: #ffffff;
            padding-left: 0.3rem;
            .add-item {
                font-size: 0.28rem;
                line-height: 0.48rem;
                color: #000;
                input {
                    width: 100%;
                }
                .add-tip {
                    display: inline-block;
                    width: 0.9rem;
                }
                .add-data {
                    margin-left: 0.4rem;
                    color: #999;
                }
                .add-input {
                    font-size: 0.28rem;
                    color: #999;
                    border: none;
                }
            }
        }
        .add-phone {
            margin-top: 0.3rem;
            .title {
                font-size: 0.22rem;
                color: #666;
                padding-left: 0.3rem;
            }
            .phone-list {
                margin-top: 0.16rem;
                background: #fff;
                padding-left: 0.3rem;
                .phone-item {
                    font-size: 0.28rem;
                    line-height: 0.48rem;
                }
                .add-input {
                    font-size: 0.28rem;
                    color: #999;
                    border: none;
                }
                .add-input.phone {
                    width: 100%;
                }
                .add-input.captcha {
                    width: 4rem;
                }
                .list-right {
                    float: right;
                    margin: 0 0.3rem;
                    font-size: 0.28rem;
                    color: #f75c5c;
                    .gray {
                        color: #999999;
                    }
                }
            }
        }
        .add-btn {
            margin-top: 0.8rem;
            width: 100%;
            max-width: $custom-max-width;
            text-align: center;
        }
    }
}
.tip-icon {
  z-index: 20;
  display: inline-block;
  margin-top: 0.23rem;
  width: 0.42rem;
  height: 0.42rem;
  background: url("../../static/images/bankwh.png") no-repeat;
  background-size: 0.42rem 0.42rem;
}
</style>
