"use client";

import { useState } from "react";
import { format, addDays, startOfWeek } from "date-fns";
import { motion } from "framer-motion";
import { Video, Calendar as CalendarIcon, Clock, CheckCircle2, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";

const MENTORS = [
  { id: 1, name: "Alex Chen", role: "Ex-Google SWE", rating: "4.9", topics: ["System Design", "Backend"] },
  { id: 2, name: "Sarah Jenkins", role: "Frontend Lead @ Stripe", rating: "5.0", topics: ["React", "UI/UX"] },
  { id: 3, name: "David Kim", role: "Engineering Manager @ Meta", rating: "4.8", topics: ["Behavioral", "Career"] }
];

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:30 AM", "01:00 PM", "03:00 PM", "04:30 PM", "06:00 PM"
];

export default function SessionsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedMentor, setSelectedMentor] = useState(MENTORS[0]);
  const [isBooked, setIsBooked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Generate a mock custom calendar week
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 14 }).map((_, i) => addDays(startDate, i));

  const handleBook = () => {
    setIsBooked(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsBooked(false);
      setSelectedSlot(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col flex-1 h-full w-full max-w-5xl mx-auto px-8 pb-20 pt-10 gap-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#1F1F1F] pb-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#FFFFFF] mb-2">1:1 Mentorship</h1>
          <p className="text-[#A1A1A1]">Book personalized mock interviews and guidance sessions.</p>
        </div>
        <div className="flex bg-[#111111] border border-[#1F1F1F] p-1 rounded-xl">
          <Button variant="ghost" className="bg-[#1F1F1F] text-[#FFFFFF] shadow-sm rounded-lg">Book Session</Button>
          <Button variant="ghost" className="text-[#A1A1A1]">My History</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mentors Column */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Star className="w-5 h-5 text-[#00FF94]" /> Expert Mentors
          </h3>
          <div className="flex flex-col gap-4">
            {MENTORS.map(mentor => (
              <Card 
                key={mentor.id} 
                className={`cursor-pointer transition-all ${selectedMentor.id === mentor.id ? 'border-[#00FF94]/50 shadow-[0_0_15px_rgba(0,255,148,0.1)]' : 'hover:border-[#333333]'}`}
                onClick={() => setSelectedMentor(mentor)}
              >
                <CardContent className="p-4 flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold text-[#FFFFFF] truncate">{mentor.name}</h4>
                    <p className="text-xs text-[#A1A1A1] truncate">{mentor.role}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="text-[10px] h-5 py-0 px-1.5 border-[#333333]">★ {mentor.rating}</Badge>
                      <Badge variant="secondary" className="text-[10px] h-5 py-0 px-1.5 bg-[#1F1F1F]">{mentor.topics[0]}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Calendar and Slots Column */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-[#A1A1A1]" /> Select Date & Time
          </h3>
          
          <Card className="bg-[#111111]/50 border-[#1F1F1F]">
            <CardContent className="p-6">
              
              {/* Custom Date Grid */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-[#FFFFFF]">{format(selectedDate, 'MMMM yyyy')}</h4>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-none snap-x">
                  {weekDays.map(date => {
                    const isSelected = selectedDate.toDateString() === date.toDateString();
                    return (
                      <button
                        key={date.toString()}
                        onClick={() => setSelectedDate(date)}
                        className={`flex flex-col items-center justify-center min-w-[70px] h-20 rounded-2xl border snap-center transition-all ${
                          isSelected 
                            ? 'bg-[#00FF94] border-[#00FF94] text-black shadow-[0_0_15px_rgba(0,255,148,0.3)]' 
                            : 'bg-[#0A0A0A] border-[#1F1F1F] text-[#FFFFFF] hover:border-[#333333]'
                        }`}
                      >
                        <span className={`text-xs ${isSelected ? 'text-black/70' : 'text-[#A1A1A1]'}`}>{format(date, 'EEE')}</span>
                        <span className="text-lg font-bold">{format(date, 'd')}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <h4 className="font-medium text-[#FFFFFF] mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#A1A1A1]" /> Available Slots
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                        selectedSlot === slot 
                          ? 'bg-[#00FF94]/10 border-[#00FF94]/50 text-[#00FF94]' 
                          : 'bg-[#0A0A0A] border-[#1F1F1F] text-[#FFFFFF] hover:bg-[#1F1F1F]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Booking Action */}
          <div className="flex justify-end pt-4">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  variant="premium" 
                  disabled={!selectedSlot}
                  className="rounded-2xl px-12"
                >
                  Verify Booking
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md border-[#333333] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                {isBooked ? (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center py-10 text-center space-y-4"
                  >
                    <CheckCircle2 className="w-16 h-16 text-[#00FF94]" />
                    <DialogTitle className="text-2xl font-bold">Session Confirmed!</DialogTitle>
                    <p className="text-[#A1A1A1]">An invite has been sent to your email.</p>
                  </motion.div>
                ) : (
                  <>
                    <DialogHeader>
                      <DialogTitle>Confirm Mock Interview</DialogTitle>
                      <DialogDescription>
                        You are about to book a 1-hour session. Please review the details below.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4 space-y-4 my-4">
                      <div className="flex items-center gap-3">
                        <Video className="w-5 h-5 text-[#00FF94]" />
                        <span className="font-medium">Video Call (Google Meet)</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-[#A1A1A1]">Mentor</p>
                          <p className="font-medium text-[#FFFFFF]">{selectedMentor.name}</p>
                        </div>
                        <div>
                          <p className="text-[#A1A1A1]">Date</p>
                          <p className="font-medium text-[#FFFFFF]">{format(selectedDate, 'MMM do, yyyy')}</p>
                        </div>
                        <div>
                          <p className="text-[#A1A1A1]">Time</p>
                          <p className="font-medium text-[#FFFFFF]">{selectedSlot}</p>
                        </div>
                        <div>
                          <p className="text-[#A1A1A1]">Cost</p>
                          <p className="font-medium text-[#FFFFFF]">Free (1 Credit)</p>
                        </div>
                      </div>
                    </div>

                    <DialogFooter className="sm:justify-between">
                      <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                      <Button variant="premium" onClick={handleBook}>Confirm Booking</Button>
                    </DialogFooter>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
