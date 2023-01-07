<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalHeader from "@/components/GlobalHeader.vue";
import { useStore } from "vuex";
import type { GlobalDataProps } from "./store";
import { computed } from "vue";
const store = useStore<GlobalDataProps>();
const currentUser = computed(() => store.state.user);
const isLoading = computed(() => store.state.loading);
</script>

<template>
  <global-header :user="currentUser"></global-header>
  <div class="container">
    <h1 v-if="isLoading">Loading...</h1>
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
