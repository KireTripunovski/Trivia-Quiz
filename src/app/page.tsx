"use client";

import { useQuizStore } from "@/lib/store";
import QuizSetup from "@/components/quiz-setup";
import QuizResults from "@/components/quiz-results";
import QuizQuestion from "@/components/quiz-questions";

export default function Home() {
  const { isQuizActive, isQuizComplete } = useQuizStore();

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto py-8 px-4">
        {!isQuizActive && !isQuizComplete && <QuizSetup />}
        {isQuizActive && !isQuizComplete && <QuizQuestion />}
        {isQuizComplete && <QuizResults />}
      </div>
    </main>
  );
}
