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

const QUESTIONS_DATA = [
  // DSA Questions
  {
    id: "dsa1",
    category: "DSA",
    title: "Implement LRU Cache",
    company: "Amazon",
    difficulty: "Hard",
    description: "Design and implement a data structure for Least Recently Used (LRU) cache.",
    solution: "Use a hash map combined with a doubly linked list. The map provides O(1) access to nodes, while the list maintains the eviction order.",
  },
  {
    id: "dsa2",
    category: "DSA",
    title: "Merge Intervals",
    company: "Google",
    difficulty: "Medium",
    description: "Given an array of intervals, merge all overlapping intervals.",
    solution: "Sort the intervals by their start time. Iterate through, merging if the current interval's start is <= the previous interval's end.",
  },
  // Technical Questions
  {
    id: "tech1",
    category: "Technical",
    title: "SQL vs NoSQL Databases",
    company: "Netflix",
    difficulty: "Medium",
    description: "Explain the main differences between SQL and NoSQL databases, and when to choose which.",
    solution: "SQL is relational, schema-based, and scales vertically (ACID). NoSQL is non-relational, flexible schema, and scales horizontally (BASE). Use SQL for complex queries and ACID transactions. Use NoSQL for rapidly changing data and horizontal scaling.",
  },
  {
    id: "tech2",
    category: "Technical",
    title: "What is Event Loop in Node.js?",
    company: "Stripe",
    difficulty: "Medium",
    description: "Describe the Node.js event loop and how it handles asynchronous operations.",
    solution: "The event loop allows Node.js to perform non-blocking I/O operations by offloading operations to the system kernel whenever possible. It executes callbacks queued across different phases (Timers, Pending Callbacks, Poll, Check, Close).",
  },
  // Interview (Behavioral/HR)
  {
    id: "int1",
    category: "Interview",
    title: "Tell me about a time you failed.",
    company: "Amazon",
    difficulty: "Medium",
    description: "Describe a situation where a project or task failed. How did you handle it and what did you learn?",
    solution: "Use the STAR approach. Focus strongly on the 'Results' and 'Learnings'. Amazon evaluates the 'Learn and Be Curious' and 'Ownership' leadership principles here. Emphasize how you took accountability without blaming others.",
  },
  {
    id: "int2",
    category: "Interview",
    title: "Handling disagreement with a senior.",
    company: "Meta",
    difficulty: "Hard",
    description: "How would you handle a situation where you strongly disagree with a senior engineer or manager's technical decision?",
    solution: "Discuss 'Disagree and Commit'. State that you would back your claims with data and benchmarks in a respectful 1:1 meeting. If the decision remains unchanged, you commit to executing their plan to the best of your highly capable abilities.",
  },
  // Aptitude
  {
    id: "apt1",
    category: "Aptitude",
    title: "The 3 Jugs Puzzle",
    company: "Microsoft",
    difficulty: "Hard",
    description: "You have a 3-gallon jug and a 5-gallon jug, and an unlimited supply of water. How do you measure exactly 4 gallons?",
    solution: "1. Fill 5G. 2. Pour 5G into 3G (leaves 2G in 5G). 3. Empty 3G. 4. Pour the 2G from 5G into 3G. 5. Fill 5G again. 6. Pour 5G into 3G until full (takes 1G). 7. Exactly 4G remains in the 5G jug.",
  },
  {
    id: "apt2",
    category: "Aptitude",
    title: "Clock Angle Problem",
    company: "TCS",
    difficulty: "Easy",
    description: "What is the angle between the hour and minute hands of a clock at 3:15?",
    solution: "The minute hand is exactly at 3 (90 degrees). The hour hand moves 360/12 = 30 degrees per hour. In 15 minutes (1/4 of an hour), the hour hand moves 30 * (1/4) = 7.5 degrees past the 3. The angle is 7.5 degrees.",
  },
  // Case Study
  {
    id: "cs1",
    category: "Case Study",
    title: "Design Uber's Dispatch System",
    company: "Uber",
    difficulty: "Hard",
    description: "How would you design a highly scalable location tracking and dispatch system for millions of concurrent drivers and riders?",
    solution: "Discuss Quadtrees / Geohashes for location indexing (e.g., Redis geospatial features). Riders request rides, system queries nearest drivers within specific geohashes. Use Kafka for pub/sub matching events, and WebSockets for real-time app updates.",
  },
  {
    id: "cs2",
    category: "Case Study",
    title: "E-Commerce Flash Sale Architecture",
    company: "Flipkart",
    difficulty: "Hard",
    description: "Design an architecture that can handle a massive spike of 10 million concurrent users buying a limited stock of 1000 phones.",
    solution: "Use a heavy caching layer (Redis) at the edge. Implement a queuing mechanism (RabbitMQ/Kafka) to serialize checkout requests. Only allow the first 1000 requests into the database transaction layer. Respond to the rest from cache that stock is empty.",
  }
];

export default function QuestionsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [typingPlaceholder, setTypingPlaceholder] = useState("");
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

  const toggleSolved = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
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
        <h1 className="text-4xl font-extrabold tracking-tight text-[#FFFFFF]">Curated Questions</h1>
        <p className="text-[#A1A1A1]">Master technical rounds, aptitudes, systems design, and behavioral interviews.</p>
        
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

                            <Button variant="ghost" className="text-[#00FF94] font-semibold hover:bg-[#00FF94]/10 hover:text-[#00FF94]">
                              Start Timer <ChevronRight className="w-4 h-4 ml-1" />
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
