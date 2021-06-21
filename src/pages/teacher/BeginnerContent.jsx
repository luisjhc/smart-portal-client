import React from "react";
import axios from "axios";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import { Link } from "react-router-dom";
import "./teacherCss/Classes.css";
import { motion } from "framer-motion";

function BeginnerContent() {
  //const { user } = props;
  //console.log(props);
  const [listOfContent, setListOfContent] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${CONSTS.SERVER_URL}/myPortal`, {
        headers: {
          authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        setListOfContent(response.data);
      })
      .catch((err) => {
        console.error(err.response);
      });
  }, []);

  return (
    <div className="classes-h1">
      <h1>BEGINNER CONTENT</h1>
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="classes-container"
      >
        {listOfContent
          .filter((content) => content.level === "beginner")
          .map((filteredContent) => (
            <div key={filteredContent._id}>
              <Link to={`${PATHS.MYPORTAL}/${filteredContent._id}`}>
                <h3>{filteredContent.title}</h3>
              </Link>
              <Link to={`${PATHS.MYPORTAL}/exercise/${filteredContent._id}`}>
                <h3>Exercises for this class</h3>
              </Link>
            </div>
          ))}
      </motion.div>
    </div>
  );
}

export default BeginnerContent;
