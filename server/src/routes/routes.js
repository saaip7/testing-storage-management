const express = require('express');
const { createItem, getLatestItems, getAllItems } = require('../controllers/controllers');
const validateItem = require('../../middleware/validateItem');
const router = express.Router();

router.post('/createItems', validateItem, createItem);
router.get('/getLatestItems', getLatestItems);
router.get('/getItems', getAllItems);

module.exports = router;