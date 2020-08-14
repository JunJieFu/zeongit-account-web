<template>
  <div class="page justify-center d-flex flex-column mx-auto">
    <div class="d-flex flex-column text-center my-6">
      <h1 class="title font-weight-black">个人信息</h1>
      <p>您在 Zeongit 服务中使用的基本信息，例如您的姓名和照片</p>
    </div>
    <v-card outlined>
      <v-card-title>
        个人资料
      </v-card-title>
      <v-card-subtitle>
        使用 Zeongit 服务的其他用户可能会看到部分信息。
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-list class="py-0 card-list">
        <v-list-item class="py-3" @click="modifiedAvatarDialogVisible = true">
          <label>头像</label>
          <span class="flex-grow-1 pr-3 ellipsis"
            >更改头像可帮助您个性化您的帐号</span
          >
          <avatar :info="info" size="60"></avatar>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="py-3" @click="modifiedNicknameDialogVisible = true">
          <label>背景墙</label>
          <span class="flex-grow-1 pr-3 ellipsis"
            >更改背景可帮助您个性化您的帐号</span
          >
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="py-3" @click="modifiedNicknameDialogVisible = true">
          <label>昵称</label>
          <span class="flex-grow-1 pr-3 ellipsis">{{ info.nickname }}</span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="py-3" @click="modifiedBirthdayDialogVisible = true">
          <label>出生日期</label>
          <span class="flex-grow-1 pr-3 ellipsis">{{
            info.birthday | date("YYYY-MM-DD")
          }}</span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="py-3" @click="modifiedGenderDialogVisible = true">
          <label>性别</label>
          <span class="flex-grow-1 pr-3 ellipsis">{{
            $enum.Gender[info.gender].value
          }}</span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          class="py-3"
          @click="modifiedIntroductionDialogVisible = true"
        >
          <label>个人签名</label>
          <span class="flex-grow-1 pr-3 ellipsis">{{ info.introduction }}</span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="py-3" @click="modifiedCityDialogVisible = true">
          <label>居住城市</label>
          <span class="flex-grow-1 pr-3 ellipsis">
            {{ info.country }}
            {{ info.province }}
            {{ info.city }}
          </span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
      </v-list>
    </v-card>
    <v-dialog
      v-model="modifiedAvatarDialogVisible"
      persistent
      max-width="100%"
      width="650px"
    >
      <modified-avatar
        @close="modifiedAvatarDialogVisible = false"
        @success="modifiedAvatarDialogVisible = false"
      ></modified-avatar>
    </v-dialog>
    <v-dialog
      v-model="modifiedNicknameDialogVisible"
      persistent
      max-width="100%"
      width="350px"
    >
      <modified-nickname
        @close="modifiedNicknameDialogVisible = false"
        @success="modifiedNicknameDialogVisible = false"
      ></modified-nickname>
    </v-dialog>
    <v-dialog
      v-model="modifiedBirthdayDialogVisible"
      persistent
      max-width="100%"
      width="350px"
    >
      <modified-birthday
        @close="modifiedBirthdayDialogVisible = false"
        @success="modifiedBirthdayDialogVisible = false"
      ></modified-birthday>
    </v-dialog>
    <v-dialog
      v-model="modifiedGenderDialogVisible"
      persistent
      max-width="100%"
      width="350px"
    >
      <modified-gender
        @close="modifiedGenderDialogVisible = false"
        @success="modifiedGenderDialogVisible = false"
      ></modified-gender>
    </v-dialog>
    <v-dialog
      v-model="modifiedIntroductionDialogVisible"
      persistent
      max-width="100%"
      width="350px"
    >
      <modified-introduction
        @close="modifiedIntroductionDialogVisible = false"
        @success="modifiedIntroductionDialogVisible = false"
      ></modified-introduction>
    </v-dialog>
    <v-dialog
      v-model="modifiedCityDialogVisible"
      persistent
      max-width="100%"
      width="350px"
    >
      <modified-city
        @close="modifiedCityDialogVisible = false"
        @success="modifiedCityDialogVisible = false"
      ></modified-city>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  components: {
    "modified-avatar": () => import("./components/ModifiedAvatar"),
    "modified-nickname": () => import("./components/ModifiedNickname"),
    "modified-birthday": () => import("./components/ModifiedBirthday"),
    "modified-gender": () => import("./components/ModifiedGender"),
    "modified-introduction": () => import("./components/ModifiedIntroduction"),
    "modified-city": () => import("./components/ModifiedCity.vue")
  },
  computed: {
    ...mapState("user", ["info"])
  },
  data() {
    return {
      modifiedAvatarDialogVisible: false,
      modifiedNicknameDialogVisible: false,
      modifiedBirthdayDialogVisible: false,
      modifiedGenderDialogVisible: false,
      modifiedIntroductionDialogVisible: false,
      modifiedCityDialogVisible: false
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
