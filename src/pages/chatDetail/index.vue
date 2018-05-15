<template>
    <div class="stock_info">
        <div>
            <div class="stock_msg" :class="{'font_red': stock.riseAndFallAmount>=0,'font_green': stock.riseAndFallAmount<0}">
                <span class="item stock_nMatch">{{stock.nMatch}}</span>
                <span class="item">
                    <span style="position:absolute">{{stock.riseAndFallAmount}}</span>
                    <span>{{stock.riseAndFallRate}}%</span>
                </span>
                <span class="item stock_name">
                    <span>{{stock.shrNm}}</span>
                    <span>{{stock.shrCd}}</span>
                </span>
            </div>
            <div class="flex-cell flex-row item font_gray">
                <span class="flex-cell flex-row item">今开</span>
                <span class="flex-cell flex-row item">昨收</span>
                <span class="flex-cell flex-row item">最高</span>
                <span class="flex-cell flex-row item">最低</span>
            </div>
            <div class="flex-cell flex-row item fb_5">
                <span class="flex-cell flex-row item">{{stock.nOpen}}</span>
                <span class="flex-cell flex-row item">{{stock.nPreClose}}</span>
                <span class="flex-cell flex-row item">{{stock.highestPrice}}</span>
                <span class="flex-cell flex-row item">{{stock.lowestPrice}}</span>
            </div>
            <div class="flex-cell flex-row item font_gray">
                <span class="flex-cell flex-row item">成交额</span>
                <span class="flex-cell flex-row item">收益率</span>
                <span class="flex-cell flex-row item">市盈率</span>
                <span class="flex-cell flex-row item">总市值</span>
            </div>
            <div class="flex-cell flex-row item fb_5">
                <span class="flex-cell flex-row item">{{iTurnover}}</span>
                <span class="flex-cell flex-row item">{{tun}}</span>
                <span class="flex-cell flex-row item">{{pe}}</span>
                <span class="flex-cell flex-row item">{{mktc}}</span>
            </div>
            <transition name="fade">
                <div v-if="detailShow">
                    <div class="flex-cell flex-row item font_gray">
                        <span class="flex-cell flex-row item">振幅</span>
                        <span class="flex-cell flex-row item">总股数</span>
                        <span class="flex-cell flex-row item">市净率</span>
                        <span class="flex-cell flex-row item">均价</span>
                    </div>
                    <div class="flex-cell flex-row item fb_5">
                        <span class="flex-cell flex-row item">{{stock.amplitude}}</span>
                        <span class="flex-cell flex-row item">{{total}}</span>
                        <span class="flex-cell flex-row item">{{ps}}</span>
                        <span class="flex-cell flex-row item">{{stock.priceAvg}}</span>
                    </div>
                    <div class="flex-cell flex-row item font_gray">
                        <span class="flex-cell flex-row item">成交量</span>
                        <span class="flex-cell flex-row item">涨停</span>
                        <span class="flex-cell flex-row item">跌停</span>
                        <span class="flex-cell flex-row item">流通市值</span>
                    </div>
                    <div class="flex-cell flex-row item fb_5">
                        <span class="flex-cell flex-row item">{{ivolume}}</span>
                        <span class="flex-cell flex-row item">{{stock.high}}</span>
                        <span class="flex-cell flex-row item">{{stock.low}}</span>
                        <span class="flex-cell flex-row item">{{tfc}}</span>
                    </div>
                </div>
            </transition>
            <div v-if="!detailShow" @click="detailShow = !detailShow" class="stock_detail">▼</div>
            <div v-if="detailShow" @click="detailShow = !detailShow" class="stock_detail">▲</div>
        </div>
        <div class="container Kline_scope">
            <div class="tab_title fb">
                <div :class="KlineTab==0?'tabselected':'tab'" @click="getKline(0)">分时</div>
                <div :class="KlineTab==4?'tabselected':'tab'" @click="getKline(4)">五日</div>
                <div :class="KlineTab==1?'tabselected':'tab'" @click="getKline(1)">日线</div>
                <div :class="KlineTab==2?'tabselected':'tab'" @click="getKline(2)">周线</div>
                <div :class="KlineTab==3?'tabselected':'tab'" @click="getKline(3)">月线</div>
            </div>
            <ec-canvas v-if="canvas&&KlineTab==0" class="canvas" id="mychart-dom-bar" canvas-id="mychart-bar0" :ec="ec"></ec-canvas>
            <ec-canvas v-if="canvas&&KlineTab==4" class="canvas" id="mychart-dom-bar" canvas-id="mychart-bar1" :ec="ec1"></ec-canvas>
            <ec-canvas v-if="canvas&&KlineTab==1" class="canvas" id="mychart-dom-bar" canvas-id="mychart-bar2" :ec="ec2"></ec-canvas>
            <ec-canvas v-if="canvas&&KlineTab==2" class="canvas" id="mychart-dom-bar" canvas-id="mychart-bar3" :ec="ec3"></ec-canvas>
            <ec-canvas v-if="canvas&&KlineTab==3" class="canvas" id="mychart-dom-bar" canvas-id="mychart-bar4" :ec="ec4"></ec-canvas>
            <div v-show="!canvas&&KlineTab==0" id="timeChart" :style="'width:'+screenWidth+'px;height:'+screenHeigth+'px'"></div>
            <div v-show="!canvas&&KlineTab==1" id="dailyChart" :style="'width:'+screenWidth+'px;height:'+screenHeigth+'px'"></div>
            <div v-show="!canvas&&KlineTab==2" id="weekChart" :style="'width:'+screenWidth+'px;height:'+screenHeigth+'px'"></div>
            <div v-show="!canvas&&KlineTab==3" id="mouthChart" :style="'width:'+screenWidth+'px;height:'+screenHeigth+'px'"></div>
            <div v-show="!canvas&&KlineTab==4" id="fiveDayChart" :style="'width:'+screenWidth+'px;height:'+screenHeigth+'px'"></div>
        </div>
        <div class="container news_List">
            <div class="tab_title fb">
                <div :class="lineNum==0?'tabselected':'tab'" @click="getNews(0)">新闻</div>
                <div :class="lineNum==1?'tabselected':'tab'" @click="getNews(1)">公告</div>
                <div :class="lineNum==2?'tabselected':'tab'" @click="getNews(2)">研报</div>
            </div>
            <div v-if="news && news.length == 0" class="news-none">
                暂无相关内容
            </div>
            <div v-else class="news-list">
                <div class="list" ref="newsList">
                    <div class="list-item" v-for="(item, index) in news" :key="index" v-if="type==='A'" @click="newsDetail(item)">
                        <span class="item-title" :style="{width: newsTitle}">{{item.title}}</span>
                        <div v-if="item.pic" class="image-wrapper">
                            <img class="item-image" :src="item.pic" :alt="item.title">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Kline from '../../services/KlineService'
import parserDate from '../../utils/stock-parser'
import store from '../../vuex/store'
import echarts from 'echarts'
import Util from '../../utils/util'
import timeDate from '../../utils/timeLineDate'

export default {
    name: "chatDetail",
    data () {
        return {
            ec: {
                options: '',
            },
            ec1: {
                options: '',
            },
            ec2: {
                options: '',
            },
            ec3: {
                options: '',
            },
            ec4: {
                options: '',
            },
            KlineService: new Kline,
            param: {
                code: window ? window.localStorage.getItem('code') : wx.getStorageSync('code'),
                name: window ? window.localStorage.getItem('name') : wx.getStorageSync('name')
            },
            update: store.state.stock.code,
            canvas: false,
            stock: {},
            news: [],
            lineNum: 0,
            type: 'A',
            Kline: '',
            KlineTab: 0,
            screenWidth: 0,
            screenHeigth: 0,
            newsTitle: '70%',
            detailShow: false
        }
    },
    computed: {
        iTurnover () {
            return Util.formatVolumn(this.stock.iTurnover)
        },
        tun () {
            return Util.formatSyl(this.stock.tun)
        },
        pe () {
            return Util.formatSyl(this.stock.pe)
        },
        mktc () {
            return Util.formatVolumn(this.stock.mktc)
        },
        total () {
            return Util.formatVolumn(this.stock.total)
        },
        ps () {
            return Util.formatSyl(this.stock.ps)
        },
        ivolume () {
            return Util.formatVolumn(this.stock.ivolume)
        },
        tfc () {
            return Util.formatVolumn(this.stock.tfc)
        }
    },
    methods: {
        async evaluated () {
            this.param.code = window ? window.localStorage.getItem('code') : wx.getStorageSync('code');
            this.param.name = window ? window.localStorage.getItem('name') : wx.getStorageSync('name');
        },
        stockMsg () {
            Promise.all([
                this.KlineService.stockRealTime(this.service, this.param),
                this.KlineService.getStockNews(this.service, this.param),
            ]).then(data => {
                this.stock = data[0].data.message;
                this.news = data[1].data.message;
            })
        },
        KlineMsg () {
            //异步请求K线
            try {
                this.KlineService.getTimeDate(this.service, this.param).then(data => {
                    this.echart(data, 'timeChart');
                });
                this.KlineService.getDailyDate(this.service, this.param).then(data => {
                    this.echart(data, 'dailyChart');
                });
                this.KlineService.getWeekData(this.service, this.param).then(data => {
                    this.echart(data, 'weekChart');
                });
                this.KlineService.getMouthDate(this.service, this.param).then(data => {
                    this.echart(data, 'mouthChart');
                });
                this.KlineService.getFiveData(this.service, this.param).then(data => {
                    this.echart(data, 'fiveDayChart');
                })
            }
            catch (err) {
                console.log('接口错误', err)
            }
        },
        echart (data, domId) {
            if (window) {
                if (domId == 'timeChart') {
                    var KlineCanvas = echarts.init(document.getElementById(domId))
                    KlineCanvas.setOption(timeDate.setOption(timeDate.parserDataDaily(data.data.message)))
                } else if (domId == 'fiveDayChart') {
                    var KlineCanvas = echarts.init(document.getElementById(domId))
                    KlineCanvas.setOption(timeDate.setOption(timeDate.parserDataWeek(data.data.message)))
                } else {
                    var KlineCanvas = echarts.init(document.getElementById(domId))
                    KlineCanvas.setOption(parserDate.methods.setOption(parserDate.methods.splitData(parserDate.methods.parseKData(data.data.message))))
                }
            } else {
                this.canvas = true;
                // if (domId == 'timeChart' || domId == 'fiveDayChart') {
                //     this.ec.options = timeDate.setOption(timeDate.parserData(data.data.message))
                // } else {
                //     this.ec.options = parserDate.methods.setOption(parserDate.methods.splitData(parserDate.methods.parseKData(data.data.message)))
                // }
                switch (domId) {
                    case 'timeChart':
                        this.ec.options = timeDate.setOption(timeDate.parserDataDaily(data.data.message))
                        break;
                    case 'fiveDayChart':
                        this.ec1.options = timeDate.setOption(timeDate.parserDataWeek(data.data.message))
                        break;
                    case 'dailyChart':
                        this.ec2.options = parserDate.methods.setOption(parserDate.methods.splitData(parserDate.methods.parseKData(data.data.message)))
                        break;
                    case 'weekChart':
                        this.ec3.options = parserDate.methods.setOption(parserDate.methods.splitData(parserDate.methods.parseKData(data.data.message)))
                        break;
                    case 'mouthChart':
                        this.ec4.options = parserDate.methods.setOption(parserDate.methods.splitData(parserDate.methods.parseKData(data.data.message)))
                        break;
                    default:
                        break;
                }
            }
        },
        newsDetail (item) {
            store.commit('newsDetail', item, this.lineNum)
            this.service.navigatePageTo(this.router + '/pages/newsDetail/main')
        },
        getNews (id) {
            switch (id) {
                case 0:
                    this.lineNum = 0;
                    this.news = [];
                    this.KlineService.getStockNews(this.service, this.param).then(data => {
                        this.news = data.data.message;
                        this.newsTitle = '70%';
                    }).catch(err => {
                        console.log('接口错误', err)
                    })
                    break;
                case 1:
                    this.lineNum = 1;
                    this.news = [];
                    this.KlineService.getStockNotices(this.service, this.param).then(data => {
                        this.news = data.data.message;
                        this.newsTitle = 'auto';
                    }).catch(err => {
                        console.log('接口错误', err)
                    })
                    break;
                case 2:
                    this.lineNum = 2;
                    this.news = [];
                    this.KlineService.getResearch(this.service, this.param).then(data => {
                        this.news = data.data.message;
                        this.newsTitle = 'auto';
                    }).catch(err => {
                        console.log('接口错误', err)
                    })
                    break;
                default:
                    break;
            }
        },
        getKline (id, domId) {
            this.KlineTab = id;
        },
        getScreenOptions () {
            this.service.getScreenOption().then(data => {
                this.screenWidth = data.screenWidth - 10;
                this.screenHeigth = 220;
            })
            this.service.scrollTop();
        }
    },
    mounted () {
        this.evaluated().then(data => {
            this.stockMsg();
            this.KlineMsg();
            this.getScreenOptions();
        });
    }
}
</script>
<style>
.Kline_scope {
  z-index: 1;
}
.font_red {
  color: red;
}
.font_green {
  color: green;
}
.font_gray {
  color: #666;
}
.fb_5 {
  font-weight: 500;
}
.stock_msg {
  text-align: center;
}
ec-canvas {
  width: 400px;
  height: 400px;
}
.news_List {
  position: relative;
  /* top: -130px; */
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  box-sizing: border-box;
  -webkit-user-select: none;
  user-select: none;
  width: 100%;
  overflow-x: hidden;
  /* font-size: 60px; */
}
.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
}
.flex-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
}
.flex-cell {
  flex: 1;
}
.item {
  margin: 2px;
}
.tab_title {
  text-align: center;
  width: auto;
  border: 1px solid #999;
  padding: 5px;
  border-radius: 10px;
  margin-bottom: 10px;
}
.tab {
  display: inline;
  margin: 10px 15px;
}
.tabselected {
  display: inline;
  margin: 10px 15px;
  color: #333;
  border-bottom: 2px solid #999;
}
.list {
  padding: 0;
}
.list-item {
  height: auto;
  margin: 0 15px;
  border-bottom: 1px solid #f5f5f5;
  width: 90%;
  padding-bottom: 10px;
}
.item-title {
  display: inline-block;
  padding-top: 15px;
  line-height: 20px;
}
.image-wrapper {
  float: right;
  padding-top: 15px;
}
.item-image {
  width: 75px;
  height: 60px;
}
.multipic {
  display: block;
  position: absolute;
  right: 0;
  bottom: 2px;
  width: 40px;
  height: 16px;
  font-size: 12px;
  color: #fff;
  background: #000;
  opacity: 0.7;
  text-align: center;
  line-height: 16px;
}
.news-none {
  text-align: center;
  padding: 30px;
}
.stock_info {
  font-size: 14px;
}
.stock_nMatch {
  font-size: 35px;
}
.stock_name {
  font-size: 18px;
  font-weight: bold;
  position: relative;
  top: -8px;
  left: 22px;
}
.stock_detail {
  width: 100%;
  text-align: center;
}
</style>


