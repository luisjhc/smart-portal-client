import React, { useState } from "react";
import { signup } from "../services/auth";
import * as CONSTS from "../utils/consts";
// import * as PATHS from "../utils/paths";

function CreateStudent({ authenticate, history }) {
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
    signup(credentials).then((res) => {
      if (!res.status) {
        // unsuccessful
        console.error("There was an error creating the student: ", res);
        return setError({
          message:
            "There was an error creating the student! Please check the console.",
        });
      }
      // successful
      localStorage.setItem(CONSTS.ACCESS_TOKEN, res.data.accessToken);
      authenticate(res.data.user);
      // history.push(PATHS.MYPORTAL);
    });
  }

  return (
    <div>
      <h1>Create New Student</h1>
      <form onSubmit={handleFormSubmission} className="auth__form">
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

        {error && (
          <div className="error-block">
            <p>There was an error submiting the form:</p>
            <p>{error.message}</p>
          </div>
        )}

        <button className="button__submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateStudent;
