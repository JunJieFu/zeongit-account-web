<template>
  <v-main>
    <div class="page mx-auto align-sm-center pa-sm-4 d-flex fill-height">
      <router-view></router-view>
    </div>
  </v-main>
</template>

<script></script>

<!--suppress CssInvalidPseudoSelector -->
<style lang="scss" scoped>
@import "src/plugins/zg/style/config";

.page {
  max-width: $small-page-size;
  width: 100%;
  ::v-deep .link {
    line-height: 35px;
  }
}
</style>
