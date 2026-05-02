import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  Users, 
  Layers, 
  Stethoscope, 
  Hammer, 
  Bone, 
  Info, 
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Droplets,
  Menu,
  X,
  XCircle,
  CheckCircle2,
  Scale,
  Zap,
  History,
  MessageSquare,
  Clock
} from 'lucide-react';

interface OsteoarthritisAtlasProps {
  onBack?: () => void;
}

// Data constants defined outside to prevent re-renders and undefined access
const SECTIONS = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'pathology', label: 'Pathophysiology', icon: Layers },
  { id: 'clinical', label: 'Clinical Profiles', icon: Stethoscope },
  { id: 'grading', label: 'Grading Systems', icon: Bone },
  { id: 'management', label: 'Management', icon: Hammer },
];

const OA_DATA = {
  stats: [
    { label: 'Over 55 Prevalence', value: '> 80%', desc: 'People with OA in at least 1 joint.', color: 'text-blue-600' },
    { label: 'Genetic Link', value: '40%', desc: 'Estimated hereditary predisposition.', color: 'text-indigo-600' },
    { label: 'Clinical Recovery', value: '30%', desc: 'Patients showing spontaneous improvement.', color: 'text-emerald-600' },
    { label: 'Surgical Persistence', value: '5-15%', desc: 'Persistent pain post-replacement.', color: 'text-red-600' }
  ],
  grading: {
    outerbridge: [
      { g: 1, title: 'Softening', desc: 'Swelling of hyaline cartilage' },
      { g: 2, title: 'Fissuring <0.5"', desc: 'Fragmentation in small area' },
      { g: 3, title: 'Fissuring >0.5"', desc: 'Fragmentation in large area' },
      { g: 4, title: 'Exposure', desc: 'Underlying bone visible' }
    ],
    kl: [
      { g: 1, title: 'Doubtful', desc: 'Minimal osteophyte' },
      { g: 2, title: 'Minor', desc: 'Definite osteophyte, no space loss' },
      { g: 3, title: 'Moderate', desc: 'Some narrowing of joint space' },
      { g: 4, title: 'Severe', desc: 'Advanced space loss & sclerosis' }
    ]
  },
  managementSteps: [
    { 
      step: 1, 
      title: 'Holistic Core', 
      color: 'emerald', 
      badge: 'MANDATORY',
      desc: 'Self-management education, weight loss prioritization, and context validation.' 
    },
    { 
      step: 2, 
      title: 'Core Treatment', 
      color: 'blue', 
      badge: 'PHYSICAL',
      desc: 'Muscle strengthening (Quadriceps), aerobics, and footwear advice (Shock-absorbing).' 
    },
    { 
      step: 3, 
      title: 'Non-Surgical Adjuncts', 
      color: 'amber', 
      badge: 'MEDICAL',
      desc: 'Topical NSAIDs/Capsaicin (Hands/Knees), oral paracetamol, stick in contralateral hand.' 
    },
    { 
      step: 4, 
      title: 'Surgical Referral', 
      color: 'red', 
      badge: 'END-STAGE',
      desc: 'Total Arthroplasty, Osteotomy, or Fusion. For refractory end-stage pain only.' 
    }
  ]
};

const JOINT_PROFILES = {
  knee: { 
    title: 'Knee', 
    deformity: 'Varus (Bow-leg)', 
    signs: ['Vastus medialis wasting', 'Audible crepitus', 'Fixed flexion'], 
    note: 'Weight loss is a priority (marked symptom reduction).',
    emoji: '🦵'
  },
  hip: { 
    title: 'Hip', 
    deformity: 'Antalgic Gait', 
    signs: ['Groin pain (referred to knee)', 'Reduced internal rotation', 'Trendelenburg sign'], 
    note: 'Early internal rotation loss is pathognomonic.',
    emoji: '🚶'
  },
  hand: { 
    title: 'Hand', 
    deformity: 'Squaring (Thumb base)', 
    signs: ["Heberden's (DIP)", "Bouchard's (PIP)", 'Menopausal onset'], 
    note: 'Strongly associated with generalized sporadic OA.',
    emoji: '✋'
  }
};

export default function OsteoarthritisAtlas({ onBack }: OsteoarthritisAtlasProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeJoint, setActiveJoint] = useState('knee');

  const selectedJointData = useMemo(() => JOINT_PROFILES[activeJoint] || JOINT_PROFILES.knee, [activeJoint]);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden rounded-[2.5rem] border border-slate-200 shadow-2xl">
      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-900/20">
              <Activity size={24} />
            </div>
            <span className="text-xl font-black tracking-tight uppercase">OA Atlas</span>
          </div>
          
          <nav className="flex-1 space-y-2">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => { setActiveSection(section.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeSection === section.id ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                <section.icon size={18} />
                {section.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-800 text-center">
            {onBack && (
              <button 
                onClick={onBack}
                className="mb-4 w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                Back to Center
              </button>
            )}
            <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Source</p>
              <p className="text-[11px] text-slate-300 font-medium">Apley & Solomon's 10th Ed.</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col min-w-0 relative h-screen overflow-y-auto no-scrollbar bg-slate-50">
        {/* Sticky Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
          <button className="lg:hidden p-2 text-slate-500" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm">
              Section: {activeSection}
            </h2>
          </div>
          <div className="flex items-center gap-4">
             <span className="hidden md:inline-flex px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase">NICE 2014 Guideline Standard</span>
             {isSidebarOpen && <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1 text-slate-400"><X size={20}/></button>}
          </div>
        </header>

        <div className="p-4 md:p-8">
          {/* SECTION: Overview */}
          {activeSection === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {OA_DATA.stats.map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className={`text-3xl font-black mb-1 ${stat.color}`}>{stat.value}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase mb-2">{stat.label}</div>
                    <p className="text-[11px] text-slate-500 leading-tight font-medium">{stat.desc}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black mb-4">The "Joint Failure" Analogy</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-8 max-w-md">
                      Osteoarthritis is described as a <strong>final common pathway</strong> of biochemical and mechanical insult, analogous to how clinicians view heart or kidney failure.
                    </p>
                    <div className="flex flex-wrap gap-2">
                       <span className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-xs font-bold border border-white/10">Sporadic / Garden OA</span>
                       <span className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-xs font-bold border border-white/10">Atypical Variants</span>
                    </div>
                  </div>
                  <Activity className="absolute bottom-[-50px] right-[-50px] text-blue-600/10 group-hover:scale-110 transition-transform duration-700" size={300} />
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                      <AlertTriangle className="text-amber-600" size={32} />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter text-sm italic">The BMD Paradox</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="text-red-500" size={16}/>
                          <p className="text-xs font-bold text-slate-600 uppercase tracking-tight">High BMD: Increased Risk</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <History className="text-emerald-500" size={16}/>
                          <p className="text-xs font-bold text-slate-600 uppercase tracking-tight">Low BMD: Protective Factor</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: Pathophysiology */}
          {activeSection === 'pathology' && (
            <div className="space-y-6 animate-in slide-in-from-right duration-500">
               <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                  <h3 className="text-2xl font-black mb-10 text-slate-800 uppercase italic tracking-tighter">Mechanisms of Failure</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {[
                      { step: '01', title: 'Collagenase Insult', desc: 'Enzymes disrupt Type II collagen matrix integrity.', icon: <Droplets className="text-blue-500" /> },
                      { step: '02', title: 'Proteoglycan Swelling', desc: 'Water content increases; cartilage softens and swells.', icon: <TrendingUp className="text-indigo-500" /> },
                      { step: '03', title: 'Fibrillation', desc: 'Intermediate fragmentation and fissuring of surface.', icon: <Layers className="text-amber-500" /> },
                      { step: '04', title: 'Total Erosion', desc: 'Exposure of subchondral bone; osteophyte formation.', icon: <Bone className="text-red-500" /> }
                    ].map((step, i) => (
                      <div key={i} className="flex flex-col items-center text-center p-4 rounded-3xl hover:bg-slate-50 transition-colors">
                        <div className="w-20 h-20 bg-white rounded-3xl border border-slate-100 flex items-center justify-center mb-6 shadow-sm">
                          {step.icon}
                        </div>
                        <span className="text-[10px] font-black text-blue-600/30 uppercase tracking-[0.2em] mb-2">{step.step}</span>
                        <h4 className="font-bold text-sm text-slate-800 mb-2">{step.title}</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{step.desc}</p>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="grid lg:grid-cols-3 gap-6">
                 <div className="p-8 bg-blue-900 text-white rounded-[2rem] shadow-xl">
                    <h4 className="font-black text-blue-400 uppercase tracking-widest text-xs mb-6">Structural Science</h4>
                    <div className="space-y-6">
                       <div className="border-l-2 border-blue-700 pl-4">
                         <h5 className="font-bold text-sm mb-1 text-blue-200">Synoviocytes</h5>
                         <p className="text-xs text-blue-300 font-medium">Produce hyaluronic acid for viscosity and lubrication.</p>
                       </div>
                       <div className="border-l-2 border-blue-700 pl-4">
                         <h5 className="font-bold text-sm mb-1 text-blue-200">The Tidemark</h5>
                         <p className="text-xs text-blue-300 font-medium">The calcified boundary undergoing vascular invasion in OA.</p>
                       </div>
                    </div>
                 </div>
                 <div className="p-8 bg-white border border-slate-200 rounded-[2rem] lg:col-span-2 flex items-center gap-8">
                    <div className="hidden sm:flex w-24 h-24 bg-red-50 rounded-full items-center justify-center shrink-0">
                       <Zap className="text-red-500" size={40} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-400 uppercase tracking-widest text-xs mb-3">Nociception Note</h4>
                      <p className="text-sm font-bold text-slate-800 leading-relaxed uppercase italic tracking-tight">
                        "Cartilage has NO pain receptors. Pain is mechanically driven but chemically mediated via bone, synovium, and capsule."
                      </p>
                    </div>
                 </div>
               </div>
            </div>
          )}

          {/* SECTION: Clinical Profiles */}
          {activeSection === 'clinical' && (
            <div className="space-y-8 animate-in zoom-in-95 duration-500">
               <div className="flex bg-slate-200 p-1.5 rounded-2xl w-fit mx-auto gap-1">
                  {Object.keys(JOINT_PROFILES).map(j => (
                    <button 
                      key={j} 
                      onClick={() => setActiveJoint(j as any)}
                      className={`px-8 py-3 rounded-xl text-sm font-bold capitalize transition-all ${activeJoint === j ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      {j}
                    </button>
                  ))}
               </div>

               <div className="grid lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-12 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden relative">
                    <div className="absolute top-10 right-10 text-8xl opacity-10 blur-sm pointer-events-none">
                      {selectedJointData.emoji}
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-4xl font-black text-slate-800 mb-3 tracking-tighter uppercase italic">
                        {selectedJointData.title} <span className="text-blue-600">Profile</span>
                      </h3>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-10">{selectedJointData.note}</p>
                      
                      <div className="grid md:grid-cols-2 gap-12">
                        <div>
                          <h4 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Typical Presentation</h4>
                          <div className="p-6 bg-red-50 text-red-700 rounded-3xl font-black text-sm border border-red-100 flex items-center gap-4 shadow-sm">
                            <AlertTriangle size={24} /> {selectedJointData.deformity}
                          </div>
                          
                          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { name: 'Charcot Joints', color: 'bg-amber-50', text: 'Neurological failure' },
                                { name: 'Milwaukee', color: 'bg-red-50', text: 'Destructive shoulder' },
                                { name: 'Erosive OA', color: 'bg-blue-50', text: 'Inflammatory DIP' }
                            ].map((v, i) => (
                                <div key={i} className={`p-4 ${v.color} rounded-2xl border border-slate-100`}>
                                <h5 className="font-black text-[10px] uppercase mb-1 text-slate-800">{v.name}</h5>
                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tight">{v.text}</p>
                                </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Clinical Hallmarks</h4>
                          <div className="space-y-3">
                             {selectedJointData.signs.map((s, i) => (
                               <div key={i} className="flex items-center gap-4 text-[11px] text-slate-700 font-black uppercase tracking-widest bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-blue-400 transition-colors">
                                 <ShieldCheck className="text-emerald-500 shrink-0" size={18} /> {s}
                               </div>
                             ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          )}

          {/* SECTION: Grading */}
          {activeSection === 'grading' && (
            <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
               <div className="grid md:grid-cols-2 gap-8">
                  {/* Outerbridge */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm h-full">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                         <Bone size={24} />
                      </div>
                      <h3 className="text-2xl font-black uppercase italic tracking-tighter">Outerbridge Classification</h3>
                    </div>
                    <div className="space-y-4">
                      {OA_DATA.grading.outerbridge.map((grade) => (
                        <div key={grade.g} className="p-5 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-6 group hover:border-blue-200 transition-all">
                           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-blue-600 shadow-sm border border-slate-200 group-hover:scale-110 transition-transform">
                             {grade.g}
                           </div>
                           <div>
                             <h4 className="font-black text-xs uppercase tracking-tight text-slate-800">{grade.title}</h4>
                             <p className="text-[11px] text-slate-500 font-medium">{grade.desc}</p>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* K-L Grading */}
                  <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl h-full">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-3 bg-blue-600 rounded-2xl text-white">
                         <Activity size={24} />
                      </div>
                      <h3 className="text-2xl font-black uppercase italic tracking-tighter text-blue-400">Kellgren-Lawrence Scaling</h3>
                    </div>
                    <div className="space-y-4">
                      {OA_DATA.grading.kl.map((grade) => (
                        <div key={grade.g} className="p-5 bg-white/5 rounded-3xl border border-white/5 flex items-center gap-6 group hover:bg-white/10 transition-all">
                           <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-white shadow-lg group-hover:scale-110 transition-transform">
                             {grade.g}
                           </div>
                           <div>
                             <h4 className="font-black text-xs uppercase tracking-tight text-white">{grade.title}</h4>
                             <p className="text-[11px] text-slate-400 font-medium">{grade.desc}</p>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
            </div>
          )}

          {/* SECTION: Management */}
          {activeSection === 'management' && (
            <div className="space-y-8 animate-in slide-in-from-left duration-500">
               <div className="w-full space-y-6">
                  {OA_DATA.managementSteps.map((step) => (
                     <div 
                       key={step.step}
                       className={`p-8 rounded-[2.5rem] border-l-[12px] shadow-sm transform transition-all hover:translate-x-3 bg-white ${
                         step.color === 'emerald' ? 'border-emerald-500' : 
                         step.color === 'blue' ? 'border-blue-500' : 
                         step.color === 'amber' ? 'border-amber-500' : 
                         'border-red-500'
                       }`}
                     >
                       <div className="flex justify-between items-start mb-4">
                         <div>
                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 inline-block ${
                              step.color === 'emerald' ? 'bg-emerald-50 text-emerald-700' : 
                              step.color === 'blue' ? 'bg-blue-50 text-blue-700' : 
                              step.color === 'amber' ? 'bg-amber-50 text-amber-700' : 
                              'bg-red-50 text-red-700'
                            }`}>
                              {step.badge}
                            </span>
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-800">
                              Level {step.step}: {step.title}
                            </h3>
                         </div>
                         <Hammer className={`opacity-20 ${
                           step.color === 'emerald' ? 'text-emerald-500' : 
                           step.color === 'blue' ? 'text-blue-500' : 
                           step.color === 'amber' ? 'text-amber-500' : 
                           'text-red-500'
                         }`} size={40} />
                       </div>
                       <p className="text-sm font-bold text-slate-600 leading-relaxed max-w-2xl">{step.desc}</p>
                     </div>
                  ))}
               </div>

               <div className="grid md:grid-cols-2 gap-6 w-full mt-12">
                  <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2rem] text-white">
                    <h4 className="text-xs font-black text-rose-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                       <XCircle size={16} /> Avoid / Discredited
                    </h4>
                    <div className="space-y-4">
                       <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-[11px] font-bold text-slate-400 leading-relaxed uppercase tracking-tight">
                         Glucosamine & Chondroitin (NICE Red Rated)
                       </div>
                       <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-[11px] font-bold text-slate-400 leading-relaxed uppercase tracking-tight">
                         Hyaluronan Injections (Evidence Lacking)
                       </div>
                       <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-[11px] font-bold text-slate-400 leading-relaxed uppercase tracking-tight">
                         Arthroscopic Debridement (Mechanical fail)
                       </div>
                    </div>
                  </div>
                  <div className="p-8 bg-indigo-600 rounded-[2rem] text-white shadow-xl shadow-indigo-100">
                    <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                       <CheckCircle2 size={16} /> Clinical Master-Pearls
                    </h4>
                    <div className="space-y-6">
                       <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-black">1</div>
                          <p className="text-xs font-bold leading-relaxed uppercase tracking-tight italic">Use walking stick in <strong>CONTRALATEAL</strong> hand to slash joint reactive forces.</p>
                       </div>
                       <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-black">2</div>
                          <p className="text-xs font-bold leading-relaxed uppercase tracking-tight italic">Steroids are optimization tools for life-events (e.g. Weddings), not chronic maintenance.</p>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
