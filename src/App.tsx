import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sun,
  Moon,
  Cpu,
  Award,
  Code2,
  Phone,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ArrowUpRight,
  CheckCircle2,
  Download,
  Eye,
  Sparkles,
  BookOpen,
  Brain,
  Palette,
  Terminal,
  Clock,
  Layers,
  MapPin,
  Flame,
  Zap,
  Check,
  Network,
  Database,
  Copy,
  FileText,
  Table,
  Presentation
} from "lucide-react";

import LiquidBackground from "./components/LiquidBackground";
import AchievementsGallery from "./components/AchievementsGallery";
import AIRobot from "./components/AIRobot";
import { PROJECTS, SKILLS, CERTIFICATIONS } from "./data";
import { Project, Skill, Certification } from "./types";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState<"skills" | "certs">("skills");
  const [skillCategory, setSkillCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Load and apply theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("raja_portfolio_theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("raja_portfolio_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("raja_portfolio_theme", "light");
    }
  };

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  // Filter skills by category
  const filteredSkills = SKILLS.filter(skill => {
    if (skillCategory === "all") return true;
    return skill.category === skillCategory;
  });

  // Custom Icon Selector Helper
  const SkillIconWrapper = ({ name }: { name: string }) => {
    const iconSize = "w-4 h-4";
    switch (name) {
      case "Terminal": return <Terminal className={iconSize} />;
      case "Eye": return <Eye className={iconSize} />;
      case "BrainCircuit": return <Brain className={iconSize} />;
      case "Cpu": return <Cpu className={iconSize} />;
      case "Code2": return <Code2 className={iconSize} />;
      case "Palette": return <Palette className={iconSize} />;
      case "Sparkles": return <Sparkles className={iconSize} />;
      case "Server": return <ServerIcon className={iconSize} />;
      case "Network": return <Network className={iconSize} />;
      case "Database": return <Database className={iconSize} />;
      case "Layers": return <Layers className={iconSize} />;
      case "Flame": return <Flame className={iconSize} />;
      case "Zap": return <Zap className={iconSize} />;
      case "BarChart3": return <Award className={iconSize} />;
      case "GitBranch": return <Github className={iconSize} />;
      case "PenTool": return <BookOpen className={iconSize} />;
      case "Binary": return <Cpu className={iconSize} />;
      case "PieChart": return <Cpu className={iconSize} />;
      case "LineChart": return <Cpu className={iconSize} />;
      case "Globe": return <Cpu className={iconSize} />;
      case "FileText": return (
        <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="28" height="28" rx="6" fill="#1E40AF" stroke="#000000" strokeWidth="2" />
          <rect x="6" y="6" width="20" height="20" rx="4" fill="#3B82F6" stroke="#000000" strokeWidth="1.5" />
          <path d="M10 11H22M10 15H18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <rect x="14" y="16" width="12" height="10" rx="2" fill="#FFE24A" stroke="#000000" strokeWidth="1.5" />
          <text x="20" y="24" fill="#000000" fontSize="8" fontWeight="900" fontFamily="monospace" textAnchor="middle">W</text>
        </svg>
      );
      case "Table": return (
        <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="28" height="28" rx="6" fill="#065F46" stroke="#000000" strokeWidth="2" />
          <rect x="6" y="6" width="20" height="20" rx="4" fill="#10B981" stroke="#000000" strokeWidth="1.5" />
          <path d="M11 6V26M16 6V26M21 6V26M6 11H26M6 16H26M6 21H26" stroke="#065F46" strokeWidth="1" opacity="0.4" />
          <rect x="14" y="16" width="12" height="10" rx="2" fill="#FFE24A" stroke="#000000" strokeWidth="1.5" />
          <text x="20" y="24" fill="#000000" fontSize="8" fontWeight="900" fontFamily="monospace" textAnchor="middle">X</text>
        </svg>
      );
      case "Presentation": return (
        <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="28" height="28" rx="6" fill="#9A3412" stroke="#000000" strokeWidth="2" />
          <rect x="6" y="6" width="20" height="20" rx="4" fill="#F97316" stroke="#000000" strokeWidth="1.5" />
          <path d="M10 19L14 13L18 16L22 10" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="22" cy="10" r="1.5" fill="#FFE24A" />
          <rect x="14" y="16" width="12" height="10" rx="2" fill="#FFE24A" stroke="#000000" strokeWidth="1.5" />
          <text x="20" y="24" fill="#000000" fontSize="8" fontWeight="900" fontFamily="monospace" textAnchor="middle">P</text>
        </svg>
      );
      default: return <Award className={iconSize} />;
    }
  };

  return (
    <div className="relative min-h-screen text-slate-800 dark:text-slate-100 font-sans transition-colors duration-500 overflow-x-hidden select-text pb-10">
      
      {/* Background with floating bubbles */}
      <LiquidBackground />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        
        {/* HEADER / NAVIGATION */}
        <header className="sticky top-4 z-30 flex items-center justify-between p-4 px-6 rounded-2xl bg-white dark:bg-[#121214] border-[3px] border-slate-950 dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FFE24A] text-slate-950 border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black tracking-tight text-slate-950 dark:text-white leading-none uppercase">
                Rajalingam
              </h1>
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#38BDF8] dark:text-[#38BDF8] mt-0.5 block">
                AI Student Portfolio
              </span>
            </div>
          </div>

          {/* Jump links - Hidden on mobile, flex on desktop */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-black tracking-wider uppercase">
            <a href="#about" className="text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">About</a>
            <a href="#skills" className="text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">Skills</a>
            <a href="#projects" className="text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">Projects</a>
            <a href="#achievements" className="text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">Achievements</a>
            <a href="#contact" className="text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">Contact</a>
          </nav>

          {/* Dark Mode toggle & Socials wrapper */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-950 dark:text-white border-2 border-slate-950 dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
              title={isDark ? "Light Mode" : "Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-600" />}
            </button>
            
            <a
              href="#contact"
              className="hidden sm:inline-flex px-5 py-2.5 rounded-xl bg-[#38BDF8] hover:bg-[#0ea5e9] text-slate-950 text-xs font-black tracking-wider uppercase border-2 border-slate-950 dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-center"
            >
              Contact Me
            </a>
          </div>
        </header>

        {/* HERO SECTION / ABOUT */}
        <section id="about" className="mt-12 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Brief Bio Card */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#121214] border-[3px] border-slate-950 dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFE24A] text-slate-950 border-2 border-slate-950 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse border border-black" />
                <span>Enthusiastic AI Student & Robotics Developer</span>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl overflow-hidden border-[3px] border-slate-950 dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] shrink-0 bg-white">
                  <img 
                    src="/src/assets/images/raja_profile_uploaded_1782727154447.jpg" 
                    alt="Rajalingam Narayanakumar"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight uppercase font-display">
                    Solving complex problems with <span className="bg-[#FFE24A] dark:bg-[#38BDF8] text-slate-950 dark:text-slate-950 px-2 py-0.5 border-2 border-slate-950 dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] inline-block transform -rotate-1">intelligent code</span> & robotics.
                  </h2>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mt-6 leading-relaxed max-w-2xl font-semibold">
                Hi, I am <span className="font-extrabold text-slate-950 dark:text-white">Rajalingam Narayanakumar</span>. As an AI Student, I love engineering systems that bridge the gap between AI code and physical hardware. From building autonomous navigation robots to programming intelligent healthcare portals (like Foot Guard AI), I craft interactive responsive webs and embedded systems designed to impact lives.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-slate-950 dark:border-white flex flex-wrap gap-y-4 gap-x-6 items-center text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#38BDF8]" />
                <span>Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#38BDF8]" />
                <a href="mailto:rajgogulyadhavr@gmail.com" className="hover:text-sky-500 underline decoration-2 transition-colors">rajgogulyadhavr@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Right Column Stack: Quick Stats & AI Companion */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Quick Stats & Contacts (Bento card) */}
            <div className="rounded-2xl flex flex-col justify-between p-6 bg-white dark:bg-[#121214] border-[3px] border-slate-950 dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all relative min-h-[350px]">
              <div>
                <h3 className="text-xs font-mono font-black text-slate-500 uppercase tracking-widest mb-4">Quick Insights</h3>
                
                {/* Mini Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-white dark:bg-[#1b1b1f] border-2 border-slate-950 dark:border-white text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]">
                    <span className="text-xl sm:text-2xl font-black text-[#38BDF8] block">7+</span>
                    <span className="text-[9px] text-slate-600 dark:text-slate-400 uppercase font-mono font-bold mt-1 block">Projects</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-[#1b1b1f] border-2 border-slate-950 dark:border-white text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]">
                    <span className="text-xl sm:text-2xl font-black text-[#FFE24A] block">6</span>
                    <span className="text-[9px] text-slate-600 dark:text-slate-400 uppercase font-mono font-bold mt-1 block">Certs</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-[#1b1b1f] border-2 border-slate-950 dark:border-white text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]">
                    <span className="text-xl sm:text-2xl font-black text-[#4ADE80] block">5+</span>
                    <span className="text-[9px] text-slate-600 dark:text-slate-400 uppercase font-mono font-bold mt-1 block">Laurels</span>
                  </div>
                </div>

                {/* Contact Details List */}
                <div className="space-y-2.5">
                  {/* Email address */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-[#1b1b1f] border-2 border-slate-950 dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                    <div className="flex items-center gap-2 text-xs">
                      <Mail className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                      <span className="text-slate-800 dark:text-slate-300 font-bold truncate max-w-[140px] sm:max-w-[180px]">rajgogulyadhavr@gmail.com</span>
                    </div>
                    <button 
                      onClick={() => copyToClipboard("rajgogulyadhavr@gmail.com", "email")}
                      className="p-1.5 rounded-lg hover:bg-[#38BDF8]/10 text-[#38BDF8] border border-slate-950 dark:border-white bg-slate-50 dark:bg-slate-900 transition-colors cursor-pointer"
                      title="Copy Email"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Phone number */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-[#1b1b1f] border-2 border-slate-950 dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                    <div className="flex items-center gap-2 text-xs">
                      <Phone className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                      <span className="text-slate-800 dark:text-slate-300 font-bold">+91 9791703480</span>
                    </div>
                    <button 
                      onClick={() => copyToClipboard("+919791703480", "phone")}
                      className="p-1.5 rounded-lg hover:bg-[#38BDF8]/10 text-[#38BDF8] border border-slate-950 dark:border-white bg-slate-50 dark:bg-slate-900 transition-colors cursor-pointer"
                      title="Copy Phone"
                    >
                      {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Micro Quick Links */}
              <div className="mt-5 pt-4 border-t-2 border-slate-950 dark:border-white flex items-center justify-between font-black uppercase tracking-wider text-xs">
                <a
                  href="https://github.com/rajgogulyadhavr-cpu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-800 dark:text-slate-300 hover:text-[#38BDF8] transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/rajalingam-narayanakumar-578a69348?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-800 dark:text-slate-300 hover:text-[#38BDF8] transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-[#0077b5]" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Futuristic Animated Companion Robot Bento Card */}
            <AIRobot />

          </div>
        </section>

        {/* BENTO SKILLS & CERTIFICATIONS SECTION */}
        <section id="skills" className="mt-16 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[10px] font-mono font-black text-[#38BDF8] tracking-widest uppercase block">My Tech Stack</span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white mt-1 tracking-tight uppercase font-display">
                Expertise & Certifications
              </h2>
            </div>

            {/* Tab toggler (Skills vs Certs) */}
            <div className="inline-flex p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border-2 border-slate-950 dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              <button
                onClick={() => setActiveTab("skills")}
                className={`px-5 py-2.5 rounded-lg text-xs font-black tracking-wide uppercase transition-all cursor-pointer border-2 ${
                  activeTab === "skills"
                    ? "bg-[#FFE24A] text-slate-950 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                Technical Skills
              </button>
              <button
                onClick={() => setActiveTab("certs")}
                className={`px-5 py-2.5 rounded-lg text-xs font-black tracking-wide uppercase transition-all cursor-pointer border-2 ${
                  activeTab === "certs"
                    ? "bg-[#FFE24A] text-slate-950 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                Certifications
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "skills" ? (
              /* TECHNICAL SKILLS SCREEN */
              <motion.div
                key="skills-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-2.5 pb-2 overflow-x-auto">
                  {[
                    { id: "all", label: "All Skills" },
                    { id: "ai-ml", label: "AI & ML" },
                    { id: "frontend", label: "Frontend Web" },
                    { id: "backend", label: "Backend Web" },
                    { id: "databases", label: "Databases" },
                    { id: "tools", label: "Cloud & Tools" }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSkillCategory(cat.id)}
                      className={`px-4.5 py-2.5 rounded-xl text-xs font-black tracking-wide uppercase border-2 transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] active:translate-y-[1px] active:shadow-none ${
                        skillCategory === cat.id
                          ? "bg-[#38BDF8] text-slate-950 border-slate-950 dark:border-white"
                          : "bg-white dark:bg-[#121214] text-slate-800 dark:text-slate-300 border-slate-950 dark:border-white"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Skills Grid without percentages */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group p-4 rounded-xl bg-white dark:bg-[#121214] border-[3px] border-slate-950 dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] transition-all flex items-center gap-3.5"
                    >
                      <div className="w-11 h-11 rounded-lg bg-white dark:bg-slate-900 flex items-center justify-center shrink-0 border-2 border-slate-950 dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                        {skill.logoUrl ? (
                          <img
                            src={skill.logoUrl}
                            alt={skill.name}
                            className="w-6 h-6 object-contain"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="text-slate-950 dark:text-white font-bold">
                            <SkillIconWrapper name={skill.iconName} />
                          </div>
                        )}
                      </div>
                      <span className="text-xs sm:text-sm font-black tracking-tight text-slate-950 dark:text-white uppercase group-hover:text-[#38BDF8] dark:group-hover:text-[#38BDF8] transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* OFFICIAL CERTIFICATIONS SCREEN WITH ZOOM VIEWER */
              <motion.div
                key="certs-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.name}
                    onClick={() => cert.imageUrl && setSelectedCert(cert)}
                    className="group p-5 rounded-2xl bg-white dark:bg-[#121214] border-[3px] border-slate-950 dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] cursor-pointer flex flex-col justify-between transition-all"
                  >
                    <div>
                      {/* Cert Image Thumbnail */}
                      {cert.imageUrl && (
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-950 border-2 border-slate-950 dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                          <img
                            src={cert.imageUrl}
                            alt={cert.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-300" />
                          <div className="absolute bottom-3 right-3 p-2 rounded bg-slate-950 border-2 border-slate-950 text-white text-[10px] font-black tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                            <Eye className="w-3.5 h-3.5 text-sky-400" />
                            <span>Zoom View</span>
                          </div>
                        </div>
                      )}

                      <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest block">{cert.issuer}</span>
                      <h3 className="text-sm sm:text-base font-black text-slate-950 dark:text-white mt-1 leading-snug uppercase group-hover:text-[#38BDF8] transition-colors">
                        {cert.name}
                      </h3>
                    </div>

                    <div className="mt-4 pt-3.5 border-t-2 border-slate-950 dark:border-white flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-950 bg-[#FFE24A] px-2.5 py-1.5 rounded border border-slate-950 uppercase font-mono shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                        <Clock className="w-3 h-3" />
                        <span>Issued: {cert.date}</span>
                      </div>
                      
                      {cert.imageUrl && (
                        <span className="text-[10px] font-black text-slate-950 dark:text-[#38BDF8] uppercase tracking-wider flex items-center gap-1 hover:underline">
                          View Cert
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="mt-20 scroll-mt-24">
          <div>
            <span className="text-[10px] font-mono font-black text-[#38BDF8] tracking-widest uppercase block">My Masterpieces</span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white mt-1 tracking-tight uppercase font-display">
              AI & Hardware Projects Showcase
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed font-semibold">
              A comprehensive selection of smart solutions. Click any project card below to view detailed blueprints, features, and external web deployment links.
            </p>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {PROJECTS.map((proj) => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="group p-5 rounded-2xl bg-white dark:bg-[#121214] border-[3px] border-slate-950 dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] cursor-pointer flex flex-col justify-between transition-all"
              >
                <div>
                  {/* Visual Cover */}
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4.5 bg-slate-100 dark:bg-slate-950 border-2 border-slate-950 dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-1.5 rounded bg-slate-950 border-2 border-slate-950 text-white text-[9px] font-black tracking-wider font-mono uppercase flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                      <Sparkles className="w-3 h-3 text-[#38BDF8]" />
                      <span>{proj.tags[0]}</span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-950 dark:text-white leading-tight uppercase group-hover:text-[#38BDF8] transition-colors mt-2">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-2.5 leading-relaxed font-semibold line-clamp-3">
                    {proj.description}
                  </p>

                  {/* Tag Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {proj.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-slate-200 py-1 px-2 rounded border border-slate-950 dark:border-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-5.5 pt-3.5 border-t-2 border-slate-950 dark:border-white flex items-center justify-between text-xs font-black uppercase text-slate-950 dark:text-white">
                  <span className="flex items-center gap-1 hover:underline">
                    View Details
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                  {proj.demoUrl && (
                    <span className="text-[9px] font-black bg-[#FFE24A] text-slate-950 px-2 py-1 rounded border border-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] uppercase">
                      Live App
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* PROJECT DETAIL MODAL */}
          <AnimatePresence>
            {selectedProject && (
              <div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto"
                onClick={() => setSelectedProject(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative max-w-2xl w-full rounded-[36px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                    <img 
                      src={selectedProject.imageUrl} 
                      alt={selectedProject.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-950/60 text-white hover:bg-slate-950 flex items-center justify-center transition-colors shadow-lg cursor-pointer text-sm font-bold"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="p-6 sm:p-8 overflow-y-auto flex-1">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {selectedProject.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-[9px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-500 py-1 px-2.5 rounded-lg border border-sky-500/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                      {selectedProject.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed font-normal">
                      {selectedProject.fullDescription}
                    </p>

                    <div className="mt-6 space-y-3.5">
                      <h4 className="text-xs font-mono font-bold uppercase text-sky-500 tracking-wider">Key Features & Submodules:</h4>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feat) => (
                          <li key={feat} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5 font-normal">
                            <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-8 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="flex-1 py-3 px-5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-white font-bold text-xs tracking-wider uppercase transition-colors text-center cursor-pointer"
                      >
                        Back to Portfolio
                      </button>
                      {selectedProject.demoUrl && (
                        <a
                          href={selectedProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-3 px-5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs tracking-wider uppercase transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-sky-500/10"
                        >
                          <span>Open Live Web App</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </section>

        {/* ACHIEVEMENTS SECTION */}
        <section id="achievements" className="mt-20 scroll-mt-24">
          <div className="mb-8">
            <span className="text-[10px] font-mono font-black text-[#38BDF8] tracking-widest uppercase block">Historic Milestones</span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white mt-1 tracking-tight uppercase font-display">
              My Key Achievements & Awards
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed font-semibold">
              A showcase of state-wide elocutions, perfect computer science scores, APJ Kalam Awards nominations, and national level hackathons, displayed in parallel side-by-side structures.
            </p>
          </div>

          {/* Lightbox achievements gallery */}
          <AchievementsGallery />
        </section>

        {/* CONTACT & SOCIAL CONNECTIVITY HUB */}
        <section id="contact" className="mt-24 mb-16 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Form card */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#121214] border-[3px] border-slate-950 dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-black text-[#38BDF8] tracking-widest uppercase block">Get In Touch</span>
                <h2 className="text-3xl font-black text-slate-950 dark:text-white mt-1.5 tracking-tight uppercase font-display">
                  Let's collaborate on AI & Robotics!
                </h2>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-4 leading-relaxed font-semibold">
                  Whether you are looking to hire a passionate student intern, discuss full-stack embedded development, or talk about Tamil NLP, enaku mail and phone call eppo venumna cheiyalam!
                </p>
              </div>

              {/* Direct info buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {/* Phone */}
                <a
                  href="tel:+919791703480"
                  className="p-5 rounded-xl bg-white dark:bg-[#1b1b1f] border-2 border-slate-950 dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all flex items-center gap-4 cursor-pointer"
                >
                  <div className="p-3.5 rounded-lg bg-[#FFE24A] text-slate-950 border-2 border-slate-950 shrink-0 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">Phone Number</span>
                    <p className="text-xs font-black text-slate-950 dark:text-white mt-0.5">+91 9791703480</p>
                  </div>
                </a>

                {/* Mail */}
                <a
                  href="mailto:rajgogulyadhavr@gmail.com"
                  className="p-5 rounded-xl bg-white dark:bg-[#1b1b1f] border-2 border-slate-950 dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all flex items-center gap-4 cursor-pointer"
                >
                  <div className="p-3.5 rounded-lg bg-[#FFE24A] text-slate-950 border-2 border-slate-950 shrink-0 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">Direct Email</span>
                    <p className="text-xs font-black text-slate-950 dark:text-white mt-0.5 truncate max-w-[150px] sm:max-w-none">rajgogulyadhavr@gmail.com</p>
                  </div>
                </a>
              </div>

              {/* Resume download connector */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-950 dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#38BDF8] text-slate-950 border border-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] font-mono font-black text-[#38BDF8] dark:text-[#38BDF8] uppercase tracking-wider">Official Curriculum Vitae</span>
                    <h4 className="text-xs font-black text-slate-950 dark:text-white mt-0.5">Rajalingam Resume w1.pdf</h4>
                  </div>
                </div>
                {/* Opens resume in a neat Google search or drive helper */}
                <a
                  href="https://www.linkedin.com/in/rajalingam-narayanakumar-578a69348?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-lg bg-[#38BDF8] hover:bg-[#0ea5e9] text-slate-950 font-black text-xs tracking-wider uppercase border-2 border-slate-950 dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-all text-center cursor-pointer flex items-center justify-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>View Resume on Drive</span>
                </a>
              </div>
            </div>

            {/* Right Social connect bento */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#121214] border-[3px] border-slate-950 dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Connect Anchors</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">Social Profile Links</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed font-normal">
                  Clicking any social link opens Rajalingam's verified professional profiles instantly:
                </p>
              </div>

              <div className="space-y-4 my-6">
                {/* GitHub link */}
                <a
                  href="https://github.com/rajgogulyadhavr-cpu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4.5 rounded-xl bg-white dark:bg-[#1b1b1f] border-2 border-slate-950 dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-lg bg-slate-950 text-white dark:bg-white dark:text-slate-950 border border-slate-950">
                      <Github className="w-4.5 h-4.5" />
                    </div>
                    <div className="text-left font-black uppercase">
                      <h4 className="text-xs text-slate-950 dark:text-white">GitHub Codebase</h4>
                      <span className="text-[10px] text-slate-500 font-mono">@rajgogulyadhavr-cpu</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-950 dark:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* LinkedIn link */}
                <a
                  href="https://www.linkedin.com/in/rajalingam-narayanakumar-578a69348?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4.5 rounded-xl bg-white dark:bg-[#1b1b1f] border-2 border-slate-950 dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-lg bg-[#0077b5] text-white border border-slate-950">
                      <Linkedin className="w-4.5 h-4.5" />
                    </div>
                    <div className="text-left font-black uppercase">
                      <h4 className="text-xs text-slate-950 dark:text-white">LinkedIn Network</h4>
                      <span className="text-[10px] text-slate-500 font-mono">Rajalingam Narayanakumar</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-950 dark:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Footer copy tagline */}
              <div className="pt-4 border-t-2 border-slate-950 dark:border-white text-center">
                <p className="text-[10px] font-mono text-slate-500 font-black tracking-wider uppercase">
                  Designed in Tamil Nadu, India • © {new Date().getFullYear()}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* PAGE FOOTER CREDIT */}
        <footer className="mt-12 text-center text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest">
          <p>Developed with Neo-Brutalist Theme and Sky Blue Accents.</p>
        </footer>

      </div>

      {/* CERTIFICATE DETAIL LIGHTBOX */}
      <AnimatePresence>
        {selectedCert && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md cursor-zoom-out"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full rounded-[36px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-slate-950/60 text-white hover:bg-slate-950 flex items-center justify-center transition-colors shadow-lg cursor-pointer text-sm font-bold"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="p-4 sm:p-6 flex-1 overflow-y-auto flex flex-col items-center">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight text-center mb-1">
                  {selectedCert.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono text-center mb-4">
                  {selectedCert.issuer} • Issued: {selectedCert.date}
                </p>

                <div className="relative w-full max-h-[65vh] flex justify-center bg-slate-100 dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50 p-2 shadow-inner">
                  <img 
                    src={selectedCert.imageUrl} 
                    alt={selectedCert.name} 
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-[60vh] object-contain rounded-lg"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Inner Helper SVG/Icon placeholders to avoid crashes
function ServerIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/>
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
      <line x1="6" x2="6.01" y1="6" y2="6"/>
      <line x1="6" x2="6.01" y1="18" y2="18"/>
    </svg>
  );
}
