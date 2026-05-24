import React, { useState } from 'react';
import { 
  Stethoscope, 
  Activity, 
  AlertCircle, 
  ChevronRight, 
  Info,
  Maximize2,
  Minimize2,
  Layers,
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowLeft
} from 'lucide-react';

interface VerticalTalusDashboardProps {
  onBack?: () => void;
}

const VerticalTalusDashboard = ({ onBack }: VerticalTalusDashboardProps) => {
  const [view, setView] = useState('anatomy');

  const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 font-sans overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            {onBack && (
              <button 
                onClick={onBack}
                className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-rose-600 transition-colors"
              >
                <ArrowLeft size={12} /> Return to Hub
              </button>
            )}
            <div className="flex items-center gap-2 mb-2 text-rose-600 font-bold text-xs uppercase tracking-widest">
              <Activity size={16} /> Pediatric Orthopaedics
            </div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white">
              Vertical <span className="text-rose-600">Talus</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 italic">Congenital "Rocker-Bottom" Deformity</p>
          </div>
          
          <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-2xl">
            {['anatomy', 'diagnosis', 'treatment'].map((t) => (
              <button
                key={t}
                onClick={() => setView(t)}
                className={`px-6 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
                  view === t ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-white shadow-sm' : 'text-slate-500'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Visual Content */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="min-h-[400px] flex flex-col justify-center items-center relative overflow-hidden bg-slate-50 dark:bg-slate-800/50">
              
              {view === 'anatomy' && (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                  <div className="relative w-64 h-32 mb-12">
                     {/* Simplified "Rocker Bottom" Foot Shape */}
                     <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-2xl">
                        <path 
                          d="M20,40 Q20,80 100,90 Q180,80 180,20" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="8" 
                          className="text-slate-400 dark:text-slate-600"
                        />
                        <circle cx="100" cy="90" r="6" className="fill-rose-500" />
                     </svg>
                     <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-rose-600 font-black text-xs uppercase">Convex Sole (Rocker)</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                      <ArrowDownCircle className="text-rose-500 mb-2 mx-auto" />
                      <h4 className="font-bold text-xs">Equinus</h4>
                      <p className="text-[10px] text-slate-500">Calcaneus pointed down (tight Achilles)</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                      <Layers className="text-blue-500 mb-2 mx-auto" />
                      <h4 className="font-bold text-xs">Vertical Talus</h4>
                      <p className="text-[10px] text-slate-500">Talus perpendicular to the ground</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                      <ArrowUpCircle className="text-emerald-500 mb-2 mx-auto" />
                      <h4 className="font-bold text-xs">Dorsiflexion</h4>
                      <p className="text-[10px] text-slate-500">Forefoot pulled up toward the tibia</p>
                    </div>
                  </div>
                </div>
              )}

              {view === 'diagnosis' && (
                <div className="w-full p-8">
                   <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                     <Maximize2 className="text-rose-500" /> The Plantarflexion Test
                   </h3>
                   <div className="flex flex-col md:flex-row gap-8 items-center justify-around">
                      <div className="text-center">
                        <div className="w-40 h-24 bg-slate-200 dark:bg-slate-700 rounded-xl mb-3 flex items-center justify-center italic text-xs p-4">
                          Metatarsal aligns with Talus
                        </div>
                        <span className="text-xs font-bold text-emerald-600 uppercase">Oblique Talus (Reduces)</span>
                      </div>
                      <div className="text-center">
                        <div className="w-40 h-24 bg-rose-100 dark:bg-rose-900/30 border-2 border-rose-300 rounded-xl mb-3 flex items-center justify-center italic text-xs p-4 text-rose-800 dark:text-rose-200">
                          Metatarsal remains DORSAL to Talar axis
                        </div>
                        <span className="text-xs font-bold text-rose-600 uppercase">Vertical Talus (Fixed)</span>
                      </div>
                   </div>
                   <div className="mt-8 p-4 bg-white dark:bg-slate-900 rounded-2xl text-xs text-slate-500 leading-relaxed">
                      <strong>Radiographic Fact:</strong> In CVT, the talonavicular dislocation is <em>irreducible</em> on extreme plantarflexion. This is the single most important diagnostic feature.
                   </div>
                </div>
              )}

              {view === 'treatment' && (
                <div className="w-full p-8">
                  <h3 className="text-xl font-bold mb-6">Dobbs Technique (Reverse Ponseti)</h3>
                  <div className="space-y-4">
                    {[
                      { step: "01", text: "Serial Casting: Stretching forefoot into plantarflexion/inversion.", sub: "Corrects the dorsal contracture." },
                      { step: "02", text: "Talonavicular Pinning", sub: "Percutaneous K-wire to hold the reduction." },
                      { step: "03", text: "Percutaneous Achilles Tenotomy", sub: "Corrects the hindfoot equinus." },
                      { step: "04", text: "Bracing & Stretching", sub: "Prevents high recurrence rates (~20%)." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 items-start p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-black shrink-0">{item.step}</div>
                        <div>
                          <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{item.text}</p>
                          <p className="text-xs text-slate-500">{item.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </Card>
          </div>

          {/* Clinical Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-l-4 border-l-rose-500">
              <h3 className="font-bold flex items-center gap-2 mb-4">
                <AlertCircle className="text-rose-500" /> Red Flags
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                CVT is often a marker for underlying systemic issues. Always screen for:
              </p>
              <ul className="space-y-2">
                {['Neuromuscular disease', 'Genetic syndromes', 'Neural tube defects'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <ChevronRight size={14} className="text-rose-500" /> {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="bg-slate-900 text-white">
              <h3 className="font-bold flex items-center gap-2 mb-4">
                <Info className="text-blue-400" /> Comparison Key
              </h3>
              <div className="space-y-4">
                <div className="pb-4 border-b border-slate-800">
                   <p className="text-[10px] uppercase font-black text-slate-500">Calcaneovalgus</p>
                   <p className="text-xs text-emerald-400 font-bold italic">Flexible, benign, resolves with stretching.</p>
                </div>
                <div>
                   <p className="text-[10px] uppercase font-black text-slate-500">Vertical Talus</p>
                   <p className="text-xs text-rose-400 font-bold italic">Rigid, surgical, associated with syndromes.</p>
                </div>
              </div>
            </Card>
          </div>

        </div>

        <footer className="mt-12 text-center text-slate-400 text-[10px] uppercase tracking-widest pb-10">
          Pediatric Orthopaedic Specialty • Congenital Deformity Series
        </footer>

      </div>
    </div>
  );
};

export default VerticalTalusDashboard;
