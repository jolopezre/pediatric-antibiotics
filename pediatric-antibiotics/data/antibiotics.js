const ANTIBIOTICS_DATA = {
  antibiotics: [
    {
      id: "amoxicillin",
      name: "Amoxicillin",
      class: "Penicillin",
      route: ["PO"],
      spectrum: {
        "S. pneumoniae": "S",
        "S. pyogenes (GAS)": "S",
        "S. aureus (MSSA)": "R",
        "S. aureus (MRSA)": "R",
        "H. influenzae (non-β-lac)": "S",
        "H. influenzae (β-lac+)": "R",
        "M. catarrhalis": "R",
        "E. coli": "I",
        "K. pneumoniae": "R",
        "P. aeruginosa": "R",
        "Anaerobes (oral)": "S",
        "Atypicals": "R",
        "MRSA": "R",
        "Enterococcus": "S"
      },
      dosing: [
        {
          indication: "Standard (AOM, URI, Strep)",
          neonates: null,
          infant_child: "40–45 mg/kg/día ÷ c/8–12h",
          max_dose: "500 mg/dosis",
          notes: "Primera línea en OMA sin factores de riesgo"
        },
        {
          indication: "OMA (alta resistencia / fracaso prev.)",
          neonates: null,
          infant_child: "80–90 mg/kg/día ÷ c/12h",
          max_dose: "875 mg/dosis",
          notes: "Si falla en 48–72h, cambiar a amox-clav"
        }
      ],
      color: "#0ea5e9"
    },
    {
      id: "amox_clav",
      name: "Amoxicillin-Clavulanate",
      class: "Penicillin + β-lactamase inhibitor",
      route: ["PO"],
      spectrum: {
        "S. pneumoniae": "S",
        "S. pyogenes (GAS)": "S",
        "S. aureus (MSSA)": "S",
        "S. aureus (MRSA)": "R",
        "H. influenzae (non-β-lac)": "S",
        "H. influenzae (β-lac+)": "S",
        "M. catarrhalis": "S",
        "E. coli": "S",
        "K. pneumoniae": "S",
        "P. aeruginosa": "R",
        "Anaerobes (oral)": "S",
        "Atypicals": "R",
        "MRSA": "R",
        "Enterococcus": "S"
      },
      dosing: [
        {
          indication: "OMA, sinusitis, mordeduras",
          neonates: null,
          infant_child: "40–45 mg/kg/día ÷ c/12h",
          max_dose: "875/125 mg c/12h",
          notes: "Formulación 7:1 (400/57 mg/5 mL)"
        },
        {
          indication: "OMA con factores de riesgo / fracaso",
          neonates: null,
          infant_child: "80–90 mg/kg/día ÷ c/12h",
          max_dose: "875/125 mg c/12h",
          notes: "Formulación ES 14:1; menor riesgo de diarrea"
        }
      ],
      color: "#6366f1"
    },
    {
      id: "azithromycin",
      name: "Azithromycin",
      class: "Macrolide",
      route: ["PO", "IV"],
      spectrum: {
        "S. pneumoniae": "I",
        "S. pyogenes (GAS)": "I",
        "S. aureus (MSSA)": "I",
        "S. aureus (MRSA)": "R",
        "H. influenzae (non-β-lac)": "S",
        "H. influenzae (β-lac+)": "S",
        "M. catarrhalis": "S",
        "E. coli": "R",
        "K. pneumoniae": "R",
        "P. aeruginosa": "R",
        "Anaerobes (oral)": "I",
        "Atypicals": "S",
        "MRSA": "R",
        "Enterococcus": "R"
      },
      dosing: [
        {
          indication: "Faringitis, OMA, NAC atípica",
          neonates: null,
          infant_child: "10 mg/kg/día x1 (día 1), luego 5 mg/kg/día x4 días",
          max_dose: "500 mg día 1; 250 mg días 2–5",
          notes: "Z-pack 5 días. Resistencia creciente en S. pneumoniae"
        },
        {
          indication: "Tos ferina (B. pertussis)",
          neonates: "10 mg/kg/día x5 días (>1 mes)",
          infant_child: "10 mg/kg/día x5 días",
          max_dose: "500 mg/día",
          notes: "De elección. <1 mes: riesgo PHPS"
        }
      ],
      color: "#f59e0b"
    },
    {
      id: "cefazolin",
      name: "Cefazolin",
      class: "Cefalosporina 1.ª generación",
      route: ["IV", "IM"],
      spectrum: {
        "S. pneumoniae": "S",
        "S. pyogenes (GAS)": "S",
        "S. aureus (MSSA)": "S",
        "S. aureus (MRSA)": "R",
        "H. influenzae (non-β-lac)": "R",
        "H. influenzae (β-lac+)": "R",
        "M. catarrhalis": "R",
        "E. coli": "S",
        "K. pneumoniae": "S",
        "P. aeruginosa": "R",
        "Anaerobes (oral)": "I",
        "Atypicals": "R",
        "MRSA": "R",
        "Enterococcus": "R"
      },
      dosing: [
        {
          indication: "Celulitis, infección tejidos blandos, profilaxis quirúrgica",
          neonates: "25 mg/kg c/12h",
          infant_child: "50–100 mg/kg/día ÷ c/8h",
          max_dose: "2 g/dosis",
          notes: "De elección IV para MSSA. Profilaxis: 30 mg/kg preoperatorio"
        }
      ],
      color: "#10b981"
    },
    {
      id: "cephalexin",
      name: "Cefalexin (Cephalexin)",
      class: "Cefalosporina 1.ª generación",
      route: ["PO"],
      spectrum: {
        "S. pneumoniae": "S",
        "S. pyogenes (GAS)": "S",
        "S. aureus (MSSA)": "S",
        "S. aureus (MRSA)": "R",
        "H. influenzae (non-β-lac)": "R",
        "H. influenzae (β-lac+)": "R",
        "M. catarrhalis": "R",
        "E. coli": "S",
        "K. pneumoniae": "S",
        "P. aeruginosa": "R",
        "Anaerobes (oral)": "I",
        "Atypicals": "R",
        "MRSA": "R",
        "Enterococcus": "R"
      },
      dosing: [
        {
          indication: "Celulitis, impétigo, ITU no complicada",
          neonates: null,
          infant_child: "25–50 mg/kg/día ÷ c/6–8h",
          max_dose: "500 mg/dosis",
          notes: "PO equivalente de cefazolina"
        }
      ],
      color: "#34d399"
    },
    {
      id: "cefdinir",
      name: "Cefdinir",
      class: "Cefalosporina 3.ª generación",
      route: ["PO"],
      spectrum: {
        "S. pneumoniae": "S",
        "S. pyogenes (GAS)": "S",
        "S. aureus (MSSA)": "S",
        "S. aureus (MRSA)": "R",
        "H. influenzae (non-β-lac)": "S",
        "H. influenzae (β-lac+)": "I",
        "M. catarrhalis": "S",
        "E. coli": "S",
        "K. pneumoniae": "S",
        "P. aeruginosa": "R",
        "Anaerobes (oral)": "R",
        "Atypicals": "R",
        "MRSA": "R",
        "Enterococcus": "R"
      },
      dosing: [
        {
          indication: "OMA, sinusitis, NAC leve",
          neonates: null,
          infant_child: "14 mg/kg/día ÷ c/12–24h",
          max_dose: "300 mg c/12h o 600 mg c/24h",
          notes: "Alternativa amox-clav PO. Tiñe heces de rojo-naranja"
        }
      ],
      color: "#22d3ee"
    },
    {
      id: "ceftriaxone",
      name: "Ceftriaxone",
      class: "Cefalosporina 3.ª generación",
      route: ["IV", "IM"],
      spectrum: {
        "S. pneumoniae": "S",
        "S. pyogenes (GAS)": "S",
        "S. aureus (MSSA)": "I",
        "S. aureus (MRSA)": "R",
        "H. influenzae (non-β-lac)": "S",
        "H. influenzae (β-lac+)": "S",
        "M. catarrhalis": "S",
        "E. coli": "S",
        "K. pneumoniae": "S",
        "P. aeruginosa": "R",
        "Anaerobes (oral)": "R",
        "Atypicals": "R",
        "MRSA": "R",
        "Enterococcus": "R"
      },
      dosing: [
        {
          indication: "Meningitis bacteriana",
          neonates: "50 mg/kg c/24h (>7 días)",
          infant_child: "100 mg/kg/día ÷ c/12–24h",
          max_dose: "2 g c/12h (4 g/día)",
          notes: "Evitar en neonatos con hiperbilirrubinemia"
        },
        {
          indication: "NAC moderada-grave, sepsis",
          neonates: null,
          infant_child: "50–75 mg/kg/día c/24h",
          max_dose: "2 g/día",
          notes: "Cubre bien S. pneumoniae y H. influenzae"
        },
        {
          indication: "OMA fracaso (IM dosis única)",
          neonates: null,
          infant_child: "50 mg/kg IM dosis única",
          max_dose: "1 g",
          notes: "Opción cuando hay vómitos o pobre adherencia PO"
        }
      ],
      color: "#8b5cf6"
    },
    {
      id: "cefepime",
      name: "Cefepime",
      class: "Cefalosporina 4.ª generación",
      route: ["IV"],
      spectrum: {
        "S. pneumoniae": "S",
        "S. pyogenes (GAS)": "S",
        "S. aureus (MSSA)": "I",
        "S. aureus (MRSA)": "R",
        "H. influenzae (non-β-lac)": "S",
        "H. influenzae (β-lac+)": "S",
        "M. catarrhalis": "S",
        "E. coli": "S",
        "K. pneumoniae": "S",
        "P. aeruginosa": "S",
        "Anaerobes (oral)": "R",
        "Atypicals": "R",
        "MRSA": "R",
        "Enterococcus": "R"
      },
      dosing: [
        {
          indication: "Neutropenia febril, neumonía nosocomial",
          neonates: "50 mg/kg c/12h",
          infant_child: "50 mg/kg c/8h (meningitis: c/8h)",
          max_dose: "2 g c/8h",
          notes: "Actividad anti-Pseudomonas. Ajustar en falla renal"
        }
      ],
      color: "#ec4899"
    },
    {
      id: "clindamycin",
      name: "Clindamycin",
      class: "Lincosamide",
      route: ["PO", "IV"],
      spectrum: {
        "S. pneumoniae": "I",
        "S. pyogenes (GAS)": "S",
        "S. aureus (MSSA)": "S",
        "S. aureus (MRSA)": "S",
        "H. influenzae (non-β-lac)": "R",
        "H. influenzae (β-lac+)": "R",
        "M. catarrhalis": "R",
        "E. coli": "R",
        "K. pneumoniae": "R",
        "P. aeruginosa": "R",
        "Anaerobes (oral)": "S",
        "Atypicals": "R",
        "MRSA": "S",
        "Enterococcus": "R"
      },
      dosing: [
        {
          indication: "MRSA-CA, absceso, celulitis grave",
          neonates: "5 mg/kg c/8h",
          infant_child: "PO: 30–40 mg/kg/día ÷ c/8h; IV: 25–40 mg/kg/día ÷ c/6–8h",
          max_dose: "450 mg/dosis PO; 900 mg/dosis IV",
          notes: "Verificar D-zone test para inducible resistance en MRSA"
        },
        {
          indication: "Faringitis (alergia penicilina)",
          neonates: null,
          infant_child: "21 mg/kg/día ÷ c/8h x10 días",
          max_dose: "300 mg c/8h",
          notes: "Alternativa en alergia grave a β-lactámicos"
        }
      ],
      color: "#f97316"
    },
    {
      id: "trimethoprim_smx",
      name: "TMP-SMX (Co-trimoxazole)",
      class: "Folate antagonist",
      route: ["PO", "IV"],
      spectrum: {
        "S. pneumoniae": "I",
        "S. pyogenes (GAS)": "R",
        "S. aureus (MSSA)": "S",
        "S. aureus (MRSA)": "S",
        "H. influenzae (non-β-lac)": "S",
        "H. influenzae (β-lac+)": "I",
        "M. catarrhalis": "S",
        "E. coli": "S",
        "K. pneumoniae": "S",
        "P. aeruginosa": "R",
        "Anaerobes (oral)": "R",
        "Atypicals": "R",
        "MRSA": "S",
        "Enterococcus": "I"
      },
      dosing: [
        {
          indication: "ITU, MRSA-CA piel/tejidos blandos",
          neonates: "Evitar <4 semanas",
          infant_child: "6–12 mg/kg/día (TMP) ÷ c/12h",
          max_dose: "160/800 mg c/12h",
          notes: "Evitar en <2 meses (kernicterus) y en G6PD"
        },
        {
          indication: "Profilaxis PCP (inmunodeprimidos)",
          neonates: null,
          infant_child: "5 mg/kg/día (TMP) ÷ c/12h 3 días/semana",
          max_dose: "160 mg TMP/día",
          notes: "Iniciar a las 4–6 sem en expuestos a VIH"
        }
      ],
      color: "#14b8a6"
    },
    {
      id: "vancomycin",
      name: "Vancomycin",
      class: "Glycopeptide",
      route: ["IV"],
      spectrum: {
        "S. pneumoniae": "S",
        "S. pyogenes (GAS)": "S",
        "S. aureus (MSSA)": "S",
        "S. aureus (MRSA)": "S",
        "H. influenzae (non-β-lac)": "R",
        "H. influenzae (β-lac+)": "R",
        "M. catarrhalis": "R",
        "E. coli": "R",
        "K. pneumoniae": "R",
        "P. aeruginosa": "R",
        "Anaerobes (oral)": "I",
        "Atypicals": "R",
        "MRSA": "S",
        "Enterococcus": "S"
      },
      dosing: [
        {
          indication: "MRSA grave, meningitis bacteriana (adjunto)",
          neonates: "Peso <1.2 kg: 15 mg/kg c/24h; >1.2 kg: 10–15 mg/kg c/8–18h según EG",
          infant_child: "15 mg/kg c/6h (60 mg/kg/día)",
          max_dose: "750–1000 mg/dosis",
          notes: "Target AUC/MIC 400–600. Monitorear nivel valle 10–20 µg/mL"
        }
      ],
      color: "#dc2626"
    },
    {
      id: "metronidazole",
      name: "Metronidazole",
      class: "Nitroimidazole",
      route: ["PO", "IV"],
      spectrum: {
        "S. pneumoniae": "R",
        "S. pyogenes (GAS)": "R",
        "S. aureus (MSSA)": "R",
        "S. aureus (MRSA)": "R",
        "H. influenzae (non-β-lac)": "R",
        "H. influenzae (β-lac+)": "R",
        "M. catarrhalis": "R",
        "E. coli": "R",
        "K. pneumoniae": "R",
        "P. aeruginosa": "R",
        "Anaerobes (oral)": "S",
        "Atypicals": "R",
        "MRSA": "R",
        "Enterococcus": "R"
      },
      dosing: [
        {
          indication: "Infecciones anaeróbicas, C. difficile",
          neonates: "7.5 mg/kg c/48h (<29 sem) → c/24h",
          infant_child: "22.5–35 mg/kg/día ÷ c/8h",
          max_dose: "500 mg/dosis",
          notes: "C. diff: 7.5 mg/kg c/8h x10d. Evitar alcohol"
        }
      ],
      color: "#a78bfa"
    }
  ],

  pathogens: [
    "S. pneumoniae",
    "S. pyogenes (GAS)",
    "S. aureus (MSSA)",
    "S. aureus (MRSA)",
    "H. influenzae (non-β-lac)",
    "H. influenzae (β-lac+)",
    "M. catarrhalis",
    "E. coli",
    "K. pneumoniae",
    "P. aeruginosa",
    "Anaerobes (oral)",
    "Atypicals",
    "MRSA",
    "Enterococcus"
  ],

  infections: [
    {
      id: "otitis_media",
      name: "Otitis Media Aguda (OMA)",
      icon: "🦻",
      pathogens: ["S. pneumoniae", "H. influenzae (β-lac+)", "M. catarrhalis"],
      firstLine: [
        { drug: "amoxicillin", dose: "80–90 mg/kg/día ÷ c/12h", duration: "10 días (<2a), 5–7 días (≥2a)", notes: "Primera línea absoluta" }
      ],
      alternatives: [
        { drug: "amox_clav", dose: "80–90 mg/kg/día ÷ c/12h", duration: "10 días", notes: "Fracaso en 48–72h, OMA recurrente o con drenaje" },
        { drug: "ceftriaxone", dose: "50 mg/kg/día IM x1–3 días", duration: "1–3 dosis", notes: "Vómitos, falta adherencia PO" },
        { drug: "azithromycin", dose: "10/5 mg/kg días 1–5", duration: "5 días", notes: "Solo en alergia grave no-IgE a β-lactámicos" }
      ],
      criteria: "Dolor ótico, fiebre, membrana tímpánica abombada/opaca/con líquido. Diagnóstico clínico.",
      watchout: "Observar sin ATB en ≥2a, OMA unilateral leve-moderada, sin otorrea. SIEMPRE tratar en <2a bilateral, con otorrea, o sintomático grave.",
      guidelines: "AAP 2013 / Red Book 2024"
    },
    {
      id: "pneumonia_community",
      name: "Neumonía Adquirida en la Comunidad (NAC)",
      icon: "🫁",
      pathogens: ["S. pneumoniae", "H. influenzae (non-β-lac)", "Atypicals", "S. aureus (MRSA)"],
      firstLine: [
        { drug: "amoxicillin", dose: "80–90 mg/kg/día ÷ c/12h", duration: "5–7 días", notes: "NAC típica leve, ambulatorio, >5a también cubre S. pneumoniae" },
        { drug: "azithromycin", dose: "10 mg/kg día 1, 5 mg/kg días 2–5", duration: "5 días", notes: "NAC atípica leve (Mycoplasma, Chlamydophila) o >5 años" }
      ],
      alternatives: [
        { drug: "amox_clav", dose: "45 mg/kg/día ÷ c/12h", duration: "7–10 días", notes: "NAC moderada o con cobertura ampliada" },
        { drug: "ceftriaxone", dose: "50–75 mg/kg/día IV", duration: "Hasta step-down PO", notes: "Hospitalización, NAC grave, no tolera PO" },
        { drug: "cefdinir", dose: "14 mg/kg/día ÷ c/12h", duration: "7 días", notes: "Alternativa oral de 3.ª generación" }
      ],
      criteria: "Fiebre, taquipnea (FR >50 <1a; >40 1–4a; >30 ≥5a), infiltrado radiológico. Saturación <92% = hospitalizar.",
      watchout: "S. aureus en lactantes con neumonía grave o cavitación. Considerar MRSA en fracaso de tratamiento. Atípicas >5 años.",
      guidelines: "IDSA/PIDS 2011 / NEUMOPED 2020"
    },
    {
      id: "skin_soft_tissue",
      name: "Infecciones de Piel y Tejidos Blandos (IPTB)",
      icon: "🩹",
      pathogens: ["S. aureus (MSSA)", "S. aureus (MRSA)", "S. pyogenes (GAS)"],
      firstLine: [
        { drug: "cephalexin", dose: "25–50 mg/kg/día ÷ c/6–8h", duration: "5–7 días", notes: "Celulitis no purulenta (GAS/MSSA)" },
        { drug: "trimethoprim_smx", dose: "8–12 mg/kg/día TMP ÷ c/12h", duration: "5–7 días", notes: "MRSA-CA, absceso drenado, foliculitis" }
      ],
      alternatives: [
        { drug: "clindamycin", dose: "30–40 mg/kg/día ÷ c/8h", duration: "5–7 días", notes: "MRSA-CA o cuando TMP-SMX no disponible" },
        { drug: "cefazolin", dose: "50–100 mg/kg/día ÷ c/8h IV", duration: "Hasta mejoría → PO", notes: "Celulitis grave que requiere hospitalización" },
        { drug: "vancomycin", dose: "60 mg/kg/día ÷ c/6h IV", duration: "Según respuesta", notes: "MRSA grave, bacteriemia, fasciitis sospechada" }
      ],
      criteria: "Calor, eritema, dolor, edema. Absceso requiere incisión y drenaje como tratamiento principal.",
      watchout: "Abscesos recurrentes → buscar colonización SARM nasal. Celulitis periorbitaria vs. orbitaria (TC orbitas si proptosis/oftalmoplejia).",
      guidelines: "IDSA SSTI 2014"
    },
    {
      id: "uti",
      name: "Infección Urinaria (ITU)",
      icon: "🧪",
      pathogens: ["E. coli", "K. pneumoniae", "Enterococcus"],
      firstLine: [
        { drug: "trimethoprim_smx", dose: "6–12 mg/kg/día (TMP) ÷ c/12h", duration: "3–5 días (cisititis); 7–14 días (pielonefritis)", notes: "Solo si sensibilidad local >80% E. coli. Contraindicado <2 meses" },
        { drug: "cephalexin", dose: "25–50 mg/kg/día ÷ c/6–8h", duration: "7–14 días (pielonefritis)", notes: "ITU baja en >3 meses, si sensibilidad confirmada" }
      ],
      alternatives: [
        { drug: "ceftriaxone", dose: "50–75 mg/kg/día IV c/24h", duration: "Hasta tolerancia PO, luego 10–14 días total", notes: "Pielonefritis con hospitalización, <3 meses, aspecto tóxico" },
        { drug: "amox_clav", dose: "40–45 mg/kg/día ÷ c/12h", duration: "7–14 días", notes: "Si sensibilidad confirmada por urocultivo" }
      ],
      criteria: "Disuria, polaquiuria, fiebre (pielonefritis). Diagnóstico por urocultivo ≥100,000 UFC/mL (orina de chorro medio) o cualquier crecimiento por punción supra-pùbica.",
      watchout: "Siempre urocultivo antes de iniciar ATB. En <3 meses o con fiebre alta: descartar urosepsis. Ecografía renal en primer episodio en <2 años.",
      guidelines: "AAP 2011 / EAU 2023"
    },
    {
      id: "pharyngitis",
      name: "Faringoamigdalitis por S. pyogenes",
      icon: "🗣️",
      pathogens: ["S. pyogenes (GAS)"],
      firstLine: [
        { drug: "amoxicillin", dose: "50 mg/kg/día c/24h o ÷ c/12h", duration: "10 días", notes: "Primera línea. Igual eficacia que penicilina, mejor palatabilidad" }
      ],
      alternatives: [
        { drug: "cephalexin", dose: "20 mg/kg/día ÷ c/12h", duration: "10 días", notes: "Alergia no-grave a penicilina" },
        { drug: "clindamycin", dose: "21 mg/kg/día ÷ c/8h", duration: "10 días", notes: "Alergia grave a β-lactámicos (IgE-mediada)" },
        { drug: "azithromycin", dose: "12 mg/kg/día x5 días", duration: "5 días", notes: "Solo si no hay alternativas; resistencia 5–10%" }
      ],
      criteria: "Score CENTOR modificado ≥3 (fiebre, exudado, adenopatía, ausencia tos). Confirmar con prueba rápida o cultivo.",
      watchout: "Completar 10 días para prevenir fiebre reumática. NO indicado en faringitis viral (90% casos). No tratar portadores asintomáticos.",
      guidelines: "IDSA 2012 / AAP Red Book 2024"
    },
    {
      id: "meningitis",
      name: "Meningitis Bacteriana",
      icon: "🧠",
      pathogens: ["S. pneumoniae", "H. influenzae (non-β-lac)", "S. pyogenes (GAS)"],
      firstLine: [
        { drug: "ceftriaxone", dose: "100 mg/kg/día ÷ c/12h IV", duration: "7–21 días según etiología", notes: "Empírico >1 mes. Cubrir S. pneumoniae, H. influenzae, Neisseria" },
        { drug: "vancomycin", dose: "60 mg/kg/día ÷ c/6h IV (adjunto)", duration: "Hasta sensibilidades disponibles", notes: "Siempre junto a ceftriaxone empírico (PRSP)" }
      ],
      alternatives: [
        { drug: "cefepime", dose: "150 mg/kg/día ÷ c/8h IV", duration: "Según etiología", notes: "Si sospecha Gram-negativo resistente o nosocomial" }
      ],
      criteria: "Fiebre + rigidez de nuca + alteración del estado mental (tríada de Kernig). LCR: >1000 leuco/mm³ con PMN, glucosa baja, proteínas elevadas.",
      watchout: "Iniciar ATB ANTES de TC si hay demora >30 min. Dexametasona 0.15 mg/kg c/6h x4 días en Hib y S. pneumoniae. No esperar resultados de cultivo.",
      guidelines: "IDSA 2004 / ESPID 2021"
    }
  ]
};

// Export for use in other modules
if (typeof module !== 'undefined') module.exports = ANTIBIOTICS_DATA;
