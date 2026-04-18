export interface Question {
  id: string | number;
  category: string;
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
  images?: string[];
  image?: string;
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
  ],
  oite2025: [
    {
      id: "oite2",
      category: "oite2025",
      question: "A 5-year-old boy presents with pain and swelling in the distal thigh. Biopsy shows conventional osteosarcoma of the distal femoral metaphysis. Following preoperative chemotherapy, which reconstruction option offers the least risk of revision over the patient's lifetime?",
      options: ["Osteoarticular allograft", "Noninvasive expandable prosthesis", "Nonexpandable prosthesis", "Rotationplasty"],
      answer: "Rotationplasty",
      explanation: "Durability of reconstruction following resection of bony sarcomas is a particular problem in young children. While rotationplasty may require early revision surgery for vascular compromise or nonunion, this reconstruction does not have issues with leg length or mechanical issues such as loosening."
    },
    {
      id: "oite3",
      category: "oite2025",
      question: "A 42-year-old female with a giant cell tumor of bone in the distal femur is treated with denosumab therapy for 6 months prior to undergoing intralesional curettage and cementation. Denosumab in this case is most likely to do which of the following?",
      options: ["Decrease the risk of metastatic disease", "Require preoperative embolization", "Increase the risk of local recurrence of the tumor", "Increase the risk of pathologic fracture"],
      answer: "Increase the risk of local recurrence of the tumor",
      explanation: "Multiple studies have noted that curettage of lesions after treatment with denosumab have been associated with increased rates of local recurrence of the tumor."
    },
    {
      id: "oite6",
      category: "oite2025",
      question: "Which serum glycemic marker is most associated with an increased risk of periprosthetic infection after total joint replacement?",
      options: ["Hemoglobin A1c >7.0%", "Preoperative glucose level >180 mg/dL", "Fructosamine level >293 µmol/L", "Glycated albumin level <14%"],
      answer: "Fructosamine level >293 µmol/L",
      explanation: "Recent studies (Shohat et al.) have identified that fructosamine level >293 µmol/L has a more significant association with deep infection, readmission, and reoperation than HbA1c >7%. Fructosamine reflects glycemic control over the preceding 2-3 weeks, making it a more acute marker than HbA1c."
    },
    {
      id: "oite6_2",
      category: "oite2025",
      question: "Myodesis after a transfemoral amputation counteracts which deforming forces?",
      options: ["Adduction and extension", "Adduction and flexion", "Abduction and flexion", "Abduction and extension"],
      answer: "Abduction and flexion",
      explanation: "Transfemoral amputees can develop flexion and abduction deformities due to unbalanced muscle forces. Adductor myodesis to the lateral femoral cortex was developed by Gottschalk to counteract these forces and improve prosthetic fitting."
    },
    {
      id: "oite9",
      category: "oite2025",
      question: "A 26-year-old male is brought to the emergency department immediately after he sustained an isolated gunshot wound to the knee. Radiographs show a bullet located in the knee joint with a nondisplaced medial femoral condyle fracture. If the bullet is retained, which of the following is most associated with increased risk of lead toxicity?",
      options: ["Increased caliber of the bullet", "Early range of motion of the joint", "Number of retained bullet fragments", "Presence of an intra-articular fracture"],
      answer: "Presence of an intra-articular fracture",
      explanation: "Several factors increase the risk of developing lead toxicity including the location of the retained bullet in a joint, the presence of a fracture or recent trauma, number of bone fragments, hypermetabolic states, and bullet retention duration."
    },
    {
      id: "oite10",
      category: "oite2025",
      question: "Which structure is most likely to prevent ulnocarpal translocation following proximal row carpectomy?",
      options: ["Radioscaphocapitate ligament", "Long radiolunate ligament", "Triangular fibrocartilage complex", "Brachioradialis tendon"],
      answer: "Radioscaphocapitate ligament",
      explanation: "During removal of the carpal bones (PRC), most importantly the radioscaphocapitate ligament connects the distal radius to the distal carpal row and prevents ulnar translocation of the carpus."
    },
    {
      id: "oite12",
      category: "oite2025",
      question: "Which group of findings best characterizes the adaptive changes of the shoulder of a thrower who is skeletally immature?",
      options: ["Increased retroversion, decreased internal rotation, and increased total motion arc", "Decreased retroversion, increased internal rotation, and decreased total motion arc", "Increased retroversion, decreased internal rotation, and decreased total motion arc", "Decreased retroversion, increased internal rotation, and increased total motion arc"],
      answer: "Increased retroversion, decreased internal rotation, and increased total motion arc",
      explanation: "Baseball pitching causes adaptive changes to the growing athlete’s shoulder. The mechanical forces cause increased retroversion of the humeral head, with a resulting decrease in internal rotation, thus effectively achieving an increased total motion arc."
    },
    {
      id: "oite14",
      category: "oite2025",
      question: "The majority of traumatic spine fractures in the adult population occur at which of the following junctions?",
      options: ["Craniocervical", "Cervicothoracic", "Thoracolumbar", "Lumbosacral"],
      answer: "Thoracolumbar",
      explanation: "The thoracolumbar junction is the most common location for traumatic fractures in adult patients. Transition between the rigid thoracic spine and the mobile lumbar spine causes this to be a vulnerable area."
    },
    {
      id: "oite16",
      category: "oite2025",
      question: "Which abnormality of the foot often occurs with idiopathic clubfoot deformity?",
      options: ["Syndactyly of the lesser toes", "Absence of the anterior tibial artery", "Delta phalanx", "Absence of the first ray"],
      answer: "Absence of the anterior tibial artery",
      explanation: "The most common variation in foot circulation in clubfoot deformity is diminished supply from the anterior tibial artery (ATA) and dorsalis pedis. ATA was most frequently reported as hypoplastic (18.3%) or absent."
    },
    {
      id: "oite22",
      category: "oite2025",
      question: "A 28-year-old midfielder on the men's national soccer team sustains a concussion. Which criteria places the player at a higher risk of another concussion?",
      options: ["Age", "Male sex", "Prior history of a concussion", "Player position"],
      answer: "Prior history of a concussion",
      explanation: "The common risk factors for a concussion in the athlete are a prior concussion and ages 9-22."
    },
    {
      id: "oite25",
      category: "oite2025",
      question: "A 55-year-old male presents with weakness with dorsiflexion and inversion of the ankle after a fall. Ultrasonography shows a tendon tear. Which tendon is most likely torn in this patient?",
      options: ["Posterior tibialis", "Anterior tibialis", "Peroneus longus", "Extensor digitorum longus"],
      answer: "Anterior tibialis",
      explanation: "The anterior tibialis tendon's main function is dorsiflexion and inversion of the ankle."
    },
    {
      id: "oite27",
      category: "oite2025",
      question: "A 10-year-old female presents with localized, high-grade conventional osteosarcoma. Which baseline study is most appropriate to order prior to doxorubicin induction chemotherapy?",
      options: ["DEXA scan", "Echocardiography", "Nerve conduction studies", "Ultrasonography of the liver"],
      answer: "Echocardiography",
      explanation: "Doxorubicin can cause an irreversible cardiomyopathy. All patients beginning its use should be screened with a baseline echocardiogram to assess cardiac function."
    },
    {
      id: "oite29",
      category: "oite2025",
      question: "A 72-year-old female with a fixed total knee arthroplasty has a moth-eaten appearance of the distal femur. Biopsy shows clonal small, round, blue cells that stain positive for CD20. Most likely diagnosis?",
      options: ["Hodgkin lymphoma", "Diffuse large B-cell lymphoma", "Mantle cell lymphoma", "Anaplastic large cell lymphoma"],
      answer: "Diffuse large B-cell lymphoma",
      explanation: "Diffuse large B-cell lymphomas (DLBCL) account for almost 90% of skeletal lymphomas."
    },
    {
      id: "oite30",
      category: "oite2025",
      question: "A patient undergoes surgery for an atypical lipomatous tumor (ALT). FISH analysis demonstrates amplified MDM2. Which of the following percentages best depicts the rate of metastasis for this type of tumor?",
      options: ["0%", "10%", "20%", "30%"],
      answer: "0%",
      explanation: "Atypical lipomatous tumor (ALT) in and of itself does not have the ability to metastasize."
    },
    {
      id: "oite31",
      category: "oite2025",
      question: "A 28-year-old male sustained the knee dislocation shown in Figures 1 and 2 after he was involved in a motorized scooter accident. He undergoes knee-spanning external fixation followed by staged definitive internal fixation and ligamentous reconstruction. What can be added to the treatment regimen to improve range of motion with minimal risk to the ligamentous reconstruction?",
      options: ["Knee immobilizer", "Hinged external fixator", "Bone stimulator", "Platelet-rich plasma injection"],
      answer: "Hinged external fixator",
      explanation: "Hinged external fixation as a supplement to reconstruction following knee dislocation is associated with fewer failed ligament reconstructions compared with external bracing. It allows early aggressive range of motion without sacrificing stability.",
      images: [
        "/knee_dislocation_1.jpg",
        "/knee_dislocation_2.jpg"
      ]
    }
  ]
};
