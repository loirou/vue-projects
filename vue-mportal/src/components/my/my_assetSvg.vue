/**
* Created by gyr on 16/10/10.
*
* Des: my-资产一览-svg页面
*
*/

<template>
<div>
  <svg viewBox="0 0 640 440">
    <circle class="circle" cx="320" cy="220" r="150" stroke-width="25" stroke="#ffffff" fill="none"></circle>
    <circle class="circle"  cx="320" cy="220" r="150" stroke-width="25" stroke="#fe5556" fill="none"  stroke-dasharray="0 1069"></circle>
    <circle class="circle"  cx="320" cy="220" r="150" stroke-width="25" stroke="#ffb74d" fill="none" stroke-dasharray="0 1069"></circle>
    <circle class="circle"  cx="320" cy="220" r="150" stroke-width="25" stroke="#ffe0b2" fill="none"  stroke-dasharray="0 1069"></circle>
  </svg>
  <div class="assetsTotal">
    <span class="totalTit" v-bind:style="{top:valueTit}">总资产(元)</span>
    <span class="totalNum" v-bind:style="{top:valueNum}">{{{total | handleNum }}}</span>
  </div>

</div>
</template>

<script>
export default {
  props: ['total', 'items'],
  data() {
    return {
      totalMinus: '',
      wxFlag: false,
      valueTit: '2.68rem',
      valueNum: '2.9rem'
    }
  },
  ready: function() {
    if (this.items.length == 0) {
      return;
    }
    this.totalMinus = parseFloat(this.items[3]['amount']) + parseFloat(this.items[4]['amount']);
    this.total = parseFloat(this.total) - this.totalMinus;
    this.loadSvg();
    //微信需要改定位top值
    this.wxFlag = JSON.parse(this.Storage.get('wxBrowser'));
    if (this.wxFlag) {
      this.valueTit = '1.8rem';
      this.valueNum = '2.02rem';
      return
    }
  },
  filters: {
    handleNum(val) {
      if (!val) return '0.00';
      val = this.total.toFixed(2);
      var row = val.split(".");
      var style = '';
      if (this.total) {
        style = "style='font-size: .3rem;'";
        return "<span style='font-size: .4rem;'>" + row[0] + "</span><label " + style + ">." + row[1] + "</label>";
      }
    }

  },
  methods: {
    loadSvg() {
      var circle1 = document.querySelectorAll("circle")[1],
        circle2 = document.querySelectorAll("circle")[2],
        circle3 = document.querySelectorAll("circle")[3];
      var percentOne = 100 / 100,
        percentTwo = (parseInt(this.items[1]['amount']) + parseInt(this.items[2]['amount'])) / this.total,
        percentThree = parseInt(this.items[2]['amount']) / this.total,
        perimeter = Math.PI * 2 * 150;
      setTimeout(
        svg, 200
      );
      function svg() {
        circle1.setAttribute('stroke-dasharray', perimeter * percentOne + "," + perimeter * (1 - percentOne));
        circle2.setAttribute('stroke-dasharray', perimeter * percentTwo + "," + perimeter * (1 - percentTwo));
        circle3.setAttribute('stroke-dasharray', perimeter * percentThree + "," + perimeter * (1 - percentThree));
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/css/common";

.circle{
  transition: stroke-dasharray 1s;
  -moz-transition: stroke-dasharray 1s; /* Firefox 4 */
  -webkit-transition: stroke-dasharray 1s; /* Safari 和 Chrome */
  -o-transition: stroke-dasharray 1s; /* Opera */
}
.assetsTotal {
  text-align: center;
  .totalTit {
    position: absolute;
    left: 2.2rem;
    font-size: .26rem;
    height: .26rem;
    width: 2rem;
    line-height: .26rem;
    color: #999;
  }
  .totalNum {
    position: absolute;
    //top: 2.9rem;
    //top: 2.02rem;
    left: 2rem;
    margin-top: .16rem;
    font-size: .4rem;
    height: .4rem;
    width: 2.4rem;
    line-height: .4rem;
    color: #000;
  }
}
</style>
