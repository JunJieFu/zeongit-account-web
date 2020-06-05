<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on: menu }">
      <v-tooltip bottom>
        <template v-slot:activator="{ tooltip }">
          <v-btn
            depressed
            icon
            :small="$vuetify.breakpoint.xsOnly"
            v-on="Object.assign(menu, tooltip)"
            class="ml-2"
          >
            <v-icon>mdi-apps</v-icon>
          </v-btn>
        </template>
        <span>应用</span>
      </v-tooltip>
    </template>
    <v-card>
      <iframe
        src="http://localhost:12180/#/frame/apps"
        class="iframe-menu"
      ></iframe>
    </v-card>
  </v-menu>
</template>

<script></script>

<style scoped lang="scss">
@import "src/assets/style/color";
.iframe-menu {
  max-width: 100%;
  $size: 380px;
  width: $size;
}
</style>
