"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuizStore } from "@/lib/store";
import { decodeHtmlEntities } from "@/lib/api";
import QuizTimer from "./quiz-timer";
import { CheckCircle, XCircle, Clock, Trophy } from "lucide-react";

export default function QuizQuestion() {
  const {
    questions,
    currentQuestionIndex,
    selectedAnswer,
    showResult,
    isCorrect,
    score,
    selectAnswer,
    submitAnswer,
  } = useQuizStore();

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) return null;

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    selectAnswer(answer);
    // Auto-submit immediately when answer is selected
    setTimeout(() => submitAnswer(), 300);
  };

  const getButtonVariant = (answer: string) => {
    if (!showResult) {
      return selectedAnswer === answer ? "default" : "outline";
    }

    if (answer === currentQuestion.correct_answer) {
      return "default";
    }

    if (selectedAnswer === answer && !isCorrect) {
      return "destructive";
    }

    return "outline";
  };

  const getButtonIcon = (answer: string) => {
    if (!showResult) return null;

    if (answer === currentQuestion.correct_answer) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }

    if (selectedAnswer === answer && !isCorrect) {
      return <XCircle className="h-5 w-5 text-red-500" />;
    }

    return null;
  };

  const getButtonClasses = (answer: string) => {
    const baseClasses =
      "justify-between text-left h-auto p-4 transition-all duration-300 transform hover:scale-[1.02]";

    if (!showResult) {
      return `${baseClasses} ${
        selectedAnswer === answer
          ? "ring-2 ring-blue-500 bg-blue-50"
          : "hover:bg-gray-50"
      }`;
    }

    if (answer === currentQuestion.correct_answer) {
      return `${baseClasses} bg-green-100 border-green-500 text-green-800 hover:bg-green-100 animate-in slide-in-from-left-2 duration-500`;
    }

    if (selectedAnswer === answer && !isCorrect) {
      return `${baseClasses} bg-red-100 border-red-500 text-red-800 hover:bg-red-100 animate-in shake duration-500`;
    }

    return `${baseClasses} opacity-60`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Progress Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-yellow-600" />
          <span className="font-semibold text-lg">
            {score}/{questions.length}
          </span>
        </div>
      </div>

      {/* Main Question Card */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="space-y-4">
          <QuizTimer />

          <CardTitle className="text-xl leading-relaxed font-semibold text-gray-800">
            {decodeHtmlEntities(currentQuestion.question)}
          </CardTitle>

          <div className="flex gap-2">
            <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-full text-xs font-medium">
              {currentQuestion.category}
            </span>
            <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 rounded-full text-xs font-medium capitalize">
              {currentQuestion.difficulty}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {currentQuestion.all_answers?.map((answer, index) => (
              <Button
                key={index}
                variant={getButtonVariant(answer)}
                onClick={() => handleAnswerSelect(answer)}
                disabled={showResult}
                className={getButtonClasses(answer)}
              >
                <span className="flex-1 text-left">
                  {decodeHtmlEntities(answer)}
                </span>
                {getButtonIcon(answer)}
              </Button>
            ))}
          </div>

          {showResult && (
            <div
              className={`p-6 rounded-xl text-center animate-in slide-in-from-bottom-4 duration-500 ${
                isCorrect
                  ? "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
                  : "bg-gradient-to-r from-red-50 to-rose-50 border border-red-200"
              }`}
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                {isCorrect ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-600" />
                )}
                <span
                  className={`font-bold text-xl ${
                    isCorrect ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {isCorrect
                    ? "Correct! 🎉"
                    : selectedAnswer
                    ? "Incorrect! 😔"
                    : "Time's Up! ⏰"}
                </span>
              </div>
              {!isCorrect && (
                <p
                  className={`text-sm ${
                    isCorrect ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {selectedAnswer
                    ? "The correct answer was:"
                    : "You ran out of time! The correct answer was:"}{" "}
                  <strong className="font-semibold">
                    {decodeHtmlEntities(currentQuestion.correct_answer)}
                  </strong>
                </p>
              )}
              <div className="mt-4 text-xs text-gray-600">
                Moving to next question automatically...
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
