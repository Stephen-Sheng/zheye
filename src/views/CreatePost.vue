<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ValidateInput from "@/components/ValidateInput.vue";
import ValidateForm from "@/components/ValidateForm.vue";
import type { RulesProp } from "@/components/ValidateInput.vue";
import type { GlobalDataProps, ImageProps } from "@/store";
import { beforeUploadCheck } from "@/utils/helper";
import Uploader from "@/components/Uploader.vue";
import createMessage from "@/components/createMessage";
import type { ResponseType } from "@/store";
interface NewPostProps {
  title: string;
  content?: string;
  image?: string;
  column: string;
  author?: string;
}
const titleVal = ref("");
const router = useRouter();
const store = useStore<GlobalDataProps>();
let imageId = "";
const titleRules: RulesProp = [
  { type: "required", message: "文章标题不能为空" },
];
const contentVal = ref("");
const contentRules: RulesProp = [
  { type: "required", message: "文章详情不能为空" },
];
const handleFileUploaded = (rawData: ResponseType<ImageProps>) => {
  if (rawData.data._id) {
    imageId = rawData.data._id;
  }
};
const uploadCheck = (file: File) => {
  const result = beforeUploadCheck(file, {
    format: ["image/jpeg", "image/png"],
    size: 1,
  });
  const { passed, error } = result;
  if (error === "format") createMessage("error", "格式只能是JPG/PNG", 2000);
  if (error === "size") createMessage("error", "上传图片大小不能超过1MB", 2000);
  return passed;
};
const onFormSubmit = (result: boolean) => {
  if (result) {
    const { column, _id } = store.state.user;
    if (column) {
      const newPost: NewPostProps = {
        title: titleVal.value,
        content: contentVal.value,
        column,
        author: _id,
      };
      if (imageId) {
        newPost.image = imageId;
      }
      store.dispatch("createPost", newPost).then(() => {
        createMessage("success", "发表成功，即将跳转到该文章", 2000);
      });
      setTimeout(() => router.push(`/column/${column}`), 1000);
    }
  }
};
</script>

<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <Uploader
      action="/upload"
      :before-upload="uploadCheck"
      @file-uploaded="handleFileUploaded"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
    >
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status" />
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" />
      </template>
    </Uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          tag="input"
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          type="text"
          rows="10"
          placeholder="请输入文章详情"
          :rules="contentRules"
          v-model="contentVal"
          tag="textarea"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>
<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
}

.create-post-page .file-upload-container {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
