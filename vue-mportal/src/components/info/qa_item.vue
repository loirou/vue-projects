/**
 * Created by youhy on 12/12/16.
 *
 * Des: question and answer page
 *
 */

<template>
    <div class="qa-item">
    	<div class="title" @click="toggle()" :class="activeCls">
            <span class="property-des" v-cloak>{{qa.title}}</span>
            <span sloat="right" class="property-right"></span>
    	</div>
    	<div class="content" v-show="qa.expanded">
    		{{qa.content}}
    	</div>
    </div>
</template>


<script>
export default {
    props: {
    	qa: {
			type: Object,
		    twoWay: true 
		}
	},
    data() {
        return {};
    },
    created() {
    	this.qa.expanded = this.qa.expanded || false;
    },
    methods: {
    	toggle: function() {
    		this.qa.expanded = !this.qa.expanded;
    	}
    },
    computed: {
    	iconCls: function() {
    		return this.qa.expanded === true ? 'icon-expanded' : 'icon-collapsed';
    	},
    	activeCls: function() {
    		return this.qa.expanded === true ? 'active' : '';
    	}
    }
}
</script>
<style lang="sass" scoped>
	@import "../../common/css/common";
	
	.qa-item {
		$title-height: 1rem;
		$arrow-width: .3rem;
		$arrow-height: .2rem;
		.title {
			height: $title-height;
			line-height: $title-height;
			font-size: .28rem;
			color: #000;
			padding-right: .3rem;

			.property-right {
				display: inline-block;
				float: right;
				margin-top: .4rem;
				
				background: url('../../static/images/arrow-collapsed.png') no-repeat;
				background-size: $arrow-width $arrow-height;
				width: $arrow-width;
				height: $arrow-height;
			}
		}
		.active {
			color: #f75c5c;
		}
		.active .property-right {
			background: url('../../static/images/arrow-expanded.png') no-repeat;
			background-size: $arrow-width $arrow-height;
			width: $arrow-width;
			height: $arrow-height;
		}
		.content {
			padding: 0 .6rem .3rem .3rem;
			font-size: .26rem;
			color: #999;
		}
	}
</style>
