import React from "react";
import axios from "axios";
import * as CONSTS from "../../utils/consts";

function ListOfStudents() {
  const [listOfStudents, setListOfStudents] = React.useState([]);
  //const [student, setStudent] = React.useState(true);
  const [success, setSuccess] = React.useState("");

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

        setSuccess(res);
        setTimeout(() => {
          setSuccess("");
        }, 2000);
        //setStudent(false);
      })
      .catch((err) => {
        console.log("err:", err);
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
