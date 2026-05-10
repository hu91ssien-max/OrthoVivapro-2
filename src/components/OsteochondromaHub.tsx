import React, { useState, useMemo } from 'react';
import { 
  Bone, 
  Activity, 
  Search, 
  Scissors, 
  Zap, 
  ChevronRight, 
  AlertTriangle,
  Stethoscope,
  Maximize2,
  Layers,
  Settings,
  Scale,
  Thermometer,
  Wind,
  Info,
  Dna,
  TrendingUp,
  Eye,
  ArrowLeft
} from 'lucide-react';

const TUMOR_DATA = {
  pathology: {
    title: "Biological Profile",
    niche: "The Cartilage-Capped Exostosis",
    description: "A benign developmental outgrowth of bone with a cartilage cap. It arises from the growth plate and moves away from the joint as the bone grows.",
    genetics: [
      { id: "Sporadic", d: "Most common. Single lesion, usually found in the metaphysis of long bones." },
      { id: "HMO", d: "Hereditary Multiple Osteochondromas. Autosomal dominant (EXT1/EXT2 genes). Multiple lesions with higher risk of deformity." }
    ],
    pearl: "The marrow of the tumor is the marrow of the bone; they are one and the same."
  },
  radiology: {
    title: "Radiographic Logic",
    niche: "Diagnostic Pathognomonics",
    features: [
      { id: "Continuity", d: "The cortex and medullary canal of the lesion are continuous with the host bone. (Non-negotiable for diagnosis)." },
      { id: "Orientation", d: "Typically points 'away' from the nearest joint (directed toward the diaphysis)." },
      { id: "Morphology", d: "Pedunculated (stalk-like) or Sessile (broad-based)." }
    ],
    logic: "MRI is the gold standard for measuring the cartilage cap thickness—the key prognostic indicator.",
    pearl: "If the cortex of the bone doesn't flow into the cortex of the tumor, it's not an osteochondroma."
  },
  danger: {
    title: "Malignant Transformation",
    niche: "The Chondrosarcoma Shift",
    criteria: [
      { sign: "Pain", d: "Sudden onset of pain in a previously painless lesion after skeletal maturity." },
      { sign: "Growth", d: "Any increase in size after the growth plates have closed." },
      { sign: "The 2cm Rule", d: "A cartilage cap thickness > 2cm on MRI in an adult is highly suspicious for secondary chondrosarcoma." }
    ],
    risk: "Risk is < 1% for sporadic cases but up to 5-10% in Hereditary Multiple Osteochondromas (HMO).",
    pearl: "A 'growing' tumor in a 30-year-old is a malignancy until proven otherwise."
  },
  management: {
    title: "Management Protocol",
    niche: "Observation vs. Excision",
    options: [
      { name: "Observation", ind: "Asymptomatic lesions. Serial X-rays during growth; discharge after skeletal maturity." },
      { name: "Excision", ind: "Symptomatic (pain, pressure on nerves/vessels), mechanical block to joint motion, or suspected malignancy." }
    ],
    technique: "Complete marginal excision including the entire cartilage cap. Incomplete removal of the cap leads to recurrence.",
    pearl: "We don't remove them for 'how they look' on X-ray, only for how they affect the patient."
  }
};

interface OsteochondromaHubProps {
  onBack: () => void;
}

const OsteochondromaHub = ({ onBack }: OsteochondromaHubProps) => {
  const [activeTab, setActiveTab] = useState('pathology');

  const current = useMemo(() => TUMOR_DATA[activeTab as keyof typeof TUMOR_DATA], [activeTab]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 font-sans text-slate-900 border-t border-slate-200">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-slate-950 text-white flex flex-col lg:h-screen lg:sticky lg:top-0 shadow-2xl">
        <div className="p-8 border-b border-white/5 text-center flex flex-col items-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-teal-600 rounded-xl shadow-lg">
              <Bone size={20} className="text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase italic">Tumor-OS</span>
          </div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic">Osteochondroma Matrix</p>
          
          <button 
            onClick={onBack}
            className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-teal-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={12} /> Back to Lab
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-x-auto lg:overflow-y-auto no-scrollbar flex lg:flex-col items-center lg:items-stretch gap-2 lg:gap-0">
          {[
            { id: 'pathology', label: 'Biological Profile', icon: Dna },
            { id: 'radiology', label: 'Radiographic Logic', icon: Layers },
            { id: 'management', label: 'Management', icon: Scissors },
            { id: 'danger', label: 'Malignancy Risk', icon: AlertTriangle }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${activeTab === item.id ? 'bg-teal-600 text-white shadow-xl lg:translate-x-1' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={16} />
                {item.label}
              </div>
              <ChevronRight size={14} className={activeTab === item.id ? 'opacity-100 hidden lg:block' : 'opacity-0'} />
            </button>
          ))}
        </nav>
        
        <div className="p-6 bg-slate-900/50 hidden lg:block">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-1 italic">Apley's Axiom</p>
            <p className="text-[11px] text-slate-300 font-medium leading-tight italic">
              "It is an exostosis, a wandering piece of the growth plate that forgot to stop."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto no-scrollbar relative bg-slate-50">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Pediatric & Adult Bone Oncology</h2>
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{current.title}</h1>
          </div>
          <div className="hidden md:flex gap-3">
             <div className="px-4 py-1.5 bg-teal-50 text-teal-700 rounded-full border border-teal-100 flex items-center gap-2">
                <TrendingUp size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest italic tracking-tight">Developmental Growth</span>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 max-w-5xl mx-auto w-full">
          
          {/* Visual Hero Card */}
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="p-8 bg-teal-50 text-teal-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                   {activeTab === 'danger' ? <AlertTriangle size={48} /> : activeTab === 'radiology' ? <Eye size={48} /> : <Bone size={48} />}
                </div>
                <div className="text-center md:text-left flex-1">
                   <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                     <span className="text-teal-600 font-black text-xs uppercase tracking-widest">{current.niche}</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                     <span className="text-slate-400 font-black text-xs uppercase tracking-widest italic">Exostosis Lab</span>
                   </div>
                   <h3 className="text-4xl font-black text-slate-800 tracking-tighter mb-4">{current.title}</h3>
                   <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{current.pearl}"</p>
                </div>
             </div>
             <Wind className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
          </div>

          {/* Core Content Grid */}
          <div className="grid md:grid-cols-2 gap-8">
             {/* LEFT: Structural Logic */}
             <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                <h4 className="text-lg font-black mb-8 flex items-center gap-3 text-teal-400 uppercase tracking-tighter">
                   <Zap size={22} /> Anatomical Matrix
                </h4>
                <div className="space-y-4 relative z-10">
                   {activeTab === 'pathology' && (
                     <div className="space-y-4">
                        <p className="text-sm text-slate-300 italic mb-4">{current.description}</p>
                        {current.genetics.map((item: any, i: number) => (
                           <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl">
                              <p className="text-[11px] font-black text-teal-400 uppercase">{item.id}</p>
                              <p className="text-[10px] text-slate-400 italic">{item.d}</p>
                           </div>
                        ))}
                     </div>
                   )}
                   {activeTab === 'radiology' && (current as any).features.map((feature: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all">
                        <h5 className="text-[11px] font-black text-white uppercase mb-1">{feature.id}</h5>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{feature.d}</p>
                     </div>
                   ))}
                   {activeTab === 'management' && (current as any).options.map((opt: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                           <h5 className="text-[11px] font-black text-white uppercase">{opt.name}</h5>
                           <span className="text-[9px] font-black text-teal-400 uppercase tracking-widest">Protocol</span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed italic">IND: {opt.ind}</p>
                     </div>
                   ))}
                   {activeTab === 'danger' && (current as any).criteria.map((sign: any, i: number) => (
                     <div key={i} className="p-4 bg-red-900/10 border border-red-900/20 rounded-2xl flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-[10px] font-black shrink-0">!</div>
                        <div>
                           <h5 className="text-[11px] font-black text-white uppercase">{sign.sign}</h5>
                           <p className="text-[10px] text-red-200/60 italic">{sign.d}</p>
                        </div>
                     </div>
                   ))}
                </div>
                <Maximize2 className="absolute -bottom-10 -right-10 text-white/5" size={240} />
             </div>

             {/* RIGHT: Actions & Clinical Judgment */}
             <div className="space-y-6">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                   <h4 className="text-lg font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter">
                      <Stethoscope size={22} className="text-teal-600" /> Surgeon's Command
                   </h4>
                   <div className="p-6 bg-teal-50 border border-teal-100 rounded-3xl text-center">
                      <p className="text-sm text-teal-900 font-bold leading-relaxed italic">
                        {activeTab === 'pathology' ? "Most patients present in the second decade. If you find an incidental exostosis in an adult, verify it hasn't changed since their teens." : 
                         activeTab === 'radiology' ? "The 'medullary continuity' is the key differentiator from parosteal osteosarcoma. If you can't see the marrow flowing into the lesion, rethink the diagnosis." : 
                         activeTab === 'management' ? "When resecting, you must also remove the bursa that often forms over the lesion. This is usually where the 'snapping' sensation comes from." : 
                         "Any osteochondroma in the pelvis or proximal femur is high-risk. These are harder to monitor clinically and should be watched with regular MRI."}
                      </p>
                   </div>
                </div>

                <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                   <h5 className="text-[10px] font-black text-teal-400 uppercase mb-3 flex items-center gap-2">
                     <Info size={14} className="text-amber-500" /> Apley Diagnostic Pearl
                   </h5>
                   <p className="text-xs font-medium leading-relaxed italic opacity-90">
                      {activeTab === 'radiology' ? "A 'sessile' osteochondroma looks like a broad mountain; a 'pedunculated' one looks like a mushroom. Sessile lesions are more common in HMO." : 
                       activeTab === 'pathology' ? "EXT1 (chromosome 8) and EXT2 (chromosome 11) are tumor suppressor genes. Their loss leads to the chaotic outgrowth of the growth plate." : 
                       activeTab === 'management' ? "Nerve compression (most commonly the peroneal nerve at the fibular head) is an absolute indication for surgical excision." :
                       "Secondary chondrosarcoma arising from an osteochondroma is usually low-grade. Early detection via the 2cm rule usually allows for limb-salvage surgery."}
                   </p>
                </div>
             </div>
          </div>

          {/* The Biological Area */}
          <div className="bg-teal-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-2/3">
                   <h4 className="text-2xl font-black mb-4 flex items-center gap-3">
                     <Settings size={24} className="text-teal-300" /> The Growth Equilibrium
                   </h4>
                   <p className="text-sm text-slate-300 leading-relaxed italic">
                      "An osteochondroma is a biological clock. It starts with the growth plate and it stops with the growth plate. Any activity after the alarm has gone off (skeletal maturity) is a biological anomaly that suggests malignant transformation."
                   </p>
                </div>
                <div className="md:w-1/3 flex justify-center text-center">
                   <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest">
                      Cap {' < '} 2cm (Safe)
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* Legend */}
        <footer className="mt-auto px-10 py-8 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/80">
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-teal-600 shadow-sm"></div> Benign Growth</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-red-600 shadow-sm"></div> Malignant Risk</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-slate-900 shadow-sm"></div> Genetic Driver</div>
           <div className="flex items-center gap-2 text-slate-800 uppercase italic font-bold">Apley Tumor Hub v1.0</div>
        </footer>
      </main>
    </div>
  );
};

export default OsteochondromaHub;
