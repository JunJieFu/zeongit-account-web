<template>
  <v-card width="100%" :loading="loading" class="overflow-x-hidden">
    <v-card-title>
      更改背景墙
    </v-card-title>
    <div>
      <img :src="value" ref="tailoring" width="100%" />
    </div>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="warning" text @click="close">
        取消
      </v-btn>
      <v-btn color="info" text @click="save">
        确认修改
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Cropper from "cropperjs"
import ioUtil from "@/plugins/zg/script/util/io"
import { QINIU_UPLOAD_ADDRESS } from "@/plugins/zg/script/constant/config"
import * as axios from "axios"
import { userInfoService } from "@/assets/script/service"
import { mapMutations } from "vuex"
export default {
  props: {
    value: {
      type: String
    },
    token: {
      type: String
    }
  },
  data() {
    return {
      loading: false,
      cropper: {}
    }
  },
  watch: {
    value(value) {
      if (value) {
        this.cropper.replace(value)
      }
    }
  },
  mounted() {
    this.cropper = new Cropper(
      this.$refs.tailoring._isVue
        ? this.$refs.tailoring.$el
        : this.$refs.tailoring,
      {
        aspectRatio: 2,
        viewMode: 1,
        background: false,
        zoomable: false
      }
    )
  },
  methods: {
    ...mapMutations("user", ["MSetInfo"]),
    close() {
      this.$emit("close")
    },
    async save() {
      this.loading = true
      const file = ioUtil.dataURLtoFile(
        this.cropper.getCroppedCanvas().toDataURL()
      )
      const form = new FormData()
      form.append("token", this.token)
      form.append("file", file)
      let qiniuResult
      try {
        qiniuResult = (
          await axios.post(QINIU_UPLOAD_ADDRESS, form, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
        ).data
      } catch (e) {
        this.$notify({ text: "上传失败", color: "error" })
        this.loading = false
        return
      }
      if (!qiniuResult.hash) {
        this.$notify({ text: "上传失败", color: "error" })
        this.loading = false
        return
      }
      const result = await userInfoService.modifiedBackground({
        background: qiniuResult.hash
      })
      this.loading = false
      await this.$resultNotify(result)
      this.MSetInfo(result.data)
      this.$notify({ text: "修改成功", color: "success" })
      this.$emit("success")
    }
  }
}
</script>

<style scoped></style>
