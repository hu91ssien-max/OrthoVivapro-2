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
  ArrowUpRight,
  Crosshair,
  Wind,
  RotateCw,
  Compass
} from 'lucide-react';

const SUBTROCH_DATA: any = {
  classification: {
    title: "Seinsheimer Classification",
    niche: "Fragmentation & Stability",
    types: [
      { id: "Type I", name: "Undisplaced", d: "Less than 2mm displacement." },
      { id: "Type II", name: "Two-part", d: "Transverse, spiral, or oblique." },
      { id: "Type III", name: "Three-part", d: "Includes a third fragment (usually the lesser or greater troch)." },
      { id: "Type IV", name: "Comminuted", d: "Four or more fragments." },
      { id: "Type V", name: "Subtroch-Intertroch", d: "Extension into the trochanteric mass." }
    ],
    pearl: "Seinsheimer types IV and V are the most likely to result in non-union if not bridged perfectly."
  },
  deformity: {
    title: "The Triad of Deformity",
    niche: "Muscle Power Mechanics",
    proximal: [
      { name: "Flexion", m: "Iliopsoas", d: "Pulls the proximal fragment forward." },
      { name: "Abduction", m: "Gluteus Medius", d: "Pulls the proximal fragment outward." },
      { name: "External Rotation", m: "Short Rotators", d: "Tilts the head/neck backward." }
    ],
    distal: "The distal fragment is pulled into Adduction (adductor muscles) and Shortened (hamstrings/quads).",
    pearl: "Successful nailing requires neutralizing the proximal fragment before the wire crosses the fracture."
  },
  biomechanics: {
    title: "The Tensile Lateral Wall",
    niche: "Stress Concentration",
    forces: "The subtrochanteric region experiences the highest tensile forces on the lateral cortex and highest compressive forces medially.",
    implant: "An intramedullary (IM) nail is a load-sharing device with a shorter lever arm than a plate, making it the gold standard.",
    biology: "This is cortical bone; healing is slower than the trochanteric region and requires anatomical alignment of the medial 'buttress'.",
    pearl: "If the medial cortex is not apposed, the lateral implant will eventually fatigue and snap."
  },
  complications: {
    title: "The Non-Union Threat",
    niche: "Biological Failure",
    risks: [
      { name: "Varus Mal-union", d: "The most common failure; due to poor reduction at the time of nailing." },
      { name: "Implant Breakage", d: "Occurs when the bone doesn't heal (non-union) and the metal takes 100% of the load." },
      { name: "Bisphosphonates", d: "Atypical fractures with 'beaking' and transverse lines. Slow healing biology." }
    ],
    pearl: "A 'varus' reduction is the kiss of death for a subtrochanteric nail."
  }
};

const SubtrochantericApleyLab = () => {
  const [activeTab, setActiveTab] = useState('classification');

  const current = useMemo(() => SUBTROCH_DATA[activeTab], [activeTab]);

  return (
    <div className="flex flex-col lg:flex-row min-h-[600px] bg-slate-50 font-sans text-slate-900 rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-slate-900 text-white flex flex-col shadow-2xl">
        <div className="p-8 border-b border-white/5 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-purple-600 rounded-xl shadow-lg">
              <Compass size={20} className="text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase italic">Trauma-OS</span>
          </div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic text-center">Subtroch Hub</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto no-scrollbar">
          {[
            { id: 'classification', label: 'Seinsheimer Matrix', icon: Layers },
            { id: 'deformity', label: 'Deforming Forces', icon: RotateCw },
            { id: 'biomechanics', label: 'Stress Mechanics', icon: Activity },
            { id: 'complications', label: 'Complications', icon: ShieldAlert }
          ].map((item) => {
            const SidebarIcon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${activeTab === item.id ? 'bg-purple-600 text-white shadow-xl translate-x-1' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
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
            <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1 italic">Apley's Axiom</p>
            <p className="text-[11px] text-slate-300 font-medium leading-tight italic">
              "The subtrochanteric region is where biomechanics meets a biological desert."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative bg-slate-50 overflow-y-auto max-h-[800px]">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Femoral Shaft - Proximal Zone</h2>
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{current.title}</h1>
          </div>
          <div className="hidden md:flex gap-3">
             <div className="px-4 py-1.5 bg-purple-50 text-purple-700 rounded-full border border-purple-100 flex items-center gap-2">
                <Hammer size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest italic tracking-tight">IM Nailing Choice</span>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 w-full">
          
          {/* Visual Hero Card */}
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="p-8 bg-purple-50 text-purple-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                   {activeTab === 'deformity' ? <RotateCw size={48} /> : <ArrowUpRight size={48} />}
                </div>
                <div className="text-center md:text-left flex-1">
                   <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                     <span className="text-purple-600 font-black text-xs uppercase tracking-widest">{current.niche}</span>
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
                <h4 className="text-lg font-black mb-8 flex items-center gap-3 text-purple-400 uppercase tracking-tighter">
                   <Zap size={22} /> Anatomical Matrix
                </h4>
                <div className="space-y-4 relative z-10">
                   {activeTab === 'classification' && (
                     <div className="space-y-3">
                        {current.types.map((type: any, i: number) => (
                           <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-purple-400 uppercase">{type.id}</h5>
                                 <span className="text-[10px] font-black text-white">{type.name}</span>
                              </div>
                              <p className="text-[10px] text-slate-400 italic">{type.d}</p>
                           </div>
                        ))}
                     </div>
                   )}
                   {activeTab === 'deformity' && (
                     <div className="space-y-4">
                        <h5 className="text-[10px] font-black text-purple-400 uppercase">Proximal Forces</h5>
                        {current.proximal.map((p: any, i: number) => (
                           <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
                              <div className="w-8 h-8 rounded bg-purple-600 flex items-center justify-center font-black text-[10px] shrink-0">
                                 {p.name[0]}
                              </div>
                              <div>
                                 <p className="text-[11px] font-black text-white">{p.name} ({p.m})</p>
                                 <p className="text-[10px] text-slate-400">{p.d}</p>
                              </div>
                           </div>
                        ))}
                        <div className="mt-4 p-4 bg-red-900/20 border border-red-900/30 rounded-2xl">
                           <h5 className="text-[10px] font-black text-red-400 uppercase mb-1">Distal Fragment</h5>
                           <p className="text-[10px] text-red-200 italic">{current.distal}</p>
                        </div>
                     </div>
                   )}
                   {(activeTab === 'biomechanics' || activeTab === 'complications') && (
                     <div className="space-y-6">
                        <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                           <h5 className="text-[10px] font-black text-purple-400 uppercase mb-2">Mechanism / Pathobiology</h5>
                           <p className="text-xs text-slate-300 leading-relaxed italic">{current.forces || current.risks[0].d}</p>
                        </div>
                        <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                           <h5 className="text-[10px] font-black text-purple-400 uppercase mb-2">Implant Logic / Atypical</h5>
                           <p className="text-xs text-slate-300 leading-relaxed italic">{current.implant || current.risks[2].d}</p>
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
                      <Stethoscope size={22} className="text-purple-600" /> Surgeon's Command
                   </h4>
                   <div className="p-6 bg-purple-50 border border-purple-100 rounded-3xl text-center">
                      <p className="text-sm text-purple-900 font-bold leading-relaxed italic">
                        {activeTab === 'classification' ? "Type V fractures extension means you need a cephalomedullary nail (screwing into the head) rather than a simple diaphyseal nail." : 
                         activeTab === 'deformity' ? "To neutralize the proximal fragment, flex and abduct the patient's leg on the fracture table, or use a 'joystick' percutaneously." : 
                         activeTab === 'biomechanics' ? "If the medial cortex is comminuted, the nail must take all the weight. Warn the patient about restricted weight bearing." : 
                         "If you see a transverse fracture with thickened cortices in a patient on long-term Alendronate, assume an atypical stress fracture."}
                      </p>
                   </div>
                </div>

                <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                   <h5 className="text-[10px] font-black text-purple-400 uppercase mb-3 flex items-center gap-2">
                     <AlertTriangle size={14} className="text-red-500" /> Diagnostic Pearl
                   </h5>
                   <p className="text-xs font-medium leading-relaxed italic opacity-90">
                      {activeTab === 'deformity' ? "The 'Flexion' of the proximal fragment is the most difficult to correct. You often need a mallet or a Schanz screw to push it down." : 
                       activeTab === 'biomechanics' ? "Locked plating is an alternative, but it is load-bearing. If the medial wall doesn't heal, the plate WILL snap." : 
                       activeTab === 'classification' ? "Subtrochanteric bone is mostly cortical. Unlike the intertroch region, it has poor vascularity and heals slowly." :
                       "Always examine the whole femur. Associated femoral neck fractures are missed in up to 10% of subtrochanteric trauma."}
                   </p>
                   <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                </div>
             </div>
          </div>

          {/* Biomechanical Force Area */}
          <div className="bg-purple-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-2/3">
                   <h4 className="text-2xl font-black mb-4 flex items-center gap-3">
                     <Crosshair size={24} className="text-purple-300" /> The Medial Buttress
                   </h4>
                   <p className="text-sm text-slate-300 leading-relaxed italic">
                      "In subtrochanteric surgery, the medial cortex is your best friend. If you can achieve anatomical contact on the medial side, the compression forces are shared by the bone. If you leave a gap, the metal is the only thing standing between the patient and a revision surgery."
                   </p>
                </div>
                <div className="md:w-1/3 flex justify-center text-center">
                   <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest">
                      Medial Contact {' > '} Metal Strength
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* Legend */}
        <footer className="mt-auto px-10 py-8 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/80">
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-purple-600 shadow-sm"></div> Cortical Zone</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-red-600 shadow-sm"></div> High Tension</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-slate-900 shadow-sm"></div> IM Nail Logic</div>
           <div className="flex items-center gap-2 text-slate-800 uppercase italic font-bold">Apley Subtroch Hub v1.0</div>
        </footer>
      </div>
    </div>
  );
};

export default SubtrochantericApleyLab;
