<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalHeader from "@/components/GlobalHeader.vue";
import { useStore } from "vuex";
import type { GlobalDataProps } from "./store";
import { computed, watch } from "vue";
import CustomLoader from "./components/CustomLoader.vue";
import createMessage from "./components/createMessage";
const store = useStore<GlobalDataProps>();
const currentUser = computed(() => store.state.user);
const isLoading = computed(() => store.state.loading);
const error = computed(() => store.state.error);
watch(
  () => error.value.status,
  () => {
    const { status, message } = error.value;
    if (status && message) {
      createMessage("error", message, 2000);
    }
  }
);
</script>

<template>
  <global-header :user="currentUser"></global-header>
  <div class="container">
    <CustomLoader
      v-if="isLoading"
      text="Loading..."
      background="rgba(0,0,0,0.8)"
    />
    <router-view> </router-view>
  </div>
  <footer class="text-center py-4 text-secondary bg-light mt-6">
    <small>
      <ul class="list-inline mb-0">
        <li class="list-inline-item">© 2023 者也专栏</li>
        <li class="list-inline-item">课程</li>
        <li class="list-inline-item">文档</li>
        <li class="list-inline-item">联系</li>
        <li class="list-inline-item">更多</li>
      </ul>
    </small>
  </footer>
</template>

<style scoped></style>
