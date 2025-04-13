import { Store } from "react-notifications-component";

const Notify = ({ title, message, Type }) => {
  Store.addNotification({
    title,
    message,
    type: Type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};

export default Notify;
