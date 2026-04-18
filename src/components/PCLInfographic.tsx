import React, { useState } from 'react';
import { 
  Shield, 
  Target, 
  Activity, 
  Scale, 
  AlertCircle,
  ChevronRight,
  Zap,
  Layers,
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import { motion } from "motion/react";

interface PCLInfographicProps {
  onBack: () => void;
  onPractice?: () => void;
}

const PCLInfographic = ({ onBack, onPractice }: PCLInfographicProps) => {
  const [activeTab, setActiveTab] = useState('anatomy');

  const content = {
    anatomy: {
      title: "Anatomy & Function",
      icon: <Layers className="w-5 h-5" />,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-500/10",
      border: "border-indigo-100 dark:border-indigo-500/20",
      items: [
        { label: "Origin", text: "Anterolateral aspect of the medial femoral condyle." },
        { label: "Insertion", text: "Posterior aspect of the tibia, 1 cm below the joint line." },
        { label: "Bundles", text: "Anterolateral (AL) - tight in flexion; Posteromedial (PM) - tight in extension." },
        { label: "Blood Supply", text: "Middle genicular artery." },
        { label: "Primary Role", text: "Primary restraint to posterior tibial translation." }
      ]
    },
    mechanism: {
      title: "Mechanism of Injury",
      icon: <Zap className="w-5 h-5" />,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-500/10",
      border: "border-orange-100 dark:border-orange-500/20",
      items: [
        { label: "Dashboard Injury", text: "Direct blow to the anterior tibia with the knee flexed (most common)." },
        { label: "Fall", text: "Falling onto a flexed knee with the foot in plantarflexion." },
        { label: "Hyper-mechanisms", text: "Hyperextension or severe hyperflexion forces." },
        { label: "Clinical Note", text: "Unlike ACL, patients may walk with a relatively normal gait acutely." }
      ]
    },
    examination: {
      title: "Physical Exam",
      icon: <Target className="w-5 h-5" />,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-100 dark:border-emerald-500/20",
      items: [
        { label: "Posterior Drawer", text: "Most sensitive test. Increased translation with knee flexed at 90°." },
        { label: "Posterior Sag Sign", text: "Tibia sags posteriorly when knee is flexed to 90° (Godfrey's Test)." },
        { label: "Quadriceps Active", text: "Patient contracts quad; tibia shifts anteriorly to reduce the sag." },
        { label: "Dial Test", text: "Used to differentiate between PCL alone and PCL + PLC injury." }
      ]
    },
    grading: {
      title: "Laxity Grading",
      icon: <Scale className="w-5 h-5" />,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-500/10",
      border: "border-rose-100 dark:border-rose-500/20",
      items: [
        { label: "Grade I", text: "0-5 mm translation (Tibia remains anterior to femoral condyles)." },
        { label: "Grade II", text: "5-10 mm translation (Tibia flush with femoral condyles)." },
        { label: "Grade III", text: " >10 mm translation (Tibia posterior to femoral condyles). Often indicates multi-ligament injury." }
      ]
    },
    management: {
      title: "Treatment Options",
      icon: <Shield className="w-5 h-5" />,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-100 dark:border-blue-500/20",
      items: [
        { label: "Non-operative", text: "Standard for Grade I/II. Focus on Quadriceps strengthening (key stabilizer)." },
        { label: "Operative", text: "Grade III injuries, multi-ligamentous injuries, or failed conservative tx." },
        { label: "Reconstruction", text: "Achilles allograft or autografts; Transtibial vs. Tibial Inlay techniques." }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-10 font-sans text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
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
              className="flex items-center gap-2 px-5 py-2 bg-indigo-600 dark:bg-indigo-500 text-white text-xs font-black rounded-xl uppercase hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none"
            >
              <BookOpen size={14} />
              Practice Sports Med
            </button>
          )}
        </div>

        {/* Main Title Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl overflow-hidden mb-12 border border-slate-200 dark:border-slate-800 transition-colors">
          <div className="bg-indigo-900 dark:bg-slate-950 p-10 text-white relative border-b border-indigo-800 dark:border-slate-800 transition-colors">
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <Activity className="w-40 h-40" />
            </div>
            <div className="relative z-10">
               <span className="inline-block px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Board Review 2026</span>
               <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-2 leading-tight">PCL Injury <br /><span className="text-indigo-400">Management</span></h1>
               <p className="text-indigo-200 dark:text-slate-400 text-lg font-bold">Posterior Cruciate Ligament • Clinical Decision Support</p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Navigation Sidebar */}
              <div className="lg:col-span-4 space-y-3">
                {Object.entries(content).map(([key, section]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key as any)}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300 border-2 ${
                      activeTab === key 
                        ? `${section.bg} ${section.color} border-current shadow-md scale-105` 
                        : 'bg-transparent text-slate-500 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl ${activeTab === key ? 'bg-white dark:bg-slate-900 shadow-sm' : 'bg-slate-100 dark:bg-slate-800'}`}>
                        {section.icon}
                      </div>
                      <span className="font-black text-xs uppercase tracking-tight">{section.title}</span>
                    </div>
                    {activeTab === key && <ChevronRight className="w-5 h-5" />}
                  </button>
                ))}

                {/* Warning Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10 p-6 bg-rose-50 dark:bg-rose-500/5 border border-rose-100 dark:border-rose-500/20 rounded-3xl"
                >
                  <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-black text-xs uppercase mb-3 tracking-widest">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>Red Flag</span>
                  </div>
                  <p className="text-xs text-rose-800/80 dark:text-slate-300 italic font-bold leading-relaxed">
                    Always check neurovascular status! Knee dislocations often involve PCL tears and carry risk of popliteal artery injury.
                  </p>
                </motion.div>
              </div>

              {/* Main Display Area */}
              <div className="lg:col-span-8">
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-slate-50/50 dark:bg-slate-950/50 rounded-[2.5rem] p-8 md:p-10 border border-slate-100 dark:border-slate-800 min-h-[500px] transition-colors"
                >
                  <div className="flex items-center gap-4 mb-10">
                    <div className={`p-4 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 ${content[activeTab as keyof typeof content].color}`}>
                      {content[activeTab as keyof typeof content].icon}
                    </div>
                    <h2 className={`text-3xl font-black italic tracking-tighter uppercase ${content[activeTab as keyof typeof content].color}`}>
                      {content[activeTab as keyof typeof content].title}
                    </h2>
                  </div>

                  <div className="grid gap-4">
                    {content[activeTab as keyof typeof content].items.map((item, i) => (
                      <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-900 transition-all group">
                        <div className="flex flex-col">
                          <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${content[activeTab as keyof typeof content].color}`}>
                            {item.label}
                          </span>
                          <span className="text-slate-700 dark:text-slate-200 text-lg font-bold leading-snug transition-colors">
                            {item.text}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Contextual Visualizer */}
                  {activeTab === 'grading' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-12 flex flex-col md:flex-row justify-between gap-4"
                    >
                      {[1, 2, 3].map(grade => (
                        <div key={grade} className="flex-1 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                          <div className={`text-[10px] font-black uppercase tracking-widest mb-3 ${grade === 3 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400 dark:text-slate-500'}`}>Grade {grade}</div>
                          <div className={`h-2.5 rounded-full mb-3 ${grade === 1 ? 'bg-emerald-400' : grade === 2 ? 'bg-amber-400' : 'bg-rose-500'}`} />
                          <div className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase italic">{grade === 1 ? 'Mild' : grade === 2 ? 'Moderate' : 'Severe'}</div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        
        <footer className="text-center">
           <div className="inline-block px-10 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-[10px] font-black uppercase tracking-[0.5em] shadow-xl transition-colors">
             Source: Orthobullets Knee & Sports 2026 • Board Review Series
           </div>
        </footer>
      </div>
    </div>
  );
};

export default PCLInfographic;
