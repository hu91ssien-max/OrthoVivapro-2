import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Ruler, 
  Wrench, 
  AlertTriangle, 
  ChevronRight,
  Target,
  Zap,
  Activity,
  Bone,
  Stethoscope,
  Layers,
  ShieldAlert,
  Scale,
  Hand,
  Hammer,
  Baby,
  RotateCcw,
  AlertCircle,
  Wind,
  Info,
  Maximize2,
  Move,
  ArrowUp,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const RADIAL_NECK_DATA = {
  anatomy: {
    title: "Pediatric Anatomy",
    niche: "Ossification & Mechanism",
    points: [
      { id: "Ossification", d: "The radial head ossification center appears at age 3–5 years and fuses at age 14–17." },
      { id: "Fracture Site", d: "Most pediatric 'head' fractures are actually neck fractures (Salter-Harris II is most common)." },
      { id: "Mechanism", d: "Fall on outstretched hand (FOOSH) with the elbow in extension and valgus stress." }
    ],
    pearl: "In children, the radial head is primarily cartilaginous, making the metaphysis (the neck) the weakest point."
  },
  classification: {
    title: "O'Brien Classification",
    niche: "Angulation Thresholds",
    points: [
      { id: "Type I", d: "< 30° of angulation. Generally stable and acceptable for non-operative care." },
      { id: "Type II", d: "30° to 60° of angulation. May require closed or percutaneous reduction." },
      { id: "Type III", d: "> 60° of angulation. Severely displaced; often requires intramedullary or open reduction." }
    ],
    pearl: "30 degrees is the magic number: Angulation < 30° in a child will reliably remodel with growth."
  },
  management: {
    title: "Management Algorithm",
    niche: "Reduction Logic",
    points: [
      { id: "Acceptable", d: "< 30° angulation and < 3mm translocation. Treat with a brief period of immobilization (1-2 weeks)." },
      { id: "Closed Reduction", d: "Patterson Maneuver: Extension, supination, and direct pressure over the radial head while applying varus stress." },
      { id: "Percutaneous", d: "The 'Joystick' technique: A K-wire is inserted into the head to lever it back into position." }
    ],
    pearl: "Early range of motion is key. Prolonged immobilization ( > 3 weeks) leads to permanent loss of forearm rotation."
  },
  metaizeau: {
    title: "The Métaizeau Technique",
    niche: "Intramedullary Reduction",
    points: [
      { id: "Concept", d: "Retrograde intramedullary pinning using a flexible nail (TEN) to reduce the head from the inside out." },
      { id: "Entry Point", d: "Lateral distal radius, proximal to the distal physis." },
      { id: "Maneuver", d: "The nail tip is advanced to the neck and rotated 180° to 'flip' the displaced head back onto the shaft." }
    ],
    pearl: "The Métaizeau technique is preferred over ORIF as it preserves the blood supply and avoids a large surgical scar."
  },
  complications: {
    title: "The Morbidity Screen",
    niche: "AVN & Rotation Loss",
    points: [
      { id: "Loss of Rotation", d: "Most common complication. Pronation and supination are usually affected first." },
      { id: "AVN", d: "Risk increases with open reduction. The radial head relies on retrograde blood flow through the neck." },
      { id: "Synostosis", d: "Radioulnar synostosis can occur if there is excessive surgical trauma or a concomitant ulna fracture." },
      { id: "Radial Overgrowth", d: "Physeal stimulation can lead to a slightly longer radius, though rarely clinically significant." }
    ],
    pearl: "AVN of the radial head occurs in ~10% of cases but can reach 70% if an open reduction is performed."
  }
};

const CustomSearchIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const ApleyView = () => {
  const [activeTab, setActiveTab] = useState<'classification' | 'thresholds' | 'techniques' | 'complications'>('classification');

  const navItems = [
    { id: 'classification', label: "O'Brien Matrix", icon: <BarChart3 size={18} /> },
    { id: 'thresholds', label: "Reduction Rules", icon: <Ruler size={18} /> },
    { id: 'techniques', label: "Surgical Skills", icon: <Wrench size={18} /> },
    { id: 'complications', label: "Complications", icon: <AlertTriangle size={18} /> },
  ] as const;

  return (
    <div className="flex flex-col md:flex-row bg-slate-50 font-sans text-slate-900 rounded-[3rem] overflow-hidden border border-slate-200 shadow-xl">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-950 text-white p-8 flex flex-col flex-shrink-0">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-black italic tracking-tighter text-white">APLEY MATRIX</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black mt-1">Radial Neck Hub</p>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === item.id 
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/20 translate-x-2' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-10 text-center">
           <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Apley Pediatric • Revision</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto no-scrollbar max-h-[800px]">
        <AnimatePresence mode="wait">
          {activeTab === 'classification' && (
            <motion.div
              key="classification"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-200">
                <span className="inline-block bg-rose-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-4">Classification</span>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">O'Brien Classification</h2>
                <p className="text-slate-500 italic font-medium">Correlates directly with success rate of closed reduction</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[2rem] text-center shadow-sm border border-slate-100">
                  <div className="text-4xl font-black text-rose-600 mb-1">&lt;30°</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grade I</div>
                </div>
                <div className="bg-white p-8 rounded-[2rem] text-center shadow-sm border border-slate-100">
                  <div className="text-4xl font-black text-rose-600 mb-1">30–60°</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grade II</div>
                </div>
                <div className="bg-white p-8 rounded-[2rem] text-center shadow-sm border border-slate-100">
                  <div className="text-4xl font-black text-rose-600 mb-1">&gt;60°</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grade III</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-6">
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10 group hover:border-rose-500/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                       <h3 className="text-lg font-bold">Grade I</h3>
                       <span className="bg-rose-600/20 text-rose-400 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">Conservative</span>
                    </div>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">&lt; 30° angulation. Minimal displacement.</p>
                    <div className="mt-4 text-rose-400 font-black text-xl italic tracking-tighter">Excellent prognosis</div>
                  </div>

                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10 group hover:border-rose-500/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                       <h3 className="text-lg font-bold">Grade II</h3>
                       <span className="bg-rose-600/20 text-rose-400 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">Reduce</span>
                    </div>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">30°–60° angulation. Often requires reduction.</p>
                    <div className="mt-4 text-rose-400 font-black text-xl italic tracking-tighter">Closed first</div>
                  </div>

                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10 group hover:border-rose-500/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                       <h3 className="text-lg font-bold">Grade III</h3>
                       <span className="bg-rose-600/20 text-rose-400 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">Operative</span>
                    </div>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">&gt; 60° angulation. High risk of AVN & growth arrest.</p>
                    <div className="mt-4 text-rose-400 font-black text-xl italic tracking-tighter">Percutaneous / ORIF</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                    <h3 className="text-lg font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
                      <Zap size={20} className="text-rose-600" /> Surgeon's Command
                    </h3>
                    <div className="bg-rose-50 border-l-4 border-rose-600 p-6 rounded-2xl">
                      <p className="text-rose-900 italic font-bold leading-relaxed">
                        For <span className="underline decoration-2">Grade III</span> fractures, prepare for percutaneous reduction. Avoid aggressive closed maneuvers — each attempt raises AVN risk.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                    <h4 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-4 flex items-center gap-2">
                      <Target size={18} className="text-rose-600" /> Examiner Trap 🎯
                    </h4>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      <strong>Q:</strong> "Is Grade II always treated surgically?"<br/>
                      <span className="block mt-2">
                        <strong>A:</strong> No — Grade II can be managed with closed reduction if &lt;3 mm displacement and &lt;30° residual angulation post-reduction. Surgery only if closed fails.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'thresholds' && (
            <motion.div
              key="thresholds"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-200">
                <span className="inline-block bg-rose-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-4">Thresholds</span>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Reduction Rules</h2>
                <p className="text-slate-500 italic font-medium">Acceptable parameters after reduction in children</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-6">
                  <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                    <h3 className="text-lg font-bold mb-1">Angulation</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">Residual tilt after reduction</p>
                    <div className="text-4xl font-black text-rose-400 italic">&lt; 30°</div>
                  </div>

                  <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                    <h3 className="text-lg font-bold mb-1">Displacement</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">Lateral translation</p>
                    <div className="text-4xl font-black text-rose-400 italic">&lt; 3 mm</div>
                  </div>

                  <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                    <h3 className="text-lg font-bold mb-1">Rotation</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">Rotational malalignment</p>
                    <div className="text-4xl font-black text-rose-400 italic">Zero tolerated</div>
                  </div>
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 flex flex-col">
                  <h3 className="text-lg font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
                    <Activity size={20} className="text-rose-600" /> Clinical Pearl
                  </h3>
                  <div className="space-y-6 flex-1">
                    <div className="flex gap-4">
                       <span className="text-2xl shrink-0">✅</span>
                       <p className="text-sm font-medium text-slate-700 leading-relaxed">
                         Remodeling potential is high in young children — <span className="font-black text-slate-900">accept up to 30° if &lt;10 yrs old.</span>
                       </p>
                    </div>
                    <div className="flex gap-4">
                       <span className="text-2xl shrink-0">⚠️</span>
                       <p className="text-sm font-medium text-slate-700 leading-relaxed">
                         Rotation does <span className="font-black text-slate-900">not remodel</span> — zero is the target always.
                       </p>
                    </div>
                    <div className="flex gap-4">
                       <span className="text-2xl shrink-0">📌</span>
                       <p className="text-sm font-medium text-slate-700 leading-relaxed">
                         &gt;3 mm displacement with &gt;30° angulation = <span className="font-black text-rose-600 underline">surgical threshold</span> regardless of age.
                       </p>
                    </div>
                  </div>

                  <div className="mt-10 bg-rose-50 border-l-4 border-rose-600 p-6 rounded-2xl text-center">
                    <p className="text-rose-900 italic font-black text-xl italic tracking-tight">
                      "Accept angulation, never rotation."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'techniques' && (
            <motion.div
              key="techniques"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-200">
                <span className="inline-block bg-rose-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-4">Techniques</span>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Surgical Skills</h2>
                <p className="text-slate-500 italic font-medium">Reduction methods and operative pearls</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-6">
                  <div className="item-card group">
                    <h3 className="text-lg font-bold text-rose-400 mb-2">Patterson Maneuver</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">Closed reduction with varus stress + supination. <span className="text-white font-bold">First-line attempt.</span></p>
                  </div>
                  <div className="item-card group">
                    <h3 className="text-lg font-bold text-rose-400 mb-2">Métaizeau Technique</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">Retrograde intramedullary K-wire — joystick rotation of radial head. <span className="text-white font-bold text-emerald-400">Gold standard for Grade III.</span></p>
                  </div>
                  <div className="item-card group">
                    <h3 className="text-lg font-bold text-rose-400 mb-2">Joy-sticking</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">Percutaneous K-wire leverage under fluoroscopy. Used when closed fails.</p>
                  </div>
                  <div className="item-card group border-rose-900/50">
                    <h3 className="text-lg font-bold text-rose-600 mb-2">ORIF</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">Open reduction — <span className="text-rose-500 font-bold uppercase">last resort</span>. Highest AVN risk due to periosteal stripping.</p>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                    <h3 className="text-lg font-black uppercase tracking-tighter mb-6 flex items-center gap-3 italic">
                      Sequence of Escalation
                    </h3>
                    <div className="space-y-4">
                      {[
                        { step: "1️⃣", name: "Patterson", detail: "closed, GA", color: "bg-slate-50", text: "text-slate-900" },
                        { step: "2️⃣", name: "Joy-stick", detail: "percutaneous K-wire", color: "bg-slate-50", text: "text-slate-900" },
                        { step: "3️⃣", name: "Métaizeau", detail: "IM wire rotation", color: "bg-slate-50", text: "text-slate-900" },
                        { step: "4️⃣", name: "ORIF", detail: "open, highest risk", color: "bg-rose-50 border-rose-200 border", text: "text-rose-900" },
                      ].map((s, i) => (
                        <div key={i} className={`p-4 ${s.color} rounded-2xl flex items-center justify-between`}>
                           <div className="flex items-center gap-3">
                             <span className="text-xl">{s.step}</span>
                             <span className={`text-sm font-black uppercase ${s.text}`}>{s.name}</span>
                           </div>
                           <span className="text-[10px] font-bold text-slate-400 uppercase italic tracking-wider">{s.detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Wrench size={24} className="text-rose-600" />
                      <h4 className="text-sm font-black uppercase text-slate-900 tracking-tighter">Métaizeau Pearl 🔑</h4>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium italic">
                      Wire inserted at <span className="text-rose-600 font-bold">radial styloid</span> → up medullary canal → hooks distal radial neck → rotation reduces fragment. No soft tissue stripping = low AVN risk.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'complications' && (
            <motion.div
              key="complications"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-200">
                <span className="inline-block bg-rose-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-4">Complications</span>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Late Sequelae</h2>
                <p className="text-slate-500 italic font-medium">Known complications after radial neck fractures in children</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-rose-950 rounded-[2.5rem] p-10 text-white space-y-6">
                   <div className="p-6 bg-rose-900/40 rounded-3xl border border-rose-800/50">
                      <h3 className="text-lg font-bold text-rose-100 mb-1">Avascular Necrosis (AVN)</h3>
                      <p className="text-sm text-rose-300 font-medium leading-relaxed">Most feared. Risk ↑ with ORIF, repeated closed attempts, Grade III.</p>
                   </div>
                   <div className="p-6 bg-rose-900/40 rounded-3xl border border-rose-800/50">
                      <h3 className="text-lg font-bold text-rose-100 mb-1">Growth Arrest</h3>
                      <p className="text-sm text-rose-300 font-medium leading-relaxed">Proximal radial physeal damage → radial shortening → late wrist pain.</p>
                   </div>
                   <div className="p-6 bg-rose-900/40 rounded-3xl border border-rose-800/50">
                      <h3 className="text-lg font-bold text-rose-100 mb-1">Radioulnar Synostosis</h3>
                      <p className="text-sm text-rose-300 font-medium leading-relaxed">Ectopic bone after open surgery. Leads to fixed forearm rotation loss.</p>
                   </div>
                   <div className="p-6 bg-rose-900/40 rounded-3xl border border-rose-800/50">
                      <h3 className="text-lg font-bold text-rose-100 mb-1">Cubitus Valgus</h3>
                      <p className="text-sm text-rose-300 font-medium leading-relaxed">Secondary to lateral column remodeling disturbance.</p>
                   </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
                    <h3 className="text-lg font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
                      <Zap size={22} className="text-rose-600" /> Viva Rapid Fire ⚡
                    </h3>
                    <div className="space-y-6">
                      <div className="group">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 italic">Most feared complication?</p>
                        <p className="text-lg font-black text-slate-900 italic">→ AVN of radial head</p>
                      </div>
                      <div className="group">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 italic">Highest success rate/low AVN?</p>
                        <p className="text-lg font-black text-slate-900 italic">→ Métaizeau (no stripping)</p>
                      </div>
                      <div className="group">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 italic">Synostosis risk highest with?</p>
                        <p className="text-lg font-black text-slate-900 italic">→ ORIF</p>
                      </div>
                      <div className="group">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 italic">Growth arrest causes?</p>
                        <p className="text-lg font-black text-slate-900 italic">→ Shortening + DRUJ pain</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                    <h4 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.3em] mb-4">Key Principle</h4>
                    <p className="text-sm font-medium italic text-slate-300 leading-relaxed">
                      "Every additional closed reduction attempt = cumulative vascular insult to the radial head epiphysis. <span className="text-white font-black underline decoration-rose-500">Three attempts maximum</span>, then escalate."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

const MillerView = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof RADIAL_NECK_DATA>('classification');
  const current = useMemo(() => RADIAL_NECK_DATA[activeTab], [activeTab]);

  return (
    <div className="flex bg-slate-50 font-sans text-slate-900 rounded-[3rem] overflow-hidden border border-slate-200 shadow-xl">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-950 text-white hidden lg:flex flex-col h-[800px] shadow-2xl">
        <div className="p-8 border-b border-white/5 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg">
              <Baby size={20} className="text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase italic">Rad-Neck-OS</span>
          </div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic text-center">Miller Review Lab</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto no-scrollbar">
          {[
            { id: 'anatomy', label: 'Anatomy/Mechanism', icon: Layers },
            { id: 'classification', label: 'O\'Brien Class', icon: Scale },
            { id: 'management', label: 'Reduction Maneuvers', icon: Target },
            { id: 'metaizeau', label: 'Métaizeau Tech', icon: Hammer },
            { id: 'complications', label: 'Complications', icon: ShieldAlert }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-xl translate-x-1' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
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
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 italic">The 30° Threshold</p>
            <p className="text-[11px] text-slate-300 font-medium leading-tight italic">
              "Remodeling potential in the proximal radius is excellent under age 10; accept 30° always."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-[800px] overflow-y-auto no-scrollbar relative bg-slate-50">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Upper Extremity Trauma</h2>
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{current.title}</h1>
          </div>
          <div className="hidden md:flex gap-3">
             <div className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100 flex items-center gap-2">
                <Stethoscope size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest italic tracking-tight">Miller Review 8th Ed</span>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 max-w-5xl mx-auto w-full">
          
          {/* Main Visual Card */}
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="p-8 bg-indigo-50 text-indigo-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                   {activeTab === 'metaizeau' ? <Hammer size={48} /> : <Layers size={48} />}
                </div>
                <div className="text-center md:text-left flex-1">
                   <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                     <span className="text-indigo-600 font-black text-xs uppercase tracking-widest">{current.niche}</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                     <span className="text-slate-400 font-black text-xs uppercase tracking-widest italic">Miller Pediatric Lab</span>
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

          {/* Deep Content Grid */}
          <div className="grid md:grid-cols-2 gap-8">
             {/* LEFT: Category Data */}
             <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[400px]">
                <h4 className="text-lg font-black mb-8 flex items-center gap-3 text-indigo-400 uppercase tracking-tighter">
                   <Zap size={22} /> Essential Parameters
                </h4>
                <div className="space-y-4 relative z-10">
                   {current.points.map((item, i) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl transition-all hover:bg-white/10">
                        <div className="flex justify-between items-center mb-1">
                           <h5 className="text-[11px] font-black text-indigo-400 uppercase">{item.id}</h5>
                        </div>
                        <p className="text-[10px] text-slate-400 italic leading-relaxed">{item.d}</p>
                     </div>
                   ))}
                </div>
                <div className="absolute -bottom-10 -right-10 text-white/5 pointer-events-none">
                   <CustomSearchIcon size={240} />
                </div>
             </div>

             {/* RIGHT: Actions & Clinical Judgment */}
             <div className="space-y-6">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center h-full">
                   <h4 className="text-lg font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter">
                      <Hand size={22} className="text-indigo-600" /> Surgeon's Action Plan
                   </h4>
                   <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl">
                      <p className="text-sm text-indigo-900 font-bold leading-relaxed italic text-center">
                        {activeTab === 'anatomy' ? "Assess for concomitant injuries. Pediatric radial neck fractures are associated with medial epicondyle fractures and elbow dislocations." : 
                         activeTab === 'classification' ? "Measure the angle between the radial head articular surface and the long axis of the shaft. O'Brien III (>60°) almost never reduces closed." : 
                         activeTab === 'management' ? "When performing closed reduction, use the 'Joy-sticking' maneuver only if Patterson's fails. Be careful not to damage the growth plate with multiple passes." : 
                         activeTab === 'metaizeau' ? "This is the 'internal joystick.' Rotation of the nail tip provides the torque necessary to correct the tilted head without an incision at the elbow." : 
                         "Open reduction is the absolute last resort. If you must open, use the Kocher approach (between Anconeus and ECU) and avoid periosteal stripping to save the blood supply."}
                      </p>
                   </div>
                </div>

                <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                   <h5 className="text-[10px] font-black text-indigo-400 uppercase mb-3 flex items-center gap-2">
                     <AlertCircle size={14} className="text-amber-500" /> High-Yield Warning
                   </h5>
                   <p className="text-xs font-medium leading-relaxed italic opacity-90">
                      {activeTab === 'complications' ? "Avascular necrosis (AVN) is the primary reason why we avoid open reduction in children. The radial head blood supply is precarious." : 
                       activeTab === 'anatomy' ? "Radial head fractures are rare in kids because the cartilage absorbs the energy. Radial neck fractures are the pediatric equivalent." : 
                       activeTab === 'metaizeau' ? "Ensure the nail tip enters the epiphysis, not just the neck, to provide a mechanical lever arm for reduction." :
                       "Always document the 'radial nerve' or 'PIN' function before and after reduction, as percutaneous pins can occasionally tether the nerve."}
                   </p>
                   <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                </div>
             </div>
          </div>

          {/* Technical Area */}
          <div className="bg-indigo-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-2/3">
                   <h4 className="text-2xl font-black mb-4 flex items-center gap-3">
                     <RotateCcw size={24} className="text-indigo-300" /> Remodeling Logic
                   </h4>
                   <p className="text-sm text-slate-100 leading-relaxed italic">
                      "In the pediatric proximal radius, the physis provides ~25-30% of the longitudinal growth of the radius. Because of its proximity to the joint, remodeling potential for angulation is robust, allowing surgeons to accept up to 30° of tilt in children under 10."
                   </p>
                </div>
                <div className="md:w-1/3 flex justify-center text-center">
                   <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest">
                      30° Angulation = Success
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* Legend */}
        <footer className="mt-auto px-10 py-8 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/80">
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-indigo-600 shadow-sm"></div> Growth Potential</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-slate-900 shadow-sm"></div> Surgical Strategy</div>
           <div className="flex items-center gap-2 text-slate-800 uppercase italic font-bold">Radial-Miller-Hub v1.0</div>
        </footer>
      </main>
    </div>
  );
};

const RadialNeckRevision = () => {
  const [source, setSource] = useState<'apley' | 'miller'>('apley');

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-200 p-1 rounded-2xl flex gap-1 shadow-inner">
          <button
            onClick={() => setSource('apley')}
            className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              source === 'apley' 
              ? 'bg-white text-rose-600 shadow-md transform scale-105' 
              : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Apley Matrix
          </button>
          <button
            onClick={() => setSource('miller')}
            className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              source === 'miller' 
              ? 'bg-white text-indigo-600 shadow-md transform scale-105' 
              : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Miller Source
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={source}
          initial={{ opacity: 0, x: source === 'apley' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: source === 'apley' ? 20 : -20 }}
          transition={{ duration: 0.3 }}
        >
          {source === 'apley' ? <ApleyView /> : <MillerView />}
        </motion.div>
      </AnimatePresence>

      <style>{`
        .item-card {
          padding: 2rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }
        .item-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(225, 29, 72, 0.3);
          transform: translateX(4px);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default RadialNeckRevision;
