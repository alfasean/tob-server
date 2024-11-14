const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const policyRoutes = require('./routes/policyRoutes');
require('dotenv').config();
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, 
  },
});

app.use((req, res, next) => {
  req.pool = pool;
  next();
});

app.use('/api/policies', policyRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
