<script setup lang="ts">
import { computed } from "vue";
import columnImg from "@/assets/column.jpeg";
import type { ImageProps } from "@/store";
import { generateFitUrl } from "@/utils/helper";

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
const props = defineProps<{ list: ColumnProps[] }>();
const columnList = computed(() => {
  return props.list.map((column) => {
    if (!column.avatar) {
      column.avatar = {
        url: columnImg,
      };
    } else {
      generateFitUrl(column.avatar, 50, 50);
    }
    return column;
  });
});
</script>

<template>
  <div class="row">
    <div v-for="column in columnList" :key="column._id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="column.avatar?.fitUrl"
            :alt="column.title"
            class="rounded-circle border border-light my-3"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-start">{{ column.description }}</p>
          <RouterLink
            :to="`/column/${column._id}`"
            class="btn btn-outline-primary"
            >进入专栏</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>
