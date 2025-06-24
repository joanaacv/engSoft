import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: any) => {
  let err = error?.response;
  if (axios.isAxiosError(error)) {
    err = error.response;
    if (Array.isArray(err?.data?.errors)) {
      for (let val of err.data.errors) {
        toast.warning(val.description);
      }
      return;
    }
  } else if (
    typeof err?.data?.errors === "object" &&
    err?.data?.errors !== null
  ) {
    for (let e in err.data.errors) {
      toast.warning(err.data.errors[e][0]);
    }
  } else if (err?.data) {
    toast.warning(err?.data);
  } else if (err?.status === 401) {
    toast.warning("Você não está autenticado. Por favor, faça login.");
    window.history.pushState({}, "HomePage", "/");
  } else if (err) {
    toast.warning(err?.data);
  }
};
