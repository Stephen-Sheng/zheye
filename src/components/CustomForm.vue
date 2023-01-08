<script setup lang="ts">
import type { GlobalDataProps } from "@/store";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ValidateForm from "./ValidateForm.vue";
import type { RulesProp } from "./ValidateInput.vue";
import ValidateInput from "./ValidateInput.vue";
const store = useStore<GlobalDataProps>();
const router = useRouter();
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
  if (result) {
    const payload = { email: emailVal.value, password: passwordVal.value };
    store.dispatch("loginAndFetch", payload).then((data) => {
      console.log(data);
      router.push("/");
    });
  }
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
        tag="input"
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
        tag="input"
      />
    </div>
    <template #submit>
      <span class="btn btn-primary"> Submit</span>
    </template>
  </ValidateForm>
</template>

<style></style>
