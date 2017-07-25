/**
 * Created by youhy on 12/12/16.
 *
 * Des: question and answer page
 *
 */

<template>
    <div class="note-item">
    	<div class="title">
    		<span class="icon"></span>
    		<span>{{note.title}}</span>
    	</div>
    	<div class="content">
			<div class="con" v-html="note.content"></div>
			<div class="date">{{note.date}}</div>
		</div>
    </div>
</template>


<script>
export default {
    props: ['note'],
    data() {
        return {};
    }
}
</script>
<style lang="sass" scoped>
	@import "../../common/css/common";

	.note-item {
		.title {
			font-size: .28rem;
			color: #5f72bb;
			$icon-size: .15rem;
			.icon {
				display: inline-block;
				float: left;
				margin: .12rem .1rem 0 0;
				width: $icon-size;
				height: $icon-size;
				border-radius: .03rem;
				background-color: #f17d5c;
			}
		}
		.content {
			padding: .3rem;
			margin-top: .22rem;
			border-radius: .05rem;
			background-color: #f8f8f8;
			line-height: .38rem;
			.con{
				font-size: .24rem;
				color: #666;
			}
			.date{
				padding-left: .28rem;
				background:url("../../static/images/time1.png") no-repeat 0 .07rem;
				background-size: .22rem .22rem;
				margin-top: .1rem;
				font-size: .2rem;
				color: #999;
			}
		}
	}
</style>
