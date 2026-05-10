import React, { useState, useRef } from 'react';
import { 
  Activity, 
  Ruler, 
  ShieldAlert, 
  Stethoscope, 
  Zap, 
  ChevronRight, 
  ChevronLeft,
  Info, 
  Target,
  Baby,
  Sparkles,
  Loader2,
  X,
  ClipboardList,
  AlertCircle,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CoxaVaraApley from './CoxaVaraApley';

// Use process.env for standard AI Studio API usage
const apiKey = process.env.GEMINI_API_KEY || "";

const PediatricCoxaVara = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [neckShaftAngle, setNeckShaftAngle] = useState(110);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiContent, setAiContent] = useState<string | null>(null);
  const [view, setView] = useState<'masterclass' | 'apley'>('masterclass');
  const audioRef = useRef<HTMLAudioElement>(null);

  // --- API UTILS ---
  const fetchWithRetry = async (url: string, options: any, retries = 5, backoff = 1000): Promise<any> => {
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
    setLoading(true);
    setIsAiModalOpen(true);
    const prompt = `Act as an FRCS Orthopedic Examiner. Generate a high-yield clinical case study for Developmental Coxa Vara. Include a 4-year-old with a painless limp, radiographic parameters (Neck-shaft angle, HEA angle), and 3 progressive viva questions focusing on the indications for a Valgus Osteotomy.`;

    try {
      const result = await fetchWithRetry(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: "You are a senior pediatric orthopedic consultant." }] }
          })
        }
      );
      setAiContent(result.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate case.");
    } catch (error) {
      setAiContent("Error connecting to AI. Check connectivity.");
    } finally {
      setLoading(false);
    }
  };

  const slides = [
    { 
      title: "Pediatric Coxa Vara", 
      type: "title", 
      subtitle: "Neck-Shaft Angle & Biomechanical Failures", 
      label: "Module 5.0" 
    },
    { 
      title: "Definition & Anatomy", 
      type: "content", 
      bullets: [
        "Coxa Vara: Neck-shaft angle < 120° (Normal: 135° in children).",
        "Developmental Coxa Vara (DCV): A primary defect in the medial femoral neck ossification.",
        "Result: Progressive varus deformity as the child grows.",
        "Biomechanical trap: Decreased angle shortens the abductor lever arm (Trendelenburg gait)."
      ], 
      icon: <Ruler className="text-blue-500" /> 
    },
    { 
      title: "Interactive Angle Sim", 
      type: "sim", 
      instruction: "Adjust the neck-shaft angle to visualize the abductor lever arm change." 
    },
    { 
      title: "HEA: The Gold Standard", 
      type: "content", 
      bullets: [
        "Hilgenreiner-Epiphyseal Angle (HEA): Measure of the physis relative to the horizontal.",
        "HEA < 45°: Usually resolves spontaneously.",
        "HEA 45-60°: Gray zone; observation required for progression.",
        "HEA > 60°: Progressive deformity; usually requires surgical correction."
      ], 
      icon: <Target className="text-emerald-500" /> 
    },
    { 
      title: "Clinical Features", 
      type: "content", 
      bullets: [
        "Painless 'Waddling' Gait (Trendelenburg sign).",
        "Limb Length Discrepancy (LLD) due to varus shortening.",
        "Limited Hip Abduction and Internal Rotation.",
        "Prominent Greater Trochanter (proximal migration)."
      ], 
      icon: <Stethoscope className="text-rose-500" /> 
    },
    { 
      title: "Surgical: Valgus Osteotomy", 
      type: "content", 
      bullets: [
        "Goal: Convert shear forces at the physis into compressive forces.",
        "Target Angle: Correct neck-shaft angle to ~140° or HEA < 35°.",
        "Technique: Proximal Femoral Valgus Producing Osteotomy.",
        "Fixation: Blade plate or pediatric locking compression plate."
      ], 
      icon: <Zap className="text-amber-500" /> 
    },
    { 
      title: "Board Review Summary", 
      type: "quiz_start", 
      label: "Final Revision" 
    }
  ];

  const nextSlide = () => { if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1); };
  const prevSlide = () => { if (currentSlide > 0) setCurrentSlide(currentSlide - 1); };

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto">
      <audio ref={audioRef} hidden />

      {/* Header HUD */}
      <div className="w-full flex justify-between items-center mb-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-col">
          <h1 className="text-xl font-black uppercase tracking-tighter text-blue-600 flex items-center gap-2">
            <Baby size={20} /> Coxa Vara {view === 'masterclass' ? 'Masterclass' : 'Reference'}
          </h1>
          <div className="flex gap-2 items-center">
            <span className="text-[10px] font-black bg-blue-100 px-2 py-0.5 rounded text-blue-700">SURGICAL ACADEMY 2026</span>
            <div className="flex bg-slate-100 p-1 rounded-full gap-1 ml-2">
               <button 
                 onClick={() => setView('masterclass')}
                 className={`px-3 py-1 text-[9px] font-black uppercase tracking-tighter rounded-full transition-all ${view === 'masterclass' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
               >
                 Simulation
               </button>
               <button 
                 onClick={() => setView('apley')}
                 className={`px-3 py-1 text-[9px] font-black uppercase tracking-tighter rounded-full transition-all ${view === 'apley' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
               >
                 Apley Guide
               </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {view === 'masterclass' && (
            <span className="hidden md:inline text-[10px] font-bold text-slate-500 uppercase tracking-widest mr-4">Slide {currentSlide + 1} / {slides.length}</span>
          )}
          <button 
            onClick={generateAICase}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg text-white transition-all whitespace-nowrap"
          >
            <Sparkles size={14} /> AI Viva Case
          </button>
        </div>
      </div>

      {view === 'apley' ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <CoxaVaraApley />
        </motion.div>
      ) : (
        <div className="w-full">
          {/* Main Slide Deck */}
          <div className="w-full aspect-video bg-white rounded-[2.5rem] shadow-xl border border-slate-200 relative overflow-hidden flex flex-col min-h-[500px]">
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
          <div className="h-full bg-blue-500 transition-all duration-700 ease-out" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}></div>
        </div>

        <div className="flex-grow p-8 md:p-12 flex flex-col justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              {slides[currentSlide].type === 'title' && (
                <div className="text-center space-y-8">
                  <span className="text-[14px] font-black text-blue-500 uppercase tracking-[0.6em]">{slides[currentSlide].label}</span>
                  <h2 className="text-5xl md:text-7xl font-black text-slate-800 leading-none tracking-tighter uppercase italic">{slides[currentSlide].title}</h2>
                  <p className="text-xl md:text-2xl text-slate-400 font-medium tracking-tight">{slides[currentSlide].subtitle}</p>
                  <div className="h-1.5 w-32 bg-blue-500 mx-auto rounded-full mt-4"></div>
                </div>
              )}

              {slides[currentSlide].type === 'content' && (
                <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="flex-1 space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-slate-50 rounded-2xl shadow-inner border border-slate-100">{slides[currentSlide].icon}</div>
                      <h2 className="text-3xl md:text-4xl font-black text-slate-800 uppercase tracking-tight italic">{slides[currentSlide].title}</h2>
                    </div>
                    <ul className="grid gap-5">
                      {slides[currentSlide].bullets?.map((b, i) => (
                        <li key={i} className="flex gap-4 text-lg font-medium text-slate-600 leading-snug items-start">
                          <ChevronRight className="text-blue-500 shrink-0 mt-1.5" size={20} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {slides[currentSlide].type === 'sim' && (
                <div className="flex flex-col items-center gap-6">
                  <div className="text-center">
                    <h2 className="text-3xl font-black text-slate-800 uppercase italic tracking-tight">{slides[currentSlide].title}</h2>
                    <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest">{slides[currentSlide].instruction}</p>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="relative w-64 h-64 bg-slate-50 rounded-full flex items-center justify-center border-4 border-white shadow-inner">
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        {/* Pelvis Reference */}
                        <path d="M40 40 Q100 80 40 160" fill="none" stroke="#94a3b8" strokeWidth="6" />
                        
                        {/* Shaft (Static) */}
                        <rect x="95" y="100" width="10" height="80" fill="#64748b" rx="2" />
                        
                        {/* Neck (Moving based on angle) */}
                        <g transform={`rotate(${135 - neckShaftAngle}, 100, 100)`}>
                          <rect x="60" y="80" width="45" height="15" fill={neckShaftAngle < 120 ? "#f43f5e" : "#3b82f6"} rx="4" />
                          <circle cx="60" cy="88" r={neckShaftAngle < 120 ? 25 : 20} fill={neckShaftAngle < 120 ? "#f43f5e" : "#3b82f6"} />
                        </g>

                        {/* Labels */}
                        <text x="110" y="140" fontSize="8" fill="#94a3b8" className="font-bold">SHAFT</text>
                        <text x="40" y="60" fontSize="8" fill={neckShaftAngle < 120 ? "#f43f5e" : "#3b82f6"} className="font-bold">ANGLE: {neckShaftAngle}°</text>
                      </svg>
                    </div>

                    <div className="w-64 space-y-6">
                      <div className="flex justify-between text-[11px] font-black uppercase text-slate-400 tracking-widest">
                        <span>Angle Control</span>
                        <span className={neckShaftAngle < 120 ? "text-rose-500" : "text-emerald-500"}>{neckShaftAngle}°</span>
                      </div>
                      <input 
                        type="range" min="80" max="150" value={neckShaftAngle}
                        onChange={(e) => setNeckShaftAngle(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center shadow-sm">
                         <p className="text-[10px] font-black uppercase mb-1 text-slate-400">Diagnosis</p>
                         <p className={`text-sm font-black uppercase ${neckShaftAngle < 120 ? 'text-rose-600' : 'text-emerald-600'}`}>
                           {neckShaftAngle < 120 ? "⚠️ COXA VARA" : neckShaftAngle > 140 ? "⚠️ COXA VALGA" : "Normal Pediatric Hip"}
                         </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {slides[currentSlide].type === 'quiz_start' && (
                <div className="text-center space-y-8">
                  <div className="w-20 h-20 bg-blue-600 rounded-[1.5rem] mx-auto flex items-center justify-center shadow-xl">
                    <ClipboardList size={40} className="text-white" />
                  </div>
                  <h2 className="text-4xl font-black text-slate-800 uppercase italic tracking-tighter">Final Review</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                     <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-center shadow-sm">
                        <p className="text-[10px] font-black text-blue-600 uppercase mb-2 tracking-widest">Key Angle</p>
                        <p className="text-lg font-black text-slate-800">HEA &gt; 60°</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Indication for Surgery</p>
                     </div>
                     <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-center shadow-sm">
                        <p className="text-[10px] font-black text-emerald-600 uppercase mb-2 tracking-widest">Gait</p>
                        <p className="text-lg font-black text-slate-800">TRENDELENBURG</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Shortened Abductor Arm</p>
                     </div>
                     <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-center shadow-sm">
                        <p className="text-[10px] font-black text-rose-600 uppercase mb-2 tracking-widest">Treatment</p>
                        <p className="text-lg font-black text-slate-800">VALGUS OSTEO</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Redirects Shearing Forces</p>
                     </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Nav Controls */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
          <div className="flex gap-2">
            <button 
              onClick={prevSlide} 
              disabled={currentSlide === 0} 
              className="p-3 bg-white rounded-xl hover:bg-blue-50 disabled:opacity-30 transition-all border border-slate-200 text-slate-600 shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide} 
              disabled={currentSlide === slides.length - 1} 
              className="p-3 bg-white rounded-xl hover:bg-blue-50 disabled:opacity-30 transition-all border border-slate-200 text-slate-600 shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="hidden md:flex gap-1.5">
            {slides.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-8 bg-blue-500' : 'w-2 bg-slate-200'}`}></div>
            ))}
          </div>
          <div className="text-right">
             <p className="text-[9px] font-black text-slate-400 tracking-[0.1em] uppercase">Coxa Vara AI Module</p>
             <p className="text-[8px] font-bold text-slate-300 italic uppercase">Pediatric Orthopedics 2026</p>
          </div>
        </div>
        </div>
        </div>
      )}

      {/* AI Intelligence Modal */}
      <AnimatePresence>
        {isAiModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white border border-slate-200 w-full max-w-3xl max-h-[85vh] rounded-[2.5rem] flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg"><Sparkles className="text-indigo-600" size={20} /></div>
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight italic">{loading ? "Analyzing Deformity..." : "AI Consultant Insights"}</h3>
                </div>
                <button onClick={() => setIsAiModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400"><X size={24} /></button>
              </div>
              <div className="p-8 flex-grow overflow-y-auto no-scrollbar">
                {loading ? (
                  <div className="h-full flex flex-col items-center justify-center gap-6 min-h-[300px]">
                     <Loader2 className="animate-spin text-indigo-500" size={48} />
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse">Running Biomechanical Analysis...</p>
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                    <div className="prose prose-slate max-w-none">
                      <div className="whitespace-pre-wrap font-medium text-slate-600 bg-slate-50 p-8 rounded-3xl border border-slate-100 leading-relaxed text-base italic shadow-inner">
                        {aiContent}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6 border-t border-slate-100 bg-slate-50/50 text-center">
                <button 
                  onClick={() => setIsAiModalOpen(false)} 
                  className="px-10 py-3 bg-white border border-slate-200 hover:border-blue-200 text-slate-600 rounded-full text-[11px] font-black uppercase transition-all shadow-sm"
                >
                  Dismiss Analysis
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quick Revision HUD */}
      <div className="w-full mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-white rounded-[2rem] border border-slate-200 hover:border-blue-200 transition-all group shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-blue-500">
            <Info size={20} className="group-hover:rotate-12 transition-transform" />
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Radiology Note</h4>
          </div>
          <p className="text-sm font-bold text-slate-400 leading-relaxed group-hover:text-slate-600 transition-colors">
            Measurement of the <span className="text-blue-500 font-extrabold">HEA Angle</span> is crucial. If it stays under 45°, it will likely resolve. Above 60° is almost always progressive.
          </p>
        </div>
        <div className="p-6 bg-white rounded-[2rem] border border-slate-200 hover:border-rose-200 transition-all group shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-rose-500">
            <AlertCircle size={20} className="group-hover:animate-bounce" />
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Clinical Red Flag</h4>
          </div>
          <p className="text-sm font-bold text-slate-400 leading-relaxed group-hover:text-slate-600 transition-colors italic">
            Shortened femoral neck and varus leads to secondary abductor insufficiency. The child walks with a limp because the muscles cannot pull effectively.
          </p>
        </div>
        <div className="p-6 bg-white rounded-[2rem] border border-slate-200 hover:border-emerald-200 transition-all group shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-emerald-500">
            <ShieldAlert size={20} className="group-hover:scale-110 transition-transform" />
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Treatment Physics</h4>
          </div>
          <p className="text-sm font-bold text-slate-400 leading-relaxed group-hover:text-slate-600 transition-colors">
            A valgus osteotomy works by changing <span className="text-emerald-500 font-extrabold">Shear</span> forces into <span className="text-emerald-500 font-extrabold">Compression</span> forces, allowing physis healing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PediatricCoxaVara;
