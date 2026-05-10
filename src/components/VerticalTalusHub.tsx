import React, { useState, useMemo } from 'react';
import { 
  Footprints, 
  Activity, 
  Search, 
  Scissors, 
  Zap, 
  ChevronRight, 
  AlertTriangle,
  Stethoscope,
  Maximize2,
  Layers,
  Settings,
  Scale,
  Thermometer,
  Wind,
  Info,
  Bone,
  Crosshair,
  Eye,
  ArrowLeft
} from 'lucide-react';

const TALUS_DATA = {
  assessment: {
    title: "Clinical Forensic",
    niche: "The Rigid Flatfoot",
    findings: [
      { id: "Rocker-Bottom", d: "The sole is convex. The heel is in equinus (pointed down) and the forefoot is dorsiflexed." },
      { id: "Rigidity", d: "Unlike calcaneovalgus, the deformity is fixed. It cannot be passively corrected to neutral." },
      { id: "Heel Position", d: "Hindfoot is in severe valgus and equinus. The Achilles tendon is extremely tight." },
      { id: "Associated", d: "Up to 50% are associated with syndromes (e.g., Arthrogryposis, Myelomeningocele)." }
    ],
    pearl: "If the 'flatfoot' doesn't disappear when the baby dangles their feet, think Vertical Talus."
  },
  radiology: {
    title: "Radiographic Logic",
    niche: "The Plantarflexion Test",
    criteria: [
      { id: "Vertical Talus", d: "The talus is oriented vertically (parallel to the tibial shaft)." },
      { id: "Navicular Dislocation", d: "The navicular (represented by the 1st metatarsal axis) sits on the dorsal neck of the talus." },
      { id: "The Stress View", d: "Mandatory lateral X-ray in MAXIMAL plantarflexion. In CVT, the 1st metatarsal fails to align with the talar axis." }
    ],
    logic: "The loss of the 'Meary's Line' (Talo-1st Metatarsal angle) in plantarflexion is diagnostic.",
    pearl: "The navicular doesn't ossify until age 3; use the 1st metatarsal axis as its proxy."
  },
  management: {
    title: "Management Protocol",
    niche: "The Dobbs Technique",
    steps: [
      { name: "Reverse Ponseti", type: "Casting", d: "Weekly serial casting. The foot is stretched into plantarflexion and inversion (opposite of clubfoot)." },
      { name: "K-Wire Fixation", type: "Surgery", d: "Percutaneous pinning of the talonavicular joint once reduction is achieved by casting." },
      { name: "Achilles Release", type: "Surgery", d: "Percutaneous Tendo-Achilles Lengthening (TAL) to correct the residual hindfoot equinus." }
    ],
    pearl: "Cast first, pin second. The days of 'extensive dorsal release' surgery are over."
  },
  anatomy: {
    title: "Pathoanatomy",
    niche: "The Dislocated Midfoot",
    structures: [
      { part: "Talus", d: "Severely plantarflexed; the head is the 'rocker' felt in the sole." },
      { part: "Navicular", d: "Dislocated dorsally and laterally onto the neck of the talus." },
      { part: "Contractures", d: "Tightness of the EHL, Tibialis Anterior, and Achilles tendon." }
    ],
    pearl: "Vertical talus is essentially a 'reversed' clubfoot deformity."
  }
};

interface VerticalTalusHubProps {
  onBack: () => void;
}

const VerticalTalusHub = ({ onBack }: VerticalTalusHubProps) => {
  const [activeTab, setActiveTab] = useState('assessment');

  const current = useMemo(() => TALUS_DATA[activeTab as keyof typeof TALUS_DATA], [activeTab]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 font-sans text-slate-900 border-t border-slate-200">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-slate-950 text-white flex flex-col lg:h-screen lg:sticky lg:top-0 shadow-2xl">
        <div className="p-8 border-b border-white/5 text-center flex flex-col items-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg">
              <Footprints size={20} className="text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase italic">Peds-Foot</span>
          </div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic">Vertical Talus Hub</p>
          
          <button 
            onClick={onBack}
            className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-indigo-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={12} /> Back to Pediatrics
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-x-auto lg:overflow-y-auto no-scrollbar flex lg:flex-col items-center lg:items-stretch gap-2 lg:gap-0">
          {[
            { id: 'assessment', label: 'Clinical Forensic', icon: Search },
            { id: 'anatomy', label: 'Pathoanatomy', icon: Bone },
            { id: 'radiology', label: 'Radiographic Logic', icon: Eye },
            { id: 'management', label: 'Management', icon: Scissors }
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
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 italic">Apley's Axiom</p>
            <p className="text-[11px] text-slate-300 font-medium leading-tight italic">
              "It is the most rigid flatfoot. If you can't push it back to neutral, the navicular is off the tracks."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto no-scrollbar relative bg-slate-50">
        <header className="h-auto lg:h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex flex-col lg:flex-row items-center justify-between px-8 py-4 lg:py-0 sticky top-0 z-30 gap-4">
          <div>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Congenital Foot Deformities</h2>
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{current.title}</h1>
          </div>
          <div className="hidden md:flex gap-3">
             <div className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100 flex items-center gap-2">
                <Activity size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest italic tracking-tight">Rigid Alignment</span>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 max-w-5xl mx-auto w-full">
          
          {/* Visual Hero Card */}
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="p-8 bg-indigo-50 text-indigo-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                   {activeTab === 'management' ? <Scissors size={48} /> : activeTab === 'radiology' ? <Maximize2 size={48} /> : <Footprints size={48} />}
                </div>
                <div className="text-center md:text-left flex-1">
                   <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                     <span className="text-indigo-600 font-black text-xs uppercase tracking-widest">{current.niche}</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                     <span className="text-slate-400 font-black text-xs uppercase tracking-widest italic">Apley Peds-Path</span>
                   </div>
                   <h3 className="text-4xl font-black text-slate-800 tracking-tighter mb-4">{current.title}</h3>
                   <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{current.pearl}"</p>
                </div>
             </div>
             <Wind className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
          </div>

          {/* Core Content Grid */}
          <div className="grid md:grid-cols-2 gap-8">
             {/* LEFT: Structural Logic */}
             <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                <h4 className="text-lg font-black mb-8 flex items-center gap-3 text-indigo-400 uppercase tracking-tighter">
                   <Zap size={22} /> Biological Matrix
                </h4>
                <div className="space-y-4 relative z-10">
                   {activeTab === 'assessment' && (current as any).findings.map((f: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all">
                        <h5 className="text-[11px] font-black text-indigo-400 uppercase mb-1">{f.id}</h5>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{f.d}</p>
                     </div>
                   ))}
                   {activeTab === 'anatomy' && (current as any).structures.map((s: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <h5 className="text-[11px] font-black text-white uppercase mb-1">{s.part}</h5>
                        <p className="text-xs text-slate-400 leading-relaxed italic">{s.d}</p>
                     </div>
                   ))}
                   {activeTab === 'radiology' && (current as any).criteria.map((c: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all">
                        <h5 className="text-[11px] font-black text-white uppercase mb-1">{c.id}</h5>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{c.d}</p>
                     </div>
                   ))}
                   {activeTab === 'management' && (current as any).steps.map((s: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                           <h5 className="text-[11px] font-black text-white uppercase">{s.name}</h5>
                           <span className="text-[9px] font-black bg-white/10 px-2 py-0.5 rounded-full text-indigo-300 italic">{s.type}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed italic">{s.d}</p>
                     </div>
                   ))}
                </div>
                <Search className="absolute -bottom-10 -right-10 text-white/5" size={240} />
             </div>

             {/* RIGHT: Actions & Clinical Judgment */}
             <div className="space-y-6">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                   <h4 className="text-lg font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter">
                      <Stethoscope size={22} className="text-indigo-600" /> Surgeon's Command
                   </h4>
                   <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl">
                      <p className="text-sm text-indigo-900 font-bold leading-relaxed italic text-center">
                        {activeTab === 'assessment' ? "Always palpate the sole. The head of the talus is prominent and 'rock-hard'. If it moves, it's not Vertical Talus." : 
                         activeTab === 'radiology' ? "The 1st metatarsal axis should always point to the center of the talar head. If it points to the ceiling on a plantarflexed lateral, you have your diagnosis." : 
                         activeTab === 'management' ? "Success with the Dobbs technique depends on the 'pinning' stage. If you don't secure the navicular to the talus, the deformity will recur immediately." : 
                         "Never perform surgery without screening the spine. A 'tethered cord' can present as a unilateral rigid flatfoot."}
                      </p>
                   </div>
                </div>

                <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                   <h5 className="text-[10px] font-black text-indigo-400 uppercase mb-3 flex items-center gap-2">
                     <AlertTriangle size={14} className="text-amber-500" /> Diagnostic Pearl
                   </h5>
                   <p className="text-xs font-medium leading-relaxed italic opacity-90">
                      {activeTab === 'assessment' ? "Calcaneovalgus (flexible flatfoot) is common and benign; it resolves with stretching. Vertical Talus is rare and pathologic; it requires surgery." : 
                       activeTab === 'management' ? "The 'Reverse Ponseti' method has reduced the need for the old '360-degree' releases which often led to stiff, painful feet in adulthood." : 
                       activeTab === 'anatomy' ? "The primary 'block' to reduction is the dorsal contracture of the long extensors. Casting slowly overcomes this through biological creep." :
                       "A rocker-bottom foot in a newborn should always trigger a genetics consult. Trisomy 18 is a classic association."}
                   </p>
                   <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                </div>
             </div>
          </div>

          {/* The Mechanical Reduction Area */}
          <div className="bg-indigo-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-2/3">
                   <h4 className="text-2xl font-black mb-4 flex items-center gap-3">
                     <Crosshair size={24} className="text-indigo-300" /> The Dobbs Logic
                   </h4>
                   <p className="text-sm text-slate-300 leading-relaxed italic">
                      "Think of the navicular as a stray car that has jumped the talar tracks. You cannot push it back while the Achilles is pulling the heel down. The casting 'stretches' the car back into position, and the percutaneous pin 'locks' it onto the track before the final release."
                   </p>
                </div>
                <div className="md:w-1/3 flex justify-center text-center">
                   <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest">
                      Cast {' -> '} Pin {' -> '} Cut
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* Legend */}
        <footer className="mt-auto px-10 py-8 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/80">
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-indigo-600 shadow-sm"></div> Midfoot Dislocation</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-red-600 shadow-sm"></div> Hindfoot Equinus</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-slate-900 shadow-sm"></div> Reverse Ponseti</div>
           <div className="flex items-center gap-2 text-slate-800 uppercase italic font-bold tracking-tight">Apley Vertical Talus v1.0</div>
        </footer>
      </main>
    </div>
  );
};

export default VerticalTalusHub;
