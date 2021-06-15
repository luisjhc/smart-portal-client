import React from "react";
import * as CONSTS from "../../utils/consts";
import axios from "axios";
import "../../pages/pagesCss/MyProfile.css";

// UPDATE PASSWORD 👇
function UpdatePassword(props) {
  const { authenticate } = props;
  //const { user, authenticate } = props;
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const [form, setForm] = React.useState({
    // currentPassword: user.password,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    axios
      .put(`${CONSTS.SERVER_URL}/myProfile/update-password`, form, {
        headers: {
          authorization: accessToken,
        },
      })
      .then((response) => {
        //console.log("response:", response);
        authenticate(response.data.user);
        setSuccess(response.data.message);
        setTimeout(() => {
          setSuccess("");
        }, 2500);
        setForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      })
      .catch((err) => {
        console.error(err.response.data.errorMessage);
        setError(err.response.data.errorMessage);
        setTimeout(() => {
          setError("");
        }, 2500);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="profile-update-password-form">
        <label>Current Password</label>
        <input
          name="currentPassword"
          placeholder="Current Password"
          value={form.currentPassword}
          onChange={handleChange}
          type="password"
        />
      </div>
      <br />
      <div className="profile-update-password-form">
        <label>New Password</label>
        <input
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          type="password"
        />
      </div>
      <br />
      <div className="profile-update-password-form">
        <label>Confirm New Password</label>
        <input
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={form.confirmPassword}
          onChange={handleChange}
          type="password"
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
          <p>{error} 😱</p>
        </div>
      )}
      <button className="update-password-form-btn">Update Password 🗝</button>
    </form>
  );
}

export default UpdatePassword;
