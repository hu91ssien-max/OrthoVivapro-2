import React, { useState } from 'react';
import { 
  Stethoscope, 
  Scissors, 
  TrendingUp, 
  AlertCircle, 
  Thermometer,
  Layers,
  ChevronRight,
  Target
} from 'lucide-react';

const COXA_VARA_DATA = {
  definition: "A deformity of the proximal femur where the neck-shaft angle is less than 120°. It leads to shortening of the limb and abductor insufficiency.",
  heAngle: [
    { range: "< 45°", prognosis: "Stable", action: "Observation; often resolves spontaneously." },
    { range: "45° - 60°", prognosis: "Intermediate", action: "Close observation; surgery if deformity or HE angle increases." },
    { range: "> 60°", prognosis: "Progressive", action: "Surgical intervention is mandatory." }
  ],
  causes: [
    { type: "Congenital", examples: "Developmental Coxa Vara (DCV), Proximal Femoral Focal Deficiency (PFFD)." },
    { type: "Acquired (Trauma)", examples: "Malunited trochanteric fractures, SCFE (Slipped Capital Femoral Epiphysis)." },
    { type: "Acquired (Bone Disease)", examples: "Rickets, Osteogenesis Imperfecta, Fibrous Dysplasia." }
  ]
};

const CoxaVaraApley = () => {
  const [activeSection, setActiveSection] = useState('assessment');

  return (
    <div className="w-full bg-zinc-50 text-zinc-900 font-sans p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl border border-zinc-200 overflow-hidden rounded-[2rem]">
        
        {/* Academic Header */}
        <div className="bg-indigo-950 text-white p-8">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="text-indigo-400" size={24} />
            <span className="text-xs font-bold uppercase tracking-[0.3em] opacity-80">Apley's Foundation</span>
          </div>
          <h1 className="text-4xl font-serif italic font-bold tracking-tight">Coxa Vara</h1>
          <p className="text-indigo-200 mt-2 text-sm max-w-xl leading-relaxed">
            {COXA_VARA_DATA.definition}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-zinc-100 border-b border-zinc-200">
          {[
            { id: 'assessment', label: 'Clinical Assessment', icon: Stethoscope },
            { id: 'prognosis', label: 'The HE Angle', icon: TrendingUp },
            { id: 'surgery', label: 'Surgical Logic', icon: Scissors }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${
                activeSection === tab.id ? 'bg-white text-indigo-600 border-t-4 border-indigo-600' : 'text-zinc-400 hover:bg-zinc-200'
              }`}
            >
              <tab.icon size={16} />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-8">
          
          {activeSection === 'assessment' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <section>
                <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Target size={18} /> Clinical Presentation
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: "Shortening", desc: "True supratrochanteric shortening of the affected limb." },
                    { title: "Gait", desc: "Painless 'waddling' or Trendelenburg gait due to abductor muscle slackness." },
                    { title: "ROM", desc: "Marked limitation of Abduction and Internal Rotation." },
                    { title: "The Sign", desc: "Positive Trendelenburg test (pelvis drops on the normal side when standing on the affected leg)." }
                  ].map((item, i) => (
                    <div key={i} className="p-4 border border-zinc-100 rounded-2xl bg-zinc-50/50">
                      <h4 className="font-bold text-zinc-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-zinc-600 leading-tight">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-indigo-50 p-6 rounded-[1.5rem] border border-indigo-100">
                <h3 className="text-indigo-900 font-bold mb-3 flex items-center gap-2">
                  <AlertCircle size={18} /> Apley’s Diagnostic Note
                </h3>
                <p className="text-sm text-indigo-800 leading-relaxed italic">
                  {"In developmental cases, the child usually starts walking late. Unlike CDH (Congenital Dislocation of the Hip), the femoral head is inside the acetabulum, but the trochanter is high. Always differentiate from a simple Short Stature syndrome."}
                </p>
              </section>
            </div>
          )}

          {activeSection === 'prognosis' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex flex-col md:flex-row gap-8 items-center border-b border-zinc-100 pb-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-serif font-bold text-zinc-900 mb-4">The Hilgenreiner-Epiphyseal Angle</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                    {"The HE angle is the most reliable predictor of progression in Developmental Coxa Vara. It is measured between Hilgenreiner’s line (horizontal through the triradiate cartilage) and a line through the proximal femoral physeal plate."}
                  </p>
                </div>
                <div className="w-full md:w-64 h-40 bg-zinc-200 rounded-[1.5rem] flex items-center justify-center text-zinc-400 italic text-[10px] p-6 text-center border-2 border-dashed border-zinc-300">
                  {"[Diagram: Angle between horizontal H-line and the oblique physeal line]"}
                </div>
              </div>

              <div className="grid gap-3">
                {COXA_VARA_DATA.heAngle.map((row, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-zinc-100 hover:border-indigo-300 transition-colors bg-white shadow-sm">
                    <div className="w-20 text-center">
                      <span className="text-lg font-black text-indigo-600">{row.range}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">{row.prognosis}</h4>
                      <p className="text-sm font-medium text-zinc-800">{row.action}</p>
                    </div>
                    <ChevronRight className="text-zinc-200" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'surgery' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-zinc-900 text-zinc-100 p-8 rounded-[2rem] shadow-inner">
                <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-4 flex items-center gap-2">
                  <Scissors className="text-indigo-400" size={20} /> Valgus Subtrochanteric Osteotomy
                </h3>
                <div className="grid md:grid-cols-2 gap-8 text-sm">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-black shrink-0">1</div>
                      <p className="text-zinc-300">Convert shear forces into compressive forces by making the physis more horizontal.</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-black shrink-0">2</div>
                      <p className="text-zinc-300">{"Restore the Neck-Shaft angle to approximately 140°."}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-black shrink-0">3</div>
                      <p className="text-zinc-300">Lengthen the limb slightly and restore abductor tension by lowering the trochanter.</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-black shrink-0">4</div>
                      <p className="text-zinc-300">Stabilize with a dynamic compression screw (DHS) or a blade plate.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border-2 border-dashed border-zinc-100 rounded-[2rem] bg-zinc-50">
                <h4 className="text-[10px] font-black uppercase text-zinc-400 mb-4 tracking-[0.2em]">Post-Operative Goals</h4>
                <div className="flex flex-wrap gap-3">
                  {["Normal HE Angle (< 35°)", "Limb Length Correction", "Restored Abductor Power", "Prevention of OA"].map((tag, i) => (
                    <span key={i} className="px-4 py-2 bg-white border border-zinc-200 rounded-full text-xs font-bold text-zinc-600 shadow-sm transition-transform hover:-translate-y-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Clinical Summary Footer */}
        <div className="bg-zinc-50 p-6 flex justify-between items-center border-t border-zinc-200">
          <div className="flex items-center gap-2 text-zinc-400">
            <Thermometer size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest italic text-red-700">Apley's Surgical Pearl</span>
          </div>
          <span className="text-[10px] font-bold text-zinc-500 italic max-w-xs text-right leading-tight">
            {"\"The aim is to make the physis perpendicular to the weight-bearing line.\""}
          </span>
        </div>

      </div>
    </div>
  );
};

export default CoxaVaraApley;
