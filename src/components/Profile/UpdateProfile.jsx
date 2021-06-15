import React from "react";
import * as CONSTS from "../../utils/consts";

import axios from "axios";

function UpdateProfile(props) {
  const { user, authenticate } = props;
  const [form, setForm] = React.useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
  });
  const [success, setSuccess] = React.useState("");
  const [error, setError] = React.useState(null);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    axios
      .put(`${CONSTS.SERVER_URL}/myProfile/update`, form, {
        headers: {
          authorization: accessToken,
        },
      })
      .then((response) => {
        console.log("response:", response);
        authenticate(response.data.user);
        setSuccess(response.data.message);
        setTimeout(() => {
          setSuccess("");
        }, 2500);
      })
      .catch((err) => {
        console.error(err.response);

        setError(err.response.data.errorMessage);
        setTimeout(() => {
          setError("");
        }, 2500);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="profile-update-form">
        <label>First Name</label>
        <input
          name="firstName"
          placeholder="firstName"
          value={form.firstName}
          onChange={handleChange}
        />
      </div>
      <br />
      <div className="profile-update-form">
        <label>Last Name</label>
        <input
          name="lastName"
          placeholder="lastName"
          value={form.lastName}
          onChange={handleChange}
        />
      </div>
      <br />
      <div className="profile-update-form">
        <label>Username</label>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
      </div>
      <br />
      <div className="profile-update-form">
        <label>Email</label>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <br />

      {success && (
        <div className="success-block">
          <p>{success}</p>
        </div>
      )}
      {error && (
        <div className="error-block">
          <p>{error}</p>
        </div>
      )}

      <button className="profile-update-form-btn">Update Profile 👤</button>
    </form>
  );
}

export default UpdateProfile;
