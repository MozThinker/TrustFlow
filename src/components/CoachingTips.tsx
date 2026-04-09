import { Lightbulb, ArrowUpCircle, Target, Sparkles } from 'lucide-react';

interface CoachingTipsProps {
  score: number;
  customTips?: string[];
}

export default function CoachingTips({ score, customTips }: CoachingTipsProps) {
  const defaultTips = [
    {
      icon: <ArrowUpCircle className="w-5 h-5 text-blue-600" />,
      text: "Maintain consistent weekly inflows to improve your stability index."
    },
    {
      icon: <Target className="w-5 h-5 text-purple-600" />,
      text: "Avoid large cash-outs immediately after peak income days."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-600" />,
      text: "Build a small savings buffer to significantly boost your trust score."
    }
  ];

  const icons = [
    <ArrowUpCircle className="w-5 h-5 text-blue-600" />,
    <Target className="w-5 h-5 text-purple-600" />,
    <Sparkles className="w-5 h-5 text-amber-600" />
  ];

  const tips = customTips 
    ? customTips.map((text, i) => ({ icon: icons[i % icons.length], text }))
    : defaultTips;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        Financial Coaching
      </h3>

      <div className="space-y-6">
        {tips.map((tip, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              {tip.icon}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              {tip.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-2xl bg-slate-50 border border-slate-100">
        <p className="text-xs text-slate-500 italic">
          "Small changes in transaction habits can lead to better credit terms in as little as 4 weeks."
        </p>
      </div>
    </div>
  );
}
