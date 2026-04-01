import Button from "@/components/Button";
import { Question } from "../../../../context/QuestionContext/type";
import styles from "./styles.module.css";
import clsx from "clsx";
import { useQuestionData } from "@/context/QuestionContext";

export default function QuestionDetail() {
  const { selectedQuestion } = useQuestionData();
  return (
    <div className={styles.cardContainer}>
      <div key={selectedQuestion.questionId} className={styles.card}>
        <div className={styles.cardHeader}>
          <span
            className={`${styles.badge} ${styles[selectedQuestion.bloom.toLowerCase()]}`}
          >
            {selectedQuestion.bloom}
          </span>
          <span className={styles.typeTag}>{selectedQuestion.type}</span>
        </div>

        <div className={styles.meta}>
          <span>📚 {selectedQuestion.book}</span>
          <span>📑 {selectedQuestion.chapter}</span>
        </div>
        <h3 className={styles.content}>{selectedQuestion.content}</h3>
        <div className={styles.answerGrid}>
          {selectedQuestion.answers.length === 0 ||
          selectedQuestion.correctAnswer.length === 0 ? (
            <p>No answer</p>
          ) : (
            selectedQuestion.answers
              .map((item, index) => ({
                item,
                index,
              }))
              .map(({ item, index }) => {
                const isCorrect =
                  selectedQuestion.correctAnswer.includes(index);
                return (
                  <div
                    key={index}
                    className={clsx(
                      styles.answerItem,
                      isCorrect ? styles.correct : "",
                    )}
                  >
                    <span className={styles.ansCircle}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className={styles.answerText}>{item}</span>
                  </div>
                );
              })
          )}
        </div>
        <div className={styles.footer}>
          <Button className={styles.detailButton}>Edit</Button>
        </div>
      </div>
    </div>
  );
}
