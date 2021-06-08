import React from "react";
import axios from "axios";
import * as CONSTS from "../utils/consts";

function MyProfile(props) {
  const [displayUpdateProfile, setDisplayUpdateProfile] = React.useState(false);

  const [displayUpdatePassword, setDisplayUpdatePassword] =
    React.useState(false);

  const [displayUpdateProfilePic, setDisplayUpdateProfilePic] =
    React.useState(false);

  const { user, authenticate } = props;

  function profileToggle() {
    setDisplayUpdateProfile(!displayUpdateProfile);
  }
  function passwordToggle() {
    setDisplayUpdatePassword(!displayUpdatePassword);
  }

  function profilePicToggle() {
    setDisplayUpdateProfilePic(!displayUpdateProfilePic);
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

      {/* UPDATE PROFILE TOGGLES FORMS 👇 */}
      <div className="updates-toggle">
        <button onClick={profileToggle}>Update profile Form &#10549;</button>
        {displayUpdateProfile && (
          <UpdateProfile user={user} authenticate={authenticate} />
        )}
        <br />

        <button onClick={passwordToggle}>Update Password Form &#10549;</button>
        {displayUpdatePassword && <UpdatePassword />}
        <br />

        <button onClick={profilePicToggle}>
          Update Profile Picture Form &#10549;
        </button>
        {displayUpdateProfilePic && (
          <UpdateProfilePic user={user} authenticate={authenticate} />
        )}
      </div>
    </div>
  );
}

// UPDATE PROFILE 👇
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

// UPDATE PASSWORD 👇
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

// UPDATE PROFILE PIC 👇
function UpdateProfilePic(props) {
  const { user, authenticate } = props;
  const [chosenPicture, setChosenPicture] = React.useState(null);

  function handleFormSubmission(event) {
    event.preventDefault();

    if (!chosenPicture) {
      console.log(
        "You need to pick an image before submitting the form, silly!"
      );
      return;
    }

    const formBody = new window.FormData();
    formBody.append("profilePic", chosenPicture);

    axios
      .post(
        `${CONSTS.SERVER_URL}/myProfile/uploadPicture/${user._id}`,
        formBody
      )
      .then((res) => {
        console.log(res);

        authenticate({ ...user, profilePic: res.data.picFromServer });
      })
      .catch((err) => console.log(err.response));
  }

  function handleInputChange(event) {
    console.log(event.target.files[0]);
    const image = event.target.files[0];

    setChosenPicture(image);
  }

  return (
    <form onSubmit={handleFormSubmission}>
      <input type="file" onChange={handleInputChange} />
      <button type="submit">Upload Picture! </button>
    </form>
  );
}

export default MyProfile;
