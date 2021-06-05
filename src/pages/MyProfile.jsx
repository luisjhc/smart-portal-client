import React from "react";
import axios from "axios";
import * as PATHS from "../utils/paths";
import * as CONSTS from "../utils/consts";

function MyProfile(props) {
  const [displayUpdateProfile, setDisplayUpdateProfile] = React.useState(false);

  const [displayUpdatePassword, setDisplayUpdatePassword] =
    React.useState(false);

  const { user, authenticate } = props;

  function profileToggle() {
    setDisplayUpdateProfile(!displayUpdateProfile);
  }
  function passwordToggle() {
    setDisplayUpdatePassword(!displayUpdatePassword);
  }

  return (
    <div>
      <h1>Hello, {user.username} &#9996;</h1>
      <h2>
        <i>
          {user.firstName} {user.lastName}
        </i>
      </h2>
      <img
        src={user.profilePic}
        width="200px"
        alt={`Profile pic for ${user.username}`}
      />

      <div className="updates-toggle">
        <button onClick={profileToggle}>Update profile Form&#10549;</button>
        {displayUpdateProfile && (
          <UpdateProfile user={user} authenticate={authenticate} />
        )}
        <br />
        <button onClick={passwordToggle}>Update Password Form&#10549;</button>
        {displayUpdatePassword && <UpdatePassword />}
        <br />
        <button>Delete Account</button>
      </div>
    </div>
  );
}

function UpdateProfile(props) {
  const { user, authenticate } = props;
  const [form, setForm] = React.useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
  });

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
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input
          name="firstName"
          placeholder="firstName"
          value={form.firstName}
          onChange={handleChange}
        />
      </div>
      <br />
      <div>
        <label>Last Name</label>
        <input
          name="lastName"
          placeholder="lastName"
          value={form.lastName}
          onChange={handleChange}
        />
      </div>
      <br />
      <div>
        <label>Username</label>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
      </div>
      <br />
      <div>
        <label>Email</label>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <br />
      <button>Update Profile &#10004;</button>
    </form>
  );
}

function UpdatePassword() {
  return (
    <form>
      <div>
        <label>Current Password</label>
        <input name="password" placeholder="Current Password" />
      </div>
      <br />
      <div>
        <label>New Password</label>
        <input name="password" placeholder="New Password" />
      </div>
      <br />
      <div>
        <label>Confirm New Password</label>
        <input name="password" placeholder="Confirm New Password" />
      </div>
      <br />
      <button>Update Password &#10004;</button>
    </form>
  );
}

export default MyProfile;
