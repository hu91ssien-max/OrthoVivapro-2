import React, { useState, useMemo } from 'react';
import { 
  Microscope, 
  Bone, 
  Target, 
  AlertCircle, 
  Info, 
  ChevronRight, 
  Activity, 
  User, 
  Search, 
  Layers, 
  ShieldAlert,
  Zap,
  TrendingUp,
  FileSearch,
  X,
  Menu,
  TrendingDown,
  Clock,
  ArrowLeft,
  Dna,
  Scissors,
  Stethoscope,
  XCircle,
  Maximize2,
  Trash2,
  Thermometer,
  Focus,
  Droplets,
  RotateCcw,
  ArrowRight,
  Radiation,
  Flame,
  AlertTriangle,
  FlaskConical,
  Wind,
  Skull,
  Crosshair,
  Moon,
  Sun,
  Timer,
  Eye,
  ClipboardList,
  Cog,
  Scale,
  Hand,
  Hammer,
  Droplet,
  MousePointer2
} from 'lucide-react';

interface OncologyLabProps {
  onBack?: () => void;
}

const SECTIONS = [
  { id: 'patterns', label: 'Lodwick Patterns', icon: Search },
  { id: 'matrix', label: 'Age-Site Matrix', icon: Target },
  { id: 'profiles', label: 'Tumour Profiles', icon: Microscope },
  { id: 'staging', label: 'Staging & Biopsy', icon: ShieldAlert },
  { id: 'cartilage', label: 'Cartilage Lesions', icon: Layers },
  { id: 'metastasis', label: 'Metastasis & Myeloma', icon: Target },
  { id: 'soft_tissue', label: 'Soft Tissue Atlas', icon: Activity },
  { id: 'reconstruction', label: 'Limb Salvage', icon: Scissors },
  { id: 'cysts', label: 'Cysts Differential', icon: Droplets },
  { id: 'fibrous', label: 'Fibrous Dysplasia', icon: Layers },
  { id: 'histio', label: 'Histiocytosis', icon: Search },
  { id: 'chordoma', label: 'Notochordal', icon: ShieldAlert },
  { id: 'rare_formers', label: 'Rare Bone Formers', icon: Bone },
  { id: 'syndromes', label: 'Cartilage Syndromes', icon: Dna },
  { id: 'epiphyseal', label: 'Epiphyseal Specialized', icon: Target },
  { id: 'vascular', label: 'Vascular & Others', icon: Activity },
  { id: 'mimics', label: 'Reactive Mimics', icon: RotateCcw }
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

const LODWICK_PATTERNS = [
  { 
    id: 'geographic', 
    title: 'Geographic (Type I)', 
    behavior: 'Benign / Slow Growing', 
    desc: 'Well-defined borders with a sclerotic rim. Bone has time to react.',
    examples: 'Non-ossifying fibroma, Chondromyxoid fibroma.'
  },
  { 
    id: 'moth_eaten', 
    title: 'Moth-Eaten (Type II)', 
    behavior: 'Aggressive / Malignant', 
    desc: 'Multiple small holes (2-5mm). Indicates rapid bone destruction.',
    examples: 'Metastasis, Myeloma, Osteomyelitis.'
  },
  { 
    id: 'permeative', 
    title: 'Permeative (Type III)', 
    behavior: 'Highly Malignant', 
    desc: 'Tiny, ill-defined holes (<1mm). Merges with normal bone. Very aggressive.',
    examples: "Ewing's Sarcoma, Lymphoma."
  }
];

const TUMOURS = {
  osteosarcoma: {
    name: "Osteosarcoma",
    age: "10-25 years",
    site: "Metaphysis (Distal Femur, Prox. Tibia)",
    imaging: "Sunburst calcification & Codman Triangle.",
    key: "Most common primary malignant bone tumour in young adults."
  },
  ewings: {
    name: "Ewing's Sarcoma",
    age: "5-15 years",
    site: "Diaphysis (Long bones, Pelvis)",
    imaging: "Onion-skin periosteal reaction.",
    key: "Small round blue cell tumour. Highly systemic; mimics infection (fever/ESR)."
  },
  gct: {
    name: "Giant Cell Tumour",
    age: "20-40 years",
    site: "Epiphysis (Extends to joint surface)",
    imaging: "Soap-bubble appearance; eccentric.",
    key: "Benign but locally aggressive. 'Closed epiphysis' is a diagnostic requirement."
  },
  osteoma: {
    name: "Osteoid Osteoma",
    age: "10-30 years",
    site: "Diaphysis / Cortex",
    imaging: "Small radiolucent nidus (<1cm) with surrounding sclerosis.",
    key: "Classic night pain relieved instantly by Aspirin."
  }
};

const BIOPSY_RULES = [
  { 
    t: 'The "Tract" Rule', 
    d: "Biopsy must be through the definitive surgical incision site. The tract MUST be excised during the main procedure.", 
    icon: <TrendingDown className="text-red-500" /> 
  },
  { 
    t: 'Compartment Guard', 
    d: "Avoid traversing healthy compartments. This could convert a limb-salvage into an amputation by spreading cells.", 
    icon: <ShieldAlert className="text-amber-500" /> 
  },
  { 
    t: 'The Edge Rule', 
    d: "Sample tissue from the active periphery (the lesion edge). Necrotic central tissue often fails to yield a diagnosis.", 
    icon: <Layers className="text-blue-500" /> 
  }
];

const MIRELS_CRITERIA = {
  site: { label: 'Site', options: ['Upper Limb (1)', 'Lower Limb (2)', 'Peritrochanteric (3)'] },
  pain: { label: 'Pain', options: ['Mild (1)', 'Moderate (2)', 'Functional (3)'] },
  lesion: { label: 'Lesion', options: ['Blastic (1)', 'Mixed (2)', 'Lytic (3)'] },
  size: { label: 'Size', options: ['<1/3 Cortex (1)', '1/3-2/3 (2)', '>2/3 (3)'] }
};

const SOFT_TISSUE_RED_FLAGS = [
  { t: 'Size', d: 'Lump > 5cm (about the size of a golf ball).' },
  { t: 'Depth', d: 'Lump is deep to the fascia (immobile).' },
  { t: 'Growth', d: 'Rapidly increasing in size.' },
  { t: 'Pain', d: 'Painful lumps are more likely to be inflammatory, but a painless growing mass is a classic Sarcoma.' }
];

const RECONSTRUCTION_TYPES = [
  { 
    id: 'endoprosthesis', 
    title: 'Custom Endoprosthesis', 
    desc: 'Metallic replacement of large bone segments and joints.',
    pros: 'Immediate weight bearing; excellent early function.',
    cons: 'Long-term loosening; risk of infection.'
  },
  { 
    id: 'allograft', 
    title: 'Biological Allograft', 
    desc: 'Using donor bone to bridge the defect.',
    pros: 'Restores bone stock; potential for biological union.',
    cons: 'Risk of non-union; fracture; infection.'
  },
  { 
    id: 'bone_transport', 
    title: 'Ilizarov Bone Transport', 
    desc: 'Using distraction osteogenesis to "grow" new bone into the gap.',
    pros: 'Biological tissue; permanent solution.',
    cons: 'Very slow; high patient burden; pin-site infections.'
  }
];

const CYST_COMPARISON = [
  {
    id: 'sbc',
    name: 'Simple Bone Cyst (SBC)',
    aka: 'Unicameral Bone Cyst',
    age: '1st - 2nd Decade',
    location: 'Proximal Humerus / Femur',
    position: 'Central (Symmetric)',
    imaging: 'Fallen Leaf Sign (Pathological Fracture)',
    pathology: 'Fluid-filled cavity; unilocular.',
    management: 'Observation vs. Aspiration/Steroid injection vs. Curettage.'
  },
  {
    id: 'abc',
    name: 'Aneurysmal Bone Cyst (ABC)',
    aka: 'Osteolytic Lesion',
    age: '1st - 2nd Decade',
    location: 'Long Bone Metaphysis / Spine',
    position: 'Eccentric (Expansile)',
    imaging: 'Fluid-Fluid Levels (MRI)',
    pathology: 'Blood-filled spaces; locally aggressive.',
    management: 'Curettage & Bone Grafting; Arterial Embolization (Spine).'
  }
];

const FIBROUS_LESIONS = {
  fd: {
    title: "Fibrous Dysplasia",
    types: ["Monostotic (70%)", "Polyostotic (30%)", "McCune-Albright Syndrome"],
    imaging: "Ground-glass appearance; no periosteal reaction.",
    deformity: "Shepherd's crook deformity of the proximal femur.",
    note: "Failure of bone to mature; medullary bone replaced by fibro-osseous tissue."
  },
  nof: {
    title: "Non-Ossifying Fibroma",
    aka: "Fibrous Cortical Defect",
    imaging: "Eccentric, metaphyseal, sclerotic 'scalloped' border.",
    clinical: "Incidental finding in children; usually disappears by skeletal maturity.",
    note: "If >50% of diameter, risk of pathological fracture increases."
  }
};

const SPECIALIZED_DATA = {
  rare_formers: [
    {
      id: 'osteoblastoma',
      name: 'Osteoblastoma',
      aka: 'Giant Osteoid Osteoma',
      age: '10 - 25 years',
      site: 'Spine (Posterior Elements)',
      imaging: 'Lesion > 2cm; less sclerosis than Osteoid Osteoma.',
      note: 'Pain is NOT typically relieved by aspirin. Can be locally aggressive.'
    },
    {
      id: 'adamantinoma',
      name: 'Adamantinoma',
      aka: 'Tibia-Specific Malignancy',
      age: '20 - 40 years',
      site: 'Tibial Diaphysis (Anterior Cortex)',
      imaging: 'Soap-bubble appearance; looks like Fibrous Dysplasia.',
      note: 'Slow-growing but malignant; requires wide excision due to high recurrence.'
    }
  ],
  syndromes: [
    {
      id: 'olliers',
      name: "Ollier’s Disease",
      definition: "Multiple Enchondromatosis",
      risk: "25-30% risk of Chondrosarcoma.",
      features: "Unilateral limb involvement; severe deformities and shortening.",
      note: "Non-hereditary; due to somatic mutations in IDH1/IDH2."
    },
    {
      id: 'maffucci',
      name: "Maffucci’s Syndrome",
      definition: "Enchondromatosis + Hemangiomas",
      risk: "Highest risk of malignancy (>50%).",
      features: "Soft tissue hemangiomas (phleboliths on X-ray) + multiple enchondromas.",
      note: "Associated with visceral malignancies (brain, ovary, liver)."
    },
    {
      id: 'aclasis',
      name: "Diaphyseal Aclasis",
      definition: "Multiple Hereditary Exostoses (MHE)",
      risk: "1-5% risk of malignant transformation.",
      features: "Multiple osteochondromas; EXT1/EXT2 gene mutations.",
      note: "Autosomal dominant. Causes forearm/leg bowing (Madelung-like deformity)."
    }
  ],
  epiphyseal: [
    {
      id: 'chondroblastoma',
      name: "Chondroblastoma",
      aka: "Codman’s Tumour",
      age: "10 - 20 years",
      site: "Epiphysis (Proximal Humerus/Femur)",
      imaging: "Well-defined lytic lesion; 'Chicken-wire' calcification.",
      note: "Must differentiate from GCT (GCT occurs after growth plate closure)."
    },
    {
      id: 'cmf',
      name: "Chondromyxoid Fibroma",
      aka: "Rare Eccentric Cartilage Tumour",
      age: "10 - 30 years",
      site: "Metaphysis (Proximal Tibia)",
      imaging: "Eccentric, soap-bubble appearance with sclerotic rim.",
      note: "The rarest of cartilaginous tumours."
    }
  ],
  vascular: [
    {
      id: 'hemangioma',
      name: "Vertebral Hemangioma",
      aka: "Jail-Bar Vertebra",
      site: "Vertebral Body",
      imaging: "Coarse vertical striations (Corduroy cloth sign).",
      note: "Usually incidental; only requires treatment if causing cord compression."
    },
    {
      id: 'glomus',
      name: "Glomus Tumour",
      aka: "Subungual Pain",
      site: "Tip of finger (Under nail)",
      clinical: "Triad: Cold hypersensitivity, localized tenderness, paroxysmal pain.",
      note: "Arises from the glomus body (thermoregulatory shunt)."
    }
  ]
};

const SALVAGE_CRITERIA = [
  { id: 'margins', label: 'Resectable Margins', icon: Crosshair, desc: "Can a wide (Enneking) margin be achieved without sacrificing vital structures?" },
  { id: 'nv_bundle', label: 'NV Bundle Integrity', icon: Activity, desc: "Is the neurovascular bundle free from tumour encasement on MRI?" },
  { id: 'chemo', label: 'Chemo Response', icon: Dna, desc: "Good response (Huvos III/IV) makes salvage safer and more predictable." },
  { id: 'coverage', label: 'Soft Tissue Cover', icon: Layers, desc: "Is there enough skin and muscle remaining to cover the reconstruction?" }
];

const RECON_MODES = {
  endoprosthetic: {
    title: "Mega-Prosthesis",
    pros: ["Immediate weight-bearing", "Relatively simple surgery", "Excellent early function"],
    cons: ["High long-term loosening risk", "Infection (10-15%)", "Polyethylene wear"],
    apley_pearl: "The gold standard for elderly patients or those with a shorter life expectancy."
  },
  allograft: {
    title: "Allograft-Prosthetic Composite",
    pros: ["Biological attachment of tendons", "Preserves bone stock", "Customizable size"],
    cons: ["High non-union rate at junctions", "Risk of fracture", "Disease transmission (rare)"],
    apley_pearl: "Best for mid-shaft or metaphyseal defects where tendon re-attachment is critical (e.g. Proximal Humerus)."
  },
  rotationplasty: {
    title: "Van Nes Rotationplasty",
    pros: ["Active knee control", "No phantom limb pain", "High athletic potential"],
    cons: ["Significant cosmetic challenge", "Complex nerve/vessel orientation", "Psychological acceptance"],
    apley_pearl: "The foot is rotated 180 degrees so the ankle joint functions as a knee. Ideal for young, active children."
  }
};

const SOFT_TISSUE_ATLAS_DATA = {
  gctts: {
    title: "Giant Cell Tumour of Tendon Sheath",
    aka: "Localized PVNS / Xanthoma",
    pathology: "A localized proliferation of synoviocytes along the tendon sheath. Most common tumor of the hand.",
    clinical: "Firm, non-tender, slow-growing mass. Does not transilluminate.",
    imaging: "X-ray: Soft tissue swelling; may show 'pressure erosions' on adjacent bone. MRI: Low signal on T1/T2 (hemosiderin).",
    pearl: "Unlike a ganglion, this mass is solid and fixed to the tendon. Recurrence is common if excision is incomplete."
  },
  cysts: [
    {
      name: "Ganglion Cyst",
      site: "Dorsal Wrist (Scapholunate ligament).",
      features: "Mucinous degeneration of connective tissue. Transilluminates brightly.",
      pearl: "Often fluctuates in size with activity. Treatment: Aspiration or surgical excision including the 'stalk'."
    },
    {
      name: "Baker’s Cyst (Popliteal)",
      site: "Between Semimembranosus and Medial Gastrocnemius.",
      features: "Communicates with the knee joint. Almost always secondary to intra-articular pathology (Meniscal tear/OA).",
      pearl: "Treat the underlying knee problem, or the cyst will simply recur."
    }
  ],
  hemangioma: {
    title: "Synovial Hemangioma",
    aka: "Joint Vascular Malformation",
    pathology: "A rare, benign vascular proliferation within the synovial membrane.",
    clinical: "Recurrent joint swelling and pain. Usually involves the knee. Mimics PVNS.",
    imaging: "MRI: Lobulated mass with serpentine high-intensity signal on T2. Phleboliths (calcified stones) on X-ray are diagnostic.",
    pearl: "If the 'joint mice' look like tiny stones and the patient has episodic swelling, think hemangioma over PVNS."
  },
  morel: {
    title: "Morel-Lavallée Lesion",
    aka: "Internal Degloving Injury",
    pathology: "A post-traumatic fluid collection (blood, lymph, fat) between the fascia and subcutaneous fat.",
    clinical: "Soft, fluctuant swelling over the lateral hip (Greater Trochanter) following a shear injury.",
    imaging: "MRI: Crescentic fluid collection overlying the fascia.",
    pearl: "If missed, it can become a chronic, encapsulated mass that is frequently misdiagnosed as a soft tissue sarcoma."
  }
};

const GCT_RICH_DATA = {
  profile: {
    age: "20 - 40 Years",
    site: "Epiphysis (nearly reaching joint surface)",
    incidence: "5% of all primary bone tumours",
    location: "Knee (50%), Distal Radius, Sacrum"
  },
  imaging: {
    sign: "Soap-Bubble Appearance",
    description: "Eccentric lytic lesion, no sclerotic rim, thinned/expanded cortex.",
    rule: "Almost always occurs after the growth plate has closed."
  },
  pathology: {
    primary: "Mononuclear Stromal Cells",
    giant: "Multinucleated Giant Cells (Osteoclast-like)",
    danger: "1-2% can develop Benign Lung Metastases."
  }
};

const CAMPANACCI = [
  { stage: "I", label: "Latent", desc: "Small, well-defined, intact cortex. Often incidental." },
  { stage: "II", label: "Active", desc: "Thinned and expanded cortex, but no breakthrough." },
  { stage: "III", label: "Aggressive", desc: "Cortical breakthrough with soft-tissue mass. High recurrence." }
];

const SURGICAL_ADJUVANTS = [
  { name: "Phenol / Alcohol", effect: "Chemical cauterization of the cavity wall." },
  { name: "Liquid Nitrogen", effect: "Cryosurgery (Freezing) to kill microscopic remnants." },
  { name: "PMMA Cement", effect: "Thermic kill (Heat) during polymerization." },
  { name: "High-Speed Burr", effect: "Mechanical extension of the margin (Extending the void)." }
];

const EWING_DATA = {
  profile: {
    age: "5 - 15 Years",
    site: "Diaphysis (Shaft) of Long Bones & Pelvis",
    origin: "Primitive Neuroectodermal Cells (PNET)",
    incidence: "2nd most common primary bone tumor in children"
  },
  genetics: {
    translocation: "t(11;22) (q24;q12)",
    fusion: "EWS-FLI1 Gene Fusion",
    pathology: "Small, Round, Blue Cells with scanty cytoplasm (PAS positive due to Glycogen)."
  },
  clinical: {
    mimic: "Systemic Infection (Osteomyelitis)",
    signs: ["Persistent local pain", "Fever & Weight loss", "Raised ESR / CRP / LDH", "Warm, tender swelling"],
    pearl: "If a child has a painful bone lump and a fever, you must rule out Ewing Sarcoma alongside Osteomyelitis."
  },
  radiology: {
    primary: "Onion-Skin Periosteal Reaction",
    destruction: "Permeative 'Moth-Eaten' pattern",
    soft_tissue: "Large extra-osseous soft tissue mass (often larger than the bone lesion)",
    saucerization: "Erosion of the outer cortex by the soft tissue mass."
  }
};

const EWING_MANAGEMENT = [
  { 
    title: "Chemotherapy", 
    desc: "VACA Regimen: Vincristine, Actinomycin-D, Cyclophosphamide, and Adriamycin (Doxorubicin).", 
    icon: <FlaskConical size={20}/> 
  },
  { 
    title: "Local Control", 
    desc: "Surgery is preferred (Wide Resection). Unlike OS, Ewing's is highly Radiosensitive.", 
    icon: <Target size={20}/> 
  },
  { 
    title: "Prognosis", 
    desc: "65-70% 5-year survival for localized disease. Pelvic tumors carry a worse prognosis.", 
    icon: <Activity size={20}/> 
  }
];

const OS_SUBTYPES = [
  {
    id: 'conventional',
    name: 'Conventional OS',
    label: 'High-Grade Central',
    features: 'The "Standard" variant. Arises in the metaphysis (knee 60%).',
    imaging: 'Sunburst reaction + Codman Triangle + Cortical destruction.',
    pathology: 'Direct production of osteoid (bone) by malignant spindle cells.',
    prognosis: '60-70% 5-year survival with MAP chemotherapy.'
  },
  {
    id: 'parosteal',
    name: 'Parosteal OS',
    label: 'Low-Grade Surface',
    features: 'Arises from the outer cortex. Slow-growing mass.',
    imaging: 'Large, lobulated, "stuck-on" ossified mass. Spares the medulla.',
    pathology: 'Well-differentiated bone; low mitotic rate. Minimal atypia.',
    prognosis: 'Excellent (>90% survival). Usually surgery alone (no chemo).'
  },
  {
    id: 'periosteal',
    name: 'Periosteal OS',
    label: 'Intermediate Surface',
    features: 'Predominantly chondroblastic (cartilage) component.',
    imaging: 'Perpendicular "sunburst" spicules on the surface. Minimal medullary involvement.',
    pathology: 'Chondroblastic matrix with high-grade features.',
    prognosis: 'Intermediate between conventional and parosteal.'
  },
  {
    id: 'telangiectatic',
    name: 'Telangiectatic OS',
    label: 'The Great Mimic',
    features: 'Aggressive, purely lytic lesion. High fracture risk.',
    imaging: 'Looks like an Aneurysmal Bone Cyst (ABC). Fluid-fluid levels.',
    pathology: 'Large blood-filled spaces lined by high-grade malignant cells.',
    prognosis: 'Requires aggressive neoadjuvant MAP chemotherapy.'
  }
];

const OS_MANAGEMENT_PILLARS = [
  { title: "Neoadjuvant Chemo", desc: "MAP Regimen: Methotrexate, Adriamycin (Doxorubicin), and Platinum (Cisplatin). Used to shrink tumor and treat micro-mets." },
  { title: "Surgical Resection", desc: "Wide margins are mandatory. Limb-salvage is possible in 90% of cases if NV bundle is free." },
  { title: "Huvos Assessment", desc: "Pathological necrosis of the specimen. Grade III (91-99%) and IV (100%) predict high survival." }
];

const OO_DATA = {
  profile: {
    age: "10 - 30 Years",
    sex: "Males (3:1 ratio)",
    pathology: "A small nidus (< 2cm) of vascular osteoid tissue surrounded by intense reactive sclerosis.",
    mechanism: "High concentrations of Prostaglandin E2 (PGE2) produced within the nidus."
  },
  clinical: {
    hallmark: "Severe Night Pain",
    relief: "Relieved within 20-30 mins by Aspirin or NSAIDs.",
    spine: "Painful Scoliosis (Lesion is at the apex of the concavity).",
    referred: "Joint pain/stiffness if the lesion is intra-articular (mimics arthritis)."
  },
  imaging: {
    xray: "Area of dense sclerosis; may hide the radiolucent nidus.",
    ct: "The Gold Standard. Shows a well-defined nidus with a central calcified 'fleurette'.",
    mri: "Often misleading! Intense marrow edema can look like a malignant tumor or infection.",
    bone_scan: "Double Density Sign (Very hot nidus within a hot sclerotic zone)."
  },
  management: {
    medical: "Long-term NSAIDs (Lesions may self-resolve over 3-5 years).",
    rfa: "The Gold Standard Treatment. CT-guided thermal destruction of the nidus.",
    surgery: "En-bloc excision. Risk: Missing the nidus or causing stress fractures."
  }
};

const OncologyLab = ({ onBack }: OncologyLabProps) => {
  const [activeSection, setActiveSection] = useState('patterns');
  const [activeLodwick, setActiveLodwick] = useState('geographic');
  const [selectedTumour, setSelectedTumour] = useState('osteosarcoma');
  const [activeRec, setActiveRec] = useState('endoprosthesis');
  const [selectedCyst, setSelectedCyst] = useState('sbc');
  const [showSyndrome, setShowSyndrome] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [gctTab, setGctTab] = useState('profile');
  const [ewingTab, setEwingTab] = useState('profile');
  const [osTab, setOsTab] = useState('conventional');
  const [ooTab, setOoTab] = useState('clinical');
  const [activeRecon, setActiveRecon] = useState('endoprosthetic');
  const [salvageScore, setSalvageScore] = useState<string[]>([]);
  const [softTissueMode, setSoftTissueMode] = useState('sarcoma');
  const [softTissueAtlasTab, setSoftTissueAtlasTab] = useState('gctts');
  const [mimicTab, setMimicTab] = useState('nora');

  const toggleSalvage = (id: string) => {
    setSalvageScore(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // Safe data retrieval
  const activeLodwickData = useMemo(() => 
    LODWICK_PATTERNS.find(p => p.id === activeLodwick) || LODWICK_PATTERNS[0], 
  [activeLodwick]);

  const activeTumourData = useMemo(() => 
    TUMOURS[selectedTumour as keyof typeof TUMOURS] || TUMOURS.osteosarcoma, 
  [selectedTumour]);

  const recData = useMemo(() => 
    RECONSTRUCTION_TYPES.find(r => r.id === activeRec) || RECONSTRUCTION_TYPES[0], 
  [activeRec]);

  const cystData = useMemo(() => 
    CYST_COMPARISON.find(c => c.id === selectedCyst) || CYST_COMPARISON[0], 
  [selectedCyst]);

  const osSubData = useMemo(() => 
    OS_SUBTYPES.find(s => s.id === osTab) || OS_SUBTYPES[0], 
  [osTab]);

  const currentMimic = useMemo(() => REACTIVE_MIMICS_DATA[mimicTab as keyof typeof REACTIVE_MIMICS_DATA], [mimicTab]);

  const currentRecon = RECON_MODES[activeRecon as keyof typeof RECON_MODES] || RECON_MODES.endoprosthetic;

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-3 bg-indigo-600 text-white rounded-full shadow-lg"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg">
              <Microscope size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">Onco-Lab</span>
          </div>
          
          <nav className="flex-1 space-y-2">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => { setActiveSection(section.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeSection === section.id ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                <section.icon size={18} />
                {section.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-800">
            <button 
                onClick={onBack}
                className="mb-4 w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={14} /> Back
            </button>
            <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Textbook Reference</p>
              <p className="text-[11px] text-slate-300 font-medium leading-tight">Apley & Solomon System of Orthopaedics</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-slate-50 relative no-scrollbar">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30 backdrop-blur-md bg-white/80">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="lg:hidden text-slate-500"><ArrowLeft size={20} /></button>
            <div>
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Oncology Module</h2>
              <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{activeSection.replace('-', ' ')}</h1>
            </div>
          </div>
          <div className="hidden md:flex gap-4 items-center">
            <div className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full border border-indigo-100 uppercase tracking-widest">
              Biopsy-Ready Status
            </div>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 max-w-6xl">
          
          {/* SECTION: Lodwick Patterns */}
          {activeSection === 'patterns' && (
            <div className="grid lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Select Border Morphology</h3>
                {LODWICK_PATTERNS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveLodwick(p.id)}
                    className={`w-full p-6 rounded-[2rem] border-2 text-left transition-all ${
                      activeLodwick === p.id 
                      ? 'bg-white border-indigo-600 shadow-xl ring-4 ring-indigo-50' 
                      : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                       <h3 className="font-bold text-lg text-slate-800">{p.title}</h3>
                       <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-full ${p.behavior?.includes('Benign') ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                         {p.behavior}
                       </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                  </button>
                ))}
              </div>

              <div className="lg:col-span-7 bg-slate-900 text-white rounded-[3rem] p-10 flex flex-col justify-center relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                    <Search size={32} />
                  </div>
                  <h3 className="text-3xl font-black mb-4 tracking-tighter">Lodwick Analysis</h3>
                  <p className="text-slate-400 text-lg leading-relaxed italic mb-10 max-w-md">
                    "The border is the single most important radiographic indicator of activity. Sharp margins mean the bone is winning."
                  </p>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                    <h4 className="text-indigo-400 font-black text-xs uppercase mb-2 tracking-widest">Selected Insight: {activeLodwickData.title}</h4>
                    <p className="text-sm text-slate-300 leading-relaxed font-medium">Examples: {activeLodwickData.examples}</p>
                  </div>
                </div>
                <Bone className="absolute top-[-40px] right-[-40px] text-white/5" size={320} />
              </div>
            </div>
          )}

          {/* SECTION: Age-Site Matrix */}
          {activeSection === 'matrix' && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
               <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                  <h3 className="text-2xl font-black mb-10 text-center uppercase tracking-tighter">The Diagnostic Correlation Matrix</h3>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-indigo-50 p-8 rounded-[2.5rem] border border-indigo-100">
                       <h4 className="font-black text-indigo-700 uppercase text-xs mb-6 flex items-center gap-2 tracking-widest">
                          <User size={18} /> Clue 1: Age Demographic
                       </h4>
                       <div className="space-y-3">
                          {[
                            { range: "0 - 10 yrs", find: "Ewing's, Neuroblastoma, Eosinophilic Granuloma" },
                            { range: "10 - 25 yrs", find: "Osteosarcoma, Osteoid Osteoma" },
                            { range: "20 - 40 yrs", find: "Giant Cell Tumour (GCT)" },
                            { range: "> 50 yrs", find: "Metastasis, Myeloma", red: true }
                          ].map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                               <span className="text-xs font-black text-indigo-900">{item.range}</span>
                               <span className={`text-xs font-bold text-right ${item.red ? 'text-red-600' : 'text-indigo-500'} italic`}>{item.find}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div className="bg-slate-900 text-white p-8 rounded-[2.5rem]">
                       <h4 className="font-black text-indigo-400 uppercase text-xs mb-6 flex items-center gap-2 tracking-widest">
                          <Layers size={18} /> Clue 2: Longitudinal Site
                       </h4>
                       <div className="space-y-4">
                          {[
                            { pos: "Epiphysis", desc: "Giant Cell Tumour, Chondroblastoma" },
                            { pos: "Metaphysis", desc: "Osteosarcoma, Osteochondroma, SBC" },
                            { pos: "Diaphysis", desc: "Ewing's Sarcoma, Osteoma, Myeloma" }
                          ].map((loc, idx) => (
                            <div key={idx} className="flex gap-4 items-center">
                               <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-black text-[10px] text-indigo-400 border border-white/10">{loc.pos.slice(0,3)}</div>
                               <div>
                                  <h5 className="font-black text-xs text-white">{loc.pos}</h5>
                                  <p className="text-[10px] text-slate-400 italic">{loc.desc}</p>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          )}

          {/* SECTION: Tumour Profiles */}
          {activeSection === 'profiles' && (
            <div className="grid lg:grid-cols-12 gap-8 animate-in zoom-in-95 duration-500">
               <div className="lg:col-span-4 space-y-2">
                 {Object.keys(TUMOURS).map(t => (
                   <button
                    key={t}
                    onClick={() => setSelectedTumour(t)}
                    className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${selectedTumour === t ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg translate-x-2' : 'bg-white border-transparent hover:border-slate-200'}`}
                   >
                     <h4 className="font-black text-sm">{TUMOURS[t as keyof typeof TUMOURS].name}</h4>
                     <p className={`text-[10px] font-black uppercase ${selectedTumour === t ? 'text-indigo-200' : 'text-indigo-600'}`}>Target: {TUMOURS[t as keyof typeof TUMOURS].age}</p>
                   </button>
                 ))}
               </div>

               <div className="lg:col-span-8 flex flex-col gap-6">
                {selectedTumour === 'gct' ? (
                  <div className="animate-in fade-in duration-500 space-y-6">
                    {/* GCT Sub-navigation */}
                    <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
                      {[
                        { id: 'profile', label: 'Profile', icon: User },
                        { id: 'imaging', label: 'Imaging', icon: Search },
                        { id: 'staging', label: 'Staging', icon: Layers },
                        { id: 'surgery', label: 'Surgery', icon: Scissors },
                        { id: 'denosumab', label: 'Drugs', icon: FlaskConical }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setGctTab(tab.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${gctTab === tab.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          <tab.icon size={14} />
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* GCT Content */}
                    <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-200 shadow-xl min-h-[450px] relative overflow-hidden flex flex-col">
                      {gctTab === 'profile' && (
                        <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6 relative z-10 flex-1 flex flex-col">
                          <div className="flex items-center gap-5 mb-6">
                            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-3xl shadow-inner"><User size={32} /></div>
                            <div>
                               <h3 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">Clinical Profile</h3>
                               <p className="text-indigo-600 font-black uppercase text-[10px] tracking-widest italic">The Young Adult Predicament</p>
                            </div>
                          </div>
                          
                          <p className="text-lg text-slate-500 font-medium leading-relaxed italic mb-4">
                            "GCT is a benign but locally destructive tumour. It is unique because it nearly always involves the epiphysis and occurs after skeletal maturity."
                          </p>

                          <div className="grid grid-cols-2 gap-4 mb-6">
                            {Object.entries(GCT_RICH_DATA.profile).map(([key, val], i) => (
                              <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                 <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{key}</h5>
                                 <p className="text-xs font-bold text-slate-800">{val}</p>
                              </div>
                            ))}
                          </div>

                          <div className="mt-auto bg-indigo-900 text-white p-6 rounded-3xl flex items-center gap-4 shadow-xl">
                             <AlertTriangle size={24} className="text-amber-400 shrink-0" />
                             <p className="text-xs font-black uppercase tracking-tighter leading-relaxed">
                               Classic Site: Distal Femur / Proximal Tibia (50%).
                             </p>
                          </div>
                          <Bone className="absolute bottom-[-50px] right-[-50px] text-slate-50 -z-10" size={400} />
                        </div>
                      )}

                      {gctTab === 'imaging' && (
                        <div className="animate-in slide-in-from-right-4 duration-500 flex-1 flex flex-col relative z-10">
                           <div className="flex items-center gap-5 mb-8">
                             <div className="p-4 bg-slate-900 text-indigo-400 rounded-3xl shadow-inner"><Search size={32} /></div>
                             <div>
                                <h3 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">Imaging Hallmark</h3>
                                <p className="text-indigo-600 font-black uppercase text-[10px] tracking-widest italic">Radiological "Soap Bubbles"</p>
                             </div>
                           </div>
                           
                           <div className="grid md:grid-cols-2 gap-8 mb-6 flex-1">
                             <div className="space-y-6">
                                <p className="text-sm text-slate-500 leading-relaxed font-medium bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                   "{GCT_RICH_DATA.imaging.description}"
                                </p>
                             </div>
                             <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] flex flex-col justify-center text-center shadow-2xl relative overflow-hidden">
                                <h5 className="text-[10px] font-black text-indigo-400 uppercase mb-3 relative z-10">Characteristic Sign</h5>
                                <p className="text-3xl font-black italic text-white tracking-tighter relative z-10">Soap-Bubble</p>
                                <p className="text-[10px] text-slate-500 mt-2 uppercase relative z-10">Eccentric Non-Sclerotic Border</p>
                                <Maximize2 className="absolute -bottom-10 -right-10 text-white/5" size={180} />
                             </div>
                           </div>

                           <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-center gap-3">
                              <Info size={18} className="text-amber-600" />
                              <p className="text-xs font-bold text-amber-900 italic">Rule: {GCT_RICH_DATA.imaging.rule}</p>
                           </div>
                        </div>
                      )}

                      {gctTab === 'staging' && (
                        <div className="animate-in slide-in-from-bottom-4 duration-500 flex-1 flex flex-col relative z-10">
                           <div className="flex items-center gap-5 mb-8">
                             <div className="p-4 bg-indigo-50 text-indigo-600 rounded-3xl shadow-inner"><Layers size={32} /></div>
                             <div>
                                <h3 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">Campanacci Staging</h3>
                                <p className="text-indigo-600 font-black uppercase text-[10px] tracking-widest italic">Radiological Grading System</p>
                             </div>
                           </div>

                           <div className="grid md:grid-cols-3 gap-4 flex-1">
                             {CAMPANACCI.map((item, i) => (
                               <div key={i} className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center hover:bg-white hover:shadow-xl transition-all group">
                                  <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-black mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                     {item.stage}
                                  </div>
                                  <h4 className="text-lg font-black text-slate-800 mb-1 uppercase tracking-tighter">{item.label}</h4>
                                  <p className="text-[10px] text-slate-500 font-medium italic leading-tight">
                                     {item.desc}
                                  </p>
                               </div>
                             ))}
                           </div>
                        </div>
                      )}

                      {gctTab === 'surgery' && (
                        <div className="animate-in zoom-in-95 duration-500 flex-1 flex flex-col relative z-10">
                           <div className="flex flex-col md:flex-row gap-8 items-start flex-1">
                             <div className="md:w-1/2">
                                <div className="flex items-center gap-4 mb-6">
                                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shadow-inner"><Scissors size={24} /></div>
                                  <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase whitespace-nowrap">Surgical Margin</h3>
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
                                   "Simple curettage has a recurrence rate up to 50%. Using adjuvants to create a 'chemical or thermal margin' is the gold standard to preserve the joint while killing tumor cells."
                                </p>
                                <div className="p-4 bg-indigo-900 text-white rounded-2xl flex items-center gap-3 shadow-lg">
                                   <FlaskConical size={20} className="text-indigo-300" />
                                   <p className="text-[10px] font-bold leading-relaxed uppercase tracking-tight">
                                     Primary Goal: Prevent Joint Replacement in young adults.
                                   </p>
                                </div>
                             </div>
                             <div className="md:w-1/2 grid grid-cols-1 gap-2">
                                {SURGICAL_ADJUVANTS.map((adj, i) => (
                                  <div key={i} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between group hover:bg-white border border-transparent hover:border-slate-100 transition-all">
                                     <div className="flex-1">
                                        <h5 className="text-[9px] font-black text-indigo-600 uppercase mb-0.5">{adj.name}</h5>
                                        <p className="text-[10px] font-bold text-slate-700 italic leading-tight">{adj.effect}</p>
                                     </div>
                                     <Zap size={14} className="text-slate-300 group-hover:text-amber-500 transition-colors shrink-0 ml-2" />
                                  </div>
                                ))}
                             </div>
                           </div>
                        </div>
                      )}

                      {gctTab === 'denosumab' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1 flex flex-col relative z-10">
                           <div className="bg-indigo-950 text-white p-8 rounded-[2.5rem] relative overflow-hidden flex flex-col md:flex-row gap-8 items-center shadow-2xl flex-1">
                              <div className="relative z-10 md:w-3/5">
                                <div className="p-3 bg-indigo-600 rounded-xl w-fit mb-4 shadow-xl"><FlaskConical size={24} /></div>
                                <h3 className="text-3xl font-black mb-2 tracking-tighter uppercase">Denosumab Therapy</h3>
                                <p className="text-[11px] text-indigo-200 leading-relaxed italic mb-4">
                                   "A monoclonal antibody that inhibits RANK-Ligand. It halts giant-cell recruitment and induces ossification of the tumor, making aggressive Stage III tumors easier to resect."
                                </p>
                                <div className="flex gap-2">
                                   <div className="px-3 py-1.5 bg-indigo-600 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm">Unresectable GCT</div>
                                   <div className="px-3 py-1.5 bg-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest backdrop-blur-sm">Sacral GCT Focus</div>
                                </div>
                              </div>
                              <div className="md:w-2/5 w-full p-6 bg-white/5 border border-white/10 rounded-[2rem] relative z-10 backdrop-blur-md">
                                 <h4 className="text-[9px] font-black text-indigo-300 uppercase mb-4 tracking-widest text-center">Mechanism of Action</h4>
                                 <div className="space-y-3">
                                    <div className="flex justify-between items-center text-[10px] border-b border-white/5 pb-2">
                                       <span className="text-slate-400">Target</span>
                                       <span className="font-black text-indigo-400 uppercase italic">RANK-Ligand</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] border-b border-white/5 pb-2">
                                       <span className="text-slate-400">Effect</span>
                                       <span className="font-black text-emerald-400 uppercase italic">Bone Fix</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px]">
                                       <span className="text-slate-400">Outcome</span>
                                       <span className="font-black text-amber-400 uppercase italic">Matrix</span>
                                    </div>
                                 </div>
                              </div>
                              <Dna className="absolute -right-16 -bottom-16 opacity-10" size={250} />
                           </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : selectedTumour === 'osteosarcoma' ? (
                  <div className="animate-in fade-in duration-500 space-y-6">
                    {/* OS Sub-navigation */}
                    <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
                      {OS_SUBTYPES.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => setOsTab(sub.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${osTab === sub.id ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          <Activity size={12} />
                          {sub.name}
                        </button>
                      ))}
                    </div>

                    {/* OS Content */}
                    <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-200 shadow-xl relative overflow-hidden flex flex-col group min-h-[500px]">
                      <div className="flex flex-col md:flex-row items-center gap-10 relative z-10 mb-8">
                        <div className="p-8 bg-blue-50 text-blue-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105">
                           {osTab === 'telangiectatic' ? <Flame size={48} /> : <Target size={48} />}
                        </div>
                        <div className="text-center md:text-left flex-1">
                           <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                             <span className="text-blue-600 font-black text-xs uppercase tracking-widest">{osSubData.label}</span>
                             <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                             <span className="text-slate-400 font-black text-xs uppercase tracking-widest italic">Apley Variant {osTab.toUpperCase()}</span>
                           </div>
                           <h3 className="text-4xl font-black text-slate-800 tracking-tighter mb-4">{osSubData.name}</h3>
                           <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{osSubData.features}"</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 mb-8 relative z-10 lg:flex-grow">
                         <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                            <h4 className="text-lg font-black mb-6 flex items-center gap-3 text-blue-400">
                               <Search size={22} /> Radiological Signatures
                            </h4>
                            <p className="text-lg font-bold text-slate-200 leading-snug mb-8 italic">
                               "{osSubData.imaging}"
                            </p>
                            <div className="space-y-3">
                               <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex gap-4 items-center">
                                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xs">X-Ray</div>
                                  <p className="text-[10px] text-slate-400 font-medium leading-tight">Aggressive bone destruction + malignant osteoid matrix formation.</p>
                               </div>
                               <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex gap-4 items-center">
                                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-xs">MRI</div>
                                  <p className="text-[10px] text-slate-400 font-medium leading-tight">Essential for assessing soft-tissue extension and "Skip Lesions".</p>
                               </div>
                            </div>
                         </div>

                         <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200 flex flex-col justify-between shadow-sm">
                            <div>
                               <h4 className="text-lg font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter">
                                  <Microscope size={22} className="text-blue-600" /> Histopathology Trap
                               </h4>
                               <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6 italic">
                                  {osSubData.pathology}
                                </p>
                            </div>
                            <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl mt-auto">
                               <h5 className="text-[10px] font-black text-blue-600 uppercase mb-2 flex items-center gap-2 tracking-widest">
                                 <Zap size={16} /> Clinical Prognosis
                               </h5>
                               <p className="text-xs text-blue-900 leading-relaxed italic font-bold">
                                 "{osSubData.prognosis}"
                               </p>
                            </div>
                         </div>
                      </div>

                      <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-sm relative z-10 mb-6">
                         <h3 className="text-xl font-black mb-8 flex items-center gap-4">
                            <Crosshair className="text-red-600" /> Management Algorithm (MAP Regimen)
                         </h3>
                         <div className="grid md:grid-cols-3 gap-6">
                            {OS_MANAGEMENT_PILLARS.map((p, i) => (
                              <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-2xl flex flex-col">
                                 <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-black text-[10px] mb-3">{i + 1}</div>
                                 <h5 className="text-[10px] font-black text-blue-400 uppercase mb-2 tracking-tighter">{p.title}</h5>
                                 <p className="text-[10px] text-slate-400 font-medium leading-tight italic">
                                   "{p.desc}"
                                 </p>
                              </div>
                            ))}
                         </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 relative z-10">
                         <div className="bg-amber-50 border border-amber-200 p-6 rounded-[2rem] shadow-sm">
                            <div className="flex items-center gap-4 mb-4">
                               <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl"><Zap size={20}/></div>
                               <h5 className="text-[10px] font-black text-amber-800 uppercase tracking-widest">The "Skip" Lesion Protocol</h5>
                            </div>
                            <p className="text-[10px] text-amber-900 font-medium leading-relaxed italic">
                               "A skip lesion is a second focus of high-grade sarcoma in the same bone. If you only image the tumor and not the whole bone, you will leave behind cancer."
                            </p>
                         </div>

                         <div className="bg-red-900 text-white p-6 rounded-[2rem] shadow-xl relative overflow-hidden">
                            <div className="flex items-center gap-4 mb-4 relative z-10">
                               <AlertTriangle className="text-red-400" size={20}/>
                               <h5 className="text-[10px] font-black uppercase tracking-widest text-red-400">Secondary Osteosarcoma</h5>
                            </div>
                            <p className="text-[10px] text-slate-300 font-medium leading-relaxed italic relative z-10">
                              {"In the elderly (age > 60), OS often arises from Paget's Disease or a previous site of Radiotherapy. These variants carry a poor prognosis."}
                            </p>
                            <Activity className="absolute bottom-[-20px] left-[-20px] text-white/5" size={150} />
                         </div>
                      </div>

                      <Skull className="absolute bottom-[-50px] right-[-50px] text-slate-100 opacity-20 -z-10" size={400} />
                    </div>
                  </div>
                ) : selectedTumour === 'ewings' ? (
                  <div className="animate-in fade-in duration-500 space-y-6">
                    {/* Ewing Sub-navigation */}
                    <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
                      {[
                        { id: 'profile', label: 'Profile', icon: Stethoscope },
                        { id: 'genetics', label: 'Genetics', icon: Dna },
                        { id: 'imaging', label: 'Radiology', icon: Search },
                        { id: 'tx', label: 'Management', icon: Radiation }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setEwingTab(tab.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${ewingTab === tab.id ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          <tab.icon size={14} />
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Ewing Content */}
                    <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-200 shadow-xl min-h-[450px] relative overflow-hidden flex flex-col">
                      {ewingTab === 'profile' && (
                        <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6 relative z-10 flex-1 flex flex-col">
                          <div className="flex items-center gap-5 mb-6">
                            <div className="p-4 bg-blue-50 text-blue-600 rounded-3xl shadow-inner"><Thermometer size={32} /></div>
                            <div>
                               <h3 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">The Great Mimic</h3>
                               <p className="text-blue-600 font-black uppercase text-[10px] tracking-widest italic">Clinical Profile</p>
                            </div>
                          </div>
                          
                          <p className="text-base text-slate-500 font-medium leading-relaxed italic mb-4">
                            "Ewing Sarcoma often presents like an acute infection. Systemic symptoms (fever, malaise) and raised inflammatory markers are common."
                          </p>

                          <div className="grid grid-cols-2 gap-4 mb-6">
                            {Object.entries(EWING_DATA.profile).map(([key, val], i) => (
                              <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                 <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{key}</h5>
                                 <p className="text-xs font-bold text-slate-800">{val}</p>
                              </div>
                            ))}
                          </div>

                          <div className="mt-auto bg-red-900 text-white p-6 rounded-3xl flex items-center gap-4 shadow-xl">
                             <AlertTriangle size={24} className="text-red-400 shrink-0" />
                             <p className="text-xs font-black uppercase tracking-tighter leading-relaxed">
                               Top Differential: Osteomyelitis. Biopsy is mandatory to distinguish.
                             </p>
                          </div>
                          <Target className="absolute bottom-[-50px] right-[-50px] text-slate-50 -z-10" size={400} />
                        </div>
                      )}

                      {ewingTab === 'genetics' && (
                        <div className="animate-in slide-in-from-right-4 duration-500 flex-1 flex flex-col relative z-10">
                           <div className="flex items-center gap-5 mb-8">
                             <div className="p-4 bg-slate-900 text-blue-400 rounded-3xl shadow-inner"><Dna size={32} /></div>
                             <div>
                                <h3 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">Molecular Signature</h3>
                                <p className="text-blue-600 font-black uppercase text-[10px] tracking-widest italic">Genetics & Pathology</p>
                             </div>
                           </div>
                           
                           <div className="grid md:grid-cols-2 gap-8 mb-6 flex-1">
                             <div className="space-y-4">
                                <div className="p-6 bg-slate-950 text-white rounded-3xl border border-white/10 shadow-xl overflow-hidden relative">
                                  <h5 className="text-[10px] font-black text-blue-400 uppercase mb-2 tracking-widest relative z-10">Genetic Driver</h5>
                                  <p className="text-2xl font-black italic relative z-10">{EWING_DATA.genetics.translocation}</p>
                                  <p className="text-xs text-slate-400 mt-1 relative z-10">{EWING_DATA.genetics.fusion}</p>
                                  <Wind className="absolute -right-10 -bottom-10 text-white/5" size={150} />
                                </div>
                                <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl">
                                  <h5 className="text-[10px] font-black text-blue-700 uppercase mb-2">Apley Pathology Key</h5>
                                  <p className="text-xs text-blue-900 font-bold leading-relaxed">
                                    {EWING_DATA.genetics.pathology}
                                  </p>
                                </div>
                             </div>
                             <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] flex flex-col justify-center text-center shadow-sm">
                                <h5 className="text-[10px] font-black text-slate-400 uppercase mb-3">Cell Morphology</h5>
                                <p className="text-xl font-black italic text-slate-800 tracking-tighter">Small Round Blue Cells</p>
                                <p className="text-[10px] text-blue-600 mt-2 uppercase font-black tracking-widest">Highly Cellular Malignancy</p>
                             </div>
                           </div>
                        </div>
                      )}

                      {ewingTab === 'imaging' && (
                        <div className="animate-in slide-in-from-bottom-4 duration-500 flex-1 flex flex-col relative z-10">
                           <div className="flex items-center gap-5 mb-8">
                             <div className="p-4 bg-indigo-50 text-blue-600 rounded-3xl shadow-inner"><Search size={32} /></div>
                             <div>
                                <h3 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">Radiology Hallmarks</h3>
                                <p className="text-blue-600 font-black uppercase text-[10px] tracking-widest italic">Imaging Evaluation</p>
                             </div>
                           </div>

                           <div className="grid md:grid-cols-2 gap-6 flex-1">
                             <div className="space-y-4">
                                <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-xl">
                                   <h5 className="text-[10px] font-black text-blue-400 uppercase mb-2 tracking-widest">The "Onion-Skin" Sign</h5>
                                   <p className="text-xs italic text-slate-300 leading-relaxed">
                                     "{EWING_DATA.radiology.primary}"
                                   </p>
                                   <p className="text-[10px] text-slate-500 mt-2 uppercase font-black">Reactive Lamellar Bone</p>
                                </div>
                                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                   <h5 className="text-[9px] font-black text-slate-400 uppercase mb-2 tracking-widest">Bone Destruction</h5>
                                   <p className="text-xs font-bold text-slate-700">
                                     {EWING_DATA.radiology.destruction}
                                   </p>
                                </div>
                             </div>
                             <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl flex flex-col justify-center text-center">
                                <h5 className="text-[10px] font-black text-blue-700 uppercase mb-3 tracking-widest">Soft Tissue Mass</h5>
                                <p className="text-xs text-blue-900 font-medium leading-relaxed italic mb-4">
                                   "{EWING_DATA.radiology.soft_tissue}"
                                </p>
                                <div className="px-4 py-2 bg-white text-blue-600 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm border border-blue-50">
                                   Cortical Saucerization
                                </div>
                             </div>
                           </div>
                        </div>
                      )}

                      {ewingTab === 'tx' && (
                        <div className="animate-in zoom-in-95 duration-500 flex-1 flex flex-col relative z-10">
                           <div className="grid md:grid-cols-3 gap-4 mb-6">
                              {EWING_MANAGEMENT.map((m, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all flex flex-col text-center">
                                   <div className="p-3 bg-white text-blue-600 rounded-2xl w-fit mx-auto mb-4 shadow-sm">
                                      {m.icon}
                                   </div>
                                   <h4 className="text-sm font-black text-slate-800 mb-1 uppercase tracking-tighter">{m.title}</h4>
                                   <p className="text-[10px] text-slate-500 font-medium leading-tight italic">
                                      {m.desc}
                                   </p>
                                </div>
                              ))}
                           </div>

                           <div className="mt-auto bg-slate-900 text-white p-6 rounded-[2rem] shadow-2xl relative overflow-hidden flex items-center justify-between gap-6">
                              <div className="relative z-10">
                                <h4 className="text-lg font-black mb-2 flex items-center gap-2 tracking-tighter uppercase">
                                   <Radiation size={18} className="text-blue-400" /> The "Radiosensitive" Advantage
                                </h4>
                                <p className="text-[10px] text-slate-400 leading-relaxed italic">
                                   "Ewing Sarcoma is remarkably sensitive to radiotherapy. In pelvic locations or unresectable sites, RT can be used for local control."
                                </p>
                              </div>
                              <div className="px-4 py-2 bg-blue-600 rounded-xl text-[9px] font-black uppercase tracking-widest whitespace-nowrap relative z-10">
                                 Local Control
                              </div>
                              <Target className="absolute -right-10 -bottom-10 text-white/5" size={150} />
                           </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : selectedTumour === 'osteoma' ? (
                  <div className="animate-in fade-in duration-500 space-y-6">
                    {/* OO Sub-navigation */}
                    <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
                      {[
                        { id: 'clinical', label: 'Clinical', icon: Moon },
                        { id: 'pathology', label: 'Pathology', icon: Layers },
                        { id: 'imaging', label: 'Imaging', icon: Search },
                        { id: 'treatment', label: 'Management', icon: Zap }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setOoTab(tab.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${ooTab === tab.id ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          <tab.icon size={14} />
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* OO Content */}
                    <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-200 shadow-xl min-h-[450px] relative overflow-hidden flex flex-col">
                      {ooTab === 'clinical' && (
                        <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6 relative z-10 flex-1 flex flex-col">
                          <div className="flex items-center gap-5 mb-6">
                            <div className="p-4 bg-amber-50 text-amber-600 rounded-3xl shadow-inner"><Moon size={32} /></div>
                            <div>
                               <h3 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">The Classic "Night Pain"</h3>
                               <p className="text-amber-600 font-black uppercase text-[10px] tracking-widest italic">Clinical Hallmark</p>
                            </div>
                          </div>
                          
                          <p className="text-base text-slate-500 font-medium leading-relaxed italic mb-8">
                            "Pain is typically deep, aching, and worse at night. The dramatic relief with simple Aspirin is one of the most reliable diagnostic tests in orthopaedics."
                          </p>

                          <div className="grid md:grid-cols-2 gap-4 mb-6">
                             <div className="p-6 bg-red-50 rounded-[2rem] border border-red-100">
                                <h4 className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                                   <AlertTriangle size={14}/> Spinal Trap
                                </h4>
                                <p className="text-sm font-bold text-slate-700 leading-snug">{OO_DATA.clinical.spine}</p>
                             </div>
                             <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100">
                                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                                   <Stethoscope size={14}/> Joint Mimicry
                                </h4>
                                <p className="text-sm font-bold text-slate-700 leading-snug">{OO_DATA.clinical.referred}</p>
                             </div>
                          </div>

                          <div className="mt-auto bg-slate-900 text-white p-6 rounded-3xl flex items-center gap-4 shadow-xl">
                             <FlaskConical size={24} className="text-amber-400 shrink-0" />
                             <p className="text-xs font-black uppercase tracking-tighter leading-relaxed">
                               Aspirin Response: {OO_DATA.clinical.relief}
                             </p>
                          </div>
                          <Bone className="absolute bottom-[-50px] right-[-50px] text-slate-50 -z-10" size={400} />
                        </div>
                      )}

                      {ooTab === 'pathology' && (
                        <div className="animate-in slide-in-from-right-4 duration-500 flex-1 flex flex-col relative z-10">
                           <div className="flex items-center gap-5 mb-8">
                             <div className="p-4 bg-slate-900 text-amber-400 rounded-3xl shadow-inner"><Layers size={32} /></div>
                             <div>
                                <h3 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">Nidus Biology</h3>
                                <p className="text-amber-600 font-black uppercase text-[10px] tracking-widest italic">Pathology & Mechanism</p>
                             </div>
                           </div>
                           
                           <div className="grid md:grid-cols-2 gap-8 mb-6 flex-1">
                             <div className="space-y-4">
                                <p className="text-sm text-slate-500 leading-relaxed font-medium bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                   {OO_DATA.profile.pathology}
                                </p>
                                <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl">
                                  <h5 className="text-[10px] font-black text-amber-700 uppercase mb-2">Molecular Driver</h5>
                                  <p className="text-xs text-amber-900 font-bold leading-relaxed italic">
                                    {OO_DATA.profile.mechanism}
                                  </p>
                                </div>
                             </div>
                             <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] flex flex-col justify-center text-center shadow-sm">
                                <h5 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Demographics</h5>
                                <div className="grid grid-cols-2 gap-4">
                                   <div className="p-4 bg-slate-50 rounded-2xl">
                                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Age</p>
                                      <p className="text-lg font-black text-slate-800">{OO_DATA.profile.age}</p>
                                   </div>
                                   <div className="p-4 bg-slate-50 rounded-2xl">
                                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Sex</p>
                                      <p className="text-lg font-black text-slate-800">{OO_DATA.profile.sex}</p>
                                   </div>
                                </div>
                                <p className="mt-6 text-[10px] font-black text-amber-600 uppercase tracking-widest">Small Nidus, Massive Pain</p>
                             </div>
                           </div>
                        </div>
                      )}

                      {ooTab === 'imaging' && (
                        <div className="animate-in slide-in-from-bottom-4 duration-500 flex-1 flex flex-col relative z-10">
                           <div className="flex items-center gap-5 mb-8">
                             <div className="p-4 bg-indigo-50 text-amber-600 rounded-3xl shadow-inner"><Search size={32} /></div>
                             <div>
                                <h3 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">Diagnostic Roadmap</h3>
                                <p className="text-amber-600 font-black uppercase text-[10px] tracking-widest italic">Imaging Evaluation</p>
                             </div>
                           </div>

                           <div className="grid md:grid-cols-2 gap-6 flex-1">
                             <div className="space-y-4">
                                <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-xl relative overflow-hidden">
                                   <h5 className="text-[10px] font-black text-amber-400 uppercase mb-2 tracking-widest relative z-10">CT: The Gold Standard</h5>
                                   <p className="text-sm font-bold text-slate-200 leading-relaxed italic relative z-10">
                                      "{OO_DATA.imaging.ct}"
                                   </p>
                                   <Crosshair className="absolute top-4 right-4 text-amber-500/20" size={80} />
                                </div>
                                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                   <h5 className="text-[9px] font-black text-slate-400 uppercase mb-2 tracking-widest text-indigo-600">Bone Scan</h5>
                                   <p className="text-xs font-bold text-slate-700">{OO_DATA.imaging.bone_scan}</p>
                                </div>
                             </div>
                             <div className="p-8 bg-red-50 border border-red-100 rounded-3xl flex flex-col justify-center text-center">
                                <h5 className="text-[10px] font-black text-red-600 uppercase mb-3 tracking-widest flex items-center justify-center gap-2">
                                   <Eye size={14} /> MRI Warning
                                </h5>
                                <p className="text-xs text-red-900 font-bold leading-relaxed italic">
                                   "{OO_DATA.imaging.mri}"
                                </p>
                             </div>
                           </div>
                        </div>
                      )}

                      {ooTab === 'treatment' && (
                        <div className="animate-in zoom-in-95 duration-500 flex-1 flex flex-col relative z-10">
                           <div className="bg-amber-600 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden group mb-6">
                              <div className="relative z-10">
                                 <h4 className="text-2xl font-black mb-4 flex items-center gap-3">
                                    <Zap size={28} /> Radiofrequency Ablation
                                 </h4>
                                 <p className="text-sm text-amber-100 leading-relaxed italic mb-8 max-w-md">
                                    "{OO_DATA.management.rfa}"
                                 </p>
                                 <div className="flex gap-4">
                                    <div className="px-4 py-2 bg-white text-amber-700 rounded-xl text-[10px] font-black uppercase shadow-lg">90% Success</div>
                                    <div className="px-4 py-2 bg-amber-900 text-white rounded-xl text-[10px] font-black uppercase shadow-lg">CT-Guided</div>
                                 </div>
                              </div>
                              <Maximize2 className="absolute -bottom-10 -right-10 text-white/10" size={240} />
                           </div>

                           <div className="grid md:grid-cols-2 gap-4">
                              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                                 <div>
                                    <h5 className="text-[10px] font-black text-slate-800 uppercase">Medical</h5>
                                    <p className="text-[10px] text-slate-500 italic">{OO_DATA.management.medical}</p>
                                 </div>
                                 <Timer className="text-amber-500" size={16} />
                              </div>
                              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-right">
                                 <Target className="text-red-500" size={16} />
                                 <div>
                                    <h5 className="text-[10px] font-black text-slate-800 uppercase">Surgical</h5>
                                    <p className="text-[10px] text-slate-500 italic">{OO_DATA.management.surgery}</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl flex flex-col justify-center animate-in fade-in duration-500">
                    <div className="flex items-center gap-5 mb-8">
                       <div className="p-4 bg-indigo-50 rounded-3xl text-indigo-600 shadow-inner"><Microscope size={40} /></div>
                       <div>
                          <h3 className="text-4xl font-black text-slate-800 tracking-tighter">{activeTumourData.name}</h3>
                          <div className="flex gap-2 mt-1">
                            <span className="text-indigo-500 font-black uppercase text-[10px] tracking-widest">{activeTumourData.site}</span>
                          </div>
                       </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                      <div className="space-y-4">
                         <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                           <Search size={14}/> Imaging Hallmark
                         </h5>
                         <p className="text-xl font-bold text-slate-800 leading-snug">{activeTumourData.imaging}</p>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col justify-center">
                         <h5 className="text-[10px] font-black text-indigo-500 uppercase mb-2 tracking-widest">The Apley Insight</h5>
                         <p className="text-xs text-slate-600 leading-relaxed italic font-medium">"{activeTumourData.key}"</p>
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-4">
                       <AlertCircle className="text-amber-600 mt-1" size={20} />
                       <p className="text-[11px] font-bold text-amber-800 uppercase leading-relaxed italic">
                          Oncology Mandate: All suspected primary bone tumours should be managed in a specialized regional unit before any biopsy is attempted.
                       </p>
                    </div>
                  </div>
                )}
               </div>
            </div>
          )}

          {/* SECTION: Staging & Biopsy */}
          {activeSection === 'staging' && (
            <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
               <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                  <h3 className="text-2xl font-black mb-10 text-slate-800 flex items-center gap-3">
                     <ShieldAlert className="text-red-500" /> The Golden Rules of Biopsy
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {BIOPSY_RULES.map((rule, i) => (
                      <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-lg transition-all">
                         <div className="mb-4 p-3 bg-white rounded-2xl shadow-sm w-fit">{rule.icon}</div>
                         <h4 className="font-black text-slate-800 text-sm mb-3 uppercase tracking-tighter">{rule.t}</h4>
                         <p className="text-xs text-slate-500 leading-relaxed font-medium">{rule.d}</p>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-8 pb-10">
                  <div className="bg-slate-900 text-white p-10 rounded-[3rem] relative overflow-hidden">
                     <h4 className="text-xl font-black mb-8 flex items-center gap-3"><Zap size={24} className="text-red-500"/> Red Flag Clinic</h4>
                     <ul className="space-y-6 relative z-10">
                        <li className="flex gap-4 items-start border-l-2 border-red-500/30 pl-4">
                           <div>
                              <h5 className="text-sm font-black text-red-500 uppercase tracking-widest mb-1">Night Pain</h5>
                              <p className="text-xs text-slate-400 leading-relaxed">Unrelenting, deep-seated pain that wakes the patient is highly suspicious for primary bone malignancy.</p>
                           </div>
                        </li>
                        <li className="flex gap-4 items-start border-l-2 border-red-500/30 pl-4">
                           <div>
                              <h5 className="text-sm font-black text-red-500 uppercase tracking-widest mb-1">Pathological Fracture</h5>
                              <p className="text-xs text-slate-400 leading-relaxed">Fracture occurring with minimal force through a pre-existing lesion (e.g. SBC or Metastasis).</p>
                           </div>
                        </li>
                        <li className="flex gap-4 items-start border-l-2 border-red-500/30 pl-4">
                           <div>
                              <h5 className="text-sm font-black text-red-500 uppercase tracking-widest mb-1">The Small Blue Cell</h5>
                              <p className="text-xs text-slate-400 leading-relaxed">Ewing's Sarcoma can mimic osteomyelitis with fever, weight loss, and raised ESR.</p>
                           </div>
                        </li>
                     </ul>
                  </div>
                  
                  <div className="flex flex-col gap-6">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 flex flex-col justify-center flex-grow">
                       <h4 className="font-black text-slate-400 uppercase text-[10px] mb-6 tracking-widest">Enneking Staging</h4>
                       <div className="space-y-3">
                          {[
                            { s: "Stage I", d: "Low Grade Malignancy", c: "text-blue-600" },
                            { s: "Stage II", d: "High Grade Malignancy", c: "text-amber-600" },
                            { s: "Stage III", d: "Metastatic Disease", c: "text-red-600" }
                          ].map((stage, idx) => (
                            <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                               <span className={`text-xs font-black ${stage.c}`}>{stage.s}</span>
                               <span className="text-xs font-bold text-slate-600">{stage.d}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div className="bg-indigo-600 text-white p-6 rounded-3xl flex items-center gap-4">
                       <Clock className="text-indigo-200" />
                       <p className="text-xs font-bold italic opacity-90">"A/B suffixes designate if the tumour is Intracompartmental (A) or Extracompartmental (B)."</p>
                    </div>
                  </div>
               </div>
            </div>
          )}

          {/* SECTION: Cartilage Lesions */}
          {activeSection === 'cartilage' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-3xl font-black mb-6">Cartilage Duality</h3>
                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                      "Cartilaginous tumours form a spectrum from benign Enchondromas to aggressive Chondrosarcomas. The differentiation is often difficult even for specialists."
                    </p>
                    <div className="space-y-6">
                      <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                         <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-black">E</div>
                         <div>
                            <h4 className="font-bold text-sm">Enchondroma</h4>
                            <p className="text-xs text-slate-500">Intramedullary cartilage. Usually asymptomatic. 'Popcorn' calcification on X-ray.</p>
                         </div>
                      </div>
                      <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                         <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center font-black">C</div>
                         <div>
                            <h4 className="font-bold text-sm">Chondrosarcoma</h4>
                            <p className="text-xs text-slate-500">Malignant. Primary or secondary. Pain and cortical scalloping are red flags.</p>
                         </div>
                      </div>
                    </div>
                  </div>
                  <Layers className="absolute -bottom-10 -right-10 text-white/5" size={300} />
                </div>

                <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                  <h3 className="text-xl font-black mb-6 uppercase tracking-tight text-slate-800">Osteochondroma (Exostosis)</h3>
                  <div className="space-y-4 text-sm text-slate-600 leading-relaxed italic">
                    <p>• The most common benign bone 'tumour'.</p>
                    <p>• A cartilage-capped bony outgrowth from the metaphysis.</p>
                    <p>• <strong>The Rule:</strong> The cortex and medulla of the lesion are continuous with the host bone.</p>
                    <p>• Malignant transformation (to Chondrosarcoma) is &lt;1%, but increases if the cartilage cap is &gt;2cm in an adult.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: Metastasis & Mirels */}
          {activeSection === 'metastasis' && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
               <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                  <h3 className="text-2xl font-black mb-6">Mirels' Scoring System</h3>
                  <p className="text-sm text-slate-500 mb-10">Used to predict the risk of pathological fracture in metastatic bone disease.</p>
                  
                  <div className="grid md:grid-cols-4 gap-4 mb-8">
                     {Object.entries(MIRELS_CRITERIA).map(([key, data]) => (
                       <div key={key} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <h5 className="font-black text-[10px] text-blue-600 uppercase mb-3">{data.label}</h5>
                          <ul className="space-y-2 text-[10px] font-bold text-slate-500">
                             {data.options.map((opt, i) => <li key={i} className="flex justify-between"><span>{opt}</span></li>)}
                          </ul>
                       </div>
                     ))}
                  </div>

                  <div className="p-6 bg-slate-900 text-white rounded-3xl flex items-center justify-between">
                     <div>
                        <h4 className="font-black text-lg">Management Threshold</h4>
                        <p className="text-slate-400 text-xs">Total score ≥ 9 = Prophylactic Internal Fixation recommended.</p>
                     </div>
                     <div className="text-4xl font-black text-red-500">SCORE ≥ 9</div>
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <h4 className="font-black text-slate-400 text-[10px] uppercase tracking-widest mb-4">Multiple Myeloma</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      The most common primary malignant tumour of bone in adults. Primarily a disease of plasma cells in the marrow.
                    </p>
                    <div className="bg-red-50 p-4 rounded-xl text-[11px] font-bold text-red-800">
                      Imaging: "Raindrop" skull or "Punched-out" lytic lesions. Bone scans are often NEGATIVE (Cold) because there is no blastic response.
                    </div>
                  </div>
                  <div className="bg-blue-900 text-white p-8 rounded-[2.5rem] flex flex-col justify-center">
                    <h4 className="font-black text-blue-400 text-[10px] uppercase tracking-widest mb-4">Primary Sites Mnemonic</h4>
                    <h3 className="text-2xl font-black text-center italic">PB-KTL</h3>
                    <p className="text-center text-[10px] mt-2 opacity-60">Prostate, Breast, Kidney, Thyroid, Lung</p>
                  </div>
               </div>
            </div>
          )}

          {/* SECTION: Soft Tissue Sarcoma */}
          {activeSection === 'soft_tissue' && (
            <div className="space-y-8 animate-in zoom-in-95 duration-500 pb-10">
               {/* Mode Switcher */}
               <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
                  <button
                    onClick={() => setSoftTissueMode('sarcoma')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${softTissueMode === 'sarcoma' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <ShieldAlert size={14} />
                    Sarcoma Principles
                  </button>
                  <button
                    onClick={() => setSoftTissueMode('atlas')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${softTissueMode === 'atlas' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <Search size={14} />
                    Soft Tissue Atlas
                  </button>
               </div>

               {softTissueMode === 'sarcoma' ? (
                 <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                       <h3 className="text-2xl font-black mb-8 flex items-center gap-4">
                         <Activity className="text-red-600" /> Identifying the Sinister Lump
                       </h3>
                       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                         {SOFT_TISSUE_RED_FLAGS.map((flag, i) => (
                           <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                              <h5 className="font-black text-xs text-red-600 uppercase mb-2">{flag.t}</h5>
                              <p className="text-[11px] font-bold text-slate-600 leading-relaxed">{flag.d}</p>
                           </div>
                         ))}
                       </div>
                    </div>

                    <div className="bg-slate-900 text-white p-10 rounded-[3rem] relative overflow-hidden">
                       <h4 className="text-xl font-black mb-4">The Biopsy Protocol</h4>
                       <p className="text-sm text-slate-400 leading-relaxed italic mb-6">
                         "If a soft tissue mass is suspected to be a sarcoma, do not biopsy it in general practice. Refer to a specialist center. An ill-placed biopsy can ruin the chance for limb salvage."
                       </p>
                       <div className="flex gap-4">
                          <span className="px-4 py-2 bg-red-600 rounded-full text-[10px] font-black uppercase">Never 'Shell Out'</span>
                          <span className="px-4 py-2 bg-slate-800 rounded-full text-[10px] font-black uppercase">MRI is Standard</span>
                       </div>
                       <ShieldAlert className="absolute bottom-[-40px] right-[-40px] text-white/5" size={240} />
                    </div>
                 </div>
               ) : (
                 <div className="animate-in slide-in-from-right-4 duration-500 space-y-6">
                    {/* Atlas Sub-navigation */}
                    <div className="flex flex-wrap gap-2 p-1.5 bg-slate-50 border border-slate-200 rounded-2xl w-fit">
                      {[
                        { id: 'gctts', label: 'GCT of Tendon Sheath', icon: Hand },
                        { id: 'cysts', label: 'Soft Tissue Cysts', icon: Droplets },
                        { id: 'hemangioma', label: 'Synovial Hemangioma', icon: Activity },
                        { id: 'morel', label: 'Morel-Lavallée', icon: AlertCircle },
                      ].map((section) => (
                        <button
                          key={section.id}
                          onClick={() => setSoftTissueAtlasTab(section.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${softTissueAtlasTab === section.id ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          <section.icon size={14} />
                          {section.id === 'gctts' ? 'GCTTS' : section.label}
                        </button>
                      ))}
                    </div>

                    <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-200 shadow-xl min-h-[450px] relative overflow-hidden">
                       {/* CONTENT: GCT of Tendon Sheath */}
                       {softTissueAtlasTab === 'gctts' && (
                         <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="flex items-center gap-6 mb-8 relative z-10">
                              <div className="p-5 bg-sky-50 text-sky-600 rounded-3xl shadow-inner"><Hand size={32} /></div>
                              <div>
                                 <h3 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">{SOFT_TISSUE_ATLAS_DATA.gctts.title}</h3>
                                 <p className="text-sky-600 font-bold uppercase text-[10px] tracking-[0.2em] italic">"{SOFT_TISSUE_ATLAS_DATA.gctts.aka}"</p>
                              </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-10 relative z-10">
                              <div className="space-y-6">
                                 <div>
                                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Biology & Clinical</h5>
                                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                      {SOFT_TISSUE_ATLAS_DATA.gctts.pathology} {SOFT_TISSUE_ATLAS_DATA.gctts.clinical}
                                    </p>
                                 </div>
                                 <div className="p-5 bg-slate-900 text-white rounded-3xl shadow-lg">
                                    <h5 className="text-[10px] font-black text-sky-400 uppercase mb-2 tracking-widest">Apley Pearl</h5>
                                    <p className="text-xs text-slate-300 leading-relaxed italic">
                                      "{SOFT_TISSUE_ATLAS_DATA.gctts.pearl}"
                                    </p>
                                 </div>
                              </div>
                              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col justify-center">
                                 <h5 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Imaging Dynamics</h5>
                                 <p className="text-xs text-slate-600 font-bold leading-relaxed">
                                   {SOFT_TISSUE_ATLAS_DATA.gctts.imaging}
                                 </p>
                                 <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></div>
                                    <span className="text-[10px] font-black uppercase text-slate-400">Non-Transilluminating</span>
                                 </div>
                              </div>
                            </div>
                         </div>
                       )}

                       {/* CONTENT: Soft Tissue Cysts */}
                       {softTissueAtlasTab === 'cysts' && (
                         <div className="space-y-8 animate-in slide-in-from-right duration-500">
                            <div className="grid md:grid-cols-2 gap-8">
                               {SOFT_TISSUE_ATLAS_DATA.cysts.map((cyst, idx) => (
                                 <div key={idx} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
                                    <div className="flex justify-between items-start mb-6">
                                       <div className="p-3 bg-white text-sky-600 rounded-2xl shadow-sm"><Droplets size={24}/></div>
                                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cystic Mass</span>
                                    </div>
                                    <h4 className="text-xl font-black text-slate-800 mb-2">{cyst.name}</h4>
                                    <p className="text-[10px] font-bold text-sky-600 uppercase tracking-widest mb-6">Site: {cyst.site}</p>
                                    
                                    <div className="space-y-4 flex-grow">
                                       <div className="p-4 bg-white rounded-2xl border border-slate-50">
                                          <h5 className="text-[10px] font-black text-slate-400 uppercase mb-1">Pathogenesis</h5>
                                          <p className="text-xs font-medium text-slate-700">{cyst.features}</p>
                                       </div>
                                       <div className="p-4 bg-sky-900 text-white rounded-2xl flex items-center gap-3">
                                          <Zap size={16} className="text-sky-400 shrink-0" />
                                          <p className="text-[10px] font-bold italic leading-relaxed">"{cyst.pearl}"</p>
                                       </div>
                                    </div>
                                 </div>
                               ))}
                            </div>
                         </div>
                       )}

                       {/* CONTENT: Synovial Hemangioma */}
                       {softTissueAtlasTab === 'hemangioma' && (
                         <div className="space-y-8 animate-in zoom-in-95 duration-500">
                            <div className="bg-slate-900 text-white p-12 rounded-[3.5rem] relative overflow-hidden flex flex-col md:flex-row gap-10 items-center">
                               <div className="md:w-1/2 relative z-10">
                                  <div className="flex items-center gap-4 mb-8">
                                     <div className="p-4 bg-sky-600 rounded-2xl shadow-lg"><Activity size={32}/></div>
                                     <h3 className="text-3xl font-black tracking-tighter italic uppercase">{SOFT_TISSUE_ATLAS_DATA.hemangioma.title}</h3>
                                  </div>
                                  <p className="text-slate-400 text-sm leading-relaxed mb-8">
                                     "A rare vascular mimic of PVNS that presents with episodic joint swelling. The key is the presence of phleboliths—calcified vascular stones."
                                  </p>
                                  <div className="flex gap-3">
                                     <span className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase border border-white/10 text-sky-400">Phleboliths</span>
                                     <span className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase border border-white/10 text-sky-400">MRI Serpentine</span>
                                  </div>
                               </div>
                               <div className="md:w-1/2 p-8 bg-white rounded-[2.5rem] text-slate-800 shadow-2xl relative z-10">
                                  <h4 className="font-black text-[10px] text-slate-400 uppercase mb-4 tracking-widest text-center">Diagnostic Differentiator</h4>
                                  <p className="text-xs text-slate-600 leading-relaxed italic font-bold">
                                    "{SOFT_TISSUE_ATLAS_DATA.hemangioma.pearl}"
                                  </p>
                               </div>
                               <Maximize2 className="absolute top-[-50px] right-[-50px] text-white/5" size={400} />
                            </div>
                         </div>
                       )}

                       {/* CONTENT: Morel-Lavallée */}
                       {softTissueAtlasTab === 'morel' && (
                         <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
                            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 flex flex-col md:flex-row gap-10">
                               <div className="md:w-1/3">
                                 <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mb-6">
                                    <AlertCircle size={40} />
                                 </div>
                                 <h3 className="text-3xl font-black text-slate-800 mb-2 uppercase tracking-tighter">Morel-Lavallée</h3>
                                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">The Shearing Mass</p>
                               </div>
                               <div className="md:w-2/3 space-y-6">
                                 <p className="text-sm text-slate-600 leading-relaxed font-medium italic bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                                   "Often follows high-energy shearing trauma (e.g., car strike to the lateral hip). It is an internal degloving where the skin is sheared off the underlying fascia."
                                 </p>
                                 <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-5 bg-white rounded-2xl border border-slate-100">
                                       <h5 className="font-bold text-sm mb-1 text-slate-800">The Fluid Triad</h5>
                                       <p className="text-[11px] text-slate-500 font-medium">Hematoma + Lymphatic fluid + Liquefied fat.</p>
                                    </div>
                                    <div className="p-5 bg-slate-900 text-white rounded-2xl">
                                       <h5 className="font-black text-[10px] text-sky-400 uppercase mb-2">Apley Surgical Risk</h5>
                                       <p className="text-[10px] text-slate-300 italic">"If not drained early, it forms a pseudo-capsule and becomes a permanent, palpable mass."</p>
                                    </div>
                                 </div>
                               </div>
                            </div>
                         </div>
                       )}
                       <Bone className="absolute bottom-[-50px] right-[-50px] text-slate-50 opacity-50 -z-10" size={400} />
                    </div>
                 </div>
               )}
            </div>
          )}

          {/* SECTION: Reconstruction */}
          {activeSection === 'reconstruction' && (
            <div className="space-y-8 animate-in slide-in-from-bottom duration-500 pb-10">
              {/* Legacy Reconstruction Types (Restored) */}
              <div className="grid lg:grid-cols-3 gap-6">
                {RECONSTRUCTION_TYPES.map(r => (
                  <button 
                    key={r.id}
                    onClick={() => setActiveRec(r.id)}
                    className={`p-8 rounded-[2.5rem] border-2 text-left transition-all ${activeRec === r.id ? 'bg-white border-blue-600 shadow-xl' : 'bg-white border-slate-100 hover:border-slate-200'}`}
                  >
                     <h4 className="font-black text-lg mb-2 text-slate-800">{r.title}</h4>
                     <p className="text-xs text-slate-500 leading-relaxed mb-4">{r.desc}</p>
                     <ChevronRight className={activeRec === r.id ? 'text-blue-600' : 'text-slate-300'} />
                  </button>
                ))}
              </div>

              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                   <h3 className="text-2xl font-black text-slate-800">Advanced Analytics</h3>
                   <div className="space-y-4">
                      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                         <h5 className="font-black text-[10px] text-emerald-700 uppercase mb-1">Biological Pro</h5>
                         <p className="text-xs font-bold text-emerald-900">{recData.pros}</p>
                      </div>
                      <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                         <h5 className="font-black text-[10px] text-red-700 uppercase mb-1">The Trade-off</h5>
                         <p className="text-xs font-bold text-red-900">{recData.cons}</p>
                      </div>
                   </div>
                </div>
                <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] flex flex-col justify-center text-center">
                   <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">Surgical Margins Refresher</h4>
                   <p className="text-sm italic text-slate-400">
                     "Wide excision is the goal of limb salvage. It means removing the tumour with a continuous cuff of healthy tissue in all dimensions."
                   </p>
                </div>
              </div>

              <div className="w-full h-px bg-slate-200 my-8" />

              {/* Reconstruction Method Navigation (New Content) */}
              <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
                {Object.keys(RECON_MODES).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveRecon(key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeRecon === key ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <Cog size={12} />
                    {RECON_MODES[key as keyof typeof RECON_MODES].title}
                  </button>
                ))}
              </div>

              {/* Limb Salvage Eligibility Checklist */}
              <section className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                 <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3 tracking-tighter">
                    <ClipboardList className="text-indigo-600" /> Limb Salvage Checklist
                 </h3>
                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                    {SALVAGE_CRITERIA.map((item) => (
                       <button 
                         key={item.id}
                         onClick={() => toggleSalvage(item.id)}
                         className={`p-6 rounded-3xl border-2 text-left transition-all ${salvageScore.includes(item.id) ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl' : 'bg-slate-50 border-transparent hover:border-slate-100'}`}
                       >
                          <item.icon size={20} className={salvageScore.includes(item.id) ? 'text-indigo-200' : 'text-indigo-600'} />
                          <h4 className="font-black text-xs uppercase mt-4 mb-2 tracking-widest">{item.label}</h4>
                          <p className={`text-[11px] font-medium leading-relaxed ${salvageScore.includes(item.id) ? 'text-indigo-100' : 'text-slate-500'}`}>
                             {item.desc}
                          </p>
                       </button>
                    ))}
                 </div>
                 {salvageScore.length === 4 && (
                    <div className="mt-8 p-4 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
                       <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white"><ShieldAlert size={20}/></div>
                       <p className="text-xs font-black uppercase tracking-widest italic">Surgical Candidate: Proceed with Limb Salvage Planning</p>
                    </div>
                 )}
              </section>

              {/* Reconstruction Method Deep Dive */}
              <div className="grid md:grid-cols-2 gap-8">
                 <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                    <h4 className="text-lg font-black mb-6 flex items-center gap-3 text-indigo-400 uppercase tracking-tighter">
                       <Maximize2 size={22} /> {currentRecon.title} Mechanics
                    </h4>
                    <div className="space-y-6 relative z-10">
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                             <h5 className="text-[10px] font-black text-emerald-400 uppercase mb-3 tracking-widest">Surgical Advantages</h5>
                             <ul className="space-y-2">
                                {currentRecon.pros.map((p, i) => (
                                   <li key={i} className="text-[11px] text-slate-300 font-medium flex gap-2">
                                      <span className="text-emerald-500">+</span> {p}
                                   </li>
                                ))}
                             </ul>
                          </div>
                          <div>
                             <h5 className="text-[10px] font-black text-red-400 uppercase mb-3 tracking-widest">Complication Risk</h5>
                             <ul className="space-y-2">
                                {currentRecon.cons.map((p, i) => (
                                   <li key={i} className="text-[11px] text-slate-300 font-medium flex gap-2">
                                      <span className="text-red-500">−</span> {p}
                                   </li>
                                ))}
                             </ul>
                          </div>
                       </div>
                    </div>
                    <Cog className="absolute -bottom-10 -right-10 text-white/5 animate-spin-slow" size={280} />
                 </div>

                 <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col justify-center shadow-sm relative overflow-hidden">
                    <h4 className="text-lg font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter mx-auto">
                       <Zap size={22} className="text-amber-600" /> Apley Reconstruction Pearl
                    </h4>
                    <div className="space-y-6">
                       <p className="text-lg text-slate-600 font-black leading-tight text-center italic">
                          "{currentRecon.apley_pearl}"
                       </p>
                       {activeRecon === 'rotationplasty' && (
                         <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-[2rem] flex flex-col items-center">
                            <div className="flex gap-4 mb-4">
                               <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center font-black text-[10px]">Ankle</div>
                               <ArrowRight className="text-indigo-600 mt-3" />
                               <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl shadow-sm flex items-center justify-center font-black text-[10px]">Knee</div>
                            </div>
                            <p className="text-[10px] font-black text-indigo-800 uppercase tracking-widest text-center">Proprioception Intact: Best functional choice for kids</p>
                         </div>
                       )}
                    </div>
                 </div>
              </div>

              {/* Failure & Salvage Complications */}
              <div className="bg-red-900 text-white p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
                 <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
                    <div>
                       <h4 className="text-2xl font-black mb-4 flex items-center gap-3 tracking-tighter">
                         <AlertTriangle className="text-red-400" /> Failed Salvage Protocol
                       </h4>
                       <p className="text-sm text-slate-300 leading-relaxed italic mb-8">
                         "Infection in a mega-prosthesis is often catastrophic. Biofilms form on the massive surface area of the implant, frequently making suppression impossible without implant removal."
                       </p>
                       <div className="flex gap-4">
                          <div className="px-4 py-2 bg-white/10 rounded-xl text-[10px] font-black uppercase border border-white/10">Infection (15%)</div>
                          <div className="px-4 py-2 bg-white/10 rounded-xl text-[10px] font-black uppercase border border-white/10">Loosening (20%)</div>
                       </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-md">
                       <h5 className="text-[10px] font-black text-red-400 uppercase mb-4 tracking-widest">Management of Failure</h5>
                       <div className="space-y-4">
                          <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                            <span className="text-slate-400">Step 1</span>
                            <span className="font-bold text-white">Aggressive DAIR / Washout</span>
                          </div>
                          <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                            <span className="text-slate-400">Step 2</span>
                            <span className="font-bold text-white">2-Stage Exchange (Spacer)</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">Step 3</span>
                            <span className="font-bold text-red-400">Secondary Amputation</span>
                          </div>
                       </div>
                    </div>
                 </div>
                 <ShieldAlert className="absolute bottom-[-30px] left-[-30px] text-white/5" size={240} />
              </div>
            </div>
          )}

          {/* SECTION: Cyst Differential */}
          {activeSection === 'cysts' && (
            <div className="lg:col-span-12 grid lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
               <div className="lg:col-span-4 space-y-4">
                  {CYST_COMPARISON.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCyst(c.id)}
                      className={`w-full p-6 rounded-[2rem] border-2 text-left transition-all ${selectedCyst === c.id ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl translate-x-2' : 'bg-white border-slate-100'}`}
                    >
                      <h4 className="font-black text-lg">{c.name}</h4>
                      <p className={`text-[10px] font-bold uppercase ${selectedCyst === c.id ? 'text-emerald-100' : 'text-emerald-600'}`}>{c.age}</p>
                    </button>
                  ))}

                  <div className="bg-slate-900 text-white p-8 rounded-[2rem] mt-6">
                     <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-4">Imaging Key</h4>
                     <div className="space-y-4">
                        <div className="flex gap-3 items-center">
                           <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center"><Zap size={16} /></div>
                           <div>
                              <p className="text-[10px] font-bold text-slate-400">SBC</p>
                              <p className="text-xs font-bold italic">Fallen Leaf Sign</p>
                           </div>
                        </div>
                        <div className="flex gap-3 items-center">
                           <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center"><Droplets size={16} /></div>
                           <div>
                              <p className="text-[10px] font-bold text-slate-400">ABC</p>
                              <p className="text-xs font-bold italic">Fluid-Fluid Levels</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                  <h3 className="text-2xl font-black text-slate-800 mb-6">{cystData.name} Analysis</h3>
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                     <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-2xl">
                           <h5 className="text-[10px] font-black text-slate-400 uppercase mb-1">Anatomic Position</h5>
                           <p className="text-sm font-bold text-slate-800">{cystData.position} / {cystData.location}</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl">
                           <h5 className="text-[10px] font-black text-slate-400 uppercase mb-1">Pathophysiology</h5>
                           <p className="text-sm text-slate-600 leading-relaxed">{cystData.pathology}</p>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                           <h5 className="text-[10px] font-black text-emerald-600 uppercase mb-1">Management Strategy</h5>
                           <p className="text-sm font-bold text-emerald-900">{cystData.management}</p>
                        </div>
                        <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                           <h5 className="text-[10px] font-black text-amber-600 uppercase mb-1">Apley Clinical Pearl</h5>
                           <p className="text-[11px] text-amber-800 leading-relaxed italic">
                             {selectedCyst === 'sbc' ? "The cyst usually 'migrates' away from the growth plate as the bone grows." : "ABC is often a secondary phenomenon—always check for a hidden precursor like GCT or Osteoblastoma."}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* SECTION: Fibrous Dysplasia */}
          {activeSection === 'fibrous' && (
            <div className="lg:col-span-12 space-y-8 animate-in slide-in-from-right duration-500">
               <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                     <h3 className="text-3xl font-black text-slate-800 mb-4 tracking-tighter">Fibrous Dysplasia</h3>
                     <p className="text-slate-500 text-lg italic mb-8">"Normal bone is replaced by immature fibro-osseous tissue, resulting in a 'Ground Glass' X-ray appearance."</p>
                     <div className="grid grid-cols-3 gap-4">
                        {FIBROUS_LESIONS.fd.types.map((type, i) => (
                           <div key={i} className="p-4 bg-slate-50 rounded-2xl text-center">
                              <p className="text-[10px] font-black text-emerald-600 leading-tight uppercase">{type}</p>
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden flex flex-col justify-center">
                     <h4 className="text-xl font-bold mb-4 flex items-center gap-2"><Maximize2 className="text-emerald-400" /> Orthopaedic Deformity</h4>
                     <p className="text-sm text-slate-400 leading-relaxed mb-6">
                        The most famous complication is the <strong>Shepherd's Crook Deformity</strong> of the proximal femur, leading to progressive bowing and limb shortening.
                     </p>
                     <div className="flex gap-4">
                        <button 
                          onClick={() => setShowSyndrome(!showSyndrome)}
                          className="bg-emerald-600 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition"
                        >
                          {showSyndrome ? "Hide" : "Explore"} McCune-Albright
                        </button>
                     </div>
                     <Layers className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                  </div>
               </div>

               {showSyndrome && (
                  <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[2.5rem] animate-in zoom-in-95 duration-500">
                     <h4 className="text-lg font-black text-emerald-900 mb-4 uppercase tracking-tighter flex items-center gap-2">
                        <ShieldAlert /> McCune-Albright Triad
                     </h4>
                     <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded-3xl shadow-sm">
                           <span className="text-xs font-black text-emerald-500 uppercase block mb-2">01</span>
                           <h5 className="font-bold">Polyostotic FD</h5>
                           <p className="text-[11px] text-slate-500">Multiple lesions affecting various bones, often unilateral.</p>
                        </div>
                        <div className="p-6 bg-white rounded-3xl shadow-sm">
                           <span className="text-xs font-black text-emerald-500 uppercase block mb-2">02</span>
                           <h5 className="font-bold">Pigmentation</h5>
                           <p className="text-[11px] text-slate-500">Cafe-au-lait spots with irregular 'Coast of Maine' borders.</p>
                        </div>
                        <div className="p-6 bg-white rounded-3xl shadow-sm">
                           <span className="text-xs font-black text-emerald-500 uppercase block mb-2">03</span>
                           <h5 className="font-bold">Precocious Puberty</h5>
                           <p className="text-[11px] text-slate-500">Endocrine abnormalities; early maturation in females.</p>
                        </div>
                     </div>
                  </div>
               )}
            </div>
          )}

          {/* SECTION: Histiocytosis (LCH) */}
          {activeSection === 'histio' && (
            <div className="lg:col-span-12 animate-in fade-in duration-500">
               <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col md:flex-row gap-10">
                  <div className="md:w-1/3">
                    <div className="w-20 h-20 bg-slate-900 text-emerald-400 rounded-3xl flex items-center justify-center mb-6">
                       <Search size={40} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-800 mb-2">LCH / EG</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">The Great Imitator</p>
                  </div>
                  <div className="md:w-2/3 space-y-6">
                    <p className="text-sm text-slate-600 leading-relaxed font-medium italic">
                      "Langerhans Cell Histiocytosis (specifically Eosinophilic Granuloma) can mimic almost any bone lesion, from osteomyelitis to Ewing's Sarcoma."
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                       <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                          <h5 className="font-bold text-sm mb-1">Skull: Punched-out</h5>
                          <p className="text-[11px] text-slate-500">Well-defined lytic lesions without sclerosis (Geographic).</p>
                       </div>
                       <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                          <h5 className="font-bold text-sm mb-1">Spine: Vertebra Plana</h5>
                          <p className="text-[11px] text-slate-500">Rapid collapse of the vertebral body (Calvé's disease).</p>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          )}

          {/* SECTION: Chordoma */}
          {activeSection === 'chordoma' && (
            <div className="lg:col-span-12 animate-in slide-in-from-bottom duration-500">
               <div className="bg-slate-900 text-white p-10 rounded-[3rem] relative overflow-hidden flex flex-col lg:flex-row gap-10 items-center">
                  <div className="lg:w-1/2 relative z-10">
                     <h3 className="text-3xl font-black mb-4 text-emerald-400">Chordoma</h3>
                     <p className="text-slate-400 text-lg leading-relaxed mb-6">
                        "A malignant, slow-growing tumour derived from remnants of the primitive notochord. Almost exclusively found in the midline."
                     </p>
                     <div className="space-y-4">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center font-bold text-xs">Clivus</div>
                           <p className="text-xs">Basilar part of the skull (35%)</p>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center font-bold text-xs">Sacrum</div>
                           <p className="text-xs">The most common site (50%)</p>
                        </div>
                     </div>
                  </div>
                  <div className="lg:w-1/2 p-8 bg-white/5 rounded-3xl border border-white/10 text-center relative z-10">
                     <h4 className="text-sm font-black text-red-500 uppercase mb-4 tracking-widest">Surgical Nightmare</h4>
                     <p className="text-xs text-slate-400 leading-relaxed mb-6 italic">
                       "Resection is extremely difficult due to the midline location and proximity to nerves. It is notoriously resistant to radiotherapy and chemotherapy."
                     </p>
                     <div className="inline-block px-4 py-2 bg-red-900/50 border border-red-500/50 rounded-lg text-[10px] font-bold text-red-200">HIGH LOCAL RECURRENCE</div>
                  </div>
                  <User className="absolute top-[-40px] right-[-40px] text-white/5" size={400} />
               </div>
            </div>
          )}

          {/* SECTION: Rare Bone Formers */}
          {activeSection === 'rare_formers' && (
            <div className="grid md:grid-cols-2 gap-8 animate-in fade-in duration-500">
              {SPECIALIZED_DATA.rare_formers.map((item) => (
                <div key={item.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><Bone size={24}/></div>
                    <span className="text-[10px] font-black bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full uppercase">{item.age}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-2">{item.name}</h3>
                  <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-6">{item.site}</p>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                       <h5 className="text-[10px] font-black text-slate-400 uppercase mb-1">Imaging Clue</h5>
                       <p className="text-sm font-bold text-slate-700">{item.imaging}</p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
                       <Info className="text-amber-600 shrink-0" size={16} />
                       <p className="text-xs text-amber-800 leading-relaxed italic">{item.note}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SECTION: Cartilage Syndromes */}
          {activeSection === 'syndromes' && (
            <div className="space-y-6 animate-in slide-in-from-right duration-500">
              {SPECIALIZED_DATA.syndromes.map((item) => (
                <div key={item.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm grid md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-4 border-r border-slate-100 pr-8">
                     <div className="flex items-center gap-3 mb-4">
                        <Dna className="text-emerald-500" />
                        <h3 className="text-2xl font-black text-slate-800">{item.name}</h3>
                     </div>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.definition}</p>
                  </div>
                  <div className="md:col-span-5 space-y-4">
                    <div className="flex gap-4 items-start">
                       <ShieldAlert className="text-red-500 shrink-0" size={18} />
                       <div>
                          <h5 className="text-[10px] font-black text-red-500 uppercase mb-1">Malignant Risk</h5>
                          <p className="text-sm font-bold text-slate-700">{item.risk}</p>
                       </div>
                    </div>
                    <div className="flex gap-4 items-start">
                       <Activity className="text-emerald-500 shrink-0" size={18} />
                       <div>
                          <h5 className="text-[10px] font-black text-emerald-500 uppercase mb-1">Clinical Features</h5>
                          <p className="text-xs text-slate-500 leading-relaxed">{item.features}</p>
                       </div>
                    </div>
                  </div>
                  <div className="md:col-span-3 bg-slate-900 text-white p-6 rounded-3xl text-center">
                     <h5 className="text-[10px] font-black text-emerald-400 uppercase mb-2">Apley Pearl</h5>
                     <p className="text-[11px] leading-relaxed italic opacity-80">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SECTION: Epiphyseal Specialized */}
          {activeSection === 'epiphyseal' && (
            <div className="grid md:grid-cols-2 gap-8 animate-in zoom-in-95 duration-500">
               {SPECIALIZED_DATA.epiphyseal.map((item) => (
                 <div key={item.id} className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-center">
                    <div className="relative z-10">
                      <div className="flex justify-between items-center mb-8">
                        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-3xl"><Target size={32} /></div>
                        <span className="text-[10px] font-black text-slate-400 uppercase">{item.age}</span>
                      </div>
                      <h3 className="text-3xl font-black text-slate-800 mb-2">{item.name}</h3>
                      <p className="text-sm font-bold text-indigo-500 mb-8 italic">"{item.aka}"</p>
                      <div className="space-y-4">
                        <div className="bg-slate-50 p-5 rounded-2xl">
                           <h5 className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Imaging Hallmark</h5>
                           <p className="text-sm font-bold text-slate-700">{item.imaging}</p>
                        </div>
                        <div className="p-4 bg-indigo-600 text-white rounded-2xl flex items-start gap-3">
                           <Zap size={16} className="text-indigo-200 shrink-0" />
                           <p className="text-xs font-medium leading-relaxed italic opacity-90">{item.note}</p>
                        </div>
                      </div>
                    </div>
                    <Layers className="absolute -bottom-10 -right-10 text-slate-50" size={240} />
                 </div>
               ))}
            </div>
          )}

          {/* SECTION: Vascular & Others */}
          {activeSection === 'vascular' && (
            <div className="space-y-8 animate-in slide-in-from-bottom duration-500 pb-10">
               <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-10 items-center">
                  <div className="md:w-1/2 relative z-10">
                     <div className="p-3 bg-white/10 rounded-2xl w-fit mb-6"><Activity size={24} className="text-emerald-400" /></div>
                     <h3 className="text-4xl font-black mb-4 tracking-tighter">{SPECIALIZED_DATA.vascular[0].name}</h3>
                     <p className="text-emerald-400 font-bold uppercase text-[10px] tracking-[0.2em] mb-8">{SPECIALIZED_DATA.vascular[0].aka}</p>
                     <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                        <h5 className="text-[10px] font-black text-emerald-500 uppercase mb-2 tracking-widest">Imaging Signature</h5>
                        <p className="text-lg font-bold leading-relaxed">{SPECIALIZED_DATA.vascular[0].imaging}</p>
                     </div>
                  </div>
                  <div className="md:w-1/2 p-8 bg-white rounded-[2.5rem] text-slate-800 text-center relative z-10 shadow-lg">
                     <h4 className="font-black text-[10px] text-slate-400 uppercase mb-4 tracking-widest">Clinical Guidance</h4>
                     <p className="text-sm italic leading-relaxed text-slate-600">
                       "{SPECIALIZED_DATA.vascular[0].note}"
                     </p>
                  </div>
                  <Layers className="absolute top-[-50px] right-[-50px] text-white/5" size={320} />
               </div>

               <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex items-center gap-10">
                  <div className="hidden sm:flex w-24 h-24 bg-red-50 text-red-600 rounded-3xl items-center justify-center shrink-0">
                     <Flame size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 mb-2">The Glomus Tumour</h3>
                    <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-4">Location: Subungual (Under Nail)</p>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      Extremely painful, tiny vascular lesion. Arises from the thermoregulatory glomus body. Diagnosis is confirmed by the <strong>Love’s Pin Test</strong> (localized tenderness) and <strong>Hildreth’s Test</strong> (pain relief with tourniquet).
                    </p>
                    <div className="flex gap-3">
                       <span className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase rounded-full">Painful Triad</span>
                       <span className="px-4 py-2 bg-slate-50 text-slate-500 text-[10px] font-black uppercase rounded-full border border-slate-100">Cold Hypersensitivity</span>
                    </div>
                  </div>
               </div>
            </div>
          )}

          {/* SECTION: Reactive Mimics */}
          {activeSection === 'mimics' && (
             <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-10">
                <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
                  {MIMIC_SECTIONS.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setMimicTab(section.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mimicTab === section.id ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-indigo-600'}`}
                      >
                        <Icon size={14} />
                        {section.label.split('(')[0]}
                      </button>
                    );
                  })}
                </div>

                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl relative overflow-hidden">
                    <div className="flex items-center gap-6 mb-10 relative z-10">
                        <div className="p-5 bg-indigo-50 text-indigo-600 rounded-[1.5rem] shadow-inner">
                          <currentMimic.icon size={32} />
                        </div>
                        <div>
                          <h3 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">{currentMimic.title}</h3>
                          <p className="text-indigo-600 font-bold uppercase text-[10px] tracking-[0.2em] italic">"{currentMimic.aka}"</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10 relative z-10">
                        <div className="space-y-6">
                          <div>
                              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Biology & Pathogenesis</h5>
                              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                {currentMimic.pathology}
                              </p>
                          </div>
                          {'clinical' in currentMimic && (
                            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                <h5 className="text-[10px] font-black text-blue-700 uppercase mb-1">Clinical Key</h5>
                                <p className="text-xs font-bold text-blue-900 italic">{currentMimic.clinical as string}</p>
                            </div>
                          )}
                          {'behavior' in currentMimic && (
                            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <h5 className="text-[10px] font-black text-emerald-700 uppercase mb-1">Behavioral Note</h5>
                                <p className="text-xs font-bold text-emerald-900 italic">{currentMimic.behavior as string}</p>
                            </div>
                          )}
                          {'differentiation' in currentMimic && (
                            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
                                <h5 className="text-[10px] font-black text-purple-700 uppercase mb-1">Differentiation</h5>
                                <p className="text-xs font-bold text-purple-900 italic">{currentMimic.differentiation as string}</p>
                            </div>
                          )}
                          {'risk' in currentMimic && (
                            <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                                <h5 className="text-[10px] font-black text-red-700 uppercase mb-1">Surgical Risk</h5>
                                <p className="text-xs font-bold text-red-900 italic">{currentMimic.risk as string}</p>
                            </div>
                          )}
                        </div>

                        <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] flex flex-col justify-center shadow-2xl border border-slate-700/50">
                          <div className="flex items-center gap-3 mb-4">
                              <FileSearch className="text-indigo-400" size={20} />
                              <h5 className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Imaging Signature</h5>
                          </div>
                          <p className="text-sm text-slate-300 leading-relaxed font-medium mb-6">
                              {currentMimic.imaging}
                          </p>
                          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                              <h5 className="text-[10px] font-black text-indigo-300 uppercase mb-2 flex items-center gap-2">
                                <Zap size={14} /> The Apley Pearl
                              </h5>
                              <p className="text-xs text-slate-200 leading-relaxed italic">
                                "{currentMimic.pearl}"
                              </p>
                          </div>
                        </div>
                    </div>
                    <Maximize2 className="absolute bottom-[-50px] right-[-50px] text-slate-50 opacity-10" size={350} />
                </div>
             </div>
          )}
        </div>

        {/* Legend */}
        <footer className="mt-auto px-10 py-6 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white">
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-emerald-500"></div> Benign / Observation</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-red-500"></div> Malignant / Urgent</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-blue-600"></div> Reconstruction</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-slate-800"></div> Oncology Protocol</div>
        </footer>
      </main>
    </div>
  );
};

export default OncologyLab;
