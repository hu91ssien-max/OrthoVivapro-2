import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { 
  Stethoscope, 
  HandMetal, 
  AlertCircle, 
  CheckCircle, 
  Timer, 
  Activity, 
  Zap, 
  UserCircle,
  ClipboardList,
  AlertTriangle,
  Wind,
  ArrowLeft,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import OsteoarthritisAtlas from './OsteoarthritisAtlas';
import OsteomyelitisHub from './OsteomyelitisHub';

interface BasicScienceRevisionProps {
  onBack: () => void;
  view?: 'revision' | 'mcq' | 'study';
}

const BasicScienceRevision = ({ onBack, view = 'revision' }: BasicScienceRevisionProps) => {
  const [activeMainTab, setActiveMainTab] = useState<'tourniquet' | 'oa'>(view === 'mcq' ? 'tourniquet' : 'oa');
  
  // Update tab if view changes
  useEffect(() => {
    if (view === 'mcq') setActiveMainTab('tourniquet');
    else if (view === 'revision') setActiveMainTab('oa');
  }, [view]);

  // Tourniquet State
  const [systolicBP, setSystolicBP] = useState(120);
  const [limbType, setLimbType] = useState('upper');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showTips, setShowTips] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(120 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Opening & Safety",
      icon: <UserCircle className="text-blue-500" />,
      items: [
        "Wash hands and introduce self",
        "Confirm patient identity",
        "Explain procedure: 'Reduce bleeding/improve surgical field'",
        "Check consent",
        "Screen: PVD, Sickle Cell, Nerve injury, Pain intolerance"
      ]
    },
    {
      id: 2,
      title: "Indications & Contraindications",
      icon: <ClipboardList className="text-purple-500" />,
      items: [
        "Mention Indications: Bloodless field, reduce loss, visualization",
        "Mention Contraindications: Severe PVD, Infection at site, Sickle Cell, Poor skin/burns"
      ]
    },
    {
      id: 3,
      title: "Equipment & Prep",
      icon: <Activity className="text-orange-500" />,
      items: [
        "Select correct Cuff, Padding, Monitor, and Timer",
        "Elevate limb for 2-3 minutes",
        "Optional: Exsanguinate with Esmarch bandage",
        "Apply even, wrinkle-free padding layer"
      ]
    },
    {
      id: 4,
      title: "Application & Pressure",
      icon: <Zap className="text-yellow-500" />,
      items: [
        "Apply cuff to proximal limb (Upper arm/Thigh)",
        "Ensure correct size and snug fit",
        "Calculate and set pressure",
        "Inflate and confirm loss of distal pulse",
        "Announce clearly: 'Tourniquet time started'"
      ]
    },
    {
      id: 5,
      title: "Monitoring & Deflation",
      icon: <Timer className="text-red-500" />,
      items: [
        "Monitor for < 2 hours",
        "Breather protocol: 10-15 mins if time exceeded",
        "Warn team before deflation",
        "Monitor systemic response (BP drop, Acidosis, ↑K+)"
      ]
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => setTimeRemaining(prev => prev - 1), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeRemaining]);

  const toggleStep = (stepIdx: number, itemIdx: number) => {
    const key = `${stepIdx}-${itemIdx}`;
    setCompletedSteps(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const calculateTargetPressure = () => {
    if (limbType === 'upper') return `${systolicBP + 50} - ${systolicBP + 100} mmHg`;
    return `${systolicBP + 100} - ${systolicBP + 150} mmHg`;
  };

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}h ${m}m ${sec}s`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-slate-50 min-h-screen font-sans pb-20">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white rounded-xl text-slate-600 transition-all shadow-sm border border-slate-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Basic Science Center</div>
            <h2 className="text-sm font-black text-indigo-600 uppercase tracking-widest">
              {view === 'revision' ? 'Revision Guide' : view === 'mcq' ? 'Examination Mode' : 'Study Hub'}
            </h2>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'study' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <OsteomyelitisHub onBack={onBack} />
          </motion.div>
        ) : activeMainTab === 'oa' ? (
          <motion.div
            key="oa-module"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="w-full"
          >
            <OsteoarthritisAtlas onBack={onBack} />
          </motion.div>
        ) : (
          <motion.div
            key="tourniquet-module"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
          >
            {/* Header */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3 italic uppercase tracking-tighter">
                <Stethoscope className="text-indigo-600" />
                Tourniquet OSCE
              </h1>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Surgical Safety & Protocol Simulator</p>
            </div>
            <button 
              onClick={() => setShowTips(!showTips)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-700 transition flex items-center gap-2 shadow-xl shadow-indigo-100"
            >
              {showTips ? 'Hide Examiner Tips' : 'Show Examiner Tips'}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {steps.map((section, sIdx) => (
                <div key={section.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b flex items-center gap-3">
                    {section.icon}
                    <h3 className="font-black text-slate-700 uppercase tracking-tighter text-sm italic">{section.title}</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {section.items.map((item, iIdx) => (
                      <div 
                        key={iIdx}
                        onClick={() => toggleStep(sIdx, iIdx)}
                        className="flex items-center gap-4 cursor-pointer group"
                      >
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                          completedSteps.includes(`${sIdx}-${iIdx}`) 
                          ? 'bg-emerald-500 border-emerald-500 text-white' 
                          : 'border-slate-200 group-hover:border-indigo-400'
                        }`}>
                          {completedSteps.includes(`${sIdx}-${iIdx}`) && <CheckCircle className="w-4 h-4" />}
                        </div>
                        <span className={`text-[13px] font-bold tracking-tight ${completedSteps.includes(`${sIdx}-${iIdx}`) ? 'text-slate-300 line-through' : 'text-slate-600'}`}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <h3 className="font-black text-slate-800 mb-6 flex items-center gap-2 uppercase tracking-tighter italic text-lg">
                  <Activity className="text-indigo-500" size={20} /> Pressure
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-1">Patient SBP (mmHg)</label>
                    <input 
                      type="number" 
                      value={systolicBP} 
                      onChange={(e) => setSystolicBP(parseInt(e.target.value) || 0)}
                      className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:outline-none focus:border-indigo-500 font-black italic transition-all"
                    />
                  </div>
                  <div className="flex gap-2 p-1.5 bg-slate-50 rounded-2xl">
                    <button 
                      onClick={() => setLimbType('upper')}
                      className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${limbType === 'upper' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400'}`}
                    >
                      Upper
                    </button>
                    <button 
                      onClick={() => setLimbType('lower')}
                      className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${limbType === 'lower' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400'}`}
                    >
                      Lower
                    </button>
                  </div>
                  <div className="p-6 bg-indigo-50 rounded-3xl text-center border-2 border-indigo-100 flex flex-col items-center">
                     <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">Recommended</span>
                     <span className="text-2xl font-black text-indigo-950 italic tracking-tighter underline decoration-double decoration-indigo-200">{calculateTargetPressure()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <h3 className="font-black text-slate-800 mb-6 flex items-center gap-2 uppercase tracking-tighter italic text-lg">
                  <Timer className="text-rose-500" size={20} /> Safety
                </h3>
                <div className="text-center space-y-6">
                  <div className={`text-4xl font-black tracking-tighter ${timeRemaining < 1800 ? 'text-rose-600 animate-pulse' : 'text-slate-900'}`}>{formatTime(timeRemaining)}</div>
                  <button 
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl ${isTimerRunning ? 'bg-rose-600 text-white shadow-rose-100' : 'bg-emerald-600 text-white shadow-emerald-100'}`}
                  >
                    {isTimerRunning ? 'Stop Timer' : 'Start Tourniquet'}
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-6 border border-white/5 relative overflow-hidden">
                 <h3 className="text-lg font-black uppercase italic tracking-tighter text-indigo-400 flex items-center gap-2">
                   <AlertCircle size={18} /> High-Yield Risks
                 </h3>
                 <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest opacity-60">
                    <li className="flex gap-4"><span>01</span> <span>Nerve injury (Common)</span></li>
                    <li className="flex gap-4"><span>02</span> <span>Rhabdomyolysis risk</span></li>
                    <li className="flex gap-4"><span>03</span> <span>Compartment syndrome</span></li>
                    <li className="flex gap-4"><span>04</span> <span>Metabolic Washout</span></li>
                 </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>

      <AnimatePresence>
        {showTips && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[3rem] w-full max-w-lg p-10 relative">
               <button onClick={() => setShowTips(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-800 transition-colors cursor-pointer p-2">✕</button>
               <h2 className="text-3xl font-black text-slate-800 mb-8 uppercase italic tracking-tighter"><span className="text-indigo-600">Examiner</span> Pearls</h2>
               <div className="space-y-4">
                  {[
                    { title: "Verbalize", text: "State aloud: 'I am inflating to 250mmHg for upper limb case.'", color: "bg-indigo-50 border-indigo-600" },
                    { title: "Deflation", text: "Announce: 'Alerting anesthesia for systemic hypotension/K+ shift.'", color: "bg-emerald-50 border-emerald-600" },
                    { title: "Consent", text: "Always confirm ID and Consent first to avoid critical fails.", color: "bg-rose-50 border-rose-600" }
                  ].map(p => (
                    <div key={p.title} className={`p-6 border-l-8 rounded-r-3xl ${p.color}`}>
                       <h4 className="font-black uppercase tracking-widest text-[10px] mb-1">{p.title}</h4>
                       <p className="text-xs font-bold leading-relaxed">{p.text}</p>
                    </div>
                  ))}
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BasicScienceRevision;
