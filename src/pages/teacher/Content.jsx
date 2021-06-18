import React from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import { ReactComponent as Beginner } from "../../Ilustrations/beginner.svg";
import "./teacherCss/Content.css";

function Content() {
  return (
    <div className="content-container">
      <div className="content-beginner">
        <Link to={PATHS.CONTENT_BEGINNER}>BEGINNER CONTENT</Link>
        <Beginner />
      </div>
      <div>
        <Link to={PATHS.CONTENT_INTERMEDIATE}>INTERMEDIATE CONTENT</Link>
      </div>
      <div>
        <Link to={PATHS.CONTENT_ADVANCED}>ADVANCED CONTENT</Link>
      </div>
    </div>
  );
}

export default Content;
