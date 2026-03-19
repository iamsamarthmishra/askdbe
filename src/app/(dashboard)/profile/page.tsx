"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Target, TrendingUp, AlertTriangle, ShieldCheck, Mail, MapPin, Briefcase } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const TARGET_COMPANIES = ["Google", "Stripe", "Netflix", "Amazon"];

const SKILLS = [
  { name: "Algorithms", score: 85 },
  { name: "System Design", score: 60 },
  { name: "Behavioral", score: 92 },
  { name: "React / Frontend", score: 75 },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col flex-1 h-full w-full max-w-5xl mx-auto px-8 pb-20 pt-10 gap-8">
      
      {/* Header Profile / Editable */}
      <div className="flex flex-col md:flex-row gap-8 items-start justify-between border-b border-[#1F1F1F] pb-8">
        <div className="flex gap-6 items-center w-full max-w-2xl">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#00FF94] to-[#00DB80] shadow-[0_0_30px_rgba(0,255,148,0.3)] shrink-0 flex items-center justify-center border-4 border-[#0A0A0A]">
              <span className="text-3xl font-bold text-black group-hover:hidden">JD</span>
              <User className="hidden group-hover:block w-8 h-8 text-black" />
            </div>
            <button className="absolute bottom-0 right-0 bg-[#111111] border border-[#1F1F1F] p-1.5 rounded-full hover:bg-[#1F1F1F]">
              <Target className="w-4 h-4 text-[#A1A1A1]" />
            </button>
          </div>
          
          <div className="flex-1 space-y-2">
            {isEditing ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <Input defaultValue="Jane Doe" className="text-xl font-bold h-12" />
                <div className="flex gap-2">
                  <Input defaultValue="SDE Prep" className="w-1/2" />
                  <Input defaultValue="San Francisco, CA" className="w-1/2" />
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1 mt-2">
                <h1 className="text-3xl font-extrabold tracking-tight">Jane Doe</h1>
                <div className="flex items-center gap-4 text-sm text-[#A1A1A1] flex-wrap">
                  <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> B.Tech final year</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> San Francisco, CA</span>
                  <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> jane@upai.space</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        <Button 
          variant={isEditing ? "premium" : "outline"} 
          className="rounded-xl px-8"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Save Profile" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Main Readiness Score (Big Visual) */}
        <Card className="md:col-span-1 bg-[#111111]/80 border-[#00FF94]/20 shadow-[0_0_50px_rgba(0,255,148,0.05)] relative overflow-hidden group hover:border-[#00FF94]/50">
          <div className="absolute inset-0 bg-gradient-to-b from-[#00FF94]/10 to-transparent opacity-50 transition-opacity group-hover:opacity-100 mix-blend-overlay pointer-events-none" />
          <CardHeader className="p-6 text-center">
            <CardTitle className="text-lg text-[#FFFFFF]">Interview Readiness</CardTitle>
            <CardDescription className="text-xs">Based on mock interviews & daily prep</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pb-8 pt-2">
            <div className="relative flex items-center justify-center">
              {/* Circular Progress Mockup */}
              <svg className="w-40 h-40 transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-[#1F1F1F]" />
                <circle 
                  cx="80" cy="80" r="70" 
                  stroke="currentColor" strokeWidth="8" fill="transparent" 
                  strokeDasharray="440" strokeDashoffset="140.8" /* 68% of 440 */
                  className="text-[#00FF94]" 
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-[#FFFFFF]">68<span className="text-2xl text-[#00FF94]">%</span></span>
                <span className="text-[10px] uppercase font-bold text-[#A1A1A1] tracking-widest mt-1">Ready</span>
              </div>
            </div>
            
            <p className="mt-8 text-sm text-[#A1A1A1] text-center px-4 leading-relaxed">
              You are currently trending towards a <strong className="text-[#FFFFFF]">Strong Hire</strong> rating for SDE roles.
            </p>
          </CardContent>
        </Card>

        {/* Details Column */}
        <div className="md:col-span-2 space-y-6">
          
          <Card className="bg-[#111111]/50 border-[#1F1F1F]">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-[#A1A1A1]" /> Target Companies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {TARGET_COMPANIES.map(comp => (
                  <div key={comp} className="flex items-center gap-2 bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl px-4 py-3 min-w-[120px] transition-colors hover:border-[#00FF94]/50 cursor-pointer">
                    <ShieldCheck className="w-5 h-5 text-[#00FF94]/80" />
                    <span className="font-semibold text-sm">{comp}</span>
                  </div>
                ))}
                <div className="flex items-center justify-center gap-2 bg-[#1F1F1F] rounded-xl px-4 py-3 min-w-[120px] border border-dashed border-[#333333] cursor-pointer hover:bg-[#111111]">
                  <span className="font-medium text-sm text-[#A1A1A1]">+ Add</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#111111]/50 border-[#1F1F1F]">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-[#00FF94]" /> Skill Analysis</span>
                <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider">Updated Today</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {SKILLS.map(skill => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-[#FFFFFF]">{skill.name}</span>
                    <span className={`font-bold ${skill.score < 70 ? 'text-red-400' : 'text-[#00FF94]'}`}>{skill.score}%</span>
                  </div>
                  <Progress value={skill.score} className={`h-2 shadow-none ${skill.score < 70 ? '[&>div]:bg-red-400 [&>div]:shadow-[0_0_10px_rgba(248,113,113,0.5)]' : ''}`} />
                </div>
              ))}
              
              <div className="bg-[#0A0A0A] mt-6 p-4 rounded-xl border border-red-500/20 flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-[#FFFFFF]">Weakness Detected</h4>
                  <p className="text-xs text-[#A1A1A1] mt-1 leading-relaxed">Your System Design scores are below your target threshold. We recommend booking a mentor session focused on <strong className="text-[#FFFFFF]">Microservices Architecture</strong> and <strong className="text-[#FFFFFF]">Database Sharding</strong>.</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
