<template>
  <div class="page mx-auto align-sm-center pa-sm-4 d-flex fill-height">
    <v-card
      :elevation="$vuetify.breakpoint.xsOnly ? 0 : undefined"
      :loading="loading"
    >
      <v-card-title>
        完善您的信息
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="7" md="7" lg="7" xl="6">
            <v-form>
              <v-row>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    label="昵称"
                    solo
                    dense
                    v-model="form.nickname"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <date-picker-text-field v-model="form.birthday">
                    <template v-slot="{ on, date }">
                      <v-text-field
                        :value="date"
                        clearable
                        label="生日"
                        readonly
                        solo
                        dense
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
                    solo
                    dense
                  ></v-textarea>
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
              <v-img src="../../assets/image/svg/account.svg"></v-img>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { UserForm } from "../../assets/script/model"
import { userInfoService } from "../../assets/script/service"

export default {
  components: {
    DatePickerTextField: () => import("../global/DatePickerTextField/Index")
  },
  data() {
    return {
      loading: false,
      form: new UserForm()
    }
  },
  methods: {
    async save() {
      this.loading = true
      const result = await userInfoService.save(this.form)
      this.loading = false
      await this.$resultNotify(result)
      this.$emit("init")
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/config";
.page {
  max-width: $small-page-size;
}
</style>
