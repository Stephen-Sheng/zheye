import { createStore } from "vuex";
import type { Commit } from "vuex";
import type { ColumnProps } from "@/components/ColumnList.vue";
import type { UserProps } from "@/components/GlobalHeader.vue";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import type { PostProps } from "@/utils";
import { arrToObj, ObjToArr } from "@/utils/helper";

export interface GlobalDataProps {
  columns: { data: ListProps<ColumnProps>; isLoaded: boolean };
  posts: { data: ListProps<PostProps>; loadedColumns: string[] };
  user: UserProps;
  loading: boolean;
  token: string;
  error: GlobalErrorProps;
}

export interface ListProps<P> {
  [id: string]: P;
}
export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}
const asyncAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit,
  config: AxiosRequestConfig = { method: "GET" },
  extraData?: any
) => {
  const { data } = await axios(url, config);
  if (extraData) {
    commit(mutationName, { data, extraData });
  } else {
    commit(mutationName, data);
  }
  return data;
};

const store = createStore<GlobalDataProps>({
  state: {
    columns: { data: {}, isLoaded: false },
    posts: { data: {}, loadedColumns: [] },
    user: {
      isLogin: false,
    },
    loading: false,
    token: localStorage.getItem("token") || "",
    error: { status: false },
  },
  mutations: {
    createPost(state, newPost) {
      state.posts.data[newPost._id] = newPost;
    },
    fetchColumns(state, rawData) {
      state.columns.data = arrToObj(rawData.data.list);
      state.columns.isLoaded = true;
    },
    fetchColumn(state, rawData) {
      state.columns.data[rawData.data._id] = rawData.data;
    },
    fetchPosts(state, { data: rawData, extraData: columnId }) {
      state.posts.data = {
        ...state.posts.data,
        ...arrToObj(rawData.data.list),
      };
      state.posts.loadedColumns.push(columnId);
    },
    fetchPost(state, rawData) {
      state.posts.data[rawData.data._id] = rawData.data;
    },
    updatePost(state, { data }) {
      state.posts.data[data._id] = data;
    },
    deletePost(state, { data }) {
      Reflect.deleteProperty(state.posts.data, data._id);
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
    fetchColumns({ state, commit }) {
      if (!state.columns.isLoaded) {
        return asyncAndCommit("/columns", "fetchColumns", commit);
      }
    },
    fetchColumn({ state, commit }, cid) {
      if (!state.columns.data[cid]) {
        return asyncAndCommit(`/columns/${cid}`, "fetchColumn", commit);
      }
    },
    fetchPosts({ state, commit }, cid) {
      if (!state.posts.loadedColumns.includes(cid)) {
        return asyncAndCommit(
          `/columns/${cid}/posts`,
          "fetchPosts",
          commit,
          { method: "get" },
          cid
        );
      }
    },
    fetchPost({ state, commit }, pid) {
      const currentPost = state.posts.data[pid];

      if (!currentPost || !currentPost.content) {
        return asyncAndCommit(`/posts/${pid}`, "fetchPost", commit);
      }
      return Promise.resolve({ data: currentPost });
    },
    fetchCurrentUser({ commit }) {
      return asyncAndCommit("/user/current", "fetchCurrentUser", commit);
    },
    login({ commit }, payload) {
      return asyncAndCommit("/user/login", "login", commit, {
        method: "POST",
        data: payload,
      });
    },
    loginAndFetch({ dispatch }, loginData) {
      return dispatch("login", loginData).then(() => {
        return dispatch("fetchCurrentUser");
      });
    },
    createPost({ commit }, payload) {
      return asyncAndCommit("/posts", "createPost", commit, {
        method: "POST",
        data: payload,
      });
    },
    updatePost({ commit }, { id, payload }) {
      return asyncAndCommit(`/posts/${id}`, "updatePost", commit, {
        method: "PATCH",
        data: payload,
      });
    },
    deletePost({ commit }, id) {
      return asyncAndCommit(`/posts/${id}`, "deletePost", commit, {
        method: "DELETE",
      });
    },
  },
  getters: {
    getColumnById: (state) => (currentId: string) => {
      return state.columns.data[currentId];
    },
    getPostsByCid: (state) => (cid: string) => {
      return ObjToArr(state.posts.data).filter((post) => post.column === cid);
    },
    getCurrentPost: (state) => (pid: string) => {
      return state.posts.data[pid];
    },
    getColumns: (state) => ObjToArr(state.columns.data),
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
