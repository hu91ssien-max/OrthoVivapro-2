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
  MoveDown,
  Hammer,
  Zap,
  ArrowLeft,
  ChevronRight,
  Settings
} from 'lucide-react';
import { motion } from "motion/react";
import IntertrochantericApley from "./IntertrochantericApley";
import IntertrochantericApleyLab from "./IntertrochantericApleyLab";

interface IntertrochantericFractureProps {
  onBack: () => void;
}

const IntertrochantericFracture = ({ onBack }: IntertrochantericFractureProps) => {
  const [activeTab, setActiveTab] = useState('stability');

  const mainTabs = [
    { id: 'stability', label: 'Stability Assessment', icon: Zap },
    { id: 'classification', label: 'Classification', icon: Bone },
    { id: 'management', label: 'Management', icon: Hammer },
    { id: 'surgical-pearls', label: 'Surgical Pearls', icon: ShieldAlert },
  ];

  const sidebarTabs = [
    { id: 'apley', label: 'Miller Lab', icon: Hammer, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'apley_lab', label: 'Apley Lab', icon: Settings, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20"
    >
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-orange-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-orange-600 p-2 rounded-lg shadow-lg shadow-orange-100">
                <Activity className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Intertrochanteric</h1>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Trauma Dashboard</p>
              </div>
            </div>
          </div>
          
          <nav className="flex bg-slate-100 p-1 rounded-xl overflow-x-auto no-scrollbar">
            {mainTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap uppercase tracking-wider ${
                    activeTab === tab.id 
                    ? 'bg-white text-orange-600 shadow-sm' 
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

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-4 md:p-6">
        {/* Left Sidebar for specialized content */}
        <aside className="w-full lg:w-64 shrink-0 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Specialist Guides</h3>
            <div className="space-y-2">
              {sidebarTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all group ${
                      isActive 
                      ? 'bg-slate-900 text-white shadow-xl translate-x-1' 
                      : 'hover:bg-slate-50 text-slate-600 border border-transparent hover:border-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${isActive ? tab.bg : 'group-hover:' + tab.bg} transition-colors`}>
                        <Icon className={`w-4 h-4 ${isActive ? tab.color : 'text-slate-400 group-hover:' + tab.color}`} />
                      </div>
                      <span className="text-xs font-black uppercase tracking-tight">{tab.label}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-0' : '-translate-x-2 group-hover:translate-x-0'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-6 rounded-3xl text-white shadow-lg overflow-hidden relative group">
            <div className="relative z-10">
              <h4 className="text-xs font-black uppercase tracking-widest mb-2 opacity-80">Revision AI</h4>
              <p className="text-[11px] font-medium leading-relaxed italic">
                Always check lateral wall thickness. If &lt; 20.5mm, SHS is contraindicated.
              </p>
            </div>
            <TrendingUp className="absolute bottom-[-10px] right-[-10px] text-white/10 w-24 h-24 rotate-12 transition-transform group-hover:scale-110" />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 animate-in fade-in duration-500">
          {activeTab === 'stability' && <StabilityView />}
          {activeTab === 'classification' && <ClassificationView />}
          {activeTab === 'management' && <ManagementView />}
          {activeTab === 'surgical-pearls' && <PearlsView />}
          {activeTab === 'apley' && <IntertrochantericApley />}
          {activeTab === 'apley_lab' && <IntertrochantericApleyLab />}
        </main>
      </div>
    </motion.div>
  );
};

// --- Sub-views ---

const StabilityView = () => {
  const unstableCriteria = [
    { title: "Reverse Obliquity", desc: "Fracture line extends from lateral cortex to medial cortex proximally.", icon: <MoveDown className="text-red-500" /> },
    { title: "Posteromedial Comminution", desc: "Loss of the calcar femorale (medial wall) leads to collapse.", icon: <XCircle className="text-red-500" /> },
    { title: "Subtrochanteric Extension", desc: "Fracture propagates below the level of the lesser trochanter.", icon: <Scaling className="text-red-500" /> },
    { title: "Large Greater Trochanter Fragment", desc: "Weakens the lateral wall, making SHS fixation risky.", icon: <Bone className="text-red-500" /> }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-2xl shadow-sm">
        <h2 className="text-orange-800 font-bold text-lg flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5" /> The Stability Paradigm
        </h2>
        <p className="text-sm text-orange-700 leading-relaxed">
          Unlike femoral neck fractures, IT fractures are <strong>extracapsular</strong> with a robust blood supply. The primary clinical challenge is not AVN, but <strong>stability and fixation failure</strong>. Stability depends on the integrity of the posteromedial cortex (calcar femorale).
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-600" /> Unstable Fracture Criteria
          </h3>
          <div className="space-y-4">
            {unstableCriteria.map((c, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="bg-slate-100 p-2 rounded-lg h-fit">{c.icon}</div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">{c.title}</h4>
                  <p className="text-xs text-slate-500">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-white rounded-2xl border shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Scaling className="w-5 h-5 text-blue-600" /> AO/OTA Triage
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                <span className="text-xs font-black text-green-700 uppercase">31-A1</span>
                <p className="text-sm font-bold text-green-800">Simple, 2-part (Stable)</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                <span className="text-xs font-black text-amber-700 uppercase">31-A2</span>
                <p className="text-sm font-bold text-amber-800">Multi-fragmentary (Unstable)</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                <span className="text-xs font-black text-red-700 uppercase">31-A3</span>
                <p className="text-sm font-bold text-red-800">Reverse/Transverse (Very Unstable)</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl">
             <h4 className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2 flex items-center gap-2">
               <TrendingUp className="w-4 h-4" /> Board Exam Pearl
             </h4>
             <p className="text-sm text-slate-300">
               "The <strong>lateral wall thickness</strong> is the best predictor of intraoperative fracture during SHS placement. If the lateral wall is &lt; 20.5mm, choose an Intramedullary Nail."
             </p>
          </div>
        </section>
      </div>
    </div>
  );
};

const ClassificationView = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      <div className="bg-white rounded-2xl border shadow-sm p-8">
        <h3 className="text-xl font-bold mb-6">Evans Classification (Stability Based)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <EvansCard type="Type I" desc="Two-part non-displaced" status="Stable" color="green" />
          <EvansCard type="Type II" desc="Two-part displaced" status="Stable (Reduced)" color="blue" />
          <EvansCard type="Type III" desc="Three-part (Posterolateral)" status="Unstable" color="amber" />
          <EvansCard type="Type IV" desc="Three-part (Posteromedial)" status="Unstable" color="orange" />
          <EvansCard type="Type V" desc="Four-part comminution" status="Highly Unstable" color="red" />
          <EvansCard type="Type VI" desc="Reverse Obliquity" status="Mechanical Nightmare" color="rose" />
        </div>
      </div>
    </div>
  );
};

const ManagementView = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 animate-in slide-in-from-bottom duration-500">
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h3 className="font-bold text-blue-700 flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5" /> Sliding Hip Screw (SHS)
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm font-bold text-blue-800">Indication:</p>
              <p className="text-xs text-blue-600">Stable, 2-part fractures (31-A1) and some A2 fractures with intact lateral wall.</p>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
              <li>Allows controlled collapse and compression.</li>
              <li>Lower cost compared to nails.</li>
              <li>Lower risk of femur shaft fracture.</li>
              <li>Contraindicated in reverse obliquity.</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl border p-6 shadow-sm border-l-4 border-l-orange-500">
          <h3 className="font-bold text-orange-700 flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5" /> Intramedullary Nail (IMN)
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-orange-50 rounded-xl border border-orange-100">
              <p className="text-sm font-bold text-orange-800">Indication:</p>
              <p className="text-xs text-orange-600">All unstable patterns, reverse obliquity (A3), subtrochanteric extension, or thin lateral wall.</p>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
              <li>Load-sharing device (shorter moment arm).</li>
              <li>Superior for reverse obliquity (prevents medialization).</li>
              <li>Allows for smaller incision / percutaneous technique.</li>
              <li>Better for elderly with poor bone quality.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-8 text-white flex flex-col justify-center">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Hammer className="w-5 h-5 text-orange-400" /> Surgical Logic Flow
        </h3>
        <div className="space-y-6 relative">
          <div className="absolute left-4 top-4 bottom-4 w-px bg-slate-700 border-dashed border-l" />
          
          <div className="relative pl-10">
            <div className="absolute left-2 top-0 w-4 h-4 bg-orange-500 rounded-full border-4 border-slate-900" />
            <p className="text-sm font-bold">Stable Pattern (31-A1)?</p>
            <p className="text-xs text-slate-400 mt-1">Yes &rarr; Sliding Hip Screw (SHS)</p>
          </div>

          <div className="relative pl-10">
            <div className="absolute left-2 top-0 w-4 h-4 bg-orange-500 rounded-full border-4 border-slate-900" />
            <p className="text-sm font-bold">Reverse Obliquity (31-A3)?</p>
            <p className="text-xs text-slate-400 mt-1">Yes &rarr; IM Nail (Required)</p>
          </div>

          <div className="relative pl-10">
            <div className="absolute left-2 top-0 w-4 h-4 bg-orange-500 rounded-full border-4 border-slate-900" />
            <p className="text-sm font-bold">Lateral Wall &lt; 2cm?</p>
            <p className="text-xs text-slate-400 mt-1">Yes &rarr; IM Nail (Strongly Preferred)</p>
          </div>

          <div className="relative pl-10">
            <div className="absolute left-2 top-0 w-4 h-4 bg-green-500 rounded-full border-4 border-slate-900" />
            <p className="text-sm font-bold">Goal: Early Weight Bearing</p>
            <p className="text-xs text-slate-400 mt-1">Both devices usually allow WBAT in the immediate post-op period.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PearlsView = () => {
  return (
    <div className="space-y-6 animate-in zoom-in-95 duration-500">
      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" /> Tip-Apex Distance (TAD)
          </h3>
          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex items-center gap-6">
            <div className="text-4xl font-black text-amber-600">25</div>
            <div>
              <p className="font-bold text-amber-800 text-sm">mm Limit</p>
              <p className="text-xs text-amber-700 leading-relaxed">
                TAD = (Distance on AP) + (Distance on Lateral). <br/>
                <strong>TAD &gt; 25mm</strong> is the strongest predictor of lag screw cutout.
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase">Ideal Placement</p>
            <p className="text-sm text-slate-700">Center-Center on both AP and Lateral views. Deeply seated in the femoral head.</p>
          </div>
        </section>

        <section className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500" /> Complications
          </h3>
          <div className="space-y-3">
            <CompRow name="Lag Screw Cutout" rate="4-10%" note="Highest risk if TAD > 25mm or poor reduction." />
            <CompRow name="Non-union" rate="< 2%" note="Rare due to high vascularity of the IT region." />
            <CompRow name="Malunion" rate="10%" note="Often varus/shortening, leads to Trendelenburg gait." />
            <CompRow name="Hardware Failure" rate="5%" note="Common in reverse patterns treated with SHS." />
          </div>
        </section>
      </div>

      <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-lg flex items-center gap-6">
        <Clock className="w-12 h-12 text-blue-200" />
        <div>
          <h4 className="font-bold text-lg">Surgical Timing Tip</h4>
          <p className="text-sm text-blue-100">
            Fixation within 24-48 hours is associated with decreased mortality, decreased risk of pressure ulcers, and shorter hospital stay in the geriatric population.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Helpers ---

const EvansCard = ({ type, desc, status, color }: any) => {
  const colors: any = {
    green: "border-green-200 bg-green-50 text-green-700",
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    orange: "border-orange-200 bg-orange-50 text-orange-700",
    red: "border-red-200 bg-red-50 text-red-700",
    rose: "border-rose-200 bg-rose-50 text-rose-700"
  };

  return (
    <div className={`p-4 rounded-xl border ${colors[color]} shadow-sm`}>
      <h4 className="font-black text-sm mb-1">{type}</h4>
      <p className="text-[10px] font-bold uppercase mb-2 opacity-80">{status}</p>
      <p className="text-xs font-medium">{desc}</p>
    </div>
  );
};

const CompRow = ({ name, rate, note }: any) => (
  <div className="flex justify-between items-start border-b pb-2">
    <div>
      <p className="text-sm font-bold text-slate-800">{name}</p>
      <p className="text-[10px] text-slate-500 italic">{note}</p>
    </div>
    <span className="text-xs font-black text-slate-400 bg-slate-50 px-2 py-1 rounded">{rate}</span>
  </div>
);

export default IntertrochantericFracture;
