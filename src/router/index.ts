import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import ColumnDetail from "@/views/ColumnDetail.vue";
import CreatePost from "@/views/CreatePost.vue";
import Signup from "@/views/Signup.vue";
import store from "@/store";
const routerHistory = createWebHistory();
export const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { redirectAlreadyLogin: true },
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
      meta: { redirectAlreadyLogin: true },
    },
    {
      path: "/column/:id",
      name: "column",
      component: ColumnDetail,
    },
    {
      path: "/create",
      name: "create",
      component: CreatePost,
      meta: { requiredLogin: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (!store.state.user.isLogin && to.meta.requiredLogin) {
    next({
      name: "login",
    });
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next("/");
  } else {
    next();
  }
});
