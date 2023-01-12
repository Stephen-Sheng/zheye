<script setup lang="ts">
import { computed } from "vue";
import DropdownMenu from "@/components/DropdownMenu.vue";
import DropdownItem from "./DropdownItem.vue";
import { useStore } from "vuex";
import type { GlobalDataProps } from "@/store";
import { useRouter } from "vue-router";
import createMessage from "./createMessage";
export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
}
const store = useStore<GlobalDataProps>();
const router = useRouter();
const props = defineProps<{ user: UserProps }>();
const user = computed(() => props.user);
const logout = () => {
  store.commit("logout");
  createMessage("success", "已登出 正在跳转首页", 2000);
  setTimeout(() => router.push("/"), 1000);
};
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
        <RouterLink to="/signup" class="btn btn-outline-light my-2"
          >注册</RouterLink
        >
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <DropdownMenu :title="user.nickName">
          <DropdownItem>
            <RouterLink class="dropdown-item" to="/create">新建文章</RouterLink>
          </DropdownItem>
          <DropdownItem>
            <RouterLink
              class="dropdown-item"
              :to="`/column/${store.state.user.column}`"
              >我的专栏</RouterLink
            >
          </DropdownItem>
          <DropdownItem disabled
            ><a class="dropdown-item" href="#">编辑资料</a></DropdownItem
          >
          <DropdownItem
            ><a class="dropdown-item" href="#" @click.prevent="logout"
              >退出登录</a
            ></DropdownItem
          >
        </DropdownMenu>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
