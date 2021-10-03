import React, { useState, useEffect, useContext } from "react";
import { MentorsContext } from "./MentorsContext";

function Student({ match }) {
  const [student, setStudent] = useState([]);
  const [mentors] = useContext(MentorsContext);
  const [assignedMentor, setAssignedMentor] = useState({});

  //getting specific student data from backend using id
  useEffect(() => {
    try {
      const id = match.params.id;
      //console.log(id);
      const getData = async () => {
        const res = await fetch(
          `https://zenclass-backend.herokuapp.com/students/${id}`
        );
        const data = await res.json();
        //console.log(data);
        setStudent(data);
      };
      getData();
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line
  }, []);

  //handling chnage select
  const handleClick = (e) => {
    let data = mentors.find((mentor) => mentor._id === e.target.value);
    setAssignedMentor(data);
    //console.log(data);
  };

  //assign/update mentor inside student database
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(assignedMentor);

    //let local_Url = "http://localhost:3001";
    //let cloud_Url = "https://zenclass-backend.herokuapp.com/";

    //updating/changing mentor put request
    const response1 = await fetch(
      `https://zenclass-backend.herokuapp.com/students/${match.params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignedMentor),
      }
    );
    let data1 = await response1.json();
    //now do whatever you want with the data
    console.log(data1);

    //update the mentor database,assign the student
    updateMentor();
  };

  //update mentor after updating the student
  const updateMentor = async () => {
    const response2 = await fetch(
      `https://zenclass-backend.herokuapp.com/mentors/${assignedMentor._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      }
    );
    let data2 = await response2.json();
    //now do whatever you want with the data
    console.log(data2);
  };

  return (
    <div className="student">
      <h1>Student detail</h1>
      <h2>Name: {student.name}</h2>
      <p>Email: {student.email}</p>
      <p>Mentor: {student.mentor} </p>
      <select onClick={handleClick}>
        {mentors.map((mentor) => {
          return (
            <>
              <option value={mentor._id}>{mentor.name}</option>
            </>
          );
        })}
      </select>
      <button onClick={handleSubmit}>Update Mentor</button>
    </div>
  );
}

export default Student;
