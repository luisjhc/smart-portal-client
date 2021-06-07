import React from "react";
import axios from "axios";
import * as CONSTS from "../utils/consts";

function ListOfStudents(props) {
  //console.log("props:", props);
  const [listOfStudents, setListOfStudents] = React.useState([]);
  //const [student, setStudent] = React.useState([]);
  const [success, setSuccess] = React.useState(null);

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

  function handleDelete(id) {
    //console.log("id:", id);
    axios
      .get(`${CONSTS.SERVER_URL}/myPortal/students/:${id}`, {
        headers: {
          authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
        },
      })
      .then((res) => {
        setSuccess(res);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }

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
                  <button onClick={() => handleDelete(filteredStudent._id)}>
                    Delete Student
                  </button>
                  {success && (
                    <div className="success-block">
                      <p>{success.data.message}</p>
                    </div>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        ))}
    </div>
  );
}

export default ListOfStudents;
