import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { 
  Lock,
  Hammer,
  Settings, 
  ShieldCheck, 
  ShieldPlus,
  Zap, 
  Activity, 
  Layers, 
  ChevronRight, 
  AlertTriangle,
  AlertCircle,
  Stethoscope,
  Scissors,
  Database,
  Thermometer,
  Microscope,
  Info,
  Maximize2,
  FlaskConical,
  Wind,
  UserCheck,
  Crosshair,
  RotateCcw,
  ClipboardList,
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
  Baby,
  Dumbbell,
  Target,
  Search,
  ShieldAlert,
  Waypoints,
  ArrowDownUp,
  User,
  Timer,
  TrendingDown,
  Syringe,
  FileSearch,
  ClipboardCheck,
  Map,
  Fan,
  Clock,
  CheckSquare,
  Compass
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

const DIABETIC_DATA = {
  charcot: {
    title: "Charcot Neuroarthropathy",
    niche: "The Neuropathic Flare",
    stages: [
      { s: "Stage 0 (At Risk)", d: "Hot, swollen foot with normal X-rays. High risk of misdiagnosis as cellulitis." },
      { s: "Stage I (Fragmentation)", d: "Acute phase. Bone resorption, joint subluxation, and fracture debris." },
      { s: "Stage II (Coalescence)", d: "Absorption of debris and early healing. Reduced swelling/redness." },
      { s: "Stage III (Remodeling)", d: "Stable deformity. Bony ankylosis and rounding of fragments. 'Rocker-bottom' foot." }
    ],
    pearl: "The 'Elevation Test': If the redness disappears when the foot is elevated for 1 minute, it is likely Charcot, not cellulitis."
  },
  osteomyelitis: {
    title: "Diabetic Osteomyelitis",
    niche: "The Probe-to-Bone Hub",
    logic: "Infection seeds the bone via contiguous spread from a chronic ulcer, often without systemic fever.",
    pathogenesis: "Microvascular disease + Neuropathy leads to painless repetitive trauma and ulceration.",
    pearl: "The 'Probe-to-Bone' test has a high positive predictive value (89%) for osteomyelitis in the presence of an ulcer."
  }
};

const PHARMA_DATA = {
  resistance: {
    title: "Mechanisms of Resistance",
    niche: "The Bacterial Defense Lab",
    mechanisms: [
      { name: "Enzymatic Degradation", bug: "Beta-lactamase (Staph)", d: "Bacteria produce enzymes that chew up the antibiotic before it reaches the cell wall." },
      { name: "Efflux Pumps", bug: "Pseudomonas", d: "Bacteria literally pump the drug out of their cytoplasm as fast as it enters." },
      { name: "Target Modification", bug: "MRSA (mecA gene)", d: "The Penicillin-Binding Protein (PBP2a) changes shape so the drug can no longer bind." },
      { name: "Biofilm Dormancy", bug: "Staph epidermidis", d: "Bacteria shut down their metabolism, becoming 'invisible' to drugs that target cell division." }
    ],
    pearl: "Resistance is an evolutionary race; the biofilm is the ultimate sanctuary for resistant genes."
  },
  penetration: {
    title: "Bone-Serum Penetration",
    niche: "The Pharmacokinetic Ratio",
    ratios: [
      { drug: "Quinolones", ratio: "0.8 - 1.2", status: "Excellent", d: "Nearly equal concentrations in bone and blood. Ideal for oral step-down." },
      { drug: "Clindamycin", ratio: "0.4 - 0.7", status: "Good", d: "Good penetration; suppresses toxin production in aggressive sepsis." },
      { drug: "Vancomycin", ratio: "0.1 - 0.3", status: "Poor", d: "Requires very high serum troughs or local delivery (beads) to reach MIC in bone." },
      { drug: "Linezolid", ratio: "0.5 - 0.6", status: "Moderate", d: "Useful for MRSA/VRE; 100% oral bioavailability." }
    ],
    pearl: "A drug that doesn't reach the bone is just 'expensive urine'. Always check the Bone:Serum ratio."
  },
  toxicities: {
    title: "Orthopaedic Side Effects",
    niche: "The Drug-Tissue Penalty",
    warnings: [
      { drug: "Fluoroquinolones", effect: "Tendon Rupture", d: "Increases matrix metalloproteinases; high risk in Achilles tendon, especially in elderly/steroid users." },
      { drug: "Aminoglycosides", effect: "Oto/Nephrotoxicity", d: "Requires strict peak/trough monitoring. Toxic to the vestibular system." },
      { drug: "Rifampicin", effect: "P450 Induction", d: "Decreases levels of Warfarin and Anticonvulsants. Turns secretions orange." },
      { drug: "Linezolid", effect: "Bone Marrow Suppression", d: "Long-term use (>2 weeks) leads to thrombocytopenia and anemia." }
    ],
    pearl: "Never give Ciprofloxacin to an athlete or a patient with a known tendinopathy."
  },
  stewardship: {
    title: "The MIC Logic",
    niche: "Minimum Inhibitory Concentration",
    concepts: [
      { name: "MIC 90", d: "The concentration of drug required to inhibit 90% of bacterial growth." },
      { name: "Bactericidal", d: "Drugs that kill bacteria (Cell wall inhibitors like Penicillins)." },
      { name: "Bacteriostatic", d: "Drugs that stop growth (Protein synthesis inhibitors like Clindamycin)." },
      { name: "Synergy", d: "Using two drugs together (e.g. Rifampicin + Cipro) to prevent resistance in biofilms." }
    ],
    pearl: "In chronic osteomyelitis, you must maintain 4-8x the MIC at the site of infection for cure."
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
  },
  cacnes: {
    title: "Cutibacterium acnes",
    niche: "The Shoulder Specialist",
    profile: "Gram-positive anaerobic rod; commensal of sebaceous glands. High density in the axilla and shoulder region.",
    behavior: "Indolent. Slow-growing. Often forms a sparse biofilm that lacks the 'gross pus' of Staph aureus.",
    pathology: "Often identified in 'failed' shoulder arthroplasty where the only symptom was stiffness or loosening.",
    pearl: "C. acnes doesn't cause a fever; it causes a failure."
  },
  culture: {
    title: "The 14-Day Protocol",
    niche: "Slow-Growth Diagnostics",
    logic: "Standard cultures (2-5 days) will miss up to 50% of niche orthopaedic pathogens.",
    steps: [
      { id: 1, name: "Aerobic/Anaerobic", desc: "Must be held in both environments for a minimum of 14 days." },
      { id: 2, name: "Broth Enrichment", desc: "Use of Thioglycolate broth to encourage slow growers." },
      { id: 3, name: "Serial Sampling", desc: "Multiple tissue samples (5+) required to differentiate commensal from pathogen." }
    ],
    pearl: "Discarding a shoulder culture at day 5 is clinical negligence."
  },
  shoulderPJI: {
    title: "Indolent Shoulder PJI",
    niche: "Stiffness vs. Sepsis",
    presentation: "Unlike the hip/knee, shoulder PJI rarely presents with redness or draining sinuses.",
    signs: [
      { name: "Unexplained Pain", d: "Chronic, deep aching that persists after an initial 'honeymoon' period." },
      { name: "Persistent Stiffness", d: "Loss of range of motion without a mechanical cause." },
      { name: "Early Loosening", d: "Radiological evidence of lucency in the first 1-2 years." }
    ],
    pearl: "The primary symptom of a chronic, low-virulence shoulder infection is simply 'a shoulder that isn't doing well'."
  },
  caffeys: {
    title: "Caffey's Disease",
    niche: "Pediatric Pseudo-Infection",
    pathology: "Infantile Cortical Hyperostosis. A self-limiting condition of unknown etiology mimicking osteomyelitis.",
    triad: [
      "Irritability",
      "Soft tissue swelling",
      "Massive sub-periosteal bone formation (usually Mandible, Clavicle, or Long bones)."
    ],
    age: "Usually presents before 5 months of age.",
    pearl: "Mimics infection perfectly but has sterile cultures and resolves with NSAIDs."
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

const FRONTIER_DATA = {
  optimization: {
    title: "Host Optimization",
    niche: "Pre-Surgical Tuning",
    criteria: [
      { name: "Glycemic Control", value: "HbA1c < 7.0%", desc: "Uncontrolled diabetes is the strongest predictor of PJI and wound failure." },
      { name: "Nutritional Status", value: "Albumin > 3.5 g/dL", desc: "Malnutrition prevents collagen cross-linking and effective debridement response." },
      { name: "Nicotine Status", value: "4 Weeks Cessation", desc: "Smoking causes microvascular ischemia, vitalizing the 'niche' for anaerobes." },
      { name: "Body Mass Index", value: "BMI < 40", desc: "Extreme obesity creates 'dead space' and technical surgical difficulty." }
    ],
    pearl: "Surgery in a 'Grade C' host (Cierny-Mader) is a biological gamble."
  },
  raceSurface: {
    title: "Race for the Surface",
    niche: "The Implant-Host War",
    concept: "Gristina's theory: The surface of an implant is a battleground between host cell integration and bacterial adhesion.",
    factors: [
      { name: "Surface Energy", effect: "High energy surfaces favor host cell attachment." },
      { name: "Roughness", effect: "Increased surface area helps integration but provides 'nooks' for biofilms." },
      { name: "Material", effect: "Titanium is generally more 'bio-friendly' than Stainless Steel due to oxide layer stability." }
    ],
    pearl: "If the host cells win the race, the implant is 'sealed'. If bacteria win, the implant is 'doomed'."
  },
  kingella: {
    title: "Kingella kingae",
    niche: "The New Pediatric Pathogen",
    profile: "Gram-negative coccobacillus. Now recognized as a primary cause of AHO/Septic Arthritis in children < 4 years.",
    detection: "Does NOT grow on standard agar. Requires inoculation into aerobic blood culture bottles or PCR (rt-PCR for rtx toxin).",
    clinical: "Presents with mild symptoms—often no fever and normal WBC/CRP.",
    pearl: "In a toddler with a 'cool' septic hip, think Kingella. Standard cultures are 90% likely to be negative."
  },
  aclSepsis: {
    title: "Post-Op ACL Sepsis",
    niche: "Ligament Graft Management",
    incidence: "0.1% - 0.9% of ACL reconstructions.",
    protocol: [
      { step: "Aspirate", d: "Confirm diagnosis (WBC > 50,000)." },
      { step: "Retain Graft", d: "Urgent washout. If the graft is firm and fixated, attempt to save it." },
      { step: "Remove Graft", d: "If the graft is friable, loose, or infection is fungal/multidrug resistant." }
    ],
    pearl: "The goal is to save the graft to prevent secondary knee instability and early-onset OA."
  }
};

const PARASITE_DATA = {
  hydatid: {
    title: "Skeletal Hydatidosis",
    niche: "Echinococcus Granulosus",
    pathology: "Larvae reach bone via systemic circulation (usually after bypassing liver/lung). Unlike soft tissue, there is no limiting pericyst in bone.",
    imaging: "The 'Bunch of Grapes' sign. Multi-loculated cystic lesions without a sclerotic rim. Common in the spine and pelvis.",
    complication: "Pathological fracture and anaphylaxis if the cyst fluid spills during surgery.",
    pearl: "Bone involvement occurs in only 1-2% of cases, but it is the most difficult to eradicate due to its infiltrative nature."
  },
  marinum: {
    title: "Atypical Mycobacteria",
    niche: "M. marinum (Fish Tank Granuloma)",
    source: "Exposure to non-chlorinated water, fish tanks, or marine life.",
    clinical: "Chronic, painless nodules tracking along lymphatics (Sporotrichoid spread) in the hand.",
    tenosynovitis: "Commonly involves the flexor tendons of the hand, mimicking TB but less destructive.",
    pearl: "Requires low-temperature culture (30°C) to grow. Standard 37°C incubators will result in a false-negative."
  },
  actinomycosis: {
    title: "Actinomycosis",
    niche: "The 'Lumpy Jaw'",
    pathology: "Actinomyces israelii (commensal of the mouth/gut). Not a true fungus but a filamentous bacterium.",
    hallmark: "Multiple draining sinuses discharging 'Sulfur Granules' (clumps of bacteria).",
    location: "Cervicofacial (most common), but can cause a destructive, sclerosing osteomyelitis of the mandible.",
    pearl: "Requires long-term (6-12 months) High-Dose Penicillin. It respects no anatomical boundaries."
  },
  blastomycosis: {
    title: "North American Blastomycosis",
    niche: "The Great Fungal Mimic",
    pathology: "Blastomyces dermatitidis. Inhaled spores seed the bone hematogenously.",
    imaging: "Well-defined lytic lesions, often in the epiphysis or small bones of the hands/feet.",
    mimic: "Often misdiagnosed as a bone tumour (GCT) or standard bacterial osteomyelitis.",
    pearl: "Skin lesions are present in 80% of patients with bone involvement—look for the 'Verrucous' plaque."
  }
};

const BURSA_MUSCLE_DATA = {
  bursitis: {
    title: "Septic Bursitis",
    niche: "Surface Sepsis",
    common_sites: "Olecranon and Prepatellar (superficial bursae).",
    differentiation: "In bursitis, passive Range of Motion (ROM) is usually preserved. In Septic Arthritis, ROM is agonizingly restricted.",
    pathology: "Direct inoculation (trauma/abrasion) rather than hematogenous spread.",
    pearl: "If the patient can flex the joint fully without severe deep pain, the infection is likely in the bursa, not the joint cavity."
  },
  pyomyositis: {
    title: "Pyomyositis",
    niche: "Muscle Sepsis",
    stages: [
      { s: "Invasive (1-2 wks)", d: "Aching, localized swelling, low-grade fever. No fluctuance yet." },
      { s: "Suppurative (2-3 wks)", d: "Abscess formation. High fever, exquisite tenderness, and 'woody' feel on palpation." },
      { s: "Late / Septic", d: "Systemic sepsis, multi-organ failure, and muscle necrosis." }
    ],
    pathology: "Spontaneous bacterial infection of skeletal muscle (Staph aureus 90%). More common in the tropics (Tropical Myositis).",
    pearl: "MRI is the gold standard; it identifies the 'woody' edema before the abscess is palpable."
  },
  psoas: {
    title: "Psoas Abscess",
    niche: "The Retroperitoneal Track",
    origin: [
      { name: "Primary", d: "Hematogenous spread (usually in IV drug users or Diabetics)." },
      { name: "Secondary", d: "Tracking from Spinal TB (Pott's), Crohn's disease, or Appendicitis." }
    ],
    clinical: "The 'Psoas Sign' (pain on hip extension). Patient prefers the hip in flexion and external rotation.",
    management: "Percutaneous drainage under CT/Ultrasound guidance + systemic antibiotics.",
    pearl: "Because the psoas fascia is strong, it can hold massive amounts of pus without localized skin redness."
  },
  necrotizing_rare: {
    title: "Non-Clostridial Myonecrosis",
    niche: "Synergistic Gangrene",
    profile: "A polymicrobial infection (Strep + Anaerobes) causing rapid muscle destruction.",
    clinical: "Skin is often intact initially, but 'dishwater' fluid and crepitus develop rapidly.",
    action: "Emergency debridement. Mortality is high (30-50%) without surgical speed.",
    pearl: "If the pain is out of proportion to the skin appearance, you are in the 'Red Zone' for myonecrosis."
  }
};

const SEQUELAE_DATA = {
  marjolins: {
    title: "Marjolin's Ulcer",
    niche: "Malignant Transformation",
    pathology: "Squamous Cell Carcinoma (SCC) developing in the epithelial lining of a chronic osteomyelitic sinus tract.",
    timeline: "Usually occurs 20-30 years after the onset of chronic infection.",
    signs: ["Sudden increase in pain", "Foul odor", "Everted edges of the sinus", "Radiological bone destruction."],
    pearl: "Biopsy the edge of the sinus. Treatment is usually amputation as the cancer is often high-grade and infiltrative."
  },
  amyloidosis: {
    title: "Secondary Amyloidosis",
    niche: "Systemic Protein Deposition",
    pathology: "Chronic suppuration leads to elevated Serum Amyloid A (SAA), which deposits as AA amyloid in visceral organs.",
    organs: "Primarily affects the Kidneys (Nephrotic syndrome), Liver, and Spleen.",
    clinical: "Proteinuria, edema, and progressive renal failure in a patient with decades of bone drainage.",
    pearl: "Eradicating the infection source is the only way to halt the progression of amyloidosis."
  },
  fracture: {
    title: "Pathological Fracture",
    niche: "Biomechanics of Weakened Bone",
    cause: "Bone is weakened by the 'Sequestrum' (dead bone) and 'Cloacae' (holes), as well as the 'Saucerization' (surgical removal of bone).",
    risk: "High risk during the transition from active infection to early healing when the involucrum is still immature.",
    management: "External fixation is preferred over internal plates to avoid seeding the entire medullary canal.",
    pearl: "The involucrum must be structurally sound before allowing full weight-bearing."
  },
  amputation: {
    title: "The Salvage Decision",
    niche: "Intractable Osteomyelitis",
    indications: [
      { name: "Malignancy", d: "Confirmed Marjolin's ulcer." },
      { name: "Function", d: "Stiff, painful, non-functional limb that is worse than a prosthesis." },
      { name: "Systemic", d: "Secondary Amyloidosis or life-threatening sepsis." },
      { name: "Economic", d: "Years of failed surgeries leading to social/financial collapse." }
    ],
    pearl: "Amputation is not a failure; it is a reconstructive procedure to restore the patient's mobility and quality of life."
  }
};

const PEDIATRIC_DATA = {
  subacute: {
    title: "Sub-acute Osteomyelitis",
    niche: "The Gledhill Classification",
    profile: "An indolent form of bone infection with high host resistance and low bacterial virulence. Systemic signs (fever/WBC) are often absent.",
    types: [
      { id: "Type I", name: "Brodie's Abscess", desc: "Central metaphyseal radiolucency with a sclerotic rim." },
      { id: "Type II", name: "Metaphyseal Erosion", desc: "Eccentric erosion of the cortex." },
      { id: "Type III", name: "Diaphyseal Sclerosis", desc: "Cortical thickening mimicking an osteoid osteoma." },
      { id: "Type IV", name: "Onion-Skinning", desc: "Subperiosteal new bone mimicking Ewing Sarcoma." }
    ],
    pearl: "Sub-acute OM is a 'Great Mimic'—always consider it before diagnosing a primary bone tumor."
  },
  sickleCell: {
    title: "Salmonella & Sickle Cell",
    niche: "The Heme-Infection Link",
    pathology: "Sickle Cell Disease leads to splenic infarction and 'leaky' gut mucosa, allowing Salmonella to seed the bone.",
    hallmark: "Bone-within-bone appearance (Double Contour). Massive involucrum formation.",
    differentiation: "It is extremely difficult to distinguish Bone Infarction from Osteomyelitis on imaging. Both cause fever and pain.",
    pearl: "In a Sickle Cell patient with bone pain, Salmonella is as common as Staphylococcus aureus."
  },
  neonatal: {
    title: "Neonatal Multi-focal Sepsis",
    niche: "The Silent Killer",
    features: "Neonates have immature immune systems and 'trans-physeal' vessels. Infection often presents in multiple joints simultaneously.",
    signs: [
      { name: "Pseudoparalysis", d: "The baby stops moving the affected limb." },
      { name: "Joint Swelling", d: "Subtle fullness, often in the hip or shoulder." },
      { name: "Systemic Disturbance", d: "Poor feeding or irritability; fever may be absent." }
    ],
    pearl: "In a neonate, every hot joint is an emergency, but the lack of heat doesn't rule it out."
  },
  physealBar: {
    title: "Post-Infectious Growth Arrest",
    niche: "Physeal Bar Management",
    mechanism: "Sepsis destroys the chondrocytes of the physis, which is replaced by a bony bridge (bar).",
    classification: [
      { type: "Peripheral", d: "Causes progressive angular deformity (e.g., Genu Valgum)." },
      { type: "Central", d: "Causes growth cessation and limb length discrepancy." },
      { type: "Combined", d: "The most severe; leads to both shortening and angulation." }
    ],
    pearl: "Map the bar with a CT scan. If the bar is < 50% of the physeal area, surgical resection (bar excision) may be attempted."
  }
};

const PELVIC_DATA = {
  sacroiliitis: {
    title: "Pyogenic Sacroiliitis",
    niche: "The Deep Pelvic Mystery",
    clinical: "Acute, severe buttock pain. Patient often refuses to sit or bear weight. Fever is common.",
    tests: [
      { name: "FABER Test", d: "Flexion, Abduction, External Rotation. Stressing the SI joint causes exquisite pain." },
      { name: "Gaenslen's Test", d: "Hyperextension of the hip stresses the SI joint, identifying the focus." },
      { name: "Imaging", d: "MRI is gold standard. Bone scan shows the 'Bear-Claw' uptake pattern." }
    ],
    pearl: "Often misdiagnosed as disc herniation or septic hip. Always check the SI joint if the hip has free internal rotation."
  },
  symphysitis: {
    title: "Septic Symphysitis",
    niche: "Osteitis Pubis vs. Sepsis",
    etiology: "Common post-urological surgery, pelvic radiation, or in high-level athletes (Staph/Pseudomonas).",
    differentiation: [
      { feature: "Septic Symphysitis", d: "Fever, high CRP, rapid bone destruction, and fluid collection on MRI." },
      { feature: "Osteitis Pubis", d: "Chronic, low-grade, normal markers, sclerotic bone edges. Non-infectious." }
    ],
    pearl: "Septic symphysitis requires long-term antibiotics and potentially surgical debridement; Osteitis Pubis requires rest and NSAIDs."
  },
  ischial: {
    title: "Ischial Osteomyelitis",
    niche: "The Pressure Pore Hazard",
    pathology: "Direct extension from Grade IV pressure sores in paraplegic or bed-bound patients.",
    management: "Radical debridement of the ischial tuberosity + reconstruction with a gluteal rotation flap.",
    complication: "High recurrence rate due to persistent pressure and poor local vascularity.",
    pearl: "You cannot cure ischial OM if the patient continues to sit on the wound. Offloading is surgery's best ally."
  },
  mimics: {
    title: "Obturator Internus Abscess",
    niche: "Pediatric Septic Hip Mimic",
    pathology: "An abscess in the obturator internus muscle, often following hematogenous spread or minor trauma.",
    mimicry: "Presents exactly like a septic hip: child is febrile and refuses to move the hip.",
    differentiation: "In Obturator Internus Abscess, the hip usually has preserved (though painful) internal rotation. MRI is diagnostic.",
    pearl: "If the hip aspirate is dry but the child looks septic, look for the 'Obturator Sign' on MRI."
  }
};

const CIERNY_DATA = {
  host: {
    title: "The Cierny-Mader Host",
    niche: "Physiological Scoring",
    types: [
      { id: "Host A", name: "Normal Host", desc: "No systemic or local compromising factors. Excellent healing potential." },
      { id: "Host B", name: "Compromised Host", desc: "Systemic (Bs) or Local (Bl) factors (Diabetes, Smoking, Malnutrition, Vasculopathy)." },
      { id: "Host C", name: "Treatment Prohibitive", desc: "The patient is too ill or the treatment is worse than the disease. Manage with suppression." }
    ],
    pearl: "Surgery on a 'Host C' is not an act of healing; it is an act of complications. Know when to stop."
  },
  anatomy: {
    title: "Anatomical Staging",
    niche: "Bone Involvement (Types 1-4)",
    types: [
      { id: "Type 1", name: "Medullary", desc: "Infection limited to the endosteal surface (e.g., infected IM nail)." },
      { id: "Type 2", name: "Superficial", desc: "Infection limited to the cortical surface (e.g., infected plate or pressure sore)." },
      { id: "Type 3", name: "Localized", desc: "Full thickness cortical sequestration that remains stable. Usually needs saucerization." },
      { id: "Type 4", name: "Diffuse", desc: "Infection causes mechanical instability (segmental loss). Needs stabilization + reconstruction." }
    ],
    pearl: "Type 4 is the most challenging; it is both an infectious and a structural catastrophe."
  },
  composites: {
    title: "Bio-Composite Carriers",
    niche: "The End of 'Beads on a String'",
    materials: [
      { name: "Calcium Sulphate", status: "Absorbable", d: "Dissolves in 4-6 weeks. Excellent antibiotic elution. Risk of 'serous drainage' if too much is used." },
      { name: "Hydroxyapatite (HA)", status: "Osteoconductive", d: "Stays as a permanent scaffold. Often mixed with Calcium Sulphate to provide long-term bone conduction." },
      { name: "Bio-Glass", status: "Bacteriostatic", d: "Highly alkaline surface kills bacteria mechanically. Does not require added antibiotics." }
    ],
    pearl: "Absorbable composites eliminate the need for a second surgery to 'remove the beads'."
  },
  deadSpace: {
    title: "Dead Space Management",
    niche: "The 'Vacuo' Problem",
    protocol: [
      { step: "Ablate", d: "Remove all avascular bone (the sequestrum) until the 'Papineau' punctate bleeding is seen." },
      { step: "Fill", d: "Use muscle flaps or antibiotic-loaded bio-composites to eliminate the cavity." },
      { step: "Seal", d: "Primary skin closure or early flap coverage. Vac-dressings are only temporary." }
    ],
    pearl: "Nature abhors a vacuum. An empty space in bone will always fill with hematoma—and then bacteria."
  }
};

const VASCULAR_DATA = {
  trueta: {
    title: "Trueta's Vascular Shifts",
    niche: "Age-Dependent Sepsis Patterns",
    stages: [
      { age: "Infant (< 18 months)", feature: "Trans-physeal Vessels", desc: "Vessels cross the physis. Metaphyseal infection spreads directly into the joint. High risk of Septic Arthritis." },
      { age: "Child (18mo - Puberty)", feature: "Physeal Barrier", desc: "The physis is a total vascular barrier. Infection is trapped in the metaphysis (Hairpin loops). Joints are spared unless intra-articular." },
      { age: "Adult (Post-Fusion)", feature: "Vascular Re-entry", desc: "Physis has fused. Metaphyseal and Epiphyseal vessels communicate again. Infection can once more reach the subchondral bone." }
    ],
    pearl: "The physis is not just a growth plate; it is an immunological firewall that changes with age."
  },
  tomSmith: {
    title: "Tom Smith's Arthritis",
    niche: "Neonatal Septic Hip",
    pathology: "A catastrophic infection in neonates where the femoral head is essentially dissolved by pus.",
    clinical: "Minimal systemic signs. 'Pseudoparalysis' of the limb. High risk of late hip dislocation and growth arrest.",
    management: "Emergency surgical drainage. Delay of even 6 hours can lead to permanent femoral head necrosis.",
    pearl: "In a neonate, a 'cold' hip that doesn't move is a surgical emergency until proven otherwise."
  },
  periosteum: {
    title: "Periosteal Dynamics",
    niche: "The Lifting Mechanism",
    process: "Pus under pressure in the metaphysis tracks through the cortex (Volkmann canals) to the sub-periosteal space.",
    impact: [
      { name: "In Children", d: "Periosteum is loosely attached; pus 'lifts' it easily, stripping blood supply and creating a sequestrum." },
      { name: "In Adults", d: "Periosteum is firmly adherent; pus is contained, leading to increased intraosseous pressure and severe pain." }
    ],
    pearl: "The 'Involucrum' is the bone's attempt to bridge the gap created by a lifted periosteum."
  },
  microAnatomy: {
    title: "Micro-Anatomy of Spread",
    niche: "Haversian & Volkmann Systems",
    logic: "Infection doesn't just 'sit' in the marrow; it uses the bone's internal plumbing to migrate.",
    components: [
      { name: "Haversian Canals", role: "Vertical spread along the long axis of the bone." },
      { name: "Volkmann Canals", role: "Horizontal spread from marrow to the periosteal surface." },
      { name: "Hairpin Loops", role: "Sluggish flow in the metaphysis where bacteria 'drop out' of circulation." }
    ],
    pearl: "The architecture of bone dictates the geometry of the infection."
  }
};

const DIAGNOSTIC_INTERVENTIONAL_DATA = {
  safeZones: {
    title: "Surgical Aspiration Zones",
    niche: "Anatomical Access Points",
    joints: [
      { name: "Hip (Anterior)", access: "2cm distal/lateral to intersection of ASIS and Pubic Symphysis.", risk: "Femoral Neurovascular bundle (Medial)." },
      { name: "Knee (Superolateral)", access: "Superior and lateral to the patella, tilting the needle into the suprapatellar pouch.", risk: "Minimal; avoid the fat pad." },
      { name: "Shoulder (Posterior)", access: "2cm distal and medial to the posterolateral corner of the acromion.", risk: "Cephalic vein (if using anterior approach)." },
      { name: "Ankle (Antero-medial)", access: "Medial to the Tibialis Anterior tendon.", risk: "Dorsalis Pedis artery / Deep peroneal nerve." }
    ],
    pearl: "Aspiration is best performed where the synovium is closest to the skin and furthest from vital structures."
  },
  dryTap: {
    title: "The 'Dry Tap' Protocol",
    niche: "Diagnostic Rescue",
    steps: [
      { id: 1, name: "Position Check", desc: "Verify needle tip location under Ultrasound or C-arm fluoroscopy." },
      { id: 2, name: "Saline Lavage", desc: "Inject 5-10mL of sterile, non-bacteriostatic saline and re-aspirate immediately." },
      { id: 3, name: "Tissue Biopsy", desc: "If lavage fails, a synovial core biopsy is required for both histology and culture." }
    ],
    pearl: "A tap is not 'negative'; it is simply non-diagnostic. Saline lavage increases sensitivity by 30%."
  },
  media: {
    title: "Culture Media Matrix",
    niche: "The Micro-Laboratory",
    cultures: [
      { agent: "Chocolate Agar", target: "Neisseria gonorrhoeae & Haemophilus.", note: "Enriched for fastidious organisms." },
      { agent: "Sabouraud Dextrose", target: "Fungi (Candida/Aspergillus).", note: "Acidic pH inhibits bacterial growth." },
      { agent: "Lowenstein-Jensen", target: "Mycobacterium (TB).", note: "Requires 6-8 weeks of incubation." },
      { agent: "Anaerobic Broth", target: "C. acnes / Bacteroides.", note: "Must be sent in specialized transport vials." }
    ],
    pearl: "Always warn the lab if you suspect TB or Fungi; standard incubators will miss them."
  },
  biopsy: {
    title: "The Biopsy Hierarchy",
    niche: "Tissue over Fluid",
    types: [
      { type: "FNA", use: "Cytology and simple culture; limited for infection." },
      { type: "Core Needle", use: "Gold standard for chronic OM; preserves tissue architecture." },
      { type: "Open Incisional", use: "Reserved for cases where percutaneous methods fail or malignancy is suspected." }
    ],
    rules: [
      "Avoid crossing uncontaminated compartments.",
      "The biopsy track must be excised during the definitive surgery.",
      "Send at least 3-5 separate samples to differentiate contaminants."
    ],
    pearl: "Biopsy at the interface between the healthy bone and the sequestrum for the highest yield."
  }
};

const PREVENTION_DATA = {
  orEnvironment: {
    title: "OR Air Dynamics",
    niche: "Laminar Flow vs. Conventional",
    parameters: [
      { name: "Laminar Flow", val: "Ultra-clean air", desc: "Unidirectional air flow at 0.3-0.5 m/s. Essential for joint arthroplasty to reduce airborne CFU counts." },
      { name: "Air Changes", val: "> 20 per hour", desc: "High exchange rates dilute bacterial concentrations from the surgical team." },
      { name: "Traffic Control", val: "Minimal doors", desc: "Every door opening increases the bacterial count near the wound by disrupting airflow." },
      { name: "Body Exhaust", val: "Space Suits", desc: "Personal exhaust systems for the scrub team further isolate the patient from human shedding." }
    ],
    pearl: "The Charnley legacy: Laminar flow reduced infection in early total hips from 10% to less than 1%."
  },
  skinPrep: {
    title: "Skin Preparation Hierarchy",
    niche: "Chemical Barriers",
    agents: [
      { name: "CHG + Alcohol", status: "Gold Standard", d: "Chlorhexidine Gluconate with Isopropyl alcohol. Rapid onset and long residual activity." },
      { name: "Povidone-Iodine", status: "Alternative", d: "Effective but easily neutralized by blood and lacks the long-term 'persistence' of CHG." },
      { name: "Ioban Drapes", status: "Barrier", d: "Antimicrobial incise drapes. Controversial; must be adhered perfectly or they can trap bacteria if they lift." }
    ],
    pearl: "Alcoholic Chlorhexidine is superior to aqueous Iodine for preventing SSI in orthopaedic trauma."
  },
  prophylaxis: {
    title: "Prophylaxis Kinetics",
    niche: "The 'Knife-to-Skin' Window",
    rules: [
      { r: "Timing", v: "30 - 60 Mins", d: "Antibiotics must be fully infused before the tourniquet is inflated or the incision is made." },
      { r: "Redosing", v: "2 x Half-life", d: "Redose Cefazolin every 4 hours or if blood loss exceeds 1.5 Liters." },
      { r: "Duration", v: "< 24 Hours", d: "Continuing prophylaxis beyond 24 hours does not reduce SSI risk but does increase resistance." }
    ],
    pearl: "The goal is a tissue concentration exceeding the MIC at the exact moment of the first incision."
  },
  irrigation: {
    title: "Irrigation Logic",
    niche: "The 'FLOW' Trial Principles",
    strategy: [
      { type: "Saline (LVP)", pro: "Mechanical washout. Preserves host cell viability (fibroblasts/osteoblasts).", con: "No chemical kill effect." },
      { type: "Betadine Soak", pro: "Chemical decolonization. 3-minute soak is standard in PJI prevention.", con: "Potential cytotoxicity if concentrations are too high." },
      { type: "Pulse Lavage", pro: "Effective at removing debris/bacteria from bone 'nooks'.", con: "Risk of driving bacteria deeper into the medullary canal if pressure is > 50 psi." }
    ],
    pearl: "Normal Saline remains the safest and most effective irrigation for open fracture debridement."
  }
};

const NICHE_DATA = {
  gonococcal: {
    title: "Gonococcal Arthritis (DGI)",
    niche: "Young Active Adults",
    pathology: "Disseminated Neisseria gonorrhoeae. Higher risk in females and during menstruation/pregnancy.",
    triad: "Migratory Tenosynovitis + Dermatitis (Pustular rash) + Polyarthralgia.",
    detection: "Synovial cultures are often negative (< 50%). Requires NAAT (Nucleic Acid Amplification) of joint fluid, throat, and urogenital swabs.",
    pearl: "If a 25-year-old has 'migratory' joint pain and a few small skin pustules, it is Gonococcal until proven otherwise."
  },
  lyme: {
    title: "Lyme Arthritis",
    niche: "Borrelia burgdorferi",
    stages: [
      { s: "Stage 1", d: "Early Localized: Erythema Migrans (Target Rash) at tick bite site." },
      { s: "Stage 2", d: "Early Disseminated: Heart block, Bell's palsy, migratory pains." },
      { s: "Stage 3", d: "Late: Chronic Monoarthritis—usually a massive knee effusion with surprisingly little pain." }
    ],
    diagnosis: "Two-step serology (ELISA followed by Western Blot).",
    pearl: "A 'huge' cold knee effusion in a patient from an endemic forest area is the classic Lyme presentation."
  },
  viral: {
    title: "Viral Arthritis Mimics",
    niche: "The RA Impersonators",
    organisms: [
      { name: "Parvovirus B19", feature: "Symmetric small joint pain + 'Slapped Cheek' rash in kids." },
      { name: "Hepatitis B/C", feature: "Polyarthritis often precedes the onset of jaundice." },
      { name: "Rubella", feature: "Common in adult females after vaccination or natural infection." }
    ],
    differentiation: "Viral arthritis is typically self-limiting (weeks) and does not cause joint erosions on X-ray.",
    pearl: "Viral flares can look exactly like Rheumatoid Arthritis; wait 6 weeks before starting long-term DMARDs."
  },
  reactive: {
    title: "Reactive Arthritis",
    niche: "Post-Infectious (Reiter's)",
    pathology: "Not a direct joint infection, but an autoimmune cross-reactivity following GI or GU infection.",
    triad: "Can't see (Uveitis), Can't pee (Urethritis), Can't climb a tree (Arthritis).",
    marker: "HLA-B27 positive in 75% of cases.",
    pearl: "The joint fluid is STERILE. Treating with antibiotics won't fix the joint; it needs NSAIDs/Steroids."
  }
};

const BIOMECH_DATA = {
  stability: {
    title: "Stability as Anti-Sepsis",
    niche: "The AO/Apley Principle",
    concept: "Stability is a prerequisite for the eradication of infection in bone. Unstable hardware creates a 'piston effect' that pumps bacteria through the marrow.",
    mechanics: [
      { name: "Strain Control", d: "High strain at the fracture site promotes bacterial proliferation and biofilm formation." },
      { name: "Revascularization", d: "Rigid stability allows the host to re-establish blood supply, delivering immune cells to the 'niche'." },
      { name: "Hardware Choice", d: "External Fixation is often preferred in active infection to avoid internal foreign bodies." }
    ],
    pearl: "You can cure an infection with stable hardware in place; you can almost never cure it if the hardware is loose."
  },
  pinSite: {
    title: "Pin-Site Infection Lab",
    niche: "Checketts-Otterburn Staging",
    stages: [
      { s: "Grade 1", d: "Slight redness; responds to improved local hygiene." },
      { s: "Grade 2", d: "Redness + Discharge; requires oral antibiotics." },
      { s: "Grade 3", d: "Infection involves the bone (Pin-track OM); requires pin removal." }
    ],
    care: "Apley-Dahl Method: Frequent cleaning, no crust build-up, and avoid skin tension around pins.",
    pearl: "The most common reason for pin-site failure is the 'Skin-Pin' interface motion."
  },
  cement: {
    title: "Antibiotic-Loaded Cement (ALC)",
    niche: "Local Elution Pharmacokinetics",
    kinetics: [
      { phase: "Initial Burst", d: "Massive elution in the first 24-48 hours (bactericidal peak)." },
      { phase: "Sustained Release", d: "Low-level elution over 4-6 weeks (sub-therapeutic risk)." },
      { phase: "Heat Stability", d: "Only specific antibiotics (Vancomycin, Tobramycin, Gentamicin) survive the heat of polymerization." }
    ],
    pearl: "Local concentrations can reach 200x the MIC without systemic toxicity."
  },
  materials: {
    title: "Implant Bio-Materials",
    niche: "PEEK, Titanium & Steel",
    profiles: [
      { mat: "Titanium", risk: "Low", note: "Bio-inert oxide layer; better host cell integration ('The Race')." },
      { mat: "Stainless Steel", risk: "Moderate", note: "Higher risk of biofilm; nickel/chromium content can irritate tissues." },
      { mat: "Bio-absorbable", risk: "Variable", note: "Can cause 'Sterile Osteolysis' or foreign body reactions mimicking infection." }
    ],
    pearl: "In infected environments, Titanium is the gold standard for internal fixation."
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
  { id: 'charcot', label: 'Charcot Foot', icon: Footprints, group: 'DIABETIC HUB' },
  { id: 'osteomyelitis', label: 'Diabetic OM', icon: Activity, group: 'DIABETIC HUB' },
  { id: 'crystals', label: "Septic vs. Gout", icon: FlaskConical, group: 'DIFFERENTIAL HUB' },
  { id: 'garres', label: "Garré's (Sclerosing)", icon: Layers, group: 'DIFFERENTIAL HUB' },
  { id: 'nonunion', label: "Infected Non-Union", icon: Binary, group: 'DIFFERENTIAL HUB' },
  { id: 'crps', label: "CRPS (Sudek's)", icon: Flame, group: 'DIFFERENTIAL HUB' },
  { id: 'crmo', label: 'CRMO (Pediatric)', icon: ShieldAlert, group: 'ATYPICAL & GLOBAL HUB' },
  { id: 'leprosy', label: 'Leprosy (Nerve)', icon: Bug, group: 'ATYPICAL & GLOBAL HUB' },
  { id: 'mycetoma', label: 'Madura Foot', icon: Layers, group: 'ATYPICAL & GLOBAL HUB' },
  { id: 'resistance', label: 'Resistance Logic', icon: ShieldAlert, group: 'BIO-PHARMA HUB' },
  { id: 'penetration', label: 'Bone Penetration', icon: Target, group: 'BIO-PHARMA HUB' },
  { id: 'toxicities', label: 'Drug Toxicities', icon: Flame, group: 'BIO-PHARMA HUB' },
  { id: 'stewardship', label: 'MIC Stewardship', icon: Binary, group: 'BIO-PHARMA HUB' },
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
  { id: 'cacnes', label: 'C. acnes Biology', icon: Dna, group: 'STEALTH HUB' },
  { id: 'culture', label: '14-Day Protocol', icon: Clock, group: 'STEALTH HUB' },
  { id: 'shoulderPJI', label: 'Shoulder Stealth', icon: Target, group: 'STEALTH HUB' },
  { id: 'caffeys', label: "Caffey's (Mimic)", icon: Baby, group: 'STEALTH HUB' },
  { id: 'tb_pathology', label: 'Granuloma Cycle', icon: Layers, group: 'TB HUB' },
  { id: 'tb_stages', label: 'Joint Stages', icon: Activity, group: 'TB HUB' },
  { id: 'tb_regional', label: 'Regional Signs', icon: Search, group: 'TB HUB' },
  { id: 'tb_pharma', label: 'RIPE Regimen', icon: Pill, group: 'TB HUB' },
  { id: 'optimization', label: 'Host Optimization', icon: Scale, group: 'BIO-FRONTIER' },
  { id: 'raceSurface', label: 'Race for Surface', icon: Target, group: 'BIO-FRONTIER' },
  { id: 'kingella', label: 'Kingella kingae', icon: Baby, group: 'BIO-FRONTIER' },
  { id: 'aclSepsis', label: 'ACL Graft Sepsis', icon: Dumbbell, group: 'BIO-FRONTIER' },
  { id: 'gustilo', label: 'Gustilo Staging', icon: Layers, group: 'TRAUMA HUB' },
  { id: 'debridement', label: 'The 4 Cs (Debride)', icon: Scissors, group: 'TRAUMA HUB' },
  { id: 'antibiotics', label: 'Environment Rx', icon: Pill, group: 'TRAUMA HUB' },
  { id: 'management', label: 'Fix & Flap Logic', icon: Target, group: 'TRAUMA HUB' },
  { id: 'hydatid', label: 'Hydatidosis', icon: Globe, group: 'ATYPICAL HUB' },
  { id: 'marinum', label: 'M. marinum (Marine)', icon: Waves, group: 'ATYPICAL HUB' },
  { id: 'actinomycosis', label: 'Actinomycosis', icon: Layers, group: 'ATYPICAL HUB' },
  { id: 'blastomycosis', label: 'Blastomycosis', icon: Wind, group: 'ATYPICAL HUB' },
  { id: 'gonococcal', label: 'Gonococcal (DGI)', icon: Crosshair, group: 'NICHE HUB' },
  { id: 'lyme', label: 'Lyme (Tick-Borne)', icon: Target, group: 'NICHE HUB' },
  { id: 'viral', label: 'Viral Mimics', icon: Activity, group: 'NICHE HUB' },
  { id: 'reactive', label: 'Reactive (Sterile)', icon: ShieldAlert, group: 'NICHE HUB' },
  { id: 'stability', label: 'Stability Logic', icon: Lock, group: 'BIOMECH HUB' },
  { id: 'pinSite', label: 'Pin-Site Care', icon: Hammer, group: 'BIOMECH HUB' },
  { id: 'cement', label: 'Antibiotic Cement', icon: FlaskConical, group: 'BIOMECH HUB' },
  { id: 'materials', label: 'Implant Materials', icon: Layers, group: 'BIOMECH HUB' },
  { id: 'trueta', label: 'Trueta Classification', icon: ArrowDownUp, group: 'VASCULAR & PHYSEAL HUB' },
  { id: 'tomSmith', label: 'Tom Smith Hip', icon: Baby, group: 'VASCULAR & PHYSEAL HUB' },
  { id: 'periosteum', label: 'Periosteal Lifting', icon: Layers, group: 'VASCULAR & PHYSEAL HUB' },
  { id: 'microAnatomy', label: 'Micro-Anatomy', icon: Microscope, group: 'VASCULAR & PHYSEAL HUB' },
  { id: 'bursitis', label: 'Septic Bursitis', icon: Layers, group: 'MYO-SEPSIS HUB' },
  { id: 'pyomyositis', label: 'Pyomyositis', icon: Timer, group: 'MYO-SEPSIS HUB' },
  { id: 'psoas', label: 'Psoas Abscess', icon: Droplets, group: 'MYO-SEPSIS HUB' },
  { id: 'necrotizing_rare', label: 'Myonecrosis', icon: Activity, group: 'MYO-SEPSIS HUB' },
  { id: 'marjolins', label: "Marjolin's Ulcer", icon: AlertTriangle, group: 'SEQUELAE HUB' },
  { id: 'amyloidosis', label: 'Amyloidosis (AA)', icon: Activity, group: 'SEQUELAE HUB' },
  { id: 'fracture', label: 'Patho-Fracture', icon: TrendingDown, group: 'SEQUELAE HUB' },
  { id: 'amputation', label: 'Salvage vs Amp', icon: Scale, group: 'SEQUELAE HUB' },
  { id: 'sacroiliitis', label: 'Sacroiliitis (SIJ)', icon: Compass, group: 'PELVIC HUB' },
  { id: 'symphysitis', label: 'Symphysis/Pubis', icon: ShieldAlert, group: 'PELVIC HUB' },
  { id: 'ischial', label: 'Ischial / Pressure', icon: Layers, group: 'PELVIC HUB' },
  { id: 'mimics', label: 'Obturator Mimics', icon: Target, group: 'PELVIC HUB' },
  { id: 'host', label: 'Host (Physiology)', icon: Activity, group: 'CIERNY HUB' },
  { id: 'anatomy', label: 'Anatomy (Types)', icon: Layers, group: 'CIERNY HUB' },
  { id: 'composites', label: 'Bio-Composites', icon: Beaker, group: 'CIERNY HUB' },
  { id: 'deadSpace', label: 'Dead Space Logic', icon: Target, group: 'CIERNY HUB' },
  { id: 'subacute', label: 'Sub-acute (Gledhill)', icon: Clock, group: 'PEDIATRIC HUB' },
  { id: 'sickleCell', label: 'Salmonella / Sickle', icon: Dna, group: 'PEDIATRIC HUB' },
  { id: 'neonatal', label: 'Neonatal Sepsis', icon: ShieldAlert, group: 'PEDIATRIC HUB' },
  { id: 'physealBar', label: 'Growth Arrest', icon: TrendingDown, group: 'PEDIATRIC HUB' },
  { id: 'safeZones', label: 'Safe Zones', icon: Map, group: 'DIAGNOSTIC INTERVENTIONAL' },
  { id: 'dryTap', label: 'Dry Tap Protocol', icon: Droplets, group: 'DIAGNOSTIC INTERVENTIONAL' },
  { id: 'media', label: 'Culture Media', icon: FlaskConical, group: 'DIAGNOSTIC INTERVENTIONAL' },
  { id: 'biopsy', label: 'Biopsy Hierarchy', icon: FileSearch, group: 'DIAGNOSTIC INTERVENTIONAL' },
  { id: 'orEnvironment', label: 'OR Environment', icon: Fan, group: 'PREVENTION HUB' },
  { id: 'skinPrep', label: 'Skin & Draping', icon: Droplets, group: 'PREVENTION HUB' },
  { id: 'prophylaxis', label: 'Prophylaxis Logic', icon: Clock, group: 'PREVENTION HUB' },
  { id: 'irrigation', label: 'Irrigation Strategy', icon: Wind, group: 'PREVENTION HUB' }
];

const BasicScienceStudyMode = () => {
  const [activeTab, setActiveTab] = useState('patho');
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['OM BASICS', 'COMPLEX HUB', 'ADVANCED INFECTION HUB', 'EMERGENCY HUB', 'DIABETIC HUB', 'BIO-PHARMA HUB', 'DIFFERENTIAL HUB', 'ATYPICAL & GLOBAL HUB', 'DIAGNOSTIC FORENSICS', 'SOFT TISSUE HUB', 'STEALTH HUB', 'TB HUB', 'TRAUMA HUB', 'BIO-FRONTIER', 'ATYPICAL HUB', 'NICHE HUB', 'BIOMECH HUB', 'VASCULAR & PHYSEAL HUB', 'MYO-SEPSIS HUB', 'SEQUELAE HUB', 'CIERNY HUB', 'PEDIATRIC HUB', 'PELVIC HUB', 'DIAGNOSTIC INTERVENTIONAL', 'PREVENTION HUB']);

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
  const isAtypicalGlobal = ['crmo', 'leprosy', 'mycetoma'].includes(activeTab);
  const isForensic = ['markers', 'msis', 'molecular', 'sonication'].includes(activeTab);
  const isSoftTissue = ['handSpaces', 'bites', 'clostridial', 'fingertip'].includes(activeTab);
  const isStealth = ['spondylitis', 'hiv', 'brucellosis', 'fungal', 'cacnes', 'culture', 'shoulderPJI', 'caffeys'].includes(activeTab);
  const isTB = ['tb_pathology', 'tb_stages', 'tb_regional', 'tb_pharma'].includes(activeTab);
  const isTrauma = ['gustilo', 'debridement', 'antibiotics', 'management'].includes(activeTab);
  const isFrontier = ['optimization', 'raceSurface', 'kingella', 'aclSepsis'].includes(activeTab);
  const isAtypicalRare = ['hydatid', 'marinum', 'actinomycosis', 'blastomycosis'].includes(activeTab);
  const isNiche = ['gonococcal', 'lyme', 'viral', 'reactive'].includes(activeTab);
  const isBiomech = ['stability', 'pinSite', 'cement', 'materials'].includes(activeTab);
  const isVascular = ['trueta', 'tomSmith', 'periosteum', 'microAnatomy'].includes(activeTab);
  const isBursaMuscle = ['bursitis', 'pyomyositis', 'psoas', 'necrotizing_rare'].includes(activeTab);
  const isSequelae = ['marjolins', 'amyloidosis', 'fracture', 'amputation'].includes(activeTab);
  const isCierny = ['host', 'anatomy', 'composites', 'deadSpace'].includes(activeTab);
  const isPelvic = ['sacroiliitis', 'symphysitis', 'ischial', 'mimics'].includes(activeTab);
  const isDiabetic = ['charcot', 'osteomyelitis'].includes(activeTab);
  const isPharma = ['resistance', 'penetration', 'toxicities', 'stewardship'].includes(activeTab);
  const isPediatric = ['subacute', 'sickleCell', 'neonatal', 'physealBar'].includes(activeTab);
  const isInterventional = ['safeZones', 'dryTap', 'media', 'biopsy'].includes(activeTab);
  const isPrevention = ['orEnvironment', 'skinPrep', 'prophylaxis', 'irrigation'].includes(activeTab);

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
            <h1 className="text-lg font-black text-slate-800 uppercase tracking-tighter">
              {isVascular ? (VASCULAR_DATA as any)[activeTab].title : isBursaMuscle ? (BURSA_MUSCLE_DATA as any)[activeTab].title : isSequelae ? (SEQUELAE_DATA as any)[activeTab].title : isPediatric ? (PEDIATRIC_DATA as any)[activeTab].title : isCierny ? (CIERNY_DATA as any)[activeTab].title : isPelvic ? (PELVIC_DATA as any)[activeTab].title : isInterventional ? (DIAGNOSTIC_INTERVENTIONAL_DATA as any)[activeTab].title : isPrevention ? (PREVENTION_DATA as any)[activeTab].title : isDiabetic ? (DIABETIC_DATA as any)[activeTab].title : isPharma ? (PHARMA_DATA as any)[activeTab].title : isBiomech ? (BIOMECH_DATA as any)[activeTab].title : isTrauma ? (TRAUMA_INFECTION_DATA as any)[activeTab].title : isTB ? (TB_DATA as any)[activeTab].title : isSoftTissue ? (SOFT_TISSUE_DATA as any)[activeTab].title : "Infection Hub Master"}
            </h1>
          </div>
            <div className={`px-3 py-1 ${isPrevention ? 'bg-blue-50 text-blue-700 border-blue-100' : isPelvic ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : isCierny ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : isPediatric ? 'bg-pink-50 text-pink-700 border-pink-100' : isInterventional ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : isSequelae ? 'bg-red-50 text-red-700 border-red-100' : isBursaMuscle ? 'bg-orange-50 text-orange-700 border-orange-100' : isVascular ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : isBiomech ? 'bg-blue-50 text-blue-700 border-blue-100' : isPharma ? 'bg-amber-50 text-amber-700 border-amber-100' : isNiche ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : isAtypicalRare ? 'bg-blue-50 text-blue-700 border-blue-100' : isFrontier ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : isTrauma ? 'bg-orange-50 text-orange-700 border-orange-100' : isTB ? 'bg-amber-50 text-amber-700 border-amber-100' : isStealth ? 'bg-teal-50 text-teal-700 border-teal-100' : isSoftTissue ? 'bg-orange-50 text-orange-700 border-orange-100' : isForensic ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : isAtypicalGlobal ? 'bg-blue-50 text-blue-700 border-blue-100' : isDifferential ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : isEmergency ? 'bg-orange-50 text-orange-700 border-orange-100' : isAdvanced ? 'bg-purple-50 text-purple-700 border-purple-100' : isComplex ? 'bg-red-50 text-red-700 border-red-100' : isDiabetic ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'} rounded-full border flex items-center gap-2`}>
                {isPrevention ? <ShieldCheck size={12} /> : isPelvic ? <Map size={12} /> : isCierny ? <Scale size={12} /> : isPediatric ? <Baby size={12} /> : isInterventional ? <Syringe size={12} /> : isSequelae ? <Skull size={12} /> : isBursaMuscle ? <Flame size={12} /> : isVascular ? <Waypoints size={12} /> : isBiomech ? <Settings size={12} /> : isPharma ? <Pill size={12} /> : isNiche ? <Target size={12} /> : isAtypicalRare ? <Bug size={12} /> : isFrontier ? <Settings size={12} /> : isTrauma ? <Construction size={12} /> : isTB ? <Globe size={12} /> : isStealth ? <Wind size={12} /> : isSoftTissue ? <Hand size={12} /> : isForensic ? <FlaskConical size={12} /> : isAtypicalGlobal ? <Globe size={12} /> : isDifferential ? <Scale size={12} /> : isEmergency ? <AlertTriangle size={12} /> : isAdvanced ? <Search size={12} /> : isComplex ? <Thermometer size={12} /> : isDiabetic ? <Footprints size={12} /> : <Activity size={12} />}
                <span className="text-[9px] font-black uppercase tracking-widest italic">
                  {isPrevention ? 'Prevention Hub' : isPelvic ? 'Pelvic Matrix' : isCierny ? 'Cierny-Mader' : isPediatric ? 'Pediatric Hub' : isInterventional ? 'Interventional Hub' : isSequelae ? 'Sequelae Hub' : isBursaMuscle ? 'Myo-Sepsis' : isVascular ? 'Vascular Hub' : isBiomech ? 'Mech-Infect' : isPharma ? 'Bio-Pharma Hub' : isNiche ? 'Niche Inflammatory' : isAtypicalRare ? 'Atypical Matrix' : isFrontier ? 'Bio-Frontier' : isTrauma ? 'Trauma Sepsis' : isTB ? 'TB Hub' : isStealth ? 'Stealth Matrix' : isSoftTissue ? 'Soft Tissue Hub' : isForensic ? 'Forensic Matrix' : isAtypicalGlobal ? 'Atypical Matrix' : isDifferential ? 'Differential Hub' : isEmergency ? 'Emergency Hub' : isAdvanced ? 'Advanced Hub' : isComplex ? 'Acute Protocol' : isDiabetic ? 'Diabetic Hub' : 'Core Basics'}
                </span>
             </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 max-w-none w-full">
          <AnimatePresence mode="wait">
            {/* MYO-SEPSIS HUB TOPICS */}
            {isBursaMuscle ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6"
              >
                {/* Hero Card */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group text-left">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                      <div className="p-8 bg-orange-50 text-orange-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         {activeTab === 'psoas' ? <Droplets size={48} /> : <Flame size={48} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-orange-600 font-black text-[10px] uppercase tracking-widest italic">
                             {(BURSA_MUSCLE_DATA as any)[activeTab].niche}
                           </span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic tracking-tight">Active Soft Tissue Protocol</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">
                            {(BURSA_MUSCLE_DATA as any)[activeTab].title}
                         </h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">
                            "{(BURSA_MUSCLE_DATA as any)[activeTab].pearl}"
                         </p>
                      </div>
                   </div>
                   <Maximize2 className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 text-left">
                   <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-orange-400 italic uppercase">
                         <Zap size={22} /> {activeTab === 'pyomyositis' ? "Clinical Staging" : "Pathological Parameters"}
                      </h4>
                      <div className="space-y-4 relative z-10">
                         {activeTab === 'pyomyositis' && BURSA_MUSCLE_DATA.pyomyositis.stages.map((stage, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all text-left">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-orange-400 uppercase italic">{stage.s}</h5>
                                 <Timer size={14} className="text-slate-600" />
                              </div>
                              <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{stage.d}</p>
                           </div>
                         ))}
                         {activeTab === 'psoas' && BURSA_MUSCLE_DATA.psoas.origin.map((item, i) => (
                           <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-3xl text-left">
                              <h5 className="text-[11px] font-black text-orange-400 uppercase mb-2 italic">{item.name} Etiology</h5>
                              <p className="text-xs text-slate-300 leading-relaxed italic">{item.d}</p>
                           </div>
                         ))}
                         {(activeTab === 'bursitis' || activeTab === 'necrotizing_rare') && (
                           <div className="space-y-6 text-left">
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[10px] font-black text-orange-400 uppercase mb-2 italic">Clinical Differentiation</h5>
                                 <p className="text-xs text-slate-300 leading-relaxed font-medium italic">{(BURSA_MUSCLE_DATA as any)[activeTab].differentiation || (BURSA_MUSCLE_DATA as any)[activeTab].clinical}</p>
                              </div>
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[10px] font-black text-orange-400 uppercase mb-2 italic">Key Characteristics</h5>
                                 <p className="text-xs text-slate-300 leading-relaxed font-medium italic">{(BURSA_MUSCLE_DATA as any)[activeTab].common_sites || (BURSA_MUSCLE_DATA as any)[activeTab].profile}</p>
                              </div>
                           </div>
                         )}
                      </div>
                      <Microscope className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   <div className="space-y-6 text-left">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                            <Stethoscope size={22} className="text-orange-600" /> Clinical Action Plan
                         </h4>
                         <div className="p-6 bg-orange-50 border border-orange-100 rounded-3xl">
                            <p className="text-sm text-orange-900 font-bold leading-relaxed italic text-center">
                              {activeTab === 'bursitis' ? "Aspirate the bursa, then immobilize in extension. If it doesn't resolve in 48 hours, surgical bursectomy is indicated." : 
                               activeTab === 'pyomyositis' ? "Stage 1 requires high-dose IV antibiotics. Stage 2 MUST have surgical or percutaneous drainage of the abscess." : 
                               activeTab === 'psoas' ? "Always investigate the spine (MRI) or GI tract (CT) to find the source of a secondary psoas abscess." : 
                               "Incise and debride until you reach bleeding, contractile muscle. Leave the wound open for serial debridement."}
                            </p>
                         </div>
                      </div>

                      <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5 text-left">
                         <h5 className="text-[10px] font-black text-orange-400 uppercase mb-3 flex items-center gap-2 italic">
                           <AlertTriangle size={14} className="text-amber-500" /> Apley Diagnostic Pearl
                         </h5>
                         <p className="text-xs font-medium leading-relaxed italic opacity-90 text-left">
                            {activeTab === 'bursitis' ? "Be careful: Bursitis can sometimes 'rupture' into the joint, turning a superficial infection into septic arthritis." : 
                             activeTab === 'psoas' ? "The Psoas Abscess is the great mimic of hip arthritis. If the patient has full internal rotation of the hip, it's not the joint." : 
                             activeTab === 'pyomyositis' ? "Unlike cellulitis, pyomyositis involves the deep compartment. The skin may look normal despite deep muscle suppuration." :
                             "Gas in the muscle (Crepitus) without an open wound is nearly always Clostridial; with an open wound, it could be Synergistic Gangrene."}
                         </p>
                         <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                      </div>
                   </div>
                </div>

                {/* Woody Sign Alert Area */}
                <div className="bg-orange-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden text-left">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tighter">
                           <Crosshair size={24} className="text-orange-300" /> The "Woody" Muscle Sign
                         </h4>
                         <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                            "In the second stage of pyomyositis, the muscle loses its elasticity and feels like a block of wood (woody induration). This is the 'Red Flag' that indicates an intramuscular abscess is forming deep within the fascia."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest text-center italic">
                            Induration {" > "} Fluctuance
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isSequelae ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6 text-left"
              >
                {/* Hero Card */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                      <div className="p-8 bg-red-50 text-red-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         {activeTab === 'marjolins' ? <Skull size={48} /> : activeTab === 'amputation' ? <Scale size={48} /> : <AlertTriangle size={48} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-red-600 font-black text-[10px] uppercase tracking-widest italic">{(SEQUELAE_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic tracking-tight uppercase">Chronic OM Hallmark</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(SEQUELAE_DATA as any)[activeTab].title}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(SEQUELAE_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Layers className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 text-left">
                   <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-red-400 italic uppercase">
                         <Zap size={22} /> {activeTab === 'amputation' ? "Surgical Indications" : "Pathogenesis Matrix"}
                      </h4>
                      <div className="space-y-4 relative z-10">
                         {activeTab === 'amputation' ? (
                           SEQUELAE_DATA.amputation.indications.map((item, i) => (
                             <div key={i} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all text-left">
                                <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-xs shrink-0 italic">{i+1}</div>
                                <div>
                                   <h5 className="text-[11px] font-black text-red-400 uppercase mb-1 italic">{item.name}</h5>
                                   <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{item.d}</p>
                                </div>
                             </div>
                           ))
                         ) : (
                           <div className="space-y-6">
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl text-left">
                                 <h5 className="text-[10px] font-black text-red-400 uppercase mb-2 italic">Mechanism</h5>
                                 <p className="text-xs text-slate-300 leading-relaxed italic font-medium">{(SEQUELAE_DATA as any)[activeTab].pathology}</p>
                              </div>
                              {activeTab === 'marjolins' && (
                                <div className="p-5 bg-white/5 border border-white/10 rounded-3xl text-left">
                                   <h5 className="text-[10px] font-black text-red-400 uppercase mb-2 italic">Warning Signs</h5>
                                   <ul className="text-xs text-slate-400 space-y-1 font-medium italic">
                                      {SEQUELAE_DATA.marjolins.signs.map((s, i) => <li key={i}>• {s}</li>)}
                                   </ul>
                                </div>
                              )}
                              {activeTab === 'amyloidosis' && (
                                <div className="p-5 bg-white/5 border border-white/10 rounded-3xl text-left">
                                   <h5 className="text-[10px] font-black text-red-400 uppercase mb-2 italic">Impacted Systems</h5>
                                   <p className="text-xs text-slate-300 leading-relaxed italic font-medium">{SEQUELAE_DATA.amyloidosis.organs}</p>
                                </div>
                              )}
                              {activeTab === 'fracture' && (
                                <div className="p-5 bg-white/5 border border-white/10 rounded-3xl text-left">
                                   <h5 className="text-[10px] font-black text-red-400 uppercase mb-2 italic">Risk Assessment</h5>
                                   <p className="text-xs text-slate-300 leading-relaxed italic font-medium">{SEQUELAE_DATA.fracture.cause}</p>
                                </div>
                              )}
                           </div>
                         )}
                      </div>
                      <Maximize2 className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   <div className="space-y-6 text-left">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic text-left">
                            <Stethoscope size={22} className="text-red-600" /> Apley Clinical Perspective
                         </h4>
                         <div className="p-6 bg-red-50 border border-red-100 rounded-3xl text-center">
                            <p className="text-sm text-red-900 font-bold leading-relaxed italic">
                              {activeTab === 'marjolins' ? "Any long-standing sinus that starts to smell differently or bleed requires multiple wedge biopsies of the margin." : 
                               activeTab === 'amyloidosis' ? "Monitor chronic OM patients with regular urine dipsticks. Proteinuria is the first red flag for renal amyloidosis." : 
                               activeTab === 'fracture' ? "An infected pathological fracture rarely heals with simple casting. It usually needs a circular frame (Ilizarov) for stability and compression." : 
                               "The goal of amputation is a functional residual limb that allows the patient to return to work and social life."}
                            </p>
                         </div>
                      </div>

                      <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5 text-left">
                         <h5 className="text-[10px] font-black text-red-400 uppercase mb-3 flex items-center gap-2 italic">
                           <RotateCcw size={14} className="text-amber-500" /> Reconstructive Note
                         </h5>
                         <p className="text-xs font-medium leading-relaxed italic opacity-90 text-left">
                            {activeTab === 'marjolins' ? "The incidence of Marjolin's is low (<1%), but the mortality of late-detected SCC in bone is extremely high." : 
                             activeTab === 'amyloidosis' ? "Secondary (AA) amyloidosis is now rare in countries with early antibiotic access, but remains a killer in late-presentation cases." : 
                             "A 'pathological fracture' through infected bone can spread bacteria into previously sterile soft tissue planes."}
                         </p>
                         <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                      </div>
                   </div>
                </div>

                {/* Diagnostic Alert Area */}
                <div className="bg-red-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden text-left">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tighter">
                           <AlertTriangle size={24} className="text-red-400" /> The Transformation Trap
                         </h4>
                         <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                            "In a patient with a 30-year history of a discharging sinus, the 'foul odor' isn't just bacteria—it's the smell of necrotic tumor. If you see everted skin edges or rapid bone loss on X-ray, stop debriding and start biopsying."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center text-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest italic">
                            Pathology {" > "} Culture (in Chronic Sinuses)
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isPelvic ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6 text-left"
              >
                {/* Hero Card */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10 text-left">
                      <div className="p-8 bg-indigo-50 text-indigo-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         {activeTab === 'sacroiliitis' ? <Compass size={48} /> : activeTab === 'mimics' ? <Search size={48} /> : <ShieldAlert size={48} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-indigo-600 font-black text-[10px] uppercase tracking-widest italic">{(PELVIC_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic tracking-tight uppercase">Anatomical Command</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(PELVIC_DATA as any)[activeTab].title}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(PELVIC_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Database className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 text-left">
                   <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-indigo-400 italic uppercase italic">
                         <Zap size={22} /> Assessment & Differential
                      </h4>
                      <div className="space-y-4 relative z-10 text-left">
                         {activeTab === 'sacroiliitis' && PELVIC_DATA.sacroiliitis.tests.map((test, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all text-left">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-indigo-300 uppercase italic leading-none">{test.name}</h5>
                                 <Activity size={14} className="text-slate-600" />
                              </div>
                              <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{test.d}</p>
                           </div>
                         ))}
                         {activeTab === 'symphysitis' && PELVIC_DATA.symphysitis.differentiation.map((item, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-left">
                              <h5 className="text-[11px] font-black text-white uppercase italic mb-1">{item.feature}</h5>
                              <p className="text-xs text-slate-400 italic font-medium">{item.d}</p>
                           </div>
                         ))}
                         {(activeTab === 'ischial' || activeTab === 'mimics') && (
                           <div className="space-y-6">
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl text-left">
                                 <h5 className="text-[10px] font-black text-indigo-400 uppercase mb-2 italic">Pathogenesis</h5>
                                 <p className="text-xs text-slate-300 leading-relaxed italic font-medium">{(PELVIC_DATA as any)[activeTab].pathology}</p>
                              </div>
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl text-left">
                                 <h5 className="text-[10px] font-black text-indigo-400 uppercase mb-2 italic">Strategy / Mimicry</h5>
                                 <p className="text-xs text-slate-300 leading-relaxed italic font-medium">{(PELVIC_DATA as any)[activeTab].management || (PELVIC_DATA as any)[activeTab].mimicry}</p>
                              </div>
                           </div>
                         )}
                      </div>
                      <Crosshair className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   <div className="space-y-6 text-left">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic text-left">
                            <Stethoscope size={22} className="text-indigo-600" /> Clinical Action Plan
                         </h4>
                         <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl text-center">
                            <p className="text-sm text-indigo-900 font-bold leading-relaxed italic text-center">
                               {activeTab === 'sacroiliitis' ? "Initial treatment is 6 weeks of targeted IV antibiotics. Abscesses larger than 2cm in the pelvis should be drained percutaneously under CT guidance." : 
                                activeTab === 'symphysitis' ? "In septic symphysitis, if the bone is unstable, a pelvic external fixator or temporary plate may be required once the infection is controlled." : 
                                activeTab === 'ischial' ? "Pressure relief is 90% of the battle. Use specialized mattresses and strict turning schedules. Surgery is useless if the patient remains on the ischium." : 
                                "Obturator internus abscesses usually resolve with antibiotics alone. Only drain if the abscess is massive or the child fails to improve within 48 hours."}
                            </p>
                         </div>
                      </div>

                      <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5 text-left">
                         <h5 className="text-[10px] font-black text-indigo-400 uppercase mb-3 flex items-center gap-2 italic text-left">
                           <AlertTriangle size={14} className="text-amber-500" /> Apley Diagnostic Pearl
                         </h5>
                         <p className="text-xs font-medium leading-relaxed italic opacity-90 text-left">
                            {activeTab === 'sacroiliitis' ? "The SI joint is part synovial and part syndesmosis. Pyogenic infection usually attacks the lower (synovial) part first." : 
                             activeTab === 'mimics' ? "Internal rotation is the 'Key' to the hip. If internal rotation is free, the hip joint is safe—look at the deep muscles (Psoas or Obturator)." : 
                             "Ischial osteomyelitis in a paraplegic is a 'Deep Hole'—literally and clinically. Always evaluate the nutrition (Albumin) before flap surgery."}
                         </p>
                         <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                      </div>
                   </div>
                </div>

                {/* Diagnostic Alert Area */}
                <div className="bg-indigo-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden text-left">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tighter">
                           <Thermometer size={24} className="text-indigo-400" /> The "Bear-Claw" Sign
                         </h4>
                         <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                            "In sacroiliitis, a Technetium bone scan often shows a distinct three-pronged uptake pattern resembling a bear claw. This reflects the increased metabolic activity of the iliac side, the joint space, and the sacral side."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center text-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest italic text-center">
                            Pelvis = MRI {" > "} X-ray
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isCierny ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6 text-left"
              >
                {/* Hero Card */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10 text-left">
                      <div className="p-8 bg-emerald-50 text-emerald-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         {activeTab === 'host' ? <Activity size={48} /> : activeTab === 'anatomy' ? <Layers size={48} /> : activeTab === 'composites' ? <Beaker size={48} /> : <Target size={48} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-emerald-600 font-black text-[10px] uppercase tracking-widest italic">{(CIERNY_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic tracking-tight uppercase">Surgical Decision Matrix</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(CIERNY_DATA as any)[activeTab].title}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(CIERNY_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Dna className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 text-left">
                   <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-emerald-400 italic uppercase italic">
                         <Zap size={22} /> {activeTab === 'deadSpace' ? "Apley Protocol" : activeTab === 'composites' ? "Material Dynamics" : "Staging Parameters"}
                      </h4>
                      <div className="space-y-4 relative z-10 text-left">
                         {(activeTab === 'host' || activeTab === 'anatomy') && CIERNY_DATA[activeTab].types.map((type, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all text-left">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-emerald-400 uppercase italic leading-none">{type.id}</h5>
                                 <span className="text-[9px] font-black text-white px-2 py-0.5 bg-white/10 rounded-full">{type.id}</span>
                              </div>
                              <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{type.desc}</p>
                           </div>
                         ))}
                         {activeTab === 'composites' && CIERNY_DATA.composites.materials.map((m, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-left">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-white uppercase italic">{m.name}</h5>
                                 <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">{m.status}</span>
                              </div>
                              <p className="text-xs text-slate-400 italic font-medium leading-relaxed">{m.d}</p>
                           </div>
                         ))}
                         {activeTab === 'deadSpace' && CIERNY_DATA.deadSpace.protocol.map((step, i) => (
                            <div key={i} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl text-left">
                               <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-xs shrink-0 italic">{i+1}</div>
                               <div>
                                  <h5 className="text-[11px] font-black text-white uppercase mb-1 italic">{step.step}</h5>
                                  <p className="text-xs text-slate-400 italic font-medium">{step.d}</p>
                               </div>
                            </div>
                         ))}
                      </div>
                      <Maximize2 className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   <div className="space-y-6 text-left">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic text-left">
                            <Stethoscope size={22} className="text-emerald-600" /> Apley Clinical Perspective
                         </h4>
                         <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl text-center">
                            <p className="text-sm text-emerald-900 font-bold leading-relaxed italic">
                               {activeTab === 'host' ? "Cierny-Mader Host B status is potentially reversible. You can convert a Host B to a Host A by stopping smoking, optimizing HbA1c, and providing nutritional support." : 
                                activeTab === 'anatomy' ? "Superficial Type 2 infection is common in bedsores or plate infections. Saucerization often cures it without destabilizing the bone." : 
                                activeTab === 'composites' ? "If using Calcium Sulphate (e.g. Stimulan), warn the patient about possible 'sterile drainage'. It is not pus, but the material dissolving." : 
                                "The Papineau technique (open bone grafting) has been largely replaced by bio-composites and closed closure, but the principle of 'fresh bleeding' remains."}
                            </p>
                         </div>
                      </div>

                      <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5 text-left">
                         <h5 className="text-[10px] font-black text-emerald-400 uppercase mb-3 flex items-center gap-2 italic text-left">
                           <AlertTriangle size={14} className="text-amber-500" /> Surgical Logic
                         </h5>
                         <p className="text-xs font-medium leading-relaxed italic opacity-90 text-left">
                            {activeTab === 'host' ? "Local factors (Bl) include previous radiation, major scarring, and lymphedema—all of which create a 'poor biological bed' for healing." : 
                             activeTab === 'anatomy' ? "Type 4 diffuse infection usually requires a 'Segmental Resection' and an Ilizarov frame or Masquelet technique." : 
                             "Bio-glass (S53P4) is unique because its alkalinity kills bacteria without inducing resistance. It is the 'Nuclear Option' for local control."}
                         </p>
                         <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                      </div>
                   </div>
                </div>

                {/* Diagnostic Alert Area */}
                <div className="bg-emerald-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden text-left">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tighter">
                           <Database size={24} className="text-emerald-400" /> The Cierny-Mader Matrix
                         </h4>
                         <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                            "Successful management of chronic osteomyelitis is about matching the radicality of surgery to the resilience of the host. Staging is not just academic; it is the blueprint for survival vs. amputation."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center text-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest italic text-center">
                            Host + Anatomy = Strategy
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isPediatric ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6 text-left"
              >
                {/* Hero Card */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10 text-left">
                      <div className="p-8 bg-pink-50 text-pink-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         {activeTab === 'neonatal' ? <Baby size={48} /> : activeTab === 'sickleCell' ? <Dna size={48} /> : <Target size={48} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-pink-600 font-black text-[10px] uppercase tracking-widest italic">{(PEDIATRIC_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic tracking-tight uppercase">Pediatric Sepsis Matrix</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(PEDIATRIC_DATA as any)[activeTab].title}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(PEDIATRIC_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Activity className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 text-left">
                   <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-pink-400 italic uppercase italic">
                         <Zap size={22} /> Laboratory & Clinical Logic
                      </h4>
                      <div className="space-y-4 relative z-10 text-left">
                         {activeTab === 'subacute' && PEDIATRIC_DATA.subacute.types.map((type, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all text-left">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-pink-400 uppercase italic leading-none">{type.name}</h5>
                                 <span className="text-[9px] font-black text-white px-2 py-0.5 bg-white/10 rounded-full">{type.id}</span>
                              </div>
                              <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{type.desc}</p>
                           </div>
                         ))}
                         {activeTab === 'neonatal' && PEDIATRIC_DATA.neonatal.signs.map((sign, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-left">
                              <h5 className="text-[11px] font-black text-white uppercase italic mb-1">{sign.name}</h5>
                              <p className="text-xs text-slate-400 italic font-medium">{sign.d}</p>
                           </div>
                         ))}
                         {activeTab === 'physealBar' && PEDIATRIC_DATA.physealBar.classification.map((item, i) => (
                            <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-left">
                               <h5 className="text-[11px] font-black text-pink-400 uppercase mb-1 italic">{item.type}</h5>
                               <p className="text-xs text-slate-400 italic font-medium">{item.d}</p>
                            </div>
                         ))}
                         {activeTab === 'sickleCell' && (
                           <div className="space-y-6">
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl text-left">
                                 <h5 className="text-[10px] font-black text-pink-400 uppercase mb-2 italic">Pathogenesis</h5>
                                 <p className="text-xs text-slate-300 leading-relaxed italic font-medium">{PEDIATRIC_DATA.sickleCell.pathology}</p>
                              </div>
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl text-left">
                                 <h5 className="text-[10px] font-black text-pink-400 uppercase mb-2 italic">Imaging Hallmark</h5>
                                 <p className="text-xs text-slate-300 leading-relaxed italic font-medium">{PEDIATRIC_DATA.sickleCell.hallmark}</p>
                              </div>
                           </div>
                         )}
                      </div>
                      <Microscope className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   <div className="space-y-6 text-left">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic text-left">
                            <Stethoscope size={22} className="text-pink-600" /> Apley Pediatric Directive
                         </h4>
                         <div className="p-6 bg-pink-50 border border-pink-100 rounded-3xl text-center">
                            <p className="text-sm text-pink-900 font-bold leading-relaxed italic text-center">
                               {activeTab === 'subacute' ? PEDIATRIC_DATA.subacute.profile : 
                                activeTab === 'sickleCell' ? PEDIATRIC_DATA.sickleCell.differentiation : 
                                activeTab === 'neonatal' ? PEDIATRIC_DATA.neonatal.features : 
                                PEDIATRIC_DATA.physealBar.mechanism}
                            </p>
                         </div>
                      </div>

                      <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5 text-left">
                         <h5 className="text-[10px] font-black text-pink-400 uppercase mb-3 flex items-center gap-2 italic text-left">
                           <Search size={14} className="text-amber-500" /> Clinical Focus
                         </h5>
                         <p className="text-xs font-medium leading-relaxed italic opacity-90 text-left">
                            {activeTab === 'subacute' ? "Gledhill I-IV classification helps differentiate from malignancy. If MRI shows a 'Penumbra sign', it's almost certainly sub-acute OM." : 
                             activeTab === 'sickleCell' ? "Infarction usually involves the diaphysis; infection usually involves the metaphysis. Use bone scan + sulfur colloid scan if doubt persists." : 
                             activeTab === 'neonatal' ? "The 'Silent Killer'—neonates don't mount a systemic response. Look for the child who stops moving their arm or leg (Pseudoparalysis)." :
                             "Growth arrest is the most devastating sequelae. Monitor every child with septic arthritis for 2 years to ensure no bar formation."}
                         </p>
                         <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                      </div>
                   </div>
                </div>

                {/* Diagnostic Alert Area */}
                <div className="bg-pink-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden text-left">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tighter">
                           <AlertTriangle size={24} className="text-pink-400" /> The Immature Immune Risk
                         </h4>
                         <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                            "In children, the physics of infection is different. The tight periosteum, the trans-physeal vessels in neonates, and the anabolic potential of the bone mean that infection is both more destructive and more capable of healing if caught early."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center text-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest italic">
                            High Plasticity {" > "} Structural Damage
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isPharma ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6 text-left"
              >
                {/* Hero Card */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group text-left">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                      <div className="p-8 bg-amber-50 text-amber-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         {activeTab === 'resistance' ? <Dna size={48} /> : <Pill size={48} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-amber-600 font-black text-[10px] uppercase tracking-widest italic">{(PHARMA_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic">Apley Science Hub</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(PHARMA_DATA as any)[activeTab].title}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(PHARMA_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Beaker className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                </div>

                {/* Core Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 text-left">
                   <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-amber-400 italic uppercase italic">
                         <Zap size={22} /> Laboratory Data
                      </h4>
                      <div className="space-y-4 relative z-10 text-left">
                         {activeTab === 'resistance' && PHARMA_DATA.resistance.mechanisms.map((m, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all text-left">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-amber-400 uppercase italic leading-none">{m.name}</h5>
                                 <span className="text-[9px] font-black text-white px-2 py-0.5 bg-white/10 rounded-full">{m.bug}</span>
                              </div>
                              <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{m.d}</p>
                           </div>
                         ))}
                         {activeTab === 'penetration' && PHARMA_DATA.penetration.ratios.map((r, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-left">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-white uppercase italic">{r.drug}</h5>
                                 <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${r.status === 'Excellent' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>{r.ratio}</span>
                              </div>
                              <p className="text-xs text-slate-400 font-medium italic">{r.d}</p>
                           </div>
                         ))}
                         {activeTab === 'toxicities' && PHARMA_DATA.toxicities.warnings.map((w, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-left">
                              <h5 className="text-[11px] font-black text-red-400 uppercase mb-1 italic">{w.drug}</h5>
                              <p className="text-[10px] text-white font-black mb-1 uppercase tracking-wider">{w.effect}</p>
                              <p className="text-[10px] text-slate-400 leading-relaxed font-medium italic">{w.d}</p>
                           </div>
                         ))}
                         {activeTab === 'stewardship' && PHARMA_DATA.stewardship.concepts.map((c, i) => (
                           <div key={i} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl text-left">
                              <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white font-black text-xs shrink-0">{i+1}</div>
                              <div className="text-left">
                                 <h5 className="text-[11px] font-black text-white uppercase italic">{c.name}</h5>
                                 <p className="text-[10px] text-slate-400 leading-relaxed font-medium italic">{c.d}</p>
                              </div>
                           </div>
                         ))}
                      </div>
                      <Maximize2 className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   <div className="space-y-6 text-left">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                            <Stethoscope size={22} className="text-amber-600" /> Clinical Action Plan
                         </h4>
                         <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl">
                            <p className="text-sm text-amber-900 font-bold leading-relaxed italic text-center">
                              {activeTab === 'penetration' ? "In chronic medullary infection, prioritize Quinolones or Linezolid for oral step-down therapy due to their high bone penetration." : 
                               activeTab === 'resistance' ? "Always use combination therapy (e.g. Rifampicin + another agent) to treat hardware-associated infection to prevent the rapid emergence of resistance." : 
                               activeTab === 'toxicities' ? "Document a baseline tendon assessment before starting long-term Fluoroquinolones in any elderly patient." : 
                               "Target a trough level for Vancomycin of 15-20 ug/mL to ensure adequate medullary penetration in MRSA osteomyelitis."}
                            </p>
                         </div>
                      </div>

                      <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5 text-left">
                         <h5 className="text-[10px] font-black text-amber-400 uppercase mb-3 flex items-center gap-2 italic">
                           <AlertTriangle size={14} className="text-red-500" /> Diagnostic Pearl
                         </h5>
                         <p className="text-xs font-medium leading-relaxed italic opacity-90 text-left">
                            {activeTab === 'resistance' ? "Biofilm dormancy is not genetic resistance; it's physiological. This is why you must remove the hardware to 'wake up' the bacteria." : 
                             activeTab === 'penetration' ? "Beta-lactams (Penicillins/Cephalosporins) have poor bone penetration. They work well only because they are highly bactericidal." : 
                             "If a patient on long-term Linezolid develops easy bruising, check a full blood count immediately for thrombocytopenia."}
                         </p>
                         <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                      </div>
                   </div>
                </div>

                {/* Legend Area */}
                <div className="bg-amber-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden text-left">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tighter">
                           <ShieldPlus size={24} className="text-amber-300" /> The "Persister" Cell Threat
                         </h4>
                         <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                            "Persister cells are a phenotypic variant of bacteria that survive lethal doses of antibiotics by being in a dormant state. They are the primary reason for recurrence in osteomyelitis once therapy stops. Only mechanical debridement removes them."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center text-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest italic">
                            Mechanical {" > "} Pharmacological
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isDiabetic ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6 text-left"
              >
                {/* Hero Card */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                      <div className="p-8 bg-rose-50 text-rose-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         {activeTab === 'charcot' ? <Footprints size={48} /> : <Activity size={48} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-rose-600 font-black text-[10px] uppercase tracking-widest italic">{(DIABETIC_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic">Metabolic Orthopaedics</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(DIABETIC_DATA as any)[activeTab].title}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(DIABETIC_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Maximize2 className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 text-left">
                   <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-rose-400 italic uppercase">
                         <Zap size={22} /> {activeTab === 'charcot' ? "Eichenholtz Staging" : "Process Logic"}
                      </h4>
                      <div className="space-y-4 relative z-10">
                         {activeTab === 'charcot' && DIABETIC_DATA.charcot.stages.map((stage, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all text-left">
                              <h5 className="text-[11px] font-black text-rose-400 uppercase italic mb-1">{stage.s}</h5>
                              <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{stage.d}</p>
                           </div>
                         ))}
                         {activeTab === 'osteomyelitis' && (
                           <div className="space-y-6 text-left">
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[10px] font-black text-rose-400 uppercase mb-2 italic">Mechanism of Spread</h5>
                                 <p className="text-xs text-slate-300 leading-relaxed font-medium italic">{DIABETIC_DATA.osteomyelitis.logic}</p>
                              </div>
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[10px] font-black text-rose-400 uppercase mb-2 italic">Vascular Pathogenesis</h5>
                                 <p className="text-xs text-slate-300 leading-relaxed font-medium italic">{DIABETIC_DATA.osteomyelitis.pathogenesis}</p>
                              </div>
                           </div>
                         )}
                      </div>
                      <Wind className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   <div className="space-y-6 text-left">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic text-left">
                            <Stethoscope size={22} className="text-rose-600" /> Clinical Action Plan
                         </h4>
                         <div className="p-6 bg-rose-50 border border-rose-100 rounded-3xl text-center">
                            <p className="text-sm text-rose-900 font-bold leading-relaxed italic">
                              {activeTab === 'charcot' ? "The primary goal is a stable, plantigrade foot. Offloading (Total Contact Casting) is the gold standard for Stage 0 and I." : 
                               "The '1cm Rule': If an ulcer is > 2cm² or you can touch bone with a metal probe, the probability of osteomyelitis is over 85%."}
                            </p>
                         </div>
                      </div>

                      <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5 text-left">
                         <h5 className="text-[10px] font-black text-rose-400 uppercase mb-3 flex items-center gap-2 italic">
                           <AlertTriangle size={14} className="text-amber-500" /> Diabetic Alert
                         </h5>
                         <p className="text-xs font-medium leading-relaxed italic opacity-90 text-left">
                            {activeTab === 'charcot' ? "Acute Charcot (Stage 0/I) is the most misdiagnosed condition in the diabetic foot. It is NOT an infection; antibiotics are NOT indicated." : 
                             "MRI is the most specific imaging for diabetic OM, but it can be difficult to distinguish from Charcot changes. Bone biopsy remains the gold standard."}
                         </p>
                         <AlertCircle className="absolute top-4 right-4 text-white/5" size={60} />
                      </div>
                   </div>
                </div>

                {/* Legend Area */}
                <div className="bg-rose-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden text-left">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-widest">
                           <Footprints size={24} className="text-rose-300" /> The Neuropathic Balance
                         </h4>
                         <p className="text-sm text-slate-300 leading-relaxed italic font-medium text-left">
                            "In the diabetic foot, the absence of pain is the greatest danger. Without protective sensation, a minor abrasion becomes an ulcer, then a deep space infection, and finally osteomyelitis. The probe-to-bone test is the most important clinical skill in this hub."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center text-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest italic">
                            Neuropathy + Ischemia = High Risk
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isPrevention ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6 text-left"
              >
                {/* Hero Card */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                      <div className="p-8 bg-blue-50 text-blue-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         {activeTab === 'orEnvironment' ? <Fan size={48} /> : activeTab === 'prophylaxis' ? <Clock size={48} /> : <Droplets size={48} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-blue-600 font-black text-[10px] uppercase tracking-widest italic">{(PREVENTION_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic uppercase">Apley Protocol</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(PREVENTION_DATA as any)[activeTab].title}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(PREVENTION_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Layers className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 text-left">
                   <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-blue-400 italic uppercase tracking-tighter">
                         <Zap size={22} /> Bundle Parameters
                      </h4>
                      <div className="space-y-4 relative z-10 text-left">
                         {activeTab === 'orEnvironment' && (PREVENTION_DATA.orEnvironment.parameters).map((p, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all text-left">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-blue-400 uppercase italic">{p.name}</h5>
                                 <span className="text-[9px] font-black text-white px-2 py-0.5 bg-white/10 rounded-full italic">{p.val}</span>
                              </div>
                              <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{p.desc}</p>
                           </div>
                         ))}
                         {activeTab === 'skinPrep' && (PREVENTION_DATA.skinPrep.agents).map((a, i) => (
                           <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-3xl text-left">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-white uppercase italic">{a.name}</h5>
                                 <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest italic">{a.status}</span>
                              </div>
                              <p className="text-xs text-slate-400 leading-relaxed italic font-medium">{a.d}</p>
                           </div>
                         ))}
                         {activeTab === 'prophylaxis' && (PREVENTION_DATA.prophylaxis.rules).map((rule, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 text-left">
                              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-[10px] shrink-0 text-center leading-none px-1 italic">
                                 {rule.v}
                              </div>
                              <div>
                                 <h5 className="text-[11px] font-black text-white uppercase italic">{rule.r}</h5>
                                 <p className="text-xs text-slate-400 font-medium italic">{rule.d}</p>
                              </div>
                           </div>
                         ))}
                         {activeTab === 'irrigation' && (PREVENTION_DATA.irrigation.strategy).map((s, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-left">
                              <h5 className="text-[11px] font-black text-blue-400 uppercase mb-2 italic">{s.type}</h5>
                              <p className="text-[11px] text-slate-300 mb-1 leading-tight italic"><span className="text-emerald-400 font-black">PRO:</span> {s.pro}</p>
                              <p className="text-[11px] text-slate-300 leading-tight italic"><span className="text-red-400 font-black">CON:</span> {s.con}</p>
                           </div>
                         ))}
                      </div>
                      <Maximize2 className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   <div className="space-y-6 text-left">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center text-left">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                            <Stethoscope size={22} className="text-blue-600" /> Surgeon's Command
                         </h4>
                         <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl text-center">
                            <p className="text-sm text-blue-900 font-bold leading-relaxed italic">
                              {activeTab === 'orEnvironment' ? "Restrict traffic. Every person in the OR adds to the bacterial load. If a visitor is not necessary, they should not be in the room." : 
                               activeTab === 'skinPrep' ? "Apply Chlorhexidine-Alcohol with friction. The mechanical action is as important as the chemical for decolonizing skin pores." : 
                               activeTab === 'prophylaxis' ? "If a surgery is expected to last 5 hours, set an alarm at 4 hours for mandatory redosing of Cefazolin." : 
                               "Avoid 'over-irrigation' of soft tissues with high-pressure lavage, as it can damage the biological envelope and push bacteria deeper into tissues."}
                            </p>
                         </div>
                         <div className="mt-8 flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                            <CheckSquare className="text-emerald-500 shrink-0" size={20} />
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-tight italic">
                               Bundle compliance reduces SSI risk by up to 50% in elective arthroplasty.
                            </p>
                         </div>
                      </div>

                      <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5 text-left">
                         <h5 className="text-[10px] font-black text-blue-400 uppercase mb-3 flex items-center gap-2 italic">
                           <AlertTriangle size={14} className="text-amber-500" /> Apley Diagnostic Pearl
                         </h5>
                         <p className="text-xs font-medium leading-relaxed italic opacity-90 text-left">
                            {activeTab === 'skinPrep' ? "Never apply Chlorhexidine to open wounds or the middle ear (ototoxicity). Use aqueous Iodine for open fracture prep." : 
                             activeTab === 'prophylaxis' ? "Wait! If you give Vancomycin, it needs 60-90 mins for infusion. Plan the 'Knife-to-Skin' time accordingly." : 
                             "Laminar flow can actually increase infection risk if the surgical team stands BETWEEN the air source and the wound."}
                         </p>
                         <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                      </div>
                   </div>
                </div>

                {/* Checklist Area */}
                <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden text-left">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 text-left">
                      <div className="md:w-2/3 text-left">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tighter">
                           <Lock size={24} className="text-blue-300" /> The "Zero Infection" Philosophy
                         </h4>
                         <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                            "Prevention is a chain of weak links. One break—a door left open, a late antibiotic, a poor skin prep—can lead to the catastrophic failure of a joint replacement. The bundle ensures every link is forged."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center text-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest italic">
                            Systems {" > "} Individual Skill
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isInterventional ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6 text-left"
              >
                {/* Hero Card */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                      <div className="p-8 bg-indigo-50 text-indigo-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         {activeTab === 'safeZones' ? <Crosshair size={48} /> : activeTab === 'media' ? <Beaker size={48} /> : <Syringe size={48} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-indigo-600 font-black text-[10px] uppercase tracking-widest italic">{(DIAGNOSTIC_INTERVENTIONAL_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic uppercase">Apley Procedure</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(DIAGNOSTIC_INTERVENTIONAL_DATA as any)[activeTab].title}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(DIAGNOSTIC_INTERVENTIONAL_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Layers className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 text-left">
                   <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-indigo-400 italic uppercase tracking-tighter">
                         <Zap size={22} /> {activeTab === 'biopsy' ? "Biopsy Rules" : "Protocol steps"}
                      </h4>
                      <div className="space-y-3 relative z-10">
                         {activeTab === 'safeZones' && DIAGNOSTIC_INTERVENTIONAL_DATA.safeZones.joints.map((joint, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group text-left">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-indigo-300 uppercase italic">{joint.name}</h5>
                                 <Map size={14} className="text-slate-600" />
                              </div>
                              <p className="text-xs text-white font-bold leading-tight mb-2 italic">{joint.access}</p>
                              <p className="text-[10px] text-red-400 uppercase font-black tracking-widest italic">Risk: {joint.risk}</p>
                           </div>
                         ))}
                         {activeTab === 'dryTap' && DIAGNOSTIC_INTERVENTIONAL_DATA.dryTap.steps.map((step, i) => (
                           <div key={i} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl text-left">
                              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-xs shrink-0 italic">{step.id}</div>
                              <div>
                                 <h5 className="text-[11px] font-black text-white uppercase italic">{step.name}</h5>
                                 <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{step.desc}</p>
                              </div>
                           </div>
                         ))}
                         {activeTab === 'media' && DIAGNOSTIC_INTERVENTIONAL_DATA.media.cultures.map((c, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-left">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-indigo-400 uppercase italic">{c.agent}</h5>
                                 <Microscope size={14} className="text-slate-600" />
                              </div>
                              <p className="text-xs text-white font-bold mb-1 italic">{c.target}</p>
                              <p className="text-[10px] text-slate-400 italic font-bold italic">{"Note: " + c.note}</p>
                           </div>
                         ))}
                         {activeTab === 'biopsy' && (
                           <div className="space-y-4 text-left">
                              <div className="space-y-2">
                                 {DIAGNOSTIC_INTERVENTIONAL_DATA.biopsy.types.map((t, i) => (
                                   <div key={i} className="p-3 bg-white/10 rounded-xl flex justify-between items-center">
                                      <span className="text-[10px] font-black text-white italic">{t.type}</span>
                                      <span className="text-[9px] text-slate-400 italic max-w-[150px] text-right">{t.use}</span>
                                   </div>
                                 ))}
                              </div>
                              <div className="p-5 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl">
                                 <h5 className="text-[10px] font-black text-indigo-300 uppercase mb-2 italic">Procedural Guardrails</h5>
                                 {DIAGNOSTIC_INTERVENTIONAL_DATA.biopsy.rules.map((r, i) => <p key={i} className="text-[10px] text-slate-400 mb-1 italic font-medium">• {r}</p>)}
                              </div>
                           </div>
                         )}
                      </div>
                      <Search className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   <div className="space-y-6 text-left">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                            <Stethoscope size={22} className="text-indigo-600" /> Apley Procedural Pearl
                         </h4>
                         <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl">
                            <p className="text-sm text-indigo-900 font-bold leading-relaxed italic text-center">
                              {activeTab === 'safeZones' ? "If you cannot confidently palpate the joint landmark due to obesity or swelling, switch immediately to Ultrasound guidance. 'Blind' multiple passes increase infection risk." : 
                               activeTab === 'dryTap' ? "The saline lavage technique is essential for 'culture-negative' septic joints. It liberates bacteria from the synovium even when fluid is absent." : 
                               activeTab === 'media' ? "Chocolate agar is crucial for young adults (Gonococcus). For post-op infections, tell the lab to hold cultures for 14 days to find C. acnes." : 
                               "The biopsy track must be meticulously planned. If you biopsy in the wrong plane, you may necessitate a much larger definitive surgical resection."}
                            </p>
                         </div>
                      </div>

                      <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5 text-left">
                         <h5 className="text-[10px] font-black text-indigo-400 uppercase mb-3 flex items-center gap-2 italic">
                           <AlertTriangle size={14} className="text-amber-500" /> Diagnostic Alert
                         </h5>
                         <p className="text-xs font-medium leading-relaxed italic opacity-90 text-left">
                            {activeTab === 'safeZones' ? "Aspiration of the hip in children should always be done under imaging. The femoral head is tiny and easily damaged by a needle." : 
                             activeTab === 'biopsy' ? "Never use local anesthetic (Lidocaine) inside the joint or bone before taking cultures. It has bacteriostatic properties that can kill your sample." : 
                             "If the patient has been on antibiotics, you must wait at least 2 weeks (ideally 4) after the last dose before taking cultures for reliable results."}
                         </p>
                         <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                      </div>
                   </div>
                </div>

                {/* Molecular Alert Area */}
                <div className="bg-indigo-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden text-left">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tighter">
                           <ClipboardCheck size={24} className="text-indigo-300" /> The "Aspirate Before Antibiotics" Rule
                         </h4>
                         <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                            "This is the most broken rule in orthopaedics. Starting antibiotics before cultures reduces your diagnostic yield by over 50%. Unless the patient is in unstable septic shock, the needle comes before the IV bag."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center text-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest italic">
                            Diagnosis {" > "} Empiricism
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isVascular ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6"
              >
                {/* Hero Informational Card */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group text-left">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                      <div className="p-8 bg-indigo-50 text-indigo-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         {activeTab === 'tomSmith' ? <Baby size={48} /> : <ArrowDownUp size={48} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-indigo-600 font-black text-[10px] uppercase tracking-widest">{(VASCULAR_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic">Apley Mechanism</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(VASCULAR_DATA as any)[activeTab].title}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(VASCULAR_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Layers className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                </div>

                {/* Deep Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 text-left">
                   {/* LEFT: Structural Logic */}
                   <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-indigo-400 italic uppercase">
                         <Zap size={22} /> Age/Pattern Dynamics
                      </h4>
                      <div className="space-y-4 relative z-10">
                         {activeTab === 'trueta' && VASCULAR_DATA.trueta.stages.map((stage, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all text-left">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-indigo-300 uppercase italic">{stage.age}</h5>
                                 <User size={14} className="text-slate-600" />
                              </div>
                              <p className="text-[10px] text-white font-black uppercase mb-1 tracking-widest">{stage.feature}</p>
                              <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{stage.desc}</p>
                           </div>
                         ))}
                         {activeTab === 'periosteum' && VASCULAR_DATA.periosteum.impact.map((item, i) => (
                           <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-3xl text-left">
                              <h5 className="text-[11px] font-black text-indigo-400 uppercase mb-2 italic">{item.name}</h5>
                              <p className="text-xs text-slate-300 leading-relaxed italic">{item.d}</p>
                           </div>
                         ))}
                         {activeTab === 'microAnatomy' && VASCULAR_DATA.microAnatomy.components.map((c, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 text-left">
                              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-xs shrink-0 italic">{i+1}</div>
                              <div>
                                 <h5 className="text-[11px] font-black text-white uppercase italic">{c.name}</h5>
                                 <p className="text-xs text-slate-400 italic font-medium">{c.role}</p>
                              </div>
                           </div>
                         ))}
                         {activeTab === 'tomSmith' && (
                           <div className="space-y-4 text-left">
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[10px] font-black text-red-400 uppercase mb-2 italic">Pathogenesis</h5>
                                 <p className="text-xs leading-relaxed text-slate-300 italic">{VASCULAR_DATA.tomSmith.pathology}</p>
                              </div>
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[10px] font-black text-red-400 uppercase mb-2 italic">Surgical Management</h5>
                                 <p className="text-xs leading-relaxed text-slate-300 italic">{VASCULAR_DATA.tomSmith.management}</p>
                              </div>
                           </div>
                         )}
                      </div>
                      <Maximize2 className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   {/* RIGHT: Actions & Clinical Judgment */}
                   <div className="space-y-6 text-left">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                            <Stethoscope size={22} className="text-indigo-600" /> Clinical Action Plan
                         </h4>
                         <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl">
                            <p className="text-sm text-indigo-900 font-bold leading-relaxed italic text-center">
                              {activeTab === 'trueta' ? "If a child is in the 'Trueta Gap' (< 18 months), always perform an ultrasound of the joint even if the X-ray is of the bone." : 
                               activeTab === 'tomSmith' ? "Neonatal sepsis of the hip is a medical emergency. The hip must be aspirated and washed out IMMEDIATELY to prevent chondrolysis." : 
                               activeTab === 'periosteum' ? "In children, surgical decompression of the sub-periosteal abscess is vital to prevent the development of a massive sequestrum." : 
                               "Understand that metaphyseal hairpin loops are the 'gravity well' for bacteria; this is the primary site of seeding in AHO."}
                            </p>
                         </div>
                      </div>

                      <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                         <h5 className="text-[10px] font-black text-indigo-400 uppercase mb-3 flex items-center gap-2 italic">
                           <AlertTriangle size={14} className="text-amber-500" /> Apley Diagnostic Pearl
                         </h5>
                         <p className="text-xs font-medium leading-relaxed italic opacity-90 text-left">
                            {activeTab === 'trueta' ? "The fusion of the physis changes the clinical map of infection. In adults, osteomyelitis often presents with a joint effusion." : 
                             activeTab === 'periosteum' ? "Because an adult's periosteum is so tight, pus cannot lift it. Instead, it causes high-pressure 'bone pain' without a palpable abscess." : 
                             "Tom Smith's arthritis can be silent. The only sign may be a child who stops kicking their legs (pseudoparalysis)."}
                         </p>
                         <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                      </div>
                   </div>
                </div>

                {/* Molecular Alert Area */}
                <div className="bg-indigo-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden text-left">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tighter">
                           <Lock size={24} className="text-indigo-300" /> The "Intra-Articular" Metaphysis
                         </h4>
                         <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                            "In the Hip, Shoulder, and Ankle, the metaphysis is partially inside the joint capsule. This means even in children where the physis is a barrier, metaphyseal osteomyelitis can still cause septic arthritis by tracking through the intra-articular cortex."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest text-center italic">
                            Hip / Shoulder / Ankle Risk
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isBiomech ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6"
              >
                {/* Hero Informational Card */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                      <div className="p-8 bg-blue-50 text-blue-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         {activeTab === 'stability' ? <Lock size={48} /> : <Settings size={48} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-blue-600 font-black text-[10px] uppercase tracking-widest">{(BIOMECH_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic">Clinical Engineering</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(BIOMECH_DATA as any)[activeTab].title}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(BIOMECH_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Database className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                </div>

                {/* Core Content Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                   {/* LEFT: Structural Logic / Mechanics */}
                   <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-blue-400 italic uppercase">
                         <Zap size={22} /> Process Mechanics
                      </h4>
                      <div className="space-y-4 relative z-10">
                         {activeTab === 'stability' && (BIOMECH_DATA.stability.mechanics).map((m, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-blue-300 uppercase italic">{m.name}</h5>
                                 <Activity size={14} className="text-slate-600" />
                              </div>
                              <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{m.d}</p>
                           </div>
                         ))}
                         {activeTab === 'pinSite' && (
                           <div className="space-y-3">
                              <p className="text-[10px] font-black uppercase text-blue-400 mb-4 tracking-widest italic">Staging (Checketts)</p>
                              {(BIOMECH_DATA.pinSite.stages).map((s, i) => (
                                 <div key={i} className="flex justify-between items-center p-3.5 bg-white/5 border border-white/10 rounded-xl">
                                    <span className="font-black text-xs text-white italic">{s.s}</span>
                                    <span className="text-[10px] text-slate-400 font-medium text-right max-w-[160px] italic">{s.d}</span>
                                 </div>
                              ))}
                           </div>
                         )}
                         {activeTab === 'cement' && (BIOMECH_DATA.cement.kinetics).map((k, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                              <h5 className="text-[10px] font-black text-blue-400 uppercase mb-1 italic">{k.phase}</h5>
                              <p className="text-xs text-slate-300 font-medium italic">{(k as any).d}</p>
                           </div>
                         ))}
                         {activeTab === 'materials' && (BIOMECH_DATA.materials.profiles).map((p, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-white uppercase italic">{p.mat}</h5>
                                 <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${p.risk === 'Low' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>Risk: {p.risk}</span>
                              </div>
                              <p className="text-xs text-slate-400 leading-relaxed italic">{p.note}</p>
                           </div>
                         ))}
                      </div>
                      <Maximize2 className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   {/* RIGHT: Actions & Clinical Strategy */}
                   <div className="space-y-6">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                            <Stethoscope size={22} className="text-blue-600" /> Clinical Action Plan
                         </h4>
                         <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl">
                            <p className="text-sm text-blue-900 font-bold leading-relaxed italic text-center">
                              {activeTab === 'stability' ? "In an infected non-union, convert loose internal fixation to a stable external circular frame (Ilizarov)." : 
                               activeTab === 'pinSite' ? "Daily cleaning with soap and water is more effective than expensive antiseptic solutions. Crusts must be removed." : 
                               activeTab === 'cement' ? "Use hand-mixed cement to increase surface porosity, which drastically improves antibiotic elution compared to vacuum-mixed." : 
                               "Titanium plates allow better MRI imaging than steel, which is vital for monitoring the resolution of adjacent osteomyelitis."}
                            </p>
                         </div>
                      </div>

                      <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                         <h5 className="text-[10px] font-black text-blue-400 uppercase mb-3 flex items-center gap-2 italic">
                           <AlertTriangle size={14} className="text-amber-500" /> Apley Diagnostic Pearl
                         </h5>
                         <p className="text-xs font-medium leading-relaxed italic opacity-90">
                            {activeTab === 'stability' ? "Loose hardware is an anatomical 'dead space'. Until it is removed or re-stabilized, antibiotics are a waste of resources." : 
                             activeTab === 'pinSite' ? "Always radiograph a persistent Grade 2 infection. A 'halo' around the pin on X-ray confirms hardware loosening and track OM." : 
                             activeTab === 'cement' ? "Rifampicin cannot be mixed in cement because it prevents the PMMA from setting properly." :
                             "A bio-absorbable screw that 'liquefies' can present exactly like a joint infection. Always aspirate; it will be sterile but cellular."}
                         </p>
                         <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                      </div>
                   </div>
                </div>

                {/* Molecular Alert Area */}
                <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tight">
                           <Thermometer size={24} className="text-blue-300" /> The "Sterile Osteolysis"
                         </h4>
                         <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                            "Bio-materials and metal debris can trigger a massive inflammatory response that looks like infection. Before declaring a failure to be septic, check the inflammatory markers. In sterile osteolysis, the CRP is typically normal."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest text-center italic">
                            Mechanical Failure {' > '} Sepsis
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isNiche ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6"
              >
                {/* Hero Informational Card */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                      <div className="p-8 bg-indigo-50 text-indigo-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         <Microscope size={48} />
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-indigo-600 font-black text-[10px] uppercase tracking-widest">{(NICHE_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic">Apley Specialty Hub</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(NICHE_DATA as any)[activeTab].title}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(NICHE_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Dna className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                </div>

                {/* Core Content Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                   {/* LEFT: Structural Logic / Pathology */}
                   <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-indigo-400 italic uppercase">
                         <Zap size={22} /> Diagnostic Parameters
                      </h4>
                      <div className="space-y-4 relative z-10">
                         {activeTab === 'lyme' && (NICHE_DATA.lyme.stages).map((stage, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-indigo-400 uppercase">{stage.s}</h5>
                                 <Target size={14} className="text-slate-600" />
                              </div>
                              <p className="text-xs text-slate-300 font-medium leading-relaxed italic">{stage.d}</p>
                           </div>
                         ))}
                         {activeTab === 'viral' && (NICHE_DATA.viral.organisms).map((org, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                              <h5 className="text-[11px] font-black text-white uppercase mb-1">{org.name}</h5>
                              <p className="text-xs text-slate-400 leading-relaxed font-medium italic">{org.feature}</p>
                           </div>
                         ))}
                         {(activeTab === 'gonococcal' || activeTab === 'reactive') && (
                           <div className="space-y-6">
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[10px] font-black text-indigo-400 uppercase mb-2 italic">Pathogenesis</h5>
                                 <p className="text-xs text-slate-300 leading-relaxed font-medium italic">{(NICHE_DATA as any)[activeTab].pathology}</p>
                              </div>
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[10px] font-black text-indigo-400 uppercase mb-2 italic">Clinical Hallmark</h5>
                                 <p className="text-xs text-slate-300 leading-relaxed font-medium italic">{(NICHE_DATA as any)[activeTab].triad || (NICHE_DATA as any)[activeTab].detection}</p>
                              </div>
                           </div>
                         )}
                      </div>
                      <Search className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   {/* RIGHT: Actions & Clinical Strategy */}
                   <div className="space-y-6">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                            <Stethoscope size={22} className="text-indigo-600" /> Clinical Action Plan
                         </h4>
                         <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl">
                            <p className="text-sm text-indigo-900 font-bold leading-relaxed italic text-center">
                              {activeTab === 'gonococcal' ? "DGI is highly responsive to Ceftriaxone. If you suspect it, treat the patient (and partners) immediately." : 
                               activeTab === 'lyme' ? "Acute Lyme arthritis is treated with 28 days of Doxycycline. Surgery (synovectomy) is rarely needed." : 
                               activeTab === 'viral' ? "Treatment is purely supportive (NSAIDs). The primary goal is to reassure the patient it is not progressive RA." : 
                               "Focus on the primary infection (Salmonella/Chlamydia). Use NSAIDs for the joint; avoid steroids in the acute phase."}
                            </p>
                         </div>
                      </div>

                      <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                         <h5 className="text-[10px] font-black text-indigo-400 uppercase mb-3 flex items-center gap-2 italic">
                           <AlertTriangle size={14} className="text-amber-500" /> Apley Diagnostic Alert
                         </h5>
                         <p className="text-xs font-medium leading-relaxed italic opacity-90">
                            {activeTab === 'gonococcal' ? "The 'Migratory' phase only lasts a few days before settling into a persistent monoarthritis. Catch it early!" : 
                             activeTab === 'reactive' ? "Reactive arthritis fluid is sterile. If you see high WBCs but negative cultures, always ask about GI/GU history." : 
                             "Parvovirus B19 in adults can cause an extremely convincing 'RA-lookalike' with high ESR; always check for Slapped Cheek rash history."}
                         </p>
                         <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                      </div>
                   </div>
                </div>

                {/* Molecular Alert Area */}
                <div className="bg-indigo-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tight">
                           <Thermometer size={24} className="text-indigo-300" /> The "Sterile Flare"
                         </h4>
                         <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                            "Not all painful, swollen joints are infected. Inflammatory flares (Gout, Viral, Reactive) can mimic sepsis perfectly. The differentiator is often the systemic rash and the duration of symptoms before the joint settles."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest text-center italic">
                            Serology & History {" > "} Gram Stain
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isAtypicalRare ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6"
              >
                {/* Hero Informational Card */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                      <div className="p-8 bg-blue-50 text-blue-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         {activeTab === 'hydatid' ? <Globe size={48} /> : <Bug size={48} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-blue-600 font-black text-[10px] uppercase tracking-widest">{(PARASITE_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic">Infectious Mystery</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(PARASITE_DATA as any)[activeTab].title}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(PARASITE_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Database className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                </div>

                {/* Core Content Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                   {/* LEFT: Structural Logic / Pathology */}
                   <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-blue-400 italic uppercase">
                         <Zap size={22} /> Pathological Parameters
                      </h4>
                      <div className="space-y-4 relative z-10">
                         <div className="p-5 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all">
                            <h5 className="text-[10px] font-black text-blue-400 uppercase mb-2 italic">Mechanism</h5>
                            <p className="text-xs text-slate-300 leading-relaxed italic">{(PARASITE_DATA as any)[activeTab].pathology}</p>
                         </div>
                         <div className="p-5 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all">
                            <h5 className="text-[10px] font-black text-blue-400 uppercase mb-2 italic">Key Findings</h5>
                            <p className="text-xs text-slate-300 leading-relaxed italic">
                              {(PARASITE_DATA as any)[activeTab].imaging || (PARASITE_DATA as any)[activeTab].tenosynovitis || (PARASITE_DATA as any)[activeTab].hallmark}
                            </p>
                         </div>
                      </div>
                      <Microscope className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   {/* RIGHT: Actions & Clinical Strategy */}
                   <div className="space-y-6">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                            <Stethoscope size={22} className="text-blue-600" /> Surgical Strategy
                         </h4>
                         <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl">
                            <p className="text-sm text-blue-900 font-bold leading-relaxed italic text-center">
                              {activeTab === 'hydatid' ? "Avoid aspiration! Use Albendazole pre-operatively and rinse the cavity with Hypertonic Saline (scolicidal agent) during surgery." : 
                               activeTab === 'marinum' ? "Treatment is typically Clarithromycin or Quinolones. Surgery is reserved for chronic flexor tenosynovitis." : 
                               activeTab === 'actinomycosis' ? "Massive debridement is required as the infection tracks through bone like a tumour. Penicillin is the cure." : 
                               "Diagnosis relies on tissue biopsy showing broad-based budding yeast. Treat with Itraconazole or Amphotericin B."}
                            </p>
                         </div>
                      </div>

                      <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                         <h5 className="text-[10px] font-black text-blue-400 uppercase mb-3 flex items-center gap-2 italic">
                           <AlertTriangle size={14} className="text-amber-500" /> Apley Diagnostic Trap
                         </h5>
                         <p className="text-xs font-medium leading-relaxed italic opacity-90">
                            {activeTab === 'hydatid' ? "Spinal Hydatidosis often presents as paraplegia. It is the 'Pott's disease' of the Middle East and Australia in farmers." : 
                             activeTab === 'marinum' ? "Standard lab culture at 37°C will be sterile. You MUST tell the lab to culture at 30°C for suspected marine pathogens." : 
                             activeTab === 'actinomycosis' ? "Don't confuse the 'Sulfur Granules' with actual sulfur. They are macroscopic clumps of Actinomyces bacteria." :
                             "If a lytic lesion looks like a Giant Cell Tumour (GCT) but the patient has a verrucous skin rash, think Blastomycosis."}
                         </p>
                         <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                      </div>
                   </div>
                </div>

                {/* Tropical Disease Alert Area */}
                <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tight">
                           <Thermometer size={24} className="text-blue-300" /> The "Cold" Parasitic Abscess
                         </h4>
                         <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                            "Parasitic and fungal infections often present as 'cold' processes. There is no fever, no heat, and no high WBC count. The diagnosis is often made months or years after the initial exposure."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest text-center italic">
                            Serology & Tissue Biopsy {" > "} Blood Culture
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isFrontier ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6"
              >
                {/* Hero Visual Header */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                      <div className="p-8 bg-emerald-50 text-emerald-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:rotate-6 duration-500">
                         {activeTab === 'kingella' ? <Baby size={48} /> : <Activity size={48} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-emerald-600 font-black text-[10px] uppercase tracking-widest">{(FRONTIER_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic tracking-tight">Current Perspective</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(FRONTIER_DATA as any)[activeTab].title}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(FRONTIER_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Layers className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                </div>

                {/* Deep Content Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                   {/* LEFT COLUMN: Data Matrix */}
                   <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-emerald-400 italic uppercase">
                         <Zap size={22} /> {activeTab === 'optimization' ? "Host Parameters" : "Mechanism of Failure"}
                      </h4>
                      <div className="space-y-4 relative z-10">
                         {activeTab === 'optimization' && FRONTIER_DATA.optimization.criteria.map((c, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-emerald-400 uppercase tracking-tighter">{c.name}</h5>
                                 <span className="text-[9px] font-black text-white px-2 py-0.5 bg-white/10 rounded-full">{c.value}</span>
                              </div>
                              <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{c.desc}</p>
                           </div>
                         ))}
                         {activeTab === 'raceSurface' && FRONTIER_DATA.raceSurface.factors.map((f, i) => (
                           <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all group">
                              <h5 className="text-[11px] font-black text-emerald-400 uppercase mb-2 tracking-tighter group-hover:text-emerald-300 transition-colors">{f.name}</h5>
                              <p className="text-xs text-slate-300 italic leading-tight">{f.effect}</p>
                           </div>
                         ))}
                         {activeTab === 'kingella' && (
                           <div className="space-y-4">
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[10px] font-black text-emerald-400 uppercase mb-2 italic">Detection Strategy</h5>
                                 <p className="text-xs leading-relaxed text-slate-300 italic">{FRONTIER_DATA.kingella.detection}</p>
                              </div>
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[10px] font-black text-emerald-400 uppercase mb-2 italic">Clinical Profile</h5>
                                 <p className="text-xs leading-relaxed text-slate-300 italic">{FRONTIER_DATA.kingella.profile}</p>
                              </div>
                           </div>
                         )}
                         {activeTab === 'aclSepsis' && FRONTIER_DATA.aclSepsis.protocol.map((s, i) => (
                           <div key={i} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-xs shrink-0 italic">{i+1}</div>
                              <div>
                                 <h5 className="text-[11px] font-black text-white uppercase">{s.step}</h5>
                                 <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{s.d}</p>
                              </div>
                           </div>
                         ))}
                      </div>
                      <Wind className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   {/* RIGHT COLUMN: Actions & Judgment */}
                   <div className="space-y-6">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                            <Stethoscope size={22} className="text-emerald-600" /> Surgical Strategy
                         </h4>
                         <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl">
                            <p className="text-sm text-emerald-900 font-bold leading-relaxed italic text-center">
                              {activeTab === 'optimization' ? "The time spent optimizing the host is never wasted. Delaying surgery for a month to drop an HbA1c can save a limb." : 
                               activeTab === 'raceSurface' ? "If surgery is delayed (e.g. trauma), the bacterial 'head start' on the metal is often impossible to catch up with." : 
                               activeTab === 'kingella' ? "Most Kingella cases resolve with Beta-lactams. They are generally resistant to Clindamycin/Vancomycin." : 
                               "Save the graft if possible, but never at the expense of a permanent arthrofibrosis or systemic sepsis."}
                            </p>
                         </div>
                      </div>

                      <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                         <h5 className="text-[10px] font-black text-emerald-400 uppercase mb-3 flex items-center gap-2 italic">
                           <AlertTriangle size={14} className="text-amber-500" /> Apley Diagnostic Alert
                         </h5>
                         <p className="text-xs font-medium leading-relaxed italic opacity-90">
                            {activeTab === 'kingella' ? "Kingella kingae is a normal inhabitant of the pharynx. It often seeds bone after a viral upper respiratory infection." : 
                             activeTab === 'optimization' ? "Malnutrition (Albumin < 3.5) is more common in the elderly and the 'poverty-compromised' than we realize. Measure it." : 
                             "Titanium implants form a tighter biological seal with bone, making them 'safer' in high-infection environments than Steel."}
                         </p>
                         <ShieldCheck className="absolute top-4 right-4 text-white/5" size={60} />
                      </div>
                   </div>
                </div>

                {/* Legend / Special Context Area */}
                <div className="bg-emerald-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tight">
                           <Dna size={24} className="text-emerald-300" /> Host-Pathogen Equilibrium
                         </h4>
                         <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                            "Orthopaedic infection is not just about the bug; it’s about the soil. A compromised host (Grade C) cannot defend even a low-virulence attack. Host optimization is the primary preventive measure in modern arthroplasty."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest text-center italic">
                            {"Immune Defense > Surface Chemistry"}
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : isTrauma ? (
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
                className="space-y-6 text-left"
              >
                {/* Hero Card */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group text-left">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                      <div className="p-8 bg-teal-50 text-teal-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         {activeTab === 'caffeys' ? <Baby size={48} /> : <Microscope size={48} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-teal-600 font-black text-[10px] uppercase tracking-widest italic">{(STEALTH_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic">Apley Specialist View</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(STEALTH_DATA as any)[activeTab].title}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(STEALTH_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Layers className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                </div>

                {/* Deep Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 text-left">
                   <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-teal-400 italic uppercase">
                         <Zap size={22} /> Laboratory & Diagnostic Parameters
                      </h4>
                      <div className="space-y-4 relative z-10 text-left">
                         {activeTab === 'hiv' && (STEALTH_DATA.hiv.challenges).map((c, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all text-left">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-[11px] font-black text-teal-300 uppercase italic">{c.name}</h5>
                                 <Activity size={14} className="text-slate-600" />
                              </div>
                              <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{c.desc}</p>
                           </div>
                         ))}
                         {activeTab === 'spondylitis' && (
                           <div className="space-y-4 text-left">
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[10px] font-black text-teal-400 uppercase mb-2 italic">Pathogenesis</h5>
                                 <p className="text-xs leading-relaxed text-slate-300 font-medium italic">{STEALTH_DATA.spondylitis.pathology}</p>
                              </div>
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[10px] font-black text-red-400 uppercase mb-2 italic">Apley Differentiator</h5>
                                 <p className="text-xs leading-relaxed text-slate-300 font-medium italic">{STEALTH_DATA.spondylitis.distinction}</p>
                              </div>
                           </div>
                         )}
                         {activeTab === 'culture' && STEALTH_DATA.culture.steps.map((s, i) => (
                           <div key={i} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all text-left">
                              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-black text-xs shrink-0">{s.id}</div>
                              <div>
                                 <h5 className="text-[11px] font-black text-white uppercase italic">{s.name}</h5>
                                 <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{s.desc}</p>
                              </div>
                           </div>
                         ))}
                         {activeTab === 'shoulderPJI' && STEALTH_DATA.shoulderPJI.signs.map((sign, i) => (
                           <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-3xl text-left">
                              <h5 className="text-[11px] font-black text-teal-400 uppercase mb-2 italic">{sign.name}</h5>
                              <p className="text-xs text-slate-300 leading-relaxed font-medium italic">{sign.d}</p>
                           </div>
                         ))}
                         {(activeTab === 'cacnes' || activeTab === 'caffeys' || activeTab === 'brucellosis' || activeTab === 'fungal') && (
                           <div className="space-y-6 text-left">
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[10px] font-black text-teal-400 uppercase mb-2 italic">Biology / Pathology</h5>
                                 <p className="text-xs text-slate-300 leading-relaxed font-medium italic">{(STEALTH_DATA as any)[activeTab].profile || (STEALTH_DATA as any)[activeTab].pathology || (STEALTH_DATA as any)[activeTab].differentiation}</p>
                              </div>
                              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[10px] font-black text-teal-400 uppercase mb-2 italic">Behavior / Triad / Source</h5>
                                 <p className="text-xs text-slate-300 leading-relaxed font-medium italic">{(STEALTH_DATA as any)[activeTab].behavior || (STEALTH_DATA as any)[activeTab].triad?.join(', ') || (STEALTH_DATA as any)[activeTab].transmission || (STEALTH_DATA as any)[activeTab].organisms}</p>
                              </div>
                           </div>
                         )}
                      </div>
                      <Maximize2 className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   <div className="space-y-6 text-left">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                            <Stethoscope size={22} className="text-teal-600" /> Clinical Action Plan
                         </h4>
                         <div className="p-6 bg-teal-50 border border-teal-100 rounded-3xl text-center">
                            <p className="text-sm text-teal-900 font-bold leading-relaxed italic">
                              {activeTab === 'cacnes' ? "When revising a 'stiff' shoulder, always assume C. acnes is present. Pre-operative skin prep should include Benzoyl Peroxide." : 
                               activeTab === 'culture' ? "If a culture is reported as 'No Growth' at day 7, do not stop antibiotics if clinical suspicion is high. Wait for day 14." : 
                               activeTab === 'shoulderPJI' ? "Aspirating a shoulder for C. acnes has low sensitivity. Diagnosis often requires multiple intra-operative tissue biopsies." : 
                               activeTab === 'caffeys' ? "Reassure parents of a child with Caffey's disease. The prognosis is excellent; bony resolution is almost guaranteed." :
                               activeTab === 'spondylitis' ? "Biopsy of the disc space is mandatory for microbiology before starting empiric antibiotics." : 
                               activeTab === 'hiv' ? "A single dose of prophylactic antibiotics is sufficient for standard surgeries, but increase surveillance for wound breakdown." : 
                               activeTab === 'brucellosis' ? "Treatment requires combination therapy (Doxycycline + Rifampicin) for a minimum of 6-12 weeks." : 
                               "Fungal bone infection is a marker of profound systemic failure; assess the host's overall immunity."}
                            </p>
                         </div>
                      </div>

                      <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5 text-left">
                         <h5 className="text-[10px] font-black text-teal-400 uppercase mb-3 flex items-center gap-2 italic">
                           <AlertTriangle size={14} className="text-amber-500" /> Diagnostic Pearl
                         </h5>
                         <p className="text-xs font-medium leading-relaxed italic opacity-90 text-left">
                            {activeTab === 'cacnes' ? "C. acnes is a 'commensal-turned-pathogen'. Because it is common skin flora, a single positive culture is often dismissed. Don't make that mistake." : 
                             activeTab === 'caffeys' ? "Caffey's is the only condition where the mandible is the most common site of sub-periosteal bone formation in an infant." : 
                             activeTab === 'shoulderPJI' ? "Shoulder PJI markers (ESR/CRP) are often completely normal in C. acnes infection. You must rely on clinical suspicion and biopsy." :
                             activeTab === 'spondylitis' ? "The 'Disc Sign': Tumours spare the disc because they respect the anatomical boundaries. Infection crosses them." : 
                             activeTab === 'brucellosis' ? "The Rose-Bengal test is the classic rapid screening test. Positive titres (>1:160) are diagnostic in the right clinical context." : 
                             "Charcot Arthropathy in HIV patients can be mistaken for infection. Check inflammatory markers; they are often low in Charcot."}
                         </p>
                         <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                      </div>
                   </div>
                </div>

                {/* Legend Area */}
                <div className="bg-teal-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden text-left">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tighter">
                           <Database size={24} className="text-teal-300" /> The "Commensal" Dilemma
                         </h4>
                         <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                            "In orthopaedic forensics, the hardest task is distinguishing a 'hitchhiker' (skin contaminant) from a 'hijacker' (pathogen). In shoulder surgery, the burden of proof is on the surgeon to prove that a positive C. acnes culture is NOT an infection."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center text-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest italic">
                            Tissue Biopsy {" > "} Swab
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
                className="space-y-6 text-left"
              >
                {/* Hero Informational Card */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                      <div className="p-8 bg-purple-50 text-purple-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         {activeTab === 'masquelet' ? <Scissors size={48} /> : <Microscope size={48} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-purple-600 font-black text-[10px] uppercase tracking-widest">{(ADV_INFECTION_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic tracking-tight text-center">Pathological Frontier</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(ADV_INFECTION_DATA as any)[activeTab].title}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(ADV_INFECTION_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Wind className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                </div>

                {/* Core Content Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                   {/* LEFT: Structural Logic */}
                   <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-purple-400 italic uppercase">
                         <Zap size={22} /> Process Logic & Mechanics
                      </h4>
                      <div className="space-y-4 relative z-10">
                         {activeTab === 'biofilm' && ADV_INFECTION_DATA.biofilm.stages.map((s) => (
                           <div key={s.id} className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-3xl group hover:bg-white/10 transition-all">
                              <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white font-black text-xs shrink-0">{s.id}</div>
                              <div>
                                 <h5 className="text-[11px] font-black text-purple-300 uppercase mb-1 italic">{s.name}</h5>
                                 <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{s.desc}</p>
                              </div>
                           </div>
                         ))}
                         {activeTab === 'masquelet' && (
                           <div className="space-y-4">
                              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[10px] font-black text-purple-400 uppercase mb-2 italic">Phase 1: The Spacer</h5>
                                 <p className="text-xs leading-relaxed text-slate-300 font-medium italic">{ADV_INFECTION_DATA.masquelet.step1}</p>
                              </div>
                              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[10px] font-black text-purple-400 uppercase mb-2 italic">Phase 2: The Harvest</h5>
                                 <p className="text-xs leading-relaxed text-slate-300 font-medium italic">{ADV_INFECTION_DATA.masquelet.step2}</p>
                              </div>
                           </div>
                         )}
                         {activeTab === 'carriers' && ADV_INFECTION_DATA.carriers.types.map((t, i) => (
                           <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-3xl group">
                              <div className="flex justify-between items-center mb-3">
                                 <h5 className="text-[11px] font-black text-white uppercase italic">{t.name}</h5>
                                 <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full">{t.type}</span>
                              </div>
                              <div className="space-y-2">
                                <p className="text-xs text-slate-400 leading-relaxed italic"><span className="text-emerald-400 font-black">PRO:</span> {t.pro}</p>
                                <p className="text-xs text-slate-400 leading-relaxed italic"><span className="text-red-400 font-black">CON:</span> {t.con}</p>
                              </div>
                           </div>
                         ))}
                         {activeTab === 'imaging' && ADV_INFECTION_DATA.imaging.tests.map((t, i) => (
                            <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all">
                               <h5 className="text-[11px] font-black text-purple-400 uppercase mb-2 italic">{t.name}</h5>
                               <p className="text-xs text-slate-300 leading-relaxed font-medium italic">{t.use}</p>
                            </div>
                         ))}
                         {activeTab === 'brodies' && (
                           <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-6">
                              <div>
                                 <h5 className="text-[10px] font-black text-purple-400 uppercase mb-2 italic tracking-tighter">Clinical Features</h5>
                                 <p className="text-xs text-slate-300 leading-relaxed italic font-medium">{ADV_INFECTION_DATA.brodies.features}</p>
                              </div>
                              <div>
                                 <h5 className="text-[10px] font-black text-purple-400 uppercase mb-2 italic tracking-tighter">Radiological Protocol</h5>
                                 <p className="text-xs text-slate-300 leading-relaxed italic font-medium">{ADV_INFECTION_DATA.brodies.imaging}</p>
                              </div>
                           </div>
                         )}
                      </div>
                      <Maximize2 className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   {/* RIGHT: Actions & Judgment */}
                   <div className="space-y-6">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                            <Stethoscope size={22} className="text-purple-600" /> Clinical Action Plan
                         </h4>
                         <div className="space-y-4">
                            <div className="p-6 bg-purple-50 border border-purple-100 rounded-3xl">
                               <p className="text-sm text-purple-900 font-bold leading-relaxed italic text-center">
                                 {activeTab === 'masquelet' ? ADV_INFECTION_DATA.masquelet.biology : 
                                  activeTab === 'biofilm' ? "The physiological state of the cell changes from metabolic 'active' to 'dormant' in the biofilm, rendering standard MIC-based antibiotics ineffective." :
                                  "Management choices for carriers depend strictly on structural requirements versus elution kinetics."}
                               </p>
                            </div>
                            <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100">
                               <h5 className="text-[10px] font-black text-amber-600 uppercase mb-2 tracking-widest italic flex items-center gap-2">
                                 <AlertTriangle size={14} /> Critical Strategy
                               </h5>
                               <p className="text-xs font-bold text-amber-950 leading-relaxed italic">
                                  {activeTab === 'biofilm' ? "Biofilm removal requires AGGRESSIVE mechanical disruption (scrubbing/reaming/burring); antibiotics alone will never sterilize these surfaces." :
                                   activeTab === 'imaging' ? "Triple phase bone scans have high sensitivity; if they are negative, you can clinically rule out osteomyelitis." :
                                   activeTab === 'masquelet' ? "Ensure an anabolic host environment (Nutrition, Smoking Cessation) before proceeding to the Stage 2 bone graft." :
                                   "If an abscess fails to respond to directed antimicrobial therapy, surgical decompression is no longer elective."}
                               </p>
                            </div>
                         </div>
                      </div>

                      <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                         <h5 className="text-[10px] font-black text-purple-400 uppercase mb-3 flex items-center gap-2 italic">
                           <Info size={14} className="text-blue-400" /> Senior Consultant Note
                         </h5>
                         <p className="text-xs font-medium leading-relaxed italic opacity-90">
                           {activeTab === 'masquelet' ? "The 'Induced Membrane' is effectively a local bioreactor, secreted by the body to prevent foreign body interaction with the spacer." : 
                            activeTab === 'biofilm' ? "Bacteria in a biofilm communicate via 'Quorum Sensing'. Once this threshold is reached, they shift into their most resistant phenotype." : 
                            "In chronic infection, the goal isn't just killing bacteria; it's reconstructing the functional anatomy that the infection destroyed."}
                         </p>
                         <Wind className="absolute top-2 right-2 text-white/5" size={60} />
                      </div>
                   </div>
                </div>

                {/* Biology Alert Area */}
                <div className="bg-purple-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden group">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tighter">
                           <AlertTriangle size={24} className="text-purple-400" /> The Quorum Sensing Danger
                         </h4>
                         <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                            "When bacteria reach a critical density on a prosthesis, they coordinate. This isn't just an infection; it's a structural failure of the material-host interface. If Quorum Sensing has occurred, DAIR (Debridement) is likely to fail regardless of antibiotic choice."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest group-hover:bg-white/20 transition-colors italic text-center">
                            Mechanical Debridement {'>'} Antibiotics
                         </div>
                      </div>
                   </div>
                   <Activity size={300} className="absolute -bottom-20 -right-20 text-white/5 opacity-40 group-hover:rotate-12 transition-transform duration-1000" />
                </div>
              </motion.div>
            ) : isDifferential ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6 text-left"
              >
                {/* Hero Card */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                      <div className="p-8 bg-emerald-50 text-emerald-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         {activeTab === 'crystals' ? <FlaskConical size={48} /> : activeTab === 'nonunion' ? <Binary size={48} /> : <Target size={48} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-emerald-600 font-black text-[10px] uppercase tracking-widest italic tracking-tight">{(MIMIC_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic text-center">Diagnostic Differentiation</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(MIMIC_DATA as any)[activeTab].title}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(MIMIC_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <Activity size={400} className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" />
                </div>

                {/* Core Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="bg-slate-900 text-white p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-emerald-400 italic uppercase">
                         <ClipboardList size={22} /> {activeTab === 'crystals' ? "Lab Forensic Matrix" : "Pathological Parameters"}
                      </h4>
                      <div className="space-y-4 relative z-10">
                         {activeTab === 'crystals' ? (
                            <div className="overflow-x-auto rounded-3xl border border-white/10">
                              <table className="w-full text-left text-xs bg-white/5">
                                 <thead>
                                    <tr className="border-b border-white/10 bg-white/5 uppercase">
                                       <th className="py-4 px-4 font-black text-slate-500 text-[10px]">Feature</th>
                                       <th className="py-4 px-4 font-black text-red-400 text-[10px]">Septic</th>
                                       <th className="py-4 px-4 font-black text-emerald-400 text-[10px]">Gout</th>
                                    </tr>
                                 </thead>
                                 <tbody className="divide-y divide-white/10">
                                    {MIMIC_DATA.crystals.comparison.map((row, i) => (
                                      <tr key={i} className="hover:bg-white/10 transition-colors">
                                         <td className="py-3 px-4 font-black text-slate-400 uppercase text-[10px]">{row.feature}</td>
                                         <td className="py-3 px-4 font-bold text-white italic">{row.septic}</td>
                                         <td className="py-3 px-4 font-bold text-white italic">{row.gout}</td>
                                      </tr>
                                    ))}
                                 </tbody>
                              </table>
                            </div>
                         ) : activeTab === 'nonunion' ? (
                            <div className="space-y-4">
                               <p className="text-[10px] font-black uppercase text-emerald-400 mb-6 tracking-widest italic flex items-center gap-2">
                                 <Layers size={14} /> The Diamond Concept Dynamics
                               </p>
                               {MIMIC_DATA.nonunion.diamond_concept.map((el, i) => (
                                  <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-3xl group hover:bg-white/10 transition-all">
                                     <h5 className="text-[11px] font-black text-white uppercase mb-2 italic">{el.element}</h5>
                                     <p className="text-xs text-slate-400 leading-relaxed italic">{el.desc}</p>
                                  </div>
                               ))}
                            </div>
                         ) : (
                            <div className="space-y-6">
                               <p className="text-sm text-slate-300 leading-relaxed italic font-medium">{(MIMIC_DATA as any)[activeTab].features}</p>
                               <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                                  <h5 className="text-[10px] font-black text-emerald-400 uppercase mb-2 italic">Diagnostic Hallmark</h5>
                                  <p className="text-xs text-slate-400 italic">{(MIMIC_DATA as any)[activeTab].imaging || (MIMIC_DATA as any)[activeTab].differentiation || (MIMIC_DATA as any)[activeTab].clinical}</p>
                               </div>
                            </div>
                         )}
                      </div>
                      <Maximize2 className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   <div className="space-y-6">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                            <Stethoscope size={22} className="text-emerald-600" /> Surgical & Clinical Strategy
                         </h4>
                         <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-3xl">
                            <p className="text-sm text-emerald-900 font-bold leading-relaxed italic text-center">
                              {activeTab === 'nonunion' ? MIMIC_DATA.nonunion.strategy : activeTab === 'crystals' ? "Always aspirate first. If Gout is confirmed but WBCs are > 50,000, treat as septic arthritis until cultures remain negative at 48 hours." : "Requires a high-intensity multidisciplinary approach (Pain modulation, Neurology, Orthotics, and active Rehab)."}
                            </p>
                         </div>
                         <div className="mt-8 flex items-center gap-4 p-5 bg-slate-50 rounded-3xl border border-slate-100">
                            <Zap className="text-amber-500 shrink-0" size={20} />
                            <p className="text-xs font-black text-slate-600 uppercase tracking-tight leading-tight italic">
                               {activeTab === 'crps' ? "The goal is early range of motion; prolonged casting is the ENEMY of CRPS recovery." : 
                                activeTab === 'garres' ? "Garré's is often self-limiting, but consider surgical decortication if pain fails to settle." : 
                                "In the presence of infection, mechanical stability (Frame Fixation) is your strongest antibiotic."}
                            </p>
                         </div>
                      </div>

                      <div className="p-8 bg-emerald-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-emerald-800">
                         <h5 className="text-[10px] font-black text-emerald-400 uppercase mb-3 tracking-widest italic flex items-center gap-2">
                           <AlertTriangle size={14} className="text-emerald-300" /> Apley Diagnostic Pearl
                         </h5>
                         <p className="text-xs font-medium leading-relaxed italic opacity-90">
                            {activeTab === 'nonunion' ? "Loose internal hardware acts as an anatomical dead space. You cannot cure an infected non-union without stable fixation (Circular Frame)." : 
                             activeTab === 'crystals' ? "Acute CPPD (Pseudo-gout) in the elderly can present with a high fever and systemic malaise; it is the most common septic-arthritis mimic." : 
                             "Sudek's Atrophy is a diagnosis of exclusion. Never conclude a patient has CRPS until you have explicitly ruled out occult infection."}
                         </p>
                         <ShieldAlert className="absolute top-4 right-4 text-white/10" size={60} />
                      </div>
                   </div>
                </div>

                <div className="bg-red-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden group">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tighter">
                           <AlertTriangle size={24} className="text-red-400" /> The "Sterile Pus" Mystery
                         </h4>
                         <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                              "When aspirating a joint with &gt; 100,000 WBCs but negative Gram stains, search deeper: 1. Recent antibiotic suppressive therapy, 2. Fastidious organisms (TB, Brucella), or 3. Inflammatory flares (Gout/Reiters)."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest italic text-center transition-colors group-hover:bg-white/20">
                            Negative Culture ≠ No Infection
                         </div>
                      </div>
                   </div>
                   <Activity size={300} className="absolute -bottom-20 -right-20 text-white/5 opacity-40 group-hover:scale-110 transition-transform duration-1000" />
                </div>
              </motion.div>
            ) : isEmergency ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6 text-left"
              >
                {/* Hero Card */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                      <div className="p-8 bg-red-50 text-red-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         <AlertTriangle size={48} />
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-red-600 font-black text-[10px] uppercase tracking-widest italic">{(REGIONAL_DATA as any)[activeTab].niche}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic tracking-tight">Critical Emergency Hub</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(REGIONAL_DATA as any)[activeTab].title}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(REGIONAL_DATA as any)[activeTab].pearl}"</p>
                      </div>
                   </div>
                   <ShieldAlert className="absolute bottom-[-50px] right-[-50px] text-slate-50 opacity-40 rotate-[15deg]" size={350} />
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="bg-slate-900 text-white p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-red-400 italic uppercase">
                         <ClipboardList size={22} /> Assessment Matrix
                      </h4>
                      <div className="space-y-4 relative z-10">
                         {activeTab === 'kanavel' && (REGIONAL_DATA.kanavel.signs).map((s, i) => (
                           <div key={i} className="flex gap-5 p-5 bg-white/5 border border-white/10 rounded-3xl group hover:bg-white/10 transition-all">
                              <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-xs font-black shrink-0 shadow-lg">{i+1}</div>
                              <div>
                                 <h5 className="text-[11px] font-black text-red-400 uppercase mb-1 italic tracking-tight">{s.name}</h5>
                                 <p className="text-xs text-slate-300 font-medium leading-relaxed italic">{s.desc}</p>
                              </div>
                           </div>
                         ))}
                         {activeTab === 'wagner' && (REGIONAL_DATA.wagner.stages).map((s, i) => (
                           <div key={i} className="flex justify-between items-center p-5 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                              <span className="font-black text-xs text-white uppercase tracking-widest italic">{s.s}</span>
                              <span className="text-[11px] text-slate-400 font-medium text-right max-w-[180px] italic leading-tight">{s.d}</span>
                           </div>
                         ))}
                         {activeTab === 'lrinec' && (REGIONAL_DATA.lrinec.criteria).map((c, i) => (
                           <div key={i} className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-2xl">
                              <span className="font-black text-xs text-slate-300 uppercase tracking-tighter">{c.name}</span>
                              <span className="text-[10px] text-red-400 font-black uppercase italic italic">{c.detail}</span>
                           </div>
                         ))}
                         {activeTab === 'atypical' && (
                           <div className="space-y-6">
                              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[10px] font-black text-blue-400 uppercase mb-3 italic">Syphilis Pathology</h5>
                                 <p className="text-xs text-slate-300 leading-relaxed italic font-medium">{REGIONAL_DATA.atypical.syphilis}</p>
                              </div>
                              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                                 <h5 className="text-[10px] font-black text-emerald-400 uppercase mb-3 italic">Brucellosis (Malta Fever)</h5>
                                 <p className="text-xs text-slate-300 leading-relaxed italic font-medium">{REGIONAL_DATA.atypical.brucellosis}</p>
                              </div>
                           </div>
                         )}
                      </div>
                      <Maximize2 className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   <div className="space-y-6">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                            <Scissors size={22} className="text-red-600" /> Immediate Surgical Action
                         </h4>
                         <div className="p-8 bg-red-50 border border-red-100 rounded-3xl">
                            <p className="text-sm text-red-900 font-bold leading-relaxed italic text-center">
                              "{(REGIONAL_DATA as any)[activeTab].action || (activeTab === 'wagner' ? "Grade 3+ results in multi-stage deactivation; immediate surgical stabilization is required." : "Wait for nothing. If surgery is indicated, the patient goes to theater now.")}"
                            </p>
                         </div>
                         <div className="mt-8 flex items-start gap-4 p-5 bg-slate-50 rounded-3xl border border-slate-100 italic font-medium">
                            <Info size={20} className="text-red-500 shrink-0" />
                            <p className="text-[11px] text-slate-600 leading-relaxed">
                              {activeTab === 'kanavel' ? "Mid-axial or zig-zag incisions are preferred to prevent flexion contractures while allowing total sheath drainage." : 
                               activeTab === 'lrinec' ? "Suspected necrotizing fasciitis is a clinical diagnosis. NEVER wait for imaging or LRINEC scores to confirm it." : 
                               "Success in diabetic limb salvage relies purely on the speed of revascularization and radical debridement."}
                            </p>
                         </div>
                      </div>

                      <div className="bg-slate-900 text-white p-8 rounded-[3.5rem] relative overflow-hidden border border-white/5 shadow-2xl">
                         <h5 className="text-[10px] font-black text-red-400 uppercase mb-3 flex items-center gap-2 italic tracking-widest">
                           <Zap size={16} className="text-amber-500" /> Apley Emergency Pearl
                         </h5>
                         <p className="text-xs text-slate-300 leading-relaxed italic font-medium">
                           {activeTab === 'lrinec' ? "Subcutaneous crepitus on X-ray is diagnostic of gas gangrene but occurs in less than 30% of surgical cases. Don't rely on it." : 
                            activeTab === 'wagner' ? "Diabetic patients with deep bone infection often lack systemic SIRS signs. If you can probe to bone, the diagnosis is confirmed." : 
                            activeTab === 'kanavel' ? "A horseshoe abscess spreads from the thumb to the little finger via the space of Parona in the distal forearm." :
                            "Atypical infections are often missed; if a lesion fails to heal with standard care, biopsy for histology AND fungal cultures."}
                         </p>
                           <Wind className="absolute top-4 right-4 text-white/5" size={80} />
                       </div>
                    </div>
                 </div>
              </motion.div>
            ) : isComplex ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6 text-left"
              >
                {/* Hero Card */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                      <div className="p-8 bg-orange-50 text-orange-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                         {activeTab === 'host' ? <Scale size={48} /> : <Layers size={48} />}
                      </div>
                      <div className="text-center md:text-left flex-1">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-orange-600 font-black text-[10px] uppercase tracking-widest italic tracking-tight">{(CIERNY_DATA as any)[activeTab]?.niche || "Complex Physiology"}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic text-center">Structural Complexity Hub</span>
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{(CIERNY_DATA as any)[activeTab]?.title || "Complex Staging"}</h3>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{(CIERNY_DATA as any)[activeTab]?.pearl || "Measure twice, debride once."}"</p>
                      </div>
                   </div>
                   <Layers size={400} className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" />
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="bg-slate-900 text-white p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-orange-400 italic uppercase">
                         <Activity size={22} /> {activeTab === 'host' ? "Physiological Triage" : "Mechanical Principles"}
                      </h4>
                      <div className="space-y-4 relative z-10">
                         {activeTab === 'host' && (CIERNY_DATA.host.types).map((t, i) => (
                           <div key={i} className="flex gap-5 p-5 bg-white/5 border border-white/10 rounded-3xl group hover:bg-white/10 transition-all">
                              <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center text-xs font-black shrink-0 shadow-lg italic uppercase">{t.id.split(' ')[1]}</div>
                              <div>
                                 <h5 className="text-[11px] font-black text-orange-400 uppercase mb-1 italic tracking-tight">{t.name}</h5>
                                 <p className="text-xs text-slate-300 font-medium leading-relaxed italic">{t.desc}</p>
                              </div>
                           </div>
                         ))}
                         {activeTab === 'anatomy' && (CIERNY_DATA.anatomy.types).map((t, i) => (
                           <div key={i} className="flex justify-between items-center p-5 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                              <span className="font-black text-xs text-white uppercase tracking-widest italic">{t.name}</span>
                              <span className="text-[11px] text-slate-400 font-medium text-right max-w-[180px] italic leading-tight">{t.desc}</span>
                           </div>
                         ))}
                      </div>
                      <Maximize2 className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                   </div>

                   <div className="space-y-6">
                      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                         <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic">
                            <Stethoscope size={22} className="text-orange-600" /> Surgeon's Judgment Plan
                         </h4>
                         <div className="p-8 bg-orange-50 border border-orange-100 rounded-3xl">
                            <p className="text-sm text-orange-900 font-bold leading-relaxed italic text-center">
                              {activeTab === 'host' ? "The host's physiological status dictates the aggressiveness of the surgical intervention. 'Host C' strictly precludes curative surgery." : "Stability is the most under-rated antibiotic. In anatomical stage 4, internal fixation must be avoided if possible in favor of external frames."}
                            </p>
                         </div>
                      </div>

                      <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                         <h5 className="text-[10px] font-black text-orange-400 uppercase mb-3 flex items-center gap-2 italic tracking-widest">
                           <Zap size={14} className="text-amber-400" /> Apley Complex Case Pearl
                         </h5>
                         <p className="text-xs font-medium leading-relaxed italic opacity-90">
                            {activeTab === 'host' ? "Factors like smoking and diabetes don't just delay healing; they change the very biology of the wound, increasing the failure rate of surgical debridement by up to 50%." : "Anatomical staging should be performed AFTER debridement; a stage 3 can easily become a stage 4 once all necrotic bone is removed."}
                         </p>
                         <Wind className="absolute top-4 right-4 text-white/5" size={60} />
                      </div>
                   </div>
                </div>

                <div className="bg-orange-800 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden group">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-2/3">
                         <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic uppercase tracking-tighter">
                           <AlertTriangle size={24} className="text-orange-400" /> The Surgeon's Dilemma
                         </h4>
                         <p className="text-sm text-slate-100 leading-relaxed italic font-medium">
                            "In chronic osteomyelitis, the enemy isn't just the bacteria; it's the environment. You cannot sterilize a swamp. You must first drain it, debride it, and then rebuild the soil. Surgery without biology is simply a delay of failure."
                         </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                         <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest italic text-center transition-colors group-hover:bg-white/20">
                            Biology Over Hardware
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : (
              // OM BASICS TOPICS
              <AnimatePresence mode="wait">
                {activeTab === 'patho' && (
                  <motion.div 
                    key="patho"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="space-y-6 text-left"
                  >
                    {/* Hero Card */}
                    <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                       <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                          <div className="p-8 bg-emerald-50 text-emerald-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                             <Activity size={48} />
                          </div>
                          <div className="text-center md:text-left flex-1">
                             <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                               <span className="text-emerald-600 font-black text-[10px] uppercase tracking-widest italic tracking-tight">{OM_DATA.pathophysiology.niche || "Basic Science"}</span>
                               <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                               <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic text-center">OM Pathophysiology</span>
                             </div>
                             <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">{OM_DATA.pathophysiology.title}</h3>
                             <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"{OM_DATA.pathophysiology.pearl}"</p>
                          </div>
                       </div>
                       <Wind className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                    </div>

                    {/* Step-by-Step Logic Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="bg-slate-900 text-white p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                          <h4 className="text-sm font-black mb-8 flex items-center gap-3 text-emerald-400 italic uppercase">
                             <Zap size={22} /> Chronological Pathogenesis
                          </h4>
                          <div className="space-y-4 relative z-10">
                             {OM_DATA.pathophysiology.steps.map((step, i) => (
                               <div key={i} className="flex gap-5 p-5 bg-white/5 border border-white/10 rounded-3xl group hover:bg-white/10 transition-all">
                                  <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-xs font-black shrink-0 shadow-lg">{i + 1}</div>
                                  <div>
                                     <h5 className="text-[11px] font-black text-emerald-400 uppercase mb-1 italic tracking-tight">{step.name}</h5>
                                     <p className="text-xs text-slate-300 font-medium leading-relaxed italic">{step.desc}</p>
                                  </div>
                               </div>
                             ))}
                          </div>
                      </div>

                      <div className="space-y-6">
                         <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                            <h4 className="text-sm font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-tighter italic text-center">
                               <Layers size={22} className="text-emerald-600" /> Structural Logic & Dead Space
                            </h4>
                            <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-3xl">
                               <p className="text-sm text-emerald-900 font-bold leading-relaxed italic text-center italic">
                                 "The Hallmark of chronic OM is the Sequestrum (dead, avascular bone) surrounded by the Involucrum (new reactive bone). Surgery MUST target the Sequestrum."
                               </p>
                            </div>
                         </div>
                         <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
                            <h5 className="text-[10px] font-black text-emerald-400 uppercase mb-3 flex items-center gap-2 italic tracking-widest text-[9px]">
                              <ShieldAlert size={14} className="text-emerald-300" /> Surgeon's Critical Pearl
                            </h5>
                            <p className="text-xs font-medium leading-relaxed italic opacity-90">
                               "Osteomyelitis is fundamentally a vascular disease of the bone. Without restoration of biology and blood flow, antibiotics cannot reach the target."
                            </p>
                         </div>
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
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="space-y-6 text-left"
                  >
                    {/* Hero Card */}
                    <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                       <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                          <div className="p-8 bg-purple-50 text-purple-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                             <Microscope size={48} />
                          </div>
                          <div className="text-center md:text-left flex-1">
                             <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                               <span className="text-purple-600 font-black text-[10px] uppercase tracking-widest italic tracking-tight">Microbiological Forensics</span>
                               <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                               <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic text-center">Bacterial Isolates</span>
                             </div>
                             <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">The OM Pathogens</h3>
                             <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"Staphylococcus aureus is the king of bone; it has the keys to the osteoblast."</p>
                          </div>
                       </div>
                       <Dna className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                    </div>

                    {/* Micro Grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                       {Object.entries(OM_DATA.microbiology).map(([key, val], i) => (
                          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:border-purple-200 transition-all group flex flex-col justify-center items-center text-center">
                             <h5 className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-3 italic">{key.replace('_', ' ')}</h5>
                             <p className="text-xl font-black text-slate-800 italic uppercase tracking-tighter transition-transform group-hover:scale-110">{val}</p>
                          </div>
                       ))}
                    </div>

                    {/* Summary Alert */}
                    <div className="p-10 bg-slate-900 text-white rounded-[3.5rem] relative overflow-hidden shadow-2xl border border-white/5">
                       <div className="relative z-10">
                          <h4 className="text-xl font-black mb-4 flex items-center gap-3 italic text-purple-400 uppercase tracking-tight">
                            <Info size={24} /> The Microbiological Rule of Half
                          </h4>
                          <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                            "In acute cases, S. aureus accounts for nearly 50% of isolates. However, in chronic OM, polymicrobial flora (Gram-negatives and anaerobes) dominate the dead bone. Always sample at least 5 deep tissue specimens."
                          </p>
                       </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'tx' && (
                  <motion.div 
                    key="tx"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="space-y-6 text-left"
                  >
                    {/* Hero Card */}
                    <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                       <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                          <div className="p-8 bg-red-50 text-red-600 rounded-[2.5rem] shadow-inner transition-transform group-hover:scale-105 duration-500">
                             <ShieldAlert size={48} />
                          </div>
                          <div className="text-center md:text-left flex-1">
                             <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                               <span className="text-red-600 font-black text-[10px] uppercase tracking-widest italic tracking-tight">Radical Eradication Protocol</span>
                               <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                               <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic text-center">Surgical Management</span>
                             </div>
                             <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-4 italic uppercase">Surgical Eradication</h3>
                             <p className="text-lg text-slate-500 font-medium leading-relaxed italic">"You cannot cure what you cannot see; you cannot sterilize dead bone."</p>
                          </div>
                       </div>
                       <Scissors className="absolute bottom-[-60px] right-[-60px] text-slate-50 opacity-50" size={400} />
                    </div>

                    {/* Action Grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        { title: "Radical Debridement", desc: "Removal of all dead, necrotic, and infected bone (Saucerization) until 'Paprika Sign' bleeding is seen.", color: "text-red-500" },
                        { title: "Dead Space Management", desc: "Filling the residual defect with antibiotic-impregnated cement, local muscle flaps, or bone transport.", color: "text-amber-500" },
                        { title: "Skeletal Stabilization", desc: "Stabilizing the bone segment with internal or external fixation where structural integrity is lost.", color: "text-blue-500" }
                      ].map((t, i) => (
                        <div key={i} className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm flex flex-col items-center text-center group hover:shadow-xl transition-all">
                           <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${t.color} italic`}>{t.title}</div>
                           <p className="text-xs font-bold text-slate-500 leading-relaxed italic">{t.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Final Mastery Area */}
                    <div className="bg-red-900 text-white p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                       <div className="relative z-10 flex items-center gap-10">
                          <div className="flex-1">
                             <h4 className="text-2xl font-black mb-4 italic uppercase tracking-tighter text-red-300">The Cierny Surgeon's Rule</h4>
                             <p className="text-sm font-medium italic leading-relaxed opacity-90">
                               "Surgery for chronic osteomyelitis is not an elective procedure; it is a tumor-like resection. If you leave a single micron of necrotic bone, the biology dictates that the infection will return."
                             </p>
                          </div>
                          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/20">
                             <AlertTriangle className="text-red-400" size={40} />
                          </div>
                       </div>
                       <Wind className="absolute top-2 right-2 text-white/5" size={200} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <footer className="mt-auto px-10 py-5 flex flex-wrap justify-center gap-8 text-[9px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/80">
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-emerald-600 shadow-sm shadow-emerald-900/40"></div> OM Basics</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-red-600 shadow-sm shadow-red-900/40"></div> Complex Hub</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-purple-600 shadow-sm shadow-purple-900/40 opacity-70"></div> Advanced Biology</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-orange-600 shadow-sm shadow-orange-900/40"></div> Emergency Hub</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-emerald-500 shadow-sm shadow-emerald-900/40"></div> Differential Lab</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-blue-600 shadow-sm shadow-blue-900/40 opacity-70"></div> Atypical Matrix</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-indigo-600 shadow-sm shadow-indigo-900/40"></div> Diagnostic Forensics</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-teal-600 shadow-sm shadow-teal-900/40"></div> Stealth Matrix</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-amber-500 shadow-sm shadow-amber-900/40"></div> Indolent Sepsis Hub</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-orange-600 shadow-sm shadow-orange-900/40"></div> Trauma Emergency</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-blue-600 shadow-sm shadow-blue-900/40 opacity-70"></div> Atypical Rare Hub</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-emerald-600 shadow-sm shadow-emerald-900/40"></div> Bio-Frontier Hub</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-indigo-600 shadow-sm shadow-indigo-900/40"></div> Niche Hub</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-blue-600 shadow-sm shadow-blue-900/40"></div> Biomech Hub</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-indigo-600 shadow-sm shadow-indigo-900/40"></div> Vascular Hub</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-orange-600 shadow-sm shadow-orange-900/40"></div> Myo-Sepsis Hub</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-red-600 shadow-sm shadow-red-900/40"></div> Sequelae Hub</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-indigo-600 shadow-sm shadow-indigo-900/40 opacity-70"></div> Diagnostic Interventional</div>
           <div className="flex items-center gap-2 text-slate-800 uppercase italic font-bold">Apley Hub v11.1 Complete</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-amber-600 shadow-sm shadow-amber-900/40"></div> Bio-Pharma Hub</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-rose-600 shadow-sm shadow-rose-900/40"></div> Diabetic Hub</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-blue-600 shadow-sm shadow-blue-900/40 opacity-70"></div> Prevention Hub</div>
        </footer>
      </main>
    </div>
  );
};

export default BasicScienceStudyMode;
