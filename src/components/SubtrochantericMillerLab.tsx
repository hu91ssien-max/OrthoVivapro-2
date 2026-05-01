import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  ChevronRight, 
  Zap, 
  Layers, 
  Target, 
  ShieldAlert, 
  Search, 
  Scale, 
  ArrowUp,
  AlertCircle,
  Wind,
  Hand,
  Hammer,
  Settings,
  Stethoscope
} from 'lucide-react';

const SUBTROCH_DATA: any = {
  deforming: {
    title: "Deforming Forces",
    niche: "Muscle Biomechanics",
    factors: [
      { id: "Proximal: Flexion", d: "Driven by the Iliopsoas; pulls the proximal fragment anteriorly." },
      { id: "Proximal: Abduction", d: "Driven by the Gluteus Medius/Minimus; pulls the fragment laterally." },
      { id: "Proximal: Ext. Rotation", d: "Driven by the short external rotators." },
      { id: "Distal: Adduction", d: "Driven by the adductor group; pulls the shaft medially and proximally." }
    ],
    pearl: "The 'Classic' subtroch deformity is Flexion, Abduction, and External Rotation of the proximal fragment."
  },
  seinsheimer: {
    title: "Seinsheimer Classification",
    niche: "Fracture Morphology",
    types: [
      { id: "Type I", d: "Nondisplaced or <2mm displacement." },
      { id: "Type II", d: "Two-part fracture (A: Transverse, B: Spiral/LT on proximal, C: Spiral/LT on distal)." },
      { id: "Type III", d: "Three-part fracture (A: Includes LT, B: Butterfly fragment)." },
      { id: "Type IV", d: "Comminuted fracture with 4 or more fragments." },
      { id: "Type V", d: "Subtrochanteric fracture extending into the greater trochanter." }
    ],
    pearl: "Seinsheimer Type V fractures are particularly difficult as they compromise the 'starting point' for standard IM nails."
  },
  reduction: {
    title: "Reduction Maneuvers",
    niche: "Technical Mastery",
    tips: [
      { id: "The 'Joystick'", d: "Using a percutaneous Schanz pin in the proximal fragment to counteract flexion/abduction." },
      { id: "Percutaneous Clamps", d: "Used to hold spiral patterns while the nail is passed to prevent displacement." },
      { id: "Lateral Decubitus", d: "Often preferred over supine/fracture table to allow the proximal fragment to drop into a neutral position." }
    ],
    pearl: "Avoid the 'Malreduction Pitfall': Never ream or pass a nail until the fracture is anatomically reduced on both AP and Lateral views."
  },
  fixation: {
    title: "Fixation Strategy",
    niche: "IM Nail vs. Plating",
    choices: [
      { name: "Cephalomedullary Nail", group: "Gold Standard", d: "Load-sharing device. Superior for comminuted and osteoporotic bone." },
      { name: "Fixed-Angle Plate (95°)", group: "Salvage/Specific", d: "Used when the medullary canal is obstructed or in specific nonunions." },
      { name: "Starting Point", d: "Greater Trochanteric (GT) vs. Piriformis Fossa. GT is easier but may cause more abductor damage." }
    ],
    pearl: "Intramedullary fixation is biologically superior due to its load-sharing properties and preservation of the fracture hematoma."
  },
  complications: {
    title: "The Failure Screen",
    niche: "Nonunion & Hardware Breakage",
    risks: [
      { name: "Nonunion", d: "Common in subtroch due to high tensile stress on the lateral cortex and cortical bone thickness." },
      { name: "Hardware Breakage", d: "Occurs at the nail-screw interface or the 'lag screw hole' if healing is delayed." },
      { name: "Malrotation", d: "A common technical error; always compare to the contralateral limb." }
    ],
    pearl: "The subtrochanteric region is an area of high tensile stress. If bone healing is delayed, the metal WILL fail (fatigue)."
  }
};

const SubtrochantericMillerLab = () => {
  const [activeTab, setActiveTab] = useState('deforming');

  const current = useMemo(() => SUBTROCH_DATA[activeTab], [activeTab]);

  return (
    <div className="flex flex-col lg:flex-row min-h-[600px] bg-slate-50 font-sans text-slate-900 rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-slate-950 text-white flex flex-col shadow-2xl">
        <div className="p-8 border-b border-white/5 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-orange-600 rounded-xl shadow-lg">
              <Hammer size={20} className="text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase italic">Subtroch-Master</span>
          </div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic text-center">Biomechanical Trauma</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto no-scrollbar">
          {[
            { id: 'deforming', label: 'Deforming Forces', icon: Activity },
            { id: 'seinsheimer', label: 'Seinsheimer Class', icon: Layers },
            { id: 'reduction', label: 'Reduction Tips', icon: Target },
            { id: 'fixation', label: 'Fixation Logic', icon: Settings },
            { id: 'complications', label: 'Failure Risks', icon: ShieldAlert }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${activeTab === item.id ? 'bg-orange-600 text-white shadow-xl translate-x-1' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} />
                  {item.label}
                </div>
                <ChevronRight size={14} className={activeTab === item.id ? 'opacity-100' : 'opacity-0'} />
              </button>
            );
          })}
        </nav>
        
        <div className="p-6 bg-slate-900/50">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1 italic">Biomechanical Rule</p>
            <p className="text-[11px] text-slate-300 font-medium leading-tight italic">
              "The subtroch region has the highest tensile stresses in the entire skeleton."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative bg-slate-50 overflow-y-auto max-h-[800px]">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Femoral Trauma Lab</h2>
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{current.title}</h1>
          </div>
          <div className="hidden md:flex gap-3">
             <div className="px-4 py-1.5 bg-orange-50 text-orange-700 rounded-full border border-orange-100 flex items-center gap-2">
                <Stethoscope size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest italic tracking-tight">Surgical Review</span>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 w-full">
          
          {/* Main Visual/Hero Card */}
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="p-8 bg-orange-50 text-orange-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                   {activeTab === 'deforming' ? <Wind size={48} className="text-orange-600" /> : <Layers size={48} />}
                </div>
                <div className="text-center md:text-left flex-1">
                   <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                     <span className="text-orange-600 font-black text-xs uppercase tracking-widest">{current.niche}</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                     <span className="text-slate-400 font-black text-xs uppercase tracking-widest italic">Miller Subtroch Lab</span>
                   </div>
                   <h3 className="text-4xl font-black text-slate-800 tracking-tighter mb-4">{current.title}</h3>
                   <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{current.pearl}"</p>
                </div>
             </div>
             {/* Background Decoration */}
             <div className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50 flex items-center justify-center">
                <Activity size={400} />
             </div>
          </div>

          {/* Core Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
             {/* LEFT: Structural/Category Data */}
             <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                <h4 className="text-lg font-black mb-8 flex items-center gap-3 text-orange-400 uppercase tracking-tighter">
                   <Zap size={22} /> {activeTab === 'fixation' ? 'Surgical Choice' : 'Assessment Metrics'}
                </h4>
                <div className="space-y-4 relative z-10">
                   {activeTab === 'deforming' && current.factors.map((item: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <h5 className="text-[11px] font-black text-orange-400 uppercase mb-1">{item.id}</h5>
                        <p className="text-[10px] text-slate-400 italic">{item.d}</p>
                     </div>
                   ))}
                   {activeTab === 'seinsheimer' && current.types.map((item: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                           <h5 className="text-[11px] font-black text-orange-400 uppercase">{item.id}</h5>
                        </div>
                        <p className="text-[10px] text-slate-400 italic">{item.d}</p>
                     </div>
                   ))}
                   {activeTab === 'reduction' && current.tips.map((item: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <h5 className="text-[11px] font-black text-orange-400 uppercase mb-1">{item.id}</h5>
                        <p className="text-[10px] text-slate-400 italic">{item.d}</p>
                     </div>
                   ))}
                   {activeTab === 'fixation' && current.choices.map((item: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                           <h5 className="text-[11px] font-black text-orange-400 uppercase">{item.name}</h5>
                           {item.group && <span className="text-[8px] font-black bg-orange-600/20 text-orange-400 px-2 py-0.5 rounded-full">{item.group}</span>}
                        </div>
                        <p className="text-[10px] text-slate-400 italic">{item.d}</p>
                     </div>
                   ))}
                   {activeTab === 'complications' && current.risks.map((item: any, i: number) => (
                     <div key={i} className="p-4 bg-rose-600/10 border border-rose-600/20 rounded-2xl flex items-center gap-4">
                        <div className="w-6 h-6 rounded-full bg-rose-600 flex items-center justify-center text-[10px] font-black shrink-0">!</div>
                        <div>
                           <p className="text-[11px] text-white font-black">{item.name}</p>
                           <p className="text-[10px] text-rose-200/60 italic">{item.d}</p>
                        </div>
                     </div>
                   ))}
                </div>
                <Search className="absolute -bottom-10 -right-10 text-white/5" size={240} />
             </div>

             {/* RIGHT: Actions & Clinical Judgment */}
             <div className="space-y-6">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                   <h4 className="text-lg font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter">
                      <Hand size={22} className="text-orange-600" /> Surgeon's Action Plan
                   </h4>
                   <div className="p-6 bg-orange-50 border border-orange-100 rounded-3xl">
                      <p className="text-sm text-orange-900 font-bold leading-relaxed italic text-center">
                        {activeTab === 'deforming' ? "To counteract flexion, place a Schanz pin in the proximal fragment and use it as a 'joystick' to push it posteriorly." : 
                         activeTab === 'seinsheimer' ? "Type IIB spiral fractures are notorious for displacing as the nail is passed. Consider a percutaneous cerclage wire or clamp." : 
                         activeTab === 'reduction' ? "Anatomic reduction is paramount. Even a 5-degree varus malreduction significantly increases the stress on the nail and leads to failure." : 
                         activeTab === 'fixation' ? "Use a cephalomedullary nail. The load-sharing nature of the nail is critical in a zone where the lateral cortex is under massive tension." : 
                         "If you see no callus by 3-4 months on the lateral cortex, consider early bone grafting or dynamization before the hardware fails."}
                      </p>
                   </div>
                </div>

                <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                   <h5 className="text-[10px] font-black text-orange-400 uppercase mb-3 flex items-center gap-2">
                     <AlertCircle size={14} className="text-amber-500" /> Miller High-Yield Pearl
                   </h5>
                   <p className="text-xs font-medium leading-relaxed italic opacity-90">
                      {activeTab === 'deforming' ? "The Gluteus Medius is the primary force causing the 'Abduction' deformity of the proximal fragment." : 
                       activeTab === 'seinsheimer' ? "Type V fractures involve the GT. This makes the starting point unstable and often requires a piriformis fossa nail." : 
                       activeTab === 'fixation' ? "Starting point: If using a GT nail, ensure the entry is slightly medial to the tip to avoid blowing out the lateral wall." :
                       "Smoking is the single most modifiable risk factor for subtrochanteric nonunion. Patients must quit immediately post-op."}
                   </p>
                   <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                </div>
             </div>
          </div>

          {/* Biomechanical Area */}
          <div className="bg-orange-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-2/3">
                   <h4 className="text-2xl font-black mb-4 flex items-center gap-3">
                     <ArrowUp size={24} className="text-orange-300" /> The Tensile Zone
                   </h4>
                   <p className="text-sm text-orange-100 leading-relaxed italic">
                      "In the subtrochanteric region, the lateral cortex is under massive tension while the medial cortex is under compression. Fixation failure almost always begins with the opening of the lateral fracture gap into varus."
                   </p>
                </div>
                <div className="md:w-1/3 flex justify-center text-center">
                   <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest">
                      Varus {" = "} Failure
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* Legend/Footer */}
        <footer className="mt-auto px-10 py-8 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/80">
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-orange-600 shadow-sm"></div> Reduction Goal</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-slate-900 shadow-sm"></div> Muscle Logic</div>
           <div className="flex items-center gap-2 text-slate-800 uppercase italic font-bold">Subtroch-Master Hub v1.0</div>
        </footer>
      </div>
    </div>
  );
};

export default SubtrochantericMillerLab;
