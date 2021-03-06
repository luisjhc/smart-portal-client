import React, { useState } from "react";
import axios from "axios";
import * as CONSTS from "../utils/consts";
import ReactMarkdown from "react-markdown";
import ReactPlayer from "react-player";
import "./pagesCss/SingleClassPage.css";

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
    <div className="singleClass-main">
      <h1>{singleClass.title}</h1>
      {singleClass.image ? (
        <div className="singleClass-contentWithImage">
          <img src={singleClass.image} alt="types of questions" />
          <ReactMarkdown>{singleClass.text}</ReactMarkdown>
          <div className="singleClass-video">
            <ReactPlayer url={singleClass.video} controls />
          </div>
        </div>
      ) : (
        <div className="singleClass-contentWithoutImage">
          <ReactMarkdown>{singleClass.text}</ReactMarkdown>
          <div className="singleClass-video">
            <ReactPlayer url={singleClass.video} controls />
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleClassPage;
