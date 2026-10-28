import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Info, BookOpen, AlertCircle } from "lucide-react";
import { electionPhases as timelineSteps } from "@/data/electionPhases";

export default function ElectionTimeline() {
  const [expanded, setExpanded] = useState(null);
  const [activeSection, setActiveSection] = useState({});

  const toggleSection = (stepIdx, sectionIdx) => {
    const key = `${stepIdx}-${sectionIdx}`;
    setActiveSection((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section>
      <div className="mb-8">
        <h3 className="font-playfair text-2xl font-bold text-foreground mb-1">Election Process Timeline</h3>
        <p className="text-muted-foreground text-sm">Tap any step to explore it in depth — key terms, detailed steps, and insider tips included.</p>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

        <div className="space-y-4">
          {timelineSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div
                className={`relative md:ml-16 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-md ${step.bgClass} ${expanded === i ? "shadow-md" : ""}`}
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <div className={`absolute -left-10 top-5 w-4 h-4 rounded-full border-2 border-white ${step.dotClass} hidden md:block shadow-sm`} />

                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">{step.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${step.labelClass}`}>{step.phase}</span>
                        <span className="text-xs text-muted-foreground">{step.timing}</span>
                      </div>
                      <h4 className="font-semibold text-foreground text-base">{step.title}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5">{step.summary}</p>
                    </div>
                    <div className="flex-shrink-0 text-muted-foreground">
                      {expanded === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>

                  <AnimatePresence>
                    {expanded === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="mt-5 pt-4 border-t border-border/40 space-y-5">

                          {/* Key Terms */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <BookOpen className="w-4 h-4 text-muted-foreground" />
                              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Key Terms</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {step.keyTerms.map((kt, ki) => (
                                <div key={ki} className="bg-white/70 rounded-lg px-3 py-2 border border-border/30">
                                  <span className="font-semibold text-xs text-foreground">{kt.term}: </span>
                                  <span className="text-xs text-muted-foreground">{kt.definition}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Detailed sections */}
                          <div className="space-y-3">
                            {step.details.map((section, si) => {
                              const key = `${i}-${si}`;
                              const open = activeSection[key];
                              return (
                                <div key={si} className="bg-white/50 rounded-lg border border-border/30 overflow-hidden">
                                  <button
                                    className="w-full text-left px-4 py-3 flex items-center justify-between"
                                    onClick={() => toggleSection(i, si)}
                                  >
                                    <span className="font-medium text-sm text-foreground">{section.heading}</span>
                                    {open ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
                                  </button>
                                  <AnimatePresence>
                                    {open && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                      >
                                        <ul className="px-4 pb-4 space-y-2">
                                          {section.points.map((point, pi) => (
                                            <li key={pi} className="flex items-start gap-2 text-sm text-foreground/80">
                                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 opacity-40" />
                                              {point}
                                            </li>
                                          ))}
                                        </ul>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </div>

                          {/* Tip & Did You Know */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-white/60 rounded-lg px-4 py-3 border border-border/30">
                              <div className="flex items-center gap-1.5 mb-1">
                                <Info className="w-3.5 h-3.5 text-primary" />
                                <span className="text-xs font-semibold text-primary">Pro Tip</span>
                              </div>
                              <p className="text-xs text-foreground/75">{step.tip.replace("💡 ", "")}</p>
                            </div>
                            <div className="bg-white/60 rounded-lg px-4 py-3 border border-border/30">
                              <div className="flex items-center gap-1.5 mb-1">
                                <AlertCircle className="w-3.5 h-3.5 text-india-blue" />
                                <span className="text-xs font-semibold text-india-blue">Did You Know?</span>
                              </div>
                              <p className="text-xs text-foreground/75">{step.didYouKnow}</p>
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}