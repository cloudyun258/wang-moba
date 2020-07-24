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

// 全局日期格式化过滤器
Vue.filter('formatDate', (date, format) => {
  return dayjs(Number(date)).format(format)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
