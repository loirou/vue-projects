/**
* Created by youhy on 16/12/16.
*
* Des:修改资金密码
*
*/
<template>
    <div class="pwd-container">
        <div class="pwd-section">
            <pb-menu-next>
                <span sloat="image" class="icon icon-pwd"></span>
                <input type="password" class="input" v-model="originalPassword" placeholder="请输入原密码">
            </pb-menu-next>
        </div>
        <div class="pwd-section">
            <pb-menu-next>
                <span sloat="image" class="icon icon-pwd-3"></span>
                <input type="password" class="input" v-model="newPassword" placeholder="请输入新密码">
            </pb-menu-next>
            <pb-menu-next>
                <span sloat="image" class="icon icon-pwd-2"></span>
                <input type="password" class="input" v-model="reNewPassword" placeholder="再次输入新密码">
            </pb-menu-next>
        </div>
        <div class="btn-submit">
            <pb-button cls="btn-lg" @click="submit()">完成</pb-button>
            <p class="forget-pwd"><a v-link="{name:'my-fund-pwd-reset'}">忘记密码?</a></p>
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
            title: '修改资金密码',
            mobile: user.maskMobile,
            originalPassword: '',
            newPassword: '',
            reNewPassword: ''
        }
    },
    components: {
        "pb-menu-next": public_menunext,
        "pb-button": public_button
    },
    methods: {
    	submit() {
            var patrn = [];
            patrn[0] = /^[A-Za-z0-9]{6,12}$/;
            if(!patrn[0].exec(this.newPassword)){
                MsgBox.alert('密码必须由6-12位字母和数字组成');
                return false;
            }
            if (!this.originalPassword) {
                MsgBox.alert('请输入原密码！');
                return false;
            }
            if (!this.newPassword) {
                MsgBox.alert('请输入新密码！');
                return false;
            }
            if (this.newPassword != this.reNewPassword) {
                MsgBox.alert('两次新密码不一致！');
                return false;
            }
    		var body = {
                originalPassword: Security.encrypt(this.originalPassword),
                newPassword: Security.encrypt(this.newPassword)
            };
            this.$http({
                method: "POST",
                url: http_url.my_pwd_change,
                body: body
            }).then((res) => {
                if (res.body.code == 200) {
                    Toast('操作成功');
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
	    margin-top: .3rem;
	    background-color: #ffffff;
	    padding-left: .3rem;
	    .icon {
	        float: left;
	        display: inline-block;
	        width: 0.48rem;
	        height: 0.48rem;
	    }
		.icon-pwd {
	        background: url('../../static/images/password-1.png') no-repeat 0 0 /.48rem .48rem;
		}
		.icon-pwd-2 {
	        background: url('../../static/images/password-2.png') no-repeat 0 0 /.48rem .48rem;
		}
		.icon-pwd-3 {
	        background: url('../../static/images/password-3.png') no-repeat 0 0 /.48rem .48rem;
		}
	    .input {
	        float: left;
	        width: 5.02rem;
	        font-size: .28rem;
	        margin-left: .3rem;
	        line-height: .48rem;
	        border: none;
	        outline: none;
	    }
	}
	.btn-submit {
        margin-top: .8rem;
		text-align: center;
	}
	.forget-pwd {
		margin-top: .24rem;
		font-size: .24rem;

		a {
			color: #f75b5b;
			text-decoration: underline;
		}
	}
}
</style>
