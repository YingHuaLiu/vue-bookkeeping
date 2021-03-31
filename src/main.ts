import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router/router'
import store from './store'
import Nav from '@/components/Nav.vue'
import Icon from '@/components/Icon.vue'
import '@/plugins/vant.ts'
import '@/plugins/antd.ts'

Vue.config.productionTip = false
Vue.component('Nav', Nav)
Vue.component('Icon', Icon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
