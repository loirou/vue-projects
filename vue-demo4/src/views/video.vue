<template>
    <div>
        <div style="height:210px;" class="x_video" v-html="video">
        </div>
        <div class="flex-row flex-middle pd-l-10px" style="height:47px; position: relative;">
            <div style="font-size:15px;">{{act.actName}}</div>
            <div class="" style="color:#8d8f94;position: absolute;right: 10px;top:14px">
                <div class="text-center inline-block pd-lr-10px danmuDiv" @click="showDanmu()" style="background-color:#2b52b2;color:#FFF;border-radius:20px;font-size:12px;">弹幕<span class="x_line" v-show="isShowLine"></span></div>
                &nbsp;&nbsp;&nbsp;
                <img src="../asset/icon_watch.png" style="height:12px;" />
                <span>{{watchCount}}</span>&nbsp;&nbsp;&nbsp;
                <img src="../asset/icon_msg.png" style="height:12px;" />
                <span>{{msgCount}}</span>
            </div>
        </div>
        <div class="nav row" style="border-top:solid 1px #000;border-bottom:solid 1px #2a2e34;font-size:15px;">
            <div v-if="tab==1" class="current col-4 text-center pd-tb-6px">互动聊天</div>
            <div v-else class="col-4 text-center pd-tb-6px" @click="onTab(1)">互动聊天</div>
            <div v-if="tab==2" class="current col-4 text-center pd-tb-6px">活动简介</div>
            <div v-else class="col-4 text-center pd-tb-6px" @click="onTab(2)">活动简介</div>
            <div v-if="tab==3" class="current col-4 text-center pd-tb-6px">日程安排</div>
            <div v-else class="col-4 text-center pd-tb-6px" @click="onTab(3)">日程安排</div>
        </div>
        <div class="pd-10px" v-show="tab==1" style="padding-bottom: 52px;position: absolute;width: 100%;box-sizing: border-box;top: 304px;overflow: scroll;bottom: 0;">
            <div class="fixed" style="bottom:42px;z-index:2;right:-1px;">
                <router-link v-bind:to="'/pay?videoId='+info.brocastId" class="block">
                    <img src="../asset/icon_pay.png" style="border-radius:50%;width:75px;" />
                </router-link>
            </div>


            <div class="fixed bottom-say">
                <div class="row pd-10px" style="background-color: rgb(208, 214, 221); padding-top: 8px; padding-bottom: 8px; padding-right: 65px;">
                    <input name="commentVideo" type="text" placeholder="我来说一说" class="width-full pd-lr-12px" style="border-radius: 2px; height: 33px; box-sizing: border-box;font-size:14px;">
                    <button class="button pd-10px" @click="addComment(info.chatRoomId)" style="background-color: rgb(43, 82, 178); color: rgb(255, 255, 255); border: none;
    width: 51px; position: absolute; right: 10px; margin-top: -35px; border-radius:3px;"> 发布 </button>
                </div>
            </div>
            <div id="commentList" style="-webkit-overflow-scrolling: touch; position: absolute; width: 100%; overflow: scroll; left: 0px;bottom:52px;top:4px;">
                <div class="flex-row" v-for="item in comments">
                    <div class="col-2 text-center">
                        <img :src="item.content.extra.url" class="" style="border-radius:50%;width:38px;height:38px;" />
                    </div>
                    <div class="col-10 border-b" style="border-color:#45484a;">
                        <div>{{item.content.extra.name}}</div>
                        <div style="color:#8D8E92;font-size:14px;color:#909193" class="pd-b-10px">{{item.content.content}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="tab==2" style="padding:25px 21px;">
            <div class="text-center" style="color:#dededf;font-size:20px;line-hight:20px;padding-bottom:7px;">{{act.actName}}</div>
            <div style='padding:4px 0;line-hight:22px;'>
                <span style="color:#fff;">赛事地点：</span>
                <span style="color:#8f9091;">{{act.actAddr}}</span>
            </div>
            <div style='padding:4px 0;line-hight:22px;'>
                <span style="color:#fff;">赛事时间：</span>
                <span style="color:#8f9091;">{{act.beginTime}} &nbsp;&nbsp;- &nbsp;&nbsp;{{act.endTime}}</span>
            </div>
            <div style='padding:4px 0;line-hight:22px;'>
                <span style="color:#fff;">赛事公告：</span>
                <span style="color:#8f9091;">{{act.actDes}}</span>
            </div>
        </div>
        <div v-show="tab==3" style="padding:25px 21px;">
            <div class="text-center" style="color:#fff;font-size:20px;line-hight:20px;padding-bottom:7px;">{{act.actName}}</div>

            <div style='padding:4px 0;line-hight:22px;'>
                <span style="color:#fff;">开赛仪式：</span>
                <span style="color:#8D8E92;">{{plan.planRite}}</span>
            </div>
            <div style='padding:4px 0;line-hight:22px;'>
                <span style="color:#fff;">比赛时间：</span>
                <span style="color:#8D8E92;">{{plan.planTime}}</span>
            </div>
            <div style='padding:4px 0;line-hight:22px;color:#fff'>

                {{plan.planContent}}
            </div>
            <!--<div>
                <span>自助餐及当日赛后颁奖</span>
                <span style="color:#8D8E92;">{{plan}}</span>
            </div>-->
        </div>
    </div>
</template>
<style>
    .nav {}

    .nav .current {
        background-color: #2B51B2;
        border-bottom: solid 3px #FFF;
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

    #textStyle {
        position: absolute;
        font-size: 14px;
        color: #fff;
    }

    .bottom-say {
        bottom: 0;
        width: 100%;
        z-index: 2;
        left: 0;
    }
    .x_video{
        position: relative;
    }
    .x_line{
        border-bottom: 1px solid #fff;
        width: 36px;
        display: inline-block;
        position: absolute;
        left: 2px;
        transform: rotate(-27deg);
        transform-origin: right bottom;
    }
    .expect_live{
        display: inline-block;
        width: 66px;
        height: 75px;
        line-height: 210px;
        position: absolute;
        left: 78px;
        top: 58px;
        background: url(./../asset/expect_live.png) no-repeat;
    }
    .expect_live_text{
        position: absolute;
        left: 146px;
        color:#2b52b2;
        font-size: 32px;
        line-height: 210px;
    }
</style>
<script>

import { tool } from 'app-utils';
import eventHub from 'src/eventHub';
import myVideo from 'vue-video';
var si;
export default {
    created: function () {
        var it = this;
        tool.setPageTitle('赛事直播');
        this.wechatToken = window.localStorage.wechatToken;
        it.getInfo(1);
    },
    mounted: function () {

    },
    data() {
        return {
            src: '',
            poster: '',
            video: '<span class="expect_live"></span><span class="expect_live_text">直播尚未开始</span>',
            tab: 1,
            videoOptions: {
                autoplay: true,
                volume: 0.6,
            },
            info: {
                id: 1,
                videoId:'',
                chatRoomId:''
            },
            sources: {
                src: ''
            },
            watchCount: 0,
            msgCount: 0,
            act: {
                actName: ''
            },
            plan: {},
            token: '',
            userInfo: {
                name: '游客',
                url: 'http://boji.kfyapp.com/favicon.ico',
                id: 0
            },
            wechatToken:'',
            comments:[],
            isShowLine:false
        }
    },
    components: {
        // myVideo
    },
    methods: {
        getInfo: function (videoId) {
            var it = this;
            $.get('/app-sdk/broad/createStream?brocastId=' + videoId, function (res) {
                it.info = res.data;
                var videoId = it.info.brocastId;
                var chatRoomId = it.info.chatRoomId;

                it.sources = {
                    src: it.info.hlsPullUrl,
                    poster: 'static/activity_intro.jpg'
                };

                it.video = '<video id="html5player-video" data-setup="{}" webkit-playsinline="" preload="none" width="100%" height="100%" poster="' + it.sources.poster + '" controls="controls">' +
                    '<source src="' + it.sources.src + '">' +
                    '<span>您的手机版本，网页版暂未能支持！</span>' +
                    '</video>'
                var that = it;


                if(it.userInfo.name=='游客'&&it.wechatToken){
                    var url = 'http://boji.kfyapp.com//app-sdk/oauth2/getUserInfo?'
                    url +='token=' +it.wechatToken;
                    $.get(url,
                        function(res){
                            if(res.code==200){
                                if(res.data.userInfo){
                                    that.userInfo.name=res.data.userInfo.nickName
                                    that.userInfo.url=res.data.userInfo.iconUrl;
                                    that.userInfo.id =res.data.userInfo.uId;
                                    $.post('/app-server/app/saveUserInfo',
                                        {
                                            openId: res.data.userInfo.uId,
                                            nickName: res.data.userInfo.nickName,
                                            img: res.data.userInfo.iconUrl
                                        }, function(res){
                                            if(res.code === 200 & res.data) {
                                                that.userInfo.id = res.data.userId;
                                            }
                                        })
                                    that.createChatRoom();
                                }else{
                                    that.wechatToken = '';
                                    window.localStorage.wechatToken='';
                                    that.createChatRoom();
                                }
                            }
                        }
                    )
                } else{
                    it.createChatRoom();
                }

                that.addReadNum(videoId);
                that.getVistor(chatRoomId);

                $.get('/app-sdk/broad/getActivity?broadId=' + videoId, function (res) {
                    if (res.code == 200 && res.data) {
                        that.act.actName = res.data.actName;
                        that.act.actDes = res.data.actDes;
                        that.act.beginTime = res.data.beginTime;
                        that.act.endTime = res.data.endTime;
                        that.act.actAddr = res.data.actAddr;
                    }
                })
                $.get('/app-sdk/broad/getPlan?broadId=' + videoId, function (res) {
                    if (res.code == 200 && res.data) {
                        that.plan.planContent = res.data.planContent;
                        that.plan.planRite = res.data.planRite;
                        that.plan.planTime = res.data.planTime;
                    }
                })
            });
        },
        createChatRoom: function () {
            var chatRoomId = this.info.chatRoomId;
            RongIMClient.init("pgyu6atqpnklu");
            var it = this;
            $.post('/app-msg/msg/getToken',
                { "name": this.userInfo.name, "userId": this.userInfo.id, "portraitUri": this.userInfo.url },
                function (res) {
                    if (res.code == 200) {
                        it.token = JSON.parse(res.data).token;
                        it.initCharRoom();
                    }
                }
            )
        },
        initCharRoom: function () {
            var it =this;
            // 设置连接监听状态 （ status 标识当前连接状态）
            // 连接状态监听器
            RongIMClient.setConnectionStatusListener({
                onChanged: function (status) {
                    switch (status) {
                        //链接成功
                        case RongIMLib.ConnectionStatus.CONNECTED:
                            console.log('链接成功');
                            RongIMClient.getInstance().joinGroup(it.info.chatRoomId.toString(), 'bojinight', {
                                onSuccess: function(res) {
                                    console.log(res);
                                    console.log("joinChatRoom Successfully");
                                },
                                onError: function(error) {
                                    console.log("joinChatRoom:errorcode:" + error);
                                }
                            });
                            it.getHistroyList(function(){
                                setInterval(function(){
                                    it.getHistroyList(null,Date.now());
                                },2000)
                            });
                            break;
                        //正在链接
                        case RongIMLib.ConnectionStatus.CONNECTING:
                            console.log('正在链接');
                            break;
                        //重新链接
                        case RongIMLib.ConnectionStatus.DISCONNECTED:
                            console.log('断开连接');
                            break;
                        //其他设备登录
                        case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                            console.log('其他设备登录');
                            break;
                        //网络不可用
                        case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                            console.log('网络不可用');
                            break;
                    }
                }
            });

            // 消息监听器
            RongIMClient.setOnReceiveMessageListener({
                // 接收到的消息
                onReceived: function (message) {
                    // 判断消息类型
                    switch (message.messageType) {
                        case RongIMClient.MessageType.TextMessage:
                            // 发送的消息内容将会被打印
                            console.log(message.content.content);
                            break;
                        case RongIMClient.MessageType.VoiceMessage:
                            // 对声音进行预加载
                            // message.content.content 格式为 AMR 格式的 base64 码
                            RongIMLib.RongIMVoice.preLoaded(message.content.content);
                            break;
                        case RongIMClient.MessageType.ImageMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.DiscussionNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.LocationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.RichContentMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.DiscussionNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.InformationNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.ContactNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.ProfileNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.CommandNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.CommandMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.UnknownMessage:
                            // do something...
                            break;
                        default:
                        // 自定义消息
                        // do something...
                    }
                }
            });
            RongIMClient.connect(this.token, {
                onSuccess: function (userId) {
                    console.log("Login successfully." + userId);
                },
                onTokenIncorrect: function () {
                    console.log('token无效');
                },
                onError: function (errorCode) {
                    var info = '';
                    switch (errorCode) {
                        case RongIMLib.ErrorCode.TIMEOUT:
                            info = '超时';
                            break;
                        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                            info = '未知错误';
                            break;
                        case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                            info = '不可接受的协议版本';
                            break;
                        case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                            info = 'appkey不正确';
                            break;
                        case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                            info = '服务器不可用';
                            break;
                    }
                    console.log(errorCode);
                }
            });
        },
        getHistroyList:function(callback,timespan){
            var it =this;
            RongIMClient.getInstance().getHistoryMessages(RongIMLib.ConversationType.GROUP, this.info.chatRoomId.toString(), timespan||null, 20, {
                onSuccess: function (list, hasMsg) {
                    console.log(list);
                    if(it.comments.length===0){
                        it.comments=list.reverse();
                    }else{
                        var addList = [];
                        for(var i =0;i<list.length;i++){
                            var item = list[i];
                            var addFlag = true;
                            for(var j=0;j<it.comments.length;j++){
                                var com = it.comments[j];
                                if(com.messageUId==item.messageUId){
                                    addFlag=false;
                                    continue;
                                }
                            }
                            if(addFlag){
                                addList.push(item);
                            }
                        }
                        it.comments=addList.reverse().concat(it.comments);
                    }
                    if(hasMsg){
                        it.getHistroyList(callback);
                    }else{
                        callback && callback();
                    }
                },
                onError: function (error) {

                }
            });
        },
        getVistor: function (chatRoomId) {
            var it = this;
            $.post('/app-msg/chat/queryChatUsers', { chatroomId: chatRoomId, count: '0', order: 1 }, function (res) {
                if (res.code = 200) {
                    var data = JSON.parse(res.data);
                    it.watchCount = data.total||0;
                }
            });

            // function addZero(str) {
            //     if (str.length === 1) {
            //         str = '0' + str;
            //     }
            //     return str;
            // }

            // var now = new Date();
            // var nowStr = now.getFullYear().toString() + addZero((now.getMonth() + 1).toString()) + addZero(now.getDate().toString()) + addZero((now.getHours()).toString());

            // $.get('/app-msg/chat/queryMsg?date=' + nowStr, function (res) {
            //     if (res.code = 200) {
            //         it.msgCount = res.total;
            //     }
            // })
        },
        addReadNum: function (videoId) {
            var it = this;
            // $.post('/app-server/video/addOneReadNum', {videoId: videoId},function (res) {
            //     console.log(res);
            // });
        },
        addComment: function (chatRoomId) {
            var it = this;
            if(this.userInfo.name=='游客'){
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
                this.sendMsg();
            }
        },
        sendMsg:function(){

            var it = this;
            var evt = eventHub;
            var commentVideo = it.$el.querySelector('input[name="commentVideo"]').value;
            if (!commentVideo) {
                eventHub.$emit('showError', { msg: '内容不能为空' });
                return;
            }
            // 定义消息类型,文字消息使用 RongIMLib.TextMessage
            var sendMsg = { content: commentVideo, extra: this.userInfo }
            var msg = new RongIMLib.TextMessage(sendMsg);
            //或者使用RongIMLib.TextMessage.obtain 方法.具体使用请参见文档
            //var msg = RongIMLib.TextMessage.obtain("hello");
            var conversationtype = RongIMLib.ConversationType.GROUP; // 私聊
            RongIMClient.getInstance().sendMessage(conversationtype, this.info.chatRoomId.toString(), msg, {
                // 发送消息成功
                onSuccess: function (message) {
                    //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                    console.log("Send successfully");
                    evt.$emit('showError',{msg:'发布成功'});
                    it.$el.querySelector('input[name="commentVideo"]').value=''
                    // it.comments.unshift({content:sendMsg});
                    it.getHistroyList();
                },
                onError: function (errorCode, message) {
                    var info = '';
                    switch (errorCode) {
                        case RongIMLib.ErrorCode.TIMEOUT:
                            info = '超时';
                            break;
                        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                            info = '未知错误';
                            break;
                        case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                            info = '在黑名单中，无法向对方发送消息';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                            info = '不在讨论组中';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_GROUP:
                            info = '不在群组中';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                            info = '不在聊天室中';
                            break;
                        default:
                            info = x;
                            break;
                    }
                    console.log('发送失败:' + info);
                }
            }
            );
        },
        onTab: function (tab) {
            this.tab = tab;
        },
        play: function () {
            var video = document.getElementById("video");
            if (!video.paused) {
                video.pause();
            } else {
                video.play();
            }
        },
        toPay: function (id) {
            this.$router.push('pay');
        },
        showDanmu: function () {
            var it = this;
            clearInterval(si);
            if (!it.isShowDanmu) {
                it.isShowDanmu = true;
                it.$data.isShowLine = false;
                it.$el.querySelector('.danmuDiv').style.backgroundColor = "#2b52b2";
                it.$el.querySelector('.danmuDiv').style.border = 'none';
            } else {
                it.isShowDanmu = false;
                it.$data.isShowLine = true;
                it.$el.querySelector('.danmuDiv').style.backgroundColor = "rgba(0,0,0,0)";
                it.$el.querySelector('.danmuDiv').style.border = '1px solid #fff';
            }
        },
        danmu: function (text = "或的方法反反复复凤飞飞") {
            var it = this;
            clearInterval(si);
            var videoDiv = document.getElementById("videoDiv");
            var textStyle = '<font id="textStyle" style="width:200px;">' + text + '</font>';
            console.log(videoDiv.offsetHeight)
            var mathHeight = Math.round(Math.random() * videoDiv.offsetHeight) + "px";
            var textLeft = videoDiv.offsetWidth + "px";
            videoDiv.innerHTML = textStyle;
            var textStyleObj = document.getElementById("textStyle");
            textStyleObj.style.left = textLeft;
            textStyleObj.style.top = mathHeight;
            var x = parseInt(textStyleObj.style.left);
            si = setInterval(function () {
                it.xuanhuan(x);
            }, 100);
        },
        xuanhuan: function (left) {
            var textStyleObj = document.getElementById("textStyle");
            textStyleObj.style.left = left;
            var x = parseInt(textStyleObj.style.left);
            if (x < textStyleObj.style.width) {
                document.getElementById("videoDiv").innerHTML = "";
                clearInterval(si);
            } else {
                x -= 18;
            }
            textStyleObj.style.left = x + "px";
        }
    }
};


</script>
