require("dotenv").config();
const express = require("express");
const taskRouter = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./utils/db");
const app = express();
const cors = require('cors'); 

const option = {
    "origin":"https://task-manager-eight-xi.vercel.app/",
    "method":"GET,POST,PUT,DELETE"
}

app.use(cors(option))

connectDB();

app.use(express.json())
// app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth',userRoutes)
app.use('/api/v1/tasks', taskRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));