import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  ChevronRight, 
  Zap, 
  Layers, 
  Target, 
  AlertTriangle, 
  Stethoscope, 
  ShieldAlert, 
  Search, 
  Scale, 
  ArrowUp,
  AlertCircle,
  Wind,
  Hand,
  Hammer,
  Settings,
  Droplets,
  HeartPulse,
  ArrowLeft,
  Maximize2,
  Anchor,
  AlertOctagon,
  Link,
  XCircle,
  CheckCircle2
} from 'lucide-react';

const PELVIC_MILLER_DATA: Record<string, any> = {
  classification: {
    title: "Young-Burgess Classification",
    niche: "Mechanism of Injury",
    items: [
      { id: "APC (I-III)", d: "Anteroposterior Compression. 'Open book' pattern. APC II/III involve sacrospinous/tuberous ligament disruption." },
      { id: "LC (I-III)", d: "Lateral Compression. Internal rotation of the hemipelvis. Most common pattern. LC II involves iliac wing (Crescent) fractures." },
      { id: "Vertical Shear (VS)", d: "High-energy vertical displacement. Complete instability (anterior and posterior)." },
      { id: "Combined (CM)", d: "Complex combination of mechanisms." }
    ],
    pearl: "APC II/III fractures have a significantly higher risk of massive hemorrhage due to the increased pelvic volume.",
    actionPlan: "Identify the mechanism. Lateral compression (LC) is often stable rotationally but can cause life-altering sacral nerve root issues."
  },
  stability: {
    title: "Pelvic Stability Logic",
    niche: "Ligamentous Integrity",
    items: [
      { id: "Anterior", d: "Symphysis pubis; accounts for only 15% of stability." },
      { id: "Posterior (Short SI)", d: "Primary restraint to transverse displacement." },
      { id: "Posterior (Long SI)", d: "Primary restraint to vertical displacement." },
      { id: "Floor (SS/ST)", d: "Sacrospinous (SS) and Sacrotuberous (ST) ligaments prevent rotation/shear." }
    ],
    pearl: "If the sacrospinous and sacrotuberous ligaments are gone, the pelvis is rotationally unstable.",
    actionPlan: "Check the SI joints on CT. Widening of >1cm indicates complete disruption of the posterior ligamentous complex."
  },
  emergency: {
    title: "The Hemodynamic Crisis",
    niche: "Acute Management",
    items: [
      { id: "Pelvic Binder", d: "Place at the level of the GREATER TROCHANTERS (not the iliac crests) to reduce volume." },
      { id: "Fluid Resuscitation", d: "Massive transfusion protocol (MTP). Avoid excessive crystalloid." },
      { id: "Angiography", d: "Indicated for arterial bleeding (Internal Iliac branches: Superior Gluteal, Internal Pudendal)." },
      { id: "Packing", d: "Extraperitoneal pelvic packing is a rapid way to control venous ooze in the OR." }
    ],
    pearl: "Most pelvic bleeding is venous (85%), but life-threatening arterial bleeding usually involves the Internal Iliac branches.",
    actionPlan: "If a binder fails to stabilize blood pressure and FAST is negative, go straight to Angiography to coil the Internal Iliac branches."
  },
  surgical: {
    title: "Fixation Strategy",
    niche: "Anterior vs. Posterior",
    items: [
      { id: "External Fixation", d: "Used for hemodynamic stabilization or as a temporary bridge." },
      { id: "SI Screws", d: "Ideal for sacral fractures or SI joint disruptions with minimal comminution." },
      { id: "Plating", d: "Mandatory for symphysis disruptions > 2.5cm or complex iliac wing fractures." }
    ],
    pearl: "Sacral 'Safe Zones' must be mapped on CT before placing percutaneous iliosacral screws to avoid nerve injury.",
    actionPlan: "Percutaneous SI screws are powerful but unforgiving. An L5-S1 nerve root injury from a misplaced screw is a common board-exam scenario."
  },
  complications: {
    title: "Post-Traumatic Risks",
    niche: "Nerve & Organ Injury",
    items: [
      { id: "L5 Nerve Root", d: "Highest risk in vertical shear injuries as it crosses the sacral ala." },
      { id: "Urogenital Injury", d: "Associated with symphysis disruption (bladder/urethral tears)." },
      { id: "VTE", d: "Pelvic trauma carries one of the highest risks for DVT/PE in orthopaedics." },
      { id: "Sexual Dysfunction", d: "Common long-term morbidity in both males and females." }
    ],
    pearl: "A 'Morel-Lavallée' lesion (internal degloving) over the iliac crest is a major risk for surgical site infection.",
    actionPlan: "Monitor for compartment syndrome of the thigh and internal degloving (Morel-Lavallée). These require aggressive management before surgery."
  }
};

const APLEY_CLASSIFICATION_DATA = [
  {
    id: 'apc',
    title: 'Anteroposterior Compression (APC)',
    mechanism: 'Head-on collision or "crush" (Open Book)',
    stages: [
      { level: 'APC I', detail: '< 2cm symphysis widening; stable.' },
      { level: 'APC II', detail: '> 2cm widening; disruption of SI ligaments (anterior); rotational instability.' },
      { level: 'APC III', detail: 'Complete SI disruption (ant + post); total instability (rotational + vertical).' }
    ],
    risk: 'Highest risk of massive venous plexus and arterial (internal iliac) bleeding.',
    color: 'border-orange-500'
  },
  {
    id: 'lc',
    title: 'Lateral Compression (LC)',
    mechanism: 'Side-impact (T-bone) accidents',
    stages: [
      { level: 'LC I', detail: 'Oblique rami fracture + ipsilateral sacral crush.' },
      { level: 'LC II', detail: 'LC I + iliac wing fracture (Crescent fracture).' },
      { level: 'LC III', detail: 'Windswept pelvis (LC on one side, APC on the other).' }
    ],
    risk: 'Risk of visceral injury (bladder/rectum) and internal rotation deformity.',
    color: 'border-blue-500'
  },
  {
    id: 'vs',
    title: 'Vertical Shear (VS)',
    mechanism: 'Fall from height; axial loading',
    stages: [
      { level: 'Complete', detail: 'Vertical displacement of the hemipelvis through SI joint and rami.' }
    ],
    risk: 'Highly unstable; highest risk of neurovascular injury (L5-S1 roots).',
    color: 'border-red-600'
  }
];

const APLEY_MANAGEMENT_STEPS = [
  {
    title: 'Initial Hemorrhage Control',
    icon: Droplets,
    points: [
      'Pelvic Binder: Place at the level of GREATER TROCHANTERS (not iliac crests).',
      'Massive Transfusion Protocol (MTP): 1:1:1 ratio of PRBC:FFP:Plt.',
      'Avoid log-rolling to prevent clot disruption.'
    ]
  },
  {
    title: 'Hemodynamic Pathway',
    icon: Activity,
    points: [
      'Stable: CT Scan for injury grading.',
      'Unstable + Positive FAST: Laparotomy + Pelvic Packing.',
      'Unstable + Negative FAST: Pelvic Embolization or Retroperitoneal Packing.'
    ]
  },
  {
    title: 'Definitive Fixation',
    icon: Anchor,
    points: [
      'Symphyseal Plating: For APC II/III injuries.',
      'Percutaneous SI Screws: For sacral fractures or SI joint disruptions.',
      'External Fixation: Temporary stability in polytrauma (Damage Control).'
    ]
  }
];

interface PelvicRingDisruptionsProps {
  onBack: () => void;
}

const PelvicRingDisruptions = ({ onBack }: PelvicRingDisruptionsProps) => {
  const [mode, setMode] = useState<'apley' | 'miller' | 'orthobullets'>('apley');
  const [activeTab, setActiveTab] = useState('classification');
  const [selectedClass, setSelectedClass] = useState(APLEY_CLASSIFICATION_DATA[0]);

  const navItems = useMemo(() => {
    if (mode === 'apley') {
      return [
        { id: 'classification', label: 'Classification', icon: Layers },
        { id: 'management', label: 'Management', icon: Activity },
        { id: 'pearls', label: 'Pearls', icon: Zap }
      ];
    } else if (mode === 'miller') {
      return [
        { id: 'classification', label: 'Young-Burgess', icon: Layers },
        { id: 'stability', label: 'Stability', icon: Scale },
        { id: 'emergency', label: 'Crisis', icon: HeartPulse },
        { id: 'surgical', label: 'Fixation', icon: Hammer },
        { id: 'complications', label: 'Morbidity', icon: AlertTriangle }
      ];
    } else {
      return [
        { id: 'triage', label: 'Initial Triage', icon: Stethoscope },
        { id: 'classification', label: 'Young-Burgess', icon: Layers },
        { id: 'management', label: 'Management', icon: Activity },
        { id: 'associated', label: 'Assoc. Injuries', icon: ShieldAlert },
      ];
    }
  }, [mode]);

  const currentMiller = useMemo(() => {
    if (mode !== 'miller') return null;
    return PELVIC_MILLER_DATA[activeTab] || Object.values(PELVIC_MILLER_DATA)[0];
  }, [mode, activeTab]);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden rounded-[3rem] border border-slate-200">
      {/* Sidebar Navigation */}
      <aside className={`w-64 text-white hidden lg:flex flex-col h-screen sticky top-0 shadow-2xl ${mode === 'apley' ? 'bg-slate-900' : mode === 'miller' ? 'bg-slate-950' : 'bg-slate-900'}`}>
        <div className="p-8 border-b border-white/5">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-6 text-[10px] font-black uppercase tracking-widest"
          >
            <ArrowLeft size={14} /> Back to Hub
          </button>
          
          <div className="flex flex-col gap-2 mb-8">
            <button 
              onClick={() => { setMode('orthobullets'); setActiveTab('triage'); }}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'orthobullets' ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-500 hover:text-white'}`}
            >
              Orthobullet Hub
            </button>
            <button 
              onClick={() => { setMode('apley'); setActiveTab('classification'); }}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'apley' ? 'bg-red-600 text-white' : 'bg-white/5 text-slate-500 hover:text-white'}`}
            >
              Apley Clinical
            </button>
            <button 
              onClick={() => { setMode('miller'); setActiveTab('classification'); }}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'miller' ? 'bg-rose-600 text-white' : 'bg-white/5 text-slate-500 hover:text-white'}`}
            >
              Miller Mastery
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 mb-2">
            <div className={`p-2 rounded-xl shadow-lg ${mode === 'apley' ? 'bg-red-600' : mode === 'miller' ? 'bg-rose-600' : 'bg-indigo-600'}`}>
              <ShieldAlert size={20} className="text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase italic">Pelvic-Master</span>
          </div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic text-center">Ring Disruption Lab</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${activeTab === item.id ? (mode === 'apley' ? 'bg-red-600' : mode === 'miller' ? 'bg-rose-600' : 'bg-indigo-600') + ' text-white shadow-xl translate-x-1' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
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
        
        <div className="p-6 bg-black/20">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <p className={`text-[10px] font-black uppercase tracking-widest mb-1 italic ${mode === 'miller' ? 'text-rose-400' : mode === 'apley' ? 'text-red-400' : 'text-indigo-400'}`}>Vascular Rule</p>
            <p className="text-[11px] text-slate-300 font-medium leading-tight italic">
              "APC II/III pattern increases pelvic volume. Doubling the radius quadruples the volume."
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
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Pelvic Ring Disruptions</h2>
                <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">
                  {mode === 'orthobullets' ? 'Orthobullets Review' : mode === 'miller' ? currentMiller?.title : 'Apley Trauma Protocol'}
                </h1>
             </div>
          </div>
          <div className="hidden md:flex gap-3">
             <div className={`px-4 py-1.5 rounded-full border flex items-center gap-2 ${mode === 'orthobullets' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : mode === 'miller' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                <Stethoscope size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest italic tracking-tight">Trauma Pathway</span>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-10">
          {mode === 'apley' && (
            <div className="space-y-8">
              {activeTab === 'classification' && (
                <div className="grid lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-4 space-y-4">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Young-Burgess Logic</h3>
                    {APLEY_CLASSIFICATION_DATA.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedClass(item)}
                        className={`w-full text-left p-6 rounded-3xl border-2 transition-all duration-300 ${
                          selectedClass.id === item.id 
                            ? `${item.color} bg-slate-900 text-white shadow-2xl scale-105` 
                            : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600 opacity-60'
                        }`}
                      >
                        <h4 className="text-sm font-black uppercase italic">{item.title}</h4>
                        <p className="text-[11px] mt-1 font-medium opacity-80">{item.mechanism}</p>
                      </button>
                    ))}
                  </div>
                  <div className="lg:col-span-8">
                    <div className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-sm relative overflow-hidden">
                      <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-2 text-slate-900">{selectedClass.title}</h2>
                      <p className="text-slate-500 text-sm font-medium mb-8">Primary Risk: <span className="text-red-600 font-bold uppercase">{selectedClass.risk}</span></p>
                      <div className="grid gap-4">
                        {selectedClass.stages.map((stage, idx) => (
                          <div key={idx} className="bg-slate-50 p-6 rounded-2xl border-l-4 border-red-600 flex justify-between items-center group hover:bg-slate-100 transition-colors">
                            <div>
                              <span className="text-[10px] font-black text-red-500 uppercase block mb-1">Injury Level</span>
                              <h5 className="text-lg font-black text-slate-900 italic">{stage.level}</h5>
                              <p className="text-sm text-slate-600 font-medium">{stage.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'management' && (
                <div className="grid md:grid-cols-3 gap-6">
                  {APLEY_MANAGEMENT_STEPS.map((step, i) => (
                    <div key={i} className="bg-white text-slate-900 p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col h-full transform transition hover:-translate-y-1">
                      <div className="bg-slate-900 text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                        <step.icon size={24} />
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tighter mb-4 italic leading-tight">{step.title}</h3>
                      <div className="space-y-4">
                        {step.points.map((pt, j) => (
                          <div key={j} className="flex gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                            <p className="text-xs font-bold text-slate-700 leading-relaxed italic">{pt}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'pearls' && (
                <div className="space-y-8">
                   <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-red-600 p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-70">The Binder Rule</h4>
                        <p className="text-2xl font-black italic leading-tight mb-4">"Closing the book reduces pelvic volume, which tamponades venous bleeding."</p>
                        <p className="text-sm font-medium opacity-80 italic">Increasing the pelvic volume by only 3cm results in a potential space that can hold the entire blood volume of an adult.</p>
                        <Maximize2 className="absolute -bottom-10 -right-10 text-white opacity-10" size={200} />
                      </div>
                      <div className="bg-slate-950 p-10 rounded-[3rem] text-white shadow-xl">
                        <h4 className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em] mb-4">Urological Note</h4>
                        <p className="text-xl font-bold italic leading-tight text-white mb-4">Assess for "High-Riding Prostate" or blood at the meatus.</p>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                          <p className="text-xs text-slate-400 leading-relaxed font-medium">Do not attempt Foley insertion if a urethral injury is suspected. Perform RUG first.</p>
                        </div>
                      </div>
                   </div>
                </div>
              )}
            </div>
          )}

          {mode === 'miller' && currentMiller && (
            <div className="space-y-8 max-w-5xl mx-auto">
               <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                  <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                    <div className="p-8 bg-rose-50 text-rose-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                      {activeTab === 'emergency' ? <Droplets size={48} className="animate-pulse" /> : <Layers size={48} />}
                    </div>
                    <div className="text-center md:text-left flex-1">
                      <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                        <span className="text-rose-600 font-black text-xs uppercase tracking-widest">{currentMiller.niche}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        <span className="text-slate-400 font-black text-xs uppercase tracking-widest italic">Miller Pelvis Lab</span>
                      </div>
                      <h3 className="text-4xl font-black text-slate-800 tracking-tighter mb-4">{currentMiller.title}</h3>
                      <p className="text-xl font-bold italic leading-relaxed text-slate-500 italic">"{currentMiller.pearl}"</p>
                    </div>
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-slate-950 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                    <h4 className="text-lg font-black mb-8 flex items-center gap-3 text-rose-400 uppercase tracking-tighter">
                      <Zap size={22} /> {activeTab === 'surgical' ? 'Technique Selection' : 'Pathology Markers'}
                    </h4>
                    <div className="space-y-4">
                      {currentMiller.items.map((item: any, i: number) => (
                        <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                          <h5 className="text-[11px] font-black text-rose-400 uppercase mb-1">{item.id || item.name}</h5>
                          <p className="text-[10px] text-slate-400 italic leading-relaxed">{item.d}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                       <h4 className="text-lg font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter">
                          <Hand size={22} className="text-rose-600" /> Surgeon's Action Plan
                       </h4>
                       <div className="p-6 bg-rose-50 border border-rose-100 rounded-3xl italic">
                          <p className="text-sm text-role-900 font-bold leading-relaxed text-center italic">
                            {currentMiller.actionPlan}
                          </p>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          )}

          {mode === 'orthobullets' && (
            <div className="space-y-8 max-w-6xl mx-auto">
               {activeTab === 'triage' && (
                 <div className="space-y-6">
                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-2xl shadow-sm">
                      <h2 className="text-red-800 font-bold text-lg flex items-center gap-2 mb-2">
                        <Droplets className="w-5 h-5" /> Hemodynamic Emergency
                      </h2>
                      <p className="text-sm text-red-700 leading-relaxed">
                        Pelvic fractures are often lethal due to retroperitoneal hemorrhage. Initial management follows ATLS: pelvic binder placement and evaluation for "Diamond of Death" (Hypothermia, Acidosis, Coagulopathy, Hypocalcemia).
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <section className="bg-white rounded-2xl border shadow-sm p-6">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                          <ClipboardItem className="w-5 h-5 text-blue-600" /> Physical Exam Focus
                        </h3>
                        <div className="space-y-3">
                          <ExamBullet title="Pelvic Stability" desc="Only test ONCE. Repeated manipulation can disrupt clots." danger />
                          <ExamBullet title="Genitourinary" desc="Blood at meatus, high-riding prostate, scrotal hematoma." />
                          <ExamBullet title="Neurovascular" desc="Check distal pulses and L5/S1 nerve root function." />
                          <ExamBullet title="Skin/Perineum" desc="Look for Morel-Lavallée lesion (internal degloving)." />
                        </div>
                      </section>
                      <section className="bg-white rounded-2xl border shadow-sm p-6">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                          <Target className="w-5 h-5 text-indigo-600" /> Pelvic Binder Mechanics
                        </h3>
                        <div className="space-y-4">
                          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                            <p className="text-sm font-bold text-indigo-800">Placement Level:</p>
                            <p className="text-xs text-indigo-700 font-bold">Greater Trochanters</p>
                          </div>
                          <ul className="text-xs text-slate-500 space-y-2">
                            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Reduces pelvic volume to tamponade venous bleeding.</li>
                            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Stabilizes fracture ends to prevent secondary clot disruption.</li>
                            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Convert APC patterns toward LC (closing the book).</li>
                          </ul>
                        </div>
                      </section>
                    </div>
                 </div>
               )}
               {activeTab === 'classification' && (
                 <div className="space-y-6">
                    <div className="bg-white rounded-2xl border shadow-sm p-6">
                      <h3 className="text-lg font-bold mb-4">Young-Burgess Classification</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ClassificationGroup 
                          type="APC" 
                          name="Antero-Posterior Compression" 
                          desc="Open Book Pattern. Tension on sacrospinous/tuberous ligaments."
                          color="rose"
                          grades={['I: <2.5cm Symphysis', 'II: >2.5cm + SS/ST disruption', 'III: Full SI disruption']}
                        />
                        <ClassificationGroup 
                          type="LC" 
                          name="Lateral Compression" 
                          desc="Internal rotation. Transverse pubic rami fractures. Risk to viscera."
                          color="emerald"
                          grades={['I: Sacral buckle', 'II: Crescent fracture', 'III: Windswept pelvis']}
                        />
                        <ClassificationGroup 
                          type="VS" 
                          name="Vertical Shear" 
                          desc="Superior displacement. Disruption of all ligaments. High vascular risk."
                          color="amber"
                          grades={['Complete anterior and posterior instability', 'Highly unstable pattern']}
                        />
                      </div>
                    </div>
                 </div>
               )}
               {activeTab === 'management' && (
                 <div className="space-y-6">
                    <div className="bg-white rounded-2xl border shadow-sm p-6">
                      <h3 className="font-bold text-lg mb-6 text-slate-900 italic uppercase tracking-tighter">Resuscitation Algorithm</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <AlgoStep icon={<ShieldAlert />} step="Pelvic Binder" color="bg-red-100 text-red-700" />
                        <AlgoStep icon={<Activity />} step="FAST / DPL" color="bg-blue-100 text-blue-700" />
                        <AlgoStep icon={<Target />} step="Ex-Fix / C-Clamp" color="bg-amber-100 text-amber-700" />
                        <AlgoStep icon={<Droplets />} step="Embo / Packing" color="bg-purple-100 text-purple-700" />
                      </div>
                    </div>
                 </div>
               )}
               {activeTab === 'associated' && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { title: "Nerve Root (L5)", detail: "Loss of dorsiflexion. High risk in SI joint disruption or sacral fractures.", icon: <Zap className="text-yellow-600" /> },
                      { title: "Urethral Injury", detail: "Blood at meatus. Retrograde Urethrogram (RUG) before catheterization.", icon: <Activity className="text-blue-600" /> },
                      { title: "Rectal Injury", detail: "Open pelvic fracture risk. Perform digital rectal exam (DRE).", icon: <XCircle className="text-red-600" /> },
                      { title: "Vascular", detail: "Superior Gluteal Artery (LC/APC) or Internal Iliac branches.", icon: <Droplets className="text-rose-600" /> }
                    ].map((inj, i) => (
                      <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm">
                        <div className="bg-slate-50 p-2 rounded-lg w-fit mb-4">{inj.icon}</div>
                        <h4 className="font-bold text-slate-800 text-sm mb-1">{inj.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{inj.detail}</p>
                      </div>
                    ))}
                 </div>
               )}
            </div>
          )}
        </div>

        <footer className="mt-auto px-10 py-8 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/80">
           <div className="flex items-center gap-2">
             <div className={`w-2.5 h-2.5 rounded shadow-sm ${mode === 'apley' ? 'bg-red-600' : mode === 'miller' ? 'bg-rose-600' : 'bg-indigo-600'}`}></div>
             Pelvic Stability
           </div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-slate-900 shadow-sm"></div> Hemodynamic Priority</div>
           <div className="flex items-center gap-2 text-slate-800 uppercase italic font-bold">Pelvic-Master Hub v1.0</div>
        </footer>
      </main>
    </div>
  );
};

// --- Helpers ---

const ExamBullet = ({ title, desc, danger = false }: { title: string; desc: string; danger?: boolean }) => (
  <div className="flex gap-3 group">
    <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${danger ? 'bg-red-500' : 'bg-slate-300'}`} />
    <div>
      <h5 className={`text-xs font-bold ${danger ? 'text-red-700' : 'text-slate-800'}`}>{title}</h5>
      <p className="text-[11px] text-slate-500">{desc}</p>
    </div>
  </div>
);

const ClassificationGroup = ({ type, name, desc, grades, color }: any) => {
  const colors: any = {
    rose: "text-rose-600 bg-rose-50 border-rose-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
    amber: "text-amber-600 bg-amber-50 border-amber-100"
  };

  return (
    <div className={`p-4 rounded-2xl border ${colors[color]}`}>
      <span className="text-xl font-black">{type}</span>
      <h5 className="font-bold text-sm mt-1">{name}</h5>
      <p className="text-[10px] mt-1 opacity-80 leading-tight mb-4">{desc}</p>
      <ul className="space-y-2">
        {grades.map((g: string, i: number) => (
          <li key={i} className="text-[10px] font-bold flex items-center gap-1">
            <div className="w-1 h-1 bg-current rounded-full" /> {g}
          </li>
        ))}
      </ul>
    </div>
  );
};

const AlgoStep = ({ icon, step, color }: any) => (
  <div className={`p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 ${color} shadow-sm border border-black/5`}>
    <div className="opacity-80">{icon}</div>
    <span className="text-[11px] font-black uppercase tracking-tight">{step}</span>
  </div>
);

const ClipboardItem = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6"/><path d="M9 16h6"/></svg>
);

export default PelvicRingDisruptions;
