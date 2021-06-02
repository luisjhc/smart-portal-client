import React from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import * as CONSTS from "../utils/consts";

function MyPortal(props) {
  console.log("props:", props);
  const [listOfContent, setListOfContent] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${CONSTS.SERVER_URL}/myPortal`)
      .then((response) => {
        console.log("response:", response);
        setListOfContent(response.data);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }, []);

  return (
    <div>
      {props.user.role === "teacher" ? (
        <div>
          <h1>CLASSES</h1>
          {listOfContent.map((content) => {
            return (
              <div key={content._id}>
                {content.title}
                <ReactMarkdown>{content.text}</ReactMarkdown>
              </div>
            );
          })}
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
