import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { UserProfile, Transaction } from '../types';
import { ArrowRight, Calendar, Activity, Upload, FileText, Loader2 } from 'lucide-react';
import Papa from 'papaparse';

interface ProfileSelectorProps {
  profiles: UserProfile[];
  onSelect: (profile: UserProfile) => void;
  isAnalyzing: boolean;
}

export default function ProfileSelector({ profiles, onSelect, isAnalyzing }: ProfileSelectorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const transactions: Transaction[] = results.data.map((row: any, index: number) => ({
          id: `custom-${index}`,
          date: row.date || new Date().toISOString(),
          type: (row.type?.toLowerCase() === 'inflow' ? 'inflow' : 'outflow') as any,
          amount: parseFloat(row.amount) || 0,
          category: row.category || 'General',
          source: row.source || 'Uploaded File'
        }));

        const customProfile: UserProfile = {
          id: 'custom-upload',
          name: 'Uploaded Profile',
          avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop',
          bio: 'Custom profile generated from uploaded CSV transaction data.',
          transactions: transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        };

        onSelect(customProfile);
      },
      error: (error) => {
        console.error('CSV Parsing Error:', error);
        alert('Error parsing CSV. Please ensure it has headers: date, type, amount, category, source');
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {profiles.map((profile) => (
        <motion.div
          key={profile.id}
          whileHover={{ y: -8 }}
          className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col"
          onClick={() => !isAnalyzing && onSelect(profile)}
        >
          <div className="p-6 flex-grow">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-50"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-lg font-bold text-slate-900">{profile.name}</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                  {profile.id === 'maria' ? 'Low Risk' : profile.id === 'joao' ? 'Medium Risk' : 'High Risk'}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
              {profile.bio}
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>90 days history</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Activity className="w-3.5 h-3.5" />
                <span>{profile.transactions.length} txns</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between group-hover:bg-blue-600 transition-colors">
            <span className="text-xs font-bold text-slate-900 group-hover:text-white uppercase tracking-wider">Analyze</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
        </motion.div>
      ))}

      {/* CSV Upload Card */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".csv"
        onChange={handleFileUpload}
      />
      <motion.div
        whileHover={{ y: -8 }}
        className="bg-white rounded-3xl border-2 border-dashed border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-400 transition-all cursor-pointer group flex flex-col"
        onClick={() => !isAnalyzing && fileInputRef.current?.click()}
      >
        <div className="p-6 flex-grow flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
            {isAnalyzing ? (
              <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
            ) : (
              <Upload className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
            )}
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Upload CSV</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Upload your own mobile money transaction history.
          </p>
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between group-hover:bg-blue-600 transition-colors">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-white">
            {isAnalyzing ? 'Processing...' : 'Select File'}
          </span>
          <FileText className="w-4 h-4 text-slate-300 group-hover:text-white" />
        </div>
      </motion.div>
    </div>
  );
}
