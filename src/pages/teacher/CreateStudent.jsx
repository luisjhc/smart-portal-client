import React, { useState } from "react";
import * as CONSTS from "../../utils/consts";
import axios from "axios";
import "./teacherCss/CreateStudent.css";

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
  const [error, setError] = useState("");
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
      .post(`${CONSTS.SERVER_URL}/createStudent`, credentials, {
        headers: {
          authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
        },
      })
      .then((res) => {
        setSuccess(`The student ${res.data.newUser} was created
        successfully!. 🥳`);
        setTimeout(() => {
          setSuccess("");
        }, 2500);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.errorMessage);
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
    <div className="create-student-page">
      <h1>Create New Student</h1>
      <form onSubmit={handleFormSubmission} className="create-student-form">
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
            className="create-student-radion-btn"
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
            <p>{success}</p>
          </div>
        )}
        {error && (
          <div className="error-block">
            <p>{error} 😱</p>
          </div>
        )}
        <button className="create-student-btn" type="submit">
          Submit 👨‍🎓
        </button>
      </form>
    </div>
  );
}

export default CreateStudent;
