import React, { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ElectionTimeline from "@/components/ElectionTimeline";
import ChatAssistant from "@/components/ChatAssistant";
import QuickFacts from "@/components/QuickFacts";
import GlossarySection from "@/components/GlossarySection";
import FAQSection from "@/components/FAQSection";
import VoterChecklist from "@/components/VoterChecklist";
import EligibilityChecker from "@/components/EligibilityChecker";
import QuizSection from "@/components/QuizSection";
import ElectionDashboard from "@/components/ElectionDashboard";

const TABS = [
  { id: "dashboard", label: "📊 Dashboard" },
  { id: "timeline", label: "📅 Timeline" },
  { id: "eligibility", label: "✅ Am I Eligible?" },
  { id: "checklist", label: "📋 Voter Checklist" },
  { id: "quiz", label: "🧠 Quiz" },
  { id: "glossary", label: "📖 Glossary" },
  { id: "faq", label: "❓ FAQ" },
  { id: "chat", label: "💬 Ask AI" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection activeTab={activeTab} setActiveTab={setActiveTab} tabs={TABS} />

      <main className="relative z-10 max-w-6xl mx-auto px-4 pb-20">
        {activeTab === "dashboard" && <ElectionDashboard />}
        {activeTab === "timeline" && (
          <>
            <QuickFacts />
            <ElectionTimeline />
          </>
        )}
        {activeTab === "eligibility" && <EligibilityChecker />}
        {activeTab === "checklist" && <VoterChecklist />}
        {activeTab === "quiz" && <QuizSection />}
        {activeTab === "glossary" && <GlossarySection />}
        {activeTab === "faq" && <FAQSection />}
        {activeTab === "chat" && <ChatAssistant />}
      </main>
    </div>
  );
}