const express = require('express');
const { getCryptoData } = require('../controllers/cryptoController');
const router = express.Router();

// Define route to get crypto data
router.get('/cryptos', getCryptoData);

module.exports = router;
