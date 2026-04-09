import { TrendingDown, Zap } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

interface ImpactSimulationProps {
  score: number;
  loanAmount: number;
}

export default function ImpactSimulation({ score, loanAmount }: ImpactSimulationProps) {
  // Mock logic: Informal lenders charge ~20% per month. TrustFlow partners charge ~5%.
  const informalInterest = loanAmount * 0.40; // 2 months
  const trustFlowInterest = loanAmount * 0.10; // 2 months
  const savings = informalInterest - trustFlowInterest;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Zap className="w-32 h-32 text-blue-600" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <TrendingDown className="w-5 h-5 text-green-600" />
        Social Impact Simulation
      </h3>

      <p className="text-slate-600 mb-8 max-w-lg">
        By using your Trust Score, you can bypass informal lenders. 
        Here is how much you could save on a {formatCurrency(loanAmount)} loan over 8 weeks.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Informal Lender</span>
          <div className="text-2xl font-bold text-red-600 mt-1">{formatCurrency(informalInterest)}</div>
          <p className="text-xs text-slate-400 mt-1">Estimated Interest Cost</p>
        </div>

        <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">TrustFlow Partner</span>
          <div className="text-2xl font-bold text-blue-600 mt-1">{formatCurrency(trustFlowInterest)}</div>
          <p className="text-xs text-blue-400 mt-1">Estimated Interest Cost</p>
        </div>

        <div className="p-6 rounded-2xl bg-green-50 border border-green-100 flex flex-col justify-center">
          <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Total Savings</span>
          <div className="text-3xl font-black text-green-600 mt-1">{formatCurrency(savings)}</div>
          <div className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-200/50 px-2 py-0.5 rounded-md mt-2 w-fit">
            <Zap className="w-3 h-3" />
            {((savings / informalInterest) * 100).toFixed(0)}% Cheaper
          </div>
        </div>
      </div>
    </div>
  );
}
