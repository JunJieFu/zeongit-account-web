<template>
  <v-card width="100%" :loading="loading">
    <v-card-title>
      <span class="headline">更改昵称</span>
    </v-card-title>
    <v-card-text class="mt-6">
      <v-form ref="form" v-model="formValid">
        <v-text-field
          label="昵称"
          outlined
          dense
          v-model.trim="input"
          :rules="rules()"
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
import { userInfoService } from "@/assets/script/service"
import rulesUtil from "@/plugins/zg/script/util/rules"

export default {
  computed: {
    ...mapState("user", ["info"])
  },
  data() {
    return {
      input: "",
      loading: false,
      formValid: false
    }
  },
  created() {
    this.input = this.info?.nickname
  },
  methods: {
    ...mapMutations("user", ["MSetInfo"]),
    rules() {
      return [rulesUtil.required("昵称")]
    },
    async save() {
      this.$refs.form.validate()
      if (this.formValid) {
        this.loading = true
        try {
          const result = await userInfoService.modified({
            nickname: this.input
          })
          await this.$resultNotify(result)
          const infoResult = await userInfoService.get()
          await this.$resultNotify(infoResult)
          this.MSetInfo(infoResult.data)
          this.$notify({ text: "修改成功", color: "success" })
          this.$emit("success")
          // eslint-disable-next-line no-empty
        } catch (e) {}
        this.loading = false
      }
    }
  }
}
</script>

<style scoped></style>
