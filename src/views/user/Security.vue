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
      <v-list class="py-0 list">
        <v-divider></v-divider>
        <v-list-item class="py-3">
          <label>密码</label>
          <span class="flex-grow-1 pr-3 ellipsis">上次修改日期：</span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {}
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
