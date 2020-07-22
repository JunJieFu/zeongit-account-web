<template>
  <div class="page justify-center d-flex flex-column mx-auto">
    <div class="d-flex flex-column text-center my-6">
      <h1 class="title font-weight-black">个人信息</h1>
      <p class="desc">您在 Zeongit 服务中使用的基本信息，例如您的姓名和照片</p>
    </div>
    <v-card outlined>
      <v-card-title>
        个人资料
      </v-card-title>
      <v-card-subtitle>
        使用 Zeongit 服务的其他用户可能会看到部分信息。
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-list class="py-0 list">
        <v-list-item class="py-3">
          <label>头像</label>
          <span class="flex-grow-1 pr-3 ellipsis"
            >更改头像可帮助您个性化您的帐号</span
          >
          <avatar :info="info" size="60"></avatar>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="py-3">
          <label>背景墙</label>
          <span class="flex-grow-1 pr-3 ellipsis"
            >更改背景可帮助您个性化您的帐号</span
          >
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="py-3">
          <label>名称</label>
          <span class="flex-grow-1 pr-3 ellipsis">{{ info.nickname }}</span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="py-3">
          <label>生日</label>
          <span class="flex-grow-1 pr-3 ellipsis">{{
            info.birthday | date("YYYY-MM-DD")
          }}</span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="py-3">
          <label>性别</label>
          <span class="flex-grow-1 pr-3 ellipsis">{{
            $enum.Gender[info.gender].value
          }}</span>
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
          <span class="flex-grow-1 pr-3 ellipsis">
            {{ info.country }}
            {{ info.province }}
            {{ info.city }}
          </span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
      </v-list>
    </v-card>
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
@import "src/assets/style/config";

.page {
  max-width: $small-page-size;
}
.list {
  label {
    font-size: 0.6875rem;
    width: 15%;
  }
}
</style>
