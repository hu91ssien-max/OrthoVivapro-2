import React, { useState, useMemo } from 'react';
import { 
  Microscope, 
  Target, 
  ChevronRight, 
  ShieldAlert, 
  Layers, 
  Stethoscope,
  ClipboardList,
  Wind,
  ArrowLeft,
  UserCheck,
  Crosshair,
  RotateCcw,
  FlaskConical,
  Zap,
  AlertTriangle,
  Thermometer,
  Binary,
  Scissors,
  Search,
  Database
} from 'lucide-react';

const COMPREHENSIVE_DATA = {
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
  },
  microbiology: {
    common: "Staphylococcus aureus",
    neonates: "Group B Streptococcus",
    sickle_cell: "Salmonella",
    puncture_wound: "Pseudomonas aeruginosa"
  },
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
      { name: "Triple-Phase Bone Scan", use: "High sensitivity, low specificity (cannot distinguish trauma vs infection)." },
      { name: "Labeled WBC Scan", use: "Gold standard for PJI or infection in the presence of metal implants." },
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

interface OsteomyelitisHubProps {
  onBack: () => void;
}
const OsteomyelitisHub = ({ onBack }: OsteomyelitisHubProps) => {
  const [activeTab, setActiveTab] = useState('patho');

  const currentData = useMemo(() => (COMPREHENSIVE_DATA as any)[activeTab], [activeTab]);

  return (
    <div className="flex min-h-screen bg-[#0a0c10] font-sans text-slate-200 overflow-hidden rounded-[2.5rem] border border-slate-800 shadow-2xl relative">
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient(from_50%_50%_at_50%_50%,rgba(16,185,129,0.05)_0%,transparent_100%) pointer-events-none" />

      {/* Modern Surgical Sidebar */}
      <aside className="w-80 bg-slate-950/80 backdrop-blur-xl border-r border-slate-800 hidden lg:flex flex-col h-full z-20 relative">
        <div className="p-8">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 text-slate-500 hover:text-emerald-400 transition-all mb-10 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all">
              <ArrowLeft size={12} />
            </div>
            Back to Registry
          </button>

          <div className="flex items-center gap-4 mb-12">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-xl animate-pulse" />
              <div className="relative p-3 bg-slate-900 border border-emerald-500/30 rounded-2xl">
                <Microscope size={28} className="text-emerald-400" />
              </div>
            </div>
            <div>
              <span className="block text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Advanced Orthopaedics</span>
              <span className="text-xl font-black tracking-tighter uppercase italic text-white">OM-Master</span>
            </div>
          </div>
          
          <nav className="flex-1 space-y-6 overflow-y-auto no-scrollbar pr-2">
            <div>
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] px-4 mb-4">Diagnostic Framework</p>
              <div className="space-y-1.5">
                {[
                  { id: 'patho', label: 'Pathology Cycle', icon: Layers },
                  { id: 'staging', label: 'Cierny-Mader', icon: ClipboardList },
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-[11px] font-black transition-all border ${activeTab === section.id ? 'bg-emerald-600/10 border-emerald-500/50 text-white shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
                  >
                    <div className="flex items-center gap-3 uppercase tracking-wider">
                      <section.icon size={16} className={activeTab === section.id ? 'text-emerald-400' : ''} />
                      {section.label}
                    </div>
                    <div className={`w-1.5 h-1.5 rounded-full ${activeTab === section.id ? 'bg-emerald-400 animate-pulse' : 'bg-transparent'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] px-4 mb-4">Surgical Modules</p>
              <div className="space-y-1.5">
                {[
                  { id: 'aho', label: 'Acute Paediatric', icon: UserCheck },
                  { id: 'septic', label: 'Septic Arthritis', icon: Crosshair },
                  { id: 'pji', label: 'Prosthetic (PJI)', icon: RotateCcw },
                  { id: 'potts', label: "Pott's Spine", icon: Layers },
                  { id: 'micro', label: "Microbiology", icon: Target },
                  { id: 'tx', label: "Surgical Logic", icon: Stethoscope }
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-[11px] font-black transition-all border ${activeTab === section.id ? 'bg-emerald-600/10 border-emerald-500/50 text-white shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
                  >
                    <div className="flex items-center gap-3 uppercase tracking-wider">
                      <section.icon size={16} className={activeTab === section.id ? 'text-emerald-400' : ''} />
                      {section.label}
                    </div>
                    {activeTab === section.id && <ChevronRight size={14} className="text-emerald-400" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] px-4 mb-4 text-purple-400">Biological Science</p>
              <div className="space-y-1.5">
                {[
                  { id: 'biofilm', label: 'Biofilm Biology', icon: Microscope },
                  { id: 'masquelet', label: 'Masquelet Tech', icon: Scissors },
                  { id: 'carriers', label: 'Antibiotic Carriers', icon: FlaskConical },
                  { id: 'imaging', label: 'Nuclear Imaging', icon: Search },
                  { id: 'brodies', label: "Brodie's Abscess", icon: Database }
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-[11px] font-black transition-all border ${activeTab === section.id ? 'bg-purple-600/10 border-purple-500/50 text-white shadow-[0_0_20px_rgba(147,51,234,0.1)]' : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
                  >
                    <div className="flex items-center gap-3 uppercase tracking-wider">
                      <section.icon size={16} className={activeTab === section.id ? 'text-purple-400' : ''} />
                      {section.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
        
        <div className="p-6 border-t border-slate-900 bg-black/40">
          <div className="p-5 bg-slate-900/50 rounded-2xl border border-slate-800 group hover:border-emerald-500/30 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <FlaskConical size={14} className="text-emerald-400" />
              <span className="text-[9px] font-bold uppercase text-slate-500 tracking-widest italic">Apley Surgical Directive</span>
            </div>
            <p className="text-[11px] text-slate-300 font-bold leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
              "Antibiotics suppress, but only surgery cures the sequestration."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto no-scrollbar relative z-10">
        <header className="h-24 bg-slate-950/50 backdrop-blur-3xl border-b border-slate-800 flex items-center justify-between px-10 sticky top-0 z-50 shrink-0">
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="lg:hidden p-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400">
              <ArrowLeft size={18} />
            </button>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] italic">System Monitoring: ACTIVE</h2>
              </div>
              <h1 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3 shadow-sm">
                INSTRUCTIONAL HUB
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 tracking-widest italic">v1.2 // OPS</span>
              </h1>
            </div>
          </div>
          <div className="hidden md:flex gap-4">
             <div className="px-5 py-2.5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center gap-3">
                <div className="p-1 px-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded font-mono text-[10px] text-emerald-400">MIC: 0.01</div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Local Pharmacy Active</span>
             </div>
          </div>
        </header>

        <div className="p-8 lg:p-12 space-y-10 max-w-6xl mx-auto w-full pb-32">
          
          {/* CONTENT: Core Principles (Patho/Staging) */}
          {(activeTab === 'patho' || activeTab === 'staging') && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
               <div className="bg-slate-950/40 border border-slate-800 p-12 rounded-[4rem] relative overflow-hidden backdrop-blur-sm">
                  <div className="absolute top-0 right-0 p-8">
                    <Database className="text-slate-800 opacity-20" size={120} />
                  </div>
                  
                  <div className="relative z-10 max-w-2xl text-left mb-12">
                    <h3 className="text-5xl font-black text-white tracking-widest uppercase italic mb-6 shadow-xl leading-none">
                      {activeTab === 'patho' ? COMPREHENSIVE_DATA.pathophysiology.title : "STAGING PROTOCOL"}
                    </h3>
                    <p className="text-slate-400 text-lg font-medium italic border-l-4 border-emerald-500 pl-6 py-2">
                       {activeTab === 'patho' ? "The biological imperative of chronic bone infection." : "The Cierny-Mader system for surgical decision making."}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 relative z-10">
                    {activeTab === 'patho' ? COMPREHENSIVE_DATA.pathophysiology.steps.map((step: any, i: number) => (
                      <div key={i} className="group p-8 bg-slate-900/60 rounded-[2.5rem] border border-slate-800 hover:border-emerald-500/50 transition-all hover:bg-slate-900">
                        <div className="flex justify-between items-start mb-6">
                           <div className="text-[10px] font-black text-emerald-500 tracking-[0.3em] uppercase italic">Stage 0{i + 1}</div>
                           <Layers size={18} className="text-slate-700 group-hover:text-emerald-500 transition-colors" />
                        </div>
                        <h4 className="text-xl font-black text-white mb-3 uppercase tracking-tight">{step.name}</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-medium italic group-hover:text-slate-300">{step.desc}</p>
                      </div>
                    )) : (
                      <>
                        <div className="space-y-4">
                           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Anatomical Classification</p>
                           {COMPREHENSIVE_DATA.staging.anatomical.map((s: any, i: number) => (
                             <div key={i} className="p-5 bg-slate-900/40 rounded-3xl border border-slate-800 flex items-center gap-6">
                               <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-mono text-emerald-400 font-bold border border-emerald-500/20">{i+1}</div>
                               <div className="text-[11px] font-black text-slate-300 uppercase tracking-tight">{s.desc}</div>
                             </div>
                           ))}
                        </div>
                        <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-[3rem] shadow-2xl">
                           <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-8 text-center italic">Host Physiology</p>
                           <div className="space-y-6">
                             {COMPREHENSIVE_DATA.staging.physiological.map((p: string, i: number) => (
                               <div key={i} className="flex items-center gap-6 group">
                                  <div className="text-4xl font-black text-slate-800 group-hover:text-emerald-500 transition-colors uppercase italic">{p.split(' ')[0]}</div>
                                  <div className="h-[2px] flex-1 bg-slate-800 group-hover:bg-emerald-500/20 transition-all" />
                                  <p className="text-[11px] font-black text-slate-400 group-hover:text-white uppercase italic tracking-widest">{p.split('(')[1].replace(')', '')}</p>
                               </div>
                             ))}
                           </div>
                        </div>
                      </>
                    )}
                  </div>

                  {activeTab === 'patho' && (
                    <div className="mt-12 p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-[2.5rem] flex items-center gap-6 group hover:bg-emerald-500/20 transition-all">
                       <Zap className="text-emerald-400 group-hover:scale-110 transition-transform" size={40} />
                       <p className="text-lg text-emerald-400 font-black italic tracking-tighter uppercase leading-tight">
                         {COMPREHENSIVE_DATA.pathophysiology.pearl}
                       </p>
                    </div>
                  )}
               </div>
            </div>
          )}

          {/* CONTENT: Clinical Modules (Bento Grid) */}
          {['aho', 'septic', 'pji', 'potts', 'biofilm', 'masquelet', 'carriers', 'imaging', 'brodies'].includes(activeTab) && (
            <div className="animate-in fade-in slide-in-from-right-12 duration-700 grid grid-cols-1 lg:grid-cols-12 gap-8 auto-rows-max">
               {/* Hero Module (Wide) */}
               <div className={`col-span-full lg:col-span-8 p-12 rounded-[4rem] border relative overflow-hidden backdrop-blur-md group 
                 ${['biofilm', 'masquelet', 'carriers', 'imaging', 'brodies'].includes(activeTab) 
                    ? 'bg-purple-950/20 border-purple-800/40 hover:border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.05)]' 
                    : 'bg-emerald-950/20 border-emerald-800/40 hover:border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.05)]'}`}>
                  
                  <div className="absolute -top-12 -right-12 text-white/5 group-hover:text-white/10 transition-colors">
                     <Binary size={300} />
                  </div>

                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                     <div className={`p-10 rounded-[3rem] shadow-2xl transition-all group-hover:rotate-6 
                       ${['biofilm', 'masquelet', 'carriers', 'imaging', 'brodies'].includes(activeTab) ? 'bg-purple-600/20 border border-purple-500/30' : 'bg-emerald-600/20 border border-emerald-500/30 text-white'}`}>
                        {activeTab === 'masquelet' ? <Scissors size={64} className="text-purple-400" /> : <Microscope size={64} className={['biofilm', 'masquelet', 'carriers', 'imaging', 'brodies'].includes(activeTab) ? 'text-purple-400' : 'text-emerald-400'} />}
                     </div>
                     <div className="text-center md:text-left flex-1 space-y-4">
                        <div className="flex items-center justify-center md:justify-start gap-4">
                           <span className={`text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border
                             ${['biofilm', 'masquelet', 'carriers', 'imaging', 'brodies'].includes(activeTab) ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
                             {currentData.niche}
                           </span>
                        </div>
                        <h3 className="text-6xl font-black text-white tracking-widest uppercase italic leading-[0.9]">{currentData.title}</h3>
                        <p className={`text-xl font-bold italic leading-relaxed pr-8 opacity-80 group-hover:opacity-100 transition-opacity
                          ${['biofilm', 'masquelet', 'carriers', 'imaging', 'brodies'].includes(activeTab) ? 'text-purple-200' : 'text-emerald-200'}`}>
                          "{activeTab === 'aho' ? currentData.clinical : currentData.pearl || currentData.logic}"
                        </p>
                     </div>
                  </div>
               </div>

               {/* Diagnostic Logic (Bento Right) */}
               <div className="col-span-full lg:col-span-4 bg-slate-900/60 p-10 rounded-[3.5rem] border border-slate-800 shadow-xl flex flex-col">
                  <h4 className={`text-sm font-black mb-8 flex items-center gap-3 uppercase tracking-[0.2em] border-b border-slate-800 pb-4
                    ${['biofilm', 'masquelet', 'carriers', 'imaging', 'brodies'].includes(activeTab) ? 'text-purple-400' : 'text-emerald-400'}`}>
                     <Zap size={18} /> Management LOGIC
                  </h4>
                  <div className="flex-1 flex flex-col justify-center space-y-6">
                    <div className="p-8 bg-black/40 rounded-[2.5rem] border border-slate-800 relative group overflow-hidden">
                       <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                       <h5 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Apley Diagnostic Note</h5>
                       <p className="text-sm text-slate-300 font-bold italic leading-relaxed relative z-10 transition-colors group-hover:text-white">
                         {activeTab === 'masquelet' ? currentData.biology : 
                           activeTab === 'biofilm' ? "The physiological state of the cell changes from metabolic 'active' to 'dormant' in the biofilm." :
                           currentData.pearl || "Immediate specialist stabilization required."}
                       </p>
                    </div>
                    <div className="p-8 bg-slate-900/80 rounded-[2.5rem] border border-slate-800 border-l-4 border-l-emerald-500">
                       <h5 className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-4">Therapeutic Imperative</h5>
                       <p className="text-[11px] font-black text-slate-200 leading-relaxed uppercase italic tracking-wider">
                         {activeTab === 'septic' ? "Emergency arthrotomy and debridement." : 
                          activeTab === 'aho' ? "Intravenous antibiotics; drain if subperiosteal abscess forms." : 
                          ['biofilm', 'masquelet', 'carriers', 'imaging', 'brodies'].includes(activeTab) ? "Tertiary specialist reconstructive management." :
                          "Long-term suppressesive or multi-stage surgery."}
                       </p>
                    </div>
                  </div>
               </div>

               {/* Technical Process (Bento Bottom Left Wide) */}
               <div className="col-span-full lg:col-span-12 bg-slate-950 p-12 rounded-[4rem] border border-slate-800 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-12">
                    <h4 className={`text-2xl font-black uppercase tracking-widest italic flex items-center gap-4
                      ${['biofilm', 'masquelet', 'carriers', 'imaging', 'brodies'].includes(activeTab) ? 'text-purple-400' : 'text-emerald-400'}`}>
                       <Binary size={24} /> Process Analysis
                    </h4>
                    <span className="font-mono text-[9px] text-slate-600 tracking-[0.5em] uppercase">Security Level: TRIPLE_ALPHA</span>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {activeTab === 'septic' && currentData.kocher.map((item: string, i: number) => (
                      <div key={i} className="p-6 bg-slate-900 rounded-3xl border border-slate-800 hover:border-emerald-500/30 transition-all flex flex-col gap-4">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-mono text-xs">0{i+1}</div>
                        <p className="text-[11px] font-black uppercase text-slate-300 italic tracking-tighter leading-relaxed">{item}</p>
                      </div>
                    ))}
                    {activeTab === 'biofilm' && currentData.stages.map((s: any) => (
                      <div key={s.id} className="p-8 bg-slate-900/50 rounded-[2.5rem] border border-slate-800 group hover:bg-slate-900 transition-all text-left">
                        <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-4 group-hover:translate-x-1 transition-transform">{s.name}</div>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium italic group-hover:text-slate-200 transition-colors">{s.desc}</p>
                      </div>
                    ))}
                    {activeTab === 'carriers' && currentData.types.map((t: any, i: number) => (
                      <div key={i} className="p-8 bg-slate-900/50 rounded-[2.5rem] border border-slate-800 group hover:border-purple-500/30 transition-all flex flex-col justify-between h-full">
                        <div>
                           <h5 className="text-[11px] font-black text-white uppercase tracking-tighter mb-4">{t.name}</h5>
                           <p className="text-[10px] text-emerald-400 font-black italic tracking-widest uppercase mb-4 opacity-60">PRO: {t.pro}</p>
                        </div>
                        <p className="text-[10px] text-red-400 font-black italic tracking-widest uppercase">CON: {t.con}</p>
                      </div>
                    ))}
                    {activeTab === 'imaging' && currentData.tests.map((t: any, i: number) => (
                      <div key={i} className="p-8 bg-slate-900/50 rounded-[2.5rem] border border-slate-800 hover:border-purple-500/30 transition-all">
                        <h5 className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-4 italic">{t.name}</h5>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{t.use}</p>
                      </div>
                    ))}
                    {(!['septic', 'biofilm', 'carriers', 'imaging'].includes(activeTab)) && (
                       <div className="col-span-full p-8 bg-white/5 rounded-3xl text-slate-400 italic font-medium leading-[2]">
                         {currentData.pathology || currentData.features || "Detailed surgical workflow protocols are restricted to senior consultants."}
                       </div>
                    )}
                  </div>
               </div>

               {/* Mimic Alert (Full Width High Contrast) */}
               <div className="col-span-full bg-red-600/10 border-2 border-red-500/20 p-12 rounded-[5rem] relative overflow-hidden backdrop-blur-md group hover:bg-red-600/20 transition-all">
                  <div className="absolute top-0 right-12 bottom-0 flex items-center justify-center">
                    <ShieldAlert size={200} className="text-red-500/5 group-hover:text-red-500/10 transition-colors" />
                  </div>
                  <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                     <div className="lg:w-2/3 space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)] flex items-center justify-center text-white">
                             <AlertTriangle size={24} />
                          </div>
                          <h4 className="text-3xl font-black uppercase text-white tracking-widest italic">{activeTab === 'biofilm' ? "QUORUM SENSING THRESHOLD" : "THE INFECTION MIMIC TRAP"}</h4>
                        </div>
                        <p className="text-lg text-slate-300 leading-relaxed font-bold italic tracking-tight opacity-90 group-hover:opacity-100 transition-opacity">
                           {activeTab === 'biofilm' ? 
                             "When bacteria reach critical density, they coordinate global gene expression. This is a structural failure of bio-interface. Debridement without component removal is mathematically likely to fail." :
                             "In a child with fever and bone pain, Ewing Sarcoma is the Great Mimic. Aspiration of unusual liquid requires PATHOLOGY immediately. Do not settle for negative cultures."
                           }
                        </p>
                     </div>
                     <div className="lg:w-1/3 flex justify-center">
                        <div className="px-10 py-5 bg-red-500 text-white rounded-full font-black text-xs uppercase tracking-[.3em] italic shadow-2xl animate-pulse">
                           {activeTab === 'biofilm' ? "MECH DEBRIDEMENT > ANTIBIOTICS" : "PATHOLOGY > CULTURE"}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* CONTENT: Microbiology / Surgical Scents */}
          {activeTab === 'micro' && (
             <div className="animate-in fade-in slide-in-from-left-8 duration-700 grid md:grid-cols-2 gap-8">
                {Object.entries(COMPREHENSIVE_DATA.microbiology).map(([key, val], i) => (
                   <div key={i} className="group bg-slate-900 border border-slate-800 p-10 rounded-[3rem] hover:border-emerald-500/40 transition-all relative overflow-hidden shadow-2xl">
                      <div className="absolute top-0 right-0 p-6 text-slate-800">
                         <Target size={40} className="group-hover:text-emerald-500/20 transition-colors" />
                      </div>
                      <h5 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-6 italic">{key.replace('_', ' ')}</h5>
                      <p className="text-4xl font-black text-white uppercase italic tracking-tighter shadow-lg leading-none group-hover:text-emerald-50 transition-colors">{val}</p>
                      <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-emerald-500" />
                         <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-300">Standard Isolate Protocol Alpha</span>
                      </div>
                   </div>
                ))}
             </div>
          )}

          {activeTab === 'tx' && (
             <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="bg-emerald-950/20 border border-emerald-800/40 p-12 rounded-[4rem] relative overflow-hidden backdrop-blur-md">
                   <h3 className="text-4xl font-black mb-10 flex items-center gap-4 text-white uppercase italic tracking-tighter">
                     <ShieldAlert className="text-emerald-500" /> Principles of Surgical Eradication
                   </h3>
                   <div className="grid md:grid-cols-3 gap-8 relative z-10">
                      {[
                        { title: "Debridement", desc: "Systematic removal of all necrotic sequestra and infected bone surface (Saucerization)." },
                        { title: "Dead Space", desc: "Obliteration of the defect using antibiotic-impregnated cement spacers or local tissue flaps." },
                        { title: "Stabilization", desc: "Rigid fixation of the bone segment if structural integrity is compromised by disease or surgery." }
                      ].map((t, i) => (
                        <div key={i} className="p-8 bg-slate-900/60 border border-slate-800 rounded-[2.5rem] hover:bg-slate-900 transition-all group">
                           <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-black mb-6 group-hover:scale-110 transition-transform">
                             {i + 1}
                           </div>
                           <h5 className="font-black text-xl uppercase tracking-tight text-white mb-3 italic">{t.title}</h5>
                           <p className="text-sm text-slate-400 font-medium leading-relaxed italic group-hover:text-slate-300">{t.desc}</p>
                        </div>
                      ))}
                   </div>
                   <Wind className="absolute bottom-[-80px] right-[-80px] text-emerald-500/5 pointer-events-none" size={400}/>
                </div>
             </div>
          )}

        </div>

        {/* Legend */}
        <footer className="mt-auto px-12 py-8 flex flex-wrap justify-between items-center gap-8 border-t border-slate-900 bg-black/60 relative z-10 backdrop-blur-3xl shrink-0">
           <div className="flex gap-8">
             <div className="flex items-center gap-3">
               <div className="w-3 h-3 rounded-sm bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div> 
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic tracking-tighter transition-colors hover:text-emerald-400">Surgical Logic</span>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-3 h-3 rounded-sm bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div> 
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic tracking-tighter transition-colors hover:text-purple-400">Micro-Biology</span>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-3 h-3 rounded-sm bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div> 
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic tracking-tighter transition-colors hover:text-red-400">Critical Mimic</span>
             </div>
           </div>
           <div className="bg-slate-900 border border-slate-800 px-6 py-2 rounded-full font-mono text-[9px] text-slate-500 tracking-[.5em] flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SYSTEM CORE STATUS: NOMINAL // 0xAF44
           </div>
        </footer>
      </main>
    </div>
  );
};

export default OsteomyelitisHub;
