import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSession from 'vue-session'
import vuetify from './plugins/vuetify'
import './plugins/dayjs'
import FlagIcon from 'vue-flag-icon'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBookmarkSolid, faBookmarkRegular)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

Vue.use(FlagIcon)
Vue.use(VueSession)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
