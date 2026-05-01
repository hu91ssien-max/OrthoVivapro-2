import React, { useState } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Hammer, 
  ChevronRight, 
  Zap, 
  Brain,
  ShieldCheck,
  Target,
  Clock,
  Layers,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from "motion/react";
import QuestionBank from './QuestionBank';
import ProximalFemoralNailing from './ProximalFemoralNailing';
import TransfemoralAmputation from './TransfemoralAmputation';

interface TraumaStudyHubProps {
  onBack: () => void;
}

type StudySection = 'home' | 'mcq' | 'techniques';

const TraumaStudyHub = ({ onBack }: TraumaStudyHubProps) => {
  const [activeSection, setActiveSection] = useState<StudySection>('home');
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null);

  if (activeSection === 'mcq') {
    return <QuestionBank category="trauma" studyMode={true} onBack={() => setActiveSection('home')} />;
  }

  if (activeSection === 'techniques' && selectedTechnique === 'pfn') {
    return <ProximalFemoralNailing onBack={() => setSelectedTechnique(null)} />;
  }

  if (activeSection === 'techniques' && selectedTechnique === 'aka') {
    return <TransfemoralAmputation onBack={() => setSelectedTechnique(null)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-xl transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-slate-500" />
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Trauma Study Hub</h1>
              <p className="text-[10px] text-amber-600 font-black uppercase tracking-widest">Interactive Learning Path</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-lg border border-amber-100">
            <Zap size={14} className="text-amber-600" />
            <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Study Mode</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Question Bank path */}
          <motion.button
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => setActiveSection('mcq')}
            className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all text-left flex flex-col group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 -mr-8 -mt-8">
              <Brain size={160} className="text-indigo-600" />
            </div>
            <div className="p-4 bg-indigo-50 rounded-2xl w-fit mb-6 text-indigo-600 group-hover:scale-110 transition-transform">
              <BookOpen size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter mb-2">Question Bank</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose mb-8">
              Interactive high-yield MCQs with detailed clinical rationales and evidence.
            </p>
            <div className="mt-auto flex items-center justify-between w-full">
              <div className="flex items-center gap-2 text-indigo-600 font-black uppercase text-[10px] tracking-[0.2em]">
                Enter Repository <ChevronRight size={14} />
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-50 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400">
                    {i*10}+
                  </div>
                ))}
              </div>
            </div>
          </motion.button>

          {/* Surgical Techniques path */}
          <motion.button
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => setActiveSection('techniques')}
            className="p-8 bg-slate-900 rounded-[2.5rem] shadow-xl hover:shadow-amber-900/20 transition-all text-left flex flex-col group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 -mr-8 -mt-8">
              <Hammer size={160} className="text-amber-400" />
            </div>
            <div className="p-4 bg-amber-500 rounded-2xl w-fit mb-6 text-white group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/20">
              <Hammer size={32} />
            </div>
            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">Surgical Techniques</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose mb-8">
              Step-by-step procedural guides, positioning setup, and technical pitfalls.
            </p>
            <div className="mt-auto flex items-center gap-2 text-amber-400 font-black uppercase text-[10px] tracking-[0.2em]">
              Explore Modules <ChevronRight size={14} />
            </div>
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {activeSection === 'techniques' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-12 space-y-6"
            >
              <div className="flex items-center gap-3">
                <Layers className="text-amber-500" size={18} />
                <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Available Modules</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => setSelectedTechnique('pfn')}
                  className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center gap-4 hover:border-amber-200 transition-all group"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-amber-50 transition-colors">
                    <Target className="text-amber-600" size={20} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">Proximal Femoral Nailing</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">6 Operative Steps • Technical Pearls</p>
                  </div>
                  <ChevronRight size={16} className="ml-auto text-slate-300 group-hover:text-amber-600 transition-colors" />
                </motion.button>

                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => setSelectedTechnique('aka')}
                  className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center gap-4 hover:border-red-200 transition-all group"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-red-50 transition-colors">
                    <ShieldAlert className="text-red-600" size={20} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">Transfemoral Amputation</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Myodesis Protocol • Post-Op Goals</p>
                  </div>
                  <ChevronRight size={16} className="ml-auto text-slate-300 group-hover:text-red-600 transition-colors" />
                </motion.button>

                {/* Placeholder for more techniques */}
                <div className="p-6 bg-white border border-slate-50 rounded-3xl opacity-50 flex items-center gap-4 cursor-not-allowed">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
                    <ShieldCheck className="text-slate-300" size={20} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-black text-slate-300 uppercase tracking-tight">Tibial Nailing</h4>
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Coming Soon</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard insights */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="bg-white p-8 rounded-[2rem] border border-slate-100 border-l-4 border-l-indigo-600">
              <div className="flex items-center gap-2 mb-4">
                <Brain size={16} className="text-indigo-600" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cognitive Load</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-bold italic">
                "Study mode allows for immediate feedback. Use surgical modules to visualize 3D reduction before answering classification MCQs."
              </p>
           </div>
           
           <div className="bg-white p-8 rounded-[2rem] border border-slate-100 border-l-4 border-l-amber-500">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-amber-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No Timer</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-bold italic">
                "Timers are disabled. Take your time to review 'Surgical Rationale' on every question to understand the 'Why', not just the 'What'."
              </p>
           </div>

           <div className="bg-white p-8 rounded-[2rem] border border-slate-100 border-l-4 border-l-emerald-500">
              <div className="flex items-center gap-2 mb-4">
                <Target size={16} className="text-emerald-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Skill Focus</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-bold italic">
                "Current Focus: Intertrochanteric reduction techniques and Tip-Apex Distance (TAD) optimization."
              </p>
           </div>
        </div>
      </main>
    </div>
  );
};

export default TraumaStudyHub;
