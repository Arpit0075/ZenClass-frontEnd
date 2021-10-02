import "./App.css";
import Nav from "./Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Students from "./Students";
import Mentors from "./Mentors";
import Home from "./Home";
import Student from "./Student";
import Mentor from "./Mentor";
import { StudentsProvider } from "./StudentsContext";
import { MentorsProvider } from "./MentorsContext";

function App() {
  return (
    <div className="App">
      <Router>
        <StudentsProvider>
          <MentorsProvider>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/students" component={Students} />
              <Route path="/students/:id" component={Student} />
              <Route exact path="/mentors" component={Mentors} />
              <Route path="/mentors/:id" component={Mentor} />
            </Switch>
          </MentorsProvider>
        </StudentsProvider>
      </Router>
    </div>
  );
}

export default App;
