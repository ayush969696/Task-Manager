

import axios from "axios";
import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import { Link } from "react-router-dom";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://task-manager-eight-xi.vercel.app/tasks",
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

  const handleEdit = async (editedTask) => {
    try {
      const response = await axios.put(
        `https://task-manager-eight-xi.vercel.app/tasks/${editedTask.id}`,
        editedTask,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${JSON.parse(
              localStorage.getItem("UserToken")
            )}`,
          },
        }
      );
      console.log("Edited Task:", response.data);
      fetchTasks(); 
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`https://task-manager-eight-xi.vercel.app/tasks/${taskId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${JSON.parse(
            localStorage.getItem("UserToken")
          )}`,
        },
      });
      console.log("Deleted Task ID:", taskId);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container mt-4 d-flex flex-column">
      <h2>Task List</h2>
      <ul className="list-group mt-3">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </ul>
      <Link className="btn btn-outline-primary mt-4 mb-5" to={"/taskForm"}>
        Add New Task
      </Link>
    </div>
  );
}

export default TaskList;
