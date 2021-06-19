import React, { useState } from "react";
import { login } from "../services/auth";
import "./Signup";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import "./pagesCss/LogIn.css";
// import loginIllustration from "../img/login1.png";
import { ReactComponent as Login } from "../Ilustrations/login.svg";

export default function LogIn({ authenticate, history }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const { username, password } = form;
  const [error, setError] = useState(null);

  function handleInputChange(event) {
    const { name, value } = event.target;

    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();

    const credentials = {
      username,
      password,
    };
    login(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }
      localStorage.setItem(CONSTS.ACCESS_TOKEN, res.data.accessToken);
      authenticate(res.data.user);
      history.push(PATHS.MYPORTAL);
    });
  }

  return (
    <div className="login-page-container">
      <h2 className="login-greeting">Welcome back to Your Smart Portal 🎓</h2>
      <Login />
      {/* <img
        className="login-illustration"
        src={loginIllustration}
        alt="loginIllustration"
      /> */}
      {/* <h2>Log In</h2> */}
      <form onSubmit={handleFormSubmission} className="login-form">
        <label htmlFor="input-username">Username</label>
        <input
          id="input-username"
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="input-password">Password</label>
        <input
          id="input-password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleInputChange}
          required
          minLength="8"
        />

        {error && (
          <div className="error-block">
            <p>There was an error submiting the form:</p>
            <p>{error.message}</p>
          </div>
        )}

        <button className="login-submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
