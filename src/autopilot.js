/**
 * ProphetFlow Autopilot (v3.0 - Automated Wealth Engine)
 * Orchestrates multi-source scraping, analysis, and skip-tracing.
 */

const { scrapeRealWorldLeads } = require('./real_scraper');
const { calculateMAO } = require('./analysis');
const { saveLead } = require('./db');
const { sendLeadToSubscribers } = require('./notify');
const { automatedSkipTrace } = require('./skiptrace');

async function runAutopilot(regionCode = "MD", city = "Baltimore") {
    console.log(`🚀 ProphetFlow Global Autopilot Starting...`);
    console.log(`📍 Target: ${city}, ${regionCode}`);

    try {
        const rawLeads = await scrapeRealWorldLeads(regionCode, city);
        console.log(`✅ Found ${rawLeads.length} candidate properties.`);

        for (const lead of rawLeads) {
            console.log(`\n🔍 Analyzing: ${lead.address}`);
            const analysis = calculateMAO(lead.price * 1.5, lead.price * 0.2); 
            
            let contactInfo = null;

            // AUTOMATION: If it's a high-profit lead, perform skip trace automatically
            // This ensures "Inner Circle" ($499) value is generated without manual work.
            if (analysis.assignmentFee > 10000) {
                contactInfo = await automatedSkipTrace(lead.address);
            }

            const finalLead = {
                ...lead,
                mao: analysis.mao,
                potentialProfit: analysis.assignmentFee,
                contact: contactInfo
            };
            
            await saveLead(finalLead);
            console.log(`💾 Saved to Database.`);

            // Smoothly notify subscribers automatically
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
