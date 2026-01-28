
export type LoginActionType = {
  handleBackdropClick: (event: React.MouseEvent<HTMLDivElement>) => void,
  handleCloseLoginModal: () => void,
  handleShowLoginModal: () => void,
}

export type LoginStateType = {
  showLoginModal: boolean,
}