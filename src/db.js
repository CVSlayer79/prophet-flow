const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

async function setupDb() {
  const db = await open({
    filename: path.join(__dirname, '../database.sqlite'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      address TEXT UNIQUE,
      owner_name TEXT,
      phone TEXT,
      email TEXT,
      est_value REAL,
      est_repairs REAL,
      mao REAL,
      status TEXT DEFAULT 'new',
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}

async function saveLead(lead) {
  const db = await setupDb();
  try {
    await db.run(
      `INSERT OR REPLACE INTO leads (address, owner_name, est_value, est_repairs, mao, status) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [lead.address, lead.ownerName, lead.estimatedValue, lead.estimatedRepairs, lead.mao, 'new']
    );
    return true;
  } catch (err) {
    console.error('Error saving lead:', err);
    return false;
  }
}

async function getLeads() {
  const db = await setupDb();
  return db.all('SELECT * FROM leads ORDER BY created_at DESC');
}

module.exports = {
  saveLead,
  getLeads
};
