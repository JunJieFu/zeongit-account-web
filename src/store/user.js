import Vue from "vue"
import Vuex from "vuex"
import httpUtil from "../assets/script/util/http"
Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    info: null
  },
  mutations: {
    MSetInfo(state, info) {
      state.info = info
    }
  },
  actions: {
    ASendCode(context, params) {
      return httpUtil.post("/user/sendCode", params)
    },
    ASignUp(context, params) {
      return httpUtil.post("/user/signUp", params)
    },
    ASignIn(context, params) {
      return httpUtil.post("/user/signIn", params)
    },
    async AGetInfo(context, params) {
      const result = await httpUtil.get("/userInfo/get", params)
      context.commit("MSetInfo", result.data)
      return result
    },
    ASave(context, params) {
      return httpUtil.post("/userInfo/save", params)
    }
  }
}
