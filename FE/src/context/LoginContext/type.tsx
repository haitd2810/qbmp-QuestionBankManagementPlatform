
export type LoginActionType = {
  handleBackdropClick: (event: React.MouseEvent<HTMLDivElement>) => void,
  handleCloseLoginModal: () => void,
  handleShowLoginModal: () => void,
  loginWithGoogle: () => void;
}

export type LoginStateType = {
  showLoginModal: boolean,
}

export type ERROR = {
  code: number;
  message: string;
}