/**
 * created by youhaiyang on 10/03/2017
 *
 * no more data
 */

<template>
    <div class="loadmore-bottom" v-text="msg||'-- 数据加载完毕 --'"></div>
</template>
<script>
	export default {
		props: ['msg'],
		data() {
			return {};
		}
	}
</script>
<style lang="sass" scoped>
.loadmore-bottom {
    font-size:.22rem;
    color:#666;
    text-align: center;
    padding: .16rem 0;
}
</style>
