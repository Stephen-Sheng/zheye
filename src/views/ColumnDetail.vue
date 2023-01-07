<script setup lang="ts">
import { useRoute } from "vue-router";
import PostList from "@/components/PostList.vue";
import { useStore } from "vuex";
import type { GlobalDataProps } from "@/store";
import { computed, onMounted } from "vue";
import type { ColumnProps } from "@/components/ColumnList.vue";
const store = useStore<GlobalDataProps>();
const route = useRoute();
const currentId = route.params.id;
const column = computed<ColumnProps>(() =>
  store.getters.getColumnById(currentId)
);
const list = computed(() => store.getters.getPostsByCid(currentId));
onMounted(() => {
  store.dispatch("fetchColumn", currentId);
  store.dispatch("fetchPosts", currentId);
});
</script>

<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="column"
    >
      <div class="col-3 text-center">
        <img
          :src="column.avatar?.url"
          :alt="column.title"
          class="rounded-circle border w-75"
        />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <PostList :list="list"></PostList>
  </div>
</template>
