import React, { useState } from "react";
import * as CONSTS from "../../utils/consts";
import axios from "axios";

function CreateStudent() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    level: "",
  });

  const { firstName, lastName, username, password, email, level } = form;
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      firstName,
      lastName,
      username,
      password,
      email,
      level,
    };
    axios
      .post(`${CONSTS.SERVER_URL}/myPortal/createStudent`, credentials, {
        headers: {
          authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
        },
      })
      .then((res) => {
        setSuccess(res);
        setTimeout(() => {
          setSuccess("");
        }, 2500);
      })
      .catch((err) => {
        console.log(err);
        setError({
          message: "There was an error creating the student! Please try again.",
        });
        setTimeout(() => {
          setError("");
        }, 2500);
      });

    // clear the form
    setForm({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
    });
  }

  return (
    <div>
      <h1>Create New Student</h1>
      <form onSubmit={handleFormSubmission} className="auth__form">
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
        <label htmlFor="input-level">Level:</label>
        <div>
          <input
            id="beginner"
            type="radio"
            name="level"
            value="beginner"
            onChange={handleInputChange}
            required
          />
          <label htmlFor="beginner">beginner</label>
          <input
            id="intermediate"
            type="radio"
            name="level"
            value="intermediate"
            onChange={handleInputChange}
            required
          />
          <label htmlFor="intermediate">intermediate</label>
          <input
            id="advanced"
            type="radio"
            name="level"
            value="advanced"
            onChange={handleInputChange}
            required
          />
          <label htmlFor="advanced">advanced</label>
        </div>

        {success && (
          <div className="success-block">
            <p>
              The student {success.data.newUser.username} was created
              successfully.
            </p>
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
