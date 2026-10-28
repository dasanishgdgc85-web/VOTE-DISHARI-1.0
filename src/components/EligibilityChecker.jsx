import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, ChevronRight } from "lucide-react";

const questions = [
  {
    id: "citizen",
    question: "Are you a citizen of India?",
    yes: "next",
    no: "ineligible_citizen",
  },
  {
    id: "age",
    question: "Are you 18 years of age or older?",
    yes: "next",
    no: "ineligible_age",
  },
  {
    id: "residence",
    question: "Are you ordinarily residing in the constituency where you want to register?",
    yes: "next",
    no: "info_residence",
  },
  {
    id: "unsound",
    question: "Have you been declared of unsound mind by a competent court?",
    yes: "ineligible_unsound",
    no: "next",
  },
  {
    id: "corrupt",
    question: "Have you been disqualified by a court for corrupt practices or election offences?",
    yes: "ineligible_corrupt",
    no: "next",
  },
  {
    id: "registered",
    question: "Are you already registered as a voter somewhere in India?",
    yes: "info_already",
    no: "eligible",
  },
];

const outcomes = {
  eligible: {
    type: "success",
    icon: CheckCircle,
    title: "You are eligible to vote! 🎉",
    message: "Great news! You meet all the criteria to register as a voter in India.",
    steps: [
      "Visit voters.eci.gov.in or download the Voter Helpline App.",
      "Fill Form 6 online or visit your nearest Booth Level Officer (BLO).",
      "Provide age proof, address proof, and a passport-size photo.",
      "After verification, you'll receive your Voter ID (EPIC) card.",
      "Check your name on the electoral roll before election day!",
    ],
    link: "https://voters.eci.gov.in",
    linkText: "Register on NVSP →",
  },
  ineligible_citizen: {
    type: "error",
    icon: XCircle,
    title: "Not eligible to vote",
    message: "Only Indian citizens can vote in Indian elections. Non-citizens, including foreign nationals, are not eligible.",
    steps: [],
  },
  ineligible_age: {
    type: "warning",
    icon: AlertCircle,
    title: "Not yet eligible — but almost there!",
    message: "You must be at least 18 years old by January 1 of the qualifying year to register as a voter.",
    steps: [
      "Mark your 18th birthday on your calendar.",
      "Register as soon as you turn 18 using Form 6 on voters.eci.gov.in.",
      "The electoral roll is updated annually — don't miss the deadline!",
    ],
  },
  ineligible_unsound: {
    type: "error",
    icon: XCircle,
    title: "Not eligible at this time",
    message: "Persons declared of unsound mind by a competent court are not eligible to vote under the Representation of the People Act, 1950.",
    steps: [],
  },
  ineligible_corrupt: {
    type: "error",
    icon: XCircle,
    title: "Not eligible at this time",
    message: "Individuals disqualified by court for corrupt practices or election offences cannot be registered as voters during the period of disqualification.",
    steps: [],
  },
  info_residence: {
    type: "warning",
    icon: AlertCircle,
    title: "You can still register — with the right constituency",
    message: "You must register in the constituency where you are ordinarily residing. If you live in Mumbai but are registered in Chennai, you need to transfer your registration.",
    steps: [
      "Use Form 8A to transfer your voter registration to your new address.",
      "Visit voters.eci.gov.in to update your details.",
      "Bring address proof for your current residence.",
    ],
  },
  info_already: {
    type: "warning",
    icon: AlertCircle,
    title: "Check your existing registration",
    message: "If you are already registered, there's no need to re-register. However, update your details if you've moved.",
    steps: [
      "Verify your registration at voters.eci.gov.in.",
      "If you've changed address, file Form 8A for transfer.",
      "If your details are incorrect, file Form 8 for correction.",
      "Use the Voter Helpline App or call 1950 for assistance.",
    ],
  },
};

export default function EligibilityChecker() {
  const [step, setStep] = useState(0);
  const [outcome, setOutcome] = useState(null);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (answer) => {
    const q = questions[step];
    const next = answer === "yes" ? q.yes : q.no;
    setAnswers([...answers, { q: q.question, a: answer }]);

    if (next === "next") {
      if (step + 1 < questions.length) setStep(step + 1);
      else setOutcome("eligible");
    } else if (next === "eligible") {
      setOutcome("eligible");
    } else {
      setOutcome(next);
    }
  };

  const reset = () => {
    setStep(0);
    setOutcome(null);
    setAnswers([]);
  };

  const current = questions[step];
  const result = outcome ? outcomes[outcome] : null;

  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="mb-8">
        <h3 className="font-playfair text-2xl font-bold text-foreground mb-1">Voter Eligibility Checker</h3>
        <p className="text-muted-foreground text-sm">Answer a few quick questions to find out if you're eligible to vote in India.</p>
      </div>

      <AnimatePresence mode="wait">
        {!outcome ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            {/* Progress */}
            <div className="flex gap-1.5 mb-8">
              {questions.map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? "bg-primary" : "bg-muted"}`} />
              ))}
            </div>

            <p className="text-xs text-muted-foreground mb-2">Question {step + 1} of {questions.length}</p>
            <h4 className="text-xl font-semibold text-foreground mb-8">{current.question}</h4>

            <div className="flex gap-4">
              <button
                onClick={() => handleAnswer("yes")}
                className="flex-1 py-3 rounded-xl bg-india-green text-white font-semibold text-sm hover:opacity-90 transition-all"
              >
                ✓ Yes
              </button>
              <button
                onClick={() => handleAnswer("no")}
                className="flex-1 py-3 rounded-xl bg-muted text-foreground font-semibold text-sm hover:bg-border transition-all border border-border"
              >
                ✗ No
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-sm font-medium ${
              result.type === "success" ? "bg-green-100 text-green-700" :
              result.type === "error" ? "bg-red-100 text-red-700" :
              "bg-yellow-100 text-yellow-700"
            }`}>
              <result.icon className="w-4 h-4" />
              {result.type === "success" ? "Eligible" : result.type === "error" ? "Not Eligible" : "Action Needed"}
            </div>

            <h4 className="text-xl font-bold text-foreground mb-2">{result.title}</h4>
            <p className="text-muted-foreground text-sm mb-5">{result.message}</p>

            {result.steps.length > 0 && (
              <div className="bg-muted rounded-xl p-4 mb-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Next Steps</p>
                <ul className="space-y-2">
                  {result.steps.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.link && (
              <a
                href={result.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all mb-4"
              >
                {result.linkText}
              </a>
            )}

            <div>
              <button onClick={reset} className="text-sm text-muted-foreground hover:text-foreground underline">
                Start over
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}