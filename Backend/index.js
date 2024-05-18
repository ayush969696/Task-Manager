require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const taskRouter = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./utils/db');

const app = express();

const corsOptions = {
  origin: 'https://task-manager-eight-xi.vercel.app',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};
app.use(cors(corsOptions));

connectDB();

app.use(express.json());

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/tasks', taskRouter);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
