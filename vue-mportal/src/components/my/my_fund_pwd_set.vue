/**
* Created by youhy on 16/12/16.
*
* Des:设置资金密码、重置资金密码
*
*/
<template>
<div class="pwd-container">
  <div class="pwd-section">
    <pb-menu-next>
      <span class="content" v-text="mobile"></span>
    </pb-menu-next>
  </div>
  <div class="pwd-section">
    <pb-menu-next>
      <span sloat="image" class="icon icon-pwd"></span>
      <input type="password" class="input" v-model="password" placeholder="设置6-12位字母和数字组成的密码">
    </pb-menu-next>
    <pb-menu-next>
      <span sloat="image" class="icon icon-pwd-2"></span>
      <input type="password" class="input" v-model="rePassword" placeholder="再次确认资金密码">
    </pb-menu-next>
  </div>
  <div class="pwd-section">
    <pb-menu-next>
      <span sloat="image" class="icon icon-pen"></span>
      <input type="password" class="input captcha" placeholder="输入验证码" v-model="captcha">
      <button sloat="right" class="property-right" @click="sendAuthCode()">
          <span v-text="captchaText" :class="{'gray':captchaStatus}"></span>
      </button>
    </pb-menu-next>
  </div>
  <div class="btn-submit">
    <pb-button cls="btn-lg" @click="submit()">完成</pb-button>
  </div>
</div>
</template>
<script>
import public_menunext from '../common/public_Menunext';
import public_button from '../common/public_button';
import http_url from '../../common/js/http-url.js';
import Toast from 'mint-ui/lib/toast';
import MsgBox from '../../plugins/messagebox/index.js'; //消息提示框
import Security from '../../common/js/security.js';

export default {
  data() {
    var user = JSON.parse(this.Storage.get('USER'));
    return {
      routeName: this.$route.name,
      title: '设置资金密码',
      mobile: user.maskMobile,
      captchaText: '发送验证码',
      captchaStatus: false,
      password: '',
      rePassword: '',
      captcha: ''
    }
  },
  components: {
    "pb-menu-next": public_menunext,
    "pb-button": public_button
  },
  methods: {
    //发送验证码
    sendAuthCode() {
      if (this.captchaStatus) return;
      var operationType = this.routeName == 'my-fund-pwd-reset' ? 'FINDMONEYPAS' : 'SETMONEYPAS';
      this.$http({
        method: "GET",
        url: http_url.my_pwd_captcha + '/' + operationType
      }).then((res) => {
        if (res.body.code == 200) {
          this.waitCaptcha();
        }
      });
    },
    waitCaptcha: function() {
      //验证码倒计时
      var _this = this;
      this.captchaStatus = true;
      var currentSecond = 60;
      this.captchaText = "60s";
      this.timer = setInterval(() => {
        currentSecond--;
        _this.captchaText = currentSecond + "s";
        if (currentSecond == 0) {
          clearInterval(_this.timer);
          this.captchaStatus = false;
          this.captchaText = "发送验证码";
        }
      }, 1000);
    },
    submit() {
      //^[A-Za-z0-9]{6,12}$
      var patrn = [];
      patrn[0] = /^[A-Za-z0-9]{6,12}$/;
      if (!patrn[0].exec(this.password)) {
        MsgBox.alert('密码必须由6-12位字母和数字组成');
        return false;
      }
      if (!this.password) {
        MsgBox.alert('请输入密码！');
        return false;
      }
      if (this.password != this.rePassword) {
        MsgBox.alert('两次密码不一致！');
        return false;
      }
      if (!this.captcha) {
        MsgBox.alert('请输入验证码！');
        return false;
      }
      //提交设置、找回资金密码
      var body = {
        newPassword: Security.encrypt(this.password),
        smsCode: this.captcha
      };
      this.$http({
        method: "POST",
        url: this.routeName == 'my-fund-pwd-reset' ? http_url.my_pwd_reset : http_url.my_pwd_set,
        body: body
      }).then((res) => {
        if (res.body.code == 200) {
          Toast('操作成功');
          let user = JSON.parse(this.Storage.get('USER'));
          user.isSetPwd = '1';
          this.Storage.set('USER', JSON.stringify(user));
          router.go({
            name: 'my'
          });
        }
      });
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";

.pwd-container {
    .pwd-section {
        margin-top: 0.3rem;
        background-color: #ffffff;
        padding-left: 0.3rem;
        .content {
            color: #000000;
            font-size: 0.28rem;
        }
        .icon {
            float: left;
            display: inline-block;
            width: 0.48rem;
            height: 0.48rem;
        }
        .icon-pwd {
            background: url('../../static/images/password-1.png') no-repeat 0 0 /.48rem 0.48rem;
        }
        .icon-pwd-2 {
            background: url('../../static/images/password-2.png') no-repeat 0 0 /.48rem 0.48rem;
        }
        .icon-pen {
            background: url('../../static/images/auth_code.png') no-repeat 0 0 /.48rem 0.48rem;
        }
        .input {
            float: left;
            width: 5.02rem;
            font-size: 0.28rem;
            margin-left: 0.3rem;
            line-height: 0.48rem;
            border: none;
            outline: none;
        }
        .captcha {
            width: 3.02rem;
        }
        .property-right {
            background: none;
            outline: none;
            float: right;
            width: 2rem;
            font-size: 0.28rem;
            color: #f75c5c;
            text-align: center;
            margin-top: 0.05rem;
            border: none;
            border-left: #efefef solid $public-border;
            .gray{
                color:#999999;
            }
        }
    }
    .btn-submit {
        margin-top: 0.8rem;
        text-align: center;
    }
}
</style>
