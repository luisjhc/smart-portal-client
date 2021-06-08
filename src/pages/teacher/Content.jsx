import React from "react";
import { Link } from "react-router-dom";

import * as PATHS from "../../utils/paths";

function Content() {
  return (
    <div>
      <div>
        <Link to={PATHS.CONTENT_BEGINNER}>BEGINNER CONTENT</Link>
        <br />
        <br />
        <Link to={PATHS.CONTENT_INTERMEDIATE}>INTERMEDIATE CONTENT</Link>
        <br />
        <br />
        <Link to={PATHS.CONTENT_ADVANCED}>ADVANCED CONTENT</Link>
      </div>
    </div>
  );
}

export default Content;

// function Content() {
//   //const { user } = props;
//   //console.log(props);
//   const [listOfContent, setListOfContent] = React.useState([]);

//   React.useEffect(() => {
//     axios
//       .get(`${CONSTS.SERVER_URL}/myPortal/content`, {
//         headers: {
//           authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
//         },
//       })
//       .then((response) => {
//         setListOfContent(response.data);
//       })
//       .catch((err) => {
//         console.error(err.response);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>CLASSES</h1>
//       {listOfContent.map((content) => (
//         <div key={content._id}>
//           <h3>{content.title}</h3>
//           <ReactMarkdown>{content.text}</ReactMarkdown>
//           <ReactPlayer url={content.video} controls />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Content;
