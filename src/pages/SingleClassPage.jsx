import React, { useState } from "react";
import axios from "axios";
import * as CONSTS from "../utils/consts";
import ReactMarkdown from "react-markdown";
import ReactPlayer from "react-player";

function SingleClassPage(props) {
  //console.log("props:", props);
  const [singleClass, setSingleClass] = useState({});

  React.useEffect(() => {
    axios
      .get(`${CONSTS.SERVER_URL}/myPortal/${props.match.params.classId}`, {
        headers: {
          authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        //console.log("response:", response);
        setSingleClass(response.data);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }, [props.match.params.classId]);

  return (
    <div>
      <h1>{singleClass.title}</h1>
      <ReactMarkdown>{singleClass.text}</ReactMarkdown>
      <ReactPlayer url={singleClass.video} controls />
    </div>
  );
}

export default SingleClassPage;
