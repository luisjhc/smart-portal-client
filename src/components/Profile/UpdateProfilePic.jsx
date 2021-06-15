import React from "react";
import * as CONSTS from "../../utils/consts";

import axios from "axios";

// UPDATE PROFILE PIC 👇
function UpdateProfilePic(props) {
  const { user, authenticate } = props;
  const [chosenPicture, setChosenPicture] = React.useState(null);
  const [success, setSuccess] = React.useState("");
  const [error, setError] = React.useState(null);

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
      .then((response) => {
        console.log(response);

        authenticate({ ...user, profilePic: response.data.picFromServer });

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

  function handleInputChange(event) {
    console.log(event.target.files[0]);
    const image = event.target.files[0];

    setChosenPicture(image);
  }

  return (
    <form onSubmit={handleFormSubmission}>
      <div className="profile-update-pic-form">
        <input type="file" onChange={handleInputChange} />
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

      <button type="submit">Upload Picture 📸 </button>
    </form>
  );
}

export default UpdateProfilePic;
