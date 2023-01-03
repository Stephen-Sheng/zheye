<script setup lang="ts">
import { computed } from "vue";
import columnImg from "@/assets/column.jpeg";

export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}
const props = defineProps<{ list: ColumnProps[] }>();
const columnList = computed(() => {
  return props.list.map((column) => {
    if (!column.avatar) {
      column.avatar = columnImg;
    }
    return column;
  });
});
</script>

<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="column.avatar"
            :alt="column.title"
            class="rounded-circle border border-light w-25 my-3"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-start">{{ column.description }}</p>
          <a href="#" class="btn btn-outline-primary">进入专栏</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
