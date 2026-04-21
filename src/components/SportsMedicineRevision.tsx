import React, { useState } from 'react';
import { 
  Activity, 
  ChevronRight,
  ArrowLeft,
  BookOpen,
  Zap,
  ShieldCheck,
  Dna
} from 'lucide-react';
import { motion, AnimatePresence } from "motion/react";
import ACLInfographic from "./ACLInfographic";
import PCLInfographic from "./PCLInfographic";
import MeniscusInfographic from "./MeniscusInfographic";

interface SportsMedicineRevisionProps {
  onBack: () => void;
  onPractice: () => void;
}

const SportsMedicineRevision = ({ onBack, onPractice }: SportsMedicineRevisionProps) => {
  const [activeTopic, setActiveTopic] = useState<"menu" | "acl" | "pcl" | "meniscus">("menu");

  if (activeTopic === "acl") {
    return <ACLInfographic onBack={() => setActiveTopic("menu")} onPractice={onPractice} />;
  }

  if (activeTopic === "pcl") {
    return <PCLInfographic onBack={() => setActiveTopic("menu")} onPractice={onPractice} />;
  }

  if (activeTopic === "meniscus") {
    return <MeniscusInfographic onBack={() => setActiveTopic("menu")} onPractice={onPractice} />;
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
            className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 text-white text-xs font-black rounded-full uppercase hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
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
            Sports Medicine <span className="text-indigo-600">Revision Portal</span>
          </h2>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-10 transition-colors">Select a ligamentous summary to begin your session</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <button 
              onClick={() => setActiveTopic("acl")}
              className="group flex flex-col p-10 bg-white border border-slate-200 rounded-[3rem] text-left hover:shadow-2xl hover:border-blue-500 transition-all"
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <ShieldCheck size={36} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-3 transition-colors">ACL Injury</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider transition-colors max-w-[240px]">Anterior Cruciate Ligament: Anatomy, Tests, and Graft Options</p>
              <div className="mt-10 flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase tracking-widest">
                Access Clinical Guide <ChevronRight size={14} />
              </div>
            </button>

            <button 
              onClick={() => setActiveTopic("pcl")}
              className="group flex flex-col p-10 bg-white border border-slate-200 rounded-[3rem] text-left hover:shadow-2xl hover:border-indigo-500 transition-all"
            >
              <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Zap size={36} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-3 transition-colors">PCL Injury</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider transition-colors max-w-[240px]">Posterior Cruciate Ligament: Dashboard Injuries & Treatment</p>
              <div className="mt-10 flex items-center gap-2 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
                Access Management Guide <ChevronRight size={14} />
              </div>
            </button>

            <button 
              onClick={() => setActiveTopic("meniscus")}
              className="group flex flex-col p-10 bg-white border border-slate-200 rounded-[3rem] text-left hover:shadow-2xl hover:border-emerald-500 transition-all"
            >
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Dna size={36} className="text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-3 transition-colors">Meniscus</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider transition-colors max-w-[240px]">Vascularity Zones, McMurray Tests, and Surgical Pathways</p>
              <div className="mt-10 flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                Access Clinical Guide <ChevronRight size={14} />
              </div>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default SportsMedicineRevision;
