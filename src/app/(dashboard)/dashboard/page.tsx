"use client";

import { motion } from "framer-motion";
import { Lightbulb, ArrowRight, PlayCircle, Star, Briefcase, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const TRENDING_QUESTIONS = [
  { id: 1, title: "LRU Cache Implementation", company: "Amazon", difficulty: "Hard", year: "2024" },
  { id: 2, title: "Valid Parentheses", company: "Google", difficulty: "Easy", year: "2024" },
  { id: 3, title: "System Design: Netflix", company: "Netflix", difficulty: "Hard", year: "2024" },
  { id: 4, title: "Two Sum", company: "Meta", difficulty: "Easy", year: "2023" },
];

const AI_RECOMMENDATIONS = [
  { id: 1, topic: "Graph Algorithms", relevance: "High match for SDE 2" },
  { id: 2, topic: "React Fiber Architecture", relevance: "Frontend roles" },
  { id: 3, topic: "Distributed Caching", relevance: "Backend focus" },
  { id: 4, topic: "Behavioral: Leadership", relevance: "Amazon LP" },
];

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { load } from "@cashfreepayments/cashfree-js";

export default function DashboardPage() {
  const [plan, setPlan] = useState<'free' | 'premium'>('free');
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data } = await supabase.from('profiles').select('plan').eq('id', session.user.id).single();
        if (data?.plan) setPlan(data.plan as 'free' | 'premium');
      }
      setLoading(false);
    }
    loadProfile();
  }, [supabase]);

  const isPremium = plan === 'premium';

  const handleUpgrade = async () => {
    try {
      const res = await fetch('/api/payments/create-order', { method: 'POST' });
      const data = await res.json();
      if (data.payment_session_id) {
        const cashfree = await load({ mode: data.environment || 'sandbox' });
        cashfree.checkout({ paymentSessionId: data.payment_session_id });
      } else {
        alert("Failed to initiate payment: " + (data.error || "Unknown"));
      }
    } catch (err) {
      alert("Checkout error: Please ensure you are logged in.");
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full w-full max-w-5xl mx-auto px-8 pb-20 pt-16 gap-16">
      {/* Current Plan Badge */}
      {!loading && (
        <div className="absolute top-6 right-8 flex items-center gap-3">
          <span className="text-sm font-medium text-zinc-400">Current Plan:</span>
          <Badge variant="outline" className={`px-3 py-1 text-xs uppercase tracking-widest ${isPremium ? 'border-amber-500/50 text-amber-400 bg-amber-500/10' : 'border-[#00FF94]/50 text-[#00FF94] bg-[#00FF94]/10'}`}>
            {plan}
          </Badge>
          {!isPremium && (
             <Button variant="outline" size="sm" className="h-7 text-xs border-[#00FF94]/30 text-[#00FF94] hover:bg-[#00FF94] hover:text-black rounded-full" onClick={handleUpgrade}>
               Upgrade
             </Button>
          )}
        </div>
      )}
      {/* Hero Section */}
      <motion.section
        className="flex flex-col items-center justify-center text-center space-y-6 pt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
           animate={{
            boxShadow: ["0px 0px 40px rgba(0,255,148,0.2)", "0px 0px 80px rgba(0,255,148,0.6)", "0px 0px 40px rgba(0,255,148,0.2)"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="p-4 bg-[#111111] rounded-full border border-[#1F1F1F] text-[#00FF94] mb-4"
        >
          <Lightbulb className="w-12 h-12" />
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-[#A1A1A1] max-w-3xl">
          Train Like You&apos;re <br /> Already <span className="text-[#00FF94] drop-shadow-[0_0_15px_rgba(0,255,148,0.4)]">Hired</span>
        </h1>
        
        <p className="text-lg md:text-xl text-[#A1A1A1] max-w-2xl mx-auto leading-relaxed">
          The ultimate AI-powered interview preparation workspace. 
          Master coding, system design, and behavioral rounds with 1:1 expert mentoring.
        </p>

        <div className="flex items-center gap-4 pt-4">
          <Button size="lg" variant="premium" className="group rounded-full text-base font-semibold px-8 h-14">
            Start Solving
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base">
            <PlayCircle className="mr-2 w-5 h-5 text-[#A1A1A1]" />
            Quick Assessment
          </Button>
        </div>
      </motion.section>

      {/* Stats / Progress */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-gradient-to-r from-[#111111] to-[#0A0A0A] border-[#1F1F1F] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FF94] opacity-5 blur-[100px] rounded-full pointer-events-none" />
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="space-y-2 flex-1">
                <h3 className="text-2xl font-bold">You&apos;re <span className="text-[#00FF94]">68%</span> interview ready</h3>
                <p className="text-[#A1A1A1]">Complete 5 more Hard problems to boost your score.</p>
              </div>
              <div className="flex-1 w-full space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#A1A1A1]">Overall Progress</span>
                  <span className="font-bold text-[#00FF94]">68%</span>
                </div>
                <Progress value={68} className="h-3 shadow-inner" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Trending & Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Trending Column */}
        <motion.section
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Flame className="w-6 h-6 text-orange-500" />
              Trending Questions
            </h2>
            <Button variant="link" className="text-sm">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TRENDING_QUESTIONS.map((q, i) => (
              <motion.div
                key={q.id}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="cursor-pointer group">
                  <CardHeader className="p-5">
                    <CardTitle className="text-base text-[#FFFFFF] group-hover:text-[#00FF94] transition-colors">{q.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-4 flex-wrap">
                      <Badge variant="secondary" className="bg-[#1F1F1F] text-[#FFFFFF] font-normal border-[#333333]">
                        {q.company}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={
                          q.difficulty === "Hard" ? "text-red-400 border-red-500/30" : "text-[#00FF94] border-[#00FF94]/30"
                        }
                      >
                        {q.difficulty}
                      </Badge>
                      <span className="text-xs text-[#A1A1A1] ml-auto">{q.year}</span>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* AI Recommendations Column */}
        <motion.section
          className="space-y-6 relative flex flex-col h-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Star className="w-6 h-6 text-[#00FF94]" />
            AI Recommendations
          </h2>
          
          <div className="relative flex-1">
            {!isPremium && (
               <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0a0a0a]/60 backdrop-blur-[2px] rounded-xl border border-[#333] p-6 text-center">
                 <div className="w-12 h-12 bg-[#111] rounded-full flex items-center justify-center mb-4 border border-[#00FF94]/30 shadow-[0_0_15px_rgba(0,255,148,0.2)]">
                    <span className="text-xl">🔒</span>
                 </div>
                 <h3 className="font-bold text-white mb-2">Premium Feature</h3>
                 <p className="text-sm text-zinc-300 mb-6">Upgrade to unlock tailored AI learning paths, Exclusive Workshops, and Doubt Sessions.</p>
                 <Button className="w-full bg-[#00FF94] text-black hover:bg-white border-0" onClick={handleUpgrade}>
                   Unlock for ₹2999/yr
                 </Button>
               </div>
            )}
            
            <div className={`flex flex-col gap-4 ${!isPremium ? 'opacity-40 pointer-events-none select-none' : ''}`}>
              {AI_RECOMMENDATIONS.map((rec) => (
                <Card key={rec.id} className="cursor-pointer group bg-[#111111]/80 hover:bg-[#111111]">
                  <CardHeader className="p-4 flex flex-row items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-[#00FF94]/10 text-[#00FF94]">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">{rec.topic}</CardTitle>
                      <p className="text-xs text-[#A1A1A1] mt-1">{rec.relevance}</p>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </motion.section>
      </div>

    </div>
  );
}
