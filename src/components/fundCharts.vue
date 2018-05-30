<template>
    <div class="chart_area">
        <div id="capitalFlows" :style="'width:'+screenWidth+'px;height:'+screenHeigth+'px'"></div>
        <div id="capitalFlowsMain" :style="'width:'+screenWidth+'px;height:'+screenHeigth+'px'"></div>
    </div>
</template>
<script>
import Kline from '../services/KlineService'
import pieOptions from '../utils/echarts-pie'
import barOptions from '../utils/echarts-bar'
import echarts from 'echarts'
export default {
    data () {
        return {
            KlineService: new Kline,
            param: {
                code: window ? window.localStorage.getItem('code') : wx.getStorageSync('code'),
                name: window ? window.localStorage.getItem('name') : wx.getStorageSync('name')
            },
            screenWidth: 0,
            screenHeigth: 0
        }
    },
    methods: {
        async evaluated () {
            this.param.code = window ? window.localStorage.getItem('code') : wx.getStorageSync('code');
            this.param.name = window ? window.localStorage.getItem('name') : wx.getStorageSync('name');
        },
        init () {
            this.KlineService.getCapitalFlows(this.service, this.param).then(data => {
                var fundCanvas = echarts.init(document.getElementById('capitalFlows'))
                fundCanvas.setOption(pieOptions.setPieOption(data.data.message))
            })
            this.KlineService.getCapitalFlowsMain(this.service, this.param).then(data => {
                var fundMainCanvas = echarts.init(document.getElementById('capitalFlowsMain'))
                fundMainCanvas.setOption(barOptions.setBarOption(data.data.message))
            })
        },
        getScreenOptions () {
            this.service.getScreenOption().then(data => {
                this.screenWidth = data.screenWidth - 10;
                this.screenHeigth = 220;
            })
            this.service.scrollTop();
        },
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
.chart_area {
  margin-top: 10px;
}
</style>


