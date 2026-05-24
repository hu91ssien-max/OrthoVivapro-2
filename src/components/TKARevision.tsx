import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Settings, 
  RotateCcw, 
  Target, 
  Activity, 
  ShieldAlert, 
  Info, 
  Maximize2, 
  ChevronRight,
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  History,
  Scale,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TKARevisionProps {
  onBack: () => void;
}

const SECTIONS = [
  { id: "design", label: "Design & Evolution", icon: <FlaskConical size={20} />, color: "blue", bg: "bg-blue-50", text: "text-blue-600" },
  { id: "bio", label: "Biomechanics", icon: <Activity size={20} />, color: "purple", bg: "bg-purple-50", text: "text-purple-600" },
  { id: "indications", label: "Indications", icon: <CheckCircle2 size={20} />, color: "emerald", bg: "bg-emerald-50", text: "text-emerald-600" },
  { id: "results", label: "Survivorship", icon: <Scale size={20} />, color: "amber", bg: "bg-amber-50", text: "text-amber-600" },
  { id: "preop", label: "Pre-op Assessment", icon: <Settings size={20} />, color: "cyan", bg: "bg-cyan-50", text: "text-cyan-600" },
  { id: "surgical", label: "Surgical Technique", icon: <Target size={20} />, color: "orange", bg: "bg-orange-50", text: "text-orange-600" },
  { id: "specific", label: "Special Cases", icon: <Zap size={20} />, color: "pink", bg: "bg-pink-50", text: "text-pink-600" },
  { id: "complications", label: "Complications", icon: <ShieldAlert size={20} />, color: "rose", bg: "bg-rose-50", text: "text-rose-600" },
  { id: "revision", label: "Revision TKA", icon: <RotateCcw size={20} />, color: "indigo", bg: "bg-indigo-50", text: "text-indigo-600" },
];

const TKARevision = ({ onBack }: TKARevisionProps) => {
  const [activeTab, setActiveTab] = useState(SECTIONS[0].id);

  const activeSection = SECTIONS.find(s => s.id === activeTab) || SECTIONS[0];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 bg-slate-900 text-white flex flex-col h-auto md:h-screen sticky top-0 z-20">
        <div className="p-8 border-b border-white/5">
          <button 
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-white transition-colors"
          >
            <ArrowLeft size={12} /> Return to Recon
          </button>
          <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-600 rounded-xl">
                <Settings size={20} className="text-white" />
             </div>
             <div>
                <h1 className="text-lg font-black tracking-tighter uppercase italic leading-none">TKA Lab</h1>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Masterclass Series</p>
             </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto no-scrollbar">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === section.id 
                  ? `${section.bg} ${section.text} shadow-lg scale-102` 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                {section.icon}
                {section.label}
              </div>
              <ChevronRight size={14} className={activeTab === section.id ? 'opacity-100' : 'opacity-0'} />
            </button>
          ))}
        </nav>

        <div className="p-6 bg-slate-950/50">
           <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
             <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1 italic">Campbell's Axiom</p>
             <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic">
               "Success in TKA isn't just a straight leg; it's a balanced gap and a patient who trusts the process."
             </p>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto no-scrollbar bg-slate-50 relative">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Knee Arthroplasty</h2>
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter italic">{activeSection.label}</h1>
          </div>
          <div className="hidden md:flex gap-4">
             <div className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-100 flex items-center gap-2">
                <History size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest tracking-tight">Campbell's Ch. 7</span>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 max-w-5xl mx-auto w-full pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Render Section Content */}
              {renderActiveSection(activeTab)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Legend */}
        <footer className="mt-auto px-10 py-8 flex flex-wrap justify-between gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white">
           <div className="flex gap-8">
             <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-blue-600 shadow-sm"></div> Structural</div>
             <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-rose-600 shadow-sm"></div> Failure</div>
             <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-emerald-600 shadow-sm"></div> Success</div>
           </div>
           <div className="text-slate-800 italic">TKA Revision System v1.4</div>
        </footer>
      </main>
    </div>
  );
};

// Helper components to match provided layout
const SectionCard = ({ title, color = "blue", children, icon }: any) => {
  const colorMap: any = {
    blue: "border-blue-200 text-blue-600 bg-blue-50",
    purple: "border-purple-200 text-purple-600 bg-purple-50",
    emerald: "border-emerald-200 text-emerald-600 bg-emerald-50",
    amber: "border-amber-200 text-amber-600 bg-amber-50",
    cyan: "border-cyan-200 text-cyan-600 bg-cyan-50",
    orange: "border-orange-200 text-orange-600 bg-orange-50",
    pink: "border-pink-200 text-pink-600 bg-pink-50",
    rose: "border-rose-200 text-rose-600 bg-rose-50",
    indigo: "border-indigo-200 text-indigo-600 bg-indigo-50",
  };
  
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500">
      <div className={`px-8 py-4 border-b border-slate-100 flex items-center justify-between ${colorMap[color]}`}>
        <span className="font-black text-xs uppercase tracking-widest italic flex items-center gap-2">
          {icon} {title}
        </span>
        <Maximize2 size={14} className="opacity-20 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-8 leading-relaxed text-slate-600">
        {children}
      </div>
    </div>
  );
};

const SectionDataGrid = ({ items, icon = <Info size={14} /> }: any) => (
  <div className="space-y-4">
    {items.map((item: any, i: number) => (
      <div key={i} className="flex gap-4 group">
        <div className="mt-1 flex-shrink-0 text-slate-300 group-hover:text-amber-500 transition-colors">{icon}</div>
        <p className="text-sm font-medium italic leading-relaxed text-slate-600 group-hover:text-slate-900 transition-colors">{item}</p>
      </div>
    ))}
  </div>
);

const SectionTable = ({ headers, rows, color = "blue" }: any) => {
  const colorMap: any = {
    blue: "bg-blue-50 text-blue-700",
    purple: "bg-purple-50 text-purple-700",
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    cyan: "bg-cyan-50 text-cyan-700",
    orange: "bg-orange-50 text-orange-700",
    pink: "bg-pink-50 text-pink-700",
    rose: "bg-rose-50 text-rose-700",
    indigo: "bg-indigo-50 text-indigo-700",
  };
  
  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-100 shadow-inner bg-slate-50/50 my-4">
      <table className="w-full text-left border-collapse min-w-[500px]">
        <thead>
          <tr className={colorMap[color]}>
            {headers.map((h: string, i: number) => (
              <th key={i} className="p-4 text-[10px] font-black uppercase tracking-widest border-b border-white/20">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-xs font-bold text-slate-600">
          {rows.map((row: any[], i: number) => (
            <tr key={i} className="hover:bg-white transition-colors border-b border-slate-100 last:border-0">
              {row.map((cell: any, j: number) => (
                <td key={j} className="p-4 leading-tight">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SectionAlert = ({ type = "info", children }: any) => {
  const styles: any = {
    info: "bg-blue-50 border-blue-200 text-blue-700 icon-blue",
    warning: "bg-amber-50 border-amber-200 text-amber-700 icon-amber",
    error: "bg-rose-50 border-rose-200 text-rose-700 icon-rose",
    success: "bg-emerald-50 border-emerald-200 text-emerald-700 icon-emerald"
  };
  return (
    <div className={`p-6 rounded-3xl border-2 italic text-sm font-bold flex gap-4 my-6 ${styles[type]}`}>
      <Info className="flex-shrink-0" size={20} />
      {children}
    </div>
  );
};

const renderActiveSection = (tab: string) => {
  switch (tab) {
    case 'design':
      return (
        <div className="space-y-12">
          <SectionCard title="Historical Evolution of TKA Implant Design" color="blue" icon={<FlaskConical size={14} />}>
            <SectionTable 
              headers={["Prosthesis", "Year", "Key Features", "Significance"]}
              rows={[
                ["Total Condylar (Insall)", "1973", "Both cruciates sacrificed; sagittal stability by articular geometry; all-PE tibial then metal-backed", "Gold standard benchmark; 95% at 15yr; 91% at 21yr"],
                ["Duopatellar → Kinematic Condylar", "1970s", "PCL retained; separate tibial plateaus → unified with PCL cut-out", "Widely used in 1980s"],
                ["Insall-Burstein PS", "1978", "Cam engages tibial post at ~70° → mechanical femoral rollback; intercondylar box required", "Solved limited flexion of total condylar design"],
                ["CCK (Constrained Condylar)", "1980s+", "Enlarged tibial post constrained against deep femoral box; varus-valgus stability with toggle", "Revision & severe primary deformity; 97.6% at 10yr (Maynard)"],
                ["LCS Mobile Bearing (Buechel)", "1977+", "Meniscal or rotating platform; polyethylene free to rotate; dovetailed arcuate grooves", "98% survivorship at 20yr; lowest contact stresses"],
                ["Rotating Hinge", "Current", "Controls sagittal + coronal planes; axial rotation preserved; extension block → prevents recurvatum", "Salvage; worse outcomes vs condylar designs"],
              ]}
            />
          </SectionCard>

          <div className="grid md:grid-cols-2 gap-8">
            <SectionCard title="CR vs PS — Core Comparison" color="blue">
              <SectionTable 
                headers={["Parameter", "CR", "PS"]}
                rows={[
                  ["PCL", "Retained", "Sacrificed"],
                  ["Rollback mechanism", "PCL tension", "Cam-post at ~70°"],
                  ["Bone sacrifice", "Less (no box)", "Box required"],
                  ["10-yr survival", "90-95%", "77-90%"],
                  ["Special risks", "PCL tight → wear", "Patellar clunk"],
                ]}
              />
              <SectionAlert type="warning">Mayo Clinic: 15-yr survival CR 90% vs PS 77%. Higher mid/late revision rates in PS reported in multiple registries.</SectionAlert>
            </SectionCard>

            <SectionCard title="Constraint Ladder" color="purple">
              <div className="space-y-3">
                {[
                  { level: "CR", use: "Intact, balanced PCL; mild deformity" },
                  { level: "Deep Dish", use: "Incompetent PCL, no cam-post; moderate constraint" },
                  { level: "PS", use: "PCL sacrificed; moderate deformity; flexion contracture" },
                  { level: "CCK (VVC)", use: "Collateral ligament insufficiency; complex revision" },
                  { level: "Rotating Hinge", use: "Complete ligamentous failure; salvage revision" },
                ].map(x => (
                   <div key={x.level} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div>
                        <div className="text-[10px] font-black uppercase text-slate-400 mb-1">Level</div>
                        <div className="text-sm font-black text-slate-800">{x.level}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] font-black uppercase text-slate-400 mb-1 italic">Indication</div>
                        <div className="text-[10px] font-bold text-slate-600 italic">{x.use}</div>
                      </div>
                   </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      );
    case 'bio':
      return (
        <div className="space-y-12">
          <div className="grid md:grid-cols-2 gap-8">
            <SectionCard title="Flexion Requirements for ADLs" color="purple">
              <SectionTable 
                headers={["Activity", "Flexion Required"]}
                rows={[
                  ["Level walking (swing)", "67°"],
                  ["Stair climbing", "83°"],
                  ["Descending stairs", "90°"],
                  ["Rising from chair", "93°"],
                  ["Tying shoelaces", "106°"],
                  ["Squatting", ">120°"],
                ]}
              />
              <SectionAlert type="info">Practical TKA goal: ≥90° for comfortable ADLs. Average post-TKA ROM: 90–100°.</SectionAlert>
            </SectionCard>

            <SectionCard title="Normal Knee Kinematics" color="purple">
              <SectionDataGrid items={[
                "Medial Pivot Pattern: Medial condyle is stable (~2mm post. trans), lateral rolls back (~21mm).",
                "Internal tibial rotation occurs during flexion.",
                "Screw-home: Tibial external rotation in terminal extension.",
                "Primary flexion axis is a J-shaped curve.",
              ]} />
            </SectionCard>
          </div>

          <SectionCard title="Patellofemoral Biomechanics" color="purple">
            <div className="grid md:grid-cols-2 gap-10">
              <SectionTable 
                headers={["Parameter", "Value"]}
                rows={[
                  ["Q-Angle (men)", "< 15°"],
                  ["Q-Angle (women)", "< 20°"],
                  ["PFJ reaction (ADL)", "2–5× BW"],
                  ["First contact", "~20° (inf. pole)"],
                  ["Mid-patellar contact", "~60°"],
                ]}
              />
              <div className="flex flex-col justify-center">
                <SectionDataGrid items={[
                  "Extends lever arm → improves quadriceps efficiency.",
                  "Lateral trochlear flange resists subluxation.",
                  "Medialization of patellar component improves tracking.",
                  "Malrotation of components is #1 cause of anterior knee pain."
                ]} />
                <SectionAlert type="error">Malrotation is the commonest technical cause of PFJ problems.</SectionAlert>
              </div>
            </div>
          </SectionCard>
        </div>
      );
    case 'indications':
      return (
        <div className="space-y-12">
          <div className="grid md:grid-cols-2 gap-8">
            <SectionCard title="Indications for TKA" color="emerald">
              <SectionDataGrid items={[
                "Severe arthritis failing 6mo conservative treatment.",
                "Complete cartilage space loss on weight-bearing films.",
                "Significant pain + functional limitation.",
                "Progressive deformity (Flexion contracture >20°).",
                "Osteonecrosis or post-traumatic arthritis."
              ]} />
              <SectionAlert type="success">Patients without complete cartilage loss pre-op tend to have lower satisfaction.</SectionAlert>
            </SectionCard>

            <SectionCard title="Contraindications" color="rose">
               <div className="space-y-6">
                <div>
                   <h5 className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-3 italic">Absolute</h5>
                   <SectionDataGrid items={["Active/recent sepsis", "Remote ongoing infection", "Extensor mechanism failure", "Painless arthrodesis"]} />
                </div>
                <div>
                   <h5 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-3 italic">Relative</h5>
                   <SectionDataGrid items={["Severe vascular disease", "Charcot joint", "BMI ≥ 45", "Immunodeficiency"]} />
                </div>
               </div>
            </SectionCard>
          </div>

          <SectionCard title="Modifiable Risk Factors" color="emerald">
            <SectionTable 
              headers={["Factor", "Threshold", "Significance"]}
              rows={[
                ["HbA1c", "> 7.5%", "Increased infection rate"],
                ["Fructosamine", "> 293 µmol/L", "11.2× increased PJI risk!"],
                ["Albumin", "< 3.5 g/dL", "Malnutrition → poor healing"],
                ["Vitamin D", "Deficient", "Affects graft survival"],
              ]}
            />
            <SectionAlert type="warning">AAOS: Delaying primary TKA up to 8 months to optimize risk factors does NOT worsen outcome.</SectionAlert>
          </SectionCard>
        </div>
      );
    case 'results':
      return (
        <div className="space-y-12">
          <SectionCard title="Survivorship Registry Data" color="amber">
            <SectionTable 
              headers={["Prosthesis", "Data Point", "Survivorship"]}
              rows={[
                ["Total Condylar", "21-year data", "91%"],
                ["CR Cementless", "18-year data", "98.6%"],
                ["LCS Rotating Platform", "20-year data", "98%"],
                ["Oxford UKA", "20-year data", "91%"],
                ["Avon PFA", "5-year data", "96%"],
              ]}
            />
          </SectionCard>

          <div className="grid md:grid-cols-2 gap-8">
            <SectionCard title="Causes of Failure (Sharkey)" color="rose">
              <div className="space-y-4">
                 {[
                   { label: "Aseptic Loosening", value: "39.9%", color: "bg-emerald-500" },
                   { label: "Infection (PJI)", value: "27.4%", color: "bg-rose-500" },
                   { label: "Instability", value: "7.5%", color: "bg-amber-500" },
                   { label: "Fracture", value: "4.7%", color: "bg-blue-500" },
                 ].map(x => (
                   <div key={x.label} className="group">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-black uppercase text-slate-500">{x.label}</span>
                        <span className="text-sm font-black text-slate-800">{x.value}</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${x.color} opacity-80`} style={{ width: x.value }}></div>
                      </div>
                   </div>
                 ))}
                 <SectionAlert type="warning">Early failure (&lt;2y): Infection is #1. Late failure: Aseptic loosening is #1.</SectionAlert>
              </div>
            </SectionCard>

            <SectionCard title="Functional Scoring" color="amber">
              <SectionTable 
                headers={["Score", "Domain"]}
                rows={[
                  ["Oxford Knee (OKS)", "Pain + Function (Patient)"],
                  ["KSS 2011", "Satisfaction + Satisfaction"],
                  ["WOMAC", "Research standard"],
                  ["EQ-5D", "UK NJR Requirement"],
                ]}
              />
              <SectionAlert type="info">KSS 2011: Objective (100) + Satisfaction (40) + Expectation (15) + Activity (100).</SectionAlert>
            </SectionCard>
          </div>
        </div>
      );
    case 'preop':
      return (
        <div className="space-y-12">
          <SectionCard title="Radiographic Assessment" color="cyan">
             <div className="grid md:grid-cols-2 gap-8">
                <div>
                   <h5 className="text-[10px] font-black text-cyan-600 uppercase mb-4 italic">Mandatory Views</h5>
                   <SectionDataGrid items={["Standing AP (Static load)", "Lateral (Slope/Joint line)", "Merchant Skyline (PFJ Tracking)", "Long-leg AP (Mechanical Axis)"]} />
                </div>
                <div>
                   <h5 className="text-[10px] font-black text-cyan-600 uppercase mb-4 italic">Axis Measurement</h5>
                   <SectionDataGrid items={["Femoral mechanical: Head center → Notch", "Tibial mechanical: Plateau center → Talar dome", "Femoral valgus angle typically 5–7°", "Tibial bowing can preclude IM guides"]} />
                </div>
             </div>
          </SectionCard>

          <SectionCard title="Tranexamic Acid (TXA)" color="cyan">
            <SectionTable 
              headers={["Route", "Dose", "Timing"]}
              rows={[
                ["IV", "1g or 15mg/kg", "20min pre-inflation; repeat before deflation"],
                ["Topical", "1.5–3g in 100mL", "Soak in wound for 5 mins"],
                ["Oral", "2000mg pre-op", "2hr before; repeat post-op"],
              ]}
            />
            <SectionAlert type="error">Contraindications: DVT/PE history, Stroke, Clotting disorder.</SectionAlert>
          </SectionCard>
        </div>
      );
    case 'surgical':
      return (
        <div className="space-y-12">
          <SectionCard title="Surgical Approaches" color="orange">
            <SectionTable 
              headers={["Approach", "Pros", "Cons"]}
              rows={[
                ["Medial Parapatellar", "Extensile; standard exposure", "Quad disruption"],
                ["Subvastus", "Fast quad recovery", "Limited in obese patients"],
                ["Midvastus", "Minimal disruption", "Variable exposure"],
              ]}
            />
          </SectionCard>

          <div className="grid md:grid-cols-2 gap-8">
            <SectionCard title="Gap Balancing Principles" color="orange">
              <SectionDataGrid items={[
                "Extension gap: Set by distal femoral + tibial cuts.",
                "Flexion gap: Set by posterior femoral cut + femoral rotation.",
                "Gaps must be rectangular and EQUAL in size.",
                "E-gap > F-gap? Increase posterior resection.",
                "F-gap > E-gap? Add distal femoral augment."
              ]} />
            </SectionCard>

            <SectionCard title="Femoral Rotation References" color="orange">
               <div className="space-y-1">
                 {[
                   { name: "TEA (Epicondylar)", d: "Gold standard; difficult to find in vivo." },
                   { name: "Whiteside's Axis", d: "Sulcus to notch; avoid in dysplasia." },
                   { name: "PCA (Post. Condylar)", d: "3° ER; fails in valgus/hypoplastic condyle." },
                   { name: "Gap Technique", d: "Parallel to tibial cut under tension." },
                 ].map(r => (
                   <div key={r.name} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex flex-shrink-0 items-center justify-center font-black text-[10px]">{r.name.slice(0,3)}</div>
                      <div className="text-[10px] font-bold text-slate-600 italic leading-tight">{r.d}</div>
                   </div>
                 ))}
               </div>
            </SectionCard>
          </div>

          <SectionCard title="Soft Tissue Release Sequence (Varus Knee)" color="orange">
             <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                   {["1. Remove ALL osteophytes (Midline/Posterior)", "2. Deep MCL off tibia", "3. Superficial MCL (Ant. fibers first)", "4. Posterior Oblique Ligament", "5. Semimembranosus insertion"].map((s, i) => (
                      <div key={i} className="flex items-center gap-4 mb-3">
                         <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px] font-black">{i+1}</div>
                         <span className="text-xs font-bold text-slate-700">{s}</span>
                      </div>
                   ))}
                </div>
                <div className="md:w-1/2 p-6 bg-orange-50 border border-orange-100 rounded-3xl">
                   <h5 className="text-[10px] font-black text-orange-600 uppercase mb-2">PCL Gap Effects</h5>
                   <p className="text-xs text-orange-800 leading-relaxed italic">
                     "PCL release opens the flexion gap by 4–6mm but affects the extension gap by less than 2mm."
                   </p>
                </div>
             </div>
          </SectionCard>
        </div>
      );
    case 'specific':
      return (
        <div className="space-y-12">
          <div className="grid md:grid-cols-2 gap-8">
            <SectionCard title="After HTO" color="pink">
              <SectionDataGrid items={[
                "Skin: Watch for dominant medial supply; ≥8cm bridge.",
                "Patella Infera: Common after closing-wedge HTO.",
                "Tibial offset: IM canal shifted; use EM guides.",
                "Recommend PS design due to PCL scarring."
              ]} />
            </SectionCard>

            <SectionCard title="Previous Patellectomy" color="pink">
               <SectionDataGrid items={[
                "Global success high, but KSS is lower.",
                "PS > CR: CR is unstable after patellectomy.",
                "Loss of lever arm: Increases posterior tibial shift.",
                "Avoid Tantalum implants for the missing patella."
              ]} />
            </SectionCard>
          </div>

          <SectionCard title="Medical Comorbidities" color="pink">
             <SectionTable 
               headers={["Condition", "Impact", "Target"]}
               rows={[
                 ["Psoriasis", "High infection risk in-lesion", "Clear operative field"],
                 ["HIV+", "7.7% vs 3.3% infection rate", "High CD4; low viral load"],
                 ["Renal Failure", "High morbidity", "Adjust antibiotic dosage"],
                 ["Diabetes", "Universal complication risk", "HbA1c < 7.5%"],
               ]}
             />
          </SectionCard>
        </div>
      );
    case 'complications':
      return (
        <div className="space-y-12">
          <SectionCard title="PJI: MSIS Diagnostic Criteria" color="rose">
            <div className="grid md:grid-cols-2 gap-8">
               <div className="p-6 bg-rose-50 border border-rose-100 rounded-3xl">
                 <h5 className="text-[10px] font-black text-rose-600 uppercase mb-4">Major Criteria (One = Infected)</h5>
                 <SectionDataGrid items={["Two (+) cultures of same organism", "Sinus tract communicating with joint"]} />
               </div>
               <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl">
                 <h5 className="text-[10px] font-black text-amber-600 uppercase mb-4">Minor Criteria (Scored)</h5>
                 <SectionDataGrid items={["Serum CRP >10; ESR >30", "Synovial WBC >3000; PMN >70%", "Alpha-defensin positive"]} />
               </div>
            </div>
            <SectionAlert type="warning">Acute (&lt;4wks): Consider DAIR. Chronic (&gt;4wks): 2-stage revision is gold standard.</SectionAlert>
          </SectionCard>

          <div className="grid md:grid-cols-2 gap-8">
            <SectionCard title="Patellar Clunk Syndrome" color="rose">
               <SectionDataGrid items={[
                 "Fibrous nodule on posterior quad tendon.",
                 "Entraps in PS box at 30–45° during extension.",
                 "Symptoms: Painful 'clunk' as knee extends.",
                 "Management: Arthroscopic debridement."
               ]} />
            </SectionCard>

            <SectionCard title="Periprosthetic Fracture (Rorabeck)" color="rose">
              <SectionTable 
                headers={["Type", "Fixation", "Treatment"]}
                rows={[
                  ["I", "Stable", "Brace (Undisplaced)"],
                  ["II", "Stable", "ORIF (LISS/Nail)"],
                  ["III", "Loose", "Stemmed Revision"],
                ]}
              />
            </SectionCard>
          </div>
        </div>
      );
    case 'revision':
      return (
        <div className="space-y-12">
          <SectionCard title="Extensile Revision Exposures" color="indigo">
            <SectionTable 
              headers={["Approach", "Technique", "Outcome"]}
              rows={[
                ["Medial Parapatellar", "Standard with gutters", "Gold standard"],
                ["Rectus Snip", "Extension across quad tendon", "No extensor lag"],
                ["V-Y Quadricepsplasty", "Convert V to Y for advancement", "Post-op extensor lag"],
                ["Tubercle Osteotomy", "8-10cm crest segment", "Bony healing; lowest function"],
              ]}
            />
          </SectionCard>

          <SectionCard title="Reconstruction Logic" color="indigo">
            <div className="grid md:grid-cols-2 gap-10">
               <div>
                  <h5 className="text-[10px] font-black text-indigo-600 uppercase mb-4 italic">Gap Adjustment</h5>
                  <SectionTable 
                    headers={["Adjustment", "Effect"]}
                    rows={[
                      ["Larger Femur (AP)", "Fills Flexion Gap"],
                      ["Distal Augment", "Fills Extension Gap"],
                      ["Posterior Augment", "Fills Flexion Gap"],
                      ["Thicker PE", "Fills BOTH equally"],
                    ]}
                  />
               </div>
               <div>
                  <h5 className="text-[10px] font-black text-indigo-600 uppercase mb-4 italic">Joint Line Landmarks</h5>
                  <SectionDataGrid items={["14mm above fibular head", "23mm below lat. epicondyle", "28mm below med. epicondyle", "Elevation >4mm → instability"]} />
                  <SectionAlert type="info">Hybrid: Cement at interfaces + Press-fit stemmed fixation commonly used.</SectionAlert>
               </div>
            </div>
          </SectionCard>
        </div>
      );
    default:
      return null;
  }
};

export default TKARevision;
