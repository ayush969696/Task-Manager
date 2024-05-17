import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./component/Auth/AuthContext";
import { Logout } from "./component/Auth/Logout";
import TaskForm from "./component/Tasks/TaskForm";
import TaskList from "./component/Tasks/TaskList";
import Authenticate from "./Pages/Authenticate";
import Home from "./Pages/Home";

const App = () => {
  const { userLoggedIn } = useAuth();

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link fs-5 mx-2 text-white">
              Home
            </Link>
          </li>
          {userLoggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/taskList" className="nav-link fs-5 mx-2 text-white">
                  Tasks
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/logout" className="nav-link fs-5 mx-2 text-white">
                  Log Out
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link
                to="/authenticate"
                className="nav-link fs-5 mx-2 text-white"
              >
                Join Now
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/authenticate" element={<Authenticate />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/taskList" element={<TaskList />} />
        <Route exact path="/taskForm" element={<TaskForm />} />
      </Routes>
    </Router>
  );
};

export default App;
