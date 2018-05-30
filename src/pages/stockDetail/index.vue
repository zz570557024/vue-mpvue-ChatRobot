<template>
    <div class="">
        <div class="tab_title fb stock_title">
            <div :class="lineNum==0?'stock_tabselected':'stock_tab'" @click="getStockItem(0)">上涨潜力</div>
            <div :class="lineNum==1?'stock_tabselected':'stock_tab'" @click="getStockItem(1)">市场热度</div>
            <div :class="lineNum==2?'stock_tabselected':'stock_tab'" @click="getStockItem(2)">主力强度</div>
            <!-- <div :class="lineNum==3?'stock_tabselected':'stock_tab'" @click="getStockItem(3)">走势分析</div> -->
            <div :class="lineNum==4?'stock_tabselected':'stock_tab'" @click="getStockItem(4)">价值评估</div>
            <div :class="lineNum==5?'stock_tabselected':'stock_tab'" @click="getStockItem(5)">牛人解读</div>
        </div>
        <div v-if="lineNum==0">
            <similarKline></similarKline>
        </div>
        <div v-if="lineNum==1||lineNum==5">
            <stockReport></stockReport>
        </div>
        <div v-if="lineNum==4">
            <stockRadar></stockRadar>
        </div>
        <div v-if="lineNum==2">
            <fundCharts></fundCharts>
        </div>
    </div>
</template>
<script>
import fundCharts from '../../components/fundCharts'
import similarKline from '../../components/similarKLine'
import stockReport from '../../components/stockReport'
import stockRadar from '../../components/stockRadar'
export default {
    data () {
        return {
            lineNum: 0
        }
    },
    components: {
        'fundCharts': fundCharts,
        'similarKline': similarKline,
        'stockReport': stockReport,
        'stockRadar': stockRadar
    },
    methods: {
        getStockItem (id) {
            this.lineNum = id;
        }
    }

}
</script>
<style>
.stock_title {
  overflow: scroll;
  display: -webkit-inline-box;
}
.stock_tab {
  margin: 10px 15px;
}
.stock_tabselected {
  margin: 10px 15px;
  color: red;
}
</style>


