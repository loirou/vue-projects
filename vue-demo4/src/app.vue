<template>
    <div id="app">
        <router-view></router-view>
        <warn></warn>
        <error-tip></error-tip>
        <load></load>
    </div>
</template>

<script type="text/ecmascript-6">
    import warn from './component/warn'
    import errorTip from './component/errorTips'
    import load from './component/load'
    import eventHub from 'src/eventHub'

    export default {
        created: function() {
            var self = this;
        },
        data() {
            return {
            }
        },
        components: {
            warn,
            errorTip,
            load
        }
    };
</script>

<style>

</style>