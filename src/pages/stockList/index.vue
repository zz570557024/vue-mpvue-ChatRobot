<template>
    <div>
        <div class="header">
            <h1 class="title_list">{{word.substring(0, 20)}}</h1>
        </div>
        <div class='flex-cell flex-row list_title'>
            <div class='flex-cell flex-row'>股票名称(代码)</div>
            <div class='flex-cell flex-row'>最新价</div>
            <div class='flex-cell flex-row'>涨跌幅</div>
            <div class="flex-cell flex-row" v-if="stockMsg.indication_name.length>0" v-for="(item,index) in stockMsg.indication_name" :key="index">
                <span class="flex-cell flex-row">{{item}}</span>
            </div>
            <div class="flex-cell flex-row" v-if="stockMsg.block_name.length>0">板块概念</div>
        </div>
        <scroller :on-refresh="refresh" :on-infinite="infinite" style="top: auto;word-break: break-all;" ref="scrollerVM">
            <transition-group name="stockList" tag="p">
                <div class='flex-cell flex-row list_ctx' v-for="(item, index) in stockList" :key="index" @click="getDetail(item)" v-if="isList" :class="{'font_red': item.inc>=0,'font_green': item.inc<0}">
                    <div class='flex-cell flex-row'>{{item.name}}<br>（{{item.code}}）</div>
                    <div class='flex-cell flex-row fb'>{{item.price}}</div>
                    <div class='flex-cell flex-row'>{{item.inc}}</div>
                    <div class="flex-cell flex-row" v-if="stockMsg.indication_name.length>0" v-for="($item,$index) in item.indication_value" :key="$index">
                        <span class="flex-cell flex-row">{{$item|money}}</span>
                    </div>
                    <div class="flex-cell flex-row" v-if="stockMsg.block_name.length>0">{{stockMsg.block_name[0]}}</div>
                </div>
            </transition-group>
        </scroller>
    </div>
</template>
<script>
import Chat from '../../services/chatService'
import Kline from '../../services/KlineService'
import store from '../../vuex/store'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
export default {
    data () {
        return {
            KlineService: new Kline,
            chatService: new Chat,
            param: {
                type: '14901',
                sort: 2,
                size: 20
            },
            stockList: [],
            isList: true,
            word: this.$route.query.qus,
            stockMsg: {
                indication_name: [],
                block_name: []
            }
        }
    },
    methods: {
        init () {
            // this.KlineService.stockRatioRanking(this.service, this.param).then(data => {
            //     this.stockList = data.data.message;
            //     this.isList = true;
            //     this.service.scrollTop();
            // })
            this.pythonList()
        },
        async pythonList () {
            await this.chatService.getChatAnswer(this.service, this.word, 1, this.param.size).then(data => {
                this.stockList = data.data.answer;
                this.stockMsg = data.data;
                this.isList = true;
            })
        },
        getDetail (item) {
            let stock = {
                name: item.name,
                code: item.code
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
            this.param.size = this.param.size + 10;
            this.pythonList().then(data => {
                if (this.param.size > this.stockList.length) {
                    done(true)
                } else {
                    done()
                }
            }).catch(err => {
                done(true)
            })

        },
        refresh (done) {
            this.param.size = 20;
            this.pythonList().then(data => {
                done()
                this.$refs.scrollerVM.finishInfinite()
            }).catch(err => {
                done(true)
            })
        }
    },
    created () {
        this.pythonList();
        this.service.scrollTop();
    }

}
</script>
<style>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 1000;
  color: #666;
}
.header > .title_list {
  font-size: 16px;
  line-height: 44px;
  text-align: center;
  margin: 0 auto;
}
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
  margin-top: 45px;
  background-color: #fff;
  position: relative;
  z-index: 1;
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


