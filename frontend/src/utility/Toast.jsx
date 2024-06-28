import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Toaster = () => {
  function success(message) {
    console.log("message--->", message);
    return toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        border: "2px solid #07BC0C",
        borderLeft: "10px solid #07BC0C",
        borderRadius: "10px",
        fontFamily: "Poppins",
        fontSize: "1.5rem",
      },
    });
  }

  function warning(message) {
    return toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        border: "2px solid #3498DB",
        borderLeft: "10px solid #3498DB",
        borderRadius: "10px",
        fontFamily: "Poppins",
        fontSize: "1.5rem",
      },
    });
  }

  function error(message) {
    return toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        border: "2px solid #E74C3C",
        borderLeft: "10px solid #E74C3C",
        borderRadius: "10px",
        fontFamily: "Poppins",
        fontSize: "1.5rem",
      },
    });
  }

  return {
    success,
    warning,
    error,
  };
};
