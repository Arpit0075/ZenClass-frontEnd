import React, { useState, useEffect } from "react";

function Mentor({ match }) {
  let [students, setStudents] = useState([]);
  const [mentor, setMentor] = useState([]);

  // id for passing

  //getting students data
  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await fetch("http://localhost:3001/students");
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
        const res = await fetch(`http://localhost:3001/mentors/${id}`);
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
  const handleChange = (e) => {
    //console.log(students[0]._id, students[1]._id)
    //console.log(e.target.value)
    let data = students.find((student) => student._id === e.target.value);
    //console.log(data);
    setAssignedStudent(data);
  };

  //assigning a student to mentor who does not have mentor put req
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(assignedStudent.name);

    const response = await fetch(
      `http://localhost:3001/mentors/${match.params.id}`,
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
          <select onChange={handleChange}>
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
