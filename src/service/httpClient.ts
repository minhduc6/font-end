import axios from "axios";

const getToken = () => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const bearer = token ? `Bearer ${token}` : "";

  return bearer;
};

export const httpClient = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  headers: {
     Authorization: getToken(),
    "Content-Type": "application/json;charset=utf-8",
  }
});

httpClient.interceptors.request.use((config: any) => {
  config.headers.Authorization = getToken();
  return config;
});

