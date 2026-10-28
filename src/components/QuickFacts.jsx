import React from "react";
import { motion } from "framer-motion";

const facts = [
  { icon: "🗓️", label: "Election Cycle", value: "Every 5 Years", color: "saffron" },
  { icon: "🏛️", label: "Lok Sabha Seats", value: "543", color: "blue" },
  { icon: "🗳️", label: "Eligible Voters", value: "960M+", color: "green" },
  { icon: "📋", label: "Voting Age", value: "18 Years", color: "saffron" },
  { icon: "🏢", label: "Governing Body", value: "ECI", color: "blue" },
  { icon: "🌍", label: "Largest Democracy", value: "In The World", color: "green" },
];

const colorMap = {
  saffron: "border-t-4 border-t-saffron",
  blue: "border-t-4 border-t-india-blue",
  green: "border-t-4 border-t-india-green",
};

export default function QuickFacts() {
  return (
    <section className="mb-12 mt-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {facts.map((fact, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className={`bg-card border border-border rounded-xl p-4 text-center hover:shadow-md transition-shadow ${colorMap[fact.color]}`}
          >
            <div className="text-2xl mb-1">{fact.icon}</div>
            <div className="font-semibold text-sm text-foreground">{fact.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{fact.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}