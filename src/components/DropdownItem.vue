<script setup lang="ts">
defineProps({ disabled: { type: Boolean, default: false } });
</script>

<template>
  <li class="dropdown-option" :class="{ 'is-disabled': disabled }">
    <slot></slot>
  </li>
</template>

<style>
.dropdown-option.is-disabled * {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
