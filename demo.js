const { runAutoPilot } = require('./src/autopilot');
const { getLeads } = require('./src/db');

async function startFullAutomationDemo() {
  console.log("==========================================");
  console.log("🤖 STARTING FULL AI AUTOMATION SEQUENCE");
  console.log("==========================================");
  
  const city = "Silver Spring, MD";
  
  // 1. Discovery & Analysis
  const dealsFound = await runAutoPilot(city);
  
  console.log("\n==========================================");
  console.log(`✅ SEQUENCE COMPLETE: Found ${dealsFound.length} High-Potential Deals`);
  console.log("==========================================");
  
  // 2. Automated Outreach
  console.log("\n📢 STARTING AUTOMATED OUTREACH...");
  for (const deal of dealsFound) {
     console.log(`[Outreach] Contacting owner of ${deal.address}...`);
     // Simulated successful response
     console.log(`📩 RESPONSE RECEIVED: Owner of ${deal.address} accepted the offer!`);
  }

  // 3. Closing / Monetization
  console.log("\n🤝 ASSIGNING CONTRACT TO INVESTOR...");
  const assignmentFee = 10000;
  const totalProfit = dealsFound.length * assignmentFee;
  
  console.log(`✅ DEAL CLOSED: Contract for ${dealsFound[0].address} assigned to 'Maryland Investors Group'.`);
  console.log(`💰 ASSIGNMENT FEE GENERATED: ${assignmentFee.toLocaleString()}`);

  console.log("\n📂 UPDATING YOUR DATABASE...");
  const allLeads = await getLeads();
  
  console.log("\n--- CURRENT LIVE PIPELINE (Stored in DB) ---");
  allLeads.forEach((lead, i) => {
    console.log(`${i+1}. [${lead.status.toUpperCase()}] ${lead.address}`);
    console.log(`   💰 Max Offer: $${lead.mao.toLocaleString()} | Owner: ${lead.owner_name}`);
  });
  
  console.log("\n==========================================");
  console.log("💰 NEXT STEP: Send outreach or sell this list!");
  console.log("==========================================");
}

startFullAutomationDemo();
