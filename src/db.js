/**
 * ProphetFlow Database Engine
 * Added duplicate checking for cleaner dashboards.
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../database.sqlite');

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        address TEXT UNIQUE,
        price REAL,
        mao REAL,
        profit REAL,
        source TEXT,
        distress TEXT,
        phone TEXT,
        email TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

function saveLead(lead) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare(`INSERT OR IGNORE INTO leads 
            (address, price, mao, profit, source, distress, phone, email) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
        
        stmt.run(
            lead.address, 
            lead.price, 
            lead.mao, 
            lead.potentialProfit, 
            lead.source, 
            lead.description,
            lead.contact ? lead.contact.phone : null,
            lead.contact ? lead.contact.email : null,
            (err) => {
                if (err) reject(err);
                else resolve(this.lastID);
            }
        );
        stmt.finalize();
    });
}

function getLeads() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM leads ORDER BY created_at DESC LIMIT 50", (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

module.exports = { saveLead, getLeads };
