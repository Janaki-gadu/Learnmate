import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, ArrowLeft } from "lucide-react";

const sampleQuestions = [
  {
    id: 1,
    category: "JavaScript",
    question: "What is the output of `typeof NaN` in JavaScript?",
    options: ["undefined", "object", "number", "string"],
    correctIndex: 2,
  },
  {
    id: 2,
    category: "React",
    question: "Which hook is used to execute side effects in a functional component?",
    options: ["useState", "useMemo", "useContext", "useEffect"],
    correctIndex: 3,
  },
  {
    id: 3,
    category: "MongoDB",
    question: "In MongoDB, what is a collection analogous to in relational databases?",
    options: ["Row", "Table", "Column", "Schema"],
    correctIndex: 1,
  },
  {
    id: 4,
    category: "Node.js",
    question: "Which module is used to handle file path operations in Node.js?",
    options: ["fs", "path", "http", "os"],
    correctIndex: 1,
  },
];

export default function Quiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showScore, setShowScore] = useState(false);

  const currentQ = sampleQuestions[currentIdx];
  const isLastQuestion = currentIdx === sampleQuestions.length - 1;
  const isAnswered = selectedAnswers[currentIdx] !== undefined;

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: idx }));
  };

  const calculateScore = () => {
    let score = 0;
    sampleQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctIndex) score += 1;
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowScore(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          <Header />

          {/* Title */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Knowledge Quiz</h1>
            <p className="text-gray-500 mt-2 text-lg">
              Test and reinforce what you learned from your notes.
            </p>
          </div>

          {!showScore ? (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 max-w-4xl space-y-6">
              {/* Question Header */}
              <div className="flex items-center justify-between">
                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3.5 py-1.5 rounded-full">
                  {currentQ.category}
                </span>
                <span className="text-sm font-semibold text-gray-400">
                  Question {currentIdx + 1} of {sampleQuestions.length}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 leading-snug">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentIdx] === idx;
                  const isCorrect = idx === currentQ.correctIndex;

                  let style =
                    "w-full text-left p-4 rounded-2xl border-2 font-medium transition-all flex items-center justify-between ";

                  if (!isAnswered) {
                    style +=
                      "border-gray-200 hover:border-indigo-500 hover:bg-indigo-50/40 text-gray-700 cursor-pointer";
                  } else if (isCorrect) {
                    style += "border-emerald-500 bg-emerald-50 text-emerald-900";
                  } else if (isSelected && !isCorrect) {
                    style += "border-red-500 bg-red-50 text-red-900";
                  } else {
                    style += "border-gray-100 text-gray-400 opacity-60";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={style}
                    >
                      <span>{opt}</span>
                      {isAnswered && isCorrect && (
                        <CheckCircle2 className="text-emerald-600 shrink-0" size={20} />
                      )}
                      {isAnswered && isSelected && !isCorrect && (
                        <XCircle className="text-red-500 shrink-0" size={20} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <button
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((i) => i - 1)}
                  className="px-5 py-3 rounded-2xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition disabled:opacity-30 disabled:pointer-events-none flex items-center gap-2"
                >
                  <ArrowLeft size={18} />
                  <span>Previous</span>
                </button>

                {!isLastQuestion ? (
                  <button
                    disabled={!isAnswered}
                    onClick={() => setCurrentIdx((i) => i + 1)}
                    className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2 shadow-md shadow-indigo-100"
                  >
                    <span>Next Question</span>
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    disabled={!isAnswered}
                    onClick={() => setShowScore(true)}
                    className="px-6 py-3 rounded-2xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2 shadow-md shadow-emerald-100"
                  >
                    <span>Submit & View Result</span>
                    <CheckCircle2 size={18} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 max-w-4xl text-center space-y-6">
              <span className="text-6xl">🎉</span>
              <h2 className="text-3xl font-bold text-gray-900">Quiz Completed!</h2>
              <p className="text-gray-500 text-lg">
                You scored{" "}
                <span className="text-indigo-600 font-extrabold text-2xl">
                  {calculateScore()}
                </span>{" "}
                out of{" "}
                <span className="font-extrabold text-2xl text-gray-800">
                  {sampleQuestions.length}
                </span>
              </p>
              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition shadow-md shadow-indigo-100"
                >
                  <RotateCcw size={18} />
                  <span>Try Again</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}