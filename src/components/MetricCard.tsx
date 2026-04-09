import { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  icon: ReactNode;
}

export default function MetricCard({ label, value, icon }: MetricCardProps) {
  return (
    <div className="glass-card p-5 rounded-3xl">
      <div className="flex items-center gap-2 text-slate-400 mb-2">
        <div className="p-1.5 bg-slate-50 rounded-xl text-blue-600">
          {icon}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-2xl font-bold text-slate-900 font-display">{value}</div>
    </div>
  );
}
