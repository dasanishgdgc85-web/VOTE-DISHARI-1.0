import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckSquare, Square, Info } from "lucide-react";

const checklistSections = [
  {
    title: "Before Election Day — Registration",
    color: "blue",
    items: [
      { text: "Check if your name is on the Electoral Roll at voters.eci.gov.in", tip: "Search by name or Voter ID number. Do this at least 2 weeks before Election Day." },
      { text: "Register to vote using Form 6 (if not already registered)", tip: "Available on NVSP portal. Requires age proof, address proof, and a photo." },
      { text: "Update your address using Form 8A if you've moved", tip: "You must be registered in the constituency where you currently reside." },
      { text: "Correct errors in your voter details using Form 8", tip: "Name, photo, DOB corrections can be done online on voters.eci.gov.in." },
      { text: "Download your Voter ID slip or verify your EPIC card", tip: "You can use Aadhaar, passport, or 10+ other IDs if you don't have a Voter ID card." },
      { text: "Install the Voter Helpline App or save helpline 1950", tip: "For any election-related queries, the 1950 helpline is free and available in multiple languages." },
    ],
  },
  {
    title: "A Week Before Polling Day",
    color: "yellow",
    items: [
      { text: "Find out your exact polling booth address", tip: "Your booth is assigned based on your registered address — usually within 2 km." },
      { text: "Check the date and phase of polling for your constituency", tip: "Elections are held in multiple phases. Confirm your constituency's polling date on the ECI website." },
      { text: "Prepare your valid photo ID document to carry", tip: "Accepted IDs: Voter ID, Aadhaar, Passport, Driving Licence, PAN Card, MNREGA Job Card, Smart Card (RGI), Pension Document, Bank/Post Office passbook with photo, or service identity card." },
      { text: "Plan your route to the polling booth", tip: "Identify transport options. Note that party vehicles or buses cannot legally transport voters on polling day." },
      { text: "Inform your employer you need time off (it's a paid holiday)", tip: "Section 135B of the Representation of the People Act, 1951 entitles all employees to a paid holiday on polling day." },
      { text: "If you have a disability, apply for postal ballot or special assistance", tip: "PwD voters and senior citizens (85+) can apply for home voting via Form 12D at their local Electoral Registration Office." },
    ],
  },
  {
    title: "On Polling Day",
    color: "green",
    items: [
      { text: "Carry your valid photo ID document", tip: "Do not forget this — you cannot vote without verification." },
      { text: "Arrive early to avoid long queues — booths open at 7:00 AM", tip: "If you are in the queue before closing time (usually 6 PM), you are entitled to vote." },
      { text: "Locate the correct booth (your name must be on that booth's list)", tip: "You cannot vote at a different booth, even if it's nearby." },
      { text: "Wait for the Presiding Officer to verify your identity", tip: "Do not be intimidated — this is standard procedure. Be patient." },
      { text: "Get the indelible ink mark on your left index finger", tip: "This prevents double-voting. It's made by Mysore Paints and stays for days." },
      { text: "Use the EVM — press the button next to your chosen candidate", tip: "A beep confirms your vote. You have as much time as you need inside the voting compartment." },
      { text: "Verify the VVPAT slip to confirm your vote", tip: "A paper slip will briefly appear in the VVPAT machine next to the EVM showing your candidate's name and symbol." },
      { text: "You may choose NOTA if you don't want to vote for any candidate", tip: "NOTA (None of the Above) is the last option on the EVM, introduced by the Supreme Court in 2013." },
    ],
  },
  {
    title: "After Voting",
    color: "purple",
    items: [
      { text: "Share your experience with friends and family to encourage them", tip: "India has a huge non-voting population due to apathy. Your encouragement matters." },
      { text: "Report any election violations to the cVIGIL app", tip: "The ECI's cVIGIL app allows citizens to report bribery, MCC violations, and polling irregularities with geo-tagged photos." },
      { text: "Follow the results on the ECI website or official news", tip: "results.eci.gov.in publishes live constituency-level results on counting day." },
      { text: "Understand your right to file a complaint about the election process", tip: "Any candidate or voter can challenge an election result via an Election Petition filed in the High Court within 45 days of declaration." },
    ],
  },
];

const colorMap = {
  blue: { bg: "bg-blue-50", border: "border-blue-200", label: "bg-blue-100 text-blue-700", check: "text-blue-600" },
  yellow: { bg: "bg-yellow-50", border: "border-yellow-200", label: "bg-yellow-100 text-yellow-800", check: "text-yellow-600" },
  green: { bg: "bg-green-50", border: "border-green-200", label: "bg-green-100 text-green-700", check: "text-green-600" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", label: "bg-purple-100 text-purple-700", check: "text-purple-600" },
};

export default function VoterChecklist() {
  const [checked, setChecked] = useState({});
  const [expandedTip, setExpandedTip] = useState(null);

  const toggle = (key) => setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  const totalItems = checklistSections.reduce((acc, s) => acc + s.items.length, 0);
  const totalChecked = Object.values(checked).filter(Boolean).length;

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="mb-6">
        <h3 className="font-playfair text-2xl font-bold text-foreground mb-1">Voter Preparation Checklist</h3>
        <p className="text-muted-foreground text-sm">Everything you need to do to vote confidently in India. Tap each item to mark it done.</p>
      </div>

      {/* Progress Bar */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>Your progress</span>
            <span>{totalChecked} / {totalItems} completed</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-india-green rounded-full transition-all duration-500"
              style={{ width: `${(totalChecked / totalItems) * 100}%` }}
            />
          </div>
        </div>
        {totalChecked === totalItems && (
          <span className="text-2xl animate-bounce">🎉</span>
        )}
      </div>

      <div className="space-y-6">
        {checklistSections.map((section, si) => {
          const c = colorMap[section.color];
          return (
            <motion.div
              key={si}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: si * 0.08 }}
              className={`rounded-xl border ${c.border} ${c.bg}`}
            >
              <div className="px-5 py-4 border-b border-current/10">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.label}`}>{section.title}</span>
              </div>
              <ul className="p-3 space-y-1">
                {section.items.map((item, ii) => {
                  const key = `${si}-${ii}`;
                  const isChecked = checked[key];
                  const tipOpen = expandedTip === key;
                  return (
                    <li key={ii} className="rounded-lg bg-white/50 overflow-hidden">
                      <div className="flex items-start gap-3 px-3 py-3">
                        <button onClick={() => toggle(key)} className={`mt-0.5 flex-shrink-0 ${c.check}`}>
                          {isChecked ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-muted-foreground" />}
                        </button>
                        <span
                          className={`flex-1 text-sm cursor-pointer transition-all ${isChecked ? "line-through text-muted-foreground" : "text-foreground"}`}
                          onClick={() => toggle(key)}
                        >
                          {item.text}
                        </span>
                        <button
                          onClick={() => setExpandedTip(tipOpen ? null : key)}
                          className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>
                      {tipOpen && (
                        <div className="px-4 pb-3 ml-8">
                          <p className="text-xs text-muted-foreground bg-muted rounded-lg px-3 py-2">{item.tip}</p>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}