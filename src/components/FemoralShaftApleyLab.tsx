import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  ChevronRight, 
  Zap, 
  Layers, 
  Target, 
  AlertTriangle, 
  Stethoscope, 
  Maximize2, 
  ShieldAlert, 
  Search, 
  Scale, 
  Hammer,
  Bone,
  Settings,
  ArrowDown,
  Crosshair,
  Wind,
  Droplets,
  Truck
} from 'lucide-react';

const SHAFT_DATA: any = {
  classification: {
    title: "Winquist-Hansen Matrix",
    niche: "Degree of Comminution",
    types: [
      { id: "Type I", name: "Minimal", d: "Small butterfly fragment (< 25% of width)." },
      { id: "Type II", name: "Moderate", d: "Butterfly fragment roughly 50% of width." },
      { id: "Type III", name: "Severe", d: "Butterfly > 50% width; minimal cortical contact." },
      { id: "Type IV", name: "Segmental", d: "Complete comminution; no contact between main fragments." }
    ],
    pearl: "The higher the Winquist grade, the more you must rely on the nail for stability during weight-bearing."
  },
  biomechanics: {
    title: "The Biological Splint",
    niche: "Intramedullary Dynamics",
    mechanics: "IM Nailing acts as a load-sharing internal splint, allowing for early weight-bearing and functional rehabilitation.",
    reaming: "Reaming creates a larger contact area for the nail and provides 'autograft' bone dust at the fracture site.",
    biology: "The shaft is primarily cortical bone; preserving the periosteal blood supply via closed nailing is vital for union.",
    pearl: "Reaming isn't just about fitting a bigger nail; it's an internal biological bone graft."
  },
  surgical: {
    title: "Antegrade vs. Retrograde",
    niche: "Entry Point Logic",
    options: [
      { type: "Antegrade (Piriformis)", ind: "Traditional gold standard; avoids the knee joint entirely." },
      { type: "Antegrade (Greater Troch)", ind: "Easier entry, less risk to the medial circumflex artery." },
      { type: "Retrograde", ind: "Ideal for floating knees, obese patients, or ipsilateral femoral neck/shaft fractures." }
    ],
    logic: "Selection is often based on associated injuries and patient habitus rather than bone healing speed.",
    pearl: "Retrograde nails are the 'secret weapon' for the polytrauma patient with multiple fractures."
  },
  systemic: {
    title: "Fat Embolism Syndrome (FES)",
    niche: "The Systemic Threat",
    triad: "Hypoxemia, Neurological changes, and Petechial rash.",
    timing: "Typically presents 24-72 hours post-injury. Early stabilization reduces incidence.",
    gurd: "Gurd's Criteria remains the clinical standard for diagnosis in the absence of specific imaging.",
    pearl: "The best treatment for Fat Embolism is early operative stabilization of the femur."
  }
};

const FemoralShaftApleyLab = () => {
  const [activeTab, setActiveTab] = useState('classification');

  const current = useMemo(() => SHAFT_DATA[activeTab], [activeTab]);

  return (
    <div className="flex flex-col lg:flex-row min-h-[600px] bg-slate-50 font-sans text-slate-900 rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-slate-900 text-white flex flex-col shadow-2xl">
        <div className="p-8 border-b border-white/5 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-emerald-600 rounded-xl shadow-lg">
              <Truck size={20} className="text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase italic">Trauma-OS</span>
          </div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic text-center">Femoral Shaft Hub</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto no-scrollbar">
          {[
            { id: 'classification', label: 'Winquist Matrix', icon: Layers },
            { id: 'biomechanics', label: 'IM Biomechanics', icon: Activity },
            { id: 'surgical', label: 'Entry Options', icon: Hammer },
            { id: 'systemic', label: 'FES & Systemic', icon: Droplets }
          ].map((item) => {
            const SidebarIcon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${activeTab === item.id ? 'bg-emerald-600 text-white shadow-xl translate-x-1' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-3">
                  <SidebarIcon size={16} />
                  {item.label}
                </div>
                <ChevronRight size={14} className={activeTab === item.id ? 'opacity-100' : 'opacity-0'} />
              </button>
            );
          })}
        </nav>
        
        <div className="p-6 bg-slate-950/50">
          <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1 italic">Kuntscher's Rule</p>
            <p className="text-[11px] text-slate-300 font-medium leading-tight italic">
              "The nail is a splint that allows the bone to speak for itself."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative bg-slate-50 overflow-y-auto max-h-[800px]">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">High Energy Diaphyseal Trauma</h2>
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{current.title}</h1>
          </div>
          <div className="hidden md:flex gap-3">
             <div className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 flex items-center gap-2">
                <Target size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest italic tracking-tight">Load-Sharing Logic</span>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 w-full">
          
          {/* Visual Hero Card */}
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="p-8 bg-emerald-50 text-emerald-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:rotate-12 duration-500">
                   {activeTab === 'systemic' ? <Droplets size={48} /> : <ArrowDown size={48} />}
                </div>
                <div className="text-center md:text-left flex-1">
                   <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                     <span className="text-emerald-600 font-black text-xs uppercase tracking-widest">{current.niche}</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                     <span className="text-slate-400 font-black text-xs uppercase tracking-widest italic">Apley Trauma Lab</span>
                   </div>
                   <h3 className="text-4xl font-black text-slate-800 tracking-tighter mb-4">{current.title}</h3>
                   <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{current.pearl}"</p>
                </div>
             </div>
             <Bone className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
          </div>

          {/* Deep Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
             {/* LEFT: Structural Logic */}
             <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                <h4 className="text-lg font-black mb-8 flex items-center gap-3 text-emerald-400 uppercase tracking-tighter">
                   <Zap size={22} /> Assessment Matrix
                </h4>
                <div className="space-y-4 relative z-10">
                   {activeTab === 'classification' && (
                     <div className="space-y-3">
                        {current.types.map((type: any, i: number) => (
                           <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center group hover:bg-white/10">
                              <div>
                                 <h5 className="text-[11px] font-black text-emerald-400 uppercase">{type.id}</h5>
                                 <p className="text-[10px] text-slate-400 italic">{type.d}</p>
                              </div>
                              <span className="text-[10px] font-black text-white/40">{type.name}</span>
                           </div>
                        ))}
                     </div>
                   )}
                   {activeTab === 'surgical' && current.options.map((opt: any, i: number) => (
                     <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-3xl group hover:bg-white/10 transition-all">
                        <h5 className="text-[11px] font-black text-emerald-400 uppercase mb-1">{opt.type}</h5>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{opt.ind}</p>
                     </div>
                   ))}
                   {(activeTab === 'biomechanics' || activeTab === 'systemic') && (
                     <div className="space-y-6">
                        <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                           <h5 className="text-[10px] font-black text-emerald-400 uppercase mb-2">Biological Principle</h5>
                           <p className="text-xs text-slate-300 leading-relaxed italic">{current.reaming || current.triad}</p>
                        </div>
                        <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                           <h5 className="text-[10px] font-black text-emerald-400 uppercase mb-2">Clinical Implication</h5>
                           <p className="text-xs text-slate-300 leading-relaxed italic">{current.biology || current.gurd}</p>
                        </div>
                     </div>
                   )}
                </div>
                <Maximize2 className="absolute -bottom-10 -right-10 text-white/5" size={240} />
             </div>

             {/* RIGHT: Actions & Clinical Judgment */}
             <div className="space-y-6">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                   <h4 className="text-lg font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter">
                      <Stethoscope size={22} className="text-emerald-600" /> Surgeon's Command
                   </h4>
                   <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl text-center">
                      <p className="text-sm text-emerald-900 font-bold leading-relaxed italic text-center">
                        {activeTab === 'classification' ? "Look for 'butterfly' fragments. If the cortex isn't touching, you MUST use static interlocking screws to prevent leg shortening." : 
                         activeTab === 'biomechanics' ? "If the patient is in severe pulmonary distress (ARDS), avoid reaming. Consider an unreamed nail or external fixation first." : 
                         activeTab === 'surgical' ? "In an obese patient, a retrograde entry through the knee is technically easier and avoids 'burying' the nail in soft tissue." : 
                         "If you see petechiae in the axilla or conjunctiva after a femur fracture, start aggressive oxygen and support. Do not wait for a CT scan."}
                      </p>
                   </div>
                </div>

                <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                   <h5 className="text-[10px] font-black text-emerald-400 uppercase mb-3 flex items-center gap-2">
                     <AlertTriangle size={14} className="text-red-500" /> Diagnostic Pearl
                   </h5>
                   <p className="text-xs font-medium leading-relaxed italic opacity-90">
                      {activeTab === 'systemic' ? "Fat Embolism isn't just about 'fat blocks'. It's a chemical pneumonitis caused by free fatty acids attacking lung tissue." : 
                       activeTab === 'biomechanics' ? "Static locking (screws at both ends) prevents rotation AND length loss. Dynamic locking is only for delayed healing." : 
                       activeTab === 'classification' ? "Winquist IV fractures are essentially 'floating' segments. Alignment is key; length is secondary to stable fixation." :
                       "Always check for a femoral neck fracture on the same side. They are missed in 5% of shaft cases and require separate fixation."}
                   </p>
                   <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                </div>
             </div>
          </div>

          {/* Kinetic Energy Area */}
          <div className="bg-emerald-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-2/3">
                   <h4 className="text-2xl font-black mb-4 flex items-center gap-3">
                     <Crosshair size={24} className="text-emerald-300" /> The Polytrauma Priority
                   </h4>
                   <p className="text-sm text-slate-300 leading-relaxed italic">
                      "A femoral shaft fracture is a 1.5-liter blood loss event. In a polytrauma patient, 'Early Total Care' (nailing within 24h) is the gold standard UNLESS the patient is in the 'Lethal Triad' (acidosis, hypothermia, coagulopathy). In those cases, use Damage Control (External Fixation)."
                   </p>
                </div>
                <div className="md:w-1/3 flex justify-center text-center">
                   <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest">
                      Blood Loss {' ≈ '} 1.5L
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* Legend */}
        <footer className="mt-auto px-10 py-8 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/80">
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-emerald-600 shadow-sm"></div> Cortical Core</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-red-600 shadow-sm"></div> FES Risk</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-slate-900 shadow-sm"></div> IM Splinting</div>
           <div className="flex items-center gap-2 text-slate-800 uppercase italic font-bold">Apley Femoral Shaft Hub v1.0</div>
        </footer>
      </div>
    </div>
  );
};

export default FemoralShaftApleyLab;
