const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const policyRoutes = require('./routes/policyRoutes');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use((req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      res.status(500).send('Error connecting to database');
    } else {
      req.pool = connection;
      next();
    }
  });
});

app.use('/api/policies', policyRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
