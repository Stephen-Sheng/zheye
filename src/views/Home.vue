<script setup lang="ts">
import { useStore } from "vuex";
import ColumnList from "@/components/ColumnList.vue";
import type { GlobalDataProps } from "@/store";
import { computed, onMounted } from "vue";
import useLoadMore from "@/hooks/useLoadMore";
const store = useStore<GlobalDataProps>();
const list = computed(() => store.getters.getColumns);
const total = computed(() => store.state.columns.total);
const currentPage = computed(() => store.state.columns.currentPage);
const { loadMorePage, isLastPage } = useLoadMore("fetchColumns", total, {
  pageSize: 3,
  currentPage: currentPage.value ? currentPage.value + 1 : 2,
});
onMounted(() => {
  store.dispatch("fetchColumns", { pageSize: 3 });
});
</script>

<template>
  <div class="home-page container">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
    <div class="d-flex justify-content-center align-content-center">
      <button
        v-if="!isLastPage"
        @click="loadMorePage"
        class="btn btn-outline-primary mt-2 mb-5 btn-block w-25"
      >
        加载更多
      </button>
    </div>
  </div>
</template>
