/**
 * Created by Darren on 17/03/17.
 *
 * Des: 活动模块
 *
 */

<template>
	<div class="activity">
		<pb-object-top mode="white" class="home-header" back="true"></pb-object-top>
		<div class="images">
			<img v-for="img in images" :src="img" />
		</div>
	</div>
</template>

<script>
import public_ObjectTop from '../common/public_ObjectTop.vue';
export default {
  data: function() {
    return {
      images: [
        require(`../../static/images/activity/revision/a.png`),
        require(`../../static/images/activity/revision/b.png`),
        require(`../../static/images/activity/revision/c.png`),
        require(`../../static/images/activity/revision/d.png`),
        require(`../../static/images/activity/revision/e.png`),
        require(`../../static/images/activity/revision/f.png`),
        require(`../../static/images/activity/revision/g.png`),
        require(`../../static/images/activity/revision/h.png`),
      ]
    };
  },
 	components: {
		"pb-object-top":public_ObjectTop
 	}
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";
.activity{
	.images{
		font-size:0;
		img{
			width: 100%;
		}
	}
}
.home-header {
	position: absolute !important;
	background: transparent !important;
	color: #fff !important;
	border-bottom: none !important;
}
</style>
