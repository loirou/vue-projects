/**
* Created by wd on 1/3/17.
*
* Des:微信-下载钱盒链接
*
*/
<template>
	<div class="download_qh" :class="{hide:close}">
		<div class="container">
			<pb-menu-next class="download-href clearfix">
				<span class="icon-close" slot="image" @click="remove" ></span>
				<div class="icon-qh" slot="image"></div>
				<div class="download-href-center">
					<div class="title">
						下载钱盒APP
					</div>
					<div class="sub-title">
						进入"汇赚钱"频道，参与理财
					</div>
				</div>
				<div class="download-href-right">
					<a class="btn-download" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.iboxpay.minicashbox">立即下载</a>
				</div>
			</pb-menu-next>
		</div>
	</div>
</template>

<script>
	import public_Menunext from '../common/public_Menunext';
	export default {
		data() {
			return {
				close: false
			}
		},
		components: {
			"pb-menu-next": public_Menunext
		},
		methods: {
			remove: function() {
				this.close = true;
			}
		}
	}
</script>


<style lang="sass" scoped>
	@import "../../common/css/common";
	.hide {
		display: none ;
	}
	.download_qh {
		position: fixed;
		bottom: 0;
		width: $custom-max-width;
		height: .95rem;
		background-color: rgba(36,36,36,.84);
		.container {
			margin-top: .135rem;
		}
		.download-href {
			 padding: 0 .2rem 0 .3rem;
			 .icon-close {
			 	position: absolute;
			 	top: 0;
			 	left: 0;
			 	display: inline-block;
			 	background: url('../../static/images/icon-close.png') no-repeat;
			 	background-size: .31rem .31rem;
			 	width: .31rem;
			 	height: .31rem;
			 }
			 .icon-qh {
			 	display: inline-block;
			 	float: left;
			 	background: url('../../static/images/download_qh.png') no-repeat;
			 	background-size: .68rem .68rem;
			 	width: .68rem;
			 	height: .68rem;
			 }
			 .download-href-center {
			 	float: left;
			 	margin-left: .12rem;
			 	.title {
			 		font-size: .26rem;
			 		color: #fff;
			 	}
			 	.sub-title {
			 		margin-top: .08rem;
			 		height: .2rem;
			 		line-height: .2rem;
			 		font-size: .2rem;
			 		color: #ccc;
			 	}
			 }
			 .download-href-right {
			 	margin-top: .12rem;
			 	float: right;
				.btn-download {
					display: inline-block;
					font-size: .24rem;
					background-color: #ffca2b;
					color: #906235;
					width: 1.4rem;
					height: .48rem;
					line-height: .48rem;
					text-align: center;
				}
			 }
		}
	}
</style>
