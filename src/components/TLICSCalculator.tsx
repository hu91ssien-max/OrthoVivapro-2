import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  Activity, 
  ShieldAlert, 
  Search, 
  Maximize2, 
  Stethoscope, 
  ChevronRight, 
  AlertTriangle,
  Layers,
  Wind,
  Settings,
  Scale,
  Brain,
  Crosshair,
  Info,
  ArrowLeft
} from 'lucide-react';

const TLICS_CRITERIA = {
  morphology: {
    title: "Injury Morphology",
    options: [
      { name: "Compression", score: 1, desc: "Axial loading; wedge fractures without posterior element involvement." },
      { name: "Burst", score: 2, desc: "Compression with retropulsion into the canal (comminuted body)." },
      { name: "Translation/Rotation", score: 3, desc: "Horizontal displacement; extremely unstable (e.g., facet dislocations)." },
      { name: "Distraction", score: 4, desc: "Tension injury (e.g., Chance fracture); pulling apart of segments." }
    ]
  },
  neurology: {
    title: "Neurological Status",
    options: [
      { name: "Intact", score: 0, desc: "No motor or sensory deficits." },
      { name: "Nerve Root", score: 2, desc: "Isolated radiculopathy (e.g., L2 root weakness)." },
      { name: "Cord / Conus (Complete)", score: 2, desc: "No motor or sensory function below level of injury." },
      { name: "Cord / Conus (Incomplete)", score: 3, desc: "Partial preservation of motor or sensory function (ASIA B, C, D)." },
      { name: "Cauda Equina", score: 3, desc: "Saddle anesthesia, bowel/bladder dysfunction." }
    ]
  },
  plc: {
    title: "PLC Integrity",
    niche: "Posterior Ligamentous Complex",
    options: [
      { name: "Intact", score: 0, desc: "No evidence of interspinous widening or focal kyphosis." },
      { name: "Suspected / Indeterminate", score: 1, desc: "Subtle edema on MRI; interspinous tenderness." },
      { name: "Disrupted", score: 2, desc: "Clear interspinous widening, facet splaying, or MRI siganl void." }
    ]
  }
};

interface TLICSCalculatorProps {
  onBack?: () => void;
}

const TLICSCalculator = ({ onBack }: TLICSCalculatorProps) => {
  const [selections, setSelections] = useState({
    morphology: 0,
    neurology: 0,
    plc: 0
  });

  const totalScore = useMemo(() => {
    return selections.morphology + selections.neurology + selections.plc;
  }, [selections]);

  const recommendation = useMemo(() => {
    if (totalScore <= 3) return { text: "Conservative Management", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", action: "Bracing & Mobilization" };
    if (totalScore === 4) return { text: "Surgeon's Discretion", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", action: "Case-by-Case Assessment" };
    return { text: "Surgical Stabilization", color: "text-red-600", bg: "bg-red-50", border: "border-red-200", action: "ORIF / Posterior Fusion" };
  }, [totalScore]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 font-sans text-slate-900 border-t border-slate-200">
      {/* Sidebar - Reference Info */}
      <aside className="w-full lg:w-72 bg-slate-950 text-white flex flex-col lg:h-screen lg:sticky lg:top-0 shadow-2xl">
        <div className="p-8 border-b border-white/5 text-center flex flex-col items-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg">
              <Scale size={20} className="text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase italic">TLICS-OS</span>
          </div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest text-center italic">Injury Severity Matrix</p>
          
          {onBack && (
            <button 
              onClick={onBack}
              className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-blue-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={12} /> Back to Hub
            </button>
          )}
        </div>
        
        <div className="flex-1 p-6 space-y-6 overflow-y-auto no-scrollbar">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 italic">The Scoring Key</h4>
            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between border-b border-white/5 pb-1"><span>0-3</span> <span className="text-emerald-400 font-bold">Non-Op</span></div>
              <div className="flex justify-between border-b border-white/5 pb-1"><span>4</span> <span className="text-amber-400 font-bold">Equivocal</span></div>
              <div className="flex justify-between border-b border-white/5 pb-1"><span>5+</span> <span className="text-red-400 font-bold">Operative</span></div>
            </div>
          </div>

          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 italic">PLC Components</h4>
            <ul className="text-[10px] text-slate-400 space-y-1">
              <li>• Supraspinous Ligament</li>
              <li>• Interspinous Ligament</li>
              <li>• Ligamentum Flavum</li>
              <li>• Facet Capsules</li>
            </ul>
          </div>
        </div>
        
        <div className="p-6 bg-slate-900/50 hidden lg:block">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1 italic">Apley's Stability Rule</p>
            <p className="text-[11px] text-slate-300 font-medium leading-tight italic">
              "The posterior ligamentous complex is the rubber band of the spine; once snapped, the column will collapse into kyphosis."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto no-scrollbar relative bg-slate-50">
        <header className="h-auto lg:h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex flex-col lg:flex-row items-center justify-between px-8 py-4 lg:py-0 sticky top-0 z-30 gap-4">
          <div>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Thoracolumbar Injury Score</h2>
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Assessment & Recommendation</h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right hidden md:block">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aggregate Score</p>
                <p className={`text-2xl font-black italic ${recommendation.color}`}>{totalScore}</p>
             </div>
             <div className={`px-6 py-2 rounded-full border shadow-sm ${recommendation.bg} ${recommendation.border} ${recommendation.color}`}>
                <span className="text-xs font-black uppercase tracking-widest italic">{recommendation.text}</span>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto w-full">
          
          {/* Scoring Interface */}
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Column 1: Morphology */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 px-2">
                <Maximize2 size={18} className="text-blue-600" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">{TLICS_CRITERIA.morphology.title}</h3>
              </div>
              <div className="space-y-3">
                {TLICS_CRITERIA.morphology.options.map((opt) => (
                  <button
                    key={opt.name}
                    onClick={() => setSelections(prev => ({ ...prev, morphology: opt.score }))}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 ${
                      selections.morphology === opt.score 
                        ? 'border-blue-600 bg-white shadow-lg ring-4 ring-blue-50' 
                        : 'border-slate-200 bg-white/50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-black uppercase text-slate-800 italic">{opt.name}</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${selections.morphology === opt.score ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>+{opt.score}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 italic leading-tight">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Column 2: Neurology */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 px-2">
                <Brain size={18} className="text-red-600" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">{TLICS_CRITERIA.neurology.title}</h3>
              </div>
              <div className="space-y-3">
                {TLICS_CRITERIA.neurology.options.map((opt) => (
                  <button
                    key={opt.name}
                    onClick={() => setSelections(prev => ({ ...prev, neurology: opt.score }))}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 ${
                      selections.neurology === opt.score 
                        ? 'border-red-600 bg-white shadow-lg ring-4 ring-red-50' 
                        : 'border-slate-200 bg-white/50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-black uppercase text-slate-800 italic">{opt.name}</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${selections.neurology === opt.score ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-400'}`}>+{opt.score}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 italic leading-tight">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Column 3: PLC */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 px-2">
                <ShieldAlert size={18} className="text-amber-600" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">{TLICS_CRITERIA.plc.title}</h3>
              </div>
              <div className="space-y-3">
                {TLICS_CRITERIA.plc.options.map((opt) => (
                  <button
                    key={opt.name}
                    onClick={() => setSelections(prev => ({ ...prev, plc: opt.score }))}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 ${
                      selections.plc === opt.score 
                        ? 'border-amber-600 bg-white shadow-lg ring-4 ring-amber-50' 
                        : 'border-slate-200 bg-white/50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-black uppercase text-slate-800 italic">{opt.name}</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${selections.plc === opt.score ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-400'}`}>+{opt.score}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 italic leading-tight">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Strategy Card */}
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className={`p-8 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500 ${recommendation.bg} ${recommendation.color}`}>
                   <Stethoscope size={48} />
                </div>
                <div className="text-center md:text-left flex-1">
                   <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                     <span className={`font-black text-xs uppercase tracking-widest ${recommendation.color}`}>{recommendation.action}</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                     <span className="text-slate-400 font-black text-xs uppercase tracking-widest italic">Apley Critical Path</span>
                   </div>
                   <h3 className="text-4xl font-black text-slate-800 tracking-tighter mb-4">Score Strategy: {totalScore}</h3>
                   <p className="text-lg text-slate-500 font-medium leading-relaxed italic">
                    {totalScore <= 3 
                      ? "Conservative treatment is generally safe. Focus on immobilization with a brace (e.g., TLSO) and early mobilization for stable morphology." 
                      : totalScore === 4 
                      ? "The 'Grey Zone'. Management depends on the patient's age, comorbidities, and the surgeon's confidence in PLC integrity. MRI is mandatory." 
                      : "Surgical stabilization is indicated to prevent progressive kyphosis, neurological deterioration, or painful non-union."}
                   </p>
                </div>
             </div>
             <Settings className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
          </div>

          {/* Clinical Forensics Area */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-slate-900 text-white rounded-[3rem] shadow-xl relative overflow-hidden">
               <h5 className="text-[10px] font-black text-blue-400 uppercase mb-3 flex items-center gap-2 italic">
                 <AlertTriangle size={14} className="text-amber-500" /> Surgeon's Diagnostic Pearl
               </h5>
               <p className="text-xs font-medium leading-relaxed italic opacity-90">
                  "The most common mistake is underestimating PLC disruption. If you see interspinous widening or focal kyphosis on a lateral X-ray, that's a disrupted PLC until proven otherwise. A 'Burst' fracture with PLC disruption is an automatic 4 (2+2), sitting right on the edge of surgery."
               </p>
               <Wind className="absolute top-2 right-2 text-white/5" size={60} />
            </div>

            <div className="p-8 bg-white border border-slate-200 rounded-[3rem] shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <Crosshair className="text-blue-600" size={20} />
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Clinical Logic Flow</h4>
              </div>
              <p className="text-[11px] text-slate-600 font-bold italic leading-relaxed">
                TLICS was designed to move beyond the AO classification by incorporating neurology and ligamentous stability. It answers the fundamental surgical question: Is the column stable enough to allow mobilization without secondary collapse?
              </p>
            </div>
          </div>

        </div>

        {/* Legend */}
        <footer className="mt-auto px-10 py-8 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/80">
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-blue-600 shadow-sm"></div> Morphology</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-red-600 shadow-sm"></div> Neurology</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-amber-600 shadow-sm"></div> Ligaments (PLC)</div>
           <div className="flex items-center gap-2 text-slate-800 uppercase italic font-bold">Apley Spine Systems v1.3</div>
        </footer>
      </main>
    </div>
  );
};

export default TLICSCalculator;
