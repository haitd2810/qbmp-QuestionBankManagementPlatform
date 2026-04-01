import { useQuestionAction, useQuestionData } from "@/context/QuestionContext";
import { Question } from "../../../../context/QuestionContext/type";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

export type Props = {
  question: Question;
};
export default function QuestionItem(props: Props) {
  const { question } = props;
  const { selectedQuestion } = useQuestionData();
  const { setSelectedQuestion, saveDataIntoSet } = useQuestionAction();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div
      key={question.questionId}
      className={`${styles.quesItem} ${
        selectedQuestion?.questionId === question.questionId
          ? styles.active
          : ""
      }`}
      onClick={() => setSelectedQuestion(question)}
    >
      <input
        type="checkbox"
        name={question.questionId}
        className={styles.checkSet}
        checked={
        isClient && 
        JSON.parse(localStorage.getItem("questionSetTemp") || "[]")
          .some((item: any) => item.questionId === question.questionId)
      }
      onChange={(e) => {
        saveDataIntoSet(question, e.target.checked);
        setIsClient(!isClient); 
        setTimeout(() => setIsClient(true), 0); 
      }}
      />
      <div className={styles.quesData}>
        <span className={styles.quesId}>{question.questionId}</span>
        <p className={styles.quesTitle}>{question.content}</p>
        <span className={styles.quesMeta}>
          {question.book} - Chapter {question.chapter}
        </span>{" "}
      </div>
    </div>
  );
}
