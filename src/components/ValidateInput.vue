<script lang="ts">
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { emitter } from "@/utils/index";
export interface RuleProp {
  type: "required" | "email";
  message: string;
}
export type RulesProp = RuleProp[];
export type ClearFunc = () => void;

const props = defineProps<{ rules: RulesProp; modelValue: string }>();
const emit = defineEmits<{
  (e: "update:modelValue", targetVal: string): void;
  (e: "reset"): void;
}>();

const emailReg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const inputRef = reactive({
  val: props.modelValue || "",
  error: false,
  message: "",
});
onMounted(() => {
  emitter.emit("form-item-created", validateInput),
    emitter.emit("form-item-clear", resetValue);
});
const validateInput = () => {
  if (props.rules) {
    const allPassed = props.rules.every((rule) => {
      let passed = true;
      inputRef.message = rule.message;
      switch (rule.type) {
        case "required":
          passed = inputRef.val.trim() !== "";
          break;
        case "email":
          passed = emailReg.test(inputRef.val);
          break;
        default:
          break;
      }
      return passed;
    });
    inputRef.error = !allPassed;
    return allPassed;
  }
  return true;
};
const updateValue = (e: Event) => {
  const targetVal = (e.target as HTMLInputElement).value;
  inputRef.val = targetVal;
  emit("update:modelValue", targetVal);
};
const resetValue = () => {
  inputRef.val = "";
};
defineExpose({ validateInput });
</script>
<template>
  <div class="validate-input-container pb-3">
    <input
      v-bind="$attrs"
      :class="{ 'is-invalid': inputRef.error }"
      class="form-control"
      :value="inputRef.val"
      @input="updateValue"
      @blur="validateInput"
    />
    <span v-if="inputRef.error" class="invalid-feedback">
      {{ inputRef.message }}</span
    >
  </div>
</template>
