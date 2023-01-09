/*
 * @Author: Yutong Sheng
 * @Date: 2023-01-08 10:57:46
 * @Last Modified by: Yutong Sheng
 * @Last Modified time: 2023-01-08 10:58:07
 */
import { ref, onMounted, onUnmounted, type Ref } from "vue";

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false);
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false;
      } else {
        isClickOutside.value = true;
      }
    }
  };
  onMounted(() => {
    document.addEventListener("click", handler);
  });
  onUnmounted(() => {
    document.removeEventListener("click", handler);
  });
  return isClickOutside;
};

export default useClickOutside;
