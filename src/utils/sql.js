

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const { default: axios } = require('axios');
// axios.use(cors());

const app = express();
const port = 3001;

// MySQL Connection
var db = mysql.createConnection
({
  host     : 'localhost',
  user     : 'root',
  password : '1145',
 database : 'user'
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;

  // Perform MySQL query to insert the data into the database
  const sql = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ success: false, message: 'Registration failed' });
    } else {
      res.json({ success: true, message: 'Registration successful' });
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

