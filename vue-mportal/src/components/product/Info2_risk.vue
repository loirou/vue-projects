/**
 * Created by Darren on 16/10/27.
 *
 * Des: 产品详情2-借款人详情
 *
 */
 <template>
    <div style="height: 8.1rem;">
        <div class="info-pro">
            <div class="title">
                <span>风控措施</span>
            </div>
            <div class="content" v-text="risk">
            </div>
        </div>
    </div>
</template>


<script>
import public_show_img from '../common/public_showImg.vue';

import http_url from '../../common/js/http-url.js';
export default {
    props: ["type_info"],
    data () {
        return {
            risk:""
        }
    },
    components: {
        "pb-show-img":public_show_img
    },
    created:function(){
        this.$http({
            method:"POST",
            url:http_url.risk,
            body:{
                "type":this.type_info.targetType,
                "id":this.$route.params.targetId
            }
        }).then((response) => {
            if(response.data.code == 200){
                this.risk = response.data.data;
            }else{
                console.error(response.data.code);
            }
        }, (response) => {
            console.error(response);
        });
    },
    methods: {
        menu_go_list: function (msg) {
          router.go(msg)
        }
    }
}
</script>
<style lang="sass" scoped>
@import "../../common/css/common";
.info-person{
    margin-top: .3rem;
    background: #ffffff;
    .title{
        border-bottom: $public-border solid #efefef;
        height: .76rem;
        span{
            border-left: .04rem solid #f75c5c;
            margin-left: .3rem;
            padding-left: .26rem;
            line-height: .76rem;
            font-size: .28rem;
        }
    }
    .content{
        padding: .24rem 0 .24rem .3rem;
        .info{
            margin-top: .3rem;
            &:nth-of-type(1){
                margin: 0;
            }
            .info-title{
                float: left;
                display: inline-block;
                width: 1.3rem;
                text-align: center;
                font-size: .22rem;
                color: #999999;
            }
            .info-content{
                float: left;
                display: inline-block;
                margin-left: .3rem;
                width: 4.4rem;
                word-wrap:break-word;
                word-break:break-all;
                font-size: .22rem;
            }
        }
    }
}

.info-pro{
    margin-top: .3rem;
    background: #ffffff;
    .title{
        border-bottom: $public-border solid #efefef;
        height: .76rem;
        span{
            border-left: .04rem solid #f75c5c;
            margin-left: .3rem;
            padding-left: .26rem;
            line-height: .76rem;
            font-size: .28rem;
        }
    }
    .content{
        font-size: .22rem;
        color: #999999;
        padding: .24rem .3rem;
        word-wrap:break-word;
        word-break:break-all;
    }
}

// v-cloak
[v-cloak] {
  display: none;
}
</style>






