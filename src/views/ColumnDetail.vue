<script setup lang="ts">
import { useRoute } from "vue-router";
import PostList from "@/components/PostList.vue";
import { useStore } from "vuex";
import type { GlobalDataProps } from "@/store";
import { computed, onMounted, type ComputedRef } from "vue";
import type { ColumnProps } from "@/components/ColumnList.vue";
import avatar from "@/assets/avatar.jpeg";
import useLoadMore from "@/hooks/useLoadMore";
const store = useStore<GlobalDataProps>();
const route = useRoute();
const currentId = route.params.id;
const column = computed<ColumnProps>(() =>
  store.getters.getColumnById(currentId)
);
const list = computed(() => store.getters.getPostsByCid(currentId));
const total = computed(() => store.getters.getPostsCountById(currentId));
const currentPage = computed(() =>
  store.getters.getPostsCurrentPageById(currentId)
);
const { isLastPage, loadMorePage } = useLoadMore(
  "fetchPosts",
  total as ComputedRef<number>,
  {
    cid: currentId,
    currentPage: currentPage.value ? currentPage.value + 1 : 2,
    pageSize: 5,
  }
);
onMounted(() => {
  console.log(isLastPage.value);
  store.dispatch("fetchColumn", currentId);
  store.dispatch("fetchPosts", { cid: currentId, currentPage: 1, pageSize: 5 });
});
const handleClickMore = () => {
  loadMorePage();
};
</script>

<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="column"
    >
      <div class="col-3 text-center">
        <img
          :src="column.avatar ? column.avatar.url : avatar"
          :alt="column.title"
          class="rounded-circle border w-50"
        />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <PostList :list="list"></PostList>
    <div class="d-flex justify-content-center align-content-center">
      <button
        v-if="!isLastPage"
        @click.prevent="handleClickMore"
        class="btn btn-outline-primary mt-2 mb-5 btn-block w-25"
      >
        加载更多
      </button>
    </div>
  </div>
</template>
<style scoped></style>
