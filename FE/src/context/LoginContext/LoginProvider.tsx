import { createContext, ReactNode, useContext, useState } from "react";
import { LoginActionType, LoginStateType } from "./type";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp, getApps, getApp } from "firebase/app";
import { axiosInstance, setAccessToken } from "@/lib/axios";
import { login } from "@/api/auth.api";

const LoginActionContext = createContext({} as LoginActionType);
const LoginStateContext = createContext({} as LoginStateType);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

export function LoginProvider({ children } : {children: ReactNode}){
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("modal")) {
      handleCloseLoginModal();
    }
  };

  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try{
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      setAccessToken(idToken);
      
      const response = await login();
      return response;
    }catch(error){
      console.error("login failed: ", error)
    }
  }

  return (
    <LoginStateContext.Provider value = {{ showLoginModal }}>
      <LoginActionContext.Provider value = {{handleBackdropClick, handleCloseLoginModal, handleShowLoginModal, loginWithGoogle}}>
        {children}
      </LoginActionContext.Provider>
    </LoginStateContext.Provider>
  )
}

export const useLoginState = () => {
  return useContext(LoginStateContext);
}

export const useLoginAction = () => {
  return useContext(LoginActionContext);
}