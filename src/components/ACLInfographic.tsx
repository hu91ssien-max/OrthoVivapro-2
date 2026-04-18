import React, { useState } from 'react';
import { 
  Activity, 
  Stethoscope, 
  Settings, 
  Zap, 
  Clipboard, 
  Info,
  ChevronRight,
  Wind,
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import { motion } from "motion/react";

interface ACLInfographicProps {
  onBack: () => void;
  onPractice?: () => void;
}

const ACLInfographic = ({ onBack, onPractice }: ACLInfographicProps) => {
  const [activeSection, setActiveSection] = useState('anatomy');

  const sections = {
    anatomy: {
      title: "Anatomy & Biomechanics",
      icon: <Activity className="w-5 h-5" />,
      content: [
        { label: "Origin", text: "Medial wall of the lateral femoral condyle." },
        { label: "Insertion", text: "Anterior to the intercondylar eminence of the tibia." },
        { label: "Bundles", text: "Anteromedial (tight in flexion) and Posterolateral (tight in extension)." },
        { label: "Blood Supply", text: "Middle genicular artery." },
        { label: "Function", text: "Primary restraint to anterior tibial translation; secondary restraint to tibial rotation." }
      ]
    },
    presentation: {
      title: "Clinical Presentation",
      icon: <Zap className="w-5 h-5" />,
      content: [
        { label: "Mechanism", text: "Non-contact pivoting injury (70%); valgus stress with external rotation." },
        { label: "Symptoms", text: "Audible 'pop' at time of injury; immediate swelling (hemarthrosis)." },
        { label: "History", text: "Instability ('giving way') especially with side-to-side movements." }
      ]
    },
    physicalExam: {
      title: "Physical Exam",
      icon: <Stethoscope className="w-5 h-5" />,
      content: [
        { label: "Lachman Test", text: "Most sensitive test (30° flexion). Evaluates anterior translation." },
        { label: "Pivot Shift", text: "Most specific test. Demonstrates rotational instability (reduction at 20-30°)." },
        { label: "Anterior Drawer", text: "90° flexion. Less sensitive in acute setting due to hamstring guarding." }
      ]
    },
    imaging: {
      title: "Imaging Findings",
      icon: <Info className="w-5 h-5" />,
      content: [
        { label: "X-Ray", text: "Segond Fracture (avulsion of lateral capsule) is pathognomonic." },
        { label: "MRI (Gold Standard)", text: "Discontinuity of fibers, bone bruising in lateral femoral condyle & lateral tibial plateau." },
        { label: "Associated", text: "Check for 'O'Donoghue's Unhappy Triad' (ACL + MCL + Medial Meniscus)." }
      ]
    },
    treatment: {
      title: "Treatment & Management",
      icon: <Settings className="w-5 h-5" />,
      content: [
        { label: "Non-operative", text: "Low-demand patients, partial tears, or those without instability symptoms. Focus on PT." },
        { label: "Operative", text: "ACL Reconstruction (ACLR) for young active patients or those with instability." },
        { label: "Graft Options", text: "BTB (Bone-Tendon-Bone), Hamstring Autograft, Quad Tendon, or Allografts." }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 font-sans transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-bold transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
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
        <header className="bg-blue-900 dark:bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-12 mb-8 shadow-2xl relative overflow-hidden transition-colors border border-blue-800 dark:border-slate-800">
          <div className="relative z-10">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-blue-800/50 dark:bg-emerald-500/10 px-3 py-1 rounded-full text-[10px] font-black border border-blue-400/30 dark:border-emerald-500/20 text-blue-200 dark:text-emerald-400 uppercase tracking-widest">Knee & Sports</span>
              <span className="bg-red-500/80 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">High Yield</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-tight">ACL Injury <br /> <span className="text-blue-300 dark:text-emerald-400">Clinical Guide</span></h1>
            <p className="text-blue-200 dark:text-slate-400 mt-4 font-bold text-sm">Anterior Cruciate Ligament • Orthobullets 2026 Summary</p>
          </div>
          <Activity className="absolute top-0 right-0 p-12 opacity-10 text-white" size={240} />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation/TOC */}
          <div className="md:col-span-1 space-y-3">
            {Object.entries(sections).map(([key, section]) => (
              <button
                key={key}
                onClick={() => setActiveSection(key as any)}
                className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300 border-2 ${
                  activeSection === key 
                    ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-xl border-blue-600 dark:border-blue-500 translate-x-2' 
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-transparent hover:border-blue-200 dark:hover:border-slate-700 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`${activeSection === key ? 'text-white' : 'text-blue-500 dark:text-blue-400'}`}>
                    {section.icon}
                  </div>
                  <span className="font-black text-xs uppercase tracking-tight">{section.title}</span>
                </div>
                {activeSection === key ? <ChevronRight className="w-4 h-4" /> : null}
              </button>
            ))}

            {/* Quick Fact Card */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 bg-amber-50 dark:bg-amber-500/5 border-2 border-amber-100 dark:border-amber-500/10 rounded-[2.5rem] p-8 shadow-sm transition-colors"
            >
              <h3 className="text-amber-800 dark:text-amber-500 font-black text-xs uppercase flex items-center gap-2 mb-4 italic tracking-widest">
                <Wind className="w-4 h-4" /> The "Segond" Fact
              </h3>
              <p className="text-sm text-amber-900/80 dark:text-slate-300 leading-relaxed font-bold">
                A <strong className="text-amber-600 italic">Segond Fracture</strong> on plain film indicates a 75-100% chance of an associated ACL tear.
              </p>
            </motion.div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-2">
            <motion.div 
              key={activeSection}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 h-full overflow-hidden transition-colors"
            >
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex items-center gap-4 text-blue-900 dark:text-blue-400 transition-colors">
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                  {sections[activeSection as keyof typeof sections].icon}
                </div>
                <h2 className="text-2xl font-black italic tracking-tighter uppercase">{sections[activeSection as keyof typeof sections].title}</h2>
              </div>
              
              <div className="p-8 space-y-8">
                {sections[activeSection as keyof typeof sections].content.map((item, idx) => (
                  <div key={idx} className="group transition-all">
                    <div className="flex items-start gap-5">
                      <div className="mt-1.5 h-3 w-3 rounded-full bg-blue-500 dark:bg-blue-400 shadow-sm shadow-blue-200 dark:shadow-none group-hover:scale-125 transition-transform shrink-0" />
                      <div>
                        <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2 transition-colors">
                          {item.label}
                        </h4>
                        <p className="text-slate-700 dark:text-slate-200 font-bold leading-relaxed transition-colors">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Interactive Diagram Placeholder / Visual Aid */}
                {activeSection === 'physicalExam' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-10 p-8 bg-blue-50 dark:bg-blue-500/5 rounded-[2rem] border-2 border-blue-100 dark:border-blue-500/10 transition-colors"
                  >
                    <h5 className="text-blue-800 dark:text-blue-400 font-black text-[10px] uppercase tracking-widest mb-6">Diagnostic Accuracy Indicators</h5>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] text-blue-700 dark:text-blue-300 font-black uppercase tracking-widest">
                          <span>LACHMAN SENSITIVITY</span>
                          <span>~95%</span>
                        </div>
                        <div className="w-full bg-blue-200/50 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '95%' }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="bg-blue-600 dark:bg-blue-500 h-full rounded-full" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] text-blue-700 dark:text-blue-300 font-black uppercase tracking-widest">
                          <span>PIVOT SHIFT SPECIFICITY</span>
                          <span>~98%</span>
                        </div>
                        <div className="w-full bg-blue-200/50 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '98%' }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            className="bg-blue-600 dark:bg-blue-500 h-full rounded-full" 
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer info */}
        <footer className="mt-20 text-center">
          <div className="inline-block px-8 py-3 bg-slate-100 dark:bg-slate-900 rounded-full text-slate-400 dark:text-slate-600 text-[10px] font-black uppercase tracking-widest transition-colors">
            © 2026 Orthobullets Comprehensive Review • Reference: Zaky Ortho Files
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ACLInfographic;
