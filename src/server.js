const express = require('express');
const { inject } = require('@vercel/analytics');
const { runAutoPilot } = require('./autopilot');
const { getLeads } = require('./db');
const { payoutStatus } = require('./payouts');

// Initialize Vercel Analytics
inject();

const app = express();
app.use(express.json());

// Serve static files (including index.html)
app.use(express.static('.'));

// Endpoint to start the automated funnel
app.post('/api/run', async (req, res) => {
  const { city } = req.body;
  if (!city) return res.status(400).json({ error: 'City is required' });
  
  try {
    const results = await runAutoPilot(city);
    res.json({ message: 'Auto-pilot completed', results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to fetch the dashboard data
app.get('/api/deals', async (req, res) => {
  const leads = await getLeads();
  res.json(leads);
});

// Endpoint to check your current bank status
app.get('/api/payouts', (req, res) => {
  res.json(payoutStatus);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
