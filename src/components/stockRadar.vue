<template>
    <div class="chart_area">
        <div id="stockRadar" :style="'width:'+screenWidth+'px;height:'+screenHeigth+'px'" class="stock-radar"></div>
    </div>
</template>
<script>
import echarts from 'echarts'
import radarOptions from '../utils/echarts-radar'
export default {
    data () {
        return {
            screenWidth: 0,
            screenHeigth: 0
        }
    },
    methods: {
        async getScreenOptions () {
            await this.service.getScreenOption().then(data => {
                this.screenWidth = data.screenWidth - 10;
                this.screenHeigth = 300;
            })
            await this.service.scrollTop();
        },
        init () {
            var stockRadar = echarts.init(document.getElementById('stockRadar'))
            stockRadar.setOption(radarOptions.setOptions())
        }
    },
    mounted () {
        this.getScreenOptions().then(data => {
            this.init()
        })
    }

}
</script>
<style>
.stock-radar {
  left: 35px;
}
</style>

