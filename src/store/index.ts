import { createStore } from "vuex";
import type { Commit } from "vuex";
import type { ColumnProps } from "@/components/ColumnList.vue";
import type { UserProps } from "@/components/GlobalHeader.vue";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import type { PostProps } from "@/utils";
import { arrToObj, ObjToArr } from "@/utils/helper";

export interface GlobalDataProps {
  columns: {
    data: ListProps<ColumnProps>;
    total: number;
    currentPage: number;
  };
  posts: {
    data: ListProps<PostProps>;
    loadedColumns: ListProps<{ total?: number; currentPage?: number }>;
  };
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
    columns: { data: {}, currentPage: 0, total: 0 },
    posts: { data: {}, loadedColumns: {} },
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
      const { data } = state.columns;
      const { list, count, currentPage } = rawData.data;
      state.columns = {
        data: { ...data, ...arrToObj(list) },
        total: count,
        currentPage: Number(currentPage),
      };
    },
    fetchColumn(state, rawData) {
      state.columns.data[rawData.data._id] = rawData.data;
    },
    fetchPosts(state, { data: rawData, extraData: columnId }) {
      state.posts.data = {
        ...state.posts.data,
        ...arrToObj(rawData.data.list),
      };
      const { count, currentPage } = rawData.data;
      state.posts.loadedColumns[columnId] = {
        total: Number(count),
        currentPage: Number(currentPage),
      };
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
    fetchColumns({ state, commit }, params = {}) {
      const { currentPage = 1, pageSize = 6 } = params;
      if (state.columns.currentPage < currentPage) {
        return asyncAndCommit(
          `/columns?currentPage=${currentPage}&pageSize=${pageSize}`,
          "fetchColumns",
          commit
        );
      }
    },
    fetchColumn({ state, commit }, cid) {
      if (!state.columns.data[cid]) {
        return asyncAndCommit(`/columns/${cid}`, "fetchColumn", commit);
      }
    },
    fetchPosts({ state, commit }, params = {}) {
      const { cid, currentPage = 1, pageSize = 5 } = params;
      const { loadedColumns } = state.posts;
      const loadedCurrentPage =
        (loadedColumns[cid] && loadedColumns[cid].currentPage) || 1;
      if (
        !Object.keys(loadedColumns).includes(cid) ||
        loadedCurrentPage < currentPage
      ) {
        return asyncAndCommit(
          `/columns/${cid}/posts?currentPage=${currentPage}&pageSize=${pageSize}`,
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
    getPostsCountById: (state) => (cid: string) => {
      if (state.posts.loadedColumns[cid]) {
        return state.posts.loadedColumns[cid].total;
      } else return 0;
    },
    getPostsCurrentPageById: (state) => (cid: string) => {
      if (state.posts.loadedColumns[cid]) {
        return state.posts.loadedColumns[cid].currentPage;
      } else return 1;
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
