import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { 
  Microscope, 
  Target, 
  Search, 
  Info, 
  Zap, 
  ShieldAlert, 
  Layers, 
  ChevronRight, 
  Stethoscope,
  ClipboardList,
  Wind,
  UserCheck,
  Crosshair,
  RotateCcw,
  FlaskConical,
  AlertTriangle,
  Thermometer,
  Scissors,
  Database,
  Activity
} from 'lucide-react';

const OM_DATA = {
  pathophysiology: {
    title: "The Pathological Cycle",
    steps: [
      { name: "Infection", desc: "Bacteria colonize the Haversian canals." },
      { name: "Ischemia", desc: "Inflammation leads to increased intraosseous pressure, compressing local vessels." },
      { name: "Sequestrum", desc: "A segment of dead, avascular bone isolated by pus." },
      { name: "Involucrum", desc: "New reactive bone formation surrounding the necrotic sequestrum." }
    ],
    pearl: "Antibiotics cannot penetrate the avascular sequestrum. Surgery is mandatory for cure."
  },
  staging: {
    title: "Cierny-Mader Staging",
    anatomical: [
      { stage: "Medullary", desc: "Infection confined to the medullary canal." },
      { stage: "Superficial", desc: "Infection of the bone surface (post-fracture)." },
      { stage: "Localized", desc: "Cortical or medullary, but stable structure." },
      { stage: "Diffuse", desc: "Unstable bone segment with loss of structural integrity." }
    ],
    physiological: ["A (Healthy)", "B (Compromised local/systemic)", "C (Treatment worse than disease)"]
  },
  microbiology: {
    common: "Staphylococcus aureus",
    neonates: "Group B Streptococcus",
    sickle_cell: "Salmonella",
    puncture_wound: "Pseudomonas aeruginosa"
  }
};

const INFECTION_DATA = {
  aho: {
    title: "Acute Hematogenous Osteomyelitis (AHO)",
    niche: "Paediatric Metaphysis",
    pathology: "Bacteria settle in the 'hairpin loops' of metaphyseal vessels where blood flow is sluggish.",
    clinical: "Fever, localized bone pain, and 'pseudoparalysis' (child refuses to move the limb).",
    imaging: "X-rays are negative for 7-10 days. MRI/Ultrasound is required for early diagnosis.",
    pearl: "If the infection crosses the physis, it is usually because the joint capsule is intra-articular (e.g., Hip, Shoulder)."
  },
  septic: {
    title: "Septic Arthritis",
    niche: "Surgical Emergency",
    kocher: [
      "Non-weight bearing on affected side",
      "ESR > 40 mm/hr",
      "WBC > 12,000 /uL",
      "Fever > 38.5°C"
    ],
    logic: "4/4 criteria = 99% probability of Septic Arthritis.",
    action: "Urgent surgical washout. Enzymatic joint destruction happens in hours, not days."
  },
  pji: {
    title: "Prosthetic Joint Infection (PJI)",
    niche: "Biofilm Fortress",
    classification: [
      { type: "Early", timing: "< 4 weeks", mode: "DAIR (Debridement & Liner Change)" },
      { type: "Delayed", timing: "3 - 24 months", mode: "Two-Stage Exchange" },
      { type: "Late", timing: "> 24 months", mode: "Hematogenous spread; 2-Stage preferred" }
    ],
    pearl: "The Biofilm makes bacteria 1000x more resistant to antibiotics than planktonic cells."
  },
  potts: {
    title: "Spinal Tuberculosis (Pott's Disease)",
    niche: "Granulomatous Infection",
    features: "Paradiscal destruction (disc + adjacent endplates). Leads to 'Gibbus' deformity (sharp kyphosis).",
    abscess: "Psoas Abscess: Fluid tracks down the psoas sheath to the groin.",
    pearl: "Unlike pyogenic infection, TB spares the disc initially but eventually causes collapse and neuro-deficit."
  }
};

const ADV_INFECTION_DATA = {
  biofilm: {
    title: "Biofilm Dynamics",
    niche: "The Molecular Shield",
    stages: [
      { id: 1, name: "Reversible Attachment", desc: "Planktonic bacteria adhere to the implant surface (Van der Waals forces)." },
      { id: 2, name: "Irreversible Adhesion", desc: "Production of Extra-cellular Polymeric Substance (EPS)." },
      { id: 3, name: "Quorum Sensing", desc: "Bacteria communicate via chemical signals to coordinate gene expression." },
      { id: 4, name: "Maturation & Dispersal", desc: "The biofilm sheds 'seeds' to colonize other parts of the bone." }
    ],
    pearl: "Once Quorum Sensing occurs, the colony behaves as a single multicellular organism with altered metabolism."
  },
  masquelet: {
    title: "Masquelet Technique",
    niche: "Induced Membrane Reconstruction",
    step1: "Stage 1: Debridement & Spacer. Insert antibiotic-loaded cement spacer to induce a bioactive membrane.",
    step2: "Stage 2 (6-8 weeks): Remove spacer, preserve the membrane, and fill the void with morcellized bone graft.",
    biology: "The membrane is rich in VEGF, BMP-2, and TGF-beta, providing a vascular 'nest' for the graft.",
    pearl: "The induced membrane prevents the graft from being resorbed and protects it from residual bacteria."
  },
  carriers: {
    title: "Local Antibiotic Delivery",
    niche: "High-Dose Local Pharmacy",
    types: [
      { name: "PMMA Beads", type: "Non-absorbable", pro: "Proven gold standard; high elution.", con: "Requires a second surgery to remove." },
      { name: "Calcium Sulfate", type: "Bio-absorbable", pro: "No second surgery; fills small voids.", con: "Can cause serous drainage ('leakage')." },
      { name: "Collagen Sponges", type: "Bio-absorbable", pro: "Rapid elution for soft tissue.", con: "Short-lived antibiotic peak." }
    ],
    pearl: "Local levels can be 100x higher than systemic MIC without causing nephrotoxicity."
  },
  imaging: {
    title: "Nuclear Medicine Hierarchy",
    niche: "When MRI Fails",
    tests: [
      { name: "Bone Scan", use: "High sensitivity, low specificity (cannot distinguish trauma vs infection)." },
      { name: "WBC Scan", use: "Gold standard for PJI or infection in the presence of metal implants." },
      { name: "PET-CT (FDG)", use: "Emerging as highly accurate for chronic osteomyelitis in the axial skeleton." }
    ],
    pearl: "A 'Cold' bone scan effectively rules out infection with 95% certainty."
  },
  brodies: {
    title: "Brodie's Abscess",
    niche: "Sub-acute Osteomyelitis",
    features: "A localized, chronic form of infection that hasn't progressed to systemic sepsis.",
    imaging: "Well-defined radiolucency with a thick sclerotic rim (usually distal/proximal Tibia).",
    pathology: "A 'locked' infection where host defenses have successfully walled off the pathogen.",
    pearl: "Classic Mimic: Often confused with Osteoid Osteoma or a Bone Cyst."
  }
};

const SECTIONS = [
  { id: 'patho', label: 'Pathology Cycle', icon: Layers, group: 'OM BASICS' },
  { id: 'staging', label: 'Cierny-Mader Staging', icon: ClipboardList, group: 'OM BASICS' },
  { id: 'micro', label: 'Microbiology', icon: Target, group: 'OM BASICS' },
  { id: 'tx', label: 'Surgical Logic', icon: Stethoscope, group: 'OM BASICS' },
  { id: 'aho', label: 'Acute Paediatric', icon: UserCheck, group: 'COMPLEX HUB' },
  { id: 'septic', label: 'Septic Arthritis', icon: Crosshair, group: 'COMPLEX HUB' },
  { id: 'pji', label: 'Prosthetic (PJI)', icon: RotateCcw, group: 'COMPLEX HUB' },
  { id: 'potts', label: "Pott's (Spinal TB)", icon: Layers, group: 'COMPLEX HUB' },
  { id: 'biofilm', label: 'Biofilm Biology', icon: Microscope, group: 'ADVANCED INFECTION HUB' },
  { id: 'masquelet', label: 'Masquelet Tech', icon: Scissors, group: 'ADVANCED INFECTION HUB' },
  { id: 'carriers', label: 'Antibiotic Carriers', icon: FlaskConical, group: 'ADVANCED INFECTION HUB' },
  { id: 'imaging', label: 'Nuclear Imaging', icon: Search, group: 'ADVANCED INFECTION HUB' },
  { id: 'brodies', label: "Brodie's Abscess", icon: Search, group: 'ADVANCED INFECTION HUB' }
];

const BasicScienceStudyMode = () => {
  const [activeTab, setActiveTab] = useState('patho');

  const groupedSections = SECTIONS.reduce((acc, section) => {
    if (!acc[section.group]) acc[section.group] = [];
    acc[section.group].push(section);
    return acc;
  }, {} as Record<string, typeof SECTIONS>);

  const isComplex = ['aho', 'septic', 'pji', 'potts'].includes(activeTab);
  const isAdvanced = ['biofilm', 'masquelet', 'carriers', 'imaging', 'brodies'].includes(activeTab);

  const activeSection = SECTIONS.find(s => s.id === activeTab);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] bg-slate-50 font-sans text-slate-900 overflow-hidden rounded-[2rem] border border-slate-200">
      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex bg-slate-950 p-2 overflow-x-auto no-scrollbar gap-2 shrink-0">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeTab === section.id ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
          >
            <section.icon size={12} />
            {section.label}
          </button>
        ))}
      </div>

      {/* Sidebar (Desktop) */}
      <aside className="w-72 bg-slate-950 text-white hidden lg:flex flex-col h-full sticky top-0 shadow-2xl shrink-0">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-emerald-600 rounded-xl shadow-lg shadow-emerald-900/40">
              <Microscope size={20} />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase italic">OM-Master</span>
          </div>
          
          <nav className="flex-1 space-y-6 overflow-y-auto no-scrollbar pb-12 pr-2">
            {Object.entries(groupedSections).map(([group, items]) => (
              <div key={group} className="space-y-1.5">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] px-4 mb-3 opacity-60">{group}</p>
                <div className="space-y-1">
                  {items.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveTab(section.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-[10px] font-bold transition-all ${activeTab === section.id ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-900/40 translate-x-1' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                      <div className="flex items-center gap-3">
                        <section.icon size={15} className={activeTab === section.id ? 'text-white' : 'text-slate-500'} />
                        {section.label}
                      </div>
                      <ChevronRight size={12} className={activeTab === section.id ? 'opacity-100' : 'opacity-0'} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <FlaskConical size={14} className="text-emerald-400" />
              <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Diagnostic Rule</span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium leading-tight italic">
              "Always aspirate before antibiotics to ensure culture accuracy."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto no-scrollbar bg-slate-50">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
          <div>
            <h2 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">Surgical Biology</h2>
            <h1 className="text-lg font-black text-slate-800 uppercase tracking-tighter">Infection Hub Master</h1>
          </div>
            <div className={`px-3 py-1 ${isAdvanced ? 'bg-purple-50 text-purple-700 border-purple-100' : isComplex ? 'bg-red-50 text-red-700 border-red-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'} rounded-full border flex items-center gap-2`}>
                {isAdvanced ? <Search size={12} /> : isComplex ? <Thermometer size={12} /> : <Activity size={12} />}
                <span className="text-[9px] font-black uppercase tracking-widest italic">
                  {isAdvanced ? 'Advanced Hub' : isComplex ? 'Acute Protocol' : 'Core Basics'}
                </span>
             </div>
        </header>

        <div className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {/* ADVANCED BIOLOGY TOPICS */}
            {isAdvanced ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6"
              >
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                      <div className="p-6 bg-purple-50 text-purple-600 rounded-3xl shadow-inner transition-all group-hover:rotate-6">
                         {activeTab === 'masquelet' ? <Scissors size={32} /> : <Microscope size={32} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-purple-600 font-black text-[10px] uppercase tracking-widest">{(ADV_INFECTION_DATA as any)[activeTab].niche}</span>
                           <div className="w-1 h-1 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Surgical Science</span>
                         </div>
                         <h3 className="text-2xl font-black text-slate-800 tracking-tighter mb-2 italic">{(ADV_INFECTION_DATA as any)[activeTab].title}</h3>
                         <p className="text-sm text-slate-500 font-medium leading-relaxed italic">"{(ADV_INFECTION_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Wind className="absolute bottom-[-40px] right-[-40px] text-slate-50 opacity-40 rotate-12" size={240} />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                   <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                      <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-purple-400 italic">
                         <Zap size={18} /> Process Logic
                      </h4>
                      <div className="space-y-3 relative z-10">
                         {activeTab === 'biofilm' && ADV_INFECTION_DATA.biofilm.stages.map((s) => (
                           <div key={s.id} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all">
                              <div className="w-6 h-6 rounded-lg bg-purple-600 flex items-center justify-center text-white font-black text-[10px] shrink-0">{s.id}</div>
                              <div>
                                 <h5 className="text-[9px] font-black text-purple-300 uppercase mb-1">{s.name}</h5>
                                 <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">{s.desc}</p>
                              </div>
                           </div>
                         ))}
                         {activeTab === 'masquelet' && (
                           <div className="space-y-3">
                              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                 <h5 className="text-[9px] font-black text-purple-400 uppercase mb-2">Stage 1</h5>
                                 <p className="text-[10px] leading-relaxed text-slate-300 italic">{ADV_INFECTION_DATA.masquelet.step1}</p>
                              </div>
                              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                 <h5 className="text-[9px] font-black text-purple-400 uppercase mb-2">Stage 2</h5>
                                 <p className="text-[10px] leading-relaxed text-slate-300 italic">{ADV_INFECTION_DATA.masquelet.step2}</p>
                              </div>
                           </div>
                         )}
                         {activeTab === 'carriers' && ADV_INFECTION_DATA.carriers.types.map((t, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                              <div className="flex justify-between items-center mb-2">
                                 <h5 className="text-[10px] font-black text-white uppercase italic">{t.name}</h5>
                                 <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest">{t.type}</span>
                              </div>
                              <p className="text-[10px] text-slate-400 leading-relaxed italic"><span className="text-emerald-400 font-bold">Pro:</span> {t.pro}</p>
                              <p className="text-[10px] text-slate-400 leading-relaxed mt-1 italic"><span className="text-red-400 font-bold">Con:</span> {t.con}</p>
                           </div>
                         ))}
                         {activeTab === 'imaging' && (
                           <div className="space-y-3">
                              {ADV_INFECTION_DATA.imaging.tests.map((t, i) => (
                                <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                   <h5 className="text-[10px] font-black text-purple-400 uppercase mb-1 italic">{t.name}</h5>
                                   <p className="text-[10px] text-slate-400 leading-relaxed italic font-medium">{t.use}</p>
                                </div>
                              ))}
                           </div>
                         )}
                         {activeTab === 'brodies' && (
                           <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                              <p className="text-[10px] text-slate-300 leading-relaxed italic"><span className="text-purple-400 font-black uppercase block text-[9px] mb-1">Features</span> {ADV_INFECTION_DATA.brodies.features}</p>
                              <p className="text-[10px] text-slate-300 leading-relaxed italic"><span className="text-purple-400 font-black uppercase block text-[9px] mb-1">Radiology</span> {ADV_INFECTION_DATA.brodies.imaging}</p>
                              <p className="text-[10px] text-slate-300 leading-relaxed italic"><span className="text-purple-400 font-black uppercase block text-[9px] mb-1">Pathology</span> {ADV_INFECTION_DATA.brodies.pathology}</p>
                           </div>
                         )}
                      </div>
                   </div>

                   <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
                      <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                         <Stethoscope size={18} className="text-purple-600" /> Advanced Diagnostic Note
                      </h4>
                      <div className="flex-1 space-y-4">
                         <div className="p-5 bg-purple-50 border border-purple-100 rounded-2xl">
                            <p className="text-xs text-purple-900 font-bold leading-relaxed italic">
                              {activeTab === 'masquelet' ? ADV_INFECTION_DATA.masquelet.biology : 
                               activeTab === 'biofilm' ? "The physiological state of the cell changes from metabolic 'active' to 'dormant' in the biofilm, rendering antibiotics like penicillins ineffective." :
                               "The choice of carrier/test depends on whether you are managing the soft tissue, the structural bone, or the patient's comorbidities."}
                            </p>
                         </div>
                         <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100">
                            <h5 className="text-[9px] font-black text-amber-600 uppercase mb-2 tracking-widest">Critical Strategy</h5>
                            <p className="text-[11px] font-bold text-amber-950 leading-relaxed italic">
                               {activeTab === 'biofilm' ? "Biofilm removal requires MECHANICAL disruption (scrubbing/reaming); antibiotics alone will never sterilize a surface." :
                                activeTab === 'imaging' ? "Triple phase scans are negative? You can almost certainly rule out infection." :
                                activeTab === 'masquelet' ? "Always ensure an anabolic state (Nutrition/Smoking cessation) before Stage 2." :
                                "Surgical debridement is required if the abscess fails to respond to antibiotics or structural stability is needed."}
                            </p>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="bg-purple-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                      <div className="md:w-2/3">
                         <h4 className="text-xl font-black mb-3 flex items-center gap-3 italic">
                           <AlertTriangle size={20} className="text-purple-400" /> The Quorum Sensing Danger
                         </h4>
                         <p className="text-xs text-slate-300 leading-relaxed italic">
                            "When bacteria reach a critical density on a prosthesis, they coordinate. This isn't just an infection; it's a structural failure of the material-host interface. If Quorum Sensing has occurred, DAIR (Debridement) is likely to fail."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                         <div className="px-6 py-3 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest group-hover:bg-white/20 transition-colors">
                            Mechanical Debridement &gt; Antibiotics
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isComplex ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Hero Summary */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                      <div className="p-6 bg-red-50 text-red-600 rounded-3xl shadow-inner transition-transform group-hover:scale-105">
                         <Microscope size={32} />
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-red-600 font-black text-[10px] uppercase tracking-widest">{(INFECTION_DATA as any)[activeTab].niche}</span>
                           <div className="w-1 h-1 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic tracking-tight">Active Module</span>
                         </div>
                         <h3 className="text-2xl font-black text-slate-800 tracking-tighter mb-2 italic">{(INFECTION_DATA as any)[activeTab].title}</h3>
                         <p className="text-sm text-slate-500 font-medium leading-relaxed italic">"{(INFECTION_DATA as any)[activeTab].pearl || (INFECTION_DATA as any)[activeTab].logic || (INFECTION_DATA as any)[activeTab].clinical}"</p>
                      </div>
                   </div>
                   <ShieldAlert className="absolute bottom-[-40px] right-[-40px] text-slate-50 opacity-40" size={240} />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                   {/* Diagnostic Matrix Column */}
                   <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                      <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-red-400 italic">
                         <ClipboardList size={18} /> {activeTab === 'septic' ? "Kocher Criteria" : "Pathogenesis & Features"}
                      </h4>
                      <div className="space-y-3 relative z-10">
                        {activeTab === 'septic' ? (
                          (INFECTION_DATA.septic.kocher).map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-3.5 bg-white/5 border border-white/10 rounded-2xl">
                               <div className="w-6 h-6 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-[10px]">{i + 1}</div>
                               <p className="text-[11px] font-bold italic">{item}</p>
                            </div>
                          ))
                        ) : activeTab === 'pji' ? (
                          (INFECTION_DATA.pji.classification).map((item, i) => (
                            <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                               <h5 className="text-[9px] font-black text-red-400 uppercase mb-1">{item.type} ({item.timing})</h5>
                               <p className="text-[11px] font-bold text-white italic">{item.mode}</p>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                             <p className="text-xs text-slate-400 leading-relaxed font-medium italic">
                                {(INFECTION_DATA as any)[activeTab].pathology || (INFECTION_DATA as any)[activeTab].features}
                             </p>
                          </div>
                        )}
                        {activeTab === 'potts' && (
                           <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                              <h5 className="text-[9px] font-black text-red-400 uppercase mb-1">Abscess Trajectory</h5>
                              <p className="text-[11px] font-bold text-white italic">{INFECTION_DATA.potts.abscess}</p>
                           </div>
                        )}
                      </div>
                   </div>

                   {/* Management Column */}
                   <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
                      <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                         <Zap size={18} className="text-amber-500" /> Clinical Management
                      </h4>
                      <div className="flex-1 space-y-4">
                         <div className="p-5 bg-amber-50 border border-amber-100 rounded-2xl">
                            <p className="text-xs text-amber-900 font-bold leading-relaxed italic">
                              "{(INFECTION_DATA as any)[activeTab].pearl || "Referral for multi-disciplinary management is mandatory."}"
                            </p>
                         </div>
                         <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                            <h5 className="text-[9px] font-black text-slate-400 uppercase mb-2 tracking-widest">Management Directive</h5>
                            <p className="text-[11px] font-bold text-slate-700 leading-relaxed italic">
                              {activeTab === 'septic' ? "Emergency arthrotomy and joint irrigation." : 
                               activeTab === 'aho' ? "IV Antibiotics for 4-6 weeks; surgical drainage if abscess present." : 
                               activeTab === 'pji' ? "Strict biofilm management protocol (2-stage exchange vs DAIR)." :
                               "Prolonged anti-TB chemotherapy + structural stabilization if kyphosis > 40°."}
                            </p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Mimic Trap Area */}
                <div className="bg-red-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                      <div className="md:w-2/3">
                         <h4 className="text-xl font-black mb-3 flex items-center gap-3 italic">
                           <AlertTriangle size={20} className="text-red-400" /> The Infection Mimic Trap
                         </h4>
                         <p className="text-xs text-slate-300 leading-relaxed italic">
                            "In a child with fever and metaphyseal pain, Ewing Sarcoma is the great mimic. If the 'pus' from an aspiration is thin or has unusual cells, you MUST send a sample for pathology, not just microbiology."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                         <div className="px-6 py-3 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest group-hover:bg-white/20 transition-colors">
                            Pathology {' > '} Culture
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : (
              // OM BASICS TOPICS (Previous content)
              <>
                {/* TAB: Pathology */}
                {activeTab === 'patho' && (
                  <motion.div 
                    key="patho"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                     <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
                        <h3 className="text-2xl font-black text-slate-800 tracking-tighter mb-6 italic uppercase">{OM_DATA.pathophysiology.title}</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                           {OM_DATA.pathophysiology.steps.map((step, i) => (
                             <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
                                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-[10px] shrink-0">{i + 1}</div>
                                <div>
                                  <h5 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{step.name}</h5>
                                  <p className="text-xs font-bold text-slate-800 italic">{step.desc}</p>
                                </div>
                             </div>
                           ))}
                        </div>
                        <div className="mt-6 p-5 bg-slate-900 rounded-2xl text-white italic text-xs font-medium border border-white/10">
                           {OM_DATA.pathophysiology.pearl}
                        </div>
                     </div>
                  </motion.div>
                )}
                
                {/* ... existing staging, micro, tx rendering ... */}
                {activeTab === 'staging' && (
                   <motion.div 
                    key="staging"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                         <h3 className="text-xl font-black text-slate-800 mb-6 tracking-tighter uppercase italic">Cierny-Mader Staging</h3>
                         <div className="grid lg:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <p className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-[0.2em]">Anatomical Staging</p>
                              {OM_DATA.staging.anatomical.map((s, i) => (
                                 <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl items-center border border-slate-100">
                                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-black text-[9px] shrink-0">{i+1}</div>
                                    <div className="text-[11px] font-bold text-slate-700 italic">{s.desc}</div>
                                 </div>
                              ))}
                            </div>
                            <div className="bg-slate-900 text-white p-6 rounded-3xl border border-white/5">
                               <p className="text-[10px] font-black uppercase text-slate-500 mb-6 tracking-[0.2em]">Physiological Status</p>
                               <div className="space-y-4">
                                 {OM_DATA.staging.physiological.map((p, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                       <div className="text-emerald-400 font-black text-sm italic">{p.split(' ')[0]}</div>
                                       <p className="text-xs font-medium text-slate-300 italic">{p.split('(')[1]?.replace(')', '') || p}</p>
                                    </div>
                                 ))}
                               </div>
                            </div>
                         </div>
                      </div>
                   </motion.div>
                )}

                {activeTab === 'micro' && (
                   <motion.div 
                    key="micro"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid md:grid-cols-2 gap-4"
                  >
                     {Object.entries(OM_DATA.microbiology).map(([key, val], i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:border-emerald-200 transition-colors">
                           <h5 className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-2">{key.replace('_', ' ')}</h5>
                           <p className="text-lg font-black text-slate-800 italic uppercase tracking-tighter">{val}</p>
                        </div>
                     ))}
                   </motion.div>
                )}

                 {activeTab === 'tx' && (
                   <motion.div 
                    key="tx"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-emerald-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group"
                  >
                      <h3 className="text-2xl font-black mb-6 flex items-center gap-3 relative z-10 italic uppercase tracking-tighter">
                        <ShieldAlert className="text-emerald-400" /> Surgical Eradication
                      </h3>
                      <div className="space-y-6 relative z-10">
                         <div className="grid md:grid-cols-3 gap-4">
                           {[
                             { title: "Debridement", desc: "Removal of all dead, necrotic, and infected bone (Saucerization)." },
                             { title: "Dead Space", desc: "Filling the defect with antibiotic-impregnated cement or local flaps." },
                             { title: "Stabilization", desc: "Stabilizing the bone segment if structural integrity is compromised." }
                           ].map((t, i) => (
                             <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                                <h5 className="font-black text-[10px] uppercase tracking-widest text-emerald-400 mb-2">{t.title}</h5>
                                <p className="text-[11px] text-slate-300 font-medium leading-relaxed italic">{t.desc}</p>
                             </div>
                           ))}
                         </div>
                      </div>
                      <Wind className="absolute bottom-[-40px] right-[-40px] text-white/5 pointer-events-none group-hover:scale-110 transition-transform duration-1000" size={240}/>
                   </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <footer className="mt-auto px-10 py-5 flex flex-wrap justify-center gap-8 text-[9px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/80">
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-emerald-600"></div> OM Basics</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-red-600"></div> Complex Hub</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-purple-600"></div> Advanced Biology</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-slate-900"></div> Surgical Eradication</div>
        </footer>
      </main>
    </div>
  );
};

export default BasicScienceStudyMode;
