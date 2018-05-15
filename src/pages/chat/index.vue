<template>
    <div class="container">
        <div class="qus_area">
            <div class="title">你可以这样问我:</div>
            <div class="qusUl">
                <transition-group name="list" tag="p">
                    <div v-for="(item,index) in qusList" :key="index" class="qusItem" @click="getAnswer(item)" v-if="isQusList">
                        <div>{{item}}</div>
                    </div>
                </transition-group>
            </div>
            <button class="changeQusBtn" @click="getQuestion">换一换</button>
        </div>
        <div class="chat_area">
            <transition-group name="chatList" tag="p">
                <div class="chat_li" v-for="(item,index) in chatList" :key="index">
                    <div class="chat_time">{{item.dateTime}}</div>
                    <div class="chat_word chat_qus" v-if="item.position=='right'">
                        <!-- <div class="chat-img userinfo-avatar">😍</div> -->
                        <img class="chat-img userinfo-avatar" src="./../../../static/res/img/xiaogua.png" alt="userLogo">
                        <div class="chat_say">
                            <div class="chat_txt">{{item.word}}</div>
                        </div>
                    </div>
                    <div class="chat_word" v-if="item.position=='left'&&item.word.type=='sentence'">
                        <!-- <div class="chat-img userinfo-avatar">😝</div> -->
                        <img class="chat-img userinfo-avatar" src="./../../../static/res/img/xiaogua.jpg" alt="liangLogo">
                        <div class="chat_say">
                            <div class="chat_txt">{{item.word.answer}}</div>
                            <div class="chat_attitude">
                                <span style="padding-right: 10px" @click="chatAttitue(item, 0, index)">👍</span>
                                <span @click="chatAttitue(item, 1, index)">👎</span>
                            </div>
                        </div>
                    </div>
                    <div class="chat_word" v-if="item.position=='left'&&item.word.type=='label'">
                        <!-- <div class="chat-img userinfo-avatar">😡</div> -->
                        <img class="chat-img userinfo-avatar" src="./../../../static/res/img/xiaogua.jpg" alt="liangLogo">
                        <div class="chat_say">
                            <div class="chat_list" v-for="($item,$index) in item.word.answer" :key="$index">
                                <div @click="getDetail($item)">
                                    <div class="label_name">{{$item.name}} （{{$item.code}}）</div>
                                    <span class="label_price">{{$item.price}}</span>
                                    <span class="label_inc">{{$item.inc}} {{$item.inc_value}}</span>
                                </div>
                            </div>
                            <div class="chat_attitude">
                                <span style="padding-right: 10px;" @click="chatAttitue(item, 0, index)">👍</span>
                                <span @click="chatAttitue(item, 1, index)">👎</span>
                            </div>
                        </div>
                    </div>
                    <div class="chat_word" v-if="item.position=='left'&&item.word.type=='form'">
                        <!-- <div class="chat-img userinfo-avatar">🐷</div> -->
                        <img class="chat-img userinfo-avatar" src="./../../../static/res/img/xiaogua.jpg" alt="liangLogo">
                        <div class="chat_say">
                            <div class="chat_list" v-if="item.word.answer.length != 0">
                                <div class="flex-cell flex-row listbgc">
                                    <span class="flex-cell flex-row item">股票名称</span>
                                    <span class="flex-cell flex-row item">最新价</span>
                                    <span class="flex-cell flex-row item">涨跌幅</span>
                                    <span class="flex-cell flex-row item" v-if="item.word.answer[0].indication">{{item.word.answer[0].indication_name}}</span>
                                    <span class="flex-cell flex-row item" v-if="item.word.answer[0].block">板块概念</span>
                                </div>
                                <div v-for="($item,$index) in item.word.answer" :key="$index">
                                    <div @click="getDetail($item)">
                                        <div class="flex-cell flex-row" :class="{'font_red': $item.inc>=0,'font_green': $item.inc<0}">
                                            <span class="flex-cell flex-row item" v-if="$item.name">{{$item.name}}</span>
                                            <span class="flex-cell flex-row item" v-if="$item.price">{{$item.price}}</span>
                                            <span class="flex-cell flex-row item" v-if="$item.inc">{{$item.inc}}</span>
                                            <span class="flex-cell flex-row item" v-if="$item.indication">{{$item.indication}}</span>
                                            <span class="flex-cell flex-row item" v-if="$item.block">{{$item.block}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="more_message">
                                    <a :href="router + '/pages/stockList/main'" style="color:#000;text-decoration:none">更多股票信息</a>
                                </div>
                            </div>
                            <div class="chat_say" v-else>
                                <div class="chat_txt">暂无相关信息</div>
                            </div>
                            <div class="chat_attitude">
                                <span style="padding-right: 10px;" @click="chatAttitue(item, 0, index)">👍</span>
                                <span @click="chatAttitue(item, 1, index)">👎</span>
                            </div>
                        </div>
                    </div>
                </div>
            </transition-group>
        </div>
        <transition name="fade">
            <div class="footer" v-show="isInput">
                <div class="foot">
                    <!-- <input type="file" accept="audio/*" capture="microphone" class="inputFile" placeholder="录音" @change="upload"> -->
                    <div class="foot_input">
                        <input placeholder='请输入问题' type='text' x-webkit-speech=”x-webkit-speech” v-model="question" class="inputBox" @keyup="qusCtx(question)" @change="qusCtx(question)" />
                    </div>
                    <button @click="getAnswer(question)" class="foot_btn" v-show="sendBtn">发送</button>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import Chat from '../../services/chatService'
import util from '../../utils/util'
import { setTimeout } from 'timers';
import store from '../../vuex/store'
export default {
    name: "chat",
    data () {
        return {
            chatService: new Chat(),
            chatList: [{
                position: 'left',
                word: {
                    answer: '你好，我是选股神器，你可以询问我股票相关的问题，还有更多其他功能等你发现。',
                    type: 'sentence'
                },
                type: 1,
                dateTime: util.nowDate('yyyy-mm-dd hh:mm:ss')
            }],
            question: '',
            userInfo: {},
            height: '',
            isInput: true,
            qusList: [],
            sendBtn: false,
            isQusList: true
        }
    },
    methods: {
        getAnswer (word) {
            this.isInput = false;
            let question = {
                position: 'right',
                word: word,
                type: 1,
                dateTime: util.nowDate('yyyy-mm-dd hh:mm:ss')
            }
            this.service.pageScrollTo();
            this.chatList.push(question)
            this.chatService.getChatAnswer(this.service, word).then(data => {
                let answer = {
                    position: 'left',
                    word: data.data,
                    type: 1,
                    dateTime: util.nowDate('yyyy-mm-dd hh:mm:ss')
                }
                this.chatList.push(answer)
                setTimeout(() => {
                    this.service.pageScrollTo().then(data => {
                        setTimeout(() => {
                            this.isInput = true;
                        }, 500)
                    })
                }, 100);
                this.question = ''
            }).catch(err => {
                console.log('接口错误', err)
            })
        },
        autoReload () {
            setTimeout(() => {
                this.getQuestion()
                this.autoReload()
            }, 10000)
        },
        getUserInfo () {
            this.service.getUserInfo().then(data => {
                this.userInfo = data.userInfo;
            })
        },
        getQuestion () {
            this.isQusList = false;
            this.chatService.getChatQus(this.service).then(data => {
                this.isQusList = true;
                this.qusList = data.data.questions;
            }).catch(err => {
                console.log('接口错误', err)
            })
        },
        getDetail (item) {
            store.commit('stockDetail', item)
            this.service.navigatePageTo(this.router + '/pages/chatDetail/main')
        },
        qusCtx (ctx) {
            if (ctx != '') {
                this.sendBtn = true;
            } else {
                this.sendBtn = false;
            }
        },
        chatAttitue (item, att, index) {
            let data = {
                question: index >= 1 ? this.chatList[index - 1].word : '',
                answer: typeof (item.word.answer) == 'string' ? item.word.answer : JSON.stringify(item.word.answer),
                evaluation: att
            }
            this.chatService.getChatEvaluation(this.service, data).then(data => {
                alert('反馈成功')
            })
        },
        upload (event) {
            console.log('record', event)
            let file = event.target.files[0];
        }
    },
    created () {
        this.getUserInfo()
        this.getQuestion()
        this.autoReload()
    }
}

</script>
<style>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.chatList-item {
  display: inline-block;
  margin-right: 10px;
}
.chatList-enter-active,
.chatList-leave-active {
  transition: all 1s;
}
.chatList-enter,
.chatList-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.bgc {
  /* background-color: #fff; */
  border: #dbdbea 0.5px solid;
  padding: 10px;
  border-radius: 5px;
}
.listbgc {
  border-bottom: #dbdbea 0.5px solid;
  margin-top: 5px;
  margin-bottom: 5px;
}
.item {
  margin: 2px;
}
.counter-warp {
  height: -webkit-fill-available;
}
.qus_area {
  text-align: center;
  position: relative;
  top: 0;
}
.title {
  color: red;
  font-weight: bold;
}
.qusItem {
  padding: 5px 0;
}
.qusUl {
  margin: 10px;
}
.foot {
  padding: 0 13px;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.foot_input {
  margin-right: 9px;
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #e0e0e0;
}
.inputBox {
  display: block;
  width: 90%;
  padding: 0 10px;
  line-height: 30px;
  height: 30px;
  border: 0;
  background: none;
  font-size: 16px;
  color: #000;
  /* border-bottom: 0.5px solid #e0e0e0; */
}
.foot_btn {
  width: 70px;
  height: 38px;
  margin-right: 0px;
  line-height: 36px;
  background-color: #228b22;
  color: #fff;
  border-radius: 10px;
}
.footer {
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 100%;
  background-color: #fff;
}
.chat_area {
  padding-top: 10px;
  padding-bottom: 55px;
  top: 0px;
  /* margin-right: 15px;
  margin-left: 15px; */
  position: relative;
}
.chat_li {
  list-style: none;
  width: 100%;
}
.chat_word {
  display: flex;
  width: 100%;
  -webkit-box-pack: start;
  justify-content: flex-start;
  margin-bottom: 13px;
  position: relative;
}
.chat_qus {
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: reverse;
  flex-direction: row-reverse;
}
.chat-img {
  display: block;
  width: 44px;
  height: 44px;
  border-radius: 50%;
}
.chat_say {
  position: relative;
}
.chat_txt {
  margin-left: 16px;
  margin-right: 16px;
  max-width: 250px;
  background: #9fe658;
  padding: 11px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  line-height: 21px;
  word-break: break-all;
}
.chat_list {
  margin-left: 16px;
  margin-right: 16px;
  background: #fff;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 12px;
  color: #333;
  line-height: 21px;
  word-break: break-all;
  width: 95%;
}
button {
  font-size: 14px;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 100px 0;
  box-sizing: border-box;
  -webkit-user-select: none;
  user-select: none;
  width: 100%;
  overflow-x: hidden;
  /* font-size: 60px; */
}
.chat_table {
  font-size: 14px;
}
.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  text-align: center;
}
.flex-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  text-align: center;
}

.flex-cell {
  flex: 1;
}

.changeQusBtn {
  border: 1px solid #999;
  padding: 8px;
  border-radius: 10px;
  line-height: 15px;
  width: 90px;
  background-color: #fff;
}
.label_name {
  width: 100%;
  margin-bottom: 10px;
}
.label_price {
  font-size: 20px;
  color: red;
  margin-right: 20px;
}
.chat_time {
  font-size: 12px;
  text-align: center;
  margin-bottom: 10px;
  margin-top: 5px;
  color: #999;
}
.chat_attitude {
  font-size: 12px;
  float: left;
  margin-left: 20px;
  margin-top: 5px;
}
.more_message {
  width: 100%;
  text-align: center;
  border-top: 1px solid #dbdbea;
  padding-top: 10px;
  margin-top: 5px;
}

/* .upload {
  position: relative;
  left: 10px;
  display: block;
  width: 28.2px;
  height: 7.2px;
  border-radius: 50%;
  font-size: 0;
  background-color: transparent;
} */
.inputFile {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-block;
  opacity: 0;
  cursor: pointer;
  position: relative;
}
</style>
