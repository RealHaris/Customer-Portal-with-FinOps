import "toastr/build/toastr.min.css";

import axios from "axios";
import toastr from "toastr";

//apply base url for axios
const API_URL = import.meta.env.VITE_BASE_URL;
// const currentPath = document.location.pathname.split("/")[1];

const axiosApi = axios.create({
  baseURL: API_URL
});

const token = localStorage.getItem("AccessToken") || "";

axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// add header data_area_id for all api calls
axiosApi.defaults.headers.common["data_area_id"] = "All";

axiosApi.interceptors.response.use(
  (res) => {
    // Add configurations here

    return res;
  },
  (err) => {
    if (err.response) {
      const { data, status } = err.response;

      if (status === 401) {
        //unAuthorized
        toastr.error(data.message, "Unauthorized");
      } else if (status === 400) {
        //bad request
        //  toastr.error(data.message, "Bad Request");
      } else if (status === 403) {
        // Token Expired
        toastr.error(data.message, "Token Expired");
        localStorage.clear();
        window.location.href = "/login";
      } else {
        toastr.error("Some thing went wrong", "error");
      }
      return Promise.reject(err);
    } else {
      toastr.error("Some thing went wrong", "error");
      // return { message: "ERROR" };
    }
  }
);

// axiosApi.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   (err) => {
//     if (err.response) {
//       const { data, status } = err.response;

//       if (status === 403) {
//         // Token Expired
//         toastr.error(data.message, "Token Expired");
//         localStorage.clear();
//         window.location.href = "/login";
//       } else {
//         toastr.error("Some thing went wrong", "error");
//       }
//       return Promise.reject(err);
//     } else {
//       // toastr.error("Some thing went wrong", "error");
//       // return { message: "ERROR" };
//     }
//   }
// );

export async function get(url, config = {}) {
  return await axiosApi.get(url, config).then((response) => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi.post(url, { ...data }, { ...config }).then((response) => response.data);
}

export async function postwithnotoken(url, data, config = {}) {
  let res = await axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data)
    .catch((err) => err);
  axiosApi.defaults.headers.common["Authorization"] = `Bearer ${res.access_token}`;
  return res;
}

export async function postformData(url, data, config = {}) {
  return axiosApi.post(url, data, { ...config }).then((response) => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi.put(url, { ...data }, { ...config }).then((response) => response.data);
}

// patch request
export async function patch(url, data, config = {}) {
  return axiosApi.patch(url, { ...data }, { ...config }).then((response) => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi.delete(url, { ...config }).then((response) => response.data);
}
