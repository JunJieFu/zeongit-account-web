<template>
  <v-card
    :elevation="$vuetify.breakpoint.xsOnly ? 0 : undefined"
    :loading="loading"
    width="100%"
  >
    <v-card-title>
      注册您的账号
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="7" md="7" lg="7" xl="6" class="d-flex flex-column">
          <v-carousel
            :continuous="false"
            hide-delimiter-background
            hide-delimiters
            :next-icon="false"
            touchless
            :light="!$vuetify.theme.isDark"
            show-arrows-on-hover
            v-model="step"
            height="auto"
          >
            <v-carousel-item>
              <v-row>
                <v-col :cols="12" class="py-0">
                  <v-text-field
                    label="手机号码"
                    prepend-icon="mdi-cellphone"
                    v-model.trim="form.phone"
                  ></v-text-field>
                </v-col>
                <v-col :cols="12" class="placeholder">
                  <v-btn @click.native="sendCode" color="primary" block large
                    >获取验证码</v-btn
                  >
                </v-col>
              </v-row>
            </v-carousel-item>
            <v-carousel-item>
              <v-row>
                <v-col :cols="12" class="py-0">
                  <v-text-field
                    label="验证码"
                    prepend-icon="mdi-check"
                    v-model.trim="form.verificationCode"
                  ></v-text-field>
                </v-col>
                <v-col :cols="12" class="py-0">
                  <v-text-field
                    label="密码"
                    type="password"
                    prepend-icon="mdi-lock"
                    v-model.trim="form.password"
                  ></v-text-field>
                </v-col>
                <v-col :cols="12" class="py-0">
                  <v-text-field
                    label="确认密码"
                    prepend-icon="mdi-lock-check"
                    type="password"
                    v-model.trim="rePassword"
                  ></v-text-field>
                </v-col>
                <v-col :cols="12">
                  <v-btn @click.native="signUp" color="primary" block large
                    >确认注册并登录</v-btn
                  >
                </v-col>
              </v-row>
            </v-carousel-item>
          </v-carousel>
          <v-spacer />
          <v-row>
            <v-col cols="12">
              <div>
                <router-link to="/forgot" class="link">
                  忘记了登录密码？
                </router-link>
              </div>
              <div>
                <router-link to="/signIp" class="link">
                  已经有登录账号？
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
import { SignUpForm } from "@/assets/script/model"
import urlUtil from "@/plugins/zg/script/util/url"
import { userService } from "@/assets/script/service"

export default {
  data() {
    return {
      continue: this.$route.query.continue,
      form: new SignUpForm(this.$enum.VerificationCodeOperation.REGISTER.key),
      rePassword: "",
      loading: false,
      step: 0
    }
  },
  methods: {
    async sendCode() {
      this.loading = true
      const result = await userService.sendCode(this.form)
      this.loading = false
      await this.$resultNotify(result)
      this.step++
    },
    async signUp() {
      this.loading = true
      const result = await userService.signUp(this.form)
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
.placeholder {
  margin-top: 140px;
}
</style>
