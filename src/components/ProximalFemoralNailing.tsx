import React, { useState } from 'react';
import { 
  Activity, 
  Settings, 
  ShieldAlert, 
  Bone, 
  Scaling,
  Hammer,
  Zap,
  Target,
  Maximize,
  ClipboardList,
  Eye,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  Beaker,
  GraduationCap
} from 'lucide-react';
import { motion } from "motion/react";
import ProximalFemoralNailingApley from './ProximalFemoralNailingApley';
import ProximalFemoralNailingMiller from './ProximalFemoralNailingMiller';

interface ProximalFemoralNailingProps {
  onBack: () => void;
}

const ProximalFemoralNailing = ({ onBack }: ProximalFemoralNailingProps) => {
  const [activeTab, setActiveTab] = useState('setup');

  const tabs = [
    { id: 'setup', label: 'Positioning & Setup', icon: Settings },
    { id: 'reduction', label: 'Reduction & Entry', icon: Target },
    { id: 'procedure', label: 'Operative Steps', icon: Hammer },
    { id: 'pitfalls', label: 'Technical Pearls', icon: ShieldAlert },
    { id: 'apley', label: 'Apley Lab', icon: Beaker },
    { id: 'miller', label: 'Miller Lab', icon: GraduationCap },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20"
    >
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-slate-900" />
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-slate-800 p-2 rounded-lg shadow-lg">
                <Hammer className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Proximal Femoral Nailing</h1>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Surgical Technique</p>
              </div>
            </div>
          </div>
          
          <nav className="flex bg-slate-100 p-1 rounded-xl overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-6 pb-20 animate-in fade-in duration-500">
        {activeTab === 'setup' && <SetupView />}
        {activeTab === 'reduction' && <ReductionView />}
        {activeTab === 'procedure' && <ProcedureView />}
        {activeTab === 'pitfalls' && <PitfallsView />}
        {activeTab === 'apley' && <ProximalFemoralNailingApley />}
        {activeTab === 'miller' && <ProximalFemoralNailingMiller />}
      </main>
    </motion.div>
  );
};

// --- Sub-views ---

const SetupView = () => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
            <Maximize className="text-blue-600 w-5 h-5" /> Patient Positioning
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm font-bold text-blue-800">Fracture Table (Standard)</p>
              <ul className="text-xs text-blue-700 mt-2 space-y-1 list-disc pl-4">
                <li>Supine on traction table.</li>
                <li>Perineal post should be padded to avoid nerve palsy.</li>
                <li>Affected leg in neutral or slight adduction (helps entry point).</li>
                <li>Contralateral leg "scissored" down or in well-leg holder.</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-sm font-bold text-slate-800">C-Arm Orientation</p>
              <p className="text-xs text-slate-500 mt-1">
                Ensure a clear "True AP" and "True Lateral" can be obtained before scrubbing. If you can't see the neck on lateral, do not start.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
            <ClipboardList className="text-emerald-600 w-5 h-5" /> Pre-Op Checklist
          </h2>
          <div className="space-y-3">
            <CheckItem label="Confirm implant availability (Short vs Long nail)" />
            <CheckItem label="Verify lag screw and locking bolt lengths" />
            <CheckItem label="Review templating (CCD angle, usually 125° or 130°)" />
            <CheckItem label="Check ABI in high-energy/displaced patterns" />
          </div>
          <div className="mt-6 bg-amber-50 border border-amber-200 p-4 rounded-xl">
             <p className="text-xs text-amber-800 font-bold flex items-center gap-2">
               <AlertCircle className="w-4 h-4" /> Tip:
             </p>
             <p className="text-xs text-amber-700 mt-1 italic">
               "For subtrochanteric fractures, consider using a flat radiolucent table if manual traction is sufficient, as this allows for easier manipulation to counteract deforming forces."
             </p>
          </div>
        </section>
      </div>
    </div>
  );
};

const ReductionView = () => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-rose-700">
            <Target className="w-5 h-5" /> Achieving Reduction
          </h2>
          <div className="space-y-4">
            <div className="border-b pb-3">
              <p className="text-sm font-bold">Closed Reduction</p>
              <p className="text-xs text-slate-500 italic">Traction + Internal Rotation (IT fractures) vs Flexion/Abduction (Subtroch).</p>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 mb-2">Manual Reduction Aids:</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-[11px] bg-slate-100 p-2 rounded">Bone Hooks (for apex-anterior)</div>
                <div className="text-[11px] bg-slate-100 p-2 rounded">Percutaneous Schanz Screws</div>
                <div className="text-[11px] bg-slate-100 p-2 rounded">Cobb elevator for soft tissue</div>
                <div className="text-[11px] bg-slate-100 p-2 rounded">Cerclage wires (if spiral)</div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-indigo-700">
            <Bone className="w-5 h-5" /> The Starting Point
          </h2>
          <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl mb-4">
            <p className="text-xs font-bold text-indigo-800 uppercase mb-1">Standard Entry Point</p>
            <p className="text-sm font-bold">Tip of Greater Trochanter (GT)</p>
            <p className="text-[11px] text-indigo-600 mt-1">Usually slightly medial to the exact tip on AP view, and centered on the Lateral view.</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs p-2 border-b">
              <span className="font-medium">AP View</span>
              <span className="text-slate-500">Just medial to tip of GT</span>
            </div>
            <div className="flex justify-between items-center text-xs p-2 border-b">
              <span className="font-medium">Lateral View</span>
              <span className="text-slate-500">Mid-line of the GT</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg">
             <p className="text-[10px] text-red-700 font-bold">DANGER ZONE:</p>
             <p className="text-[11px] text-red-600 mt-0.5 font-medium">A starting point that is too lateral will cause <strong>Varus Malalignment</strong> as the nail is inserted.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

const ProcedureView = () => {
  const steps = [
    { title: "Incision", desc: "5cm proximal to the tip of the greater trochanter." },
    { title: "Entry", desc: "Awl or percutaneous drill followed by the guide wire into the femoral shaft." },
    { title: "Reaming", desc: "Proximal reaming to accommodate the nail's proximal diameter (~15-17mm)." },
    { title: "Nail Insertion", desc: "Insert nail manually; avoid heavy hammering to prevent iatrogenic fractures." },
    { title: "Cephalic Lag Screw", desc: "Guide wire placement into the head. Aim for center-center on AP/Lat." },
    { title: "Distal Locking", desc: "Controlled by jig (short nail) or free-hand (long nail)." }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="bg-slate-900 p-6 text-white">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <ClipboardList className="text-emerald-400 w-5 h-5" /> Step-by-Step Operative Workflow
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 relative">
            {/* Visual connector line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-slate-100 -translate-x-1/2 border-dashed border-l" />
            
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4 items-start relative group">
                <div className="bg-emerald-100 text-emerald-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-sm border border-emerald-200 z-10 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-xl">
          <h4 className="font-bold text-sm uppercase tracking-widest text-indigo-300 mb-4 flex items-center gap-2">
            <Eye className="w-4 h-4" /> Fluoroscopy Checks
          </h4>
          <ul className="space-y-3 text-xs">
            <li className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verify lag screw is ~5-10mm from subchondral bone.</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Lateral view must show lag screw in the center of the femoral head.</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>AP view must show the lag screw below the superior cortex (avoid "superior" placement).</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white border rounded-2xl p-6 flex flex-col justify-center text-center">
          <Scaling className="w-10 h-10 text-slate-200 mx-auto mb-2" />
          <p className="text-xs font-bold text-slate-400 uppercase">Implant Decision</p>
          <div className="flex gap-4 mt-4 justify-center">
            <div className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold">Short Nail (180-200mm)</div>
            <div className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold">Long Nail (340-420mm)</div>
          </div>
          <p className="text-[10px] text-slate-400 mt-4 leading-tight italic">
            Long nails are mandatory for subtrochanteric extension or in very osteoporotic bone to avoid stress risers at the tip.
          </p>
        </div>
      </div>
    </div>
  );
};

const PitfallsView = () => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <PitfallCard 
          title="Lag Screw Cutout" 
          risk="High TAD (>25mm)" 
          fix="Aim for center-center. Use helical blades in osteoporosis." 
        />
        <PitfallCard 
          title="Varus Malunion" 
          risk="Lateral Starting Point" 
          fix="Ensure entry is medial to GT tip. Use blocking screws if needed." 
        />
        <PitfallCard 
          title="Z-Effect" 
          risk="Dual Screw Nails" 
          fix="Ensure adequate screw length and parallel placement." 
        />
      </div>

      <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Scaling className="w-40 h-40" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-orange-400" /> The "Tip-Apex Distance" Rule
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            Sum of the distance from the tip of the lag screw to the apex of the femoral head on both AP and Lateral views. <strong>TAD &lt; 25mm</strong> is the single most important surgeon-controlled factor for preventing hardware failure.
          </p>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-3xl font-black text-orange-400">{'<'}25</div>
              <div className="text-[10px] uppercase font-bold text-slate-500">Threshold (mm)</div>
            </div>
            <div className="h-12 w-px bg-slate-700" />
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-400">8-10</div>
              <div className="text-[10px] uppercase font-bold text-slate-500">Ideal Depth (mm)</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
        <AlertTriangle className="w-12 h-12 text-rose-500 shrink-0" />
        <div>
          <h4 className="font-bold text-rose-800">Iatrogenic Femur Fracture</h4>
          <p className="text-sm text-rose-700 leading-relaxed">
            Usually occurs during nail insertion if the proximal reaming is insufficient or the nail is hammered into a mismatched radius of curvature. <strong>Stop hammering</strong> if resistance is met and re-ream or choose a smaller nail.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Helpers ---

const CheckItem = ({ label }: any) => (
  <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
    <div className="w-4 h-4 rounded border-2 border-slate-300 flex items-center justify-center">
      <div className="w-2 h-2 bg-emerald-500 rounded-sm opacity-0 hover:opacity-100 transition-opacity" />
    </div>
    <span className="text-xs font-medium text-slate-700">{label}</span>
  </div>
);

const PitfallCard = ({ title, risk, fix }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
    <h4 className="font-bold text-slate-800 text-sm mb-2">{title}</h4>
    <div className="space-y-2">
      <p className="text-[10px] font-bold uppercase text-red-500">Risk Factor:</p>
      <p className="text-xs text-slate-600">{risk}</p>
      <div className="h-px bg-slate-100 my-2" />
      <p className="text-[10px] font-bold uppercase text-emerald-600">The Fix:</p>
      <p className="text-xs text-slate-600">{fix}</p>
    </div>
  </div>
);

export default ProximalFemoralNailing;
