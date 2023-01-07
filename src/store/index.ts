import { createStore } from "vuex";
import { testPosts } from "@/utils";
import type { ColumnProps } from "@/components/ColumnList.vue";
import type { PostProps } from "@/utils";
import type { UserProps } from "@/components/GlobalHeader.vue";
import axios from "axios";

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
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
    fetchColumns(state, rawData) {
      state.columns = rawData.data.list;
    },
  },
  actions: {
    fetchColumns(context) {
      axios.get("/columns").then((res) => {
        context.commit("fetchColumns", res.data);
      });
    },
  },
  getters: {
    biggerColumnsLen(state) {
      return state.columns.filter((item) => +item._id > 2).length;
    },
    getColumnById: (state) => (currentId: number) => {
      return state.columns.find((item) => +item._id === currentId);
    },
    getPostsByCid: (state) => (cid: number) => {
      return state.posts.filter((post) => post.columnId === cid);
    },
  },
});

export default store;
