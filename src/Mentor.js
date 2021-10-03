import React, { useState, useEffect } from "react";

function Mentor({ match }) {
  let [students, setStudents] = useState([]);
  const [mentor, setMentor] = useState([]);

  // id for passing

  //getting students data
  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await fetch(
          "https://zenclass-backend.herokuapp.com/students"
        );
        const data = await res.json();
        //console.log(data);
        //filtering students based on who doesn;t have mentor
        let filter = data.filter((e) => {
          return e.mentor === "";
        });
        setStudents(filter);
        //console.log(filter)
      } catch (err) {
        console.log(err);
      }
    };
    getStudents();
  }, []);

  //console.log(students)
  //student selected by mentor to be sent to backend
  const [assignedStudent, setAssignedStudent] = useState(students[0]);

  //getting specific mentor data using id from backend
  useEffect(() => {
    try {
      const id = match.params.id;
      //console.log(id);
      const getData = async () => {
        const res = await fetch(
          `https://zenclass-backend.herokuapp.com/mentors/${id}`
        );
        const data = await res.json();
        //console.log(data);
        setMentor(data);
      };
      getData();
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line
  }, []);

  //handle change value for select
  const handleClick = (e) => {
    //console.log(students[0]._id, students[1]._id)
    //console.log(e.target.value);
    let data = students.find((student) => student._id === e.target.value);
    //console.log(data);
    setAssignedStudent(data);
  };

  //assigning a student to mentor collection who does not have mentor put req
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(assignedStudent);

    //let local_Url = "http://localhost:3001";
    //let cloud_Url = "https://zenclass-backend.herokuapp.com/";

    const response = await fetch(
      `https://zenclass-backend.herokuapp.com/mentors/${match.params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignedStudent),
      }
    );
    let data = await response.json();
    //now do whatever you want with the data
    console.log(data);

    //update the student collection, assign/update mentor
    updateStudent();
  };

  //function to update the student database, assign/update mentor
  const updateStudent = async () => {
    const response = await fetch(
      `https://zenclass-backend.herokuapp.com/students/${assignedStudent._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mentor),
      }
    );
    let data = await response.json();
    //now do whatever you want with the data
    console.log(data);
  };

  return (
    <div>
      <div className="student">
        <h1>Mentor detail</h1>
        <h2>Name: {mentor.name}</h2>
        <p>Email: {mentor.email}</p>
        <p>Students Under: {mentor.students} </p>

        {/* form for assigning mentor to students */}
        <h2>Assign students </h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <select
            //onChange={handleChange}
            onClick={handleClick}
          >
            {students.map((student) => {
              return (
                <>
                  <option key={student._id} value={student._id}>
                    {student.name}
                  </option>
                </>
              );
            })}
          </select>
          <button type="submit">Submit </button>
        </form>
      </div>
    </div>
  );
}

export default Mentor;
