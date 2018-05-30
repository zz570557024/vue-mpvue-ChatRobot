<template>
    <div>
        <div class="tab_title fb similarK">
            <div :class="KlineTab?'tabselected':'tab'" @click="KlineTab=true">30天走势分析</div>
            <div :class="!KlineTab?'tabselected':'tab'" @click="KlineTab=false">60天走势分析</div>
        </div>
        <div v-show="KlineTab">
            <div id="stkKLine" :style="'width:'+screenWidth+'px;height:'+screenHeigth+'px'"></div>
            <div v-if="mostSimilarKLine" class="similar_title">走势最相似的个股</div>
            <div v-if="mostSimilarKLine" id="mostSimilarKLine" :style="'width:'+screenWidth+'px;height:'+screenHeigth+'px'"></div>
            <div v-if="mostSimilarHistoryKLine" class="similar_title">最相似的历史走势</div>
            <div v-if="mostSimilarHistoryKLine" id="mostSimilarHistoryKLine" :style="'width:'+screenWidth+'px;height:'+screenHeigth+'px'"></div>
        </div>
        <div v-show="!KlineTab">
            <div id="stkKLine60" :style="'width:'+screenWidth+'px;height:'+screenHeigth+'px'"></div>
            <div v-if="mostSimilarKLine60" class="similar_title">走势最相似的个股</div>
            <div v-if="mostSimilarKLine60" id="mostSimilarKLine60" :style="'width:'+screenWidth+'px;height:'+screenHeigth+'px'"></div>
            <div v-if="mostSimilarHistoryKLine60" class="similar_title">最相似的历史走势</div>
            <div v-if="mostSimilarHistoryKLine60" id="mostSimilarHistoryKLine60" :style="'width:'+screenWidth+'px;height:'+screenHeigth+'px'"></div>
        </div>
    </div>
</template>
<script>
import Kline from '../services/KlineService'
import echarts from 'echarts'
import parserDate from '../utils/echarts-SKline'
export default {
    data () {
        return {
            KlineService: new Kline,
            param: {
                code: window ? window.localStorage.getItem('code') : wx.getStorageSync('code'),
                trdDyNum: 30
            },
            screenWidth: 0,
            screenHeigth: 0,
            KlineTab: true,
            mostSimilarHistoryKLine: true,
            mostSimilarKLine: true,
            mostSimilarHistoryKLine60: true,
            mostSimilarKLine60: true,
            stkKLine: true
        }
    },
    methods: {
        async evaluated () {
            this.param.code = window ? window.localStorage.getItem('code') : wx.getStorageSync('code');
        },
        getScreenOptions () {
            this.service.getScreenOption().then(data => {
                this.screenWidth = data.screenWidth - 10;
                this.screenHeigth = 220;
            })
            this.service.scrollTop();
        },
        init () {
            this.KlineService.getSimilarKLine(this.service, this.param).then(data => {
                if (data.data.stkKLine) {
                    var KlineCanvas = echarts.init(document.getElementById('stkKLine'))
                    KlineCanvas.setOption(parserDate.methods.setOption(parserDate.methods.splitData(parserDate.methods.parseKData(this.addEmpty(data.data.stkKLine.list))), data.data.stkKLine))
                } else {
                    this.stkKLine = false;
                }
                if (data.data.mostSimilarKLine) {
                    var mostSimilarKLine = echarts.init(document.getElementById('mostSimilarKLine'))
                    mostSimilarKLine.setOption(parserDate.methods.setOption(parserDate.methods.splitData(parserDate.methods.parseKData(data.data.mostSimilarKLine.list)), data.data.mostSimilarKLine))
                } else {
                    this.mostSimilarKLine = false;
                }
                if (data.data.mostSimilarHistoryKLine) {
                    console.log('1')
                    var mostSimilarHistoryKLine = echarts.init(document.getElementById('mostSimilarHistoryKLine'))
                    mostSimilarHistoryKLine.setOption(parserDate.methods.setOption(parserDate.methods.splitData(parserDate.methods.parseKData(data.data.mostSimilarHistoryKLine.list)), data.data.mostSimilarHistoryKLine))
                } else {
                    console.log('2')
                    this.mostSimilarHistoryKLine = false;
                }
            })
            this.param.trdDyNum = 60;
            this.KlineService.getSimilarKLine(this.service, this.param).then(data => {
                if (data.data.stkKLine) {
                    var KlineCanvas = echarts.init(document.getElementById('stkKLine60'))
                    KlineCanvas.setOption(parserDate.methods.setOption(parserDate.methods.splitData(parserDate.methods.parseKData(this.addEmpty(data.data.stkKLine.list))), data.data.stkKLine))
                } else {
                    this.stkKLine = false;
                }
                if (data.data.mostSimilarKLine) {
                    var mostSimilarKLine = echarts.init(document.getElementById('mostSimilarKLine60'))
                    mostSimilarKLine.setOption(parserDate.methods.setOption(parserDate.methods.splitData(parserDate.methods.parseKData(data.data.mostSimilarKLine.list)), data.data.mostSimilarKLine))
                } else {
                    this.mostSimilarKLine60 = false;
                }
                if (data.data.mostSimilarHistoryKLine) {
                    var mostSimilarHistoryKLine = echarts.init(document.getElementById('mostSimilarHistoryKLine60'))
                    mostSimilarHistoryKLine.setOption(parserDate.methods.setOption(parserDate.methods.splitData(parserDate.methods.parseKData(data.data.mostSimilarHistoryKLine.list)), data.data.mostSimilarHistoryKLine))
                } else {
                    this.mostSimilarHistoryKLine60 = false;
                }
            })
        },
        addEmpty (arr) {
            for (let i = 0; i < 20; i++) {
                arr.push({})
            }
            return arr
        }
    },
    mounted () {
        this.evaluated().then(data => {
            this.getScreenOptions();
            this.init();
        })
    }

}
</script>
<style>
.similarK {
  border-top: none;
  margin-bottom: 20px;
}
.similar_title {
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  padding: 20px;
  width: 100%;
}
</style>

