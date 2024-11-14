const pool = require('../models/policyModel');

exports.createPolicy = (req, res) => {
  const { insured_name, effective_date, expiry_date, vehicle_brand, vehicle_type, vehicle_year, vehicle_price, premium_rate } = req.body;
  const policy_number = `POL${new Date().getTime()}`;
  const premium_price = vehicle_price * (premium_rate / 100);

  const query = `
    INSERT INTO policies (policy_number, insured_name, effective_date, expiry_date, vehicle_brand, vehicle_type, vehicle_year, vehicle_price, premium_rate, premium_price)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `;
  const values = [policy_number, insured_name, effective_date, expiry_date, vehicle_brand, vehicle_type, vehicle_year, vehicle_price, premium_rate, premium_price];

  pool.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(201).send('Policy created successfully');
  });
};

exports.getAllPolicies = (req, res) => {
  const query = 'SELECT * FROM policies';
  pool.query(query, (err, result) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).json(result.rows);
  });
};

exports.getPolicyById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM policies WHERE id = $1';
  pool.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).json(result.rows[0]);
  });
};

exports.updatePolicy = (req, res) => {
  const { id } = req.params;
  const { insured_name, effective_date, expiry_date, vehicle_brand, vehicle_type, vehicle_year, vehicle_price, premium_rate } = req.body;
  const premium_price = vehicle_price * (premium_rate / 100);

  const query = `
    UPDATE policies
    SET insured_name = $1, effective_date = $2, expiry_date = $3, vehicle_brand = $4, vehicle_type = $5, vehicle_year = $6, vehicle_price = $7, premium_rate = $8, premium_price = $9
    WHERE id = $10
  `;
  const values = [insured_name, effective_date, expiry_date, vehicle_brand, vehicle_type, vehicle_year, vehicle_price, premium_rate, premium_price, id];

  pool.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send('Policy updated successfully');
  });
};

exports.deletePolicy = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM policies WHERE id = $1';

  pool.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send('Policy deleted successfully');
  });
};

exports.favicon = (req, res) => {
  res.sendStatus(204);
};
