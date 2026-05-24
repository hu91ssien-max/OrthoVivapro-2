import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Ruler, 
  ShieldAlert, 
  Stethoscope, 
  Zap, 
  ChevronRight, 
  ChevronLeft,
  Info, 
  RotateCw, 
  Target,
  Sparkles,
  Loader2,
  X,
  Volume2,
  ClipboardList,
  AlertCircle,
  Footprints,
  Maximize,
  Image as ImageIcon,
  ArrowLeft
} from 'lucide-react';

interface VerticalTalusMasterclassProps {
  onBack: () => void;
}

const VerticalTalusMasterclass = ({ onBack }: VerticalTalusMasterclassProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [deformitySeverity, setDeformitySeverity] = useState(60); // 0 (Normal) to 100 (Severe Rocker)
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiContent, setAiContent] = useState<string | null>(null);
  const [aiImageUrl, setAiImageUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Note: API key is intentionally empty as per user request
  const apiKey = "";

  // --- SLIDE DATA ---
  const slides = [
    { 
      title: "Vertical Talus (CVT)", 
      type: "title", 
      subtitle: "The Congenital Rocker-Bottom Foot Deformity", 
      label: "Pediatric Module 9.0" 
    },
    { 
      title: "Clinical Essentials", 
      type: "content", 
      bullets: [
        "Presentation: Convex plantar surface ('Rocker-bottom').",
        "Rigidity: Hindfoot is in fixed EQUINUS; Forefoot is in fixed DORSIFLEXION.",
        "Differential: Oblique Talus (reducible deformity). CVT is NEVER reducible.",
        "Associations: Up to 50% have neuro-muscular or genetic conditions (Arthrogryposis, Spina Bifida)."
      ], 
      icon: <Stethoscope className="text-blue-500" /> 
    },
    { 
      title: "Rocker-Bottom Simulator", 
      type: "deformity_sim", 
      instruction: "Adjust severity to visualize the midfoot dorsal dislocation over the talar head." 
    },
    { 
      title: "Radiographic Criteria", 
      type: "content", 
      bullets: [
        "Lateral Plantarflexion View: The gold standard for diagnosis.",
        "CVT Rule: The axis of the talus stays vertical and MISSES the 1st metatarsal base.",
        "Oblique Talus: The axis reduces and aligns with the 1st metatarsal on plantarflexion.",
        "Increased Tibiocalcaneal angle indicating fixed hindfoot equinus."
      ], 
      icon: <Ruler className="text-emerald-500" /> 
    },
    { 
      title: "Dobbs Method (Reverse Ponseti)", 
      type: "content", 
      bullets: [
        "Serial Casting: Forefoot is manipulated into INVERSION and PLANTARFLEXION.",
        "Fulcrum: The talar head (medial side) acts as the point of pressure.",
        "Tenotomy: Percutaneous Achilles tenotomy is nearly always required to fix equinus.",
        "Stabilization: K-wire fixation of the TN joint is often used after casting."
      ], 
      icon: <Zap className="text-amber-500" /> 
    },
    { 
      title: "Surgical Goals", 
      type: "content", 
      bullets: [
        "Restore the Alignment: Reduce the Navicular onto the Talus.",
        "Lengthen Tight Structures: EHB, EDL, Tibialis Anterior, and Peroneus Brevis.",
        "Stabilize: Talocalcaneal and Talonavicular joints.",
        "Secondary: Address the calcaneal equinus via Achilles lengthening."
      ], 
      icon: <ShieldAlert className="text-rose-500" /> 
    },
    { 
      title: "Pediatric Board Summary", 
      type: "quiz_start", 
      label: "Final Review" 
    }
  ];

  // --- NAVIGATION LOGIC ---
  const nextSlide = () => { 
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => { 
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAiModalOpen) return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isAiModalOpen]);

  // --- AI UTILS ---
  const fetchWithRetry = async (url: string, options: RequestInit, retries = 5, backoff = 1000) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, backoff));
        return fetchWithRetry(url, options, retries - 1, backoff * 2);
      }
      throw error;
    }
  };

  const generateAICase = async () => {
    if (!apiKey) {
      setAiContent("Board Consultant Simulation: Please configure Gemini API key in settings for real-time cases. \n\nSample Board Viva: 'Show me the stress view X-ray. Why does the Meary's line fail to reduce in CVT?'");
      setIsAiModalOpen(true);
      return;
    }
    setLoading(true);
    setIsAiModalOpen(true);
    setAiImageUrl(null);
    const prompt = `Act as an FRCS/Board Examiner. Generate a high-yield clinical case for Congenital Vertical Talus (CVT). Include a newborn with a rocker-bottom foot, the radiographic findings on forced plantarflexion, and 3 progressive viva questions focusing on the Dobbs technique and management of a 2-year-old walking child with late presentation.`;

    try {
      const result = await fetchWithRetry(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );
      setAiContent(result.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.");
    } catch (error) {
      setAiContent("AI Consultant is currently offline. Please check connection.");
    } finally {
      setLoading(false);
    }
  };

  const generateAIImage = async () => {
    setAiContent("X-Ray Simulation Mode: Requires Image-Generation API key. \n\nDescription: You would see the talus oriented parallel to the tibia, with the forefoot completely dorsiflexed off the talar head.");
    setIsAiModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center selection:bg-blue-500 overflow-y-auto">
      <audio ref={audioRef} hidden />

      {/* Header HUD */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-6 bg-slate-900/50 p-5 rounded-3xl border border-slate-800 backdrop-blur-md">
        <div className="flex flex-col">
          <button 
            onClick={onBack}
            className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1 hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft size={12} /> Return to Hub
          </button>
          <h1 className="text-xl font-black uppercase tracking-tighter text-blue-400 flex items-center gap-2">
            <Footprints size={20} /> CVT Masterclass
          </h1>
          <div className="flex gap-2 items-center">
            <span className="text-[10px] font-black bg-blue-500/20 px-2 py-0.5 rounded text-blue-300 uppercase tracking-widest">Board Standard 2026</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase">Slide {currentSlide + 1} / {slides.length}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={generateAICase}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles size={14} /> AI Case
          </button>
          <button 
            onClick={generateAIImage}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            <ImageIcon size={14} /> AI X-Ray
          </button>
        </div>
      </div>

      {/* Main Slide Deck */}
      <div className="w-full max-w-5xl aspect-video bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-800 relative overflow-hidden flex flex-col min-h-[500px]">
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-700">
          <div className="h-full bg-blue-500 transition-all duration-700 ease-out" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}></div>
        </div>

        <div className="flex-grow p-10 md:p-14 flex flex-col justify-center relative overflow-hidden">
          <div key={currentSlide} className="animate-in slide-in-from-right-8 fade-in duration-500">
            {slides[currentSlide].type === 'title' && (
              <div className="text-center space-y-8">
                <span className="text-[14px] font-black text-blue-500 uppercase tracking-[0.6em]">{(slides[currentSlide] as any).label}</span>
                <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter uppercase italic">{slides[currentSlide].title}</h2>
                <p className="text-xl md:text-2xl text-slate-400 font-medium tracking-tight">{(slides[currentSlide] as any).subtitle}</p>
                <div className="h-1.5 w-32 bg-blue-500 mx-auto rounded-full mt-4"></div>
              </div>
            )}

            {slides[currentSlide].type === 'content' && (
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-800 rounded-2xl shadow-inner border border-slate-700">{(slides[currentSlide] as any).icon}</div>
                    <h2 className="text-4xl font-black text-white uppercase tracking-tight italic">{slides[currentSlide].title}</h2>
                  </div>
                  <ul className="grid gap-5">
                    {(slides[currentSlide] as any).bullets.map((b: string, i: number) => (
                      <li key={i} className="flex gap-4 text-lg font-medium text-slate-300 leading-snug items-start">
                        <ChevronRight className="text-blue-500 shrink-0 mt-1.5" size={20} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {slides[currentSlide].type === 'deformity_sim' && (
              <div className="flex flex-col items-center gap-8">
                <div className="text-center">
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tight">{slides[currentSlide].title}</h2>
                  <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest">{(slides[currentSlide] as any).instruction}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full max-w-4xl">
                  <div className="relative aspect-square bg-slate-800 rounded-[2.5rem] border-4 border-slate-700 shadow-2xl flex items-center justify-center overflow-hidden">
                    <svg viewBox="0 0 200 200" className="w-64 h-64">
                       {/* Calcaneus (Equinus) */}
                       <path d="M 40 140 Q 60 160 100 160 L 120 150" fill="none" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
                       
                       {/* Talus (Verticalizing) */}
                       <g transform={`rotate(${deformitySeverity * 0.8}, 100, 140)`}>
                          <path d="M 100 140 L 100 80" stroke={deformitySeverity > 40 ? "#ef4444" : "#3b82f6"} strokeWidth="12" strokeLinecap="round" />
                          <circle cx="100" cy="80" r="10" fill={deformitySeverity > 40 ? "#ef4444" : "#3b82f6"} />
                       </g>

                       {/* Forefoot (Dorsiflexing) */}
                       <g transform={`translate(0, ${-deformitySeverity * 0.2}) rotate(${-deformitySeverity * 0.5}, 100, 140)`}>
                          <path d="M 100 140 L 160 120 L 180 130" fill="none" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
                       </g>

                       {/* Reference Line */}
                       <line x1="20" y1="165" x2="180" y2="165" stroke="#1e293b" strokeWidth="2" strokeDasharray="4" />
                       <text x="70" y="185" fontSize="8" fill="#475569" className="font-bold uppercase tracking-tighter">Ground Contact</text>
                    </svg>
                  </div>

                  <div className="w-full space-y-6">
                    <div className="flex justify-between text-[11px] font-black uppercase text-slate-400 tracking-widest">
                      <span>Rocker Deformity Magnitude</span>
                      <span className={deformitySeverity > 50 ? "text-rose-400" : "text-emerald-400"}>{deformitySeverity}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" value={deformitySeverity}
                      onChange={(e) => setDeformitySeverity(parseInt(e.target.value))}
                      className="w-full h-2.5 bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="p-6 bg-slate-800 rounded-3xl border border-slate-700">
                       <h5 className="text-[10px] font-black uppercase text-blue-400 mb-2">Anatomical Hallmark</h5>
                       <p className="text-[11px] font-bold text-slate-400 leading-relaxed italic">
                         In CVT, the Navicular is dislocated <span className="text-white underline underline-offset-4 font-black">Dorsally</span> onto the neck of the vertical talus, creating the rigid rocker-bottom.
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {slides[currentSlide].type === 'quiz_start' && (
              <div className="text-center space-y-10">
                <div className="w-24 h-24 bg-blue-600 rounded-[2rem] mx-auto flex items-center justify-center shadow-2xl animate-bounce">
                  <ClipboardList size={48} className="text-white" />
                </div>
                <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter">Final Review</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                   <div className="p-6 bg-slate-800 rounded-3xl border border-slate-700 text-center hover:border-blue-500 transition-colors">
                      <p className="text-[10px] font-black text-blue-400 uppercase mb-2 tracking-widest">Dobbs Pivot</p>
                      <p className="text-xl font-black italic">TALAR HEAD</p>
                      <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">Pressure point for reduction</p>
                   </div>
                   <div className="p-6 bg-slate-800 rounded-3xl border border-slate-800 text-center hover:border-rose-500 transition-colors">
                      <p className="text-[10px] font-black text-rose-400 uppercase mb-2 tracking-widest">Diagnosis</p>
                      <p className="text-xl font-black italic">FIXED VERTICAL</p>
                      <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">Persistent on plantarflexion</p>
                   </div>
                   <div className="p-6 bg-slate-800 rounded-3xl border border-slate-700 text-center hover:border-amber-500 transition-colors">
                      <p className="text-[10px] font-black text-amber-400 uppercase mb-2 tracking-widest">Equinus Fix</p>
                      <p className="text-xl font-black italic">ACHILLES TENOTOMY</p>
                      <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">Nearly 100% of cases</p>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-8 bg-slate-900 border-t border-slate-800 flex justify-between items-center">
          <div className="flex gap-3">
            <button 
              onClick={prevSlide} 
              disabled={currentSlide === 0} 
              className="p-4 bg-slate-800 rounded-2xl hover:bg-slate-700 disabled:opacity-20 transition-all border border-slate-700 shadow-lg active:scale-95"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide} 
              disabled={currentSlide === slides.length - 1} 
              className="p-4 bg-slate-800 rounded-2xl hover:bg-slate-700 disabled:opacity-20 transition-all border border-slate-700 shadow-lg active:scale-95"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="hidden lg:flex gap-2">
            {slides.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-10 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'w-2 bg-slate-700'}`}
              ></div>
            ))}
          </div>
          <div className="text-right">
             <span className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase block italic">Surgical Academy 2026</span>
             <span className="text-[8px] font-bold text-slate-600 uppercase">CVT Hub Module v1.0</span>
          </div>
        </div>
      </div>

      {/* AI Intelligence Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-3xl max-h-[85vh] rounded-[3.5rem] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-slate-700 flex justify-between items-center bg-slate-900/40">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-xl shadow-lg"><Sparkles className="text-white" size={20} /></div>
                <h3 className="text-xl font-black uppercase tracking-tight italic">{loading ? "Reconstructing Deformity..." : "Board Consultant Insights"}</h3>
              </div>
              <button onClick={() => setIsAiModalOpen(false)} className="p-3 hover:bg-slate-700 rounded-full transition-all"><X size={24} /></button>
            </div>
            <div className="p-10 flex-grow overflow-y-auto custom-scrollbar">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center gap-6 py-20">
                   <div className="relative w-20 h-20">
                      <Loader2 className="animate-spin text-blue-500 absolute inset-0" size={80} />
                      <div className="absolute inset-0 flex items-center justify-center text-blue-300 text-[10px] font-black">AI</div>
                   </div>
                   <p className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-500 animate-pulse text-center">Analyzing Radiographic & Pathological Correlation...</p>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                  {aiImageUrl && <img src={aiImageUrl} alt="AI Simulation" className="w-full h-auto rounded-[2.5rem] border-4 border-slate-700 shadow-2xl mb-8" />}
                  {aiContent && (
                    <div className="prose prose-invert max-w-none">
                      <div className="whitespace-pre-wrap font-medium text-slate-200 bg-slate-900/60 p-8 rounded-[2.5rem] border border-slate-700 shadow-inner leading-relaxed text-base italic">
                        {aiContent}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="p-8 border-t border-slate-700 bg-slate-900/20 text-center">
              <button 
                onClick={() => setIsAiModalOpen(false)} 
                className="px-12 py-3 bg-blue-600 hover:bg-blue-500 rounded-full text-[12px] font-black uppercase transition-all shadow-lg"
              >
                Dismiss Case Study
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Revision HUD */}
      <div className="w-full max-w-5xl mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="p-8 bg-slate-900/50 rounded-[2.5rem] border border-slate-800 hover:border-blue-500/50 transition-all group">
          <div className="flex items-center gap-3 mb-5 text-blue-400">
            <Info size={22} className="group-hover:rotate-12 transition-transform" />
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em]">Radiology Note</h4>
          </div>
          <p className="text-sm font-bold text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">
            Look for <span className="text-blue-400 font-black italic">Parallelism</span> between the talus and calcaneus. This indicates the fixed equinus and hindfoot rigidity characteristic of CVT.
          </p>
        </div>
        <div className="p-8 bg-slate-900/50 rounded-[2.5rem] border border-slate-800 hover:border-rose-500/50 transition-all group">
          <div className="flex items-center gap-3 mb-5 text-rose-400">
            <AlertCircle size={22} className="group-hover:animate-bounce" />
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em]">Clinical Red Flag</h4>
          </div>
          <p className="text-sm font-bold text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors italic">
            "Oblique Talus" reduces on forced plantarflexion. "Vertical Talus" does NOT. If the deformity is <span className="text-rose-400 font-black uppercase">flexible</span>, it is not true CVT.
          </p>
        </div>
        <div className="p-8 bg-slate-900/50 rounded-[2.5rem] border border-slate-800 hover:border-emerald-500/50 transition-all group">
          <div className="flex items-center gap-3 mb-5 text-emerald-400">
            <ShieldAlert size={22} className="group-hover:scale-110 transition-transform" />
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em]">The Dobbs Method</h4>
          </div>
          <p className="text-sm font-bold text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">
            Casting for CVT is the <span className="text-emerald-400 font-black">Inversion</span> of Ponseti. You plantarflex and invert the forefoot around the talar head.
          </p>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}</style>
    </div>
  );
};

export default VerticalTalusMasterclass;
