/**
 * Single Source of Truth Portfolio Data
 * Extracted strictly from: REKHA RESUME.pdf
 * Owner: Ravipati Rekha Annapurna
 */

const portfolioData = {
  personal: {
    name: "Ravipati Rekha Annapurna",
    headline: "IT Undergraduate | Full-Stack Developer | IoT & AI Enthusiast",
    phone: "9398613081",
    email: "rekhaannapurna.ravipati@gmail.com",
    linkedin: "https://www.linkedin.com/in/rekha-annapurna",
    github: "https://github.com/rekhaannapurna",
    cgpa: "9.29",
    location: "Andhra Pradesh, India",
    resumePdf: "./assets/REKHA_RESUME.pdf",
    avatar: "./assets/images/rekha-photo.jpg",
    stats: [
      { value: "9.29", label: "Academic CGPA" },
      { value: "4", label: "Hackathon Awards" },
      { value: "3", label: "Key Projects" },
      { value: "IT", label: "B.Tech Specialization" }
    ]
  },

  summary: "High-performing IT undergraduate (9.29 CGPA) and multi-hackathon winner with expertise in Data Structures, Full-Stack, and IoT development. Skilled in building scalable applications using Java, Python and Supabase.",

  skills: {
    "Languages": [
      "Java",
      "Python",
      "C",
      "SQL",
      "JavaScript"
    ],
    "Web & Frameworks": [
      "React.js",
      "Flutter",
      "Flask",
      "Django",
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "Databases & Cloud": [
      "MySQL",
      "Oracle",
      "Supabase"
    ],
    "Developer Tools & Libraries": [
      "Git",
      "GitHub",
      "VS Code",
      "IntelliJ IDEA",
      "Vercel",
      "pandas",
      "NumPy",
      "Matplotlib"
    ],
    "Core Concepts": [
      "Data Structures & Algorithms (DSA)",
      "DBMS",
      "OOP",
      "OS",
      "Computer Networks"
    ]
  },

  projects: [
    {
      id: "med-torque",
      title: "Med Torque",
      type: "Voice Escalation System",
      technologies: ["Python", "Flask", "Twilio API", "TTS", "Supabase"],
      date: "February 2026",
      image: "./assets/images/med_torque.jpg",
      bullets: [
        "Developed an automated voice reminder system delivering human-like phone calls for task and medication alerts.",
        "Implemented real-time confirmation and caregiver escalation logic to ensure patient safety and reliability."
      ],
      availabilityText: "Project details available on request"
    },
    {
      id: "mission-millets",
      title: "Mission Millets",
      type: "AgriTech Marketplace",
      technologies: ["React", "TypeScript", "Supabase", "Tailwind", "Vercel"],
      date: "December 2025",
      image: "./assets/images/mission_millets.jpg",
      bullets: [
        "Engineered a web platform connecting millet farmers directly with buyers to eliminate middleman costs.",
        "Built secure cloud data management with farmer registration, product listings, and seamless Vercel deployment."
      ],
      availabilityText: "Project details available on request"
    },
    {
      id: "bharat-box",
      title: "Bharat Box",
      type: "Industrial IoT Monitor",
      technologies: ["ESP32", "LoRaWAN", "React", "Node.js", "Express"],
      date: "September 2025",
      image: "./assets/images/bharat_box.jpg",
      bullets: [
        "Built an IoT machine health monitoring system to detect equipment faults in real time using ESP32 sensors.",
        "Implemented long-range LoRaWAN communication and created a web dashboard to track equipment status."
      ],
      availabilityText: "Project details available on request"
    }
  ],

  achievements: [
    {
      title: "1st Place – Info VIT Hackathon",
      badge: "🥇 1st Place",
      track: "Healthcare Innovation Track",
      projectRef: "Med Torque",
      description: "Awarded top position in the Healthcare Innovation track for engineering Med Torque, an AI-driven automated voice escalation reminder platform."
    },
    {
      title: "3rd Place (National Level) – National Agritech Hackathon",
      badge: "🥉 National Level",
      track: "Agritech Track • RVR & JC College",
      projectRef: "Mission Millets",
      description: "Recognized among nationwide participants at RVR & JC College for developing Mission Millets, a direct farmer-to-buyer marketplace."
    },
    {
      title: "3rd Place & Finalist – SparkTank 2.0 & College Research Day",
      badge: "⭐ Dual Honors",
      track: "Hardware & IoT Track",
      projectRef: "Bharat Box",
      description: "Won dual honors for presenting Bharat Box, an IoT-based industrial machine health and predictive maintenance monitor."
    },
    {
      title: "Hackathon Team Lead Distinction",
      badge: "🚀 4 Top-Tier Awards",
      track: "Cross-Functional Leadership",
      projectRef: "Engineering Hackathons",
      description: "Guided cross-functional engineering teams through end-to-end development, project scoping, and technical pitches, securing 4 top-tier hackathon awards."
    }
  ],

  certifications: [
    {
      organization: "Kaggle",
      title: "Python Certification",
      domain: "Data Processing & Algorithms",
      description: "Validated core data processing, object-oriented logic, and algorithmic problem-solving."
    },
    {
      organization: "NPTEL",
      title: "Artificial Intelligence & Knowledge Representation",
      domain: "AI Theory & Reasoning",
      description: "Comprehensive coursework on AI search algorithms, logic, and reasoning."
    },
    {
      organization: "EduSkills Platform",
      title: "DevOps & Cloud Automation Virtual Internship",
      domain: "DevOps & Cloud Infrastructure",
      description: "Hands-on experience in CI/CD pipelines, containerization, and cloud infrastructure management."
    }
  ],

  education: [
    {
      institution: "Vishnu Institute Of Technology",
      degree: "B.Tech in Information Technology",
      period: "2024 - 2028",
      score: "CGPA: 9.29",
      location: "Bhimavaram, Andhra Pradesh",
      badge: "Undergraduate Degree"
    },
    {
      institution: "Pragati Junior College",
      degree: "Intermediate MPC",
      period: "2022 - 2024",
      score: "Percentage: 95.6%",
      location: "Tanuku, Andhra Pradesh",
      badge: "Board of Intermediate Education"
    },
    {
      institution: "Infant Jesus E.M High School",
      degree: "SSC",
      period: "2022",
      score: "Percentage: 92.6%",
      location: "Penugonda, Andhra Pradesh",
      badge: "Secondary School Certificate"
    }
  ],

  leadership: [
    {
      role: "Hackathon Team Lead",
      badge: "Engineering Leadership",
      description: "Guided cross-functional engineering teams through end-to-end development, project scoping, and technical pitches, securing 4 top-tier hackathon awards."
    },
    {
      role: "PR Core Member — DO IT Club",
      badge: "Community & Outreach",
      description: "Coordinated campus technical events, managed student outreach campaigns, and handled communication logistics for workshops and competitions."
    },
    {
      role: "Class Group Representative (GR)",
      badge: "Student Advocacy",
      description: "Served as primary academic liaison between faculty and 60+ students, facilitating schedule coordination and student advocacy."
    }
  ]
};

// Universal export pattern: attaches to window for browser script usage
if (typeof window !== "undefined") {
  window.portfolioData = portfolioData;
}

// CommonJS export if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = { portfolioData };
}
