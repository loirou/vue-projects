/**
* Created by wd on 1/3/17.
*
* Des:微信-绑定银行卡
*
*/
<template>
<pb-object-top :msg="titie" back="true">
</pb-object-top>
<pb-padding-top></pb-padding-top>
<div class="wx-bind">
  <div class="bind-phone">
    <div class="phone-list">
      <pb-menu-next class="phone-binding">
        <span slot="image">
							<input type="number" pattern="[0-9]*" v-model="info.mobile" class="bind-input phone" placeholder="请输入钱盒登录手机号">
						</span>
      </pb-menu-next>
      <pb-menu-next class="phone-binding">
        <span slot="image">
							<input type="number" pattern="[0-9]*" v-model="info.captcha" class="bind-input captcha" placeholder="请输入验证码" />
						</span>
        <span @click="sendCaptcha" slot="right" class="list-right">
							<i :class="{'gray':captchaStatus}">{{captchaAreaText}}</i>
						</span>
      </pb-menu-next>
    </div>
    <div class="bind-btn">
      <pb-button class="btn-lg" @click="submit">提交</pb-button>
    </div>
  </div>
  <download-qh>
  </download-qh>
</div>
</template>
<script>
import public_ObjectTop from '../common/public_ObjectTop';
import public_menunext from '../common/public_Menunext';
import public_button from '../common/public_button';
import public_pTop from '../common/public_ptop.vue';
import download_qh from './download_qh';
import http_url from '../../common/js/http-url.js';
import MsgBox from '../../plugins/messagebox/index.js';
export default {
  porps: [],
  data() {
    return {
      captchaAreaText: "发送校验码",
      captchaStatus: false,
      titie: "账户绑定",
      info: {
        openid: this.$route.params.openid,
        mobile: null,
        captcha: null
      }
    }
  },
  components: {
    "pb-menu-next": public_menunext,
    "pb-object-top": public_ObjectTop,
    "pb-padding-top": public_pTop,
    "pb-button": public_button,
    "download-qh": download_qh
  },
  methods: {
    sendCaptcha: function() {
      //点击发送验证码判断状态不是倒计时
      if (!this.captchaStatus) {
        var pattern1 = [];
        pattern1 = /^1[3|4|5|7|8]\d{9}$/;
        //手机号不为空提示
        if (!this.info.mobile) {
          MsgBox.alert('请输入手机号!');
          return false;
        };
        //手机号格式提示
        if (!pattern1.exec(this.info.mobile)) {
          MsgBox.alert("请输入正确的手机号");
          return false;
        };
        //倒计时
        this.waitCaptcha();
        //调用获取验证码接口
        this.$http({
          method: "GET",
          url: http_url.get_wx_captcha + this.info.mobile + '/BINDWECHAT',
          body: this.info.mobile
        }).then((res) => {
          if (res.data.code == 200) {
            console.log(res.data);
          };
        })
      }
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
    submit: function() {
      if (!this.info.mobile) {
        MsgBox.alert("请输入手机号！");
        return false;
      };
      if (!this.info.captcha) {
        MsgBox.alert("请输入验证码!");
        return false;
      };
      //绑定手机号
      this.$http({
        method: 'POST',
        url: http_url.wx_bind, //正式
        ignoreError: true,
        body: this.info
      }).then((res) => {
        //正式环境
        if (res.data.code == 200) {
          //返回的token值存到localstorage然后跳到汇赚钱页面
          this.Storage.set('TOKEN', res.data.data.token);
          this.Storage.set('USER', JSON.stringify(res.data.data));
          this.$broadcast('on-toggle-menu', true);
          const route = this.$route.query.route;
          if (route) {
            window.location.href = route;
          } else {
            window.location.href = '/home';
          }
        } else if (res.data.code == 404) { //此手机号不是汇赚钱账号，后台返回固定标识，提示下载
          MsgBox.alert("该手机号暂未注册汇赚钱，请下载钱盒并注册汇赚钱！");
        } else {
          MsgBox.alert(res.data.msg);
        }
      }, (res) => {
        window.location.href = '/info/error?code=404';
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";
.wx-bind {
    //padding-top: .88rem;
    .bind-phone {
        margin-top: 0.3rem;
        .phone-list {
            padding-left: 0.3rem;
            background-color: #fff;
            .phone-binding {
                font-size: 0.28rem;
                line-height: 0.48rem;
                .bind-input {
                    font-size: 0.28rem;
                    color: #999;
                    border: none;
                    input:-webkit-input-placehoder {
                        color: #c8c7cc;
                    }
                }
                .bind-input.phone {
                  width: 100%;
                }
                .bind-input.captcha {
                  width: 4rem;
                }
                .list-right {
                    float: right;
                    margin: 0 0.3rem;
                    font-size: 0.28rem;
                    color: #f75c5c;
                    .gray {
                        color: #999;
                    }
                }
            }
        }
        .bind-btn {
            margin-top: 0.8rem;
            width: 100%;
            max-width: $custom-max-width;
            text-align: center;
        }
    }
}
</style>
