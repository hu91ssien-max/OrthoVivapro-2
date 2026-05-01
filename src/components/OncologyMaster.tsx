import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  Target, 
  Layers, 
  ShieldAlert, 
  ShieldCheck,
  Microscope, 
  Bone, 
  Info, 
  User, 
  Search, 
  AlertCircle,
  ChevronRight,
  TrendingUp,
  FileText,
  Clock,
  Scissors,
  UserCheck,
  Navigation,
  MoveVertical,
  ClipboardCheck,
  ClipboardList,
  Stethoscope,
  XCircle,
  Radiation,
  HeartPulse,
  AlertTriangle,
  FlaskConical,
  Zap,
  ArrowLeft,
  ArrowRight,
  MoveDown,
  Thermometer,
  Waves,
  Database,
  Sparkles,
  Hand,
  Hammer,
  RotateCcw,
  FileSearch,
  Maximize2,
  Droplet,
  Droplets,
  Flame,
  Crosshair,
  Eye,
  Dna,
  History,
  MousePointer2
} from 'lucide-react';

interface OncologyMasterProps {
  onBack?: () => void;
  onSwitchToSynoNeuro?: () => void;
  onSwitchToMetaLab?: () => void;
  onSwitchToSclerotic?: () => void;
  onSwitchToOSCE?: () => void;
}

const SECTIONS = [
  { id: 'basics', label: 'Epi & Class', icon: ClipboardList },
  { id: 'presentation', label: 'Clinical & Mimics', icon: Stethoscope },
  { id: 'staging', label: 'Staging & Biopsy', icon: Target },
  { id: 'pseudo', label: 'Pseudo-Lab', icon: Search },
  { id: 'management', label: 'Surgery & Therapy', icon: Scissors },
  { id: 'pathology', label: 'Pathology Mimics', icon: Microscope },
];

const REACTIVE_MIMICS_DATA = {
  nora: {
    title: "Bizarre Parosteal Osteochondromatous Proliferation (BPOP)",
    aka: "Nora’s Lesion",
    pathology: "A benign but highly cellular reactive growth. It can appear 'bizarre' under a microscope, often leading to a false diagnosis of Osteosarcoma.",
    imaging: "Mineralized mass attached to the cortical surface of small bones (hands/feet). Unlike osteochondroma, it lacks medullary continuity.",
    behavior: "High local recurrence (up to 50%) but NO metastatic potential.",
    pearl: "The most important differentiator from Osteosarcoma is the lack of true cellular atypia and the lack of host bone invasion.",
    icon: Hand
  },
  reactive: {
    title: "Florid Reactive Periostitis",
    aka: "Pseudotumour of the Digit",
    pathology: "An extreme inflammatory reaction of the periosteum, usually following minor trauma or infection.",
    imaging: "Dense, multi-layered periosteal reaction in the phalanges. Can look very aggressive and permeative.",
    clinical: "Rapid onset of painful swelling in a finger or toe. Patient often recalls a crush or strike.",
    pearl: "It is a member of the 'Nora-like' spectrum. Clinical history of trauma is the vital clue that prevents radical surgery.",
    icon: Hammer
  },
  geode: {
    title: "Intraosseous Ganglion",
    aka: "Subchondral Geode",
    pathology: "A benign, fluid-filled cystic lesion located in the epiphysis, often communicating with the joint space.",
    imaging: "Well-defined lytic lesion with a thin sclerotic rim, always located subchondrally.",
    differentiation: "Must be distinguished from a Simple Bone Cyst (SBC) or Giant Cell Tumour (GCT). Connection to joint disease (OA/RA) is key.",
    pearl: "If the joint shows signs of Osteoarthritis (joint space narrowing, osteophytes), the lesion is almost certainly a Geode, not a tumor.",
    icon: Target
  },
  stress: {
    title: "The 'Dreaded Black Line'",
    aka: "Stress Fracture Mimic",
    pathology: "A focal area of cortical resorption during an evolving stress fracture (usually mid-tibia).",
    imaging: "A linear lucency in the anterior cortex with surrounding periosteal 'callus' that can look like a surface tumor.",
    risk: "If mistaken for a tumor and biopsied, the resulting defect may cause a complete fracture.",
    pearl: "MRI shows intense bone marrow edema (STIR positive). This 'tumor' disappears with rest and non-weight bearing.",
    icon: Activity
  }
};

const MIMIC_SECTIONS = [
  { id: 'nora', label: "Nora's Lesion (BPOP)", icon: Hand },
  { id: 'reactive', label: 'Reactive Periostitis', icon: Hammer },
  { id: 'geode', label: 'Intraosseous Ganglion', icon: Target },
  { id: 'stress', label: 'Stress Mimics', icon: Activity },
];

const GANGLION_DATA = {
  sites: [
    { 
      id: 'dorsal', 
      label: 'Dorsal Wrist', 
      percent: '70%', 
      origin: 'Scapholunate Ligament', 
      pearl: 'The most common site. Usually prominent in flexion.' 
    },
    { 
      id: 'volar', 
      label: 'Volar Wrist', 
      percent: '20%', 
      origin: 'Radio-carpal Joint', 
      pearl: 'Beware the Radial Artery; always perform an Allen’s Test before surgery.' 
    },
    { 
      id: 'flexor', 
      label: 'Flexor Sheath', 
      percent: '5%', 
      origin: 'A1/A2 Pulley', 
      pearl: 'Known as a "Seed Ganglion". Feels like a lead shot; very tender to grip.' 
    }
  ],
  differentials: [
    { name: "GCTTS", key: "Solid, no transillumination, low MRI signal." },
    { name: "Lipoma", key: "Soft, deeper, no fluctuation with joint movement." },
    { name: "Vascular", key: "Pulsatile (Aneurysm). Do not aspirate!" },
    { name: "Sarcoma", key: "Rapid growth, > 5cm, firm, deep to fascia." }
  ]
};

const BAKER_CYST_DATA = {
  anatomy: {
    location: "Medial Popliteal Fossa",
    interval: "Between Medial Gastrocnemius and Semimembranosus",
    mechanism: "One-Way Valve (Communication with Knee Joint)",
    description: "The cyst is a distended bursa that fills via a valvular opening in the posterior capsule."
  },
  causes: [
    { type: "Degenerative", primary: "Osteoarthritis", note: "Common in elderly; indicates chronic effusion." },
    { type: "Mechanical", primary: "Meniscal Tears", note: "Often posterior horn tears of the medial meniscus." },
    { type: "Inflammatory", primary: "Rheumatoid Arthritis", note: "Large, complex cysts with thickened synovial linings." },
    { type: "Pediatric", primary: "Primary Cyst", note: "Rarely communicates with the joint; usually self-limiting." }
  ],
  complications: {
    rupture: "Pseudo-thrombophlebitis",
    mimic: "DVT (Deep Vein Thrombosis)",
    signs: ["Sudden severe calf pain", "Swelling", "Ecchymosis at the ankle (Crescent Sign)"]
  }
};

const SOFT_TISSUE_ATLAS_DATA = {
  ganglion: {
    title: "Ganglion Cyst",
    aka: "Synovial Cyst / 'The Joint Leak'",
    pathology: "Mucinous degeneration of the joint capsule or tendon sheath. Not a true tumor; contains jelly-like mucin.",
    clinical: "Firm, rounded, transilluminating swelling. Fluctuates in size with activity.",
    imaging: "Ultrasound: Anechoic, well-defined cyst with posterior acoustic enhancement. MRI: Fluid-filled, pedicle-connected.",
    pearl: "If painless, leave it; if painful, excise the stalk (+ cuff of capsule) to prevent recurrence.",
    icon: Droplets
  },
  gctts: {
    title: "Giant Cell Tumour of Tendon Sheath",
    aka: "Localized PVNS / Xanthoma",
    pathology: "A localized proliferation of synoviocytes along the tendon sheath. Most common tumor of the hand.",
    clinical: "Firm, non-tender, slow-growing mass. Does not transilluminate.",
    imaging: "X-ray: Soft tissue swelling; may show 'pressure erosions' on adjacent bone. MRI: Low signal on T1/T2 (hemosiderin).",
    pearl: "Unlike a ganglion, this mass is solid and fixed to the tendon. Recurrence is common if excision is incomplete.",
    icon: Hand
  },
  cysts: {
    title: "Soft Tissue Cysts",
    aka: "Ganglion & Baker's",
    pathology: "Ganglion: Mucinous degeneration of connective tissue. Baker's: Fluid collection between Semimembranosus and Medial Gastrocnemius.",
    imaging: "Transilluminates brightly (Ganglion). MRI: Fluid signal communicating with joint (Baker's).",
    differentiation: "Baker's cysts are almost always secondary to intra-articular pathology (Meniscal tear/OA).",
    pearl: "Treat the underlying knee problem in a Baker's cyst, or it will recur.",
    icon: Droplet
  },
  hemangioma: {
    title: "Synovial Hemangioma",
    aka: "Joint Vascular Malformation",
    pathology: "A rare, benign vascular proliferation within the synovial membrane, usually involving the knee.",
    clinical: "Recurrent joint swelling and pain. Mimics PVNS but with phleboliths.",
    imaging: "MRI: Lobulated mass with serpentine high-intensity signal on T2. Phleboliths on X-ray are diagnostic.",
    pearl: "If the 'joint mice' look like tiny stones (phleboliths), think hemangioma over PVNS.",
    icon: Activity
  },
  morel: {
    title: "Morel-Lavallée Lesion",
    aka: "Internal Degloving Injury",
    pathology: "A post-traumatic fluid collection (blood, lymph, fat) between the fascia and subcutaneous fat.",
    clinical: "Soft, fluctuant swelling over the lateral hip (Greater Trochanter) following shear injury.",
    imaging: "MRI: Crescentic fluid collection overlying the fascia.",
    pearl: "If missed, it can become a chronic, encapsulated mass misdiagnosed as a soft tissue sarcoma.",
    icon: AlertCircle
  }
};

const SOFT_TISSUE_SECTIONS = [
  { id: 'gctts', label: 'GCT of Tendon Sheath', icon: Hand },
  { id: 'ganglion', label: 'Ganglion Cyst', icon: Droplets },
  { id: 'cysts', label: 'Soft Tissue Cysts', icon: Droplet },
  { id: 'hemangioma', label: 'Synovial Hemangioma', icon: Activity },
  { id: 'morel', label: 'Morel-Lavallée', icon: AlertCircle },
];

const SEROLOGY_DATA = [
  { marker: "Alkaline Phosphatase (ALP)", link: "Osteosarcoma / Paget's", note: "Reflects osteoblastic activity. High levels at diagnosis correlate with poor prognosis." },
  { marker: "Lactate Dehydrogenase (LDH)", link: "Ewing's Sarcoma", note: "A marker of high cell turnover. Used to monitor chemotherapy response." },
  { marker: "Prostate Specific Antigen (PSA)", link: "Prostate Metastasis", note: "Mandatory screening in any male over 50 with a lytic/blastic bone lesion." },
  { marker: "Serum Electrophoresis", link: "Multiple Myeloma", note: "Look for the monoclonal (M-protein) spike and Bence-Jones proteins in urine." },
  { marker: "Serum Calcium", link: "Metastasis / Myeloma", note: "Urgent assessment for Hypercalcemia of Malignancy (Stones, Moans, Groans, Bones)." }
];

const RADIATION_MAP = {
  sensitive: [
    { name: "Ewing's Sarcoma", dose: "45-55 Gy", effect: "Highly responsive; can be definitive treatment." },
    { name: "Multiple Myeloma", dose: "20-30 Gy", effect: "Excellent for local pain control." },
    { name: "Lymphoma", dose: "30-40 Gy", effect: "Rapidly shrinks soft tissue masses." }
  ],
  resistant: [
    { name: "Osteosarcoma", note: "Surgery is primary; radiation only for palliation." },
    { name: "Chondrosarcoma", note: "Notoriously resistant; cartilage tissue does not respond." },
    { name: "Chordoma", note: "High doses required; risk to local neural structures." }
  ]
};

const PALLIATION_GOALS = [
  { goal: "Pain Control", method: "WHO Pain Ladder + Targeted Radiotherapy." },
  { goal: "Fracture Prevention", method: "Prophylactic Fixation (Mirels' Score ≥ 9)." },
  { goal: "Mobility", method: "Immediate weight-bearing using cemented prostheses." },
  { goal: "Hypercalcaemia", method: "IV Fluids + Bisphosphonates (Zoledronate)." }
];

const PITFALLS_DATA = [
  { 
    title: "Bone Scan 'Flare'", 
    desc: "A bone scan that looks 'worse' during the first 3 months of successful treatment due to reactive bone repair.",
    key: "Don't mistake healing for progression."
  },
  { 
    title: "The Brodie's Trap", 
    desc: "A subacute abscess that looks exactly like an Osteoid Osteoma (nidus + sclerosis).",
    key: "Always check ESR/CRP in suspected benign lesions."
  },
  { 
    title: "Cold Spots", 
    desc: "Multiple Myeloma and purely lytic Renal cancer often don't show up on a Technetium scan.",
    key: "Negative bone scan does NOT exclude bone cancer."
  }
];

const HARRINGTON_PELVIS = [
  { id: 'class1', class: 'Class I', desc: 'Lateral cortex and superior/medial acetabular walls intact.', management: 'Standard Total Hip Arthroplasty (THA).' },
  { id: 'class2', class: 'Class II', desc: 'Deficient medial wall (acetabular floor).', management: 'THA with a mesh or protrusio ring and cement.' },
  { id: 'class3', class: 'Class III', desc: 'Deficient lateral and superior walls (structural loss).', management: 'THA with structural reinforcement (e.g., saddle prosthesis or cages).' },
  { id: 'class4', class: 'Class IV', desc: 'Massive bone loss/Pelvic discontinuity.', management: 'Major reconstruction or Internal Hemipelvectomy.' }
];

const MSTS_SCORE = [
  { param: 'Pain', range: '0 (Severe) - 5 (None)', desc: 'Residual pain after limb salvage.' },
  { param: 'Function', range: '0 (None) - 5 (Full)', desc: 'Ability to perform daily activities.' },
  { param: 'Emotional Acceptance', range: '0 (Dissatisfied) - 5 (Enthusiastic)', desc: 'Patient psychological response to the result.' },
  { param: 'Supports', range: '0 (Two crutches) - 5 (None)', desc: 'Requirement for walking aids.' },
  { param: 'Walking Distance', range: '0 (Bedridden) - 5 (Unlimited)', desc: 'Mobility threshold.' },
  { param: 'Gait', range: '0 (Major) - 5 (Normal)', desc: 'Quality of locomotion.' }
];

const SCIENCE_SECTIONS = [
  { id: 'serology', label: 'Diagnostic Serology', icon: FlaskConical },
  { id: 'radiation', label: 'Radiation Biology', icon: Radiation },
  { id: 'palliation', label: 'Palliative Care', icon: HeartPulse },
  { id: 'harrington', label: 'Harrington Pelvis', icon: Target },
  { id: 'msts', label: 'MSTS Outcome', icon: UserCheck },
  { id: 'skip', label: 'Skip Lesions', icon: Layers },
  { id: 'fixation', label: 'Fixation Principles', icon: ShieldCheck },
  { id: 'pitfalls', label: 'Imaging Pitfalls', icon: AlertTriangle },
];

const PSEUDO_LAB_DATA = {
  pseudotumours: [
    {
      id: 'myositis',
      name: 'Myositis Ossificans',
      type: 'Heterotopic Ossification',
      aka: "The 'Don't Touch' Lesion",
      pathology: 'Post-traumatic ossification in muscle. Early phase looks highly aggressive (pseudomalignant).',
      imaging: 'Zonal Phenomenon: Mature bone at the periphery, immature center. (Opposite of Osteosarcoma).',
      pearl: 'Biopsy in the first 4 weeks will often lead to a false diagnosis of Osteosarcoma.'
    },
    {
      id: 'subungual',
      name: 'Subungual Exostosis',
      type: 'Benign Growth',
      aka: 'Dupuytren’s Subungual Exostosis',
      pathology: 'Fibrocartilaginous outgrowth from the distal phalanx (usually great toe).',
      imaging: 'Bony stalk continuous with the distal phalanx cortex.',
      pearl: 'Painful nail elevation; must differentiate from subungual melanoma.'
    }
  ],
  epiphyseal_malignancy: {
    title: "Clear Cell Chondrosarcoma",
    age: "25 - 50 years",
    site: "Epiphysis (Proximal Femur/Humerus)",
    differentiation: "Contrasts with Chondroblastoma (younger) and GCT (benign).",
    behavior: "Low-grade malignancy but definitively cancerous. Requires wide excision.",
    imaging: "Lytic, expansile epiphyseal lesion with sharp borders."
  },
  plasma_cell: [
    {
      id: 'plasmacytoma',
      name: 'Solitary Plasmacytoma',
      pathology: 'Localized collection of neoplastic plasma cells without systemic disease.',
      progression: '50-70% progress to Multiple Myeloma within 10 years.',
      imaging: 'Soap-bubble appearance; purely lytic.',
      pearl: 'Requires bone marrow biopsy and electrophoresis to exclude systemic Myeloma.'
    }
  ],
  soft_tissue_special: [
    {
      name: "Elastofibroma Dorsi",
      aka: "The Snapping Scapula Tumor",
      site: "Subscapular region (deep to serratus anterior).",
      patient: "Elderly females; manual laborers.",
      imaging: "MRI: Alternating streaks of fat and fibrous tissue (striated).",
      note: "Often bilateral. Only requires excision if symptomatic or 'snapping' is severe."
    }
  ]
};

const MYOSITIS_EVOLUTION = [
  {
    id: 'early',
    title: 'Phase 1: Pseudoinflammatory',
    timing: 'Weeks 1–4',
    features: 'Rapidly growing, painful soft-tissue mass. Often warm and tender.',
    pathology: 'High mitotic activity and spindle cell proliferation. Easily mistaken for a high-grade sarcoma.',
    imaging: 'Soft tissue swelling only. X-rays are usually negative or show faint "cloud-like" density.',
    action: 'DO NOT BIOPSY. The high cellularity is a diagnostic trap for malignancy.'
  },
  {
    id: 'intermediate',
    title: 'Phase 2: Zonal Maturation',
    timing: 'Weeks 4–8',
    features: 'Mass becomes firmer and less painful. Size stabilizes.',
    pathology: 'The "Zonal Phenomenon" appears: Immature center, intermediate osteoid, and mature peripheral bone.',
    imaging: 'Faint peripheral rim of calcification. The classic "String Sign" (radiolucent line between mass and host bone).',
    action: 'Repeat imaging. Peripheral mineralization confirms the diagnosis.'
  },
  {
    id: 'late',
    title: 'Phase 3: Mature Ossification',
    timing: 'Months 3–6+',
    features: 'Hard, painless bony mass. May limit joint range of motion (mechanical block).',
    pathology: 'Mature lamellar bone. Quiescent histology.',
    imaging: 'Well-defined, dense, egg-shell calcification. Clearly separate from the host cortex.',
    action: 'Observe or excise if causing mechanical block. Do not excise before 6-12 months.'
  }
];

const MYOSITIS_VS_SARCOMA = [
  { feature: 'Maturation Pattern', myositis: 'Peripheral (Matures outside-in)', sarcoma: 'Central (Matures inside-out)' },
  { feature: 'Pain Pattern', myositis: 'Intense initially; fades over time', sarcoma: 'Progressive; worse at night' },
  { feature: 'Host Bone', myositis: 'String Sign (Separate from bone)', sarcoma: 'Invasive (Destroys cortex)' },
  { feature: 'Growth Rate', myositis: 'Extremely rapid early; then stops', sarcoma: 'Persistent and progressive' }
];

const ONCOLOGY_DATA = {
  epidemiology: {
    rule: "Age is the single most important diagnostic clue.",
    primary: "Primary bone tumours are rare (<1% of all cancers).",
    secondary: "Metastatic bone disease is the most common bone malignancy in adults (>50 yrs).",
    sites: "PB-KTL (Prostate, Breast, Kidney, Thyroid, Lung) are the most common primary sites for bone metastases."
  },
  classification: [
    { tissue: 'Bone forming', benign: 'Osteoma, Osteoid Osteoma', malignant: 'Osteosarcoma' },
    { tissue: 'Cartilage forming', benign: 'Chondroma, Osteochondroma', malignant: 'Chondrosarcoma' },
    { tissue: 'Marrow / Round Cell', benign: '—', malignant: "Ewing's Sarcoma, Lymphoma" },
    { tissue: 'Giant Cell', benign: 'GCT (Locally aggressive)', malignant: 'Malignant GCT (Rare)' }
  ],
  mimics: [
    { name: "Osteomyelitis", note: "Mimics Ewing's with fever, high ESR, and systemic malaise." },
    { name: "Stress Fracture", note: "Shows periosteal reaction that can mimic an aggressive lesion." },
    { name: "Eosinophilic Granuloma", note: "The 'Great Imitator'; can look like any bone lesion." },
    { name: "Brown Tumour", note: "Result of Hyperparathyroidism; mimics GCT." }
  ],
  margins: [
    { id: 'intralesional', label: 'Intralesional', desc: 'Debulking / Through the tumour.', recurrence: '100% for malignant lesions.' },
    { id: 'marginal', label: 'Marginal', desc: 'Through the pseudocapsule.', recurrence: 'High due to satellite nodules.' },
    { id: 'wide', label: 'Wide', desc: 'Through a cuff of healthy tissue in the same compartment.', recurrence: 'Standard for limb salvage.' },
    { id: 'radical', label: 'Radical', desc: 'Removal of the entire compartment (Extracompartmental).', recurrence: 'Lowest risk.' }
  ]
};

const OncologyMaster = ({ onBack, onSwitchToSynoNeuro, onSwitchToMetaLab, onSwitchToSclerotic, onSwitchToOSCE }: OncologyMasterProps) => {
  const [activeTab, setActiveTab] = useState('basics');
  const [selectedMargin, setSelectedMargin] = useState('wide');
  const [mimicTab, setMimicTab] = useState('nora');
  const [softTab, setSoftTab] = useState('gctts');
  const [atlasType, setAtlasType] = useState<'bone' | 'soft' | 'science'>('bone');
  const [pseudoTab, setPseudoTab] = useState('pseudotumours');
  const [selectedPseudoId, setSelectedPseudoId] = useState('myositis');
  const [activeMyositisPhase, setActiveMyositisPhase] = useState('early');
  const [activeGanglionSite, setActiveGanglionSite] = useState('dorsal');
  const [activeBakerTab, setActiveBakerTab] = useState('anatomy');
  const [activeScienceTab, setActiveScienceTab] = useState('serology');
  const [selectedPitfall, setSelectedPitfall] = useState(0);
  const [selectedHarringtonId, setSelectedHarringtonId] = useState('class1');

  const marginData = useMemo(() => 
    ONCOLOGY_DATA.margins.find(m => m.id === selectedMargin) || ONCOLOGY_DATA.margins[2], 
  [selectedMargin]);

  const harringtonDetail = useMemo(() => 
    HARRINGTON_PELVIS.find(h => h.id === selectedHarringtonId) || HARRINGTON_PELVIS[0],
  [selectedHarringtonId]);

  const currentMimic = useMemo(() => REACTIVE_MIMICS_DATA[mimicTab as keyof typeof REACTIVE_MIMICS_DATA], [mimicTab]);
  const currentSoft = useMemo(() => SOFT_TISSUE_ATLAS_DATA[softTab as keyof typeof SOFT_TISSUE_ATLAS_DATA], [softTab]);

  const currentItem = atlasType === 'bone' ? currentMimic : currentSoft;
  const currentSubTab = useMemo(() => {
    if (atlasType === 'bone') return mimicTab;
    if (atlasType === 'soft') return softTab;
    return activeScienceTab;
  }, [atlasType, mimicTab, softTab, activeScienceTab]);

  const setSubTab = (id: string) => {
    if (atlasType === 'bone') setMimicTab(id);
    else if (atlasType === 'soft') setSoftTab(id);
    else setActiveScienceTab(id);
  };
  const subSections = useMemo(() => {
    if (atlasType === 'bone') return MIMIC_SECTIONS;
    if (atlasType === 'soft') return SOFT_TISSUE_SECTIONS;
    return SCIENCE_SECTIONS;
  }, [atlasType]);

  const activePseudoData = useMemo(() => {
    if (pseudoTab === 'pseudotumours') return PSEUDO_LAB_DATA.pseudotumours.find(x => x.id === selectedPseudoId) || PSEUDO_LAB_DATA.pseudotumours[0];
    if (pseudoTab === 'plasma_cell') return PSEUDO_LAB_DATA.plasma_cell[0];
    return null;
  }, [pseudoTab, selectedPseudoId]);

  const myositisPhaseData = useMemo(() => 
    MYOSITIS_EVOLUTION.find(p => p.id === activeMyositisPhase), 
  [activeMyositisPhase]);

  const currentGanglionSite = useMemo(() => 
    GANGLION_DATA.sites.find(s => s.id === activeGanglionSite) || GANGLION_DATA.sites[0], 
  [activeGanglionSite]);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col h-screen sticky top-0">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg">
              <Microscope size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">Onco-Master</span>
          </div>
          <nav className="space-y-2">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === s.id ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                <s.icon size={18} />
                {s.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="px-8 mt-2 space-y-3">
          <button 
            onClick={onSwitchToSynoNeuro}
            className="w-full p-4 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-2xl transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-1.5 bg-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                <Waves size={16} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-300">Advance Lab</span>
            </div>
            <p className="text-[11px] font-bold text-white text-left leading-tight">Syno-Neuro & Rare Sarcomas</p>
          </button>

          <button 
            onClick={onSwitchToMetaLab}
            className="w-full p-4 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-2xl transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-1.5 bg-red-600 rounded-lg group-hover:scale-110 transition-transform">
                <Database size={16} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-red-300">Meta Lab</span>
            </div>
            <p className="text-[11px] font-bold text-white text-left leading-tight">Hematology & Spinal Metastases</p>
          </button>

          <button 
            onClick={onSwitchToSclerotic}
            className="w-full p-4 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 rounded-2xl transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-1.5 bg-emerald-600 rounded-lg group-hover:scale-110 transition-transform">
                <Sparkles size={16} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">Atlas Lab</span>
            </div>
            <p className="text-[11px] font-bold text-white text-left leading-tight">Sclerotic Dysplasias & Mimics</p>
          </button>

          <button 
            onClick={onSwitchToOSCE}
            className="w-full p-4 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 rounded-2xl transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-1.5 bg-rose-600 rounded-lg group-hover:scale-110 transition-transform">
                <Target size={16} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-300">OSCE Master</span>
            </div>
            <p className="text-[11px] font-bold text-white text-left leading-tight">Clinical Exam & Staging</p>
          </button>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800">
          <button 
                onClick={onBack}
                className="mb-4 w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={14} /> Back to Dashboard
          </button>
          <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
            <p className="text-[10px] font-black text-indigo-400 uppercase mb-1 tracking-widest">Apley Ref</p>
            <p className="text-[11px] text-slate-400 leading-tight">Musculoskeletal Oncology Principles</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto no-scrollbar">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
           <div className="flex items-center gap-4">
              <button onClick={onBack} className="lg:hidden text-slate-500"><ArrowLeft size={20} /></button>
              <h1 className="text-sm font-black text-slate-400 uppercase tracking-widest">Apley & Solomon Systemic Review</h1>
           </div>
           <div className="flex gap-2">
              <span className="px-2 py-1 bg-red-100 text-red-700 text-[10px] font-black rounded uppercase">Bone Tumour Protocol</span>
           </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 max-w-6xl">
          
          {/* SECTION: Basics (Epi & Classification) */}
          {activeTab === 'basics' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                   <div className="relative z-10">
                      <h3 className="text-3xl font-black mb-6 tracking-tighter">Epidemiology <span className="text-indigo-400">Rules</span></h3>
                      <div className="space-y-6">
                        <div className="flex gap-4">
                           <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-black text-indigo-400">01</div>
                           <div>
                              <h4 className="font-bold text-lg">The Age Clue</h4>
                              <p className="text-sm text-slate-400">{ONCOLOGY_DATA.epidemiology.rule}</p>
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-black text-indigo-400">02</div>
                           <div>
                              <h4 className="font-bold text-lg">Primary vs Secondary</h4>
                              <p className="text-sm text-slate-400">Secondaries outnumber primaries 100:1 in elderly patients.</p>
                           </div>
                        </div>
                        <div className="p-4 bg-indigo-600 rounded-2xl mt-4">
                           <h5 className="text-[10px] font-black uppercase mb-1">Mnemonic: PB-KTL</h5>
                           <p className="text-xs font-medium">Prostate, Breast, Kidney, Thyroid, Lung</p>
                        </div>
                      </div>
                   </div>
                   <Activity className="absolute bottom-[-50px] right-[-50px] text-white/5" size={300} />
                </div>

                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                   <h3 className="text-xl font-black mb-8 flex items-center gap-2 uppercase tracking-tighter">
                     <Layers className="text-indigo-600" /> WHO Tissue Classification
                   </h3>
                   <div className="space-y-4">
                      {ONCOLOGY_DATA.classification.map((c, i) => (
                        <div key={i} className="grid grid-cols-3 gap-4 border-b border-slate-50 pb-3 items-center">
                           <span className="text-xs font-black text-slate-400 uppercase">{c.tissue}</span>
                           <div className="flex flex-col"><span className="text-[9px] font-bold text-emerald-500 uppercase">Benign</span><span className="text-[11px] font-bold">{c.benign}</span></div>
                           <div className="flex flex-col"><span className="text-[9px] font-bold text-red-500 uppercase">Malignant</span><span className="text-[11px] font-bold">{c.malignant}</span></div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: Clinical Presentation & Mimics */}
          {activeTab === 'presentation' && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
               <div className="grid lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-4 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                     <h3 className="text-xl font-black mb-6 flex items-center gap-2 uppercase tracking-tighter">
                       <TrendingUp className="text-red-500" /> Red Flag Signs
                     </h3>
                     <ul className="space-y-6">
                        <li className="flex gap-4">
                           <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center shrink-0 text-red-600"><AlertCircle size={20}/></div>
                           <div><h5 className="font-bold text-sm">Deep Night Pain</h5><p className="text-[10px] text-slate-500">Persistent pain that disturbs sleep and is not relieved by rest.</p></div>
                        </li>
                        <li className="flex gap-4">
                           <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center shrink-0 text-red-600"><Zap size={20}/></div>
                           <div><h5 className="font-bold text-sm">Pathological Fracture</h5><p className="text-[10px] text-slate-500">Fracture occurring through a weakened bone lesion.</p></div>
                        </li>
                        <li className="flex gap-4">
                           <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center shrink-0 text-red-600"><Activity size={20}/></div>
                           <div><h5 className="font-bold text-sm">Growing Mass</h5><p className="text-[10px] text-slate-500">Firm, immobile swelling fixed to the underlying bone.</p></div>
                        </li>
                     </ul>
                  </div>

                  <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                     <h3 className="text-xl font-black mb-6 uppercase tracking-tighter text-indigo-600">The Bone Tumour Mimics</h3>
                     <p className="text-xs text-slate-500 mb-8 italic">"Not everything that eats bone is a tumour." — Apley</p>
                     <div className="grid md:grid-cols-2 gap-4">
                        {ONCOLOGY_DATA.mimics.map((m, i) => (
                          <div key={i} className="p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:border-indigo-300 transition-colors">
                             <h4 className="font-bold text-slate-800 text-sm mb-1">{m.name}</h4>
                             <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{m.note}</p>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* SECTION: Staging & Biopsy */}
          {activeTab === 'staging' && (
            <div className="space-y-8 animate-in zoom-in-95 duration-500">
               <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-xl">
                     <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                       <Target className="text-indigo-400" /> Enneking Staging
                     </h3>
                     <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                           <span className="text-xs font-black text-indigo-400">Stage I</span>
                           <span className="text-xs font-bold">Low Grade (G1)</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                           <span className="text-xs font-black text-amber-400">Stage II</span>
                           <span className="text-xs font-bold">High Grade (G2)</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                           <span className="text-xs font-black text-red-500">Stage III</span>
                           <span className="text-xs font-bold uppercase tracking-tighter">Metastatic (M1)</span>
                        </div>
                     </div>
                     <div className="p-4 bg-slate-800 rounded-2xl">
                        <p className="text-[11px] leading-relaxed italic text-slate-400">
                          <strong>A:</strong> Intracompartmental (Intra-osseous)<br/>
                          <strong>B:</strong> Extracompartmental (Soft tissue extension)
                        </p>
                     </div>
                  </div>

                  <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                     <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                       <ShieldAlert className="text-red-500" /> Biopsy Mandates
                     </h3>
                     <div className="space-y-4">
                        <div className="flex gap-4 p-4 bg-red-50 rounded-2xl border border-red-100">
                           <div className="font-black text-red-600 text-xl">1</div>
                           <div className="text-[11px] font-bold text-red-900 leading-relaxed">
                             Always perform the biopsy along the planned surgical incision line.
                           </div>
                        </div>
                        <div className="flex gap-4 p-4 bg-red-50 rounded-2xl border border-red-100">
                           <div className="font-black text-red-600 text-xl">2</div>
                           <div className="text-[11px] font-bold text-red-900 leading-relaxed">
                             Excision of the biopsy tract is mandatory during final resection to prevent recurrence.
                           </div>
                        </div>
                        <div className="flex gap-4 p-4 bg-red-50 rounded-2xl border border-red-100">
                           <div className="font-black text-red-600 text-xl">3</div>
                           <div className="text-[11px] font-bold text-red-900 leading-relaxed">
                             Never traverse healthy tissue compartments (e.g. going through the knee joint to biopsy a femur).
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* SECTION: Pseudo-Lab */}
          {activeTab === 'pseudo' && (
            <div className="space-y-8 animate-in fade-in duration-500 pb-10">
              <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
                {[
                  { id: 'pseudotumours', label: 'Pseudotumours', icon: ShieldAlert },
                  { id: 'epiphyseal', label: 'Epiphyseal Malig.', icon: Target },
                  { id: 'plasma_cell', label: 'Plasma Cell Niche', icon: Activity },
                  { id: 'soft_tissue', label: 'Special Soft Tissue', icon: Layers }
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => { setPseudoTab(section.id); if(section.id === 'pseudotumours') setSelectedPseudoId('myositis'); }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${pseudoTab === section.id ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-500 hover:text-amber-600'}`}
                  >
                    <section.icon size={14} />
                    {section.label}
                  </button>
                ))}
              </div>

              {/* Pseudo-Lab Content */}
              {pseudoTab === 'pseudotumours' && (
                <div className="grid lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
                  <div className="lg:col-span-4 space-y-3">
                    {PSEUDO_LAB_DATA.pseudotumours.map(item => (
                      <button 
                        key={item.id}
                        onClick={() => setSelectedPseudoId(item.id)}
                        className={`w-full p-6 rounded-3xl border-2 text-left transition-all ${selectedPseudoId === item.id ? 'bg-amber-500 border-amber-500 text-white shadow-xl translate-x-2' : 'bg-white border-slate-100 hover:border-amber-200'}`}
                      >
                        <h4 className="font-black text-sm">{item.name}</h4>
                        <p className={`text-[10px] font-bold uppercase ${selectedPseudoId === item.id ? 'text-amber-100' : 'text-amber-600'}`}>{item.type}</p>
                      </button>
                    ))}
                  </div>

                  <div className="lg:col-span-8 space-y-8">
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                        <div className="flex items-center gap-5 mb-8 relative z-10">
                          <div className="p-4 bg-amber-50 text-amber-600 rounded-3xl shadow-inner"><FileSearch size={32} /></div>
                          <div>
                            <h3 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">{activePseudoData?.name}</h3>
                            <p className="text-amber-600 font-bold uppercase text-[10px] tracking-[0.2em] italic">"{activePseudoData?.aka}"</p>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-8 relative z-10">
                          <div className="space-y-4">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Imaging Key</h5>
                            <p className="text-sm font-bold text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100 italic">
                              "{activePseudoData?.imaging}"
                            </p>
                          </div>
                          <div className="p-6 bg-slate-900 text-white rounded-3xl flex flex-col justify-center shadow-lg">
                            <h5 className="text-[10px] font-black text-amber-400 uppercase mb-2 tracking-widest flex items-center gap-2">
                              <Zap size={14} /> Diagnostic Pearl
                            </h5>
                            <p className="text-xs text-slate-300 leading-relaxed italic font-medium">"{activePseudoData?.pearl}"</p>
                          </div>
                        </div>
                        <AlertTriangle className="absolute bottom-[-30px] right-[-30px] text-slate-50 opacity-20" size={240} />
                    </div>

                    {selectedPseudoId === 'myositis' && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
                        {/* Evolutionary Timeline Tabs */}
                        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
                          {MYOSITIS_EVOLUTION.map((phase) => (
                            <button
                              key={phase.id}
                              onClick={() => setActiveMyositisPhase(phase.id)}
                              className={`flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeMyositisPhase === phase.id ? 'bg-amber-500 text-white shadow-lg' : 'text-slate-500 hover:text-amber-600'}`}
                            >
                              <Clock size={14} />
                              {phase.title.split(':')[0]}
                            </button>
                          ))}
                        </div>

                        {/* Phase Detail Card */}
                        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                           <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                              <div className="p-8 bg-amber-50 text-amber-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:rotate-6">
                                 {activeMyositisPhase === 'early' ? <Flame size={48} /> : activeMyositisPhase === 'intermediate' ? <Layers size={48} /> : <Zap size={48} />}
                              </div>
                              <div className="text-center md:text-left flex-1">
                                 <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                   <span className="text-amber-600 font-black text-xs uppercase tracking-widest">{myositisPhaseData?.timing}</span>
                                   <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                   <span className="text-slate-400 font-black text-xs uppercase tracking-widest italic">Phase Model</span>
                                 </div>
                                 <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 uppercase">{myositisPhaseData?.title}</h3>
                                 <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{myositisPhaseData?.features}"</p>
                              </div>
                           </div>
                           <History className="absolute bottom-[-50px] right-[-50px] text-slate-50 opacity-20" size={350} />
                        </div>

                        {/* Imaging & Path Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                           <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                              <h4 className="text-lg font-black mb-6 flex items-center gap-3 text-amber-400 uppercase tracking-tighter">
                                 <Eye size={22} /> Imaging Hallmarks
                              </h4>
                              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm mb-6">
                                 <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
                                    {myositisPhaseData?.imaging}
                                 </p>
                              </div>
                              {activeMyositisPhase === 'intermediate' && (
                                <div className="p-4 bg-amber-500 text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest text-center shadow-lg">
                                   "The String Sign" — Diagnostic Gold
                                </div>
                              )}
                              <Search className="absolute -bottom-10 -right-10 text-white/5 opacity-10" size={240} />
                           </div>

                           <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col justify-center shadow-sm relative overflow-hidden">
                              <h4 className="text-lg font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter">
                                 <FlaskConical size={22} className="text-amber-600" /> Histopathology Trap
                              </h4>
                              <p className="text-sm text-slate-600 leading-relaxed font-medium mb-10 italic">
                                 {myositisPhaseData?.pathology}
                              </p>
                              <div className="bg-red-900 text-white p-6 rounded-3xl shadow-xl border border-white/10">
                                 <h5 className="text-[10px] font-black text-red-100 uppercase mb-2 flex items-center gap-2 tracking-widest">
                                   <AlertTriangle size={14} className="text-red-400" /> Immediate Surgical Action
                                 </h5>
                                 <p className="text-[11px] font-bold italic opacity-90">
                                   "{myositisPhaseData?.action}"
                                 </p>
                              </div>
                           </div>
                        </div>

                        {/* Comparative Matrix */}
                        <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm overflow-hidden relative">
                           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 relative z-10">
                              <div>
                                <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3 italic uppercase tracking-tighter">
                                  <Crosshair className="text-amber-500" /> Myositis vs. Osteosarcoma
                                </h3>
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">The Differentiator Matrix</p>
                              </div>
                              <div className="p-4 bg-amber-50 text-amber-800 rounded-2xl border border-amber-100 flex gap-4 items-center">
                                 <Info size={20} className="shrink-0" />
                                 <p className="text-[10px] font-black leading-tight uppercase">The Zonal Phenomenon<br/>(Outside-In vs Inside-Out)</p>
                              </div>
                           </div>

                           <div className="overflow-x-auto rounded-3xl border border-slate-100 relative z-10">
                              <table className="w-full text-left">
                                 <thead className="bg-slate-900 text-white">
                                    <tr>
                                       <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest">Diagnostic Feature</th>
                                       <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-amber-400">Myositis Ossificans</th>
                                       <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-red-500">Parosteal Osteosarcoma</th>
                                    </tr>
                                 </thead>
                                 <tbody className="divide-y divide-slate-100">
                                    {MYOSITIS_VS_SARCOMA.map((row, i) => (
                                      <tr key={i} className="hover:bg-amber-50/50 transition-colors">
                                         <td className="py-5 px-6 text-[10px] font-black text-slate-500 uppercase">{row.feature}</td>
                                         <td className="py-5 px-6 text-xs font-bold text-amber-800 italic">{row.myositis}</td>
                                         <td className="py-5 px-6 text-xs font-bold text-red-800 italic">{row.sarcoma}</td>
                                      </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                           <ShieldAlert className="absolute bottom-[-30px] left-[-30px] text-slate-50 opacity-20" size={240} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {pseudoTab === 'epiphyseal' && (
                <div className="animate-in slide-in-from-right duration-500">
                  <div className="bg-slate-900 text-white p-12 rounded-[3.5rem] relative overflow-hidden flex flex-col md:flex-row gap-10 items-center">
                      <div className="md:w-1/2 relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-amber-500 rounded-2xl shadow-lg"><Target size={32}/></div>
                            <h3 className="text-3xl font-black tracking-tighter italic uppercase">{PSEUDO_LAB_DATA.epiphyseal_malignancy.title}</h3>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8">
                            "This is the rare malignancy of the epiphysis. It must be differentiated from GCT (Giant Cell Tumor) and Chondroblastoma."
                        </p>
                        <div className="space-y-4">
                            <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                              <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center font-black text-amber-400 shrink-0">!!</div>
                              <div>
                                  <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Critical Differentiator</p>
                                  <p className="text-xs font-bold text-slate-300">{PSEUDO_LAB_DATA.epiphyseal_malignancy.differentiation}</p>
                              </div>
                            </div>
                        </div>
                      </div>
                      <div className="md:w-1/2 p-10 bg-white rounded-[2.5rem] text-slate-800 shadow-2xl relative z-10 border border-slate-100">
                        <h4 className="font-black text-[10px] text-slate-400 uppercase mb-4 tracking-widest text-center">Diagnostic Profile</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs pb-2 border-b">
                              <span className="font-bold">Typical Age Range</span>
                              <span className="text-amber-600 font-black">{PSEUDO_LAB_DATA.epiphyseal_malignancy.age}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs pb-2 border-b">
                              <span className="font-bold">Biological Behavior</span>
                              <span className="text-amber-600 font-black">Low-Grade Malignant</span>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl italic text-xs leading-relaxed border border-slate-100">
                           <p className="font-bold mb-1 uppercase text-[9px] text-slate-400">Imaging Features</p>
                           "{PSEUDO_LAB_DATA.epiphyseal_malignancy.imaging}"
                        </div>
                        <div className="p-4 bg-slate-900 text-white rounded-xl text-xs flex items-center gap-3">
                           <Activity size={16} className="text-amber-400" />
                           <p className="italic">{PSEUDO_LAB_DATA.epiphyseal_malignancy.behavior}</p>
                        </div>
                     </div>
                  </div>
                  <Layers className="absolute top-[-50px] right-[-50px] text-white/5" size={400} />
               </div>
            </div>
          )}

          {pseudoTab === 'plasma_cell' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="p-3 bg-red-50 text-red-600 rounded-2xl shadow-inner"><Activity size={24}/></div>
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase">The Hematological Niche</h3>
                  </div>
                  <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative z-10">
                     <div className="flex justify-between items-center mb-6">
                        <h4 className="text-xl font-black text-slate-800">{PSEUDO_LAB_DATA.plasma_cell[0].name}</h4>
                        <span className="text-[10px] font-black bg-red-100 text-red-700 px-3 py-1 rounded-full uppercase tracking-widest">Pre-Myeloma Niche</span>
                     </div>
                     <p className="text-sm text-slate-600 leading-relaxed mb-8 font-medium italic bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                       "{PSEUDO_LAB_DATA.plasma_cell[0].pathology}"
                     </p>
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-5 bg-white rounded-3xl shadow-sm border border-slate-100 flex gap-4 items-center">
                           <div className="p-2 bg-red-50 text-red-500 rounded-lg"><TrendingUp size={24} /></div>
                           <div>
                              <h5 className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Risk of Progression</h5>
                              <p className="text-xs font-bold text-slate-700">{PSEUDO_LAB_DATA.plasma_cell[0].progression}</p>
                           </div>
                        </div>
                        <div className="p-5 bg-white rounded-3xl shadow-sm border border-slate-100 flex gap-4 items-center">
                           <div className="p-2 bg-indigo-50 text-indigo-500 rounded-lg"><Microscope size={24} /></div>
                           <div>
                              <h5 className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Imaging Clue</h5>
                              <p className="text-xs font-bold text-slate-700">{PSEUDO_LAB_DATA.plasma_cell[0].imaging}</p>
                           </div>
                        </div>
                     </div>
                     <div className="mt-8 p-4 bg-slate-900 text-white rounded-2xl flex items-center gap-4">
                        <ShieldAlert className="text-amber-400 shrink-0" />
                        <p className="text-xs font-medium italic">"{PSEUDO_LAB_DATA.plasma_cell[0].pearl}"</p>
                     </div>
                  </div>
                  <Dna className="absolute bottom-[-50px] right-[-50px] text-slate-50 opacity-40 shrink-0" size={300} />
               </div>
            </div>
          )}

          {pseudoTab === 'soft_tissue' && (
            <div className="space-y-8 animate-in slide-in-from-bottom duration-500 pb-10">
               <div className="bg-slate-900 text-white p-12 rounded-[3.5rem] relative overflow-hidden flex flex-col md:flex-row gap-10 items-center border border-slate-800">
                  <div className="md:w-2/3 relative z-10">
                     <h3 className="text-4xl font-black mb-2 text-amber-500 tracking-tighter uppercase italic">{PSEUDO_LAB_DATA.soft_tissue_special[0].name}</h3>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-10 italic">"{PSEUDO_LAB_DATA.soft_tissue_special[0].aka}"</p>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                           <h5 className="text-[10px] font-black text-amber-400 uppercase mb-3 tracking-widest flex items-center gap-2">
                             <User size={14} /> Clinical Scenario
                           </h5>
                           <p className="text-xs text-slate-300 leading-relaxed font-medium">
                             {PSEUDO_LAB_DATA.soft_tissue_special[0].patient}<br/>
                             <span className="text-amber-200/60">{PSEUDO_LAB_DATA.soft_tissue_special[0].site}</span>
                           </p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                           <h5 className="text-[10px] font-black text-amber-400 uppercase mb-3 tracking-widest flex items-center gap-2">
                             <Search size={14} /> Diagnostic MRI
                           </h5>
                           <p className="text-xs text-slate-100 leading-relaxed font-black">{PSEUDO_LAB_DATA.soft_tissue_special[0].imaging}</p>
                        </div>
                     </div>
                  </div>
                  <div className="md:w-1/3 p-8 bg-amber-500 rounded-[2rem] text-slate-900 text-center relative z-10 shadow-2xl border-4 border-amber-400">
                     <div className="flex justify-center mb-4"><History size={32} /></div>
                     <h4 className="font-black text-[11px] uppercase mb-2 tracking-widest">Apley Clinical Decision</h4>
                     <p className="text-[11px] font-black leading-relaxed italic">
                       "{PSEUDO_LAB_DATA.soft_tissue_special[0].note}"
                     </p>
                  </div>
                  <Maximize2 className="absolute top-[-40px] right-[-40px] text-white/5" size={400} />
               </div>
            </div>
          )}
        </div>
      )}

          {/* SECTION: Pathology Mimics */}
          {activeTab === 'pathology' && (
            <div className="space-y-8 animate-in fade-in duration-500 pb-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex gap-2 p-1 bg-slate-200 rounded-xl w-fit">
                   <button 
                     onClick={() => setAtlasType('bone')}
                     className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${atlasType === 'bone' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                   >
                     Bone Mimics
                   </button>
                   <button 
                     onClick={() => setAtlasType('soft')}
                     className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${atlasType === 'soft' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                   >
                     Soft Tissue Atlas
                   </button>
                   <button 
                     onClick={() => setAtlasType('science')}
                     className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${atlasType === 'science' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                   >
                     Diagnostic Science
                   </button>
                </div>

                <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
                  {subSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setSubTab(section.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${currentSubTab === section.id ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-indigo-600'}`}
                      >
                        <Icon size={14} />
                        {section.label.split('(')[0]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Summary Card / Special Content */}
              {atlasType === 'science' ? (
                <div className="space-y-8 animate-in fade-in duration-700">
                  {/* SECTION: Serology */}
                  {activeScienceTab === 'serology' && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                       <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm">
                          <h3 className="text-2xl font-black mb-8 flex items-center gap-4 uppercase tracking-tighter italic">
                            <Microscope className="text-emerald-600" /> Serological Tumor Profiling
                          </h3>
                          <div className="space-y-3">
                             {SEROLOGY_DATA.map((item, i) => (
                               <div key={i} className="flex flex-col md:flex-row gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-md transition-all">
                                  <div className="md:w-1/3 flex flex-col justify-center">
                                     <h4 className="font-black text-emerald-600 text-sm uppercase">{item.marker}</h4>
                                  </div>
                                  <div className="md:w-1/3">
                                     <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Primary Link</span>
                                     <p className="text-xs font-bold text-slate-700">{item.link}</p>
                                  </div>
                                  <div className="md:w-1/3">
                                     <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Apley Significance</span>
                                     <p className="text-[11px] text-slate-500 italic">{item.note}</p>
                                  </div>
                               </div>
                             ))}
                          </div>
                       </div>
                       <div className="bg-emerald-900 text-white p-6 rounded-3xl flex items-center gap-6">
                          <div className="p-3 bg-emerald-600 rounded-xl shadow-lg"><Info size={24}/></div>
                          <p className="text-xs text-slate-300 font-medium leading-relaxed italic">
                            <strong>Laboratory Mandate:</strong> Biochemical markers are never diagnostic in isolation but are vital for monitoring response to therapy and predicting post-operative survival.
                          </p>
                       </div>
                    </div>
                  )}

                  {/* SECTION: Radiation Biology */}
                  {activeScienceTab === 'radiation' && (
                    <div className="space-y-8 animate-in slide-in-from-right duration-500">
                       <div className="grid md:grid-cols-2 gap-8">
                          <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col">
                             <h4 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3 uppercase tracking-tighter italic">
                               <Zap className="text-emerald-500" /> Radiosensitive
                             </h4>
                             <div className="space-y-4 flex-grow">
                                {RADIATION_MAP.sensitive.map((item, i) => (
                                  <div key={i} className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                     <div className="flex justify-between items-center mb-1">
                                        <h5 className="font-bold text-sm text-emerald-900 uppercase">{item.name}</h5>
                                        <span className="text-[10px] font-black text-emerald-600">{item.dose}</span>
                                     </div>
                                     <p className="text-[11px] text-emerald-700 font-medium italic">{item.effect}</p>
                                  </div>
                                ))}
                             </div>
                          </div>
                          <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-xl flex flex-col">
                             <h4 className="text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-tighter italic">
                               <Flame className="text-red-500" /> Radioresistant
                             </h4>
                             <div className="space-y-4 flex-grow">
                                {RADIATION_MAP.resistant.map((item, i) => (
                                  <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                     <h5 className="font-bold text-sm text-white mb-1 uppercase">{item.name}</h5>
                                     <p className="text-[11px] text-slate-400 italic">"{item.note}"</p>
                                  </div>
                                ))}
                             </div>
                          </div>
                       </div>
                    </div>
                  )}

                  {/* SECTION: Palliative Care */}
                  {activeScienceTab === 'palliation' && (
                    <div className="space-y-8 animate-in zoom-in-95 duration-500">
                       <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                          <h3 className="text-2xl font-black mb-10 text-slate-800 flex items-center gap-3 uppercase tracking-tighter italic">
                            <HeartPulse className="text-red-500" /> Palliative Orthopaedics
                          </h3>
                          <div className="grid md:grid-cols-2 gap-6">
                            {PALLIATION_GOALS.map((item, i) => (
                              <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex gap-5 items-center">
                                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-emerald-600 shrink-0"><ShieldCheck size={24}/></div>
                                 <div className="flex-1">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.goal}</h4>
                                    <p className="text-sm font-bold text-slate-800">{item.method}</p>
                                 </div>
                              </div>
                            ))}
                          </div>
                       </div>
                       <div className="bg-amber-50 border border-amber-200 p-8 rounded-[2.5rem] flex items-center gap-6">
                          <AlertTriangle className="text-amber-600 shrink-0" size={32} />
                          <p className="text-sm text-amber-900 leading-relaxed font-medium italic">
                            <strong>Terminal Care Principles:</strong> Surgery in a palliative setting should only be undertaken if the patient's predicted survival is longer than the recovery period from the operation. The goal is "One operation for the life of the patient."
                          </p>
                       </div>
                    </div>
                  )}

                  {/* SECTION: Harrington Pelvis */}
                  {activeScienceTab === 'harrington' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                       <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                          <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                            <MoveVertical className="text-blue-600" /> Harrington's Pelvic Classification
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
                            {HARRINGTON_PELVIS.map((h) => (
                              <button
                                key={h.id}
                                onClick={() => setSelectedHarringtonId(h.id)}
                                className={`p-4 rounded-2xl border-2 transition-all font-black text-xs uppercase tracking-widest ${selectedHarringtonId === h.id ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-slate-50 border-transparent text-slate-400'}`}
                              >
                                {h.class}
                              </button>
                            ))}
                          </div>

                          <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-6">
                               <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                  <h5 className="text-[10px] font-black text-slate-400 uppercase mb-2">Acetabular Deficiency</h5>
                                  <p className="text-sm font-bold text-slate-800 leading-relaxed italic">"{harringtonDetail.desc}"</p>
                               </div>
                               <div className="p-6 bg-blue-50 text-blue-900 rounded-3xl border border-blue-100">
                                  <h5 className="text-[10px] font-black text-blue-600 uppercase mb-2">Surgical Solution</h5>
                                  <p className="text-sm font-black">{harringtonDetail.management}</p>
                               </div>
                            </div>
                            <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] flex flex-col justify-center text-center relative overflow-hidden">
                               <div className="relative z-10">
                                  <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">Fixation Goal</h4>
                                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                    "The primary aim is to restore the integrity of the pelvic ring to allow immediate weight-bearing in patients with limited life expectancy."
                                  </p>
                               </div>
                               <Target className="absolute top-[-40px] right-[-40px] text-white/5" size={240} />
                            </div>
                          </div>
                       </div>
                    </div>
                  )}

                  {/* SECTION: MSTS Outcome */}
                  {activeScienceTab === 'msts' && (
                    <div className="space-y-8 animate-in slide-in-from-right duration-500">
                       <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                          <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                            <ClipboardCheck className="text-emerald-600" /> MSTS Functional Score
                          </h3>
                          <p className="text-sm text-slate-500 mb-8 italic">"The Musculoskeletal Tumor Society score is the gold standard for assessing quality of life after limb salvage surgery."</p>
                          
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {MSTS_SCORE.map((item, i) => (
                              <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all group">
                                 <h5 className="text-[10px] font-black text-emerald-600 uppercase mb-1">{item.param}</h5>
                                 <p className="text-sm font-black text-slate-800 mb-2">{item.range}</p>
                                 <p className="text-xs text-slate-400 font-medium italic">{item.desc}</p>
                              </div>
                            ))}
                          </div>
                       </div>
                    </div>
                  )}

                  {/* SECTION: Skip Lesions */}
                  {activeScienceTab === 'skip' && (
                    <div className="lg:col-span-12 animate-in zoom-in-95 duration-500">
                       <div className="bg-slate-900 text-white p-10 rounded-[3.5rem] relative overflow-hidden flex flex-col md:flex-row gap-10 items-center">
                          <div className="md:w-1/2 relative z-10">
                             <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-blue-600 rounded-2xl"><Layers size={32}/></div>
                                <h3 className="text-3xl font-black tracking-tighter">The "Skip" Lesion</h3>
                             </div>
                             <p className="text-slate-400 text-sm leading-relaxed mb-8">
                                "A skip lesion is a synchronous focus of tumor within the same bone, separated from the primary tumor by a normal marrow gap."
                             </p>
                             <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex gap-3 items-center">
                                <AlertCircle className="text-red-500" size={20} />
                                <p className="text-[11px] font-bold text-red-400">If missed, a 'Wide' resection will be intralesional, leading to recurrence.</p>
                             </div>
                          </div>
                          <div className="md:w-1/2 p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col justify-center">
                             <h4 className="font-black text-[10px] text-blue-400 uppercase mb-4 tracking-widest">Oncology Mandate</h4>
                             <p className="text-xs text-slate-400 leading-relaxed italic mb-6 font-medium">
                               "All high-grade sarcomas require staging of the entire bone (MRI of the whole segment) to identify skips before resection planning."
                             </p>
                             <div className="text-[9px] font-black text-slate-500 uppercase flex justify-between">
                               <span>Primary Tumor</span>
                               <span className="text-blue-500">Normal Gap</span>
                               <span className="text-red-500 italic">Skip focus</span>
                             </div>
                          </div>
                          <Layers className="absolute bottom-[-50px] right-[-50px] text-white/5" size={400} />
                       </div>
                    </div>
                  )}

                  {/* SECTION: Fixation Principles */}
                  {activeScienceTab === 'fixation' && (
                    <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
                       <div className="grid md:grid-cols-2 gap-8">
                          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                             <h4 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                               <ShieldCheck className="text-blue-600" /> Cement-Augmented Fixation
                             </h4>
                             <p className="text-sm text-slate-500 leading-relaxed mb-6 italic">
                               "In metastatic bone disease, the bone lacks normal healing potential (often due to radiotherapy or the disease itself). Biological fixation (bone ingrowth) cannot be relied upon."
                             </p>
                             <div className="p-5 bg-blue-50 border border-blue-100 rounded-3xl">
                                <h5 className="text-[10px] font-black text-blue-600 uppercase mb-2 tracking-widest">The Rule</h5>
                                <p className="text-xs font-bold text-blue-900 leading-relaxed">
                                  Always use bone cement (PMMA) to augment internal fixation. This provides immediate mechanical stability and fills the osteolytic void.
                                </p>
                             </div>
                          </div>

                          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 text-center">Pathological Fracture Goals</h4>
                             <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                                   <Zap size={18} className="text-amber-500" />
                                   <p className="text-xs font-bold text-slate-700">Immediate weight-bearing capability.</p>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                                   <Zap size={18} className="text-amber-500" />
                                   <p className="text-xs font-bold text-slate-700">Fix the entire length of the bone (to prevent further fractures).</p>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                                   <Zap size={18} className="text-amber-500" />
                                   <p className="text-xs font-bold text-slate-700">Life-expectancy vs Surgical morbidity balance.</p>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                  )}

                  {/* SECTION: Imaging Pitfalls */}
                  {activeScienceTab === 'pitfalls' && (
                    <div className="space-y-6 animate-in slide-in-from-bottom duration-500 pb-10">
                       <div className="grid lg:grid-cols-3 gap-6">
                          {PITFALLS_DATA.map((item, i) => (
                            <button 
                              key={i}
                              onClick={() => setSelectedPitfall(i)}
                              className={`p-8 rounded-[2.5rem] border-2 text-left transition-all ${selectedPitfall === i ? 'bg-white border-emerald-600 shadow-xl' : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'}`}
                            >
                               <h4 className="font-black text-lg mb-4 text-slate-800 uppercase tracking-tighter underline-offset-4">{item.title}</h4>
                               <p className="text-xs text-slate-500 leading-relaxed font-medium mb-4 italic">"{item.desc}"</p>
                               <div className="p-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest text-center">
                                 Rule: {item.key}
                               </div>
                            </button>
                          ))}
                       </div>
                       
                       <div className="bg-slate-900 text-white p-10 rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row gap-10 items-center shadow-2xl">
                          <div className="md:w-1/2 relative z-10">
                             <div className="p-4 bg-emerald-600 rounded-3xl w-fit mb-6 shadow-lg"><FileSearch size={32} /></div>
                             <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase italic">Diagnostic Mastery</h3>
                             <p className="text-slate-400 text-sm leading-relaxed mb-8 italic">
                               "A negative imaging report is only as good as the clinician's understanding of the modality's limitations. In orthopaedic oncology, clinical suspicion always trumps a report."
                             </p>
                          </div>
                          <div className="md:w-1/2 bg-white/5 border border-white/10 p-8 rounded-3xl relative z-10">
                             <h4 className="text-xs font-black text-emerald-400 uppercase mb-4 tracking-widest text-center">Summary Challenge</h4>
                             <div className="space-y-4">
                                <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                                   <span className="text-slate-400 uppercase font-bold">Myeloma Isotope?</span>
                                   <span className="font-black text-red-500 uppercase">Often Cold</span>
                                </div>
                                <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                                   <span className="text-slate-400 uppercase font-bold">Osteosarcoma ALP?</span>
                                   <span className="font-black text-emerald-400 uppercase">High = Active</span>
                                </div>
                                <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                                   <span className="text-slate-400 uppercase font-bold">Healing Isotope?</span>
                                   <span className="font-black text-amber-500 uppercase">Possible Flare</span>
                                </div>
                             </div>
                          </div>
                          <Search className="absolute bottom-[-60px] right-[-60px] text-white/5" size={400} />
                       </div>
                    </div>
                  )}
                </div>
              ) : atlasType === 'soft' && softTab === 'ganglion' ? (
                <div className="space-y-8 animate-in fade-in duration-700">
                  {/* Anatomical Site Tabs */}
                  <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
                    {GANGLION_DATA.sites.map((site) => (
                      <button
                        key={site.id}
                        onClick={() => setActiveGanglionSite(site.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeGanglionSite === site.id ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-500 hover:text-teal-600'}`}
                      >
                        <Hand size={14} />
                        {site.label}
                      </button>
                    ))}
                  </div>

                  {/* Diagnostic Header Card */}
                  <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                     <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                        <div className="p-8 bg-teal-50 text-teal-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105">
                           <Droplets size={48} />
                        </div>
                        <div className="text-center md:text-left flex-1">
                           <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                             <span className="text-teal-600 font-black text-xs uppercase tracking-widest">{currentGanglionSite.percent} Frequency</span>
                             <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                             <span className="text-slate-400 font-black text-xs uppercase tracking-widest italic">Origin: {currentGanglionSite.origin}</span>
                           </div>
                           <h3 className="text-4xl font-black text-slate-800 tracking-tighter mb-4 uppercase italic">{currentGanglionSite.label} Ganglion</h3>
                           <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{currentGanglionSite.pearl}"</p>
                        </div>
                     </div>
                     <Hand className="absolute bottom-[-50px] right-[-50px] text-slate-50 opacity-50" size={350} />
                  </div>

                  {/* Pathology & Exam Grid */}
                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                        <h4 className="text-lg font-black mb-6 flex items-center gap-3 text-teal-400 uppercase tracking-tighter">
                           <Zap size={22} /> The Pathological "Valve"
                        </h4>
                        <div className="space-y-6 relative z-10">
                           <p className="text-sm text-slate-400 leading-relaxed font-medium italic">
                              Ganglions are not true tumours; they are <span className="text-white font-bold">mucinous degeneration</span> of the joint capsule. They communicate via a <span className="text-teal-400 font-bold">pedicle (stalk)</span> which acts as a one-way valve.
                           </p>
                           <div className="flex flex-col gap-3">
                              {[
                                { step: 1, text: "Joint fluid enters the stalk under pressure." },
                                { step: 2, text: "Fluid thickens into a jelly-like mucin." },
                                { step: 3, text: "Valve prevents fluid from returning to the joint." }
                              ].map((item) => (
                                <div key={item.step} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                                   <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-black text-xs shrink-0">{item.step}</div>
                                   <p className="text-[11px] font-bold text-slate-300">{item.text}</p>
                                </div>
                              ))}
                           </div>
                        </div>
                        <Maximize2 className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                     </div>

                     <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                        <h4 className="text-lg font-black mb-8 flex items-center gap-3 text-slate-400 uppercase tracking-tighter">
                           <Stethoscope size={22} className="text-teal-600" /> Exam Checklist
                        </h4>
                        <div className="space-y-4">
                           {[
                             { label: "Look", desc: "Smooth, rounded swelling; no skin changes.", icon: Eye },
                             { label: "Feel", desc: "Firm, tense, may be tender; fluctuant.", icon: Hand },
                             { label: "Transilluminate", desc: "A 'Gold Medal' step. It shines brightly.", icon: Zap, gold: true },
                             { label: "Allen's Test", desc: "Mandatory for Volar wrist sites.", icon: Activity, gold: true }
                           ].map((step, i) => (
                             <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className={`p-2 rounded-xl flex-shrink-0 ${step.gold ? 'bg-amber-100 text-amber-600' : 'bg-teal-100 text-teal-600'}`}>
                                   <step.icon size={16} />
                                </div>
                                <div>
                                   <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{step.label}</h5>
                                   <p className="text-xs font-bold text-slate-800">{step.desc}</p>
                                </div>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Differential & Management */}
                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                        <h4 className="text-lg font-black mb-6 flex items-center gap-3 italic uppercase tracking-tighter">
                           <Search className="text-teal-500" /> Key Differentials
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                           {GANGLION_DATA.differentials.map((diff, i) => (
                             <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <span className="font-black text-xs text-slate-800">{diff.name}</span>
                                <span className="text-[10px] font-medium text-slate-400 italic text-right max-w-[200px]">{diff.key}</span>
                             </div>
                           ))}
                        </div>
                     </div>

                     <div className="bg-teal-600 text-white p-10 rounded-[3rem] shadow-xl flex flex-col justify-center text-center relative overflow-hidden">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-80">Management Logic</h4>
                        <p className="text-2xl font-black leading-tight mb-8 italic">
                           "If it's painless, leave it alone. If it's painful, excise the stalk."
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 relative z-10">
                           <div className="px-6 py-3 bg-white text-teal-700 rounded-full font-black text-[10px] uppercase shadow-lg">Aspiration (50% Recurr.)</div>
                           <div className="px-6 py-3 bg-teal-900 text-white rounded-full font-black text-[10px] uppercase shadow-lg">Excision (5% Recurr.)</div>
                        </div>
                        <AlertCircle className="absolute top-[-20px] right-[-20px] text-white/10" size={200} />
                     </div>
                  </div>

                  {/* Apley Surgical Pearl Footer */}
                  <div className="bg-amber-50 border-2 border-amber-200 p-8 rounded-[3rem] flex flex-col md:flex-row items-center gap-8 shadow-sm relative overflow-hidden">
                     <div className="p-4 bg-amber-100 text-amber-600 rounded-3xl shadow-inner relative z-10"><Scissors size={32} /></div>
                     <div className="relative z-10">
                        <h5 className="text-xs font-black text-amber-800 uppercase mb-2 tracking-widest flex items-center gap-2">
                           <ShieldCheck size={16} /> Apley Surgical Pearl: The Stalk
                        </h5>
                        <p className="text-sm text-amber-900 font-medium leading-relaxed italic">
                           "The secret to a successful ganglion excision is not the removal of the cyst itself, but the thorough excision of its base (the 'stalk') and a small portion of the parent joint capsule. Failure to do so leads to the infamous 'reappearance' of the lump."
                        </p>
                     </div>
                     <Droplets className="absolute top-[-20px] left-[-20px] text-amber-100/50" size={150} />
                  </div>
                </div>
              ) : atlasType === 'soft' && softTab === 'cysts' ? (
                <div className="space-y-8 animate-in fade-in duration-700">
                  {/* Sidebar-style Nav for Baker's */}
                  <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
                    {[
                      { id: 'anatomy', label: 'Anatomy & Valve', icon: Crosshair },
                      { id: 'causes', label: 'Underlying Causes', icon: Activity },
                      { id: 'foucher', label: "Foucher's Sign", icon: Search },
                      { id: 'rupture', label: 'The DVT Mimic', icon: ShieldAlert }
                    ].map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveBakerTab(section.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeBakerTab === section.id ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-emerald-600'}`}
                      >
                        <section.icon size={14} />
                        {section.label}
                      </button>
                    ))}
                  </div>

                  {/* ANATOMY VIEW */}
                  {activeBakerTab === 'anatomy' && (
                    <div className="animate-in fade-in zoom-in-95 duration-500 space-y-8">
                       <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden flex flex-col md:flex-row gap-10 items-center">
                          <div className="md:w-1/2 relative z-10">
                             <div className="p-5 bg-emerald-50 text-emerald-600 rounded-3xl w-fit mb-8"><Crosshair size={32} /></div>
                             <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 uppercase">Anatomical Interval</h3>
                             <p className="text-lg text-slate-500 font-medium leading-relaxed italic mb-8">
                               "Fluid escapes the knee joint through a weak point in the posterior capsule, locating between the <strong>Medial Head of Gastrocnemius</strong> and the <strong>Semimembranosus</strong>."
                             </p>
                             <div className="bg-slate-900 text-white p-6 rounded-3xl flex items-center gap-4 shadow-xl">
                                <Zap size={24} className="text-emerald-400 shrink-0" />
                                <p className="text-xs font-bold leading-relaxed italic">
                                  {BAKER_CYST_DATA.anatomy.mechanism}
                                </p>
                             </div>
                          </div>
                          <div className="md:w-1/2 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative z-10">
                             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Space Visualization</h4>
                             <div className="space-y-3">
                                <div className="p-4 bg-white rounded-2xl border border-slate-100">
                                   <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Boundaries</p>
                                   <p className="text-xs font-bold text-slate-700">{BAKER_CYST_DATA.anatomy.interval}</p>
                                </div>
                                <div className="p-4 bg-white rounded-2xl border border-slate-100">
                                   <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Pathology</p>
                                   <p className="text-xs font-bold text-slate-700">{BAKER_CYST_DATA.anatomy.description}</p>
                                </div>
                             </div>
                          </div>
                          <Waves className="absolute bottom-[-50px] right-[-50px] text-slate-50 opacity-20" size={400} />
                       </div>
                    </div>
                  )}

                  {/* CAUSES VIEW */}
                  {activeBakerTab === 'causes' && (
                    <div className="animate-in slide-in-from-right-4 duration-500 space-y-6">
                       <div className="grid md:grid-cols-2 gap-6">
                          {BAKER_CYST_DATA.causes.map((cause, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col hover:shadow-lg transition-all underline-offset-4">
                               <div className="flex justify-between items-center mb-6">
                                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Activity size={24} /></div>
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cause.type}</span>
                               </div>
                               <h4 className="text-2xl font-black text-slate-800 mb-2 uppercase">{cause.primary}</h4>
                               <p className="text-sm text-slate-500 italic flex-grow">"{cause.note}"</p>
                               <div className="mt-6 pt-4 border-t border-slate-50 text-[10px] font-black text-emerald-600 uppercase flex items-center gap-2">
                                  <ArrowRight size={14} /> Treat Underlying Joint
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  )}

                  {/* FOUCHER'S SIGN VIEW */}
                  {activeBakerTab === 'foucher' && (
                    <div className="animate-in zoom-in-95 duration-500">
                       <div className="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
                          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                             <div>
                                <div className="p-4 bg-emerald-600 rounded-2xl w-fit mb-8 shadow-xl shadow-emerald-900/50"><Search size={32} /></div>
                                <h3 className="text-4xl font-black tracking-tighter mb-6 italic uppercase">Foucher’s Sign</h3>
                                <p className="text-slate-400 text-lg leading-relaxed mb-10">
                                   "A pathognomonic physical finding: The cyst is hard and tense when the knee is <strong>Extended</strong>, but becomes soft and disappears when the knee is <strong>Flexed</strong>."
                                </p>
                                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                   <p className="text-[10px] font-black text-emerald-400 uppercase mb-2">Mechanism</p>
                                   <p className="text-xs text-slate-300">Compression by the gastrocnemius-semimembranosus muscles during extension squeezes the fluid.</p>
                                </div>
                             </div>
                             <div className="bg-white rounded-[2.5rem] p-10 text-slate-800 space-y-8 shadow-inner">
                                <div className="flex gap-6 items-center">
                                   <div className="w-16 h-16 bg-red-50 rounded-full flex flex-col items-center justify-center font-black text-[10px] text-red-600 shrink-0">
                                      <MoveDown size={20} /> EXT
                                   </div>
                                   <p className="text-sm font-black uppercase text-slate-700 tracking-tighter">Tense & Palpable</p>
                                </div>
                                <div className="flex gap-6 items-center">
                                   <div className="w-16 h-16 bg-emerald-50 rounded-full flex flex-col items-center justify-center font-black text-[10px] text-emerald-600 shrink-0">
                                      <RotateCcw size={20} /> FLEX
                                   </div>
                                   <p className="text-sm font-black uppercase text-slate-400 line-through tracking-tighter">Soft / Hidden</p>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                  )}

                  {/* RUPTURE VIEW */}
                  {activeBakerTab === 'rupture' && (
                    <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-8">
                       <div className="bg-red-50 border border-red-200 p-10 rounded-[3rem] shadow-sm flex flex-col md:flex-row gap-10">
                          <div className="md:w-1/3">
                            <div className="w-20 h-20 bg-red-600 text-white rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-red-900/20">
                               <ShieldAlert size={40} />
                            </div>
                            <h3 className="text-3xl font-black text-red-900 leading-tight mb-2 uppercase tracking-tighter">The DVT Mimic</h3>
                            <p className="text-xs font-black text-red-500 uppercase tracking-widest italic">{BAKER_CYST_DATA.complications.rupture}</p>
                          </div>
                          <div className="md:w-2/3 space-y-6">
                            <p className="text-sm text-red-800 leading-relaxed font-medium italic">
                              "When a large Baker’s cyst ruptures, synovial fluid tracks down into the calf muscles. This presents exactly like a DVT, causing acute pain, swelling, and redness."
                            </p>
                            <div className="bg-white p-6 rounded-3xl border border-red-100 shadow-inner">
                               <h5 className="text-[10px] font-black text-red-600 uppercase mb-4 tracking-widest">Rupture Checklist</h5>
                               <div className="grid grid-cols-2 gap-4">
                                  {BAKER_CYST_DATA.complications.signs.map((sign, idx) => (
                                     <div key={idx} className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-red-500" />
                                        <p className="text-xs font-bold text-slate-700">{sign}</p>
                                     </div>
                                  ))}
                               </div>
                            </div>
                          </div>
                       </div>

                       <div className="bg-emerald-900 text-white p-8 rounded-[3rem] flex flex-col md:flex-row items-center gap-8 shadow-xl">
                          <div className="p-4 bg-emerald-600 rounded-2xl"><Stethoscope size={32} /></div>
                          <div>
                            <h5 className="text-xs font-black text-emerald-400 uppercase mb-2 tracking-widest italic">Apley Treatment Protocol</h5>
                            <p className="text-sm font-medium leading-relaxed italic opacity-90">
                              "Excision of the cyst is rarely successful in isolation. Recurrence is high because the underlying knee pathology (OA/RA/Tear) continues to pump fluid. Address the <strong>internal knee problem</strong> and the cyst will often resolve spontaneously."
                            </p>
                          </div>
                       </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-6 mb-10 relative z-10">
                    <div className="p-5 bg-indigo-50 text-indigo-600 rounded-[1.5rem] shadow-inner">
                      <currentItem.icon size={32} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">{currentItem.title}</h3>
                      <p className="text-indigo-600 font-bold uppercase text-[10px] tracking-[0.2em] italic">"{currentItem.aka}"</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10 relative z-10">
                    <div className="space-y-6">
                      <div>
                          <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Biology & Pathogenesis</h5>
                          <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            {currentItem.pathology}
                          </p>
                      </div>
                      {'clinical' in currentItem && (
                        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                            <h5 className="text-[10px] font-black text-blue-700 uppercase mb-1">Clinical Key</h5>
                            <p className="text-xs font-bold text-blue-900 italic">{currentItem.clinical as string}</p>
                        </div>
                      )}
                      {'behavior' in currentItem && (
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                            <h5 className="text-[10px] font-black text-emerald-700 uppercase mb-1">Behavioral Note</h5>
                            <p className="text-xs font-bold text-emerald-900 italic">{currentItem.behavior as string}</p>
                        </div>
                      )}
                      {'differentiation' in currentItem && (
                        <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
                            <h5 className="text-[10px] font-black text-purple-700 uppercase mb-1">Differentiation</h5>
                            <p className="text-xs font-bold text-purple-900 italic">{currentItem.differentiation as string}</p>
                        </div>
                      )}
                      {'risk' in currentItem && (
                        <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                            <h5 className="text-[10px] font-black text-red-700 uppercase mb-1">Surgical Risk</h5>
                            <p className="text-xs font-bold text-red-900 italic">{currentItem.risk as string}</p>
                        </div>
                      )}
                    </div>

                    <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] flex flex-col justify-center shadow-xl">
                      <div className="flex items-center gap-3 mb-4">
                          <FileSearch className="text-indigo-400" size={20} />
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Imaging Differentiator</h5>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed font-medium mb-6">
                          {currentItem.imaging}
                      </p>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                          <h5 className="text-[10px] font-black text-indigo-300 uppercase mb-2 flex items-center gap-2">
                            <Zap size={14} /> The Apley Pearl
                          </h5>
                          <p className="text-xs text-slate-200 leading-relaxed italic">
                            "{currentItem.pearl}"
                          </p>
                      </div>
                    </div>
                </div>
                <Maximize2 className="absolute bottom-[-50px] right-[-50px] text-slate-50 opacity-10" size={350} />
              </div>
              )}

              {/* Diagnostic Trap Awareness */}
              <div className="bg-indigo-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
                    <div>
                      <h4 className="text-xl font-black mb-4 flex items-center gap-3">
                        <ShieldAlert className="text-indigo-400" /> Preventing "Over-Treatment"
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed italic">
                        "In orthopaedics, a 'bizarre' histology does not always equate to malignancy. For reactive lesions like Nora’s or Periostitis, clinical context—location in the small bones and a history of trauma—is more reliable than the microscope."
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
                      <h5 className="text-[10px] font-black text-indigo-400 uppercase mb-3 text-center tracking-widest">Diagnostic Checkpoint</h5>
                      <div className="space-y-3 text-[10px]">
                          <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="opacity-60 uppercase">Medullary Continuity?</span>
                            <span className="font-bold">No = Nora's (Not Osteochondroma)</span>
                          </div>
                          <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="opacity-60 uppercase">Joint Connection?</span>
                            <span className="font-bold">Yes = Geode (Not Tumor)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="opacity-60 uppercase">Anterior Tibia Line?</span>
                            <span className="font-bold text-indigo-400 italic font-black">REST FIRST (Not Tumor)</span>
                          </div>
                      </div>
                    </div>
                </div>
                <Hand className="absolute bottom-[-30px] left-[-30px] text-white/5" size={200} />
              </div>
            </div>
          )}

          {/* SECTION: Management & Therapy */}
          {activeTab === 'management' && (
            <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
               <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                  <h3 className="text-2xl font-black mb-10 text-slate-800 uppercase tracking-tighter">Surgical Resection Margins</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {ONCOLOGY_DATA.margins.map(m => (
                      <button 
                        key={m.id}
                        onClick={() => setSelectedMargin(m.id)}
                        className={`p-4 rounded-3xl border-2 text-left transition-all ${selectedMargin === m.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}
                      >
                        <h4 className="font-black text-[10px] uppercase mb-1 tracking-widest">{m.label}</h4>
                      </button>
                    ))}
                  </div>

                  <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 grid md:grid-cols-2 gap-8 items-center">
                     <div>
                       <h5 className="text-[10px] font-black text-indigo-500 uppercase mb-2 tracking-widest">Selected Definition</h5>
                       <p className="text-xl font-bold text-slate-800 mb-4">{marginData.desc}</p>
                       <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-100 text-xs font-bold italic">
                         Recurrence: {marginData.recurrence}
                       </div>
                     </div>
                     <div className="hidden md:flex justify-center opacity-10">
                        <Scissors size={120} />
                     </div>
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-indigo-900 text-white p-10 rounded-[3rem]">
                     <h3 className="text-xl font-black mb-6 flex items-center gap-2"><FlaskConical className="text-indigo-400" /> Chemotherapy Protocol</h3>
                     <div className="space-y-6">
                        <div className="border-l-4 border-indigo-400 pl-4 py-1">
                           <h4 className="font-bold text-lg mb-1">Neoadjuvant Therapy</h4>
                           <p className="text-[11px] text-indigo-200">Given BEFORE surgery. Goal: Shrink primary tumour and treat microscopic pulmonary metastases.</p>
                        </div>
                        <div className="border-l-4 border-emerald-400 pl-4 py-1">
                           <h4 className="font-bold text-lg mb-1">Adjuvant Therapy</h4>
                           <p className="text-[11px] text-indigo-200">Given AFTER surgery. Goal: Consolidate systemic control and reduce risk of late recurrence.</p>
                        </div>
                     </div>
                  </div>

                  <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col justify-center">
                     <h3 className="font-black text-slate-400 text-xs uppercase tracking-widest mb-6">Management Hierarchy</h3>
                     <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm font-bold"><div className="w-2 h-2 rounded-full bg-indigo-600"/> MDT approach is essential.</div>
                        <div className="flex items-center gap-3 text-sm font-bold"><div className="w-2 h-2 rounded-full bg-indigo-600"/> Radiotherapy for radiosensitive tumours (e.g. Ewing's).</div>
                        <div className="flex items-center gap-3 text-sm font-bold"><div className="w-2 h-2 rounded-full bg-indigo-600"/> Limb Salvage vs Amputation determination.</div>
                     </div>
                  </div>
               </div>
            </div>
          )}

        </div>

        {/* Legend Footer */}
        <footer className="mt-auto p-6 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-100 bg-white">
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Curable / Benign</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> Aggressive / Malignant</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-600"></div> Management Principles</div>
        </footer>
      </main>
    </div>
  );
};

export default OncologyMaster;
