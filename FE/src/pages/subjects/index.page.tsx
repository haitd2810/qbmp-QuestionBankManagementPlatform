import { ReactElement } from "react";
import SubjectCard from "./_components/subjectCard";
import Layout from "@/components/layouts";
import styles from "./styles.module.css";
import clsx from "clsx";

export default function Subject() {
  const data = [
    {
      code: "Math",
      name: "Toán học",
      description: "Mô tả môn học....",
      role: "Giáo viên",
    },
    {
      code: "Math",
      name: "Toán học",
      description: "Mô tả môn học....",
      role: "Giáo viên",
    },
    {
      code: "Math",
      name: "Toán học",
      description: "Mô tả môn học....",
      role: "Giáo viên",
    },
    {
      code: "Math",
      name: "Toán học",
      description: "Mô tả môn học....",
      role: "Giáo viên",
    },
    {
      code: "Math",
      name: "Toán học",
      description: "Mô tả môn học....",
      role: "Giáo viên",
    },
  ];
  return (
    <div className="p-3">
      <div className={styles.pageTitleContainer}>
        <div className={styles.pageTitle}>
          <p>List subjects (Select to enter the question bank)</p>
        </div>

        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search subjects..."
            className={styles.searchInput}
          />
        </div>
      </div>
      <div
        className={clsx(
          `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4`,
          styles.subectList,
        )}
      >
        {data.length !== 0 &&
          data.map((item) => <SubjectCard subject={item} key={item.code} />)}
      </div>
    </div>
  );
}

Subject.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
