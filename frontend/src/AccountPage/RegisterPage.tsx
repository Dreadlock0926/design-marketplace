import { Link } from "react-router-dom";
import Axios from "axios";
import "./LoginPage.css";
import { useState } from "react";

function RegisterPage() {
  const [emailInUse, setEmailInUse] = useState(0);
  const [usernameInUse, setUsernameInUse] = useState(0);

  const checkEmailValidity = (email: string) => {
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (email === "") {
      setEmailInUse(0);
      return;
    }

    if (!isValidEmail.test(email)) {
      setEmailInUse(3);
      return;
    }

    Axios.post("http://localhost:3001/users/emailValidity", {
      email: email,
    })
      .then((response) => {
        if (response.data === "Email already taken") {
          setEmailInUse(1);
        } else {
          setEmailInUse(2);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkUsernameValidity = (username: string) => {
    if (username === "") {
      setUsernameInUse(0);
      return;
    }

    if (username.length < 4) {
      setUsernameInUse(3);
      return;
    }

    Axios.post("http://localhost:3001/users/usernameValidity", {
      username: username,
    })
      .then((response) => {
        if (response.data === "Username already taken") {
          setUsernameInUse(1);
        } else {
          setUsernameInUse(2);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="acc-page-body">
      <form className="acc-form">
        <h1>Register</h1>
        <div className="input-fields-container-acc-page">
          <label className="form-input">
            <div className="register-input-field">
              <input
                onChange={(e) => checkEmailValidity(e.target.value)}
                type="email"
                name="email"
                placeholder="Email"
              />
              {emailInUse === 2 && <span>&#10003;</span>}
            </div>
          </label>
          {emailInUse === 1 && (
            <p className="email-text" style={{ color: "red" }}>
              Email already in use
            </p>
          )}
          {emailInUse === 3 && (
            <p className="email-text" style={{ color: "red" }}>
              Invalid Email
            </p>
          )}
          <div className="name-details-reg">
            <label className="form-input">
              <input type="text" name="firstName" placeholder="First Name" />
            </label>
            <label className="form-input">
              <input type="text" name="lastName" placeholder="Last Name" />
            </label>
          </div>
          <label className="form-input">
            <div className="register-input-field">
              <input
                onChange={(e) => checkUsernameValidity(e.target.value)}
                type="text"
                name="username"
                placeholder="Username"
              />
              {usernameInUse === 2 && <span>&#10003;</span>}
              {usernameInUse === 1 && (
                <p className="email-text" style={{ color: "red" }}>
                  Username already in use
                </p>
              )}
              {usernameInUse === 3 && (
                <p className="email-text" style={{ color: "red" }}>
                  Invalid Username
                </p>
              )}
            </div>
          </label>
          <label className="form-input">
            <input type="password" name="password" placeholder="Password" />
          </label>
          <label className="form-input">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          </label>
        </div>
        <button className="acc-page-submit-btn" type="submit">
          Submit
        </button>
        <h4>
          Already a Member?{" "}
          <Link style={{ textDecoration: "none" }} to={{ pathname: "/login" }}>
            <span className="nam-reg">Login</span>
          </Link>
        </h4>
      </form>
    </div>
  );
}

export default RegisterPage;
