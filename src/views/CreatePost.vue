<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ValidateInput from "@/components/ValidateInput.vue";
import ValidateForm from "@/components/ValidateForm.vue";
import type { RulesProp } from "@/components/ValidateInput.vue";
import type { GlobalDataProps } from "@/store";
import type { PostProps } from "@/utils";
import Uploader from "@/components/Uploader.vue";
const titleVal = ref("");
const router = useRouter();
const store = useStore<GlobalDataProps>();
const titleRules: RulesProp = [
  { type: "required", message: "文章标题不能为空" },
];
const contentVal = ref("");
const contentRules: RulesProp = [
  { type: "required", message: "文章详情不能为空" },
];
const onFormSubmit = (result: boolean) => {
  if (result) {
    const { column } = store.state.user;
    if (column) {
      const newPost: PostProps = {
        title: titleVal.value,
        content: contentVal.value,
        column,
      };
      store.commit("createPost", newPost);
      router.push(`/column/${column}`);
    }
  }
};
</script>

<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <Uploader
      action="/upload"
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
