<template>
  <v-card width="100%" :loading="loading">
    <v-card-title>
      <span class="headline">更改居住城市</span>
    </v-card-title>
    <v-card-text class="mt-6">
      <v-form ref="form" v-model="formValid">
        <v-select
          v-model="country"
          :items="['中国']"
          label="国家"
          clearable
          dense
          outlined
        ></v-select>
        <v-select
          v-model="province"
          :items="chinatown"
          label="省份"
          item-text="label"
          value="label"
          clearable
          dense
          outlined
        ></v-select>
        <v-select
          v-model="city"
          :items="cityList"
          label="城市"
          item-text="label"
          value="label"
          clearable
          dense
          outlined
        ></v-select>
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
import chinatown from "@/plugins/zg/script/constant/chinatown"

export default {
  computed: {
    ...mapState("user", ["info"]),
    cityList() {
      if (this.province) {
        return (
          chinatown.find((it) => it.label === this.province)?.children || []
        )
      }
      return []
    }
  },
  data() {
    return {
      chinatown,
      country: undefined,
      province: undefined,
      city: undefined,
      loading: false,
      formValid: false
    }
  },
  watch: {
    province(value) {
      if (value) {
        const cityList =
          chinatown
            .find((it) => it.label === this.province)
            ?.children.map((it) => it.label) || []
        if (!cityList.includes(this.city)) {
          this.city = undefined
        }
      } else {
        this.city = undefined
      }
    }
  },
  created() {
    this.country = this.info?.country
    this.province = this.info?.province
    this.city = this.info?.city
  },
  methods: {
    ...mapMutations("user", ["MSetInfo"]),
    async save() {
      this.$refs.form.validate()
      if (this.formValid) {
        this.loading = true
        try {
          const result = await userInfoService.update({
            country: this.country,
            province: this.province,
            city: this.city
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
