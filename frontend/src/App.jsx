import { Fragment, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useTheme } from "./context/ThemeProvider";
import "./styles/App.scss";
import GlobalSpinner from "./components/GlobalSpinner";
import Login from "./pages/Login";
import Register from "./pages/Register/Register";
import NotFound from "./pages/404";
import { useWhoami } from "./queries/authQueries";

//TEST
import { useLogout } from "./queries/authQueries";
import { useDeleteAccount } from "./queries/accountQueries";
import Button from "./components/Button";

function App() {
  const { data, isLoading } = useWhoami();
  const { mode } = useTheme();
  const { mutate: logout } = useLogout();
  const { mutate: deleteAccount } = useDeleteAccount();

  const router = createBrowserRouter([
    {
      path: "login",
      element: (
        <Fragment>
          {!isLoading && data?.user?.id ? (
            <Navigate to='/' />
          ) : isLoading ? (
            <GlobalSpinner />
          ) : (
            <Login />
          )}
        </Fragment>
      ),
    },
    {
      path: "register",
      element: (
        <Fragment>
          {!isLoading && data?.user?.id ? (
            <Navigate to='/' />
          ) : isLoading ? (
            <GlobalSpinner />
          ) : (
            <Register />
          )}
        </Fragment>
      ),
    },
    {
      path: "/",
      element: (
        <Fragment>
          {isLoading ? (
            <GlobalSpinner />
          ) : data && !data?.authed ? (
            <Navigate to='/login' />
          ) : (
            <div>
              <h1>Hello {data?.user?.firstName}</h1>
              <Button
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Button>
              <Button
                mt={16}
                onClick={() => {
                  deleteAccount();
                }}
              >
                Delete Account
              </Button>
            </div>
          )}
        </Fragment>
      ),
      children: [
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <div className={`App ${mode && "darkMode"}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
