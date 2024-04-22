import { toast } from "react-toastify";

export function notify() {
  toast.success("Lista criada com sucesso!", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    theme: "light",
  });
}
