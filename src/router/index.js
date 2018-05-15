import Vue from 'vue'
import Router from 'vue-router'
import Chat from '../pages/chat/index.vue'
import ChatDetail from '../pages/chatDetail/index.vue'
import newsDetail from '../pages/newsDetail/index.vue'
import stockList from '../pages/stockList/index.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: Chat,
  }, {
    path: '/chatDetail',
    name: 'chatDetail',
    component: ChatDetail,
    alias: '/pages/chatDetail/main'
  }, {
    path: '/newsDetail',
    name: 'newsDetail',
    component: newsDetail,
    alias: '/pages/newsDetail/main'
  }, {
    path: '/stockList',
    name: 'stockList',
    component: stockList,
    alias: '/pages/stockList/main'
  }]
})
