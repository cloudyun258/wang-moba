import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'nprogress/nprogress.css' 
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'

// 引入全局样式文件
import '@/assets/stylus/reset.styl'
import '@/assets/stylus/transition.styl'
import '@/assets/stylus/common.styl'


Vue.use(ElementUI)

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
