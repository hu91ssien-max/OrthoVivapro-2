export interface Question {
  id: string | number;
  category: string;
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
}

export const QUESTION_BANK: Record<string, Question[]> = {
  trauma: [
    {
      id: "t1",
      category: "trauma",
      question: "Which of the following is the most sensitive clinical indicator of impending compartment syndrome?",
      options: ["Absent distal pulses", "Paresthesia in the affected limb", "Pain out of proportion to injury", "Paralysis of the limb"],
      answer: "Pain out of proportion to injury",
      explanation: "Pain out of proportion to the clinical findings and pain on passive stretch are the most sensitive early clinical indicators of compartment syndrome. Pulselessness is a very late and often absent sign."
    },
    {
      id: "t2",
      category: "trauma",
      question: "In a Gustilo-Anderson Grade IIIB open fracture, the management usually requires which of the following?",
      options: ["Simple wound closure", "Split-skin graft", "Rotational or free flap coverage", "Primary amputation"],
      answer: "Rotational or free flap coverage",
      explanation: "Grade IIIB open fractures are characterized by extensive soft-tissue injury with periosteal stripping and bone exposure, necessitating a flap (rotational or free) for adequate coverage."
    },
    {
      id: "t3",
      category: "trauma",
      question: "A Garden IV femoral neck fracture in a healthy 65-year-old active individual is best managed with:",
      options: ["Cannulated screws", "Dynamic Hip Screw (DHS)", "Hemiarthroplasty", "Total Hip Arthroplasty (THA)"],
      answer: "Total Hip Arthroplasty (THA)",
      explanation: "For displaced femoral neck fractures (Garden III/IV) in active, independent elderly patients, THA has been shown to have better functional outcomes and lower reoperation rates compared to hemiarthroplasty or fixation."
    }
  ],
  pediatric: [
    {
      id: "p1",
      category: "pediatric",
      question: "What is the primary pathology in Slipped Capital Femoral Epiphysis (SCFE)?",
      options: ["Ischemic necrosis of the femoral head", "Displacement of the epiphysis through the physis", "Infection of the hip joint", "Developmental shallow acetabulum"],
      answer: "Displacement of the epiphysis through the physis",
      explanation: "SCFE is characterized by the proximal femoral neck (metaphysis) displacing anteriorly and superiorly relative to the epiphysis, which remains in the acetabulum."
    },
    {
      id: "p2",
      category: "pediatric",
      question: "Which test is used to reduce a dislocated hip in a neonate with DDH?",
      options: ["Barlow test", "Ortolani test", "Trendelenburg test", "Galeazzi sign"],
      answer: "Ortolani test",
      explanation: "The Ortolani maneuver is a reduction test. It involves abducting the hip while applying pressure to the greater trochanter to see if the hip 'clunks' back into place."
    }
  ],
  recon: [
    {
      id: "r1",
      category: "recon",
      question: "The most common reason for early failure (< 2 years) of a total knee arthroplasty (TKA) is:",
      options: ["Aseptic loosening", "Infection", "Instability", "Periprosthetic fracture"],
      answer: "Infection",
      explanation: "Infection and instability are the leading causes of early failure in TKA. Aseptic loosening is more commonly a late complication."
    },
    {
      id: "r2",
      category: "recon",
      question: "In Total Hip Arthroplasty, a highly cross-linked polyethylene (HXLPE) liner is primarily used to reduce:",
      options: ["Dislocation rate", "Osteolysis and wear", "Fracture risk", "Metal sensitivity"],
      answer: "Osteolysis and wear",
      explanation: "HXLPE significantly reduces wear rates compared to conventional polyethylene, thereby reducing the incidence of particle-induced osteolysis."
    },
    {
      id: "r3",
      category: "recon",
      question: "What crucial surgical step must accompany the tibial cut when performing a lateral closing wedge high tibial osteotomy?",
      options: [
        "Release of the superficial MCL",
        "Release or osteotomy of the fibula",
        "Complete patellar tendon detachment",
        "Excision of the lateral meniscus"
      ],
      answer: "Release or osteotomy of the fibula",
      explanation: "In lateral closing wedge high tibial osteotomy, the fibula must be addressed to allow proper closure."
    }
  ],
  sports: [
    {
      id: "sp1",
      category: "sports",
      question: "The 'Segond fracture' is pathognomonic for an injury to which structure?",
      options: ["Medial Collateral Ligament (MCL)", "Posterior Cruciate Ligament (PCL)", "Anterior Cruciate Ligament (ACL)", "Lateral Meniscus"],
      answer: "Anterior Cruciate Ligament (ACL)",
      explanation: "A Segond fracture is an avulsion fracture of the lateral tibial plateau, representing an injury to the anterolateral ligament and is highly associated with ACL tears (75-100%)."
    },
    {
      id: "sp2",
      category: "sports",
      question: "Which of the following is an absolute indication for surgical repair of a meniscus tear?",
      options: ["Wait-and-watch approach", "Degenerative tear in an elderly patient", "Locked knee due to bucket-handle tear", "Small stable peripheral tear"],
      answer: "Locked knee due to bucket-handle tear",
      explanation: "A locked knee caused by a bucket-handle meniscus tear is an urgent surgical indication to restore range of motion and prevent further damage."
    }
  ],
  shoulder: [
    {
      id: "se1",
      category: "shoulder",
      question: "Which tendon is most commonly involved in rotator cuff tears?",
      options: ["Subscapularis", "Infraspinatus", "Supraspinatus", "Teres minor"],
      answer: "Supraspinatus",
      explanation: "The supraspinatus tendon is the most frequently injured component of the rotator cuff, often due to its location in the subacromial space subjected to impingement."
    },
    {
      id: "se2",
      category: "shoulder",
      question: "A Bankart lesion involves injury to which part of the shoulder?",
      options: ["Superior labrum", "Anteroinferior labrum", "Posterosuperior labrum", "Biceps anchor"],
      answer: "Anteroinferior labrum",
      explanation: "A Bankart lesion is an avulsion of the anteroinferior labrum from the glenoid rim, typically seen after anterior shoulder dislocations."
    }
  ],
  foot: [
    {
      id: "fa1",
      category: "foot",
      question: "The Lisfranc joint refers to the articulation between:",
      options: ["Calcaneus and cuboid", "Talus and navicular", "Tarsals and metatarsals", "Metatarsals and phalanges"],
      answer: "Tarsals and metatarsals",
      explanation: "The Lisfranc joint (tarsometatarsal joint) complex is critical for midfoot stability. Injury can lead to significant functional impairment if missed."
    },
    {
      id: "fa2",
      category: "foot",
      question: "What is the most common site for a Morton's neuroma?",
      options: ["1st intermetatarsal space", "2nd intermetatarsal space", "3rd intermetatarsal space", "4th intermetatarsal space"],
      answer: "3rd intermetatarsal space",
      explanation: "Morton's neuroma most commonly occurs in the third webspace (between the 3rd and 4th metatarsal heads)."
    }
  ],
  pathology: [
    {
      id: "pa1",
      category: "pathology",
      question: "What is the most common primary malignant bone tumor in adults?",
      options: ["Osteosarcoma", "Chondrosarcoma", "Ewing sarcoma", "Multiple myeloma"],
      answer: "Multiple myeloma",
      explanation: "Multiple myeloma is the most common primary malignancy of bone in adults. If considering non-hematopoietic tumors, Osteosarcoma is most common."
    },
    {
      id: "pa2",
      category: "pathology",
      question: "The 'Sunburst' appearance on X-ray is characteristic of:",
      options: ["Osteosarcoma", "Enchondroma", "Osteoid osteoma", "Osteoblastoma"],
      answer: "Osteosarcoma",
      explanation: "A 'sunburst' periosteal reaction is indicative of rapid, aggressive bone formation, most classically seen in osteosarcoma."
    }
  ],
  anatomy: [
    {
      id: "an1",
      category: "anatomy",
      question: "Which nerve is most at risk during a posterior approach to the hip?",
      options: ["Femoral nerve", "Obturator nerve", "Sciatic nerve", "Superior gluteal nerve"],
      answer: "Sciatic nerve",
      explanation: "The sciatic nerve lies just posterior to the short external rotators and is the most vulnerable nerve in the posterior approach to the hip."
    },
    {
      id: "an2",
      category: "anatomy",
      question: "The 'Drop Arm Test' evaluates the integrity of which muscle?",
      options: ["Subscapularis", "Supraspinatus", "Teres minor", "Deltoid"],
      answer: "Supraspinatus",
      explanation: "The drop arm test is used to assess for full-thickness tears of the supraspinatus tendon."
    }
  ],
  basic: [
    {
      id: "bs1",
      category: "basic",
      question: "According to Wolff's Law, bone remodels in response to:",
      options: ["Hormonal changes", "Aging", "Mechanical stress", "Vitamin D levels"],
      answer: "Mechanical stress",
      explanation: "Wolff's law states that bone in a healthy person or animal will adapt to the loads under which it is placed."
    },
    {
      id: "bs2",
      category: "basic",
      question: "Young's Modulus is a measure of a material's:",
      options: ["Strength", "Hardness", "Ductility", "Stiffness"],
      answer: "Stiffness",
      explanation: "Young's modulus (elastic modulus) is a measure of the stiffness of a solid material. It defines the relationship between stress and strain."
    }
  ],
  hand: [
    {
      id: "h1",
      category: "hand",
      question: "Which of the following is the most common carpal bone fracture?",
      options: ["Lunate", "Triquetrum", "Scaphoid", "Hamate"],
      answer: "Scaphoid",
      explanation: "The scaphoid is the most common carpal bone to fracture (60-70% of carpal fractures). It is important to remember the vascular supply is retrograde from the distal pole."
    },
    {
      id: "h2",
      category: "hand",
      question: "Kanavel's signs are clinical indicators for which surgical emergency?",
      options: ["Carpal Tunnel Syndrome", "Depuytren's Contracture", "Flexor Tenosynovitis", "Gamekeeper's Thumb"],
      answer: "Flexor Tenosynovitis",
      explanation: "Kanavel's four signs consist of: 1. Tenderness along the flexor sheath, 2. Symmetric enlargement (fusiform swelling), 3. Finger held in slight flexion, 4. Pain on passive extension."
    },
    {
      id: "h3",
      category: "hand",
      question: "Initial management of a closed Mallet Finger with no fracture and full passive extension is:",
      options: ["Surgical repair of terminal tendon", "DIP joint fusion", "Continuous DIP extension splinting for 6-8 weeks", "K-wire fixation"],
      answer: "Continuous DIP extension splinting for 6-8 weeks",
      explanation: "Mallet finger is an injury to the terminal extensor tendon. Conservative management with continuous extension splinting of the DIP joint is the standard first-line treatment for closed injuries."
    }
  ]
};
