import React, { useState } from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  Activity, 
  Layers,
  Settings,
  ShieldCheck,
  TrendingDown,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import THAFixationInfographic from './THAFixationInfographic';
import TKARevision from './TKARevision';
import TKAReadingGuide from './TKAReadingGuide';

interface ReconRevisionProps {
  onBack: () => void;
  onPractice: () => void;
  initialTopic?: string | null;
}

const ReconRevision = ({ onBack, onPractice, initialTopic }: ReconRevisionProps) => {
  const [activeTopic, setActiveTopic] = useState<"menu" | "tha" | "tka" | "tka_reading">((initialTopic as any) || "menu");

  if (activeTopic === "tha") {
    return <THAFixationInfographic onBack={() => setActiveTopic("menu")} />;
  }

  if (activeTopic === "tka") {
    return <TKARevision onBack={() => setActiveTopic("menu")} />;
  }

  if (activeTopic === "tka_reading") {
    return <TKAReadingGuide onBack={() => setActiveTopic("menu")} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 flex flex-col"
    >
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-slate-600" />
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Reconstruction Hub</h1>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Arthroplasty & Joint Replacement</p>
            </div>
          </div>
          <button 
            onClick={onPractice}
            className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-95"
          >
            <Activity size={14} /> Practice MCQ
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-slate-950 text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="px-3 py-1 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
              Revision Matrix
            </div>
            <div className="w-2 h-2 rounded-full bg-slate-700"></div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Primary & Complex Arthroplasty</div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase italic">
            Joint <span className="text-blue-500">Reconstruction</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm font-medium leading-relaxed italic">
            Master the biomechanics of fixation, implant selection, and the surgical management of complex primary and revision joint replacements.
          </p>
        </div>
        <RotateCcw className="absolute right-[-40px] top-1/2 -translate-y-1/2 opacity-5 w-96 h-96 pointer-events-none" />
      </div>

      {/* Topic Grid */}
      <div className="max-w-7xl mx-auto p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* THA Fixation */}
        <button 
          onClick={() => setActiveTopic("tha")}
          className="group flex flex-col p-8 bg-white border border-slate-200 rounded-[2.5rem] text-left hover:shadow-2xl hover:border-blue-500 transition-all"
        >
          <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <ShieldCheck size={30} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter mb-2 transition-colors">THA Fixation</h3>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider transition-colors">Cemented vs Biologic Ingrowth Principles</p>
          <div className="mt-8 flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase tracking-widest">
            Open Revision <ChevronRight size={14} />
          </div>
        </button>

        {/* TKA Revision */}
        <button 
          onClick={() => setActiveTopic("tka")}
          className="group flex flex-col p-8 bg-white border border-slate-200 rounded-[2.5rem] text-left hover:shadow-2xl hover:border-amber-500 transition-all"
        >
          <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <Settings size={30} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter mb-2 transition-colors">TKA Revision</h3>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider transition-colors">Fact Sheets & Revision Logic</p>
          <div className="mt-8 flex items-center gap-2 text-amber-600 text-[10px] font-black uppercase tracking-widest">
            Open Dashboard <ChevronRight size={14} />
          </div>
        </button>

        {/* TKA Reading Guide */}
        <button 
          onClick={() => setActiveTopic("tka_reading")}
          className="group flex flex-col p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] text-left hover:shadow-2xl hover:border-blue-500 transition-all text-white"
        >
          <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-400 transition-colors shadow-lg shadow-blue-500/20">
            <Layers size={30} />
          </div>
          <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2 transition-colors">TKA Masterclass</h3>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider transition-colors">Campbell's Chapter 7 Full Reading Guide</p>
          <div className="mt-8 flex items-center gap-2 text-blue-400 text-[10px] font-black uppercase tracking-widest">
            Begin Reading <ChevronRight size={14} />
          </div>
        </button>

        {/* Static Placeholder Cards */}
        <div className="flex flex-col p-8 bg-slate-50 border border-slate-200 border-dashed rounded-[2.5rem] opacity-60">
          <div className="w-14 h-14 bg-slate-200 text-slate-400 rounded-2xl flex items-center justify-center mb-6">
            <TrendingDown size={30} />
          </div>
          <h3 className="text-2xl font-black text-slate-400 uppercase italic tracking-tighter mb-2">Instability Lab</h3>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Dislocation Risks & Constraint Choice</p>
          <div className="mt-auto pt-8 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Drafting Lab...</div>
        </div>

        <div className="flex flex-col p-8 bg-slate-50 border border-slate-200 border-dashed rounded-[2.5rem] opacity-60">
          <div className="w-14 h-14 bg-slate-200 text-slate-400 rounded-2xl flex items-center justify-center mb-6">
            <TrendingDown size={30} />
          </div>
          <h3 className="text-2xl font-black text-slate-400 uppercase italic tracking-tighter mb-2">Instability Lab</h3>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Dislocation Risks & Constraint Choice</p>
          <div className="mt-auto pt-8 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Drafting Lab...</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReconRevision;
