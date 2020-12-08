<template>
  <v-card
    :elevation="$vuetify.breakpoint.xsOnly ? 0 : undefined"
    :loading="loading"
    width="100%"
  >
    <v-card-title>
      找回您的密码
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
              <v-form ref="sendCordForm" v-model="sendCordFormValid">
                <v-row>
                  <v-col :cols="12" class="py-0">
                    <v-text-field
                      label="手机号码"
                      prepend-icon="mdi-cellphone"
                      v-model.trim="form.phone"
                      :rules="phoneRules()"
                    ></v-text-field>
                  </v-col>
                  <v-col :cols="12" class="placeholder">
                    <v-btn @click.native="sendCode" color="primary" block large
                      >获取验证码</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
            </v-carousel-item>
            <v-carousel-item>
              <v-form ref="form" v-model="formValid">
                <v-row>
                  <v-col :cols="12" class="py-0">
                    <v-text-field
                      label="验证码"
                      prepend-icon="mdi-check"
                      v-model.trim="form.code"
                      :rules="verificationCodeRules()"
                    ></v-text-field>
                  </v-col>
                  <v-col :cols="12" class="py-0">
                    <v-text-field
                      label="密码"
                      type="password"
                      prepend-icon="mdi-lock"
                      v-model.trim="form.password"
                      :rules="passwordRules()"
                    ></v-text-field>
                  </v-col>
                  <v-col :cols="12" class="py-0">
                    <v-text-field
                      label="确认密码"
                      prepend-icon="mdi-lock-check"
                      type="password"
                      v-model.trim="rePassword"
                      :rules="rePasswordRules()"
                    ></v-text-field>
                  </v-col>
                  <v-col :cols="12">
                    <v-btn @click.native="forgot" color="primary" block large
                      >确认并重置密码</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
            </v-carousel-item>
          </v-carousel>
          <v-spacer />
          <v-row>
            <v-col cols="12">
              <div>
                <router-link to="/signIn" class="link">
                  已经有登录账号？
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
import { ForgotForm } from "@/assets/script/model"
import { userService } from "@/assets/script/service"
import rulesUtil from "../../plugins/zg/script/util/rules"

export default {
  data() {
    return {
      form: new ForgotForm(1),
      formValid: false,
      sendCordFormValid: false,
      rePassword: "",
      loading: false,
      step: 0
    }
  },
  methods: {
    phoneRules() {
      return [rulesUtil.required("手机号码")]
    },
    verificationCodeRules() {
      return [rulesUtil.required("验证码")]
    },
    passwordRules() {
      return [rulesUtil.required("密码")]
    },
    rePasswordRules() {
      return [
        rulesUtil.required("确认密码"),
        (rePassword) => {
          if (rePassword !== this.form.password) {
            return "两次密码不一致"
          }
          return true
        }
      ]
    },
    async sendCode() {
      this.$refs.sendCordForm.validate()
      if (this.sendCordFormValid) {
        this.loading = true
        const result = await userService.sendCode(this.form)
        this.loading = false
        await this.$resultNotify(result)
        this.step++
      }
    },
    async forgot() {
      this.$refs.form.validate()
      if (this.formValid) {
        this.loading = true
        const result = await userService.forgot(this.form)
        this.loading = false
        await this.$resultNotify(result)
        this.$notify({ text: "修改成功", color: "success" })
        this.$router.replace("/signIp")
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.placeholder {
  margin-top: 140px;
}
</style>
