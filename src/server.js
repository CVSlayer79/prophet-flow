/**
 * ProphetFlow Server
 * Now with enhanced lead tracking for users.
 */

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

// API for the Dashboard to get real Maryland Leads
app.get('/api/my-leads', (req, res) => {
    // In production, these come from your database
    const leads = [
        { 
            address: "124 Main St, Silver Spring, MD", 
            score: 94, 
            profit: 42500, 
            owner: "John Doe",
            status: "Skip-Traced"
        },
        { 
            address: "8802 Belair Rd, Baltimore, MD", 
            score: 88, 
            profit: 28000, 
            owner: "Jane Smith",
            status: "Skip-Traced"
        }
    ];
    res.json(leads);
});

app.listen(PORT, () => {
    console.log(`✅ ProphetFlow Workstation live at http://localhost:${PORT}`);
});
