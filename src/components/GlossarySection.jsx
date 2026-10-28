import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const glossaryTerms = [
  { term: "Affidavit", category: "Candidates", definition: "A sworn legal declaration filed by every candidate disclosing their criminal record, assets, liabilities, and educational qualifications. Accessible publicly on the ECI website." },
  { term: "Ballot", category: "Voting", definition: "The means by which a voter makes their choice. In India, this is done electronically via EVMs." },
  { term: "Booth Level Officer (BLO)", category: "Administration", definition: "A government official responsible for maintaining the electoral roll for a specific polling booth area and verifying voter details during registration." },
  { term: "By-Election", category: "Election Types", definition: "An election held in a single constituency to fill a vacancy that arises mid-term, for example when an MP or MLA dies, resigns, or is disqualified." },
  { term: "Campaign Silence Period", category: "Campaigning", definition: "The mandatory 48-hour period before polling begins during which all campaigning, rallies, and public meetings must cease." },
  { term: "Candidate", category: "Candidates", definition: "A person who stands for election in a constituency. Candidates can be nominated by a political party or contest independently." },
  { term: "Chief Election Commissioner (CEC)", category: "Administration", definition: "The head of the Election Commission of India. Appointed by the President and holds constitutional protections similar to a Supreme Court judge." },
  { term: "Coalition Government", category: "Government", definition: "A government formed when no single party wins an outright majority (272+ Lok Sabha seats). Multiple parties come together and agree to govern collectively." },
  { term: "Constituency", category: "Voting", definition: "A geographical area whose registered voters elect a single representative to the Lok Sabha or State Assembly. India has 543 Lok Sabha constituencies." },
  { term: "Counting Center", category: "Counting", definition: "A secure, designated location where EVMs are brought and votes are counted on counting day under ECI supervision." },
  { term: "Counting Agent", category: "Counting", definition: "A representative appointed by a candidate to observe and verify the counting process at the counting center." },
  { term: "cVIGIL", category: "Technology", definition: "The ECI's mobile app that allows citizens to report electoral violations — such as cash distribution, liquor bribes, or MCC violations — with geo-tagged evidence." },
  { term: "Deputy Election Commissioner", category: "Administration", definition: "Senior IAS officer assisting the Election Commissioners in planning and supervising the election process." },
  { term: "Election Commission of India (ECI)", category: "Administration", definition: "The independent constitutional body established in 1950 that conducts free and fair elections in India. It has three members: the Chief Election Commissioner and two Election Commissioners." },
  { term: "Electoral Roll", category: "Registration", definition: "The official list of all registered voters in a constituency. Only those whose names appear on this list can vote. Updated annually." },
  { term: "Electoral Bond", category: "Funding", definition: "Financial instruments introduced in 2018 (struck down by Supreme Court in 2024) that allowed anonymous donations to political parties." },
  { term: "EPIC", category: "Registration", definition: "Elector Photo Identity Card — the commonly known 'Voter ID Card' issued by the ECI. Not mandatory for voting (12 other IDs accepted), but serves as a key identity document." },
  { term: "EVM (Electronic Voting Machine)", category: "Technology", definition: "The tamper-proof electronic device used in Indian elections since 1999. Standalone (no internet/Bluetooth), battery-powered, and can record up to 2,000 votes." },
  { term: "Exit Poll", category: "Media", definition: "A survey of voters conducted immediately after they have voted, used to predict election outcomes. Banned from broadcast until the last phase of polling closes." },
  { term: "Form 6", category: "Registration", definition: "The application form used by new voters to register themselves on the electoral roll. Available online on NVSP or as a physical form at ERO offices." },
  { term: "Form 7", category: "Registration", definition: "Used to object to a name being incorrectly included on the electoral roll — for example, if a deceased person is still listed." },
  { term: "Form 8", category: "Registration", definition: "Used to update existing voter details such as name, address corrections, photo update, or PwD status on the electoral roll." },
  { term: "Form 8A", category: "Registration", definition: "Used to transfer voter registration from one constituency to another when a voter has moved to a new location." },
  { term: "General Election", category: "Election Types", definition: "The nationwide election to elect all 543 members of the Lok Sabha. Held every 5 years. Also referred to as Lok Sabha elections or Parliamentary elections." },
  { term: "Hung Parliament", category: "Government", definition: "A situation where no single party or pre-poll alliance wins a majority of seats (272+) in the 543-seat Lok Sabha, requiring coalition negotiations." },
  { term: "Indelible Ink", category: "Voting", definition: "Purple-black ink applied to the left index finger of a voter after they cast their vote. Made by Mysore Paints & Varnish Ltd. to prevent double-voting." },
  { term: "Lok Sabha", category: "Parliament", definition: "The lower house of India's Parliament, also called the 'House of the People'. 543 members are directly elected by voters. The PM and Council of Ministers are accountable to it." },
  { term: "MCMC", category: "Media", definition: "Media Certification & Monitoring Committee — certifies all paid political advertisements on TV and radio before broadcast during elections." },
  { term: "MLA (Member of the Legislative Assembly)", category: "Candidates", definition: "An elected representative in a state's Legislative Assembly. Elected by voters of a state constituency in State Assembly elections." },
  { term: "Model Code of Conduct (MCC)", category: "Rules", definition: "A set of ECI guidelines that come into force the moment elections are announced. Restricts the ruling government from announcing new schemes and regulates the conduct of all parties and candidates." },
  { term: "MP (Member of Parliament)", category: "Candidates", definition: "An elected representative in the Lok Sabha. Elected by voters of a Lok Sabha constituency in General Elections." },
  { term: "NOTA", category: "Voting", definition: "'None of the Above' — an option on the EVM introduced by the Supreme Court in 2013 that lets voters reject all candidates on the ballot without spoiling their vote." },
  { term: "NVSP", category: "Technology", definition: "National Voters' Service Portal (voters.eci.gov.in) — the official government website for voter registration, checking the electoral roll, and applying for Voter ID." },
  { term: "Presiding Officer", category: "Administration", definition: "The officer in charge of a polling station on polling day. Responsible for managing the voting process and ensuring fairness." },
  { term: "Rajya Sabha", category: "Parliament", definition: "The upper house of India's Parliament, also called the 'Council of States'. Members are indirectly elected by state legislative assemblies, not directly by the public." },
  { term: "Returning Officer (RO)", category: "Administration", definition: "A senior government officer appointed by the ECI for each constituency. Manages nominations, oversees polling, and officially declares the election result." },
  { term: "Security Deposit", category: "Candidates", definition: "A refundable deposit paid by candidates when filing their nomination: ₹25,000 for Lok Sabha (₹12,500 for SC/ST). Forfeited if the candidate gets less than 1/6th of total votes." },
  { term: "State Assembly Election (Vidhan Sabha)", category: "Election Types", definition: "Elections held to elect members of a state's Legislative Assembly. Separate from general elections but follow the same ECI process. Also held every 5 years." },
  { term: "Vote of No Confidence", category: "Government", definition: "A motion in the Lok Sabha that, if passed by a majority, forces the Prime Minister and entire Cabinet to resign. Can trigger a mid-term Lok Sabha election." },
  { term: "VVPAT", category: "Technology", definition: "Voter Verifiable Paper Audit Trail — a printer attached to the EVM that shows a paper slip with the candidate's name and symbol after a vote is cast. The slip falls into a sealed container visible to the voter for 7 seconds." },
];

const categories = ["All", ...Array.from(new Set(glossaryTerms.map((t) => t.category))).sort()];

export default function GlossarySection() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return glossaryTerms.filter((t) => {
      const matchCat = activeCategory === "All" || t.category === activeCategory;
      const matchSearch = t.term.toLowerCase().includes(search.toLowerCase()) || t.definition.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="mb-6">
        <h3 className="font-playfair text-2xl font-bold text-foreground mb-1">Election Glossary</h3>
        <p className="text-muted-foreground text-sm">{glossaryTerms.length}+ key terms explained simply. Search or filter by category.</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search terms or definitions..."
          className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-card hover:text-foreground border border-border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Terms */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-10 text-sm">No terms found. Try a different search or category.</p>
        ) : (
          filtered.map((t, i) => (
            <motion.div
              key={t.term}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
              className="bg-card border border-border rounded-xl px-5 py-4"
            >
              <div className="flex flex-wrap items-start gap-2 mb-1">
                <span className="font-semibold text-foreground text-sm">{t.term}</span>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{t.category}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.definition}</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}