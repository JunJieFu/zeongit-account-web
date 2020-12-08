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
  update(params) {
    return httpUtil.post("/user/update", params)
  }
}

export const userInfoService = {
  get() {
    return httpUtil.get("/userInfo/get")
  },
  save(params) {
    return httpUtil.post("/userInfo/save", params)
  },
  update(params) {
    return httpUtil.post("/userInfo/save", params)
  },
  updateAvatarUrl(params) {
    return httpUtil.post("/userInfo/updateAvatarUrl", params)
  },
  updateBackground(params) {
    return httpUtil.post("/userInfo/updateBackground", params)
  },
  getUpdatePasswordDate() {
    return httpUtil.get("/userInfo/getUpdatePasswordDate")
  }
}

export const qiniuService = {
  get() {
    return httpUtil.get("/qiniu/get")
  }
}
