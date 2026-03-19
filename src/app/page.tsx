"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Lightbulb, BrainCircuit, Users, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden font-sans selection:bg-[#00FF94] selection:text-black">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#00FF94] opacity-10 blur-[120px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-[#00FF94]" style={{ filter: 'drop-shadow(0 0 8px rgba(0,255,148,0.8))' }} />
            <span className="font-extrabold tracking-widest text-lg">UPAI.SPACE</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <Link href="#features" className="hover:text-black transition-colors">Features</Link>
            <Link href="#mentors" className="hover:text-black transition-colors">Mentorship</Link>
            <Link href="#pricing" className="hover:text-black transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium hover:text-gray-600 transition-colors">Log in</Link>
            <Link href="/dashboard">
              <Button className="bg-black text-[#00FF94] hover:bg-gray-900 shadow-xl shadow-[#00FF94]/10 rounded-full px-6 text-sm h-10 border border-[#00FF94]/30">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FF94]/10 text-black border border-[#00FF94]/30 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse" style={{ boxShadow: '0 0 10px #00FF94' }} />
          <span className="text-sm font-bold uppercase tracking-wider">Now Open to the public</span>
        </motion.div>

        <motion.h1 
          className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.1] text-black mb-6 max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Land your dream <br className="hidden md:block" />
          <span className="relative">
             tech role, 
            <span className="absolute bottom-2 left-0 w-full h-4 bg-[#00FF94]/30 -z-10 skew-x-12" />
          </span> 
          <span className="text-[#00FF94]" style={{ textShadow: '0 0 40px rgba(0,255,148,0.5)' }}> faster.</span>
        </motion.h1>

        <motion.p 
          className="text-xl text-gray-500 mb-10 max-w-2xl font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          The definitive interview prep workspace combining AI-driven practice, curated question banks, and 1:1 expert mentorship.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/dashboard">
            <Button className="h-14 px-8 text-base font-bold bg-black text-[#00FF94] hover:bg-gray-900 hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,0,0,0.1)] rounded-full group">
              Start Your Training
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button variant="outline" className="h-14 px-8 text-base font-bold text-black border-gray-200 hover:bg-gray-50 rounded-full">
            View Syllabus
          </Button>
        </motion.div>

        {/* Minimal Dashboard Preview */}
        <motion.div 
          className="mt-20 w-full relative rounded-2xl md:rounded-[2rem] border border-gray-200 bg-white shadow-2xl overflow-hidden shadow-[#00FF94]/5"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="h-12 bg-gray-50 border-b border-gray-100 flex items-center px-6 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-[#00FF94]" />
            </div>
          </div>
          <div className="aspect-[16/9] w-full bg-[#0A0A0A] relative flex items-center justify-center overflow-hidden">
             {/* Abstract Mockup inside window */}
             <div className="absolute inset-0 bg-[#0A0A0A] bg-[linear-gradient(to_right,#1F1F1F_1px,transparent_1px),linear-gradient(to_bottom,#1F1F1F_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50" />
             <Lightbulb className="w-20 h-20 text-[#00FF94] animate-pulse z-10" style={{ filter: 'drop-shadow(0 0 30px rgba(0,255,148,0.4))' }} />
          </div>
        </motion.div>
      </main>

      {/* Features Outline */}
      <section id="features" className="py-24 bg-gray-50 border-t border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-black mb-4">Master every stage.</h2>
            <p className="text-xl text-gray-500 font-medium">Everything you need to clear technical interviews.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-black/5 hover:border-[#00FF94]/50 transition-colors">
              <div className="w-12 h-12 bg-black text-[#00FF94] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#00FF94]/20">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Targeted Question Bank</h3>
              <p className="text-gray-500 font-medium">Access highly curated problems asked specifically by Meta, Google, and Amazon in recent rounds.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-[#00FF94]/30 shadow-xl shadow-[#00FF94]/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF94] opacity-10 blur-3xl rounded-full" />
              <div className="w-12 h-12 bg-[#00FF94] text-black rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#00FF94]/40">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Coach</h3>
              <p className="text-gray-500 font-medium">Get real-time hints and explanations from an AI trained strictly on top-tier engineering interviews.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-black/5 hover:border-[#00FF94]/50 transition-colors">
              <div className="w-12 h-12 bg-black text-[#00FF94] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#00FF94]/20">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">1:1 Mentorship</h3>
              <p className="text-gray-500 font-medium">Book mock interviews with senior engineers directly through our platform. No external tools needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Outro CTA */}
      <section className="py-32 bg-black text-white relative overflow-hidden flex flex-col items-center text-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00FF94_0%,transparent_50%)] opacity-10" />
        <h2 className="text-5xl md:text-7xl font-black mb-6 text-white z-10 w-full max-w-4xl tracking-tighter">
          Ready to become a <br/><span className="text-[#00FF94]">top 1%</span> candidate?
        </h2>
        <Link href="/dashboard" className="z-10">
          <Button className="h-16 px-10 text-lg font-bold bg-[#00FF94] text-black hover:bg-white hover:scale-105 transition-all shadow-[0_0_40px_rgba(0,255,148,0.4)] rounded-full group">
            Jump to Dashboard
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
