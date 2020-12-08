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
        <v-list-item class="py-3" @click="$refs.uploadAvatar.click()">
          <label>头像</label>
          <span class="flex-1 pr-3 ellipsis" style="flex-basis: 0"
            >更改头像可帮助您个性化您的帐号</span
          >
          <input
            ref="uploadAvatar"
            type="file"
            class="d-none"
            @change="uploadAvatar"
          />
          <avatar :info="info" size="60"></avatar>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="py-3" @click="$refs.uploadBackground.click()">
          <label>背景墙</label>
          <span class="flex-1 pr-3 ellipsis"
            >更改背景可帮助您个性化您的帐号</span
          >
          <input
            ref="uploadBackground"
            type="file"
            class="d-none"
            @change="uploadBackground"
          />
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="py-3" @click="modifiedNicknameDialogVisible = true">
          <label>昵称</label>
          <span class="flex-1 pr-3 ellipsis">{{ info.nickname }}</span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="py-3" @click="modifiedBirthdayDialogVisible = true">
          <label>出生日期</label>
          <span class="flex-1 pr-3 ellipsis">{{
            info.birthday | date("YYYY-MM-DD")
          }}</span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="py-3" @click="modifiedGenderDialogVisible = true">
          <label>性别</label>
          <span class="flex-1 pr-3 ellipsis">{{
            $enum.Gender[info.gender]
          }}</span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          class="py-3"
          @click="modifiedIntroductionDialogVisible = true"
        >
          <label>个人签名</label>
          <span class="flex-1 pr-3 ellipsis">{{ info.introduction }}</span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="py-3" @click="modifiedCityDialogVisible = true">
          <label>居住城市</label>
          <span class="flex-1 pr-3 ellipsis">
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
        :value="inputAvatar"
        :token="uploadToken"
        @close="modifiedAvatarDialogVisible = false"
        @success="modifiedAvatarDialogVisible = false"
      ></modified-avatar>
    </v-dialog>
    <v-dialog
      v-model="modifiedBackgroundDialogVisible"
      persistent
      max-width="100%"
      width="1120px"
    >
      <modified-background
        :value="inputBackground"
        :token="uploadToken"
        @close="modifiedBackgroundDialogVisible = false"
        @success="modifiedBackgroundDialogVisible = false"
      ></modified-background>
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
import ioUtil from "@/plugins/zg/script/util/io"
import constant from "@/plugins/zg/script/constant/main"
import { qiniuService } from "@/assets/script/service"

export default {
  components: {
    "modified-avatar": () => import("./components/ModifiedAvatar"),
    "modified-background": () => import("./components/ModifiedBackground"),
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
      modifiedBackgroundDialogVisible: false,
      modifiedNicknameDialogVisible: false,
      modifiedBirthdayDialogVisible: false,
      modifiedGenderDialogVisible: false,
      modifiedIntroductionDialogVisible: false,
      modifiedCityDialogVisible: false,
      uploadToken: null,
      inputAvatar: null,
      inputBackground: null
    }
  },
  async created() {
    const result = await qiniuService.get()
    if (result.status === constant.SUCCESS) {
      this.uploadToken = result.data
    }
  },
  methods: {
    upload($event) {
      const file = $event.target.files[0]
      if (!file) {
        return
      }
      if (!ioUtil.isImage(file)) {
        this.$notify({ text: "请上传图片", color: "warning" })
        return
      }
      return file
    },
    uploadAvatar($event) {
      const file = this.upload($event)
      if (file) {
        this.inputAvatar = URL.createObjectURL(file)
        this.modifiedAvatarDialogVisible = true
      }
    },
    uploadBackground($event) {
      const file = this.upload($event)
      if (file) {
        this.inputBackground = URL.createObjectURL(file)
        this.modifiedBackgroundDialogVisible = true
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
