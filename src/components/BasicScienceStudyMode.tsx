import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { 
  Microscope, 
  Target, 
  Search, 
  Info, 
  Zap, 
  ShieldAlert, 
  Layers, 
  ChevronRight, 
  Stethoscope,
  ClipboardList,
  Wind,
  UserCheck,
  Crosshair,
  RotateCcw,
  FlaskConical,
  AlertTriangle,
  Thermometer,
  Scissors,
  Database,
  Activity,
  Flame,
  Skull,
  Hand,
  Footprints,
  Scale,
  Binary,
  Globe,
  Bug,
  Pill,
  Dna,
  Waves,
  Beaker,
  TestTube,
  Droplets,
  Heart,
  Construction,
  Factory,
  Trees,
  Maximize2
} from 'lucide-react';

const FORENSIC_DATA = {
  markers: {
    title: "Inflammatory Kinetics",
    niche: "Biomarker Speed & Sensitivity",
    data: [
      { name: "CRP (C-Reactive Protein)", peak: "36-48 Hours", halfLife: "19 Hours", use: "Most sensitive for acute response and monitoring treatment success." },
      { name: "ESR (Sed Rate)", peak: "Slow Rise", halfLife: "Weeks", use: "Useful for chronic infection; stays elevated long after CRP normalizes." },
      { name: "Procalcitonin", peak: "12-24 Hours", halfLife: "24 Hours", use: "High specificity for bacterial vs. viral or inflammatory flares." },
      { name: "IL-6", peak: "2 Hours", halfLife: "Short", use: "The 'early-warning' marker for systemic sepsis/SIRS." }
    ],
    pearl: "CRP is the engine; ESR is the caboose. Always trust the CRP for acute changes."
  },
  msis: {
    title: "MSIS PJI Criteria",
    niche: "The Diagnostic Scoring System",
    major: [
      "Two positive cultures of the same organism",
      "Sinus tract communicating with the joint"
    ],
    minor: [
      "Elevated Serum CRP and ESR",
      "Elevated Synovial WBC or (+) Leukocyte Esterase",
      "Elevated Synovial Neutrophil % (PMN%)",
      "Positive Histology (>5 Neutrophils per HPF)",
      "Single Positive Culture"
    ],
    pearl: "A sinus tract is a 'Major' criterion—it is diagnostic of infection regardless of other tests."
  },
  molecular: {
    title: "Molecular Diagnostics",
    niche: "Next-Gen Detection",
    tests: [
      { name: "Alpha-Defensin", type: "Immunoassay", desc: "A biomarker released by neutrophils in response to pathogens. High sensitivity/specificity." },
      { name: "PCR (16S rRNA)", type: "Amplification", desc: "Detects bacterial DNA even in culture-negative cases. Can be too sensitive (contamination risk)." },
      { name: "Next-Gen Sequencing", type: "Genomic", desc: "Identifies every microbial species present, including rare/uncommon anaerobes." }
    ],
    pearl: "Alpha-Defensin is the closest thing we have to a 'perfect' test for synovial infection."
  },
  sonication: {
    title: "Sonication Culture",
    niche: "Biofilm Disruption",
    process: "The explanted prosthesis is placed in a sterile container with saline and subjected to low-frequency ultrasound.",
    effect: "The physical vibrations 'shake' the bacteria off the metal surface and out of the EPS (Biofilm).",
    result: "Increases culture sensitivity from 60% to over 90%, especially for 'Low-virulence' organisms.",
    pearl: "Conventional swabs miss biofilm bacteria; sonication finds them."
  }
};

const OM_DATA = {
  pathophysiology: {
    title: "The Pathological Cycle",
    steps: [
      { name: "Infection", desc: "Bacteria colonize the Haversian canals." },
      { name: "Ischemia", desc: "Inflammation leads to increased intraosseous pressure, compressing local vessels." },
      { name: "Sequestrum", desc: "A segment of dead, avascular bone isolated by pus." },
      { name: "Involucrum", desc: "New reactive bone formation surrounding the necrotic sequestrum." }
    ],
    pearl: "Antibiotics cannot penetrate the avascular sequestrum. Surgery is mandatory for cure."
  },
  staging: {
    title: "Cierny-Mader Staging",
    anatomical: [
      { stage: "Medullary", desc: "Infection confined to the medullary canal." },
      { stage: "Superficial", desc: "Infection of the bone surface (post-fracture)." },
      { stage: "Localized", desc: "Cortical or medullary, but stable structure." },
      { stage: "Diffuse", desc: "Unstable bone segment with loss of structural integrity." }
    ],
    physiological: ["A (Healthy)", "B (Compromised local/systemic)", "C (Treatment worse than disease)"]
  },
  microbiology: {
    common: "Staphylococcus aureus",
    neonates: "Group B Streptococcus",
    sickle_cell: "Salmonella",
    puncture_wound: "Pseudomonas aeruginosa"
  }
};

const INFECTION_DATA = {
  aho: {
    title: "Acute Hematogenous Osteomyelitis (AHO)",
    niche: "Paediatric Metaphysis",
    pathology: "Bacteria settle in the 'hairpin loops' of metaphyseal vessels where blood flow is sluggish.",
    clinical: "Fever, localized bone pain, and 'pseudoparalysis' (child refuses to move the limb).",
    imaging: "X-rays are negative for 7-10 days. MRI/Ultrasound is required for early diagnosis.",
    pearl: "If the infection crosses the physis, it is usually because the joint capsule is intra-articular (e.g., Hip, Shoulder)."
  },
  septic: {
    title: "Septic Arthritis",
    niche: "Surgical Emergency",
    kocher: [
      "Non-weight bearing on affected side",
      "ESR > 40 mm/hr",
      "WBC > 12,000 /uL",
      "Fever > 38.5°C"
    ],
    logic: "4/4 criteria = 99% probability of Septic Arthritis.",
    action: "Urgent surgical washout. Enzymatic joint destruction happens in hours, not days."
  },
  pji: {
    title: "Prosthetic Joint Infection (PJI)",
    niche: "Biofilm Fortress",
    classification: [
      { type: "Early", timing: "< 4 weeks", mode: "DAIR (Debridement & Liner Change)" },
      { type: "Delayed", timing: "3 - 24 months", mode: "Two-Stage Exchange" },
      { type: "Late", timing: "> 24 months", mode: "Hematogenous spread; 2-Stage preferred" }
    ],
    pearl: "The Biofilm makes bacteria 1000x more resistant to antibiotics than planktonic cells."
  },
  potts: {
    title: "Spinal Tuberculosis (Pott's Disease)",
    niche: "Granulomatous Infection",
    features: "Paradiscal destruction (disc + adjacent endplates). Leads to 'Gibbus' deformity (sharp kyphosis).",
    abscess: "Psoas Abscess: Fluid tracks down the psoas sheath to the groin.",
    pearl: "Unlike pyogenic infection, TB spares the disc initially but eventually causes collapse and neuro-deficit."
  }
};

const ADV_INFECTION_DATA = {
  biofilm: {
    title: "Biofilm Dynamics",
    niche: "The Molecular Shield",
    stages: [
      { id: 1, name: "Reversible Attachment", desc: "Planktonic bacteria adhere to the implant surface (Van der Waals forces)." },
      { id: 2, name: "Irreversible Adhesion", desc: "Production of Extra-cellular Polymeric Substance (EPS)." },
      { id: 3, name: "Quorum Sensing", desc: "Bacteria communicate via chemical signals to coordinate gene expression." },
      { id: 4, name: "Maturation & Dispersal", desc: "The biofilm sheds 'seeds' to colonize other parts of the bone." }
    ],
    pearl: "Once Quorum Sensing occurs, the colony behaves as a single multicellular organism with altered metabolism."
  },
  masquelet: {
    title: "Masquelet Technique",
    niche: "Induced Membrane Reconstruction",
    step1: "Stage 1: Debridement & Spacer. Insert antibiotic-loaded cement spacer to induce a bioactive membrane.",
    step2: "Stage 2 (6-8 weeks): Remove spacer, preserve the membrane, and fill the void with morcellized bone graft.",
    biology: "The membrane is rich in VEGF, BMP-2, and TGF-beta, providing a vascular 'nest' for the graft.",
    pearl: "The induced membrane prevents the graft from being resorbed and protects it from residual bacteria."
  },
  carriers: {
    title: "Local Antibiotic Delivery",
    niche: "High-Dose Local Pharmacy",
    types: [
      { name: "PMMA Beads", type: "Non-absorbable", pro: "Proven gold standard; high elution.", con: "Requires a second surgery to remove." },
      { name: "Calcium Sulfate", type: "Bio-absorbable", pro: "No second surgery; fills small voids.", con: "Can cause serous drainage ('leakage')." },
      { name: "Collagen Sponges", type: "Bio-absorbable", pro: "Rapid elution for soft tissue.", con: "Short-lived antibiotic peak." }
    ],
    pearl: "Local levels can be 100x higher than systemic MIC without causing nephrotoxicity."
  },
  imaging: {
    title: "Nuclear Medicine Hierarchy",
    niche: "When MRI Fails",
    tests: [
      { name: "Bone Scan", use: "High sensitivity, low specificity (cannot distinguish trauma vs infection)." },
      { name: "WBC Scan", use: "Gold standard for PJI or infection in the presence of metal implants." },
      { name: "PET-CT (FDG)", use: "Emerging as highly accurate for chronic osteomyelitis in the axial skeleton." }
    ],
    pearl: "A 'Cold' bone scan effectively rules out infection with 95% certainty."
  },
  brodies: {
    title: "Brodie's Abscess",
    niche: "Sub-acute Osteomyelitis",
    features: "A localized, chronic form of infection that hasn't progressed to systemic sepsis.",
    imaging: "Well-defined radiolucency with a thick sclerotic rim (usually distal/proximal Tibia).",
    pathology: "A 'locked' infection where host defenses have successfully walled off the pathogen.",
    pearl: "Classic Mimic: Often confused with Osteoid Osteoma or a Bone Cyst."
  }
};

const REGIONAL_DATA = {
  kanavel: {
    title: "Kanavel's Signs",
    niche: "Pyogenic Flexor Tenosynovitis",
    signs: [
      { name: "Sausage Digit", desc: "Uniform, fusiform swelling of the entire finger." },
      { name: "Flexed Posture", desc: "The finger is held in slight flexion for comfort." },
      { name: "Extension Pain", desc: "Exquisite pain on passive extension of the finger." },
      { name: "Sheath Tenderness", desc: "Tenderness specifically along the flexor tendon sheath." }
    ],
    action: "Urgent surgical drainage (sheath washout) to prevent tendon necrosis.",
    pearl: "If all 4 signs are present, the diagnosis is 95% certain. Delay leads to 'Horseshoe Abscess' spread."
  },
  wagner: {
    title: "Diabetic Foot Staging",
    niche: "Wagner Classification",
    stages: [
      { s: "Grade 0", d: "At-risk foot: thick calluses, bone deformities, no ulcers." },
      { s: "Grade 1", d: "Superficial ulcer: not involving tendon, capsule, or bone." },
      { s: "Grade 2", d: "Deep ulcer: involving tendon or capsule; no bone infection." },
      { s: "Grade 3", d: "Deep ulcer with Osteomyelitis or abscess formation." },
      { s: "Grade 4", d: "Localized gangrene (Forefoot or Heel)." },
      { s: "Grade 5", d: "Extensive foot gangrene requiring major amputation." }
    ],
    pearl: "Grade 3 is the 'surgical tipping point' where bone debridement or partial amputation is mandatory."
  },
  lrinec: {
    title: "Necrotizing Fasciitis",
    niche: "The LRINEC Score",
    criteria: [
      { name: "CRP", detail: "> 150 mg/L (+4 points)" },
      { name: "WBC", detail: "> 15,000 /uL (+1 or +2 points)" },
      { name: "Hemoglobin", detail: "< 11 g/dL (+2 points)" },
      { name: "Sodium", detail: "< 135 mmol/L (+2 points)" },
      { name: "Creatinine", detail: "> 141 umol/L (+2 points)" },
      { name: "Glucose", detail: "> 10 mmol/L (+1 point)" }
    ],
    risk: "Score ≥ 6 = High suspicion. Score ≥ 8 = Very high probability.",
    action: "Immediate 'slash' debridement. Dishwater pus and loss of fascial resistance are operative keys."
  },
  atypical: {
    title: "Atypical Bone Infections",
    niche: "Syphilis & Brucellosis",
    syphilis: "Congenital: 'Saber Shin' (bowed tibia) and Clutton's joints. Tertiary: Gummatous bone destruction.",
    brucellosis: "Common in the Mediterranean/Middle East. Causes 'Spinal Brucellosis' mimicking TB but spares the disc less.",
    pearl: "Always consider these in chronic, 'culture-negative' osteomyelitis with travel history."
  }
};

const ATYPICAL_GLOBAL_DATA = {
  crmo: {
    title: "CRMO (Chronic Recurrent Multifocal Osteomyelitis)",
    niche: "Non-Infectious Pseudo-Infection",
    features: "An auto-inflammatory condition mimicking chronic osteomyelitis in children.",
    hallmark: "Multiple bony lesions that 'migrate' or appear at different sites over time.",
    biopsy: "Culture is ALWAYS negative. Histology shows non-specific inflammation.",
    pearl: "First-line treatment is NSAIDs, not antibiotics. It is part of the SAPHO syndrome spectrum."
  },
  leprosy: {
    title: "Hansen's Disease (Leprosy)",
    niche: "Neuro-Orthopaedic Infection",
    pathology: "Mycobacterium leprae targets peripheral nerves (Ulnar, Median, Peroneal).",
    bone_impact: "Sensory loss leads to Charcot joints and 'Auto-amputation' due to painless trauma.",
    signs: ["Claw hand", "Foot drop", "Resorption of phalanges (Lorgnette deformity)"],
    pearl: "The bone destruction is secondary to denervation and secondary infection, not the primary bacteria."
  },
  mycetoma: {
    title: "Madura Foot (Mycetoma)",
    niche: "Tropical Fungal Infection",
    triad: [
      "Painless soft tissue swelling",
      "Multiple draining sinus tracts",
      "Grains in the discharge (Black, White, or Yellow)"
    ],
    pathology: "Slowly progressive destruction of skin, muscle, and bone (usually the foot).",
    pearl: "Eumycetoma (Fungal) requires surgery/antifungals; Actinomycetoma (Bacterial) responds to antibiotics."
  },
  pharma: {
    title: "Antibiotic Bone Logic",
    niche: "The Penetration Matrix",
    agents: [
      { name: "Rifampicin", role: "Biofilm Penetrator", logic: "Highly effective against dormant bacteria in biofilms; must use in combination to prevent resistance." },
      { name: "Fluoroquinolones", role: "High Bioavailability", logic: "Excellent bone-to-serum ratio (Ciprofloxacin/Levofloxacin)." },
      { name: "Clindamycin", role: "Toxin Suppressor", logic: "Specifically used in Staph/Strep to shut down Panton-Valentine Leukocidin (PVL) production." },
      { name: "Vancomycin", role: "MRSA Standard", logic: "Poor bone penetration; requires high trough levels or local delivery (Beads)." }
    ],
    pearl: "The goal is a concentration at the site of infection that is 4-8 times the Minimum Inhibitory Concentration (MIC)."
  }
};

const MIMIC_DATA = {
  crystals: {
    title: "Crystal vs. Sepsis",
    niche: "The Joint Flare Trap",
    comparison: [
      { feature: "WBC Count (Fluid)", septic: "> 50,000 cells/mm³", gout: "2,000 - 50,000 cells/mm³" },
      { feature: "Crystals", septic: "Absent", gout: "Needle-shaped (Monosodium Urate)" },
      { feature: "Polarized Light", septic: "N/A", gout: "Strongly Neg. Birefringent" },
      { feature: "Gram Stain", septic: "Positive (60-80%)", gout: "Negative" }
    ],
    pearl: "Gout and Sepsis can co-exist. Never ignore a high WBC count just because crystals are present."
  },
  garres: {
    title: "Garré’s Osteomyelitis",
    niche: "Chronic Sclerosing Variant",
    features: "A non-suppurative (no pus) chronic infection characterized by intense bone proliferation.",
    imaging: "Massive subperiosteal bone formation; usually involves the mandible or long bones.",
    clinical: "Low-grade pain, local thickening, and NO systemic fever or abscess.",
    pearl: "Unlike conventional OM, there is no sequestrum. It is a productive, reactive bone response."
  },
  nonunion: {
    title: "Infected Non-Union",
    niche: "Biological Stagnation",
    diamond_concept: [
      { element: "Osteoconduction", desc: "The scaffold (Allograft/Autograft/Synthetic)." },
      { element: "Osteoinduction", desc: "Growth factors (BMPs, TGF-beta)." },
      { element: "Osteogenic Cells", desc: "Mesenchymal stem cells (BMAC)." },
      { element: "Mechanical Stability", desc: "Stable internal or external fixation." }
    ],
    strategy: "Eradicate infection first (Stage 1), then provide the 'Diamond' elements (Stage 2).",
    pearl: "You cannot expect bone to bridge in an environment of active bacterial metabolic activity."
  },
  crps: {
    title: "CRPS (Sudek's Atrophy)",
    niche: "Post-Traumatic Mimic",
    features: "Disproportionate pain, swelling, and vasomotor changes (redness/warmth).",
    differentiation: "Inflammatory markers (ESR/CRP) are NORMAL in CRPS, distinguishing it from chronic infection.",
    imaging: "Patchy osteopenia (moth-eaten appearance) on X-ray; 'Hot' scan in all three phases.",
    pearl: "A 'Hot' bone scan with 'Normal' bloods is highly suggestive of CRPS over Osteomyelitis."
  }
};

const SOFT_TISSUE_DATA = {
  handSpaces: {
    title: "Deep Hand Spaces",
    niche: "Anatomical Reservoirs",
    areas: [
      { name: "Thenar Space", boundary: "Adductor pollicis / Flexor tendons", desc: "Causes a 'ballooned' first web space. Thumb held in abduction." },
      { name: "Mid-Palmar Space", boundary: "Deep to flexor tendons", desc: "Loss of the palmar concavity. Exquisite tenderness." },
      { name: "Parona's Space", boundary: "Distal forearm (Deep to FDP)", desc: "The 'communication' space where hand infections track into the forearm." },
      { name: "Hypothenar Space", boundary: "Hypothenar muscles", desc: "Localized swelling over the 5th metacarpal; rarely tracks deep." }
    ],
    pearl: "Deep space infections require formal surgical drainage; antibiotics alone will not bridge the fascial barriers."
  },
  bites: {
    title: "Bite Microbiology",
    niche: "The Zoonotic Matrix",
    types: [
      { source: "Human (Fight Bite)", bug: "Eikenella corrodens", rx: "Co-Amoxiclav (Augmentin)", pearl: "Always look for a 'tooth-mark' over the MCP joint after a punch." },
      { source: "Cat / Dog", bug: "Pasteurella multocida", rx: "Penicillin / Augmentin", pearl: "Cat bites are deep 'puncture' wounds; they seed the bone/joint easily." },
      { source: "Saltwater / Fish", bug: "Vibrio vulnificus", rx: "Doxycycline / Ceftazidime", pearl: "Rapidly progressive; high risk in cirrhotic/immunocompromised hosts." }
    ],
    pearl: "Human bites are considered the 'dirtiest' injuries in orthopaedics."
  },
  clostridial: {
    title: "Gas Gangrene",
    niche: "Clostridial Myonecrosis",
    organism: "Clostridium perfringens",
    hallmark: "Crepitus (gas in tissues) + disproportionate pain + 'sweet' mousy odor.",
    action: "Emergency 'slash' debridement + high-dose Penicillin + Hyperbaric Oxygen.",
    pearl: "Pain is the first sign, often appearing before the skin turns 'bronze' or develops blebs."
  },
  fingertip: {
    title: "Felon & Paronychia",
    niche: "Fingertip Abscesses",
    felon: "Infection of the pulp space. High pressure leads to osteomyelitis of the distal phalanx.",
    paronychia: "Infection of the nail fold. Most common hand infection.",
    kanavel: "Review: The 4 signs of flexor tenosynovitis (emergency washout required).",
    pearl: "A felon is a closed-compartment syndrome of the fingertip."
  }
};

const STEALTH_DATA = {
  spondylitis: {
    title: "Pyogenic Spondylodiscitis",
    niche: "Spinal Surgical Emergency",
    pathology: "Bacteria (usually Staph) seed the highly vascular vertebral endplate and spread to the disc.",
    distinction: "Unlike Tumours, infection DESTROYS the intervertebral disc. Unlike TB, Pyogenic is acute and destructive.",
    signs: ["Constant back pain", "Night pain", "Neurological deficit", "Raised inflammatory markers."],
    pearl: "MRI is the investigation of choice. You must look for an associated Epidural Abscess."
  },
  hiv: {
    title: "The HIV-Positive Patient",
    niche: "Immunological Orthopaedics",
    challenges: [
      { name: "Sepsis Risk", desc: "Increased risk of wound infection and hardware failure if CD4 count is < 200." },
      { name: "Stealth Infections", desc: "Atypical organisms like Myobacteria or Cryptococcus may be the primary pathogen." },
      { name: "Non-Infectious", desc: "Highly Active Antiretroviral Therapy (HAART) is associated with Osteonecrosis (AVN) of the hip." }
    ],
    pearl: "Check the CD4 count and Viral Load before any elective arthroplasty."
  },
  brucellosis: {
    title: "Brucellosis (Mediterranean Fever)",
    niche: "Zoonotic Stealth Infection",
    transmission: "Unpasteurized dairy products or contact with infected livestock.",
    spinal_focus: "Commonly affects the Sacroiliac (SI) joints and lower lumbar spine.",
    differentiation: "It mimics TB but is more common in the Middle East/Mediterranean. Spares the disc longer than Pyogenic.",
    pearl: "Diagnosis requires specific Rose-Bengal or ELISA serology; standard cultures are often negative."
  },
  fungal: {
    title: "Fungal Osteomyelitis",
    niche: "The Opportunistic Invader",
    at_risk: "IV drug users, diabetics, and the long-term immunosuppressed.",
    organisms: "Candida albicans (most common) and Aspergillus.",
    presentation: "Sub-acute, chronic, often painless swelling. Looks like a slow-growing tumour on X-ray.",
    pearl: "Requires Sabouraud’s Dextrose Agar for culture and long-term (6+ months) antifungal therapy."
  }
};

const TB_DATA = {
  pathology: {
    title: "The Granulomatous Cycle",
    niche: "Caseating Necrosis",
    steps: [
      { id: 1, name: "The Tubercle", desc: "Aggregations of epithelioid cells and Langhans giant cells surrounded by lymphocytes." },
      { id: 2, name: "Caseation", desc: "Central 'cheese-like' necrosis caused by the host immune response." },
      { id: 3, name: "Cold Abscess", desc: "Liquefied necrotic tissue tracks along tissue planes (psoas, fascia) without acute inflammation." },
      { id: 4, name: "Fibrous Ankylosis", desc: "End-stage joint destruction leads to stiffening, usually via fibrous tissue rather than bone." }
    ],
    pearl: "TB is 'The Great Imitator'. If you see a chronic joint swelling with wasting and no heat, think TB."
  },
  stages: {
    title: "Stages of Joint TB",
    niche: "Synovitis to Destruction",
    levels: [
      { s: "Stage I", label: "Synovitis", desc: "Joint is swollen, tender, but the joint space is preserved on X-ray." },
      { s: "Stage II", label: "Arthritis", desc: "Early cartilage destruction. Marginal erosions seen on X-ray ('Phemister Triad')." },
      { s: "Stage III", label: "Erosion", desc: "Subchondral bone destruction. Joint space narrows significantly." },
      { s: "Stage IV", label: "Ankylosis", desc: "Severe deformity. Joint is destroyed and fused by fibrous tissue." }
    ],
    pearl: "Unlike pyogenic arthritis, TB 'eats' the cartilage slowly, often sparing the joint space in early stages."
  },
  regional: {
    title: "Regional TB Signs",
    niche: "High-Yield Eponyms",
    sites: [
      { name: "Shoulder: Caries Sicca", desc: "A 'dry' form of TB where the humeral head is resorbed without a large cold abscess." },
      { name: "Hand: Spina Ventosa", desc: "Tuberculous Dactylitis. Short bones (phalanges) expand with a 'wind-filled' appearance." },
      { name: "Hip: Wanchof Sign", desc: "A thickened, deep inguinal skin crease pathognomonic for chronic hip TB." },
      { name: "Knee: Triple Deformity", desc: "Flexion, external rotation, and posterior subluxation of the tibia." }
    ],
    pearl: "Caries Sicca is the 'silent' shoulder destroyer—often misdiagnosed as frozen shoulder."
  },
  pharma: {
    title: "The RIPE Regimen",
    niche: "Anti-Tubercular Strategy",
    drugs: [
      { name: "Rifampicin", side: "Orange secretions / Hepatitis", role: "Potent bactericidal; the backbone of therapy." },
      { name: "Isoniazid (INH)", side: "Peripheral Neuropathy (Give B6)", role: "Kills rapidly dividing mycobacteria." },
      { name: "Pyrazinamide", side: "Hyperuricemia (Gout)", role: "Kills bacteria in the acidic environment of macrophages." },
      { name: "Ethambutol", side: "Optic Neuritis (Red-Green blindness)", role: "Bacteriostatic; prevents resistance." }
    ],
    pearl: "Total treatment duration for bone/joint TB is typically 9-12 months."
  }
};

const TRAUMA_INFECTION_DATA = {
  gustilo: {
    title: "Gustilo-Anderson Classification",
    niche: "Predicting Infection Risk",
    stages: [
      { s: "Type I", d: "Clean wound < 1cm; simple fracture pattern." },
      { s: "Type II", d: "Wound 1-10cm; moderate soft tissue damage." },
      { s: "Type IIIA", d: "Wound > 10cm; high energy; adequate bone coverage." },
      { s: "Type IIIB", d: "Extensive periosteal stripping; REQUIRES flap for coverage." },
      { s: "Type IIIC", d: "Arterial injury requiring repair; highest risk of amputation." }
    ],
    pearl: "The 'B' in IIIB stands for 'Bone exposure' requiring a flap."
  },
  debridement: {
    title: "Surgical Debridement (The 4 Cs)",
    niche: "Judging Muscle Viability",
    criteria: [
      { c: "Color", d: "Healthy muscle is red/pink; dead is dusky/grey." },
      { c: "Consistency", d: "Healthy is firm and elastic; dead is friable/mushy." },
      { c: "Contractility", d: "Healthy muscle twitches when pinched; dead is silent." },
      { c: "Capacity to Bleed", d: "Fresh punctate bleeding when cut indicates viability." }
    ],
    pearl: "Aggressive debridement is the single most important factor in preventing post-traumatic osteomyelitis."
  },
  antibiotics: {
    title: "Environmental Prophylaxis",
    niche: "Targeted Microbial Coverage",
    protocols: [
      { source: "Urban / Clean", rx: "1st Gen Cephalosporin (Cefazolin)", target: "Gram-positive (Staph)." },
      { source: "Soil / Farm", rx: "Penicillin + Gentamicin", target: "Anaerobes (Clostridia) + Gram-negative." },
      { source: "Fresh Water", rx: "Quinolones / 3rd Gen Ceph", target: "Aeromonas species." },
      { source: "Salt Water", rx: "Doxycycline", target: "Vibrio vulnificus." }
    ],
    pearl: "Antibiotics must be started within 3 hours of injury to be effective."
  },
  management: {
    title: "Fix and Flap Philosophy",
    niche: "The Modern Paradigm",
    steps: [
      { id: 1, name: "Early Stabilization", desc: "External fixation or IM nail to protect soft tissues." },
      { id: 2, name: "Serial Debridement", desc: "Return to theatre in 48 hours to re-assess 'borderline' tissue." },
      { id: 3, name: "Ortho-Plastic Approach", desc: "Early flap coverage (ideally within 72 hours) to seal the 'biological envelope'." }
    ],
    pearl: "Bio-stability is the key to anti-sepsis. Loose bone fragments and unstable fixation invite infection."
  }
};

const SECTIONS = [
  { id: 'patho', label: 'Pathology Cycle', icon: Layers, group: 'OM BASICS' },
  { id: 'staging', label: 'Cierny-Mader Staging', icon: ClipboardList, group: 'OM BASICS' },
  { id: 'micro', label: 'Microbiology', icon: Target, group: 'OM BASICS' },
  { id: 'tx', label: 'Surgical Logic', icon: Stethoscope, group: 'OM BASICS' },
  { id: 'aho', label: 'Acute Paediatric', icon: UserCheck, group: 'COMPLEX HUB' },
  { id: 'septic', label: 'Septic Arthritis', icon: Crosshair, group: 'COMPLEX HUB' },
  { id: 'pji', label: 'Prosthetic (PJI)', icon: RotateCcw, group: 'COMPLEX HUB' },
  { id: 'potts', label: "Pott's (Spinal TB)", icon: Layers, group: 'COMPLEX HUB' },
  { id: 'biofilm', label: 'Biofilm Biology', icon: Microscope, group: 'ADVANCED INFECTION HUB' },
  { id: 'masquelet', label: 'Masquelet Tech', icon: Scissors, group: 'ADVANCED INFECTION HUB' },
  { id: 'carriers', label: 'Antibiotic Carriers', icon: FlaskConical, group: 'ADVANCED INFECTION HUB' },
  { id: 'imaging', label: 'Nuclear Imaging', icon: Search, group: 'ADVANCED INFECTION HUB' },
  { id: 'brodies', label: "Brodie's Abscess", icon: Search, group: 'ADVANCED INFECTION HUB' },
  { id: 'kanavel', label: "Kanavel (Hand)", icon: Hand, group: 'EMERGENCY HUB' },
  { id: 'wagner', label: "Wagner (Foot)", icon: Footprints, group: 'EMERGENCY HUB' },
  { id: 'lrinec', label: "Nec-Fasc (LRINEC)", icon: Flame, group: 'EMERGENCY HUB' },
  { id: 'atypical', label: "Atypical Systems", icon: Skull, group: 'EMERGENCY HUB' },
  { id: 'crystals', label: "Septic vs. Gout", icon: FlaskConical, group: 'DIFFERENTIAL HUB' },
  { id: 'garres', label: "Garré's (Sclerosing)", icon: Layers, group: 'DIFFERENTIAL HUB' },
  { id: 'nonunion', label: "Infected Non-Union", icon: Binary, group: 'DIFFERENTIAL HUB' },
  { id: 'crps', label: "CRPS (Sudek's)", icon: Flame, group: 'DIFFERENTIAL HUB' },
  { id: 'crmo', label: 'CRMO (Pediatric)', icon: ShieldAlert, group: 'ATYPICAL & GLOBAL HUB' },
  { id: 'leprosy', label: 'Leprosy (Nerve)', icon: Bug, group: 'ATYPICAL & GLOBAL HUB' },
  { id: 'mycetoma', label: 'Madura Foot', icon: Layers, group: 'ATYPICAL & GLOBAL HUB' },
  { id: 'pharma', label: 'Antibiotic Logic', icon: Pill, group: 'ATYPICAL & GLOBAL HUB' },
  { id: 'markers', label: 'Biomarker Kinetics', icon: Activity, group: 'DIAGNOSTIC FORENSICS' },
  { id: 'msis', label: 'MSIS Criteria', icon: ClipboardList, group: 'DIAGNOSTIC FORENSICS' },
  { id: 'molecular', label: 'Molecular DX', icon: Binary, group: 'DIAGNOSTIC FORENSICS' },
  { id: 'sonication', label: 'Sonication Lab', icon: Waves, group: 'DIAGNOSTIC FORENSICS' },
  { id: 'handSpaces', label: 'Deep Spaces', icon: Layers, group: 'SOFT TISSUE HUB' },
  { id: 'bites', label: 'Bite Microbiology', icon: Bug, group: 'SOFT TISSUE HUB' },
  { id: 'clostridial', label: 'Gas Gangrene', icon: Flame, group: 'SOFT TISSUE HUB' },
  { id: 'fingertip', label: 'Fingertip / Pulp', icon: Crosshair, group: 'SOFT TISSUE HUB' },
  { id: 'spondylitis', label: 'Spinal Pyogenic', icon: Layers, group: 'STEALTH HUB' },
  { id: 'hiv', label: 'HIV/AIDS Protocol', icon: Heart, group: 'STEALTH HUB' },
  { id: 'brucellosis', label: 'Brucellosis', icon: Activity, group: 'STEALTH HUB' },
  { id: 'fungal', label: 'Fungal/Atypical', icon: Microscope, group: 'STEALTH HUB' },
  { id: 'tb_pathology', label: 'Granuloma Cycle', icon: Layers, group: 'TB HUB' },
  { id: 'tb_stages', label: 'Joint Stages', icon: Activity, group: 'TB HUB' },
  { id: 'tb_regional', label: 'Regional Signs', icon: Search, group: 'TB HUB' },
  { id: 'tb_pharma', label: 'RIPE Regimen', icon: Pill, group: 'TB HUB' },
  { id: 'gustilo', label: 'Gustilo Staging', icon: Layers, group: 'TRAUMA HUB' },
  { id: 'debridement', label: 'The 4 Cs (Debride)', icon: Scissors, group: 'TRAUMA HUB' },
  { id: 'antibiotics', label: 'Environment Rx', icon: Pill, group: 'TRAUMA HUB' },
  { id: 'management', label: 'Fix & Flap Logic', icon: Target, group: 'TRAUMA HUB' }
];

const BasicScienceStudyMode = () => {
  const [activeTab, setActiveTab] = useState('patho');
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['OM BASICS', 'COMPLEX HUB', 'ADVANCED INFECTION HUB', 'EMERGENCY HUB', 'DIFFERENTIAL HUB', 'ATYPICAL & GLOBAL HUB', 'DIAGNOSTIC FORENSICS', 'SOFT TISSUE HUB', 'STEALTH HUB', 'TB HUB', 'TRAUMA HUB']);

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => 
      prev.includes(group) ? prev.filter(g => g !== group) : [...prev, group]
    );
  };

  const groupedSections = SECTIONS.reduce((acc, section) => {
    if (!acc[section.group]) acc[section.group] = [];
    acc[section.group].push(section);
    return acc;
  }, {} as Record<string, typeof SECTIONS>);

  const isComplex = ['aho', 'septic', 'pji', 'potts'].includes(activeTab);
  const isAdvanced = ['biofilm', 'masquelet', 'carriers', 'imaging', 'brodies'].includes(activeTab);
  const isEmergency = ['kanavel', 'wagner', 'lrinec', 'atypical'].includes(activeTab);
  const isDifferential = ['crystals', 'garres', 'nonunion', 'crps'].includes(activeTab);
  const isAtypicalGlobal = ['crmo', 'leprosy', 'mycetoma', 'pharma'].includes(activeTab);
  const isForensic = ['markers', 'msis', 'molecular', 'sonication'].includes(activeTab);
  const isSoftTissue = ['handSpaces', 'bites', 'clostridial', 'fingertip'].includes(activeTab);
  const isStealth = ['spondylitis', 'hiv', 'brucellosis', 'fungal'].includes(activeTab);
  const isTB = ['tb_pathology', 'tb_stages', 'tb_regional', 'tb_pharma'].includes(activeTab);
  const isTrauma = ['gustilo', 'debridement', 'antibiotics', 'management'].includes(activeTab);

  const activeSection = SECTIONS.find(s => s.id === activeTab);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] bg-slate-50 font-sans text-slate-900 overflow-hidden rounded-[2rem] border border-slate-200">
      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex bg-slate-950 p-2 overflow-x-auto no-scrollbar gap-2 shrink-0">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeTab === section.id ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
          >
            <section.icon size={12} />
            {section.label}
          </button>
        ))}
      </div>

      {/* Sidebar (Desktop) */}
      <aside className="w-72 bg-slate-950 text-white hidden lg:flex flex-col h-full sticky top-0 shadow-2xl shrink-0">
        <div className="p-8 pb-2">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-emerald-600 rounded-xl shadow-lg shadow-emerald-900/40">
              <Microscope size={20} />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase italic">OM-Master</span>
          </div>
        </div>
          
        <nav className="flex-1 space-y-4 overflow-y-auto no-scrollbar px-8 pb-8">
          {Object.entries(groupedSections).map(([group, items]) => {
            const isExpanded = expandedGroups.includes(group);
            return (
              <div key={group} className="space-y-1">
                <button 
                  onClick={() => toggleGroup(group)}
                  className="w-full flex items-center justify-between px-2 mb-2 group/header"
                >
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] group-hover/header:text-slate-300 transition-colors">{group}</p>
                  <ChevronRight size={10} className={`text-slate-600 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
                
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden space-y-1"
                    >
                      {items.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => setActiveTab(section.id)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[10px] font-bold transition-all ${activeTab === section.id ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-900/40' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        >
                          <div className="flex items-center gap-3">
                            <section.icon size={14} className={activeTab === section.id ? 'text-white' : 'text-slate-500'} />
                            {section.label}
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
        
        <div className="p-6 bg-slate-900/50 border-t border-white/5">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <FlaskConical size={14} className="text-emerald-400" />
              <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Diagnostic Rule</span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium leading-tight italic">
              "Always aspirate before antibiotics to ensure culture accuracy."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto no-scrollbar bg-slate-50">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
          <div>
            <h2 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">Surgical Biology</h2>
            <h1 className="text-lg font-black text-slate-800 uppercase tracking-tighter">Infection Hub Master</h1>
          </div>
            <div className={`px-3 py-1 ${isTrauma ? 'bg-orange-50 text-orange-700 border-orange-100' : isTB ? 'bg-amber-50 text-amber-700 border-amber-100' : isStealth ? 'bg-teal-50 text-teal-700 border-teal-100' : isSoftTissue ? 'bg-orange-50 text-orange-700 border-orange-100' : isForensic ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : isAtypicalGlobal ? 'bg-blue-50 text-blue-700 border-blue-100' : isDifferential ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : isEmergency ? 'bg-orange-50 text-orange-700 border-orange-100' : isAdvanced ? 'bg-purple-50 text-purple-700 border-purple-100' : isComplex ? 'bg-red-50 text-red-700 border-red-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'} rounded-full border flex items-center gap-2`}>
                {isTrauma ? <Construction size={12} /> : isTB ? <Globe size={12} /> : isStealth ? <Heart size={12} /> : isSoftTissue ? <Hand size={12} /> : isForensic ? <FlaskConical size={12} /> : isAtypicalGlobal ? <Globe size={12} /> : isDifferential ? <Scale size={12} /> : isEmergency ? <AlertTriangle size={12} /> : isAdvanced ? <Search size={12} /> : isComplex ? <Thermometer size={12} /> : <Activity size={12} />}
                <span className="text-[9px] font-black uppercase tracking-widest italic">
                  {isTrauma ? 'Trauma Sepsis' : isTB ? 'TB Hub' : isStealth ? 'Stealth Matrix' : isSoftTissue ? 'Soft Tissue Hub' : isForensic ? 'Forensic Matrix' : isAtypicalGlobal ? 'Atypical Matrix' : isDifferential ? 'Differential Hub' : isEmergency ? 'Emergency Hub' : isAdvanced ? 'Advanced Hub' : isComplex ? 'Acute Protocol' : 'Core Basics'}
                </span>
             </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 max-w-none w-full">
          <AnimatePresence mode="wait">
            {/* TRAUMA HUB TOPICS */}
            {isTrauma ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6"
              >
                {/* Hero Visual Card */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                      <div className="p-8 bg-orange-50 text-orange-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         {activeTab === 'debridement' ? <Scissors size={48} /> : <Construction size={48} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-orange-600 font-black text-[10px] uppercase tracking-widest">{(TRAUMA_INFECTION_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic tracking-tight">Surgical Science</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(TRAUMA_INFECTION_DATA as any)[activeTab].title}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(TRAUMA_INFECTION_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Maximize2 className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                </div>

                {/* Core Content Matrix */}
                <div className="grid md:grid-cols-2 gap-8">
                   {/* LEFT COLUMN: The Criteria Grid */}
                   <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-orange-400 italic uppercase">
                         <ClipboardList size={22} /> Assessment Matrix
                      </h4>
                      <div className="space-y-3 relative z-10">
                         {activeTab === 'gustilo' && TRAUMA_INFECTION_DATA.gustilo.stages.map((item, i) => (
                           <div key={i} className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                              <span className="font-black text-xs text-orange-400 group-hover:scale-110 transition-transform uppercase tracking-tighter">{item.s}</span>
                              <span className="text-[10px] text-slate-400 font-medium text-right max-w-[180px] italic leading-tight">{item.d}</span>
                           </div>
                         ))}
                         {activeTab === 'debridement' && TRAUMA_INFECTION_DATA.debridement.criteria.map((item, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-all">
                              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-black text-[10px] shrink-0 italic">{item.c[0]}</div>
                              <div>
                                 <h5 className="text-[11px] font-black text-white uppercase">{item.c}</h5>
                                 <p className="text-xs text-slate-400 italic leading-tight">{item.d}</p>
                              </div>
                           </div>
                         ))}
                         {activeTab === 'antibiotics' && TRAUMA_INFECTION_DATA.antibiotics.protocols.map((p, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-orange-400 uppercase tracking-tighter">{p.source}</h5>
                                 {p.source === 'Soil / Farm' ? <Trees size={14} className="text-emerald-500" /> : <Factory size={14} className="text-slate-500" />}
                              </div>
                              <p className="text-[11px] text-white font-bold mb-1 uppercase tracking-tight">{p.rx}</p>
                              <p className="text-[10px] text-slate-400 italic font-medium">{"Target: " + p.target}</p>
                           </div>
                         ))}
                         {activeTab === 'management' && TRAUMA_INFECTION_DATA.management.steps.map((s, i) => (
                           <div key={i} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-black text-[10px] shrink-0">{s.id}</div>
                              <div>
                                 <h5 className="text-[11px] font-black text-white uppercase">{s.name}</h5>
                                 <p className="text-xs text-slate-400 leading-relaxed italic">{s.desc}</p>
                              </div>
                           </div>
                         ))}
                      </div>
                      <Database className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   {/* RIGHT COLUMN: Clinical Decision Logic */}
                   <div className="space-y-6">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                            <Stethoscope size={22} className="text-orange-600" /> Surgical Strategy
                         </h4>
                         <div className="p-6 bg-orange-50 border border-orange-100 rounded-3xl">
                            <p className="text-sm text-orange-900 font-bold leading-relaxed italic text-center">
                              {activeTab === 'gustilo' ? "Inter-observer reliability of Gustilo is low. The final grade is always decided IN THE THEATRE after debridement." : 
                               activeTab === 'debridement' ? "Aggressive debridement means removing all 'dead space'. This may create a gap that needs Masquelet or Ilizarov later." : 
                               activeTab === 'antibiotics' ? "Tetanus prophylaxis is the most neglected but vital step in open fracture management." :
                               "Closing an open fracture under tension is a recipe for disaster. If it doesn't close easily, leave it open and plan a flap."}
                            </p>
                         </div>
                      </div>

                      <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                         <h5 className="text-[10px] font-black text-orange-400 uppercase mb-3 flex items-center gap-2 italic">
                           <Zap size={14} className="text-amber-500" /> Apley Diagnostic Alert
                         </h5>
                         <p className="text-xs font-medium leading-relaxed italic opacity-90">
                            {activeTab === 'gustilo' ? "IIIA vs IIIB is the most important distinction. IIIB requires a flap, meaning a plastic surgeon must be involved early." : 
                             activeTab === 'antibiotics' ? "Farm injuries are notoriously poly-microbial. You MUST cover for Clostridia with high-dose Penicillin." : 
                             "Fixation must be stable. Stable bone allows soft tissues to heal; unstable bone acts as a 'moving piston' that spreads bacteria."}
                         </p>
                         <ShieldAlert size={60} className="absolute top-2 right-2 text-white/5" />
                      </div>
                   </div>
                </div>

                {/* Tropical / Extreme Trauma Area */}
                <div className="bg-orange-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tight">
                           <Droplets size={24} className="text-orange-300" /> The "6-Hour Rule" Myth
                         </h4>
                         <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                            "Modern evidence shows that the quality of debridement and the speed of antibiotic delivery are more important than the absolute '6-hour' surgical window. However, Type III injuries still require urgent intervention to prevent irreversible biofilm formation."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest text-center italic">
                            {"Early Antibiotics > Surgical Speed"}
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isTB ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6"
              >
                {/* Hero Visual Card */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                      <div className="p-8 bg-amber-50 text-amber-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         {activeTab === 'tb_pharma' ? <Pill size={48} /> : <Microscope size={48} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-amber-600 font-black text-[10px] uppercase tracking-widest">{(TB_DATA as any)[activeTab.replace('tb_', '')].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic">Apley Path-Logic</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(TB_DATA as any)[activeTab.replace('tb_', '')].title}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(TB_DATA as any)[activeTab.replace('tb_', '')].pearl}"</p>
                      </div>
                   </div>
                   <Wind className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                </div>

                {/* Core Content Matrix */}
                <div className="grid md:grid-cols-2 gap-8">
                   {/* LEFT COLUMN: Structural Logic */}
                   <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-amber-400 uppercase tracking-tighter italic">
                         <Zap size={22} /> Process Parameters
                      </h4>
                      <div className="space-y-3 relative z-10">
                         {activeTab === 'tb_pathology' && TB_DATA.pathology.steps.map((s) => (
                           <div key={s.id} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                              <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white font-black text-xs shrink-0">{s.id}</div>
                              <div>
                                 <h5 className="text-[11px] font-black text-amber-300 uppercase mb-1">{s.name}</h5>
                                 <p className="text-xs text-slate-400 leading-relaxed font-medium">{s.desc}</p>
                              </div>
                           </div>
                         ))}
                         {activeTab === 'tb_stages' && TB_DATA.stages.levels.map((l, i) => (
                           <div key={i} className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-2xl">
                              <div>
                                 <span className="font-black text-amber-400 text-xs mr-3">{l.s}</span>
                                 <span className="text-xs font-bold text-white uppercase">{l.label}</span>
                              </div>
                              <span className="text-[9px] text-slate-400 font-medium text-right max-w-[150px] italic">{l.desc}</span>
                           </div>
                         ))}
                         {activeTab === 'tb_regional' && TB_DATA.regional.sites.map((site, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                              <h5 className="text-[11px] font-black text-amber-400 uppercase mb-1">{site.name}</h5>
                              <p className="text-xs text-slate-300 leading-relaxed italic">{site.desc}</p>
                           </div>
                         ))}
                         {activeTab === 'tb_pharma' && TB_DATA.pharma.drugs.map((d, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-white uppercase">{d.name}</h5>
                                 <span className="text-[9px] font-black text-red-400 uppercase tracking-widest">Side Effect</span>
                              </div>
                              <p className="text-[10px] text-red-300 mb-1">{d.side}</p>
                              <p className="text-[10px] text-slate-400 leading-relaxed italic font-bold">{"Role: " + d.role}</p>
                           </div>
                         ))}
                      </div>
                      <Database className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   {/* RIGHT COLUMN: Diagnostic & Actions */}
                   <div className="space-y-6">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                            <Stethoscope size={22} className="text-amber-600" /> Clinical Action Plan
                         </h4>
                         <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl">
                            <p className="text-sm text-amber-900 font-bold leading-relaxed italic text-center">
                              {activeTab === 'tb_pathology' ? "A cold abscess tracks where the 'resistance is least'. For the hip, it usually points in the adductor region." : 
                               activeTab === 'tb_pharma' ? "Surgery is rarely needed for Joint TB; it is a medical disease. Only operate if there is neurological deficit or severe deformity." : 
                               "Always confirm diagnosis with GeneXpert or culture from a synovial biopsy before starting 9-12 months of RIPE."}
                            </p>
                         </div>
                         <div className="mt-8 flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                            <Search className="text-slate-400 shrink-0" size={20} />
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-tight">
                               {activeTab === 'tb_stages' ? "X-ray pearl: 'Phemister Triad' is diagnostic of TB joint destruction." : 
                                activeTab === 'tb_regional' ? "Skeletal TB is almost always secondary to a primary pulmonary focus." : 
                                "Mantoux is a test of exposure, not active disease."}
                            </p>
                         </div>
                      </div>

                      <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                         <h5 className="text-[10px] font-black text-amber-400 uppercase mb-3 flex items-center gap-2 italic">
                           <AlertTriangle size={14} className="text-red-500" /> The Phemister Triad
                         </h5>
                         <div className="space-y-2 opacity-90">
                            <div className="flex gap-2 text-[11px]"><span className="text-amber-500">1.</span> Juxta-articular osteoporosis.</div>
                            <div className="flex gap-2 text-[11px]"><span className="text-amber-500">2.</span> Marginal erosions (peripheral destruction).</div>
                            <div className="flex gap-2 text-[11px]"><span className="text-amber-500">3.</span> Gradual joint space narrowing.</div>
                         </div>
                         <Crosshair className="absolute bottom-[-10px] right-[-10px] text-white/5" size={100} />
                      </div>
                   </div>
                </div>

                {/* Molecular Alert Area */}
                <div className="bg-amber-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tight">
                           <Droplets size={24} className="text-amber-300" /> The "Rice Bodies" Phenomenon
                         </h4>
                         <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                            "In chronic TB synovitis, fibrin-coated synovial villi can break off and form thousands of small white particles in the joint fluid. These 'Rice Bodies' are a classic finding in both TB and Rheumatoid Arthritis."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest text-center italic">
                            {"Synovial Biopsy > Aspirate"}
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isStealth ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6"
              >
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                      <div className="p-8 bg-teal-50 text-teal-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         <Microscope size={48} />
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-teal-600 font-black text-[10px] uppercase tracking-widest">{(STEALTH_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic tracking-tight">Specialist Hub</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(STEALTH_DATA as any)[activeTab].title}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(STEALTH_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Database className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                   <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-teal-400 italic">
                         <Binary size={22} /> Diagnostic Features
                      </h4>
                      <div className="space-y-4 relative z-10">
                         {activeTab === 'hiv' && (STEALTH_DATA.hiv.challenges).map((c, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-teal-300 uppercase">{c.name}</h5>
                                 <Activity size={14} className="text-slate-600" />
                              </div>
                              <p className="text-xs text-slate-400 font-medium leading-relaxed">{c.desc}</p>
                           </div>
                         ))}
                         {activeTab === 'spondylitis' && (
                           <div className="space-y-4">
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[10px] font-black text-teal-400 uppercase mb-2">Pathogenesis</h5>
                                 <p className="text-xs leading-relaxed text-slate-300">{STEALTH_DATA.spondylitis.pathology}</p>
                              </div>
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[10px] font-black text-red-400 uppercase mb-2">Apley Differentiator</h5>
                                 <p className="text-xs leading-relaxed text-slate-300">{STEALTH_DATA.spondylitis.distinction}</p>
                              </div>
                           </div>
                         )}
                         {(activeTab === 'brucellosis' || activeTab === 'fungal') && (
                           <div className="space-y-6">
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[10px] font-black text-teal-400 uppercase mb-2">Clinical Key</h5>
                                 <p className="text-xs text-slate-300 leading-relaxed font-medium">{(STEALTH_DATA as any)[activeTab].presentation || (STEALTH_DATA as any)[activeTab].differentiation}</p>
                              </div>
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[10px] font-black text-teal-400 uppercase mb-2">Pathology/Source</h5>
                                 <p className="text-xs text-slate-300 leading-relaxed font-medium">{(STEALTH_DATA as any)[activeTab].transmission || (STEALTH_DATA as any)[activeTab].organisms}</p>
                              </div>
                           </div>
                         )}
                      </div>
                      <Search className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   <div className="space-y-6">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                            <Stethoscope size={22} className="text-teal-600" /> Apley Clinical Focus
                         </h4>
                         <div className="p-6 bg-teal-50 border border-teal-100 rounded-3xl">
                            <p className="text-sm text-teal-900 font-bold leading-relaxed italic text-center">
                              {activeTab === 'spondylitis' ? "Biopsy of the disc space is mandatory for microbiology before starting empiric antibiotics." : 
                               activeTab === 'hiv' ? "A single dose of prophylactic antibiotics is sufficient for standard surgeries, but increase surveillance for wound breakdown." : 
                               activeTab === 'brucellosis' ? "Treatment requires combination therapy (Doxycycline + Rifampicin) for a minimum of 6-12 weeks." : 
                               "Fungal bone infection is a marker of profound systemic failure; assess the host's overall immunity."}
                            </p>
                         </div>
                      </div>

                      <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                         <h5 className="text-[10px] font-black text-teal-400 uppercase mb-3 flex items-center gap-2 italic">
                           <AlertTriangle size={14} className="text-amber-500" /> Diagnostic Pearl
                         </h5>
                         <p className="text-xs font-medium leading-relaxed italic opacity-90">
                            {activeTab === 'spondylitis' ? "The 'Disc Sign': Tumours spare the disc because they respect the anatomical boundaries. Infection crosses them via proteolytic enzymes." : 
                             activeTab === 'brucellosis' ? "The Rose-Bengal test is the classic rapid screening test. Positive titres (>1:160) are diagnostic in the right clinical context." : 
                             "Charcot Arthropathy in HIV patients can be mistaken for infection. Check inflammatory markers; they are often low in Charcot."}
                         </p>
                         <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                      </div>
                   </div>
                </div>

                <div className="bg-teal-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tight">
                           <Thermometer size={24} className="text-teal-300" /> The "Cold" Abscess
                         </h4>
                         <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                            "In both Brucellosis and TB, abscesses can form without the classic signs of inflammation (warmth/redness). These 'cold abscesses' can track through psoas or fascial planes and present far from the site of origin."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest text-center italic">
                            {"Serology > Routine Culture"}
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isSoftTissue ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6"
              >
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                      <div className="p-8 bg-orange-50 text-orange-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         {activeTab === 'clostridial' ? <Flame size={48} /> : <Hand size={48} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-orange-600 font-black text-[10px] uppercase tracking-widest">{(SOFT_TISSUE_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic tracking-tight">Clinical Compendium</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(SOFT_TISSUE_DATA as any)[activeTab].title}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(SOFT_TISSUE_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Activity className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                   <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-orange-400 italic">
                         <Zap size={22} /> Process Logic
                      </h4>
                      <div className="space-y-4 relative z-10">
                         {activeTab === 'handSpaces' && SOFT_TISSUE_DATA.handSpaces.areas.map((area, i) => (
                           <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-3xl group hover:bg-white/10 transition-all">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-orange-400 uppercase italic">{area.name}</h5>
                                 <Layers size={14} className="text-slate-600" />
                              </div>
                              <p className="text-[9px] text-slate-400 uppercase font-black mb-1 tracking-widest">{area.boundary}</p>
                              <p className="text-[11px] text-slate-300 font-medium leading-relaxed italic">{area.desc}</p>
                           </div>
                         ))}
                         {activeTab === 'bites' && SOFT_TISSUE_DATA.bites.types.map((bite, i) => (
                           <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-white uppercase italic">{bite.source}</h5>
                                 <Bug size={14} className="text-orange-500" />
                              </div>
                              <p className="text-[10px] font-black text-orange-400 italic mb-2 tracking-widest">{bite.bug}</p>
                              <p className="text-[11px] text-slate-400 leading-relaxed font-bold italic">{"Treatment: " + bite.rx}</p>
                              <p className="text-[10px] text-slate-500 mt-2 italic font-medium">{bite.pearl}</p>
                           </div>
                         ))}
                         {activeTab === 'clostridial' && (
                           <div className="space-y-4">
                              <div className="p-6 bg-orange-600/10 border border-orange-500/30 rounded-3xl">
                                 <h5 className="text-[9px] font-black text-orange-400 uppercase mb-2 italic">Bacterial Signature</h5>
                                 <p className="text-xl font-black italic text-white tracking-tighter uppercase">{SOFT_TISSUE_DATA.clostridial.organism}</p>
                              </div>
                              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[9px] font-black text-slate-500 uppercase mb-2 italic tracking-widest">Diagnostic Hallmarks</h5>
                                 <p className="text-[11px] text-slate-300 leading-relaxed font-medium italic">{SOFT_TISSUE_DATA.clostridial.hallmark}</p>
                              </div>
                           </div>
                         )}
                         {activeTab === 'fingertip' && (
                           <div className="space-y-6 p-4">
                              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                                 <h5 className="text-[9px] font-black text-orange-400 uppercase mb-1 italic">Felon</h5>
                                 <p className="text-[11px] text-slate-300 font-medium leading-relaxed italic">{SOFT_TISSUE_DATA.fingertip.felon}</p>
                              </div>
                              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                                 <h5 className="text-[9px] font-black text-orange-400 uppercase mb-1 italic">Paronychia</h5>
                                 <p className="text-[11px] text-slate-300 font-medium leading-relaxed italic">{SOFT_TISSUE_DATA.fingertip.paronychia}</p>
                              </div>
                              <div className="p-4 bg-orange-900/30 border border-orange-500/30 rounded-2xl text-orange-300 font-black text-[10px] italic text-center uppercase tracking-widest">
                                 {SOFT_TISSUE_DATA.fingertip.kanavel}
                              </div>
                           </div>
                         )}
                      </div>
                      <Wind className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   <div className="space-y-6">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                            <Scissors size={22} className="text-orange-600" /> Surgical Directive
                         </h4>
                         <div className="p-6 bg-orange-50 border border-orange-100 rounded-3xl">
                            <p className="text-[11px] text-orange-900 font-bold leading-relaxed italic text-center">
                              {activeTab === 'clostridial' ? "Immediate surgical debridement of all non-contractile muscle. Speed saves the limb and the life." : 
                               activeTab === 'bites' ? "Never primary close a bite wound. Irrigate copiously and leave open for secondary intention or delayed closure." : 
                               "Mid-axial incisions are used for deep spaces to ensure adequate drainage while protecting the nerves."}
                            </p>
                         </div>
                         <div className="mt-8 flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                            <Stethoscope className="text-slate-400 shrink-0" size={20} />
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-tight italic">
                               {activeTab === 'handSpaces' ? "A 'horseshoe abscess' connects the little finger and the thumb bursa." : 
                                activeTab === 'bites' ? "Eikenella is notoriously resistant to Clindamycin/Flucloxacillin." : 
                                "If the fingertip is pale, the pressure of a Felon has already compromised the blood supply."}
                            </p>
                         </div>
                      </div>

                      <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                         <h5 className="text-[9px] font-black text-orange-400 uppercase mb-3 flex items-center gap-2 italic">
                           <AlertTriangle size={14} className="text-amber-500" /> Apley Diagnostic Alert
                         </h5>
                         <p className="text-xs font-medium leading-relaxed italic opacity-90">
                            {activeTab === 'bites' ? "A punch to the mouth (Fight Bite) leads to Eikenella seeding the joint. This is a surgical emergency, not a simple 'cut'." : 
                             activeTab === 'clostridial' ? "Bronze discoloration of skin and malodorous bullae are LATE signs. Diagnosis must be made in the early painful phase." : 
                             "Always radiograph a hand infection to check for a foreign body (e.g., a splinter or tooth) or gas."}
                         </p>
                         <ShieldAlert className="absolute top-4 right-4 text-white/5" size={60} />
                      </div>
                   </div>
                </div>

                <div className="bg-orange-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tight">
                           <Droplets size={24} className="text-orange-300" /> The "Dishwater" Sign
                         </h4>
                         <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                            "In both Necrotizing Fasciitis and Gas Gangrene, the appearance of thin, foul-smelling 'dishwater' fluid during exploration confirms the diagnosis. Fascial planes will separate without resistance. Stop imaging and start cutting."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest text-center italic">
                            Loss of Fascial Resistance
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isForensic ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6"
              >
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                      <div className="p-8 bg-indigo-50 text-indigo-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         {activeTab === 'molecular' ? <Binary size={48} /> : <FlaskConical size={48} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-indigo-600 font-black text-[10px] uppercase tracking-widest">{(FORENSIC_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic tracking-tight">Molecular Science</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(FORENSIC_DATA as any)[activeTab].title}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(FORENSIC_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Beaker className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                   <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-indigo-400 italic">
                         <Zap size={22} /> Lab Parameters
                      </h4>
                      <div className="space-y-4 relative z-10">
                         {activeTab === 'markers' && FORENSIC_DATA.markers.data.map((item, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-white uppercase">{item.name}</h5>
                                 <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">{item.peak}</span>
                              </div>
                              <p className="text-[11px] text-slate-400 font-medium italic leading-relaxed">{item.use}</p>
                           </div>
                         ))}
                         {activeTab === 'msis' && (
                           <div className="space-y-6">
                              <div className="p-5 bg-white/10 border border-white/20 rounded-3xl">
                                 <h5 className="text-[9px] font-black text-red-400 uppercase mb-3 tracking-widest italic">Major Criteria (Diagnostic)</h5>
                                 <ul className="space-y-2">
                                    {FORENSIC_DATA.msis.major.map((m, idx) => <li key={idx} className="text-[11px] font-bold text-slate-200 flex gap-2"><span>•</span> {m}</li>)}
                                 </ul>
                              </div>
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[9px] font-black text-indigo-400 uppercase mb-3 tracking-widest italic">Minor Criteria (Scored)</h5>
                                 <ul className="grid grid-cols-1 gap-2">
                                    {FORENSIC_DATA.msis.minor.map((m, idx) => <li key={idx} className="text-[10px] font-medium text-slate-400 flex gap-2"><span>•</span> {m}</li>)}
                                 </ul>
                              </div>
                           </div>
                         )}
                         {activeTab === 'molecular' && FORENSIC_DATA.molecular.tests.map((test, i) => (
                           <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                              <h5 className="text-[11px] font-black text-white uppercase mb-1">{test.name}</h5>
                              <p className="text-[11px] text-slate-400 leading-relaxed font-medium italic">{test.desc}</p>
                           </div>
                         ))}
                         {activeTab === 'sonication' && (
                           <div className="space-y-6 p-4">
                              <div className="flex gap-4 items-start">
                                 <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white shrink-0 font-black text-xs">1</div>
                                 <p className="text-[11px] text-slate-300 font-medium leading-relaxed italic">{FORENSIC_DATA.sonication.process}</p>
                              </div>
                              <div className="flex gap-4 items-start">
                                 <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white shrink-0 font-black text-xs">2</div>
                                 <p className="text-[11px] text-slate-300 font-medium leading-relaxed italic">{FORENSIC_DATA.sonication.effect}</p>
                              </div>
                              <div className="p-4 bg-emerald-900/40 border border-emerald-500/30 rounded-2xl text-emerald-300 font-black text-xs italic text-center uppercase tracking-widest">
                                 {FORENSIC_DATA.sonication.result}
                              </div>
                           </div>
                         )}
                      </div>
                      <TestTube className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   <div className="space-y-6">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                            <Stethoscope size={22} className="text-indigo-600" /> Clinical Action Plan
                         </h4>
                         <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl">
                            <p className="text-[11px] text-indigo-900 font-bold leading-relaxed italic text-center">
                              {activeTab === 'markers' ? "Never interpret a single ESR/CRP value in isolation. Trend them every 48 hours to judge the efficacy of debridement." : 
                               activeTab === 'msis' ? "If you find a sinus tract, you have your diagnosis. Do not wait for cultures to initiate the surgical plan." : 
                               activeTab === 'sonication' ? "The 'sonicate fluid' should be cultured for 14 days to catch slow-growing anaerobes like C. acnes." :
                               "PCR is excellent for ruling infection OUT, but be wary of false positives due to environmental DNA."}
                            </p>
                         </div>
                      </div>

                      <div className="p-8 bg-indigo-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-indigo-800">
                         <h5 className="text-[9px] font-black text-indigo-300 uppercase mb-3 flex items-center gap-2 italic">
                           <AlertTriangle size={14} className="text-amber-500" /> Apley Diagnostic Alert
                         </h5>
                         <p className="text-xs font-medium leading-relaxed italic opacity-90">
                            {activeTab === 'markers' ? "Procalcitonin is the most expensive but most specific marker for bacterial sepsis. Use it when systemic SIRS is suspected." : 
                             activeTab === 'molecular' ? "The Alpha-Defensin lateral flow test is the 'pregnancy test' of orthopaedic infection. Fast, reliable, and intra-operative." : 
                             "Bacteria in a biofilm are in a 'persister' state; they don't divide, which is why conventional culture broth often fails to grow them."}
                         </p>
                      </div>
                   </div>
                </div>

                <div className="bg-indigo-950 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tight">
                           <Dna size={24} className="text-indigo-400" /> The Era of metagenomics
                         </h4>
                         <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                            "We are moving from 'What will grow?' to 'What DNA is present?'. Metagenomic Next-Gen Sequencing (mNGS) can identify every organism in a sample, helping us solve the mystery of 'culture-negative' prosthetic joint infection."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest text-center italic">
                            DNA &gt; Growth
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isAtypicalGlobal ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6"
              >
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                      <div className="p-8 bg-blue-50 text-blue-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         {activeTab === 'pharma' ? <Pill size={48} /> : <Microscope size={48} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-blue-600 font-black text-[10px] uppercase tracking-widest">{(ATYPICAL_GLOBAL_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic tracking-tight">Global Research Hub</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(ATYPICAL_GLOBAL_DATA as any)[activeTab].title}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(ATYPICAL_GLOBAL_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Globe className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                   <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-blue-400 italic">
                         <Zap size={22} /> {activeTab === 'pharma' ? "Antibiotic Profiles" : "Pathological Hallmark"}
                      </h4>
                      <div className="space-y-4 relative z-10">
                         {activeTab === 'pharma' ? (
                           ATYPICAL_GLOBAL_DATA.pharma.agents.map((agent, i) => (
                             <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                <div className="flex justify-between items-center mb-1">
                                   <h5 className="text-[11px] font-black text-white uppercase">{agent.name}</h5>
                                   <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">{agent.role}</span>
                                </div>
                                <p className="text-[11px] text-slate-400 leading-relaxed italic font-medium">{agent.logic}</p>
                             </div>
                           ))
                         ) : activeTab === 'mycetoma' ? (
                           <div className="space-y-3">
                              <p className="text-[9px] font-black uppercase text-blue-400 mb-4 tracking-widest italic">Diagnostic Triad</p>
                              {ATYPICAL_GLOBAL_DATA.mycetoma.triad.map((t, i) => (
                                 <div key={i} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                                    <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-[10px] font-black shrink-0">{i+1}</div>
                                    <p className="text-xs font-bold text-slate-200 italic">{t}</p>
                                 </div>
                              ))}
                           </div>
                         ) : (
                           <div className="space-y-6">
                              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                                 <h5 className="text-[9px] font-black text-blue-400 uppercase mb-2 italic">Key Features</h5>
                                 <p className="text-[11px] text-slate-300 leading-relaxed font-medium italic">{(ATYPICAL_GLOBAL_DATA as any)[activeTab].features || (ATYPICAL_GLOBAL_DATA as any)[activeTab].bone_impact}</p>
                              </div>
                              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                                 <h5 className="text-[9px] font-black text-blue-400 uppercase mb-2 italic">Diagnostic Key</h5>
                                 <p className="text-[11px] text-slate-300 leading-relaxed font-medium italic">{(ATYPICAL_GLOBAL_DATA as any)[activeTab].biopsy || (ATYPICAL_GLOBAL_DATA as any)[activeTab].signs?.join(', ')}</p>
                              </div>
                           </div>
                         )}
                      </div>
                      <Dna className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   <div className="space-y-6">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                            <Stethoscope size={22} className="text-blue-600" /> Surgical / Medical Strategy
                         </h4>
                         <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl">
                            <p className="text-[11px] text-blue-900 font-bold leading-relaxed italic text-center">
                              {activeTab === 'crmo' ? "Diagnosis of exclusion. Rule out malignancy (Leukemia/Ewing's) first." : 
                               activeTab === 'leprosy' ? "Treatment is MDT (Multi-drug therapy) + Surgical reconstruction for claw hands/foot drop." : 
                               activeTab === 'mycetoma' ? "Eumycetoma (Fungal) has a 50% recurrence rate; amputation is often necessary in late stages." : 
                               "Oral step-down is possible if the agent has >90% bioavailability (e.g. Quinolones)."}
                            </p>
                         </div>
                      </div>

                      <div className="bg-slate-900 text-white p-8 rounded-[3rem] relative overflow-hidden shadow-xl border border-blue-900">
                         <h5 className="text-[9px] font-black text-blue-400 uppercase mb-3 flex items-center gap-2 italic">
                           <AlertTriangle size={14} className="text-amber-500" /> Apley Global Warning
                         </h5>
                         <p className="text-xs font-medium leading-relaxed italic opacity-90">
                            {activeTab === 'crmo' ? "Never start long-term steroids or NSAIDs for CRMO until you are 100% sure the culture is negative." : 
                             activeTab === 'leprosy' ? "The primary surgeon for leprosy is often the rehabilitation specialist. Prevention of ulcers is the goal." : 
                             activeTab === 'pharma' ? "Rifampicin MUST NOT be used alone. If used as monotherapy, bacteria will develop resistance within 72 hours." :
                             "Think beyond common pathogens in patients with significant travel history."}
                         </p>
                         <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                      </div>
                   </div>
                </div>

                <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tight">
                           <Crosshair size={24} className="text-blue-300" /> The "Culture-Negative" Protocol
                         </h4>
                         <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                            "When clinical signs point to infection but standard cultures are negative, expand your search: 1. Fungal (Sabouraud agar), 2. Mycobacteria (Lowenstein-Jensen), 3. Molecular (PCR for 16S rRNA)."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest text-center italic">
                            Think Beyond Bacteria
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isAdvanced ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6"
              >
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                      <div className="p-6 bg-purple-50 text-purple-600 rounded-3xl shadow-inner transition-all group-hover:rotate-6">
                         {activeTab === 'masquelet' ? <Scissors size={32} /> : <Microscope size={32} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-purple-600 font-black text-[10px] uppercase tracking-widest">{(ADV_INFECTION_DATA as any)[activeTab].niche}</span>
                           <div className="w-1 h-1 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Surgical Science</span>
                         </div>
                         <h3 className="text-2xl font-black text-slate-800 tracking-tighter mb-2 italic">{(ADV_INFECTION_DATA as any)[activeTab].title}</h3>
                         <p className="text-sm text-slate-500 font-medium leading-relaxed italic">"{(ADV_INFECTION_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Wind className="absolute bottom-[-40px] right-[-40px] text-slate-50 opacity-40 rotate-12" size={240} />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                   <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                      <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-purple-400 italic">
                         <Zap size={18} /> Process Logic
                      </h4>
                      <div className="space-y-3 relative z-10">
                         {activeTab === 'biofilm' && ADV_INFECTION_DATA.biofilm.stages.map((s) => (
                           <div key={s.id} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all">
                              <div className="w-6 h-6 rounded-lg bg-purple-600 flex items-center justify-center text-white font-black text-[10px] shrink-0">{s.id}</div>
                              <div>
                                 <h5 className="text-[9px] font-black text-purple-300 uppercase mb-1">{s.name}</h5>
                                 <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">{s.desc}</p>
                              </div>
                           </div>
                         ))}
                         {activeTab === 'masquelet' && (
                           <div className="space-y-3">
                              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                 <h5 className="text-[9px] font-black text-purple-400 uppercase mb-2">Stage 1</h5>
                                 <p className="text-[10px] leading-relaxed text-slate-300 italic">{ADV_INFECTION_DATA.masquelet.step1}</p>
                              </div>
                              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                 <h5 className="text-[9px] font-black text-purple-400 uppercase mb-2">Stage 2</h5>
                                 <p className="text-[10px] leading-relaxed text-slate-300 italic">{ADV_INFECTION_DATA.masquelet.step2}</p>
                              </div>
                           </div>
                         )}
                         {activeTab === 'carriers' && ADV_INFECTION_DATA.carriers.types.map((t, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                              <div className="flex justify-between items-center mb-2">
                                 <h5 className="text-[10px] font-black text-white uppercase italic">{t.name}</h5>
                                 <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest">{t.type}</span>
                              </div>
                              <p className="text-[10px] text-slate-400 leading-relaxed italic"><span className="text-emerald-400 font-bold">Pro:</span> {t.pro}</p>
                              <p className="text-[10px] text-slate-400 leading-relaxed mt-1 italic"><span className="text-red-400 font-bold">Con:</span> {t.con}</p>
                           </div>
                         ))}
                         {activeTab === 'imaging' && (
                           <div className="space-y-3">
                              {ADV_INFECTION_DATA.imaging.tests.map((t, i) => (
                                <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                   <h5 className="text-[10px] font-black text-purple-400 uppercase mb-1 italic">{t.name}</h5>
                                   <p className="text-[10px] text-slate-400 leading-relaxed italic font-medium">{t.use}</p>
                                </div>
                              ))}
                           </div>
                         )}
                         {activeTab === 'brodies' && (
                           <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                              <p className="text-[10px] text-slate-300 leading-relaxed italic"><span className="text-purple-400 font-black uppercase block text-[9px] mb-1">Features</span> {ADV_INFECTION_DATA.brodies.features}</p>
                              <p className="text-[10px] text-slate-300 leading-relaxed italic"><span className="text-purple-400 font-black uppercase block text-[9px] mb-1">Radiology</span> {ADV_INFECTION_DATA.brodies.imaging}</p>
                              <p className="text-[10px] text-slate-300 leading-relaxed italic"><span className="text-purple-400 font-black uppercase block text-[9px] mb-1">Pathology</span> {ADV_INFECTION_DATA.brodies.pathology}</p>
                           </div>
                         )}
                      </div>
                   </div>

                   <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
                      <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                         <Stethoscope size={18} className="text-purple-600" /> Advanced Diagnostic Note
                      </h4>
                      <div className="flex-1 space-y-4">
                         <div className="p-5 bg-purple-50 border border-purple-100 rounded-2xl">
                            <p className="text-xs text-purple-900 font-bold leading-relaxed italic">
                              {activeTab === 'masquelet' ? ADV_INFECTION_DATA.masquelet.biology : 
                               activeTab === 'biofilm' ? "The physiological state of the cell changes from metabolic 'active' to 'dormant' in the biofilm, rendering antibiotics like penicillins ineffective." :
                               "The choice of carrier/test depends on whether you are managing the soft tissue, the structural bone, or the patient's comorbidities."}
                            </p>
                         </div>
                         <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100">
                            <h5 className="text-[9px] font-black text-amber-600 uppercase mb-2 tracking-widest">Critical Strategy</h5>
                            <p className="text-[11px] font-bold text-amber-950 leading-relaxed italic">
                               {activeTab === 'biofilm' ? "Biofilm removal requires MECHANICAL disruption (scrubbing/reaming); antibiotics alone will never sterilize a surface." :
                                activeTab === 'imaging' ? "Triple phase scans are negative? You can almost certainly rule out infection." :
                                activeTab === 'masquelet' ? "Always ensure an anabolic state (Nutrition/Smoking cessation) before Stage 2." :
                                "Surgical debridement is required if the abscess fails to respond to antibiotics or structural stability is needed."}
                            </p>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="bg-purple-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                      <div className="md:w-2/3">
                         <h4 className="text-xl font-black mb-3 flex items-center gap-3 italic">
                           <AlertTriangle size={20} className="text-purple-400" /> The Quorum Sensing Danger
                         </h4>
                         <p className="text-xs text-slate-300 leading-relaxed italic">
                            "When bacteria reach a critical density on a prosthesis, they coordinate. This isn't just an infection; it's a structural failure of the material-host interface. If Quorum Sensing has occurred, DAIR (Debridement) is likely to fail."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                         <div className="px-6 py-3 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest group-hover:bg-white/20 transition-colors">
                            Mechanical Debridement &gt; Antibiotics
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isDifferential ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6"
              >
                <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                      <div className="p-8 bg-emerald-50 text-emerald-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:rotate-6 duration-500">
                         {activeTab === 'crystals' ? <FlaskConical size={40} /> : activeTab === 'nonunion' ? <Binary size={40} /> : <Target size={40} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-emerald-600 font-black text-[10px] uppercase tracking-widest">{(MIMIC_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic tracking-tight">Differential Lab</span>
                         </div>
                         <h3 className="text-2xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(MIMIC_DATA as any)[activeTab].title}</h3>
                         <p className="text-sm text-slate-500 font-medium leading-relaxed italic">"{(MIMIC_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Activity className="absolute bottom-[-50px] right-[-50px] text-slate-50 opacity-40 rotate-[30deg]" size={300} />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                   <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-emerald-400 italic">
                         <ClipboardList size={20} /> {activeTab === 'crystals' ? "Laboratory Comparison" : "Clinical Parameters"}
                      </h4>
                      <div className="space-y-4 relative z-10">
                         {activeTab === 'crystals' ? (
                            <div className="overflow-x-auto">
                              <table className="w-full text-left text-[10px]">
                                 <thead>
                                    <tr className="border-b border-white/10">
                                       <th className="py-2 px-2 font-black text-slate-500 uppercase">Feature</th>
                                       <th className="py-2 px-2 font-black text-red-400 uppercase">Septic</th>
                                       <th className="py-2 px-2 font-black text-emerald-400 uppercase">Gout</th>
                                    </tr>
                                 </thead>
                                 <tbody className="divide-y divide-white/5">
                                    {MIMIC_DATA.crystals.comparison.map((row, i) => (
                                      <tr key={i} className="hover:bg-white/5">
                                         <td className="py-2.5 px-2 font-medium text-slate-400">{row.feature}</td>
                                         <td className="py-2.5 px-2 font-bold text-white">{row.septic}</td>
                                         <td className="py-2.5 px-2 font-bold text-white">{row.gout}</td>
                                      </tr>
                                    ))}
                                 </tbody>
                              </table>
                            </div>
                         ) : activeTab === 'nonunion' ? (
                            <div className="space-y-3">
                               <p className="text-[9px] font-black uppercase text-emerald-400 mb-4 tracking-widest italic">The Diamond Concept</p>
                               {MIMIC_DATA.nonunion.diamond_concept.map((el, i) => (
                                  <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                     <h5 className="text-[9px] font-black text-white uppercase mb-1">{el.element}</h5>
                                     <p className="text-[10px] text-slate-400 font-medium italic">{el.desc}</p>
                                  </div>
                               ))}
                            </div>
                         ) : (
                            <div className="space-y-6">
                               <p className="text-[11px] text-slate-300 leading-relaxed italic font-medium">{(MIMIC_DATA as any)[activeTab].features}</p>
                               <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                                  <h5 className="text-[9px] font-black text-emerald-400 uppercase mb-2">Diagnostic Key</h5>
                                  <p className="text-[10px] text-slate-400 italic">{(MIMIC_DATA as any)[activeTab].imaging || (MIMIC_DATA as any)[activeTab].differentiation || (MIMIC_DATA as any)[activeTab].clinical}</p>
                               </div>
                            </div>
                         )}
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                            <Stethoscope size={20} className="text-emerald-600" /> Surgical / Medical Strategy
                         </h4>
                         <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl">
                            <p className="text-[11px] text-emerald-900 font-bold leading-relaxed italic text-center">
                              {activeTab === 'nonunion' ? MIMIC_DATA.nonunion.strategy : activeTab === 'crystals' ? "Aspirate first. If Gout is confirmed but WBC is high, treat as Septic until cultures are negative." : "Multidisciplinary management (Pain team, Neurology, Rehab)."}
                            </p>
                         </div>
                         <div className="mt-8 flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                            <Zap className="text-amber-500 shrink-0" size={18} />
                            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tight leading-tight italic">
                               {activeTab === 'crps' ? "Avoid prolonged immobilization; early ROM is key to recovery." : 
                                activeTab === 'garres' ? "Usually self-limiting but may require decortication for pain relief." : 
                                "Mechanical stability is essential for eradication of infection in non-unions."}
                            </p>
                         </div>
                      </div>

                      <div className="p-8 bg-emerald-900 text-white rounded-[2.5rem] relative overflow-hidden shadow-xl border border-emerald-800">
                         <h5 className="text-[9px] font-black text-emerald-300 uppercase mb-3 tracking-widest italic">Apley Surgical Pearl</h5>
                         <p className="text-[11px] font-medium leading-relaxed italic opacity-90">
                            {activeTab === 'nonunion' ? "In an infected non-union, external fixation (Ilizarov) provides stability while allowing soft-tissue access." : 
                             activeTab === 'crystals' ? "Pseudo-gout (CPPD) in the knee often mimics a meniscal tear + infection combo. Check the meniscus on MRI for calcification." : 
                             "Sudek's Atrophy (CRPS) is a diagnosis of exclusion. Never label a patient with CRPS until infection and hardware failure are ruled out."}
                         </p>
                         <ShieldAlert className="absolute top-2 right-2 text-white/5" size={60} />
                      </div>
                   </div>
                </div>

                <div className="bg-red-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tight">
                           <AlertTriangle size={24} className="text-red-400" /> The "Sterile Pus" Mystery
                         </h4>
                         <p className="text-xs text-slate-300 leading-relaxed italic">
                            "When aspirating a joint with high WBCs but negative cultures, consider: 1. Previous antibiotic use, 2. Fastidious organisms (Gonococcus, TB, Brucella), or 3. Inflammatory mimics like Reiters or Rheumatoid Arthritis."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                         <div className="px-6 py-3 bg-white/10 border border-white/20 rounded-full font-black text-[9px] uppercase tracking-widest text-center italic">
                            Negative Culture ≠ No Infection
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isEmergency ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                      <div className="p-8 bg-red-50 text-red-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105">
                         <AlertTriangle size={40} />
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-red-600 font-black text-[10px] uppercase tracking-widest">{(REGIONAL_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic tracking-tight">Emergency Protocol</span>
                         </div>
                         <h3 className="text-2xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(REGIONAL_DATA as any)[activeTab].title}</h3>
                         <p className="text-sm text-slate-500 font-medium leading-relaxed italic">"{(REGIONAL_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <ShieldAlert className="absolute bottom-[-50px] right-[-50px] text-slate-50 opacity-40 rotate-12" size={300} />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                   <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-red-400 italic">
                         <ClipboardList size={20} /> Diagnostic Matrix
                      </h4>
                      <div className="space-y-3">
                         {activeTab === 'kanavel' && (REGIONAL_DATA.kanavel.signs).map((s, i) => (
                           <div key={i} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all">
                              <div className="w-6 h-6 rounded bg-red-600 flex items-center justify-center text-[10px] font-black shrink-0">{i+1}</div>
                              <div>
                                 <h5 className="text-[10px] font-black text-red-400 uppercase mb-0.5">{s.name}</h5>
                                 <p className="text-[11px] text-slate-300 font-medium leading-relaxed italic">{s.desc}</p>
                              </div>
                           </div>
                         ))}
                         {activeTab === 'wagner' && (REGIONAL_DATA.wagner.stages).map((s, i) => (
                           <div key={i} className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-2xl">
                              <span className="font-black text-xs text-white uppercase italic">{s.s}</span>
                              <span className="text-[10px] text-slate-400 font-medium text-right max-w-[160px] italic">{s.d}</span>
                           </div>
                         ))}
                         {activeTab === 'lrinec' && (REGIONAL_DATA.lrinec.criteria).map((c, i) => (
                           <div key={i} className="flex justify-between items-center p-3.5 bg-white/5 border border-white/10 rounded-xl">
                              <span className="font-black text-xs text-slate-200">{c.name}</span>
                              <span className="text-[10px] text-red-400 font-bold uppercase italic">{c.detail}</span>
                           </div>
                         ))}
                         {activeTab === 'atypical' && (
                           <div className="space-y-4">
                              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                                 <h5 className="text-[10px] font-black text-blue-400 uppercase mb-2 italic">Syphilis Pathology</h5>
                                 <p className="text-[11px] text-slate-300 leading-relaxed italic">{REGIONAL_DATA.atypical.syphilis}</p>
                              </div>
                              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                                 <h5 className="text-[10px] font-black text-emerald-400 uppercase mb-2 italic">Brucellosis Pathology</h5>
                                 <p className="text-[11px] text-slate-300 leading-relaxed italic">{REGIONAL_DATA.atypical.brucellosis}</p>
                              </div>
                           </div>
                         )}
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                            <Scissors size={20} className="text-red-600" /> Surgical Strategy
                         </h4>
                         <div className="p-6 bg-red-50 border border-red-100 rounded-3xl">
                            <p className="text-[11px] text-red-900 font-bold leading-relaxed italic text-center">
                              "{(REGIONAL_DATA as any)[activeTab].action || (activeTab === 'wagner' ? "Grade 3 requires hospitalization and urgent debridement." : "Immediate surgical consultation is mandatory.")}"
                            </p>
                         </div>
                         <div className="mt-6 space-y-4">
                            <div className="flex gap-4 items-start">
                               <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><Info size={14}/></div>
                               <p className="text-[10px] text-slate-500 font-medium italic">
                                 {activeTab === 'kanavel' ? "Mid-axial incision is preferred to protect the neurovascular bundle." : 
                                  activeTab === 'lrinec' ? "If necrotizing fasciitis is suspected, DO NOT wait for imaging. Take to theatre." : 
                                  "Multidisciplinary team involves vascular surgery, podiatry, and infectious disease."}
                               </p>
                            </div>
                         </div>
                      </div>

                      <div className="bg-slate-900 text-white p-6 rounded-[2.5rem] relative overflow-hidden border border-white/5 shadow-xl">
                         <div className="relative z-10">
                            <h5 className="text-[10px] font-black text-red-400 uppercase mb-3 flex items-center gap-2 italic">
                              <Zap size={14} /> Diagnostic Pearl
                            </h5>
                            <p className="text-[11px] text-slate-300 leading-relaxed italic font-medium">
                              {activeTab === 'lrinec' ? "Subcutaneous air (Crepitus) on X-ray is pathognomonic but only present in 30% of cases." : 
                               activeTab === 'wagner' ? "Osteomyelitis in diabetes often has no fever or high WBC; look for the 'Probe-to-Bone' test." : 
                               activeTab === 'kanavel' ? "A horseshoe abscess can spread from the little finger to the thumb via the mid-palmar space." :
                               "Always maintain a high index of suspicion in high-risk patients with chronic bone lesions."}
                            </p>
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isComplex ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Hero Summary */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                      <div className="p-6 bg-red-50 text-red-600 rounded-3xl shadow-inner transition-transform group-hover:scale-105">
                         <Microscope size={32} />
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-red-600 font-black text-[10px] uppercase tracking-widest">{(INFECTION_DATA as any)[activeTab].niche}</span>
                           <div className="w-1 h-1 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic tracking-tight">Active Module</span>
                         </div>
                         <h3 className="text-2xl font-black text-slate-800 tracking-tighter mb-2 italic">{(INFECTION_DATA as any)[activeTab].title}</h3>
                         <p className="text-sm text-slate-500 font-medium leading-relaxed italic">"{(INFECTION_DATA as any)[activeTab].pearl || (INFECTION_DATA as any)[activeTab].logic || (INFECTION_DATA as any)[activeTab].clinical}"</p>
                      </div>
                   </div>
                   <ShieldAlert className="absolute bottom-[-40px] right-[-40px] text-slate-50 opacity-40" size={240} />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                   {/* Diagnostic Matrix Column */}
                   <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                      <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-red-400 italic">
                         <ClipboardList size={18} /> {activeTab === 'septic' ? "Kocher Criteria" : "Pathogenesis & Features"}
                      </h4>
                      <div className="space-y-3 relative z-10">
                        {activeTab === 'septic' ? (
                          (INFECTION_DATA.septic.kocher).map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-3.5 bg-white/5 border border-white/10 rounded-2xl">
                               <div className="w-6 h-6 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-[10px]">{i + 1}</div>
                               <p className="text-[11px] font-bold italic">{item}</p>
                            </div>
                          ))
                        ) : activeTab === 'pji' ? (
                          (INFECTION_DATA.pji.classification).map((item, i) => (
                            <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                               <h5 className="text-[9px] font-black text-red-400 uppercase mb-1">{item.type} ({item.timing})</h5>
                               <p className="text-[11px] font-bold text-white italic">{item.mode}</p>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                             <p className="text-xs text-slate-400 leading-relaxed font-medium italic">
                                {(INFECTION_DATA as any)[activeTab].pathology || (INFECTION_DATA as any)[activeTab].features}
                             </p>
                          </div>
                        )}
                        {activeTab === 'potts' && (
                           <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                              <h5 className="text-[9px] font-black text-red-400 uppercase mb-1">Abscess Trajectory</h5>
                              <p className="text-[11px] font-bold text-white italic">{INFECTION_DATA.potts.abscess}</p>
                           </div>
                        )}
                      </div>
                   </div>

                   {/* Management Column */}
                   <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
                      <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                         <Zap size={18} className="text-amber-500" /> Clinical Management
                      </h4>
                      <div className="flex-1 space-y-4">
                         <div className="p-5 bg-amber-50 border border-amber-100 rounded-2xl">
                            <p className="text-xs text-amber-900 font-bold leading-relaxed italic">
                              "{(INFECTION_DATA as any)[activeTab].pearl || "Referral for multi-disciplinary management is mandatory."}"
                            </p>
                         </div>
                         <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                            <h5 className="text-[9px] font-black text-slate-400 uppercase mb-2 tracking-widest">Management Directive</h5>
                            <p className="text-[11px] font-bold text-slate-700 leading-relaxed italic">
                              {activeTab === 'septic' ? "Emergency arthrotomy and joint irrigation." : 
                               activeTab === 'aho' ? "IV Antibiotics for 4-6 weeks; surgical drainage if abscess present." : 
                               activeTab === 'pji' ? "Strict biofilm management protocol (2-stage exchange vs DAIR)." :
                               "Prolonged anti-TB chemotherapy + structural stabilization if kyphosis > 40°."}
                            </p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Mimic Trap Area */}
                <div className="bg-red-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                      <div className="md:w-2/3">
                         <h4 className="text-xl font-black mb-3 flex items-center gap-3 italic">
                           <AlertTriangle size={20} className="text-red-400" /> The Infection Mimic Trap
                         </h4>
                         <p className="text-xs text-slate-300 leading-relaxed italic">
                            "In a child with fever and metaphyseal pain, Ewing Sarcoma is the great mimic. If the 'pus' from an aspiration is thin or has unusual cells, you MUST send a sample for pathology, not just microbiology."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                         <div className="px-6 py-3 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest group-hover:bg-white/20 transition-colors">
                            Pathology {' > '} Culture
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : (
              // OM BASICS TOPICS (Previous content)
              <>
                {/* TAB: Pathology */}
                {activeTab === 'patho' && (
                  <motion.div 
                    key="patho"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                     <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
                        <h3 className="text-2xl font-black text-slate-800 tracking-tighter mb-6 italic uppercase">{OM_DATA.pathophysiology.title}</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                           {OM_DATA.pathophysiology.steps.map((step, i) => (
                             <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
                                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-[10px] shrink-0">{i + 1}</div>
                                <div>
                                  <h5 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{step.name}</h5>
                                  <p className="text-xs font-bold text-slate-800 italic">{step.desc}</p>
                                </div>
                             </div>
                           ))}
                        </div>
                        <div className="mt-6 p-5 bg-slate-900 rounded-2xl text-white italic text-xs font-medium border border-white/10">
                           {OM_DATA.pathophysiology.pearl}
                        </div>
                     </div>
                  </motion.div>
                )}
                
                {/* ... existing staging, micro, tx rendering ... */}
                {activeTab === 'staging' && (
                   <motion.div 
                    key="staging"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                         <h3 className="text-xl font-black text-slate-800 mb-6 tracking-tighter uppercase italic">Cierny-Mader Staging</h3>
                         <div className="grid lg:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <p className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-[0.2em]">Anatomical Staging</p>
                              {OM_DATA.staging.anatomical.map((s, i) => (
                                 <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl items-center border border-slate-100">
                                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-black text-[9px] shrink-0">{i+1}</div>
                                    <div className="text-[11px] font-bold text-slate-700 italic">{s.desc}</div>
                                 </div>
                              ))}
                            </div>
                            <div className="bg-slate-900 text-white p-6 rounded-3xl border border-white/5">
                               <p className="text-[10px] font-black uppercase text-slate-500 mb-6 tracking-[0.2em]">Physiological Status</p>
                               <div className="space-y-4">
                                 {OM_DATA.staging.physiological.map((p, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                       <div className="text-emerald-400 font-black text-sm italic">{p.split(' ')[0]}</div>
                                       <p className="text-xs font-medium text-slate-300 italic">{p.split('(')[1]?.replace(')', '') || p}</p>
                                    </div>
                                 ))}
                               </div>
                            </div>
                         </div>
                      </div>
                   </motion.div>
                )}

                {activeTab === 'micro' && (
                   <motion.div 
                    key="micro"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid md:grid-cols-2 gap-4"
                  >
                     {Object.entries(OM_DATA.microbiology).map(([key, val], i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:border-emerald-200 transition-colors">
                           <h5 className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-2">{key.replace('_', ' ')}</h5>
                           <p className="text-lg font-black text-slate-800 italic uppercase tracking-tighter">{val}</p>
                        </div>
                     ))}
                   </motion.div>
                )}

                 {activeTab === 'tx' && (
                   <motion.div 
                    key="tx"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-emerald-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group"
                  >
                      <h3 className="text-2xl font-black mb-6 flex items-center gap-3 relative z-10 italic uppercase tracking-tighter">
                        <ShieldAlert className="text-emerald-400" /> Surgical Eradication
                      </h3>
                      <div className="space-y-6 relative z-10">
                         <div className="grid md:grid-cols-3 gap-4">
                           {[
                             { title: "Debridement", desc: "Removal of all dead, necrotic, and infected bone (Saucerization)." },
                             { title: "Dead Space", desc: "Filling the defect with antibiotic-impregnated cement or local flaps." },
                             { title: "Stabilization", desc: "Stabilizing the bone segment if structural integrity is compromised." }
                           ].map((t, i) => (
                             <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                                <h5 className="font-black text-[10px] uppercase tracking-widest text-emerald-400 mb-2">{t.title}</h5>
                                <p className="text-[11px] text-slate-300 font-medium leading-relaxed italic">{t.desc}</p>
                             </div>
                           ))}
                         </div>
                      </div>
                      <Wind className="absolute bottom-[-40px] right-[-40px] text-white/5 pointer-events-none group-hover:scale-110 transition-transform duration-1000" size={240}/>
                   </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <footer className="mt-auto px-10 py-5 flex flex-wrap justify-center gap-8 text-[9px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/80">
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-emerald-600"></div> OM Basics</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-red-600"></div> Complex Hub</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-purple-600"></div> Advanced Biology</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-orange-600"></div> Emergency Hub</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-emerald-500"></div> Differential Lab</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-blue-600"></div> Atypical Matrix</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-indigo-600"></div> Diagnostic Forensics</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-teal-600"></div> Stealth Matrix</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-amber-600"></div> Granulomatous Hub</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-orange-600"></div> Trauma Emergency</div>
           <div className="flex items-center gap-2 text-slate-800 uppercase italic">Apley Hub v6.0 Complete</div>
        </footer>
      </main>
    </div>
  );
};

export default BasicScienceStudyMode;
