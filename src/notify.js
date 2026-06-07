/**
 * ProphetAI Notification System
 * Sends deals to your subscribers so you don't have to.
 */

const axios = require('axios');

async function sendLeadToSubscribers(lead) {
    console.log(`\n📢 [NOTIFIER] Preparing to send lead: ${lead.address}`);
    
    // PASTE YOUR MAKE.COM WEBHOOK URL HERE
    const WEBHOOK_URL = "https://hook.eu1.make.com/ce3f05b54mj3i6gd8i7cn7yrp0i8stux";

    console.log(`🚀 Sending deal data to Make.com...`);
    
    try {
        // This sends the data from your AI directly to your Make.com scenario
        await axios.post(WEBHOOK_URL, {
            address: lead.address,
            profit: lead.potentialProfit,
            mao: lead.mao,
            source: lead.source,
            distress: lead.description,
            ownerContact: lead.contact || "Standard Tier - No Contact"
        });
        console.log(`✅ [SUCCESS] Lead delivered to Automation Hub.`);
    } catch (error) {
        console.error(`❌ [ERROR] Webhook failed: ${error.message}`);
    }
    
    return true;
}

module.exports = { sendLeadToSubscribers };

module.exports = { sendLeadToSubscribers };
