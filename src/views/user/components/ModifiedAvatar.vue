<template>
  <v-card width="100%" :loading="loading" class="overflow-x-hidden">
    <v-card-title>
      更改头像
    </v-card-title>
    <div @dragover.prevent="() => {}" @drop.prevent="upload($event, 'drop')">
      <div v-show="!input" class="text-center">
        <v-btn outlined color="primary" @click="$refs.upload.click()"
          >上传</v-btn
        >
        <input
          ref="upload"
          type="file"
          class="d-none"
          @change="upload($event, 'button')"
        />
        <h3>拖拽一个图片到这里上传</h3>
        <p>支持jpg、png、jpeg格式</p>
      </div>
      <div v-show="input">
        <img :src="input" ref="tailoringAvatar" width="100%" />
      </div>
    </div>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="warning" text @click="$refs.upload.click()">
        取消
      </v-btn>
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
import Cropper from "cropperjs"
import ioUtil from "@/plugins/zg/script/util/io"
export default {
  computed: {
    proportion() {
      return this.height / this.width
    }
  },
  data() {
    return {
      loading: false,
      input: undefined,
      file: undefined,
      width: 0,
      height: 0,
      avatarCropper: {}
    }
  },
  mounted() {
    this.avatarCropper = new Cropper(
      this.$refs.tailoringAvatar._isVue
        ? this.$refs.tailoringAvatar.$el
        : this.$refs.tailoringAvatar,
      {
        aspectRatio: 1,
        viewMode: 1,
        background: false,
        zoomable: false
      }
    )
  },
  methods: {
    async upload($event, type) {
      let file
      if (type === "button") {
        file = $event.target.files[0]
      } else if (type === "drop") {
        file = $event.dataTransfer.files[0]
      }
      if (!file) {
        return false
      }
      if (!ioUtil.isImage(file)) {
        this.$notify({ text: "请上传图片", color: "warning" })
        return false
      }
      const url = URL.createObjectURL(file)
      const { width, height } = await ioUtil.getOffset(url)
      this.file = file
      this.width = width
      this.height = height
      this.input = url
      this.avatarCropper.replace(this.input)
    },
    save() {}
  }
}
</script>

<style scoped></style>
