<script setup lang="ts">
import { reactive } from "vue";
import DropdownMenu from "@/components/DropdownMenu.vue";
import DropdownItem from "./DropdownItem.vue";
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
const props = defineProps<{ user: UserProps }>();
const user = reactive(props.user);
</script>

<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="#">者也专栏</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light my-2">登录</a>
      </li>
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light my-2">注册</a>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <DropdownMenu :title="user.name">
          <DropdownItem
            ><a class="dropdown-item" href="#">新建文章</a></DropdownItem
          >
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
