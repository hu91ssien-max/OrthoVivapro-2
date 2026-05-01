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
  ArrowDownCircle,
  Crosshair,
  Wind
} from 'lucide-react';

const IT_DATA: any = {
  classification: {
    title: "Evans Stability Matrix",
    niche: "Predicting Collapse",
    stable: [
      { id: "Type I", d: "Undisplaced, 2-part fracture. Minimal risk of collapse." },
      { id: "Type II", d: "Displaced, but posteromedial cortex is intact. Resists varus." }
    ],
    unstable: [
      { id: "Type III", d: "3-part fracture with loss of posteromedial support (Lesser Trochanter)." },
      { id: "Type IV", d: "4-part fracture with comminution of both trochanters." },
      { id: "Type V", d: "Reverse Obliquity. Mechanically unstable for SHS." }
    ],
    pearl: "Stability is defined by the integrity of the posteromedial wall (the lesser trochanter)."
  },
  biomechanics: {
    title: "The Physics of Failure",
    niche: "Controlled Collapse",
    mechanics: "The SHS allows the fracture to collapse along the axis of the screw until the bone fragments abut and share the load.",
    danger: "If the fracture is 'unstable,' the collapse is uncontrolled, leading to medialization of the shaft and limb shortening.",
    biology: "Extracapsular bone has a high healing potential; non-union is rare, but mal-union (varus) is common.",
    pearl: "In IT fractures, we don't fight biology; we manage mechanical geometry."
  },
  implants: {
    title: "SHS vs. Intramedullary Nail",
    niche: "Implant Selection",
    options: [
      { type: "Sliding Hip Screw (SHS)", ind: "Gold standard for STABLE IT fractures (Evans I/II)." },
      { type: "Cephalomedullary Nail", ind: "Required for UNSTABLE fractures, Reverse Obliquity, or lack of lateral wall support." },
      { type: "Replacement", ind: "Rarely indicated unless there is severe pre-existing osteoarthritis." }
    ],
    logic: "Nails have a shorter lever arm and act as a load-sharing device closer to the center of gravity.",
    pearl: "The 'Reverse Oblique' fracture is a nail's best friend and a screw's worst enemy."
  },
  complications: {
    title: "The 'Cut-Out' Equation",
    niche: "Technical Precision",
    tad: "Tip-Apex Distance (TAD): Sum of distance from screw tip to apex on AP and Lateral views.",
    threshold: "TAD must be < 25mm. Above this, the risk of the screw 'cutting out' through the superior head is massive.",
    failure: "Most failures are technical (poor reduction, high TAD, or incorrect implant choice for the pattern).",
    pearl: "A perfect reduction is useless if the TAD is > 25mm; the bone will always win against poorly placed metal."
  }
};

const IntertrochantericApleyLab = () => {
  const [activeTab, setActiveTab] = useState('classification');
  const current = useMemo(() => IT_DATA[activeTab], [activeTab]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 flex flex-col gap-2">
        <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-1.5 bg-orange-600 rounded-lg">
              <Settings size={16} className="text-white" />
            </div>
            <span className="text-[11px] font-black text-white uppercase tracking-tighter">Apley IT Lab</span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium italic leading-tight">
            "In neck fractures, the bone dies. In trochanteric fractures, the bone lives but the patient might not."
          </p>
        </div>
        
        <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
          {[
            { id: 'classification', label: 'Evans Matrix', icon: Layers },
            { id: 'biomechanics', label: 'Biomechanics', icon: Activity },
            { id: 'implants', label: 'Implant Choice', icon: Scale },
            { id: 'complications', label: 'TAD & Failure', icon: ShieldAlert }
          ].map((item) => {
            const SidebarIcon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-1 lg:flex-none flex items-center justify-between px-4 py-3 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap ${activeTab === item.id ? 'bg-orange-600 text-white shadow-xl' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
              >
                <div className="flex items-center gap-2">
                  <SidebarIcon size={14} />
                  {item.label}
                </div>
                <ChevronRight size={12} className={`hidden lg:block ${activeTab === item.id ? 'opacity-100' : 'opacity-0'}`} />
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 space-y-6">
        {/* Visual Hero Card */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
           <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="p-6 bg-orange-50 text-orange-600 rounded-3xl shadow-inner transition-transform group-hover:rotate-6 duration-500">
                 <ArrowDownCircle size={32} />
              </div>
              <div className="text-center md:text-left flex-1">
                 <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                   <span className="text-orange-600 font-black text-[10px] uppercase tracking-widest">{current.niche}</span>
                   <div className="w-1 h-1 rounded-full bg-slate-200" />
                   <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic">Apley Lab</span>
                 </div>
                 <h3 className="text-2xl font-black text-slate-800 tracking-tighter mb-2">{current.title}</h3>
                 <p className="text-sm text-slate-500 font-medium leading-relaxed italic">"{current.pearl}"</p>
              </div>
           </div>
           <Bone className="absolute bottom-[-40px] right-[-40px] text-slate-100 opacity-50" size={200} />
        </div>

        {/* Deep Content Grid */}
        <div className="grid md:grid-cols-2 gap-6">
           {/* LEFT: Structural Logic */}
           <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
              <h4 className="text-sm font-black mb-6 flex items-center gap-2 text-orange-400 uppercase tracking-tighter">
                 <Zap size={18} /> Assessment Matrix
              </h4>
              <div className="space-y-3 relative z-10">
                 {activeTab === 'classification' && (
                   <div className="space-y-4">
                      <h5 className="text-[9px] font-black text-orange-400 uppercase">Stable Patterns (SHS Ideal)</h5>
                      {current.stable.map((s: any, i: number) => (
                         <div key={i} className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                            <span className="text-[10px] font-black text-white mr-2">{s.id}:</span>
                            <span className="text-[10px] text-slate-400 italic">{s.d}</span>
                         </div>
                      ))}
                      <h5 className="text-[9px] font-black text-orange-400 uppercase mt-2">Unstable Patterns (Nail Preferred)</h5>
                      {current.unstable.map((u: any, i: number) => (
                         <div key={i} className="p-2.5 bg-red-900/20 border border-red-900/30 rounded-xl">
                            <span className="text-[10px] font-black text-red-200 mr-2">{u.id}:</span>
                            <span className="text-[10px] text-red-300/60 italic">{u.d}</span>
                         </div>
                      ))}
                   </div>
                 )}
                 {activeTab === 'implants' && current.options.map((opt: any, i: number) => (
                   <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                      <div className="flex justify-between items-center mb-1">
                         <h5 className="text-[10px] font-black text-orange-400 uppercase">{opt.type}</h5>
                         <Target size={12} className="text-slate-600" />
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium italic">{opt.ind}</p>
                   </div>
                 ))}
                 {(activeTab === 'biomechanics' || activeTab === 'complications') && (
                   <div className="space-y-4">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                         <h5 className="text-[9px] font-black text-orange-400 uppercase mb-1">Mechanism / Biology</h5>
                         <p className="text-[11px] text-slate-300 italic">{current.mechanics || current.tad}</p>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                         <h5 className="text-[9px] font-black text-orange-400 uppercase mb-1">Clinical Risk</h5>
                         <p className="text-[11px] text-slate-300 italic">{current.danger || current.threshold}</p>
                      </div>
                   </div>
                 )}
              </div>
              <Maximize2 className="absolute -bottom-6 -right-6 text-white/5" size={150} />
           </div>

           {/* RIGHT: Actions & Clinical Judgment */}
           <div className="space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                 <h4 className="text-sm font-black mb-4 flex items-center gap-2 text-slate-400 uppercase tracking-tighter">
                    <Stethoscope size={18} className="text-orange-600" /> Surgeon's Command
                 </h4>
                 <div className="p-5 bg-orange-50 border border-orange-100 rounded-2xl">
                    <p className="text-xs text-orange-900 font-bold italic leading-relaxed">
                      {activeTab === 'classification' ? "Look for the lesser trochanter fragment. If it is large and displaced, the fracture is intrinsically unstable." : 
                       activeTab === 'biomechanics' ? "Load-sharing is the goal. In stable fractures, the bone shares the load with the screw. In unstable ones, the nail carries it all." : 
                       activeTab === 'implants' ? "For Reverse Oblique fractures, an SHS will simply slide the shaft medially, resulting in total failure. Use a Nail." : 
                       "Always aim for 'Center-Center' placement of the lag screw on both AP and Lateral views to minimize TAD."}
                    </p>
                 </div>
              </div>

              <div className="p-6 bg-slate-900 text-white rounded-[2rem] relative overflow-hidden shadow-xl border border-white/5">
                 <h5 className="text-[9px] font-black text-orange-400 uppercase mb-2 flex items-center gap-2">
                   <AlertTriangle size={12} className="text-red-500" /> Diagnostic Pearl
                 </h5>
                 <p className="text-[11px] font-medium italic opacity-90 leading-relaxed">
                    {activeTab === 'complications' ? "TAD is the single most important predictor of screw cut-out. If your TAD is > 25mm, go back and reposition the screw." : 
                     activeTab === 'implants' ? "The lateral wall must be intact to use an SHS. If the lateral wall is fractured, the screw will have no 'buttress' and will fail." : 
                     activeTab === 'classification' ? "Most IT fractures are high-energy in the young and low-energy in the elderly. Bone density determines the failure mode." :
                     "A Sliding Hip Screw is a 'dynamic' implant. It expects collapse. Don't worry about 5-10mm of shortening if the alignment is maintained."}
                 </p>
                 <Wind className="absolute top-2 right-2 text-white/5" size={40} />
              </div>
           </div>
        </div>

        {/* High-Yield Graphic Area */}
        <div className="bg-orange-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-2/3">
                 <h4 className="text-lg font-black mb-2 flex items-center gap-2">
                   <Crosshair size={18} className="text-orange-300" /> The Lateral Wall Anchor
                 </h4>
                 <p className="text-[11px] text-slate-300 italic leading-relaxed">
                    "Recent literature has highlighted that the 'Lateral Wall' thickness is as critical as the posteromedial cortex. If the lateral wall is thinner than 20.5mm, it is likely to fracture during SHS insertion, turning a stable fracture into an unstable one."
                 </p>
              </div>
              <div className="md:w-1/3 flex justify-end">
                 <div className="px-6 py-2.5 bg-white/10 border border-white/20 rounded-full font-black text-[9px] uppercase tracking-widest whitespace-nowrap">
                    Wall {' > '} 20.5mm
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default IntertrochantericApleyLab;
