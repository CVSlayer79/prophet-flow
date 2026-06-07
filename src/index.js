#!/usr/bin/env node
const { Command } = require('commander');
const { calculateMAO } = require('./analysis');
const { getLeadDetails } = require('./leads');
const { scrapeRealLeads } = require('./real_scraper');
const { sendSMS } = require('./outreach');
const { saveLead, getLeads } = require('./db');
const { analyzeDescription } = require('./ai');

const program = new Command();

program
  .name('re-wholesaler')
  .description('AI Assistant for Real Estate Wholesaling')
  .version('1.0.0');

program
  .command('analyze')
  .description('Analyze a property')
  .option('-a, --arv <number>', 'After Repair Value')
  .option('-r, --repairs <number>', 'Estimated Repair Costs')
  .option('-f, --fee <number>', 'Assignment Fee', 5000)
  .action((options) => {
    const results = calculateMAO(
      parseFloat(options.arv),
      parseFloat(options.repairs),
      parseFloat(options.fee)
    );
    
    console.log('\n--- Deal Analysis ---');
    console.log(`ARV: $${results.arv.toLocaleString()}`);
    console.log(`Repairs: $${results.repairs.toLocaleString()}`);
    console.log(`Assignment Fee: $${results.fee.toLocaleString()}`);
    console.log('---------------------');
    console.log(`Maximum Allowable Offer (MAO): $${results.mao.toLocaleString()}`);
    
    if (results.isViable) {
      console.log('\x1b[32m%s\x1b[0m', 'Status: POTENTIAL DEAL!');
    } else {
      console.log('\x1b[31m%s\x1b[0m', 'Status: Not a deal at these numbers.');
    }
  });

program
  .command('find')
  .description('Find details for a property address')
  .argument('<address>', 'Property address')
  .action(async (address) => {
    const details = await getLeadDetails(address);
    console.log('\n--- Property Details ---');
    console.log(`Address: ${details.address}`);
    console.log(`Est. Value: $${details.estimatedValue.toLocaleString()}`);
    console.log(`Est. Repairs: $${details.estimatedRepairs.toLocaleString()}`);
    console.log(`Owner: ${details.ownerName}`);
    
    const analysis = calculateMAO(details.estimatedValue, details.estimatedRepairs);
    console.log('\n--- Auto Analysis ---');
    console.log(`MAO: ${analysis.mao.toLocaleString()}`);
    
    await saveLead({ ...details, mao: analysis.mao });
    console.log('Lead saved to database.');

    if (analysis.isViable) {
      console.log('\x1b[32m%s\x1b[0m', 'Recommended: REACH OUT TO OWNER');
    }
  });

program
  .command('list')
  .description('List saved leads')
  .action(async () => {
    const leads = await getLeads();
    console.log('\n--- Saved Leads ---');
    leads.forEach(l => {
      console.log(`[${l.status.toUpperCase()}] ${l.address} | MAO: ${l.mao.toLocaleString()}`);
    });
  });

program
  .command('contact')
  .description('Send outreach to owner')
  .argument('<phone>', 'Owner phone number')
  .argument('<message>', 'Message to send')
  .action(async (phone, message) => {
    await sendSMS(phone, message);
    console.log('Outreach sent!');
  });

program
  .command('scrape')
  .description('Scrape potential leads from a city')
  .argument('<city>', 'City to search in')
  .action(async (city) => {
    const leads = await scrapeRealLeads(city);
    console.log(`\n--- Found ${leads.length} potential leads in ${city} ---`);
    leads.forEach((lead, i) => {
      console.log(`${i + 1}. ${lead.address} - Est. Price: ${lead.price.toLocaleString()}`);
    });
  });

program
  .command('ai-analyze')
  .description('Analyze a property description for distress signals')
  .argument('<description>', 'Property description text')
  .action(async (description) => {
    const analysis = await analyzeDescription(description);
    console.log('\n--- AI Distress Analysis ---');
    console.log(`Distress Score: ${analysis.distressScore}%`);
    console.log(`Summary: ${analysis.summary}`);
    if (analysis.isHighlyMotivated) {
      console.log('\x1b[31m%s\x1b[0m', 'Status: HIGHLY MOTIVATED SELLER DETECTED');
    }
  });

program.parse();
