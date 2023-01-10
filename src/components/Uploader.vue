<script lang="ts">
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import type { ResponseType, ImageProps } from "@/store";

type UploadStatus = "ready" | "loading" | "success" | "error";
type CheckFunction = (file: File) => boolean;
const props = defineProps<{ action: string; beforeUpload?: CheckFunction }>();
const emits = defineEmits<{
  (e: "file-uploaded", data: ResponseType<ImageProps>): void;
  (e: "file-uploaded-error", error: any): void;
}>();
const fileInput = ref<null | HTMLInputElement>(null);
const fileStatus = ref<UploadStatus>("ready");
const uploadedData = ref();
const triggerUpload = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};
const handleFileChange = (e: Event) => {
  const currentTarget = e.target as HTMLInputElement;
  if (currentTarget.files) {
    const files = Array.from(currentTarget.files);
    if (props.beforeUpload) {
      const result = props.beforeUpload(files[0]);
      if (!result) return;
    }
    fileStatus.value = "loading";
    const formData = new FormData();
    formData.append("file", files[0]);
    axios
      .post(props.action, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        fileStatus.value = "success";
        uploadedData.value = res.data;
        emits("file-uploaded", res.data);
      })
      .catch((error) => {
        fileStatus.value = "error";
        emits("file-uploaded-error", error);
      })
      .finally(() => {
        if (fileInput.value) {
          fileInput.value.value = "";
        }
      });
  }
};
</script>

<template>
  <div class="file-upload">
    <div
      v-bind="$attrs"
      class="file-upload-container"
      @click.prevent="triggerUpload"
    >
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot
        v-else-if="fileStatus === 'success'"
        name="uploaded"
        :uploadedData="uploadedData"
      >
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="handleFileChange"
    />
  </div>
</template>

<style scoped></style>
