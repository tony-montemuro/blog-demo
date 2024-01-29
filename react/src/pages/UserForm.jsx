import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AxiosClient from "../AxiosClient";
import ErrorMessage from "../components/ErrorMessage";

export default function UserForm() {
  const { id } = useParams();
  const navigateTo = useNavigate();

  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const onSubmit = e => {
    e.preventDefault();
    let query;
    if (user.id) {
      query = AxiosClient.put(`/users/${ user.id }`, user);
    } else {
      query = AxiosClient.post("/users", user);
    }

    query
      .then(() => {
        // TODO: show notification
        navigateTo("/users");
      })
      .catch(error => {
        const response = error.response;
        if (response?.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  if (id) {
    useEffect(() => {
      setLoading(true);
      AxiosClient.get(`/users/${id}`)
        .then(({ data }) => {
          setUser(data);
        })
        .catch(error => {
          setErrors(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);
  }

  return (
    <>
      { user.id ?
        <h1>Update User: { user.name }</h1>
      :
        <h1>New User</h1>
      }
      <div className="card animated fadeInDown">
        { loading ?
          <div className="text-center">Loading...</div>
        :
          <>
            <ErrorMessage errors={ errors } />
            <form onSubmit={ onSubmit }>
              <input value={ user.name } onChange={ e => setUser({ ...user, name: e.target.value }) } placeholder="Name" type="text" />
              <input value={ user.email } onChange={ e => setUser({ ...user, email: e.target.value  }) } placeholder="Email" type="email" />
              <input onChange={ e => setUser({ ...user, password: e.target.value  }) } placeholder="Password" type="password" />
              <input onChange={ e => setUser({ ...user, password_confirmation: e.target.value }) } placeholder="Password Confirmation" type="password" />
              <button className="btn">Save</button>
            </form>
          </>
        }
      </div>
    </>
  );
};