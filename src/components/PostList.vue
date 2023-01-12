<script setup lang="ts">
import type { PostProps } from "@/utils";
import { useRouter } from "vue-router";
defineProps<{ list: PostProps[] }>();
const router = useRouter();
const handleClickPost = (pid: string) => {
  router.push(`/post/${pid}`);
};
</script>

<template>
  <div class="post-list">
    <article
      @click="() => handleClickPost(post._id as string)"
      v-for="post in list"
      :key="post._id"
      class="card mb-3 shadow-sm"
    >
      <div class="card-body">
        <h4>{{ post.title }}</h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image" class="col-3">
            <img
              :src="post.image.url"
              :alt="post.title"
              class="rounded-lg w-75"
            />
          </div>
          <p :class="{ 'col-9': post.image }">{{ post.excerpt }}</p>
        </div>
        <span class="text-muted">{{ post.createdAt }}</span>
      </div>
    </article>
  </div>
</template>
<style scoped>
.card-body img {
  width: 50%;
  height: 50%;
}
.post-list article {
  cursor: pointer;
}
</style>
