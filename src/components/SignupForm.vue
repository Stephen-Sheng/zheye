<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import ValidateForm from "./ValidateForm.vue";
import type { RulesProp } from "./ValidateInput.vue";
import ValidateInput from "./ValidateInput.vue";
import createMessage from "./createMessage";
import axios from "axios";
const router = useRouter();

const emailRules: RulesProp = [
  { type: "required", message: "No empty email" },
  { type: "email", message: "should be valid email addr" },
];
const passwordRules: RulesProp = [
  { type: "required", message: "No empty password" },
];
const nickNameRules: RulesProp = [
  { type: "required", message: "No empty nickname" },
];
const repeatPasswordRules: RulesProp = [
  { type: "required", message: "Please repeat your password" },
  {
    type: "custom",
    validator: () => {
      return formData.password === formData.repeatPassword;
    },
    message: "Password should be same",
  },
];

const formData = reactive({
  email: "",
  nickName: "",
  password: "",
  repeatPassword: "",
});

const onFormSubmit = (result: boolean) => {
  if (result) {
    const payload = {
      email: formData.email,
      nickName: formData.nickName,
      password: formData.password,
    };
    axios
      .post("/users/", payload)
      .then(() => {
        createMessage("success", "注册成功 正在跳转登录页面", 2000);
        setTimeout(() => router.push("/login"), 1000);
      })
      .catch((e) => {
        console.log(e);
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
        v-model="formData.email"
        :rules="emailRules"
        tag="input"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputNickname1" class="form-label">Nickname</label>
      <ValidateInput
        type="text"
        placeholder="请输入昵称"
        v-model="formData.nickName"
        :rules="nickNameRules"
        tag="input"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <ValidateInput
        type="password"
        placeholder="请输入密码"
        v-model="formData.password"
        :rules="passwordRules"
        tag="input"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword2" class="form-label"
        >Repeat Password</label
      >
      <ValidateInput
        type="password"
        placeholder="请再次输入密码"
        v-model="formData.repeatPassword"
        :rules="repeatPasswordRules"
        tag="input"
      />
    </div>
    <template #submit>
      <span class="btn btn-primary"> 注册新用户</span>
    </template>
  </ValidateForm>
</template>

<style></style>
