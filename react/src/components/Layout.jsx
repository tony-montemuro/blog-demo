import { Link, Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import AxiosClient from "../AxiosClient";

export default function Layout() {
  const { user, setUser, token, setToken, message } = useStateContext();
  if (!token) {
    return <Navigate to="/login" />
  }

  const onLogout = e => {
    e.preventDefault();
    
    AxiosClient.post("/logout")
      .then(() => {
        setUser({});
        setToken(null);
      });
  };

  useEffect(() => {
    AxiosClient.get("/user")
      .then(({ data }) => {
        setUser(data);
      });
  }, []);

  return (
    <div id="layout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            Header
          </div>
          <div>
            { user.name }
            <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>

      { message &&
        <div className="notification">
          { message }
        </div>
      }
      
    </div>
  );
};