/**
 * create by youhaiyang on 10/17/2016
 *
 * popup from bottom
 */

<template>
	<div class="modal-mask" v-show="show" transition="modal" @click="close">
		<div class="popup modal-container" @click.stop.prevent="">
			<div class="header">
				<div class="title">{{title}}</div>
				<div class="close" @click.stop.prevent="close"></div>
			</div>
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			title: {},
			show: {
				type: Boolean,
			    required: true,
			    twoWay: true
			}
		},
		data() {
			return {
				modalClass: ''
			};
		},
		methods: {
			close() {
				//通知关闭弹窗
				this.show = false;
			}
		}
	}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";

.popup {
	position: fixed;
	bottom: 0;
	width: 100%;
	max-width: $custom-max-width;
	background: #ffffff;
	.header {
		height: .88rem;
		line-height: .88rem;
		text-align: center;
		vertial-align: middle;
		border-bottom: $public-border solid #efefef;
		.title {
			position: absolute;
			width: 100%;
			font-size: .32rem;
			color: #000000;
		};
		.close {
			position: relative;
			float: right;
			width: .46rem;
			height: .68rem;
			margin-right: .3rem;
			background: url("../../static/images/cancel.png") no-repeat;
			background-size: .46rem .68rem;
		}
	};
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
	-webkit-transform: translate(0, 1.5rem);
 	transform: translate(0, 1.5rem);
}
</style>
