import { createContext, ReactNode, useContext, useState } from "react";
import { LoginActionType, LoginStateType } from "./type";

const LoginActionContext = createContext({} as LoginActionType);
const LoginStateContext = createContext({} as LoginStateType);

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

  return (
    <LoginStateContext.Provider value = {{ showLoginModal }}>
      <LoginActionContext.Provider value = {{handleBackdropClick, handleCloseLoginModal, handleShowLoginModal}}>
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