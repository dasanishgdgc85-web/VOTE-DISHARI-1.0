import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, ChevronRight, Flag, Target, TrendingUp } from "lucide-react";
import { electionPhases } from "@/data/electionPhases";

const STORAGE_KEY = "vote_dishari_active_phase";

export default function ElectionDashboard() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      const n = parseInt(saved, 10);
      if (!isNaN(n) && n >= 0 && n < electionPhases.length) setActiveIdx(n);
    }
  }, []);

  const selectPhase = (i) => {
    setActiveIdx(i);
    localStorage.setItem(STORAGE_KEY, String(i));
  };

  const total = electionPhases.length;
  const completed = activeIdx;
  const progressPct = Math.round((completed / total) * 100);
  const activePhase = electionPhases[activeIdx];
  const upcoming = electionPhases.slice(activeIdx + 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="font-playfair text-2xl font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-saffron" /> Election Cycle Dashboard
          </h3>
          <p className="text-muted-foreground text-sm mt-0.5">
            Track progress through the {total}-phase election cycle. Set your current phase to see what's done and what's next.
          </p>
        </div>
        <div className="bg-white border border-border rounded-xl px-4 py-2 shadow-sm">
          <div className="text-xs text-muted-foreground">Overall progress</div>
          <div className="text-2xl font-bold text-foreground">{progressPct}%</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Cycle progress</span>
          <span className="text-xs text-muted-foreground">{completed} of {total} phases complete</span>
        </div>
        <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-saffron via-yellow-400 to-india-green rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Phase stepper */}
      <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Flag className="w-4 h-4 text-saffron" />
          <h4 className="font-semibold text-foreground">Election Phases</h4>
          <span className="text-xs text-muted-foreground ml-auto">Click a phase to set it as current</span>
        </div>
        <div className="flex items-start gap-1 overflow-x-auto pb-2">
          {electionPhases.map((p, i) => {
            const done = i < activeIdx;
            const current = i === activeIdx;
            return (
              <React.Fragment key={i}>
                <button
                  onClick={() => selectPhase(i)}
                  className="flex flex-col items-center gap-2 flex-shrink-0 w-24 text-center group"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition ${
                      current
                        ? "border-saffron bg-saffron text-white shadow-md scale-110"
                        : done
                        ? "border-india-green bg-india-green/10 text-india-green"
                        : "border-border bg-white text-muted-foreground group-hover:border-saffron/50"
                    }`}
                  >
                    {done ? <CheckCircle2 className="w-5 h-5" /> : p.icon}
                  </div>
                  <span className={`text-[11px] leading-tight ${current ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                    {p.title}
                  </span>
                </button>
                {i < electionPhases.length - 1 && (
                  <div className={`flex-1 h-0.5 mt-5 min-w-[12px] ${i < activeIdx ? "bg-india-green" : "bg-border"}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Active phase highlight */}
      <div className={`rounded-xl border p-5 shadow-sm ${activePhase.bgClass}`}>
        <div className="flex items-start gap-4">
          <div className="text-4xl flex-shrink-0">{activePhase.icon}</div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${activePhase.labelClass}`}>{activePhase.phase}</span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> {activePhase.timing}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-saffron bg-white/70 px-2 py-0.5 rounded-full">
                <Circle className="w-2.5 h-2.5 fill-current" /> Active phase
              </span>
            </div>
            <h4 className="font-playfair text-xl font-bold text-foreground">{activePhase.title}</h4>
            <p className="text-sm text-muted-foreground mt-1">{activePhase.summary}</p>
          </div>
        </div>

        {/* Milestones within active phase */}
        <div className="mt-5 pt-4 border-t border-border/40">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-foreground/70" />
            <span className="text-xs font-semibold uppercase tracking-wide text-foreground/70">Current phase milestones</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {activePhase.milestones.map((m, mi) => (
              <div key={mi} className="flex items-start gap-2 bg-white/60 rounded-lg px-3 py-2 border border-border/30">
                <ChevronRight className="w-3.5 h-3.5 text-saffron flex-shrink-0 mt-0.5" />
                <span className="text-xs text-foreground/80">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming milestones */}
      {upcoming.length > 0 ? (
        <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-india-blue" />
            <h4 className="font-semibold text-foreground">Upcoming Milestones</h4>
          </div>
          <div className="space-y-3">
            {upcoming.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:border-saffron/40 hover:bg-orange-50/40 transition"
              >
                <div className="text-2xl flex-shrink-0">{p.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground">{p.phase}</span>
                    <h5 className="font-medium text-sm text-foreground">{p.title}</h5>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.timing}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {p.milestones.map((m, mi) => (
                      <span key={mi} className="text-[11px] bg-muted/60 text-foreground/70 px-2 py-0.5 rounded-full border border-border/40">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-india-green/5 border border-india-green/30 rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">🎉</div>
          <h4 className="font-semibold text-foreground">Election cycle complete!</h4>
          <p className="text-sm text-muted-foreground mt-1">The government has been formed. The cycle will begin again with the next election announcement.</p>
        </div>
      )}
    </div>
  );
}