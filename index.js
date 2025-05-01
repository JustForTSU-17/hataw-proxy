const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Proxy server is running');
});

// 📍 ROUTE: Get Directions
app.post('/route', async (req, res) => {
  const { origin, destination } = req.body;
  const apiKey = process.env.GOOGLE_API_KEY;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json`,
      {
        params: {
          origin,
          destination,
          key: apiKey,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error in /route:', error);
    res.status(500).json({ error: error.toString() });
  }
});

// ✅ NEW: PLACE AUTOCOMPLETE
app.get('/place/autocomplete', async (req, res) => {
  const { input } = req.query;
  const apiKey = process.env.GOOGLE_API_KEY;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
      {
        params: {
          input,
          key: apiKey,
          components: 'country:ph',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error in /place/autocomplete:', error);
    res.status(500).json({ error: error.toString() });
  }
});

// ✅ NEW: PLACE GEOCODE
app.get('/place/geocode', async (req, res) => {
  const { address } = req.query;
  const apiKey = process.env.GOOGLE_API_KEY;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address,
          key: apiKey,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error in /place/geocode:', error);
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
