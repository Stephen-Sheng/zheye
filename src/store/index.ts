import { createStore } from "vuex";
import type { Commit } from "vuex";
import type { ColumnProps } from "@/components/ColumnList.vue";
import type { PostProps } from "@/utils";
import type { UserProps } from "@/components/GlobalHeader.vue";
import axios from "axios";

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
  loading: boolean;
}
export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}

const getAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit
) => {
  const { data } = await axios.get(url);
  commit(mutationName, data);
};

const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: [],
    user: {
      isLogin: true,
      name: "Yutong",
      columnId: 1,
    },
    loading: false,
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
    fetchColumn(state, rawData) {
      state.columns = [rawData.data];
    },
    fetchPosts(state, rawData) {
      state.posts = rawData.data.list;
    },
    setLoading(state, status) {
      state.loading = status;
    },
  },
  actions: {
    fetchColumns({ commit }) {
      getAndCommit("/columns", "fetchColumns", commit);
    },
    fetchColumn({ commit }, cid) {
      getAndCommit(`/columns/${cid}`, "fetchColumn", commit);
    },
    fetchPosts({ commit }, cid) {
      getAndCommit(`/columns/${cid}/posts`, "fetchPosts", commit);
    },
  },
  getters: {
    getColumnById: (state) => (currentId: string) => {
      return state.columns.find((item) => item._id === currentId);
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter((post) => post.column === cid);
    },
  },
});

export default store;
