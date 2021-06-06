import React from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../utils/paths";
import axios from "axios";
import * as CONSTS from "../utils/consts";

function MyPortal(props) {
  const [listOfContent, setListOfContent] = React.useState([]);
  //const [listOfHomework, setListOfHomework] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${CONSTS.SERVER_URL}/myPortal/content`, {
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

  // React.useEffect(() => {
  //   axios
  //     .get(`${CONSTS.SERVER_URL}/myPortal/content`, {
  //       headers: {
  //         authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
  //       },
  //     })
  //     .then((response) => {
  //       setListOfHomework(response.data);
  //     })
  //     .catch((err) => {
  //       console.error(err.response);
  //     });
  // }, []);

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
          <h1>CLASSES</h1>
          <div>
            {listOfContent
              .filter((content) => content.level === props.user.level)
              .map((filteredContent) => (
                <div key={filteredContent._id}>
                  <Link to={`${PATHS.MYPORTAL}/${filteredContent._id}`}>
                    <h3>{filteredContent.title}</h3>
                  </Link>
                  <Link to={PATHS.HOMEWORK}>
                    <h3>Homework for this class</h3>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPortal;

// {listOfContent
//   .filter((content) => content.level === props.user.level)
//   .map((filteredContent) => (
//     <div key={filteredContent._id}>
//       <h3>{filteredContent.title}</h3>
//       <ReactMarkdown>{filteredContent.text}</ReactMarkdown>
//       <ReactPlayer url={filteredContent.video} controls />
//     </div>
//   ))}
