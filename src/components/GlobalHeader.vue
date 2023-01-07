<script setup lang="ts">
import { computed } from "vue";
import DropdownMenu from "@/components/DropdownMenu.vue";
import DropdownItem from "./DropdownItem.vue";
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
}
const props = defineProps<{ user: UserProps }>();
const user = computed(() => props.user);
</script>

<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <RouterLink class="navbar-brand" to="/">者也专栏</RouterLink>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <RouterLink to="/login" class="btn btn-outline-light my-2"
          >登录</RouterLink
        >
      </li>
      <li class="list-inline-item">
        <RouterLink to="/login" class="btn btn-outline-light my-2"
          >注册</RouterLink
        >
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <DropdownMenu :title="user.name">
          <DropdownItem>
            <RouterLink class="dropdown-item" to="/create">新建文章</RouterLink>
          </DropdownItem>
          <DropdownItem disabled
            ><a class="dropdown-item" href="#">编辑资料</a></DropdownItem
          >
          <DropdownItem
            ><a class="dropdown-item" href="#">退出登录</a></DropdownItem
          >
        </DropdownMenu>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
