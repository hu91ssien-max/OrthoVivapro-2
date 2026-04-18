import React, { useState } from 'react';
import { motion } from "motion/react";
import { 
  Clipboard, 
  Activity, 
  ArrowLeft,
  BookOpen
} from 'lucide-react';

// Custom Inline SVG Icons for Clinical Precision
const Icons = {
  Scale: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/></svg>
  ),
  Clipboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
  ),
  Activity: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
  )
};

interface CTEVContentProps {
  onBack: () => void;
  onPractice: () => void;
}

const CTEVRevision = ({ onBack, onPractice }: CTEVContentProps) => {
  const [activeTab, setActiveTab] = useState('comparison');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans pb-20 transition-colors duration-300"
    >
      {/* Utility Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 transition-colors">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          
          <button 
            onClick={onPractice}
            className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white text-xs font-black rounded-full uppercase hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-none"
          >
            <BookOpen size={14} />
            Practice CTEV
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 py-10 md:py-14 border-b-2 border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8 mb-10 transition-colors">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic transition-colors">
            CTEV <span className="text-blue-600">Classification</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-xs mt-2 uppercase tracking-[0.3em] transition-colors">
            Pirani vs. Dimeglio Scoring Systems
          </p>
        </div>
        <div className="flex bg-slate-200 dark:bg-slate-800 p-1.5 rounded-2xl transition-colors">
          <button 
            onClick={() => setActiveTab('comparison')}
            className={`px-6 py-2.5 text-[10px] font-black uppercase rounded-xl transition-all ${activeTab === 'comparison' ? 'bg-white dark:bg-slate-700 shadow-md text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400 dark:hover:text-slate-200'}`}
          >
            Comparison
          </button>
          <button 
            onClick={() => setActiveTab('details')}
            className={`px-6 py-2.5 text-[10px] font-black uppercase rounded-xl transition-all ${activeTab === 'details' ? 'bg-white dark:bg-slate-700 shadow-md text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400 dark:hover:text-slate-200'}`}
          >
            Parameters
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4">
        {activeTab === 'comparison' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Summary Table */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-12 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 dark:bg-slate-950 text-white">
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Feature</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest border-l border-white/10 whitespace-nowrap">Pirani Score</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest border-l border-white/10 whitespace-nowrap">Dimeglio Score</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-800 italic">
                    <tr className="dark:bg-slate-900 transition-colors">
                      <td className="p-6 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase bg-slate-50 dark:bg-slate-800/50 whitespace-nowrap">Number of Items</td>
                      <td className="p-6 dark:text-slate-300">6 (3 Midfoot, 3 Hindfoot)</td>
                      <td className="p-6 dark:text-slate-300">4 Main + 4 Bonus Points</td>
                    </tr>
                    <tr className="dark:bg-slate-900 transition-colors">
                      <td className="p-6 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase bg-slate-50 dark:bg-slate-800/50 whitespace-nowrap">Scoring Range</td>
                      <td className="p-6 font-black text-blue-600 dark:text-blue-400 italic">0 — 6</td>
                      <td className="p-6 font-black text-amber-600 dark:text-amber-400 italic">0 — 20</td>
                    </tr>
                    <tr className="dark:bg-slate-900 transition-colors">
                      <td className="p-6 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase bg-slate-50 dark:bg-slate-800/50 whitespace-nowrap">Grading Scale</td>
                      <td className="p-6 dark:text-slate-300">0, 0.5, or 1.0 per item</td>
                      <td className="p-6 dark:text-slate-300">0 to 4 per main parameter</td>
                    </tr>
                    <tr className="dark:bg-slate-900 transition-colors">
                      <td className="p-6 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase bg-slate-50 dark:bg-slate-800/50 whitespace-nowrap">Best Use Case</td>
                      <td className="p-6 dark:text-slate-300">Simple, predicting casting duration</td>
                      <td className="p-6 dark:text-slate-300">Detailed, surgical research</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Quick Cards */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="lg:col-span-6 bg-blue-600 rounded-[2rem] p-8 text-white shadow-xl shadow-blue-100 dark:shadow-none"
            >
              <div className="flex items-center gap-2 mb-6 opacity-80 uppercase text-[10px] font-black tracking-widest">
                <Icons.Activity />
                <span>Pirani High-Yield</span>
              </div>
              <p className="text-2xl font-black leading-tight mb-8">HS &gt; 1.0 + MS &lt; 0.5 = <span className="underline decoration-blue-300 decoration-4">Tenotomy Likely</span></p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
                  <span className="block text-[8px] font-black uppercase opacity-60 mb-1 tracking-wider">Hindfoot (HS)</span>
                  <span className="text-xs font-bold">Equinus, Crease, Heel</span>
                </div>
                <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
                  <span className="block text-[8px] font-black uppercase opacity-60 mb-1 tracking-wider">Midfoot (MS)</span>
                  <span className="text-xs font-bold">Border, Crease, Talar Head</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="lg:col-span-6 bg-slate-900 dark:bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl border border-white/5"
            >
              <div className="flex items-center gap-2 mb-6 opacity-80 uppercase text-[10px] font-black tracking-widest text-amber-400">
                <Icons.Activity />
                <span>Dimeglio Grading</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2.5 border-b border-white/5">
                  <span className="text-[10px] font-black uppercase tracking-widest">Grade I (Benign)</span>
                  <span className="px-3 py-1 bg-green-500 rounded-lg text-[9px] font-black">&lt; 5 pts</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-white/5">
                  <span className="text-[10px] font-black uppercase tracking-widest">Grade II (Moderate)</span>
                  <span className="px-3 py-1 bg-amber-500 rounded-lg text-[9px] font-black">5 - 10 pts</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-white/5">
                  <span className="text-[10px] font-black uppercase tracking-widest">Grade III (Severe)</span>
                  <span className="px-3 py-1 bg-orange-600 rounded-lg text-[9px] font-black">10 - 15 pts</span>
                </div>
                <div className="flex justify-between items-center py-2.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">Grade IV (V. Severe)</span>
                  <span className="px-3 py-1 bg-red-600 rounded-lg text-[9px] font-black">15 - 20 pts</span>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pirani Detail */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="px-4 text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-widest">Pirani Parameters (6 Total)</h3>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 transition-colors">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase mb-4 flex items-center gap-2 tracking-widest">
                    <div className="w-2 h-2 bg-blue-500 rounded-full shadow-sm shadow-blue-200 dark:shadow-none"></div> Midfoot Score (MS)
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                      <div className="p-1 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400"><Icons.Check /></div> 
                      Curved Lateral Border
                    </li>
                    <li className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                      <div className="p-1 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400"><Icons.Check /></div> 
                      Medial Foot Crease
                    </li>
                    <li className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                      <div className="p-1 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400"><Icons.Check /></div> 
                      Talar Head Coverage
                    </li>
                  </ul>
                </div>
                <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase mb-4 flex items-center gap-2 tracking-widest">
                    <div className="w-2 h-2 bg-blue-500 rounded-full shadow-sm shadow-blue-200 dark:shadow-none"></div> Hindfoot Score (HS)
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                      <div className="p-1 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400"><Icons.Check /></div> 
                      Posterior Crease
                    </li>
                    <li className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                      <div className="p-1 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400"><Icons.Check /></div> 
                      Rigid Equinus
                    </li>
                    <li className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                      <div className="p-1 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400"><Icons.Check /></div> 
                      Empty Heel Pad
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Dimeglio Detail */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="px-4 text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 tracking-widest">Dimeglio Parameters (8 Total)</h3>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 transition-colors">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase mb-4 flex items-center gap-2 tracking-widest">
                    <div className="w-2 h-2 bg-amber-500 rounded-full shadow-sm shadow-amber-200 dark:shadow-none"></div> Main Items (0-4 pts)
                  </h4>
                  <ul className="grid grid-cols-2 gap-3">
                    <li className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-tighter border border-slate-100 dark:border-slate-700">1. Equinus</li>
                    <li className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-tighter border border-slate-100 dark:border-slate-700">2. Varus</li>
                    <li className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-tighter border border-slate-100 dark:border-slate-700">3. Adduction</li>
                    <li className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-tighter border border-slate-100 dark:border-slate-700">4. Inversion</li>
                  </ul>
                </div>
                <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase mb-4 flex items-center gap-2 tracking-widest">
                    <div className="w-2 h-2 bg-amber-500 rounded-full shadow-sm shadow-amber-200 dark:shadow-none"></div> Bonus Points (1 pt)
                  </h4>
                  <div className="space-y-2">
                    <div className="bg-amber-50/50 dark:bg-amber-500/10 px-4 py-3 rounded-2xl text-[10px] font-bold text-amber-800 dark:text-amber-200 border border-amber-100 dark:border-amber-500/20">• Posterior Crease presence</div>
                    <div className="bg-amber-50/50 dark:bg-amber-500/10 px-4 py-3 rounded-2xl text-[10px] font-bold text-amber-800 dark:text-amber-200 border border-amber-100 dark:border-amber-500/20">• Medial Crease presence</div>
                    <div className="bg-amber-50/50 dark:bg-amber-500/10 px-4 py-3 rounded-2xl text-[10px] font-bold text-amber-800 dark:text-amber-200 border border-amber-100 dark:border-amber-500/20">• Abnormal Musculature</div>
                    <div className="bg-amber-50/50 dark:bg-amber-500/10 px-4 py-3 rounded-2xl text-[10px] font-bold text-amber-800 dark:text-amber-200 border border-amber-100 dark:border-amber-500/20">• Cavus deformity presence</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Clinical Pearl Footer */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-16 p-8 bg-blue-50 dark:bg-blue-500/10 rounded-[3rem] border-2 border-blue-100 dark:border-blue-500/20 flex flex-col md:flex-row items-center gap-8 transition-colors"
        >
          <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-2xl shadow-blue-200 dark:shadow-none">
            <Icons.Clipboard />
          </div>
          <div>
            <h4 className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1.5">Board Exam Pearl</h4>
            <p className="text-base font-bold text-blue-900 dark:text-slate-300 leading-relaxed italic transition-colors">
              Pirani scoring is used clinically to <span className="underline decoration-blue-400 decoration-2">predict the number of casts</span>. 
              A score &gt; 4.0 often predicts &gt; 7 casts, while a Hindfoot Score (HS) of 1.0 reliably predicts the need for a <span className="text-red-600 dark:text-rose-500 uppercase font-black">Percutaneous Achilles Tenotomy</span>.
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="max-w-6xl mx-auto mt-20 text-center">
        <div className="inline-block px-12 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full shadow-2xl transition-colors">
          <p className="text-[10px] font-black uppercase tracking-[0.5em]">Ponseti Revision • CTEV Assessment • OrthoVivaPro AI</p>
        </div>
      </footer>
    </motion.div>
  );
};

export default CTEVRevision;
