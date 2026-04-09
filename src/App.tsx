/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_PROFILES } from './lib/mockData';
import { calculateTrustScore } from './lib/scoringEngine';
import { generateAIInsights } from './services/geminiService';
import { UserProfile, TrustScoreResult } from './types';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import ProfileSelector from './components/ProfileSelector';
import Navbar from './components/Navbar';

export default function App() {
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [scoreResult, setScoreResult] = useState<TrustScoreResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInsights, setAiInsights] = useState<{ explanations: string[], coachingTips: string[] } | null>(null);

  const handleSelectProfile = async (profile: UserProfile) => {
    setSelectedProfile(profile);
    setIsAnalyzing(true);
    setAiInsights(null);
    
    // 1. Calculate base score (Deterministic) - Always works
    const result = calculateTrustScore(profile.transactions);
    setScoreResult(result);

    // 2. Failover Check: If API key is missing, skip AI analysis wait
    const apiKey = process.env.GEMINI_API_KEY;
    const hasValidKey = apiKey && apiKey !== "MY_GEMINI_API_KEY";

    if (!hasValidKey) {
      console.warn("TrustFlow: Gemini API Key missing. Using deterministic engine only.");
      // Small delay for visual feedback of "analysis"
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsAnalyzing(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 3. Generate AI Insights (Generative)
    const insightsPromise = generateAIInsights(profile.name, result, profile.transactions);
    const delayPromise = new Promise(resolve => setTimeout(resolve, 2000));

    const [insights] = await Promise.all([insightsPromise, delayPromise]);
    
    if (insights) {
      setAiInsights(insights);
    }
    
    setIsAnalyzing(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSelectedProfile(null);
    setScoreResult(null);
    setAiInsights(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100">
      <Navbar onReset={handleReset} showReset={!!selectedProfile} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {!selectedProfile ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Hero onStart={() => document.getElementById('profiles')?.scrollIntoView({ behavior: 'smooth' })} />
              <div id="profiles" className="mt-24">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    Select a Demo Profile
                  </h2>
                  <p className="mt-4 text-lg text-slate-600">
                    Choose one of our fictional profiles to see how TrustFlow analyzes informal transaction data.
                  </p>
                </div>
                <ProfileSelector 
                  profiles={MOCK_PROFILES} 
                  onSelect={handleSelectProfile} 
                  isAnalyzing={isAnalyzing}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Dashboard 
                profile={selectedProfile} 
                result={scoreResult} 
                isAnalyzing={isAnalyzing} 
                aiInsights={aiInsights}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500 text-sm">
            &copy; 2026 TrustFlow. Built for the AI for Finance Hackathon.
          </p>
          <p className="text-slate-400 text-xs mt-2">
            Empowering informal workers through data-driven trust.
          </p>
        </div>
      </footer>
    </div>
  );
}
