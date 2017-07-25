/**
 * create by youhaiyang on 10/27/2016
 * 
 * popup
 */

<template>
	<div class="modal-mask" v-show="visible" transition="modal" @click.stop.prevent="close">
		<div class="popup modal-container" :style="{top: top}" @click.stop.prevent="">
			<div class="close" @click.stop.prevent="close"></div>
			<div class="content"><span class="content-text">{{text}}</span></div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				visible: false,
				text: '',
				top: '4rem'
			};
		},
		created: function() {
			var docEl = document.documentElement;
		    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

		    var resetPop = function () {
				//屏幕可是区高度 px
				var screenHeight = document.body.clientHeight;
				//屏幕宽度 px
				var screenWidth = document.body.clientWidth;
				//屏幕可视区高度 rem
				var hRem = 6.4 * screenHeight / screenWidth;
				this.top = (hRem - 2) / 2 + 'rem';
		    }.bind(this);

		    if (!document.addEventListener) { 
		    	resetPop(); 
		    	return; 
		    }
		    window.addEventListener(resizeEvt, resetPop, false);
		    document.addEventListener('DOMContentLoaded', resetPop, false);
		},
		methods: {
			close() {
				//关闭弹窗
				this.visible = false;
			}
		}
	}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";
$popup-width: 5.2rem;
.popup {
	position: absolute;
	width: $popup-width;
	height: 2rem;
	left: .6rem;
	background: #ffffff;
	border-radius: .1rem;
	line-height: 1.4rem;
	text-align: center;
	vertial-align: middle;
	border-bottom: $public-border solid #efefef;
	.content {
		position: absolute;
		padding: .3rem;
		width: $popup-width - 0.6rem;
		font-size: .26rem;
		color: #000;
		.content-text {
			line-height: .4rem;
			display: inline-block;
			vertical-align: middle;
		}
	};
	.close {
		z-index: 999;
		position: relative;
		float: right;
		width: .46rem;
		height: .68rem;
		margin-right: .2rem;
		background: url("../../static/images/cancel.png") no-repeat;
		background-size: .46rem .68rem;
	}
}

.modal-mask {
 	position: fixed;
  	z-index: 9998;
  	top: 0;
  	left: 0;
  	width: 100%;
  	height: 100%;
  	background-color: rgba(0, 0, 0, .5);
  	display: table;
  	transition: opacity .3s ease;
}

.modal-container {
   	transition: all .3s ease;
}

.modal-enter, .modal-leave {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
	-webkit-transform: scale(1.2);// translate(0, 1.5rem);
 	transform: scale(1.2);// translate(0, 1.5rem);
}
</style>