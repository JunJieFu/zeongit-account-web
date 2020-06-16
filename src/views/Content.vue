<template>
  <div v-if="status === 200">
    <v-progress-linear
      v-show="progress"
      indeterminate
      absolute
      top
      color="primary"
      style="z-index: 999"
    ></v-progress-linear>
    <Header> </Header>
    <v-content>
      <v-divider></v-divider>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
    <Menu></Menu>
  </div>
  <Init v-else-if="status === 503" @init="getInfo"></Init>
  <div v-else></div>
</template>

<script>
import { mapMutations, mapState } from "vuex"
import Menu from "../components/page/Menu"
import Init from "../components/page/Init"
import Header from "../components/page/Header"
import { userInfoService } from "../assets/script/service"

export default {
  components: {
    Header,
    Menu,
    Init
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
<style lang="scss" scoped></style>
