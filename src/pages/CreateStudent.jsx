import React, { useState } from "react";
import { signup } from "../services/auth";
import * as CONSTS from "../utils/consts";

function CreateStudent({ authenticate }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
  });

  const { username, password, email } = form;
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

      // sending a success message
      if (res.status) {
        return setSuccess({
          message: `The student ${res.data.user.username} was created successfully.`,
        });
      }
    });

    // to clear the form
    setForm({
      username: "",
      password: "",
      email: "",
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

        {success && (
          <div className="success-block">
            <p>{success.message}</p>
          </div>
        )}
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
