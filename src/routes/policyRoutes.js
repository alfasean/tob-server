const express = require('express');
const { createPolicy, getAllPolicies, updatePolicy, deletePolicy, getPolicyById } = require('../controllers/policyController');

const router = express.Router();

router.post('/', createPolicy);
router.get('/', getAllPolicies);
router.get('/:id', getPolicyById);
router.put('/:id', updatePolicy);
router.delete('/:id', deletePolicy);

module.exports = router;
