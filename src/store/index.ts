import { createStore } from "vuex";
import type { Commit } from "vuex";
import type { ColumnProps } from "@/components/ColumnList.vue";
import type { UserProps } from "@/components/GlobalHeader.vue";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import type { PostProps } from "@/utils";

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
  loading: boolean;
  token: string;
  error: GlobalErrorProps;
}
export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}

const getAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit
) => {
  const { data } = await axios.get(url);
  commit(mutationName, data);
  return data;
};

const postAndCommit = async (
  url: string,
  payload: any,
  mutationName: string,
  commit: Commit
) => {
  const { data } = await axios.post(url, payload);
  commit(mutationName, data);
  return data;
};

const asyncAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit,
  config: AxiosRequestConfig = { method: "GET" }
) => {
  const { data } = await axios(url, config);
  commit(mutationName, data);
  return data;
};

const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: [],
    user: {
      isLogin: false,
    },
    loading: false,
    token: localStorage.getItem("token") || "",
    error: { status: false },
  },
  mutations: {
    // login(state) {
    //   state.user = { ...state.user, isLogin: true, name: "Yutong" };
    // },
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
    fetchPost(state, rawData) {
      state.posts = [rawData.data];
    },
    updatePost(state, { data }) {
      state.posts = state.posts.map((post) => {
        if (post._id === data._id) {
          console.log(data);
          return data;
        } else {
          return post;
        }
      });
    },
    fetchCurrentUser(state, rawData) {
      state.user = { isLogin: true, ...rawData.data };
    },
    setLoading(state, status) {
      state.loading = status;
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e;
    },
    login(state, rawData) {
      const { token } = rawData.data;
      state.token = token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    logout(state) {
      localStorage.removeItem("token");
      state.user = {
        email: "",
        isLogin: false,
        column: "",
        nickName: "",
      };
      state.token = "";
      Reflect.deleteProperty(axios.defaults.headers.common, "Authorization");
    },
  },
  actions: {
    fetchColumns({ commit }) {
      return getAndCommit("/columns", "fetchColumns", commit);
    },
    fetchColumn({ commit }, cid) {
      return getAndCommit(`/columns/${cid}`, "fetchColumn", commit);
    },
    fetchPosts({ commit }, cid) {
      return getAndCommit(`/columns/${cid}/posts`, "fetchPosts", commit);
    },
    fetchPost({ commit }, pid) {
      return getAndCommit(`/posts/${pid}`, "fetchPost", commit);
    },
    fetchCurrentUser({ commit }) {
      return getAndCommit("/user/current", "fetchCurrentUser", commit);
    },
    login({ commit }, payload) {
      return postAndCommit("/user/login", payload, "login", commit);
    },
    loginAndFetch({ dispatch }, loginData) {
      return dispatch("login", loginData).then(() => {
        return dispatch("fetchCurrentUser");
      });
    },
    createPost({ commit }, payload) {
      return postAndCommit("/posts", payload, "createPost", commit);
    },
    updatePost({ commit }, { id, payload }) {
      return asyncAndCommit(`/posts/${id}`, "updatePost", commit, {
        method: "PATCH",
        data: payload,
      });
    },
  },
  getters: {
    getColumnById: (state) => (currentId: string) => {
      return state.columns.find((item) => item._id === currentId);
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter((post) => post.column === cid);
    },
    getCurrentPost: (state) => (pid: string) => {
      return state.posts.find((item) => item._id === pid);
    },
  },
});

export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}

export interface ResponseType<P = {}> {
  code: number;
  msg: string;
  data: P;
}

export default store;
