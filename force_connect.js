/**
 * ProphetFlow Automation Connector
 * Run this script to "force" Make.com to see your data.
 */

const { sendLeadToSubscribers } = require('./src/notify');

const dummyLead = {
    address: "123 TEST STREET, BALTIMORE, MD",
    potentialProfit: 25000,
    mao: 185000,
    source: "Zillow AI Scan",
    description: "High Distress - Probate Lead Found by AI",
    contact: "Phone: (410) 555-0199 | Email: test@prophetflow.app"
};

console.log("🚀 Starting Automation Connection Test...");
console.log("👉 Make sure your Make.com scenario is in 'Waiting for data' mode.");

async function start() {
    await sendLeadToSubscribers(dummyLead);
    console.log("\n✨ Test Complete. Go to Make.com and check if the circle turned green!");
}

start();
