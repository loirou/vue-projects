/**
 * Created by Darren on 16/10/13.
 *
 * Des: 首页说明菜单
 *
 */
 
<template>
	<!-- 介绍 -->
    <div class="home-Des clearfix">
        <div class="home-Des-Info" @click="goto('info-about')">
            <div><span class="icon-1"></span></div>
            <div>品牌介绍</div>
        </div>
        <div class="home-Des-Info" @click="goto('info-security')">
            <div><span class="icon-2"></span></div>
            <div>安全保障</div>
        </div>
        <div class="home-Des-Info" @click="goto('info-qa')">
            <div><span class="icon-3"></span></div>
            <div>常见问题</div>
        </div>
        <div class="home-Des-Info" @click="goto('info-note')">
            <div><span class="icon-4"></span></div>
            <div>特别说明</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
            return {
                msg: '首页路由'
            };
        },
        methods: {
            goto: function(routeName) {
                router.go({
                    name: routeName
                });
            }
        }
}
</script>


<style lang="sass" scoped>
/*描述*/
.home-Des{
	padding: .24rem 0 .3rem 0;
	background-color: #ffffff;
	.home-Des-Info{
		float: left;
		width: 25%;
		text-align: center;
		div{
			font-size: .22rem;
		}
	}
	.icon-1{
		display: block;
		width: 100%;
	    height: 1.1rem;
		background: url('../../static/images/h-1.png') no-repeat 0.368rem 0.1rem;
		background-size: .86rem .86rem;
	}
	.icon-2{
		@extend .icon-1;
		background: url('../../static/images/h-2.png') no-repeat 0.368rem 0.1rem;
		background-size: .86rem .86rem;
	}
	.icon-3{
		@extend .icon-1;
		background: url('../../static/images/h-3.png') no-repeat 0.368rem 0.1rem;
		background-size: .86rem .86rem;
	}
	.icon-4{
		@extend .icon-1;
		background: url('../../static/images/h-4.png') no-repeat 0.368rem 0.1rem;
		background-size: .86rem .86rem;
	}
}
</style>