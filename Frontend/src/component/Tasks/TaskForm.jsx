import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TaskForm = ({ task, onCancelEdit, onEditSubmit }) => {
  const [formData, setFormData] = useState({
    title: (task && task.title) || "",
    description: (task && task.description) || "",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task) {
        const editedTask = { ...formData, id: task.id };
        onEditSubmit(editedTask);
      } else {
        const response = await axios.post(
          "https://task-manager-eight-xi.vercel.app/tasks",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${JSON.parse(
                localStorage.getItem("UserToken")
              )}`,
            },
          }
        );
        console.log("New Task:", response.data);
        if(response.data.success){
            setFormData({
                task: "",
                description: "",
            })
            navigate("/")
        }
      }
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="m-5">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="m-5">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary m-5">
        {task ? "Save" : "Add"}
      </button>
      {task && (
        <button
          type="button"
          className="btn btn-secondary m-5"
          onClick={onCancelEdit}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default TaskForm;
