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
  ArrowUp,
  AlertCircle,
  Wind,
  Hand,
  Hammer,
  Settings,
  Dna,
  Truck,
  Thermometer
} from 'lucide-react';

const SHAFT_DATA: any = {
  winquist: {
    title: "Winquist & Hansen Class",
    niche: "Degree of Comminution",
    types: [
      { id: "Type I", d: "Small butterfly fragment (< 25%); minimal comminution." },
      { id: "Type II", d: "Butterfly fragment involving < 50% of cortical width." },
      { id: "Type III", d: "Butterfly fragment involving > 50% of cortical width; unstable." },
      { id: "Type IV", d: "Segmental comminution; no cortical contact between proximal and distal fragments." }
    ],
    pearl: "Winquist Type III and IV fractures are inherently unstable and rely entirely on the intramedullary nail for length and rotational stability."
  },
  surgical: {
    title: "Intramedullary Nailing",
    niche: "The Gold Standard",
    factors: [
      { id: "Antegrade", d: "Standard approach. Piriformis vs. Trochanteric starting point." },
      { id: "Retrograde", d: "Indicated for floating knee (ipsilateral tibia), pregnancy, or ipsilateral hip fractures." },
      { id: "Reaming", d: "Increases union rate and allows larger nails. Counters cortical ischemia via endosteal flow stimulation." },
      { id: "Starting Point", d: "Piriformis (truly colinear) vs. Trochanteric (easier, less abductor damage)." }
    ],
    pearl: "Reamed intramedullary nailing has higher union rates compared to unreamed nailing in femoral shaft fractures."
  },
  fes: {
    title: "Fat Embolism Syndrome",
    niche: "Critical Complication",
    triad: [
      { id: "Respiratory", d: "Hypoxia and tachypnea; often the first sign." },
      { id: "Neurological", d: "Confusion, agitation, or altered mental status." },
      { id: "Petechial Rash", d: "Found in axilla, neck, or conjunctiva (most specific but late sign)." }
    ],
    pearl: "Early fixation (within 24 hours) significantly reduces the risk of FES and pulmonary complications (ARDS)."
  },
  atypical: {
    title: "Atypical Femur Fractures",
    niche: "Bisphosphonate Effect",
    signs: [
      { id: "Location", d: "Subtrochanteric or diaphyseal region." },
      { id: "Prodrome", d: "Dull, aching thigh pain weeks before the fracture." },
      { id: "Morphology", d: "Transverse orientation, non-comminuted, 'Beaking' of the lateral cortex." }
    ],
    pearl: "Atypical fractures are often bilateral; always image the contralateral femur if an atypical pattern is seen."
  },
  complications: {
    title: "The Failure Screen",
    niche: "Malrotation & Nonunion",
    risks: [
      { name: "Malrotation", d: "Most common in Winquist IV. Compare lesser trochanter profiles to the other side." },
      { name: "Pudendal Nerve Palsy", d: "Caused by excessive traction on the fracture table." },
      { name: "Infection", d: "Rare (< 1%) in closed fractures; higher in open injuries (Gustilo-Anderson)." }
    ],
    pearl: "Rotational profile is best checked by comparing the 'lesser trochanteric silhouette' on fluoroscopy."
  }
};

const FemoralShaftMillerLab = () => {
  const [activeTab, setActiveTab] = useState('winquist');

  const current = useMemo(() => SHAFT_DATA[activeTab], [activeTab]);

  return (
    <div className="flex flex-col lg:flex-row min-h-[600px] bg-slate-50 font-sans text-slate-900 rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-slate-950 text-white flex flex-col shadow-2xl">
        <div className="p-8 border-b border-white/5 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-emerald-600 rounded-xl shadow-lg">
              <Truck size={20} className="text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase italic">Shaft-Master</span>
          </div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic text-center">Diaphyseal Trauma</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto no-scrollbar">
          {[
            { id: 'winquist', label: 'Winquist Class', icon: Layers },
            { id: 'surgical', label: 'IM Nailing', icon: Hammer },
            { id: 'fes', label: 'Fat Embolism', icon: Thermometer },
            { id: 'atypical', label: 'Atypical/BP', icon: AlertCircle },
            { id: 'complications', label: 'Complications', icon: ShieldAlert }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${activeTab === item.id ? 'bg-emerald-600 text-white shadow-xl translate-x-1' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
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
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1 italic">Vascular Rule</p>
            <p className="text-[11px] text-slate-300 font-medium leading-tight italic">
              "The femoral shaft is a high-flow zone; femoral fractures can lose 1.0-1.5L of blood into the thigh."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative bg-slate-50 overflow-y-auto max-h-[800px]">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Trauma & Reconstruction</h2>
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{current.title}</h1>
          </div>
          <div className="hidden md:flex gap-3">
             <div className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 flex items-center gap-2">
                <Stethoscope size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest italic tracking-tight">Clinical Mastery</span>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 w-full">
          
          {/* Main Visual/Hero Card */}
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="p-8 bg-emerald-50 text-emerald-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                   {activeTab === 'fes' ? <AlertCircle size={48} className="text-red-600" /> : <Layers size={48} />}
                </div>
                <div className="text-center md:text-left flex-1">
                   <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                     <span className="text-emerald-600 font-black text-xs uppercase tracking-widest">{current.niche}</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                     <span className="text-slate-400 font-black text-xs uppercase tracking-widest italic">Miller Trauma Lab</span>
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
                <h4 className="text-lg font-black mb-8 flex items-center gap-3 text-emerald-400 uppercase tracking-tighter">
                   <Zap size={22} /> Assessment Factors
                </h4>
                <div className="space-y-4 relative z-10">
                   {activeTab === 'winquist' && current.types.map((item: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <h5 className="text-[11px] font-black text-emerald-400 uppercase mb-1">{item.id}</h5>
                        <p className="text-[10px] text-slate-400 italic">{item.d}</p>
                     </div>
                   ))}
                   {activeTab === 'surgical' && current.factors.map((item: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <h5 className="text-[11px] font-black text-emerald-400 uppercase mb-1">{item.id}</h5>
                        <p className="text-[10px] text-slate-400 italic">{item.d}</p>
                     </div>
                   ))}
                   {activeTab === 'fes' && current.triad.map((item: any, i: number) => (
                     <div key={i} className="p-4 bg-red-600/10 border border-red-600/20 rounded-2xl flex items-center gap-4">
                        <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-[10px] font-black shrink-0">!</div>
                        <div>
                           <h5 className="text-[11px] font-black text-white uppercase">{item.id}</h5>
                           <p className="text-[10px] text-red-200/60 italic">{item.d}</p>
                        </div>
                     </div>
                   ))}
                   {activeTab === 'atypical' && current.signs.map((item: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <h5 className="text-[11px] font-black text-emerald-400 uppercase mb-1">{item.id}</h5>
                        <p className="text-[10px] text-slate-400 italic">{item.d}</p>
                     </div>
                   ))}
                   {activeTab === 'complications' && current.risks.map((item: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        <div>
                           <p className="text-[11px] text-white font-black">{item.name}</p>
                           <p className="text-[10px] text-slate-400 italic">{item.d}</p>
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
                      <Hand size={22} className="text-emerald-600" /> Surgeon's Action Plan
                   </h4>
                   <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl">
                      <p className="text-sm text-emerald-900 font-bold leading-relaxed italic text-center">
                        {activeTab === 'winquist' ? "Winquist IV has zero cortical contact. These require meticulous attention to rotation and length using fluoroscopy and traction." : 
                         activeTab === 'surgical' ? "Retrograde nailing is a powerful tool for the 'Floating Knee' scenario, as you can use a single knee incision for both femur and tibia." : 
                         activeTab === 'fes' ? "FES is a clinical diagnosis. Treatment is purely supportive (oxygen, early fixation). Steroids have no proven benefit." : 
                         activeTab === 'atypical' ? "If a patient on bisphosphonates has groin or thigh pain, get an X-ray and MRI/Bone scan. Prophylactic nailing is often indicated." : 
                         "To avoid rotational errors, align the femoral neck angle on fluoroscopy and then check the transmalleolar axis at the ankle."}
                      </p>
                   </div>
                </div>

                <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                   <h5 className="text-[10px] font-black text-emerald-400 uppercase mb-3 flex items-center gap-2">
                     <AlertCircle size={14} className="text-amber-500" /> Board Yield Pearl
                   </h5>
                   <p className="text-xs font-medium leading-relaxed italic opacity-90">
                      {activeTab === 'surgical' ? "Reaming stimulates a temporary systemic inflammatory response but locally increases the blood supply to the fracture zone." : 
                       activeTab === 'fes' ? "The fat emboli don't just 'clog' vessels; they release free fatty acids that cause a chemical pneumonitis." : 
                       activeTab === 'winquist' ? "Types III and IV are unstable and often require static locking of the nail to prevent shortening." :
                       "Nerve palsies from the fracture table are often caused by the perineal post. Ensure adequate padding and limited traction time."}
                   </p>
                   <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                </div>
             </div>
          </div>

          {/* Biomechanical Graphic Area */}
          <div className="bg-emerald-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-2/3">
                   <h4 className="text-2xl font-black mb-4 flex items-center gap-3">
                     <ArrowUp size={24} className="text-emerald-300" /> The Anterior Bow
                   </h4>
                   <p className="text-sm text-emerald-100 leading-relaxed italic">
                      "The femur has a natural anterior bow. When nailing, the radius of curvature of the nail should ideally match the radius of curvature of the femur to avoid anterior cortical penetration."
                   </p>
                </div>
                <div className="md:w-1/3 flex justify-center text-center">
                   <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest">
                      Curvature Match
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* Legend/Footer */}
        <footer className="mt-auto px-10 py-8 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/80">
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-emerald-600 shadow-sm"></div> Trauma Success</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-slate-900 shadow-sm"></div> Surgical Logic</div>
           <div className="flex items-center gap-2 text-slate-800 uppercase italic font-bold">Shaft-Master Hub v1.0</div>
        </footer>
      </div>
    </div>
  );
};

export default FemoralShaftMillerLab;
