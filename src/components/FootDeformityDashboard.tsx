import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  RotateCcw, 
  AlertCircle, 
  Info, 
  Activity, 
  CheckCircle2, 
  ArrowDown, 
  ArrowUp,
  Maximize,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';

interface FootDeformityDashboardProps {
  onBack?: () => void;
}

const FootDeformityDashboard = ({ onBack }: FootDeformityDashboardProps) => {
  const [activeMode, setActiveMode] = useState<'TEV' | 'CVT'>('TEV'); // TEV or CVT

  const comparisonMetrics = [
    { feature: 'Arch Height', TEV: 100, CVT: 10 },
    { feature: 'Hindfoot Varus', TEV: 100, CVT: 0 },
    { feature: 'Hindfoot Valgus', TEV: 0, CVT: 100 },
    { feature: 'Forefoot Adduction', TEV: 100, CVT: 0 },
    { feature: 'Sole Convexity', TEV: 0, CVT: 100 },
  ];

  const tevDetails = {
    title: "Clubfoot (TEV)",
    mnemonic: "CAVES",
    mElements: [
      { letter: "C", term: "Cavus", desc: "High medial longitudinal arch" },
      { letter: "A", term: "Adductus", desc: "Forefoot curves inward" },
      { letter: "V", term: "Varus", desc: "Heel tilts inward" },
      { letter: "E", term: "Equinus", desc: "Ankle pointed down" },
      { letter: "S", term: "Supination", desc: "Inversion of the forefoot" }
    ],
    casting: "Ponseti Method (Abduction)",
    color: "text-indigo-600",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    border: "border-indigo-100 dark:border-indigo-800"
  };

  const cvtDetails = {
    title: "Vertical Talus (CVT)",
    mnemonic: "ROCKER",
    mElements: [
      { letter: "R", term: "Rigid", desc: "Fixed deformity, non-reducible" },
      { letter: "O", term: "Outward", desc: "Forefoot is abducted/valgus" },
      { letter: "C", term: "Convex", desc: "Sole curves outward (rocker)" },
      { letter: "K", term: "Kinked", desc: "Dorsal talonavicular dislocation" },
      { letter: "E", term: "Equinus", desc: "Hindfoot stuck down" },
      { letter: "R", term: "Rare", desc: "Often associated with syndromes" }
    ],
    casting: "Dobbs Technique (Plantarflexion)",
    color: "text-rose-600",
    bg: "bg-rose-50 dark:bg-rose-900/20",
    border: "border-rose-100 dark:border-rose-800"
  };

  const current = activeMode === 'TEV' ? tevDetails : cvtDetails;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 font-sans overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        
        {/* Header with Comparison Toggle */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="w-full md:w-auto">
            {onBack && (
              <button 
                onClick={onBack}
                className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-indigo-600 transition-colors"
              >
                <ArrowLeft size={12} /> Return to Hub
              </button>
            )}
            <h1 className="text-4xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <RotateCcw className={current.color} /> 
              Congenital <span className={current.color}>Deformities</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Comparing the "Opposites": Clubfoot vs. Vertical Talus</p>
          </div>

          <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => setActiveMode('TEV')}
              className={`px-6 py-2.5 rounded-xl font-black text-sm transition-all ${activeMode === 'TEV' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
            >
              CLUBFOOT (TEV)
            </button>
            <div className="flex items-center px-2 text-slate-300">
              <ArrowLeftRight size={16} />
            </div>
            <button 
              onClick={() => setActiveMode('CVT')}
              className={`px-6 py-2.5 rounded-xl font-black text-sm transition-all ${activeMode === 'CVT' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
            >
              VERTICAL TALUS
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Diagnostic Mnemonic Cards */}
          <div className="lg:col-span-4 space-y-4">
            <div className={`p-6 rounded-3xl border ${current.bg} ${current.border} shadow-sm`}>
              <h2 className={`text-2xl font-black mb-6 flex items-center gap-2 ${current.color}`}>
                {current.mnemonic} <span className="text-xs font-bold text-slate-400">MNEMONIC</span>
              </h2>
              <div className="space-y-3">
                {current.mElements.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-3 bg-white/60 dark:bg-black/20 rounded-2xl backdrop-blur-sm">
                    <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center font-black text-lg text-white shadow-sm bg-gradient-to-br ${activeMode === 'TEV' ? 'from-indigo-500 to-blue-600' : 'from-rose-500 to-pink-600'}`}>
                      {item.letter}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">{item.term}</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-6 text-white overflow-hidden relative shadow-2xl">
              <div className="relative z-10">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Therapeutic Strategy</h3>
                <h4 className="text-xl font-bold mb-2">{current.casting}</h4>
                <p className="text-xs opacity-70 leading-relaxed">
                  {activeMode === 'TEV' 
                    ? "Corrects deformity by moving the forefoot into abduction around a talar fulcrum." 
                    : "Mirror technique: Forefoot is plantarflexed to reduce the talonavicular dislocation."
                  }
                </p>
                <button className={`mt-6 w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeMode === 'TEV' ? 'bg-indigo-500 hover:bg-indigo-400' : 'bg-rose-500 hover:bg-rose-400'}`}>
                  View Protocol
                </button>
              </div>
              <Activity className="absolute -bottom-4 -right-4 opacity-10" size={140} />
            </div>
          </div>

          {/* Visual Comparison & Chart */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Visual Foot Profile Graphic */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl min-h-[300px] flex flex-col items-center justify-center relative">
               <div className="absolute top-6 left-6 text-[10px] font-black text-slate-400 uppercase">Foot Profile Visualization</div>
               
               <div className="w-full max-w-md h-40 relative flex items-center justify-center">
                  {activeMode === 'TEV' ? (
                    <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-xl animate-in fade-in duration-500">
                      {/* Cavus/Concave Shape */}
                      <path 
                        d="M20,60 Q60,10 100,60 Q140,110 180,60" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="10" 
                        className="text-indigo-600"
                        strokeLinecap="round"
                      />
                      <path d="M40,65 Q100,50 160,65" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-xl animate-in fade-in duration-500">
                      {/* Rocker/Convex Shape */}
                      <path 
                        d="M20,40 Q20,80 100,90 Q180,80 180,40" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="10" 
                        className="text-rose-600"
                        strokeLinecap="round"
                      />
                      <path d="M20,40 L180,40" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
                    </svg>
                  )}
               </div>
               
               <div className="mt-8 flex gap-12 text-center">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Hindfoot</p>
                    <p className={`text-lg font-black ${current.color}`}>{activeMode === 'TEV' ? 'VARUS' : 'VALGUS'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Forefoot</p>
                    <p className={`text-lg font-black ${current.color}`}>{activeMode === 'TEV' ? 'ADDUCTUS' : 'ABDUCTUS'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Ankle</p>
                    <p className={`text-lg font-black ${current.color}`}>EQUINUS</p>
                  </div>
               </div>
            </div>

            {/* Comparison Metrics Chart */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Maximize size={18} className="text-blue-500" /> Morphological Profile
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={comparisonMetrics}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="feature" tick={{fontSize: 10, fill: '#64748b'}} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} hide />
                    <Radar 
                      name={current.title} 
                      dataKey={activeMode} 
                      stroke={activeMode === 'TEV' ? '#4f46e5' : '#e11d48'} 
                      fill={activeMode === 'TEV' ? '#4f46e5' : '#e11d48'} 
                      fillOpacity={0.4} 
                    />
                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none'}} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* X-Ray Reminder */}
            <div className={`p-4 rounded-2xl border flex items-center gap-4 ${current.bg} ${current.border}`}>
               <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                  <Activity className={current.color} />
               </div>
               <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Radiographic Gold Standard</p>
                  <p className="text-xs text-slate-500 mt-0.5 italic">
                    {activeMode === 'TEV' 
                      ? "Kite's Angle (Talo-calcaneal) < 20° confirms hindfoot varus." 
                      : "Forced Plantarflexion View: Talonavicular joint fails to reduce."
                    }
                  </p>
               </div>
            </div>

          </div>
        </div>

        <footer className="mt-12 text-center pb-12">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Comparative Pediatric Orthopaedics • White & Mackenzie Protocols
          </p>
        </footer>

      </div>
    </div>
  );
};

export default FootDeformityDashboard;
