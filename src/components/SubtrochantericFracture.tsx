import React, { useState } from 'react';
import { 
  Activity, 
  Stethoscope, 
  ShieldAlert, 
  Bone, 
  Scaling,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  MoveUp,
  Hammer,
  Zap,
  Target,
  Dna,
  ArrowLeft,
  Compass,
  Settings
} from 'lucide-react';
import { motion } from "motion/react";
import SubtrochantericMillerLab from "./SubtrochantericMillerLab";
import SubtrochantericApleyLab from "./SubtrochantericApleyLab";

interface SubtrochantericFractureProps {
  onBack: () => void;
}

const SubtrochantericFracture = ({ onBack }: SubtrochantericFractureProps) => {
  const [activeTab, setActiveTab] = useState('anatomy');

  const tabs = [
    { id: 'anatomy', label: 'Deforming Forces', icon: Dna },
    { id: 'classification', label: 'Classification', icon: Bone },
    { id: 'management', label: 'Management', icon: Hammer },
    { id: 'surgical', label: 'Surgical Pearls', icon: Target },
    { id: 'miller', label: 'Miller Lab', icon: Settings },
    { id: 'apley', label: 'Apley Lab', icon: Compass },
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
              <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-indigo-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-100">
                <Scaling className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Subtrochanteric</h1>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">High-Energy Trauma</p>
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
                    ? 'bg-white text-indigo-600 shadow-sm' 
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
        {activeTab === 'anatomy' && <AnatomyView />}
        {activeTab === 'classification' && <ClassificationView />}
        {activeTab === 'management' && <ManagementView />}
        {activeTab === 'surgical' && <SurgicalView />}
        {activeTab === 'miller' && <SubtrochantericMillerLab />}
        {activeTab === 'apley' && <SubtrochantericApleyLab />}
      </main>
    </motion.div>
  );
};

// --- Sub-views ---

const AnatomyView = () => {
  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-2xl shadow-sm">
        <h2 className="text-indigo-800 font-bold text-lg flex items-center gap-2 mb-2">
          <ShieldAlert className="w-5 h-5 text-red-500" /> The Challenge of Reduction
        </h2>
        <p className="text-sm text-indigo-700 leading-relaxed">
          Subtrochanteric fractures occur in the area from the <strong>lesser trochanter to 5cm distal</strong>. This region is subject to intense muscular deforming forces and massive cortical stress (predominantly compressive on the medial side).
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <MoveUp className="w-5 h-5 text-red-500" /> Proximal Fragment Deformity
          </h3>
          <div className="space-y-4">
            <DeformingForce 
              muscle="Iliopsoas" 
              action="Flexion" 
              desc="Pulls the proximal fragment anteriorly." 
            />
            <DeformingForce 
              muscle="Gluteus Medius/Minimus" 
              action="Abduction" 
              desc="Pulls the proximal fragment laterally." 
            />
            <DeformingForce 
              muscle="Short Rotators" 
              action="External Rotation" 
              desc="Rotates the proximal fragment outward." 
            />
          </div>
        </section>

        <section className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" /> Distal Fragment Deformity
          </h3>
          <div className="space-y-4">
            <DeformingForce 
              muscle="Adductors" 
              action="Adduction" 
              desc="Pulls the distal shaft medially, creating varus." 
            />
            <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 mt-6">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">Resulting Malalignment</p>
              <div className="flex gap-2">
                <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded">VARUS</span>
                <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded">PROCURVATUM</span>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded">SHORTENING</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ClassificationView = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-4">Seinsheimer Classification</h3>
        <p className="text-sm text-slate-500 mb-6 font-medium italic">High-yield system based on the number of fragments and locations of fracture lines.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <SeinCard type="Type I" desc="Non-displaced (< 2mm)" />
          <SeinCard type="Type II" desc="Two-part (A: Transverse, B: Spiral/LT on proximal, C: Spiral/LT on distal)" />
          <SeinCard type="Type III" desc="Three-part (A: Spiral with 3rd frag LT, B: Spiral with 3rd frag butterfly)" />
          <SeinCard type="Type IV" desc="Comminuted (4+ fragments)" />
          <SeinCard type="Type V" desc="Subtrochanteric-intertrochanteric extension" />
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 text-white">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-400" /> Russell-Taylor System
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
            <h4 className="font-bold text-indigo-300">Type I</h4>
            <p className="text-xs text-slate-300 mt-1">Lesser Trochanter intact (A) or comminuted (B). No extension into piriformis fossa.</p>
          </div>
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
            <h4 className="font-bold text-red-400">Type II</h4>
            <p className="text-xs text-slate-300 mt-1">Fracture extends into piriformis fossa. Requires careful entry-point selection.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ManagementView = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <section className="bg-white rounded-2xl border shadow-sm p-6 border-l-4 border-l-indigo-600">
          <h3 className="font-bold text-indigo-700 flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5" /> Cephalomedullary Nail (Gold Standard)
          </h3>
          <p className="text-sm text-slate-600 mb-4">Provides superior biomechanical stability by being centromedullary and shortening the moment arm.</p>
          <ul className="space-y-3">
            <ManagementStep title="Indications" desc="Standard of care for most subtroch fractures. Allows early weight bearing." />
            <ManagementStep title="Entry Point" desc="Trochanteric (more lateral) vs Piriformis (axial alignment)." />
            <ManagementStep title="Locking" desc="Distal locking is essential to control rotation and length." />
          </ul>
        </section>
      </div>

      <div className="space-y-6">
        <section className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-amber-500" /> Plate Fixation (ORIF)
          </h3>
          <p className="text-sm text-slate-600 mb-4">95-degree Fixed-Angle Plate or Proximal Femoral Locking Plate.</p>
          <ul className="space-y-3">
            <ManagementStep title="Indications" desc="Extension into the femoral neck where a nail screw can't be placed, or in pediatric populations." />
            <ManagementStep title="Risks" desc="Increased blood loss, higher risk of non-union due to stripping of biology, and hardware failure." />
            <ManagementStep title="Technique" desc="Requires anatomical reduction and compression for healing." />
          </ul>
        </section>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
          <h4 className="text-amber-800 font-bold text-sm flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4" /> Atypical Femur Fracture (AFF)
          </h4>
          <p className="text-xs text-amber-700">
            Subtroch fractures in patients on long-term <strong>Bisphosphonates</strong>. Characteristic "beaking" of the lateral cortex. Requires prophylactic nailing if prodromal pain exists.
          </p>
        </div>
      </div>
    </div>
  );
};

const SurgicalView = () => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Hammer className="w-5 h-5 text-indigo-500" /> Reduction Techniques
          </h3>
          <div className="space-y-3">
            <ReductionPearl title="Percutaneous Clamps" desc="Aids in holding spiral patterns during nail passage." />
            <ReductionPearl title="Blocking (Poller) Screws" desc="Used to guide the nail and prevent varus/procurvatum malalignment." />
            <ReductionPearl title="The 'F-Tool' / Schanz Screw" desc="Joystick in the proximal fragment to counteract flexion/abduction." />
          </div>
        </section>

        <section className="bg-slate-50 border rounded-2xl p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-500" /> Complications
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-sm font-bold">Non-union</span>
              <span className="text-xs text-slate-500">Highest risk at the medial cortex</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-sm font-bold">Varus Malunion</span>
              <span className="text-xs text-slate-500">Most common technical error</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-sm font-bold">Hardware Breakage</span>
              <span className="text-xs text-slate-500">Occurs at the lag screw/nail junction</span>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-indigo-600 text-white rounded-2xl p-6 shadow-xl flex items-center gap-6">
        <Target className="w-12 h-12 text-indigo-200" />
        <div>
          <h4 className="font-bold text-lg">Board-Style High Yield</h4>
          <p className="text-sm text-indigo-100">
            A subtrochanteric fracture with <strong>Intertrochanteric extension</strong> (Russell-Taylor IIB) generally dictates the use of a piriformis fossa nail to ensure the starting point is within the fracture's stable corridor, or a specialized trochanteric entry nail with a reconstruction screw option.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Helpers ---

const DeformingForce = ({ muscle, action, desc }: any) => (
  <div className="p-3 border rounded-xl hover:border-indigo-200 hover:bg-indigo-50 transition-all">
    <div className="flex justify-between items-center mb-1">
      <span className="font-bold text-sm text-slate-800">{muscle}</span>
      <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded">{action}</span>
    </div>
    <p className="text-xs text-slate-500">{desc}</p>
  </div>
);

const SeinCard = ({ type, desc }: any) => (
  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white transition-colors">
    <h4 className="font-black text-xs text-indigo-600 mb-2 uppercase">{type}</h4>
    <p className="text-[10px] font-medium leading-relaxed text-slate-600">{desc}</p>
  </div>
);

const ManagementStep = ({ title, desc }: any) => (
  <li className="flex gap-3 group">
    <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500" />
    <div>
      <h5 className="font-bold text-xs text-slate-800">{title}</h5>
      <p className="text-[11px] text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </li>
);

const ReductionPearl = ({ title, desc }: any) => (
  <div className="flex items-start gap-3">
    <div className="p-1 bg-white border rounded shadow-sm">
      <CheckCircle2 className="w-3 h-3 text-green-500" />
    </div>
    <div>
      <h5 className="font-bold text-xs text-slate-800">{title}</h5>
      <p className="text-[11px] text-slate-500">{desc}</p>
    </div>
  </div>
);

export default SubtrochantericFracture;
