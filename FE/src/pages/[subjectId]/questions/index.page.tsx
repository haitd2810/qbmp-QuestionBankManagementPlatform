import TeacherLayouts from "@/components/TeacherLayouts";
import styles from "./styles.module.css";
import QuestionDetail from "./_components/questionDetail";
import { InferGetServerSidePropsType } from "next";
import Questionlist from "./_components/sidebarListQuestion";
import { QuestionProvider } from "@/context/QuestionContext";
import Button from "@/components/Button";
import SearchQuestion from "./_components/searchQuestion";
import clsx from "clsx";
import { useState } from "react";
import { ModalSetQuestionList } from "@/components/Modals/CreateSetQuestionModal";

export const questions = [
  {
    questionId: "Q001",
    content: "What is Dependency Injection?",
    type: "Single Choice",
    bloom: "Understand",
    book: "Software Engineering",
    chapter: "Design Patterns",
    answers: [
      "A technique",
      "A framework",
      "A library",
      "A language",
      "A technique",
      "A framework",
      "A library",
      "A language",
      "A technique",
      "A framework",
      "A library",
      "A language",
      "A technique",
      "A framework",
      "A library",
      "A language",
    ],
    correctAnswer: [0],
    explanation:
      "Dependency Injection is a design pattern used to implement IoC...",
  },
  {
    questionId: "Q002",
    content: "Which principle does Dependency Injection mainly support?",
    type: "Single Choice",
    bloom: "Analyze",
    book: "Software Engineering",
    chapter: "Design Patterns",
    answers: ["Encapsulation", "Loose Coupling", "Inheritance", "Polymorphism"],
    correctAnswer: [1],
    explanation: "Dependency Injection reduces tight coupling between classes.",
  },
  {
    questionId: "Q003",
    content: "Which of the following are benefits of Dependency Injection?",
    type: "Multiple Choice",
    bloom: "Apply",
    book: "Software Engineering",
    chapter: "Design Patterns",
    answers: [
      "Easier unit testing",
      "Better modularity",
      "Faster compilation",
      "Reduced coupling",
    ],
    correctAnswer: [0, 1, 3],
    explanation:
      "DI improves testability, modularity, and reduces tight dependencies.",
  },
  {
    questionId: "Q004",
    content: "What does IoC stand for in software design?",
    type: "Single Choice",
    bloom: "Remember",
    book: "Software Engineering",
    chapter: "Architecture",
    answers: [
      "Inversion of Control",
      "Instance of Class",
      "Interface of Component",
      "Integration of Code",
    ],
    correctAnswer: [0],
    explanation:
      "IoC is a principle where the control of object creation is inverted.",
  },
  {
    questionId: "Q005",
    content: "Which component is responsible for injecting dependencies?",
    type: "Single Choice",
    bloom: "Understand",
    book: "Software Engineering",
    chapter: "Design Patterns",
    answers: [
      "Client class",
      "Dependency Injector",
      "Business logic",
      "Database layer",
    ],
    correctAnswer: [1],
    explanation:
      "A dependency injector handles the creation and injection of dependencies.",
  },
  {
    questionId: "Q006",
    content: "Analyze the impact of Dependency Injection on system testing.",
    type: "Essay",
    bloom: "Evaluate",
    book: "Software Engineering",
    chapter: "Testing",
    answers: [],
    correctAnswer: [],
    explanation:
      "DI allows mocking dependencies, making unit testing more isolated and reliable.",
  },
  {
    questionId: "Q007",
    content: "Which of the following are types of Dependency Injection?",
    type: "Multiple Choice",
    bloom: "Remember",
    book: "Software Engineering",
    chapter: "Design Patterns",
    answers: [
      "Constructor Injection",
      "Setter Injection",
      "Interface Injection",
      "Class Injection",
    ],
    correctAnswer: [1, 2, 3],
    explanation:
      "These are the three commonly recognized types of Dependency Injection.",
  },
  {
    questionId: "Q008",
    content:
      "Why is Dependency Injection preferred over hard-coded dependencies?",
    type: "Single Choice",
    bloom: "Analyze",
    book: "Software Engineering",
    chapter: "Best Practices",
    answers: [
      "Improves performance",
      "Enhances flexibility",
      "Reduces memory usage",
      "Simplifies syntax",
    ],
    correctAnswer: [1],
    explanation:
      "DI allows changing implementations without modifying dependent code.",
  },
  {
    questionId: "Q009",
    content:
      "Apply Dependency Injection to improve the design of a service class.",
    type: "Essay",
    bloom: "Create",
    book: "Software Engineering",
    chapter: "Application Design",
    answers: [],
    correctAnswer: [],
    explanation:
      "Students should demonstrate how DI improves extensibility and testability.",
  },
  {
    questionId: "Q010",
    content:
      "Which scenario best illustrates a violation of Dependency Injection?",
    type: "Single Choice",
    bloom: "Evaluate",
    book: "Software Engineering",
    chapter: "Code Smells",
    answers: [
      "Using interfaces",
      "Creating dependencies inside a class",
      "Using constructor parameters",
      "Using a DI container",
    ],
    correctAnswer: [1],
    explanation: "Instantiating dependencies directly leads to tight coupling.",
  },
  {
    questionId: "Q011",
    content: "How does Dependency Injection relate to SOLID principles?",
    type: "Single Choice",
    bloom: "Understand",
    book: "OOP",
    chapter: "SOLID Principles",
    answers: [
      "Supports Single Responsibility Principle",
      "Supports Dependency Inversion Principle",
      "Supports Liskov Substitution Principle",
      "Supports Open/Closed Principle",
    ],
    correctAnswer: [1],
    explanation:
      "DI is a practical implementation of the Dependency Inversion Principle.",
  },
];

export default function QuestionsPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [ isOpenSetQues, setIsOpenSetQues ] = useState(false);

  const toggleSetQuesModal = () => {
    setIsOpenSetQues(!isOpenSetQues);
  }

  return (
    <QuestionProvider initialData={data}>
      <div className={styles.actionContainer}>
        <div className={styles.btnContainer}>
          <div className={styles.actionBtn}>
            <Button variant={"danger"}>Delete Question</Button>
          </div>
          <div className={styles.actionBtn}>
            <Button className={styles.btnAdd}>Add Question</Button>
          </div>
          <div className={styles.actionBtn}>
            <Button className={styles.btnCreateSet} onClick={toggleSetQuesModal}>Set Question</Button>
          </div>
        </div>
        <div className={styles.searchAction}>
          <SearchQuestion />
        </div>
      </div>
      <div className={styles.questionListContainer}>
        <QuestionDetail />
        <Questionlist />
      </div>
      {isOpenSetQues && (
        <ModalSetQuestionList toggleSetQuesModal={toggleSetQuesModal}/>
      )}
    </QuestionProvider>
  );
}

QuestionsPage.getLayout = function getLayout(page: React.ReactNode) {
  return <TeacherLayouts>{page}</TeacherLayouts>;
};

export const getServerSideProps = async () => {
  const data = questions;
  return {
    props: {
      data: data,
    },
  };
};
