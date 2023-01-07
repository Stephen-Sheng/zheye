import { createStore } from "vuex";
import { testData, testPosts } from "@/utils";
import type { ColumnProps } from "@/components/ColumnList.vue";
import type { PostProps } from "@/utils";
import type { UserProps } from "@/components/GlobalHeader.vue";

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: true,
      name: "Yutong",
      columnId: 1,
    },
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: "Yutong" };
    },
    createPost(state, newPost) {
      state.posts.push(newPost);
    },
  },
  getters: {
    biggerColumnsLen(state) {
      return state.columns.filter((item) => item.id > 2).length;
    },
    getColumnById: (state) => (currentId: number) => {
      return state.columns.find((item) => item.id === currentId);
    },
    getPostsByCid: (state) => (cid: number) => {
      return state.posts.filter((post) => post.columnId === cid);
    },
  },
});

export default store;
