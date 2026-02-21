export type Question = {
  questionId: string;
  content: string;
  type: string;
  bloom: string;
  book: string;
  chapter: string;
  answers: string[];
  correctAnswer: number[];
  explanation: string;
};

export type QuestionContextType = {
  questions: Question[];
  paginatedData: Question[];
  selectedQuestion: Question;
  totalPages: number;
  currentPage: number;
}

export type QuestionActionType = {
  setSelectedQuestion: (ques: Question) => void;
  setQuestions: (data: Question[]) => void;
  setCurrentPage: (page: number) => void;
  getDataOfPage: (page: number) => void
}