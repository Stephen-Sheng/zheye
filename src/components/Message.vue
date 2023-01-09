<script setup lang="ts">
import useDOMCreate from "@/hooks/useDOMCreate";
import { ref } from "vue";
export type MessageType = "success" | "error" | "default";
const props = withDefaults(
  defineProps<{ type?: MessageType; message: string }>(),
  { type: "default" }
);
const emits = defineEmits<{ (e: "close-message", status: boolean): void }>();
useDOMCreate("message");
const isVisible = ref(true);
const classObj = {
  "alert-success": props.type === "success",
  "alert-danger": props.type === "error",
  "alert-primary": props.type === "default",
};
const hide = () => {
  isVisible.value = false;
  emits("close-message", true);
};
</script>

<template>
  <teleport to="#message">
    <div
      v-if="isVisible"
      :class="classObj"
      class="alert message-info fixed-top w-25 mx-auto d-flex justify-content-between mt-2"
    >
      <span> {{ message }} </span>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        @click.prevent="hide"
      ></button>
    </div>
  </teleport>
</template>

<style scoped></style>
