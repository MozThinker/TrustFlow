import { Transaction, TrustScoreResult, ScoreBreakdown } from '../types';

/**
 * TrustFlow Scoring Engine
 * 
 * Logic:
 * - Income Stability (30%): Consistency of weekly inflows.
 * - Transaction Consistency (20%): Frequency of activity.
 * - Financial Health (15%): Inflow/Outflow ratio.
 * - Longevity (15%): History duration (mocked).
 * - Savings Behavior (10%): Allocation to savings categories.
 * - Volatility (10%): Predictability of cash flows.
 */
export function calculateTrustScore(transactions: Transaction[]): TrustScoreResult {
  if (transactions.length === 0) {
    return {
      score: 0,
      riskLevel: 'High',
      breakdown: { incomeStability: 0, consistency: 0, health: 0, longevity: 0, savings: 0, volatility: 0 },
      explanations: ['No transaction history found.'],
      metrics: { totalTransactions: 0, avgWeeklyIncome: 0, cashFlowRatio: 0, stabilityIndex: 0 },
      loanRecommendation: { amount: 0, period: 0, note: 'Insufficient data for recommendation.' }
    };
  }

  const inflows = transactions.filter(t => t.type === 'inflow');
  const outflows = transactions.filter(t => t.type === 'outflow');
  
  const totalInflow = inflows.reduce((sum, t) => sum + t.amount, 0);
  const totalOutflow = outflows.reduce((sum, t) => sum + t.amount, 0);
  
  // 1. Income Stability (30%)
  const weeklyInflows: { [week: string]: number } = {};
  inflows.forEach(t => {
    const date = new Date(t.date);
    const week = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`;
    weeklyInflows[week] = (weeklyInflows[week] || 0) + t.amount;
  });
  
  const weeklyValues = Object.values(weeklyInflows);
  const avgWeeklyIncome = weeklyValues.reduce((a, b) => a + b, 0) / (weeklyValues.length || 1);
  const variance = weeklyValues.reduce((a, b) => a + Math.pow(b - avgWeeklyIncome, 2), 0) / (weeklyValues.length || 1);
  const stdDev = Math.sqrt(variance);
  const stabilityIndex = Math.max(0, 1 - (stdDev / (avgWeeklyIncome || 1)));
  const incomeStability = stabilityIndex * 100;

  // 2. Transaction Consistency (20%)
  const daysWithActivity = new Set(transactions.map(t => t.date.split('T')[0])).size;
  const consistency = Math.min(100, (daysWithActivity / 90) * 100);

  // 3. Financial Health (15%)
  const cashFlowRatio = totalInflow / (totalOutflow || 1);
  const health = Math.min(100, Math.max(0, (cashFlowRatio - 0.7) * 120)); 

  // 4. Longevity (15%)
  const longevity = 88; 

  // 5. Savings Behavior (10%)
  const savingsAmount = transactions.filter(t => t.category === 'Savings').reduce((sum, t) => sum + t.amount, 0);
  const savingsRate = savingsAmount / (totalInflow || 1);
  const savings = Math.min(100, savingsRate * 800); 

  // 6. Volatility (10%)
  const volatility = Math.min(100, stabilityIndex * 110);

  // Final Weighted Score
  const score = Math.round(
    (incomeStability * 0.30) +
    (consistency * 0.20) +
    (health * 0.15) +
    (longevity * 0.15) +
    (savings * 0.10) +
    (volatility * 0.10)
  );

  const riskLevel = score > 75 ? 'Low' : score > 50 ? 'Medium' : 'High';

  // Dynamic Explanations
  const explanations: string[] = [];
  if (stabilityIndex > 0.85) explanations.push('Exceptional weekly income stability over 3 months.');
  else if (stabilityIndex > 0.6) explanations.push('Moderate income stability with manageable fluctuations.');
  else explanations.push('High income volatility suggests irregular business cycles.');

  if (consistency > 85) explanations.push('Highly active profile with daily transaction engagement.');
  if (cashFlowRatio > 1.1) explanations.push('Positive net cash flow maintains a healthy financial buffer.');
  if (savingsRate > 0.08) explanations.push('Strong savings discipline improves long-term creditworthiness.');
  if (score > 80) explanations.push('Overall profile demonstrates low default probability.');

  // Loan Recommendation
  const recommendedAmount = Math.round((avgWeeklyIncome * 2.5) * (score / 100));
  const recommendedPeriod = score > 75 ? 12 : score > 50 ? 8 : 4;

  return {
    score,
    riskLevel,
    breakdown: { incomeStability, consistency, health, longevity, savings, volatility },
    explanations: explanations.slice(0, 4),
    metrics: {
      totalTransactions: transactions.length,
      avgWeeklyIncome,
      cashFlowRatio,
      stabilityIndex
    },
    loanRecommendation: {
      amount: recommendedAmount,
      period: recommendedPeriod,
      note: `Recommendation based on ${riskLevel.toLowerCase()} risk and ${stabilityIndex > 0.7 ? 'high' : 'moderate'} stability.`
    }
  };
}
