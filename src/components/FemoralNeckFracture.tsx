import React, { useState } from 'react';
import { 
  Activity, 
  Stethoscope, 
  ShieldAlert, 
  ChevronRight, 
  Info, 
  ClipboardCheck, 
  Bone, 
  Scaling,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  CircleDot,
  ArrowDownCircle,
  ArrowLeft,
  Hammer
} from 'lucide-react';
import { motion } from "motion/react";
import FemoralNeckApley from './FemoralNeckApley';
import FemoralNeckMiller from './FemoralNeckMiller';

interface FemoralNeckFractureProps {
  onBack: () => void;
}

const FemoralNeckFracture = ({ onBack }: FemoralNeckFractureProps) => {
  const [activeTab, setActiveTab] = useState('evaluation');

  const mainTabs = [
    { id: 'evaluation', label: 'Evaluation', icon: Stethoscope },
    { id: 'classification', label: 'Classification', icon: Bone },
    { id: 'management', label: 'Management', icon: Activity },
    { id: 'complications', label: 'Risks', icon: ShieldAlert },
  ];

  const sidebarTabs = [
    { id: 'apley', label: 'Apley Lab', icon: Hammer, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'miller', label: 'Miller Lab', icon: TrendingUp, color: 'text-rose-600', bg: 'bg-rose-50' },
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
              <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-rose-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-rose-600 p-2 rounded-lg shadow-lg shadow-rose-100">
                <Bone className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Femoral Neck</h1>
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
                    ? 'bg-white text-rose-600 shadow-sm' 
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

          <div className="bg-gradient-to-br from-rose-600 to-rose-700 p-6 rounded-3xl text-white shadow-lg overflow-hidden relative group">
            <div className="relative z-10">
              <h4 className="text-xs font-black uppercase tracking-widest mb-2 opacity-80">Revision AI</h4>
              <p className="text-[11px] font-medium leading-relaxed italic">
                Focus on the Medial Circumflex artery anatomy for OSCE stations.
              </p>
            </div>
            <TrendingUp className="absolute bottom-[-10px] right-[-10px] text-white/10 w-24 h-24 rotate-12 transition-transform group-hover:scale-110" />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {activeTab === 'evaluation' && <EvaluationView />}
          {activeTab === 'classification' && <ClassificationView />}
          {activeTab === 'management' && <ManagementView />}
          {activeTab === 'apley' && <FemoralNeckApley />}
          {activeTab === 'miller' && <FemoralNeckMiller />}
          {activeTab === 'complications' && <ComplicationsView />}
        </main>
      </div>
    </motion.div>
  );
};

// --- Sub-views ---

const EvaluationView = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <section className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
              <ClipboardCheck className="text-rose-600 w-5 h-5" /> Clinical Presentation
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">Classic Deformity</p>
                <p className="text-sm font-semibold text-slate-700">Shortened and Externally Rotated</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">Pain Profile</p>
                <p className="text-sm font-semibold text-slate-700">Groin pain with limited ROM, especially internal rotation</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">Special Case</p>
                <p className="text-sm font-semibold text-slate-700">Occult Fracture: May ambulate with mild groin pain; check for Trendelenburg sign</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">Mechanism</p>
                <p className="text-sm font-semibold text-slate-700">Low energy (Elderly, fall) vs High energy (Young, MVA)</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
              <Scaling className="text-blue-600 w-5 h-5" /> Imaging Protocol
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 shrink-0">1</div>
                <div>
                  <p className="font-bold text-sm">AP Pelvis & AP/Lateral Hip</p>
                  <p className="text-xs text-slate-500">Essential for identifying Garden stage and checking Shenton's line disruption.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 shrink-0">2</div>
                <div>
                  <p className="font-bold text-sm">Cross-table Lateral</p>
                  <p className="text-xs text-slate-500">Crucial for assessing displacement without moving the painful limb excessively.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-rose-100 p-2 rounded-lg text-rose-600 shrink-0">3</div>
                <div>
                  <p className="font-bold text-sm">MRI / CT (If Occult)</p>
                  <p className="text-xs text-slate-500 font-medium text-rose-600">Gold standard for suspected fracture with negative X-rays.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-rose-600 text-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold flex items-center gap-2 mb-3">
              <ShieldAlert className="w-5 h-5" /> Critical Anatomy
            </h3>
            <div className="space-y-4">
              <div className="border-b border-rose-500 pb-3">
                <p className="text-xs text-rose-200 font-bold uppercase mb-1">Blood Supply</p>
                <p className="text-sm font-medium">Medial Circumflex Femoral Artery is the primary supplier (ascending cervical branches).</p>
              </div>
              <div className="border-b border-rose-500 pb-3">
                <p className="text-xs text-rose-200 font-bold uppercase mb-1">Healing Potential</p>
                <p className="text-sm font-medium">Intracapsular environment: No callus formation; heals via primary (direct) healing.</p>
              </div>
              <div>
                <p className="text-xs text-rose-200 font-bold uppercase mb-1">Joint Capsule</p>
                <p className="text-sm font-medium">Synovial fluid contains collagenases that inhibit fracture healing.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h4 className="text-amber-800 font-bold text-sm flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4" /> Board Fact
            </h4>
            <p className="text-xs text-amber-700 italic">
              "Garden stage III and IV are considered 'Displaced' and have a significantly higher risk of AVN due to disruption of the retinacular vessels."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClassificationView = () => {
  const [activeSystem, setActiveSystem] = useState('garden');

  const garden = [
    { stage: 'I', type: 'Incomplete', desc: 'Impacted in valgus position', stability: 'Stable' },
    { stage: 'II', type: 'Complete', desc: 'Non-displaced on AP/Lateral', stability: 'Stable' },
    { stage: 'III', type: 'Partial Displacement', desc: 'Trabeculae of head/neck don\'t align', stability: 'Unstable' },
    { stage: 'IV', type: 'Full Displacement', desc: 'Head realigns with acetabulum', stability: 'Unstable' },
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      <div className="flex bg-white p-1 rounded-full border w-fit mx-auto md:mx-0">
        <button 
          onClick={() => setActiveSystem('garden')}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeSystem === 'garden' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-600'}`}
        >
          Garden System
        </button>
        <button 
          onClick={() => setActiveSystem('pauwels')}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeSystem === 'pauwels' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-600'}`}
        >
          Pauwels System
        </button>
      </div>

      {activeSystem === 'garden' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {garden.map((g) => (
            <div key={g.stage} className="bg-white border rounded-2xl p-6 hover:border-rose-300 transition-colors shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-lg text-lg font-black">{g.stage}</span>
                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${g.stability === 'Stable' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {g.stability}
                </span>
              </div>
              <h4 className="font-bold text-slate-800 mb-1">{g.type}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border rounded-2xl p-8 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-6">
              <h3 className="text-xl font-bold">Pauwels Classification</h3>
              <p className="text-sm text-slate-500">Based on the angle of the fracture line relative to the horizontal. Higher angles indicate greater vertical shear forces and higher failure risk.</p>
              <div className="space-y-3">
                <PauwelsItem level="Type I" angle="< 30°" shear="Low Shear" rx="Compensated by compression" color="text-green-600" />
                <PauwelsItem level="Type II" angle="30-50°" shear="Moderate" rx="Requires stabilization" color="text-amber-600" />
                <PauwelsItem level="Type III" angle="> 70°" shear="High Shear Force" rx="Highest risk of non-union" color="text-red-600" />
              </div>
            </div>
            <div className="w-full md:w-64 h-64 bg-slate-50 rounded-full border-4 border-dashed border-slate-200 flex items-center justify-center relative">
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-px h-full bg-slate-300 absolute"></div>
                 <div className="h-px w-full bg-slate-300 absolute"></div>
               </div>
               <div className="text-center z-10">
                 <Scaling className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                 <p className="text-[10px] font-bold text-slate-400 uppercase">Vertical Shear<br/>Analysis</p>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ManagementView = () => {
  const [ageGroup, setAgeGroup] = useState('young'); // young (<65) vs elderly (>65)

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
      <div className="bg-white rounded-2xl border p-4 flex flex-wrap items-center justify-between gap-4">
        <h3 className="font-bold text-slate-700">Surgical Logic Algorithm:</h3>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button 
            onClick={() => setAgeGroup('young')}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${ageGroup === 'young' ? 'bg-white shadow-sm text-rose-600' : 'text-slate-500'}`}
          >
            Young (&lt; 65)
          </button>
          <button 
            onClick={() => setAgeGroup('elderly')}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${ageGroup === 'elderly' ? 'bg-white shadow-sm text-rose-600' : 'text-slate-500'}`}
          >
            Elderly (&gt; 65)
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <section className="bg-white rounded-2xl border shadow-sm p-6 border-l-4 border-l-blue-500">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" /> Clinical Strategy
            </h3>
            {ageGroup === 'young' ? (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="font-bold text-blue-800 text-sm">Emergency ORIF</p>
                  <p className="text-xs text-blue-600 mt-1">Goal: Salvage the native femoral head. Urgent reduction (&lt; 6-12h preferred by some) is critical.</p>
                </div>
                <div className="space-y-2">
                  <ManagementBullet title="Cannulated Screws" desc="For non-displaced or stable displaced fractures. Use inverted triangle configuration." />
                  <ManagementBullet title="Sliding Hip Screw (SHS)" desc="Used for basicervical fractures or high-angle (Pauwels III) patterns to resist shear." />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="font-bold text-blue-800 text-sm">Arthroplasty Preference</p>
                  <p className="text-xs text-blue-600 mt-1">Goal: Early mobilization and avoidance of re-operation (AVN/Non-union risk is too high in elderly).</p>
                </div>
                <div className="space-y-2">
                  <ManagementBullet title="Hemiarthroplasty" desc="For low-demand patients or significant comorbidities. Unipolar vs. Bipolar (little clinical difference)." />
                  <ManagementBullet title="Total Hip (THA)" desc="Superior results in active elderly, those with pre-existing arthritis, or renal failure." />
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl">
            <h4 className="font-bold text-sm uppercase text-slate-400 mb-4 tracking-widest">Surgical Pearls</h4>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm">
                <div className="bg-rose-500/20 p-1 rounded h-fit"><CheckCircle2 className="w-4 h-4 text-rose-400" /></div>
                <span><span className="text-rose-400 font-bold">Reduction:</span> Anatomical reduction is the #1 predictor of outcome in young patients.</span>
              </li>
              <li className="flex gap-3 text-sm">
                <div className="bg-rose-500/20 p-1 rounded h-fit"><CheckCircle2 className="w-4 h-4 text-rose-400" /></div>
                <span><span className="text-rose-400 font-bold">Capsulotomy:</span> Controversial but often performed to relieve intracapsular pressure (tamponade effect).</span>
              </li>
              <li className="flex gap-3 text-sm">
                <div className="bg-rose-500/20 p-1 rounded h-fit"><CheckCircle2 className="w-4 h-4 text-rose-400" /></div>
                <span><span className="text-rose-400 font-bold">Valgus Osteotomy:</span> Salvage procedure for chronic non-union to convert shear to compression.</span>
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-dashed border-slate-300 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <Activity className="text-slate-400 w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Non-Operative</p>
                <p className="text-xs text-slate-400">Strictly reserved for non-ambulatory, demented, or terminal patients.</p>
              </div>
            </div>
            <XCircle className="text-slate-300 w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ComplicationsView = () => {
  const complications = [
    { name: 'AVN', stat: '10-45%', details: 'Depends on displacement and time to reduction. High in Garden III/IV.', icon: <CircleDot className="text-purple-600" /> },
    { name: 'Non-union', stat: '10-30%', details: 'Most common in displaced fractures. Smokin/Diabetes are major risks.', icon: <XCircle className="text-red-600" /> },
    { name: 'Dislocation', stat: '2-10%', details: 'After THA (higher risk with posterior approach).', icon: <ArrowDownCircle className="text-blue-600" /> },
    { name: 'Mortality', stat: '20-30%', details: 'One-year mortality after hip fracture in the elderly.', icon: <AlertTriangle className="text-slate-600" /> },
  ];

  return (
    <div className="space-y-6 animate-in zoom-in-95 duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {complications.map((c) => (
          <div key={c.name} className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col items-center text-center">
            <div className="p-3 bg-slate-50 rounded-full mb-4">
              {c.icon}
            </div>
            <h4 className="font-bold text-slate-800 mb-1">{c.name}</h4>
            <div className="text-2xl font-black text-slate-900 mb-2">{c.stat}</div>
            <p className="text-xs text-slate-500 leading-relaxed">{c.details}</p>
          </div>
        ))}
      </div>

      <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
        <div className="shrink-0 bg-white p-4 rounded-xl shadow-sm border border-rose-100">
          <Activity className="w-8 h-8 text-rose-600" />
        </div>
        <div>
          <h4 className="font-bold text-rose-800 mb-2 underline decoration-rose-200">The "Impact of Delay" Board Question</h4>
          <p className="text-sm text-rose-700 leading-relaxed">
            While surgical timing (&lt; 24h) is standard for elderly patients to improve 1-year survival, for the <strong>young patient</strong>, the urgency relates to femoral head salvage. Historically, "6 hours" was the mantra; however, recent evidence (FAITH trial) suggests quality of reduction and internal fixation stability are more critical than absolute clock time.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Helpers ---

const PauwelsItem = ({ level, angle, shear, rx, color }: any) => (
  <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
    <div className={`font-black text-lg w-16 ${color}`}>{level}</div>
    <div className="flex-1">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-bold text-slate-700">{angle}</span>
        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 ${color}`}>{shear}</span>
      </div>
      <p className="text-xs text-slate-500 italic">{rx}</p>
    </div>
  </div>
);

const ManagementBullet = ({ title, desc }: any) => (
  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl hover:bg-white transition-all cursor-default group border border-transparent hover:border-slate-200">
    <div className="p-1 bg-white rounded shadow-sm group-hover:bg-rose-50 transition-colors">
      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600" />
    </div>
    <div>
      <p className="text-xs font-black text-slate-800">{title}</p>
      <p className="text-[11px] text-slate-500 leading-tight">{desc}</p>
    </div>
  </div>
);

export default FemoralNeckFracture;
