const axios = require('axios');

/**
 * ProphetFlow Notification Engine
 * Sends real-time deal alerts to Make.com
 */
async function sendLeadToSubscribers(lead) {
    const WEBHOOK_URL = "https://hook.eu1.make.com/ce3f05b54mj3i6gd8i7cn7yrp0i8stux";

    try {
        await axios.post(WEBHOOK_URL, {
            "Property_Address": lead.address,
            "Estimated_Profit": `$${lead.potentialProfit.toLocaleString()}`,
            "Maximum_Offer": `$${lead.mao.toLocaleString()}`,
            "Lead_Source": lead.source,
            "Distress_Details": lead.description,
            "Owner_Phone_Email": lead.contact ? `Phone: ${lead.contact.phone} | Email: ${lead.contact.email}` : "Standard Access - No Contact"
        }, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(`✅ [SUCCESS] Data pushed to Make.com successfully.`);
    } catch (error) {
        console.error(`❌ [ERROR] Automation Hub failed to receive data.`);
    }
    return true;
}

module.exports = { sendLeadToSubscribers };
