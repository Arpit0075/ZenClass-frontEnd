import React, { useState, createContext, useEffect } from "react";

export const studentsContext = createContext();

export const StudentsProvider = (props) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await fetch(
          "https://zenclass-backend.herokuapp.com/students"
        );
        const data = await res.json();
        // console.log(data);
        setStudents(data);
      } catch (err) {
        console.log(err);
      }
    };
    getStudents();
  }, []);

  return (
    <studentsContext.Provider value={[students, setStudents]}>
      {props.children}
    </studentsContext.Provider>
  );
};
