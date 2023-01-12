<script setup lang="ts">
import type { Options } from "easymde";
import { onMounted, onUnmounted, ref, watch } from "vue";
import EasyMDE from "easymde";
interface EditorProps {
  modelValue?: string;
  options?: Options;
}
interface EditorEvents {
  (type: "update:modelValue", value: string): void;
  (type: "change", value: string): void;
  (type: "blur"): void;
}
const props = defineProps<EditorProps>();
const emit = defineEmits<EditorEvents>();
const textArea = ref<null | HTMLTextAreaElement>(null);
let easyMDEInstance: EasyMDE | null = null;
const innerValue = ref(props.modelValue || "");
const clear = () => {
  easyMDEInstance?.value("");
};
const getMDEInstance = () => {
  return easyMDEInstance;
};
defineExpose({ clear, getMDEInstance });
onMounted(() => {
  if (textArea.value) {
    const config: Options = {
      element: textArea.value,
      initialValue: innerValue.value,
      ...(props.options || {}),
    };
    easyMDEInstance = new EasyMDE(config);
    easyMDEInstance.codemirror.on("change", () => {
      if (easyMDEInstance) {
        const updatedValue = easyMDEInstance.value();
        innerValue.value = updatedValue;
        emit("update:modelValue", updatedValue);
        emit("change", updatedValue);
      }
    });
    easyMDEInstance.codemirror.on("blur", () => {
      if (easyMDEInstance) {
        emit("blur");
      }
    });
  }
});
onUnmounted(() => {
  easyMDEInstance?.cleanup();
  easyMDEInstance = null;
});
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== innerValue.value) {
      easyMDEInstance?.value(newValue || "");
    }
  }
);
</script>

<template>
  <div class="vue-easymde-editor">
    <textarea ref="textArea"></textarea>
  </div>
</template>

<style>
.vue-easymde-editor.is-invalid {
  border: 1px solid #dc3545;
}
</style>
