const express = require('express');
const pool = require('./db');  // Import the database connection
const app = express();

app.get('/cryptos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cryptos LIMIT 10');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
