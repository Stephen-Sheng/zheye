<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalHeader from "@/components/GlobalHeader.vue";
import type { UserProps } from "@/components/GlobalHeader.vue";
import CustomForm from "./components/CustomForm.vue";

// const testData: ColumnProps[] = [
//   {
//     id: 1,
//     title: "test1的专栏",
//     description: "这是的test1专栏，有一段非常有意思的简介，可以更新一下欧",
//     avatar:
//       "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
//   },
//   {
//     id: 2,
//     title: "test2的专栏",
//     description: "这是的test2专栏，有一段非常有意思的简介，可以更新一下欧",
//     // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
//   },
//   {
//     id: 3,
//     title: "test2的专栏",
//     description: "这是的test2专栏，有一段非常有意思的简介，可以更新一下欧",
//     avatar:
//       "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
//   },
//   {
//     id: 4,
//     title: "test2的专栏",
//     description: "这是的test2专栏，有一段非常有意思的简介，可以更新一下欧",
//     avatar:
//       "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
//   },
//   {
//     id: 5,
//     title: "test2的专栏",
//     description: "这是的test2专栏，有一段非常有意思的简介，可以更新一下欧",
//     avatar:
//       "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
//   },
// ];
const currentUser: UserProps = {
  isLogin: true,
  name: "Yutong",
  id: 1,
};
</script>

<template>
  <GlobalHeader :user="currentUser" />
  <!-- <div class="container">
    <ColumnList :list="testData" />
  </div> -->
  <CustomForm />
</template>

<style scoped></style>
