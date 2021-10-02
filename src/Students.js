import React from "react";
import "./students.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Students() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    id: "",
    mentor: "",
  });

  //state for data from backend
  const [students, setStudents] = useState([]);

  //getting list of students from backend
  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await fetch("http://localhost:3001/students");
        const data = await res.json();
        //console.log(data);
        setStudents(data);
      } catch (err) {
        console.log(err);
      }
    };
    getStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  //posting data from front end to back end
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    //this is the response from backend
    const data = await response.json();
    // now do whatever you want with the data
    console.log(data);
  };

  return (
    <div className="component">
      <h1>Students Page </h1>
      <h2>Students List</h2>
      <div className="mentors">
        {students.map((student) => {
          return (
            <div key={student.id}>
              <Link className="mentors-link" to={`/students/${student._id}`}>
                <p> {student.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <p>Add Student </p>
        <input
          onChange={(e) => handleChange(e)}
          name="name"
          value={student.name}
          placeholder="name"
        ></input>
        <input
          onChange={(e) => handleChange(e)}
          name="email"
          value={student.email}
          placeholder="email"
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Students;
