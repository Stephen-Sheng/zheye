<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ValidateInput from "@/components/ValidateInput.vue";
import ValidateForm from "@/components/ValidateForm.vue";
import type { RulesProp } from "@/components/ValidateInput.vue";
import type { GlobalDataProps } from "@/store";
import type { PostProps } from "@/utils";
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
    const { columnId } = store.state.user;
    if (columnId) {
      const newPost: PostProps = {
        id: new Date().getTime(),
        title: titleVal.value,
        content: contentVal.value,
        columnId,
        createdAt: new Date().toLocaleString(),
      };
      store.commit("createPost", newPost);
      router.push(`/column/${columnId}`);
    }
  }
};
</script>

<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
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
