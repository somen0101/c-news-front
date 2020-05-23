import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSession from 'vue-session'
import vuetify from './plugins/vuetify'
import './plugins/dayjs'
import FlagIcon from 'vue-flag-icon'

Vue.use(FlagIcon)
Vue.use(VueSession)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
