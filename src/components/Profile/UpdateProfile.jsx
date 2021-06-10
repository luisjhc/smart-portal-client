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

export default UpdateProfile;
