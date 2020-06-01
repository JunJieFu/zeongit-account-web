<template>
  <v-card
    class="d-flex flex-column fill-height"
    :elevation="$vuetify.breakpoint.xsOnly ? 0 : undefined"
    :tile="$vuetify.breakpoint.xsOnly"
    :loading="loading"
  >
    <v-card-title class="px-6 py-12">
      <v-img src="../../assets/image/svg/logo.svg" class="mx-auto logo" />
    </v-card-title>
    <v-card-text class="px-6">
      <v-form>
        <v-text-field
          label="手机号码"
          prepend-icon="mdi-cellphone"
          v-model.trim="form.phone"
        ></v-text-field>
        <v-text-field
          label="密码"
          prepend-icon="mdi-lock"
          type="password"
          v-model.trim="form.password"
        ></v-text-field>
        <div class="pt-4">
          <v-btn @click.native="signIn" color="primary" block large>登录</v-btn>
        </div>
      </v-form>
    </v-card-text>
    <v-spacer />
    <v-card-actions class="px-6">
      <div>
        <router-link to="/" class="link">
          忘记了登录密码？
        </router-link>
        <router-link to="/signUp" class="link">
          没有账号，立即创建一个
        </router-link>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import { SignInForm } from "../../assets/script/model"
import urlUtil from "../../assets/script/util/url"
import { userService } from "../../assets/script/service"

export default {
  name: "SignIn",
  data() {
    return {
      continue: this.$route.query.continue,
      loading: false,
      form: new SignInForm()
    }
  },
  methods: {
    async signIn() {
      this.loading = true
      const result = await userService.signIn(this.form)
      this.loading = false
      await this.$resultNotify(result)
      urlUtil.isUrl(this.continue)
        ? location.replace(this.continue)
        : this.$router.replace(this.continue ? this.continue : "/")
    }
  }
}
</script>
<style lang="scss" scoped>
.logo {
  max-width: 270px;
  min-width: 80%;
}
.link {
  display: block;
  line-height: 35px;
}
</style>
