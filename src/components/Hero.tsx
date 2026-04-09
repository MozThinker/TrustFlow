import { motion } from 'motion/react';
import { ArrowRight, TrendingUp, ShieldCheck, Users } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  return (
    <div className="relative overflow-hidden pt-16 pb-8">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[120px]" />
      </div>

      <div className="text-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 text-sm font-semibold mb-8"
        >
          <TrendingUp className="w-4 h-4 text-blue-600" />
          <span>AI for Finance Hackathon 2026</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 mb-8 font-display"
        >
          From transactions <br />
          <span className="gradient-text">to trust.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto text-xl text-slate-600 mb-12 leading-relaxed font-medium"
        >
          TrustFlow transforms informal financial activity into a reliable credit score. 
          Empowering small vendors and informal workers to access fair microloans 
          through AI-driven alternative credit scoring.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={onStart}
            className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group"
          >
            Analyze Profile
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-10 py-5 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
            How it works
          </button>
        </motion.div>
      </div>

      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
            title: "Alternative Scoring",
            desc: "We analyze mobile money flows, consistency, and stability instead of traditional collateral."
          },
          {
            icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
            title: "Explainable AI",
            desc: "Transparent insights into why a score was generated, helping users improve their financial health."
          },
          {
            icon: <Users className="w-6 h-6 text-blue-600" />,
            title: "Financial Inclusion",
            desc: "Bridging the gap for millions of unbanked workers to access formal credit markets."
          }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
            className="p-8 glass-card rounded-[2rem] hover:shadow-2xl hover:shadow-blue-100/50 transition-all group"
          >
            <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">{feature.title}</h3>
            <p className="text-slate-600 leading-relaxed font-medium">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
