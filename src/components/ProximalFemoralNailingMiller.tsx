import React, { useState } from 'react';
import { 
  Hammer, 
  ChevronRight, 
  ChevronLeft, 
  Target, 
  Settings, 
  ShieldAlert, 
  Zap, 
  Activity, 
  Layers, 
  Maximize,
  Stethoscope,
  Info
} from 'lucide-react';

const PFN_STEPS: any[] = [
  {
    id: 1,
    title: "Positioning & Setup",
    objective: "Optimize fluoroscopic access and reduction.",
    details: [
      "Fracture table is standard (allows for traction and internal rotation).",
      "Torso should be adducted to the contralateral side (improves access to the entry point).",
      "Confirm 'Perfect AP' and 'Perfect Lateral' views before draping."
    ],
    millerPearl: "Adducting the torso facilitates the starting point, especially in obese patients, by clearing the soft tissues of the flank.",
    icon: <Maximize />
  },
  {
    id: 2,
    title: "Fracture Reduction",
    objective: "Restore alignment before hardware insertion.",
    details: [
      "Counteract the 'Flexion/Abduction/Ext-Rotation' deformity of the proximal fragment.",
      "Use percutaneous Schanz pins ('Joysticks') if closed traction fails.",
      "Goal: Restore the medial calcar continuity."
    ],
    millerPearl: "Never ream or pass a nail until the fracture is reduced. Passing a nail through a malreduced fracture will lock the deformity in place.",
    icon: <Activity />
  },
  {
    id: 3,
    title: "Entry Point Selection",
    objective: "Establish the path for the nail.",
    details: [
      "Trochanteric Entry: Slightly medial to the tip of the greater trochanter on AP view.",
      "Central in the trochanter on the Lateral view.",
      "Entry too lateral leads to varus malalignment; too medial risks femoral neck injury."
    ],
    millerPearl: "The starting point is the most common site of error. A lateral start results in a varus 'wedge' effect during nail insertion.",
    icon: <Target />
  },
  {
    id: 4,
    title: "Guide Wire & Reaming",
    objective: "Prepare the medullary canal.",
    details: [
      "Pass the guide wire across the fracture site into the distal femur.",
      "Sequentially ream the canal (usually 1.5–2.0mm larger than the nail diameter).",
      "Ensure the reamer does not 'eccentrically' ream the proximal fragment."
    ],
    millerPearl: "Reaming the proximal fragment adequately is essential to prevent 'bursting' of the lateral wall during nail passage.",
    icon: <Layers />
  },
  {
    id: 5,
    title: "Nail Insertion",
    objective: "Place the load-sharing construct.",
    details: [
      "Insert the nail by hand; avoid heavy hammering to prevent iatrogenic fractures.",
      "Ensure correct depth so the lag screw aperture aligns with the femoral neck.",
      "Check rotational alignment using the 'lesser trochanteric profile' test."
    ],
    millerPearl: "Iatrogenic fractures of the greater trochanter or femoral shaft are common if the nail is forced into an under-reamed canal.",
    icon: <Hammer />
  },
  {
    id: 6,
    title: "Lag Screw Placement",
    objective: "Secure the proximal fragment.",
    details: [
      "Place the guide pin in the 'Center-Center' position (AP and Lateral).",
      "The screw should terminate 5–10mm from the subchondral bone.",
      "Measure and record the Tip-Apex Distance (TAD)."
    ],
    millerPearl: "TAD < 25mm is the single most important predictor of hardware success. Aim for the center of the head on both views.",
    icon: <Settings />
  },
  {
    id: 7,
    title: "Distal Locking",
    objective: "Secure rotational and axial stability.",
    details: [
      "Static Locking: Required for unstable patterns (Winquist III/IV or subtroch).",
      "Dynamic Locking: Allows for axial compression/settling in stable fractures.",
      "Usually performed 'free-hand' using the 'perfect circle' technique."
    ],
    millerPearl: "In reverse obliquity or subtroch fractures, always lock statically to prevent shortening and medial displacement.",
    icon: <ShieldAlert />
  }
];

const ProximalFemoralNailingMiller = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < PFN_STEPS.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const step = PFN_STEPS[currentStep];

  return (
    <div className="min-h-[600px] bg-slate-50 p-4 md:p-8 font-sans text-slate-900 flex items-center justify-center rounded-[3rem] border border-slate-200">
      <div className="max-w-5xl w-full bg-white rounded-[48px] shadow-2xl border border-slate-200 overflow-hidden flex flex-col md:flex-row">
        
        {/* Navigation Sidebar */}
        <div className="w-full md:w-80 bg-slate-950 p-8 text-white flex flex-col h-[600px] overflow-y-auto no-scrollbar">
          <div className="mb-10 text-center md:text-left">
            <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
               <div className="p-2 bg-indigo-600 rounded-lg">
                  <Hammer size={20} className="text-white" />
               </div>
               <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Surgical Lab</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight">Cephalomedullary Guide</h2>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1 italic">Miller Review 8th Ed.</p>
          </div>
          
          <nav className="space-y-3 flex-1">
            {PFN_STEPS.map((s, idx) => (
              <button 
                key={s.id} 
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${idx === currentStep ? 'bg-indigo-600 text-white shadow-xl translate-x-2' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                onClick={() => setCurrentStep(idx)}
              >
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-black shrink-0 ${idx <= currentStep ? 'bg-white text-indigo-600 border-white' : 'border-slate-800 text-slate-700'}`}>
                  {idx + 1}
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-left">{s.title}</span>
              </button>
            ))}
          </nav>

          <div className="mt-8 bg-indigo-950/40 p-5 rounded-3xl border border-indigo-900/50">
            <div className="flex items-center gap-2 text-amber-400 mb-3">
              <Zap size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest tracking-tighter">Miller Diagnostic Axiom</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium italic">
              "The lag screw must be placed in the center of the femoral head on both views to avoid 'cut-out'—the #1 failure mode of PFNs."
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-8 md:p-12 flex flex-col bg-white overflow-y-auto no-scrollbar max-h-[800px]">
          <div className="flex items-center justify-between mb-10">
            <div className="w-16 h-16 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 shadow-inner border border-indigo-100">
              {React.cloneElement(step.icon, { size: 32 })}
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Phase {currentStep + 1} of 7</span>
              <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-700 ease-out" 
                  style={{ width: `${((currentStep + 1) / PFN_STEPS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-10">
            <div>
              <h3 className="text-4xl font-black text-slate-900 mb-3 tracking-tighter">{step.title}</h3>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full font-black text-[10px] uppercase tracking-widest border border-indigo-100">
                <Target size={14} /> Goal: {step.objective}
              </div>
            </div>

            <div className="space-y-4">
              {step.details.map((detail: string, i: number) => (
                <div key={i} className="flex gap-5 p-5 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-indigo-200 transition-colors">
                  <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform" />
                  <p className="text-sm text-slate-700 font-bold leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
               <div className="bg-indigo-600 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3 text-indigo-200">
                      <Zap size={20} />
                      <span className="text-xs font-black uppercase tracking-widest">Miller High-Yield</span>
                    </div>
                    <p className="text-lg font-bold italic leading-relaxed">
                      "{step.millerPearl}"
                    </p>
                  </div>
                  <Info className="absolute -bottom-6 -right-6 text-white/10 opacity-30 group-hover:scale-110 transition-transform" size={120} />
               </div>

               <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-xl flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3 text-amber-500">
                    <AlertCircle size={18} />
                    <span className="text-xs font-black uppercase tracking-widest">Surgical Red Flag</span>
                  </div>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">
                    {currentStep === 2 ? "A lateral entry point will inevitably force the fracture into Varus during nail seating." :
                     currentStep === 5 ? "Never place the lag screw superiorly; this is the 'death zone' for bone purchase." :
                     "Watch the medial cortex. If it opens, the fracture is unstable."}
                  </p>
               </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-12 flex gap-4">
            <button 
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex-1 py-5 rounded-[24px] font-black uppercase text-[11px] tracking-widest flex items-center justify-center gap-2 transition-all ${currentStep === 0 ? 'bg-slate-100 text-slate-300' : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
            >
              <ChevronLeft size={18} /> Back
            </button>
            <button 
              onClick={nextStep}
              disabled={currentStep === PFN_STEPS.length - 1}
              className={`flex-[2] py-5 rounded-[24px] font-black uppercase text-[11px] tracking-widest flex items-center justify-center gap-2 transition-all ${currentStep === PFN_STEPS.length - 1 ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/20'}`}
            >
              {currentStep === PFN_STEPS.length - 1 ? 'End Guide' : 'Next Phase'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AlertCircle = ({ size = 20, className = "" }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export default ProximalFemoralNailingMiller;
