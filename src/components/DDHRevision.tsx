import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  BookOpen, 
  Search, 
  Sparkles, 
  Baby, 
  Stethoscope, 
  AlertCircle,
  Stethoscope as StethoscopeIcon,
  ShieldCheck,
  LayoutGrid,
  ChevronRight,
  ClipboardList,
  Activity
} from 'lucide-react';
import Chart from 'chart.js/auto';
import { GoogleGenAI } from "@google/genai";

interface DDHRevisionProps {
  onBack: () => void;
  onPractice: () => void;
}

const DDHRevision = ({ onBack, onPractice }: DDHRevisionProps) => {
  const [caseResult, setCaseResult] = useState<string>("");
  const [isGeneratingCase, setIsGeneratingCase] = useState(false);
  const [term, setTerm] = useState("");
  const [translateResult, setTranslateResult] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Torticollis', 'Metatarsus Adductus', 'Other Packaging Deformities'],
          datasets: [{
            data: [20, 10, 70],
            backgroundColor: ['#EF4444', '#F59E0B', '#E2E8F0'],
            borderWidth: 0,
            hoverOffset: 4
          }]
        },
        options: {
          maintainAspectRatio: false,
          cutout: '65%',
          plugins: {
            legend: { 
              position: 'bottom', 
              labels: { 
                font: { family: 'Inter', size: 11 }, 
                usePointStyle: true, 
                padding: 15 
              } 
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return ` ${context.label}: ${context.raw}%`;
                }
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const handleGenerateCase = async () => {
    setIsGeneratingCase(true);
    setCaseResult("");
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Generate a brief clinical vignette of an infant (3-6 months old) for DDH board exam. Mention specific risk factors like torticollis, metatarsus adductus, etc. Ask for the next best step. Provide the correct answer in bold at the end with a brief justification. Keep it under 150 words.",
        config: {
          systemInstruction: "You are a professional medical board examiner focusing on Orthopedics. Be technical but clear. Response must be in markdown format."
        }
      });
      setCaseResult(response.text || "Failed to generate case.");
    } catch (error) {
      console.error(error);
      setCaseResult("Error connecting to AI Assistant. Please ensure your Gemini API key is configured.");
    } finally {
      setIsGeneratingCase(false);
    }
  };

  const handleTranslateTerm = async () => {
    if (!term.trim()) return;
    setIsTranslating(true);
    setTranslateResult("");
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `How would I explain this term to a parent in simple words: "${term}"? Context: DDH (Developmental Dysplasia of the Hip).`,
        config: {
          systemInstruction: "You are a compassionate pediatric orthopedic surgeon. Translate medical terms into parent-friendly language. Use simple analogies and reassure the parents. Keep it under 2 sentences."
        }
      });
      setTranslateResult(response.text || "No explanation available.");
    } catch (error) {
      console.error(error);
      setTranslateResult("Could not translate term.");
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20 transition-colors duration-300"
    >
      {/* Utility Bar */}
      <div className="bg-blue-900 border-b border-blue-800 sticky top-0 z-50 shadow-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-blue-800 rounded-lg text-blue-200 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="text-xl font-bold tracking-wider text-white">🦴 ORTHO<span className="text-blue-300">REVIEW</span></div>
          </div>
          <div className="flex gap-4 items-center">
             <button 
               onClick={onPractice}
               className="hidden md:flex items-center gap-2 text-xs font-black uppercase bg-blue-800 hover:bg-blue-700 text-blue-100 px-4 py-2 rounded-full transition-all border border-blue-700"
             >
               <BookOpen size={14} />
               Practice
             </button>
             <div className="text-xs font-black uppercase tracking-widest text-blue-200 border-l border-blue-700 pl-4 transition-colors">Pediatrics</div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-gradient-to-br from-blue-800 to-blue-600 text-white pt-16 pb-24 px-4 text-center overflow-hidden relative transition-colors">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-blue-900/50 backdrop-blur-sm text-blue-200 px-4 py-1.5 rounded-full text-[10px] font-black mb-6 uppercase tracking-[0.3em] border border-blue-700/50"
          >
            High-Yield Review
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tighter uppercase italic"
          >
            Developmental Dysplasia <br /> <span className="text-blue-300">of the Hip</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-blue-100 max-w-2xl mx-auto font-medium opacity-80"
          >
            A spectrum of abnormal development ranging from minor instability to frank dislocation.
          </motion.p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-[120px] opacity-20 -mr-48 -mt-24"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-10 -ml-20 -mb-20"></div>
      </header>

      <main className="max-w-7xl mx-auto px-4 -mt-12 space-y-8 relative z-20">

        {/* The Clinical Spectrum */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border-t-8 border-blue-500 transition-colors">
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3 uppercase tracking-tighter italic">
            <ClipboardList className="text-blue-600" />
            The Clinical Spectrum
          </h2>
          <p className="text-slate-500 font-bold text-sm mb-10 max-w-2xl leading-relaxed transition-colors">DDH represents a continuum of abnormal joint mechanics that escalate if unmanaged. Early clinical diagnosis is critical.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -5 }} className="w-full bg-blue-50/50 rounded-3xl p-8 text-center border-2 border-blue-50 transition-colors">
                <div className="text-4xl mb-4">🎈</div>
                <h3 className="font-black text-blue-800 text-lg uppercase italic tracking-tighter transition-colors">Instability</h3>
                <p className="text-xs font-bold text-slate-500 mt-4 leading-relaxed uppercase tracking-wider transition-colors">Hip is loose but remains located within the joint space.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="w-full bg-orange-50/50 rounded-3xl p-8 text-center border-2 border-orange-50 transition-colors">
                <div className="text-4xl mb-4">⚠️</div>
                <h3 className="font-black text-orange-700 text-lg uppercase italic tracking-tighter transition-colors">Subluxation</h3>
                <p className="text-xs font-bold text-slate-500 mt-4 leading-relaxed uppercase tracking-wider transition-colors">Femoral head is partially displaced from the acetabulum.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="w-full bg-rose-50/50 rounded-3xl p-8 text-center border-2 border-rose-50 transition-colors">
                <div className="text-4xl mb-4">🚨</div>
                <h3 className="font-black text-rose-700 text-lg uppercase italic tracking-tighter transition-colors">Frank Dislocation</h3>
                <p className="text-xs font-bold text-slate-500 mt-4 leading-relaxed uppercase tracking-wider transition-colors">Femoral head is completely displaced out of the acetabulum.</p>
            </motion.div>
          </div>
        </div>

        {/* AI CLINICAL ASSISTANT */}
        <div id="ai-tools" className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border-2 border-indigo-100 relative overflow-hidden transition-colors">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Sparkles size={120} className="text-indigo-600" />
          </div>
          
          <div className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-lg shadow-indigo-100 flex items-center gap-2">
            <Sparkles size={14} />
            AI Clinical Assistant
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
            <div className="space-y-6">
              <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600 transition-colors"><Activity size={20} /></div>
                Case Simulator
              </h3>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-loose transition-colors">Generate a high-yield clinical vignette to test your knowledge on DDH management.</p>
              
              <div className="space-y-4">
                <button 
                  onClick={handleGenerateCase} 
                  disabled={isGeneratingCase}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white text-[11px] font-black uppercase tracking-[0.2em] py-4 rounded-2xl transition shadow-xl shadow-indigo-100 flex justify-center items-center gap-3 active:scale-95"
                >
                  {isGeneratingCase ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Generate Case ✨</span>
                    </>
                  )}
                </button>
                <div className="min-h-[180px] bg-slate-50/50 rounded-[2rem] p-8 text-sm text-slate-700 border-2 border-slate-100 leading-relaxed overflow-hidden transition-colors">
                  {caseResult ? (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 prose prose-slate prose-sm max-w-none">
                      {caseResult.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-300 py-10 italic">
                      <LayoutGrid size={40} className="mb-4 opacity-50" />
                      Click to test your diagnosis skills
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-xl text-blue-600 transition-colors"><Search size={20} /></div>
                Parent Translator
              </h3>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-loose transition-colors">Translate complex orthopedic jargon into simple language for families.</p>
              
              <div className="space-y-4 flex-grow flex flex-col">
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="e.g. Acetabular Obliquity" 
                    className="flex-grow border-2 border-slate-100/50 bg-slate-50/50 rounded-2xl px-5 py-3 text-sm font-bold focus:ring-4 focus:ring-blue-100 transition-all placeholder:text-slate-300"
                  />
                  <button 
                    onClick={handleTranslateTerm} 
                    disabled={isTranslating || !term}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-black px-6 rounded-2xl transition shadow-lg shadow-blue-100 active:scale-95 flex items-center justify-center min-w-[60px]"
                  >
                    {isTranslating ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <Sparkles size={18} />
                    )}
                  </button>
                </div>
                <div className="flex-grow min-h-[140px] bg-blue-50/30 rounded-[2rem] p-8 text-sm text-blue-900 border-2 border-blue-50/50 leading-relaxed flex items-center justify-center transition-colors">
                  {translateResult ? (
                    <div className="animate-in fade-in duration-500 font-bold italic text-blue-800 text-center">
                      <span className="text-xs text-blue-400 font-black block not-italic mb-3 uppercase tracking-widest">Parent-Friendly Explanation:</span>
                      "{translateResult}"
                    </div>
                  ) : (
                    <span className="text-blue-200 font-black uppercase text-[10px] tracking-widest">Enter a clinical term</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 flex flex-col h-full border border-slate-100">
              <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3 uppercase italic tracking-tighter">
                <AlertCircle className="text-rose-600" />
                Risk & Associations
              </h2>
              <p className="text-xs font-bold text-slate-400 leading-relaxed uppercase tracking-wider mb-10">Intrauterine crowding are major red flags. If one is present, hips MUST be screened.</p>
              <div className="flex-grow flex flex-col justify-center min-h-[300px]">
                  <canvas ref={chartRef}></canvas>
              </div>
              <div className="mt-8 bg-rose-50 text-rose-800 p-5 rounded-2xl text-[11px] font-black tracking-wider border-2 border-rose-100 flex items-start gap-4 uppercase leading-relaxed">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0 border border-rose-100 shadow-sm shadow-rose-100">🧬</div>
                  <span>Conditions with increased TYPE III COLLAGEN elevate elasticity and risk.</span>
              </div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 flex flex-col h-full border border-slate-100">
              <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3 uppercase italic tracking-tighter">
                <StethoscopeIcon className="text-blue-600" />
                Pathophysiology
              </h2>
              <p className="text-xs font-bold text-slate-400 leading-relaxed uppercase tracking-wider mb-10">Mechanical instability drives a cyclic structural failure.</p>
              <div className="space-y-4 flex-grow">
                  <div className="bg-slate-50/50 p-5 rounded-2xl border-2 border-slate-50 flex items-center group hover:border-blue-100 transition-colors">
                      <div className="text-2xl font-black text-blue-600 w-12 text-center group-hover:scale-110 transition-transform">⬆️</div>
                      <div>
                          <h4 className="font-black text-slate-800 uppercase italic tracking-tighter">INCREASED Obliquity</h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Acetabular roof becomes steeper.</p>
                      </div>
                  </div>
                  <div className="bg-slate-50/50 p-5 rounded-2xl border-2 border-slate-50 flex items-center group hover:border-orange-100 transition-colors">
                      <div className="text-2xl font-black text-orange-500 w-12 text-center group-hover:scale-110 transition-transform">⬇️</div>
                      <div>
                          <h4 className="font-black text-slate-800 uppercase italic tracking-tighter">DECREASED Concavity</h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Joint socket becomes shallower.</p>
                      </div>
                  </div>
                  <div className="bg-slate-50/50 p-5 rounded-2xl border-2 border-slate-50 flex items-center group hover:border-slate-300 transition-colors">
                      <div className="text-2xl font-black text-slate-700 w-12 text-center group-hover:scale-110 transition-transform">🧱</div>
                      <div>
                          <h4 className="font-black text-slate-800 uppercase italic tracking-tighter">Medial Wall Thickening</h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Remodeling in response to load.</p>
                      </div>
                  </div>
              </div>
              <div className="mt-8 bg-slate-900 text-slate-100 p-5 rounded-2xl text-[11px] font-black uppercase tracking-wider shadow-xl shadow-slate-200 flex items-start gap-4 leading-relaxed">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center shrink-0">👶</div>
                  <span>Teratologic Dislocation: Occurs early, associated with Neuromuscular conditions.</span>
              </div>
          </motion.div>
        </div>

        <div className="bg-slate-900 rounded-[3rem] shadow-2xl p-1 overflow-hidden">
            <div className="bg-white rounded-[2.8rem] p-8 md:p-14 m-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-4 uppercase italic tracking-tighter">
                          <Search className="text-indigo-600" />
                          Diagnosis
                        </h2>
                        <p className="text-sm font-bold text-slate-500 mb-10 leading-relaxed uppercase tracking-wider">Diagnosis is primarily a <span className="text-indigo-600 font-black underline decoration-2">CLINICAL</span> process through physical examination.</p>
                        <div className="space-y-6">
                            {[
                              { emoji: "🩺", title: "Equivocal Exams", desc: "When physical findings are uncertain." },
                              { emoji: "📈", title: "Treatment Monitoring", desc: "Track progress during brace treatment." },
                              { emoji: "🏥", title: "Post-Operative", desc: "Follow-up after surgical intervention." }
                            ].map((item, i) => (
                              <div key={i} className="flex items-start gap-5">
                                <div className="p-3 bg-indigo-50 rounded-xl text-xl shrink-0">{item.emoji}</div>
                                <div>
                                  <h4 className="font-black text-slate-800 uppercase italic tracking-tight text-lg">{item.title}</h4>
                                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose">{item.desc}</p>
                                </div>
                              </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-emerald-50 rounded-[2.5rem] p-10 border-4 border-emerald-100/50 shadow-inner">
                        <h2 className="text-2xl font-black text-emerald-800 mb-4 flex items-center gap-3 uppercase italic tracking-tighter">
                          <ShieldCheck className="text-emerald-500" />
                          Management
                        </h2>
                        <p className="text-[11px] font-black uppercase text-emerald-600/60 tracking-[0.2em] mb-8">Maintain CONCENTRIC REDUCTION to allow remodeling.</p>
                        <div className="space-y-6">
                            <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-3xl shadow-lg shadow-emerald-200/50 border-2 border-emerald-100">
                                <div className="text-[10px] font-black uppercase text-emerald-500 mb-2 tracking-widest flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                  Gold Standard
                                </div>
                                <div className="font-black text-2xl text-slate-800 uppercase italic tracking-tighter">PAVLIK HARNESS 🥇</div>
                                <div className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest italic">Non-operative Abduction Splinting</div>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 border-dashed">
                                <div className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Secondary Route</div>
                                <div className="font-bold text-xl text-slate-800 uppercase tracking-tighter">Reduction & Osteotomies</div>
                                <div className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest italic leading-relaxed">Closed or Open reduction with late-stage bony cuts.</div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="pb-12 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-10 uppercase italic tracking-tighter leading-none">
              High-Yield <span className="text-indigo-600">Exam Pearls</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { emoji: "🧠", title: "Check the Package", desc: "If Torticollis or Metatarsus Adductus is present, you MUST screen the hips.", color: "border-indigo-400 bg-indigo-50/30 text-indigo-900" },
                  { emoji: "📐", title: "Anatomy Shift", desc: "DDH results in a STEEPER (increased obliquity) and SHALLOWER acetabulum.", color: "border-blue-400 bg-blue-50/30 text-blue-900" },
                  { emoji: "🥇", title: "Absolute First Line", desc: "The Pavlik Harness is the definitive treatment for infant presentations.", color: "border-emerald-400 bg-emerald-50/30 text-emerald-900" }
                ].map((pearl, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -8 }}
                    className={`rounded-[2rem] p-10 border-b-8 shadow-xl transition-all ${pearl.color}`}
                  >
                    <div className="text-4xl mb-6">{pearl.emoji}</div>
                    <h3 className="font-black uppercase italic tracking-tighter text-xl mb-4">{pearl.title}</h3>
                    <p className="text-xs font-black uppercase tracking-widest leading-loose opacity-70">{pearl.desc}</p>
                  </motion.div>
                ))}
            </div>
        </div>

        <footer className="max-w-6xl mx-auto mt-20 text-center">
          <div className="inline-block px-12 py-4 bg-slate-900 text-white rounded-full shadow-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.5em]">DDH Mastery • Infographic Guide • OrthoVivaPro AI</p>
          </div>
        </footer>
      </main>
    </motion.div>
  );
};

export default DDHRevision;
