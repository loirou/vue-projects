/**
 * Created by Darren on 16/10/27.
 *
 * Des: 公共展示组件
 *
 */
 
<template>
    <div class="info">
        <div class="info-title">
            <div class="show clearfix">
				<span :class="info.color"></span>
                <span class="des" v-text="info.title"></span>
                <span :class="info_show" @click = "show"></span>
            </div>
        </div>
        <div class="info-content clearfix" v-show="icon" transition="fade">
 			<span v-for="url in info.urls" track-by="$index">
 				<img :src="url">
 			</span>
        </div>
	</div>
</template>

<script>
export default {
	props: ["info"],
 	data () {
	 	return {
	 		msg: 'Hello from vue-loader!App!',
	 		icon:false,
	 		info_show:"status-down"
	 	}
 	},
 	methods : {
        show: function(){
        	if(this.icon === false){
        		this.icon = true;
        		this.info_show = "status-up";
        	}else if(this.icon === true){
        		this.icon = false;
        		this.info_show = "status-down";
        	}
        }
    }
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";
.fade-transition{
    transition: all .3s ease;
	-moz-transition: all .3s ease; /* Firefox 4 */
	-webkit-transition: all .3s ease; /* Safari 和 Chrome */
	-o-transition: all .3s ease; /* Opera */
	background-color: #eee;
    height: 100%;
}
.fade-enter, .fade-leave{
	transition: all .3s ease;
	-moz-transition: all .3s ease; /* Firefox 4 */
	-webkit-transition: all .3s ease; /* Safari 和 Chrome */
	-o-transition: all .3s ease; /* Opera */
    height:0;
    opacity: 0;
}

.info{
	.info-title{
		height: .76rem;
		line-height: .76rem;
		padding-right:.3rem;
		.show{
			border-bottom: $public-border solid #efefef;
		}
		.des{
			float: left;
			line-height: .76rem;
			color: #666666;
			font-size: .26rem;
			margin-left: .2rem;
		}
		.status-up{
			float: right;
			width: .3rem;
			height: .3rem;
			background: url("../../static/images/Buy/show_up.png") no-repeat;
			background-size: .3rem .3rem;
			margin-top: .23rem;
		}
		.status-down{
			float: right;
			width: .3rem;
			height: .3rem;
			background: url("../../static/images/Buy/show_down.png") no-repeat;
			background-size: .3rem .3rem;
			margin-top: .23rem;
		}
	}
	.info-content{
		padding: .22rem .3rem .3rem .3rem;
		background: #efefef;
		span{
			float: left;
			margin-left: .08rem;
			margin-top: .08rem;
			width: 1.39rem;
			height: 1.39rem;
			&:nth-of-type(4n+1){
				margin-left: 0;
			}
			img{
				width: 1.39rem;
				height: 1.39rem;
			}
		}
	}
	&:last-child{
		.info-title{
			.show{
				 border-bottom: 0;
			}
		}
	}

}

.info-examine .content .info .info-title .info-1{
	float: left;
	width: .12rem;
	height: .12rem;
	background: #FFE0B2;
	border-radius: $public-border;
	margin-top: .32rem;
}
.info-examine .content .info .info-title .info-2{
	float: left;
	width: .12rem;
	height: .12rem;
	background: #FFB74D;
	border-radius: $public-border;
	margin-top: .32rem;
}

.info-examine .content .info .info-title .info-3{
	float: left;
	width: .12rem;
	height: .12rem;
	background: #3CBDD1;
	border-radius: $public-border;
	margin-top: .32rem;
}
.info-examine .content .info .info-title .info-4{
	float: left;
	width: .12rem;
	height: .12rem;
	background: #75AEF5;
	border-radius: $public-border;
	margin-top: .32rem;
}


</style>
























