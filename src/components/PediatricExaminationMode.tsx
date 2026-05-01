import React, { useState } from 'react';
import { 
  Stethoscope, 
  Zap, 
  ShieldCheck, 
  AlertCircle, 
  HelpCircle,
  ChevronRight,
  Target,
  Brain,
  MessageCircle,
  Activity,
  ShieldAlert,
  Flame,
  Scale,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PediatricExaminationModeProps {
  onBack: () => void;
}

const PediatricExaminationMode: React.FC<PediatricExaminationModeProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('standard');
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [vivaOpen, setVivaOpen] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const standardCases = [
    {
      id: 1,
      title: "The 5-Year-Old",
      subtitle: "Walking with 'feet turning in'",
      age: "5 Years",
      diagnosis: "Femoral Anteversion",
      keyFindings: ["In-toeing gait", "W-sitting habit", "↑ Internal Hip Rotation", "↓ External Hip Rotation", "Normal Tibial Torsion"],
      script: "This is most likely due to femoral anteversion, common at this age. I would confirm by finding increased hip internal rotation and reduced external rotation. It peaks between 4–6 years and usually resolves by 8–10 years. Management is reassurance; shoes/braces are not effective.",
      trap: "Would you treat this? Correct: No, reassurance only. Surgery is very rarely indicated and only after age 8–10."
    },
    {
      id: 2,
      title: "The Toddler",
      subtitle: "In-toeing since starting to walk",
      age: "2 Years",
      diagnosis: "Internal Tibial Torsion",
      keyFindings: ["Most common toddler cause", "Negative (Internal) Thigh-Foot Angle", "Neutral hip rotation", "Symmetrical presentation"],
      script: "The most likely diagnosis is internal tibial torsion. I would expect a negative thigh-foot angle on prone examination. This usually resolves spontaneously by age 4. Management consists of parent education and reassurance.",
      trap: "Do night splints help? Correct: No evidence they change the natural history; observation is the gold standard."
    },
    {
      id: 3,
      title: "The Infant",
      subtitle: "Curved-looking feet",
      age: "6 Months",
      diagnosis: "Metatarsus Adductus",
      keyFindings: ["Forefoot adduction", "'C-shaped' lateral foot border", "Check if flexible or rigid", "Heel bisector line is abnormal"],
      script: "This is metatarsus adductus. I would assess if the foot is flexible (correctable to neutral) or rigid. Flexible cases require reassurance and stretching; rigid cases may require serial casting.",
      trap: "Key differentiator? Correct: Flexibility. Rigid cases need active management (casting), not just reassurance."
    }
  ];

  const advancedCases = [
    {
      id: "A",
      title: "Mixed Deformity",
      subtitle: "Complex in-toeing",
      age: "6 Years",
      diagnosis: "Combined Femoral Anteversion & Internal Tibial Torsion",
      keyFindings: ["↑ Internal Hip Rotation", "↓ External Hip Rotation", "Internal (Negative) TFA", "Symmetrical"],
      script: "This represents combined femoral anteversion and internal tibial torsion. Both levels of rotation are contributing to the in-toeing gait. As both are physiological variants, management is still reassurance.",
      trap: "Surgical indication? Correct: They want to see you don’t overcall surgery. Reassurance is still appropriate here."
    },
    {
      id: "B",
      title: "Suspected Neurological",
      subtitle: "Frequent falls & in-toeing",
      age: "7 Years",
      diagnosis: "Cerebral Palsy / Neurological Cause",
      keyFindings: ["Asymmetrical presentation", "Increased muscle tone", "Delayed milestones", "Persistent 'Scissor' gait"],
      script: "The presentation of asymmetry, increased tone, and frequent falls suggests a neurological cause like Cerebral Palsy rather than physiological torsion. I would perform a full neurological assessment and refer to pediatrics.",
      trap: "Red Flag Rule: NEVER reassure blindly if neurological signs, asymmetry, or pain are present."
    },
    {
      id: "C",
      title: "Out-toeing Curveball",
      subtitle: "Older child with 'duck walk'",
      age: "10 Years",
      diagnosis: "External Tibial Torsion",
      keyFindings: ["Significant External TFA", "Normal hip rotation profile", "Stable but persistent", "Progressive out-toeing"],
      script: "This is external tibial torsion. Unlike in-toeing, this is less likely to resolve spontaneously and may persist. It is important to differentiate this from femoral retroversion.",
      trap: "Prognosis? Correct: This is less likely to improve with growth compared to internal torsion."
    },
    {
      id: "D",
      title: "MA vs Clubfoot",
      subtitle: "Differential Diagnosis",
      age: "Newborn",
      diagnosis: "Clubfoot (Talipes Equinovarus)",
      keyFindings: ["Rigid deformity", "Hindfoot Equinus (cannot dorsiflex)", "Hindfoot Varus", "Not correctable to neutral"],
      script: "This is clubfoot, which must be distinguished from flexible metatarsus adductus. Clubfoot is a rigid deformity involving the hindfoot (equinus/varus). It requires early Ponseti casting, not reassurance.",
      trap: "Management diff? Correct: MA (Flexible) = Reassurance; Clubfoot = Early serial casting (Ponseti method)."
    }
  ];

  const vivaQuestions = [
    { q: "What are the 3 main causes of in-toeing?", a: "Femoral anteversion, Internal tibial torsion, Metatarsus adductus." },
    { q: "What is the normal Thigh-Foot Angle (TFA)?", a: "Approximately 10 degrees of external rotation." },
    { q: "Define normal hip rotation values.", a: "Internal: 60-70°, External: 30-40°." },
    { q: "When do you worry? (Red Flags)", a: "Asymmetry, Pain, Limp, or Neurological signs." },
    { q: "Golden Clinical Reasoning Line?", a: "Age + Symmetry + Rotation Level (Hip/Tibia/Foot) determines diagnosis." }
  ];

  const currentCases = activeTab === 'standard' ? standardCases : advancedCases;
  const currentCase = currentCases[activeCaseIdx] || currentCases[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 text-white rounded-xl">
                <Stethoscope size={20} />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tighter text-slate-800 uppercase italic">OSCE Master</h1>
                <div className="flex items-center gap-1">
                  <Target size={10} className="text-indigo-500" />
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Pediatric Rotational Profile Simulator</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            {[
              { label: 'HIP IR', value: '70°' },
              { label: 'HIP ER', value: '40°' },
              { label: 'TFA EXT', value: '10°' }
            ].map((stat, i) => (
              <React.Fragment key={i}>
                <div className="text-center">
                  <div className="text-sm font-black text-indigo-600 uppercase italic">{stat.value}</div>
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
                {i < 2 && <div className="h-6 w-px bg-slate-100" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-8 space-y-6">
          {/* Module Toggles */}
          <div className="flex gap-4 p-1 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <button 
              onClick={() => {setActiveTab('standard'); setActiveCaseIdx(0); setShowAnswer(false);}}
              className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'standard' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              Standard Cases
            </button>
            <button 
              onClick={() => {setActiveTab('advanced'); setActiveCaseIdx(0); setShowAnswer(false);}}
              className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'advanced' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              Advanced Mastery <Flame size={14} className={activeTab === 'advanced' ? 'text-orange-400' : 'text-slate-300'} />
            </button>
          </div>

          {/* Case Selection Bar */}
          <div className="flex bg-white p-2 rounded-2xl border border-slate-200 shadow-sm gap-2 overflow-x-auto custom-scrollbar">
            {currentCases.map((c, idx) => (
              <button 
                key={c.id}
                onClick={() => {setActiveCaseIdx(idx); setShowAnswer(false);}}
                className={`min-w-[100px] flex-1 flex flex-col items-center py-3 rounded-xl transition-all border ${activeCaseIdx === idx ? (activeTab === 'standard' ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-inner' : 'bg-slate-100 border-slate-300 text-slate-800 shadow-inner') : 'border-transparent text-slate-400 hover:bg-slate-50'}`}
              >
                <span className="text-[10px] font-black uppercase tracking-tighter italic">Case {c.id}</span>
                <span className="text-xs font-black uppercase tracking-widest">{c.age}</span>
              </button>
            ))}
          </div>

          <motion.div 
            key={`${activeTab}-${activeCaseIdx}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter leading-none mb-2">
                  {currentCase.title}
                </h2>
                <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">{currentCase.subtitle}</p>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${activeTab === 'standard' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                {activeTab === 'standard' ? 'OSCE Protocol' : 'Clinical Specialization'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <Zap size={14} className="text-yellow-500" /> Clinical Assessment
                  </h4>
                  <ul className="space-y-3">
                    {currentCase.keyFindings.map((f, i) => (
                      <li key={i} className="text-xs font-bold text-slate-700 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={`p-6 rounded-2xl border-l-4 ${activeTab === 'standard' ? 'bg-red-50 border-red-500 shadow-red-50' : 'bg-orange-50 border-orange-500 shadow-orange-50'} shadow-md`}>
                  <h4 className={`text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2 ${activeTab === 'standard' ? 'text-red-600' : 'text-orange-700'}`}>
                    <AlertCircle size={14} /> Critical Warning
                  </h4>
                  <p className={`text-xs font-bold leading-relaxed italic ${activeTab === 'standard' ? 'text-red-900' : 'text-orange-900'}`}>
                    {currentCase.trap}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <MessageCircle size={14} className="text-indigo-500" /> Performance Script
                </h4>
                <div className="bg-slate-900 text-indigo-100 p-8 rounded-[2rem] leading-relaxed font-bold text-sm italic relative shadow-xl shadow-slate-200">
                  <div className="absolute top-4 right-6 text-[10px] font-black opacity-30 text-white tracking-widest uppercase italic">The Model Answer</div>
                  "{currentCase.script}"
                </div>
                <div className="flex flex-col gap-4">
                  <div className={`p-4 rounded-2xl border-2 transition-all duration-500 flex items-center justify-between ${showAnswer ? 'bg-emerald-50 border-emerald-500' : 'bg-white border-slate-100 border-dashed'}`}>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Final Diagnosis</div>
                      <div className={`text-sm font-black uppercase italic tracking-tight ${showAnswer ? 'text-emerald-700' : 'text-slate-200 select-none blur-sm'}`}>
                        {currentCase.diagnosis}
                      </div>
                    </div>
                    <ShieldCheck size={24} className={showAnswer ? 'text-emerald-500' : 'text-slate-100'} />
                  </div>
                  <button 
                    onClick={() => setShowAnswer(!showAnswer)}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-lg active:scale-95"
                  >
                    {showAnswer ? "Hide Diagnosis" : "Reveal Validated Diagnosis"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Red Flag Override Banner */}
          <div className="bg-rose-600 text-white p-8 rounded-3xl shadow-xl flex items-center gap-8 border-b-4 border-rose-800 relative overflow-hidden group">
             <ShieldAlert size={48} className="text-white/40 shrink-0 relative z-10" />
             <div className="relative z-10">
                <h3 className="text-xl font-black uppercase italic tracking-tighter leading-none mb-2">The Pathology Invariant</h3>
                <p className="text-xs font-bold text-rose-50 leading-relaxed max-w-lg">
                  If there is <span className="underline decoration-2">Asymmetry, Pain, or any Neurological sign</span>, the logic branch ends. It is NO LONGER physiological. Investigation is mandatory.
                </p>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <h3 className="text-lg font-black mb-6 flex items-center gap-3 uppercase italic tracking-tighter">
              <Brain className="text-amber-400" /> Rapid Viva Hub
            </h3>
            <div className="space-y-4 relative z-10">
              {vivaQuestions.map((v, idx) => (
                <div key={idx} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                  <button 
                    onClick={() => setVivaOpen(vivaOpen === idx ? null : idx)}
                    className="w-full text-left p-4 flex justify-between items-center group hover:bg-white/5 transition-colors"
                  >
                    <span className="text-[11px] font-black uppercase tracking-tight opacity-70 group-hover:opacity-100 transition-opacity leading-tight">{v.q}</span>
                    <HelpCircle size={16} className={`shrink-0 transition-transform duration-300 ${vivaOpen === idx ? 'rotate-180 text-amber-400' : 'text-slate-600'}`} />
                  </button>
                  <AnimatePresence>
                    {vivaOpen === idx && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4 text-xs font-bold text-indigo-300 italic border-t border-white/5 pt-3 leading-relaxed"
                      >
                        {v.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-black text-slate-800 text-[10px] uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <Scale size={16} className="text-indigo-500" /> Clinical Pearls
            </h3>
            
            <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-100/50">
              <div className="text-[9px] font-black text-indigo-600 mb-2 uppercase tracking-widest italic">Diagnosis Rule</div>
              <p className="text-xs text-indigo-900 font-bold leading-relaxed italic">"Age + Symmetry + Rotation level determines diagnosis."</p>
            </div>
            
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-[9px] font-black text-slate-500 mb-2 uppercase tracking-widest">Growth Note</div>
              <p className="text-xs text-slate-700 font-bold leading-relaxed italic">External Tibial Torsion is more likely to persist than internal variants.</p>
            </div>

            <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-200/50 flex gap-4">
               <Activity size={24} className="text-amber-600 shrink-0" />
               <div>
                  <div className="text-[9px] font-black text-amber-800 uppercase tracking-widest mb-1 italic">Pro Tip</div>
                  <p className="text-[10px] text-amber-900 font-bold leading-relaxed">Positioning the child <span className="font-black italic underline">PRONE</span> is the most heavily weighted marker of clinical competence in this station.</p>
               </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Institutional Examination Mode: Rotational Profile v1.2</span>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full text-white text-[10px] font-black uppercase tracking-widest italic">
          <ChevronRight size={14} className="text-indigo-400" /> Simulated Clinical Environment
        </div>
      </footer>
    </div>
  );
};

export default PediatricExaminationMode;
