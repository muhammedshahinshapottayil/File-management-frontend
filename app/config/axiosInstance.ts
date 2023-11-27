import axios from "axios";
export default axios.create({
  baseURL: "https://file-manager-31ui.onrender.com/api",

  // headers: {
  //   "Content-Type": "multipart/form-data",
  // },
});
