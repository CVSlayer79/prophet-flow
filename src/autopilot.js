/**
 * ProphetAI Autopilot (v2.0 - Global Modular)
 * Orchestrates multi-source scraping and analysis.
 */

const { scrapeRealWorldLeads } = require('./real_scraper');
const { calculateMAO } = require('./analysis');
const { saveLead } = require('./db');
const { sendLeadToSubscribers } = require('./notify');

async function runAutopilot(regionCode = "MD", city = "Baltimore") {
    console.log(`🚀 ProphetAI Global Autopilot Starting...`);
    console.log(`📍 Target: ${city}, ${regionCode}`);

    try {
        const rawLeads = await scrapeRealWorldLeads(regionCode, city);
        console.log(`✅ Found ${rawLeads.length} candidate properties.`);

        for (const lead of rawLeads) {
            console.log(`\n🔍 Analyzing: ${lead.address}`);
            const analysis = calculateMAO(lead.price * 1.5, lead.price * 0.2); 
            
            const finalLead = {
                ...lead,
                mao: analysis.mao,
                potentialProfit: analysis.assignmentFee
            };
            
            await saveLead(finalLead);
            console.log(`💾 Saved to Database.`);

            // NEW: Smoothly notify subscribers automatically
            if (finalLead.potentialProfit > 5000) {
                await sendLeadToSubscribers(finalLead);
            }
        }

        console.log(`\n✨ Autopilot Run Complete. Check your dashboard at http://localhost:3000`);

    } catch (error) {
        console.error("❌ Autopilot Error:", error.message);
    }
}

// If run directly
if (require.main === module) {
    const args = process.argv.slice(2);
    runAutopilot(args[0], args[1]);
}

module.exports = { runAutopilot };
