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
import Layout from "./components/Layout";
import Interceptor from "./components/Interceptor";
import Login from "./pages/Login";
import Register from "./pages/Register/Register";
import NotFound from "./pages/404";
import Home from "./pages/Home";
import { useWhoami } from "./queries/authQueries";

function App() {
  const { data, isLoading } = useWhoami();
  const { mode } = useTheme();

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
            <Layout>
              <Interceptor />
              <Outlet />
            </Layout>
          )}
        </Fragment>
      ),
      children: [
        {
          path: "*",
          element: <NotFound />,
        },
        {
          path: "/",
          element: <Home />,
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
