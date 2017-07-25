/**
* Created by youhy on 16/12/16.
*
* Des:我的-资金密码
*
*/
<template>
    <pb-object-top :msg="title" back="true" back-route="my"></pb-object-top>
    <pb-padding-top></pb-padding-top>
    <div class="pwd-form">
        <component :is="pwdComponent"></component>
    </div>
</template>

<script>
import public_ObjectTop from '../common/public_ObjectTop';
import public_pTop from '../common/public_ptop.vue';
import pwd_set from './my_fund_pwd_set';
import pwd_change from './my_fund_pwd_change';
export default {
    props: [],
    data() {
        return {
            title: '资金密码',
            pwdComponent: '',
            mobile: ''
        }
    },
    route: {
    	canReuse() {
    		//强制组件不服用
    		//否则此组件复用时不能刷新
    		return false;
    	}
    },
    created() {
        var title = '资金密码';
        var pwdComponent = '';
        //1.设置资金密码；2.修改资金密码；3.重置资金密码
        var routeName = this.$route.name;
        switch (routeName) {
            case "my-fund-pwd-set":
            	title = '设置资金密码';
            	pwdComponent = 'pwd-set';
                break;
            case "my-fund-pwd-change":
            	title = '修改资金密码';
            	pwdComponent = 'pwd-change';
                break;
            case "my-fund-pwd-reset":
            	title = '重置资金密码';
            	pwdComponent = 'pwd-set';
                break;
        }
        this.title = title;
        this.pwdComponent = pwdComponent;
    },
    components: {
        "pb-object-top": public_ObjectTop,
        "pb-padding-top":public_pTop,
        "pwd-set": pwd_set,
        "pwd-change": pwd_change
    }
}
</script>

<style lang="sass" scoped>


</style>

