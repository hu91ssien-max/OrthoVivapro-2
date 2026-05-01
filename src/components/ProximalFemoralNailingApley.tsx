import React, { useState } from 'react';
import { 
  Hammer, 
  Settings, 
  Target, 
  AlertCircle, 
  ChevronRight, 
  Crosshair,
  ShieldCheck,
  Zap,
  Compass
} from 'lucide-react';

const SURGICAL_STEPS = [
  {
    id: 'setup',
    title: 'Patient Setup & Reduction',
    icon: Settings,
    color: 'bg-blue-500',
    details: [
      { label: 'Positioning', content: 'Supine on a radiolucent traction table. The torso is slightly abducted (10-15°) to the contralateral side to facilitate entry.' },
      { label: 'Reduction', content: 'Closed reduction via traction, internal rotation (to compensate for anteversion), and slight adduction.' },
      { label: 'Imaging', content: 'Ensure high-quality AP and Lateral C-arm views of the femoral head and shaft before scrubbing.' }
    ],
    pearl: "If the fracture is in varus, the nail will not correct it. You must achieve a neutral or slightly valgus reduction BEFORE reaming."
  },
  {
    id: 'entry',
    title: 'Entry Point & Reaming',
    icon: Target,
    color: 'bg-indigo-600',
    details: [
      { label: 'Location', content: 'The tip of the Greater Trochanter (GT) or slightly medial. In some designs, it is slightly anterior to the mid-coronal plane.' },
      { label: 'Incision', content: '5cm longitudinal incision proximal to the GT tip. Use a soft tissue protector.' },
      { label: 'Reaming', content: 'Rigid reaming of the proximal fragment to accommodate the nail diameter (usually 15-17mm for the proximal part).' }
    ],
    pearl: "Medializing the entry point too much risks iatrogenic fracture; being too lateral causes varus malalignment."
  },
  {
    id: 'fixation',
    title: 'Cephalocervical Screws',
    icon: Crosshair,
    color: 'bg-emerald-600',
    details: [
      { label: 'Guidewire', content: 'Place the lag screw guidewire in the lower half of the neck on AP and center-center on Lateral.' },
      { label: 'TAD', content: 'Aim for a Tip-Apex Distance (TAD) of < 25mm to minimize the risk of cut-out.' },
      { label: 'Anti-Rotation', content: 'If using a dual-screw nail, the cranial screw (anti-rotation) should be inserted first or second depending on the specific system.' }
    ],
    pearl: "Positioning the lag screw in the superior third of the head is the #1 predictor of mechanical failure (cut-out)."
  },
  {
    id: 'distal',
    title: 'Distal Locking',
    icon: ShieldCheck,
    color: 'bg-amber-600',
    details: [
      { label: 'Static vs Dynamic', content: 'Static locking for subtrochanteric fractures; dynamic locking (slot) for stable intertrochanteric fractures to allow compression.' },
      { label: 'Freehand', content: 'Usually performed using the "perfect circle" technique with the C-arm for distal holes.' }
    ],
    pearl: "In subtrochanteric fractures, ensure the nail is long enough to bypass the fracture by at least two cortical diameters."
  }
];

const ProximalFemoralNailingApley = () => {
  const [activeStep, setActiveStep] = useState(SURGICAL_STEPS[0]);

  return (
    <div className="bg-slate-50 flex flex-col font-sans text-slate-900 rounded-[3rem] overflow-hidden border border-slate-200">
      {/* Header */}
      <header className="bg-slate-900 text-white p-6 shadow-lg border-b-4 border-blue-600">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase flex items-center gap-2">
              <Hammer className="text-blue-400" /> PFN Mastery Lab
            </h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.3em] mt-1 italic">
              Intramedullary Fixation Protocol v2.5
            </p>
          </div>
          <div className="hidden md:block px-4 py-2 bg-white/5 rounded-xl border border-white/10">
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block">Primary Objective</span>
            <span className="text-xs font-bold text-white italic underline decoration-blue-500 underline-offset-4">TAD &lt; 25mm Fixation</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Step Navigation */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Procedure Timeline</h3>
          {SURGICAL_STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step)}
              className={`w-full text-left p-5 rounded-[2rem] border transition-all duration-300 flex items-center gap-4 group ${
                activeStep.id === step.id 
                  ? 'bg-white border-blue-200 shadow-xl ring-2 ring-blue-500/20 translate-x-2' 
                  : 'bg-white/50 border-transparent hover:border-slate-300 opacity-70 grayscale hover:grayscale-0'
              }`}
            >
              <div className={`p-3 rounded-2xl ${step.color} text-white shadow-lg`}>
                <step.icon size={20} />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Phase {SURGICAL_STEPS.indexOf(step) + 1}</span>
                <h4 className="text-sm font-bold text-slate-800">{step.title}</h4>
              </div>
              <ChevronRight size={16} className={`transition-opacity ${activeStep.id === step.id ? 'opacity-100' : 'opacity-0'}`} />
            </button>
          ))}

          {/* Pitfalls Card */}
          <div className="mt-8 p-6 bg-red-50 border border-red-100 rounded-[2.5rem]">
            <h4 className="text-xs font-black text-red-600 uppercase mb-3 flex items-center gap-2">
              <AlertCircle size={14} /> The Z-Effect Danger
            </h4>
            <p className="text-[11px] text-red-800 font-medium leading-relaxed italic">
              In dual-screw PFNs, "Z-effect" occurs when the superior screw migrates laterally while the inferior screw migrates medially. Prevent this by using larger diameter screws or single-screw designs in osteoporotic bone.
            </p>
          </div>
        </div>

        {/* Details Display */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[3.5rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-2xl ${activeStep.color} text-white`}>
                  <activeStep.icon size={28} />
                </div>
                <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">{activeStep.title}</h2>
              </div>

              <div className="grid md:grid-cols-1 gap-6 mb-8">
                {activeStep.details.map((item, idx) => (
                  <div key={idx} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl">
                    <h5 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">{item.label}</h5>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium italic">{item.content}</p>
                  </div>
                ))}
              </div>

              {/* The Pearl */}
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] relative group overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2 italic">
                    <Zap size={14} className="fill-blue-400" /> Surgeon's Golden Pearl
                  </h4>
                  <p className="text-lg font-bold italic leading-snug">
                    "{activeStep.pearl}"
                  </p>
                </div>
                <Compass className="absolute -bottom-10 -right-10 text-white/5 rotate-12 group-hover:rotate-45 transition-transform duration-700" size={200} />
              </div>
            </div>
            <div className={`absolute top-0 right-0 w-32 h-32 ${activeStep.color} opacity-5 blur-[100px]`} />
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'TAD Goal', value: '< 25mm', icon: Target },
              { label: 'Neck Angle', value: '125° - 135°', icon: Compass },
              { label: 'Stability', icon: ShieldCheck, value: 'Rotational' }
            ].map((metric, i) => (
              <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 text-center shadow-sm">
                <div className="flex justify-center mb-2 text-blue-600"><metric.icon size={18} /></div>
                <span className="block text-[10px] font-black text-slate-400 uppercase">{metric.label}</span>
                <span className="block text-sm font-black text-slate-800">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-8 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Procedural Status: Optimized</span>
            </div>
          </div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter text-right">
            Technique applies to AO/OTA 31-A1, A2, and A3 Fractures
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProximalFemoralNailingApley;
