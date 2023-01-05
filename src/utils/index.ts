import mitt from "mitt";
import type { ValidateFunc } from "@/components/ValidateForm.vue";
import type { ClearFunc } from "@/components/ValidateInput.vue";
type Events = {
  "form-item-created": ValidateFunc;
  "form-item-clear": ClearFunc;
};
export const emitter = mitt<Events>();
