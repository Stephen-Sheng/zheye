<script setup lang="ts">
import { ref } from "vue";
import ValidateForm from "./ValidateForm.vue";
import type { RulesProp } from "./ValidateInput.vue";
import ValidateInput from "./ValidateInput.vue";

const emailRules: RulesProp = [
  { type: "required", message: "No empty email" },
  { type: "email", message: "should be valid email addr" },
];
const emailVal = ref("yutong.sheng@outlook.com");

const passwordRules: RulesProp = [
  { type: "required", message: "No empty password" },
];
const passwordVal = ref("123456");
const inputRef = ref<any>();
const onFormSubmit = (result: boolean) => {
  console.log(result);
};
</script>

<template>
  <ValidateForm @form-submit="onFormSubmit">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <ValidateInput
        type="text"
        placeholder="请输入邮箱地址"
        v-model="emailVal"
        :rules="emailRules"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <ValidateInput
        ref="inputRef"
        type="password"
        placeholder="请输入密码"
        v-model="passwordVal"
        :rules="passwordRules"
      />
    </div>
    <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1" />
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <template #submit>
      <span class="btn btn-danger"> Submit</span>
    </template>
  </ValidateForm>
</template>

<style></style>
