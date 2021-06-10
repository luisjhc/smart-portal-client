import React from "react";
import * as CONSTS from "../../utils/consts";
import axios from "axios";

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

export default UpdateProfilePic;
