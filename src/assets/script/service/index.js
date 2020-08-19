import httpUtil from "@/plugins/zg/script/util/http"

export const userService = {
  sendCode(params) {
    return httpUtil.post("/user/sendCode", params)
  },
  signUp(params) {
    return httpUtil.post("/user/signUp", params)
  },
  signIn(params) {
    return httpUtil.post("/user/signIn", params)
  },
  forgot(params) {
    return httpUtil.post("/user/forgot", params)
  },
  modified(params) {
    return httpUtil.post("/user/modified", params)
  }
}

export const userInfoService = {
  get() {
    return httpUtil.get("/userInfo/get")
  },
  save(params) {
    return httpUtil.post("/userInfo/save", params)
  },
  modified(params) {
    return httpUtil.post("/userInfo/save", params)
  },
  modifiedAvatarUrl(params) {
    return httpUtil.post("/userInfo/modifiedAvatarUrl", params)
  },
  modifiedBackground(params) {
    return httpUtil.post("/userInfo/modifiedBackground", params)
  },
  getModifiedPasswordDate() {
    return httpUtil.get("/userInfo/getModifiedPasswordDate")
  }
}

export const qiniuService = {
  get() {
    return httpUtil.get("/qiniu/get")
  }
}
