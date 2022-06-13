import axios, { type AxiosRequestConfig } from "axios";
const axiosInstance = axios.create({
  baseURL: "https://swapi.dev/api/",
  headers: {
    "Content-type": "application/json",
  },
});

export default {
  async get<D>(url: string, config?: AxiosRequestConfig<D>) {
    try {
      const res = await axiosInstance.get(url, config);
      return res.data;
    } catch (e) {
      if (e.response.status === 404) {
        console.log("url not found");
      }
      throw e;
    }
  },
};
