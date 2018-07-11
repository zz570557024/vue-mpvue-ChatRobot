<template>
    <div>
        <div class="news_title">{{news.title}}</div>
        <div class="news_wrap">
            <span class="news_auth">{{news.auth}}</span>
            <span class="news_date">{{news.date}}</span>
        </div>
        <div class="news_detail">{{news.detail}}</div>
        <a v-if="news.type == 1&& !wxShow" :href="news.url" type="application/pdf" target="_blank" class="news_link">点击浏览原文</a>
        <a v-else :href="news.url" class="news_link" @click="openPDF">点击浏览</a>

    </div>
</template>
<script>
import { mapState } from "vuex";
import store from '../../vuex/store';
export default {
    data () {
        return {
            news: store.state.news,
            wxShow: false
        }
    },
    // computed: {
    //     ...mapState(['news'])
    // },
    methods: {
        init () {
            if (window) {
                this.wxShow = false;
            } else {
                this.wxShow = true;
            }
            this.service.scrollTop();
        },
        openPDF () {
            this.service.downloadFile(this.news.url)
        }
    },
    created () {
        this.init();
    }
}
</script>
<style>
@import "../../scss/newsDetail.scss";
</style>


