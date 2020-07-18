import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dayjs from 'dayjs'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// 导入全局样式文件
import './assets/stylus/index.styl'

import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

// 日期格式化过滤器
Vue.filter('formatDate', (date) => {
  return dayjs(Number(date)).format('MM/DD')
})
Vue.filter('formatDateTwo', (date) => {
  return dayjs(Number(date)).format('YYYY-MM-DD')
})
Vue.filter('formatDateThree', (date) => {
  return dayjs(Number(date)).format('MM-DD')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
