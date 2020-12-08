<template>
  <v-card width="100%" :loading="loading">
    <v-card-title>
      <span class="headline">更改密码</span>
    </v-card-title>
    <v-card-text class="mt-6">
      <v-form ref="form" v-model="formValid">
        <v-text-field
          label="密码"
          outlined
          dense
          type="password"
          v-model.trim="input"
          :rules="passwordRules()"
        ></v-text-field>
        <v-text-field
          label="确认密码"
          outlined
          dense
          type="password"
          v-model.trim="rePassword"
          :rules="rePasswordRules()"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="warning" text @click="$emit('close')">
        取消
      </v-btn>
      <v-btn color="info" text @click="save">
        确认修改
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations, mapState } from "vuex"
import { userService } from "@/assets/script/service"
import rulesUtil from "@/plugins/zg/script/util/rules"

export default {
  computed: {
    ...mapState("user", ["info"])
  },
  data() {
    return {
      input: "",
      rePassword: "",
      loading: false,
      formValid: false
    }
  },
  methods: {
    ...mapMutations("user", ["MSetInfo", "MSignOut"]),
    passwordRules() {
      return [rulesUtil.required("密码")]
    },
    rePasswordRules() {
      return [
        rulesUtil.required("确认密码"),
        (rePassword) => {
          if (rePassword !== this.input) {
            return "两次密码不一致"
          }
          return true
        }
      ]
    },
    async save() {
      this.$refs.form.validate()
      if (this.formValid) {
        this.loading = true
        try {
          const result = await userService.update({
            password: this.input
          })
          await this.$resultNotify(result)
          this.$notify({ text: "修改成功，请重新登录", color: "success" })
          this.MSignOut()
          // eslint-disable-next-line no-empty
        } catch (e) {}
        this.loading = false
      }
    }
  }
}
</script>

<style scoped></style>
