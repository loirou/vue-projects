<template>

    <div class="container">
        <div class="form_box">
            <section class="form_box--item">
                <label class="form_box--head">手机号码</label>
                <input v-model.trim="mobile" v-input class="form_box--field form_box--input" placeholder="请输入手机号" type="mobile" autocomplete="off"
                    name="mobile" required>
            </section>
            <section class="form_box--item code">
                <label class="form_box--head">手机验证码</label>
                <input v-model.trim="mobileCode" v-input class="form_box--field form_box--input" placeholder="请输入验证码" type="text" autocomplete="off"
                    name="mobileCode">
                <input class="form-box--item_btn" @click.prevent="sendCode()" type="button" :value="codeTxt" :disabled="!codeBtnEnable">
            </section>
            <section class="form_box--item">
                <label class="form_box--head">密码</label>
                <input v-model.trim.number="pwd" v-input class="form_box--field form_box--input" placeholder="请输入密码" type="text" autocomplete="off"
                    required name="pwd">
            </section>
            <section class="form_box-btn">
                <input class="btn-primary" v-on:click="register()" type="button" value="注册">
            </section>
        </div>
    </div>
</template>
<script>
    
    import {validate, tool} from 'app-utils';
    import eventHub from 'src/eventHub';

    export default{
        created: function(){
            tool.setPageTitle('注册');
        },
        data:function(){
            return {
                mobile:'',
                mobileCode:'',
                pwd:'',
                codeTxt:'获取',
                codeBtnEnable:true
            }
        },
        methods:{ 
            checkMobile:function(){
				var result  =true;
                
				if(!this.mobile){
					eventHub.$emit('showError',{msg:'手机号不能为空'});
                    result=false;
                }else if (!/^(1)[0-9]{10}$/.test(this.mobile)){
					eventHub.$emit('showError',{msg:'手机号格式不正确'});
                    result=false;
                }
                return result;
            },
            sendCode:function(){
                if(!this.checkMobile()){
                    return;
                }
                this.codeBtnEnable = false;
                $.post('/app-server/sendRegCode',{mobile:this.phone},
                    function(res){
                        if(res.code==200){
                            var count = 60;
                            var timer=null;
                            this.codeTxt=60+'s';
                            var self =this;
                            timer = setInterval(function(){
                                --count;
                                if(count<=0){
                                    clearInterval(timer);
                                    self.codeBtnEnable = true;
                                }
                                self.codeTxt=count+'s';
                            },1000)
                        }else{
                            this.codeBtnEnable = true;
                        }
                    }
                )
            },
			checkValid:function(){
				var result =true;
				var el = null;
                if(!this.checkMobile()){
					el = document.querySelector('input[name="mobile"]');
                    result=false;
                }else if(!this.mobileCode){
					eventHub.$emit('showError',{msg:'验证码不能为空'});
					el = document.querySelector('input[name="mobileCode"]');
					result=false;					
				} else if(!this.pwd){
					eventHub.$emit('showError',{msg:'密码不能为空'});
					el = this.$el.querySelector('input[name="pwd"]');
					result=false;
                }

				if(el){
					el.scrollIntoView();
					el.classList.add('error');
				}
                return result; 
			},
            register: function() {	
				if(!this.checkValid()){
					return;
				}
                $.post('app-server/register',{mobile:this.mobile,code:this.mobileCode,pwd:this.pwd},
                    function(res){
                        if(res.code==200){
                            eventHub.$emit('showError',{msg:'注册成功'});
                        }
                    }
                );

            }
        }
    }
</script>
<style>
    input.form-box--item_btn {
        position: absolute;
        right: 36px;
        width: 70px;
        height: 24px;
        margin-top: -28px;
        color: #fff;
        border: none;
        background: #2b51b2;
    }
    
    input.form-box--item_btn:disabled {
        background-color: #9c9c9c;
    }
</style>