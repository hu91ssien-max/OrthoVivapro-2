import React, { useState } from 'react';
import { 
  Stethoscope, 
  BookOpen, 
  ChevronRight, 
  Target,
  Activity,
  ArrowLeft,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import KneeClinicalExpert from './KneeClinicalExpert';
import QuestionBank from './QuestionBank';

interface SportsExaminationModeProps {
  onBack: () => void;
}

const SportsExaminationMode: React.FC<SportsExaminationModeProps> = ({ onBack }) => {
  const [activeView, setActiveView] = useState<'menu' | 'clinical' | 'mcq'>('menu');

  if (activeView === 'clinical') {
    return <KneeClinicalExpert onBack={() => setActiveView('menu')} />;
  }

  if (activeView === 'mcq') {
    return <QuestionBank category="sports" studyMode={false} onBack={() => setActiveView('menu')} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600 text-white rounded-xl">
                <Target size={20} />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tighter text-slate-800 uppercase italic">Sports Medicine</h1>
                <div className="flex items-center gap-1">
                  <ShieldCheck size={10} className="text-emerald-500" />
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Validated Examination Environment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">
            Select Your <span className="text-emerald-600">Testing Vector</span>
          </h2>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">Validated protocols for clinical mastery and knowledge retention.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.button
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => setActiveView('clinical')}
            className="p-10 bg-white border border-slate-200 rounded-[3rem] text-left hover:shadow-2xl hover:border-indigo-500 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 -mr-4 -mt-4">
              <Stethoscope size={160} className="text-indigo-600" />
            </div>
            <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Stethoscope size={44} />
            </div>
            <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">Clinical Expert</h3>
            <p className="text-slate-500 text-sm font-medium italic mb-10 leading-relaxed">Advanced reference for physical examination, biomechanics, and specialty protocols.</p>
            <div className="flex items-center gap-2 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
              Access Expert System <ChevronRight size={14} />
            </div>
          </motion.button>

          <motion.button
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => setActiveView('mcq')}
            className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] text-left hover:shadow-2xl hover:border-emerald-500 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 -mr-4 -mt-4">
              <BookOpen size={160} className="text-emerald-400" />
            </div>
            <div className="w-20 h-20 bg-emerald-500 text-white rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
              <Zap size={44} />
            </div>
            <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4 text-emerald-400">Board Exam</h3>
            <p className="text-slate-400 text-sm font-medium italic mb-10 leading-relaxed text-left">High-yield MCQ bank with clinical vignettes and evidenced-based explanations.</p>
            <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
              Launch MCQ Bank <ChevronRight size={14} />
            </div>
          </motion.button>
        </div>

        <div className="mt-16 bg-white p-8 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 border border-amber-100">
                <Activity size={24} />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">Active Benchmarking</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time performance analytics connected</p>
              </div>
           </div>
           <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                   {i}k+
                </div>
              ))}
           </div>
        </div>
      </main>
    </div>
  );
};

export default SportsExaminationMode;
