import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  X, 
  Languages,
  Check,
  CornerDownLeft,
  Bot,
  User,
  RefreshCw,
  Award,
  HelpCircle
} from "lucide-react";
import { ChatMessage } from "../types";

export default function AIRobot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "*whirrr beep* Vannakkam! I am Raja's AI Buddy! Ask me anything about my creator Rajalingam's projects (like Foot Guard AI or Kural AI), certifications, or achievements. I can speak in Tamil, English, or Tanglish! Try talking to me or typing below!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [botState, setBotState] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "ta">("en");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Suggested questions for visitors
  const suggestedQuestions = [
    { text: "Tell me about Raja", label: "Who is Raja?" },
    { text: "What is Foot Guard AI?", label: "Foot Guard AI" },
    { text: "Tell me about Kural AI", label: "Kural AI" },
    { text: "What are Raja's certifications?", label: "Certifications" },
    { text: "Did Raja win any awards?", label: "Achievements" }
  ];

  // Check speech recognition and synthesis support on mount
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      
      rec.onstart = () => {
        setIsListening(true);
        setBotState("listening");
      };

      rec.onend = () => {
        setIsListening(false);
        setBotState("idle");
      };

      rec.onerror = (e: any) => {
        console.error("Speech Recognition Error:", e);
        setIsListening(false);
        setBotState("idle");
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript.trim()) {
          setInputValue(transcript);
          handleSendMessage(transcript);
        }
      };

      recognitionRef.current = rec;
    }

    if ("speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Set recognition language when selection changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = selectedLanguage === "ta" ? "ta-IN" : "en-US";
    }
  }, [selectedLanguage]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle speaking responses
  const speakResponse = (text: string) => {
    if (!audioEnabled || !synthRef.current) return;
    
    synthRef.current.cancel(); // Cancel any ongoing speech

    // Clean up text of markdown markers or robot sounds
    let cleanText = text
      .replace(/\*[^*]+\*/g, "") // Remove *beep boop* or *whir* style text
      .replace(/\[[^\]]+\]/g, "") // Remove markdown brackets
      .replace(/https?:\/\/[^\s]+/g, "") // Remove URLs so it doesn't spell them out
      .replace(/[#_`~]/g, "") // Remove extra markdown formatting
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Auto-detect Tamil words in string or use selected language
    const hasTamilCharacters = /[\u0B80-\u0BFF]/.test(text);
    if (hasTamilCharacters || selectedLanguage === "ta") {
      utterance.lang = "ta-IN";
    } else {
      utterance.lang = "en-US";
    }

    utterance.rate = 1.05;
    utterance.pitch = 1.15; // Slightly high-pitched/cute robot voice

    utterance.onstart = () => {
      setBotState("speaking");
    };

    utterance.onend = () => {
      setBotState("idle");
    };

    utterance.onerror = () => {
      setBotState("idle");
    };

    synthRef.current.speak(utterance);
  };

  // Toggle speech recording
  const toggleListening = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please try Google Chrome.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      if (synthRef.current) {
        synthRef.current.cancel(); // Mute speech when user wants to talk
      }
      recognitionRef.current.start();
    }
  };

  // Trigger send message
  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend !== undefined ? textToSend : inputValue;
    if (!query.trim() || isLoading) return;

    // Create user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);
    setBotState("thinking");

    if (synthRef.current) {
      synthRef.current.cancel(); // Cancel speech when asking new question
    }

    try {
      // Build simple history for server
      const chatHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, history: chatHistory })
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      const botResponse = data.text || "I'm processing this, beep boop!";

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);
      setBotState("idle");
      
      // Auto-speak the response if audio is enabled
      setTimeout(() => {
        speakResponse(botResponse);
      }, 100);

    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "Beep! Connection error. I couldn't reach Raja's server core. Please check if the GEMINI_API_KEY secret is configured, and try again!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
      setBotState("idle");
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "*whirrr* Chat refreshed! Ask me anything about my creator Rajalingam's certifications, achievements, or his cool projects like Foot Guard AI!",
        timestamp: new Date()
      }
    ]);
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setBotState("idle");
  };

  // Helper component to render the responsive Animated Robot Face
  const RobotSVGFace = ({ size = "w-24 h-24" }: { size?: string }) => {
    // Dynamic face expression depending on bot state
    let eyeColor = "#38BDF8";
    let eyeScaleY = [1, 1, 0.1, 1, 1];
    let eyePulse = {};
    let mouthPath = "M 72 74 Q 80 82 88 74"; // Smile

    if (botState === "thinking") {
      eyeColor = "#FFE24A";
      eyeScaleY = [1, 1.2, 1];
      mouthPath = "M 72 78 L 88 78"; // Neutral straight line
    } else if (botState === "listening") {
      eyeColor = "#22C55E"; // Green
      eyePulse = { scale: [1, 1.2, 1] };
      mouthPath = "M 74 78 Q 80 86 86 78"; // Circular O shape
    } else if (botState === "speaking") {
      eyeColor = "#38BDF8";
      mouthPath = "M 72 75 Q 80 70 88 75"; // Talking wavy mouth
    }

    return (
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className={`${size} flex items-center justify-center relative select-none shrink-0`}
      >
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full filter drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        >
          <defs>
            <linearGradient id="robo-screen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0B0F19" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
            <linearGradient id="robo-glow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0EA5E9" />
            </linearGradient>
          </defs>

          {/* Antennas */}
          <rect x="76" y="10" width="8" height="20" fill="#020617" stroke="#FFFFFF" strokeWidth="2" rx="2" />
          <motion.circle
            cx="80"
            cy="10"
            r="8"
            fill={botState === "listening" ? "#22C55E" : "#FFE24A"}
            stroke="#020617"
            strokeWidth="3"
            animate={botState === "thinking" ? { scale: [1, 1.3, 1] } : { scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />

          {/* Ears */}
          <rect x="25" y="55" width="10" height="14" fill="#020617" stroke="#FFFFFF" strokeWidth="2" rx="2" />
          <rect x="125" y="55" width="10" height="14" fill="#020617" stroke="#FFFFFF" strokeWidth="2" rx="2" />

          {/* Head (Neo-Brutalist Frame) */}
          <rect
            x="32"
            y="30"
            width="96"
            height="64"
            rx="12"
            fill="#F8FAFC"
            stroke="#020617"
            strokeWidth="4"
          />

          {/* Screen */}
          <rect
            x="42"
            y="40"
            width="76"
            height="44"
            rx="8"
            fill="url(#robo-screen)"
            stroke="#020617"
            strokeWidth="3"
          />

          {/* Eyes */}
          <g>
            <motion.ellipse
              cx="64"
              cy="62"
              rx="6"
              ry="6"
              fill={eyeColor}
              animate={botState === "listening" ? eyePulse : { scaleY: eyeScaleY }}
              transition={{
                repeat: Infinity,
                repeatDelay: botState === "idle" ? 3.5 : 0.5,
                duration: 0.25,
                ease: "easeInOut"
              }}
              style={{ originY: 0.5 }}
            />
            <motion.ellipse
              cx="96"
              cy="62"
              rx="6"
              ry="6"
              fill={eyeColor}
              animate={botState === "listening" ? eyePulse : { scaleY: eyeScaleY }}
              transition={{
                repeat: Infinity,
                repeatDelay: botState === "idle" ? 3.5 : 0.5,
                duration: 0.25,
                ease: "easeInOut"
              }}
              style={{ originY: 0.5 }}
            />
          </g>

          {/* Mouth (animated dynamically) */}
          <motion.path
            d={mouthPath}
            fill="none"
            stroke={eyeColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            animate={botState === "speaking" ? { d: ["M 72 74 Q 80 82 88 74", "M 72 76 Q 80 72 88 76", "M 72 74 Q 80 82 88 74"] } : {}}
            transition={{ repeat: Infinity, duration: 0.4 }}
          />

          {/* Neck */}
          <rect x="70" y="94" width="20" height="12" fill="#334155" stroke="#020617" strokeWidth="3" />

          {/* Body */}
          <rect
            x="44"
            y="104"
            width="72"
            height="48"
            rx="10"
            fill="#FFE24A"
            stroke="#020617"
            strokeWidth="4"
          />

          {/* Chest Light */}
          <motion.circle
            cx="80"
            cy="128"
            r="10"
            fill="url(#robo-glow)"
            stroke="#020617"
            strokeWidth="3"
            animate={{ opacity: botState === "thinking" ? [0.3, 1, 0.3] : [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: botState === "thinking" ? 0.8 : 2 }}
          />

          {/* Arms */}
          <path d="M 32 110 Q 18 120 22 135" fill="none" stroke="#020617" strokeWidth="10" strokeLinecap="round" />
          <path d="M 32 110 Q 18 120 22 135" fill="none" stroke="#F8FAFC" strokeWidth="4" strokeLinecap="round" />

          <motion.g
            animate={botState === "speaking" ? { rotate: [0, -20, 10, -20, 0] } : {}}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ originX: "115px", originY: "110px" }}
          >
            <path d="M 124 110 Q 144 100 148 85" fill="none" stroke="#020617" strokeWidth="10" strokeLinecap="round" />
            <path d="M 124 110 Q 144 100 148 85" fill="none" stroke="#F8FAFC" strokeWidth="4" strokeLinecap="round" />
            <circle cx="148" cy="85" r="7" fill="#FFE24A" stroke="#020617" strokeWidth="3" />
          </motion.g>
        </svg>
      </motion.div>
    );
  };

  return (
    <>
      {/* 1. COMPACT VIEW (Displays in the Bento Grid) */}
      <div className="w-full flex flex-col justify-between p-5 bg-white dark:bg-[#121214] border-[3px] border-slate-950 dark:border-white rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-y-[-1px] transition-all overflow-hidden h-full min-h-[350px]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-slate-950 dark:border-white/10 mb-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FFE24A] border border-slate-950 text-[10px] font-black uppercase tracking-wider shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-slate-950">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>Raja-Bot Companion</span>
          </div>

          <div className="flex items-center gap-1">
            <button 
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`p-1.5 rounded-lg border-2 border-slate-950 text-slate-950 transition-colors ${audioEnabled ? 'bg-emerald-400' : 'bg-slate-200 dark:bg-slate-700 dark:text-white'}`}
              title={audioEnabled ? "Speech Output: Enabled" : "Speech Output: Muted"}
            >
              {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
            <button 
              onClick={() => setIsExpanded(true)}
              className="p-1.5 rounded-lg border-2 border-slate-950 bg-sky-300 hover:bg-sky-400 text-slate-950 transition-colors"
              title="Expand Conversational Panel"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dynamic State Info / SVG Face */}
        <div className="flex items-center gap-4 py-1.5 bg-slate-50 dark:bg-slate-900/40 rounded-xl p-3 border border-slate-950 dark:border-white/10 mb-3">
          <RobotSVGFace size="w-20 h-20" />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-mono font-black text-slate-400 block uppercase">Status</span>
            <span className="text-xs font-black uppercase tracking-wider text-slate-950 dark:text-white block">
              {botState === "idle" && "🟢 Online & Waving"}
              {botState === "thinking" && "⚡ Thinking / Analysing..."}
              {botState === "listening" && "🎤 Listening Lively..."}
              {botState === "speaking" && "🗣️ Speaking..."}
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold truncate mt-1">
              {botState === "listening" ? "Say something..." : "Ask me anything about Raja!"}
            </p>
          </div>
        </div>

        {/* Suggestion Bubbles (Quick Ask) */}
        <div className="mb-3">
          <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest block mb-1">Click to ask quickly:</span>
          <div className="flex flex-wrap gap-1.5 max-h-[58px] overflow-y-auto pr-1">
            {suggestedQuestions.slice(0, 3).map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q.text)}
                disabled={isLoading}
                className="text-[10px] font-black uppercase px-2 py-1 rounded bg-[#FFE24A]/10 border border-slate-950 dark:border-white/20 hover:bg-[#FFE24A]/30 text-slate-800 dark:text-slate-300 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Chat Input Area */}
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask anything..."
              disabled={isLoading}
              className="w-full text-xs font-semibold p-2.5 pr-8 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-950 dark:border-white text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-950 dark:text-white hover:text-[#38BDF8] disabled:opacity-40 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={toggleListening}
            disabled={isLoading}
            className={`p-2.5 rounded-xl border-2 border-slate-950 transition-all ${
              isListening 
                ? "bg-rose-500 text-white animate-pulse" 
                : "bg-emerald-400 hover:bg-emerald-500 text-slate-950"
            }`}
            title="Talk to Companion (Speech-to-Text)"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>

        <button 
          onClick={() => setIsExpanded(true)}
          className="w-full text-[10px] font-mono font-black text-center text-slate-400 uppercase tracking-widest mt-2 hover:text-[#38BDF8] transition-colors"
        >
          - Click here to expand full chat view -
        </button>
      </div>

      {/* 2. EXPANDED IMMERSIVE CHAT CONSOLE (MODAL) */}
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-4xl h-[85vh] bg-white dark:bg-[#0E0F11] border-[4px] border-slate-950 dark:border-white rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex flex-col md:flex-row overflow-hidden relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => {
                  setIsExpanded(false);
                  if (synthRef.current) synthRef.current.cancel();
                  if (isListening && recognitionRef.current) recognitionRef.current.stop();
                }}
                className="absolute top-4 right-4 z-10 p-1.5 rounded-lg border-2 border-slate-950 dark:border-white bg-rose-400 hover:bg-rose-500 text-slate-950 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Side A: Robot Control panel & Sound Equalizer */}
              <div className="w-full md:w-1/3 bg-slate-100 dark:bg-slate-900 border-b-2 md:border-b-0 md:border-r-2 border-slate-950 dark:border-white p-6 flex flex-col items-center justify-between">
                
                {/* Robot Info Header */}
                <div className="text-center w-full mt-2">
                  <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#FFE24A] border-2 border-slate-950 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-slate-950 mb-3">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    <span>Raja's AI Buddy</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-950 dark:text-white uppercase tracking-tight">Interactive Console</h3>
                </div>

                {/* Animated SVG Face with Pulsing Wave Indicator */}
                <div className="flex flex-col items-center my-6 relative w-full">
                  <RobotSVGFace size="w-36 h-36" />
                  
                  {/* Lively Equalizer / Mic Wave Indicator */}
                  <div className="h-6 flex items-center justify-center gap-1 mt-4">
                    {botState === "speaking" && (
                      <>
                        {[1, 2, 3, 4, 5, 6].map((bar) => (
                          <motion.div
                            key={bar}
                            animate={{ height: [8, 24, 8] }}
                            transition={{ repeat: Infinity, duration: 0.4 + bar * 0.08, ease: "easeInOut" }}
                            className="w-1 bg-[#38BDF8] rounded-full"
                          />
                        ))}
                      </>
                    )}
                    {botState === "listening" && (
                      <>
                        {[1, 2, 3, 4, 5, 6].map((bar) => (
                          <motion.div
                            key={bar}
                            animate={{ height: [12, 28, 12] }}
                            transition={{ repeat: Infinity, duration: 0.3 + bar * 0.05, ease: "easeInOut" }}
                            className="w-1 bg-emerald-400 rounded-full"
                          />
                        ))}
                      </>
                    )}
                    {botState === "thinking" && (
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin text-[#FFE24A]" />
                        <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">Analysing Core...</span>
                      </div>
                    )}
                    {botState === "idle" && (
                      <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">Beep Boop... Ready</span>
                    )}
                  </div>
                </div>

                {/* Console System Controls */}
                <div className="w-full space-y-3">
                  {/* Language Selector */}
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border-2 border-slate-950 dark:border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Languages className="w-4 h-4 text-[#38BDF8]" />
                      <span className="text-xs font-black uppercase text-slate-700 dark:text-slate-300">Speech Lang</span>
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setSelectedLanguage("en")}
                        className={`text-[10px] font-black px-2 py-1 rounded-lg border-2 border-slate-950 transition-colors ${selectedLanguage === "en" ? "bg-[#FFE24A] text-slate-950" : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400"}`}
                      >
                        EN
                      </button>
                      <button
                        onClick={() => setSelectedLanguage("ta")}
                        className={`text-[10px] font-black px-2 py-1 rounded-lg border-2 border-slate-950 transition-colors ${selectedLanguage === "ta" ? "bg-[#FFE24A] text-slate-950" : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400"}`}
                      >
                        தமிழ்
                      </button>
                    </div>
                  </div>

                  {/* Auto voice output toggle */}
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border-2 border-slate-950 dark:border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-black uppercase text-slate-700 dark:text-slate-300">Speech Output</span>
                    </div>
                    <button
                      onClick={() => setAudioEnabled(!audioEnabled)}
                      className={`text-[10px] font-black px-3 py-1 rounded-lg border-2 border-slate-950 transition-colors ${audioEnabled ? "bg-emerald-400 text-slate-950" : "bg-slate-100 dark:bg-slate-900 text-slate-600"}`}
                    >
                      {audioEnabled ? "ON" : "OFF"}
                    </button>
                  </div>

                  {/* Clear Chat */}
                  <button
                    onClick={clearChat}
                    className="w-full py-2 rounded-xl border-2 border-slate-950 bg-rose-400 hover:bg-rose-500 text-slate-950 font-black uppercase text-xs transition-colors flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Refresh Chat Core</span>
                  </button>
                </div>
              </div>

              {/* Side B: Message Viewport & Lively Voice Interactions */}
              <div className="flex-1 flex flex-col justify-between p-6 h-full overflow-hidden bg-slate-50 dark:bg-[#121214]">
                
                {/* Chat History Messages Container */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-4 mb-4">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-8 h-8 rounded-lg bg-[#FFE24A] border-2 border-slate-950 flex items-center justify-center text-slate-950 shrink-0 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}
                      
                      <div className="max-w-[80%] flex flex-col">
                        <div className={`p-3.5 rounded-2xl border-2 border-slate-950 text-sm font-semibold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] leading-relaxed ${
                          msg.role === "user" 
                            ? "bg-sky-200 dark:bg-sky-900/60 text-slate-950 dark:text-white rounded-tr-none" 
                            : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-tl-none"
                        }`}>
                          {/* Parse bold, list formatting simply for robot style */}
                          {msg.content.split("\n").map((line, lIdx) => (
                            <p key={lIdx} className={lIdx > 0 ? "mt-1.5" : ""}>
                              {line.split("**").map((part, pIdx) => {
                                if (pIdx % 2 === 1) {
                                  return <strong key={pIdx} className="font-extrabold text-slate-950 dark:text-white">{part}</strong>;
                                }
                                return part;
                              })}
                            </p>
                          ))}
                        </div>
                        
                        <span className="text-[9px] font-mono text-slate-400 mt-1 self-start px-1 uppercase font-bold">
                          {msg.role === "user" ? "You" : "Raja's Assistant"} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {msg.role === "user" && (
                        <div className="w-8 h-8 rounded-lg bg-sky-300 border-2 border-slate-950 flex items-center justify-center text-slate-950 shrink-0 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Loading/Thinking Bubble */}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 rounded-lg bg-[#FFE24A] border-2 border-slate-950 flex items-center justify-center text-slate-950 shrink-0 animate-pulse">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="p-3.5 rounded-2xl border-2 border-slate-950 bg-white dark:bg-slate-900 text-sm font-semibold rounded-tl-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-bounce" style={{ animationDelay: "300ms" }} />
                        <span className="text-xs font-mono font-bold text-slate-400 uppercase ml-1">Beep Boop... Thinking</span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Suggested Questions Grid (Bottom of expanded view) */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest block mb-2">💡 Quick Select Questions:</span>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(q.text)}
                        disabled={isLoading}
                        className="text-[11px] font-black uppercase px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 border-2 border-slate-950 dark:border-white/10 hover:bg-[#FFE24A] hover:text-slate-950 dark:hover:text-slate-950 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer text-slate-800 dark:text-slate-200"
                      >
                        {q.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Controls Bar */}
                <div className="flex gap-3 items-center">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Type a message or speak in Tamil / English..."
                      disabled={isLoading}
                      className="w-full text-sm font-semibold p-3.5 pr-12 rounded-2xl bg-white dark:bg-slate-950 border-[3px] border-slate-950 dark:border-white text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={!inputValue.trim() || isLoading}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg border border-slate-950 dark:border-white bg-[#FFE24A] text-slate-950 hover:bg-yellow-400 disabled:opacity-40 transition-colors flex items-center justify-center"
                    >
                      <CornerDownLeft className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={toggleListening}
                    disabled={isLoading}
                    className={`p-3.5 rounded-2xl border-[3px] border-slate-950 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                      isListening 
                        ? "bg-rose-500 text-white animate-pulse" 
                        : "bg-emerald-400 hover:bg-emerald-500 text-slate-950"
                    }`}
                    title="Speak Lively"
                  >
                    {isListening ? <MicOff className="w-5 h-5 animate-pulse" /> : <Mic className="w-5 h-5" />}
                  </button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
