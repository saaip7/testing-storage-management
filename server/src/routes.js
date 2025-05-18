const express = require('express');
const { createItem, getLatesItems, getAllItems } = require('./controllers');
const validateItem = require('../middleware/validateItem');
const router = express.Router();

router.post('/createItems', validateItem, createItem);
router.get('/getLatestItems', getLatesItems);
router.get('/getItems', getAllItems);

module.exports = router;