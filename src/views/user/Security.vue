<template>
  <div class="page justify-center d-flex flex-column mx-auto">
    <div class="d-flex flex-column text-center my-6">
      <h1 class="title font-weight-black">安全性</h1>
      <p class="desc">有助于确保您帐号安全的设置和建议</p>
    </div>
    <v-card outlined>
      <v-card-title>
        发现安全性问题
      </v-card-title>
      <v-card-subtitle>
        立即解决这些问题，保护您的帐号
      </v-card-subtitle>
      <v-list class="py-0 card-list">
        <v-divider></v-divider>
        <v-list-item class="py-3">
          <label>密码</label>
          <span class="flex-grow-1 pr-3 ellipsis"
            >上次修改日期：{{ date | date("YYYY-MM-DD") }}</span
          >
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { userInfoService } from "@/assets/script/service"

export default {
  created() {
    this.init()
  },
  data() {
    return {
      date: undefined
    }
  },
  methods: {
    init() {
      this.getModifiedPasswordDate()
    },
    async getModifiedPasswordDate() {
      const result = await userInfoService.getModifiedPasswordDate()
      this.date = result.data
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/plugins/zg/style/config";
.page {
  max-width: $small-page-size;
}
</style>
