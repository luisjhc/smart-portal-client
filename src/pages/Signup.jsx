import React, { useState } from "react";
import { signup } from "../services/auth";
import "./auth.css";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import "./pagesCss/Signup.css";
import signUpIllustration from "../img/signup1.png";

export default function Signup({ authenticate, history }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    role: "",
  });
  const { firstName, lastName, username, password, email, role } = form;
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
      email,
      firstName,
      lastName,
      role,
    };
    signup(credentials).then((res) => {
      if (!res.status) {
        // unsuccessful signup
        console.error("Signup was unsuccessful: ", res);
        return setError({
          message: "Signup was unsuccessful! Please check the console.",
        });
      }
      // successful signup
      localStorage.setItem(CONSTS.ACCESS_TOKEN, res.data.accessToken);
      authenticate(res.data.user);
      history.push(PATHS.MYPORTAL);
    });
  }

  return (
    <div>
      <h2 className="signup-greeting">
        Create an account to Become Your Best Self 🎓
      </h2>
      <img
        className="signup-illustration "
        src={signUpIllustration}
        alt={signUpIllustration}
      />
      <form onSubmit={handleFormSubmission} className="signup-form">
        <label htmlFor="input-firstName">First Name</label>
        <input
          id="input-firstName"
          type="text"
          name="firstName"
          placeholder="firstName"
          value={firstName}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="input-lastName">Last Name</label>
        <input
          id="input-lastName"
          type="text"
          name="lastName"
          placeholder="lastName"
          value={lastName}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="input-username">Username</label>
        <input
          id="input-username"
          type="text"
          name="username"
          placeholder="userName"
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
        <label htmlFor="input-email">Email</label>
        <input
          id="input-email"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="input-role">Are you a teacher or a student?</label>
        <div className="signup-radio-btn">
          <input
            id="teacher"
            type="radio"
            name="role"
            value="teacher"
            onChange={handleInputChange}
            required
          />
          <label htmlFor="teacher">teacher</label>
          <input
            id="student"
            type="radio"
            name="role"
            value="student"
            onChange={handleInputChange}
            required
          />
          <label htmlFor="student">student</label>
        </div>
        {error && (
          <div className="error-block">
            <p>There was an error submiting the form:</p>
            <p>{error.message}</p>
          </div>
        )}
        <button className="signup-submit-btn" type="submit">
          Submit 🎓
        </button>
      </form>
    </div>
  );
}
