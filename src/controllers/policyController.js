const db = require('../models/policyModel');

exports.createPolicy = (req, res) => {
  const { insured_name, effective_date, expiry_date, vehicle_brand, vehicle_type, vehicle_year, vehicle_price, premium_rate } = req.body;
  const policy_number = `POL${new Date().getTime()}`;
  const premium_price = vehicle_price * (premium_rate / 100);

  const query = 'INSERT INTO policies (policy_number, insured_name, effective_date, expiry_date, vehicle_brand, vehicle_type, vehicle_year, vehicle_price, premium_rate, premium_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  req.pool.query(query, [policy_number, insured_name, effective_date, expiry_date, vehicle_brand, vehicle_type, vehicle_year, vehicle_price, premium_rate, premium_price], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send('Policy created successfully');
  });
};

exports.getAllPolicies = (req, res) => {
  const query = 'SELECT * FROM policies';
  req.pool.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
};

exports.updatePolicy = (req, res) => {
  const { id } = req.params;
  const { insured_name, effective_date, expiry_date, vehicle_brand, vehicle_type, vehicle_year, vehicle_price, premium_rate } = req.body;
  const premium_price = vehicle_price * (premium_rate / 100);

  const query = 'UPDATE policies SET insured_name = ?, effective_date = ?, expiry_date = ?, vehicle_brand = ?, vehicle_type = ?, vehicle_year = ?, vehicle_price = ?, premium_rate = ?, premium_price = ? WHERE id = ?';

  req.pool.query(query, [insured_name, effective_date, expiry_date, vehicle_brand, vehicle_type, vehicle_year, vehicle_price, premium_rate, premium_price, id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send('Policy updated successfully');
  });
};

exports.deletePolicy = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM policies WHERE id = ?';

  req.pool.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send('Policy deleted successfully');
  });
};

exports.getPolicyById = (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM policies WHERE id = ?';

  req.pool.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
};

exports.favicon = (req, res) => {
  res.sendStatus(204);
};

