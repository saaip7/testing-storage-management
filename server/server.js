const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 3000;

dotenv.config()
connectDB();

app.get('/', (req, res) => {
  res.send('Test Backend Tugas PPL!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

