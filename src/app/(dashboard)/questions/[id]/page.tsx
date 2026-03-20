"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize, ShieldAlert, ArrowLeft, Lock, FileText, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QUESTIONS_DATA } from "@/lib/questions";

export default function AssessmentPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const [question, setQuestion] = useState<any>(null);
  
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [warnings, setWarnings] = useState(0);
  const [code, setCode] = useState("");
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Load question & check lock status on mount
  useEffect(() => {
    const q = QUESTIONS_DATA.find((q) => q.id === unwrappedParams.id);
    if (!q) {
      router.push("/questions");
      return;
    }
    setQuestion(q);

    // Check 24-hour lock
    const lockTime = localStorage.getItem("assessment_lock");
    if (lockTime) {
      const timeDiff = Date.now() - parseInt(lockTime);
      const hours24 = 24 * 60 * 60 * 1000;
      if (timeDiff < hours24) {
        setIsLocked(true);
      } else {
        localStorage.removeItem("assessment_lock");
      }
    }
  }, [unwrappedParams.id, router]);

  // Anti-Cheat Listeners
  useEffect(() => {
    if (!isStarted || isLocked) return;

    const handleViolation = (reason: string) => {
      setWarnings((prev) => {
        const newWarnings = prev + 1;
        if (newWarnings >= 3) {
          // Trigger Lockout
          localStorage.setItem("assessment_lock", Date.now().toString());
          setIsLocked(true);
          setIsStarted(false);
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          }
          alert("SECURITY VIOLATION: You have been locked out for 24 hours due to repeated tab switching or loss of focus.");
        } else {
          alert(`WARNING (${newWarnings}/3): ${reason}\nDo not switch tabs or look away!`);
        }
        return newWarnings;
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleViolation("Tab switched or minimized.");
      }
    };

    const handleBlur = () => {
      handleViolation("Window lost focus.");
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isStarted) {
        handleViolation("Exited full screen mode.");
        setIsFullscreen(false);
      } else if (document.fullscreenElement) {
        setIsFullscreen(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [isStarted, isLocked]);

  const startAssessment = async () => {
    if (!containerRef.current) return;
    try {
      if (containerRef.current.requestFullscreen) {
        await containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
      setIsStarted(true);
    } catch (err) {
      alert("Failed to enter full screen. Please allow full screen to start the assessment.");
    }
  };

  const preventCopyPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    alert("Copy/Paste is disabled during assessments.");
  };

  if (isLocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0A0A] text-white p-6 text-center">
        <Lock className="w-20 h-20 text-red-500 mb-6" />
        <h1 className="text-4xl font-black mb-4">Assessment Locked</h1>
        <p className="text-[#A1A1A1] max-w-md mb-8">
          Your account has been temporarily locked from assessments for 24 hours due to repeated security violations (e.g., tab switching, losing focus).
        </p>
        <Button onClick={() => router.push("/questions")} variant="outline">
          Return to Dashboard
        </Button>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div ref={containerRef} className="bg-[#0A0A0A] text-white min-h-screen flex flex-col font-sans selection:bg-[#00FF94] selection:text-black">
      {!isStarted ? (
        // Pre-Assessment Screen
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto space-y-8">
          <Button variant="ghost" className="self-start text-[#A1A1A1] -ml-4" onClick={() => router.push("/questions")}>
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Button>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-black">{question.title}</h1>
            <p className="text-[#A1A1A1] text-lg">Difficulty: {question.difficulty}</p>
          </div>

          <div className="bg-[#111111] border border-amber-500/30 p-6 rounded-2xl text-left space-y-4 shadow-xl">
            <div className="flex items-center gap-3 text-amber-500 font-bold text-lg">
              <ShieldAlert className="w-6 h-6" />
              Strict Anti-Cheat Environment
            </div>
            <ul className="text-sm text-zinc-300 space-y-2 list-disc list-inside">
              <li>Assessment must be completed in <b>Full Screen</b>.</li>
              <li><b>Tab switching</b> or minimizing the window will trigger a warning.</li>
              <li>Losing focus or looking away (blur) is heavily tracked.</li>
              <li><b>Copy & Paste</b> are permanently disabled.</li>
              <li className="text-red-400">3 warnings will result in auto-submission and a 24-hour lockout.</li>
            </ul>
          </div>

          <Button size="lg" className="w-full h-16 text-lg font-bold bg-[#00FF94] text-black hover:bg-white rounded-xl shadow-[0_0_30px_rgba(0,255,148,0.2)]" onClick={startAssessment}>
            <Maximize className="w-5 h-5 mr-2" /> Enter Full Screen & Start
          </Button>
        </div>
      ) : (
        // Active Assessment Environment
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Header */}
          <header className="h-16 border-b border-[#1F1F1F] bg-[#111111] flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="font-medium text-sm text-red-400">Recording & Monitoring Active</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-sm text-[#A1A1A1]">
                Warnings: <strong className={`text-lg ${warnings > 0 ? 'text-amber-500' : 'text-[#00FF94]'}`}>{warnings}/3</strong>
              </div>
              <Button size="sm" variant="premium" className="bg-[#00FF94] text-black hover:bg-white">
                <Send className="w-4 h-4 mr-2" /> Submit Code
              </Button>
            </div>
          </header>

          <div className="flex-1 flex overflow-hidden">
            {/* Left Box: Problem Statement */}
            <div className="w-1/2 border-r border-[#1F1F1F] flex flex-col bg-[#0A0A0A]">
              <div className="p-6 border-b border-[#1F1F1F] bg-[#111111]/50 flex items-center gap-3 shrink-0">
                <FileText className="w-5 h-5 text-[#00FF94]" />
                <h2 className="text-xl font-bold">{question.title}</h2>
              </div>
              <div className="p-8 overflow-y-auto text-[#A1A1A1] leading-relaxed text-sm">
                <p>{question.description}</p>
              </div>
            </div>

            {/* Right Box: Editor */}
            <div className="w-1/2 flex flex-col bg-[#111111]">
              <div className="h-10 border-b border-[#1F1F1F] bg-[#0A0A0A] flex items-center px-4 shrink-0 text-xs text-zinc-500 font-mono">
                index.js (Anti-Cheat Editor)
              </div>
              <textarea
                className="flex-1 bg-transparent p-6 text-sm font-mono text-zinc-300 resize-none outline-none focus:ring-0 placeholder:text-zinc-600 leading-relaxed"
                placeholder="Write your solution here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onCopy={preventCopyPaste}
                onPaste={preventCopyPaste}
                onCut={preventCopyPaste}
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
