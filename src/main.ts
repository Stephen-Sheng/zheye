import { createApp } from "vue";
import App from "./App.vue";
import { router } from "@/router";
import store from "@/store";
import axios from "axios";
import "easymde/dist/easymde.min.css";

const ICode = "7A3566BE07F25452";
axios.defaults.baseURL = "http://apis.imooc.com/api/";
axios.interceptors.request.use((config) => {
  config.params = { ...config.params, icode: ICode };
  if (config.data instanceof FormData) {
    config.data.append("icode", ICode);
  } else {
    config.data = { ...config.data, icode: ICode };
  }
  return config;
});
axios.interceptors.request.use((config) => {
  store.commit("setLoading", true);
  store.commit("setError", { status: false });

  return config;
});
axios.interceptors.response.use(
  (config) => {
    store.commit("setLoading", false);
    return config;
  },
  (e) => {
    const { error } = e.response.data;
    store.commit("setError", { status: true, message: error });
    store.commit("setLoading", false);
    return Promise.reject(error);
  }
);

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
