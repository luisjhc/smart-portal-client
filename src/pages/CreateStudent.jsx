import React, { useState } from "react";
import * as CONSTS from "../utils/consts";
import axios from "axios";

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
    axios
      .post(`${CONSTS.SERVER_URL}/myPortal/createStudent`, credentials, {
        headers: {
          authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
        },
      })
      .then((res) => {
        return setSuccess({
          message: `The student ${res.data.newUser.username} was created successfully.`,
        });
      })
      .catch((err) => {
        return setError({
          message: "There was an error creating the student! Please try again.",
        });
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
