"use client";

import { useEffect } from "react";
import { useQuizStore } from "@/lib/store";
import { Progress } from "@/components/ui/progress";
import { Clock, AlertTriangle } from "lucide-react";

export default function QuizTimer() {
  const { timeLeft, setTimeLeft, submitAnswer, showResult } = useQuizStore();

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      // Auto-submit when time runs out (this will be marked as incorrect)
      submitAnswer();
    }
  }, [timeLeft, showResult, setTimeLeft, submitAnswer]);

  const progressValue = (timeLeft / 15) * 100;
  const isLowTime = timeLeft <= 5;
  const isCriticalTime = timeLeft <= 3;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isCriticalTime ? (
            <AlertTriangle className="h-5 w-5 text-red-500 animate-pulse" />
          ) : (
            <Clock
              className={`h-5 w-5 transition-colors ${
                isLowTime ? "text-orange-500" : "text-blue-500"
              }`}
            />
          )}
          <span
            className={`font-bold text-lg transition-all duration-300 ${
              isCriticalTime
                ? "text-red-500 animate-pulse scale-110"
                : isLowTime
                ? "text-orange-500"
                : "text-foreground"
            }`}
          >
            {timeLeft}s
          </span>
        </div>
        <span className="text-sm text-muted-foreground">Time remaining</span>
      </div>
      <div className="relative">
        <Progress
          value={progressValue}
          className={`h-3 transition-all duration-300 ${
            isCriticalTime ? "animate-pulse" : ""
          }`}
        />
        <div
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isCriticalTime
              ? "bg-red-500/10 animate-pulse"
              : isLowTime
              ? "bg-orange-500/5"
              : "bg-blue-500/5"
          }`}
        />
      </div>
    </div>
  );
}
