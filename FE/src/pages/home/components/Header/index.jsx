// components/Header.js
import { useState } from "react";
import SQBMSLogo from "@/assets/logo.png";
import Button from "@/components/Button";
import GoogleLogo from "@/assets/GoogleLogo.png";
import styles from "../LandingPage.module.css";
import Image from "next/image";
import ModalLoginGoole from "../ModalLoginGoogle";
import { useLoginAction, useLoginState } from "../LoginProvider";

function Header() {
  const { handleShowLoginModal } = useLoginAction();
  const { showLoginModal } = useLoginState();
  return (
    <nav className="w-full flex bg-gray-50 px-7 pb-2 border-b-2 border-gray-200 shadow">
      <div className="container flex w-full mx-auto">
        <a className="navbar-brand my-auto" href="/">
          <Image
            src={SQBMSLogo}
            height="80"
            className="d-inline-block align-top"
            alt="SQBMS Logo"
          />
        </a>
        <ul className="navbar-nav ms-auto align-items-center my-auto">
          <li className="nav-item">
            <Button
              children="Login"
              variant="btn-login"
              onClick={handleShowLoginModal}
            />
          </li>
        </ul>
      </div>
      {showLoginModal && (
        <ModalLoginGoole />
      )}
    </nav>
  );
}

export default Header;
