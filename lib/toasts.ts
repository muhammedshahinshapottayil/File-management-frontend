import { toast } from "react-toastify";
const notify = (message: string) => toast(message);
const errorToast = (error: any) => {
  console.error(error);
  error?.response?.data?.errors.forEach((element: { message: string }) => {
    errorToast(element.message);
    toast.error(element.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  });
};

export { notify, errorToast };
