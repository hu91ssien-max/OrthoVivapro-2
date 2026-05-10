import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  Activity, 
  Scissors, 
  ShieldAlert, 
  Search, 
  Maximize2, 
  Stethoscope, 
  ChevronRight, 
  AlertTriangle,
  Info,
  Layers,
  Wind,
  Settings,
  ArrowDownToLine,
  Crosshair,
  ArrowLeft
} from 'lucide-react';

const DISCECTOMY_DATA = {
  indications: {
    title: "The Surgical Threshold",
    niche: "Patient Selection",
    absolute: [
      { id: "Cauda Equina", d: "The only true emergency. Saddle anesthesia and bladder dysfunction." },
      { id: "Progressive Deficit", d: "Advancing motor weakness (e.g., worsening foot drop)." }
    ],
    relative: [
      { id: "Failed Conservative", d: "No improvement after 6-12 weeks of PT, NSAIDs, and activity modification." },
      { id: "Radicular Pain", d: "Intractable leg pain out of proportion to back pain (Sciatica)." }
    ],
    pearl: "We operate to cure the leg pain (Radiculopathy), not the back pain."
  },
  anatomy: {
    title: "The Surgical Corridor",
    niche: "Micro-Anatomy",
    levels: [
      { l: "L4-L5", n: "L5 Root", d: "The most common level. Affects EHL power and dorsum of foot sensation." },
      { l: "L5-S1", n: "S1 Root", d: "Second most common. Affects plantarflexion and the Achilles reflex." }
    ],
    landmarks: "The 'Shoulder' of the nerve root is the safest zone for fragment retrieval. The 'Axilla' is high-risk for dural tears.",
    pearl: "The nerve root is always 'tethered' and fragile; treat it with the respect of a master-jeweler."
  },
  technique: {
    title: "Operative Sequence",
    niche: "The Micro-Discectomy",
    steps: [
      { step: "Positioning", detail: "Prone on a Wilson frame to flex the lumbar spine and open the interlaminar spaces." },
      { step: "Laminotomy", detail: "Removal of the superior edge of the inferior lamina and the Ligamentum Flavum." },
      { step: "Retraction", detail: "Gently retract the thecal sac medially to expose the glistening white disc bulge." },
      { step: "Fragmentectomy", detail: "Incision of the Annulus and removal of the 'crab meat' (Nucleus Pulposus)." }
    ],
    pearl: "The goal is a 'tension-free' nerve root. If the root isn't floppy at the end, your job isn't finished."
  },
  complications: {
    title: "The 'Red Zone' Pitfalls",
    niche: "Risk Management",
    risks: [
      { name: "Dural Tear", d: "Look for 'clear fluid' (CSF). Repair with 6-0 Prolene or fat graft." },
      { name: "Recurrent Disc", d: "Occurs in 5-15% of cases. Usually at the same level on the same side." },
      { name: "Discitis", d: "Post-operative infection. Severe back pain 2-4 weeks post-op; check CRP." },
      { name: "Nerve Root Injury", d: "Usually due to excessive retraction pressure or thermal injury." }
    ],
    pearl: "The greatest risk to a successful discectomy is an incorrect diagnosis or wrong-level surgery."
  }
};

interface DiscectomyHubProps {
  onBack: () => void;
}

const DiscectomyHub = ({ onBack }: DiscectomyHubProps) => {
  const [activeTab, setActiveTab] = useState('indications');

  const current = useMemo(() => DISCECTOMY_DATA[activeTab as keyof typeof DISCECTOMY_DATA], [activeTab]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 font-sans text-slate-900 border-t border-slate-200">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-slate-950 text-white flex flex-col lg:h-screen lg:sticky lg:top-0 shadow-2xl">
        <div className="p-8 border-b border-white/5 text-center flex flex-col items-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-900/40">
              <Zap size={20} className="text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase italic">Spine-OS</span>
          </div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest text-center italic">Discectomy Mastery</p>
          
          <button 
            onClick={onBack}
            className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-blue-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={12} /> Back to Hub
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-x-auto lg:overflow-y-auto no-scrollbar flex lg:flex-col items-center lg:items-stretch gap-2 lg:gap-0">
          {[
            { id: 'indications', label: 'Threshold', icon: Stethoscope },
            { id: 'anatomy', label: 'Anatomy', icon: Layers },
            { id: 'technique', label: 'Technique', icon: Scissors },
            { id: 'complications', label: 'Pitfalls', icon: ShieldAlert }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${activeTab === item.id ? 'bg-blue-600 text-white shadow-xl lg:translate-x-1' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
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
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1 italic">Apley's Spine Rule</p>
            <p className="text-[11px] text-slate-300 font-medium leading-tight italic">
              "The disc is the passenger; the nerve root is the pedestrian."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto no-scrollbar relative bg-slate-50">
        <header className="h-auto lg:h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex flex-col lg:flex-row items-center justify-between px-8 py-4 lg:py-0 sticky top-0 z-30 gap-4">
          <div>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Lumbar Microdiscectomy Protocol</h2>
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{current.title}</h1>
          </div>
          <div className="hidden md:flex gap-3">
             <div className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-100 flex items-center gap-2">
                <Activity size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest italic tracking-tight">Radicular Relief</span>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 max-w-5xl mx-auto w-full">
          
          {/* Main Visual Header */}
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="p-8 bg-blue-50 text-blue-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                   {activeTab === 'anatomy' ? <Layers size={48} /> : activeTab === 'technique' ? <Scissors size={48} /> : <Search size={48} />}
                </div>
                <div className="text-center md:text-left flex-1">
                   <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                     <span className="text-blue-600 font-black text-xs uppercase tracking-widest">{current.niche}</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                     <span className="text-slate-400 font-black text-xs uppercase tracking-widest italic">Apley Neuro-Matrix</span>
                   </div>
                   <h3 className="text-4xl font-black text-slate-800 tracking-tighter mb-4">{current.title}</h3>
                   <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{current.pearl}"</p>
                </div>
             </div>
             <Maximize2 className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
          </div>

          {/* Deep Content Grid */}
          <div className="grid md:grid-cols-2 gap-8">
             {/* LEFT: Structural Logic */}
             <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                <h4 className="text-lg font-black mb-8 flex items-center gap-3 text-blue-400 uppercase tracking-tighter">
                   <Crosshair size={22} /> Biological Matrix
                </h4>
                <div className="space-y-4 relative z-10">
                   {activeTab === 'indications' && (
                     <>
                       <h5 className="text-[10px] font-black text-red-400 uppercase tracking-widest">Emergency (Absolute)</h5>
                       {current.absolute.map((item: any, i: number) => (
                         <div key={i} className="p-4 bg-red-900/10 border border-red-900/20 rounded-2xl">
                            <h6 className="text-[11px] font-black text-white uppercase">{item.id}</h6>
                            <p className="text-xs text-slate-400 font-medium italic">{item.d}</p>
                         </div>
                       ))}
                       <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-2">Elective (Relative)</h5>
                       {current.relative.map((item: any, i: number) => (
                         <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all">
                            <h6 className="text-[11px] font-black text-white uppercase">{item.id}</h6>
                            <p className="text-xs text-slate-400 font-medium italic">{item.d}</p>
                         </div>
                       ))}
                     </>
                   )}
                   {activeTab === 'anatomy' && (
                     <div className="space-y-4">
                        {current.levels.map((lvl: any, i: number) => (
                           <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-blue-400 uppercase">{lvl.l}</h5>
                                 <span className="text-[9px] font-black bg-white/10 px-2 py-0.5 rounded-full text-slate-300 italic">{lvl.n} at Risk</span>
                              </div>
                              <p className="text-xs text-slate-300 leading-relaxed italic">{lvl.d}</p>
                           </div>
                        ))}
                        <div className="p-4 bg-blue-900/20 border border-blue-900/30 rounded-2xl">
                           <h5 className="text-[10px] font-black text-blue-400 uppercase mb-1">Safe Zone Landmark</h5>
                           <p className="text-xs text-slate-300 italic">{current.landmarks}</p>
                        </div>
                     </div>
                   )}
                   {activeTab === 'technique' && (current as any).steps.map((s: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex gap-4 items-center">
                        <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-black text-[10px] shrink-0">
                           0{i+1}
                        </div>
                        <div>
                           <h5 className="text-[11px] font-black text-white uppercase">{s.step}</h5>
                           <p className="text-xs text-slate-400 leading-relaxed italic">{s.detail}</p>
                        </div>
                     </div>
                   ))}
                   {activeTab === 'complications' && (current as any).risks.map((risk: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <h5 className="text-[11px] font-black text-white uppercase mb-1">{risk.name}</h5>
                        <p className="text-xs text-slate-400 leading-relaxed italic">{risk.d}</p>
                     </div>
                   ))}
                </div>
             </div>

             {/* RIGHT: Actions & Clinical Judgment */}
             <div className="space-y-6">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                   <h4 className="text-lg font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter">
                      <Settings size={22} className="text-blue-600" /> Surgeon's Command
                   </h4>
                   <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl text-center">
                      <p className="text-sm text-blue-900 font-bold leading-relaxed italic">
                        {activeTab === 'indications' ? "The MRI must match the clinical exam. If the patient has L5 pain but the disc is at L1-L2, surgery will fail. Look for 'Clinico-Radiological correlation'." : 
                         activeTab === 'anatomy' ? "Identify the pedicle above and below. This is your definitive map. The nerve root will always wrap around the pedicle of the same-numbered vertebra." : 
                         activeTab === 'technique' ? "When the fragment is found, do not pull aggressively. If it resists, check if it's a sequestered piece tracking up or down the canal." : 
                         "If a dural tear occurs, don't panic. Perform a primary repair, ensure a water-tight seal, and keep the patient flat for 24-48 hours post-op."}
                      </p>
                   </div>
                </div>

                <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                   <h5 className="text-[10px] font-black text-blue-400 uppercase mb-3 flex items-center gap-2">
                     <AlertTriangle size={14} className="text-amber-500" /> Apley Diagnostic Pearl
                   </h5>
                   <p className="text-xs font-medium leading-relaxed italic opacity-90">
                      {activeTab === 'indications' ? "Back pain alone is not an indication for discectomy. The procedure is designed to decompress a nerve, not to fix a degenerated segment." : 
                       activeTab === 'technique' ? "The 'hidden' disc: Always probe the foramen. A small piece of disc can hide underneath the pedicle, causing persistent pain." : 
                       activeTab === 'complications' ? "Recurrent pain after a 'pain-free interval' is usually a new disc herniation. Pain that never left is usually a missed fragment or a wrong-level surgery." :
                       "Post-operative 'Foot Drop' can be caused by the retractors. Keep the retraction gentle and intermittent to allow for root reperfusion."}
                   </p>
                   <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                </div>
             </div>
          </div>

          {/* The Neural Freedom Area */}
          <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-2/3">
                   <h4 className="text-2xl font-black mb-4 flex items-center gap-3">
                     <ArrowDownToLine size={24} className="text-blue-300" /> The Root Check
                   </h4>
                   <p className="text-sm text-slate-300 leading-relaxed italic">
                      "A successful discectomy is measured by the mobility of the nerve root. Once the fragment is removed, the root should move freely like a guitar string. If it remains tight, there is more disc material hiding in the foramen or the lateral recess."
                   </p>
                </div>
                <div className="md:w-1/3 flex justify-center text-center">
                   <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest">
                      Mobility {" > "} Removal
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* Legend */}
        <footer className="mt-auto px-10 py-8 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/80">
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-blue-600 shadow-sm"></div> Decompression</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-red-600 shadow-sm"></div> Emergency</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-slate-900 shadow-sm"></div> Recurrence Risk</div>
           <div className="flex items-center gap-2 text-slate-800 uppercase italic font-bold">Apley Spine Series v1.2</div>
        </footer>
      </main>
    </div>
  );
};

export default DiscectomyHub;
