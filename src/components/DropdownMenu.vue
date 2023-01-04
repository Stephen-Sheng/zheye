<script setup lang="ts">
import { ref, watch } from "vue";
import useClickOutside from "@/hooks/useClickOutside";

defineProps<{ title: string | undefined }>();
const toggle = ref(false);
const toggleOpen = () => {
  toggle.value = !toggle.value;
};
const dropdownRef = ref<HTMLElement | null>(null);
const isOutside = useClickOutside(dropdownRef);
watch(isOutside, () => {
  if (toggle.value && isOutside.value) {
    toggle.value = false;
  }
});
</script>

<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      @click.prevent="toggleOpen"
      class="btn btn-outline-light dropdown-toggle my-2"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      你好！{{ title }}
    </a>
    <ul v-if="toggle" class="dropdown-menu" :style="{ display: 'block' }">
      <slot></slot>
    </ul>
  </div>
</template>

<style scoped></style>
