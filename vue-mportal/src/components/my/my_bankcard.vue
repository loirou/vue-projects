/**
* Created by gyr on 16/11/29.
*
* Des: 我的-我的银行卡
*
*/

<template>
<div>
  <public-object-top msg="我的银行卡" back="true" back-route="home" icon="true">
    <span slot="right" class="bank-manage">
      <span v-if="!editable" @click="toggleEditable(true)">管理</span>
      <span v-else @click="toggleEditable(false)">取消</span>
    </span>
  </public-object-top>
  <pb-padding-top></pb-padding-top>
  <pb-wx-des des="支持银行卡说明" go-msg="declare" always="true">
    <span slot="right" class="bank-manage" v-if="isWechat">
      <span v-if="!editable" @click.stop.prevent="toggleEditable(true)">管理</span>
      <span v-else @click.stop.prevent="toggleEditable(false)">取消</span>
    </span>
  </pb-wx-des>
  <div class="bank-msg">
    <public-bank-msg v-for="item in banks" :bank="item" :selectable="editable" @click="toggleCheck(item)"></public-bank-msg>
    <div class="add-bank" @click="menu_go_card('my-add-bank')">
      <span class="add-des">添加银行卡</span>
    </div>
  </div>
  <button v-if="editable&&selectedCount>0" class="batch-delete" type="button" name="button" @click="batchDelete()">删除</button>
  <button v-if="editable&&selectedCount==0" disabled class="batch-delete" type="button" name="button">删除</button>
</div>
</template>

<script>
import public_ObjectTop from '../common/public_ObjectTop.vue';
import public_pTop from '../common/public_ptop.vue';
import public_wxDeclare from '../common/public_wxdeclare.vue';
import public_bank_msg from '../common/public_bankMsg.vue';
import http_url from '../../common/js/http-url.js';
import MessageBox from 'mint-ui/lib/message-box';

export default {
  data() {
    return {
      banks: null,
      editable: false,
      selectedCount: 0,
      isWechat: JSON.parse(this.Storage.get('wxBrowser')),
    }
  },
  components: {
    "public-object-top": public_ObjectTop,
    "pb-padding-top": public_pTop,
    "pb-wx-des": public_wxDeclare,
    "public-bank-msg": public_bank_msg
  },
  created() {
    this.loadData();
  },
  methods: {
    menu_go_card: function(msg) {
      router.go({
        name: msg
      });
    },
    loadData: function() {
      this.$http({
        method: "GET",
        url: http_url.my_bank
      }).then((res) => {
        if (res.data.code == 200) {
          this.banks = res.body.data;
        }
        // 重置已选中条数(恢复删除按钮状态)
        this.countSelected();
      }, (err) => {
        console.error(err);
      });
    },
    toggleEditable: function(editable) {
      this.editable = editable;
    },
    // 重新计算选中数量
    countSelected: function() {
      let count = 0;
      this.banks.forEach(function(item) {
        if (item.checked === true) {
          count++;
        }
      });
      this.selectedCount = count;
    },
    toggleCheck: function(item) {
      // 如果不是编辑状态
      if (!this.editable) {
        return;
      }
      if (typeof item.checked == 'undefined') {
        item.checked = false;
      }
      item.checked = !item.checked;
      this.countSelected(); // 重新计算选中数量
      // 通知子组件切换是否选中
      this.$broadcast('on-toggle-checked', item);
    },
    // 批量删除银行卡
    batchDelete: function() {
      let selectedBankIds = [];
      this.banks.forEach(function(item) {
        if (item.checked === true) {
          selectedBankIds.push(item.investorBankId);
        }
      });
      MessageBox.confirm('确定删除选中的银行卡?').then(action => {
        this.$http({
          method: 'DELETE',
          url: `${http_url.my_delete_bank}/${selectedBankIds.join(',')}`
        }).then(res => {
          if (res.data.code == 200) {
            // 恢复不可编辑状态
            this.editable = false;
            // 重新加载数据
            this.loadData();
          }
        })
      }).catch(err => {});
    },
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";

.bank-manage {
    font-size: 0.26rem;
}
.bank-msg {
    //padding-top:.88rem+$status-bar-height;
    //padding-top:$public-nav-height+$status-bar-height;
    padding-top: $status-bar-height;
    .add-bank {
        margin: 0.3rem 0.2rem 0;
        border: $public-border dashed #ccc;
        border-radius: 5px;
        width: 5.98rem;
        height: 1.38rem;
        line-height: 1.38rem;
        text-align: center;
        .add-des {
            padding-left: 0.5rem;
            background: url("../../static/images/addBank.png") no-repeat;
            background-size: 0.36rem 0.36rem;
            background-position-y: 0.02rem;
            font-size: 0.3rem;
            color: #666;
        }
    }
}
.batch-delete {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 0.88rem;
    background-color: #f75c5c;
    color: #fff;
    border: none;
    outline: none;
    font-size: 0.3rem;
}
.batch-delete[disabled] {
    background: #dcdcdc;
}
</style>
