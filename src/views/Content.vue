<template>
  <div v-if="status === 200">
    <v-progress-linear
      v-show="progress"
      indeterminate
      absolute
      top
      color="primary"
      class="global-progress"
    ></v-progress-linear>
    <zg-header> </zg-header>
    <zg-menu></zg-menu>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <Menu></Menu>
  </div>
  <zg-init v-else-if="status === 503" @init="getInfo"></zg-init>
  <div v-else></div>
</template>

<script>
import { mapMutations, mapState } from "vuex"
import { userInfoService } from "@/assets/script/service"

export default {
  components: {
    "zg-header": () => import("@/components/page/Header"),
    "zg-menu": () => import("@/components/page/Menu"),
    "zg-init": () => import("@/components/page/Init")
  },
  data() {
    return {
      status: null
    }
  },
  computed: {
    ...mapState("menu", ["progress"])
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    ...mapMutations("user", ["MSetInfo"]),
    async getInfo() {
      const result = await userInfoService.get()
      this.status = result.status
      this.MSetInfo(result.data)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/plugins/zg/style/config";

.global-progress {
  z-index: $overlay-index !important;
}
</style>
