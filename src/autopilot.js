const { scrapeLeads, getLeadDetails } = require('./leads');
const { calculateMAO } = require('./analysis');
const { analyzeDescription } = require('./ai');
const { saveLead } = require('./db');

/**
 * The Auto-Pilot Funnel
 * 1. Scrapes a city
 * 2. Fetches details for each lead
 * 3. Runs AI Distress Analysis
 * 4. Calculates MAO
 * 5. Saves high-potential deals automatically
 */
async function runAutoPilot(city) {
  console.log(`\n🚀 Starting Auto-Pilot for ${city}...\n`);
  
  const rawLeads = await scrapeLeads(city);
  const foundDeals = [];

  for (const rawLead of rawLeads) {
    console.log(`Checking: ${rawLead.address}...`);
    
    // 1. Get full details (Mocked for now)
    const details = await getLeadDetails(rawLead.address);
    
    // 2. AI Motivation Check
    // In a real app, 'description' would come from the scraper
    const description = "Fixer upper, must sell fast, as-is condition."; 
    const ai = await analyzeDescription(description);
    
    // 3. Financial Analysis
    const analysis = calculateMAO(details.estimatedValue, details.estimatedRepairs);
    
    // 4. Filtering Logic: Only save if distressed OR high MAO potential
    if (ai.isHighlyMotivated || analysis.isViable) {
      console.log(`✅ MATCH FOUND: ${rawLead.address}`);
      await saveLead({ ...details, mao: analysis.mao, status: 'auto-flagged' });
      foundDeals.push({ address: rawLead.address, score: ai.distressScore });
    } else {
      console.log(`❌ Skipping: Not a strong enough lead.`);
    }
  }

  return foundDeals;
}

module.exports = { runAutoPilot };
