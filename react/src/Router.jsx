import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Missing from "./pages/Missing";
import Signup from "./pages/Signup";
import Users from "./pages/Users";

const Router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/users",
    element: <Users />
  },
  {
    path: "*",
    element: <Missing />
  }
]);

export default Router;