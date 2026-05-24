import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  Activity, 
  Wind, 
  Zap, 
  ChevronRight, 
  ShieldAlert, 
  Target, 
  Info, 
  Maximize2, 
  Settings,
  Droplets,
  ArrowDownToLine,
  ArrowLeft
} from 'lucide-react';

const DISC_DATA = {
  anatomy: {
    title: "Structural Architecture",
    niche: "The Tri-Part System",
    parts: [
      { name: "Nucleus Pulposus (NP)", d: "A gelatinous core of Type II collagen and Proteoglycans. High water content (80%+) provides hydrostatic resistance." },
      { name: "Annulus Fibrosus (AF)", d: "15-25 concentric lamellae of Type I collagen. Fibers are oriented at 60° to the vertical to resist tension." },
      { name: "Cartilaginous Endplate", d: "Hyaline cartilage that separates the disc from the vertebral body. The primary route for nutrient diffusion." }
    ],
    pearl: "The disc is the largest avascular structure in the human body; it lives on the edge of starvation."
  },
  biomechanics: {
    title: "Load-Bearing Physics",
    niche: "Pressure & Tension",
    mechanics: [
      { name: "Hoop Stress", d: "The Nucleus converts axial loads into lateral pressure, which the Annulus resists via circumferential tension." },
      { name: "Diurnal Variation", d: "Water is expressed from the NP under load during the day; the disc 'recharges' at night via osmotic swelling." },
      { name: "Creep & Hysteresis", d: "The disc's ability to deform slowly under constant load and its energy-absorbing shock capacity." }
    ],
    pearl: "You are approximately 1-2cm shorter by the end of the day due to disc dehydration."
  },
  pathology: {
    title: "Degenerative Cascade",
    niche: "Kirkaldy-Willis Phases",
    stages: [
      { id: "Phase 1", name: "Dysfunction", d: "Small circumferential and radial tears in the annulus; synovitis of the facet joints." },
      { id: "Phase 2", name: "Instability", d: "Internal disc disruption, loss of disc height, and laxity of the joint capsules." },
      { id: "Phase 3", name: "Stabilization", d: "Osteophyte formation and ligamentous hypertrophy leading to stiffening (and potentially stenosis)." }
    ],
    pearl: "Degeneration is a normal part of aging; it only becomes 'disease' when it generates symptoms."
  },
  herniation: {
    title: "Herniation Morphology",
    niche: "The Escape Patterns",
    types: [
      { id: "Protrusion", d: "The annulus is intact but bulging. The base is wider than the herniation." },
      { id: "Extrusion", d: "The NP has breached the AF. The material is still connected to the disc space." },
      { id: "Sequestration", d: "Free fragment. The disc material has lost all continuity with the parent disc." },
      { id: "Schmorl's Node", d: "Vertical herniation through the cartilaginous endplate into the vertebral body." }
    ],
    pearl: "Extrusions and sequestrations actually have a HIGHER rate of spontaneous resorption than simple protrusions."
  }
};

interface IntervertebralDiscHubProps {
  onBack: () => void;
}

const IntervertebralDiscHub = ({ onBack }: IntervertebralDiscHubProps) => {
  const [activeTab, setActiveTab] = useState<keyof typeof DISC_DATA>('anatomy');

  const current = useMemo(() => DISC_DATA[activeTab], [activeTab]);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-950 text-white hidden lg:flex flex-col h-screen sticky top-0 shadow-2xl">
        <div className="p-8 border-b border-white/5 text-center">
          <button 
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-blue-400 transition-colors"
          >
            <ArrowLeft size={12} /> Return to Hub
          </button>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg">
              <Layers size={20} className="text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase italic">Spine-OS</span>
          </div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic">Intervertebral Hub</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto no-scrollbar">
          {[
            { id: 'anatomy', label: 'Disc Anatomy', icon: Layers },
            { id: 'biomechanics', label: 'Physics of Load', icon: Activity },
            { id: 'pathology', label: 'Degeneration', icon: Zap },
            { id: 'herniation', label: 'Herniation Types', icon: ShieldAlert }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as keyof typeof DISC_DATA)}
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
              "The disc is the servant of the spine until it becomes the master of the nerve."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto no-scrollbar relative bg-slate-50">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
             <button 
              onClick={onBack}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-slate-600" />
            </button>
            <div>
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Functional Spine Anatomy</h2>
              <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{current.title}</h1>
            </div>
          </div>
          <div className="hidden md:flex gap-3">
             <div className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-100 flex items-center gap-2">
                <Droplets size={14} className="text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-widest italic tracking-tight">Hydraulic Balance</span>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 max-w-5xl mx-auto w-full">
          
          {/* Visual Hero Card */}
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="p-8 bg-blue-50 text-blue-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                   {activeTab === 'herniation' ? <ShieldAlert size={48} /> : activeTab === 'biomechanics' ? <Activity size={48} /> : <Maximize2 size={48} />}
                </div>
                <div className="text-center md:text-left flex-1">
                   <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                     <span className="text-blue-600 font-black text-xs uppercase tracking-widest">{current.niche}</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                     <span className="text-slate-400 font-black text-xs uppercase tracking-widest italic">Apley Spine Bio-OS</span>
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
                <h4 className="text-lg font-black mb-8 flex items-center gap-3 text-blue-400 uppercase tracking-tighter">
                   <Target size={22} /> Biological Matrix
                </h4>
                <div className="space-y-4 relative z-10">
                   {activeTab === 'anatomy' && 'parts' in current && (current.parts as any[]).map((part, i) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all">
                        <h5 className="text-[11px] font-black text-blue-400 uppercase mb-1">{part.name}</h5>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{part.d}</p>
                     </div>
                   ))}
                   {activeTab === 'biomechanics' && 'mechanics' in current && (current.mechanics as any[]).map((mech, i) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <h5 className="text-[11px] font-black text-white uppercase mb-1">{mech.name}</h5>
                        <p className="text-xs text-slate-400 leading-relaxed italic">{mech.d}</p>
                     </div>
                   ))}
                   {activeTab === 'pathology' && 'stages' in current && (current.stages as any[]).map((stage, i) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                           <h5 className="text-[11px] font-black text-blue-400 uppercase">{stage.id}</h5>
                           <span className="text-[9px] font-black text-white px-2 py-0.5 bg-white/10 rounded-full">{stage.name}</span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{stage.d}</p>
                     </div>
                   ))}
                   {activeTab === 'herniation' && 'types' in current && (current.types as any[]).map((type, i) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <h5 className="text-[11px] font-black text-white uppercase mb-1">{type.id}</h5>
                        <p className="text-xs text-slate-400 leading-relaxed italic">{type.d}</p>
                     </div>
                   ))}
                </div>
                <Maximize2 className="absolute -bottom-10 -right-10 text-white/5" size={240} />
             </div>

             {/* RIGHT: Actions & Clinical Judgment */}
             <div className="space-y-6">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                   <h4 className="text-lg font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter">
                      <Settings size={22} className="text-blue-600" /> Clinical Intelligence
                   </h4>
                   <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl text-center">
                      <p className="text-sm text-blue-900 font-bold leading-relaxed italic">
                        {activeTab === 'anatomy' ? "Disc nutrition depends on passive diffusion. Tobacco use and vibration (driving) are the greatest enemies of the endplate, leading to early necrosis." : 
                         activeTab === 'biomechanics' ? "The NP is incompressible. If the annulus is compromised, the 'pressure cooker' of the NP will explode toward the path of least resistance: the nerve root." : 
                         activeTab === 'pathology' ? "A 'dark disc' on T2 MRI indicates loss of water (Desiccation). This is the hallmark of Phase 1 degeneration and is often painless." : 
                         "90% of disc herniations occur at L4-L5 or L5-S1. This is because the posterior longitudinal ligament is thinnest here and the mechanical stress is highest."}
                      </p>
                   </div>
                </div>

                <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                   <h5 className="text-[10px] font-black text-blue-400 uppercase mb-3 flex items-center gap-2">
                     <Info size={14} className="text-amber-500" /> Apley Diagnostic Pearl
                   </h5>
                   <p className="text-xs font-medium leading-relaxed italic opacity-90">
                      {activeTab === 'anatomy' ? "Proteoglycans are the 'water magnets' of the disc. As we age, the ratio of Chondroitin Sulfate to Keratan Sulfate changes, reducing our osmotic potential." : 
                       activeTab === 'biomechanics' ? "Intradiscal pressure is highest when sitting and leaning forward with a weight. It is lowest when lying supine." : 
                       activeTab === 'pathology' ? "The 'Modic Changes' on MRI represent bone marrow edema adjacent to the endplate, signaling an active inflammatory degenerative process." :
                       "A sequestered disc fragment is highly inflammatory. While it causes more pain initially, the body's macrophages recognize it as foreign and 'eat' it faster than a protrusion."}
                   </p>
                </div>
             </div>
          </div>

          {/* The Neural Tension Area */}
          <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-2/3">
                   <h4 className="text-2xl font-black mb-4 flex items-center gap-3 text-white">
                     <ArrowDownToLine size={24} className="opacity-70" /> The Hydrostatic Balance
                   </h4>
                   <p className="text-sm text-white/80 leading-relaxed italic">
                      "Think of the disc as a tire. The Nucleus is the air pressure, and the Annulus is the sidewall. In a healthy disc, the air pressure keeps the sidewalls from collapsing. When the Nucleus dehydrates, the Annulus must carry the weight, leading to delamination, buckling, and ultimately, rupture."
                   </p>
                </div>
                <div className="md:w-1/3 flex justify-center text-center">
                   <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest">
                      Pressure = Tension
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* Legend */}
        <footer className="mt-auto px-10 py-8 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/80">
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-blue-600 shadow-sm"></div> Structural Unit</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-red-600 shadow-sm"></div> Failure Mode</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-slate-900 shadow-sm"></div> Degenerative Phase</div>
           <div className="flex items-center gap-2 text-slate-800 uppercase italic font-bold">Apley Spine Systems v1.4</div>
        </footer>
      </main>
    </div>
  );
};

export default IntervertebralDiscHub;
