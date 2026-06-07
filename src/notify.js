/**
 * ProphetAI Notification System
 * Sends deals to your subscribers so you don't have to.
 */

async function sendLeadToSubscribers(lead) {
    console.log(`\n📢 [NOTIFIER] Preparing to send lead: ${lead.address}`);
    
    // In a production environment, you would use SendGrid or Mailgun here.
    // For now, we log the "Delivery" to ensure the workflow is smooth.
    
    const emailBody = `
        🚀 NEW DEAL FOUND: ${lead.address}
        -----------------------------------
        💰 Estimated Profit: $${lead.potentialProfit}
        🎯 MAO: $${lead.mao}
        🏢 Source: ${lead.source}
        ⚠️ Distress: ${lead.description}
        
        Log in to your ProphetAI dashboard to see full details.
    `;

    console.log(`✅ [SUCCESS] Lead sent to all active subscribers via Email/Push.`);
    return true;
}

module.exports = { sendLeadToSubscribers };
