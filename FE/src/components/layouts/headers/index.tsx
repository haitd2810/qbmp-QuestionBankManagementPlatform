import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import Image from "next/image";
import SQBMSLogo from "@/assets/logo.png";
import clsx from "clsx";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    setIsOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <a className="navbar-brand my-auto" href="/">
            <Image
              src={SQBMSLogo}
              className={styles.Imagelogo}
              alt="SQBMS Logo"
            />
          </a>
        </div>

        <div className={styles.profileContainer} ref={menuRef}>
          <button
            className={styles.avatarButton}
            onClick={() => setIsOpen(!isOpen)}
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            <svg
              className={clsx(isOpen ? styles.arrowIconRotate : styles.arrowIcon)}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {isOpen && (
            <div className={styles.popup}>

              <button
                onClick={handleLogout}
                className={`${styles.menuItem} ${styles.logoutBtn}`}
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className={`${styles.menuItem} ${styles.logoutBtn}`}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
