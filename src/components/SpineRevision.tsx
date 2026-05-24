import React, { useState } from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  Target, 
  Activity, 
  Bone, 
  ShieldAlert,
  Zap,
  Layers,
  Search,
  Scissors
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import TLICSCalculator from './TLICSCalculator';
import DiscectomyHub from './DiscectomyHub';

import IntervertebralDiscHub from './IntervertebralDiscHub';

interface SpineRevisionProps {
  onBack: () => void;
  onPractice: () => void;
  initialTopic?: string | null;
}

const SpineRevision = ({ onBack, onPractice, initialTopic }: SpineRevisionProps) => {
  const [activeTopic, setActiveTopic] = useState<"menu" | "tlics" | "discectomy" | "disc">((initialTopic as any) || "menu");

  if (activeTopic === "tlics") {
    return <TLICSCalculator onBack={() => setActiveTopic("menu")} />;
  }

  if (activeTopic === "discectomy") {
    return <DiscectomyHub onBack={() => setActiveTopic("menu")} />;
  }

  if (activeTopic === "disc") {
    return <IntervertebralDiscHub onBack={() => setActiveTopic("menu")} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 flex flex-col"
    >
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-slate-600" />
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Spine Revision Hub</h1>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Apley Clinical Mastery Series</p>
            </div>
          </div>
          <button 
            onClick={onPractice}
            className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
          >
            <Activity size={14} /> Practice MCQ
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-slate-950 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="px-3 py-1 bg-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">
              High-Yield Matrix
            </div>
            <div className="w-2 h-2 rounded-full bg-slate-700"></div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Spinal Deformity & Trauma</div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase italic">
            Precision <span className="text-indigo-500">Spine</span> Systems
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm font-medium leading-relaxed italic">
            Master the biomechanics, classifications, and surgical algorithms for spinal pathology. From TLICS stability to AIS deformity correction.
          </p>
        </div>
      </div>

      {/* Topic Grid */}
      <div className="max-w-7xl mx-auto p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* TLICS Calculator */}
        <button 
          onClick={() => setActiveTopic("tlics")}
          className="group flex flex-col p-8 bg-white border border-slate-200 rounded-[2.5rem] text-left hover:shadow-2xl hover:border-indigo-500 transition-all"
        >
          <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <Zap size={30} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter mb-2 transition-colors">TLICS Matrix</h3>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider transition-colors">Thoracolumbar Injury Severity & Decision Tool</p>
          <div className="mt-8 flex items-center gap-2 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
            Open Calculator <ChevronRight size={14} />
          </div>
        </button>

        {/* Discectomy Hub */}
        <button 
          onClick={() => setActiveTopic("discectomy")}
          className="group flex flex-col p-8 bg-white border border-slate-200 rounded-[2.5rem] text-left hover:shadow-2xl hover:border-blue-500 transition-all"
        >
          <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Scissors size={30} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter mb-2 transition-colors">Discectomy Lab</h3>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider transition-colors">Lumbar Microdiscectomy Protocol & Technique</p>
          <div className="mt-8 flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase tracking-widest">
            Open Revision Hub <ChevronRight size={14} />
          </div>
        </button>

        {/* Intervertebral Disc Hub */}
        <button 
          onClick={() => setActiveTopic("disc")}
          className="group flex flex-col p-8 bg-white border border-slate-200 rounded-[2.5rem] text-left hover:shadow-2xl hover:border-blue-600 transition-all"
        >
          <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Layers size={30} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter mb-2 transition-colors">Disc Anatomy</h3>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider transition-colors">Structural Architecture & Biomechanics</p>
          <div className="mt-8 flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase tracking-widest">
            Open Analytics <ChevronRight size={14} />
          </div>
        </button>

        {/* Static Placeholder Cards */}
        <div className="flex flex-col p-8 bg-slate-50 border border-slate-200 border-dashed rounded-[2.5rem] opacity-60">
          <div className="w-14 h-14 bg-slate-200 text-slate-400 rounded-2xl flex items-center justify-center mb-6">
            <Activity size={30} />
          </div>
          <h3 className="text-2xl font-black text-slate-400 uppercase italic tracking-tighter mb-2">AIS Master</h3>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Lenke Classification & Fusion Levels</p>
          <div className="mt-auto pt-8 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Drafting Lab...</div>
        </div>

        <div className="flex flex-col p-8 bg-slate-50 border border-slate-200 border-dashed rounded-[2.5rem] opacity-60">
          <div className="w-14 h-14 bg-slate-200 text-slate-400 rounded-2xl flex items-center justify-center mb-6">
            <Bone size={30} />
          </div>
          <h3 className="text-2xl font-black text-slate-400 uppercase italic tracking-tighter mb-2">Cervical Trauma</h3>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">SLIC Score & Upper Cervical Stability</p>
          <div className="mt-auto pt-8 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Drafting Lab...</div>
        </div>
      </div>
    </motion.div>
  );
};

export default SpineRevision;
