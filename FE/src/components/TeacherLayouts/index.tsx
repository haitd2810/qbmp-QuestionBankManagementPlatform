import Image from "next/image";
import styles from "./styles.module.css";
import {
  FaBars,
  FaQuestionCircle,
  FaUser,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import SQBMSLogo from "@/assets/logo.png";
import { JSX, useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import Dropdown, { DropdownOption } from "../Dropdown";
import { getSubjectsData } from "@/api/subjects.api";
import { toast } from "react-hot-toast";
import { getRolesData } from "@/api/roles.api";

type Subject = {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  description: string;
};

type Role = {
  roleId: string;
  roleName: string;
};

const ROLE_CONFIG: { [key: string]: { icon: JSX.Element; label: string } } = {
  "teacher": { icon: <FaUser />, label: "teacher" },
  "leader": { icon: <FaUsers />, label: "leader" },
  "head": { icon: <FaUserShield />, label: "head" },
  "default": { icon: <FaQuestionCircle />, label: "other" }
};

const TempData = [
  {
    id: "",
    label: "",
  }
];

export default function TeacherLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const [roles, setRoles] = useState(TempData);
  const [roleSelected, setRoleSelected] = useState<DropdownOption>(TempData[0]);
  const [selectedSubject, setSelectedSubject] = useState<DropdownOption>(TempData[0]);
  const [subjects, setSubjects] = useState(TempData);
  const [ isLoading, setIsLoading ] = useState(false);
  const subjectId = router.query.subjectId;

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setIsLoading(true);

        const [subjectsRes, rolesRes] = await Promise.all([
          getSubjectsData(),
          getRolesData(),
        ]);

        const subjectsData = subjectsRes.data.map((item: Subject) => ({
          id: item.subjectId,
          label: item.subjectCode,
        }));
        setSubjects(subjectsData);
        if (subjectsData.length > 0){
          const foundSubject = subjectsData.find((item : DropdownOption) => (
            String(item.label.toLowerCase()) == String(subjectId?.toLocaleString().toLowerCase())
          ))
          if(foundSubject){
            setSelectedSubject(foundSubject);
          }
        }

        const rolesData = rolesRes.data.map((item: Role) => {
          const roleKey = item.roleName.toLowerCase();

          const config = ROLE_CONFIG[roleKey] || ROLE_CONFIG["default"];

          return {
            id: item.roleId,
            label: item.roleName,
            icon: config.icon,
          };
        });
        setRoles(rolesData);
        if (rolesData.length > 0){
          const foundedRole = rolesData.find((item: DropdownOption) => (
            String(item.label.toLowerCase()) === "teacher"
          ))
          if(foundedRole){
             setRoleSelected(foundedRole);
          }
        }
      } catch (error: any) {
        const message = error?.message || (typeof error === "object" && error?.message) || "Something went wrong";
        toast.error(`Error: ${message}`);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllData();
  }, []);
  
  const handleSelectSubject = (item: DropdownOption) => {
    setSelectedSubject(item);
    router.push(`/${item.label}/questions`);
  }
  return (
    <div className={styles.dashboardContainer}>
      <aside
        className={clsx(styles.sidebar, {
          [styles.sidebarCollapsed]: collapsed,
        })}
      >
        <div
          className={clsx(styles.toggleBtnContainer, {
            [styles.collapsedContainer]: collapsed,
          })}
        >
          <Dropdown
            options={roles}
            selected={roleSelected}
            onSelect={(opt) => setRoleSelected(opt)}
            collapsed={collapsed}
            className={styles.dropdownRoles}
            isLoading={isLoading}
          />

          <button
            className={styles.toggleBtn}
            onClick={() => setCollapsed(!collapsed)}
          >
            <FaBars />
          </button>
        </div>
        {!collapsed && (
          <div className={styles.logoArea}>
            <Image
              src={SQBMSLogo}
              className={styles.Imagelogo}
              alt="SQBMS Logo"
            />
          </div>
        )}
        {!collapsed && (
          <div className={styles.subjectContainer}>
            <Dropdown
              options={subjects}
              selected={selectedSubject}
              onSelect={(opt) => handleSelectSubject(opt)}
              collapsed={collapsed}
              className={styles.dropdownRoles}
              isLoading={isLoading}
            />
          </div>
        )}

        <nav className={styles.nav}>
          <Link
            href="/questions"
            className={clsx(styles.menuItem, {
              [styles.activeMenu]: router.pathname.endsWith("/questions"),
            })}
            title="Question"
          >
            {collapsed && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-clipboard-data"
                viewBox="0 0 16 16"
              >
                <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0z" />
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
              </svg>
            )}
            {!collapsed && <span>Questions</span>}
          </Link>

          <Link
            href="/#"
            className={clsx(styles.menuItem, {
              [styles.activeMenu]: router.pathname === "/questionsets",
            })}
            title="Question Set"
          >
            {collapsed && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-people"
                viewBox="0 0 16 16"
              >
                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
              </svg>
            )}
            {!collapsed && <span>Question Set</span>}
          </Link>

          <Link
            href="/#"
            className={clsx(styles.menuItem, {
              [styles.activeMenu]: router.pathname === "/books",
            })}
            title="Book"
          >
            {collapsed && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-buildings"
                viewBox="0 0 16 16"
              >
                <path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022M6 8.694 1 10.36V15h5zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5z" />
                <path d="M2 11h1v1H2zm2 0h1v1H4zm-2 2h1v1H2zm2 0h1v1H4zm4-4h1v1H8zm2 0h1v1h-1zm-2 2h1v1H8zm2 0h1v1h-1zm2-2h1v1h-1zm0 2h1v1h-1zM8 7h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zM8 5h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zm0-2h1v1h-1z" />
              </svg>
            )}
            {!collapsed && <span>Book</span>}
          </Link>

          <Link
            href="/#"
            className={clsx(styles.menuItem, {
              [styles.activeMenu]: router.pathname === "/requests",
            })}
            title="Requests"
          >
            {collapsed && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-openai"
                viewBox="0 0 16 16"
              >
                <path d="M14.949 6.547a3.94 3.94 0 0 0-.348-3.273 4.11 4.11 0 0 0-4.4-1.934A4.1 4.1 0 0 0 8.423.2 4.15 4.15 0 0 0 6.305.086a4.1 4.1 0 0 0-1.891.948 4.04 4.04 0 0 0-1.158 1.753 4.1 4.1 0 0 0-1.563.679A4 4 0 0 0 .554 4.72a3.99 3.99 0 0 0 .502 4.731 3.94 3.94 0 0 0 .346 3.274 4.11 4.11 0 0 0 4.402 1.933c.382.425.852.764 1.377.995.526.231 1.095.35 1.67.346 1.78.002 3.358-1.132 3.901-2.804a4.1 4.1 0 0 0 1.563-.68 4 4 0 0 0 1.14-1.253 3.99 3.99 0 0 0-.506-4.716m-6.097 8.406a3.05 3.05 0 0 1-1.945-.694l.096-.054 3.23-1.838a.53.53 0 0 0 .265-.455v-4.49l1.366.778q.02.011.025.035v3.722c-.003 1.653-1.361 2.992-3.037 2.996m-6.53-2.75a2.95 2.95 0 0 1-.36-2.01l.095.057L5.29 12.09a.53.53 0 0 0 .527 0l3.949-2.246v1.555a.05.05 0 0 1-.022.041L6.473 13.3c-1.454.826-3.311.335-4.15-1.098m-.85-6.94A3.02 3.02 0 0 1 3.07 3.949v3.785a.51.51 0 0 0 .262.451l3.93 2.237-1.366.779a.05.05 0 0 1-.048 0L2.585 9.342a2.98 2.98 0 0 1-1.113-4.094zm11.216 2.571L8.747 5.576l1.362-.776a.05.05 0 0 1 .048 0l3.265 1.86a3 3 0 0 1 1.173 1.207 2.96 2.96 0 0 1-.27 3.2 3.05 3.05 0 0 1-1.36.997V8.279a.52.52 0 0 0-.276-.445m1.36-2.015-.097-.057-3.226-1.855a.53.53 0 0 0-.53 0L6.249 6.153V4.598a.04.04 0 0 1 .019-.04L9.533 2.7a3.07 3.07 0 0 1 3.257.139c.474.325.843.778 1.066 1.303.223.526.289 1.103.191 1.664zM5.503 8.575 4.139 7.8a.05.05 0 0 1-.026-.037V4.049c0-.57.166-1.127.476-1.607s.752-.864 1.275-1.105a3.08 3.08 0 0 1 3.234.41l-.096.054-3.23 1.838a.53.53 0 0 0-.265.455zm.742-1.577 1.758-1 1.762 1v2l-1.755 1-1.762-1z" />
              </svg>
            )}
            {!collapsed && <span>Requests</span>}
          </Link>

          <Link
            href="/#"
            className={clsx(styles.menuItem, {
              [styles.activeMenu]: router.pathname === "/tasks",
            })}
            title="Tasks"
          >
            {collapsed && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-key"
                viewBox="0 0 16 16"
              >
                <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5" />
                <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
              </svg>
            )}
            {!collapsed && <span>Tasks</span>}
          </Link>

          <Link
            href="/#"
            className={clsx(styles.menuItem, {
              [styles.activeMenu]: router.pathname === "/trash",
            })}
            title="Trash"
          >
            {collapsed && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
            )}
            {!collapsed && <span>Trash</span>}
          </Link>
        </nav>
      </aside>

      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
