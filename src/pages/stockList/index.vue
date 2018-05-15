<template>
    <div>
        <div class='flex-cell flex-row list_title'>
            <div class='flex-cell flex-row'>股票名称(代码)</div>
            <div class='flex-cell flex-row'>最新价</div>
            <div class='flex-cell flex-row' @click="listSort">涨跌幅
                <span v-if="param.sort==2">▲</span>
                <span v-else>▼</span>
            </div>
        </div>
        <scroller :on-refresh="refresh" :on-infinite="infinite" style="margin-top: 50px;">
            <transition-group name="stockList" tag="p">
                <div class='flex-cell flex-row list_ctx' v-for="(item, index) in stockList" :key="index" @click="getDetail(item)" v-if="isList">
                    <div class='flex-cell flex-row'>{{item.name}}<br>（{{item.tick}}）</div>
                    <div class='flex-cell flex-row fb'>{{item.price}}</div>
                    <div class='flex-cell flex-row' :class="{'font_red': item.ratio>=0,'font_green': item.ratio<0}">{{item.ratio}}</div>
                </div>
            </transition-group>
        </scroller>
    </div>
</template>
<script>
import Kline from '../../services/KlineService'
import store from '../../vuex/store'
// import VueScroller from 'vue-scroller'
// Vue.use(VueScroller)
export default {
    data () {
        return {
            KlineService: new Kline,
            param: {
                type: '14901',
                sort: 2,
                size: 20
            },
            stockList: [],
            isList: true
        }
    },
    methods: {
        init () {
            this.KlineService.stockRatioRanking(this.service, this.param).then(data => {
                this.stockList = data.data.message;
                this.isList = true;
                this.service.scrollTop();
            }).catch(err => {
                console.log('接口错误', err)
            })
        },
        getDetail (item) {
            let stock = {
                name: item.name,
                code: item.tick
            }
            store.commit('stockDetail', stock)
            this.service.navigatePageTo(this.router + '/pages/chatDetail/main')
        },
        listSort () {
            this.isList = false;
            this.param.size = 20;
            this.param.sort == 1 ? this.param.sort = 2 : this.param.sort = 1;
            this.init();
        },
        infinite (done) {
            this.param.size = this.param.size + 5;
            this.init();
            done()
        },
        refresh (done) {
            this.param.size = 20;
            this.init();
            done()
        }
    },
    created () {
        this.init()
    }

}
</script>
<style>
.stockList-item {
  display: inline-block;
  margin-right: 10px;
}
.stockList-enter-active,
.stockList-leave-active {
  transition: all 1s;
}
.stockList-enter,
.stockList-leave-to {
  opacity: 0;
  transform: translateY(30px);
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
.list_title {
  border-bottom: 1px solid #999;
  padding: 10px 5px;
  font-size: 14px;
}
.list_ctx {
  padding: 5px 5px;
  font-size: 14px;
  border-bottom: 1px solid #dbdbea;
}
.list_more {
  width: 100%;
  text-align: center;
  font-size: 14px;
}
.fb {
  font-weight: bolder;
}
.font_red {
  color: red;
}
.font_green {
  color: green;
}
</style>


