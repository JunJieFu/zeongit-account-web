<template>
  <v-card
    class="d-flex flex-column fill-height"
    :elevation="$vuetify.breakpoint.xsOnly ? 0 : undefined"
    :loading="loading"
  >
    <v-card-title class="px-6">
      <v-img src="../../assets/image/svg/logo.svg" class="mx-auto logo"></v-img>
    </v-card-title>
    <v-card-text>
      <v-carousel
        :continuous="false"
        hide-delimiter-background
        hide-delimiters
        :next-icon="false"
        touchless
        light
        show-arrows-on-hover
        v-model="step"
        height="auto"
      >
        <v-carousel-item class="px-2">
          <v-form>
            <v-text-field
              label="手机号码"
              prepend-icon="mdi-cellphone"
              v-model.trim="form.phone"
            ></v-text-field>
            <div class="pt-4 placeholder">
              <v-btn @click.native="sendCode" color="primary" block large
                >获取验证码</v-btn
              >
            </div>
          </v-form>
        </v-carousel-item>
        <v-carousel-item class="px-4">
          <v-form>
            <v-text-field
              label="验证码"
              prepend-icon="mdi-check"
              v-model.trim="form.verificationCode"
            ></v-text-field>
            <v-text-field
              label="密码"
              type="password"
              prepend-icon="mdi-lock"
              v-model.trim="form.password"
            ></v-text-field>
            <v-text-field
              label="确认密码"
              prepend-icon="mdi-lock-check"
              type="password"
              v-model.trim="rePassword"
            ></v-text-field>
            <div class="pt-4">
              <v-btn @click.native="signUp" color="primary" block large
                >确认注册并登录</v-btn
              >
            </div>
          </v-form>
        </v-carousel-item>
      </v-carousel>
    </v-card-text>
    <v-spacer />
    <v-card-actions class="px-6">
      <div>
        <router-link to="/" class="link">
          忘记了登录密码？
        </router-link>
        <router-link to="/signIp" class="link">
          已经有登录账号？
        </router-link>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import { SignUpForm } from "../../assets/script/model"
import { mapActions } from "vuex"

export default {
  data() {
    return {
      form: new SignUpForm(this.$enum.VerificationCodeOperation.REGISTER.key),
      rePassword: "",
      loading: false,
      step: 0
    }
  },
  methods: {
    ...mapActions("user", ["ASendCode", "ASignUp"]),
    async sendCode() {
      this.loading = true
      const result = await this.ASendCode(this.form)
      this.loading = false
      await this.$resultNotify(result)
      this.step++
    },
    async signUp() {
      this.loading = true
      const result = await this.ASignUp(this.form)
      this.loading = false
      await this.$resultNotify(result)
      this.$router.replace("/")
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  max-width: 270px;
  min-width: 80%;
}
.placeholder {
  margin-top: 140px;
}
.link {
  display: block;
  line-height: 35px;
}
</style>
