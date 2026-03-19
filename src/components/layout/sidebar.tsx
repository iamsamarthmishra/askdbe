"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BrainCircuit,
  CalendarDays,
  User,
  Settings,
  Lightbulb,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/questions", label: "Questions", icon: BrainCircuit },
  { href: "/sessions", label: "Sessions", icon: CalendarDays },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.aside
      className="h-full border-r border-[#1F1F1F] bg-[#111111]/80 backdrop-blur-xl flex flex-col z-20 shrink-0"
      initial={{ width: 80 }}
      animate={{ width: isHovered ? 240 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Brand */}
      <div className="h-20 flex items-center px-6 overflow-hidden border-b border-[#1F1F1F]">
        <div className="flex items-center gap-4 text-[#00FF94] w-[200px]">
          <Lightbulb className="w-8 h-8 shrink-0 drop-shadow-[0_0_8px_rgba(0,255,148,0.8)]" />
          <motion.span
            className="font-bold tracking-widest text-lg whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            UPAI.SPACE
          </motion.span>
        </div>
      </div>

      {/* Nav Links */}
      <TooltipProvider delayDuration={0}>
        <div className="flex-1 py-8 px-4 flex flex-col gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-4 px-3.5 py-3 rounded-xl transition-all duration-300 relative group overflow-hidden",
                      isActive
                        ? "text-[#00FF94] bg-[#00FF94]/10 shadow-[inset_0_0_10px_rgba(0,255,148,0.05)] border border-[#00FF94]/20"
                        : "text-[#A1A1A1] hover:text-[#FFFFFF] hover:bg-[#1F1F1F] border border-transparent"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 rounded-xl border border-[#00FF94] opacity-20"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon
                      className={cn(
                        "w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110",
                        isActive ? "drop-shadow-[0_0_5px_rgba(0,255,148,0.5)]" : ""
                      )}
                    />
                    <motion.span
                      className="whitespace-nowrap font-medium text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        x: isHovered ? 0 : -10,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                </TooltipTrigger>
                {!isHovered && (
                  <TooltipContent side="right" className="ml-2 font-medium">
                    {item.label}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>

      {/* User Mini Profile */}
      <div className="p-4 border-t border-[#1F1F1F]">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl border border-[#1F1F1F] bg-[#0A0A0A] overflow-hidden w-[200px]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00FF94] to-[#00DB80] shrink-0" />
          <motion.div
            className="flex flex-col whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-sm font-semibold text-[#FFFFFF]">Jane Doe</span>
            <span className="text-xs text-[#A1A1A1]">SDE Prep</span>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  );
}
