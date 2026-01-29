import styles from "./styles.module.css"
export type Props = {
  isValid: boolean
}
export default function RequirementIcon(props: Props){
  const { isValid } = props;
  return isValid ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="13"
        fill="green"
        className={styles.checkIcon}
        viewBox="0 0 16 16"
      >
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="13"
        fill="red"
        className={styles.exclamationIcon}
        viewBox="0 0 16 16"
      >
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
      </svg>
    );
}