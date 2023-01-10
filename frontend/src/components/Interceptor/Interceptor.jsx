import React, { useEffect } from "react";
import { queryClient, axios } from "../../config/config";

const UNAUTHORIZED = 401;
const Interceptor = () => {
  const interceptor = axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      //IF THE RESPONSE IS UNAUTHORIZED CAUSE SESSION IS EXPIRED OR DELETED
      if (error?.response?.status === UNAUTHORIZED) {
        //Set the 'ME' query to {authed: false}
        queryClient.setQueriesData(["Me"], { authed: false });
        //Remove all queries except the 'ME' query
        queryClient.removeQueries({
          predicate: (query) => {
            return query.queryKey[0] !== "Me";
          },
        });
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return <></>;
};

export default Interceptor;
