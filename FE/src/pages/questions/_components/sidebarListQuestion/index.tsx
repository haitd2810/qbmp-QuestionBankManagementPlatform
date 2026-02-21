import Button from "@/components/Button";
import styles from "./styles.module.css";
import { Question } from "../../type";
import { useQuestionAction, useQuestionData } from "@/context/QuestionContext";

export type Props = {
  data: Question[];
  selectedData: Question;
  onSelectData: React.SetStateAction<Question>
}
export default function Questionlist() {
  const { questions, selectedQuestion, totalPages, currentPage, paginatedData } = useQuestionData();
  const { setSelectedQuestion, setCurrentPage, getDataOfPage } = useQuestionAction();
  return (
    <aside className={styles.listContainer}>
      <div className={styles.actionContainer}>
        <div className={styles.searchWrapper}>
          <svg
            className={styles.searchIcon}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm câu hỏi..."
            className={styles.searchInput}
          />
        </div>
        <Button>Add Question</Button>
      </div>
      <div className={styles.list}>
        {paginatedData.map((q) => (
          <div
            key={q.questionId}
            className={`${styles.listItem} ${
              selectedQuestion?.questionId === q.questionId ? styles.active : ""
            }`}
            onClick={() => setSelectedQuestion(q)}
          >
            <span className={styles.listId}>{q.questionId}</span>
            <p className={styles.listTitle}>{q.content}</p>
            <span className={styles.listMeta}>
              {q.book} - Chapter {q.chapter}
            </span>
          </div>
        ))}
      </div>
      <div className={styles.actionContainer}>
        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => getDataOfPage(currentPage - 1)}
          >
            Prev
          </button>

          <input
            type="number"
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
          />

          <span className={styles.pageTotal}>/ {totalPages}</span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => getDataOfPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </aside>
  );
}
