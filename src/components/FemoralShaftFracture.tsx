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
  Settings,
  Hammer,
  Zap,
  Info,
  ThermometerSnowflake,
  ArrowLeft,
  ChevronRight,
  MoveUp,
  Truck,
  Compass
} from 'lucide-react';
import { motion } from "motion/react";
import FemoralShaftMillerLab from "./FemoralShaftMillerLab";
import FemoralShaftApleyLab from "./FemoralShaftApleyLab";

interface FemoralShaftFractureProps {
  onBack: () => void;
}

const FemoralShaftFracture = ({ onBack }: FemoralShaftFractureProps) => {
  const [activeTab, setActiveTab] = useState('clinical');

  const tabs = [
    { id: 'clinical', label: 'Evaluation', icon: Stethoscope },
    { id: 'classification', label: 'Classification', icon: Bone },
    { id: 'surgery', label: 'Surgical Management', icon: Hammer },
    { id: 'dco', label: 'DCO vs ETC', icon: ShieldAlert },
    { id: 'miller', label: 'Miller Lab', icon: Settings },
    { id: 'apley', label: 'Apley Hub', icon: Truck },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20 transition-colors duration-300"
    >
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm transition-colors">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-emerald-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 p-2 rounded-lg shadow-lg shadow-emerald-100">
                <Activity className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Diaphyseal Fractures</h1>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Diaphyseal Trauma</p>
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
                    ? 'bg-white text-emerald-600 shadow-sm' 
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
        {activeTab === 'clinical' && <ClinicalView />}
        {activeTab === 'classification' && <ClassificationView />}
        {activeTab === 'surgery' && <SurgeryView />}
        {activeTab === 'dco' && <DcoView />}
        {activeTab === 'miller' && <FemoralShaftMillerLab />}
        {activeTab === 'apley' && <FemoralShaftApleyLab />}
      </main>
    </motion.div>
  );
};

// --- Sub-views ---

const ClinicalView = () => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <section className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-emerald-700">
              <Settings className="w-5 h-5" /> Diaphyseal Deforming Forces
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ForceCard 
                muscle="Proximal (Gluteals/Iliopsoas)" 
                result="Abduction and Flexion" 
              />
              <ForceCard 
                muscle="Distal (Adductors)" 
                result="Varus and Shortening" 
              />
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
              <Scaling className="text-emerald-600 w-5 h-5" /> Essential Imaging
            </h2>
            <div className="space-y-3">
              <ImageStep title="Full Femur AP/Lateral" desc="Must include hip and knee joints to assess for extension or associated injuries." />
              <ImageStep title="Ipsilateral Hip Series" desc="2-6% association with femoral neck fractures. Often missed (up to 30% missed rate)." />
              <ImageStep title="Chest X-Ray" desc="Part of ATLS. Assess for pulmonary injury or potential fat emboli baseline." />
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h3 className="font-bold flex items-center gap-2 mb-3 text-amber-800">
              <AlertTriangle className="w-5 h-5" /> Associated Neck Fracture
            </h3>
            <p className="text-xs text-amber-700 leading-relaxed mb-4">
              High-energy mechanisms often mask an ipsilateral femoral neck fracture. 
            </p>
            <ul className="text-[11px] text-amber-800 space-y-2 list-disc pl-4 font-medium">
              <li>Occurs in ~2-6% of shaft fractures</li>
              <li>Vertical fracture pattern common</li>
              <li>Usually non-displaced</li>
              <li><strong>Protocol:</strong> Fine cut CT hip pre-op + Intra-op fluoroscopy</li>
            </ul>
          </div>

          <div className="bg-emerald-900 text-white rounded-2xl p-6 shadow-xl">
             <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
               <Zap className="w-4 h-4" /> Board Fact
             </h4>
             <p className="text-sm text-emerald-100">
               "Reamed intramedullary nailing is the gold standard. Reaming increases the local blood supply (endosteal stripping compensated by periosteal flow) and allows for a larger nail."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClassificationView = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <h3 className="text-xl font-bold mb-2">Winquist-Hansen Classification</h3>
        <p className="text-sm text-slate-500 mb-6 font-medium italic">Based on the degree of comminution and cortical contact.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <WinCard grade="0" desc="Simple, no comminution" status="Stable" />
          <WinCard grade="I" desc="Small butterfly (< 25% width)" status="Stable" />
          <WinCard grade="II" desc="Moderate butterfly (< 50% width)" status="Stable-ish" />
          <WinCard grade="III" desc="Large butterfly (> 50% width)" status="Unstable" />
          <WinCard grade="IV" desc="Comminuted, no cortical contact" status="Highly Unstable" />
        </div>
      </div>

      <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-6">
        <h4 className="font-bold text-slate-700 mb-2">Mechanical Impact</h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          Winquist III and IV fractures rely entirely on the intramedullary nail for length and rotational stability. Static interlocking (proximal and distal screws) is mandatory in these patterns to prevent shortening and malrotation.
        </p>
      </div>
    </div>
  );
};

const SurgeryView = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <section className="bg-white rounded-2xl border shadow-sm p-6 border-l-4 border-l-emerald-600">
          <h3 className="font-bold text-emerald-700 flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5" /> Antegrade Nailing
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Piriformis Entry</p>
                <p className="text-xs font-semibold">Direct axial alignment. Lower risk of malalignment.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Trochanteric Entry</p>
                <p className="text-xs font-semibold">Easier in obese patients. Reduced surgical time.</p>
              </div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl">
              <p className="text-xs font-bold text-emerald-800">Best For:</p>
              <p className="text-xs text-emerald-700">Standard shaft fractures, proximal third fractures.</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold text-blue-700 flex items-center gap-2 mb-4">
            <MoveUp className="w-5 h-5" /> Retrograde Nailing
          </h3>
          <p className="text-sm text-slate-600 mb-4">Entry point is through the intercondylar notch of the distal femur.</p>
          <ul className="space-y-2">
            <ManagementBullet title="Ipsilateral Hip Fracture" desc="Allows for independent fixation of the femoral neck (screws or SHS)." />
            <ManagementBullet title="Obesity" desc="Avoids the difficult gluteal/trochanteric entry site." />
            <ManagementBullet title="Multiple Trauma" desc="Can be done on a radiolucent table without a traction post." />
            <ManagementBullet title="Floating Knee" desc="Allows fixation of femur and tibia through a single incision." />
          </ul>
        </section>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-400" /> Technical Nuances
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
              <p><span className="text-emerald-400 font-bold">Reaming:</span> Reamed nails have lower non-union rates than unreamed nails.</p>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
              <p><span className="text-emerald-400 font-bold">Traction Table:</span> Risk of pudendal nerve palsy if excessive traction or large post used.</p>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
              <p><span className="text-emerald-400 font-bold">Malrotation:</span> Compare cortical thickness and lesser trochanter size to the contralateral side.</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
          <h4 className="text-red-800 font-bold text-sm flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4" /> Fat Embolism Syndrome (FES)
          </h4>
          <p className="text-xs text-red-700 mb-3 font-medium">Classic Triad: Hypoxemia, Neurological Changes, Petechial Rash.</p>
          <div className="bg-white/60 p-3 rounded-lg border border-red-100 text-[10px] text-red-800">
            <strong>Gurd's Criteria:</strong> 1 major + 4 minor. Treatment is supportive (O2, ventilation). Early stabilization of the femur reduces incidence.
          </div>
        </div>
      </div>
    </div>
  );
};

const DcoView = () => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl border shadow-sm p-6 border-t-4 border-t-blue-500">
          <h3 className="font-bold text-blue-700 flex items-center gap-2 mb-4">
            Early Total Care (ETC)
          </h3>
          <div className="space-y-4">
            <p className="text-sm text-slate-600">Definitive stabilization with an IM nail within 24 hours.</p>
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-xs font-bold text-blue-800">Patient Status:</p>
              <ul className="text-xs text-blue-700 list-disc pl-4 mt-1 space-y-1">
                <li>Stable hemodynamics</li>
                <li>No severe coagulopathy</li>
                <li>pH &gt; 7.25</li>
                <li>Lactate &lt; 2.5 mmol/L</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border shadow-sm p-6 border-t-4 border-t-red-500">
          <h3 className="font-bold text-red-700 flex items-center gap-2 mb-4">
            Damage Control (DCO)
          </h3>
          <div className="space-y-4">
            <p className="text-sm text-slate-600">Rapid external fixation followed by delayed IM nailing once stable (5-10 days).</p>
            <div className="p-4 bg-red-50 rounded-xl">
              <p className="text-xs font-bold text-red-800">Patient Status (The "In Extremis" / Borderline):</p>
              <ul className="text-xs text-red-700 list-disc pl-4 mt-1 space-y-1">
                <li>Persistent hypotension / Coagulopathy</li>
                <li>Hypothermia (&lt; 35°C)</li>
                <li>Severe bilateral lung contusions</li>
                <li>Head injury (preventing hypotensive episodes)</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-amber-100 border border-amber-200 rounded-2xl p-6 flex items-center gap-6">
        <ThermometerSnowflake className="w-10 h-10 text-amber-600 shrink-0" />
        <div>
          <h4 className="font-bold text-amber-800">The "Second Hit" Phenomenon</h4>
          <p className="text-sm text-amber-700 leading-relaxed">
            Major surgery (like IM nailing) can provoke a systemic inflammatory response (SIRS). In a severely injured patient, this "second hit" can lead to Multi-Organ Dysfunction Syndrome (MODS). Damage control external fixation minimizes this secondary inflammatory surge.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Helpers ---

const ForceCard = ({ muscle, result }: any) => (
  <div className="p-3 border rounded-xl bg-slate-50">
    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{muscle}</p>
    <p className="text-sm font-bold text-emerald-700">{result}</p>
  </div>
);

const ImageStep = ({ title, desc }: any) => (
  <div className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 group-hover:scale-125 transition-transform" />
    <div>
      <h5 className="font-bold text-sm text-slate-800">{title}</h5>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
  </div>
);

const WinCard = ({ grade, desc, status }: any) => (
  <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col items-center text-center">
    <span className="text-2xl font-black text-emerald-600 mb-1">{grade}</span>
    <p className="text-[10px] font-bold uppercase text-slate-400 mb-2">{status}</p>
    <p className="text-xs text-slate-600 font-medium leading-tight">{desc}</p>
  </div>
);

const ManagementBullet = ({ title, desc }: any) => (
  <li className="flex gap-3 group">
    <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-blue-500" />
    <div>
      <h5 className="font-bold text-xs text-slate-800 group-hover:text-blue-600 transition-colors">{title}</h5>
      <p className="text-[11px] text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </li>
);

export default FemoralShaftFracture;
