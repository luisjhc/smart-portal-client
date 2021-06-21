import React from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../utils/paths";
import axios from "axios";
import * as CONSTS from "../utils/consts";
import { ReactComponent as Content } from "../Ilustrations/content.svg";
import { ReactComponent as CreateStudent } from "../Ilustrations/createStudent.svg";
import { ReactComponent as ListOfStudents } from "../Ilustrations/listOfStudents.svg";
import "./pagesCss/MyPortal.css";
import { motion } from "framer-motion";

function MyPortal(props) {
  const [listOfContent, setListOfContent] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${CONSTS.SERVER_URL}/myPortal`, {
        headers: {
          authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        //console.log("response:", response);
        setListOfContent(response.data);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }, []);

  return (
    <div>
      {props.user.role === "teacher" ? (
        <div className="myPortal-container">
          <motion.div
            initial={{ x: "-10vw", y: 100, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="myPortal-links"
          >
            <Link to={PATHS.CONTENT}>CONTENT</Link>
            <Content />
          </motion.div>
          <motion.div
            initial={{ x: "-10vw", y: 100, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="myPortal-links"
          >
            <Link to={PATHS.CREATESTUDENT}>CREATE NEW STUDENT</Link>
            <CreateStudent />
          </motion.div>
          <motion.div
            initial={{ x: "-10vw", y: 100, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="myPortal-links"
          >
            <Link to={PATHS.LIST_OF_STUDENTS}>LIST OF STUDENTS</Link>
            <ListOfStudents />
          </motion.div>
        </div>
      ) : (
        <div className="myPortal-h1">
          <h1>{props.user.level.toUpperCase()} CLASSES</h1>
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="myPortal-classes-container"
          >
            {listOfContent
              .filter((content) => content.level === props.user.level)
              .map((filteredContent) => (
                <div key={filteredContent._id}>
                  <Link to={`${PATHS.MYPORTAL}/${filteredContent._id}`}>
                    <h3>{filteredContent.title}</h3>
                  </Link>
                  <Link
                    to={`${PATHS.MYPORTAL}/exercise/${filteredContent._id}`}
                  >
                    <h3>Exercises for this class</h3>
                  </Link>
                </div>
              ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default MyPortal;
