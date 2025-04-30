const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Route: Directions
app.post('/route', async (req, res) => {
  const { origin, destination } = req.body;

  try {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// ✅ New Route: Autocomplete
app.get('/autocomplete', async (req, res) => {
  const input = req.query.input;
  console.log('[AUTOCOMPLETE] Received input:', input); // ✅ Add this

  try {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&key=${API_KEY}&components=country:ph`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('[AUTOCOMPLETE ERROR]', error);
    res.status(500).json({ error: error.toString() });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});

app.post('/autocomplete', async (req, res) => {
  const input = req.body.input;
  const apiKey = 'AIzaSyAVjcaE-awMwArTeIrt2vffdM7llUpxi6Y';

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&components=country:ph&key=${apiKey}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch autocomplete data');
  }
});
