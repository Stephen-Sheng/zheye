<script setup lang="ts">
import useDOMCreate from "@/hooks/useDOMCreate";

withDefaults(defineProps<{ title: string; visible: boolean }>(), {
  visible: false,
});
const emits = defineEmits<{
  (e: "modal-on-close"): void;
  (e: "modal-on-confirm"): void;
}>();
useDOMCreate("modal");
const handleCancel = () => {
  emits("modal-on-close");
};
const handleConfirm = () => {
  emits("modal-on-confirm");
};
</script>

<template>
  <Teleport to="#modal">
    <div class="modal d-block" tabindex="-1" v-if="visible">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="handleCancel"
            ></button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="handleCancel"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="handleConfirm"
            >
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
