import React from "react";
import Button from "../../components/Button";
import { useWhoami, useLogout } from "../../queries/authQueries";
import { useDeleteAccount } from "../../queries/accountQueries";
import styles from "./Home.module.scss";

const Home = () => {
  const { data, isLoading } = useWhoami();
  const { mutate: logout, isLoading: loggingOut } = useLogout();
  const { mutate: deleteAccount, deletingAcc } = useDeleteAccount();

  return (
    <div className={styles.container}>
      <h1>
        Hello {data?.user?.firstName} {data?.user?.lastName}
      </h1>
      <h2>{data?.user?.userRole}</h2>
      <div className={styles.btns}>
        <Button
          disabled={loggingOut || deletingAcc}
          isLoading={loggingOut}
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Button>
        <Button
          disabled={loggingOut || deletingAcc}
          isLoading={deletingAcc}
          onClick={() => {
            deleteAccount();
          }}
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default Home;
