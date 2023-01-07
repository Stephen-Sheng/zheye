<script setup lang="ts">
import { onUnmounted } from "vue";

defineProps<{ text?: string; background?: string }>();
const node = document.createElement("div");
node.id = "back";
document.body.appendChild(node);
onUnmounted(() => {
  document.body.removeChild(node);
});
</script>

<template>
  <teleport to="#back">
    <div
      :style="{ backgroundColor: background || '' }"
      class="d-flex justify-content-center align-items-center h-100 loading-container"
    >
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">{{ text || "Loading..." }}</span>
      </div>
      <p v-if="text" class="text-primary small mb-0">{{ text }}</p>
    </div>
  </teleport>
</template>

<style scoped>
.loading-container {
  background: rgba(255, 255, 255, 0.5);
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.loading-container {
  text-align: center;
}
</style>
