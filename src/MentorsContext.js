import { useState, createContext, useEffect } from "react";

export const MentorsContext = createContext();

export const MentorsProvider = (props) => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const getMentors = async () => {
      try {
        const res = await fetch("http://localhost:3001/mentors");
        const data = await res.json();
        // console.log(data);
        setMentors(data);
      } catch (err) {
        console.log(err);
      }
    };
    getMentors();
  }, []);

  return (
    <MentorsContext.Provider value={[mentors, setMentors]}>
      {props.children}
    </MentorsContext.Provider>
  );
};
