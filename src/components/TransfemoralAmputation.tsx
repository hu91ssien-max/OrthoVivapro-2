import React, { useState, useMemo } from 'react';
import { 
  Scissors, 
  Activity, 
  Zap, 
  Waves,
  Target as TargetIcon, 
  ShieldAlert, 
  ChevronRight, 
  Info,
  Dna,
  Wind,
  Layers,
  ArrowUpRight,
  Stethoscope,
  Weight,
  AlertCircle,
  ArrowUp,
  Search as SearchIcon,
  ArrowLeft,
  Scaling,
  Hammer,
  ClipboardList,
  Heart,
  CheckCircle2,
  AlertTriangle,
  Bone
} from 'lucide-react';

const AKA_DATA = {
  indications: {
    title: "Clinical Thresholds",
    items: [
      { id: "Vascular", label: "End-Stage Peripheral Vascular Disease (PVD)", desc: "Non-reconstructible ischemia with rest pain or tissue loss." },
      { id: "Infection", label: "Necrotizing Fasciitis / Gas Gangrene", desc: "Life-over-limb scenarios where sepsis cannot be controlled." },
      { id: "Trauma", label: "Mangled Extremity (MESS > 7)", desc: "Extensive soft tissue loss, nerve avulsion, and warm ischemia time." },
      { id: "Tumor", label: "Bone/Soft Tissue Sarcomas", desc: "When limb-salvage is oncologically unsafe." }
    ],
    actionPlan: "Perform a thorough physiological assessment. Optimize cardiac and nutritional status before proceeding to major limb ablation.",
    yieldPearl: "The decision for AKA over BKA often hinges on the presence of a knee flexion contracture or inadequate distal perfusion."
  },
  technique: {
    title: "The Surgical Sequence",
    steps: [
      { id: 1, name: "Skin Flaps", detail: "Ideally equal anterior and posterior 'fish-mouth' flaps. Flap length should be ~1/2 the diameter of the limb.", icon: Scissors },
      { id: 2, name: "Vascular Control", detail: "The femoral artery and vein are isolated in Hunter's canal. Double-ligate and transfix.", icon: Waves },
      { id: 3, name: "Nerve Management", detail: "Traction neurectomy of Sciatic nerve. Pull distal, sharp transection, allow to retract.", icon: Zap },
      { id: 4, name: "Bone Cut", detail: "Transect femur 10-12cm above joint line. Preserve 10-15cm of residual femur.", icon: TargetIcon }
    ],
    actionPlan: "Nerve management is paramount. Always pull the sciatic nerve distally before cutting to ensure it retracts well above the bone end.",
    yieldPearl: "Improper nerve management leads to symptomatic neuromas, which are the leading cause of residual limb pain."
  },
  balancing: {
    title: "Muscle Balancing",
    logic: "The goal is to maintain the femur in a neutral, adducted position.",
    components: [
      { name: "Myodesis (Gold Standard)", text: "Directly suturing Adductor Magnus to bone via drill holes. Mandatory for control." },
      { name: "Myoplasty", text: "Suturing antagonistic muscles (Flexors/Extensors) to each other over the bone." }
    ],
    pearl: "If the Adductor Magnus is not reattached, the Abductors will pull the femur into abduction.",
    actionPlan: "Ensure drill holes are placed in the lateral cortex of the femur for the adductor myodesis to maximize the adductor lever arm.",
    yieldPearl: "Myodesis is superior to myoplasty for stable prosthetic gait and prevention of femur drift."
  },
  postop: {
    title: "Prosthetic Goals",
    risks: [
      { type: "Phantom Pain", mgt: "Multimodal analgesia, gabapentin, and early desensitization." },
      { type: "Contractures", mgt: "Avoid pillows under the stump; emphasize prone lying." },
      { type: "Wound Dehiscence", mgt: "Rigid dressings or soft compression depending on vascularity." }
    ],
    actionPlan: "Early mobilization and prone positioning are critical to prevent hip flexion contractures that preclude prosthetic use.",
    yieldPearl: "Energy expenditure increases by 65% for transfemoral amputees. Cardiac clearance is often the rate-limiting step."
  }
};

const AMP_DATA: Record<string, any> = {
  surgical: {
    title: "Surgical Principles",
    niche: "Technique & Nerve Management",
    points: [
      { id: "Nerve Management", d: "Perform traction neurectomy to keep neuromas away from the weight-bearing surface." },
      { id: "Bone Leveling", d: "Smooth distal femur bevelling. Goal: Preserve max length for lever arm." },
      { id: "Flap Design", d: "Equal flaps are standard, though design varies based on skin perfusion." }
    ],
    pearl: "Length preservation is critical. Every 1cm lost significantly decreases mechanical efficiency.",
    actionPlan: "Nerves must be cut under tension. This allows the proximal end to retract away from the distal bone and prosthetic interface.",
    yieldPearl: "The blood supply to the flaps is key. In peripheral vascular disease, posterior flaps may be preferred due to better perfusion."
  },
  biomechanics: {
    title: "The Adductor Rule",
    niche: "Muscular Balance",
    points: [
      { id: "Myodesis", d: "Attaching muscle directly to bone. Essential for restoring coronal plane stability." },
      { id: "Myoplasty", d: "Muscle to muscle. Insufficient for the high-torque environment of the thigh." },
      { id: "Abduction Deformity", d: "Failure to re-anchor adductors leads to a Trendelenburg lurch." }
    ],
    pearl: "The Adductor Magnus provides 70% of adductor power. Without its myodesis, stability is lost.",
    actionPlan: "Identify the Adductor Magnus. Drill through the lateral/medial femur to perform a true myodesis to restore the power of the medial pull.",
    yieldPearl: "If the adductor myodesis fails, the patient will assume an abducted gait, resulting in a 'medial lean' to compensate."
  },
  prosthetics: {
    title: "Prosthetics & Energy",
    niche: "Rehabilitation Dynamics",
    points: [
      { id: "Energy Cost", d: "Walking with AKA prosthesis requires 65% more O2 consumption (vs 25% for BKA)." },
      { id: "Ischial Containment", d: "Standard socket design. Locks ischium inside to prevent lateral shift." },
      { id: "Knee Units", d: "Microprocessor knees (C-leg) allow varied cadence/stumble recovery." }
    ],
    pearl: "Energy expenditure is why CAD patients may fail to walk with a transfemoral prosthesis.",
    actionPlan: "In ischial containment sockets, the femur is held in an adducted position. This places the abductors at a mechanical advantage.",
    yieldPearl: "Plug-fit sockets (historical) are no longer used because they cause terminal congestion; ischial containment is the gold standard."
  },
  complications: {
    title: "Post-Op Complications",
    niche: "Residual Limb Health",
    points: [
      { id: "Flexion Contracture", d: "Most common deformity. Prevented by early prone positioning." },
      { id: "Neuromas", d: "Occur if nerves are not resected high enough or tethered to scar." },
      { id: "Bony Overgrowth", d: "More common in pediatric patients; usually requires revision." }
    ],
    pearl: "Phantom Limb Pain is central; Residual Limb Pain (neuroma) is peripheral.",
    actionPlan: "Monitor for hip flexion contractures. These are often missed but make prosthetic fitting nearly impossible due to the anterior shift of the center of mass.",
    yieldPearl: "A patient with a transfemoral amputation needs a VO2 max that can handle a 65% increase in effort just to walk at a normal pace."
  }
};

interface TransfemoralAmputationProps {
  onBack: () => void;
}

const TransfemoralAmputation = ({ onBack }: TransfemoralAmputationProps) => {
  const [mode, setMode] = useState<'apley' | 'miller' | 'orthobullets'>('apley');
  const [activeTab, setActiveTab] = useState('technique');

  const navItems = mode === 'apley' 
    ? [
        { id: 'indications', label: 'Indications', icon: Activity },
        { id: 'technique', label: 'Sequence', icon: Layers },
        { id: 'balancing', label: 'Balancing', icon: Dna },
        { id: 'postop', label: 'Prosthetics', icon: ShieldAlert }
      ]
    : mode === 'miller'
    ? [
        { id: 'surgical', label: 'Technique', icon: Layers },
        { id: 'biomechanics', label: 'Biomechanics', icon: Activity },
        { id: 'prosthetics', label: 'Prosthetics', icon: Wind },
        { id: 'complications', label: 'Complications', icon: ShieldAlert }
      ]
    : [
        { id: 'planning', label: 'Pre-Op Planning', icon: Stethoscope },
        { id: 'technique', label: 'Surgical Steps', icon: Hammer },
        { id: 'muscles', label: 'Muscle Stabilization', icon: Dna },
        { id: 'prosthetics', label: 'Complications & Rehab', icon: Activity },
      ];

  const current = useMemo(() => {
    if (mode === 'orthobullets') return null; // Handled separately in OrthobulletsView

    const rawData = mode === 'apley' ? AKA_DATA : AMP_DATA;
    const item = rawData[activeTab] || Object.values(rawData)[0];
    
    // Normalize the data for rendering
    let normalizedPoints = [];
    if (item.points) {
      normalizedPoints = item.points;
    } else if (item.items) {
      normalizedPoints = item.items.map((it: any) => ({ id: it.label, d: it.desc }));
    } else if (item.steps) {
      normalizedPoints = item.steps.map((it: any) => ({ id: it.name, d: it.detail }));
    } else if (item.components) {
      normalizedPoints = item.components.map((it: any) => ({ id: it.name, d: it.text }));
    } else if (item.risks) {
      normalizedPoints = item.risks.map((it: any) => ({ id: it.type, d: it.mgt }));
    }

    return {
      ...item,
      points: normalizedPoints,
      niche: item.niche || "Clinical Perspective",
      pearl: item.pearl || (item.logic ? item.logic : "Standard clinical practice for optimal outcomes."),
      actionPlan: item.actionPlan || "Follow standardized surgical protocols for optimal limb health and prosthetic compatibility.",
      yieldPearl: item.yieldPearl || "Always prioritize length preservation and secure myodesis in transfemoral amputations."
    };
  }, [mode, activeTab]);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden rounded-[3rem] border border-slate-200">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-950 text-white hidden lg:flex flex-col h-screen sticky top-0 shadow-2xl">
        <div className="p-8 border-b border-white/5">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-6 text-[10px] font-black uppercase tracking-widest"
          >
            <ArrowLeft size={14} /> Back to Hub
          </button>
          
          <div className="flex flex-col gap-2 mb-8">
            <button 
              onClick={() => { setMode('orthobullets'); setActiveTab('planning'); }}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'orthobullets' ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-500 hover:text-white'}`}
            >
              Orthobullet Hub
            </button>
            <button 
              onClick={() => { setMode('apley'); setActiveTab('technique'); }}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'apley' ? 'bg-red-600 text-white' : 'bg-white/5 text-slate-500 hover:text-white'}`}
            >
              Apley Clinical
            </button>
            <button 
              onClick={() => { setMode('miller'); setActiveTab('surgical'); }}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'miller' ? 'bg-orange-600 text-white' : 'bg-white/5 text-slate-500 hover:text-white'}`}
            >
              Miller Mastery
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 mb-2">
            <div className={`p-2 rounded-xl shadow-lg ${mode === 'apley' ? 'bg-red-600' : mode === 'miller' ? 'bg-orange-600' : 'bg-indigo-600'}`}>
              <Scissors size={20} className="text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase italic">Amp-Master</span>
          </div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic text-center">Joint Ablation Lab</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${activeTab === item.id ? (mode === 'apley' ? 'bg-red-600' : mode === 'miller' ? 'bg-orange-600' : 'bg-indigo-600') + ' text-white shadow-xl translate-x-1' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} />
                  {item.label}
                </div>
                <ChevronRight size={14} className={activeTab === item.id ? 'opacity-100' : 'opacity-0'} />
              </button>
            );
          })}
        </nav>

        
        <div className="p-6 bg-slate-900/50">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1 italic">Energy Axiom</p>
            <p className="text-[11px] text-slate-300 font-medium leading-tight italic">
              "Transfemoral = 65% more O2. Transtibial = 25%. Always check the heart before the limb."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto no-scrollbar relative bg-slate-50">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
             <button onClick={onBack} className="lg:hidden p-2 hover:bg-slate-100 rounded-xl">
                <ArrowLeft size={20} />
             </button>
             <div>
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Amputation & Prosthetics</h2>
                <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{mode === 'orthobullets' ? activeTab : current.title}</h1>
             </div>
          </div>
          <div className="hidden md:flex gap-3">
             <div className={`px-4 py-1.5 rounded-full border flex items-center gap-2 ${mode === 'orthobullets' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-orange-50 text-orange-700 border-orange-100'}`}>
                <Stethoscope size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest italic tracking-tight">Clinical Pathway</span>
             </div>
          </div>
        </header>

        {mode === 'orthobullets' ? (
          <div className="p-6 md:p-10 space-y-8 max-w-6xl mx-auto w-full">
            {activeTab === 'planning' && <PlanningView />}
            {activeTab === 'technique' && <TechniqueView />}
            {activeTab === 'muscles' && <MuscleView />}
            {activeTab === 'prosthetics' && <RehabView />}
          </div>
        ) : (
          <div className="p-6 md:p-10 space-y-8 max-w-5xl mx-auto w-full">
            
            {/* Main Visual/Hero Card */}
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="p-8 bg-orange-50 text-orange-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                   {activeTab === 'complications' || activeTab === 'postop' ? <ShieldAlert size={48} className="text-orange-600" /> : <TargetIcon size={48} className="text-orange-600" />}
                </div>
                <div className="text-center md:text-left flex-1">
                   <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                     <span className="text-orange-600 font-black text-xs uppercase tracking-widest">{current.niche}</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                     <span className="text-slate-400 font-black text-xs uppercase tracking-widest italic">Miller Rehab Lab</span>
                   </div>
                   <h3 className="text-4xl font-black text-slate-800 tracking-tighter mb-4">{current.title}</h3>
                   <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{current.pearl}"</p>
                </div>
             </div>
             {/* Background Decoration */}
             <div className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50 flex items-center justify-center">
                <Weight size={400} />
             </div>
          </div>

          {/* Core Content Grid */}
          <div className="grid md:grid-cols-2 gap-8">
             {/* LEFT: Structural Data */}
             <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                <h4 className="text-lg font-black mb-8 flex items-center gap-3 text-orange-400 uppercase tracking-tighter">
                   <Zap size={22} /> Critical Parameters
                </h4>
                <div className="space-y-4 relative z-10">
                   {current.points.map((item: any, i: number) => (
                     <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl transition-all hover:bg-white/10">
                        <div className="flex justify-between items-center mb-1">
                           <h5 className="text-[11px] font-black text-orange-400 uppercase">{item.id}</h5>
                        </div>
                        <p className="text-[10px] text-slate-400 italic leading-relaxed">{item.d}</p>
                     </div>
                   ))}
                </div>
                <SearchIcon className="absolute -bottom-10 -right-10 text-white/5" size={240} />
             </div>

             {/* RIGHT: Actions & Clinical Judgment */}
             <div className="space-y-6">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                   <h4 className="text-lg font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter">
                      <ArrowUpRight size={22} className="text-orange-600" /> Surgeon's Action Plan
                   </h4>
                   <div className="p-6 bg-orange-50 border border-orange-100 rounded-3xl">
                      <p className="text-sm text-orange-900 font-bold leading-relaxed italic text-center">
                        {current.actionPlan}
                      </p>
                   </div>
                </div>

                <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                   <h5 className="text-[10px] font-black text-orange-400 uppercase mb-3 flex items-center gap-2">
                     <AlertCircle size={14} className="text-amber-500" /> Board Yield Pearl
                   </h5>
                   <p className="text-xs font-medium leading-relaxed italic opacity-90">
                      {current.yieldPearl}
                   </p>
                   <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                </div>
             </div>
          </div>

          {/* Biomechanical Graphic Area - Muscle Pull Visualizer */}
          <div className="bg-orange-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-2/3">
                   <h4 className="text-2xl font-black mb-4 flex items-center gap-3">
                     <ArrowUp size={24} className="text-orange-300" /> Adduction Restoration
                   </h4>
                   <p className="text-sm text-orange-100 leading-relaxed italic">
                      "Because the abductor muscles (Gluteus Medius/Minimus) are rarely cut, the natural tendency of the transfemoral residual limb is to drift into **Abduction**. Surgical restoration of the **Adductor Magnus** pull via myodesis is the only way to keep the femur vertical."
                   </p>
                </div>
                <div className="md:w-1/3 flex justify-center text-center">
                   <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest">
                      Myodesis {" > "} Myoplasty
                   </div>
                </div>
             </div>
          </div>

        </div>
      )}

        {/* Legend/Footer */}
        <footer className="mt-auto px-10 py-8 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/80">
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-orange-600 shadow-sm"></div> Surgical Objective</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-slate-900 shadow-sm"></div> Biomechanical Goal</div>
           <div className="flex items-center gap-2 text-slate-800 uppercase italic font-bold">Amp-Master Hub v1.0</div>
        </footer>
      </main>
    </div>
  );
};

export default TransfemoralAmputation;

// --- Orthobullets Hub Sub-views ---

const PlanningView = () => {
  return (
    <div className="space-y-6">
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-2xl shadow-sm">
        <h2 className="text-red-800 font-bold text-lg flex items-center gap-2 mb-2">
          <ShieldAlert className="w-5 h-5" /> Indications & Triage
        </h2>
        <p className="text-sm text-red-700 leading-relaxed">
          The decision for AKA in trauma often hinges on the <strong>Mangled Extremity Severity Score (MESS)</strong>. A score of &ge; 7 is highly predictive of amputation. Other indications include non-reconstructible vascular injury, gas gangrene, or chronic osteomyelitis.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Scaling className="w-5 h-5 text-blue-600" /> Ideal Level for Prosthesis
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm font-bold text-blue-800">10-15 cm Proximal to Joint Line</p>
              <p className="text-xs text-blue-700 mt-1">Leaves room for the internal prosthetic knee joint while providing a long enough lever arm for adductor myodesis.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Energy Cost</p>
                <p className="text-sm font-bold text-red-600">+65% to 100%</p>
                <p className="text-[10px] text-slate-500 italic">Increase in metabolic demand compared to normal gait.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Minimum Length</p>
                <p className="text-sm font-bold text-slate-800">10-12 cm</p>
                <p className="text-[10px] text-slate-500 italic">Measured from greater trochanter for socket suspension.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400" /> Vascular Assessment
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <p className="text-sm">Nutrition: <strong>Albumin &gt; 3.0 g/dL</strong> and <strong>TLC &gt; 1500</strong> are required for healing.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <p className="text-sm">Tissue Oxygenation: TcPO2 <strong>&gt; 40 mmHg</strong> for successful distal healing.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <p className="text-sm">ABI &gt; 0.45 required for primary healing in non-diabetics.</p>
              </li>
            </ul>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Activity className="w-32 h-32" />
          </div>
        </section>
      </div>
    </div>
  );
};

const TechniqueView = () => {
  const steps = [
    { title: "Skin Flaps", desc: "Equal anterior and posterior flaps (fish-mouth) or long posterior flap." },
    { title: "Nerve Management", desc: "Sciatic nerve is pulled distally, ligated (due to large vasa nervorum), and cut to allow 3-5cm retraction." },
    { title: "Vascular Control", desc: "Identify and double ligate Superficial Femoral Artery and Vein." },
    { title: "Bone Preparation", desc: "Transverse osteotomy with careful rasping of edges to prevent pressure points." },
    { title: "Muscle Stabilization", desc: "Perform Adductor Myodesis through drill holes to maintain femur in adduction." },
    { title: "Closure", desc: "Deep drain placement and multi-layer closure avoiding tension." }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="bg-slate-800 p-6 text-white">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <ClipboardList className="text-red-400 w-5 h-5" /> Operative Workflow
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                <div className="bg-red-100 text-red-700 w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center gap-4">
        <AlertTriangle className="text-amber-600 shrink-0" />
        <p className="text-xs text-amber-800 italic">
          "<strong>Traction Neurectomy:</strong> Pulling the nerve before cutting ensures the resulting neuroma forms deep in the muscle bed rather than at the scar line."
        </p>
      </div>
    </div>
  );
};

const MuscleView = () => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl border shadow-sm p-6 border-l-4 border-l-red-600">
          <h3 className="font-bold text-red-700 flex items-center gap-2 mb-4">
            <Dna className="w-5 h-5" /> Myodesis (Gold Standard)
          </h3>
          <p className="text-sm text-slate-600 mb-4 font-medium">Suturing muscle directly to bone through drill holes.</p>
          <ul className="space-y-3">
            <BenefitItem text="Prevents lateral drift and abduction deformity." />
            <BenefitItem text="Maintains the mechanical advantage of the adductor magnus." />
            <BenefitItem text="Superior prosthetic control and gait efficiency." />
            <BenefitItem text="Essential for the Adductor Magnus to keep femur in anatomical alignment." />
          </ul>
        </section>

        <section className="bg-white rounded-2xl border shadow-sm p-6 border-l-4 border-l-blue-600">
          <h3 className="font-bold text-blue-700 flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5" /> Myoplasty
          </h3>
          <p className="text-sm text-slate-600 mb-4 font-medium">Suturing antagonist muscles to each other over the bone end.</p>
          <ul className="space-y-3">
            <BenefitItem text="Faster to perform; useful in unstable patients." />
            <BenefitItem text="Provides soft tissue padding over bone." />
            <li className="text-[11px] text-red-500 font-bold bg-red-50 p-2 rounded-lg list-none">
              <AlertCircle className="inline w-3 h-3 mr-1" /> Risk: Does not prevent muscle atrophy as effectively as myodesis.
            </li>
          </ul>
        </section>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
        <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-4">The Abduction Deformity</h4>
        <p className="text-sm text-slate-300 leading-relaxed">
          Without myodesis of the <strong>Adductor Magnus</strong>, the <strong>Gluteus Medius and Minimus</strong> pull the femur into an abducted and flexed position. This results in a poor mechanical lever and significant gait instability.
        </p>
      </div>
    </div>
  );
};

const RehabView = () => {
  const complications = [
    { name: "Phantom Limb Pain", stat: "80%", risk: "Treated with gabapentin, mirror therapy, or TENS." },
    { name: "Hip Flexion Contracture", stat: "Common", risk: "Prevent with prone positioning and early stretching." },
    { name: "Bone Overgrowth", stat: "Pediatric", risk: "Requires surgical revision (not an issue in adults)." },
    { name: "Symptomatic Neuroma", stat: "10-25%", risk: "Usually result of poor traction neurectomy technique." }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {complications.map((c) => (
          <div key={c.name} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <h4 className="font-bold text-slate-800 text-sm mb-1">{c.name}</h4>
            <div className="text-red-600 font-bold text-lg mb-2">{c.stat}</div>
            <p className="text-[10px] text-slate-500 leading-relaxed">{c.risk}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <h3 className="font-bold flex items-center gap-2 mb-4">
          <TargetIcon className="w-5 h-5 text-red-600" /> K-Levels (Functional Levels)
        </h3>
        <div className="space-y-3">
          <KLevel level="K0" desc="No ability to ambulate or transfer safely." />
          <KLevel level="K1" desc="Household ambulator; level surfaces." />
          <KLevel level="K2" desc="Limited community ambulator; curbs/stairs." />
          <KLevel level="K3" desc="Community ambulator; variable cadence (most active adults)." />
          <KLevel level="K4" desc="High activity; children, athletes, or active veterans." />
        </div>
      </div>
    </div>
  );
};

// --- Helpers ---

const BenefitItem = ({ text }: { text: string }) => (
  <li className="flex gap-3 text-xs text-slate-600">
    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
    <span>{text}</span>
  </li>
);

const KLevel = ({ level, desc }: { level: string; desc: string }) => (
  <div className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-colors border-b last:border-0">
    <span className="font-black text-slate-800 w-12">{level}</span>
    <span className="text-sm text-slate-600 flex-1">{desc}</span>
  </div>
);
