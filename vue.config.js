const path = require("path")
const resolve = (dir) => path.join(__dirname, dir)
module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Zeongit"
      return args
    })
    config.resolve.alias.set("@", resolve("src"))
  },
  transpileDependencies: ["vuetify"],
  devServer: {
    port: 12180, // 端口
    proxy: {
      "/api": {
        // 目标 API 地址
        target: "http://localhost:12080/",
        // 如果要代理 websockets
        ws: true,
        secure: false,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        pathRewrite: { "^/api": "/" }
      }
      // "/api": {
      //   // 目标 API 地址
      //   target: "http://account.zeongit.cn/",
      //   // 如果要代理 websockets
      //   ws: true,
      //   secure: false,
      //   // 将主机标头的原点更改为目标URL
      //   changeOrigin: true,
      //   pathRewrite: { "^/api": "/api" }
      // }
    }
  }
}
