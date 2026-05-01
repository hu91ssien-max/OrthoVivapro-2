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
  Hand,
  ArrowUp,
  AlertCircle,
  Wind,
  TrendingUp,
  HeartPulse
} from 'lucide-react';

const FEMUR_NECK_DATA: any = {
  anatomy: {
    title: "Vascular & Biological Anatomy",
    niche: "Blood Supply & Healing",
    concepts: [
      { id: "MCFA", d: "Medial Circumflex Femoral Artery: The dominant blood supply to the femoral head via the deep branch and retinacular vessels." },
      { id: "Intracapsular", d: "The neck is within the joint capsule; synovial fluid contains fibrinolysins that inhibit clot formation and healing." },
      { id: "Tamponade", d: "Intracapsular hematoma increases pressure, potentially occluding retinacular vessels (Theoretical emergency)." }
    ],
    pearl: "The Medial Circumflex Femoral Artery (MCFA) is the lifeblood of the femoral head; its disruption leads to AVN."
  },
  garden: {
    title: "Garden Classification",
    niche: "Displacement & Stability",
    stages: [
      { id: "Stage I", d: "Incomplete or Valgus Impacted; trabeculae of head/neck are in valgus." },
      { id: "Stage II", d: "Complete but non-displaced; trabeculae are aligned across fracture." },
      { id: "Stage III", d: "Complete and partially displaced; trabeculae are malaligned (head in varus)." },
      { id: "Stage IV", d: "Complete and fully displaced; head is free-floating (trabeculae may look aligned)." }
    ],
    pearl: "Garden Stages I and II are stable; III and IV are unstable and carry a significantly higher risk of AVN."
  },
  pauwels: {
    title: "Pauwels Classification",
    niche: "Biomechanical Shear",
    types: [
      { id: "Type I", angle: "< 30°", d: "Forces are primarily compressive; high healing potential." },
      { id: "Type II", angle: "30° - 50°", d: "Intermediate shear forces; requires stable fixation." },
      { id: "Type III", angle: "> 50°", d: "High shear / Vertical fracture line; highest risk of nonunion and displacement." }
    ],
    pearl: "A Pauwels Type III fracture requires 'Shear-Resistant' fixation like a Sliding Hip Screw (DHS) or Medial Buttress Plate."
  },
  treatment: {
    title: "Surgical Decision Matrix",
    niche: "Management Algorithm",
    algorithms: [
      { group: "Young Patient (<60)", choice: "Emergent ORIF", detail: "Preserve head at all costs. Multiple Cannulated Screws or DHS." },
      { group: "Elderly, Undisplaced", choice: "In-situ Fixation", detail: "3 Cannulated Screws in inverted triangle pattern." },
      { group: "Elderly, Displaced (Active)", choice: "Total Hip (THA)", detail: "Superior functional outcomes and longevity compared to Hemi." },
      { group: "Elderly, Displaced (Low Demand)", choice: "Hemiarthroplasty", detail: "Unipolar or Bipolar. Lower dislocation risk than THA." }
    ],
    pearl: "In the young, the femoral neck fracture is an orthopaedic emergency. Time to reduction is the only modifiable risk for AVN."
  },
  complications: {
    title: "The Failure Screen",
    niche: "AVN & Nonunion",
    risks: [
      { name: "AVN", d: "10-45% risk in displaced fractures. Usually presents within 2 years with pain/collapse." },
      { name: "Nonunion", d: "10-30% in displaced fractures. Often due to poor reduction or unstable shear (Pauwels III)." },
      { name: "Displacement", d: "Secondary displacement occurs if fixation fails to resist shear." }
    ],
    pearl: "Cessation of smoking and stable mechanical reduction are the most critical factors for preventing nonunion."
  }
};

const FemoralNeckMiller = () => {
  const [activeTab, setActiveTab] = useState('garden');
  const current = useMemo(() => FEMUR_NECK_DATA[activeTab], [activeTab]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 flex flex-col gap-2">
        <div className="p-4 bg-slate-950 rounded-2xl border border-white/5 shadow-xl mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-1.5 bg-rose-600 rounded-lg shadow-lg">
              <TrendingUp size={16} className="text-white" />
            </div>
            <span className="text-[11px] font-black tracking-tighter uppercase italic text-white">Neck-Master</span>
          </div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic leading-tight">
            "Miller's Axiom: Anatomical reduction and stable fixation are key."
          </p>
        </div>
        
        <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
          {[
            { id: 'anatomy', label: 'Biology/Anatomy', icon: HeartPulse },
            { id: 'garden', label: 'Garden Stages', icon: Layers },
            { id: 'pauwels', label: 'Pauwels Shear', icon: Scale },
            { id: 'treatment', label: 'Surgical Choice', icon: Target },
            { id: 'complications', label: 'Complications', icon: ShieldAlert }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-1 lg:flex-none flex items-center justify-between px-4 py-3 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap ${activeTab === item.id ? 'bg-rose-600 text-white shadow-lg translate-x-1' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
              >
                <div className="flex items-center gap-2">
                  <Icon size={14} />
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
        {/* Main Visual/Hero Card */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
           <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="p-6 bg-rose-50 text-rose-600 rounded-3xl shadow-inner transition-transform group-hover:scale-105 duration-500">
                 {activeTab === 'complications' ? <ShieldAlert size={32} /> : <Layers size={32} />}
              </div>
              <div className="text-center md:text-left flex-1">
                 <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                   <span className="text-rose-600 font-black text-[10px] uppercase tracking-widest">{current.niche}</span>
                   <div className="w-1 h-1 rounded-full bg-slate-200" />
                   <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic">Miller Hip Lab</span>
                 </div>
                 <h3 className="text-2xl font-black text-slate-800 tracking-tighter mb-2">{current.title}</h3>
                 <p className="text-sm text-slate-500 font-medium leading-relaxed italic">"{current.pearl}"</p>
              </div>
           </div>
           <Activity className="absolute bottom-[-40px] right-[-40px] text-slate-100 opacity-50" size={200} />
        </div>

        {/* Core Content Grid */}
        <div className="grid md:grid-cols-2 gap-6">
           {/* LEFT */}
           <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
              <h4 className="text-sm font-black mb-6 flex items-center gap-2 text-rose-400 uppercase tracking-tighter">
                 <Zap size={18} /> {activeTab === 'treatment' ? 'Treatment Protocols' : 'Classification Systems'}
              </h4>
              <div className="space-y-3 relative z-10">
                 {activeTab === 'garden' && current.stages.map((item: any, i: number) => (
                   <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl">
                      <div className="flex justify-between items-center mb-1">
                         <h5 className="text-[10px] font-black text-rose-400 uppercase">{item.id}</h5>
                      </div>
                      <p className="text-[10px] text-slate-400 italic">{item.d}</p>
                   </div>
                 ))}
                 {activeTab === 'pauwels' && current.types.map((item: any, i: number) => (
                   <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl">
                      <div className="flex justify-between items-center mb-1">
                         <h5 className="text-[10px] font-black text-rose-400 uppercase">{item.id} (Angle: {item.angle})</h5>
                      </div>
                      <p className="text-[10px] text-slate-400 italic">{item.d}</p>
                   </div>
                 ))}
                 {activeTab === 'anatomy' && current.concepts.map((item: any, i: number) => (
                   <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl">
                      <h5 className="text-[10px] font-black text-rose-400 uppercase mb-1">{item.id}</h5>
                      <p className="text-[10px] text-slate-400 italic">{item.d}</p>
                   </div>
                 ))}
                 {activeTab === 'treatment' && current.algorithms.map((item: any, i: number) => (
                   <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl">
                      <div className="flex justify-between items-center mb-1">
                         <h5 className="text-[10px] font-black text-rose-400 uppercase">{item.group}</h5>
                         <span className="text-[8px] font-black bg-rose-600/20 text-rose-400 px-2 py-0.5 rounded-full">{item.choice}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 italic">{item.detail}</p>
                   </div>
                 ))}
                 {activeTab === 'complications' && current.risks.map((item: any, i: number) => (
                   <div key={i} className="p-3 bg-rose-600/10 border border-rose-600/20 rounded-xl flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-rose-600 flex items-center justify-center text-[8px] font-black shrink-0">!</div>
                      <div>
                         <p className="text-[10px] text-white font-black">{item.name}</p>
                         <p className="text-[9px] text-rose-200/60 italic">{item.d}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <Search className="absolute -bottom-6 -right-6 text-white/5" size={150} />
           </div>

           {/* RIGHT */}
           <div className="space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                 <h4 className="text-sm font-black mb-4 flex items-center gap-2 text-slate-400 uppercase tracking-tighter">
                    <Hand size={18} className="text-rose-600" /> Clinical Action Plan
                 </h4>
                 <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl">
                    <p className="text-xs text-rose-900 font-bold leading-relaxed italic text-center">
                      {activeTab === 'anatomy' ? "Early aspiration of the hematoma is debated but anatomical reduction is the primary goal to avoid MCFA kink." : 
                       activeTab === 'garden' ? "Look for the trabeculae in the head and neck. If they form an angle <160° on the AP view, it's Stage III (Varus)." : 
                       activeTab === 'pauwels' ? "In Type III fractures, cannulated screws may fail. A DHS with a derotation screw or a medial buttress plate is preferred." : 
                       activeTab === 'treatment' ? "THA is preferred over Hemi for active elderly patients because it has a lower re-operation rate and better pain relief." : 
                       "Avascular Necrosis (AVN) is the most common complication of femoral neck fractures. If collapse occurs, THA is the salvage treatment."}
                    </p>
                 </div>
              </div>

              <div className="p-6 bg-slate-900 text-white rounded-[2rem] relative overflow-hidden shadow-xl border border-white/5">
                 <h5 className="text-[9px] font-black text-rose-400 uppercase mb-2 flex items-center gap-2">
                   <AlertCircle size={12} className="text-amber-500" /> Miller Pearl
                 </h5>
                 <p className="text-[11px] font-medium italic opacity-90 leading-relaxed">
                    {activeTab === 'garden' ? "Garden IV fractures look aligned because the head is free and moves with the shaft. It's actually the highest risk for AVN." : 
                     activeTab === 'pauwels' ? "Vertical fractures (Type III) have a high failure rate if fixed with cannulated screws alone due to shear displacement." : 
                     activeTab === 'anatomy' ? "The retinacular vessels are the final common path for blood to the femoral head. They are vulnerable to the fracture line." :
                     "Always assess for 'Secondary Gain' or cognitive status in elderly patients before deciding between THA and Hemi."}
                 </p>
                 <Wind className="absolute top-2 right-2 text-white/5" size={40} />
              </div>
           </div>
        </div>

        {/* Extra High-Yield Card */}
        <div className="bg-rose-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-2/3">
                 <h4 className="text-lg font-black mb-2 flex items-center gap-2">
                   <ArrowUp size={18} className="text-rose-300" /> The Inverted Triangle
                 </h4>
                 <p className="text-[11px] text-rose-100 leading-relaxed italic">
                    "When using cannulated screws, the standard is three screws in an 'Inverted Triangle' pattern. The inferior screw along the calcar provides the most support, and the posterior screw prevents rotation."
                 </p>
              </div>
              <div className="md:w-1/3 flex justify-end">
                 <div className="px-6 py-2.5 bg-white/10 border border-white/20 rounded-full font-black text-[9px] uppercase tracking-widest">
                    Stable {" > "} Unstable
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FemoralNeckMiller;
