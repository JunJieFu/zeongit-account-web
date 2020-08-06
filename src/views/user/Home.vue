<template>
  <div class="page justify-center d-flex flex-column mx-auto">
    <div class="d-flex flex-column text-center my-6">
      <h1 class="title font-weight-black">欢迎使用，{{ info.nickname }}</h1>
      <p>
        管理自己的信息、隐私权和安全，从而让 Zeongit 更好地为您服务
      </p>
    </div>
    <v-row class="ma-0" justify="center" align="center">
      <v-col cols="12" sm="12" md="12" lg="12" xl="12">
        <v-card :elevation="0" class="mt-12 pt-12" color="transparent">
          <v-card-title class="justify-center">
            <v-icon size="100">mdi-home-outline</v-icon>
          </v-card-title>
          <v-card-title class="justify-center">没有首页</v-card-title>
          <v-card-text class="text-center">
            作者很懒，不想写，或许以后会加上，未完待续...
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  computed: {
    ...mapState("user", ["info"])
  }
}
</script>

<style lang="scss" scoped>
@import "src/plugins/zg/style/config";

.page {
  max-width: $small-page-size;
}
</style>
