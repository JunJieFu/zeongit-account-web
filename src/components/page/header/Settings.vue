<template>
  <v-menu offset-y v-model="menuVisible">
    <template v-slot:activator="{ on: menu }">
      <v-tooltip bottom :disabled="$isMobile">
        <template v-slot:activator="{ on: tooltip }">
          <v-btn
            depressed
            icon
            :small="$vuetify.breakpoint.xsOnly"
            class="ml-2"
            v-on="Object.assign(menu, tooltip)"
          >
            <v-icon>mdi-cog-outline</v-icon>
          </v-btn>
        </template>
        <span>设置</span>
      </v-tooltip>
    </template>
    <v-list class="py-0" :dense="$vuetify.breakpoint.smAndDown" width="160">
      <v-dialog v-model="darkDialogVisible" max-width="280">
        <template v-slot:activator="{ on: mode }">
          <v-list-item v-on="mode">
            切换主题
          </v-list-item>
        </template>
        <v-card>
          <v-card-title class="title">
            切换主题
          </v-card-title>
          <v-card-text>
            <v-radio-group row v-model="dark">
              <v-row>
                <v-col :cols="12">
                  <v-radio label="浅色" :value="false"></v-radio>
                </v-col>
                <v-col :cols="12">
                  <v-radio label="深色" :value="true"></v-radio>
                </v-col>
              </v-row>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-list-item to="/feedback">
        反馈
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapMutations } from "vuex"

export default {
  data() {
    return {
      menuVisible: false,
      darkDialogVisible: false
    }
  },
  watch: {
    darkDialogVisible(newVal) {
      if (newVal) this.menuVisible = false
    }
  },
  computed: {
    dark: {
      get() {
        return this.$store.state.menu.dark
      },
      set(val) {
        this.MUpdateDark(val)
        this.darkDialogVisible = false
      }
    }
  },
  methods: {
    ...mapMutations("menu", ["MUpdateDark"])
  }
}
</script>

<style scoped></style>
