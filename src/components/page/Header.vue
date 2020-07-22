<template>
  <v-app-bar app clipped-left hide-on-scroll flat>
    <v-tooltip bottom :disabled="$isMobile">
      <template v-slot:activator="{ on }">
        <v-app-bar-nav-icon
          :small="$vuetify.breakpoint.xsOnly"
          @click="collapse = !collapse"
          v-on="on"
        />
      </template>
      <span>主菜单</span>
    </v-tooltip>
    <router-link
      to="/"
      class="title ml-2"
      v-show="$vuetify.breakpoint.mdAndUp"
      style="line-height: 1.5em"
    >
      ZeonGit
      <span class="font-weight-light ml-1">账号</span>
    </router-link>
    <v-spacer />
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          depressed
          icon
          :small="$vuetify.breakpoint.xsOnly"
          class="ml-2"
          v-on="on"
        >
          <v-icon>mdi-bell-outline</v-icon>
        </v-btn>
      </template>
      <span>消息</span>
    </v-tooltip>
    <header-apps></header-apps>
    <header-settings></header-settings>
    <header-user></header-user>
    <v-divider class="header-divider"></v-divider>
  </v-app-bar>
</template>

<script>
import { mapMutations, mapState } from "vuex"
export default {
  components: {
    "header-settings": () => import("./header/Settings"),
    "header-apps": () => import("./header/Apps"),
    "header-user": () => import("./header/User")
  },
  computed: {
    collapse: {
      get() {
        return this.$store.state.menu.collapse
      },
      set(val) {
        this.MUpdateCollapse(val)
      }
    },
    ...mapState("user", ["info"])
  },
  methods: {
    ...mapMutations("menu", ["MUpdateCollapse"])
  }
}
</script>

<style lang="scss" scoped>
.header-divider {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
