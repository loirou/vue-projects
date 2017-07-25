/**
* Created by gyr on 17/3/2.
*
* Des: 微信 意见反馈
*
*/
<template>
<div>
  <pb-object-top msg="意见反馈" back="true"></pb-object-top>
  <pb-padding-top></pb-padding-top>
  <div class="feedback-content">
    <div class="feedback-type clearfix" @click="changeType">
      <!-- 此处需要绑定选择的问题类型-->
      <div class="type-title" v-text="getType"></div>
      <div class="type-right"></div>
    </div>
    <div class="feedback-area clearfix">
      <textarea v-model="message" placeholder="欢迎您向我们反馈使用过程中的任何意见和建议!" @blur="onBlur"></textarea>
      <div class="text-length">
        <!--动态计算输入文字的长度 根据v-model的值-->
        <span v-text="message.length"></span>
        <span>/150</span>
      </div>
    </div>
    <div class="feedback-btn">
      <pb-button cls="btn-lg" @click="submit">提交</pb-button>
    </div>
  </div>
  <pb-popup-bottom title="问题类型" :show.sync="typePopup">
    <div class="type-list-container">
      <div class="type-section" v-for="type in typeCons" track-by="$index">
        <div class="clearfix" @click="selected(type)">
          <div class="type-content">{{type.categoryId}}</div>
          <div v-if="type.checked" class="checked"></div>
        </div>

      </div>
    </div>
  </pb-popup-bottom>
</div>
</template>

<script>
import public_ObjectTop from '../common/public_ObjectTop';
import public_button from '../common/public_button';
import public_pTop from '../common/public_ptop.vue';
import public_popup_bottom from '../common/public_popup_bottom';
import MsgBox from '../../plugins/messagebox/index.js'; //消息提示框
import Toast from 'mint-ui/lib/toast';
import http_url from '../../common/js/http-url.js';
export default {
  data() {
    return {
      message: '',
      typePopup: false,
      typeCons: [{
          categoryId: '绑定账号问题',
          id: '1',
          checked: true
        },
        {
          categoryId: '购买问题',
          id: '2'
        },
        {
          categoryId: '充值问题',
          id: '3'
        },
        {
          categoryId: '提现问题',
          id: '4'
        },
        {
          categoryId: '其他',
          id: '5'
        }
      ],
      selectedType: {}
    }
  },
  components: {
    "pb-object-top": public_ObjectTop,
    "pb-button": public_button,
    "pb-padding-top": public_pTop,
    "pb-popup-bottom": public_popup_bottom
  },
  computed: {
    getType: function() {
      var typeTitle;
      if (!this.selectedType.categoryId) {
        typeTitle = '请选择问题类型';
      } else {
        typeTitle = this.selectedType.categoryId;
      }
      return typeTitle
    }
  },
  methods: {
    submit: function() { //提交前判断文字长度需要把问题类型 问题描述发给后端
      var feedback = {};
      if (!this.selectedType.categoryId) {
        MsgBox.alert('请选择问题类型');
      } else if (this.message.length == 0) {
        MsgBox.alert('请描述您的问题');
      } else {
        feedback.categoryId = this.selectedType.id;
        feedback.content = this.message;
        this.$http({
          method: "POST",
          url: http_url.wx_feedback,
          body: feedback
        }).then((res) => {
          if (res.data.code == 200) {
            Toast({
                message: '提交反馈成功',
                duration: 2000
            });
            this.message = '';
            this.selectedType.categoryId = '';
          }
        })
      }
    },
    changeType: function() {
      this.typePopup = true; //改变反馈问题类型
    },
    selected: function(type) { //选择问题类型
      this.typeCons.forEach(function(item, index) {
        if (item.id == type.id || item.checked) {
          //复制对象
          var newType = JSON.parse(JSON.stringify(item));
          newType.checked = item.id == type.id;
          this.typeCons.$set(index, newType);
        }
      }.bind(this));
      this.selectedType = type;
      this.typePopup = false;
    },
    onBlur: function() {
      if (this.message.length > 150) {
        MsgBox.alert('您输入的问题超过字符数限制，请重新输入');
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";

.feedback-content {
    //padding-top: $public-nav-height;
    .feedback-type {
        margin-top: 0.3rem;
        background-color: #ffffff;
        padding: 0.2rem 0.3rem;
        .type-title {
            float: left;
            font-size: 0.28rem;
            color: #000;
        }
        .type-right {
            float: right;
            background: url("../../static/images/right-next.png") no-repeat;
            background-size: 0.16rem 0.28rem;
            width: 0.16rem;
            height: 0.28rem;
            margin-top: 0.05rem;
        }
    }
    .feedback-area {
        margin-top: 0.3rem;
        background-color: #ffffff;
        padding: 0.16rem 0.3rem;
        color: #c8c7cc;
        textarea {
            width: 100%;
            font-size: 0.24rem;
            height: 2.7rem;
            outline: none;
            resize: none;
            border: none;
        }
        .text-length {
            float: right;
            font-size: 0.24rem;
            color: #000;
        }
    }
    .feedback-btn {
        margin-top: 0.8rem;
        width: 100%;
        max-width: $custom-max-width;
        text-align: center;
    }
}
.type-list-container {
    min-height: 1.13rem;
    max-height: 4.52rem;
    overflow: scroll;
    .type-section {
        background-color: #ffffff;
        margin-left: 0.3rem;
        padding: 0.2rem 0.3rem 0.2rem 0;
        border-bottom: 1px solid #efefef;
        &:last-child {
            border-bottom: none;
        }
        .type-content {
            float: left;
            font-size: 0.28rem;
            color: #000;
        }
        .checked {
            float: right;
            background: url("../../static/images/check.png") no-repeat;
            background-size: 0.42rem 0.30rem;
            width: 0.42rem;
            height: 0.30rem;
        }
    }
}
</style>
