"use client";

import { MessageSquare, Info, Rocket, ArrowRight, X } from "lucide-react";
import { Input } from "@/components/ui/input";

const MILESTONES = [
  { days: "0", emoji: "🥚", title: "Start your streak", desc: "", action: false },
  { days: "7", emoji: "🐣", title: "Restore Streak x1", desc: "You can recover up to 2 inactive days at most.", action: true },
  { days: "14", emoji: "🐥", title: "Super Assessment ⚡", desc: "Maintain your streak to unlock priority mock interviews with FAANG engineers.", action: true },
  { days: "21", emoji: "🐤", title: "Restore Streak x1", desc: "You can recover up to 2 inactive days at most.", action: true },
  { days: "30", emoji: "🔥", title: "Profile Highlight", desc: "Your profile gets highlighted to partnering recruiters.", action: true },
];

export function RightPanel({ onClose }: { onClose?: () => void }) {
  return (
    <aside className="w-full max-w-[340px] h-full border-l border-[#1F1F1F] bg-[#0A0A0A] flex flex-col overflow-y-auto shrink-0 z-20 custom-scrollbar relative">
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-xl bg-[#111111]/80 hover:bg-[#1F1F1F] border border-[#1F1F1F] shadow-lg transition-colors text-[#A1A1A1] hover:text-[#FFFFFF]"
        >
          <X className="w-5 h-5" />
        </button>
      )}
      
      {/* Top Streak Header Card */}
      <div className="relative p-6 pt-8 bg-[#111111] border-b border-[#1F1F1F] overflow-hidden">
        {/* Dotted Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
        
        <div className="relative z-10 flex justify-between items-start mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-[#FFFFFF] tracking-tighter">76</span>
            <div className="flex flex-col uppercase font-bold text-[10px] leading-tight text-[#FFFFFF]">
              <span>Day</span>
              <span>Streak</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] border border-[#1F1F1F] flex items-center justify-center shadow-lg">
            <span className="text-xl">🚀</span>
          </div>
        </div>

        <div className="relative z-10 space-y-3">
          <p className="text-sm font-semibold text-[#FFFFFF]">Your today&apos;s contribution count is <span className="font-bold">1</span></p>
          
          {/* Mock Contribution Grid */}
          <div className="flex flex-col gap-1.5">
            <div className="flex gap-1.5">
              {Array.from({length: 10}).map((_, i) => (
                <div key={`r1-${i}`} className={`w-4 h-4 rounded-sm ${i < 7 ? 'bg-[#00FF94]' : 'bg-[#1F1F1F]'}`} />
              ))}
            </div>
            <div className="flex gap-1.5">
               {Array.from({length: 10}).map((_, i) => (
                <div key={`r2-${i}`} className={`w-4 h-4 rounded-sm ${i < 5 ? 'bg-[#00FF94]' : i === 5 ? 'bg-[#00FF94]/30' : 'bg-transparent border border-[#1F1F1F]'}`} />
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-[#A1A1A1] pt-2">
            <span>This is your longest streak.</span>
            <span>Restores left: <strong className="text-[#FFFFFF]">3</strong></span>
          </div>
        </div>
      </div>

      {/* Milestones & Rewards */}
      <div className="p-6 flex-1">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs font-bold text-[#A1A1A1] tracking-wider uppercase flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-[#1F1F1F] flex items-center justify-center rotate-45">
               <span className="-rotate-45 text-[8px]">🏷️</span>
            </span>
            Milestones & Rewards
          </span>
          <div className="h-px bg-[#1F1F1F] flex-1" />
          <Info className="w-4 h-4 text-[#A1A1A1]" />
        </div>

        <div className="relative ml-4">
          {/* Vertical Timeline Line */}
          <div className="absolute top-4 bottom-0 left-[15px] w-px bg-[#1F1F1F]" />

          <div className="space-y-8 relative">
            {MILESTONES.map((milestone, idx) => (
              <div key={idx} className="flex gap-6 relative group">
                
                {/* Node Shape */}
                <div className="flex flex-col items-center relative z-10 bg-[#0A0A0A] shrink-0">
                  <div className="w-8 h-4 bg-white text-black text-[10px] font-bold rounded-t-full flex items-center justify-center border-x border-t border-white">
                    {milestone.days} d
                  </div>
                  <div className="w-8 h-8 bg-[#111111] border-x border-b border-white rounded-b-full flex items-center justify-center text-sm shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                    {milestone.emoji}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1 flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-[#FFFFFF]">{milestone.title}</h4>
                    {milestone.desc && (
                      <p className="text-xs text-[#A1A1A1] leading-relaxed">{milestone.desc}</p>
                    )}
                  </div>
                  {milestone.action && (
                    <button className="w-8 h-8 rounded-full bg-[#111111] border border-[#1F1F1F] flex items-center justify-center shrink-0 hover:bg-[#1F1F1F] hover:text-[#00FF94] transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Retained AI Chat Input at the bottom */}
      <div className="p-4 border-t border-[#1F1F1F] bg-[#0A0A0A] shrink-0 mt-auto">
        <div className="relative group">
          <Input
            placeholder="Ask AI anything..."
            className="pl-10 pr-10 py-5 rounded-xl bg-[#111111] border-[#333333] text-sm focus-visible:ring-[#00FF94] shadow-none transition-all group-hover:border-[#00FF94]/50"
          />
          <MessageSquare className="w-4 h-4 text-[#A1A1A1] absolute left-3 top-1/2 -translate-y-1/2 transition-colors group-hover:text-[#00FF94]" />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#00FF94]/10 rounded-md text-[#00FF94] hover:bg-[#00FF94]/20 transition-colors">
            <span className="sr-only">Send</span>
            <span className="text-[10px] font-bold font-mono px-0.5">↵</span>
          </button>
        </div>
      </div>

    </aside>
  );
}
