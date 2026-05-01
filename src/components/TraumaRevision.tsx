import React, { useState } from 'react';
import { 
  Activity, 
  ChevronRight,
  ArrowLeft,
  BookOpen,
  Bone,
  Zap,
  Scaling,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from "motion/react";
import FemoralNeckFracture from "./FemoralNeckFracture";
import IntertrochantericFracture from "./IntertrochantericFracture";
import SubtrochantericFracture from "./SubtrochantericFracture";
import FemoralShaftFracture from "./FemoralShaftFracture";
import DistalFemurFracture from "./DistalFemurFracture";
import PelvicRingDisruptions from "./PelvicRingDisruptions";

interface TraumaRevisionProps {
  onBack: () => void;
  onPractice: () => void;
}

const TraumaRevision = ({ onBack, onPractice }: TraumaRevisionProps) => {
  const [activeTopic, setActiveTopic] = useState<"menu" | "femoral_neck" | "intertrochanteric" | "subtrochanteric" | "femoral_shaft" | "distal_femur" | "pelvic_ring">("menu");

  if (activeTopic === "femoral_neck") {
    return <FemoralNeckFracture onBack={() => setActiveTopic("menu")} />;
  }

  if (activeTopic === "intertrochanteric") {
    return <IntertrochantericFracture onBack={() => setActiveTopic("menu")} />;
  }

  if (activeTopic === "subtrochanteric") {
    return <SubtrochantericFracture onBack={() => setActiveTopic("menu")} />;
  }

  if (activeTopic === "femoral_shaft") {
    return <FemoralShaftFracture onBack={() => setActiveTopic("menu")} />;
  }

  if (activeTopic === "distal_femur") {
    return <DistalFemurFracture onBack={() => setActiveTopic("menu")} />;
  }

  if (activeTopic === "pelvic_ring") {
    return <PelvicRingDisruptions onBack={() => setActiveTopic("menu")} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20 transition-colors duration-300"
    >
      {/* Utility Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 transition-colors">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>
          
          <button 
            onClick={onPractice}
            className="flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white text-xs font-black rounded-full uppercase hover:bg-red-700 transition-all shadow-lg shadow-red-200"
          >
            <BookOpen size={14} />
            Practice MCQs
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key="menu"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          className="max-w-4xl mx-auto px-4 py-16"
        >
          <h2 className="text-3xl font-black text-slate-900 uppercase italic mb-2 tracking-tighter transition-colors">
            Trauma <span className="text-red-600">Revision Portal</span>
          </h2>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-10 transition-colors">High-yield trauma summaries for your session</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <button 
              onClick={() => setActiveTopic("femoral_neck")}
              className="group flex flex-col p-10 bg-white border border-slate-200 rounded-[3rem] text-left hover:shadow-2xl hover:border-red-500 transition-all"
            >
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Bone size={36} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-3 transition-colors">Femoral Neck</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider transition-colors max-w-[240px]">Garden Stages, Pauwels Classification & Management Logic</p>
              <div className="mt-10 flex items-center gap-2 text-red-600 text-[10px] font-black uppercase tracking-widest">
                Access Clinical Guide <ChevronRight size={14} />
              </div>
            </button>

            <button 
              onClick={() => setActiveTopic("intertrochanteric")}
              className="group flex flex-col p-10 bg-white border border-slate-200 rounded-[3rem] text-left hover:shadow-2xl hover:border-orange-500 transition-all"
            >
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Zap size={36} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-3 transition-colors">Intertrochanteric</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider transition-colors max-w-[240px]">Evans Stability, AO/OTA Triage & IMN vs SHS Logic</p>
              <div className="mt-10 flex items-center gap-2 text-orange-600 text-[10px] font-black uppercase tracking-widest">
                Access Clinical Guide <ChevronRight size={14} />
              </div>
            </button>

            <button 
              onClick={() => setActiveTopic("subtrochanteric")}
              className="group flex flex-col p-10 bg-white border border-slate-200 rounded-[3rem] text-left hover:shadow-2xl hover:border-indigo-500 transition-all"
            >
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Scaling size={36} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-3 transition-colors">Subtrochanteric</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider transition-colors max-w-[240px]">Deforming forces, Seinsheimer class & cephalomedullary entry</p>
              <div className="mt-10 flex items-center gap-2 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
                Access Clinical Guide <ChevronRight size={14} />
              </div>
            </button>

            <button 
              onClick={() => setActiveTopic("femoral_shaft")}
              className="group flex flex-col p-10 bg-white border border-slate-200 rounded-[3rem] text-left hover:shadow-2xl hover:border-emerald-500 transition-all"
            >
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Activity size={36} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-3 transition-colors">Diaphyseal Fractures</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider transition-colors max-w-[240px]">Winquist class, DCO vs ETC & antegrade entry points</p>
              <div className="mt-10 flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                Access Clinical Guide <ChevronRight size={14} />
              </div>
            </button>

            <button 
              onClick={() => setActiveTopic("distal_femur")}
              className="group flex flex-col p-10 bg-white border border-slate-200 rounded-[3rem] text-left hover:shadow-2xl hover:border-violet-500 transition-all"
            >
              <div className="w-16 h-16 bg-violet-100 text-violet-600 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                <Bone size={36} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-3 transition-colors">Distal Femur</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider transition-colors max-w-[240px]">AO/OTA 33-class, Hoffa fractures & retrograde IMN</p>
              <div className="mt-10 flex items-center gap-2 text-violet-600 text-[10px] font-black uppercase tracking-widest">
                Access Clinical Guide <ChevronRight size={14} />
              </div>
            </button>

            <button 
              onClick={() => setActiveTopic("pelvic_ring")}
              className="group flex flex-col p-10 bg-white border border-slate-200 rounded-[3rem] text-left hover:shadow-2xl hover:border-indigo-600 transition-all"
            >
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <ShieldAlert size={36} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-3 transition-colors">Pelvic Ring</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider transition-colors max-w-[240px]">Young-Burgess Logic, Hemorrhage Control & Surgical Fixation</p>
              <div className="mt-10 flex items-center gap-2 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
                Access Clinical Guide <ChevronRight size={14} />
              </div>
            </button>

            {/* Placeholder for more trauma topics */}
            <div className="flex flex-col p-10 bg-slate-50 border border-dashed border-slate-200 rounded-[3rem] opacity-60">
              <div className="w-16 h-16 bg-slate-200 text-slate-400 rounded-3xl flex items-center justify-center mb-8">
                <BookOpen size={36} />
              </div>
              <h3 className="text-xl font-black text-slate-400 uppercase italic tracking-tighter mb-3">Next: Tibial Shaft</h3>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Coming soon to your revision guide</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default TraumaRevision;
