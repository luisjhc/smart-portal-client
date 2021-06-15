import React from "react";
import UpdateProfile from "../components/Profile/UpdateProfile";
import UpdatePassword from "../components/Profile/UpdatePassword";
import UpdateProfilePic from "../components/Profile/UpdateProfilePic";
import "../pages/pagesCss/MyProfile.css";

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
    <div className="profile-main-container">
      <h1>Hello, {user.username} &#9996;</h1>
      <h2>
        <i>
          {user.firstName} {user.lastName}
        </i>
      </h2>
      <img
        className="profile-main-container-img"
        src={user.profilePic}
        width="200px"
        alt={`Profile pic for ${user.username}`}
      />

      {/* UPDATE PROFILE TOGGLES FORMS 👇 */}
      <div className="profile-updates-toggle">
        <button onClick={profileToggle}>Update profile Form &#10549;</button>
        {displayUpdateProfile && (
          <UpdateProfile user={user} authenticate={authenticate} />
        )}
        <br />

        <button onClick={passwordToggle}>Update Password Form &#10549;</button>
        {displayUpdatePassword && (
          <UpdatePassword user={user} authenticate={authenticate} />
        )}
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

export default MyProfile;
