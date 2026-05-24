import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Zap, 
  Brain,
  ChevronRight,
  Activity,
  RotateCcw,
  Stethoscope,
  Layers,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from "motion/react";
import FootDeformityDashboard from './FootDeformityDashboard';
import PediatricExaminationMode from './PediatricExaminationMode';
import QuestionBank from './QuestionBank';

interface PediatricStudyHubProps {
  onBack: () => void;
  initialTopic?: string | null;
}

type StudySection = 'home' | 'foot' | 'simulator' | 'mcq';

const PediatricStudyHub = ({ onBack, initialTopic }: PediatricStudyHubProps) => {
  const [activeSection, setActiveSection] = useState<StudySection>(
    initialTopic === 'footDeformity' ? 'foot' :
    initialTopic === 'simulator' ? 'simulator' : 
    'home'
  );

  if (activeSection === 'foot') {
    return <FootDeformityDashboard onBack={() => setActiveSection('home')} />;
  }

  if (activeSection === 'simulator') {
    return <PediatricExaminationMode onBack={() => setActiveSection('home')} />;
  }

  if (activeSection === 'mcq') {
    return <QuestionBank category="pediatric" studyMode={true} onBack={() => setActiveSection('home')} />;
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
              <h1 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Pediatric Study Hub</h1>
              <p className="text-[10px] text-rose-600 font-black uppercase tracking-widest">Comparative & Interactive Path</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-rose-50 rounded-lg border border-rose-100">
            <Zap size={14} className="text-rose-600" />
            <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Study Mode</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="mb-12">
           <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-2">Deep Dive <span className="text-rose-600">Modules</span></h2>
           <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Select an interactive simulator or comparative dashboard</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Foot Deformity Comparison */}
          <motion.button
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => setActiveSection('foot')}
            className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-rose-500 transition-all text-left flex flex-col group relative overflow-hidden h-full"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 -mr-8 -mt-8">
              <RotateCcw size={160} className="text-rose-600" />
            </div>
            <div className="p-4 bg-rose-50 rounded-2xl w-fit mb-6 text-rose-600 group-hover:scale-110 transition-transform">
              <RotateCcw size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter mb-2">Foot Comparison</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose mb-8">
              Interactive analytics: Clubfoot (TEV) vs Vertical Talus (CVT). Morphological profiles & radiographic markers.
            </p>
            <div className="mt-auto flex items-center gap-2 text-rose-600 font-black uppercase text-[10px] tracking-[0.2em]">
              Open Analytics <ChevronRight size={14} />
            </div>
          </motion.button>

          {/* Rotational Profile Simulator */}
          <motion.button
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => setActiveSection('simulator')}
            className="p-8 bg-slate-900 text-white rounded-[2.5rem] shadow-xl hover:shadow-indigo-900/20 transition-all text-left flex flex-col group relative overflow-hidden h-full"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 -mr-8 -mt-8">
              <Stethoscope size={160} className="text-indigo-400" />
            </div>
            <div className="p-4 bg-indigo-600 rounded-2xl w-fit mb-6 text-white group-hover:scale-110 transition-transform shadow-lg shadow-indigo-600/20">
              <Stethoscope size={32} />
            </div>
            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">OSCE Simulator</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose mb-8">
              Rotational Profile Masterclass: In-toeing & Out-toeing cases with performance scripts.
            </p>
            <div className="mt-auto flex items-center gap-2 text-indigo-400 font-black uppercase text-[10px] tracking-[0.2em]">
              Launch OSCE <ChevronRight size={14} />
            </div>
          </motion.button>

          {/* Question Bank */}
          <motion.button
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => setActiveSection('mcq')}
            className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-blue-500 transition-all text-left flex flex-col group relative overflow-hidden h-full"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 -mr-8 -mt-8">
              <Brain size={160} className="text-blue-600" />
            </div>
            <div className="p-4 bg-blue-50 rounded-2xl w-fit mb-6 text-blue-600 group-hover:scale-110 transition-transform">
              <BookOpen size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter mb-2">Pediatric MCQs</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose mb-8">
              Study mode questions with immediate rationales for all pediatric specialties.
            </p>
            <div className="mt-auto flex items-center gap-2 text-blue-600 font-black uppercase text-[10px] tracking-[0.2em]">
              Enter Repository <ChevronRight size={14} />
            </div>
          </motion.button>
        </motion.div>

        {/* Dashboard insights */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-white p-8 rounded-[2rem] border border-slate-100 border-l-4 border-l-rose-600">
              <div className="flex items-center gap-2 mb-4">
                <Activity size={16} className="text-rose-600" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Study Insight</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-bold italic">
                "Differentiating TEV from CVT is a common examiner trap. Focus on the rigidity and the radiographic 'Forced Plantarflexion' view which is the single most important diagnostic feature."
              </p>
           </div>
           
           <div className="bg-white p-8 rounded-[2rem] border border-slate-100 border-l-4 border-l-indigo-600">
              <div className="flex items-center gap-2 mb-4">
                <Layers size={16} className="text-indigo-600" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Clinical Logic</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-bold italic">
                "OSCE mastery requires learning the correct sequence of examination. Always start with the child's gait before performing prone rotational profile measurements."
              </p>
           </div>
        </div>
      </main>
    </div>
  );
};

export default PediatricStudyHub;
