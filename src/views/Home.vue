<script setup lang="ts">
import { useStore } from "vuex";
import ColumnList from "@/components/ColumnList.vue";
import type { GlobalDataProps } from "@/store";
import { computed, onMounted } from "vue";
import Uploader from "@/components/Uploader.vue";
import createMessage from "@/components/createMessage";
import type { ResponseType, ImageProps } from "@/store";
const store = useStore<GlobalDataProps>();
const list = computed(() => store.state.columns);
onMounted(() => {
  store.dispatch("fetchColumns");
});
const beforeUpload = (file: File) => {
  const isJPG = file.type === "image/jpeg";
  if (!isJPG) createMessage("error", "格式不对", 2000);
  return isJPG;
};
const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
  createMessage("success", `上传图片ID ${rawData.data._id}`, 2000);
};

const onFileUploadedFailed = (error: any) => {
  console.log(error);
  // createMessage('error', error)
};
</script>

<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <Uploader
      action="/upload"
      :before-upload="beforeUpload"
      @file-uploaded="onFileUploaded"
      @file-uploaded-error="onFileUploadedFailed"
    >
      <template #uploaded="slotProps">
        <img :src="slotProps.uploadedData.data.url" width="500" />
      </template>
    </Uploader>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
  </div>
</template>
