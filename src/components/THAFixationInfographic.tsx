import React, { useState } from 'react';
import { 
  Settings, 
  Layers, 
  Target, 
  Activity, 
  ShieldAlert, 
  ClipboardCheck, 
  Bone, 
  ChevronRight,
  Info,
  Maximize2,
  History,
  ArrowLeft
} from 'lucide-react';

interface THAFixationInfographicProps {
  onBack?: () => void;
}

const THAFixationInfographic = ({ onBack }: THAFixationInfographicProps) => {
  const [activeTab, setActiveTab] = useState('comparison');

  const content: any = {
    comparison: {
      title: "Cemented vs. Biologic",
      icon: <Layers className="w-5 h-5" />,
      color: "text-blue-600",
      bg: "bg-blue-50",
      items: [
        { label: "Cement (PMMA)", text: "Acts as grout, creating an interlocking fit. Ideal for 'Stovepipe' (Dorr C) femurs and elderly patients with poor bone quality." },
        { label: "Biologic (Ingrowth)", text: "Bone grows into porous structure (50-300µm pores). Preferred for young, active patients with good bone stock." },
        { label: "Biologic (Ongrowth)", text: "Bone grows onto grit-blasted micro-divots. Commonly used for extensively coated stems." },
        { label: "Collared Stems", text: "Helps transfer stress to calcar, reduces early subsidence, and controls insertion depth." }
      ]
    },
    dorr: {
      title: "Dorr Classification",
      icon: <Bone className="w-5 h-5" />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      items: [
        { label: "Type A (Champagne Flute)", text: "Ratio < 0.5. Thick cortices on AP/Lat. Ideal for Uncemented fixation." },
        { label: "Type B", text: "Ratio 0.5 - 0.75. Thinning of posterior cortex on lateral XR. Uncemented usually acceptable." },
        { label: "Type C (Stovepipe)", text: "Ratio > 0.75. Thinning of cortices on both views. MUST use Cemented fixation." }
      ]
    },
    cemented: {
      title: "Cementing Excellence",
      icon: <Settings className="w-5 h-5" />,
      color: "text-amber-600",
      bg: "bg-amber-50",
      items: [
        { label: "3rd Gen Technique", text: "Vacuum-mixing, pulsatile lavage, cement restrictor, and pressurization for optimal interdigitation." },
        { label: "The 2mm Rule", text: "Cement mantle must be > 2mm. Mantles < 2mm are prone to fractures." },
        { label: "Barrack Grade A", text: "Complete 'white-out' of cement-bone interface with no gaps." },
        { label: "Barrack Grade D", text: "Gross radiolucencies or failure of cement to surround the tip (High risk of failure)." }
      ]
    },
    biologic: {
      title: "Biologic Requirements",
      icon: <Target className="w-5 h-5" />,
      color: "text-purple-600",
      bg: "bg-purple-50",
      items: [
        { label: "Pore Size", text: "Optimal: 50–200µm. Porosity of 40–80% maximizes ingrowth potential." },
        { label: "Initial Gap", text: "Must be < 50µm. Bone will not bridge gaps larger than 50µm." },
        { label: "Micromotion", text: "Must be < 150µm. Excessive motion leads to fibrous ingrowth rather than bone." },
        { label: "Spot-Welds", text: "Sign of success: New endosteal bone contacting the porous surface on follow-up XR." }
      ]
    },
    complications: {
      title: "Failures & Stress",
      icon: <ShieldAlert className="w-5 h-5" />,
      color: "text-rose-600",
      bg: "bg-rose-50",
      items: [
        { label: "Aseptic Loosening", text: "Thigh pain (femoral) or groin pain (acetabular). Often presents as 'start-up pain'." },
        { label: "Stress Shielding", text: "Proximal bone loss due to distal fixation. Risk: Stiff stems (Co-Cr) and large diameters." },
        { label: "Intraop Fracture", text: "Higher risk with press-fit. If unstable, bypass fracture by two cortical diameters." }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 font-sans transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        {onBack && (
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
              <ArrowLeft size={16} />
            </div>
            <span className="font-bold text-xs uppercase tracking-widest">Back to Dashboard</span>
          </button>
        )}

        {/* Header */}
        <header className="bg-slate-900 rounded-3xl p-8 mb-8 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-500 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">Arthroplasty Masterclass</span>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest ml-2">Orthobullets 2026</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight">THA Implant Fixation</h1>
            <p className="text-slate-400 mt-2 font-medium max-w-2xl leading-relaxed">
              Comprehensive guide to surgical indications, technical requirements, and radiographic success for Total Hip Arthroplasty.
            </p>
          </div>
          <History className="absolute right-[-20px] top-1/2 -translate-y-1/2 opacity-5 w-64 h-64 pointer-events-none" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Menu */}
          <nav className="lg:col-span-4 flex flex-col gap-3">
            {Object.entries(content).map(([key, section]: [string, any]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 border-2 ${
                  activeTab === key 
                    ? `${section.bg} border-${key === 'comparison' ? 'blue' : key === 'dorr' ? 'emerald' : key === 'cemented' ? 'amber' : key === 'biologic' ? 'purple' : 'rose'}-500 ${section.color} shadow-lg scale-105` 
                    : 'bg-white border-gray-100 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3 font-bold text-sm uppercase tracking-wide">
                  <div className={`p-2 rounded-lg ${activeTab === key ? 'bg-white' : 'bg-gray-50'}`}>
                    {section.icon}
                  </div>
                  {section.title}
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === key ? 'translate-x-1' : 'opacity-0'}`} />
              </button>
            ))}

            {/* Quick Fact: Stress Shielding */}
            <div className="mt-8 p-6 bg-slate-900 text-white rounded-3xl shadow-lg">
              <div className="flex items-center gap-2 text-blue-400 font-bold mb-3">
                <Info size={16} />
                <span className="text-[10px] uppercase tracking-widest">Physics Pearl</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                <strong>Stress Shielding</strong> is most common with <strong>stiff femoral stems</strong> (Co-Cr alloy &gt; Titanium) and extensively coated stems. Clinical impact is often minimal but radiographic bone loss is significant.
              </p>
            </div>
          </nav>

      {/* Details */}
      <div className="lg:col-span-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 min-h-[580px] p-8 flex flex-col transition-colors">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl ${content[activeTab].bg} ${content[activeTab].color}`}>
                {content[activeTab].icon}
              </div>
              <div>
                <h2 className={`text-2xl font-black uppercase tracking-tight ${content[activeTab].color}`}>
                  {content[activeTab].title}
                </h2>
                <div className={`h-1 w-12 mt-1 rounded-full ${content[activeTab].color.replace('text', 'bg')}`} />
              </div>
            </div>
            <Maximize2 size={20} className="text-slate-300" />
          </div>

          <div className="space-y-8 flex-grow">
            {content[activeTab].items.map((item: any, idx: number) => (
              <div key={idx} className="relative pl-6 group">
                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-full ${content[activeTab].color.replace('text', 'bg')} opacity-20 group-hover:opacity-100 transition-all`} />
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 transition-colors">
                  {item.label}
                </h4>
                <p className="text-slate-700 text-lg font-medium leading-relaxed transition-colors">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Contextual Visualizer: Dorr Class */}
          {activeTab === 'dorr' && (
            <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-emerald-100 transition-colors">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-black text-emerald-600">&lt; 0.5</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase transition-colors">Type A Ratio</div>
                </div>
                <div className="border-x border-slate-200 px-4 transition-colors">
                  <div className="text-xl font-black text-emerald-700">Type B</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase transition-colors">Transition</div>
                </div>
                <div>
                  <div className="text-xl font-black text-rose-600">&gt; 0.75</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase transition-colors">Type C Ratio</div>
                </div>
              </div>
            </div>
          )}

              {/* Contextual Visualizer: Biologic Numbers */}
              {activeTab === 'biologic' && (
                <div className="mt-10 p-6 bg-purple-900 text-white rounded-2xl flex justify-around">
                  <div className="text-center">
                    <div className="text-2xl font-black">50-300µm</div>
                    <div className="text-[10px] text-purple-300 uppercase">Pore Size</div>
                  </div>
                  <div className="text-center border-x border-purple-800 px-8">
                    <div className="text-2xl font-black">&lt; 50µm</div>
                    <div className="text-[10px] text-purple-300 uppercase">Gap Tolerance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black">&lt; 150µm</div>
                    <div className="text-[10px] text-purple-300 uppercase">Micromotion</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center border-t border-slate-200 pt-8">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em]">Zaky Ortho • Arthroplasty High Yield • 2026 Reference</p>
        </footer>
      </div>
    </div>
  );
};

export default THAFixationInfographic;
