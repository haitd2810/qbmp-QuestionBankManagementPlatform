import { useQuestionAction, useQuestionData } from "@/context/QuestionContext";
import { Question } from "../../type";
import styles from "./styles.module.css";

export type Props = {
  question: Question;
};
export default function QuestionItem(props: Props) {
  const { question } = props;
  const { selectedQuestion } = useQuestionData();
  const { setSelectedQuestion } = useQuestionAction();
  return (
    <div
      key={question.questionId}
      className={`${styles.quesItem} ${
        selectedQuestion?.questionId === question.questionId ? styles.active : ""
      }`}
      onClick={() => setSelectedQuestion(question)}
    >
      <input type="checkbox" name={question.questionId} className={styles.checkSet} />
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
