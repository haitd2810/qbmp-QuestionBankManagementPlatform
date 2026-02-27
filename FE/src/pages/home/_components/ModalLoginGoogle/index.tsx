import Image from "next/image";
import { useLoginAction } from "../../../../context/LoginContext/LoginProvider";
import  SQBMSLogo from "@/assets/logo.png";
import GoogleLogo from "@/assets/GoogleLogo.png"
import styles from "../LandingPage.module.css"

export default function ModalLoginGoole() {
  const {handleBackdropClick, handleCloseLoginModal, loginWithGoogle} = useLoginAction();
  return (
    <div
      className="fixed modal inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 outline-none"
      tabIndex={-1}
      role="dialog"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-lg p-4 mx-auto">
        <div
          className={`relative flex flex-col w-full bg-white border-0 shadow-2xl outline-none rounded-lg`}
        >
          <div className="rounded-md relative flex-auto p-12 text-center">
            <button
              type="button"
              className="hover:cursor-pointer absolute top-0 right-0 m-4 text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center"
              aria-label="Close"
              onClick={handleCloseLoginModal}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <Image
              src={SQBMSLogo}
              alt="Smart Question Bank Management System"
              className="mx-auto mb-6 h-auto"
              style={{ maxWidth: "150px" }}
            />

            {/* Title */}
            <h3
              className={`text-5xl font-bold mb-8 ${styles['text-blue']}`}
            >
              Login
            </h3>

            {/* Google Button Container */}
            <div className="flex justify-center">
              <button
                className={`rounded-lg hover:cursor-pointer flex items-center justify-center w-full max-w-[320px] pr-4 py-3 border-2 border-[#FF7F00] transition-all hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed`}
                onClick={() => loginWithGoogle()}
              >
                <Image
                  src={GoogleLogo}
                  alt="Google Logo"
                  className="h-auto"
                  style={{ maxWidth: "50px" }}
                />
                <span className={`font-bold text-lg ml-4 ${styles['text-blue']}`}>
                  Continue with Google
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
