/**
* Created by gyr on 16/10/25.
* type: 非公共组件
* Des: 我的-投资记录
*
*/
<template>
<pb-object-top msg="投资记录" back="true" back-route="my"></pb-object-top>
<pb-padding-top></pb-padding-top>
<div class="invest-record">
  <div class="record-tab clearfix">
    <span class="tab-gray tab-tender" @click="tabToggle(tabTender)" v-bind:class="{'tab-on':isCheck[0]}">投标中</span>
    <span class="tab-gray tab-repay" @click="tabToggle(tabRepay)" v-bind:class="{'tab-on':isCheck[1]}">还款中</span>
    <span class="tab-gray tab-end" @click="tabToggle(tabEnd)" v-bind:class="{'tab-on':isCheck[2]}">已结清</span>
  </div>
</div>
<component :is='currentView' keep-alive></component>
</template>

<script>
import public_ObjectTop from '../common/public_ObjectTop.vue';
import public_pTop from '../common/public_ptop.vue';
import my_recordTender from './my_recordTender.vue';
import my_recordRepay from './my_recordRepay.vue';
import my_recordEnd from './my_recordEnd.vue';
export default {
  data() {
    const currentTab = this.$route.query.tab || 'my-record-tender';
    return {
      tabTender: 'my-record-tender',
      tabRepay: 'my-record-repay',
      tabEnd: 'my-record-end',
      currentView: currentTab,
    }
  },
  components: {
    "pb-object-top": public_ObjectTop,
    "pb-padding-top": public_pTop,
    "my-record-tender": my_recordTender,
    "my-record-repay": my_recordRepay,
    "my-record-end": my_recordEnd,
  },
  methods: {
    tabToggle: function(tabView) {
      if (window.history.replaceState) {
        // url中记录当前的tab参数
        window.history.replaceState({}, 0, `${window.location.origin}/my/invest-record?tab=${tabView}`);
      }
      this.currentView = tabView;
    }
  },
  computed: {
    isCheck() {
      switch (this.currentView) {
        case this.tabRepay:
          return [false, true, false];
          break;
        case this.tabEnd:
          return [false, false, true];
          break;
        default:
          return [true, false, false];
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";

    .invest-record {
        //padding-top: .88rem+$status-bar-height;
        //padding-top: $public-nav-height+$status-bar-height;
        padding-top: $status-bar-height;
        .record-tab{
            padding: 0 .98rem;
            height: .76rem;
            line-height: .76rem;
            font-size: .28rem;
            text-align: center;
            background:#fff;
            .tab-tender{
                width: .9rem;
                height: .73rem;
                float: left;
            }
            .tab-repay{
                display: inline-block;
                width: .9rem;
                height: .73rem;
            }
            .tab-end{
                width: .9rem;
                height: .73rem;
                float: right;
            }
            .tab-gray{
                color: #666;
            }
            .tab-on{
                color: #f75c5c;
                border-bottom: .03rem solid #f75c5c;
            }
        }
    }
</style>
