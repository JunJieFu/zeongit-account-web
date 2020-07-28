import Vue from "vue"
import VueRouter from "vue-router"
import jsCookie from "js-cookie"
import login from "@/views/login/script/router"
import user from "@/views/user/script/router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: () => import("@/views/Content"),
    children: [...user]
  },
  {
    path: "/",
    name: "login",
    component: () => import("@/views/Login"),
    children: [...login]
  },
  {
    path: "/*",
    redirect: "/"
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})
const loginPath = ["/signIn", "/signUp", "/forgot"]

router.beforeEach(async (to, from, next) => {
  const token = jsCookie.get("token")
  if (!token && !loginPath.includes(to.path)) {
    next("/signIn")
  } else if (token && loginPath.includes(to.path)) {
    next("/")
  } else {
    next() // 必须使用 next ,执行效果依赖 next 方法的调用参数
  }
})
export default router
