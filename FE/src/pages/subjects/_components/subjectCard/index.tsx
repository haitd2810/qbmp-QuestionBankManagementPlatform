import { useRouter } from "next/router";
import styles from "./styles.module.css";
import clsx from "clsx";

export type Subject = {
  code: string,
  name: string,
  description: string,
  role: string
}
export type Props = {
  subject: Subject
}
export default function SubjectCard(props : Props) {
  const { subject } = props;

  const router = useRouter();

  const handleRedirect = () => {
    router.push('/questions');
  }
  return (
    <article
      className={styles.cardSubject}
      onClick={() => handleRedirect()}
    >
      <div className={styles.cardContent}>
        <div className={styles.subjectCard}>
          <span className={styles.subjectContent}>{subject.code}</span>
        </div>

        <h3 className={styles.subjectCard}>
          <span className={clsx(styles.subjectContent, styles.subjectName)}>{subject.name}</span>
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
