import React, { useState, useMemo } from 'react';
import { 
  Footprints, 
  Activity, 
  RotateCw, 
  Scissors, 
  ShieldCheck, 
  ChevronRight, 
  AlertTriangle,
  Stethoscope,
  Maximize2,
  Layers,
  Settings,
  Scale,
  Bone,
  Info,
  Zap,
  Target,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

const CLUBFOOT_DATA = {
  pathoanatomy: {
    title: "The CAVE Deformity",
    niche: "Anatomical Components",
    items: [
      { id: "Cavus", order: "1st", cause: "Tightness of the intrinsic muscles and tibialis posterior; high medial arch." },
      { id: "Adductus", order: "2nd", cause: "Forefoot adducted at the midtarsal joints around a stable talar head." },
      { id: "Varus", order: "3rd", cause: "Inversion of the calcaneus and subluxation of the subtalar joint." },
      { id: "Equinus", order: "4th", cause: "Plantarflexion at the ankle joint due to a shortened Achilles tendon." }
    ],
    pearl: "CAVE describes the sequence of correction. You cannot fix the equinus until the others are resolved."
  },
  ponseti: {
    title: "Ponseti Protocol",
    niche: "Serial Casting Logic",
    steps: [
      { step: "Correction of Cavus", detail: "Supinate the forefoot to align it with the hindfoot. This 'unlocks' the foot." },
      { step: "Abduction (The Fulcrum)", detail: "Use the talar head as the fulcrum. Slowly abduct the foot to correct adduction and varus." },
      { step: "Achilles Tenotomy", detail: "Performed in ~90% of cases. Percutaneous release to correct the final equinus once 60° abduction is achieved." },
      { step: "Bracing (DBB)", detail: "Dennis-Browne bar for 23 hours/day for 3 months, then nights/naps until age 4." }
    ],
    pearl: "The talar head is the pivot. Never touch the calcaneus during abduction; it must rotate freely."
  },
  assessment: {
    title: "The Pirani Score",
    niche: "Clinical Grading",
    midfoot: [
      { name: "Curved Lateral Border", d: "Graded 0, 0.5, or 1 based on severity." },
      { name: "Medial Crease", d: "Depth of the skin crease on the medial arch." },
      { name: "Talar Head Coverage", d: "How much of the talar head is felt laterally." }
    ],
    hindfoot: [
      { name: "Posterior Crease", d: "Depth of the crease above the heel." },
      { name: "Empty Heel", d: "Failure to feel the calcaneus in the heel pad." },
      { name: "Rigid Equinus", d: "Inability to dorsiflex the ankle." }
    ],
    pearl: "A Pirani score > 4 indicates a high likelihood of needing a tenotomy."
  },
  surgical: {
    title: "Secondary Procedures",
    niche: "Salvage & Recurrence",
    options: [
      { name: "Tibialis Anterior Transfer", ind: "Dynamic supination/relapse after age 2.5." },
      { name: "Posteromedial Release (PMR)", ind: "Historically common; now reserved for syndromic cases resistant to casting." },
      { name: "Steindler Stripping", ind: "Release of plantar fascia for persistent cavus." }
    ],
    pearl: "Modern orthopedics is 'Ponseti-first'. Surgery is the exception, not the rule."
  }
};

interface ClubfootHubProps {
  onBack: () => void;
}

const ClubfootHub = ({ onBack }: ClubfootHubProps) => {
  const [activeTab, setActiveTab] = useState('pathoanatomy');

  const current = useMemo(() => CLUBFOOT_DATA[activeTab as keyof typeof CLUBFOOT_DATA], [activeTab]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 font-sans text-slate-900 border-t border-slate-200">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-slate-950 text-white flex flex-col lg:h-screen lg:sticky lg:top-0 shadow-2xl">
        <div className="p-8 border-b border-white/5 text-center flex flex-col items-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-900/40">
              <Footprints size={20} className="text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase italic">Clubfoot-OS</span>
          </div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest text-center italic">CTEV Mastery Hub</p>
          
          <button 
            onClick={onBack}
            className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-indigo-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={12} /> Back to Pediatrics
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-x-auto lg:overflow-y-auto no-scrollbar flex lg:flex-col items-center lg:items-stretch gap-2 lg:gap-0">
          {[
            { id: 'pathoanatomy', label: 'CAVE Deformity', icon: Layers },
            { id: 'ponseti', label: 'Ponseti Protocol', icon: RotateCw },
            { id: 'assessment', label: 'Pirani Scoring', icon: Target },
            { id: 'surgical', label: 'Surgical Options', icon: Scissors }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-xl lg:translate-x-1' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={16} />
                {item.label}
              </div>
              <ChevronRight size={14} className={activeTab === item.id ? 'opacity-100 hidden lg:block' : 'opacity-0'} />
            </button>
          ))}
        </nav>
        
        <div className="p-6 bg-slate-900/50 hidden lg:block">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 italic">Apley's Foot Dictum</p>
            <p className="text-[11px] text-slate-300 font-medium leading-tight italic">
              "Don't fight the foot. Follow the talar pivot and the biology will respond."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto no-scrollbar relative bg-slate-50">
        <header className="h-auto lg:h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex flex-col lg:flex-row items-center justify-between px-8 py-4 lg:py-0 sticky top-0 z-30 gap-4">
          <div>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Pediatric Talipes Equinovarus</h2>
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{current.title}</h1>
          </div>
          <div className="hidden md:flex gap-3">
             <div className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100 flex items-center gap-2">
                <Activity size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest italic tracking-tight">Kinetic Correction</span>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 max-w-5xl mx-auto w-full">
          
          {/* Main Visual Header */}
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="p-8 bg-indigo-50 text-indigo-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                   {activeTab === 'ponseti' ? <RotateCw size={48} /> : activeTab === 'assessment' ? <Target size={48} /> : <Footprints size={48} />}
                </div>
                <div className="text-center md:text-left flex-1">
                   <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                     <span className="text-indigo-600 font-black text-xs uppercase tracking-widest">{current.niche}</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                     <span className="text-slate-400 font-black text-xs uppercase tracking-widest italic">Apley Ortho-Logic</span>
                   </div>
                   <h3 className="text-4xl font-black text-slate-800 tracking-tighter mb-4">{current.title}</h3>
                   <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{current.pearl}"</p>
                </div>
             </div>
             <Maximize2 className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
          </div>

          {/* Core Content Grid */}
          <div className="grid md:grid-cols-2 gap-8">
             {/* LEFT: Structural Logic */}
             <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                <h4 className="text-lg font-black mb-8 flex items-center gap-3 text-indigo-400 uppercase tracking-tighter">
                   <Zap size={22} /> Systematic Correction
                </h4>
                <div className="space-y-4 relative z-10">
                   {activeTab === 'pathoanatomy' && current.items.map((item, i) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-center mb-1">
                           <h5 className="text-[11px] font-black text-indigo-400 uppercase">{item.id}</h5>
                           <span className="text-[9px] font-black text-white px-2 py-0.5 bg-white/10 rounded-full">{item.order}</span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{item.cause}</p>
                     </div>
                   ))}
                   {activeTab === 'ponseti' && current.steps.map((s, i) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex gap-4">
                        <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center font-black text-[10px] shrink-0 italic">0{i+1}</div>
                        <div>
                           <h5 className="text-[11px] font-black text-white uppercase">{s.step}</h5>
                           <p className="text-xs text-slate-400 leading-relaxed italic">{s.detail}</p>
                        </div>
                     </div>
                   ))}
                   {activeTab === 'assessment' && (
                     <div className="space-y-6">
                        <div>
                          <h5 className="text-[10px] font-black text-indigo-400 uppercase mb-3 italic">Midfoot Scores</h5>
                          {current.midfoot.map((m: any, i: number) => (
                             <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl mb-2">
                                <p className="text-[11px] font-black text-white">{m.name}</p>
                                <p className="text-[10px] text-slate-400 italic">{m.d}</p>
                             </div>
                          ))}
                        </div>
                        <div>
                          <h5 className="text-[10px] font-black text-red-400 uppercase mb-3 italic">Hindfoot Scores</h5>
                          {current.hindfoot.map((m: any, i: number) => (
                             <div key={i} className="p-3 bg-red-900/10 border border-red-900/20 rounded-xl mb-2">
                                <p className="text-[11px] font-black text-white">{m.name}</p>
                                <p className="text-[10px] text-slate-400 italic">{m.d}</p>
                             </div>
                          ))}
                        </div>
                     </div>
                   )}
                   {activeTab === 'surgical' && current.options.map((opt: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <h5 className="text-[11px] font-black text-white uppercase mb-1">{opt.name}</h5>
                        <p className="text-xs text-slate-400 font-medium italic"><span className="text-indigo-400 font-black">IND:</span> {opt.ind}</p>
                     </div>
                   ))}
                </div>
                <Bone className="absolute -bottom-10 -right-10 text-white/5" size={240} />
             </div>

             {/* RIGHT: Actions & Clinical Judgment */}
             <div className="space-y-6">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                   <h4 className="text-lg font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter">
                      <Stethoscope size={22} className="text-indigo-600" /> Surgeon's Command
                   </h4>
                   <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl text-center">
                      <p className="text-sm text-indigo-900 font-bold leading-relaxed italic">
                        {activeTab === 'pathoanatomy' ? "Remember C-A-V-E. The equinus is always the LAST to be corrected. Attempting to fix equinus before varus results in a 'rocker-bottom' break in the midfoot." : 
                         activeTab === 'ponseti' ? "The Dennis-Browne bar is where most failures occur. Patient education on bracing compliance is more important than the casting technique itself." : 
                         activeTab === 'assessment' ? "A '0' on the Pirani score is a normal foot. A '6' is the most severe deformity. Use this score to determine if a tenotomy is required." : 
                         "If a child with clubfoot relapses, always check for an underlying spinal dysraphism. A unilateral clubfoot in a walking child is a neuro-urological emergency."}
                      </p>
                   </div>
                </div>

                <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                   <h5 className="text-[10px] font-black text-indigo-400 uppercase mb-3 flex items-center gap-2">
                     <AlertTriangle size={14} className="text-amber-500" /> Apley Diagnostic Pearl
                   </h5>
                   <p className="text-xs font-medium leading-relaxed italic opacity-90">
                      {activeTab === 'pathoanatomy' ? "The primary pathology is the medial displacement of the navicular and calcaneus around the talus. The talus is the 'fixed' point." : 
                       activeTab === 'ponseti' ? "The 'Ponseti Kick' or the 'Ponseti Stretch' should never be painful. The goal is to remodel the collagen, not to tear it." : 
                       activeTab === 'assessment' ? "The 'Empty Heel' sign is the most reliable clinical indicator that the calcaneus is stuck in equinus." :
                       "Tibialis Anterior transfer is done to the lateral cuneiform, turning a deforming force into a corrective one."}
                   </p>
                </div>
             </div>
          </div>

          {/* The Biological Area */}
          <div className="bg-indigo-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-2/3">
                   <h4 className="text-2xl font-black mb-4 flex items-center gap-3">
                     <Info size={24} className="text-indigo-300" /> The Ponseti Fulcrum
                   </h4>
                   <p className="text-sm text-slate-300 leading-relaxed italic">
                      "Casting works because infant collagen is highly malleable. By using the talar head as a fulcrum and slowly abducting the foot, we are stretching the medial ligaments (Tibialis Posterior, Spring Ligament) and allowing the joints to remodel into a neutral position. The Achilles tenotomy then 'releases' the lever to bring the foot to 15-20° of dorsiflexion."
                   </p>
                </div>
                <div className="md:w-1/3 flex justify-center text-center">
                   <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest">
                      70° Abduction Goal
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* Legend */}
        <footer className="mt-auto px-10 py-8 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/80">
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-indigo-600 shadow-sm"></div> Ponseti Method</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-red-600 shadow-sm"></div> Surgical Rescue</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-slate-900 shadow-sm"></div> Deformity Component</div>
           <div className="flex items-center gap-3 text-slate-800 uppercase italic font-bold">Apley Clubfoot Hub v1.0</div>
        </footer>
      </main>
    </div>
  );
};

export default ClubfootHub;
