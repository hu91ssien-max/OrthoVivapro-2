import React, { useState, useMemo, useRef } from 'react';
import { 
  Bone, 
  Layers, 
  Microscope, 
  Zap, 
  ShieldAlert, 
  ChevronRight, 
  ChevronLeft,
  AlertTriangle,
  Stethoscope,
  Maximize2,
  Wind,
  Droplets,
  Hammer,
  Eye,
  Crosshair,
  Dna,
  Baby,
  Activity,
  Info,
  Ruler,
  RotateCw,
  Target,
  Sparkles,
  Loader2,
  X,
  Volume2,
  ClipboardList,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MILLER_OI_DATA = {
  BIOLOGY: {
    title: "Pathophysiology & Genetics",
    niche: "Type I Collagen Defect",
    points: [
      { id: "Genetics", d: "Autosomal dominant mutations in COL1A1 or COL1A2." },
      { id: "Defect", d: "Quantitative (too little) or Qualitative (poor quality) Type I collagen." },
      { id: "Clinical Triad", d: "Blue sclera, early hearing loss (otosclerosis), and dentinogenesis imperfecta." },
      { id: "Bone Quality", d: "Brittle, 'eggshell' bone with thin cortices and decreased trabeculae." }
    ],
    millerPearl: "OI is a defect in Type I collagen. Type II is associated with chondrodysplasias, and Type IV with basement membranes."
  },
  SILLENCE: {
    title: "Sillence Classification",
    niche: "Phenotypic Severity",
    points: [
      { id: "Type I", d: "Mildest form. Most common. Blue sclera. Minimal deformity." },
      { id: "Type II", d: "Perinatal lethal. Multiple fractures in utero; 'crumpled' appearance on X-ray." },
      { id: "Type III", d: "Most severe surviving form. Progressive deforming. Triangular face." },
      { id: "Type IV", d: "Moderate severity. Normal sclera. Significant bowing and fractures." }
    ],
    millerPearl: "Sillence Type II is lethal in the newborn period due to respiratory failure and multiple rib fractures."
  },
  MANAGEMENT: {
    title: "Fracture & Bowing Management",
    niche: "Internal Splinting",
    points: [
      { id: "IM Nailing", d: "Gold Standard. Uses 'Internal Splinting' to support the entire length of the bone." },
      { id: "Telescoping Rods", d: "Fassier-Duval or Bailey-Dubow. Rods expand as the child grows to prevent stress risers." },
      { id: "Osteotomy", d: "The 'Shish Kebab' procedure: Multiple osteotomies to realign a bowed bone over a rod." },
      { id: "Plating Risk", d: "High failure rate. Screws pull out of brittle bone; plates create stress risers at the ends." }
    ],
    millerPearl: "Standard compression plating is contraindicated in OI because the bone is too brittle to hold screws and prone to fracture at the plate ends."
  },
  MEDICAL: {
    title: "Medical Adjuncts",
    niche: "Bisphosphonate Therapy",
    points: [
      { id: "Mechanism", d: "Pamidronate/Zoledronate. Inhibits osteoclasts to increase bone mineral density." },
      { id: "Benefits", d: "Decreases fracture frequency and improves bone pain. Does not fix the collagen defect." },
      { id: "Surgical Impact", d: "May cause 'Zebra lines' on X-ray. Can lead to delayed healing or difficult reaming during surgery." }
    ],
    millerPearl: "Bisphosphonates are the standard of care to increase bone density, but they do not alter the fundamental collagen mutation."
  }
};

const APLEY_OI_DATA = {
  classification: {
    title: "Sillence Classification",
    niche: "Clinical Grading",
    types: [
      { id: "Type I", severity: "Mild", d: "The most common. Autosomal dominant. Blue sclerae, fragile bones, and early hearing loss." },
      { id: "Type II", severity: "Lethal", d: "Perinatal lethal. Multiple fractures in utero; beaded ribs and crumpled femurs on X-ray." },
      { id: "Type III", severity: "Severe", d: "Progressively deforming. Short stature, triangular facies, and significant scoliosis." },
      { id: "Type IV", severity: "Moderate", d: "Similar to Type I but with normal sclerae. Significant bone bowing." }
    ],
    pearl: "Type I is a quantitative defect (less collagen); Type II-IV are qualitative defects (bad collagen)."
  },
  pathology: {
    title: "Molecular Pathology",
    niche: "Type 1 Collagen",
    biology: "A defect in the genes coding for the alpha-1 and alpha-2 chains of Type 1 collagen (COL1A1 and COL1A2).",
    imaging: "X-rays show generalized osteopenia, 'popcorn' calcifications at the epiphyses, and multiple wormian bones in the skull.",
    biopsy: "Bone biopsy reveals 'woven' bone patterns that fail to transition into mature lamellar bone.",
    pearl: "The defect is in the triple helix formation—the basic 'rope' of the bone matrix."
  },
  management: {
    title: "The Treatment Arc",
    niche: "Medical & Surgical",
    medical: [
      { name: "Bisphosphonates", d: "Pamidronate or Zoledronic acid. Increases bone density and reduces fracture frequency." },
      { name: "Bracing", d: "Lightweight orthotics to prevent progressive bowing of the long bones." }
    ],
    surgical: [
      { name: "Sofield-Millar", d: "Multiple osteotomies and 'shish-kebab' intramedullary fixation." },
      { name: "Telescoping Rods", d: "Fassier-Duval rods that grow with the child, reducing the need for revisions." }
    ],
    pearl: "Surgery is aimed at correcting deformity, while medicine is aimed at improving bone quality."
  },
  clinical: {
    title: "Clinical Forensics",
    niche: "The Non-Bone Features",
    signs: [
      { sign: "Blue Sclerae", reason: "Uveal pigment showing through thin collagen." },
      { sign: "Dentinogenesis", reason: "Opalescent teeth (weak enamel/dentin)." },
      { sign: "Ligament Laxity", reason: "Generalized hypermobility and hernia risk." },
      { sign: "Hearing Loss", reason: "Otosclerosis of the middle ear ossicles." }
    ],
    pearl: "If you see blue sclerae and a fracture, always rule out OI before diagnosing Non-Accidental Injury (NAI)."
  }
};

const QuickTile = ({ icon, title, label }: any) => (
  <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4">
    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-indigo-600">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <div>
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">{label}</span>
      <span className="text-xs font-bold text-slate-700">{title}</span>
    </div>
  </div>
);

const MillerView = () => {
  const [activeTab, setActiveTab] = useState('BIOLOGY');
  const current = (MILLER_OI_DATA as any)[activeTab];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      <header className="w-full mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">Miller Master Series</span>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Section 3.4</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Osteogenesis Imperfecta</h1>
          <p className="text-slate-500 font-medium italic">Internal Splinting & Growth Control</p>
        </div>
        
        <div className="bg-white p-4 rounded-3xl border border-indigo-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
            <Dna size={24} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-black text-slate-400 leading-none mb-1">Pathology</p>
            <p className="text-sm font-bold">Type I Collagen Deficiency</p>
          </div>
        </div>
      </header>

      <main className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[48px] p-8 md:p-12 shadow-sm border border-slate-200 relative overflow-hidden group">
            <div className="absolute top-8 left-8 flex items-center gap-2">
              <Maximize2 className="text-slate-200" size={18} />
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Bone Architecture Map</span>
            </div>
            
            <div className="w-full aspect-square max-w-sm mx-auto relative mt-12 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center">
              <svg viewBox="0 0 200 400" className="w-48 h-96">
                <path 
                  d="M100,50 Q160,200 100,350" 
                  fill="none" 
                  stroke={activeTab === 'MANAGEMENT' ? "#e2e8f0" : "#cbd5e1"} 
                  strokeWidth="30" 
                  strokeLinecap="round" 
                  opacity="0.4"
                />
                
                <g className={activeTab === 'MANAGEMENT' ? 'animate-pulse' : ''}>
                  <rect x="95" y="100" width="10" height="200" rx="5" fill="#4f46e5" />
                  <rect x="98" y="50" width="4" height="300" rx="2" fill="#818cf8" />
                  <text x="115" y="200" fontSize="10" className="fill-indigo-600 font-black uppercase">Telescoping Fixation</text>
                </g>

                {activeTab === 'BIOLOGY' && (
                  <motion.g 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="duration-500"
                  >
                    <circle cx="100" cy="40" r="15" fill="white" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="100" cy="40" r="5" fill="black" />
                    <text x="120" y="45" fontSize="10" className="fill-blue-500 font-bold italic">Blue Sclera</text>
                  </motion.g>
                )}
              </svg>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {Object.keys(MILLER_OI_DATA).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                    activeTab === key 
                    ? 'bg-indigo-700 text-white border-indigo-700 shadow-lg scale-105' 
                    : 'bg-white text-slate-400 border-slate-100 hover:border-indigo-200'
                  }`}
                >
                  {(MILLER_OI_DATA as any)[key].title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <QuickTile icon={<Baby />} title="Growth Sparing" label="Telescoping Rods" />
            <QuickTile icon={<Microscope />} title="Osteoclast Inhibition" label="Bisphosphonates" />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 h-full flex flex-col overflow-hidden">
            <div className="p-8 bg-indigo-700 text-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200">{current.niche}</span>
                <Activity size={20} />
              </div>
              <h2 className="text-3xl font-bold mb-2">{current.title}</h2>
            </div>

            <div className="p-8 flex-1 space-y-8 overflow-y-auto max-h-[400px] no-scrollbar">
              <div className="space-y-6">
                {current.points.map((pt: any, i: number) => (
                  <div key={i} className="group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform"></div>
                      <h4 className="font-bold text-slate-800 text-sm">{pt.id}</h4>
                    </div>
                    <p className="text-xs text-slate-500 pl-5 leading-relaxed font-medium">
                      {pt.d}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-3xl relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-indigo-600 mb-2">
                       <Zap size={16} />
                       <span className="text-xs font-black uppercase tracking-widest">Miller High-Yield</span>
                    </div>
                    <p className="text-sm text-indigo-900 font-bold italic leading-relaxed">
                      "{current.millerPearl}"
                    </p>
                  </div>
                </div>
              </div>

              {activeTab === 'MANAGEMENT' && (
                <div className="mt-6 p-6 bg-rose-50 border border-rose-100 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <ShieldAlert size={48} className="text-rose-600" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-rose-600 mb-2">
                       <Hammer size={16} />
                       <span className="text-xs font-black uppercase tracking-widest text-rose-500">Surgical Focus</span>
                    </div>
                    <h4 className="text-sm font-bold text-rose-900 mb-1">The 'Shish Kebab' Technique</h4>
                    <p className="text-[11px] text-rose-800 font-medium leading-relaxed italic">
                      Formally known as the Sofield-Millar procedure. It involves multiple osteotomies to realign a bowed bone, threading the fragments onto an intramedullary rod like pieces of meat on a skewer.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

const ApleyView = () => {
  const [activeTab, setActiveTab] = useState('classification');
  const current = useMemo(() => (APLEY_OI_DATA as any)[activeTab], [activeTab]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-1 w-full bg-slate-50 overflow-hidden"
    >
      <aside className="w-64 bg-slate-950 text-white hidden lg:flex flex-col shadow-2xl">
        <div className="p-8 border-b border-white/5 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg">
              <Bone size={20} className="text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase italic">OI-Matrix</span>
          </div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic">Brittle Bone Hub</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto no-scrollbar">
          {[
            { id: 'classification', label: 'Sillence Matrix', icon: Layers },
            { id: 'pathology', label: 'Molecular Path', icon: Microscope },
            { id: 'management', label: 'Treatment Arc', icon: Hammer },
            { id: 'clinical', label: 'Clinical Signs', icon: Eye }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-xl translate-x-1' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={16} />
                {item.label}
              </div>
              <ChevronRight size={14} className={activeTab === item.id ? 'opacity-100' : 'opacity-0'} />
            </button>
          ))}
        </nav>
        
        <div className="p-6 bg-slate-900/50">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1 italic">Apley's Axiom</p>
            <p className="text-[11px] text-slate-300 font-medium leading-tight italic">
              "{current.pearl}"
            </p>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col relative bg-slate-50 overflow-y-auto no-scrollbar">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Apley Path-Logic</h2>
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{current.title}</h1>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 max-w-5xl mx-auto w-full">
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="p-8 bg-blue-50 text-blue-600 rounded-[2.5rem] shadow-inner">
                   {activeTab === 'clinical' ? <Eye size={48} /> : activeTab === 'management' ? <Hammer size={48} /> : <Microscope size={48} />}
                </div>
                <div className="text-center md:text-left flex-1">
                   <h3 className="text-4xl font-black text-slate-800 tracking-tighter mb-4">{current.title}</h3>
                   <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{current.pearl}"</p>
                </div>
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
             <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <h4 className="text-lg font-black mb-8 flex items-center gap-3 text-blue-400 uppercase tracking-tighter">
                   <Zap size={22} /> Assessment Matrix
                </h4>
                <div className="space-y-4 relative z-10">
                   {activeTab === 'classification' && current.types.map((type: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-center mb-1">
                           <h5 className="text-[11px] font-black text-blue-400 uppercase">{type.id}</h5>
                           <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${type.severity === 'Lethal' ? 'bg-red-500 text-white' : 'bg-white/10 text-slate-300'}`}>{type.severity}</span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{type.d}</p>
                     </div>
                   ))}
                   {activeTab === 'management' && (
                     <div className="space-y-6">
                        {current.medical.map((m: any, i: number) => (
                          <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl">
                            <p className="text-[11px] font-black text-white">{m.name}</p>
                            <p className="text-[10px] text-slate-400 italic">{m.d}</p>
                          </div>
                        ))}
                        {current.surgical.map((s: any, i: number) => (
                          <div key={i} className="p-3 bg-blue-900/20 border border-blue-900/30 rounded-xl">
                            <p className="text-[11px] font-black text-blue-300">{s.name}</p>
                            <p className="text-[10px] text-blue-100/60 italic">{s.d}</p>
                          </div>
                        ))}
                     </div>
                   )}
                   {(activeTab === 'pathology' || activeTab === 'clinical') && (
                     <div className="space-y-6">
                        {activeTab === 'pathology' ? (
                          <>
                            <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                               <h5 className="text-[10px] font-black text-blue-400 uppercase mb-2">Molecular Defect</h5>
                               <p className="text-xs text-slate-300 italic">{current.biology}</p>
                            </div>
                            <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                               <h5 className="text-[10px] font-black text-blue-400 uppercase mb-2">Imaging Hallmarks</h5>
                               <p className="text-xs text-slate-300 italic">{current.imaging}</p>
                            </div>
                          </>
                        ) : (
                          current.signs.map((s: any, i: number) => (
                            <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                               <h5 className="text-[11px] font-black text-white uppercase mb-1">{s.sign}</h5>
                               <p className="text-xs text-slate-400 italic">Mechanism: {s.reason}</p>
                            </div>
                          ))
                        )}
                     </div>
                   )}
                </div>
             </div>

             <div className="space-y-6">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                   <h4 className="text-lg font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter">
                      <Stethoscope size={22} className="text-blue-600" /> Surgeon's Command
                   </h4>
                   <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl">
                      <p className="text-sm text-blue-900 font-bold leading-relaxed italic text-center">
                        {activeTab === 'classification' ? "Type III patients will require a wheelchair for mobility. Focus on spinal stability and upper limb function for independence." : 
                         activeTab === 'pathology' ? "Look for 'popcorn' epiphyses on X-ray." : 
                         activeTab === 'management' ? "Avoid long-term casting." : 
                         "Always perform a full neurological exam."}
                      </p>
                   </div>
                </div>

                <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative shadow-xl border border-white/5">
                   <h5 className="text-[10px] font-black text-blue-400 uppercase mb-3 flex items-center gap-2">
                     <AlertTriangle size={14} className="text-amber-500" /> Apley Diagnostic Trap
                   </h5>
                   <p className="text-xs font-medium italic opacity-90">
                      {activeTab === 'clinical' ? "Blue sclerae are normal in newborns." : "Surgical failures are common without internal splinting."}
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const OrthoBulletsView = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sillenceType, setSillenceType] = useState(1);
  const [rodExtension, setRodExtension] = useState(0);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiContent, setAiContent] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const fetchWithRetry = async (url: string, options: any, retries = 5, backoff = 1000): Promise<any> => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, backoff));
        return fetchWithRetry(url, options, retries - 1, backoff * 2);
      }
      throw error;
    }
  };

  const generateAICase = async () => {
    setLoading(true);
    setIsAiModalOpen(true);
    const prompt = `Act as an FRCS Orthopedic Examiner. Generate a high-yield clinical case study for Osteogenesis Imperfecta. Focus on a Type III patient with progressive bowing of the femurs. Include discussion on Sillence classification, the mechanism of Pamidronate, and the surgical indications for Fassier-Duval telescoping rods.`;

    const apiKey = (process as any).env?.GEMINI_API_KEY || "";

    try {
      const result = await fetchWithRetry(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: "You are a senior pediatric orthopedic consultant specializing in metabolic bone disease." }] }
          })
        }
      );
      setAiContent(result.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate case.");
    } catch (error) {
      setAiContent("Error connecting to AI. Please verify connectivity.");
    } finally {
      setLoading(false);
    }
  };

  const sillenceData: any = {
    1: { title: "Type I: Mild", severity: "Mildest", features: "Blue sclera, fragile bones, near-normal height, autosomal dominant." },
    2: { title: "Type II: Perinatal Lethal", severity: "Extreme", features: "Lethal in utero or shortly after birth due to pulmonary hypoplasia; crumpled long bones." },
    3: { title: "Type III: Progressive Deforming", severity: "Severe", features: "Most severe non-lethal type. Significant bowing, short stature, triangle face, white sclera." },
    4: { title: "Type IV: Intermediate", severity: "Moderate", features: "White sclera, bowing of long bones, short stature, autosomal dominant." }
  };

  const slides = [
    { 
      title: "Osteogenesis Imperfecta", 
      type: "title", 
      subtitle: "Type I Collagen Defects & Brittle Bone Disease", 
      label: "Module 7.0" 
    },
    { 
      title: "Pathophysiology & Genetics", 
      type: "content", 
      bullets: [
        "Defect: COL1A1 (Chr 17) or COL1A2 (Chr 7).",
        "Mechanism: Qualitative (Type II, III, IV) or Quantitative (Type I) defect in procollagen.",
        "Bone Quality: Defective osteoid matrix leads to cortical thinning and trabecular paucity.",
        "Clinical Triad: Fragile bones, Blue Sclera, Early Hearing Loss (Otosclerosis)."
      ], 
      icon: <Dna className="text-pink-500" /> 
    },
    { 
      title: "Sillence Classification", 
      type: "sillence", 
      instruction: "Select a type to review phenotypic severity and genetics." 
    },
    { 
      title: "Medical: Bisphosphonates", 
      type: "content", 
      bullets: [
        "Gold Standard: Pamidronate or Zoledronate (Cyclical IV infusions).",
        "Action: Inhibits osteoclasts, increasing cortical thickness and bone density.",
        "Radiology Sign: 'Zebra Lines' (growth arrest lines) seen after each infusion cycle.",
        "Impact: Significant reduction in fracture rate and improved mobility."
      ], 
      icon: <Activity className="text-emerald-500" /> 
    },
    { 
      title: "Surgical Simulation", 
      type: "rod_sim", 
      instruction: "Adjust growth to see how Telescoping Rods prevent 'backing out'." 
    },
    { 
      title: "Radiology & Complications", 
      type: "content", 
      bullets: [
        "Popcorn Calcifications: Metaphyseal/Epiphyseal lucencies near physes (pathognomonic).",
        "Scoliosis: Common in Type III (progressive deforming).",
        "Basilar Invagination: High-yield cranial complication; risk of brainstem compression.",
        "Dentinogenesis Imperfecta: Translucent, brittle teeth (opalescent teeth)."
      ], 
      icon: <Target className="text-amber-500" /> 
    },
    { 
      title: "OI Board Summary", 
      type: "quiz_start", 
      label: "Final Revision" 
    }
  ];

  const nextSlide = () => { if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1); };
  const prevSlide = () => { if (currentSlide > 0) setCurrentSlide(currentSlide - 1); };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col items-center bg-neutral-950 p-4 md:p-8 overflow-y-auto"
    >
      <audio ref={audioRef} hidden />

      {/* Header HUD */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-6 bg-neutral-900/50 p-5 rounded-[2rem] border border-neutral-800 backdrop-blur-md">
        <div className="flex flex-col">
          <h1 className="text-xl font-black uppercase tracking-tighter text-pink-500 flex items-center gap-2">
            <Bone size={22} className="animate-pulse" /> OI Masterclass
          </h1>
          <div className="flex gap-2 items-center">
            <span className="text-[10px] font-black bg-pink-500/20 px-2 py-0.5 rounded text-pink-300">COLLAGEN GENETICS 2026</span>
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Step {currentSlide + 1} / {slides.length}</span>
          </div>
        </div>
        <button 
          onClick={generateAICase}
          className="flex items-center gap-2 px-6 py-2.5 bg-pink-600 hover:bg-pink-500 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg transition-all active:scale-95"
        >
          <Sparkles size={14} /> AI Clinical Case
        </button>
      </div>

      {/* Main Slide Deck */}
      <div className="w-full max-w-5xl aspect-video bg-neutral-900 rounded-[3rem] shadow-2xl border border-neutral-800 relative overflow-hidden flex flex-col min-h-[500px]">
        <div className="absolute top-0 left-0 w-full h-1 bg-neutral-800">
          <div className="h-full bg-pink-500 transition-all duration-700 ease-out" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}></div>
        </div>

        <div className="flex-grow p-10 md:p-14 flex flex-col justify-center relative">
          <div className="h-full flex flex-col justify-center">
            {slides[currentSlide].type === 'title' && (
              <div className="text-center space-y-8">
                <span className="text-[14px] font-black text-pink-500 uppercase tracking-[0.6em]">{slides[currentSlide].label}</span>
                <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter uppercase italic">{slides[currentSlide].title}</h2>
                <p className="text-xl md:text-2xl text-neutral-400 font-medium tracking-tight">{slides[currentSlide].subtitle}</p>
                <div className="h-1.5 w-32 bg-pink-600 mx-auto rounded-full"></div>
              </div>
            )}

            {slides[currentSlide].type === 'content' && (
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-neutral-800 rounded-2xl border border-neutral-700">{slides[currentSlide].icon}</div>
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight italic">{slides[currentSlide].title}</h2>
                  </div>
                  <ul className="grid gap-5">
                    {slides[currentSlide].bullets?.map((b, i) => (
                      <li key={i} className="flex gap-4 text-base md:text-lg font-medium text-neutral-300 leading-snug items-start">
                        <ChevronRight className="text-pink-500 shrink-0 mt-1.5" size={20} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {slides[currentSlide].type === 'sillence' && (
              <div className="flex flex-col items-center gap-8">
                <div className="text-center">
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tight">{slides[currentSlide].title}</h2>
                  <p className="text-[11px] text-neutral-400 font-black uppercase tracking-widest">{slides[currentSlide].instruction}</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                  {[1, 2, 3, 4].map(type => (
                    <button 
                      key={type}
                      onClick={() => setSillenceType(type)}
                      className={`p-4 md:p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${sillenceType === type ? 'bg-pink-600 border-white scale-105 shadow-xl' : 'bg-neutral-800 border-neutral-700 opacity-60 hover:opacity-100'}`}
                    >
                      <span className="text-xl md:text-2xl font-black">Type {type}</span>
                      <span className="text-[10px] font-black uppercase bg-black/20 px-2 py-0.5 rounded">{sillenceData[type].severity}</span>
                    </button>
                  ))}
                </div>

                <div className="w-full max-w-2xl bg-neutral-800 p-6 md:p-8 rounded-[2.5rem] border border-neutral-700">
                   <h4 className="text-lg md:text-xl font-black text-pink-400 mb-2 uppercase italic">{sillenceData[sillenceType].title}</h4>
                   <p className="text-neutral-300 font-medium leading-relaxed italic text-sm md:text-base">{sillenceData[sillenceType].features}</p>
                </div>
              </div>
            )}

            {slides[currentSlide].type === 'rod_sim' && (
              <div className="flex flex-col items-center gap-6">
                <div className="text-center">
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tight">{slides[currentSlide].title}</h2>
                  <p className="text-[11px] text-neutral-400 font-black uppercase tracking-widest">{slides[currentSlide].instruction}</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center w-full max-w-4xl justify-center">
                  <div className="relative w-32 md:w-40 h-[240px] md:h-[280px] bg-neutral-950 rounded-[2rem] border-4 border-neutral-800 flex items-end justify-center overflow-hidden">
                    <div className="absolute inset-x-4 inset-y-8 bg-neutral-800 rounded-full opacity-30 border-2 border-dashed border-neutral-600"></div>
                    
                    <div className="relative w-4 transition-all duration-700 flex flex-col items-center" style={{ height: `${160 + (rodExtension * 0.8)}px` }}>
                       <div className="w-4 h-32 bg-neutral-400 rounded-full relative z-10 border border-neutral-600 shadow-lg">
                          <div className="absolute top-0 w-8 h-2 bg-neutral-300 -left-2 rounded-full shadow-md"></div>
                       </div>
                       <div className="w-2 bg-neutral-600 rounded-full transition-all duration-700" style={{ height: `${rodExtension}px`, marginTop: '-10px' }}>
                          <div className="w-8 h-2 bg-neutral-300 -ml-3 absolute bottom-0 rounded-full shadow-md"></div>
                       </div>
                    </div>

                    <div className="absolute top-4 text-[9px] font-black text-neutral-500 uppercase">Fassier-Duval Simulation</div>
                  </div>

                  <div className="w-full max-w-[280px] space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between text-[11px] font-black uppercase text-neutral-400">
                        <span>Bone Growth Cycle</span>
                        <span className="text-pink-500">+{rodExtension}mm</span>
                      </div>
                      <input 
                        type="range" min="0" max="100" value={rodExtension}
                        onChange={(e) => setRodExtension(parseInt(e.target.value))}
                        className="w-full h-2.5 bg-neutral-700 rounded-full appearance-none cursor-pointer accent-pink-500"
                      />
                    </div>
                    
                    <div className="p-5 bg-neutral-800 rounded-[1.5rem] border border-neutral-700">
                      <h5 className="text-[10px] font-black uppercase text-pink-400 mb-2">Surgical Pearl</h5>
                      <p className="text-[11px] font-bold text-neutral-400 leading-relaxed">
                        Telescoping rods are fixed in the <span className="text-neutral-100">Epiphyses</span>. As the bone grows, the rod expands, preventing the "backing out" common with static intramedullary nails.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {slides[currentSlide].type === 'quiz_start' && (
              <div className="text-center space-y-8">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-pink-600 rounded-[1.5rem] mx-auto flex items-center justify-center shadow-2xl animate-bounce">
                  <ClipboardList size={32} className="text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">Final Review</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                   <div className="p-6 bg-neutral-800 rounded-[2rem] border border-neutral-700 text-center hover:border-pink-500 transition-all">
                      <p className="text-[10px] font-black text-pink-400 uppercase mb-2 tracking-widest">The "Killer"</p>
                      <p className="text-lg font-black">TYPE II</p>
                      <p className="text-[9px] text-neutral-500 font-bold uppercase mt-1">Perinatal Lethal</p>
                   </div>
                   <div className="p-6 bg-neutral-800 rounded-[2rem] border border-neutral-700 text-center hover:border-emerald-500 transition-all">
                      <p className="text-[10px] font-black text-emerald-400 uppercase mb-2 tracking-widest">Treatment</p>
                      <p className="text-lg font-black">PAMIDRONATE</p>
                      <p className="text-[9px] text-neutral-500 font-bold uppercase mt-1">Inhibits Osteoclasts</p>
                   </div>
                   <div className="p-6 bg-neutral-800 rounded-[2rem] border border-neutral-700 text-center hover:border-amber-500 transition-all">
                      <p className="text-[10px] font-black text-amber-400 uppercase mb-2 tracking-widest">Radiology</p>
                      <p className="text-lg font-black">POPCORN</p>
                      <p className="text-[9px] text-neutral-500 font-bold uppercase mt-1">Near Physis</p>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-6 md:p-8 bg-neutral-900 border-t border-neutral-800 flex justify-between items-center">
          <div className="flex gap-3">
            <button onClick={prevSlide} disabled={currentSlide === 0} className="p-3 md:p-4 bg-neutral-800 rounded-2xl hover:bg-neutral-700 disabled:opacity-30 transition-all border border-neutral-700">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="p-3 md:p-4 bg-neutral-800 rounded-2xl hover:bg-neutral-700 disabled:opacity-30 transition-all border border-neutral-700">
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="hidden lg:flex gap-2">
            {slides.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-10 bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]' : 'w-2 bg-neutral-700'}`}></div>
            ))}
          </div>
          <div className="flex flex-col items-end">
             <span className="text-[10px] font-black text-neutral-500 tracking-[0.2em] uppercase">Brittle Bone Engine</span>
             <span className="text-[8px] font-bold text-neutral-600 italic uppercase text-right">Surgical Revision 2026</span>
          </div>
        </div>
      </div>

      {/* AI Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-neutral-800 border border-neutral-700 w-full max-w-3xl max-h-[85vh] rounded-[3rem] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-neutral-700 flex justify-between items-center bg-neutral-900/40">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-600 rounded-xl shadow-lg shadow-pink-600/20"><Sparkles className="text-white" size={18} /></div>
                <h3 className="text-lg font-black uppercase tracking-tight italic">{loading ? "Sequencing Collagen..." : "Board Exam Simulation"}</h3>
              </div>
              <button onClick={() => setIsAiModalOpen(false)} className="p-2 hover:bg-neutral-700 rounded-full transition-all"><X size={20} /></button>
            </div>
            <div className="p-8 flex-grow overflow-y-auto no-scrollbar">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center gap-6">
                   <div className="relative w-16 h-16">
                      <Loader2 className="animate-spin text-pink-500 absolute inset-0" size={64} />
                      <div className="absolute inset-0 flex items-center justify-center text-pink-300 text-[8px] font-black uppercase">DNA</div>
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 animate-pulse">Running Procollagen Qualitative Analysis...</p>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                  <div className="prose prose-invert max-w-none">
                    <div className="whitespace-pre-wrap font-medium text-neutral-200 bg-neutral-900/60 p-6 md:p-8 rounded-[2rem] border border-neutral-700 shadow-inner leading-relaxed text-sm md:text-base italic">
                      {aiContent}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-neutral-700 bg-neutral-900/20 text-center">
              <button 
                onClick={() => setIsAiModalOpen(false)}
                className="px-8 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-full text-[10px] font-black uppercase tracking-widest transition-all"
              >
                Close Simulation
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const OsteogenesisImperfectaHub = () => {
  const [source, setSource] = useState<'miller' | 'apley' | 'orthobullets'>('miller');

  return (
    <div className="w-full flex flex-col min-h-[800px] bg-slate-50 font-sans text-slate-900 overflow-hidden rounded-[3rem] border border-slate-200">
      {/* Source Toggle */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between z-40">
        <div className="flex gap-2 p-1 bg-slate-100 rounded-full flex-wrap">
           <button 
             onClick={() => setSource('miller')}
             className={`px-4 md:px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${source === 'miller' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
           >
             Miller
           </button>
           <button 
             onClick={() => setSource('apley')}
             className={`px-4 md:px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${source === 'apley' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
           >
             Apley Matrix
           </button>
           <button 
             onClick={() => setSource('orthobullets')}
             className={`px-4 md:px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${source === 'orthobullets' ? 'bg-pink-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
           >
             OrthoBullets Hub
           </button>
        </div>
        <div className="flex items-center gap-3 hidden sm:flex">
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] italic">Pediatric Orthopedics 2026</span>
          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
            {source === 'miller' ? <Dna size={14} className="text-indigo-400" /> : source === 'apley' ? <Bone size={14} className="text-blue-400" /> : <Sparkles size={14} className="text-pink-400" />}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <div className="flex-1 flex flex-col overflow-hidden">
          {source === 'miller' ? <MillerView key="miller" /> : source === 'apley' ? <ApleyView key="apley" /> : <OrthoBulletsView key="orthobullets" />}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default OsteogenesisImperfectaHub;

