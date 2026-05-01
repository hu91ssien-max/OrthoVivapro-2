import React, { useState, useMemo } from 'react';
import { 
  Bone, 
  Dna, 
  Layers, 
  Target, 
  ShieldAlert, 
  Info, 
  Search, 
  Activity, 
  ChevronRight, 
  Zap, 
  Eye, 
  AlertCircle,
  Maximize2,
  FileText,
  Droplets as Drip,
  Sparkles,
  ClipboardList,
  Menu,
  X,
  ArrowLeft
} from 'lucide-react';

const PATHOLOGIES = [
  {
    id: 'melorheostosis',
    name: 'Melorheostosis',
    aka: 'Léri-Joanny Disease',
    category: 'Hyperostosis',
    description: 'A rare, non-hereditary condition of "flowing" cortical thickening. It affects only one side of the bone (monomelic).',
    imaging: 'Classic "Dripping Candle Wax" appearance. Thickened cortex along the long axis of the bone.',
    clinical: 'Can cause severe pain, joint contractures, and limb deformity despite being "benign".',
    apley_pearl: 'The distribution usually follows a sclerotome (nerve root distribution) rather than a peripheral nerve.'
  },
  {
    id: 'osteopoikilosis',
    name: 'Osteopoikilosis',
    aka: 'Spotted Bone Disease',
    category: 'Incidentaloma',
    description: 'A benign, asymptomatic condition of multiple small, round or oval sclerotic foci.',
    imaging: 'Multiple small "white dots" (2-10mm) clustered in the epiphyses and metaphyses of long bones.',
    clinical: 'Completely asymptomatic. Discovered incidentally on X-rays taken for other reasons.',
    apley_pearl: 'Crucial: The dots are COLD on a Bone Scan. Blastic metastases are HOT. This is the definitive differentiator.'
  },
  {
    id: 'striata',
    name: 'Osteopathia Striata',
    aka: 'Voorhoeve Disease',
    category: 'Linear Dysplasia',
    description: 'A benign bone dysplasia characterized by linear striations in the metaphyses.',
    imaging: 'Vertical "Celery Stalk" or "Zebra" striations parallel to the long axis of the bone.',
    clinical: 'Asymptomatic and incidental. Occasionally associated with cranial sclerosis.',
    apley_pearl: 'Requires no treatment, but must be recognized to prevent an unnecessary biopsy for suspected malignancy.'
  },
  {
    id: 'mhe',
    name: 'Hereditary Exostoses',
    aka: 'Diaphyseal Aclasis',
    category: 'Genetic Syndrome',
    description: 'Autosomal dominant disorder (EXT1/EXT2) leading to multiple osteochondromas.',
    imaging: 'Bony outgrowths from the metaphyses. Broad-based (sessile) or stalked (pedunculated).',
    clinical: 'Short stature, forearm/leg bowing, and potential for nerve/vessel impingement.',
    apley_pearl: 'Malignant transformation to Chondrosarcoma occurs in 1-5% of cases—watch for new pain in an adult.'
  },
  {
    id: 'engelmann',
    name: "Camurati-Engelmann",
    aka: "Progressive Diaphyseal Dysplasia",
    category: 'Hereditary Sclerosis',
    description: 'A rare genetic disorder causing progressive thickening of the shafts (diaphyses).',
    imaging: 'Symmetric, fusiform cortical thickening of the long bone shafts. Classically spares the epiphyses.',
    clinical: 'Bone pain, waddling gait, and muscle wasting. Usually diagnosed in late childhood.',
    apley_pearl: 'TGFB1 mutation causes increased osteoblast activity. Differentiate from chronic osteomyelitis.'
  }
];

const DIFFERENTIAL_MATRIX = [
  { feature: 'Bone Scan', metastasis: 'HOT (High uptake)', dysplasia: 'COLD (Normal uptake)' },
  { feature: 'Distribution', metastasis: 'Random / Asymmetric', dysplasia: 'Symmetric or Sclerotomal' },
  { feature: 'Bone Shape', metastasis: 'Normal or Destroyed', dysplasia: 'Expansion / Deformity common' },
  { feature: 'Laboratory', metastasis: 'Often High ALP / Ca+', dysplasia: 'Usually Normal' }
];

interface ScleroticLabProps {
  onBack: () => void;
}

const ScleroticLab = ({ onBack }: ScleroticLabProps) => {
  const [activeTab, setActiveTab] = useState('melorheostosis');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeData = useMemo(() => 
    PATHOLOGIES.find(p => p.id === activeTab) || PATHOLOGIES[0], 
  [activeTab]);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
           <button onClick={onBack} className="p-2 -ml-2 text-slate-500"><ArrowLeft size={20} /></button>
           <Sparkles className="text-indigo-600" size={20} />
           <span className="font-black text-xs uppercase tracking-tighter">Hard-Bone Lab</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 text-white transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="hidden lg:flex items-center gap-3 mb-10">
            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg">
              <Sparkles size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">Apley Atlas</span>
          </div>
          
          <nav className="flex-1 space-y-1.5 overflow-y-auto no-scrollbar">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 mb-4">Sclerotic Dysplasias</p>
            {PATHOLOGIES.map((p) => (
              <button
                key={p.id}
                onClick={() => { setActiveTab(p.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-xs font-bold transition-all ${activeTab === p.id ? 'bg-indigo-600 text-white shadow-xl translate-x-2' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                <Bone size={16} />
                {p.name}
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
            <div className="p-5 bg-slate-800/50 rounded-3xl border border-white/5">
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Apley Clinical Unit</p>
              <p className="text-[11px] text-slate-400 leading-tight">Metabolic & Dysplastic Reference</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-slate-50 pt-16 lg:pt-0 no-scrollbar relative">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 hidden lg:flex items-center justify-between px-10 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-slate-500 hover:text-slate-800 transition-colors"><ArrowLeft size={20} /></button>
            <div>
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Bone Dysplasia Atlas</h2>
              <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Sclerotic Diagnostic Hub</h1>
            </div>
          </div>
          <div className="flex gap-3">
             <div className="px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full flex items-center gap-2">
                <ShieldAlert size={14} className="text-indigo-600" />
                <span className="text-[9px] font-black text-indigo-700 uppercase tracking-widest">Incidentaloma Protocol</span>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 max-w-5xl mx-auto w-full">
          
          {/* Main Visual Header */}
          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="p-6 bg-indigo-50 text-indigo-600 rounded-[2rem] shadow-inner transform group-hover:rotate-12 transition-transform duration-500">
                   {activeTab === 'melorheostosis' ? <Drip size={48} /> : <Target size={48} />}
                </div>
                <div className="text-center md:text-left">
                   <h3 className="text-4xl font-black text-slate-800 tracking-tighter">{activeData.name}</h3>
                   <p className="text-indigo-600 font-bold uppercase text-[10px] tracking-[0.2em] mb-4 italic">"{activeData.aka}"</p>
                   <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      <span className="px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-black uppercase text-slate-500">{activeData.category}</span>
                      <span className="px-4 py-1.5 bg-indigo-600 rounded-full text-[10px] font-black uppercase text-white shadow-md">Benign Process</span>
                   </div>
                </div>
             </div>
             <Bone className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
          </div>

          {/* Imaging & Clinical Insight Cards */}
          <div className="grid md:grid-cols-2 gap-8">
             <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative group overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-lg font-black mb-6 flex items-center gap-3 text-indigo-400">
                    <Eye size={22} /> Imaging Hallmark
                  </h4>
                  <p className="text-xl font-bold text-slate-200 leading-snug mb-10 italic">
                    "{activeData.imaging}"
                  </p>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                    <h5 className="text-[10px] font-black text-indigo-400 uppercase mb-2 tracking-widest flex items-center gap-2">
                      <FileText size={14} /> Description
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                        {activeData.description}
                    </p>
                  </div>
                </div>
                <Search className="absolute -bottom-10 -right-10 text-white/5" size={240} />
             </div>

             <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col justify-between shadow-sm">
                <div>
                  <h4 className="text-lg font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter">
                    <Activity size={22} /> Clinical Profile
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium mb-8">
                    {activeData.clinical}
                  </p>
                </div>
                <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl relative overflow-hidden group">
                   <h5 className="text-[10px] font-black text-amber-600 uppercase mb-2 flex items-center gap-2 relative z-10">
                     <Zap size={16} /> Apley Clinical Pearl
                   </h5>
                   <p className="text-xs text-amber-900 leading-relaxed italic font-bold relative z-10">
                     "{activeData.apley_pearl}"
                   </p>
                   <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:rotate-12 transition-transform">
                      <Info size={48} />
                   </div>
                </div>
             </div>
          </div>

          {/* Sclerotic Differential Matrix */}
          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
             <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                <ClipboardList className="text-indigo-600" /> Sclerotic Differential Guide
             </h3>
             <div className="overflow-x-auto rounded-2xl border border-slate-50">
                <table className="w-full text-left">
                   <thead>
                      <tr className="bg-slate-50">
                         <th className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Feature</th>
                         <th className="py-5 px-6 text-[10px] font-black text-red-600 uppercase tracking-[0.2em]">Blastic Metastasis</th>
                         <th className="py-5 px-6 text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Benign Dysplasia</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {DIFFERENTIAL_MATRIX.map((row, i) => (
                        <tr key={i} className="hover:bg-indigo-50/40 transition-colors">
                           <td className="py-5 px-6 text-xs font-black text-slate-600">{row.feature}</td>
                           <td className="py-5 px-6 text-xs font-bold text-red-800">{row.metastasis}</td>
                           <td className="py-5 px-6 text-xs font-bold text-emerald-800">{row.dysplasia}</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
             <div className="mt-8 p-6 bg-slate-900 text-white rounded-[2rem] flex flex-col md:flex-row items-center gap-6 shadow-xl">
                <AlertCircle className="text-red-500 shrink-0" size={32} />
                <p className="text-xs font-medium leading-relaxed italic opacity-80">
                  <strong>Diagnostic Warning:</strong> While dysplasias like Osteopoikilosis or Striata are strictly benign, their radiographic appearance can simulate widely metastatic cancer. Correlating with a Bone Scan and patient history is mandatory before labeling as malignant.
                </p>
             </div>
          </div>

        </div>

        {/* Legend / Status Footer */}
        <footer className="mt-auto px-10 py-8 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/80">
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-indigo-600 shadow-sm"></div> Developmental Dysplasia</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-amber-500 shadow-sm"></div> Hereditary Disorder</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-red-600 shadow-sm"></div> Malignant Mimic</div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-emerald-500 shadow-sm"></div> Incidental Finding</div>
        </footer>
      </main>
    </div>
  );
};

export default ScleroticLab;
