"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X } from "lucide-react";
import { RightPanel } from "@/components/layout/right-panel";

export function DashboardWrapper({ children }: { children: React.ReactNode }) {
  const [isStreakOpen, setIsStreakOpen] = useState(false);

  return (
    <>
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10 bg-[#0A0A0A]/50 w-full">
        {/* Top Navbar */}
        <header className="h-20 shrink-0 border-b border-[#1F1F1F] bg-[#0A0A0A]/80 backdrop-blur-xl px-8 flex items-center justify-between z-30 sticky top-0 w-full">
          {/* Left Side elements (if any) or User's exact requested nav */}
          <div className="flex items-center gap-4">
            {/* The Steak Button Group */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsStreakOpen(!isStreakOpen)}
                className={`flex items-center gap-3 px-4 py-2 rounded-[20px] border transition-all duration-300 ${isStreakOpen ? 'bg-[#1F1F1F] border-[#333333] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]' : 'bg-[#111111] hover:bg-[#1A1A1A] border-[#333333] shadow-md hover:border-[#444444]'}`}
              >
                <div className="relative">
                  <span className="text-lg">🚀</span>
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(249,115,22,1)]" />
                </div>
                <span className="text-lg font-black text-white tracking-widest pl-1 border-l border-[#333333]/50">76</span>
              </button>
              
              <button className="flex items-center justify-center w-[46px] h-[46px] rounded-[20px] bg-[#111111] hover:bg-[#1A1A1A] border border-[#333333] shadow-md hover:border-[#444444] transition-all">
                <Bell className="w-5 h-5 text-white stroke-[2.5px] opacity-90" />
              </button>

              <div className="w-[46px] h-[46px] rounded-full border-2 border-[#1F1F1F] overflow-hidden cursor-pointer hover:border-[#00FF94] transition-colors shadow-lg">
                <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=JD&backgroundColor=transparent`} alt="User Avatar" className="w-full h-full object-cover bg-[#00FF94]/20" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            {/* Optionally right-aligned context */}
          </div>
        </header>

        {/* Scrollable Center Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative h-full w-full custom-scrollbar">
          {children}
        </main>
      </div>

      {/* Conditionally Rendered RightPanel as a slide-in sidebar */}
      <AnimatePresence>
        {isStreakOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 340, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="h-full shrink-0 border-l border-[#1F1F1F] bg-[#0A0A0A] overflow-hidden relative shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-40"
          >
            <div className="w-[340px] h-full relative">
              <RightPanel onClose={() => setIsStreakOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
