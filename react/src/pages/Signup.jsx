import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import AxiosClient from "../AxiosClient";
import ErrorMessage from "../components/ErrorMessage";

export default function Signup() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState(null);

  const { setUser, setToken } = useStateContext();

  const onSubmit = e => {
    e.preventDefault();

    const payload = {
      name: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value
    };
    AxiosClient.post('/signup', payload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch(err => {
        const response = err.response;
        if (response?.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };
  
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">
            Sign up 
          </h1>
          <ErrorMessage errors={ errors } />
          <input ref={ usernameRef } placeholder="Username" type="text"/>
          <input ref={ emailRef } placeholder="Email" type="email"/>
          <input ref={ passwordRef } placeholder="Password" type="password"/>
          <input ref={ passwordConfirmationRef } placeholder="Confirm password" type="password" />
          <button className="btn btn-block" type="submit">Signup</button>
          <p className="message">
            Already registered? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};