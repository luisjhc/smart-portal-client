import React from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../utils/paths";

function MyPortal(props) {
  return (
    <div>
      {props.user.role === "teacher" ? (
        <div>
          <Link to={PATHS.CONTENT}>CONTENT</Link>
          <br />
          <br />
          <Link to={PATHS.CREATESTUDENT}>CREATE NEW STUDENT</Link>
          <br />
          <br />
          <Link to={PATHS.LIST_OF_STUDENTS}>LIST OF STUDENTS</Link>
        </div>
      ) : (
        <div>
          <h1>student</h1>
        </div>
      )}
    </div>
  );
}

export default MyPortal;
