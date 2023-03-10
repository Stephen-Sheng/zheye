import type { ImageProps } from "@/store/index";
import mitt from "mitt";
import type { ValidateFunc } from "@/components/ValidateForm.vue";
import type { ClearFunc } from "@/components/ValidateInput.vue";
type Events = {
  "form-item-created": ValidateFunc;
  "form-item-clear": ClearFunc;
};
export const emitter = mitt<Events>();
export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps;
  createdAt?: string;
  column: string;
  author?: string;
}
