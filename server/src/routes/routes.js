const express = require('express');
const { createItem, getLatestItems, getAllItems } = require('../controllers/controllers');
const validateItem = require('../../middleware/validateItem');
const validateObjectId = require('../../middleware/validateObjectId');
const router = express.Router();

router.post('/items', validateItem, createItem);
router.get('/items', getLatestItems);
router.get('/items/all', getAllItems);
router.delete('/items/:id', validateObjectId, deleteItem);

module.exports = router;