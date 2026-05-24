import React, { useState, useMemo } from 'react';
import { 
  Eye, 
  Hand, 
  Move, 
  Brain, 
  Search, 
  ChevronRight, 
  AlertTriangle, 
  Stethoscope, 
  Activity, 
  Maximize2, 
  Settings, 
  ArrowDownToLine, 
  User, 
  Info,
  Layers,
  Zap,
  ArrowLeft,
  Wind
} from 'lucide-react';

const EXAM_DATA = {
  look: {
    title: "Look & Inspect",
    niche: "Visual Forensics",
    steps: [
      { id: "Posture", d: "Observe from the side (Kyphosis/Lordosis) and back (Scoliosis). Check for 'Pelvic Tilt' or shoulder asymmetry." },
      { id: "Skin Markers", d: "Look for Cafe-au-lait spots (Neurofibromatosis), hair tufts, or dimples (Spinal Dysraphism)." },
      { id: "Muscle Wasting", d: "Inspect paraspinal muscles, gluteal bulk, and the 'intrinsic minus' hand in cervical cases." },
      { id: "Adams Bend", d: "Have patient lean forward; observe for a rib hump (structural scoliosis)." }
    ],
    pearl: "The examination begins the moment the patient walks into the room. Watch their gait and how they sit."
  },
  feel: {
    title: "Feel & Palpate",
    niche: "Surface Anatomy",
    steps: [
      { id: "Spinous Processes", d: "Palpate for tenderness or a 'step-off' (Spondylolisthesis)." },
      { id: "Paraspinal Muscles", d: "Identify spasm, trigger points, or the 'tension sign' of inflammatory disease." },
      { id: "SI Joints", d: "Tenderness over the PSIS; may indicate sacroiliitis or referred pain." },
      { id: "Soft Tissues", d: "Check the sciatic notch for tenderness in suspected radiculopathy." }
    ],
    pearl: "Localized midline tenderness is bone; lateral tenderness is usually muscle or ligament."
  },
  move: {
    title: "Move (Range of Motion)",
    niche: "Kinetic Boundaries",
    cervical: [
      { m: "Flexion/Ext", d: "Normal: 45° / 45°. Chin to chest and look at ceiling." },
      { m: "Rotation", d: "Normal: 80°. Look over each shoulder (mostly C1-C2)." }
    ],
    lumbar: [
      { m: "Flexion", d: "Measured via Schober's test (increase of 5cm over a 10cm segment)." },
      { m: "Lateral Bend", d: "Patient slides hand down lateral thigh." }
    ],
    pearl: "Pain on extension usually indicates facet joint disease; pain on flexion suggests discogenic origin."
  },
  neuro: {
    title: "Neurological Survey",
    niche: "Myotomes & Dermatomes",
    levels: [
      { l: "C5-C6", m: "Biceps / Brachioradialis", d: "Deltoid / Lateral arm sensation." },
      { l: "L4", m: "Tibialis Anterior (Dorsiflexion)", d: "Medial foot; Patellar reflex." },
      { l: "L5", m: "EHL (Big toe extension)", d: "Dorsum of foot; No reflex." },
      { l: "S1", m: "Peroneals / Gastroc", d: "Lateral foot; Achilles reflex." }
    ],
    pearl: "Always compare right to left. A difference of 1 grade in power is clinically significant."
  },
  special: {
    title: "Special Tests",
    niche: "Provocative Maneuvers",
    tests: [
      { name: "SLR (Lasegue)", d: "Passive leg raise. Positive if radicular pain occurs between 30-70°." },
      { name: "Spurling's", d: "Cervical lateral tilt + compression. Positive for radiculopathy." },
      { name: "Slump Test", d: "Seated dural tension test; more sensitive than SLR for subtle disc herniation." },
      { name: "Babinski / Hoffman", d: "Pathologic reflexes indicating Upper Motor Neuron (cord) involvement." }
    ],
    pearl: "The 'Crossed SLR' (pain in the affected leg when raising the GOOD leg) is 90% specific for disc herniation."
  }
};

interface SpineExaminationModeProps {
  onBack: () => void;
}

const SpineExaminationMode = ({ onBack }: SpineExaminationModeProps) => {
  const [activeTab, setActiveTab] = useState<keyof typeof EXAM_DATA>('look');

  const current = useMemo(() => EXAM_DATA[activeTab], [activeTab]);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-950 text-white hidden lg:flex flex-col h-screen sticky top-0 shadow-2xl">
        <div className="p-8 border-b border-white/5 text-center">
          <button 
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft size={12} /> Return to Hub
          </button>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg">
              <Search size={20} className="text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase italic">Clinic-OS</span>
          </div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest text-center italic">Spine Exam Hub</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto no-scrollbar">
          {[
            { id: 'look', label: 'Look & Inspect', icon: Eye },
            { id: 'feel', label: 'Feel & Palpate', icon: Hand },
            { id: 'move', label: 'Range of Motion', icon: Move },
            { id: 'neuro', label: 'Neuro Survey', icon: Brain },
            { id: 'special', label: 'Special Tests', icon: Activity }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as keyof typeof EXAM_DATA)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-xl translate-x-1' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
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
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 italic">Apley's Exam Law</p>
            <p className="text-[11px] text-slate-300 font-medium leading-tight italic">
              "Examine the patient, not the X-ray. A picture may show a bulge, but only the exam shows the disease."
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
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Clinical Spine Assessment</h2>
              <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{current.title}</h1>
            </div>
          </div>
          <div className="hidden md:flex gap-3">
             <div className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100 flex items-center gap-2">
                <Stethoscope size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest italic tracking-tight">Systematic Diagnostic</span>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 max-w-5xl mx-auto w-full">
          
          {/* Main Visual Header */}
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="p-8 bg-indigo-50 text-indigo-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                   {activeTab === 'neuro' ? <Brain size={48} /> : activeTab === 'move' ? <Move size={48} /> : <User size={48} />}
                </div>
                <div className="text-center md:text-left flex-1">
                   <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                     <span className="text-indigo-600 font-black text-xs uppercase tracking-widest">{current.niche}</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                     <span className="text-slate-400 font-black text-xs uppercase tracking-widest italic">Apley Clinical OS</span>
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
                <h4 className="text-lg font-black mb-8 flex items-center gap-3 text-indigo-400 uppercase tracking-tighter">
                   <Zap size={22} /> Assessment Matrix
                </h4>
                <div className="space-y-4 relative z-10">
                   {(activeTab === 'look' || activeTab === 'feel') && 'steps' in current && (current.steps as any[]).map((item, i) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all">
                        <h5 className="text-[11px] font-black text-indigo-400 uppercase mb-1">{item.id}</h5>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{item.d}</p>
                     </div>
                   ))}

                   {activeTab === 'move' && (
                     <div className="space-y-6">
                        <h5 className="text-[10px] font-black text-indigo-400 uppercase">Cervical Segments</h5>
                        {(current as any).cervical.map((m: any, i: number) => (
                           <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl mb-2">
                              <p className="text-[11px] font-black text-white">{m.m}</p>
                              <p className="text-[10px] text-slate-400 italic">{m.d}</p>
                           </div>
                        ))}
                        <h5 className="text-[10px] font-black text-indigo-400 uppercase mt-4">Lumbar Segments</h5>
                        {(current as any).lumbar.map((m: any, i: number) => (
                           <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl mb-2">
                              <p className="text-[11px] font-black text-white">{m.m}</p>
                              <p className="text-[10px] text-slate-400 italic">{m.d}</p>
                           </div>
                        ))}
                     </div>
                   )}

                   {activeTab === 'neuro' && (current as any).levels.map((lvl: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                           <h5 className="text-[11px] font-black text-indigo-400 uppercase">{lvl.l}</h5>
                           <span className="text-[9px] font-black bg-white/10 px-2 py-0.5 rounded-full text-slate-300 italic">Level</span>
                        </div>
                        <p className="text-xs text-slate-200 leading-tight mb-1 font-bold">Motor: {lvl.m}</p>
                        <p className="text-xs text-slate-400 italic leading-tight">Sensory: {lvl.d}</p>
                     </div>
                   ))}

                   {activeTab === 'special' && (current as any).tests.map((test: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <h5 className="text-[11px] font-black text-white uppercase mb-1">{test.name}</h5>
                        <p className="text-xs text-slate-400 leading-relaxed italic">{test.d}</p>
                     </div>
                   ))}
                </div>
                <Layers className="absolute -bottom-10 -right-10 text-white/5" size={240} />
             </div>

             {/* RIGHT: Actions & Clinical Judgment */}
             <div className="space-y-6">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                   <h4 className="text-lg font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter">
                      <Settings size={22} className="text-indigo-600" /> Clinical Intelligence
                   </h4>
                   <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl text-center">
                      <p className="text-sm text-indigo-900 font-bold leading-relaxed italic">
                        {activeTab === 'look' ? "A 'hair tuft' over the sacrum is a warning sign. It often hides an occult spinal dysraphism or tethered cord. Order an MRI immediately." : 
                         activeTab === 'feel' ? "If palpation reveals a focal 'step-off' in the lower lumbar spine, you are likely feeling a Grade II or higher spondylolisthesis. Confirm with standing flexion-extension films." : 
                         activeTab === 'move' ? "Loss of lumbar flexion in a young man should raise the alarm for Ankylosing Spondylitis. Perform the Schober's test and check for SI joint tenderness." : 
                         activeTab === 'neuro' ? "The EHL (Big Toe Extension) is the most sensitive test for L5 radiculopathy. It is often the only motor deficit in a central-lateral L4-L5 disc herniation." :
                         "The Slump Test is more sensitive than the Straight Leg Raise (SLR) for high-lumbar or subtle disc herniations because it creates tension across the entire neural axis."}
                      </p>
                   </div>
                </div>

                <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                   <h5 className="text-[10px] font-black text-indigo-400 uppercase mb-3 flex items-center gap-2">
                     <Info size={14} className="text-amber-500" /> Apley Diagnostic Pearl
                   </h5>
                   <p className="text-xs font-medium leading-relaxed italic opacity-90">
                      {activeTab === 'look' ? "Look at the shoulders. A high shoulder on one side and a prominent rib hump on the other is the classic signature of structural scoliosis." : 
                       activeTab === 'move' ? "In cervical myelopathy, rotation is often preserved while flexion/extension are stiff. If rotation is lost, the pathology is likely at C1-C2." : 
                       activeTab === 'neuro' ? "Babinski's sign is never normal in an adult. If the big toe goes up, the spinal cord is under pressure somewhere above the conus." :
                       "Waddell's Signs: If the patient has 'over-reaction' to light touch or pain on axial loading of the head, consider non-organic (psychological) factors in their back pain."}
                   </p>
                   <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                </div>
             </div>
          </div>

          {/* The Kinetic Chain Area */}
          <div className="bg-indigo-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-2/3">
                   <h4 className="text-2xl font-black mb-4 flex items-center gap-3 text-white">
                     <ArrowDownToLine size={24} className="opacity-70" /> The Gait Observation
                   </h4>
                   <p className="text-sm text-white/80 leading-relaxed italic">
                      "A spine exam is not complete until you see the patient walk. A 'Trendelenburg' gait suggests L5 weakness; a 'slapping' gait suggests foot drop (L4/L5); a 'broad-based' gait suggests myelopathy. The way the feet hit the floor tells the story of the nerves in the back."
                   </p>
                </div>
                <div className="md:w-1/3 flex justify-center text-center">
                   <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest">
                      Walk {" > "} X-Ray
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* Legend */}
        <footer className="mt-auto px-10 py-8 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/80">
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-indigo-600 shadow-sm"></div> Physical Signs</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-red-600 shadow-sm"></div> Neurological Deficit</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-slate-900 shadow-sm"></div> Provocative Test</div>
           <div className="flex items-center gap-2 text-slate-800 uppercase italic font-bold">Apley Spine Exam v1.0</div>
        </footer>
      </main>
    </div>
  );
};

export default SpineExaminationMode;
