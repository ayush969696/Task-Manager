const express = require("express");
const {
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
  getTask,
} = require("../controllers/taskController");
const auth = require("../middleware/auth");
const taskRouter = express.Router();

taskRouter.get("/", auth, getTask);
taskRouter.get("/:id", auth, getSingleTask);
taskRouter.post("/", auth, createTask);
taskRouter.put("/:id", auth, updateTask);
taskRouter.delete("/:id", auth, deleteTask);

module.exports = taskRouter;
