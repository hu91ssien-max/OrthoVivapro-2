import React, { useState, useMemo } from 'react';
import { motion } from "motion/react";
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
  BookOpen,
  Hand,
  Footprints,
  Flame,
  Skull
} from 'lucide-react';

const COMPREHENSIVE_DATA = {
  patho: {
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
  micro: {
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
  },
  kanavel: {
    title: "Kanavel's Signs",
    niche: "Pyogenic Flexor Tenosynovitis",
    signs: [
      { name: "Sausage Digit", desc: "Uniform, fusiform swelling of the entire finger." },
      { name: "Flexed Posture", desc: "The finger is held in slight flexion for comfort." },
      { name: "Extension Pain", desc: "Exquisite pain on passive extension of the finger." },
      { name: "Sheath Tenderness", desc: "Tenderness specifically along the flexor tendon sheath." }
    ],
    action: "Urgent surgical drainage (sheath washout) to prevent tendon necrosis.",
    pearl: "If all 4 signs are present, the diagnosis is 95% certain. Delay leads to 'Horseshoe Abscess' spread."
  },
  wagner: {
    title: "Diabetic Foot Staging",
    niche: "Wagner Classification",
    stages: [
      { s: "Grade 0", d: "At-risk foot: thick calluses, bone deformities, no ulcers." },
      { s: "Grade 1", d: "Superficial ulcer: not involving tendon, capsule, or bone." },
      { s: "Grade 2", d: "Deep ulcer: involving tendon or capsule; no bone infection." },
      { s: "Grade 3", d: "Deep ulcer with Osteomyelitis or abscess formation." },
      { s: "Grade 4", d: "Localized gangrene (Forefoot or Heel)." },
      { s: "Grade 5", d: "Extensive foot gangrene requiring major amputation." }
    ],
    pearl: "Grade 3 is the 'surgical tipping point' where bone debridement or partial amputation is mandatory."
  },
  lrinec: {
    title: "Necrotizing Fasciitis",
    niche: "The LRINEC Score",
    criteria: [
      { name: "CRP", detail: "> 150 mg/L (+4 points)" },
      { name: "WBC", detail: "> 15,000 /uL (+1 or +2 points)" },
      { name: "Hemoglobin", detail: "< 11 g/dL (+2 points)" },
      { name: "Sodium", detail: "< 135 mmol/L (+2 points)" },
      { name: "Creatinine", detail: "> 141 umol/L (+2 points)" },
      { name: "Glucose", detail: "> 10 mmol/L (+1 point)" }
    ],
    risk: "Score ≥ 6 = High suspicion. Score ≥ 8 = Very high probability.",
    action: "Immediate 'slash' debridement. Dishwater pus and loss of fascial resistance are operative keys.",
    pearl: "Subcutaneous air (Crepitus) on X-ray is pathognomonic but only present in 30% of cases."
  },
  atypical: {
    title: "Atypical Bone Infections",
    niche: "Syphilis & Brucellosis",
    syphilis: "Congenital: 'Saber Shin' (bowed tibia) and Clutton's joints. Tertiary: Gummatous bone destruction.",
    brucellosis: "Common in the Mediterranean/Middle East. Causes 'Spinal Brucellosis' mimicking TB but spares the disc less.",
    pearl: "Always consider these in chronic, 'culture-negative' osteomyelitis with travel history."
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

  { id: 'kanavel', label: "Kanavel (Hand)", icon: Hand, group: 'EMERGENCY HUB' },
  { id: 'wagner', label: "Wagner (Foot)", icon: Footprints, group: 'EMERGENCY HUB' },
  { id: 'lrinec', label: "Nec-Fasc (LRINEC)", icon: Flame, group: 'EMERGENCY HUB' },
  { id: 'atypical', label: "Atypical OM", icon: Skull, group: 'EMERGENCY HUB' },
];

interface OsteomyelitisHubProps {
  onBack: () => void;
}

const OsteomyelitisHub = ({ onBack }: OsteomyelitisHubProps) => {
  const [activeTab, setActiveTab] = useState('patho');
  const [subTab, setSubTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const currentData = (COMPREHENSIVE_DATA as any)[activeTab] || {};
  
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
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6 text-left">
          <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-3xl">
            <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-4 italic">Diagnostic Strategy</h4>
            <p className="text-2xl font-black text-slate-900 italic uppercase leading-tight mb-6 tracking-tighter">
              {currentData.logic || currentData.risk || "Aspiration and biopsy remain the gold standard for definitive diagnosis."}
            </p>
            <div className="flex items-center gap-4 text-indigo-400">
               <Search size={18} />
               <span className="text-[9px] font-black uppercase tracking-widest italic tracking-wider">Logic Stream Verified</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
             <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Imaging Hallmark</p>
                <p className="text-sm text-slate-600 font-bold italic leading-relaxed">
                   {activeTab === 'aho' ? "MRI showing marrow edema is the earliest sign." : "X-ray evidence of bone destruction appears after 30-50% mineral loss."}
                </p>
             </div>
             <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Lab Protocol</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                     <span className="text-xs font-bold text-slate-700 italic">ESR {'>'} 40 mm/hr</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
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
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6 text-left">
          <div className="bg-slate-900 p-10 rounded-3xl text-white shadow-xl relative overflow-hidden group">
            <div className="absolute -bottom-6 -right-6 opacity-10 rotate-12 group-hover:scale-110 transition-transform">
               <Scissors size={180} />
            </div>
            <div className="relative z-10 max-w-xl">
               <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em] mb-6 italic">Management Strategy</h4>
               <p className="text-3xl font-black italic tracking-tighter uppercase leading-none mb-8">
                 {activeTab === 'septic' ? "Emergency I&D and Irrigation." : 
                  activeTab === 'kanavel' ? "Urgent Sheath Washout." :
                  activeTab === 'lrinec' ? "Immediate Debridement." :
                  "Surgical Debridement & Stability."}
               </p>
               <div className="inline-flex items-center gap-4 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Protocol Active</span>
               </div>
            </div>
          </div>

          <div className="p-8 bg-amber-50 border border-amber-100 rounded-3xl flex items-center gap-6">
             <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
                <Zap size={28} />
             </div>
             <div>
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest italic mb-1 block">System Pearl</span>
                <p className="text-xl font-black text-amber-900 italic tracking-tighter uppercase leading-tight">
                   {currentData.pearl || "Adequate debridement is more important than the duration of antibiotics."}
                </p>
             </div>
          </div>
        </div>
      );
    }

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 text-left">
        {/* Foundation sections */}
        {(activeTab === 'patho' || activeTab === 'staging') && (
            <div className="space-y-6">
               <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                  <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                     <div className="space-y-3">
                        <div className="flex items-center gap-3">
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${activeTab === 'patho' ? 'bg-indigo-600' : 'bg-slate-900'}`}>
                              {activeTab === 'patho' ? <Layers size={24} /> : <ClipboardList size={24} />}
                           </div>
                           <div>
                              <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none mb-1">
                                {activeTab === 'patho' ? "Biological Cycle" : "Staging Protocol"}
                              </h3>
                              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Module Stream // Foundation_01</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(activeTab === 'patho' ? COMPREHENSIVE_DATA.patho.steps : COMPREHENSIVE_DATA.staging.anatomical).map((item: any, i: number) => (
                      <div key={i} className="group p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg hover:border-indigo-500/30 transition-all flex flex-col">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-indigo-600 font-black text-base mb-6 shadow-sm">0{i+1}</div>
                        <h4 className="text-lg font-black text-slate-900 mb-2 uppercase tracking-tight italic">{item.name || `Stage ${item.stage}`}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-bold italic">{item.desc}</p>
                      </div>
                    ))}
                  </div>
               </div>
               
               {activeTab === 'staging' && (
                  <div className="grid md:grid-cols-3 gap-6">
                    {COMPREHENSIVE_DATA.staging.physiological.map((p, i) => (
                      <div key={i} className="p-8 bg-slate-900 rounded-3xl shadow-lg group hover:scale-[1.02] transition-transform">
                        <div className="text-5xl font-black text-slate-700 mb-4 group-hover:text-amber-500 transition-colors uppercase italic leading-none">{p.split(' ')[0]}</div>
                        <p className="text-[10px] font-black text-slate-400 uppercase italic tracking-[0.2em] mb-1 group-hover:text-white transition-colors">{p.split(' ')[0]} Host</p>
                        <div className="w-10 h-1 bg-amber-500 rounded-full mb-4" />
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight italic group-hover:text-slate-300">{p.split('(')[1]?.replace(')', '') || p}</p>
                      </div>
                    ))}
                  </div>
               )}
            </div>
        )}

        {/* Clinical sections */}
        {['aho', 'septic', 'pji', 'potts', 'brodies', 'masquelet', 'carriers', 'imaging', 'kanavel', 'wagner', 'lrinec', 'atypical'].includes(activeTab) && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
               <div className="p-10 bg-white border border-slate-100 rounded-3xl shadow-sm">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic mb-6">Clinical Focus</h3>
                  <p className="text-2xl font-black text-indigo-600 italic uppercase leading-none mb-6 tracking-tighter">{currentData.niche}</p>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Diagnostic Logic</p>
                     <p className="text-sm font-bold text-slate-600 italic leading-relaxed">{currentData.logic || currentData.biology || currentData.action}</p>
                  </div>
               </div>
               <div className="bg-slate-900 p-10 rounded-3xl text-white">
                  <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-8 italic">Diagnostic Matrix</h4>
                  <div className="space-y-4">
                    {activeTab === 'kanavel' && currentData.signs.map((s: any, i: number) => (
                      <div key={i} className="flex gap-4 p-3 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-[10px] font-black shrink-0">{i+1}</div>
                        <div>
                           <h5 className="text-[10px] font-black text-indigo-400 uppercase mb-0.5">{s.name}</h5>
                           <p className="text-[10px] text-slate-300 font-medium italic">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                    {activeTab === 'wagner' && currentData.stages.map((s: any, i: number) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="font-black text-[11px] text-white italic">{s.s}</span>
                        <span className="text-[10px] text-slate-400 font-medium text-right max-w-[160px] italic">{s.d}</span>
                      </div>
                    ))}
                    {activeTab === 'lrinec' && currentData.criteria.map((c: any, i: number) => (
                      <div key={i} className="flex justify-between items-center p-2.5 bg-white/5 border border-white/10 rounded-xl">
                        <span className="font-black text-[10px] text-slate-200 uppercase">{c.name}</span>
                        <span className="text-[10px] text-indigo-400 font-bold uppercase italic">{c.detail}</span>
                      </div>
                    ))}
                    {activeTab === 'atypical' && (
                      <div className="space-y-4">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                           <h5 className="text-[10px] font-black text-indigo-400 uppercase mb-2">Syphilis Marker</h5>
                           <p className="text-[10px] text-slate-300 leading-relaxed italic">{currentData.syphilis}</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                           <h5 className="text-[10px] font-black text-indigo-400 uppercase mb-2">Brucellosis Marker</h5>
                           <p className="text-[10px] text-slate-300 leading-relaxed italic">{currentData.brucellosis}</p>
                        </div>
                      </div>
                    )}
                    {(!['kanavel', 'wagner', 'lrinec', 'atypical'].includes(activeTab)) && (currentData.steps || currentData.stages || currentData.types || []).map((t: any, i: number) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-[9px] font-black shrink-0">{i+1}</div>
                        <p className="text-xs text-slate-300 font-bold italic leading-relaxed">
                          {typeof t === 'string' ? t : (t.name || t.desc || "Active data stream")}
                        </p>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
               <div className="flex-1">
                  <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-2 block">Primary Condition Marker</span>
                  <h4 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter leading-tight">{currentData.clinical || currentData.title}</h4>
               </div>
               <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                  <Target size={28} />
               </div>
            </div>
          </div>
        )}

        {/* Microbiology */}
        {activeTab === 'micro' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(COMPREHENSIVE_DATA.micro).map(([key, val], i) => (
              <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all">
                <h5 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-4 italic">{key.replace(/_/g, ' ')}</h5>
                <p className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">{val as string}</p>
              </div>
            ))}
          </div>
        )}

        {/* Surgical Tx */}
        {activeTab === 'tx' && (
           <div className="grid md:grid-cols-2 gap-6">
             {COMPREHENSIVE_DATA.tx.principles.map((p, i) => (
               <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm flex gap-6 items-start hover:border-indigo-200 transition-colors">
                 <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-black shrink-0">0{i+1}</div>
                 <p className="text-lg font-black text-slate-800 italic uppercase tracking-tighter leading-tight">{p}</p>
               </div>
             ))}
           </div>
        )}
      </div>
    );
  };

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
              <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-indigo-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-100">
                <Microscope className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800 uppercase tracking-tight">OM Master</h1>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Bone Infection Specialist</p>
              </div>
            </div>
          </div>
          
          <nav className="flex bg-slate-100 p-1 rounded-xl overflow-x-auto no-scrollbar">
            {[
              { id: 'overview', label: 'Overview', icon: BookOpen },
              { id: 'diagnosis', label: 'Diagnosis', icon: Search },
              { id: 'management', label: 'Management', icon: Scissors },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSubTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap uppercase tracking-wider ${
                    subTab === tab.id 
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

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-4 md:p-6">
        {/* Left Sidebar for specialized content */}
        <aside className="w-full lg:w-72 shrink-0 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Learning Modules</h3>
               <div className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{progress}%</div>
            </div>
            
            <div className="space-y-6 max-h-[calc(100vh-320px)] overflow-y-auto no-scrollbar pr-1">
              {(Object.entries(groupedMenu) as [string, (typeof MENU_GROUPS[0])[]][]).map(([groupName, items]) => (
                <div key={groupName} className="space-y-2">
                  <h4 className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] px-3">{groupName}</h4>
                  <div className="space-y-1">
                    {items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      const isCompleted = completedSections.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setSubTab('overview');
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all group ${
                            isActive 
                            ? 'bg-slate-900 text-white shadow-xl' 
                            : 'hover:bg-slate-50 text-slate-600 border border-transparent hover:border-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-xl ${isActive ? 'bg-indigo-600' : 'bg-slate-100 group-hover:bg-indigo-50'} transition-colors`}>
                              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'}`} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-tight">{item.label}</span>
                          </div>
                          {isCompleted && <CheckCircle2 size={12} className={isActive ? 'text-indigo-300' : 'text-emerald-500'} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 rounded-3xl text-white shadow-lg overflow-hidden relative group">
            <div className="relative z-10 text-left">
              <h4 className="text-xs font-black uppercase tracking-widest mb-2 opacity-80 italic">Surgical Invariant</h4>
              <p className="text-[11px] font-medium leading-relaxed italic">
                {activeTab === 'kanavel' ? '"Never let the sun set on undrained pus in the hand."' : (currentData.pearl || "Adequate debridement is more important than the duration of antibiotics.")}
              </p>
            </div>
            <Zap className="absolute bottom-[-10px] right-[-10px] text-white/10 w-24 h-24 rotate-12 transition-transform group-hover:scale-110" />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="space-y-6">
            {/* Topic Hero Card */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 md:p-10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                  {React.createElement(MENU_GROUPS.find(m => m.id === activeTab)?.icon || Layers, { size: 220 })}
               </div>
               
               <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                  <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-slate-200 rotate-3 shrink-0">
                    {React.createElement(MENU_GROUPS.find(m => m.id === activeTab)?.icon || Layers, { size: 32 })}
                  </div>
                  <div>
                    <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                       <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest border border-indigo-100">
                          {MENU_GROUPS.find(m => m.id === activeTab)?.group}
                       </span>
                       <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Protocol Stream Alpha_01</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">
                      {MENU_GROUPS.find(m => m.id === activeTab)?.label}
                    </h2>
                  </div>
               </div>
            </div>

            {/* Dynamic Content */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {renderContent()}
            </div>

            {/* Navigation Action Buttons */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
               <div className="flex gap-3">
                  <button 
                    onClick={handlePrev}
                    disabled={activeTab === MENU_GROUPS[0].id}
                    className="p-3 bg-slate-50 border border-slate-200 text-slate-600 rounded-2xl hover:bg-white hover:border-indigo-200 transition-all active:scale-95 disabled:opacity-30"
                  >
                    <ArrowLeft size={18} />
                  </button>

                  <button 
                    onClick={handleNext}
                    disabled={activeTab === MENU_GROUPS[MENU_GROUPS.length - 1].id}
                    className="p-3 bg-slate-50 border border-slate-200 text-slate-600 rounded-2xl hover:bg-white hover:border-indigo-200 transition-all active:scale-95 disabled:opacity-30"
                  >
                    <ArrowRight size={18} />
                  </button>
               </div>
               
               <button
                 onClick={handleComplete}
                 className="flex items-center gap-4 px-10 py-4 bg-indigo-600 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-indigo-700 hover:scale-105 transition-all shadow-xl shadow-indigo-100 group active:scale-95"
               >
                 {completedSections.includes(activeTab) ? "Continue Protocol" : "Mark as Complete"}
                 <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
               </button>
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default OsteomyelitisHub;
