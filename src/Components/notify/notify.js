import { toast } from "react-toastify";

export const notify = (message, status = "success", option) =>
  toast[status](message, option);
