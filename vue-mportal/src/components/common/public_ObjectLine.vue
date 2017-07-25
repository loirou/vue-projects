/**
* Created by gyr on 16/10/08.
*
* Des: 散标固收进度线百分比,进度线的宽度及margin-left 需要动态确定
*
*/

<template>

    <div id='public-ObjectLine' class="lineOwn">

        <div v-bind:class="info.class" v-bind:style="{marginLeft:marginLeft}"> {{info.title}}</div>
        <div v-bind:class="info.triangle"></div>
        <div class="linerBot">
            <span v-bind:class="info.liner" v-bind:style="{width:width}"></span>
        </div>
    </div>
</template>

<script>
export default {
   props: ['scale'],
   data() {
        return {
            timer:null,
            width:0,
            marginLeft:0,
            title:0
        }
    },
    ready(){
    //console.log(this.scale);
        this.progressBar();
        this.progressMl();
       //this.progressTitle();
    //console.log(this.scale);
    },
    methods : {
        progressBar: function(){
            var self = this;
            //定时器改变this指向 所以需要区分this
            setTimeout(function() {
                self.width = self.scale*100 + "%";
            }, 0);
        },
        progressMl: function(){
            var self = this;
            setTimeout(function() {
                var percent = self.scale*100;
                switch (true){
                    case percent < 7 :
                        self.marginLeft = 0 + "%";
                        break;
                    case percent > 93 && percent < 100 :
                        self.marginLeft = 87.5 + "%";
                        break;
                    case percent == 100:
                        self.marginLeft = 80.5 + "%";
                        break;
                    default :
                        self.marginLeft = (percent - 7) + "%";
                }
            }, 0);
        },
        progressTitle: function(){
            var self = this;
            var titleNum = 0;
            var titleFlag = (this.scale*100);
            switch (titleFlag){
                case 0 :
                    self.title = "0%";
                    break;
                case 100 :
                    self.title = "已售罄";
                    break;
                default :
                    this.timer = setInterval(()=>{
                        if(titleFlag == null || titleFlag == undefined ){
                            self.title = '';
                            clearInterval(self.timer);
                        }else{
                            if(titleFlag <= 1){
                                self.title = titleFlag + "%";
                                clearInterval(self.timer);
                            }else{
                                titleNum += 1;
                                self.title = titleNum + "%";
                                var clear = titleNum;
                                if(clear >= this.scale*100){
                                    clearInterval(self.timer);
                                }
                            }
                        }

                    },15)
            }
        }
    },
    computed: {
        info: function () {
            var info={};
            var flag = this.scale*100;
            info.class = {
                'start' : false,
                'end' : false,
                'frame' : true
            };
            info.triangle = {
                'dis' : true,
                'triangle' : false,
                'triangle2' :false
            };
            info.liner = {
                'liner' : true,
                'linerEnd' : false
            };
            switch (flag){
//                case 0 :
//                    info.title = "0%";//即将发售
//                    info.class = {
//                        'start' : true,
//                        'end' : false,
//                        'frame' : false
//                    };
//                    info.triangle = {
//                        'dis' : false,
//                        'triangle' : true,
//                        'triangle2' :false
//                    };
//                    info.liner = info.liner;
//                    break;
                case 100 :
                    info.title = "已售罄";
                    info.class = {
                        'start' : false,
                        'end' : true,
                        'frame' : false
                    };
                    info.triangle = {
                        'dis' : false,
                        'triangle' : false,
                        'triangle2' :true
                    };
                    info.liner = {
                        'liner' : false,
                        'linerEnd' : true
                    };
                    break;
                    default :
                    info.title = Math.floor(this.scale*100) + "%";
                    info.class = info.class;
                    info.triangle = info.triangle;
                    info.liner = info.liner;
            }
            return info;
        }
    }
}
</script>

<style lang="sass" scoped>
    @import "../../common/css/common";
    .lineOwn {

    .start {
        float: left;
        border-radius: 0.4rem;
        border: $public-border solid #ffb046;
        height: .26rem;
        line-height: .26rem;
        color: #fa8a55;
        background: #ffebe1;
        margin-left: .04rem;
        padding: 0 .1rem;
        font-size: .16rem;
    }

    .end {
        float: right;
        border-radius: 0.4rem;
        border: $public-border solid #999;
        height: .26rem;
        line-height: .26rem;
        color: #999;
        background: #eaeaea;
        margin-right: .04rem;
        padding: 0 .1rem;
        font-size: .16rem;
    }

    .frame {
        display: inline-block;
        width: .76rem;
        height: .28rem;
        line-height: .22rem;
        color: #fa8a55;
        font-size: .2rem;
        font-weight: normal;
        text-align: center;
        background: url("../../static/images/scatter/frame-1.png") no-repeat;
        background-size: .76rem .28rem;
        transition: margin-left 1s;
        -moz-transition: margin-left 1s; /* Firefox 4 */
        -webkit-transition: margin-left 1s; /* Safari 和 Chrome */
        -o-transition: margin-left 1s; /* Opera */
    }

    .triangle {
        float: left;
        clear: both;
        margin-top: -0.016rem;
        margin-bottom: 0.01rem;
        width: 0.08rem;
        padding-left: .2rem;
        height: 0.08rem;
        background: url("../../static/images/scatter/triangle.png") no-repeat;
        background-size: 0.08rem 0.08rem;
        background-position: .2rem;
    }

    .triangle2 {
        float: right;
        clear: both;
        margin-top: -0.016rem;
        margin-bottom: 0.01rem;
        width: 0.08rem;
        padding-right: .2rem;
        height: 0.08rem;
        background: url("../../static/images/scatter/triangle2.png") no-repeat;
        background-size: 0.08rem 0.08rem;
    }

    .dis {
        display: none;
    }

    .linerEnd {
        clear: both;
        float: left;
        height: .04rem;
        width: 100%;
        background: #dcdcdc;
    }

    .liner {
        float: left;
        height: .04rem;
        background: -webkit-linear-gradient(left, rgba(251,138,86,0), rgba(251,138,86,0.4), #fb8a56); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, rgba(251,138,86,0), rgba(251,138,86,0.4), #fb8a56); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, rgba(251,138,86,0), rgba(251,138,86,0.4), #fb8a56); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, rgba(251,138,86,0), rgba(251,138,86,0.4), #fb8a56); /* 标准的语法 */
        transition: width 1s;
        -moz-transition: width 1s; /* Firefox 4 */
        -webkit-transition: width 1s; /* Safari 和 Chrome */
        -o-transition: width 1s; /* Opera */
    }

        .linerBot {
            clear: both;
            height: .04rem;
            width: 100%;
            background: #feeee7;
        }

    }


</style>