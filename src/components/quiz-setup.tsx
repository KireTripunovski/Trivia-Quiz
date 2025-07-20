"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuizStore } from "@/lib/store";
import {
  fetchCategories,
  fetchQuestions,
  type TriviaCategory,
} from "@/lib/api";
import { Loader2, Play, Brain, Target, Zap } from "lucide-react";

export default function QuizSetup() {
  const [categories, setCategories] = useState<TriviaCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    selectedCategory,
    selectedDifficulty,
    setCategory,
    setDifficulty,
    setQuestions,
    startQuiz,
  } = useQuizStore();

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
    };
    loadCategories();
  }, []);

  const handleStartQuiz = async () => {
    setIsLoading(true);
    try {
      const questions = await fetchQuestions(
        10,
        selectedCategory,
        selectedDifficulty
      );
      setQuestions(questions);
      startQuiz();
    } catch (error) {
      console.error("Error starting quiz:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const difficultyIcons = {
    easy: <Zap className="h-4 w-4 text-green-500" />,
    medium: <Target className="h-4 w-4 text-yellow-500" />,
    hard: <Brain className="h-4 w-4 text-red-500" />,
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white via-purple-50 to-blue-50">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-3xl">🧩</span>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Trivia Challenge
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Test your knowledge across various topics and difficulties!
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Category
            </label>
            <Select value={selectedCategory} onValueChange={setCategory}>
              <SelectTrigger className="h-12 border-2 hover:border-purple-300 transition-colors bg-white/80 backdrop-blur-sm">
                <SelectValue placeholder="🎯 Choose any category" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-2">
                <SelectItem value="0">🎯 Any Category</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Difficulty Level
            </label>
            <Select value={selectedDifficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="h-12 border-2 hover:border-purple-300 transition-colors bg-white/80 backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-2">
                <SelectItem value="any">🎲 Any Difficulty</SelectItem>
                <SelectItem value="easy">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-500" />
                    Easy
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-yellow-500" />
                    Medium
                  </div>
                </SelectItem>
                <SelectItem value="hard">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-red-500" />
                    Hard
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleStartQuiz}
              disabled={isLoading}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Loading Questions...
                </>
              ) : (
                <>
                  <Play className="mr-3 h-5 w-5" />
                  Start Quiz Challenge
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 text-center text-sm text-gray-600">
            <div className="space-y-1">
              <div className="font-semibold text-purple-600">10</div>
              <div>Questions</div>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-blue-600">15s</div>
              <div>Per Question</div>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-indigo-600">🏆</div>
              <div>Score & Share</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
