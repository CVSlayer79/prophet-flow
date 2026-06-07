/**
 * AI Analysis Module
 */

/**
 * Analyze a property description for distress signals.
 * @param {string} description 
 * @returns {object} Insights
 */
async function analyzeDescription(description) {
  console.log('Analyzing description for distress signals...');
  
  const keywords = ['as-is', 'must sell', 'tlc', 'handyman', 'motivated', 'fixer', 'contract', 'cash only'];
  const foundSignals = keywords.filter(k => description.toLowerCase().includes(k));
  
  const distressScore = (foundSignals.length / keywords.length) * 100;
  
  return {
    distressScore: Math.round(distressScore),
    signals: foundSignals,
    isHighlyMotivated: foundSignals.length >= 2,
    summary: foundSignals.length > 0 
      ? `Distress signals found: ${foundSignals.join(', ')}`
      : "No obvious distress signals found."
  };
}

module.exports = {
  analyzeDescription
};
