<template>
  <v-row class="page align-sm-center" justify="center">
    <v-col cols="12" sm="8" md="7" lg="6" xl="5" class="pa-0">
      <v-card
        :elevation="$vuetify.breakpoint.xsOnly ? 0 : undefined"
        :loading="loading"
      >
        <v-card-title>
          完善您的信息
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="12" md="7" lg="7" xl="6">
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
            <v-col
              cols="12"
              sm="12"
              md="5"
              lg="5"
              xl="6"
              class="hidden-sm-and-down"
            >
              <div class="align-center d-flex fill-height">
                <v-img src="../../assets/image/svg/account.svg"></v-img>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { UserForm } from "../../assets/script/model"
import { mapActions } from "vuex"

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
    ...mapActions("user", ["ASave"]),
    async save() {
      this.loading = true
      const result = await this.ASave(this.form)
      this.loading = false
      await this.$resultNotify(result)
      this.$emit("init")
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  margin: 0;
}
</style>
