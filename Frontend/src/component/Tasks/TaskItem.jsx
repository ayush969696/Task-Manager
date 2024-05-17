import React, { useState } from "react";
import TaskForm from "./TaskForm";

function TaskItem({ task, onDelete, onEdit }) {
  const { id, title, description, dueDate, status } = task;

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDelete(id);
  };

  const handleEditSubmit = (editedTask) => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  return (
    <li className="list-group-item ">
      {isEditing ? (
        <TaskForm
          task={task}
          onCancelEdit={handleCancelEdit}
          onEditSubmit={handleEditSubmit}
        />
      ) : (
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5>{title}</h5>
            <pre className="pl-4 text-lg text-start text-black text-wrap">
              {description}
            </pre>
            <small className="text-muted">
              Date: {new Date(dueDate).toLocaleDateString()}
            </small>
          </div>
          <div className="d-flex align-items-center">
            <span
              className={`badge bg-${
                status === "completed" ? "success" : "danger"
              } me-4 py-3 px-3`}
            >
              {status}
            </span>
            <button
              className="btn btn-outline-primary me-2"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button className="btn btn-danger" onClick={handleDeleteClick}>
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TaskItem;
