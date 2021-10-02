import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Mentors() {
  //creating new mentor
  const [mentor, setMentor] = useState({
    name: "",
    email: "",
    id: "",
    students: [],
  });

  //using data from backend
  const [mentors, setMentors] = useState([]);

  //getting list of mentors
  useEffect(() => {
    const getMentors = async () => {
      try {
        const res = await fetch(
          "https://zenclass-backend.herokuapp.com/mentors"
        );
        const data = await res.json();
        //console.log(data);
        setMentors(data);
      } catch (err) {
        console.log(err);
      }
    };
    getMentors();
  }, []);

  //handling changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMentor((prev) => ({ ...prev, [name]: value }));
    //console.log(mentor);
  };

  //creating new mentor
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(mentor);
    const response = await fetch(
      "https://zenclass-backend.herokuapp.com/mentors",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mentor),
      }
    );

    //response from backend
    const data = await response.json();

    // now do whatever you want with the data
    console.log(data);
  };
  return (
    <div className="component">
      <h1>Mentors Page </h1>
      <h2>Mentors List</h2>
      <div className="mentors">
        {mentors.map((mentor) => {
          return (
            <div key={mentor.id}>
              <Link className="mentors-link" to={`/mentors/${mentor._id}`}>
                <p> {mentor.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <p>Add Mentor </p>
        <input
          onChange={(e) => handleChange(e)}
          name="name"
          value={mentor.name}
          placeholder="name"
        ></input>
        <input
          onChange={(e) => handleChange(e)}
          name="email"
          value={mentor.email}
          placeholder="email"
        ></input>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Mentors;
