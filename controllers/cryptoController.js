const fetch = require('node-fetch');
const pool = require('../config/db');

// Fetch top 10 results from WazirX API
const fetchCryptoData = async () => {
  try {
    const response = await fetch('https://api.wazirx.com/api/v2/tickers');
    const data = await response.json();
    const top10 = Object.keys(data).slice(0, 10).map(key => ({
      name: key,
      last: data[key].last,
      buy: data[key].buy,
      sell: data[key].sell,
      volume: data[key].volume,
      base_unit: data[key].base_unit,
    }));
    return top10;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

// Insert top 10 crypto data into the database
const insertCryptoData = async () => {
  const top10 = await fetchCryptoData();
  try {
    for (const crypto of top10) {
      await pool.query(
        'INSERT INTO cryptos (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)',
        [crypto.name, crypto.last, crypto.buy, crypto.sell, crypto.volume, crypto.base_unit]
      );
    }
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

// Fetch stored cryptocurrency data from the database
const getCryptoData = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cryptos LIMIT 10');
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Server error');
  }
};

module.exports = { insertCryptoData, getCryptoData };
