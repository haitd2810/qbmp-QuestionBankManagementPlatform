import { MouseEventHandler } from "react";
import styles from "./styles.module.css";

type Props = {
  toggleSetQuesModal: MouseEventHandler;
}
export function ModalSetQuestionList( props : Props){
  const { toggleSetQuesModal } = props;
  return (
    <div className={styles.modalOverlay} onClick={toggleSetQuesModal}>
              <div 
                className={styles.modalContent} 
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalHeader}>
                  <h2>Tạo câu hỏi</h2>
                  <button className={styles.btnClose} onClick={toggleSetQuesModal}>&times;</button>
                </div>
                
                <div className={styles.modalBody}>
                  <p>Nội dung modal sẽ hiển thị tại đây...</p>
                </div>
              </div>
            </div>
  );
}