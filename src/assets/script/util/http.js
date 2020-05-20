/**
 * http请求的工具类
 *
 * @author fjj
 */
import jsCookies from "js-cookie"
import axios from "axios"
import qs from "qs"
import { Result } from "../model"
import config from "../constant/config"
axios.defaults.baseURL = config.host
// axios.defaults.baseURL = "/api"
export default {
  /**
   * get 请求
   * @param {string} url
   * @param {*?} params
   * @returns {Promise<>}
   */
  async get(url, params) {
    let result = null
    try {
      const response = await axios.get(url, {
        params
      })
      this._handleToken(response)
      result = response.data
    } catch (e) {
      result = await new Result(500, e, "服务器错误")
    }
    return result
  },

  /**
   * post 请求
   * @param {string} url
   * @param body
   * @param type
   * @returns {Promise<>}
   */
  async post(url, body, type = "json") {
    let result = null
    try {
      const response = await axios.post(
        url,
        type === "json"
          ? body
          : qs.stringify(body, {
              arrayFormat: "repeat"
            })
      )
      this._handleToken(response)
      result = response.data
    } catch (e) {
      result = await new Result(500, e, "服务器错误")
    }
    return result
  },

  _handleToken(response = {}) {
    const headers = response.headers || {}
    if (headers.token) {
      jsCookies.set("token", headers.token, { expires: 30 })
    }
    if (response.data.status === 401) {
      jsCookies.remove("token")
      window.app.$router.replace(`/signIn`)
    }
  }
}
