import httpUtil from "../util/http"

export const userService = {
  sendCode(params) {
    return httpUtil.post("/user/sendCode", params)
  },
  signUp(params) {
    return httpUtil.post("/user/signUp", params)
  },
  signIn(params) {
    return httpUtil.post("/user/signIn", params)
  }
}

export const userInfoService = {
  get() {
    return httpUtil.get("/userInfo/get")
  },
  save(params) {
    return httpUtil.post("/userInfo/save", params)
  },
  getModifiedPasswordDate() {
    return httpUtil.get("/userInfo/getModifiedPasswordDate")
  }
}
