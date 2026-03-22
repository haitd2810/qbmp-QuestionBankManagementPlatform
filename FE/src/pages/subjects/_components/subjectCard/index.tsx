import { useRouter } from "next/router";
import styles from "./styles.module.css";
import clsx from "clsx";
import { Subject } from "@/context/UserDataContext/type";
import { FaBook } from "react-icons/fa";

export type Props = {
  subject: Subject,
  key: string;
}
export default function SubjectCard(props : Props) {
  const { subject, key } = props;

  const router = useRouter();

  const handleRedirect = () => {
    router.push('/questions');
  }
  return (
    <article
      className={styles.cardSubject}
      onClick={() => handleRedirect()}
      key={key}
    >
      <div className={styles.cardContent}>
        <div className={styles.subjectCard}>
          <span className={styles.subjectContent}>{subject.subjectCode}</span>
        </div>

        <h3 className={styles.subjectCard}>
          <FaBook />
          <span className={clsx(styles.subjectContent, styles.subjectName)}>{subject.subjectName}</span>
        </h3>

        <p className={styles.subjectCard}>
          <span className={clsx(styles.subjectContent, styles.subjectDescription)}>{subject.description}</span>
        </p>

        <div className={styles.container}>
          <div className={clsx(styles["flex-container"])}>
            <span className={styles.subjectContent}>
              {subject.role}
            </span>
          </div>
          <a
            href="/questions"
            className={styles.btnQuesBank}
          >
            Ngân hàng câu hỏi
          </a>
        </div>
      </div>
    </article>
  );
}
