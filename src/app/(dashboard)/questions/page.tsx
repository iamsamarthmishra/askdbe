"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, CheckCircle, Code, ChevronRight, Hash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const CATEGORIES = [
  "All",
  "DSA",
  "Technical",
  "Interview",
  "Aptitude",
  "Case Study"
];

import { QUESTIONS_DATA } from "@/lib/questions";

import { createClient } from "@/lib/supabase/client";

export default function QuestionsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [typingPlaceholder, setTypingPlaceholder] = useState("");
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

  const placeholders = ["Search 'System Design'...", "Search 'Amazon'...", "Search 'Trees'..."];

  useEffect(() => {
    let currentPlIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    const type = () => {
      const currentText = placeholders[currentPlIdx];
      if (isDeleting) {
        setTypingPlaceholder(currentText.substring(0, charIdx - 1));
        charIdx--;
      } else {
        setTypingPlaceholder(currentText.substring(0, charIdx + 1));
        charIdx++;
      }

      let speed = isDeleting ? 50 : 100;

      if (!isDeleting && charIdx === currentText.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        currentPlIdx = (currentPlIdx + 1) % placeholders.length;
        speed = 500;
      }
      timeout = setTimeout(type, speed);
    };

    timeout = setTimeout(type, 500);
    return () => clearTimeout(timeout);
  }, []);

  const [solved, setSolved] = useState<Set<string>>(new Set());
  const isPremium = plan === 'premium';
  const limitReached = !isPremium && solved.size >= 5;

  const toggleSolved = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Prevent solving new questions if limit reached on free plan
    if (limitReached && !solved.has(id)) {
      alert("Free plan limit reached (5 questions/month). Please upgrade to Premium!");
      return;
    }

    setSolved(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredQuestions = QUESTIONS_DATA.filter((q) => {
    const matchesSearch = 
      q.title.toLowerCase().includes(search.toLowerCase()) || 
      q.company.toLowerCase().includes(search.toLowerCase()) ||
      q.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || q.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col flex-1 h-full w-full max-w-5xl mx-auto px-8 pb-20 pt-10 gap-8">
      
      {/* Header & Search */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-[#FFFFFF]">Curated Questions</h1>
            <p className="text-[#A1A1A1]">Master technical rounds, aptitudes, systems design, and behavioral interviews.</p>
          </div>
          {!loading && (
            <div className="px-4 py-2 bg-[#111111] rounded-xl border border-[#333333] flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-400">Monthly Usage:</span>
              <span className={`text-sm font-bold ${limitReached ? 'text-red-400' : 'text-[#00FF94]'}`}>
                {solved.size} / {isPremium ? '∞' : '5'} Solved
              </span>
            </div>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A1A1A1]" />
            <Input
              className="pl-12 h-14 bg-[#111111]/80 rounded-2xl border-[#333333] text-base shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] focus-visible:ring-[#00FF94]/50"
              placeholder={typingPlaceholder || "Search questions..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map(cat => (
            <motion.div whileTap={{ scale: 0.95 }} key={cat}>
              <Badge 
                onClick={() => setActiveCategory(cat)}
                variant={activeCategory === cat ? "secondary" : "outline"} 
                className={`px-4 py-2.5 rounded-xl cursor-pointer text-sm font-medium transition-colors ${
                  activeCategory === cat 
                    ? "bg-[#00FF94]/10 text-[#00FF94] border-[#00FF94]/30" 
                    : "hover:bg-[#111111] hover:text-[#FFFFFF]"
                }`}
              >
                {cat === "All" ? "All Questions" : cat}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Question List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="p-10 text-center border border-dashed border-[#333333] rounded-2xl bg-[#0A0A0A]">
            <Hash className="w-10 h-10 text-[#A1A1A1] mx-auto mb-4 opacity-50" />
            <h3 className="text-[#FFFFFF] font-bold text-lg mb-2">No questions found</h3>
            <p className="text-[#A1A1A1] text-sm">Try adjusting your search criteria or category filter.</p>
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AnimatePresence>
              {filteredQuestions.map((q) => {
                const isSolved = solved.has(q.id);
                return (
                  <motion.div 
                    key={q.id} 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AccordionItem 
                      value={q.id} 
                      className={`bg-[#111111] border ${isSolved ? 'border-[#00FF94]/50' : 'border-[#1F1F1F]'} rounded-2xl px-6 overflow-hidden transition-all duration-300 hover:border-[#333333] group`}
                    >
                      <AccordionTrigger className="hover:no-underline py-6 data-[state=open]:pb-2">
                        <div className="flex flex-1 items-center justify-between pointer-events-none">
                          <div className="flex items-center gap-4">
                            <div 
                              className={`p-2 rounded-full border shrink-0 ${isSolved ? 'bg-[#00FF94]/10 border-[#00FF94] text-[#00FF94]' : 'bg-[#1F1F1F] border-transparent text-[#A1A1A1]'}`}
                            >
                              <CheckCircle className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col items-start gap-1.5 text-left">
                              <span className={`text-lg font-semibold transition-colors ${isSolved ? 'text-[#A1A1A1] line-through' : 'text-[#FFFFFF] group-hover:text-[#00FF94]'}`}>
                                {q.title}
                              </span>
                              <div className="flex items-center gap-2 pointer-events-auto flex-wrap">
                                <Badge variant="outline" className="border-[#333333] bg-[#0A0A0A] text-xs py-0">{q.company}</Badge>
                                <Badge variant="secondary" className="bg-[#1F1F1F] text-[#A1A1A1] border-transparent text-xs py-0">
                                  {q.category}
                                </Badge>
                                <Badge variant={q.difficulty === "Hard" ? "destructive" : "secondary"} className="bg-transparent border text-xs py-0">
                                  {q.difficulty}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      
                      <AccordionContent className="pt-4 pb-6 border-t border-[#1F1F1F]/50 mt-2">
                        <div className="space-y-6">
                          <div className="text-sm text-[#A1A1A1] leading-relaxed bg-[#0A0A0A]/50 p-4 rounded-xl border border-[#1F1F1F]">
                            <strong className="text-[#FFFFFF] block mb-2">Problem Statement:</strong>
                            {q.description}
                          </div>
                          
                          <div className="bg-black p-4 rounded-xl border border-[#333333]">
                            <strong className="text-[#FFFFFF] flex items-center gap-2 mb-2">
                              <Code className="w-4 h-4 text-[#00FF94]" /> Perfect Answer Structure:
                            </strong>
                            <p className="text-sm text-[#00FF94] opacity-90 leading-relaxed font-mono">{q.solution}</p>
                          </div>

                          <div className="flex justify-between items-center pt-2">
                            <Button 
                              onClick={(e) => toggleSolved(q.id, e)}
                              variant={isSolved ? "outline" : "premium"}
                              className="rounded-xl px-6 font-bold"
                            >
                              {isSolved ? "Mark as Undone" : "Mark as Solved"}
                            </Button>

                            <Button variant="ghost" className="text-[#00FF94] font-semibold hover:bg-[#00FF94]/10 hover:text-[#00FF94]" onClick={() => window.location.href = `/questions/${q.id}`}>
                              Start Assessment <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </Accordion>
        )}
      </div>
    </div>
  );
}
