import { createBrowserRouter, Navigate } from "react-router-dom";
import Blogs from "./pages/Blogs";
import GuestLayout from "./components/GuestLayout";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Missing from "./pages/Missing";
import Post from "./pages/Post";
import Signup from "./pages/Signup";
import Blog from "./pages/Blog";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/blogs"/>
      },
      {
        path: "/blogs",
        element: <Blogs />
      },
      {
        path: "/blogs/new",
        element: <Post />
      },
      {
        path: "/blogs/:id",
        element: <Blog />
      }
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