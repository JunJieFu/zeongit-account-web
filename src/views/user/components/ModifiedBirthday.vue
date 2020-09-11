<template>
  <v-card width="100%" :loading="loading">
    <v-form ref="form" v-model="formValid">
      <v-date-picker
        v-model="input"
        full-width
        :max="new Date().toISOString().substr(0, 10)"
      ></v-date-picker>
    </v-form>
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
    this.input = this.info?.birthday.substr(0, 10)
  },
  methods: {
    ...mapMutations("user", ["MSetInfo"]),
    async save() {
      this.$refs.form.validate()
      if (this.formValid) {
        this.loading = true
        try {
          const result = await userInfoService.modified({
            birthday: this.input
          })
          await this.$resultNotify(result)
          this.MSetInfo(result.data)
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
