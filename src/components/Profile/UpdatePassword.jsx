import React from "react";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import axios from "axios";

// UPDATE PASSWORD 👇
function UpdatePassword(props) {
  const { authenticate } = props;
  //const { user, authenticate } = props;

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
        console.log("response:", response);
        authenticate(response.data.user);
      })
      .catch((err) => {
        console.error(err.response);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
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
      <div>
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
      <div>
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
      <button>Update Password &#10004;</button>
    </form>
  );
}

export default UpdatePassword;
