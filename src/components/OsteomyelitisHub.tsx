import React, { useState, useMemo } from 'react';
import { 
  Microscope, 
  Target, 
  ChevronRight, 
  ShieldAlert, 
  Layers, 
  Stethoscope,
  ClipboardList,
  ArrowLeft,
  UserCheck,
  RotateCcw,
  FlaskConical,
  Zap,
  Activity,
  AlertTriangle,
  Binary,
  Scissors,
  Search,
  Database,
  Wind,
  CheckCircle2,
  ArrowRight,
  ChevronUp,
  BookOpen
} from 'lucide-react';

const COMPREHENSIVE_DATA = {
  pathophysiology: {
    title: "Pathophysiology Cycle",
    steps: [
      { name: "Hairpin Loops", desc: "Sluggish flow in metaphyseal vessels allows bacteria to settle and proliferate." },
      { name: "Vascular Occlusion", desc: "Inflammatory pressure causes vessel thrombosis and bone ischemia." },
      { name: "Sequestrum", desc: "Avascular, necrotic bone that acts as a reservoir for bacteria, unreachable by antibiotics." },
      { name: "Involucrum", desc: "New reactive bone formed by the periosteum attempting to wall off the infection." },
      { name: "Cloaca", desc: "An opening in the involucrum through which pus/sequestra can drain." }
    ],
    pearl: "Surgery is mandatory because no amount of IV antibiotics can reach an avascular sequestrum."
  },
  staging: {
    anatomical: [
      { stage: 1, desc: "Medullary - infection isolated to the endosteal surface." },
      { stage: 2, desc: "Superficial - cortical infection (often post-traumatic)." },
      { stage: 3, desc: "Localized - full thickness sequestration (mechanically stable)." },
      { stage: 4, desc: "Diffuse - circumferential involvement (mechanically unstable)." }
    ],
    physiological: [
      "A-Host (Normal physiology)",
      "B-Host (Systemic/Local compromise)",
      "C-Host (Treatment worse than disease)"
    ]
  },
  aho: {
    title: "Acute Paediatric OM",
    niche: "Hematogenous Spread",
    clinical: "Child with fever, pseudo-paralysis, and localized bone tenderness.",
    logic: "Usually involves the metaphysis of long bones due to sluggish capillary flow.",
    pathology: "S. Aureus is the #1 pathogen. Salmonella in Sickle Cell patients. Pseudomonas in nail-through-shoe injuries.",
    pearl: "MRI is the most sensitive early imaging; X-rays take 10-14 days to show changes."
  },
  septic: {
    title: "Septic Arthritis",
    niche: "Emergency Surgical Drainage",
    logic: "Kocher Criteria: Non-weight bearing, Fever >38.5, ESR >40, WBC >12k (4/4 = 99% probability).",
    pearl: "The pediatric hip is an emergency. Delayed drainage leads to AVN and joint destruction."
  },
  pji: {
    title: "PJI Protocol",
    niche: "Biofilm Interface",
    logic: "Acute PJI (<4 weeks): DAIR (Debridement, Antibiotics, Implant Retention). Chronic: 2-Stage Exchange.",
    pearl: "Biofilm bacteria are 1000x more resistant to antibiotics than their planktonic counterparts."
  },
  potts: {
    title: "Potts Disease",
    niche: "Spinal Tuberculosis",
    logic: "Spares the disc space initially (unlike pyogenic) and favors slow vertebral destruction.",
    pearl: "Paradical sparing of the disc is a hallmark of fungal or TB infection over bacteria."
  },
  biofilm: {
    title: "Biofilm Biology",
    niche: "Sessile vs Planktonic",
    stages: [
      { id: 1, name: "Reversible Attachment", desc: "Planktonic bacteria adhere to surfaces via Van der Waals forces." },
      { id: 2, name: "Irreversible Adhesion", desc: "Upregulation of genes to form an Extracellular Polymeric Substance (EPS)." },
      { id: 3, name: "Quorum Sensing", desc: "Chemical signaling systems allow bacteria to coordinate metabolic activity." },
      { id: 4, name: "Maturation", desc: "Complex 3D 'mushroom' structures with nutrient channels form." },
      { id: 5, name: "Dispersal", desc: "Surface bacteria detach to colonize new sites." }
    ],
    pearl: "Quorum sensing turns the biofilm into a multicellular functional unit."
  },
  masquelet: {
    title: "Masquelet Technique",
    niche: "Induced Membrane",
    biology: "A bioactive membrane forms around a cement spacer, rich in VEGF, BMP-2, and TGF-beta.",
    steps: [
      "Step 1: Radical debridement and insertion of PMMA cement spacer.",
      "Step 2: Wait 4-8 weeks for membrane maturation.",
      "Step 3: Incise membrane, remove cement, and fill with autologous bone graft."
    ]
  },
  carriers: {
    title: "Antibiotic Carriers",
    types: [
      { name: "Non-Absorbable (PMMA)", pro: "Mechanical strength, high elution.", con: "Requires second surgery for removal." },
      { name: "Absorbable (CaSO4)", pro: "No removal needed, can fill dead space.", con: "Transient serous drainage/wound issues." }
    ]
  },
  imaging: {
    title: "Advanced Imaging",
    logic: "MRI: Sensitive for early marrow edema. WBC Scan: Specific for infection near hardware. PET: High negative predictive value.",
    steps: [
       "MRI: T1 low / T2 high marrow signal.",
       "WBC Scan: Accumulation of labeled leukocytes over 24h.",
       "Triple Phase Bone Scan: Positive in all three phases for osteomyelitis."
    ]
  },
  brodies: {
    title: "Brodie's Abscess",
    niche: "Sub-acute Osteomyelitis",
    logic: "Walled-off infection, often in the metaphysis, mimicking an Osteoid Osteoma.",
    pearl: "Usually occurs in children; requires surgical saucerization if painful."
  },
  microbiology: {
    "Sickle_Cell": "Salmonella",
    "Puncture_Wound_Shoe": "Pseudomonas",
    "Human_Bite": "Eikenella",
    "Dog_Cat_Bite": "Pasteurella",
    "Neonates": "Group B Strep"
  },
  tx: {
    principles: [
      "Radical Debridement of all necrotic tissue.",
      "Dead Space Management using flaps or spacers.",
      "Skeletal Stability via internal or external fixation.",
      "Targeted Antibiotic Therapy for 6-12 weeks."
    ]
  }
};

const MENU_GROUPS = [
  { id: 'patho', label: 'Pathophysiology', icon: Layers, group: 'CORE INFECTIONS' },
  { id: 'staging', label: 'Cierny-Mader', icon: ClipboardList, group: 'CORE INFECTIONS' },
  { id: 'aho', label: 'Acute Paediatric', icon: UserCheck, group: 'CORE INFECTIONS' },
  { id: 'potts', label: 'Pott\'s Disease', icon: Activity, group: 'CORE INFECTIONS' },
  { id: 'brodies', label: 'Brodie\'s Abscess', icon: Search, group: 'CORE INFECTIONS' },
  
  { id: 'septic', label: 'Septic Arthritis', icon: Stethoscope, group: 'EMERGENCIES' },
  
  { id: 'biofilm', label: 'Biofilm Biology', icon: Binary, group: 'SCIENCE & BIOLOGY' },
  { id: 'micro', label: 'Microbiology', icon: FlaskConical, group: 'SCIENCE & BIOLOGY' },
  { id: 'carriers', label: 'Local Antibiotics', icon: Wind, group: 'SCIENCE & BIOLOGY' },
  
  { id: 'pji', label: 'PJI Protocol', icon: RotateCcw, group: 'ADVANCED CLINICAL' },
  { id: 'masquelet', label: 'Masquelet Tech', icon: Scissors, group: 'ADVANCED CLINICAL' },
  { id: 'imaging', label: 'Imaging Logic', icon: Search, group: 'ADVANCED CLINICAL' },
  { id: 'tx', label: 'Surgical Tx', icon: ShieldAlert, group: 'ADVANCED CLINICAL' },
];

interface OsteomyelitisHubProps {
  onBack: () => void;
}

const OsteomyelitisHub = ({ onBack }: OsteomyelitisHubProps) => {
  const [activeTab, setActiveTab] = useState('patho');
  const [subTab, setSubTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const currentData = (COMPREHENSIVE_DATA as any)[activeTab];
  
  const progress = Math.round((completedSections.length / MENU_GROUPS.length) * 100);

  const handleComplete = () => {
    if (!completedSections.includes(activeTab)) {
      setCompletedSections(prev => [...prev, activeTab]);
    }
    
    // Auto-advance to next section
    const currentIndex = MENU_GROUPS.findIndex(m => m.id === activeTab);
    if (currentIndex < MENU_GROUPS.length - 1) {
      const nextId = MENU_GROUPS[currentIndex + 1].id;
      setActiveTab(nextId);
      setSubTab('overview');
      document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    const currentIndex = MENU_GROUPS.findIndex(m => m.id === activeTab);
    if (currentIndex < MENU_GROUPS.length - 1) {
      setActiveTab(MENU_GROUPS[currentIndex + 1].id);
      setSubTab('overview');
      document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    const currentIndex = MENU_GROUPS.findIndex(m => m.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(MENU_GROUPS[currentIndex - 1].id);
      setSubTab('overview');
      document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const groupedMenu = useMemo(() => {
    return MENU_GROUPS.reduce((acc, item) => {
      if (!acc[item.group]) acc[item.group] = [];
      acc[item.group].push(item);
      return acc;
    }, {} as Record<string, (typeof MENU_GROUPS[0])[]>);
  }, []);

  const renderContent = () => {
    if (subTab === 'diagnosis') {
      return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8 text-left">
          <div className="p-10 bg-indigo-50 border border-indigo-100 rounded-[3rem]">
            <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-6 italic">Diagnostic Strategy</h4>
            <p className="text-3xl font-black text-slate-900 italic uppercase leading-tight mb-8 tracking-tighter">
              {currentData.logic || "Aspiration and biopsy remain the gold standard for definitive diagnosis."}
            </p>
            <div className="flex items-center gap-4 text-indigo-400">
               <Search size={20} />
               <span className="text-[10px] font-black uppercase tracking-widest italic">Logic Stream Verified</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
             <div className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-xl transition-all">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Imaging Hallmark</p>
                <p className="text-base text-slate-600 font-bold italic leading-relaxed">
                   {activeTab === 'aho' ? "MRI showing marrow edema is the earliest sign." : "X-ray evidence of bone destruction appears after 30-50% mineral loss."}
                </p>
             </div>
             <div className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-xl transition-all">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Lab Protocol</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-indigo-500" />
                     <span className="text-xs font-bold text-slate-700 italic">ESR {'>'} 40 mm/hr</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-indigo-500" />
                     <span className="text-xs font-bold text-slate-700 italic">CRP {'>'} 20 mg/L</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      );
    }

    if (subTab === 'management') {
      return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8 text-left">
          <div className="bg-slate-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -bottom-10 -right-10 opacity-10 rotate-12 group-hover:scale-110 transition-transform">
               <Scissors size={200} />
            </div>
            <div className="relative z-10 max-w-xl">
               <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em] mb-8 italic">Management Strategy</h4>
               <p className="text-4xl font-black italic tracking-tighter uppercase leading-none mb-10">
                 {activeTab === 'septic' ? "Emergency I&D and Irrigation." : "Surgical Debridement & Stability."}
               </p>
               <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Protocol Active</span>
               </div>
            </div>
          </div>

          <div className="p-10 bg-amber-50 border border-amber-100 rounded-[3rem] flex items-center gap-8">
             <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
                <Zap size={32} />
             </div>
             <div>
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest italic mb-2 block">System Pearl</span>
                <p className="text-xl font-black text-amber-900 italic tracking-tighter uppercase leading-tight">
                  {currentData.pearl || "Adequate debridement is more important than the duration of antibiotics."}
                </p>
             </div>
          </div>
        </div>
      );
    }

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 text-left">
        {/* Foundation sections */}
        {(activeTab === 'patho' || activeTab === 'staging') && (
            <div className="space-y-12">
               <div className="bg-slate-50/50 p-12 rounded-[4rem] border border-slate-100 relative overflow-hidden">
                  <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16">
                     <div className="space-y-4">
                        <div className="flex items-center gap-4">
                           <div className={`w-14 h-14 rounded-3xl flex items-center justify-center text-white shadow-xl ${activeTab === 'patho' ? 'bg-indigo-600' : 'bg-slate-900'}`}>
                              {activeTab === 'patho' ? <Layers size={28} /> : <ClipboardList size={28} />}
                           </div>
                           <div>
                              <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none mb-2">
                                {activeTab === 'patho' ? "Biological Cycle" : "Staging Protocol"}
                              </h3>
                              <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em]">Module Stream // Foundation_01</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(activeTab === 'patho' ? COMPREHENSIVE_DATA.pathophysiology.steps : COMPREHENSIVE_DATA.staging.anatomical).map((item: any, i: number) => (
                      <div key={i} className="group p-8 bg-white rounded-[3rem] border border-slate-100 hover:shadow-2xl hover:border-indigo-500/30 transition-all flex flex-col">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-indigo-600 font-black text-lg mb-8 shadow-sm">0{i+1}</div>
                        <h4 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight italic">{item.name || `Stage ${item.stage}`}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed font-bold italic">{item.desc}</p>
                      </div>
                    ))}
                  </div>
               </div>
               
               {activeTab === 'staging' && (
                  <div className="grid md:grid-cols-3 gap-8">
                    {COMPREHENSIVE_DATA.staging.physiological.map((p, i) => (
                      <div key={i} className="p-10 bg-slate-900 rounded-[3rem] shadow-xl group hover:scale-[1.02] transition-transform">
                        <div className="text-6xl font-black text-slate-700 mb-6 group-hover:text-amber-500 transition-colors uppercase italic leading-none">{p.split(' ')[0]}</div>
                        <p className="text-[11px] font-black text-slate-400 uppercase italic tracking-[0.2em] mb-2 group-hover:text-white transition-colors">{p.split(' ')[0]} Host</p>
                        <div className="w-12 h-1 bg-amber-500 rounded-full mb-6" />
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight italic group-hover:text-slate-300">{p.split('(')[1]?.replace(')', '') || p}</p>
                      </div>
                    ))}
                  </div>
               )}
            </div>
        )}

        {/* Clinical sections */}
        {['aho', 'septic', 'pji', 'potts', 'brodies', 'masquelet', 'carriers', 'imaging'].includes(activeTab) && (
          <div className="space-y-12">
            <div className="grid lg:grid-cols-2 gap-10">
               <div className="p-12 bg-white border border-slate-100 rounded-[4rem] shadow-sm">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-8">Clinical Focus</h3>
                  <p className="text-3xl font-black text-slate-800 italic uppercase leading-none mb-8 tracking-tighter text-indigo-600">{currentData.niche}</p>
                  <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Diagnostic Logic</p>
                     <p className="text-base font-bold text-slate-600 italic leading-relaxed">{currentData.logic || currentData.biology}</p>
                  </div>
               </div>
               <div className="bg-slate-900 p-12 rounded-[4rem] text-white">
                  <h4 className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-10 italic">Core Parameters</h4>
                  <div className="space-y-6">
                    {(currentData.steps || currentData.stages || currentData.types || []).map((t: any, i: number) => (
                      <div key={i} className="flex gap-6">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-black shrink-0">{i+1}</div>
                        <p className="text-sm text-slate-300 font-bold italic leading-relaxed">
                          {typeof t === 'string' ? t : (t.name || t.desc || "Active data stream")}
                        </p>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
            
            <div className="bg-indigo-50 p-12 rounded-[4rem] border border-indigo-100 flex flex-col md:flex-row items-center gap-10">
               <div className="flex-1">
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-4 block">Primary Condition Marker</span>
                  <h4 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter leading-tight">{currentData.clinical || currentData.title}</h4>
               </div>
               <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-indigo-600 shrink-0">
                  <Target size={32} />
               </div>
            </div>
          </div>
        )}

        {/* Microbiology */}
        {activeTab === 'micro' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(COMPREHENSIVE_DATA.microbiology).map(([key, val], i) => (
              <div key={i} className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-xl transition-all">
                <h5 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-6 italic">{key.replace(/_/g, ' ')}</h5>
                <p className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">{val as string}</p>
              </div>
            ))}
          </div>
        )}

        {/* Surgical Tx */}
        {activeTab === 'tx' && (
           <div className="grid md:grid-cols-2 gap-8">
             {COMPREHENSIVE_DATA.tx.principles.map((p, i) => (
               <div key={i} className="p-10 bg-white border border-slate-100 rounded-[3rem] flex gap-6 items-start">
                 <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black shrink-0">0{i+1}</div>
                 <p className="text-xl font-black text-slate-800 italic uppercase tracking-tighter leading-tight">{p}</p>
               </div>
             ))}
           </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen bg-white md:bg-slate-50 flex overflow-hidden font-sans w-full">
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-6 right-6 z-50 md:hidden w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
      >
        {isSidebarOpen ? <ArrowLeft size={24} /> : <ClipboardList size={24} />}
      </button>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 md:relative md:flex w-[280px] bg-white border-r border-slate-100 flex-col h-full shrink-0 shadow-sm transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 flex flex-col h-full bg-white">
           <button 
             onClick={onBack}
             className="flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-all mb-8 text-[10px] font-black uppercase tracking-[0.2em]"
           >
             <ArrowLeft size={14} /> Back to Hub
           </button>

           <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                <Microscope size={20} />
              </div>
              <div>
                <span className="block text-[8px] font-black text-indigo-600 uppercase tracking-widest mb-0.5">Revision System</span>
                <span className="text-lg font-black tracking-tighter text-slate-900 uppercase">OM Mastery</span>
              </div>
           </div>

           {/* Progress Panel */}
           <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-2">
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Progress</span>
                 <span className="text-[10px] font-black text-indigo-600 italic">{progress}%</span>
              </div>
              <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden flex">
                 <div 
                   className="h-full bg-indigo-600 transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(79,70,229,0.4)]"
                   style={{ width: `${progress}%` }}
                 />
              </div>
           </div>

           <nav className="flex-1 space-y-6 overflow-y-auto no-scrollbar pr-1">
             {(Object.entries(groupedMenu) as [string, (typeof MENU_GROUPS[0])[]][]).map(([groupName, items]) => (
               <div key={groupName} className="space-y-2">
                 <h4 className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] px-4 py-1">{groupName}</h4>
                 <div className="space-y-1">
                   {items.map((item) => {
                     const isCompleted = completedSections.includes(item.id);
                     const isActive = activeTab === item.id;
                     return (
                       <button
                         key={item.id}
                         onClick={() => {
                           setActiveTab(item.id);
                           setSubTab('overview');
                           setIsSidebarOpen(false);
                         }}
                         className={`w-full group flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 text-left
                            ${isActive 
                              ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-500 rounded-l-none' 
                              : 'text-slate-400 hover:bg-gray-100 hover:text-slate-600'}`}
                       >
                         <div className="flex items-center gap-3">
                           <item.icon size={15} className={isActive ? 'text-indigo-600' : 'text-slate-300 group-hover:text-slate-400'} />
                           <span className={`text-[10px] font-black uppercase tracking-wider transition-transform ${isActive ? 'translate-x-1' : ''}`}>
                             {item.label}
                           </span>
                         </div>
                         {isCompleted && <CheckCircle2 size={12} className="text-emerald-500" />}
                       </button>
                     );
                   })}
                 </div>
               </div>
             ))}
           </nav>

           <footer className="mt-6 pt-4 border-t border-slate-50">
             <div className="p-3 bg-indigo-50/50 rounded-xl flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-indigo-400 animate-pulse" />
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest italic">Core logic stream alpha_01</p>
             </div>
           </footer>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col relative bg-white md:bg-[#F9FAFB] scroll-smooth min-w-0">
        <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-30 flex items-center justify-between px-6 md:px-10 shrink-0">
          <div className="flex items-center gap-3">
             <BookOpen size={16} className="text-indigo-500/50" />
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
               Module: {MENU_GROUPS.find(m => m.id === activeTab)?.label}
             </span>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden md:flex flex-col items-end mr-4">
                <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Active Stream</p>
                <p className="text-[9px] font-black text-indigo-600 uppercase tracking-tighter italic">REVISION_CMD_0X{MENU_GROUPS.findIndex(m => m.id === activeTab) + 1}</p>
             </div>
             <button
               onClick={() => document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' })}
               className="p-2 text-slate-300 hover:text-slate-900 transition-colors"
             >
               <ChevronUp size={18} />
             </button>
          </div>
        </header>

        <div className="w-full flex-1 md:py-12 px-4 md:px-8">
          <div className="max-w-4xl mx-auto space-y-8 pb-12">
            {/* CONTENT HEADER */}
            <div className="flex flex-col md:flex-row items-center gap-6 p-8 bg-white md:bg-transparent rounded-[3rem] border border-slate-100 md:border-none">
               <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-100 rotate-3 shrink-0">
                 {React.createElement(MENU_GROUPS.find(m => m.id === activeTab)?.icon || Layers, { size: 40 })}
               </div>
               <div className="flex-1 text-center md:text-left">
                  <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] italic mb-2">Selected Domain // {MENU_GROUPS.find(m => m.id === activeTab)?.group}</p>
                  <h2 className="text-5xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">
                    {MENU_GROUPS.find(m => m.id === activeTab)?.label}
                  </h2>
               </div>
            </div>

            {/* CONTENT TABS */}
            <div className="flex bg-slate-100/50 p-1.5 rounded-[2rem] border border-slate-100 self-center md:self-start w-fit">
              {['overview', 'diagnosis', 'management'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSubTab(tab)}
                  className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all duration-300
                    ${subTab === tab 
                      ? 'bg-white text-indigo-600 shadow-md border border-slate-200' 
                      : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* MAIN CARD CONTAINER */}
            <div className="bg-white border border-slate-100 p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] shadow-xl shadow-slate-200/50 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                  {React.createElement(MENU_GROUPS.find(m => m.id === activeTab)?.icon || Layers, { size: 280 })}
               </div>

               <div className="relative z-10 min-h-[400px]">
                 {renderContent()}
               </div>
            </div>
            
            {/* Navigation Action Buttons */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-10 border-t border-slate-100">
               <div className="flex gap-4">
                  <button 
                    onClick={handlePrev}
                    disabled={activeTab === MENU_GROUPS[0].id}
                    className="group px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:border-indigo-200 transition-all flex items-center gap-3 active:scale-95 disabled:opacity-30"
                  >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Previous Topic
                  </button>

                  <button 
                    onClick={handleNext}
                    disabled={activeTab === MENU_GROUPS[MENU_GROUPS.length - 1].id}
                    className="group px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:border-indigo-200 transition-all flex items-center gap-3 active:scale-95 disabled:opacity-30"
                  >
                    Next Topic
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
               
               <button
                 onClick={handleComplete}
                 className="flex items-center gap-4 px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-indigo-700 hover:scale-105 transition-all shadow-xl shadow-indigo-100 group active:scale-95"
               >
                 {completedSections.includes(activeTab) ? "Continue Protocol" : "Mark as Complete"}
                 <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
               </button>
            </div>
          </div>
        </div>

        {/* Legend */}
        <footer className="mt-auto px-6 md:px-12 py-8 flex flex-wrap justify-center border-t border-slate-100 bg-white relative z-10 shrink-0">
           <div className="flex flex-wrap justify-center gap-6 md:gap-12">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-indigo-600"></div> 
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Diagnostic Logic</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-amber-500"></div> 
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Surgical Pearl</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-red-500"></div> 
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Critical Mimic</span>
             </div>
             <div className="bg-slate-50 border border-slate-200 px-4 py-1.5 rounded-full font-mono text-[7px] text-slate-400 tracking-[.3em]">
                ALPHA_01_REVISION_CMD
             </div>
           </div>
        </footer>
      </main>
    </div>
  );
};

export default OsteomyelitisHub;
