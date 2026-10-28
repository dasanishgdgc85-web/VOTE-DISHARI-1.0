import React from "react";
import { motion } from "framer-motion";

export default function HeroSection({ activeTab, setActiveTab, tabs }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-green-50 py-14 px-4 border-b border-border">
      {/* Background decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-saffron/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-india-green/10 rounded-full blur-3xl" />

      </div>

      {/* Tricolor left border accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 flex flex-col">
        <div className="flex-1 bg-saffron" />
        <div className="flex-1 bg-white border-y border-border" />
        <div className="flex-1 bg-india-green" />
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-1 flex flex-col">
        <div className="flex-1 bg-saffron" />
        <div className="flex-1 bg-white border-y border-border" />
        <div className="flex-1 bg-india-green" />
      </div>

      <div className="relative max-w-6xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 bg-white text-gray-800 text-sm px-4 py-1.5 rounded-full mb-5 font-medium border border-border shadow-sm">
            <span>🇮🇳</span>
            <span>India's Democratic Process — Explained Simply</span>
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-3 leading-tight">
            <span className="text-gray-900">Understand How India</span><br />
            <span className="text-orange-600">Elects Its Leaders</span>
          </h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto mb-8">
            From registration to government formation — your complete guide to India's election process.
          </p>
        </motion.div>

        {/* Tab Nav */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-saffron text-white font-bold shadow-md shadow-saffron/30"
                  : "bg-white text-muted-foreground hover:bg-orange-50 hover:text-foreground border border-border shadow-sm"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}