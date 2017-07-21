<template>
    <div>
        <div>
            <!--<my-video :sources="sources" :options="videoOptions"></my-video>-->
            <div style="min-height:187.5px;" v-html="video"></div>
            <!--<video class="width-full" id="video" v-bind:post="info.thumb">
                <source v-bind:src="info.link" type="video/mp4">
                <p class="warning">Your browser does not support HTML5 video.</p>
            </video>-->
            <!--<div id="videoDiv" @click="play()"></div>-->
        </div>
        <div class="flex-row flex-middle pd-10px">
            <div class="col-4 toolong-ellipsis" style="font-size:15px;">{{info.title}}</div>
            <div class="col-8 text-right" style="color:#8d8f94;">
                <img src="../asset/icon_watch.png" style="height:12px;" />
                <span>{{info.readNum}}</span>&nbsp;&nbsp;&nbsp;
                <img src="../asset/icon_msg.png" style="height:12px;" />
                <span>{{info.commentNum}}</span>
            </div>
        </div>
        <div class="border-t border-b pd-l-10px" style="height:50px;line-height:50px;font-size:16px;color:#9a9a9a;border-color:#45484a;">往期节目</div>
        <div class="img-block">
            <router-link :to="'/passVideo/'+item.videoId" class="block" v-for="item in passVideos">
                <div class="flex-row pd-10px pd-t-12px pd-b-12px border-b" style="border-color:#45484a;">
                    <div style="width:164px;">
                        <img :src="item.thumb" style="width:144px;height:104px;display:block;" />
                    </div>
                    <div style="line-height: 28px;">
                        <div>
                            <div>{{item.name}}</div>
                            <div>·{{item.description}}</div>
                            <div style="font-size: 12px;">{{item.readNum}}次播放</div>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="border-b pd-l-10px" style="height:50px;line-height:50px;font-size:16px;color:#9a9a9a;border-color:#45484a;">评论</div>
        <div style="padding-left:10px;padding-right:12px;">
            <div class="flex-row pd-tb-14px" style="padding-left:46px;" v-for="item in comments">
                <div style="width:46px;position:absolute;margin-left:-46px;">
                    <img :src="item.img" class="" style="border-radius:50%;width:38px;height:38px;" />
                </div>
                <div class="" style="width:100%;color:#9a9a9a; border-bottom:1px solid #45484a;">
                    <div class="row">
                        <div class="width: 100%;line-height:28px;font-size:14px;">{{item.nick_name}}</div>
                        <div style="width: 110px;position: absolute;right: 0;margin-top: -18px;text-align: right;">
                            <i class="icon_like" @click="laud(item)" v-bind:class="{like:item.is_laud==1}"></i>
                            <span>{{item.laud_num}}</span>&nbsp;&nbsp;&nbsp;
                            <div style="display:inline-block;height:30px;line-height: 30px" @click="showComment('commentDiv'+item.comment_id)">
                                <img src="../asset/icon_com.png" style="height:14px;margin-right:10px;vertical-align: text-top;">
                            </div>
                        </div>
                    </div>
                    <div class="comment_time" style="font-size:11px;line-height:15px;height:15px;">{{item.create_at}}</div>
                    <div class="pd-b-2px comment_txt" style="font-size:14px;line-height:24px; padding-top:0;word-wrap: break-word;">{{item.comment_content}}</div>
                    <div v-bind:class="'row none commentDiv commentDiv'+item.comment_id" style="margin-bottom:6px;">
                        <div class="col-8">
                            <input v-bind:name="'comment_'+item.comment_id" type="text" placeholder="我来评论一番" class="pd-lr-12px width-full" style="border-radius:2px;height:34px;font-size:14px;"
                            />
                        </div>
                        <div class="col-4">
                            <button class="button pd-10px left" @click="sendMessage(info.videoId,item.comment_id)" style="position:relative; left:27px; background-color:#2b52b2;color:#FFF;border:none;border-radius:4px;width:51px; font-size: 14px; line-height:0;height:36px;  ">
                                发布
                            </button>
                        </div>
                    </div>

                    <div v-show="item.reply.length > 0" class="pd-b-5px pd-l-10px pd-r-15px" style="border-radius:3px;background:rgba(255,255,255,0.1); margin-bottom:15px">
                        <div v-for="reply in item.reply" style="padding-top:10px;padding-bottom:5px;">
                            <span>{{reply.reply_nick_name}}：</span>{{reply.reply_content}}
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="clear" style="height:80px;"></div>
        <div class="fixed bottom-say">
            <div class="row pd-10px" style="background-color: rgb(208, 214, 221); padding-top: 8px; padding-bottom: 8px; padding-right: 65px;">
                <input name="commentVideo" type="text" placeholder="我来说一说" class="width-full pd-lr-12px" style="border-radius: 2px; height: 33px; box-sizing: border-box;font-size:14px;">
                <button class="button pd-10px" @click="sendMessage(info.videoId)" style="background-color: rgb(43, 82, 178); color: rgb(255, 255, 255); border: none;
    width: 51px; position: absolute; right: 10px; margin-top: -33px; height: 33px; border-radius:3px; font-size: 14px; line-height:0;"> 发布 </button>
            </div>
        </div>
    </div>
</template>
<script>
    import {tool} from 'app-utils';
    import eventHub from 'src/eventHub';
    import myVideo from 'vue-video';

    export default {
        created: function () {
            this.init();
            this.listenScroll();
            tool.setPageTitle('精彩回顾');
            var query = this.$route.params;
            if (query.id) {
                this.info.videoId = query.id;
                this.videoId = query.id;
            }
            this.getInfo(this.videoId || "");
        },

        mounted: function () {

        },
        data() {
            return {
                videoId:1,
                userId:1,
                userName:'游客',
                video:'',
                page: 1,
                wechatToken: window.localStorage.wechatToken,
                info: {},
                passVideos: [{}],
                videoOptions: {
                    autoplay: true,
                    volume: 0.6,
                    //poster: 'http://covteam.u.qiniudn.com/poster.png'
                },
                comments: [

                ]
            }
        },
        watch: {
            '$route' (to, from) {
            // 对路由变化作出响应...
                this.getInfo(to.params.id||'');
                window.clearInterval(this.timer);
            }
        },
        components: {
            myVideo
        },
        methods: {
          init: function() {
            const it = this; 
            if(it.userName && it.wechatToken){
                    const that = it;
                    var url = 'http://boji.kfyapp.com//app-sdk/oauth2/getUserInfo?'
                    url +='token=' +it.wechatToken;
                    $.get(url,
                        function(res){
                            if(res.code==200){
                                if(res.data.userInfo){
                                    that.userName=res.data.userInfo.nickName;
                                    $.post('/app-server/app/saveUserInfo',
                                        {
                                            openId: res.data.userInfo.uId,
                                            nickName: res.data.userInfo.nickName,
                                            img: res.data.userInfo.iconUrl
                                        }, function(res){
                                            if(res.code === 200 && res.data) {
                                                that.userId = res.data.userId;
                                            }
                                        })
                                }else{
                                    that.wechatToken = '';
                                    window.localStorage.wechatToken='';
                                }
                            }
                        }
                    )
                }
          },
          listenScroll: function(){
              const it = this;
              $(window).scroll(function(){
              　　var scrollTop = $(this).scrollTop();
              　　var scrollHeight = $(document).height();
              　　var windowHeight = $(this).height();
              　　if(scrollTop + windowHeight == scrollHeight){
                      it.page += 1;
                      it.loadMoreComment();
              　　}
              });
          },
          loadMoreComment: function (){
                var it = this;
                $.getJSON('/app-server/video/selectComment?page=' + it.page + '&videoId=' + it.videoId+'&userId='+(this.userId||''), function (res) {
                    if (res.data && it.comments) {
                        it.comments = it.comments.concat(res.data);
                    }
                });
            },
            getInfo: function (videoId) {
                var it = this;
                $.get('/app-server/video/info?videoId=' + videoId,function (res) {
                    console.log(res);
                    it.info = res.data;
                    var videoId = it.info.videoId;
                    tool.setPageTitle(it.info.name);
                    it.sources = [{
                        src: it.info.link,
                        type: 'video/mp4'
                    }];
                    it.videoOptions.poster = it.info.thumb;
                    it.video='<video class="width-full" id="video" poster="'+it.info.thumb+'">'+
                        '<source src="'+it.info.link+'" type="video/mp4">'+
                        '<p class="warning">Your browser does not support HTML5 video.</p>'+
                    '</video>'
                    it.getPassVideos(videoId);
                    it.getComments(videoId);
                    it.addReadNum(videoId);
                    var that =it;
                    it.timer = setInterval(function(){
                        $.get('/app-server/video/info?videoId=' + videoId,function (res) {
                            that.info = res.data;
                        })
                    },1500)
                });
            },
            getPassVideos: function (videoId) {
                var it = this;
                $.getJSON('/app-server/video/sonVideo?videoId=' + videoId ,function (res) {
                    console.log(res);
                    it.passVideos = res.data;
                });
            },
            getComments: function (videoId) {
                var it = this;
                $.getJSON('/app-server/video/selectComment?videoId=' + videoId+'&userId='+(this.userId||''), function (res) {
                    console.log(res);
                    it.comments = res.data;
                });
            },
            addReadNum: function (videoId) {
                var it = this;
                $.getJSON('/app-server/video/addOneReadNum?videoId=' + videoId, function (res) {
                    console.log(res);
                });
            },
            sendMessage: function(videoId, commentId) {
                debugger;
                var it = this;
                if(this.userName=='游客'){
                    var url = 'http://boji.kfyapp.com//app-sdk/oauth2/getUserInfo?'
                        url +='redirectToUrl='+encodeURIComponent(location.href);

                    $.get(url,
                        function(res){
                            if(res.code==200){
                                // if(res.data.token){
                                    window.localStorage.wechatToken=res.data.token;
                                // }
                                window.location.href =res.data.resultInfo;
                            }
                        }
                    )
                }else{
                    it.addComment(videoId, commentId);
                }
            },
            addComment: function (videoId, commentId) {
                var it = this;
                var commentVideo = it.$el.querySelector('input[name="commentVideo"]').value;
                if (commentId) {
                    cse
                }
                if (!commentVideo) {
                    eventHub.$emit('showError', {msg: '内容不能为空'});
                    return;
                }
                 $.post('/app-server/video/addComment', {
                    videoId: videoId,
                    parentId: commentId,
                    userId: it.userId,
                    content: commentVideo
                },function (res) {
                    it.getComments(videoId);
                    if(commentId){
                        it.$el.querySelector('.commentDiv'+commentId).style.display='none';
                        it.$el.querySelector('input[name="comment_' + commentId + '"]').value='';
                    }else{
                        it.$el.querySelector('input[name="commentVideo"]').value='';
                        ++it.info.commentNum;
                    }
                });
            },
            showComment: function (commentDiv) {
                var it = this;
                var commentDivs = it.$el.querySelectorAll('.commentDiv');
                var commentDiv = it.$el.querySelector('.' + commentDiv);
                var isVisi = commentDiv.style.display == "block";
                //隐藏DIV
                for(var i=0;i<commentDivs.length;i++){
                    commentDivs[i].style.display = "none";
                }
                //显示DIV

                if(isVisi){
                    commentDiv.style.display ="none";
                }else{
                    commentDiv.style.display ="block";
                }
            },
            play: function () {
                var it = this;
                var video = it.$el.querySelector("#video");
                console.log("play:", video.paused, video);
                if (!video.paused) {
                    video.pause();
                } else {
                    video.play();
                }
            },
            laud:function(item){
                var it = this;
                if(this.userName=='游客'){
                    var url = 'http://boji.kfyapp.com//app-sdk/oauth2/getUserInfo?'
                        url +='redirectToUrl='+encodeURIComponent(location.href);

                    $.get(url,
                        function(res){
                            if(res.code==200){
                                // if(res.data.token){
                                    window.localStorage.wechatToken=res.data.token;
                                // }
                                window.location.href =res.data.resultInfo;
                            }
                        }
                    )
                }else{
                    $.post('/app-server/video/laud',
                        {
                            userId:it.userId,
                            videoId:it.videoId,
                            commentId:item.comment_id,
                            isLaud:item.is_laud==1?'0':"1"
                        },
                        function(res){
                            if(item.is_laud==1){
                                item.is_laud=0;
                                --item.laud_num;
                            }else{
                                item.is_laud=1;
                                ++item.laud_num;
                            }
                        }
                    )
                }    
            }
        }
    };


</script>
<style>
    .img-block a {
        color: #9a9a9a
    }

    .img-block a:first-child {
        color: #2b52b2;
    }

    #videoDiv {
        top: 0;
        width: 100%;
        height: 200px;
        background-color: #fff;
        z-index: 99;
        background-color: rgba(000, 1, 000, 0.1);
        position: absolute;
    }

    .icon_like {
        width: 16px;
        height: 13px;
        background-image: url(../asset/icon_lick.png);
        background-size: 16px;
        display: inline-block;
    }

    .icon_like.like {
        background-image: url(../asset/icon_lick_a.png);
    }

    .comment_time {
        font-size: 14px;
        padding: 2px 0 0;
    }

    .comment_txt {
        font-size: 16px;
        padding: 10px 0;
        line-height: 18px;
    }

    .bottom-say {
        bottom: 0;
        width: 100%;
        z-index: 2;
    }

    .toolong-ellipsis {
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
</style>
