import React, { useState } from 'react';
import { 
  Activity, 
  Target, 
  ShieldAlert, 
  Microscope, 
  Bone, 
  Info, 
  AlertCircle,
  ChevronRight,
  TrendingUp,
  Zap,
  Menu,
  X,
  Droplets,
  Database,
  Thermometer,
  Stethoscope,
  MoveVertical,
  ArrowLeft
} from 'lucide-react';

const SECTIONS = [
  { id: 'hematology', label: 'Hema-Oncology', icon: Droplets },
  { id: 'spine', label: 'Spinal Metastasis', icon: MoveVertical },
  { id: 'metabolic', label: 'The Metabolic Mimic', icon: Activity },
  { id: 'emergencies', label: 'Onco-Emergencies', icon: ShieldAlert },
];

const HEMATOLOGY_DATA = {
  lymphoma: {
    title: "Primary Lymphoma of Bone",
    age: "40 - 60 years",
    features: "Permeative destruction; often presents with a large soft tissue mass despite minimal bone destruction.",
    apley_pearl: "Usually Non-Hodgkin Lymphoma. Must differentiate from Ewing's based on age (older) and IHC staining.",
    management: "Primarily Chemotherapy and Radiotherapy. Surgery reserved for pathological fractures."
  },
  leukaemia: {
    title: "Skeletal Leukaemia",
    age: "Children (Commonest childhood malignancy)",
    features: "Metaphyseal radiolucent bands (Leukaemic lines), generalized osteopenia, and periosteal reaction.",
    apley_pearl: "May present as 'pseudorheumatoid' with joint pain and fever. Bone marrow biopsy is diagnostic.",
    management: "Systemic chemotherapy is the cornerstone."
  }
};

const SINS_CRITERIA = [
  { category: "Location", options: "Junctional (3 pts), Mobile (2 pts), Semi-rigid (1 pt), Rigid (0 pts)" },
  { category: "Pain", options: "Mechanical (3 pts), Occasional (1 pt), Painless (0 pts)" },
  { category: "Bone Lesion", options: "Lytic (2 pts), Mixed (1 pt), Blastic (0 pts)" },
  { category: "Alignment", options: "Subluxation/Kyphosis (4 pts), Normal (0 pts)" },
  { category: "Body Collapse", options: ">50% (3 pts), <50% (2 pts), No (0 pts)" },
  { category: "Posterolateral", options: "Bilateral (3 pts), Unilateral (1 pt), No (0 pts)" }
];

interface MetaLabProps {
  onBack: () => void;
}

const MetaLab = ({ onBack }: MetaLabProps) => {
  const [activeTab, setActiveTab] = useState('hematology');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-3 bg-red-600 text-white rounded-full shadow-lg"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 bg-red-600 rounded-xl shadow-lg">
              <Database size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">Meta-Lab</span>
          </div>
          
          <nav className="flex-1 space-y-2">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => { setActiveTab(section.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === section.id ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                <section.icon size={18} />
                {section.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-800">
            <button 
                  onClick={onBack}
                  className="mb-4 w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={14} /> Back
            </button>
            <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
              <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Apley Final Review</p>
              <p className="text-[11px] text-slate-300 font-medium">Hematology & Spinal Metastases</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto no-scrollbar relative">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="lg:hidden text-slate-500"><ArrowLeft size={20} /></button>
            <div>
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Specialized Bone Oncology</h2>
              <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{activeTab.replace('-', ' ')}</h1>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 max-w-5xl">
          
          {/* SECTION: Hematology */}
          {activeTab === 'hematology' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid md:grid-cols-2 gap-8">
                {Object.keys(HEMATOLOGY_DATA).map(key => (
                  <div key={key} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-red-50 text-red-600 rounded-2xl"><Microscope size={24}/></div>
                      <span className="text-[10px] font-black bg-red-100 text-red-700 px-3 py-1 rounded-full uppercase tracking-widest">{HEMATOLOGY_DATA[key as keyof typeof HEMATOLOGY_DATA].age}</span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-4">{HEMATOLOGY_DATA[key as keyof typeof HEMATOLOGY_DATA].title}</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <h5 className="text-[10px] font-black text-slate-400 uppercase mb-1">Radiology Features</h5>
                         <p className="text-xs font-bold text-slate-700">{HEMATOLOGY_DATA[key as keyof typeof HEMATOLOGY_DATA].features}</p>
                      </div>
                      <div className="p-4 bg-red-900 text-white rounded-2xl flex gap-3 shadow-lg shadow-red-900/20">
                         <Info className="text-red-400 shrink-0" size={16} />
                         <p className="text-xs italic opacity-90 leading-relaxed font-medium">"{HEMATOLOGY_DATA[key as keyof typeof HEMATOLOGY_DATA].apley_pearl}"</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: Spinal Metastasis (SINS) */}
          {activeTab === 'spine' && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
               <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-red-100 text-red-600 rounded-2xl"><MoveVertical size={24}/></div>
                    <h3 className="text-2xl font-black text-slate-800">Spinal Instability Neoplastic Score (SINS)</h3>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                     {SINS_CRITERIA.map((item, i) => (
                       <div key={i} className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                          <h5 className="text-[10px] font-black text-red-600 uppercase mb-2 tracking-widest">{item.category}</h5>
                          <p className="text-[11px] font-bold text-slate-600 leading-tight">{item.options}</p>
                       </div>
                     ))}
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                     <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-2xl text-center">
                        <p className="text-[10px] font-black uppercase">0 - 6</p>
                        <p className="text-xs font-bold">Stable</p>
                     </div>
                     <div className="p-4 bg-amber-50 text-amber-800 border border-amber-100 rounded-2xl text-center">
                        <p className="text-[10px] font-black uppercase">7 - 12</p>
                        <p className="text-xs font-bold">Potentially Unstable</p>
                     </div>
                     <div className="p-4 bg-red-600 text-white rounded-2xl text-center">
                        <p className="text-[10px] font-black uppercase">13 - 18</p>
                        <p className="text-xs font-bold">Unstable (Surgical)</p>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* SECTION: The Metabolic Mimic (Brown Tumor) */}
          {activeTab === 'metabolic' && (
            <div className="lg:col-span-12 animate-in zoom-in-95 duration-500">
               <div className="bg-slate-900 text-white p-12 rounded-[3.5rem] relative overflow-hidden flex flex-col md:flex-row gap-10 items-center">
                  <div className="md:w-1/2 relative z-10">
                     <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-red-600 rounded-2xl shadow-lg"><Activity size={32}/></div>
                        <h3 className="text-3xl font-black tracking-tighter italic">The Brown Tumor</h3>
                     </div>
                     <p className="text-slate-400 text-sm leading-relaxed mb-8">
                        "Brown tumors are NOT true neoplasms but osteoclast-heavy lesions resulting from <strong>Hyperparathyroidism</strong>. They are the great mimic of Giant Cell Tumors."
                     </p>
                     <div className="space-y-4">
                        <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                           <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center font-black text-indigo-400">Ca+</div>
                           <div>
                              <p className="text-[10px] font-black uppercase text-slate-500">The Lab Clue</p>
                              <p className="text-xs font-bold">Elevated Calcium & PTH. Normal in true GCT.</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="md:w-1/2 p-8 bg-white/5 rounded-[2.5rem] border border-white/10 relative z-10">
                     <h4 className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-4">Apley Diagnostic Rule</h4>
                     <p className="text-xs text-slate-300 leading-relaxed italic opacity-80">
                       "Always check biochemical profiles before operating on an 'aggressive' lytic lesion of the jaw or hands. Treating the hyperparathyroidism often leads to spontaneous regression of the Brown tumor."
                     </p>
                  </div>
                  <Bone className="absolute top-[-50px] right-[-50px] text-white/5" size={400} />
               </div>
            </div>
          )}

          {/* SECTION: Onco-Emergencies */}
          {activeTab === 'emergencies' && (
            <div className="space-y-8 animate-in slide-in-from-bottom duration-500 pb-10">
               <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col">
                     <h4 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3 tracking-tighter">
                       <Zap className="text-red-600" /> Hypercalcaemia
                     </h4>
                     <div className="space-y-4 flex-grow">
                        <p className="text-sm text-slate-500 leading-relaxed italic">Most common life-threatening metabolic complication in oncology.</p>
                        <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
                           <h5 className="text-[10px] font-black text-red-600 uppercase mb-2">Management</h5>
                           <ul className="text-xs font-bold text-red-900 space-y-2">
                              <li>• Vigorous IV Hydration (Saline)</li>
                              <li>• IV Bisphosphonates (Zoledronate)</li>
                              <li>• Monitor Cardiac Rhythm</li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col">
                     <h4 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3 tracking-tighter">
                       <ShieldAlert className="text-red-600" /> Cord Compression
                     </h4>
                     <div className="space-y-4 flex-grow">
                        <p className="text-sm text-slate-500 leading-relaxed italic">Medical emergency involving the metastatic spine.</p>
                        <div className="bg-slate-900 text-white p-6 rounded-3xl">
                           <h5 className="text-[10px] font-black text-red-400 uppercase mb-2">The 48-Hour Window</h5>
                           <p className="text-xs opacity-80 leading-relaxed italic">"Prognosis for recovery depends on pre-operative neurology. Patients who can walk at the time of surgery usually stay walking."</p>
                           <div className="mt-4 flex gap-2">
                              <div className="px-2 py-1 bg-red-900 text-red-200 text-[9px] font-black rounded">DEXAMETHASONE</div>
                              <div className="px-2 py-1 bg-slate-800 text-slate-400 text-[9px] font-black rounded">MRI EMERGENCY</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

        </div>

        {/* Legend */}
        <footer className="mt-auto px-10 py-6 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/80">
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-red-600"></div> Malignancy / Emergency</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-slate-900"></div> Systemic / Metabolic</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-emerald-500"></div> Biochemical Clue</div>
        </footer>
      </main>
    </div>
  );
};

export default MetaLab;
