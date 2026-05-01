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
  Target,
  Layers,
  ArrowLeft,
  ChevronRight,
  Anchor,
  Compass
} from 'lucide-react';
import { motion } from "motion/react";
import DistalFemurMillerLab from "./DistalFemurMillerLab";
import DistalFemurApleyLab from "./DistalFemurApleyLab";

interface DistalFemurFractureProps {
  onBack: () => void;
}

const DistalFemurFracture = ({ onBack }: DistalFemurFractureProps) => {
  const [activeTab, setActiveTab] = useState('anatomy');

  const tabs = [
    { id: 'anatomy', label: 'Anatomy & Forces', icon: Stethoscope },
    { id: 'classification', label: 'AO/OTA Class', icon: Layers },
    { id: 'management', label: 'Management', icon: Hammer },
    { id: 'pearls', label: 'Surgical Pearls', icon: Target },
    { id: 'miller', label: 'Miller Hub', icon: Settings },
    { id: 'apley', label: 'Apley Hub', icon: Compass },
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
              <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-violet-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-violet-600 p-2 rounded-lg shadow-lg shadow-violet-100">
                <Bone className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Distal Femur</h1>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Supracondylar & Intercondylar</p>
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
                    ? 'bg-white text-violet-600 shadow-sm' 
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
        {activeTab === 'pearls' && <PearlsView />}
        {activeTab === 'miller' && <DistalFemurMillerLab />}
        {activeTab === 'apley' && <DistalFemurApleyLab />}
      </main>
    </motion.div>
  );
};

// --- Sub-views ---

const AnatomyView = () => {
  return (
    <div className="space-y-6">
      <div className="bg-violet-50 border-l-4 border-violet-500 p-6 rounded-r-2xl shadow-sm">
        <h2 className="text-violet-800 font-bold text-lg flex items-center gap-2 mb-2">
          <Settings className="w-5 h-5" /> Deforming Forces Visualizer
        </h2>
        <p className="text-sm text-violet-700 leading-relaxed">
          Distal femur fractures are notoriously difficult to reduce because of powerful muscle attachments. Understanding these forces is critical for choosing your entry point and reduction aids.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-500" /> Distal Fragment
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
              <p className="text-xs font-bold text-orange-800 uppercase mb-1">Gastrocnemius</p>
              <p className="text-sm font-bold text-slate-800">Posterior Tilt (Extension)</p>
              <p className="text-xs text-orange-600 mt-1">Pulls the condyles posteriorly, complicating retrograde nail entry.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Quadriceps / Hamstrings</p>
              <p className="text-sm font-bold text-slate-800">Shortening & Proximal Migration</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-500" /> Proximal Fragment
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-xs font-bold text-blue-800 uppercase mb-1">Adductor Magnus</p>
              <p className="text-sm font-bold text-slate-800">Medial Deviation (Varus)</p>
              <p className="text-xs text-blue-600 mt-1">Commonly creates a varus deformity at the supracondylar level.</p>
            </div>
            <div className="bg-slate-900 text-white rounded-2xl p-6 mt-4">
              <h4 className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-2">Blood Supply Tip</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                The <span className="text-white font-bold">Popliteal Artery</span> is tethered at the adductor hiatus and is at risk in posterior-displaced fractures. Perform ABI if suspected.
              </p>
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
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-violet-600" /> AO/OTA 33-Classification
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <span className="text-2xl font-black text-emerald-600">33-A</span>
            <p className="text-xs font-bold text-emerald-800 uppercase mt-1">Extra-articular</p>
            <p className="text-[11px] text-emerald-700 mt-2 italic">Supracondylar region only. Can often be treated with IMN or Plates.</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
            <span className="text-2xl font-black text-amber-600">33-B</span>
            <p className="text-xs font-bold text-amber-800 uppercase mt-1">Partial Articular</p>
            <p className="text-[11px] text-amber-700 mt-2 italic">Unicondylar fractures. Includes Hoffa fractures (Coronal plane B3).</p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <span className="text-2xl font-black text-red-600">33-C</span>
            <p className="text-xs font-bold text-red-800 uppercase mt-1">Complete Articular</p>
            <p className="text-[11px] text-red-700 mt-2 italic">Bi-condylar extension. Requires anatomical articular reduction.</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <h4 className="text-amber-800 font-bold flex items-center gap-2 mb-2">
          <ShieldAlert className="w-5 h-5" /> Hoffa Fracture Alert (33-B3)
        </h4>
        <p className="text-sm text-amber-700">
          A coronal plane fracture of the condyle (usually lateral). Often missed on plain film; <span className="font-bold underline">CT is mandatory</span>. Requires headless compression screws (AP or PA direction).
        </p>
      </div>
    </div>
  );
};

const ManagementView = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <section className="bg-white rounded-2xl border shadow-sm p-6 border-l-4 border-l-violet-600">
          <h3 className="font-bold text-violet-700 flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5" /> Retrograde IM Nail
          </h3>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="font-bold text-slate-700">Indications:</p>
              <ul className="list-disc pl-4 mt-1 text-xs text-slate-500 space-y-1">
                <li>33-A (Extra-articular) patterns.</li>
                <li>Simple 33-C with manageable articular extension.</li>
                <li>Obesity (easier access than antegrade).</li>
                <li>Ipsilateral femoral shaft + distal fracture.</li>
              </ul>
            </div>
            <p className="text-xs text-slate-400 italic">
              *Requires careful starting point (intercondylar notch) to avoid intra-articular damage.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-2xl border shadow-sm p-6 border-l-4 border-l-blue-600">
          <h3 className="font-bold text-blue-700 flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5" /> Lateral Locking Plate
          </h3>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="font-bold text-slate-700">Indications:</p>
              <ul className="list-disc pl-4 mt-1 text-xs text-slate-500 space-y-1">
                <li>Complex articular (33-C) patterns.</li>
                <li>Hoffa fractures requiring buttress.</li>
                <li>Osteoporotic bone (fixed angle stability).</li>
                <li>Periprosthetic fractures (where nail entry is blocked).</li>
              </ul>
            </div>
            <p className="text-xs text-slate-400 italic">
              *Allows for "bridge plating" to maintain biology in comminuted supracondylar zones.
            </p>
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-violet-400" /> Surgical Logic
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="bg-violet-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 mt-1">1</div>
              <p className="text-sm"><span className="font-bold text-violet-400">Reduce Articular Surface First:</span> Convert a 33-C into a 33-A pattern with lag screws.</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-violet-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 mt-1">2</div>
              <p className="text-sm"><span className="font-bold text-violet-400">Restore Length & Rotation:</span> Use traction or a femoral distractor.</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-violet-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 mt-1">3</div>
              <p className="text-sm"><span className="font-bold text-violet-400">Fix Metaphysis to Diaphysis:</span> Plate or Nail construct.</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <h4 className="font-bold text-blue-800 text-sm flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4" /> Dual Plating?
          </h4>
          <p className="text-xs text-blue-700">
            Consider a medial plate in addition to a lateral plate if there is extreme medial comminution or in very osteoporotic bone to prevent varus collapse.
          </p>
        </div>
      </div>
    </div>
  );
};

const PearlsView = () => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Technical Success
          </h3>
          <ul className="space-y-4">
            <PearlItem title="Working Length" desc="For bridge plating, a long plate with low screw density is preferred to allow for secondary bone healing." />
            <PearlItem title="Reduction Aids" desc="Poller (Blocking) screws are vital for retrograde nailing to prevent malalignment in wide metaphyseal zones." />
            <PearlItem title="Starting Point" desc="Retrograde nail entry should be in line with the femoral canal on both AP and Lateral views." />
          </ul>
        </section>

        <section className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500" /> High-Risk Complications
          </h3>
          <div className="space-y-3">
            <ComplicationRow name="Knee Stiffness" rate="Common" note="Early ROM is vital. Goal is fixation stable enough for motion." />
            <ComplicationRow name="Non-union" rate="5-10%" note="Higher risk in smokers and overly rigid locking constructs." />
            <ComplicationRow name="Infection" rate="2-5%" note="Higher in open fractures or with extensive soft tissue stripping." />
            <ComplicationRow name="Malunion (Varus)" rate="Frequent" note="Result of failing to counteract the adductor pull." />
          </div>
        </section>
      </div>

      <div className="bg-violet-900 text-white rounded-2xl p-6 shadow-xl flex items-center gap-6">
        <Clock className="w-12 h-12 text-violet-200" />
        <div>
          <h4 className="font-bold text-lg">The "Periprosthetic" Factor</h4>
          <p className="text-sm text-violet-100 leading-relaxed">
            In fractures above a TKA (Total Knee Arthroplasty), use the <span className="text-white font-bold">Su Classification</span>. If the prosthesis is stable and the fracture is high enough, a retrograde nail can be passed if the femoral component is "open box." If it is "closed box," a lateral plate is required.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Helpers ---

const PearlItem = ({ title, desc }: any) => (
  <div className="flex items-start gap-3">
    <div className="p-1 bg-emerald-50 border border-emerald-100 rounded">
      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
    </div>
    <div>
      <h5 className="font-bold text-xs text-slate-800">{title}</h5>
      <p className="text-[11px] text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const ComplicationRow = ({ name, rate, note }: any) => (
  <div className="flex justify-between items-start border-b pb-2">
    <div className="max-w-[70%]">
      <p className="text-sm font-bold text-slate-800">{name}</p>
      <p className="text-[10px] text-slate-500 italic">{note}</p>
    </div>
    <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-1 rounded">{rate}</span>
  </div>
);

export default DistalFemurFracture;
