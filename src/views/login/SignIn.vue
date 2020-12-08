<template>
  <v-card
    :elevation="$vuetify.breakpoint.xsOnly ? 0 : undefined"
    :loading="loading"
    width="100%"
  >
    <v-card-title>
      登录您的账号
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="7" md="7" lg="7" xl="6" class="d-flex flex-column">
          <v-form ref="form" v-model="formValid">
            <v-row>
              <v-col cols="12" class="py-0">
                <v-text-field
                  label="手机号码"
                  prepend-icon="mdi-cellphone"
                  v-model.trim="form.phone"
                  :rules="phoneRules()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  label="密码"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model.trim="form.password"
                  :rules="passwordRules()"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <v-spacer />
          <v-row>
            <v-col cols="12">
              <v-btn @click.native="signIn" color="primary" block large
                >登录</v-btn
              >
            </v-col>
            <v-col cols="12">
              <div>
                <router-link to="/forgot" class="link">
                  忘记了登录密码？
                </router-link>
              </div>
              <div>
                <router-link to="/signUp" class="link">
                  没有账号，立即创建一个！
                </router-link>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="5" md="5" lg="5" xl="6" class="hidden-xs-only">
          <div class="align-center d-flex fill-height">
            <v-img src="@/assets/image/account.svg"></v-img>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { SignInForm } from "@/assets/script/model"
import urlUtil from "@/plugins/zg/script/util/url"
import { userService } from "@/assets/script/service"
import rulesUtil from "@/plugins/zg/script/util/rules"
import jsCookie from "js-cookie"
import { DOMAIN } from "@/plugins/zg/script/constant/config"

export default {
  name: "SignIn",
  data() {
    return {
      continue: this.$route.query.continue,
      formValid: false,
      loading: false,
      form: new SignInForm()
    }
  },
  methods: {
    phoneRules() {
      return [rulesUtil.required("手机号码")]
    },
    passwordRules() {
      return [rulesUtil.required("密码")]
    },
    async signIn() {
      this.$refs.form.validate()
      if (this.formValid) {
        this.loading = true
        const result = await userService.signIn(this.form)
        this.loading = false
        await this.$resultNotify(result)
        jsCookie.set("token", result.data, { expires: 30, domain: DOMAIN })
        urlUtil.isUrl(this.continue)
          ? location.replace(this.continue)
          : this.$router.replace(this.continue ? this.continue : "/")
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
