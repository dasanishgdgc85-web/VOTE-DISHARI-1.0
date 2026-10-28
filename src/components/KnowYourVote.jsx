import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ShieldCheck, Phone, ExternalLink, Search, CheckCircle2, Info, Clock, Home } from "lucide-react";

const VALID_IDS = [
  "Voter ID Card (EPIC)",
  "Aadhaar Card",
  "Passport",
  "Driving License",
  "PAN Card",
  "MNREGA Job Card",
  "Smart Card issued by RGI (NPR)",
  "Pension documents with photo",
  "Bank / Post Office passbook with photo",
  "Service ID card (Central / State Govt)",
  "Health Insurance Smart Card (ESIC / RSBY)",
  "Official identity card issued by PSUs",
];

const POLLING_ESSENTIALS = [
  { icon: Clock, label: "Polling hours", value: "7:00 AM – 6:00 PM" },
  { icon: MapPin, label: "Where to vote", value: "Your assigned booth only" },
  { icon: Info, label: "In queue at close?", value: "You can still vote" },
  { icon: Home, label: "On election day", value: "Paid holiday from work" },
];

export default function KnowYourVote() {
  const [state, setState] = useState("");
  const [epic, setEpic] = useState("");
  const [checkedIds, setCheckedIds] = useState({});

  const openEci = (url) => window.open(url, "_blank", "noopener,noreferrer");

  const handleFindBooth = () => {
    const params = new URLSearchParams();
    if (state.trim()) params.set("state", state.trim());
    if (epic.trim()) params.set("epic_no", epic.trim().toUpperCase());
    const query = params.toString() ? `?${params.toString()}` : "";
    openEci(`https://electoralsearch.eci.gov.in/${query}`);
  };

  const toggleId = (id) => setCheckedIds((p) => ({ ...p, [id]: !p[id] }));
  const idCount = Object.values(checkedIds).filter(Boolean).length;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      {/* Intro */}
      <div className="bg-gradient-to-br from-orange-50 via-white to-green-50 border border-border rounded-xl p-5">
        <h3 className="font-playfair text-xl font-bold text-gray-900 flex items-center gap-2">
          🗳️ Know Your Vote
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Find your polling station, check your voter registration, and make sure you carry the right ID on election day.
        </p>
      </div>

      {/* Polling Station Finder */}
      <section className="bg-white border border-border rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="w-4 h-4 text-saffron" />
          <h4 className="font-semibold text-foreground">Find Your Polling Station</h4>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Enter your details to look up your assigned booth on the official Election Commission of India portal.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-xs font-medium text-foreground">State / UT</label>
            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="e.g. Maharashtra"
              className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-foreground">EPIC Number (optional)</label>
            <input
              value={epic}
              onChange={(e) => setEpic(e.target.value)}
              placeholder="e.g. ABC1234567"
              className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleFindBooth}
            className="inline-flex items-center gap-2 bg-saffron text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition shadow-sm"
          >
            <Search className="w-4 h-4" /> Find My Polling Station
          </button>
          <button
            onClick={() => openEci("https://voters.eci.gov.in/")}
            className="inline-flex items-center gap-2 bg-white border border-border text-foreground text-sm font-medium px-4 py-2 rounded-lg hover:bg-orange-50 transition"
          >
            Voter Portal <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Don't know your EPIC number? You can also search by name on the portal.
        </p>
      </section>

      {/* Registration Status */}
      <section className="bg-white border border-border rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-4 h-4 text-india-green" />
          <h4 className="font-semibold text-foreground">Check Your Voter Registration</h4>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Confirm your name is on the electoral roll before heading to vote.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => openEci("https://electoralsearch.eci.gov.in/")}
            className="inline-flex items-center gap-2 bg-india-green text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition shadow-sm"
          >
            <Search className="w-4 h-4" /> Search Electoral Roll
          </button>
          <button
            onClick={() => openEci("https://voters.eci.gov.in/")}
            className="inline-flex items-center gap-2 bg-white border border-border text-foreground text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-50 transition"
          >
            Register / Update Details <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Valid IDs */}
      <section className="bg-white border border-border rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-india-blue" />
            <h4 className="font-semibold text-foreground">Valid ID Checklist</h4>
          </div>
          <span className="text-xs font-medium text-muted-foreground">{idCount} selected</span>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Carry any <span className="font-semibold">one</span> of these 12 photo IDs to vote. Tap to mark what you have.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {VALID_IDS.map((id) => (
            <button
              key={id}
              onClick={() => toggleId(id)}
              className={`flex items-center gap-2 text-left text-sm px-3 py-2 rounded-lg border transition ${
                checkedIds[id]
                  ? "bg-india-green/10 border-india-green text-foreground"
                  : "bg-white border-border hover:bg-muted/40 text-foreground/80"
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${checkedIds[id] ? "text-india-green" : "text-muted-foreground/40"}`} />
              {id}
            </button>
          ))}
        </div>
        {idCount > 0 && (
          <p className="text-xs text-india-green mt-3 font-medium">
            ✅ You're ready with a valid ID — you can vote!
          </p>
        )}
      </section>

      {/* Polling Essentials */}
      <section className="bg-white border border-border rounded-xl p-5 shadow-sm">
        <h4 className="font-semibold text-foreground mb-3">Polling Day Essentials</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {POLLING_ESSENTIALS.map((e) => (
            <div key={e.label} className="flex items-start gap-3 bg-muted/30 rounded-lg p-3 border border-border/50">
              <e.icon className="w-4 h-4 text-saffron flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">{e.label}</p>
                <p className="text-sm font-medium text-foreground">{e.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-4 bg-orange-50 border border-saffron/30 rounded-lg p-3">
          <Phone className="w-4 h-4 text-saffron flex-shrink-0" />
          <p className="text-xs text-foreground">
            <span className="font-semibold">Voter Helpline:</span> Call <a href="tel:1950" className="text-saffron font-semibold underline">1950</a> for any election-related assistance.
          </p>
        </div>
      </section>
    </motion.div>
  );
}