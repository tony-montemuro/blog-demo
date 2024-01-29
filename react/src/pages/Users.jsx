import { useEffect, useState } from "react";
import AxiosClient from "../AxiosClient";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setMessage } = useStateContext();

  const getUsers = () => {
    setLoading(true);
    AxiosClient.get("/users")
      .then(({ data }) => {
        setUsers(data.data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onDelete = user => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    AxiosClient.delete(`/users/${ user.id }`)
      .then(() => {
        setMessage("User was successfully deleted.");
        getUsers();
      });
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <h1>Users</h1>
        <Link to="/users/new" className="btn-add">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          { loading ?
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">Loading...</td>
              </tr>
            </tbody>
          :
            <tbody>
              { users.map(user => {
                return (
                  <tr>
                    <td>{ user.id }</td>
                    <td>{ user.name }</td>
                    <td>{ user.email }</td>
                    <td>{ user.created_at }</td>
                    <td>
                      <Link to={ `/users/${ user.id }` } className="btn-edit">Edit</Link>
                      &nbsp;
                      <button onClick={() => onDelete(user)} className="btn-delete">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          }

        </table>
      </div>
    </div>
  );
};