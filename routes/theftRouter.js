const express = require('express');

const router = express.Router()

const TheftController = require('../controller/TheftController');
router.get("/score", TheftController.index);

router.post("/submit",TheftController.store);

module.exports = router