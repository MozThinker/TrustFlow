import { Wallet, Calendar, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

interface LoanRecommendationProps {
  recommendation: {
    amount: number;
    period: number;
    note: string;
  };
  riskLevel: string;
}

export default function LoanRecommendation({ recommendation, riskLevel }: LoanRecommendationProps) {
  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-200 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16" />
      
      <h3 className="text-xl font-bold mb-8 flex items-center gap-3 font-display">
        <div className="bg-blue-600 p-2 rounded-xl">
          <Wallet className="w-5 h-5 text-white" />
        </div>
        Loan Offer
      </h3>
      
      <div className="space-y-8">
        <div>
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Suggested Amount</span>
          <div className="text-5xl font-black mt-2 font-display text-blue-500">{formatCurrency(recommendation.amount)}</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 p-5 rounded-3xl border border-white/10">
            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">
              <Calendar className="w-3 h-3" />
              Period
            </div>
            <div className="text-xl font-bold font-display">{recommendation.period} Weeks</div>
          </div>
          <div className="bg-white/5 p-5 rounded-3xl border border-white/10">
            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">
              <ShieldCheck className="w-3 h-3" />
              Risk
            </div>
            <div className="text-xl font-bold font-display">{riskLevel}</div>
          </div>
        </div>

        <div className="p-5 bg-white/5 rounded-3xl text-sm leading-relaxed border border-white/5 text-slate-300 font-medium">
          <p>{recommendation.note}</p>
        </div>

        <button className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20 active:scale-[0.98]">
          Apply Now
        </button>
        
        <p className="text-center text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          Responsible Lending • TrustFlow AI
        </p>
      </div>
    </div>
  );
}
