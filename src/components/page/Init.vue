<template>
  <div class="page mx-auto align-sm-center pa-sm-4 d-flex fill-height">
    <v-card
      :elevation="$vuetify.breakpoint.xsOnly ? 0 : undefined"
      :loading="loading"
      width="100%"
    >
      <v-card-title>
        完善您的信息
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="7" md="7" lg="7" xl="6">
            <v-form ref="form" v-model="formValid">
              <v-row>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    label="昵称"
                    outlined
                    dense
                    :rules="nicknameRules()"
                    v-model="form.nickname"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <date-picker-text-field
                    v-model="form.birthday"
                    no-title
                    :max="new Date().toISOString().substr(0, 10)"
                  >
                    <template v-slot="{ on, date }">
                      <v-text-field
                        :value="date"
                        clearable
                        label="出生日期"
                        readonly
                        outlined
                        dense
                        :rules="birthdayRules()"
                        v-on="on"
                        @click:clear="form.birthday = ''"
                      ></v-text-field>
                    </template>
                  </date-picker-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-radio-group row v-model="form.gender">
                    <v-radio
                      :label="item.value"
                      :value="item.key"
                      v-for="item in $enum.Gender"
                      :key="item.key"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-textarea
                    v-model="form.introduction"
                    label="请用一些简单的话语描述您自己"
                    outlined
                    dense
                    :rules="introductionRules()"
                  ></v-textarea>
                </v-col>
                <v-col cols="4" class="py-0">
                  <v-select
                    v-model="form.country"
                    :items="['中国']"
                    label="国家"
                    clearable
                    dense
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="4" class="py-0">
                  <v-select
                    v-model="form.province"
                    :items="chinatown"
                    label="省份"
                    item-text="label"
                    value="label"
                    clearable
                    dense
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="4" class="py-0">
                  <v-select
                    v-model="form.city"
                    :items="cityList"
                    label="城市"
                    item-text="label"
                    value="label"
                    clearable
                    dense
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-btn @click.native="save" color="primary" block large
                    >开启使用</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </v-col>
          <v-col cols="12" sm="5" md="5" lg="5" xl="6" class="hidden-xs-only">
            <div class="align-center d-flex fill-height">
              <v-img src="@/assets/image/account.svg"></v-img>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { UserForm } from "@/assets/script/model"
import { userInfoService } from "@/assets/script/service"
import chinatown from "@/plugins/zg/script/constant/chinatown"
import rulesUtil from "@/plugins/zg/script/util/rules"
export default {
  components: {
    "date-picker-text-field": () =>
      import("@/plugins/zg/components/DatePickerTextField/Index")
  },
  computed: {
    cityList() {
      if (this.form.province) {
        return (
          chinatown.find((it) => it.label === this.form.province)?.children ||
          []
        )
      }
      return []
    }
  },
  data() {
    return {
      chinatown,
      formValid: false,
      loading: false,
      form: new UserForm()
    }
  },
  watch: {
    "form.province"(value) {
      if (value) {
        const cityList =
          chinatown
            .find((it) => it.label === this.form.province)
            ?.children.map((it) => it.label) || []
        console.log(cityList.include)
        if (!cityList.includes(this.form.city)) {
          this.form.city = undefined
        }
      } else {
        this.form.city = undefined
      }
    }
  },
  methods: {
    nicknameRules() {
      return [rulesUtil.required("昵称")]
    },
    birthdayRules() {
      return [
        (value) => {
          if (value === "") {
            return "请选择出生日期"
          }
          return true
        }
      ]
    },
    introductionRules() {
      return [rulesUtil.required("个人签名")]
    },
    async save() {
      this.$refs.form.validate()
      if (this.formValid) {
        this.loading = true
        const result = await userInfoService.save(this.form)
        this.loading = false
        await this.$resultNotify(result)
        this.$emit("init")
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/plugins/zg/style/config";

.page {
  max-width: $small-page-size;
}
</style>
