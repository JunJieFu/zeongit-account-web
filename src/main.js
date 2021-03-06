import Vue from "vue"
import App from "./App.vue"

import router from "@/router"
import store from "@/store"

import vuetify from "@/plugins/vuetify"
import "@/plugins/zg/style/index.scss"
import "@/plugins/zg/style/variables.scss"
import "@/assets/style/cropper.scss"
import zg from "@/plugins/zg"
Vue.use(zg)

import _enum from "@/assets/script/constant/enum"
import * as constant from "@/assets/script/constant"
Vue.prototype.$enum = _enum
Vue.prototype.$constant = constant

Vue.config.productionTip = false
window.app = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app")

window.signInExceptionCallback = function() {
  location.reload()
}
