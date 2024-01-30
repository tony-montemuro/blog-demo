import { useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";
import AxiosClient from "../AxiosClient";
import ErrorMessage from "../components/ErrorMessage";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null);
  const { setUser, setToken } = useStateContext();

  const onSubmit = e => {
    e.preventDefault();
    setErrors(null);

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    };
    AxiosClient.post('/login', payload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch(error => {
        const response = error.response;
        if (response?.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({ e: [response.data.message] });
          }          
        }
      });
  };
  
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">
            Login to your account
          </h1>
          <ErrorMessage errors={ errors } />
          <input ref={ emailRef } placeholder="Email" type="email"/>
          <input ref={ passwordRef } placeholder="Password" type="password"/>
          <button className="btn btn-block" type="submit">Login</button>
          <p className="message">
            Not registered? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};