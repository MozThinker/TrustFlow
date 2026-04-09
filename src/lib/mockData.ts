import { UserProfile, Transaction } from '../types';

const generateTransactions = (
  count: number,
  avgInflow: number,
  avgOutflow: number,
  volatility: number,
  stability: number // 0 to 1
): Transaction[] => {
  const transactions: Transaction[] = [];
  const now = new Date();
  const categories = ['Sales', 'Supplies', 'Rent', 'Utilities', 'Personal', 'Savings', 'Transport'];

  for (let i = 0; i < count; i++) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    
    // Inflow
    if (Math.random() < stability || (isWeekend && Math.random() < 0.3)) {
      transactions.push({
        id: `in-${i}`,
        date: date.toISOString(),
        type: 'inflow',
        amount: avgInflow * (1 + (Math.random() - 0.5) * volatility),
        category: 'Sales',
        source: 'Mobile Money'
      });
    }

    // Outflow
    if (Math.random() < 0.8) {
      transactions.push({
        id: `out-${i}`,
        date: date.toISOString(),
        type: 'outflow',
        amount: avgOutflow * (1 + (Math.random() - 0.5) * volatility),
        category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
        source: 'Mobile Money'
      });
    }
  }

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const MOCK_PROFILES: UserProfile[] = [
  {
    id: 'maria',
    name: 'Maria Santos',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop',
    bio: 'Fruit vendor at the central market for 5 years. Consistent daily sales and disciplined savings.',
    transactions: generateTransactions(90, 180, 90, 0.05, 0.98) // High stability, good savings
  },
  {
    id: 'joao',
    name: 'João Silva',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    bio: 'Freelance construction worker. Income varies by project but maintains basic expenses.',
    transactions: generateTransactions(90, 350, 220, 0.35, 0.65) // Medium stability
  },
  {
    id: 'ana',
    name: 'Ana Costa',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    bio: 'New entrepreneur starting a small tailoring business. High outflow for equipment and irregular sales.',
    transactions: generateTransactions(90, 220, 280, 0.65, 0.35) // Low stability, high risk
  }
];
