import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import GuestLayout from "./components/GuestLayout";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Missing from "./pages/Missing";
import Signup from "./pages/Signup";
import UserForm from "./pages/UserForm";
import Users from "./pages/Users";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/users"/>
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/users",
        element: <Users />
      },
      {
        path: "/users/new",
        element: <UserForm key="userCreate" />
      },
      {
        path: "/users/:id",
        element: <UserForm key="userUpdate" />
      },
    ]
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      }
    ]
  },
  {
    path: "*",
    element: <Missing />
  }
]);

export default Router;