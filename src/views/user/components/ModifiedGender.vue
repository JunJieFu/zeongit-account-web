<template>
  <v-card width="100%" :loading="loading">
    <v-card-title>
      <span class="headline">更改性别</span>
    </v-card-title>
    <v-card-text class="mt-6">
      <v-form ref="form" v-model="formValid">
        <v-radio-group v-model="input">
          <v-radio
            :label="item.value"
            :value="item.key"
            v-for="item in $enum.Gender"
            :key="item.key"
          ></v-radio>
        </v-radio-group>
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
    this.input = this.info?.gender
  },
  methods: {
    ...mapMutations("user", ["MSetInfo"]),
    async save() {
      this.$refs.form.validate()
      if (this.formValid) {
        this.loading = true
        try {
          const result = await userInfoService.modified({
            gender: this.input
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
