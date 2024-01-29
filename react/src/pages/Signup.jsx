import { Link } from "react-router-dom";

export default function Signup() {
  const onSubmit = e => {
    e.preventDefault();
  };
  
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">
            Sign up 
          </h1>
          <input placeholder="Username" type="text"/>
          <input placeholder="Email" type="email"/>
          <input placeholder="Password" type="password"/>
          <input placeholder="Confirm password" type="password" />
          <button className="btn btn-block" type="submit">Signup</button>
          <p className="message">
            Already registered? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};