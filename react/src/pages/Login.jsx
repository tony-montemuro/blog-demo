import { Link } from "react-router-dom";

export default function Login() {
  const onSubmit = e => {
    e.preventDefault();
  };
  
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">
            Login to your account
          </h1>
          <input placeholder="Email" type="email"/>
          <input placeholder="Password" type="password"/>
          <button className="btn btn-block" type="submit">Login</button>
          <p className="message">
            Not registered? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};