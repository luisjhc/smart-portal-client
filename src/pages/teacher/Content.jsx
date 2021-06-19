import React from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import { ReactComponent as Beginner } from "../../Ilustrations/beginner.svg";
import { ReactComponent as Intermediate } from "../../Ilustrations/intermediate.svg";
import { ReactComponent as Advanced } from "../../Ilustrations/advanced.svg";
import "./teacherCss/Content.css";

function Content() {
  return (
    <div className="content-container">
      <div className="content-beginner">
        <Link to={PATHS.CONTENT_BEGINNER}>BEGINNER CONTENT</Link>
        <Beginner />
      </div>
      <div className="content-intermediate">
        <Link to={PATHS.CONTENT_INTERMEDIATE}>INTERMEDIATE CONTENT</Link>
        <Intermediate />
      </div>
      <div className="content-advanced">
        <Link to={PATHS.CONTENT_ADVANCED}>ADVANCED CONTENT</Link>
        <Advanced />
      </div>
    </div>
  );
}

export default Content;
