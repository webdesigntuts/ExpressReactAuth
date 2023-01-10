import { QueryClient } from "@tanstack/react-query";
import Axios from "axios";

const queryClient = new QueryClient();

const axios = Axios.create({
  baseURL:
    `${import.meta.env.VITE_AXIOS_BASE_URL}/api` || "http://localhost:5173/api",
  withCredentials: true,
});

export { queryClient, axios };
