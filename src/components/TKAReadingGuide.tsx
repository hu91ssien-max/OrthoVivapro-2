import React, { useState, useRef } from "react";
import { 
  ArrowLeft,
  BookOpen,
  Clock,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Search,
  Type,
  Menu
} from "lucide-react";

// ─── CALLOUT TYPES ──────────────────────────────────────────────────────────
const CL = {
  key:      { icon:"🔑", label:"Key Concept",    bg:"#1e3a5f22", border:"#3b82f644", color:"#60a5fa" },
  evidence: { icon:"📊", label:"Evidence",        bg:"#14532d22", border:"#22c55e44", color:"#4ade80" },
  trap:     { icon:"⚠️", label:"Examiner Trap",   bg:"#7c2d1222", border:"#f9731644", color:"#fb923c" },
  frcs:     { icon:"🎯", label:"FRCS High-Yield", bg:"#4c1d9522", border:"#8b5cf644", color:"#a78bfa" },
  tip:      { icon:"💡", label:"Clinical Tip",    bg:"#78350f22", border:"#fbbf2444", color:"#fbbf24" },
  danger:   { icon:"🚨", label:"Critical",        bg:"#7f1d1d22", border:"#f8717144", color:"#f87171" },
  compare:  { icon:"⚖️", label:"Comparison",      bg:"#1f2937",   border:"#37415144", color:"#9ca3af" },
};

const Callout = ({ type="key", children }: { type?: keyof typeof CL, children: React.ReactNode }) => {
  const c = CL[type];
  return (
    <div style={{ background:c.bg, border:`1px solid ${c.border}`, borderLeft:`4px solid ${c.color}`, borderRadius:"0 8px 8px 0", padding:"12px 16px", margin:"18px 0", fontSize:13, lineHeight:1.8, color:"#d1d5db" }}>
      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
        <span style={{ fontSize:14 }}>{c.icon}</span>
        <span style={{ fontSize:10, fontWeight:800, color:c.color, letterSpacing:1.5 }}>{c.label.toUpperCase()}</span>
      </div>
      {children}
    </div>
  );
};

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-black text-white mt-12 mb-4 border-b border-slate-800 pb-3 font-serif italic tracking-tighter">{children}</h2>
);
const H3 = ({ children, color="#60a5fa" }: { children: React.ReactNode, color?: string }) => (
  <h3 style={{ fontSize:16, fontWeight:700, color, margin:"24px 0 10px" }}>{children}</h3>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-base leading-relaxed text-slate-300 mb-6 font-serif">{children}</p>
);
const Ul = ({ items, color="#3b82f6" }: { items: string[], color?: string }) => (
  <ul className="my-4 space-y-2 list-none">
    {items.map((x,i)=>(
      <li key={i} className="flex gap-3 items-start text-sm text-slate-400 leading-relaxed font-serif">
        <span style={{ color, marginTop:6 }} className="flex-shrink-0 text-[10px]">◆</span>
        <span>{x}</span>
      </li>
    ))}
  </ul>
);

const DataGrid = ({ items }: { items: [string, string, string?][] }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-6">
    {items.map(([k,v,c="#60a5fa"])=>(
      <div key={k} className="bg-slate-900 border border-slate-800 rounded-xl p-4 transition-all hover:bg-slate-800 hover:border-slate-700">
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{k}</div>
        <div style={{ color:c }} className="text-lg font-black italic tracking-tighter">{v}</div>
      </div>
    ))}
  </div>
);

const CompareBox = ({ left, right, leftTitle, rightTitle, leftColor="#3b82f6", rightColor="#8b5cf6" }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800 my-6 rounded-2xl overflow-hidden border border-slate-800">
    {[[leftTitle,left,leftColor],[rightTitle,right,rightColor]].map(([title,items,color]: any)=>(
      <div key={title} className="bg-slate-950 p-6">
        <div style={{ color }} className="font-black text-xs uppercase tracking-widest mb-4 pb-2 border-b border-white/5">{title}</div>
        {items.map((x: string, i: number)=>(
          <div key={i} className="text-xs text-slate-400 mb-2 flex gap-3 leading-relaxed font-serif">
            <span style={{color}} className="flex-shrink-0">›</span>{x}
          </div>
        ))}
      </div>
    ))}
  </div>
);

const Timeline = ({ events }: { events: [string, string, string, string?][] }) => (
  <div className="my-8 space-y-2">
    {events.map(([year,title,desc,color="#3b82f6"],i)=>(
      <div key={year} className="flex gap-6 group">
        <div className="flex flex-col items-center flex-shrink-0">
          <div style={{ borderColor:color, color }} className="w-10 h-10 rounded-full bg-slate-900 border-2 flex items-center justify-center text-[10px] font-black z-10 transition-transform group-hover:scale-110">
            {year}
          </div>
          {i<events.length-1 && <div className="w-0.5 flex-1 bg-slate-800 my-1"/>}
        </div>
        <div className="pb-8 pt-1">
          <div className="font-black text-sm text-white mb-1 uppercase tracking-tight italic">{title}</div>
          <div className="text-xs text-slate-500 leading-relaxed font-serif italic">{desc}</div>
        </div>
      </div>
    ))}
  </div>
);

const AlignmentDiagram = () => (
  <div className="bg-slate-950 rounded-3xl p-8 border border-slate-800 my-8 flex justify-center overflow-hidden">
    <svg viewBox="0 0 400 280" className="w-full max-w-md">
      <ellipse cx="200" cy="50" rx="40" ry="18" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"/>
      <rect x="170" y="50" width="60" height="80" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"/>
      <path d="M170 130 Q160 145 155 155 L170 160 Q180 148 200 148 Q220 148 230 160 L245 155 Q240 145 230 130 Z" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"/>
      <rect x="155" y="163" width="90" height="12" rx="3" fill="#1e40af" stroke="#60a5fa" strokeWidth="1.5"/>
      <rect x="160" y="175" width="80" height="10" rx="3" fill="#0d4a2f" stroke="#22c55e" strokeWidth="1.5"/>
      <rect x="172" y="185" width="56" height="70" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"/>
      <ellipse cx="200" cy="255" rx="36" ry="14" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"/>
      <line x1="200" y1="30" x2="200" y2="265" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3"/>
      <path d="M200 95 L215 95" stroke="#fbbf24" strokeWidth="1.5"/>
      <path d="M206 80 L215 95 L206 110" stroke="#fbbf24" strokeWidth="1" fill="none"/>
      <text x="222" y="100" fill="#fbbf24" fontSize="9" fontWeight="bold">5-7° valgus</text>
      <text x="208" y="25" fill="#ef4444" fontSize="9" fontWeight="bold">Mechanical Axis</text>
      <text x="70" y="170" fill="#60a5fa" fontSize="9">Femoral Component</text>
      <text x="70" y="183" fill="#22c55e" fontSize="9">PE Insert ≥8mm</text>
      <text x="70" y="200" fill="#3b82f6" fontSize="9">Tibial Component</text>
      <text x="252" y="200" fill="#8b5cf6" fontSize="9">90° cut</text>
      <path d="M248 195 L260 195 L260 208" stroke="#8b5cf6" strokeWidth="1" fill="none"/>
    </svg>
  </div>
);

const GapDiagram = () => (
  <div className="bg-slate-950 rounded-3xl p-8 border border-slate-800 my-8 flex justify-center overflow-hidden">
    <svg viewBox="0 0 380 200" className="w-full max-w-sm">
      <rect x="20" y="40" width="80" height="60" rx="4" fill="#14532d33" stroke="#22c55e" strokeWidth="2"/>
      <rect x="20" y="100" width="80" height="12" rx="3" fill="#14532d" stroke="#22c55e" strokeWidth="1.5"/>
      <rect x="20" y="112" width="80" height="12" rx="3" fill="#0d4a2f" stroke="#22c55e" strokeWidth="1.5"/>
      <text x="60" y="75" fill="#22c55e" fontSize="9" textAnchor="middle" fontWeight="bold">Extension</text>
      <text x="115" y="80" fill="#6b7280" fontSize="18" textAnchor="middle">=</text>
      <rect x="140" y="40" width="80" height="60" rx="4" fill="#1e3a5f33" stroke="#3b82f6" strokeWidth="2"/>
      <rect x="140" y="100" width="80" height="12" rx="3" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"/>
      <rect x="140" y="112" width="80" height="12" rx="3" fill="#172554" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x="180" y="75" fill="#3b82f6" fontSize="9" textAnchor="middle" fontWeight="bold">Flexion</text>
      <rect x="250" y="30" width="110" height="50" rx="4" fill="#7c2d1233" stroke="#f9731644" strokeWidth="1"/>
      <text x="305" y="50" fill="#fb923c" fontSize="8" textAnchor="middle" fontWeight="bold">F-Gap &gt; E-Gap</text>
      <rect x="250" y="90" width="110" height="50" rx="4" fill="#1e3a5f33" stroke="#3b82f644" strokeWidth="1"/>
      <text x="305" y="110" fill="#60a5fa" fontSize="8" textAnchor="middle" fontWeight="bold">E-Gap &gt; F-Gap</text>
      <rect x="250" y="150" width="110" height="40" rx="4" fill="#14532d33" stroke="#22c55e44" strokeWidth="1"/>
      <text x="305" y="168" fill="#22c55e" fontSize="8" textAnchor="middle" fontWeight="bold">Both Lax</text>
    </svg>
  </div>
);

const ReleaseSequence = ({ side }: { side: "varus" | "valgus" }) => {
  const varus: [string, string, string, string][] = [
    ["1","Osteophyte Removal","May alone correct deformity","#22c55e"],
    ["2","Deep MCL","Posteromedial capsule off tibia","#60a5fa"],
    ["3","Superficial MCL","Anterior fibres → flexion gap","#a78bfa"],
    ["4","Post. Oblique Lig.","Extension gap predominantly","#fbbf24"],
    ["5","Semimembranosus","Posteromedial corner","#fb923c"],
    ["6","PCL Recession","Flexion gap +4-6mm / extension <2mm","#f87171"],
  ];
  const valgus: [string, string, string, string][] = [
    ["1","Osteophyte Removal","Lateral side first","#22c55e"],
    ["2","ITB Pie-crust","Extension gap; peroneal nerve 1.5cm away","#60a5fa"],
    ["3","Posterolateral Corner","Extension gap > flexion gap","#a78bfa"],
    ["4","Popliteus Tendon","Flexion gap > extension gap","#fbbf24"],
    ["5","LCL","Both gaps — use cautiously","#fb923c"],
    ["6","Lateral Gastrocnemius","Severe fixed valgus only","#f87171"],
  ];
  const data = side==="varus" ? varus : valgus;
  return (
    <div className="my-6 space-y-2">
      {data.map(([n,title,detail,color])=>(
        <div key={n} className="flex gap-4 items-start group">
          <div style={{ borderColor:color, color }} className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-black flex-shrink-0 group-hover:bg-slate-800 transition-colors">{n}</div>
          <div style={{ borderLeftColor:color }} className="flex-1 bg-slate-900/50 p-3 rounded-r-xl border-l-4">
            <div className="text-sm font-black text-white italic tracking-tight uppercase">{title}</div>
            <div className="text-[10px] text-slate-500 font-serif italic mt-1">{detail}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── CHAPTER CONTENT ────────────────────────────────────────────────────────
const CHAPTERS = [
  {
    id:"intro",
    title:"Chapter 1 — Historical Evolution & Implant Design",
    readTime:"12 min",
    icon:"🏛️",
    color:"#3b82f6",
    content: () => (
      <div>
        <H2>The Journey from Resection to Reconstruction</H2>
        <P>The history of total knee arthroplasty is one of iterative refinement driven by failure analysis. Early attempts at knee reconstruction — from Fergusson's excision arthroplasty (1861) to the interposition arthroplasties of the early twentieth century — yielded unpredictable results because surgeons lacked the biomechanical framework and materials science to engineer reliable joint replacements.</P>
        <P>The pivotal moment came in 1973 when John Insall and colleagues at the Hospital for Special Surgery introduced the <strong style={{color:"#60a5fa"}} className="italic tracking-tighter">total condylar prosthesis</strong>. This design made a deliberate philosophical choice: mechanical stability would be achieved through articular geometry rather than through preservation of the cruciate ligaments. Both cruciates were sacrificed, and the resulting prosthesis established the benchmark against which all subsequent designs are measured.</P>
        <Callout type="evidence">
          <strong>Long-term benchmark data:</strong> The total condylar prosthesis achieved 95% survivorship at 15 years and 91% at 21–23 years — figures that set the standard for modern TKA evaluation. Almost five decades later, there has not been another comparable technological leap in TKA design.
        </Callout>

        <H3>The Timeline of Innovation</H3>
        <Timeline events={[
          ["1973","Total Condylar Prosthesis (Insall, HSS)","Both cruciates sacrificed; sagittal stability by articular geometry; metal-backed tibial component added later for uniform stress transfer. Set the gold standard.","#3b82f6"],
          ["1978","Insall-Burstein Posterior-Stabilised (PS) Design","Cam-post mechanism engages at ~70° of flexion to produce obligatory femoral rollback. Solved the limited flexion problem. Required intercondylar box cut.","#8b5cf6"],
          ["1970s","Duopatellar → Kinematic Condylar Prosthesis","PCL retained; anatomically shaped femoral component. Separate tibial plateaus evolved to unified component with PCL cut-out.","#22c55e"],
          ["1977","LCS Mobile Bearing (Buechel et al.)","Meniscal-bearing and rotating platform designs; polyethylene free to rotate. Dramatically reduced contact stresses. 98% survival at 20 years.","#f59e0b"],
          ["1980s+","CCK (Constrained Condylar Knee)","Enlarged tibial post constrained within a deepened femoral box — provides varus-valgus stability. Evolved to include modular stems.","#ef4444"],
          ["Now","Bicruciate Retaining & Kinematic Alignment","Most anatomically accurate kinematics but technically demanding. Kinematic alignment remains controversial — higher failure rate with outliers.","#a78bfa"],
        ]}/>

        <H2>The Cruciate Controversy: CR vs PS</H2>
        <P>No debate in TKA has been more enduring or more evidence-laden than whether to retain or sacrifice the posterior cruciate ligament. Both sides marshal compelling arguments, and the truth lies in appreciating the precise mechanisms and trade-offs of each approach.</P>
        <P>In a <strong style={{color:"#60a5fa"}}>cruciate-retaining (CR)</strong> design, the intact PCL tightens during knee flexion, pulling the tibia anteriorly and thereby driving the femur to roll posteriorly — the so-called femoral rollback. This mechanism, when functioning correctly, increases the flexion moment arm and allows deeper flexion. The challenge is that the osteoarthritic PCL may be structurally abnormal, mechanically incompetent, or simply too tight — producing paradoxic anterior roll-forward of the medial femoral condyle, elevated contact stresses, and accelerated posterior polyethylene wear.</P>
        
        <CompareBox
          leftTitle="CR — Cruciate Retaining"
          rightTitle="PS — Posterior Stabilised"
          leftColor="#22c55e"
          rightColor="#8b5cf6"
          left={[
            "PCL preserved — potential proprioceptive role",
            "Less bone sacrifice (no intercondylar box)",
            "Less conforming tibial surface → higher contact stress",
            "PCL must be functional AND balanced (accuracy ±1-2mm)",
            "Mayo Clinic 15yr survival: 90%",
          ]}
          right={[
            "PCL sacrificed — reliable cam-post rollback at 70°",
            "Intercondylar box cut required → more bone removed",
            "More predictable kinematics in deformity correction",
            "Patellar clunk syndrome risk (fibrous nodule in box)",
            "Mayo Clinic 15yr survival: 77% (statistically lower)",
          ]}
        />

        <Callout type="trap">
          <strong>Examiner Trap — CR vs PS Survival:</strong> Many candidates assume PS and CR have equivalent survivorship. The Mayo Clinic study showed 15-year survivorship of 90% (CR) vs 77% (PS) — a statistically significant difference. Higher constraint transferring more stress to the bone-implant interface may contribute.
        </Callout>
      </div>
    )
  },
  {
    id:"bio",
    title:"Chapter 2 — Biomechanics & Kinematics",
    readTime:"10 min",
    icon:"⚙️",
    color:"#8b5cf6",
    content: () => (
      <div>
        <H2>The Knee as a Triaxial Joint</H2>
        <P>The knee is not a simple hinge. It moves in all three anatomic planes simultaneously during the gait cycle, generating approximately 70° of flexion-extension, 10° of abduction-adduction, and 10–15° of internal-external rotation with each stride.</P>
        <P>The central kinematic feature of the normal knee is the <strong style={{color:"#a78bfa"}}>medial pivot pattern</strong>. The medial femoral condyle translates only approximately 2mm posteriorly during flexion, acting as a stable pivot, while the lateral condyle undergoes a dramatic 21mm posterior rollback. This asymmetric motion drives the screw-home mechanism — external tibial rotation during terminal extension.</P>

        <Callout type="key">
          <strong>Screw-home mechanism:</strong> As the knee approaches full extension, the medial condyle's shorter articular arc causes the tibia to externally rotate relative to the femur. This "locks" the knee in full extension, allowing the quadriceps to relax.
        </Callout>

        <DataGrid items={[
          ["Walking gait","67° flexion","#3b82f6"],
          ["Stair climb","83° flexion","#8b5cf6"],
          ["Rising from chair","93° flexion","#f59e0b"],
          ["Q-Angle men","< 15°","#3b82f6"],
          ["Q-Angle women","< 20°","#8b5cf6"],
        ]}/>

        <H2>The Patellofemoral Joint</H2>
        <P>The patella's primary function is to displace the quadriceps and patellar tendon force vectors anteriorly, increasing the lever arm of the extensor mechanism around the knee. This extensor lever arm varies throughout the flexion arc — it is greatest at 20–30° of flexion, and diminishes significantly in the final 20° of extension.</P>
        <Callout type="danger">
          <strong>Malrotation Alert:</strong> Malrotation of femoral or tibial components is the commonest technical cause of PFJ problems and anterior knee pain post-TKA.
        </Callout>
      </div>
    )
  },
  {
      id: "selection",
      title: "Chapter 3 — Selection & Optimization",
      readTime: "9 min",
      icon: "✅",
      color: "#22c55e",
      content: () => (
        <div>
          <H2>Patient Selection Criteria</H2>
          <P>The primary indication for TKA is pain caused by severe arthritis — most commonly osteoarthritis — that significantly impairs quality of life and has failed an adequate trial of conservative management.</P>
          <Callout type="danger">
            <strong>Absolute Contraindications:</strong><br/>
            1. Active or recent knee sepsis | 2. Remote ongoing infection source | 3. Extensor mechanism discontinuity | 4. Recurvatum from neuromuscular weakness | 5. Painless, well-functioning knee arthrodesis.
          </Callout>

          <DataGrid items={[
            ["HbA1c target","< 7.5%","#ef4444"],
            ["Fructosamine","< 293 µmol/L","#f97316"],
            ["Albumin","≥ 3.5 g/dL","#fbbf24"],
            ["Total lymphocytes","≥ 1200/mL","#22c55e"],
          ]}/>

          <Callout type="frcs">
            <strong>The Fructosamine Trap:</strong> Fructosamine reflects control over 2–3 weeks. In a landmark study, patients with fructosamine &gt; 293 µmol/L were 11.2× more likely to develop PJI — even when HbA1c was acceptable.
          </Callout>
        </div>
      )
  },
  {
      id: "technique",
      title: "Chapter 4 — Technique & Alignment",
      readTime: "14 min",
      icon: "🔧",
      color: "#f97316",
      content: () => (
        <div>
          <H2>Restoring the Mechanical Axis</H2>
          <P>The mechanical axis of the lower limb is defined as a line from the centre of the femoral head to the centre of the talar dome. Restoration of a neutral mechanical axis has been the cornerstone of TKA alignment philosophy for 50 years.</P>
          <AlignmentDiagram/>
          <H2>The Gap Balancing Principle</H2>
          <P>The fundamental intraoperative task is to create two equal, rectangular gaps — one in extension and one in flexion.</P>
          <GapDiagram/>
          <Callout type="tip">
            <strong>Osteophyte Removal:</strong> Before releasing any soft tissue, all peripheral osteophytes must be removed. In many cases, osteophyte removal alone corrects apparent coronal deformity.
          </Callout>
        </div>
      )
  },
  {
      id: "balancing",
      title: "Chapter 5 — Soft Tissue Balancing",
      readTime: "13 min",
      icon: "⚖️",
      color: "#a78bfa",
      content: () => (
        <div>
          <H2>Varus vs Valgus Balancing</H2>
          <P>Soft tissue balancing is the art of creating symmetric gaps by selectively releasing contracted structures. The guiding principle is to release the minimum necessary.</P>
          
          <H3>Varus Knee Sequence</H3>
          <ReleaseSequence side="varus"/>

          <H3>Valgus Knee Sequence</H3>
          <ReleaseSequence side="valgus"/>

          <Callout type="key">
            <strong>PCL Effects:</strong> PCL release opens the flexion gap by 4–6mm but affects the extension gap by less than 2mm.
          </Callout>
        </div>
      )
  },
  {
      id: "complications",
      title: "Chapter 6 — Complications",
      readTime: "16 min",
      icon: "⚠️",
      color: "#ef4444",
      content: () => (
        <div>
          <H2>Periprosthetic Joint Infection (PJI)</H2>
          <P>PJI occurs in 1–3% of primary TKA and is a leading cause of early revision. Diagnosis follows the MSIS 2018 criteria.</P>
          <Callout type="frcs">
            <strong>Scoring:</strong> Major criteria (2 (+) cultures or sinus tract) confirm infection. Minor criteria like CRP &gt; 100, Synovial WBC &gt; 3000 are scored. Scored &gt; 6 is infected.
          </Callout>
          <H3>The Patellar Clunk</H3>
          <P>Unique to PS designs — a fibrous nodule forms on the posterior quadriceps tendon, entraping in the intercondylar notch at 30–45° of extension.</P>
        </div>
      )
  },
  {
      id: "revision",
      title: "Chapter 7 — Revision Principles",
      readTime: "14 min",
      icon: "🔄",
      color: "#a78bfa",
      content: () => (
        <div>
          <H2>Analysing Failure</H2>
          <P>Sharkey's landmark analysis: Aseptic loosening (39.9%) and Infection (27.4%) are the primary causes. Early failure (&lt; 2yr) is most commonly infection.</P>
          <DataGrid items={[
            ["Aseptic loosening","39.9%","#f87171"],
            ["Infection","27.4%","#f97316"],
            ["Instability","7.5%","#fb923c"],
          ]}/>
          <H2>Joint Line Restoration</H2>
          <P>Elevation &gt; 4mm above native creates mid-flexion instability. Reliable landmarks: 14mm above fibular head; 23mm below lat epicondyle.</P>
          <Callout type="key">
            <strong>Revision Logic:</strong> Thicker PE fills both gaps. Distal augment fills extension. Posterior augment/larger femur fills flexion.
          </Callout>
        </div>
      )
  }
];

interface TKAReadingGuideProps {
  onBack: () => void;
}

const TKAReadingGuide = ({ onBack }: TKAReadingGuideProps) => {
  const [activeId, setActiveId] = useState("intro");
  const [sideOpen, setSideOpen] = useState(true);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [readChapters, setRead] = useState<Set<string>>(new Set(["intro"]));
  
  const topRef = useRef<HTMLDivElement>(null);
  const chapter = CHAPTERS.find(c => c.id === activeId) || CHAPTERS[0];

  const goTo = (id: string) => {
    setActiveId(id);
    setRead(prev => new Set([...prev, id]));
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const pct = Math.round((readChapters.size / CHAPTERS.length) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-serif selection:bg-blue-900 selection:text-white">
      {/* Top Navigation */}
      <nav className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <ArrowLeft size={18} className="text-slate-400" />
          </button>
          <div className="h-4 w-px bg-slate-800"/>
          <button onClick={() => setSideOpen(!sideOpen)} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <Menu size={18} className="text-slate-400" />
          </button>
          <span className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 hidden sm:inline">Campbell's Chapter 7 Guide</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-3">
             <div className="w-32 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div style={{ width: `${pct}%` }} className="h-full bg-blue-500 transition-all duration-700"/>
             </div>
             <span className="text-[10px] font-black text-slate-500">{pct}% Complete</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-800 rounded-full"><Type size={16} className="text-slate-500" /></button>
            <button className="p-2 hover:bg-slate-800 rounded-full"><Search size={16} className="text-slate-500" /></button>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Table of Contents Sidebar */}
        {sideOpen && (
          <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col overflow-hidden shrink-0">
            <div className="p-6 border-b border-white/5 bg-slate-950/30">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2">Reading Content</h4>
               <p className="text-xs text-slate-500 leading-relaxed italic">Arthroplasty of the Knee: Principles and Practice</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              {CHAPTERS.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => goTo(ch.id)}
                  className={`w-full group px-4 py-3 rounded-xl flex items-start gap-4 transition-all duration-300 ${
                    activeId === ch.id ? "bg-blue-600/10 border border-blue-600/20 shadow-lg" : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <span className={`text-xl transition-transform group-hover:scale-110 ${activeId === ch.id ? "grayscale-0" : "grayscale opacity-50"}`}>
                    {ch.icon}
                  </span>
                  <div className="text-left">
                    <div className={`text-[10px] font-black uppercase tracking-widest leading-none mb-1 ${activeId === ch.id ? "text-blue-400" : "text-slate-500"}`}>
                       Chapter {CHAPTERS.indexOf(ch) + 1}
                    </div>
                    <div className={`text-xs font-bold leading-tight ${activeId === ch.id ? "text-white" : "text-slate-400"}`}>
                        {ch.title.split(" — ")[1]}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                       <div className="flex items-center gap-1 text-[9px] text-slate-600">
                          <Clock size={10} /> {ch.readTime}
                       </div>
                       {readChapters.has(ch.id) && <div className="text-[10px] text-emerald-500">✓</div>}
                       {bookmarks.includes(ch.id) && <Bookmark size={10} className="text-amber-500 fill-amber-500" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </aside>
        )}

        {/* Content Pane */}
        <main className="flex-1 overflow-y-auto bg-slate-950/50 relative">
          <div ref={topRef}/>
          <div className="max-w-3xl mx-auto px-8 py-16">
            {/* Header */}
            <div className="mb-16 border-b border-white/5 pb-12">
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shadow-xl">
                    {chapter.icon}
                  </div>
                  <div className="h-1 w-12 bg-blue-600 rounded-full"/>
                  <button 
                    onClick={() => toggleBookmark(activeId)}
                    className={`p-2 rounded-full border transition-all ${bookmarks.includes(activeId) ? "bg-amber-500/10 border-amber-500 text-amber-500" : "bg-white/5 border-white/10 text-slate-500 hover:text-white"}`}
                  >
                    <Bookmark size={20} fill={bookmarks.includes(activeId) ? "currentColor" : "none"} />
                  </button>
               </div>
               <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter leading-tight mb-4">{chapter.title}</h1>
               <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-widest text-slate-500">
                  <span className="flex items-center gap-2"><Clock size={13} /> {chapter.readTime} Reading</span>
                  <span className="flex items-center gap-2"><BookOpen size={13} /> Campbell's Reference</span>
               </div>
            </div>

            {/* Rendered Chapter UI */}
            <article className="prose prose-invert prose-slate max-w-none">
               {chapter.content()}
            </article>

            {/* Footer Navigation */}
            <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row gap-6 justify-between">
               {(() => {
                  const idx = CHAPTERS.findIndex(c => c.id === activeId);
                  const prev = CHAPTERS[idx - 1];
                  const next = CHAPTERS[idx + 1];
                  return (
                    <>
                      <button 
                        onClick={() => prev && goTo(prev.id)}
                        disabled={!prev}
                        className={`flex-1 group p-6 rounded-3xl border transition-all flex items-center gap-6 ${prev ? "bg-white/5 border-white/10 hover:bg-white/10" : "opacity-20 cursor-not-allowed border-transparent"}`}
                      >
                         <ChevronLeft className="group-hover:-translate-x-2 transition-transform" />
                         <div className="text-left">
                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 italic">Previous Segment</div>
                            <div className="text-sm font-black text-white italic tracking-tight">{prev?.title.split(" — ")[1] || "Beginning"}</div>
                         </div>
                      </button>
                      <button 
                        onClick={() => next && goTo(next.id)}
                        disabled={!next}
                        className={`flex-1 group p-6 rounded-3xl border transition-all flex items-center justify-between gap-6 ${next ? "bg-blue-600/10 border-blue-600/20 hover:bg-blue-600/20" : "opacity-20 cursor-not-allowed border-transparent"}`}
                      >
                         <div className="text-left">
                            <div className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-1 italic">Next Segment</div>
                            <div className="text-sm font-black text-white italic tracking-tight">{next?.title.split(" — ")[1] || "The End"}</div>
                         </div>
                         <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                      </button>
                    </>
                  );
               })()}
            </div>
          </div>
        </main>
      </div>
      
      <style>{`
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </div>
  );
};

export default TKAReadingGuide;
