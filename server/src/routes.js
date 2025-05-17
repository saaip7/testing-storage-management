const express = require('express');
const { createItem, getLatesItems } = require('./controllers');
const validateItem = require('../middleware/validateItem');
const router = express.Router();

router.post('/createItems', validateItem, createItem);
router.get('/getLatestItems', getLatesItems);

module.exports = router;