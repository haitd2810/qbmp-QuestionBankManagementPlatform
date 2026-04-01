import { ReactElement, useEffect, useState } from "react";
import SubjectCard from "./_components/subjectCard";
import Layout from "@/components/layouts";
import styles from "./styles.module.css";
import clsx from "clsx";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSubjectsData } from "@/api/subjects.api";
import { getRolesData } from "@/api/roles.api";

type Subject = {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  description: string;
  role: string;
};

export default function Subject({
  dataRoles,
  dataSubjects,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={styles.subjectContainer}>
      <div className={styles.pageTitleContainer}>
        <div className={styles.pageTitle}>
          <p>Role: Teacher (Select subject to enter the question bank)</p>
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
        {dataSubjects.length !== 0 &&
          dataSubjects.map((item: Subject) => (
            <SubjectCard subject={item} key={item.subjectCode} />
          ))}
      </div>
    </div>
  );
}

Subject.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const [subjectsRes, rolesRes] = await Promise.all([
    getSubjectsData(context),
    getRolesData(context),
  ]);
  return {
    props: {
      dataRoles: rolesRes.data,
      dataSubjects: subjectsRes.data,
    },
  };
};
