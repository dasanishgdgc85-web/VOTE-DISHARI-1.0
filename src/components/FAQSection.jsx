import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const faqs = [
  {
    category: "Registration",
    q: "How do I register to vote in India?",
    a: "Visit voters.eci.gov.in or install the Voter Helpline App. Fill Form 6 with your details — you'll need age proof (birth certificate or Class 10 marksheet), address proof (Aadhaar, utility bill), and a passport-size photograph. You can also register offline by visiting your Booth Level Officer (BLO) or Electoral Registration Officer (ERO). After submission, a BLO may visit for field verification, after which your name will appear on the electoral roll.",
  },
  {
    category: "Registration",
    q: "When is the last date to register before an election?",
    a: "The voter registration roll is updated annually with a cutoff date of January 1 each year. However, you can register as a special voter up to the date specified by the ECI before each election. Check voters.eci.gov.in for the exact deadline before each election. Registrations after the freeze date will be valid for the next election cycle.",
  },
  {
    category: "Registration",
    q: "I've moved to a new city. Do I need to re-register?",
    a: "Yes, but you don't start from scratch. File Form 8A on voters.eci.gov.in to transfer your voter registration from your old constituency to your new one. You'll need to provide your current address proof. You cannot vote in a constituency you don't reside in.",
  },
  {
    category: "Registration",
    q: "Can NRIs (Non-Resident Indians) vote in Indian elections?",
    a: "Yes! NRIs can register as overseas voters using Form 6A on voters.eci.gov.in. However, overseas voters must be physically present at their registered constituency polling booth to vote — there is currently no provision for postal or online voting for NRIs.",
  },
  {
    category: "Eligibility",
    q: "Am I eligible to vote if I have a criminal record?",
    a: "A criminal record alone does not disqualify you from voting. You lose your right to vote only if you have been specifically disqualified by a court for corrupt practices or election offences under the Representation of the People Act. Being convicted of other crimes does not affect your right to vote.",
  },
  {
    category: "Eligibility",
    q: "Can a person with disabilities vote?",
    a: "Absolutely. The ECI makes special provisions for Persons with Disabilities (PwD): accessible polling booths with ramps and wheelchairs, Braille-enabled EVMs for visually impaired voters, priority entry at booths, and the option to apply for postal ballot (Form 12D) to vote from home. PwD voters can also register their disability status on their voter profile.",
  },
  {
    category: "Polling Day",
    q: "What do I bring to the polling booth on voting day?",
    a: "Carry any one valid photo ID. The ECI accepts 12 types: Voter ID (EPIC), Aadhaar card, Passport, Driving Licence, PAN Card, MNREGA Job Card, Smart Card issued by Registrar General of India, Pension document with photo, Bank/Post Office passbook with photo, Health Insurance Smart Card (ESIC), Service Identity Card from Central/State government. Your employer is legally required to give you a paid holiday on polling day.",
  },
  {
    category: "Polling Day",
    q: "What if my name is on the electoral roll but I lost my Voter ID card?",
    a: "No problem. You can vote using any of the 12 accepted photo IDs (Aadhaar, Passport, Driving Licence, PAN Card, etc.). You can also download an e-EPIC (digital Voter ID) from voters.eci.gov.in or the Voter Helpline App. What matters is that your name is on the electoral roll for that specific booth.",
  },
  {
    category: "Polling Day",
    q: "Can I vote at any polling booth, or only my assigned one?",
    a: "You must vote at your assigned polling booth — the one corresponding to your registered address. You cannot vote at a different booth, even if it's closer to you. Find your booth at voters.eci.gov.in by entering your voter details.",
  },
  {
    category: "Polling Day",
    q: "What are the voting hours on polling day?",
    a: "Polling booths are generally open from 7:00 AM to 6:00 PM. Some booths in remote areas may have different timings. Crucially, if you are standing in the queue before 6:00 PM, you are entitled to vote — the booth cannot close until every person in the queue has voted.",
  },
  {
    category: "EVMs & Voting",
    q: "How does the Electronic Voting Machine (EVM) work?",
    a: "The EVM is a standalone electronic device with two units: the Ballot Unit (with candidate buttons) and the Control Unit (operated by the Presiding Officer). You press the button next to your chosen candidate's name and symbol. A single long beep confirms your vote. The EVM is not connected to the internet, Bluetooth, or any network — it cannot be hacked remotely. Results are stored in a tamper-proof memory chip.",
  },
  {
    category: "EVMs & Voting",
    q: "What is VVPAT and how does it work?",
    a: "VVPAT (Voter Verifiable Paper Audit Trail) is a printer unit attached to the EVM. After you press your candidate's button, a paper slip with the candidate's name, serial number, and election symbol appears in the transparent window of the VVPAT for 7 seconds — allowing you to verify your vote. The slip then automatically falls into a sealed box. These slips can be counted for audits.",
  },
  {
    category: "EVMs & Voting",
    q: "What is NOTA and should I use it?",
    a: "NOTA (None of the Above) is the last option on the EVM, introduced by a Supreme Court order in 2013. It lets you formally reject all candidates without spoiling your ballot. Important: NOTA votes are counted and published, but they do not cancel the election. Even if NOTA gets the most votes, the candidate with the highest valid votes wins. However, high NOTA percentages send a powerful democratic signal to political parties.",
  },
  {
    category: "Campaign & Conduct",
    q: "What is the Model Code of Conduct (MCC)?",
    a: "The MCC is a set of ECI guidelines that comes into force the moment the election schedule is announced. It applies to all political parties, candidates, and the ruling government. Key restrictions: no new government schemes, no use of public resources for campaigning, no communal speeches, no bribery of voters. The MCC is not a statutory law but ECI can enforce it strictly, including recommending FIRs and disqualifications.",
  },
  {
    category: "Campaign & Conduct",
    q: "Someone offered me money/gifts to vote. What should I do?",
    a: "This is a serious election offense called 'bribery of voters' under the Representation of the People Act. You can report it immediately using the ECI's cVIGIL app — take a photo or video and report with location. You can also call the election helpline 1950 or report to your local police or Flying Squad deployed by the ECI. You are protected from retaliation for making such a report.",
  },
  {
    category: "Campaign & Conduct",
    q: "How is campaign expenditure monitored?",
    a: "Every candidate must maintain a daily record of all campaign expenses and submit it to the Returning Officer within 30 days of election results. The ECI appoints Election Expenditure Observers and deploys flying squads and surveillance teams to monitor cash distribution. The limit is ₹95 lakh for Lok Sabha candidates (larger states). Exceeding this limit can result in disqualification.",
  },
  {
    category: "Results & Government",
    q: "How is a winner declared?",
    a: "The candidate with the highest number of valid votes in a constituency wins — this is the First Past the Post (FPTP) system. Even a margin of one vote is a valid win. The Returning Officer announces the result after all rounds of counting are complete. Losers can request a recount, but must provide valid grounds.",
  },
  {
    category: "Results & Government",
    q: "How does the Prime Minister come to power?",
    a: "India follows a Parliamentary Democracy — voters do not directly elect the PM. You vote for your local MP. The party or coalition that wins 272+ Lok Sabha seats forms the government. Their leader (chosen by their party) is invited by the President to become Prime Minister. The PM is then sworn in at Rashtrapati Bhavan along with the Council of Ministers.",
  },
  {
    category: "Results & Government",
    q: "What happens if no party wins a majority?",
    a: "This results in a 'Hung Parliament'. The President invites the single largest party or coalition to prove majority on the Lok Sabha floor. Coalition negotiations take place among parties to form an alliance. If no group can form a stable majority, the President may call fresh elections (mid-term elections). India had coalition governments for much of the period from 1989 to 2014.",
  },
  {
    category: "Voter Rights",
    q: "Can my employer stop me from voting?",
    a: "No. Section 135B of the Representation of the People Act, 1951 gives every employed voter the right to a paid holiday on polling day. Your employer cannot deduct salary or take disciplinary action for this absence. If you face such issues, you can report to the ECI or contact the National Human Rights Commission (NHRC).",
  },
  {
    category: "Voter Rights",
    q: "Can I be turned away from the polling booth?",
    a: "You can only be turned away if: your name is not on the electoral roll of that booth, you fail to produce any valid ID, or you have already voted (indelible ink mark present). If you are in the queue before the closing time, you cannot be turned away — even if the time limit passes while you are waiting. If you believe you've been wrongly denied, contact the Presiding Officer or call 1950.",
  },
];

const categories = ["All", ...Array.from(new Set(faqs.map((f) => f.category))).sort()];

export default function FAQSection() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() => {
    return faqs.filter((f) => {
      const matchCat = activeCategory === "All" || f.category === activeCategory;
      const matchSearch = f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="mb-6">
        <h3 className="font-playfair text-2xl font-bold text-foreground mb-1">Frequently Asked Questions</h3>
        <p className="text-muted-foreground text-sm">{faqs.length} common questions about India's election process, answered clearly.</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search questions..."
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

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-10 text-sm">No FAQs match your search.</p>
      ) : (
        <div className="space-y-2">
          {filtered.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <button
                className="w-full text-left px-5 py-4 flex items-start gap-3"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full mt-0.5 flex-shrink-0">{faq.category}</span>
                <span className="flex-1 font-medium text-sm text-foreground">{faq.q}</span>
                {expanded === i ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />}
              </button>
              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}