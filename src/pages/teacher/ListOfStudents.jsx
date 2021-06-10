import React from "react";
import axios from "axios";
import * as CONSTS from "../../utils/consts";

function ListOfStudents() {
  const [listOfStudents, setListOfStudents] = React.useState([]);

  const [success, setSuccess] = React.useState("");

  React.useEffect(() => {
    axios
      .get(`${CONSTS.SERVER_URL}/listOfStudents`, {
        headers: {
          authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        return setListOfStudents(response.data);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }, []);

  function handleDelete(id) {
    //console.log("id:", id);
    axios
      .delete(`${CONSTS.SERVER_URL}/listOfStudents/${id}`, {
        headers: {
          authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
        },
      })
      .then((res) => {
        setSuccess(res);
        setTimeout(() => {
          setSuccess("");
        }, 2000);

        axios
          .get(`${CONSTS.SERVER_URL}/listOfStudents`, {
            headers: {
              authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
            },
          })
          .then((response) => {
            console.log("response:", response);
            setListOfStudents(response.data);
          })
          .catch((err) => {
            console.log("err:", err.response);
          });
      })
      .catch((err) => {
        console.log("err:", err.response);
      });
  }

  return (
    <div>
      <h1>LIST OF STUDENTS</h1>
      {success && (
        <div className="success-block">
          <p>Student {success.data.student.username} has been deleted</p>
        </div>
      )}
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
                </ul>
              </li>
            </ul>
          </div>
        ))}
    </div>
  );
}

export default ListOfStudents;
