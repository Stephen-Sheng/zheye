<script setup lang="ts">
import avatar from "@/assets/avatar.jpeg";
export interface UserProfileProps {
  _id: string;
  nickName: string;
  avatar?: {
    _id: string;
    url: string;
  };
  description: string;
}
defineProps<{ user: UserProfileProps }>();
</script>

<template>
  <div class="user-profile-container">
    <div class="d-flex align-items-center">
      <img
        :src="user.avatar ? user.avatar.url : avatar"
        :alt="user.nickName"
        class="rounded-circle img-thumbnail"
      />
      <div class="detail ml-2">
        <h6 class="d-block mb-0">{{ user.nickName }}</h6>
        <span class="text-truncate text-muted d-block">{{
          user.description
        }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-profile-container img {
  width: 50px;
  height: 50px;
}
</style>
