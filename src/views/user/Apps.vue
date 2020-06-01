<template>
  <v-row class="ma-0" justify="center" align="center">
    <v-col cols="12" sm="7" md="5" lg="4" xl="3">
      <v-card :elevation="0" class="mt-12 pt-12" color="transparent">
        <v-card-title class="justify-center">
          <v-icon size="100">mdi-apps</v-icon>
        </v-card-title>
        <v-card-title class="justify-center">有的有的</v-card-title>
        <v-card-text class="text-center">
          作者很懒，不想写，或许以后会加上，未完待续...
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
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
