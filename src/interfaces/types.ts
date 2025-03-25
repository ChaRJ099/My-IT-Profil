// types.ts
export interface Question {
  question: string;
  choices: string[];
  answer: string;
}

export interface Theme {
  theme: string;
  questions: Question[];
}

export interface QuizData {
  questionnaire: Theme[];
}

export interface QuizProps {
  data: QuizData;
}