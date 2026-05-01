import React, { useState } from 'react';
import { 
  Activity, 
  AlertCircle, 
  ChevronRight, 
  Stethoscope, 
  Navigation,
  Wind,
  Target,
  Dna,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ClipboardList,
  Search,
  ArrowLeft
} from 'lucide-react';

interface KneeClinicalExpertProps {
  onBack: () => void;
}

const KneeClinicalExpert = ({ onBack }: KneeClinicalExpertProps) => {
  const [activeTab, setActiveTab] = useState('mechanisms');

  const SectionHeader = ({ title, icon: Icon, color }: { title: string; icon: any; color: string }) => (
    <div className={`flex items-center gap-3 mb-6 p-4 rounded-2xl ${color} bg-opacity-10 border-l-4 ${color.replace('bg-', 'border-')}`}>
      <div className={`p-2 rounded-xl bg-white shadow-sm`}>
        <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-').replace('100', '600')}`} />
      </div>
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
    </div>
  );

  const ClinicalReasoning = ({ title, content }: { title: string; content: string }) => (
    <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
      <div className="flex items-center gap-2 mb-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
        <Activity className="w-3.5 h-3.5" />
        {title}
      </div>
      <p className="text-xs text-slate-600 leading-relaxed italic">{content}</p>
    </div>
  );

  const TestCard = ({ name, angle, sensitivity, specificity, description, positive, warning }: any) => (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all mb-4 group text-left">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{name}</h4>
          {angle && <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full uppercase">{angle}</span>}
        </div>
        <div className="flex flex-col items-end gap-1">
          {sensitivity && <span className="text-[8px] font-black bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">HIGH SENSITIVITY</span>}
          {specificity && <span className="text-[8px] font-black bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">HIGH SPECIFICITY</span>}
        </div>
      </div>
      <p className="text-sm text-slate-600 mb-4 line-clamp-2 hover:line-clamp-none transition-all">{description}</p>
      {positive && (
        <div className="flex items-start gap-2 bg-rose-50 p-3 rounded-xl border border-rose-100">
          <CheckCircle2 className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs font-bold text-rose-800">Positive: <span className="font-medium text-rose-700">{positive}</span></p>
        </div>
      )}
      {warning && (
        <div className="mt-2 flex items-center gap-2 text-[10px] text-amber-600 font-bold">
          <AlertTriangle className="w-3 h-3" /> {warning}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-10 font-sans text-slate-900 overflow-y-auto no-scrollbar rounded-[3rem] border border-slate-200">
      {/* Premium Header */}
      <header className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <button 
            onClick={onBack}
            className="p-4 bg-indigo-600 text-white rounded-3xl shadow-xl shadow-indigo-100 transform -rotate-3 hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-8 h-8" />
          </button>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2 uppercase italic tracking-tighter">Knee Clinical Expert System</h1>
            <p className="text-slate-500 font-medium max-w-2xl text-lg italic">
              Advanced clinical reference for ligamentous stability, biomechanics, and patellofemoral pathology based on orthopedic high-yield guidelines.
            </p>
          </div>
          <div className="hidden lg:flex ml-auto gap-4">
             <div className="px-6 py-3 bg-slate-50 rounded-2xl text-center">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Database</p>
               <p className="text-xl font-black text-indigo-600">v2.5.0</p>
             </div>
          </div>
        </div>
      </header>

      {/* Responsive Navigation */}
      <nav className="max-w-7xl mx-auto flex overflow-x-auto pb-6 mb-10 gap-4 no-scrollbar scroll-smooth">
        {[
          { id: 'mechanisms', label: 'Mechanisms & Trauma', icon: Navigation },
          { id: 'ligaments', label: 'ACL / PCL Exam', icon: Layers },
          { id: 'collaterals', label: 'Collateral & Stress', icon: ClipboardList },
          { id: 'patella', label: 'Patellofemoral', icon: Target },
          { id: 'effusion', label: 'Effusion & Swelling', icon: Wind }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-8 py-5 rounded-3xl font-bold whitespace-nowrap transition-all duration-300 shadow-sm border ${
              activeTab === tab.id 
              ? 'bg-indigo-600 text-white shadow-indigo-200 border-indigo-600 scale-105' 
              : 'bg-white text-slate-500 hover:bg-indigo-50 border-slate-200'
            }`}
          >
            <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-indigo-400'}`} />
            <span className="text-sm uppercase tracking-tight">{tab.label}</span>
          </button>
        ))}
      </nav>

      <main className="max-w-7xl mx-auto pb-20">
        {/* TAB: MECHANISMS */}
        {activeTab === 'mechanisms' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <SectionHeader title="Trauma Bio-mechanisms" icon={Navigation} color="bg-indigo-600" />
              <div className="bg-white p-6 rounded-3xl border border-slate-200">
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { m: "Anterior force + Plantar-flexed foot", p: "PCL Injury", color: "text-rose-600" },
                    { m: "Anterior force + Dorsiflexed foot", p: "Extensor Mechanism / Patella", color: "text-indigo-600" },
                    { m: "Dashboard Injury (Proximal Tibia)", p: "Classic PCL Tear", color: "text-rose-700" },
                    { m: "Hyperextension + Varus + ER", p: "PLC Injury (Posterolateral Corner)", color: "text-rose-600" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                      <span className="text-sm font-semibold text-slate-700">{item.m}</span>
                      <span className={`text-sm font-black ${item.color}`}>{item.p}</span>
                    </div>
                  ))}
                </div>
                <ClinicalReasoning 
                  title="Clinical Criticality" 
                  content="Missing a PLC injury leads to chronic instability and high failure rates in ACL/PCL reconstructions. Always evaluate for varus laxity in full extension." 
                />
              </div>
            </div>

            <div className="space-y-6">
               <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden h-full">
                 <div className="absolute top-0 right-0 p-8 opacity-10">
                   <AlertCircle className="w-32 h-32" />
                 </div>
                 <h3 className="text-2xl font-black mb-6 text-indigo-400 uppercase tracking-tighter italic">The "Gold" Rule of Stress Testing</h3>
                 <div className="space-y-6 relative z-10">
                    <div className="flex gap-5">
                       <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center font-black text-xl border border-indigo-500/30">30°</div>
                       <div className="text-left">
                         <h4 className="font-bold text-lg uppercase italic tracking-tighter">Isolated Injury</h4>
                         <p className="text-sm text-slate-400 font-medium">Opening seen ONLY at 30° flexion indicates an isolated collateral ligament tear (MCL or LCL).</p>
                       </div>
                    </div>
                    <div className="flex gap-5">
                       <div className="w-14 h-14 bg-rose-500/20 rounded-2xl flex items-center justify-center font-black text-xl border border-rose-500/30">0°</div>
                       <div className="text-left">
                         <h4 className="font-bold text-lg text-rose-400 uppercase italic tracking-tighter">Combined Injury (RED FLAG)</h4>
                         <p className="text-sm text-slate-400 font-medium">Opening in Full Extension (0°) implies damage to the Cruciates, Capsule, and Posterolateral/medial structures.</p>
                       </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        )}

        {/* TAB: LIGAMENTS */}
        {activeTab === 'ligaments' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <SectionHeader title="Anterior Cruciate (ACL)" icon={Activity} color="bg-blue-600" />
              <TestCard 
                name="Lachman Test"
                angle="30° Flexion"
                sensitivity={true}
                description="Most sensitive test for ACL. Stabilize the femur and pull the tibia anteriorly. At 30°, the secondary stabilizers are relaxed."
                positive="Soft/mushy endpoint and increased anterior translation."
              />
              <TestCard 
                name="Anterior Drawer"
                angle="90° Flexion"
                description="Tibia pulled forward. Often less reliable in acute cases due to hamstring spasm or meniscus 'wedge' effect."
                warning="False negatives common in acute guarding."
              />
              <TestCard 
                name="Pivot Shift"
                specificity={true}
                description="The most functional and specific test for instability. Usually performed under anesthesia due to significant patient pain/guarding."
                positive="Reduction of the subluxed tibia occurring between 20-30° flexion."
              />
            </div>

            <div className="space-y-6">
              <SectionHeader title="Posterior Cruciate (PCL)" icon={Layers} color="bg-purple-600" />
              <TestCard 
                name="Tibial Sag Sign"
                angle="90° Flexion"
                description="Observation of the knee profile from the side. Compare the tibial step-off to the healthy contralateral side."
                positive="The proximal tibia falls (sags) posteriorly relative to the femoral condyles."
              />
              <TestCard 
                name="90° Quad Active Test"
                description="Patient performs isometric quadriceps contraction while the knee is in the 'sagged' position."
                positive="The subluxed tibia is pulled forward (reduces) to its neutral position."
              />
              <ClinicalReasoning 
                title="PCL Biomechanics" 
                content="In a PCL-deficient knee, gravity causes posterior subluxation (Sag Sign). Quadriceps contraction works by pulling the tibia forward via the patellar tendon, effectively 'reducing' the joint." 
              />
            </div>
          </div>
        )}

        {/* TAB: COLLATERALS */}
        {activeTab === 'collaterals' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
            <div className="lg:col-span-1 text-left">
              <SectionHeader title="Stress Grading" icon={ClipboardList} color="bg-rose-600" />
              <div className="bg-white p-6 rounded-[2rem] border border-slate-200">
                 <div className="space-y-4">
                    {[
                      { g: "Grade I", d: "1-5 mm opening", info: "Interstitial tear/Pain" },
                      { g: "Grade II", d: "6-10 mm opening", info: "Partial tear/Firm end" },
                      { g: "Grade III", d: "> 10 mm opening", info: "Complete tear/Soft end" }
                    ].map((grade, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">{grade.g}</span>
                        <div className="text-lg font-black text-slate-800 uppercase italic tracking-tighter">{grade.d}</div>
                        <p className="text-xs text-slate-500 font-medium">{grade.info}</p>
                      </div>
                    ))}
                 </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <SectionHeader title="Collateral Maneuvers" icon={Search} color="bg-slate-700" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-left">
                  <h4 className="font-bold text-slate-800 mb-2 uppercase italic tracking-tighter">Valgus Stress (MCL)</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">Applying a medial force to the lateral aspect of the knee while the foot is fixed.</p>
                  <div className="mt-4 p-3 bg-blue-50 rounded-xl text-[10px] font-black text-blue-700 uppercase tracking-widest italic">Primary stabilizer: Medial Collateral Ligament</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-left">
                  <h4 className="font-bold text-slate-800 mb-2 uppercase italic tracking-tighter">Varus Stress (LCL)</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">Applying a lateral force to the medial aspect of the knee while the foot is fixed.</p>
                  <div className="mt-4 p-3 bg-amber-50 rounded-xl text-[10px] font-black text-amber-700 uppercase tracking-widest italic text-center">Primary stabilizer: Lateral Collateral Ligament</div>
                </div>
              </div>
              <div className="p-8 bg-rose-50 rounded-[2.5rem] border border-rose-100 flex flex-col items-center text-center">
                 <AlertCircle className="w-8 h-8 text-rose-500 mb-4" />
                 <h4 className="text-xl font-black text-rose-900 mb-2 uppercase italic tracking-tighter">The Multi-Ligament Indicator</h4>
                 <p className="text-sm text-rose-800 font-bold max-w-lg italic">
                   Stress testing at <strong>Full Extension (0°)</strong> is not just for collaterals. Laxity here indicates that the posterior capsule and cruciates are likely compromised, signaling a much more severe injury profile.
                 </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB: PATELLA */}
        {activeTab === 'patella' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <SectionHeader title="Patellar Stability" icon={Target} color="bg-emerald-600" />
              <TestCard 
                name="Apprehension Test"
                angle="20-30° Flexion"
                description="Manual lateral displacement of the patella. This angle is where the patella is most unstable before entering the trochlea."
                positive="Patient contracts quadriceps or displays anxiety/fear."
              />
              <TestCard 
                name="Patellar Glide"
                angle="20-30° Flexion"
                description="Measuring medial/lateral movement in quadrants. Lateral glide > 2 quadrants suggests MPFL insufficiency."
              />
              <TestCard 
                name="J Sign"
                description="Observation of the patella during the last few degrees of terminal extension."
                positive="Sudden lateral deviation of the patella."
              />
            </div>

            <div className="space-y-6">
              <SectionHeader title="Alignment & Cartilage" icon={Dna} color="bg-cyan-600" />
              <div className="bg-white p-6 rounded-3xl border border-slate-200 text-left">
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <h4 className="font-black text-slate-800 text-sm mb-2 uppercase italic tracking-tighter">Q-Angle Assessment</h4>
                  <p className="text-xs text-slate-500 mb-3 font-medium italic">Line from ASIS to center of patella, then center of patella to tibial tubercle.</p>
                  <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-xl">
                    <span className="text-xs font-black text-cyan-800 uppercase tracking-widest">Normal Threshold</span>
                    <span className="text-lg font-black text-cyan-900">&lt; 15°</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <h5 className="font-bold text-sm uppercase italic tracking-tighter">Patellar Tilt</h5>
                    <p className="text-[11px] text-slate-500 mt-1 font-medium italic">If the lateral edge cannot be tilted upward, it indicates a <strong>tight lateral retinaculum</strong>.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <h5 className="font-bold text-sm uppercase italic tracking-tighter">Crepitus & Grind</h5>
                    <p className="text-[11px] text-slate-500 mt-1 font-medium italic">Crepitus during range of motion vs pain during Patellar Grind (Clarke's test) suggests chondrosis or cartilage degeneration.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: EFFUSION */}
        {activeTab === 'effusion' && (
          <div className="max-w-4xl mx-auto">
             <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden relative text-left">
                <SectionHeader title="Effusion Clinical Spectrum" icon={Wind} color="bg-sky-600" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div>
                      <h4 className="font-black text-sky-800 mb-6 text-sm tracking-[0.2em] uppercase italic tracking-tighter">Differential Diagnosis</h4>
                      <div className="space-y-6">
                         <div className="relative pl-6 border-l-2 border-sky-100">
                            <div className="absolute -left-1.5 top-0 w-3 h-3 bg-sky-500 rounded-full border-2 border-white"></div>
                            <h5 className="font-bold text-slate-800 uppercase italic tracking-tighter">Acute Swelling</h5>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium italic">Ligament tears, acute meniscal injuries, or osteochondral fractures.</p>
                         </div>
                         <div className="relative pl-6 border-l-2 border-slate-100">
                            <div className="absolute -left-1.5 top-0 w-3 h-3 bg-slate-300 rounded-full border-2 border-white"></div>
                            <h5 className="font-bold text-slate-800 uppercase italic tracking-tighter">Chronic Swelling</h5>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium italic">Osteoarthritis, chronic degenerative meniscal tears, or inflammatory synovitis.</p>
                         </div>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <h4 className="font-black text-slate-400 mb-6 text-sm tracking-[0.2em] uppercase italic tracking-tighter">Examination Methods</h4>
                      <div className="flex items-center justify-between p-5 bg-sky-50 rounded-2xl">
                        <span className="font-black text-slate-800 text-sm uppercase italic tracking-tighter">Patellar Ballottement</span>
                        <span className="text-[10px] font-black bg-sky-600 text-white px-3 py-1 rounded-lg">LARGE EFFUSION</span>
                      </div>
                      <div className="flex items-center justify-between p-5 bg-sky-50 rounded-2xl">
                        <span className="font-black text-slate-800 text-sm uppercase italic tracking-tighter">Bulge/Sweep Test</span>
                        <span className="text-[10px] font-black bg-sky-400 text-white px-3 py-1 rounded-lg">SMALL EFFUSION</span>
                      </div>
                   </div>
                </div>
                <div className="mt-12 p-8 bg-slate-900 text-white rounded-[2.5rem] relative overflow-hidden">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-indigo-500 rounded-2xl">
                         <Stethoscope className="w-6 h-6" />
                      </div>
                      <h4 className="text-2xl font-black uppercase italic tracking-tighter text-indigo-400">Clinical Pearl: Hemarthrosis</h4>
                   </div>
                   <p className="text-sm font-medium italic text-slate-300 leading-relaxed max-w-2xl">
                      Swelling that occurs within <strong>0-2 hours</strong> post-injury is almost always hemarthrosis, strongly suggesting an ACL tear or peripheral meniscus tear.
                   </p>
                </div>
             </div>
          </div>
        )}
      </main>

      {/* Premium Footer */}
      <footer className="max-w-7xl mx-auto py-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-200 mt-12 bg-white/50 rounded-t-[3rem] px-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Miller Clinical Intelligence</span>
        </div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
          Standardized Examination Protocols & Bio-Surgical Integrity
        </div>
      </footer>
    </div>
  );
};

export default KneeClinicalExpert;
