const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./src/routes');
const PORT = process.env.PORT || 3000;

dotenv.config()
connectDB();

app.use(cors());
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('Test Backend Tugas PPL!');
});
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

