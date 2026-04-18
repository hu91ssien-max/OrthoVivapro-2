import { useState } from "react";
import { 
  Baby, 
  ChevronRight,
  ArrowLeft,
  BookOpen,
  Presentation,
  Activity,
  ShieldAlert,
  Clock,
  Target,
  AlertCircle,
  ClipboardList,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from "motion/react";
import CTEVRevision from "./CTEVRevision";
import DDHRevision from "./DDHRevision";

interface RevisionProps {
  onBack: () => void;
  onPractice: () => void;
}

const PediatricFemurRevision = ({ onBack }: { onBack: () => void }) => {
  const [activeAge, setActiveAge] = useState('5-11y');

  const ageGroups = {
    '< 6m': {
      title: 'Infants (< 6 Months)',
      treatment: 'Pavlik Harness',
      detail: 'Avoids sedation/anesthesia. May use early Spica casting.',
      warning: 'Excessive flexion in harness can cause Femoral Nerve Palsy (decreased quad function).',
      color: 'bg-blue-600'
    },
    '6m - 5y': {
      title: 'Toddlers (6m - 5y)',
      treatment: 'Spica Casting',
      detail: 'Hips flexed 60-90°, 30° abduction. Mold into recurvatum/valgus to counteract muscle pull.',
      warning: 'Contraindicated if shortening > 2-3cm or polytrauma.',
      color: 'bg-indigo-600'
    },
    '5-11y': {
      title: 'School Age (5 - 11y)',
      treatment: 'Flexible IM Nails',
      detail: 'Ideal for < 49kg (100 lbs). Nail size = 0.4 x isthmus width (80% canal fill).',
      warning: 'Pain at insertion site (knee) in 40% of cases. Most common complication.',
      color: 'bg-emerald-600'
    },
    '> 11y': {
      title: 'Adolescents (> 11y)',
      treatment: 'Rigid IM Nail / Plate',
      detail: 'Trochanteric or Lateral entry. Weight > 49kg makes flexible nails unstable.',
      warning: 'PIRIFORMIS ENTRY CONTRAINDICATED (Risk of Medial Femoral Circumflex a. injury & AVN).',
      color: 'bg-rose-600'
    }
  } as const;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-sans pb-20 transition-colors duration-300">
      {/* Utility Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 transition-colors">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Portal
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="max-w-6xl mx-auto p-4 md:p-8 mb-10 border-b-2 border-slate-200 dark:border-slate-800 pb-8 flex flex-col md:flex-row justify-between items-end gap-4 transition-colors">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic transition-colors">
            Pediatric <span className="text-blue-600">Femur Masterclass</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-xs mt-2 uppercase tracking-[0.3em] flex items-center gap-2 transition-colors">
            <Baby size={16} className="text-blue-500" /> High-Yield Surgical Revision 2026
          </p>
        </div>
        <nav className="flex bg-slate-200 dark:bg-slate-800 p-1.5 rounded-2xl transition-colors">
          {Object.keys(ageGroups).map((age) => (
            <button
              key={age}
              onClick={() => setActiveAge(age)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${activeAge === age ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
            >
              {age}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SECTION 1: AGE-SPECIFIC TREATMENT (ACTIVE CARD) */}
        <section className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors">
            <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 ${ageGroups[activeAge as keyof typeof ageGroups].color} rounded-bl-full`}></div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${ageGroups[activeAge as keyof typeof ageGroups].color}`}>
                <Clock size={24} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest transition-colors">Protocol for</span>
                <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase italic leading-none transition-colors">{ageGroups[activeAge as keyof typeof ageGroups].title}</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <Target size={18} />
                  <h3 className="text-sm font-black uppercase">Standard Treatment</h3>
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">{ageGroups[activeAge as keyof typeof ageGroups].treatment}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed transition-colors">{ageGroups[activeAge as keyof typeof ageGroups].detail}</p>
              </div>
              <div className="p-6 bg-amber-50 dark:bg-amber-500/10 rounded-3xl border border-amber-200 dark:border-amber-500/20 flex flex-col justify-center transition-colors font-sans">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-2 transition-colors">
                  <AlertCircle size={18} />
                  <h4 className="text-[10px] font-black uppercase tracking-widest">Technique Warning</h4>
                </div>
                <p className="text-xs font-bold text-amber-900 dark:text-amber-200 leading-relaxed italic transition-colors">
                  {ageGroups[activeAge as keyof typeof ageGroups].warning}
                </p>
              </div>
            </div>

            {/* Acceptable Limits Sub-panel */}
            {activeAge === '6m - 5y' && (
              <div className="p-6 bg-slate-900 dark:bg-slate-950 rounded-[2rem] text-white transition-colors">
                <h4 className="text-[10px] font-black text-blue-400 uppercase mb-4 tracking-widest">Acceptable Limits for Spica Reduction</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div><span className="block text-xl font-black">10°</span><span className="text-[8px] opacity-60 uppercase font-bold">Coronal</span></div>
                  <div><span className="block text-xl font-black">20°</span><span className="text-[8px] opacity-60 uppercase font-bold">Sagittal</span></div>
                  <div><span className="block text-xl font-black">2cm</span><span className="text-[8px] opacity-60 uppercase font-bold">Shortening</span></div>
                  <div><span className="block text-xl font-black">10°</span><span className="text-[8px] opacity-60 uppercase font-bold">Rotation</span></div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DEFORMITY BIOMECHANICS */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 mb-6 transition-colors">
                <Activity size={20} />
                <h3 className="text-sm font-black uppercase">Muscle Deformity Forces</h3>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-rose-600 dark:text-rose-400 font-black text-xs h-fit uppercase transition-colors">Prox</div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-relaxed transition-colors">
                    <span className="text-rose-600 underline decoration-2">Iliopsoas</span>: Flexion and External Rotation.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 font-black text-xs h-fit uppercase transition-colors">Dist</div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-relaxed transition-colors">
                    <span className="text-slate-900 underline decoration-2 dark:text-white">Adductors</span>: Shortening and Varus.
                  </p>
                </div>
              </div>
            </div>

            {/* RED FLAG: NAT */}
            <div className="bg-red-600 p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
              <ShieldAlert className="absolute top-0 right-0 p-8 opacity-10" size={120} />
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-sm font-black uppercase">NAT Screening (Abuse)</h3>
              </div>
              <p className="text-sm font-black leading-tight italic mb-4">"Suspect abuse if &lt; 3 years old or especially if pre-walking."</p>
              <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                <h4 className="text-[9px] font-black uppercase text-red-200 mb-1">Most Predictive Patterns</h4>
                <p className="text-xs font-bold text-white leading-snug">
                  • Transverse Fractures<br />
                  • Metaphyseal Corner Fractures
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: HIGH-YIELD VITALS */}
        <section className="lg:col-span-4 space-y-6">
          
          <div className="bg-slate-900 dark:bg-blue-900/40 text-white p-6 rounded-[2rem] shadow-xl transition-colors">
            <div className="flex items-center gap-2 mb-6 text-blue-400">
              <Zap size={18} />
              <h3 className="text-xs font-black uppercase tracking-widest">Complication Vitals</h3>
            </div>
            
            <div className="space-y-6">
              <div className="group border-b border-white/10 pb-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase mb-2">Overgrowth (Leg Length)</h4>
                <p className="text-xs font-bold text-slate-100 mb-1">Common complication in &lt; 10 years old.</p>
                <div className="flex items-center gap-3">
                  <div className="text-lg font-black text-blue-400 italic">0.7 - 2.0 cm</div>
                  <span className="text-[9px] text-slate-500 font-black uppercase leading-none">Occurs within 2 years</span>
                </div>
              </div>

              <div className="group border-b border-white/10 pb-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase mb-2">Avascular Necrosis (AVN)</h4>
                <p className="text-xs font-bold text-rose-400 mb-1 uppercase tracking-tight">Contraindication Alert:</p>
                <p className="text-[10px] font-medium text-slate-300 leading-relaxed italic">
                  Piriformis entry nails are contraindicated in adolescents with open physes due to <span className="text-white underline underline-offset-4 decoration-rose-500/50">Retinacular Vessel</span> injury.
                </p>
              </div>

              <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase mb-2">Titanium Nails (Flexible)</h4>
                <p className="text-xs font-bold text-slate-100 mb-2">Nail size calculation:</p>
                <div className="p-3 bg-white/5 rounded-xl text-center">
                  <p className="text-xl font-black text-indigo-400 tracking-widest">0.4 × ISTHMUS</p>
                  <p className="text-[8px] uppercase font-bold text-slate-500">Goal: 80% Canal Fill</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <div className="flex items-center gap-2 mb-4 text-slate-400">
              <ClipboardList size={16} />
              <h3 className="text-[10px] font-black uppercase tracking-widest">Anatomy Snapshot</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-500">Femur Bow</span>
                <span className="font-black text-slate-800 dark:text-slate-200 uppercase italic">Anterior</span>
              </li>
              <li className="flex justify-between items-center text-xs border-t border-slate-50 dark:border-slate-800 pt-2">
                <span className="font-bold text-slate-500">Narrowest Part</span>
                <span className="font-black text-slate-800 dark:text-slate-200 uppercase italic">Isthmus</span>
              </li>
              <li className="flex justify-between items-center text-xs border-t border-slate-50 dark:border-slate-800 pt-2">
                <span className="font-bold text-slate-500">Distribution</span>
                <span className="font-black text-slate-800 dark:text-slate-200 uppercase italic">Bimodal (2-4y & Adolescents)</span>
              </li>
            </ul>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-500/10 p-6 rounded-[2rem] border-2 border-indigo-200 dark:border-indigo-500/20 transition-colors">
            <h4 className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase mb-2 tracking-widest">Stability Definition</h4>
            <div className="space-y-2">
              <div className="flex gap-2 text-[10px] font-bold text-indigo-900 dark:text-indigo-200">
                <ChevronRight size={14} className="text-indigo-600" />
                <span>STABLE: Transverse / Short Oblique</span>
              </div>
              <div className="flex gap-2 text-[10px] font-bold text-indigo-900 dark:text-indigo-200">
                <ChevronRight size={14} className="text-indigo-600" />
                <span>UNSTABLE: Spiral (&gt; 2x bone diameter)</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="max-w-6xl mx-auto mt-12 mb-12 flex justify-center">
        <div className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-[10px] font-black uppercase tracking-[0.5em] flex items-center gap-3 transition-colors">
          <Target size={14} className="text-blue-400" />
          Pediatric Orthopedic Review • Board Standard 2026
        </div>
      </footer>
    </div>
  );
};

const PediatricOrthoRevision = ({ onBack, onPractice }: RevisionProps) => {
  const [activeTopic, setActiveTopic] = useState<"menu" | "ddh" | "ctev" | "femur">("menu");

  if (activeTopic === "ctev") {
    return <CTEVRevision onBack={() => setActiveTopic("menu")} onPractice={onPractice} />;
  }

  if (activeTopic === "ddh") {
    return <DDHRevision onBack={() => setActiveTopic("menu")} onPractice={onPractice} />;
  }

  if (activeTopic === "femur") {
    return <PediatricFemurRevision onBack={() => setActiveTopic("menu")} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans pb-20 transition-colors duration-300"
    >
      {/* Utility Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 transition-colors">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>
          
          <button 
            onClick={onPractice}
            className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white text-xs font-black rounded-full uppercase hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-none"
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
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic mb-2 tracking-tighter transition-colors">
            Pediatric <span className="text-indigo-600">Review Portal</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest mb-10 transition-colors">Select a high-yield topic to begin your revision</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button 
              onClick={() => setActiveTopic("ddh")}
              className="group flex flex-col p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] text-left hover:shadow-2xl hover:border-blue-500 transition-all"
            >
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Baby size={30} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-2 transition-colors">DDH</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider transition-colors">Developmental Dysplasia of the Hip</p>
              <div className="mt-8 flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase tracking-widest">
                View Infographic Guide <ChevronRight size={14} />
              </div>
            </button>

            <button 
              onClick={() => setActiveTopic("ctev")}
              className="group flex flex-col p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] text-left hover:shadow-2xl hover:border-indigo-500 transition-all"
            >
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Presentation size={30} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-2 transition-colors">CTEV</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider transition-colors">Clubfoot Assessment (Pirani/Dimeglio)</p>
              <div className="mt-8 flex items-center gap-2 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
                View Classification Guide <ChevronRight size={14} />
              </div>
            </button>

            <button 
              onClick={() => setActiveTopic("femur")}
              className="group flex flex-col p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] text-left hover:shadow-2xl hover:border-emerald-500 transition-all"
            >
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Activity size={30} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-2 transition-colors">Femur</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider transition-colors">Pediatric Femur Fractures Masterclass</p>
              <div className="mt-8 flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                View Surgical Guide <ChevronRight size={14} />
              </div>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default PediatricOrthoRevision;

