<script setup lang="ts">
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import type { GlobalDataProps, ImageProps } from "@/store";
import { computed, onMounted, type ComputedRef } from "vue";
import { generateFitUrl } from "@/utils/helper";
import MarkdownIt from "markdown-it";
import type { UserProfileProps } from "@/components/UserProfile.vue";
import UserProfile from "@/components/UserProfile.vue";
interface PostDetailProps {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  isHTML: boolean;
  author: UserProfileProps;
  column: string;
  image?: ImageProps;
  createdAt: string;
}
const store = useStore<GlobalDataProps>();
const route = useRoute();
const currentId = route.params.id;
const post: ComputedRef<PostDetailProps> = computed(() =>
  store.getters.getCurrentPost(currentId)
);
onMounted(() => {
  store.dispatch("fetchPost", currentId);
});
const md = new MarkdownIt();
const imageFitUrl = computed(() => {
  if (post.value.image) {
    generateFitUrl(post.value.image, 1000, 1000, ["jpeg"]);
    return post.value.image?.fitUrl;
  } else {
    return null;
  }
});
const currentHTML = computed(() => {
  if (post.value && post.value.content) {
    const { isHTML, content } = post.value;
    return isHTML ? content : md.render(content);
  }
  return null;
});
</script>

<template>
  <div class="post-detail">
    <article class="w-50 mx-auto mb-5 pb-3" v-if="post">
      <img
        v-if="imageFitUrl"
        :src="imageFitUrl"
        alt="post.title"
        class="rounded-lg img-fluid my-4"
      />
      <h2 class="mb-4">{{ post.title }}</h2>
      <div
        class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0"
      >
        <div class="col">
          <UserProfile :user="post.author" />
        </div>
        <span class="text-muted col text-right font-italic"
          >发表于：{{ post.createdAt }}</span
        >
      </div>
      <div v-html="currentHTML"></div>
    </article>
  </div>
</template>
<style></style>