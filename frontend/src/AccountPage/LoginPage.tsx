import { Link } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="acc-page-body">
      <form className="acc-form">
        <h1>Login</h1>
        <div className="input-fields-container-acc-page">
          <label className="form-input">
            <input type="text" name="username" placeholder="Username" />
          </label>
          <label className="form-input">
            <input type="password" name="password" placeholder="Password" />
          </label>
        </div>
        <h4 className="fp">Forgot Password</h4>
        <button className="acc-page-submit-btn" type="submit">
          Submit
        </button>
        <h4>
          Not a Member?{" "}
          <Link 
          style={{ textDecoration: 'none' }}
          to={{ pathname: "/register" }}>
            <span className="nam-reg">Register</span>
          </Link>
        </h4>
      </form>
    </div>
  );
}

export default LoginPage;
