import React, { useState } from 'react';
import { 
  Dna, 
  Search, 
  Stethoscope, 
  Scissors,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Droplet,
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import { motion } from "motion/react";

interface MeniscusInfographicProps {
  onBack: () => void;
  onPractice?: () => void;
}

const MeniscusInfographic = ({ onBack, onPractice }: MeniscusInfographicProps) => {
  const [activeSection, setActiveSection] = useState('anatomy');

  const content = {
    anatomy: {
      title: "Anatomy & Vascularity",
      icon: <Dna className="w-5 h-5" />,
      theme: "emerald",
      data: [
        { label: "Function", text: "Load transmission, shock absorption, and joint stability." },
        { label: "Vascular Zones", text: "Red-Red (Peripheral 3mm - Vascular); Red-White (Middle); White-White (Central - Avascular)." },
        { label: "Composition", text: "90% Type I Collagen. Fibroelastic cartilage." },
        { label: "Medial Meniscus", text: "C-shaped, larger, and less mobile than the lateral meniscus. Firmly attached to the deep MCL." },
        { label: "Lateral Meniscus", text: "O-shaped, more mobile. Not attached to the LCL." }
      ]
    },
    presentation: {
      title: "Clinical Presentation",
      icon: <Search className="w-5 h-5" />,
      theme: "amber",
      data: [
        { label: "Mechanism", text: "Twisting injury with the foot planted." },
        { label: "Symptoms", text: "Joint line pain, mechanical symptoms (popping, catching, or true locking)." },
        { label: "Acute Phase", text: "Delayed swelling (6-24 hours) compared to immediate ACL hemarthrosis." },
        { label: "Pain Profile", text: "Deep-seated pain, exacerbated by squatting or pivoting." }
      ]
    },
    examination: {
      title: "Physical Exam",
      icon: <Stethoscope className="w-5 h-5" />,
      theme: "blue",
      data: [
        { label: "Joint Line Tenderness", text: "Most sensitive physical exam finding (76% sensitive)." },
        { label: "McMurray Test", text: "Palpable pop/click while rotating tibia and extending the knee. High specificity." },
        { label: "Steinman Test", text: "Pain moves anteriorly with knee extension and posteriorly with flexion." },
        { label: "Apley Grind Test", text: "Compression and rotation in the prone position." }
      ]
    },
    classification: {
      title: "Tear Types & MRI",
      icon: <Droplet className="w-5 h-5" />,
      theme: "purple",
      data: [
        { label: "Vertical/Longitudinal", text: "Common in young patients; often associated with ACL tears." },
        { label: "Bucket Handle", text: "A displaced longitudinal tear that can cause mechanical locking." },
        { label: "Horizontal", text: "Common in older patients; often degenerative." },
        { label: "MRI Signal", text: "Grade 3 signal (high signal intensity communicating with the articular surface) confirms a tear." }
      ]
    },
    management: {
      title: "Management",
      icon: <Scissors className="w-5 h-5" />,
      theme: "rose",
      data: [
        { label: "Non-operative", text: "Degenerative tears, stable tears (<10mm), or peripheral tears in the Red-Red zone." },
        { label: "Partial Meniscectomy", text: "Indicated for symptomatic tears not amenable to repair (e.g., central White-White zone)." },
        { label: "Meniscal Repair", text: "Preferred for peripheral, vertical tears in young patients to preserve long-term joint health." },
        { label: "Root Tears", text: "Require repair to prevent rapid progression of osteoarthritis." }
      ]
    }
  };

  const current = content[activeSection as keyof typeof content];

  const themeClasses: Record<string, string> = {
    emerald: "bg-emerald-600 dark:bg-emerald-500 border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-button:bg-emerald-600",
    amber: "bg-amber-600 dark:bg-amber-500 border-amber-100 dark:border-amber-500/20 text-amber-600 dark:text-amber-400 font-button:bg-amber-600",
    blue: "bg-blue-600 dark:bg-blue-500 border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 font-button:bg-blue-600",
    purple: "bg-purple-600 dark:bg-purple-500 border-purple-100 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 font-button:bg-purple-600",
    rose: "bg-rose-600 dark:bg-rose-500 border-rose-100 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 font-button:bg-rose-600"
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-slate-950 p-6 font-sans antialiased text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-bold transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Portal
          </button>
          
          {onPractice && (
            <button 
              onClick={onPractice}
              className="flex items-center gap-2 px-5 py-2 bg-emerald-600 dark:bg-emerald-500 text-white text-xs font-black rounded-xl uppercase hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 dark:shadow-none"
            >
              <BookOpen size={14} />
              Practice Sports Med
            </button>
          )}
        </div>

        {/* Header */}
        <div className="bg-slate-900 dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 mb-8 text-white shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8 border-b-8 border-emerald-500 transition-colors">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-emerald-500 text-slate-900 text-[10px] font-black px-3 py-1 rounded-full tracking-tighter uppercase">Topic 04</span>
              <h2 className="text-emerald-400 font-bold tracking-[0.2em] text-xs uppercase">Orthobullets 2026</h2>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight italic uppercase">Meniscal <span className="text-emerald-400">Tears</span></h1>
            <p className="text-slate-400 mt-4 font-bold text-sm">Comprehensive clinical summary and management pathways</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 flex items-center gap-6">
            <div className="text-right">
              <div className="text-emerald-400 font-black text-2xl leading-none">Red-Red</div>
              <div className="text-[10px] text-white/40 font-black uppercase tracking-widest mt-1">Healing Zone</div>
            </div>
            <div className="h-12 w-[1px] bg-white/10"></div>
            <div className="text-right">
              <div className="text-rose-400 font-black text-2xl leading-none">White-White</div>
              <div className="text-[10px] text-white/40 font-black uppercase tracking-widest mt-1">Avascular</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Navigation */}
          <div className="lg:col-span-4 space-y-3">
            {Object.entries(content).map(([key, section]) => {
              const isActive = activeSection === key;
              const theme = themeClasses[section.theme];
              const bgClass = theme.split(' ')[0];
              const textClass = theme.split(' ')[2];

              return (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`w-full group flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 ${
                    isActive 
                      ? `bg-white dark:bg-slate-900 border-emerald-500 dark:border-emerald-500 shadow-xl translate-x-2` 
                      : 'bg-white dark:bg-slate-900 border-transparent dark:border-slate-800/50 text-slate-500 hover:border-slate-200 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl transition-colors ${
                      isActive ? `${bgClass} text-white` : 'bg-slate-100 dark:bg-slate-800'
                    }`}>
                      {section.icon}
                    </div>
                    <span className={`font-black text-xs uppercase tracking-tight ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                      {section.title}
                    </span>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-all ${isActive ? 'opacity-100 translate-x-1 text-emerald-500' : 'opacity-0'}`} />
                </button>
              );
            })}

            {/* Pathognomonic Alert */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-blue-900 dark:bg-blue-600 p-8 rounded-[2.5rem] shadow-lg relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-blue-300" />
                  <span className="font-black text-[10px] uppercase tracking-[0.2em] text-blue-200">High Yield Note</span>
                </div>
                <p className="text-sm leading-relaxed font-bold text-blue-50">
                  <span className="text-emerald-400">Joint line tenderness</span> is the single most sensitive finding. If a patient presents with <span className="text-amber-400 italic">true locking</span>, suspect a <span className="underline decoration-amber-400/50 underline-offset-4">Bucket-Handle tear</span>.
                </p>
              </div>
              <div className="absolute -bottom-8 -right-8 opacity-10">
                <Stethoscope size={160} className="text-white" />
              </div>
            </motion.div>
          </div>

          {/* Details Pane */}
          <div className="lg:col-span-8">
            <motion.div 
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden min-h-[550px] flex flex-col transition-colors"
            >
              <div className={`p-10 flex items-center gap-6 border-b border-slate-100 dark:border-slate-800 ${themeClasses[current.theme].split(' ')[0]}`}>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                   {React.cloneElement(current.icon as React.ReactElement, { 
                     className: `w-8 h-8 ${themeClasses[current.theme].split(' ')[2]}` 
                   })}
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">{current.title}</h2>
                  <div className="h-1.5 w-16 bg-white/30 rounded-full mt-2"></div>
                </div>
              </div>

              <div className="p-10 flex-grow">
                <div className="space-y-8">
                  {current.data.map((item, idx) => {
                    const isManagement = activeSection === 'management';
                    const bulletColor = isManagement ? 'bg-rose-500 border-rose-500' : 'bg-emerald-500 border-emerald-500';
                    
                    return (
                      <div key={idx} className="flex gap-6 group">
                        <div className="flex flex-col items-center">
                          <div className={`w-3.5 h-3.5 rounded-full border-2 mt-1.5 transition-all group-hover:scale-125 ${bulletColor}`} />
                          <div className="w-[2px] flex-grow bg-slate-100 dark:bg-slate-800 mt-3 mb-1 group-last:hidden" />
                        </div>
                        <div className="pb-4">
                          <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2 transition-colors">
                            {item.label}
                          </h4>
                          <p className="text-slate-800 dark:text-slate-200 text-lg leading-relaxed font-bold transition-colors">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Summary Bar */}
              {activeSection === 'management' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 bg-rose-50 dark:bg-rose-500/5 border-t border-rose-100 dark:border-rose-500/20 flex items-center gap-6 transition-colors"
                >
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
                    <AlertTriangle className="w-8 h-8 text-rose-600 dark:text-rose-400 shrink-0" />
                  </div>
                  <p className="text-sm text-rose-900 dark:text-slate-300 font-black uppercase tracking-tight leading-relaxed">
                    Preserve the meniscus whenever possible to prevent <span className="text-rose-600 italic">early-onset osteoarthritis</span>.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        <footer className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800 text-center">
          <div className="inline-block px-10 py-3 bg-slate-100 dark:bg-slate-900 rounded-full text-slate-400 dark:text-slate-600 text-[10px] font-black uppercase tracking-[0.5em] transition-colors">
            Orthobullets Review • 2026 High Yield Series • Sports Medicine
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MeniscusInfographic;
