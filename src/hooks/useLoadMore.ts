import type { GlobalDataProps } from "@/store";
import { computed, ref, type ComputedRef } from "vue";
import { useStore } from "vuex";

interface LoadParams {
  currentPage: number;
  pageSize: number;
  [key: string]: any;
}
function useLoadMore(
  actionName: string,
  total: ComputedRef<number>,
  params: LoadParams = { currentPage: 2, pageSize: 5 }
) {
  const store = useStore<GlobalDataProps>();
  const currentPage = ref(params.currentPage);
  const requestParams = computed(() => ({
    ...params,
    currentPage: currentPage.value,
  }));

  const loadMorePage = () => {
    store.dispatch(actionName, requestParams.value).then(() => {
      currentPage.value++;
    });
  };
  const isLastPage = computed(() => {
    return Math.ceil(total.value / params.pageSize) < currentPage.value;
  });

  return {
    loadMorePage,
    isLastPage,
    currentPage,
  };
}

export default useLoadMore;
