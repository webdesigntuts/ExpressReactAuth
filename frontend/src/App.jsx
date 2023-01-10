import { Fragment, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
import "./styles/App.scss";
import { useWhoami } from "./queries/authQueries";
import GlobalSpinner from "./components/GlobalSpinner";
import Login from "./pages/Login";
import { useTheme } from "./context/ThemeProvider";

//TEST
import { useLogout } from "./queries/authQueries";
import Button from "./components/Button";

function App() {
  const { data, isLoading } = useWhoami();
  const { mode } = useTheme();
  const { mutate: logout } = useLogout();
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
            </div>
          )}
        </Fragment>
      ),
    },
  ]);

  return (
    <div className={`App ${mode && "darkMode"}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
