import { motion } from 'motion/react';
import { UserProfile, TrustScoreResult } from '../types';
import ScoreDisplay from './ScoreDisplay';
import MetricCard from './MetricCard';
import ChartsSection from './ChartsSection';
import LoanRecommendation from './LoanRecommendation';
import ImpactSimulation from './ImpactSimulation';
import CoachingTips from './CoachingTips';
import { Loader2, Info, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

interface DashboardProps {
  profile: UserProfile;
  result: TrustScoreResult | null;
  isAnalyzing: boolean;
  aiInsights?: {
    explanations: string[];
    coachingTips: string[];
  } | null;
}

export default function Dashboard({ profile, result, isAnalyzing, aiInsights }: DashboardProps) {
  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="mb-6"
        >
          <Loader2 className="w-16 h-16 text-blue-600" />
        </motion.div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Analyzing Financial DNA</h2>
        <p className="text-slate-500 animate-pulse">
          {aiInsights === undefined ? "Processing transaction patterns..." : "Gemini AI is generating personalized insights..."}
        </p>
      </div>
    );
  }

  if (!result) return null;

  const displayExplanations = aiInsights?.explanations || result.explanations;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-grow">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-20 h-20 rounded-3xl object-cover shadow-lg"
              referrerPolicy="no-referrer"
            />
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{profile.name}</h1>
              <p className="text-slate-500 max-w-md">{profile.bio}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <MetricCard 
              label="Total Transactions" 
              value={result.metrics.totalTransactions.toString()} 
              icon={<Info className="w-4 h-4" />}
            />
            <MetricCard 
              label="Avg. Weekly Income" 
              value={formatCurrency(result.metrics.avgWeeklyIncome)} 
              icon={<TrendingUpIcon />}
            />
            <MetricCard 
              label="Cash Flow Ratio" 
              value={result.metrics.cashFlowRatio.toFixed(2)} 
              icon={<ActivityIcon />}
            />
            <MetricCard 
              label="Stability Index" 
              value={`${(result.metrics.stabilityIndex * 100).toFixed(0)}%`} 
              icon={<ShieldIcon />}
            />
          </div>
        </div>

        <ScoreDisplay score={result.score} riskLevel={result.riskLevel} breakdown={result.breakdown} />
      </div>

      {/* Why this score? */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm relative overflow-hidden">
        {aiInsights && (
          <div className="absolute top-0 right-0 p-4">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest border border-blue-100">
              <Sparkles className="w-3 h-3" />
              AI Generated
            </div>
          </div>
        )}
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 font-display">
          <ShieldIcon className="w-5 h-5 text-blue-600" />
          Why this score?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayExplanations.map((exp, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              {result.score > 50 ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
              )}
              <p className="text-slate-700 font-medium text-sm">{exp}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ChartsSection transactions={profile.transactions} breakdown={result.breakdown} />
          <ImpactSimulation score={result.score} loanAmount={result.loanRecommendation.amount} />
        </div>
        <div className="space-y-8">
          <LoanRecommendation recommendation={result.loanRecommendation} riskLevel={result.riskLevel} />
          <CoachingTips score={result.score} customTips={aiInsights?.coachingTips} />
        </div>
      </div>
    </div>
  );
}

// Simple internal icons for the dashboard
function TrendingUpIcon() { return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>; }
function ActivityIcon() { return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>; }
function ShieldIcon({ className }: { className?: string }) { return <svg className={className || "w-4 h-4"} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>; }
