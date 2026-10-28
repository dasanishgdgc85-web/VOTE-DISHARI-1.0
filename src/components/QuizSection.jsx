import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";

const questions = [
  {
    q: "What is the minimum age to vote in India?",
    options: ["16", "18", "21", "25"],
    answer: 1,
    explanation: "Any Indian citizen who is 18 years or older on January 1 of the qualifying year can register to vote under the Representation of the People Act, 1950.",
  },
  {
    q: "What is the full form of ECI?",
    options: ["Election Committee of India", "Electoral Commission of India", "Election Commission of India", "Electoral Control of India"],
    answer: 2,
    explanation: "ECI stands for Election Commission of India — the independent constitutional body that oversees elections in the country.",
  },
  {
    q: "What is an EVM?",
    options: ["Electronic Voter Machine", "Electronic Voting Machine", "Electoral Vote Mechanism", "Election Verification Method"],
    answer: 1,
    explanation: "EVM stands for Electronic Voting Machine. India replaced paper ballots with EVMs nationwide in 1999. They are standalone devices with no internet connectivity.",
  },
  {
    q: "How many seats are there in the Lok Sabha?",
    options: ["250", "450", "543", "650"],
    answer: 2,
    explanation: "The Lok Sabha (House of the People) has 543 directly elected seats. A party needs 272+ seats to form a majority government.",
  },
  {
    q: "What does NOTA stand for?",
    options: ["No Option To Abstain", "None of the Above", "National Order To Abstain", "No Other Time to Act"],
    answer: 1,
    explanation: "NOTA means 'None of the Above'. It was introduced by the Supreme Court of India in 2013, giving voters the option to reject all candidates on the ballot.",
  },
  {
    q: "What is the Model Code of Conduct (MCC)?",
    options: [
      "A legal act passed by Parliament",
      "A set of ECI guidelines that govern parties and candidates during elections",
      "A code of ethics for election officials",
      "A law against bribery in elections",
    ],
    answer: 1,
    explanation: "The MCC is a set of guidelines issued by the ECI when elections are announced. It restricts the ruling government from making policy announcements, and regulates campaign behavior of all parties and candidates.",
  },
  {
    q: "What app can citizens use to report election violations in real-time?",
    options: ["VoteApp", "cVIGIL", "ElectionAlert", "CitizenWatch"],
    answer: 1,
    explanation: "cVIGIL is the ECI's official app that allows citizens to report violations of the Model Code of Conduct, bribery, and other irregularities with geo-tagged photos and videos.",
  },
  {
    q: "Which of the following is NOT a valid ID for voting in India?",
    options: ["Aadhaar Card", "PAN Card", "School Report Card", "MNREGA Job Card"],
    answer: 2,
    explanation: "A school report card is not an accepted ID for voting. The ECI accepts 12 types of photo IDs including Aadhaar, Voter ID, Passport, Driving Licence, PAN Card, and MNREGA Job Card.",
  },
  {
    q: "What is the campaign expenditure limit for a Lok Sabha candidate?",
    options: ["₹25 lakh", "₹50 lakh", "₹95 lakh", "₹2 crore"],
    answer: 2,
    explanation: "As per the latest ECI guidelines, the expenditure limit for a Lok Sabha candidate in larger states is ₹95 lakh. All expenses must be reported to the Returning Officer within 30 days of results.",
  },
  {
    q: "What is VVPAT?",
    options: [
      "Voter Verification Paper Audit Trail",
      "Voter Verifiable Paper Audit Trail",
      "Verified Voter Paper Audit Technology",
      "Voter Validation Paper And Tracking",
    ],
    answer: 1,
    explanation: "VVPAT (Voter Verifiable Paper Audit Trail) is a printer attached to the EVM that shows a paper slip with the candidate's name and symbol after a vote is cast. It disappears into a sealed container for later audit.",
  },
];

export default function QuizSection() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  const q = questions[current];

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswered(false);
  };

  const pct = Math.round((score / questions.length) * 100);

  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="mb-6">
        <h3 className="font-playfair text-2xl font-bold text-foreground mb-1">Election Knowledge Quiz</h3>
        <p className="text-muted-foreground text-sm">Test what you know about India's election process. {questions.length} questions, no pressure!</p>
      </div>

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="bg-card border border-border rounded-2xl p-7"
          >
            {/* Progress */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs text-muted-foreground">Question {current + 1} of {questions.length}</span>
              <span className="text-xs font-semibold text-primary">Score: {score}</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full mb-6 overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((current) / questions.length) * 100}%` }} />
            </div>

            <h4 className="text-lg font-semibold text-foreground mb-5">{q.q}</h4>

            <div className="space-y-2 mb-5">
              {q.options.map((opt, i) => {
                let cls = "border-border bg-muted/40 text-foreground hover:bg-muted";
                if (answered) {
                  if (i === q.answer) cls = "border-green-400 bg-green-50 text-green-800";
                  else if (i === selected) cls = "border-red-400 bg-red-50 text-red-800";
                  else cls = "border-border bg-muted/20 text-muted-foreground";
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={answered}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all flex items-center gap-3 ${cls}`}
                  >
                    <span className="w-6 h-6 rounded-full border border-current/20 flex items-center justify-center text-xs flex-shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                    {answered && i === q.answer && <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />}
                    {answered && i === selected && i !== q.answer && <XCircle className="w-4 h-4 text-red-500 ml-auto" />}
                  </button>
                );
              })}
            </div>

            {answered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-5 text-sm text-foreground/80"
              >
                <span className="font-semibold text-blue-700">📘 Explanation: </span>{q.explanation}
              </motion.div>
            )}

            <button
              onClick={next}
              disabled={!answered}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-all"
            >
              {current + 1 === questions.length ? "See Results" : "Next Question →"}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-2xl p-8 text-center"
          >
            <div className="text-5xl mb-4">
              {pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📚"}
            </div>
            <h4 className="font-playfair text-2xl font-bold mb-2">
              {pct >= 80 ? "Excellent!" : pct >= 50 ? "Good effort!" : "Keep learning!"}
            </h4>
            <p className="text-muted-foreground text-sm mb-6">
              You scored <span className="font-bold text-foreground">{score} out of {questions.length}</span> ({pct}%)
            </p>

            <div className="flex justify-center gap-2 mb-6">
              {questions.map((_, i) => (
                <div key={i} className={`w-2.5 h-2.5 rounded-full`} />
              ))}
            </div>

            <div className={`inline-block px-5 py-2 rounded-full text-sm font-medium mb-6 ${
              pct >= 80 ? "bg-green-100 text-green-700" : pct >= 50 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
            }`}>
              {pct >= 80 ? "You're election-ready! 🗳️" : pct >= 50 ? "Review the timeline for more depth" : "Explore the timeline & glossary to learn more"}
            </div>

            <button
              onClick={reset}
              className="flex items-center gap-2 mx-auto text-sm text-muted-foreground hover:text-foreground border border-border px-4 py-2 rounded-xl hover:bg-muted transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}