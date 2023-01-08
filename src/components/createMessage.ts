import Message from "./Message.vue";
import { createApp } from "vue";
import type { MessageType } from "./Message.vue";
const createMessage = (type: MessageType, message: string, timeout = 2000) => {
  const messageInstance = createApp(Message, {
    message,
    type,
  });
  const mountNode = document.createElement("div");
  document.body.appendChild(mountNode);
  messageInstance.mount(mountNode);
  setTimeout(() => {
    messageInstance.unmount();
    document.body.removeChild(mountNode);
  }, timeout);
};
export default createMessage;
