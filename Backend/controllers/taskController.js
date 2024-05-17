const Task = require("../models/taskModel");

const getTask = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId }).sort({ createdAt:1 });

    const formattedTasks = tasks.map((task) => ({
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate:task.createdAt , 
    }));
    res.status(200).send({
      success: true,
      message: "Get All Tasks!",
      formattedTasks,
    });
  } catch (error) {
    console.error("Server Error GetTask : ", error.message);
    return res.status(500).send({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

const getSingleTask = async (req, res) => {
  try {
    const id = req.params.id;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(400).send({
        success: false,
        message: "Task not found",
      });
    }

    if (task.user.toString() !== req.userId) {
      return res.status(401).send({
        success: false,
        message: "Not authorized to access this task",
      });
    }

    res.status(200).send({
      success: true,
      message: "Get Single Task!",
      task: {
        id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.createdAt, 
      },
    });
  } catch (error) {
    console.error("Error from GetSingleTask", error.message);
    return res.status(500).send({
      success: false,
      message: "Server Error",
      error,
    });
  }
};


const createTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;

  try {
    const newTask = await Task.create({
      title,
      description,
      user: userId,
    });

    res.status(200).send({
      success: true,
      message: "Task Created Successfully!",
      newTask,
    });
  } catch (error) {
    console.error("Error From Create Task", error.message);
    return res.status(500).send({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

const updateTask = async (req, res) => {
    const { title, description, status } = req.body;
  
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        { title, description, status },
      );
  
      if (!task) {
        return res.status(404).send({ success: false, message: 'Task not found' });
      }
  
      if (task.user.toString() !== req.userId) {
        return res.status(401).send({ success: false, message: 'Not authorized to access this task' });
      }
  
      return res.status(200).send({ success: true, message: 'Task updated successfully', task });
    } catch (error) {
      console.error('Error from updateTask:', error.message);
      return res.status(500).send({ success: false, message: 'Server Error', error });
    }
  };

const deleteTask = async (req, res) => {
  try {
    let task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send({ msg: "Task not found" });
    }

    if (task.user.toString() !== req.userId) {
      return res.status(401).send({
        success: false,
        message: "Not authorized to access this task",
      });
    }

    res.status(200).send({
      success: true,
      message: "Task Deleted Successfully!",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

module.exports = {
  getTask,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};
