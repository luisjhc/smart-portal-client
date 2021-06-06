import React from "react";
import axios from "axios";
import * as CONSTS from "../utils/consts";
import ReactMarkdown from "react-markdown";
import ReactPlayer from "react-player/youtube";

function MyPortal(props) {
  //const { user } = props;
  //console.log(props);
  const [listOfContent, setListOfContent] = React.useState([]);

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
                <ReactPlayer url={content.video} controls />
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
