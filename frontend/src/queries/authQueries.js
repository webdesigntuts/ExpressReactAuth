import { queryClient, axios } from "../config/config";
import { useMutation, useQuery } from "@tanstack/react-query";

const ME_KEY = ["Me"];

const whoami = async () => {
  try {
    const { data } = await axios.get("/whoami");
    return data;
  } catch (e) {
    return { authed: false };
  }
};

const useWhoami = () =>
  useQuery({
    queryKey: ME_KEY,
    staleTime: Infinity,
    retry: false,
    queryFn: whoami,
    onError: (error) => {
      return error;
    },
  });

const login = async (body) => {
  const { data } = await axios.post("/login", body);
  return data;
};

const useLogin = () =>
  useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.invalidateQueries(ME_KEY);
      return data;
    },
  });

const logout = async () => {
  try {
    const { data } = await axios.post("/logout");
    return data;
  } catch (e) {
    throw e;
  }
};

const useLogout = () =>
  useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      queryClient.setQueriesData(ME_KEY, { authed: false });
      return data;
    },
    onError: (error) => {
      queryClient.setQueriesData(ME_KEY, { authed: false });
    },
  });

const register = async (body) => {
  try {
    const { data } = await axios.post("/register", body);
    return data;
  } catch (e) {
    throw e?.response?.data?.message;
  }
};

const useRegister = () =>
  useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      queryClient.invalidateQueries(ME_KEY);
      return data;
    },
  });

export { useWhoami, useLogin, useLogout, useRegister };
