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
  Anchor,
  Compass
} from 'lucide-react';

const DISTAL_DATA: any = {
  classification: {
    title: "AO/OTA 33 Matrix",
    niche: "The Articular Spectrum",
    types: [
      { id: "Type A", name: "Extra-Articular", d: "Supracondylar fractures; the joint surface is intact." },
      { id: "Type B", name: "Partial Articular", d: "One condyle is fractured (e.g., Hoffa coronal fracture)." },
      { id: "Type C", name: "Complete Articular", d: "The joint is separated from the shaft (Y or T patterns)." },
      { id: "Hoffa", name: "Coronal Fragment", d: "Vertical fracture through the posterior condyle (Type B3)." }
    ],
    pearl: "Anatomic reduction of the joint (Type C) is non-negotiable to prevent post-traumatic arthritis."
  },
  biomechanics: {
    title: "The Recurvatum Force",
    niche: "Muscle Deforming Vectors",
    mechanics: "The Gastrocnemius originates on the condyles and pulls the distal fragment into posterior tilt (recurvatum).",
    quadriceps: "The Quads and Hamstrings cause shortening by pulling the distal fragment proximally.",
    alignment: "Restoring the 'Mechanical Axis' is critical—even 5 degrees of valgus/varus leads to early joint failure.",
    pearl: "The Gastrocnemius is your enemy in the distal femur; it wants to tilt the fragment into the popliteal space."
  },
  surgical: {
    title: "Fixation Strategy",
    niche: "Plating vs. Nailing",
    options: [
      { type: "Lateral Locking Plate", ind: "The 'workhorse'. Allows for multiple fixed-angle screws in the condyles." },
      { type: "Retrograde IM Nail", ind: "Better for extra-articular (Type A) or simple articular (Type C1) patterns." },
      { type: "Dual Plating", ind: "Reserved for extreme comminution or very low fractures where lateral-only is unstable." }
    ],
    logic: "Locking plates are superior in osteoporotic bone where 'pull-out' is a high risk.",
    pearl: "A locking plate acts as an internal fixator, preserving periosteal blood supply."
  },
  vascular: {
    title: "The Popliteal Danger",
    niche: "Vascular Proximity",
    triad: "Adductor Hiatus, Popliteal Artery, Posterior Tilt.",
    timing: "The artery is tethered at the adductor hiatus; posterior displacement of the fragment can lacerate or occlude it.",
    abi: "Ankle-Brachial Index (ABI) is mandatory for any displaced distal femur fracture.",
    pearl: "A 'cool foot' after a distal femur injury is a surgical emergency until proven otherwise."
  }
};

const DistalFemurApleyLab = () => {
  const [activeTab, setActiveTab] = useState('classification');

  const current = useMemo(() => DISTAL_DATA[activeTab], [activeTab]);

  return (
    <div className="flex flex-col lg:flex-row min-h-[600px] bg-slate-50 font-sans text-slate-900 rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-slate-900 text-white flex flex-col shadow-2xl">
        <div className="p-8 border-b border-white/5 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg">
              <Anchor size={20} className="text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase italic">Trauma-OS</span>
          </div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic text-center">Distal Femur Hub</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto no-scrollbar">
          {[
            { id: 'classification', label: 'AO/OTA 33', icon: Layers },
            { id: 'biomechanics', label: 'Recurvatum Forces', icon: Activity },
            { id: 'surgical', label: 'Plating & Nailing', icon: Hammer },
            { id: 'vascular', label: 'Popliteal Risk', icon: ShieldAlert }
          ].map((item) => {
            const SidebarIcon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-xl translate-x-1' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
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
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1 italic">Articular Rule</p>
            <p className="text-[11px] text-slate-300 font-medium leading-tight italic">
              "Restoring the joint surface is a game of millimeters, not centimeters."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative bg-slate-50 overflow-y-auto max-h-[800px]">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Peri-Articular Knee Trauma</h2>
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{current.title}</h1>
          </div>
          <div className="hidden md:flex gap-3">
             <div className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-100 flex items-center gap-2">
                <Target size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest italic tracking-tight">Anatomic Realignment</span>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 w-full">
          
          {/* Visual Hero Card */}
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="p-8 bg-blue-50 text-blue-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:-rotate-12 duration-500">
                   {activeTab === 'vascular' ? <ShieldAlert size={48} /> : <Compass size={48} />}
                </div>
                <div className="text-center md:text-left flex-1">
                   <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                     <span className="text-blue-600 font-black text-xs uppercase tracking-widest">{current.niche}</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                     <span className="text-slate-400 font-black text-xs uppercase tracking-widest italic">Joint Terminal Lab</span>
                   </div>
                   <h3 className="text-4xl font-black text-slate-800 tracking-tighter mb-4">{current.title}</h3>
                   <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{current.pearl}"</p>
                </div>
             </div>
             <Bone className="absolute top-[-60px] left-[-60px] text-slate-50 opacity-50 rotate-180" size={400} />
          </div>

          {/* Deep Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
             {/* LEFT: Technical Details */}
             <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                <h4 className="text-lg font-black mb-8 flex items-center gap-3 text-blue-400 uppercase tracking-tighter">
                   <Zap size={22} /> Assessment Matrix
                </h4>
                <div className="space-y-4 relative z-10">
                   {activeTab === 'classification' && (
                     <div className="space-y-3">
                        {current.types.map((type: any, i: number) => (
                           <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center group hover:bg-white/10">
                              <div>
                                 <h5 className="text-[11px] font-black text-blue-400 uppercase">{type.id}</h5>
                                 <p className="text-[10px] text-slate-400 italic">{type.d}</p>
                              </div>
                              <span className="text-[10px] font-black text-white/40">{type.name}</span>
                           </div>
                        ))}
                     </div>
                   )}
                   {activeTab === 'surgical' && current.options.map((opt: any, i: number) => (
                     <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-3xl group hover:bg-white/10 transition-all">
                        <h5 className="text-[11px] font-black text-blue-400 uppercase mb-1">{opt.type}</h5>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{opt.ind}</p>
                     </div>
                   ))}
                   {(activeTab === 'biomechanics' || activeTab === 'vascular') && (
                     <div className="space-y-6">
                        <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                           <h5 className="text-[10px] font-black text-blue-400 uppercase mb-2">Biomechanical Hazard</h5>
                           <p className="text-xs text-slate-300 leading-relaxed italic">{current.mechanics || current.triad}</p>
                        </div>
                        <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                           <h5 className="text-[10px] font-black text-blue-400 uppercase mb-2">Clinical Implication</h5>
                           <p className="text-xs text-slate-300 leading-relaxed italic">{current.alignment || current.abi}</p>
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
                      <Stethoscope size={22} className="text-blue-600" /> Surgeon's Command
                   </h4>
                   <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl text-center">
                      <p className="text-sm text-blue-900 font-bold leading-relaxed italic">
                        {activeTab === 'classification' ? "Beware the Hoffa fracture. It's often invisible on AP X-rays. If there's any suspicion, get a CT scan to identify this coronal fragment." : 
                         activeTab === 'biomechanics' ? "During reduction, flex the knee to relax the gastrocnemius. This makes it significantly easier to correct the posterior tilt." : 
                         activeTab === 'surgical' ? "For osteoporotic bone, 'Fixed Angle' screws are mandatory. Standard screws will likely fail and 'plow' through the soft bone." : 
                         "Never assume the pulse is 'just weak due to swelling.' If the ABI is < 0.9, the next step is an Angiogram or CT-Angiogram immediately."}
                      </p>
                   </div>
                </div>

                <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                   <h5 className="text-[10px] font-black text-blue-400 uppercase mb-3 flex items-center gap-2">
                     <AlertTriangle size={14} className="text-yellow-500" /> Technical Pearl
                   </h5>
                   <p className="text-xs font-medium leading-relaxed italic opacity-90">
                      {activeTab === 'vascular' ? "The artery is most at risk at the level of the adductor tubercle, where it passes through the hiatus into the popliteal fossa." : 
                       activeTab === 'biomechanics' ? "The 'Sway' of the distal femur means the lateral cortex is thin and the medial cortex is strong. Plates must be laterally based." : 
                       activeTab === 'classification' ? "Type B fractures are inherently unstable. They require lag screw fixation to create compression across the joint surface." :
                       "In very low fractures, the 'bridge' between the joint and the plate is short. Use at least 4-5 locking screws in the distal fragment for stability."}
                   </p>
                   <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                </div>
             </div>
          </div>

          {/* The Knee-Shaft Paradox Area */}
          <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-2/3">
                   <h4 className="text-2xl font-black mb-4 flex items-center gap-3">
                     <Settings size={24} className="text-blue-300" /> The Arthroplasty Contingency
                   </h4>
                   <p className="text-sm text-slate-300 leading-relaxed italic">
                      "In elderly patients with severe pre-existing arthritis and a comminuted distal femur fracture (Type C3), fixation often fails. Consider 'Distal Femoral Replacement' (DFR) as a primary treatment to allow immediate full weight-bearing and avoid the morbidity of prolonged bed rest."
                   </p>
                </div>
                <div className="md:w-1/3 flex justify-center text-center">
                   <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest">
                      DFR {'>'} ORIF (Elderly)
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* Legend */}
        <footer className="mt-auto px-10 py-8 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/80">
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-blue-600 shadow-sm"></div> Joint Surface</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-yellow-500 shadow-sm"></div> Popliteal Artery</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-slate-900 shadow-sm"></div> Locking Fixation</div>
           <div className="flex items-center gap-2 text-slate-800 uppercase italic font-bold">Apley Distal Femur Hub v1.0</div>
        </footer>
      </div>
    </div>
  );
};

export default DistalFemurApleyLab;
