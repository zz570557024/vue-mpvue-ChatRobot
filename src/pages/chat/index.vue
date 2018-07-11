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
                        <img class="chat-img userinfo-avatar" src="./../../../static/res/img/head_2.jpg" alt="userLogo">
                        <div class="chat_say">
                            <div class="chat_txt">{{item.word}}</div>
                        </div>
                    </div>
                    <div class="chat_word" v-if="item.position=='left'&&item.word.type=='sentence'">
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
                        <img class="chat-img userinfo-avatar" src="./../../../static/res/img/xiaogua.jpg" alt="liangLogo">
                        <div class="chat_say">
                            <div class="chat_list" v-for="($item,$index) in item.word.answer" :key="$index">
                                <div @click="getStockMsg($item)" :class="{'font_red': $item.inc>=0,'font_green': $item.inc<0}">
                                    <div class="label_name">{{$item.name}} （{{$item.code}}）</div>
                                    <span class="label_price">{{$item.price}}</span>
                                    <span class="label_inc">{{$item.inc}}% - {{$item.inc_value}}</span>
                                </div>
                            </div>
                            <div class="chat_attitude">
                                <span style="padding-right: 10px;" @click="chatAttitue(item, 0, index)">👍</span>
                                <span @click="chatAttitue(item, 1, index)">👎</span>
                            </div>
                        </div>
                    </div>
                    <div class="chat_word" v-if="item.position=='left'&&item.word.type=='form'">
                        <img class="chat-img userinfo-avatar" src="./../../../static/res/img/xiaogua.jpg" alt="liangLogo">
                        <div class="chat_say">
                            <div class="chat_list" v-if="item.word.answer.length != 0">
                                <div class="flex-cell flex-row listbgc">
                                    <span class="flex-cell flex-row item">股票名称</span>
                                    <span class="flex-cell flex-row item">最新价</span>
                                    <span class="flex-cell flex-row item">涨跌幅</span>
                                    <div class="flex-cell flex-row" v-if="item.word.indication_name.length>0" v-for="($item,$index) in item.word.indication_name" :key="$index">
                                        <span class="flex-cell flex-row item">{{$item}}</span>
                                    </div>
                                    <span class="flex-cell flex-row item" v-if="item.word.block_name.length>0">板块概念</span>
                                </div>
                                <div v-for="($item,$index) in item.word.answer" :key="$index">
                                    <div @click="getDetail($item)">
                                        <div class="flex-cell flex-row" :class="{'font_red': $item.inc>=0,'font_green': $item.inc<0}">
                                            <span class="flex-cell flex-row item">{{$item.name}}</span>
                                            <span class="flex-cell flex-row item">{{$item.price}}</span>
                                            <span class="flex-cell flex-row item">{{$item.inc}}</span>
                                            <div class="flex-cell flex-row" v-if="item.word.indication_name.length>0" v-for="($$item,$$index) in $item.indication_value" :key="$$index">
                                                <span class="flex-cell flex-row item">{{$$item|money}}</span>
                                            </div>
                                            <span class="flex-cell flex-row item" v-if="item.word.block_name.length>0">{{item.word.block_name[0]}}</span>
                                        </div>
                                    </div>
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
import store from '../../vuex/store';

export default {
    name: "chat",
    data () {
        return {
            chatService: new Chat(),
            chatList: [{
                position: 'left',
                word: {
                    answer: '你好，欢迎和我聊天，有什么可以帮助你的吗？',
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
            isQusList: true,
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
                console.log('data', data)
                let answer = {
                    position: 'left',
                    word: data.data.message,
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
            }, 20000)
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
                this.qusList = data.data.list;
            }).catch(err => {
                console.log('接口错误', err)
            })
        },
        getDetail (item) {
            store.commit('stockDetail', item)
            this.service.navigatePageTo(this.router + '/pages/chatDetail/main')
        },
        getStockMsg (item) {
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
        moreStock (index) {
            let qus = this.chatList[index - 1].word;
            this.service.navigatePageTo(this.router + '/pages/stockList/main?qus=' + qus)
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
@import "../../scss/chat.scss";
</style>