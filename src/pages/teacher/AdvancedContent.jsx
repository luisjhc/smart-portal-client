import React from "react";
import axios from "axios";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import { Link } from "react-router-dom";

function AdvancedContent() {
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
      <h1>ADVANCED CONTENT</h1>
      <div>
        {listOfContent
          .filter((content) => content.level === "advanced")
          .map((filteredContent) => (
            <div key={filteredContent._id}>
              <Link to={`${PATHS.MYPORTAL}/${filteredContent._id}`}>
                <h3>{filteredContent.title}</h3>
              </Link>
              {/* <Link to={PATHS.HOMEWORK}>
                <h3>Homework for this class</h3>
              </Link> */}
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdvancedContent;
