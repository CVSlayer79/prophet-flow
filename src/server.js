const express = require('express');
const path = require('path');
const { getLeads } = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Real-Time API to fetch leads for the Dashboard
app.get('/api/leads', async (req, res) => {
    try {
        const leads = await getLeads();
        res.json(leads);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch leads" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 ProphetFlow Workstation live at http://localhost:${PORT}`);
});
