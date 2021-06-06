import React from "react";
import axios from "axios";
import * as CONSTS from "../utils/consts";

function ListOfStudents(props) {
  const [listOfStudents, setListOfStudents] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${CONSTS.SERVER_URL}/myPortal/students`, {
        headers: {
          authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        setListOfStudents(response.data);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }, []);

  return (
    <div>
      <h1>LIST OF STUDENTS</h1>
      {listOfStudents
        .filter((student) => student.role === "student")
        .map((filteredStudent) => (
          <div key={filteredStudent._id}>
            <ul>
              <li>
                <h3>
                  {filteredStudent.firstName} {filteredStudent.lastName}
                </h3>
                <ul>
                  <li>User name: {filteredStudent.username}</li>
                  <li>Email: {filteredStudent.email}</li>
                  <li>Level: {filteredStudent.level}</li>
                </ul>
              </li>
            </ul>
          </div>
        ))}
    </div>
  );
}

export default ListOfStudents;
