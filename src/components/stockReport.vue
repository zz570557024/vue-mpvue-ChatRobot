<template>
    <div>
        <div v-if="news && news.length == 0" class="news-none">
            暂无相关内容
        </div>
        <div v-else class="news-list">
            <div class="list" ref="newsList">
                <scroller :on-refresh="refresh" :on-infinite="infinite" style="top: auto;word-break: break-all;" ref="scrollerVM">
                    <div class="list-item" v-for="(item, index) in news" :key="index" @click="newsDetail(item)">
                        <span class="news-title">{{item.title}}</span>
                        <span class="news-dt">{{item.dt}} {{item.auth}}</span>
                        <div v-if="item.pic" class="image-wrapper">
                            <img class="item-image" :src="item.pic" :alt="item.title">
                        </div>
                    </div>
                </scroller>
            </div>
        </div>
    </div>
</template>
<script>
import Kline from '../services/KlineService'
import store from '../vuex/store'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
export default {
    data () {
        return {
            KlineService: new Kline,
            pageParam: {
                code: window ? window.localStorage.getItem('code') : wx.getStorageSync('code'),
                page: 1,
                count: 20
            },
            news: [],
        }
    },
    methods: {
        async evaluated () {
            this.pageParam.code = window ? window.localStorage.getItem('code') : wx.getStorageSync('code');
            this.pageParam.name = window ? window.localStorage.getItem('name') : wx.getStorageSync('name');
        },
        async init () {
            await this.KlineService.getResearch(this.service, this.pageParam).then(data => {
                this.news = data.data.message;
            }).catch(err => { })
        },
        newsDetail (item) {
            store.commit('newsDetail', item, this.lineNum)
            this.service.navigatePageTo(this.router + '/pages/newsDetail/main')
        },
        infinite (done) {
            this.pageParam.count = this.pageParam.count + 10;
            this.init().then(data => {
                if (this.pageParam.count > this.news.length) {
                    done(true)
                } else {
                    done()
                }
            }).catch(err => {
                done(true)
            })

        },
        refresh (done) {
            this.pageParam.count = 20;
            this.init().then(data => {
                done()
                this.$refs.scrollerVM.finishInfinite()
            }).catch(err => {
                done(true)
            })
        }
    },
    created () {
        this.evaluated().then(data => {
            this.init()
        })
    }
}
</script>
<style>
.news-list {
  font-size: 14px;
}
.news-title {
  display: block;
  padding-top: 15px;
  line-height: 20px;
}
.news-dt {
  font-size: 12px;
  color: #999;
  float: right;
  margin-top: 10px;
}
</style>


