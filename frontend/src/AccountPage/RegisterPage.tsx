import { Link } from "react-router-dom";
import Axios from "axios";
import "./LoginPage.css";
import { useState } from "react";
import { useRef } from "react";

function RegisterPage() {
  const [emailInUse, setEmailInUse] = useState(0);
  const [usernameInUse, setUsernameInUse] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState({
    hasEightChars: false,
    hasLowercase: false,
    hasUppercase: false,
    hasSpecialChar: false,
  });

  const emailRef = useRef<HTMLInputElement | null>(null);

  const checkEmailValidity = (email: string) : void => {
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

  const checkUsernameValidity = (username: string) : void => {
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

  const detectPasswordStrength = (password: string) : void => {
    const passwordStrength = {
      hasLowercase: /[a-z]/,
      hasUppercase: /[A-Z]/,
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
    };

    if (password.length < 8) {
      setPasswordStrength((prevState) => ({
        ...prevState,
        hasEightChars: false,
      }));
    } else {
      setPasswordStrength((prevState) => ({
        ...prevState,
        hasEightChars: true,
      }));
    }

    if (passwordStrength.hasLowercase.test(password)) {
      setPasswordStrength((prevState) => ({
        ...prevState,
        hasLowercase: true,
      }));
    } else {
      setPasswordStrength((prevState) => ({
        ...prevState,
        hasLowercase: false,
      }));
    }

    if (passwordStrength.hasUppercase.test(password)) {
      setPasswordStrength((prevState) => ({
        ...prevState,
        hasUppercase: true,
      }));
    } else {
      setPasswordStrength((prevState) => ({
        ...prevState,
        hasUppercase: false,
      }));
    }

    if (passwordStrength.hasSpecialChar.test(password)) {
      setPasswordStrength((prevState) => ({
        ...prevState,
        hasSpecialChar: true,
      }));
    } else {
      setPasswordStrength((prevState) => ({
        ...prevState,
        hasSpecialChar: false,
      }));
    }
  };

  function verifySubmission(): void {

    if (emailInUse !== 2) {
      emailRef.current?.focus();
      emailRef.current?.scrollIntoView({ behavior: "smooth" });
      emailRef.current?.classList.toggle("shake");
      return;
    }
  }

  return (
    <div className="acc-page-body">
      <form className="acc-form">
        <h1>Register</h1>
        <div className="input-fields-container-acc-page">
          <label className="form-input">
            <div className="register-input-field">
              <input
                onChange={(e) => checkEmailValidity(e.target.value)}
                ref={emailRef}
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
            <input
              onChange={(e) => {
                detectPasswordStrength(e.target.value);
              }}
              type="password"
              name="password"
              placeholder="Password"
            />
          </label>

          <div className="password-strength-checker">
            <div className="psc-info-container">
              {passwordStrength.hasEightChars ? (
                <div className="psc-info green">
                  <span>&#10003;</span>
                  <p>At least 8 characters</p>
                </div>
              ) : (
                <div className="psc-info red">
                  <span>&#10005;</span>
                  <p>At least 8 characters</p>
                </div>
              )}
              {passwordStrength.hasLowercase ? (
                <div className="psc-info green">
                  <span>&#10003;</span>
                  <p>At least one lowercase letter</p>
                </div>
              ) : (
                <div className="psc-info red">
                  <span>&#10005;</span>
                  <p>At least one lowercase letter</p>
                </div>
              )}
              {passwordStrength.hasUppercase ? (
                <div className="psc-info green">
                  <span>&#10003;</span>
                  <p>At least one uppercase letter</p>
                </div>
              ) : (
                <div className="psc-info red">
                  <span>&#10005;</span>
                  <p>At least one uppercase letter</p>
                </div>
              )}
              {passwordStrength.hasSpecialChar ? (
                <div className="psc-info green">
                  <span>&#10003;</span>
                  <p>At least one special character</p>
                </div>
              ) : (
                <div className="psc-info red">
                  <span>&#10005;</span>
                  <p>At least one special character</p>
                </div>
              )}
            </div>
          </div>

          <label className="form-input">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          </label>
        </div>
        <button onClick={verifySubmission} type="button" className="acc-page-submit-btn">
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
