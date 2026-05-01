import React, { useState, useMemo } from 'react';
import { 
  Dna, 
  Target, 
  Layers, 
  ShieldAlert, 
  Activity, 
  Bone, 
  Info, 
  User, 
  AlertCircle,
  ChevronRight,
  TrendingUp,
  Zap,
  Waves,
  Eye,
  Stethoscope,
  Radiation,
  ArrowLeft
} from 'lucide-react';

const SYNOVIAL_DATA = [
  {
    id: 'pvns',
    name: 'PVNS',
    fullName: 'Pigmented Villonodular Synovitis',
    pathology: 'Benign but aggressive proliferation of synovium with hemosiderin deposition.',
    clinical: 'Recurrent bloody effusions in a single joint (usually knee) without trauma.',
    imaging: 'MRI: "Signal void" or low signal on T1/T2 due to iron (paramagnetic effect).',
    management: 'Total synovectomy; high recurrence rate.',
    pearl: 'The synovium appears "rusty brown" or "stained" during surgery.'
  },
  {
    id: 'chondromatosis',
    name: 'Synovial Chondromatosis',
    fullName: 'Primary Synovial Chondromatosis',
    pathology: 'Metaplasia of synovium into multiple cartilaginous nodules.',
    clinical: 'Pain, swelling, and "locking" of the joint. Multiple palpable loose bodies.',
    imaging: 'X-ray: Multiple "joint mice" or "snowstorm" appearance of calcified bodies.',
    management: 'Removal of loose bodies and partial/total synovectomy.',
    pearl: 'Nodules are remarkably similar in size and shape.'
  }
];

const SECONDARY_SARCOMAS = [
  {
    type: "Pagetoid Sarcoma",
    trigger: "Malignant change in long-standing Paget's disease.",
    incidence: "< 1% of Paget's patients.",
    warning: "Sudden increase in pain or a new mass in a previously stable Pagetic bone.",
    prognosis: "Extremely poor; highly aggressive osteosarcoma variant."
  },
  {
    type: "Radiation-Induced",
    trigger: "Occurs 5–20 years after high-dose radiotherapy.",
    incidence: "Rare complication of cancer survivorship.",
    warning: "New bone pain in a previously irradiated field.",
    prognosis: "Often high-grade and difficult to treat due to damaged vascularity in the field."
  }
];

const NF1_SKELETAL = [
  { sign: "Tibial Bowing", desc: "Classic anterolateral bowing of the tibia, often leading to pseudarthrosis." },
  { sign: "Scoliosis", desc: "Short-segment, sharp 'dystrophic' curves with vertebral scalloping." },
  { sign: "Neurofibromas", desc: "Plexiform neurofibromas can invade local bone or cause hypertrophy of a limb." },
  { sign: "Sphenoid Dysplasia", desc: "Absence of the greater wing of the sphenoid (pulsating exophthalmos)." }
];

interface SynoNeuroLabProps {
  onBack: () => void;
}

const SynoNeuroLab = ({ onBack }: SynoNeuroLabProps) => {
  const [activeTab, setActiveTab] = useState('synovial');
  const [selectedSynovial, setSelectedSynovial] = useState('pvns');

  const activeSynovialData = useMemo(() => 
    SYNOVIAL_DATA.find(s => s.id === selectedSynovial) || SYNOVIAL_DATA[0], 
  [selectedSynovial]);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col h-screen sticky top-0">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 bg-purple-600 rounded-xl shadow-lg">
              <Waves size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">Syno-Neuro</span>
          </div>
          <nav className="space-y-2">
            {[
              { id: 'synovial', label: 'Synovial Disorders', icon: Activity },
              { id: 'secondary', label: 'Secondary Sarcoma', icon: Radiation },
              { id: 'neuro', label: 'Neurofibromatosis', icon: User }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-slate-800">
          <button 
                onClick={onBack}
                className="mb-4 w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={14} /> Back
          </button>
          <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
            <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1">Apley Research</p>
            <p className="text-[11px] text-slate-300">Specialized Joint & Nerve Oncology</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto no-scrollbar relative">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30 backdrop-blur-md bg-white/80">
          <div>
             <div className="flex items-center gap-4">
                <button onClick={onBack} className="lg:hidden text-slate-500"><ArrowLeft size={20} /></button>
                <div>
                   <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Advanced Orthopaedic Oncology</h2>
                   <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{activeTab.replace('_', ' ')}</h1>
                </div>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 max-w-5xl">
          
          {/* SECTION: Synovial Disorders */}
          {activeTab === 'synovial' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 space-y-4">
                  {SYNOVIAL_DATA.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSynovial(s.id)}
                      className={`w-full p-6 rounded-[2rem] border-2 text-left transition-all ${selectedSynovial === s.id ? 'bg-purple-600 border-purple-600 text-white shadow-xl translate-x-2' : 'bg-white border-slate-200 hover:border-purple-300'}`}
                    >
                      <h4 className="font-black text-lg">{s.name}</h4>
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${selectedSynovial === s.id ? 'text-purple-200' : 'text-slate-400'}`}>Joint Proliferation</p>
                    </button>
                  ))}
                </div>

                <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                  <h3 className="text-2xl font-black text-slate-800 mb-2">{activeSynovialData.fullName}</h3>
                  <p className="text-sm text-slate-500 mb-8 font-medium italic border-b pb-4">{activeSynovialData.pathology}</p>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="flex gap-4">
                         <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center shrink-0 text-purple-600"><Stethoscope size={20}/></div>
                         <div>
                            <h5 className="font-black text-[10px] text-slate-400 uppercase tracking-widest mb-1">Presentation</h5>
                            <p className="text-xs text-slate-600 font-bold leading-relaxed">{activeSynovialData.clinical}</p>
                         </div>
                      </div>
                      <div className="flex gap-4">
                         <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0 text-indigo-600"><Eye size={20}/></div>
                         <div>
                            <h5 className="font-black text-[10px] text-slate-400 uppercase tracking-widest mb-1">Imaging Clue</h5>
                            <p className="text-xs text-slate-600 font-bold leading-relaxed">{activeSynovialData.imaging}</p>
                         </div>
                      </div>
                    </div>

                    <div className="bg-slate-900 text-white p-6 rounded-3xl relative overflow-hidden">
                       <h5 className="text-[10px] font-black text-purple-400 uppercase mb-4 tracking-widest flex items-center gap-2"><Zap size={14}/> Surgical Pearl</h5>
                       <p className="text-xs text-slate-300 leading-relaxed italic relative z-10">"{activeSynovialData.pearl}"</p>
                       <Activity className="absolute bottom-[-20px] right-[-20px] text-white/5" size={120} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: Secondary Sarcomas */}
          {activeTab === 'secondary' && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
               <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                  <h3 className="text-2xl font-black mb-8 flex items-center gap-4">
                    <Radiation className="text-red-600" /> Malignant Transformation Watch
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    {SECONDARY_SARCOMAS.map((s, i) => (
                      <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col h-full">
                         <h4 className="text-xl font-black text-slate-800 mb-2">{s.type}</h4>
                         <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-6">{s.trigger}</p>
                         
                         <div className="space-y-4 flex-grow">
                            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-start gap-3">
                               <ShieldAlert className="text-red-500 mt-1" size={18} />
                               <div>
                                  <h5 className="text-[10px] font-black text-slate-400 uppercase mb-1">Danger Sign</h5>
                                  <p className="text-xs font-bold text-slate-700">{s.warning}</p>
                               </div>
                            </div>
                            <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
                               <span className="text-[10px] font-bold text-slate-400 uppercase">Prognosis</span>
                               <span className="text-xs font-black text-red-400">{s.prognosis}</span>
                            </div>
                         </div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="bg-amber-50 border border-amber-200 p-8 rounded-[2.5rem] flex items-center gap-6">
                  <AlertCircle className="text-amber-600 shrink-0" size={32} />
                  <p className="text-sm text-amber-900 leading-relaxed font-medium">
                    <strong>The Paget's Pivot:</strong> Paget's disease is usually benignly hyperactive. However, if a patient with established Paget's presents with a sudden, localized increase in pain and a rising Alkaline Phosphatase, a sarcomatous change must be excluded urgently.
                  </p>
               </div>
            </div>
          )}

          {/* SECTION: Neurofibromatosis */}
          {activeTab === 'neuro' && (
            <div className="space-y-8 animate-in zoom-in-95 duration-500">
               <div className="bg-slate-900 text-white p-10 rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row gap-10">
                  <div className="md:w-1/2 relative z-10">
                     <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-purple-600 rounded-2xl"><Dna size={32}/></div>
                        <div>
                           <h3 className="text-3xl font-black tracking-tighter">Neurofibromatosis (NF1)</h3>
                           <p className="text-xs font-bold text-purple-400 uppercase tracking-widest">Type 1 / von Recklinghausen</p>
                        </div>
                     </div>
                     <p className="text-slate-400 text-sm leading-relaxed mb-6 italic">
                       "NF1 is a systemic neurocutaneous disorder. While known for its skin findings (Café-au-lait spots), its orthopaedic manifestations are often life-altering and difficult to treat."
                     </p>
                     <div className="flex gap-3">
                        <span className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">AD Inheritance</span>
                        <span className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">17q11.2 Mutation</span>
                     </div>
                  </div>
                  <div className="md:w-1/2 grid grid-cols-1 gap-3 relative z-10">
                     {NF1_SKELETAL.map((item, i) => (
                       <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
                          <h5 className="text-xs font-black text-purple-300 uppercase mb-1">{item.sign}</h5>
                          <p className="text-[11px] text-slate-400">{item.desc}</p>
                       </div>
                     ))}
                  </div>
                  <User className="absolute top-[-40px] right-[-40px] text-white/5" size={400} />
               </div>

               <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex items-center gap-10">
                  <div className="hidden sm:flex w-24 h-24 bg-purple-50 text-purple-600 rounded-3xl items-center justify-center shrink-0">
                     <Target size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 mb-2 italic">The Dystrophic Curve</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      Orthopaedic surgeons must recognize the difference between 'non-dystrophic' and 'dystrophic' scoliosis in NF1. Dystrophic curves are short, sharp, and involve severe vertebral wedging, requiring early and aggressive fusion.
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 text-[10px] font-black uppercase rounded-full">
                       High risk of progression
                    </div>
                  </div>
               </div>
            </div>
          )}

        </div>

        {/* Legend */}
        <footer className="mt-auto px-10 py-6 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white">
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-purple-500"></div> Synovial Proliferation</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-red-500"></div> Malignant Pivot</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-slate-800"></div> Systemic Syndrome</div>
        </footer>
      </main>
    </div>
  );
};

export default SynoNeuroLab;
