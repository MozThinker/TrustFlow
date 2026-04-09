export type TransactionType = 'inflow' | 'outflow';

export interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  amount: number;
  category: string;
  source?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  transactions: Transaction[];
}

export interface ScoreBreakdown {
  incomeStability: number;
  consistency: number;
  health: number;
  longevity: number;
  savings: number;
  volatility: number;
}

export interface TrustScoreResult {
  score: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  breakdown: ScoreBreakdown;
  explanations: string[];
  metrics: {
    totalTransactions: number;
    avgWeeklyIncome: number;
    cashFlowRatio: number;
    stabilityIndex: number;
  };
  loanRecommendation: {
    amount: number;
    period: number;
    note: string;
  };
}
