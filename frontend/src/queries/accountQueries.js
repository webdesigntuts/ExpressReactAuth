import { queryClient, axios } from "../config/config";
import { useMutation, useQuery } from "@tanstack/react-query";

const ME_KEY = ["Me"];

const deleteAccount = async () => {
  const { data } = await axios.delete("me");
  return data;
};

const useDeleteAccount = () =>
  useMutation({
    mutationFn: deleteAccount,
    onSuccess: (data) => {
      queryClient.setQueriesData(ME_KEY, { authed: false });
      return data;
    },
  });

export { useDeleteAccount };
