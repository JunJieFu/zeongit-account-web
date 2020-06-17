export default [
  {
    path: "/signIn",
    component: () => import("../SignIn")
  },
  {
    path: "/signUp",
    component: () => import("../SignUp")
  },
  {
    path: "/forgot",
    component: () => import("../Forgot")
  }
]
