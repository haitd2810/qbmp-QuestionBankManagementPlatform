import Button from "@/components/Button";
import styles from "./styles.module.css";
import { Question } from "../../../../context/QuestionContext/type";
import { useQuestionAction, useQuestionData } from "@/context/QuestionContext";
import SearchQuestion from "../searchQuestion";
import QuestionItem from "../questionItem";

export type Props = {
  data: Question[];
  selectedData: Question;
  onSelectData: React.SetStateAction<Question>;
};
export default function Questionlist() {
  const {
    questions,
    selectedQuestion,
    totalPages,
    currentPage,
    paginatedData,
  } = useQuestionData();
  const { setSelectedQuestion, setCurrentPage, getDataOfPage } =
    useQuestionAction();
  return (
    <aside className={styles.listContainer}>
      {/* <SearchQuestion /> */}
      <div className={styles.list}>
        {paginatedData.map((q) => (
          <QuestionItem question={q} />
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
