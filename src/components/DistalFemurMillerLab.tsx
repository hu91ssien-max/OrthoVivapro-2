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
  Scissors,
  Dna
} from 'lucide-react';

const DISTAL_FEMUR_DATA: any = {
  classification: {
    title: "AO/OTA Classification (33)",
    niche: "Articular Involvement",
    types: [
      { id: "33-A", d: "Extra-articular: Fracture does not involve the joint surface." },
      { id: "33-B", d: "Partial Articular: One condyle remains attached to the shaft (e.g., Hoffa fracture)." },
      { id: "33-C", d: "Complete Articular: Both condyles are fractured and dissociated from the shaft." },
      { id: "Hoffa (33-B3)", d: "A coronal plane fracture of the femoral condyle (Lateral > Medial). Often missed on AP X-rays." }
    ],
    pearl: "For 33-C (Complete Articular) fractures, the 'Articular First' rule applies: convert the fracture to a 33-A (Extra-articular) by fixing the joint surface before the shaft."
  },
  forces: {
    title: "Deforming Forces",
    niche: "Muscle Biomechanics",
    factors: [
      { id: "Gastrocnemius", d: "Pulls the distal fragment into FLEXION (posterior tilt/extension of the joint)." },
      { id: "Quadriceps", d: "Causes shortening and proximal migration of the shaft." },
      { id: "Adductors", d: "May cause a varus or valgus deformity depending on the fracture level." }
    ],
    pearl: "The Gastrocnemius is the most powerful deforming force; it pulls the distal condyles posteriorly, making reduction into extension necessary."
  },
  fixation: {
    title: "Fixation Selection",
    niche: "Plates vs. Nails",
    choices: [
      { name: "Lateral Locked Plate", group: "Gold Standard", d: "Superior for intra-articular comminution and osteoporotic bone. Provides fixed-angle stability." },
      { name: "Retrograde IM Nail", group: "Diaphyseal/Simple", d: "Load-sharing. Indicated for floating knee, pregnancy, or periprosthetic fractures." },
      { name: "Dual Plating", group: "Complex C3", d: "Medial and lateral plating required if there is extreme medial comminution or 'bone loss'." }
    ],
    pearl: "A retrograde nail requires a minimum of 2cm of intact distal bone above the joint for adequate screw purchase."
  },
  technical: {
    title: "Hoffa's Secret",
    niche: "The Coronal Plane",
    tips: [
      { id: "Missing the Hoffa", d: "Hoffa fractures are frequently missed on AP views. Always check the Lateral and CT scans." },
      { id: "Fixation Strategy", d: "Requires headless compression screws placed from anterior-to-posterior (countersunk)." },
      { id: "Surgical Approach", d: "Often requires an arthrotomy to ensure anatomical articular reduction." }
    ],
    pearl: "A Hoffa fracture is an absolute indication for CT scanning and anatomical internal fixation."
  },
  complications: {
    title: "The Failure Screen",
    niche: "Stiffness & Malunion",
    risks: [
      { name: "Knee Stiffness", d: "Most common. Early ROM is critical; locked plating allows for this." },
      { name: "Nonunion", d: "Occurs in 5-10%, especially in the metaphyseal-diaphyseal transition zone." },
      { name: "Valgus Malunion", d: "Common technical error if the lateral plate is not used to pull the femur out of its natural valgus." }
    ],
    pearl: "Stiffness is the 'Enemy' of the distal femur. Stable fixation must allow for early knee motion (within days)."
  }
};

const DistalFemurMillerLab = () => {
  const [activeTab, setActiveTab] = useState('classification');

  const current = useMemo(() => DISTAL_FEMUR_DATA[activeTab], [activeTab]);

  return (
    <div className="flex flex-col lg:flex-row min-h-[600px] bg-slate-50 font-sans text-slate-900 rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-slate-950 text-white flex flex-col shadow-2xl">
        <div className="p-8 border-b border-white/5 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-violet-600 rounded-xl shadow-lg">
              <Scissors size={20} className="text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase italic">Distal-Master</span>
          </div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic text-center">Supracondylar Trauma</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto no-scrollbar">
          {[
            { id: 'classification', label: 'AO Classification', icon: Layers },
            { id: 'forces', label: 'Deforming Forces', icon: Activity },
            { id: 'fixation', label: 'Plate vs. Nail', icon: Hammer },
            { id: 'technical', label: 'Hoffa Corner', icon: Target },
            { id: 'complications', label: 'Failure Screen', icon: ShieldAlert }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${activeTab === item.id ? 'bg-violet-600 text-white shadow-xl translate-x-1' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
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
            <p className="text-[10px] font-black text-violet-400 uppercase tracking-widest mb-1 italic">Surgical Axiom</p>
            <p className="text-[11px] text-slate-300 font-medium leading-tight italic">
              "Articular congruity is life. Metaphyseal alignment is longevity."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative bg-slate-50 overflow-y-auto max-h-[800px]">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Distal Femur Trauma</h2>
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{current.title}</h1>
          </div>
          <div className="hidden md:flex gap-3">
             <div className="px-4 py-1.5 bg-violet-50 text-violet-700 rounded-full border border-violet-100 flex items-center gap-2">
                <Stethoscope size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest italic tracking-tight">Clinical Mastery</span>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 w-full">
          
          {/* Main Visual/Hero Card */}
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="p-8 bg-violet-50 text-violet-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                   {activeTab === 'forces' ? <Wind size={48} className="text-violet-600" /> : <Layers size={48} />}
                </div>
                <div className="text-center md:text-left flex-1">
                   <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                     <span className="text-violet-600 font-black text-xs uppercase tracking-widest">{current.niche}</span>
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
             {/* LEFT: Category Data */}
             <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                <h4 className="text-lg font-black mb-8 flex items-center gap-3 text-violet-400 uppercase tracking-tighter">
                   <Zap size={22} /> Assessment Factors
                </h4>
                <div className="space-y-4 relative z-10">
                   {activeTab === 'classification' && current.types.map((item: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <h5 className="text-[11px] font-black text-violet-400 uppercase mb-1">{item.id}</h5>
                        <p className="text-[10px] text-slate-400 italic">{item.d}</p>
                     </div>
                   ))}
                   {activeTab === 'forces' && current.factors.map((item: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <h5 className="text-[11px] font-black text-violet-400 uppercase mb-1">{item.id}</h5>
                        <p className="text-[10px] text-slate-400 italic">{item.d}</p>
                     </div>
                   ))}
                   {activeTab === 'fixation' && current.choices.map((item: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                           <h5 className="text-[11px] font-black text-violet-400 uppercase">{item.name}</h5>
                           <span className="text-[8px] font-black bg-violet-600/20 text-violet-400 px-2 py-0.5 rounded-full">{item.group}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 italic">{item.d}</p>
                     </div>
                   ))}
                   {activeTab === 'technical' && current.tips.map((item: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <h5 className="text-[11px] font-black text-violet-400 uppercase mb-1">{item.id}</h5>
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
                      <Hand size={22} className="text-violet-600" /> Surgeon's Action Plan
                   </h4>
                   <div className="p-6 bg-violet-50 border border-violet-100 rounded-3xl">
                      <p className="text-sm text-violet-900 font-bold leading-relaxed italic text-center">
                        {activeTab === 'classification' ? "Identify if there's intra-articular extension. If the fracture is 33-C, you must restore the articular block first using K-wires and screws." : 
                         activeTab === 'forces' ? "The gastrocnemius pull will flex the distal fragment. Use a 'bolster' behind the femur or a percutaneous pin to lever the fragment into extension." : 
                         activeTab === 'fixation' ? "For osteoporotic bone, locked plating is mandatory to prevent the 'windshield wiper' effect and hardware pull-out." : 
                         activeTab === 'technical' ? "Don't trust the AP X-ray for Hoffa fractures. If a femoral condyle fracture is seen, a CT is the gold standard for surgical planning." : 
                         "Stiffness is the enemy. Your fixation must be stable enough to allow active-assisted range of motion by post-operative day 2."}
                      </p>
                   </div>
                </div>

                <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                   <h5 className="text-[10px] font-black text-violet-400 uppercase mb-3 flex items-center gap-2">
                     <AlertCircle size={14} className="text-amber-500" /> Board Yield Pearl
                   </h5>
                   <p className="text-xs font-medium leading-relaxed italic opacity-90">
                      {activeTab === 'classification' ? "33-B3 (Hoffa) fractures involve the posterior aspect of the condyles in the coronal plane." : 
                       activeTab === 'fixation' ? "Retrograde IM nails are excellent for supracondylar fractures but cannot fix a 33-B Hoffa fracture pattern." : 
                       activeTab === 'forces' ? "Quadriceps pull causes shortening; it also contributes to the posterior tilt of the distal fragment." :
                       "Popliteal artery injury is a risk in distal femur fractures due to its close proximity to the posterior cortex of the supracondylar region."}
                   </p>
                   <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                </div>
             </div>
          </div>

          {/* Biomechanical Area */}
          <div className="bg-violet-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-2/3">
                   <h4 className="text-2xl font-black mb-4 flex items-center gap-3">
                     <ArrowUp size={24} className="text-violet-300" /> The Gastrocnemius Pull
                   </h4>
                   <p className="text-sm text-violet-100 leading-relaxed italic">
                      "The origin of the Gastrocnemius on the posterior femoral condyles creates a powerful 'Extension' of the distal fragment relative to the femur (effectively flexing the distal fragment). Reduction requires flexing the knee to relax this muscle."
                   </p>
                </div>
                <div className="md:w-1/3 flex justify-center text-center">
                   <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest">
                      Flex Distal {" = "} Reduce
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* Legend/Footer */}
        <footer className="mt-auto px-10 py-8 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/80">
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-violet-600 shadow-sm"></div> Joint Restoration</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-slate-900 shadow-sm"></div> Anatomical Goal</div>
           <div className="flex items-center gap-2 text-slate-800 uppercase italic font-bold">Distal-Master Hub v1.0</div>
        </footer>
      </div>
    </div>
  );
};

export default DistalFemurMillerLab;
