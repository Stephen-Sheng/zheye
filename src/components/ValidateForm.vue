<script setup lang="ts">
import { onUnmounted } from "vue";
import { emitter } from "@/utils/index";
import type { ClearFunc } from "./ValidateInput.vue";

export type ValidateFunc = () => boolean;

const emit = defineEmits<{ (e: "form-submit", isPassed: boolean): void }>();
let funcArr: ValidateFunc[] = [];
let clearFuncArr: ClearFunc[] = [];
const submitForm = () => {
  const result = funcArr.map((func) => func()).every((res) => res);
  emit("form-submit", result);
  if (!result) clearInputs();
};
const clearInputs = () => {
  clearFuncArr.forEach((func) => func());
};

const callback = (func: ValidateFunc) => {
  funcArr.push(func);
};
const clearCallback = (func: ClearFunc) => {
  clearFuncArr.push(func);
};
emitter.on("form-item-created", callback);
emitter.on("form-item-clear", clearCallback);
onUnmounted(() => {
  emitter.off("form-item-created", callback);
  emitter.off("form-item-clear", clearCallback);
  funcArr = [];
  clearFuncArr = [];
});
</script>

<template>
  <form class="validate-form-container">
    <slot></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<style></style>
