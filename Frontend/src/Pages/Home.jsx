import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "../component/Auth/AuthContext";

function Home() {
  const [tasks, setTasks] = useState([]);
  const { userLoggedIn } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [currentPage]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/tasks?page=${currentPage}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${JSON.parse(
              localStorage.getItem("UserToken")
            )}`,
          },
        }
      );
      setTasks(response.data.formattedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  

  const handleCompleteTask = async (taskId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/tasks/${taskId}`,
        { status: "completed" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${JSON.parse(
              localStorage.getItem("UserToken")
            )}`,
          },
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: "completed" } : task
        )
      );
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>
          Next
        </button>
      </div>
      {userLoggedIn ? (
        <ul className="list-group mt-3">
          <h2>All Tasks</h2>

          {tasks.map((task) => (
            <li className="list-group-item" key={task.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{task.title}</h5>
                  <pre className="text-lg text-start whitespace-pre-wrap text-black text-wrap">
                    {task.description}
                  </pre>
                  <small className="text-muted">
                    Date: {new Date(task.dueDate).toDateString()}
                  </small>
                </div>
                <div className="d-flex align-items-center">
                  {task.status !== "completed" && (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleCompleteTask(task.id)}
                    >
                      Complete Task
                    </button>
                  )}
                </div>
              </div>
              <span
                className={`badge bg-${
                  task.status === "completed" ? "success" : "danger"
                } my-4 py-3 px-4`}
              >
                {task.status}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <h2>Please Register! </h2>
      )}
    </div>
  );
}

export default Home;
