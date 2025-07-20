"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuizStore } from "@/lib/store";
import { Trophy, RotateCcw, Share2, Star, Target, Brain } from "lucide-react";

export default function QuizResults() {
  const { score, questions, resetQuiz } = useQuizStore();

  const percentage = Math.round((score / questions.length) * 100);

  const getScoreData = () => {
    if (percentage >= 90)
      return {
        message: "Outstanding! 🏆",
        color: "text-yellow-600",
        bgColor: "from-yellow-100 to-amber-100",
        icon: <Trophy className="h-12 w-12 text-yellow-600" />,
      };
    if (percentage >= 80)
      return {
        message: "Excellent! 🌟",
        color: "text-green-600",
        bgColor: "from-green-100 to-emerald-100",
        icon: <Star className="h-12 w-12 text-green-600" />,
      };
    if (percentage >= 70)
      return {
        message: "Great job! 👏",
        color: "text-blue-600",
        bgColor: "from-blue-100 to-cyan-100",
        icon: <Target className="h-12 w-12 text-blue-600" />,
      };
    if (percentage >= 60)
      return {
        message: "Good effort! 👍",
        color: "text-purple-600",
        bgColor: "from-purple-100 to-violet-100",
        icon: <Brain className="h-12 w-12 text-purple-600" />,
      };
    return {
      message: "Keep practicing! 💪",
      color: "text-orange-600",
      bgColor: "from-orange-100 to-red-100",
      icon: <RotateCcw className="h-12 w-12 text-orange-600" />,
    };
  };

  const { message, color, bgColor, icon } = getScoreData();

  const handleShare = async () => {
    const shareText = `🧩 I just scored ${score}/${questions.length} (${percentage}%) on this trivia quiz! Can you beat my score? 🎯`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Trivia Quiz Results",
          text: shareText,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Results copied to clipboard! 📋");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 animate-in slide-in-from-bottom-4 duration-700">
        <CardHeader className="text-center space-y-6 pb-8">
          <div
            className={`mx-auto p-6 bg-gradient-to-r ${bgColor} rounded-full w-fit animate-bounce`}
          >
            {icon}
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800">
            Quiz Complete!
          </CardTitle>
          <div className={`text-2xl font-bold ${color} animate-pulse`}>
            {message}
          </div>
        </CardHeader>

        <CardContent className="space-y-8 text-center">
          <div className="space-y-4">
            <div className="relative">
              <div className="text-6xl font-bold text-gray-800 animate-in zoom-in-50 duration-500">
                {score}
                <span className="text-4xl text-gray-500">
                  /{questions.length}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-600 mt-2 animate-in slide-in-from-right-2 duration-700">
                {percentage}%
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border border-green-200 animate-in slide-in-from-left-2 duration-500">
              <div className="text-2xl font-bold text-green-800">{score}</div>
              <div className="text-green-700 font-medium">Correct ✅</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-red-50 to-rose-100 rounded-xl border border-red-200 animate-in slide-in-from-right-2 duration-500">
              <div className="text-2xl font-bold text-red-800">
                {questions.length - score}
              </div>
              <div className="text-red-700 font-medium">Incorrect ❌</div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <Button
              onClick={handleShare}
              variant="outline"
              className="w-full h-12 text-lg border-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 bg-transparent"
            >
              <Share2 className="mr-3 h-5 w-5" />
              Share Your Score
            </Button>

            <Button
              onClick={resetQuiz}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <RotateCcw className="mr-3 h-5 w-5" />
              Play Again
            </Button>
          </div>

          <div className="text-sm text-gray-500 pt-4">
            Challenge your friends and see who knows more! 🎯
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
