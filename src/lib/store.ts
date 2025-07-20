import { create } from "zustand";

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers?: string[];
}

export interface QuizState {
  // Quiz settings
  selectedCategory: string;
  selectedDifficulty: string;

  // Quiz data
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  timeLeft: number;
  isQuizActive: boolean;
  isQuizComplete: boolean;

  // UI state
  selectedAnswer: string | null;
  showResult: boolean;
  isCorrect: boolean | null;

  // Actions
  setCategory: (category: string) => void;
  setDifficulty: (difficulty: string) => void;
  setQuestions: (questions: Question[]) => void;
  selectAnswer: (answer: string) => void;
  nextQuestion: () => void;
  startQuiz: () => void;
  resetQuiz: () => void;
  setTimeLeft: (time: number) => void;
  submitAnswer: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  // Initial state
  selectedCategory: "",
  selectedDifficulty: "medium",
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  timeLeft: 15,
  isQuizActive: false,
  isQuizComplete: false,
  selectedAnswer: null,
  showResult: false,
  isCorrect: null,

  // Actions
  setCategory: (category) => set({ selectedCategory: category }),
  setDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),

  setQuestions: (questions) => {
    const questionsWithAnswers = questions.map((q) => ({
      ...q,
      all_answers: [...q.incorrect_answers, q.correct_answer].sort(
        () => Math.random() - 0.5
      ),
    }));
    set({ questions: questionsWithAnswers });
  },

  selectAnswer: (answer) => set({ selectedAnswer: answer }),

  submitAnswer: () => {
    const { selectedAnswer, questions, currentQuestionIndex, score } = get();

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer
      ? selectedAnswer === currentQuestion.correct_answer
      : false;

    set({
      isCorrect,
      showResult: true,
      score: isCorrect ? score + 1 : score,
    });

    // Auto advance after showing result
    setTimeout(() => {
      get().nextQuestion();
    }, 2000);
  },

  nextQuestion: () => {
    const { currentQuestionIndex, questions } = get();

    if (currentQuestionIndex + 1 >= questions.length) {
      set({
        isQuizComplete: true,
        isQuizActive: false,
        showResult: false,
        selectedAnswer: null,
        isCorrect: null,
      });
    } else {
      set({
        currentQuestionIndex: currentQuestionIndex + 1,
        selectedAnswer: null,
        showResult: false,
        isCorrect: null,
        timeLeft: 15,
      });
    }
  },

  startQuiz: () =>
    set({
      isQuizActive: true,
      currentQuestionIndex: 0,
      score: 0,
      timeLeft: 15,
      isQuizComplete: false,
      selectedAnswer: null,
      showResult: false,
      isCorrect: null,
    }),

  resetQuiz: () =>
    set({
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      timeLeft: 15,
      isQuizActive: false,
      isQuizComplete: false,
      selectedAnswer: null,
      showResult: false,
      isCorrect: null,
      selectedCategory: "",
      selectedDifficulty: "medium",
    }),

  setTimeLeft: (time) => set({ timeLeft: time }),
}));
