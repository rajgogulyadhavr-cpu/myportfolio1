import { Project, Achievement, Skill, Certification } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "Autonomous Self Service Robot",
    description: "An advanced, self-navigating interactive robot designed to offer autonomous self-service assistance.",
    fullDescription: "This advanced robotics project integrates LIDAR mapping, depth-sensing cameras, and pathfinding algorithms to create an autonomous self-service robot. It is capable of moving safely in crowded dynamic environments, greeting visitors, and providing assistance or information through an integrated touchscreen display.",
    imageUrl: "/src/assets/images/self_service_robot_1782725099565.jpg",
    tags: ["Robotics", "Python", "Computer Vision", "LIDAR", "SLAM", "AI"],
    features: [
      "Autonomous SLAM-based path planning and obstacle avoidance",
      "Interactive conversational user interface with voice output",
      "Dynamic path navigation inside public buildings",
      "Facial recognition to greet returning visitors"
    ]
  },
  {
    id: "project-2",
    title: "Object Detection & Avoidance Robot",
    description: "A hardware-software combined robotic vehicle utilizing real-time sensors to detect and avoid physical obstacles.",
    fullDescription: "A smart robotic car utilizing an array of ultrasonic, infrared, and lidar sensors paired with an on-board computer. The robot runs real-time computer vision models to identify obstacle types (e.g., people, pets, stairs) and dynamically calculate safe alternate trajectories in milliseconds.",
    imageUrl: "/src/assets/images/diy_robot_car_1782725120038.jpg",
    tags: ["Embedded C++", "Raspberry Pi", "Arduino", "Object Detection", "ROS"],
    features: [
      "Real-time sensor fusion (Ultrasonic + LIDAR + Camera)",
      "Adaptive speed adjustment based on obstacle proximity",
      "TensorFlow Lite object detection models running at edge-level",
      "Autonomous recovery from dead-ends and maze navigation"
    ]
  },
  {
    id: "project-3",
    title: "Foot Guard AI",
    description: "An AI-powered preventive healthcare platform designed to help diabetic patients identify risks early and maintain foot care.",
    fullDescription: "FootGuard AI is a comprehensive web-based platform aiming to reduce diabetic foot ulcer occurrences. Users can upload thermography or standard images of their feet. An integrated custom vision model analyzes inflammation, temperature differences, and pressure distribution to detect high-risk lesions early.",
    imageUrl: "/src/assets/images/foot_guard_ai_1782725175668.jpg",
    demoUrl: "http://foot-gold.vercel.app/",
    tags: ["Preventive Health", "AI Diagnoses", "React.js", "Computer Vision", "Vercel"],
    features: [
      "Early lesion and inflammation anomaly detection from foot photos",
      "Personalized daily foot care checklist and habits tracker",
      "One-click consultation booking with vascular & podiatry specialists",
      "Interactive data charts tracking foot recovery progress"
    ]
  },
  {
    id: "project-4",
    title: "Kural AI",
    description: "An intelligent Tamil language learning platform designed to teach Tamil through interactive AI lessons and pronunciation tracking.",
    fullDescription: "Kural AI is a highly immersive learning environment built specifically to keep Tamil language learning engaging and accessible. It uses gamification and state-of-the-art Speech-to-Text models to verify the user's spoken Tamil pronunciation in real-time, giving instant constructive feedback.",
    imageUrl: "/src/assets/images/kural_ai_1782725193568.jpg",
    demoUrl: "https://kuralaai.netlify.app/",
    tags: ["Tamil Learning", "Speech Synthesis", "React", "Gemini API", "Speech-to-Text"],
    features: [
      "AI-powered pronunciation check with dynamic phonetic breakdown",
      "Interactive gamified lessons covering letters, Thirukkural, and vocabulary",
      "Conversational Tamil tutor AI for speaking practice",
      "Dynamic certificate generator on lesson completion"
    ]
  },
  {
    id: "project-5",
    title: "Pressure Release AI",
    description: "A mental wellness platform that detects cognitive overload early, offering recovery metrics to prevent burnout.",
    fullDescription: "Pressure Release AI is a cognitive workload helper designed to analyze workspace stressors, daily workload levels, and emotional states. Utilizing sentiment analysis on user journals and active stress questionnaire inputs, it suggests optimized breathing loops, physical breaks, and mental resets.",
    imageUrl: "/src/assets/images/pressure_release_ai_1782725210570.jpg",
    demoUrl: "https://pressure-release-ai.netlify.app/",
    tags: ["Mental Wellness", "Sentiment Analysis", "Tailwind CSS", "React", "FastAPI"],
    features: [
      "Real-time burnout risk index and cognitive load meter",
      "AI-guided therapeutic meditation and dynamic breathing exercise canvas",
      "Automated workspace break suggestions based on usage fatigue",
      "Completely secure, local-first client database for high privacy"
    ]
  },
  {
    id: "project-6",
    title: "NeuroClass AI",
    description: "A multilingual Tamil-English smart learning portal incorporating real-time facial focus and drowsiness tracking.",
    fullDescription: "NeuroClass AI revolutionizes online classrooms for primary, secondary, and higher secondary students. It serves course content dynamically and utilizes the student's webcam to monitor eye movement, blink rates, and posture. The system detects if a student is losing focus or showing fatigue/drowsiness, prompting light micro-challenges to keep them alert.",
    imageUrl: "/src/assets/images/neuroclass_dashboard_1782725134647.jpg",
    tags: ["E-Learning", "Facial Tracking", "MediaPipe", "Multilingual", "React.js"],
    features: [
      "Real-time focus index score and micro-sleep/drowsiness alerts",
      "Adaptive difficulty matching based on current focus and quiz results",
      "Tamil and English bilingual text-to-speech explanations",
      "Detailed visual analytical report cards for teachers and parents"
    ]
  },
  {
    id: "project-7",
    title: "Local Area Rice Mill Brand Posters",
    description: "A professional graphic marketing project using Canva, designing custom promotional posters for a local rice mill.",
    fullDescription: "A specialized local-area marketing effort leveraging Canva and modern graphic design principles. Created premium poster campaigns, packaging design guides, and digital catalog assets for a traditional rice mill to successfully appeal to urban retail markets while maintaining local heritage branding.",
    imageUrl: "/src/assets/images/rice_mill_poster_1782725152473.jpg",
    tags: ["Canva", "Graphic Design", "Branding", "Local Marketing", "Poster Design"],
    features: [
      "Custom product packaging templates designed for commercial print",
      "High-converting localized social media marketing graphics",
      "Strategic typography matching representing purity and trust",
      "Complete print-ready outdoor banner and poster assets"
    ]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-1",
    title: "Centum in Computer Science Award",
    organization: "TN State Board examinations (12th Grade)",
    date: "2023",
    description: "Achieved a perfect score of 100/100 in the TN State Board Computer Science board exams, recognized for outstanding technical and academic excellence.",
    images: [
      {
        url: "/src/assets/images/centum_cs_award_1782725234259.jpg",
        caption: "Perfect score 100/100 academic recognition certificate"
      }
    ]
  },
  {
    id: "ach-2",
    title: "Multiple Elocution & Writing Prizes",
    organization: "State-wide Speech & Essay Contests",
    date: "2023 - 2025",
    description: "Awarded multiple 1st, 2nd, and 3rd place awards in various speech (elocution) and essay writing competitions in both Tamil and English, highlighting excellent oratorical and communications skills.",
    images: [
      {
        url: "/src/assets/images/elocution_prizes_1782725248498.jpg",
        caption: "Winning speech presentation on technical innovations"
      }
    ]
  },
  {
    id: "ach-3",
    title: "3rd Place - National Level Hackathon",
    organization: "VCET, Madurai",
    date: "2024",
    description: "Successfully secured the 3rd Prize in a highly competitive 24-hour National level hackathon held at VCET Madurai, competing with over 150 student teams from across India with our smart embedded system prototype.",
    images: [
      {
        url: "/src/assets/images/vcet_hackathon_1782725262660.jpg",
        caption: "VCET Madurai Hackathon team coding sprint"
      }
    ]
  },
  {
    id: "ach-4",
    title: "Shortlisted for Kalam Awards '25 & EDI Hackathon '26",
    organization: "Dr. APJ Abdul Kalam Innovation Forum & EDI",
    date: "2025 - 2026",
    description: "Proudly shortlisted as a finalist in the prestigious Kalam Awards '25 for our student AI innovation projects, and subsequently selected for the EDI (Entrepreneurship Development Institute) Hackathon in 2026.",
    images: [
      {
        url: "/src/assets/images/kalam_award_shortlist_1782725280015.jpg",
        caption: "Finalist entry at APJ Abdul Kalam Innovation Showcase '25"
      },
      {
        url: "/src/assets/images/kalam_award_cert_1782726766855.jpg",
        caption: "Dr. APJ Abdul Kalam Young Achiever Award 2025 Participant Certificate"
      },
      {
        url: "/src/assets/images/youth_india_round_table_1782725295899.jpg",
        caption: "Pitch deck presentation round at EDI Hackathon '26"
      }
    ]
  },
  {
    id: "ach-5",
    title: "Runner-Up: Youth India Round Table",
    organization: "Round Table India (Karur Chapter)",
    date: "2025",
    description: "Secured the Runner-Up title in the Youth India Round Table debate and leadership leadership conclave, demonstrating excellent problem-solving, strategic negotiation, and presentation skills.",
    images: [
      {
        url: "/src/assets/images/youth_india_round_table_1782725295899.jpg",
        caption: "Karur Leadership Round Table finalists group photo"
      }
    ]
  }
];

export const SKILLS: Skill[] = [
  // AI-ML
  { 
    name: "Python Programming", 
    level: 90, 
    category: "ai-ml", 
    iconName: "Terminal",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
  },
  { 
    name: "Computer Vision (MediaPipe)", 
    level: 85, 
    category: "ai-ml", 
    iconName: "Eye",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg"
  },
  // Frontend
  { 
    name: "React.js & TypeScript", 
    level: 85, 
    category: "frontend", 
    iconName: "Code2",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
  },
  { 
    name: "Tailwind CSS (Glassmorphism)", 
    level: 95, 
    category: "frontend", 
    iconName: "Palette",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
  },
  // Backend
  { 
    name: "Node.js & Express", 
    level: 80, 
    category: "backend", 
    iconName: "Server",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
  },
  { 
    name: "REST APIs Development", 
    level: 85, 
    category: "backend", 
    iconName: "Network",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg"
  },
  // Databases
  { 
    name: "MySQL", 
    level: 88, 
    category: "databases", 
    iconName: "Database",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
  },
  // Tools & Cloud
  { 
    name: "Firebase (Firestore & Auth)", 
    level: 82, 
    category: "tools", 
    iconName: "Flame",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg"
  },
  { 
    name: "Supabase BaaS", 
    level: 80, 
    category: "tools", 
    iconName: "Zap",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg"
  },
  { 
    name: "PowerBI Data Viz", 
    level: 85, 
    category: "tools", 
    iconName: "BarChart3",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Power_bi_logo_black.svg"
  },
  { 
    name: "Git & GitHub", 
    level: 88, 
    category: "tools", 
    iconName: "GitBranch",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
  },
  { 
    name: "Canva Design Studio", 
    level: 85, 
    category: "tools", 
    iconName: "PenTool",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg"
  },
  { 
    name: "MS Word", 
    level: 95, 
    category: "tools", 
    iconName: "FileText"
  },
  { 
    name: "MS Excel", 
    level: 90, 
    category: "tools", 
    iconName: "Table"
  },
  { 
    name: "MS PowerPoint", 
    level: 90, 
    category: "tools", 
    iconName: "Presentation"
  }
];

export const CERTIFICATIONS: Certification[] = [
  { 
    name: "Python", 
    issuer: "GUVI Geek Networks (Google for Education Partner)", 
    date: "January 30, 2025", 
    iconName: "Binary",
    imageUrl: "/src/assets/images/python_cert_1782726673914.jpg"
  },
  { 
    name: "Intro to SQL", 
    issuer: "le wagon", 
    date: "January 31, 2025", 
    iconName: "Database",
    imageUrl: "/src/assets/images/sql_cert_1782726690412.jpg"
  },
  { 
    name: "Power BI - For Business Applications", 
    issuer: "Microsoft Learn / FICE", 
    date: "January 20, 2026", 
    iconName: "PieChart",
    imageUrl: "/src/assets/images/powerbi_cert_1782726708956.jpg"
  },
  { 
    name: "Data Science & Analytics", 
    issuer: "HP LIFE / HP Foundation", 
    date: "January 31, 2025", 
    iconName: "LineChart",
    imageUrl: "/src/assets/images/datascience_cert_1782726729496.jpg"
  },
  { 
    name: "Front End Technologies", 
    issuer: "IBM Career Education Program", 
    date: "November 1, 2025", 
    iconName: "Globe",
    imageUrl: "/src/assets/images/frontend_cert_1782726742562.jpg"
  },
  { 
    name: "Back-End App Development with Node.js and Express", 
    issuer: "TamilNadu Skills Development Corporation / IBM", 
    date: "November 1, 2025", 
    iconName: "Cpu",
    imageUrl: "/src/assets/images/backend_cert_1782726754097.jpg"
  }
];
