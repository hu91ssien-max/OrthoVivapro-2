import React, { useState, useMemo, useEffect } from 'react';
import { 
  User, 
  Stethoscope, 
  Eye, 
  Hand, 
  Move, 
  ShieldAlert, 
  AlertCircle, 
  ClipboardCheck, 
  Info, 
  Zap, 
  ArrowRight,
  Target,
  FlaskConical,
  Activity,
  Layers,
  CheckCircle2,
  Timer,
  Search,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';

const OSCE_STEPS = [
  { id: 'intro', label: 'Preparation', icon: User },
  { id: 'look', label: 'Look', icon: Eye },
  { id: 'feel', label: 'Feel', icon: Hand },
  { id: 'move', label: 'Move', icon: Move },
  { id: 'systemic', label: 'Systemic', icon: Activity },
  { id: 'viva', label: 'Viva Prep', icon: MessageSquare }
];

const EXAM_CHECKLIST = {
  look: [
    { id: 'site', label: 'Site & Size', find: "Accurate dimensions", desc: "Use a tape measure. Note the exact anatomical location." },
    { id: 'skin', label: 'Skin Changes', find: "Dilated veins / Scars", desc: "Look for previous biopsy scars or 'sentinel' veins indicating high vascularity." },
    { id: 'shape', label: 'Shape/Surface', find: "Contour & Edges", desc: "Are the borders well-defined or blending into tissues?" }
  ],
  feel: [
    { id: 'depth', label: 'Depth/Fixity', find: "Fixed vs Mobile", desc: "Test mobility in two planes. Check if it becomes fixed when muscle contracts." },
    { id: 'consistency', label: 'Consistency', find: "Hard / Firm / Cystic", desc: "Malignant bone tumours are typically 'bone-hard'. Soft tissue sarcomas are 'firm/rubbery'." },
    { id: 'pulse', label: 'Vascularity', find: "Pulsatility / Bruit", desc: "Metastatic Renal Cell and Thyroid cancer are famously pulsatile." },
    { id: 'warmth', label: 'Temperature', find: "Local Warmth", desc: "Indicates high metabolic activity (Osteosarcoma or Ewing's) or infection." }
  ],
  move: [
    { id: 'joint', label: 'Joint Range', find: "Mechanical Block", desc: "Does the tumour prevent full joint excursion? (Common in GCT or Myositis)." },
    { id: 'neuro', label: 'Neuro-Vascular', find: "Distal Deficit", desc: "Check pulses and nerve function distal to the lesion (compartment compression)." }
  ],
  systemic: [
    { id: 'lymph', label: 'Lymph Nodes', find: "Regional Nodes", desc: "Crucial for Synovial Sarcoma, Epithelioid Sarcoma, and Clear Cell Sarcoma." },
    { id: 'primary', label: 'Primary Search', find: "PB-KTL Screen", desc: "Check Thyroid, Breast, Chest, and Abdomen (Prostate/Kidney) for a primary." }
  ]
};

const STAGING_CARDS = [
  { s: "IA", g: "Low Grade (G1)", t: "Intracompartmental (T1)", m: "M0" },
  { s: "IB", g: "Low Grade (G1)", t: "Extracompartmental (T2)", m: "M0" },
  { s: "IIA", g: "High Grade (G2)", t: "Intracompartmental (T1)", m: "M0" },
  { s: "IIB", g: "High Grade (G2)", t: "Extracompartmental (T2)", m: "M0" },
  { s: "III", g: "Any Grade", t: "Any Anatomy", m: "M1 (Metastatic)" }
];

interface OncologyOSCEProps {
  onBack: () => void;
}

const OncologyOSCE = ({ onBack }: OncologyOSCEProps) => {
  const [activeStep, setActiveStep] = useState('intro');
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [timer, setTimer] = useState(360); // 6 minute OSCE station
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const toggleItem = (id: string) => {
    setCheckedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const IconComponent = useMemo(() => {
    const step = OSCE_STEPS.find(s => s.id === activeStep);
    return step ? step.icon : User;
  }, [activeStep]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar for OSCE Phases */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-slate-950 text-white hidden lg:flex flex-col border-r border-white/5 shadow-2xl">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-red-600 rounded-xl shadow-lg">
              <Target size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">OSCE Master</span>
          </div>
          
          <nav className="space-y-2">
            {OSCE_STEPS.map((step) => {
              const StepIcon = step.icon;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeStep === step.id ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
                >
                  <StepIcon size={18} />
                  {step.label}
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="mt-auto p-6">
          <button 
                onClick={onBack}
                className="mb-4 w-full py-3 bg-red-600/10 hover:bg-red-600/20 text-red-400 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={14} /> Back
          </button>
          <div className={`p-5 rounded-2xl border ${timer < 60 ? 'bg-red-900 border-red-500 animate-pulse' : 'bg-slate-900 border-slate-800'}`}>
            <div className="flex items-center justify-between mb-2">
               <Timer size={16} className="text-red-400" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Station Timer</span>
            </div>
            <div className="text-3xl font-black text-center tabular-nums">
              {formatTime(timer)}
            </div>
            <button 
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="w-full mt-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-black uppercase transition-colors"
            >
              {isTimerRunning ? 'Pause' : 'Start Station'}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Examination Area */}
      <main className="flex-1 lg:ml-64 flex flex-col h-screen overflow-y-auto bg-slate-50 relative no-scrollbar">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
             <button onClick={onBack} className="lg:hidden text-slate-500"><ArrowLeft size={20} /></button>
             <div>
               <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Oncology OSCE Station Protocol</h2>
               <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Clinical Examination of a Mass</h1>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 max-w-5xl mx-auto w-full">
          
          {/* STEP: Intro */}
          {activeStep === 'intro' && (
            <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6">
               <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                  <h3 className="text-2xl font-black mb-6">Candidate Instructions</h3>
                  <div className="p-6 bg-slate-900 text-white rounded-[2rem] italic leading-relaxed shadow-xl mb-8">
                    "This patient presents with a swelling in the distal thigh. Please perform a focused clinical examination, state your findings, and provide a differential diagnosis and management plan."
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                     <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
                        <h4 className="text-[10px] font-black text-blue-600 uppercase mb-2">1. Introduction</h4>
                        <p className="text-xs font-medium text-blue-900">Introduce self, confirm patient ID, and obtain consent.</p>
                     </div>
                     <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <h4 className="text-[10px] font-black text-emerald-600 uppercase mb-2">2. Exposure</h4>
                        <p className="text-xs font-medium text-emerald-900">Adequate exposure: Must see the joint above and below.</p>
                     </div>
                     <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100">
                        <h4 className="text-[10px] font-black text-amber-600 uppercase mb-2">3. Pain Screen</h4>
                        <p className="text-xs font-medium text-amber-900">Always ask if the patient is in pain currently.</p>
                     </div>
                  </div>
               </div>
               <button onClick={() => setActiveStep('look')} className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3">
                  Start Examination Phase <ArrowRight size={20} />
               </button>
            </div>
          )}

          {/* EXAMINATION PHASES (LOOK, FEEL, MOVE, SYSTEMIC) */}
          {['look', 'feel', 'move', 'systemic'].includes(activeStep) && (
            <div className="animate-in slide-in-from-right-4 duration-500 space-y-8">
               <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="flex items-center gap-6 mb-10 relative z-10">
                     <div className="p-5 bg-red-50 text-red-600 rounded-3xl shadow-inner">
                        <IconComponent size={32} />
                     </div>
                     <div>
                        <h3 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">{activeStep} Sequence</h3>
                        <p className="text-red-600 font-bold uppercase text-[10px] tracking-widest italic">OSCE Component Checklist</p>
                     </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 relative z-10">
                     {EXAM_CHECKLIST[activeStep as keyof typeof EXAM_CHECKLIST].map((item) => (
                       <button
                         key={item.id}
                         onClick={() => toggleItem(item.id)}
                         className={`p-6 rounded-3xl border-2 text-left transition-all group ${checkedItems.includes(item.id) ? 'bg-slate-900 border-slate-900 text-white shadow-xl' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}
                       >
                         <div className="flex justify-between items-center mb-2">
                           <span className={`text-[10px] font-black uppercase tracking-widest ${checkedItems.includes(item.id) ? 'text-red-400' : 'text-slate-400'}`}>{item.label}</span>
                           {checkedItems.includes(item.id) && <CheckCircle2 size={16} className="text-emerald-400" />}
                         </div>
                         <h4 className="font-bold text-lg mb-2">{item.find}</h4>
                         <p className={`text-xs leading-relaxed ${checkedItems.includes(item.id) ? 'text-slate-400' : 'text-slate-500'}`}>
                           {item.desc}
                         </p>
                       </button>
                     ))}
                  </div>
                  <Search className="absolute bottom-[-40px] right-[-40px] text-slate-50" size={300} />
               </div>

               {/* Apley Pearl for current phase */}
               <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl flex items-start gap-4">
                  <div className="p-2 bg-amber-100 text-amber-600 rounded-xl"><Zap size={20} /></div>
                  <div>
                    <h5 className="text-[10px] font-black text-amber-800 uppercase mb-1">Viva Pro-Tip</h5>
                    <p className="text-xs text-amber-900 font-medium italic">
                       {activeStep === 'look' && "Mentioning sentinel veins suggests you understand tumour angiogenesis."}
                       {activeStep === 'feel' && "Always palpate regional lymph nodes and check for a 'pseudocapsule' by feeling mobility."}
                       {activeStep === 'move' && "Specify if a block is intra-articular or extra-articular tethering."}
                       {activeStep === 'systemic' && "Over age 50, top differential is Metastasis/Myeloma. Must check PB-KTL sites."}
                    </p>
                  </div>
               </div>
            </div>
          )}

          {/* VIVA PREP / SUMMARY */}
          {activeStep === 'viva' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-8 pb-20">
               <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
                  <h3 className="text-2xl font-black mb-8 flex items-center gap-3"><Layers className="text-red-600" /> Staging Reasoning</h3>
                  <div className="grid grid-cols-4 gap-4 text-center font-black text-[10px] uppercase text-slate-400 border-b pb-4 mb-4">
                     <div>Stage</div><div>Grade</div><div>Site</div><div>Meta</div>
                  </div>
                  <div className="space-y-2">
                     {STAGING_CARDS.map((card, i) => (
                       <div key={i} className="grid grid-cols-4 gap-4 text-center py-4 bg-slate-50 rounded-2xl hover:bg-red-50 transition-colors items-center">
                          <div className="font-black text-red-600">{card.s}</div>
                          <div className="text-xs font-bold text-slate-600">{card.g}</div>
                          <div className="text-xs font-bold text-slate-600">{card.t}</div>
                          <div className="text-xs font-black text-red-500">{card.m}</div>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                     <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-red-400">Biopsy Commandments</h3>
                     <ul className="space-y-4 relative z-10 text-xs font-bold">
                        {[
                          "Regional specialist center only.",
                          "Longitudinal incision on final resection line.",
                          "Resectable tract path.",
                          "Zero healthy compartment contamination.",
                          "Meticulous haemostasis."
                        ].map((rule, i) => (
                          <li key={i} className="flex gap-4">
                             <span className="text-red-500">{i+1}.</span> {rule}
                          </li>
                        ))}
                     </ul>
                  </div>

                  <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                     <h3 className="text-xl font-black mb-4 flex items-center gap-3 text-indigo-600">Common Viva Qs</h3>
                     <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-2xl">
                           <h5 className="text-[10px] font-black text-indigo-600 uppercase mb-1">Q: Lipoma vs. Sarcoma?</h5>
                           <p className="text-[11px] text-slate-500 italic">
                             {"Size > 5cm, deep to fascia, and rapid growth are red flags for sarcoma."}
                           </p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl">
                           <h5 className="text-[10px] font-black text-indigo-600 uppercase mb-1">Q: Biopsy Scar Importance?</h5>
                           <p className="text-[11px] text-slate-500 italic">
                             {"Entire scar and tract is contaminated; must be resected en-bloc."}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

        </div>

        <footer className="mt-auto px-10 py-8 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white">
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-red-600"></div> Exam Finding</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-amber-500"></div> Viva Pearl</div>
           <div className="flex items-center gap-2 text-slate-800">
              Progress: {Math.round((checkedItems.length / 13) * 100)}%
           </div>
        </footer>
      </main>
    </div>
  );
};

export default OncologyOSCE;
