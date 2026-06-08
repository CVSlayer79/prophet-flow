/**
 * Deal Analysis Module
 */

/**
 * Calculate the Maximum Allowable Offer (MAO)
 * @param {number} arv - After Repair Value
 * @param {number} repairs - Estimated Repair Costs
 * @param {number} fee - Desired Assignment Fee (default 5000)
 * @param {number} rule - The "70% rule" (default 0.7)
 * @returns {object} Analysis results
 */
function calculateMAO(arv, repairs, fee = 5000, rule = 0.7) {
  const mao = (arv * rule) - repairs - fee;
  const potentialProfit = fee;
  
  return {
    arv,
    repairs,
    fee,
    rule,
    mao: Math.max(0, mao),
    isViable: mao > 0
  };
}

module.exports = {
  calculateMAO
};
