<template>
  <div class="page mx-auto align-sm-center pa-sm-4 d-flex fill-height">
    <router-view></router-view>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
@import "src/assets/style/config";
.page {
  max-width: $small-page-size;
  width: 100%;
}
</style>
