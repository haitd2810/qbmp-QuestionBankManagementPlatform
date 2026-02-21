import {
  Question,
  QuestionActionType,
  QuestionContextType,
} from "@/pages/questions/type";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const QuestionStateContext = createContext({} as QuestionContextType);

const QuestionActionContext = createContext({} as QuestionActionType);

export type Props = {
  children: ReactNode;
  initialData: Question[];
};
export function QuestionProvider({ children, initialData }: Props) {
  const [questions, setQuestions] = useState<Question[]>(initialData);
  // const [ paginatedData, setPaginatedData ] = useState<Question[]>(initialData);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const [paginatedData, setPaginatedData] = useState(
    questions.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    ),
  );

  const [selectedQuestion, setSelectedQuestion] = useState<Question>(
    paginatedData[0],
  );

  const getDataOfPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setPaginatedData(
      questions.slice(
        (pageNumber - 1) * itemsPerPage,
        pageNumber * itemsPerPage,
      ),
    );
  };

  return (
    <QuestionStateContext.Provider
      value={{
        questions,
        selectedQuestion,
        paginatedData,
        totalPages,
        currentPage,
      }}
    >
      <QuestionActionContext
        value={{
          setQuestions,
          setSelectedQuestion,
          setCurrentPage,
          getDataOfPage
        }}
      >
        {children}
      </QuestionActionContext>
    </QuestionStateContext.Provider>
  );
}

export const useQuestionData = () => {
  return useContext(QuestionStateContext);
};

export const useQuestionAction = () => {
  return useContext(QuestionActionContext);
};
