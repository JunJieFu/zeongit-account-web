<template>
  <div class="page justify-center d-flex flex-column mx-auto">
    <div class="d-flex flex-column text-center my-6">
      <h1 class="title font-weight-black">应用中心</h1>
      <p class="desc">
        您在 Zeongit 可以使用的应用，您也可以基于该用户提供您的应用
      </p>
    </div>
    <v-card outlined>
      <v-card-title>
        个人资料
      </v-card-title>
      <v-card-subtitle>
        使用 Zeongit 服务的其他用户可能会看到部分信息。
      </v-card-subtitle>
      <v-list class="py-0 list">
        <v-divider></v-divider>
        <v-list-item class="py-3">
          <label>头像</label>
          <span class="flex-grow-1">更改头像可帮助您个性化您的帐号</span>
          <img
            src="../../assets/image/svg/default-head.svg"
            width="60"
            class="head-img"
          />
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="py-3">
          <label>名称</label>
          <span class="flex-grow-1 pr-3 ellipsis">{{ info.name }}</span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="py-3">
          <label>生日</label>
          <span class="flex-grow-1 pr-3 ellipsis">{{ info.birthday }}</span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="py-3">
          <label>性别</label>
          <span class="flex-grow-1 pr-3 ellipsis">{{ info.gender }}</span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="py-3">
          <label>个人签名</label>
          <span class="flex-grow-1 pr-3 ellipsis">{{ info.introduction }}</span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="py-3">
          <label>居住地址</label>
          <span class="flex-grow-1 pr-3 ellipsis">{{ info.introduction }}</span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex"

// function setTimeoutSync(wait) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve()
//     }, wait)
//   })
// }
export default {
  computed: {
    ...mapState("user", ["info"])
  },
  async beforeRouteEnter(to, from, next) {
    window.app.$store?.commit("menu/MUpdateProgress", true)

    window.app.$store?.commit("menu/MUpdateProgress", false)
    next((vm) => {
      console.log(vm)
    })
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/config";

.page {
  max-width: $small-page-size;
}
.list {
  label {
    font-size: 0.6875rem;
    width: 15%;
  }
  .head-img {
    border-radius: 50%;
  }
}
</style>
