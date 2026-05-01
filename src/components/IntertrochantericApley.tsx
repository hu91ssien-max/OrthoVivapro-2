import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  ChevronRight, 
  Zap, 
  Layers, 
  Target, 
  AlertTriangle, 
  Stethoscope, 
  ShieldAlert, 
  Search, 
  Scale, 
  ArrowUp,
  AlertCircle,
  Wind,
  Settings,
  Hand,
  Hammer
} from 'lucide-react';

const IT_FRACTURE_DATA = {
  stability: {
    title: "Stability Markers",
    niche: "Mechanical Integrity",
    factors: [
      { id: "Medial Wall", d: "Integrity of the posteromedial cortex (calcar) is the key to stability." },
      { id: "Posterolateral Wall", d: "Loss of the greater trochanteric wall (lateral wall) compromises SHS fixation." },
      { id: "Subtroch Extension", d: "Fractures extending into the shaft are inherently unstable." },
      { id: "Reverse Obliquity", d: "The fracture line trends from superomedial to inferolateral; highly unstable." }
    ],
    pearl: "A 'stable' fracture becomes 'unstable' once the posteromedial wall (calcar) is fragmented or lost."
  },
  evans: {
    title: "Evans Classification",
    niche: "Fracture Morphology",
    types: [
      { id: "Type I", d: "Two-part non-displaced; Stable." },
      { id: "Type II", d: "Two-part displaced; Stable after reduction." },
      { id: "Type III", d: "Three-part with posterolateral comminution; Unstable." },
      { id: "Type IV", d: "Three-part with posteromedial comminution; Unstable." },
      { id: "Type V", d: "Four-part comminution; Highly Unstable." },
      { id: "Reverse", d: "Reverse obliquity pattern; Requires Intramedullary (IM) fixation." }
    ],
    pearl: "The most important distinction in Evans is whether the medial and lateral walls can support the proximal fragment after reduction."
  },
  technical: {
    title: "Tip-Apex Distance (TAD)",
    niche: "The Rule of 25",
    metrics: [
      { id: "Definition", d: "The sum of the distance from the tip of the lag screw to the apex of the femoral head on AP and Lateral views." },
      { id: "Threshold", d: "TAD must be < 25mm. Values > 25mm correlate directly with lag screw cut-out." },
      { id: "Position", d: "Ideal screw position is 'Center-Center' on both views to maximize bone purchase." }
    ],
    pearl: "TAD is the single most important surgeon-controlled variable in preventing hardware failure."
  },
  implants: {
    title: "Surgical Selection",
    niche: "SHS vs. IM Nail",
    choices: [
      { name: "Sliding Hip Screw (SHS)", group: "Stable Patterns", d: "The gold standard for Evans I & II. Allows controlled collapse for healing." },
      { name: "Cephalomedullary (IM) Nail", group: "Unstable/Reverse", d: "Mandatory for reverse obliquity and subtroch extension; provides better load sharing." },
      { name: "Medial Buttress", d: "Additional plate/augmentation to prevent medial collapse in borderline cases." }
    ],
    pearl: "Never use a Sliding Hip Screw for a Reverse Obliquity fracture; the lateral cortex will fail, leading to medial displacement."
  },
  complications: {
    title: "The Failure Screen",
    niche: "Cut-out & Malunion",
    risks: [
      { name: "Lag Screw Cut-out", d: "Most common failure. Usually superior/lateral migration through the femoral head." },
      { name: "Varus Malunion", d: "Collapse into varus due to poor medial support or inadequate reduction." },
      { name: "Nonunion", d: "Rare (<2%) due to excellent blood supply. If it occurs, check for infection or metabolic issues." }
    ],
    pearl: "If the lag screw 'cuts out', the salvage is usually a conversion to a Total Hip Arthroplasty (THA)."
  }
};

const IntertrochantericApley = () => {
  const [activeTab, setActiveTab] = useState('stability');

  const current = useMemo(() => (IT_FRACTURE_DATA as any)[activeTab], [activeTab]);

  return (
    <div className="flex flex-col lg:flex-row min-h-[600px] bg-slate-50 font-sans text-slate-900 rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-slate-950 text-white flex flex-col shadow-2xl">
        <div className="p-8 border-b border-white/5 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg">
              <Hammer size={20} className="text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase italic">IT-Master</span>
          </div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic text-center">Extracapsular Trauma</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto no-scrollbar">
          {[
            { id: 'stability', label: 'Stability Factors', icon: Scale },
            { id: 'evans', label: 'Evans Class', icon: Layers },
            { id: 'technical', label: 'TAD / Technical', icon: Target },
            { id: 'implants', label: 'Implant Choice', icon: Settings },
            { id: 'complications', label: 'Complications', icon: ShieldAlert }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-xl translate-x-1' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
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
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 italic">Surgeon's Rule</p>
            <p className="text-[11px] text-slate-300 font-medium leading-tight italic">
              "Respect the calcar. If you don't have medial support, you don't have a stable fracture."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative bg-slate-50 overflow-y-auto max-h-[800px]">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Hip Trauma Hub</h2>
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{current.title}</h1>
          </div>
          <div className="hidden md:flex gap-3">
             <div className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100 flex items-center gap-2">
                <Stethoscope size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest italic tracking-tight">Technical Review</span>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 w-full">
          
          {/* Main Visual/Hero Card */}
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="p-8 bg-indigo-50 text-indigo-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                   {activeTab === 'complications' ? <ShieldAlert size={48} className="text-rose-600" /> : <Settings size={48} />}
                </div>
                <div className="text-center md:text-left flex-1">
                   <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                     <span className="text-indigo-600 font-black text-xs uppercase tracking-widest">{current.niche}</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                     <span className="text-slate-400 font-black text-xs uppercase tracking-widest italic">Miller IT Lab</span>
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
                <h4 className="text-lg font-black mb-8 flex items-center gap-3 text-indigo-400 uppercase tracking-tighter">
                   <Zap size={22} /> {activeTab === 'implants' ? 'Surgical Choice' : 'Assessment Factors'}
                </h4>
                <div className="space-y-4 relative z-10">
                   {activeTab === 'stability' && current.factors.map((item: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <h5 className="text-[11px] font-black text-indigo-400 uppercase mb-1">{item.id}</h5>
                        <p className="text-[10px] text-slate-400 italic">{item.d}</p>
                     </div>
                   ))}
                   {activeTab === 'evans' && current.types.map((item: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                           <h5 className="text-[11px] font-black text-indigo-400 uppercase">{item.id}</h5>
                        </div>
                        <p className="text-[10px] text-slate-400 italic">{item.d}</p>
                     </div>
                   ))}
                   {activeTab === 'technical' && current.metrics.map((item: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <h5 className="text-[11px] font-black text-indigo-400 uppercase mb-1">{item.id}</h5>
                        <p className="text-[10px] text-slate-400 italic">{item.d}</p>
                     </div>
                   ))}
                   {activeTab === 'implants' && current.choices.map((item: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                           <h5 className="text-[11px] font-black text-indigo-400 uppercase">{item.name}</h5>
                           {item.group && <span className="text-[8px] font-black bg-indigo-600/20 text-indigo-400 px-2 py-0.5 rounded-full">{item.group}</span>}
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
                      <Hand size={22} className="text-indigo-600" /> Surgeon's Action Plan
                   </h4>
                   <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl">
                      <p className="text-sm text-indigo-900 font-bold leading-relaxed italic text-center">
                        {activeTab === 'stability' ? "Check the lateral X-ray. Comminution of the posteromedial cortex means the fracture is unstable regardless of the AP appearance." : 
                         activeTab === 'evans' ? "Type III and IV involve the trochanters. These are usually managed with an IM nail in modern practice to provide load-sharing." : 
                         activeTab === 'technical' ? "The sum of the distances from the screw tip to the apex on AP and lateral. If it's over 25mm, you haven't finished the case." : 
                         activeTab === 'implants' ? "The 'Medial Wall' is the key. If the medial wall can be reduced and braced against the distal fragment, an SHS is excellent." : 
                         "The most common mechanism of 'cut-out' is poor initial screw placement or attempting to fix an unstable pattern with insufficient hardware."}
                      </p>
                   </div>
                </div>

                <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                   <h5 className="text-[10px] font-black text-indigo-400 uppercase mb-3 flex items-center gap-2">
                     <AlertCircle size={14} className="text-amber-500" /> Board Yield Pearl
                   </h5>
                   <p className="text-xs font-medium leading-relaxed italic opacity-90">
                      {activeTab === 'evans' ? "Reverse Obliquity fractures (the 'Evil' pattern) always fail with an SHS. You must use a cephalomedullary nail." : 
                       activeTab === 'technical' ? "Ideal screw position: Center of the head on both the AP and Lateral views. Deep and central." : 
                       activeTab === 'stability' ? "Large posteromedial fragment is the hallmark of instability and loss of calcar support." :
                       "Post-operative early weight-bearing is usually encouraged in IT fractures because the fracture is extracapsular and fixation is stable."}
                   </p>
                   <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                </div>
             </div>
          </div>

          {/* Technical Graphic Area - TAD Visualizer */}
          <div className="bg-indigo-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-2/3">
                   <h4 className="text-2xl font-black mb-4 flex items-center gap-3">
                     <ArrowUp size={24} className="text-indigo-300" /> Tip-Apex Distance (TAD)
                   </h4>
                   <p className="text-sm text-indigo-100 leading-relaxed italic">
                      "Measured as the sum of distances from the screw tip to the apex of the femoral head on the AP and Lateral views. Calculated using the rule: (D_ap + D_lat) × magnification factor. Keep it under 25mm."
                   </p>
                </div>
                <div className="md:w-1/3 flex justify-center text-center">
                   <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest">
                      TAD {" < "} 25mm
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* Legend/Footer */}
        <footer className="mt-auto px-10 py-8 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/80">
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-indigo-600 shadow-sm"></div> Fixation Goal</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-slate-900 shadow-sm"></div> Fracture Logic</div>
           <div className="flex items-center gap-2 text-slate-800 uppercase italic font-bold">IT-Master Hub v1.0</div>
        </footer>
      </div>
    </div>
  );
};

export default IntertrochantericApley;
