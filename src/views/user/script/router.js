export default [
  {
    path: "/",
    component: () => import("../Home")
  },
  {
    path: "/info",
    component: () => import("../Info")
  },
  {
    path: "/security",
    component: () => import("../Security")
  },
  {
    path: "/apps",
    component: () => import("../Apps")
  }
]
