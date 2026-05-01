import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  ChevronRight, 
  Zap, 
  Layers, 
  Target, 
  AlertTriangle, 
  Stethoscope, 
  Clock, 
  Maximize2, 
  RotateCcw, 
  ShieldAlert, 
  Dna, 
  Wind, 
  Scale, 
  Hammer,
  Bone,
  Thermometer
} from 'lucide-react';

const NOF_DATA: any = {
  classification: {
    title: "Garden & Pauwels Logic",
    niche: "Stability & Displacement",
    gardens: [
      { id: "Garden I", d: "Incomplete/Valgus impacted. Stable." },
      { id: "Garden II", d: "Complete but undisplaced. Stable." },
      { id: "Garden III", d: "Complete and partially displaced. Unstable." },
      { id: "Garden IV", d: "Fully displaced. Total loss of vascularity." }
    ],
    pauwels: [
      { id: "Type I", angle: "< 30°", d: "Compression forces dominate. Stable." },
      { id: "Type II", angle: "30-50°", d: "Mixed shear/compression." },
      { id: "Type III", angle: "> 50°", d: "High shear forces. High risk of non-union." }
    ],
    pearl: "Garden III/IV and Pauwels III are the 'Red Zones' for avascular necrosis."
  },
  vascular: {
    title: "Vascular Vulnerability",
    niche: "The Circumflex Ring",
    anatomy: "The Medial Circumflex Femoral Artery (MCFA) provides 90% of the blood to the head. It is intracapsular.",
    pathology: "Fracture displacement (Garden III/IV) tears the retinacular vessels. High intracapsular pressure (tamponade) further compromises flow.",
    biology: "Unlike extracapsular fractures, NOF lacks a periosteal sleeve; healing is purely endosteal (no callus).",
    pearl: "Intracapsular blood is the enemy of osteoblasts; tamponade must be addressed early."
  },
  decision: {
    title: "The Surgical Decision Tree",
    niche: "Fix vs. Replace",
    options: [
      { type: "Cannulated Screws", ind: "Garden I/II (All ages) or Young patients (< 60) with Garden III/IV." },
      { type: "Hemiarthroplasty", ind: "Elderly (> 75-80), low demand, displaced Garden III/IV." },
      { type: "Total Hip (THR)", ind: "Active elderly, pre-existing OA, displaced Garden III/IV." }
    ],
    urgency: "In the young, this is a surgical emergency. 'Time is Bone'. Reduction must be perfect.",
    pearl: "Biological age matters more than chronological age when deciding on salvage."
  },
  complications: {
    title: "AVN & Non-Union",
    niche: "Late Sequelae",
    avn: "Incidence 10-30%. Usually appears 6-24 months post-injury. Segmental collapse occurs at the weight-bearing zone.",
    nonUnion: "Incidence 5-15%. Often due to poor reduction or high shear Pauwels III angles.",
    salvage: "Valgus Osteotomy is the classic Apley technique to convert shear into compression for non-union.",
    pearl: "A 'silent' post-operative interval followed by groin pain indicates early head collapse."
  }
};

const FemoralNeckApley = () => {
  const [activeTab, setActiveTab] = useState('classification');
  const current = useMemo(() => NOF_DATA[activeTab], [activeTab]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500">
      {/* Dynamic Sub-navigation for Apley Section */}
      <aside className="w-full lg:w-64 flex flex-col gap-2">
        <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-1.5 bg-amber-600 rounded-lg">
              <Hammer size={16} className="text-white" />
            </div>
            <span className="text-xs font-black text-white uppercase tracking-tighter">Apley Matrix</span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium italic leading-tight">
            "The femur neck is the only bone in the body that heals by faith alone."
          </p>
        </div>

        <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
          {[
            { id: 'classification', label: 'Classification', icon: Layers },
            { id: 'vascular', label: 'Vascular Biology', icon: Dna },
            { id: 'decision', label: 'Decision Tree', icon: Scale },
            { id: 'complications', label: 'Late Sequelae', icon: ShieldAlert }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-1 lg:flex-none flex items-center justify-between px-4 py-3 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap ${activeTab === item.id ? 'bg-amber-600 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
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

      {/* Content Area */}
      <div className="flex-1 space-y-6">
        {/* Hero Card */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="p-6 bg-amber-50 text-amber-600 rounded-3xl shadow-inner transition-transform group-hover:rotate-6 duration-500">
              <Bone size={32} />
            </div>
            <div className="text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <span className="text-amber-600 font-black text-[10px] uppercase tracking-widest">{current.niche}</span>
                <div className="w-1 h-1 rounded-full bg-slate-200" />
                <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic">Apley Lab</span>
              </div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tighter mb-2">{current.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed italic">"{current.pearl}"</p>
            </div>
          </div>
          <RotateCcw className="absolute bottom-[-40px] right-[-40px] text-slate-100 opacity-50" size={200} />
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-6">
           <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
              <h4 className="text-sm font-black mb-6 flex items-center gap-2 text-amber-400 uppercase tracking-tighter">
                 <Zap size={18} /> Anatomical Matrix
              </h4>
              <div className="space-y-3 relative z-10">
                {activeTab === 'classification' && (
                  <div className="space-y-4">
                    <h5 className="text-[9px] font-black text-amber-400 uppercase">Garden's Displacement</h5>
                    <div className="grid grid-cols-1 gap-2">
                      {current.gardens.map((g: any, i: number) => (
                        <div key={i} className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                           <span className="text-[10px] font-black text-white mr-2">{g.id}:</span>
                           <span className="text-[10px] text-slate-400 font-medium italic">{g.d}</span>
                        </div>
                      ))}
                    </div>
                    <h5 className="text-[9px] font-black text-amber-400 uppercase mt-2">Pauwels' Shear Angle</h5>
                    <div className="grid grid-cols-1 gap-2">
                      {current.pauwels.map((p: any, i: number) => (
                        <div key={i} className="p-2.5 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center">
                           <span className="text-[10px] font-black text-white">{p.id} ({p.angle})</span>
                           <span className="text-[9px] text-slate-500 italic uppercase">{p.d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === 'decision' && current.options.map((opt: any, i: number) => (
                  <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                     <div className="flex justify-between items-center mb-1">
                        <h5 className="text-[10px] font-black text-amber-400 uppercase">{opt.type}</h5>
                        <Activity size={12} className="text-slate-600" />
                     </div>
                     <p className="text-[11px] text-slate-400 font-medium italic">{opt.ind}</p>
                  </div>
                ))}
                {(activeTab === 'vascular' || activeTab === 'complications') && (
                  <div className="space-y-4">
                     <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <h5 className="text-[9px] font-black text-amber-400 uppercase mb-1">Biology / Mechanism</h5>
                        <p className="text-[11px] text-slate-300 italic">{current.anatomy || current.avn}</p>
                     </div>
                     <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <h5 className="text-[9px] font-black text-amber-400 uppercase mb-1">Pathological Result</h5>
                        <p className="text-[11px] text-slate-300 italic">{current.pathology || current.nonUnion}</p>
                     </div>
                  </div>
                )}
              </div>
              <Maximize2 className="absolute -bottom-6 -right-6 text-white/5" size={150} />
           </div>

           <div className="space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                 <h4 className="text-sm font-black mb-4 flex items-center gap-2 text-slate-400 uppercase tracking-tighter">
                    <Stethoscope size={18} className="text-amber-600" /> Surgeon's Command
                 </h4>
                 <div className="p-5 bg-amber-50 border border-amber-100 rounded-2xl">
                    <p className="text-xs text-amber-900 font-bold italic leading-relaxed">
                      {activeTab === 'classification' ? "Garden I and II fractures should be fixed regardless of age. They are stable and have a high chance of union." : 
                       activeTab === 'vascular' ? "Always assume the blood supply is compromised in a displaced fracture. Surgical reduction is the only way to re-align the retinacular vessels." : 
                       activeTab === 'decision' ? "Total Hip Arthroplasty (THR) is superior to Hemiarthroplasty in active patients as it reduces re-operation rates and improves function." : 
                       "If non-union occurs in the young, don't rush to arthroplasty. A valgus osteotomy can redistribute shear forces and stimulate bone union."}
                    </p>
                 </div>
              </div>

              <div className="p-6 bg-slate-900 text-white rounded-[2rem] relative overflow-hidden shadow-xl border border-white/5">
                 <h5 className="text-[9px] font-black text-amber-400 uppercase mb-2 flex items-center gap-2">
                   <AlertTriangle size={12} className="text-red-500" /> Apley Pearl
                 </h5>
                 <p className="text-[11px] font-medium italic opacity-90 leading-relaxed">
                    {activeTab === 'classification' ? "A Garden IV is often easier to reduce than a Garden III because the head and neck are completely disconnected." : 
                     activeTab === 'vascular' ? "Because the femur neck is intracapsular, there is no cambium layer to produce callus. Healing is purely 'primary'." : 
                     activeTab === 'decision' ? "The 'Unsolved Fracture': Why fix the head when the failure rate is 30%? Arthroplasty is the standard for the frail." : 
                     "A femoral neck fracture in a young adult is high-energy trauma (MVA). Always screen for associated internal injuries."}
                 </p>
                 <Wind className="absolute top-2 right-2 text-white/5" size={40} />
              </div>
           </div>
        </div>

        {/* Time Critical Banner */}
        <div className="bg-amber-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-2/3">
                 <h4 className="text-lg font-black mb-2 flex items-center gap-2">
                   <Thermometer size={18} className="text-amber-300" /> "Time is Bone" Mandate
                 </h4>
                 <p className="text-[11px] text-slate-300 italic leading-relaxed">
                    "In the young patient, a displaced femur neck fracture is a surgical emergency analogous to a compartment syndrome. Every hour of delay increases the risk of irreversible avascular necrosis."
                 </p>
              </div>
              <div className="md:w-1/3 flex justify-end">
                 <div className="px-6 py-2.5 bg-white/10 border border-white/20 rounded-full font-black text-[9px] uppercase tracking-widest whitespace-nowrap">
                    Salvage {' < '} 24 Hours
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FemoralNeckApley;
