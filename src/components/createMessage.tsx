import Message from "./Message.vue";
import type { MessageType } from "./Message.vue";
import { render } from "vue";
const createMessage = (
  type: MessageType,
  message: string,
  timeout?: number
) => {
  const messageVnode = <Message type={type} message={message} />;
  const mountNode = document.createElement("div");
  document.body.appendChild(mountNode);
  render(messageVnode, mountNode);
  const destroy = () => {
    render(null, mountNode);
    document.body.removeChild(mountNode);
  };
  if (timeout) {
    setTimeout(() => {
      destroy();
    }, timeout);
  }
  return {
    destroy,
  };
};
export default createMessage;
