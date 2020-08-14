import Vue from "vue"
import Vuex from "vuex"
import jsCookie from "js-cookie"
import { DOMAIN } from "@/plugins/zg/script/constant/config"
Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    info: null
  },
  mutations: {
    MSetInfo(state, info) {
      state.info = info
    },
    MSignOut() {
      jsCookie.remove("token", {
        domain: DOMAIN
      })
      window.app.$router.replace("/signIn")
    }
  }
}
