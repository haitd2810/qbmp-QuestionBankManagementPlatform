import Button from "@/components/Button";
import styles from "./styles.module.css"
export default function SearchQuestion(){
  return (
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
        <Button>Search Question</Button>
      </div>
  );
}