const express = require("express");
const {
  createTask,
  updateTask,
  deleteTask,
  getTask,
} = require("../controllers/taskController");
const auth = require("../middleware/auth");
const taskRouter = express.Router();

taskRouter.get("/", auth, getTask);
taskRouter.post("/", auth, createTask);
taskRouter.put("/:id", auth, updateTask);
taskRouter.delete("/:id", auth, deleteTask);

module.exports = taskRouter;
