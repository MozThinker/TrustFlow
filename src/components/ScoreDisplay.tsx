import { motion } from 'motion/react';
import { ScoreBreakdown } from '../types';

interface ScoreDisplayProps {
  score: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  breakdown: ScoreBreakdown;
}

export default function ScoreDisplay({ score, riskLevel, breakdown }: ScoreDisplayProps) {
  const colorClass = riskLevel === 'Low' ? 'text-green-600' : riskLevel === 'Medium' ? 'text-amber-600' : 'text-red-600';
  const bgClass = riskLevel === 'Low' ? 'bg-green-50' : riskLevel === 'Medium' ? 'bg-amber-50' : 'bg-red-50';
  const borderClass = riskLevel === 'Low' ? 'border-green-100' : riskLevel === 'Medium' ? 'border-amber-100' : 'border-red-100';

  return (
    <div className="glass-card rounded-[2.5rem] p-8 w-full md:w-80 flex flex-col items-center">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Trust Score</h3>
      
      <div className="relative w-48 h-48 flex items-center justify-center mb-8">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            className="text-slate-100"
          />
          <motion.circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={552.92}
            initial={{ strokeDashoffset: 552.92 }}
            animate={{ strokeDashoffset: 552.92 - (552.92 * score) / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={colorClass}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-7xl font-black text-slate-900 font-display"
          >
            {score}
          </motion.span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full mt-2 ${bgClass} ${colorClass} border ${borderClass} uppercase tracking-wider`}>
            {riskLevel} Risk
          </span>
        </div>
      </div>

      <div className="w-full space-y-4">
        {[
          { label: 'Stability', val: breakdown.incomeStability },
          { label: 'Consistency', val: breakdown.consistency },
          { label: 'Health', val: breakdown.health }
        ].map((item) => (
          <div key={item.label} className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>{item.label}</span>
              <span>{item.val.toFixed(0)}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.val}%` }}
                transition={{ duration: 1, delay: 1 }}
                className={`h-full ${colorClass.replace('text', 'bg')}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
