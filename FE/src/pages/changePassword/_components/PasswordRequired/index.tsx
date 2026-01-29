import RequirementIcon from "../RequirementIcon";
import styles from "./styles.module.css"

type CheckRequire = {
  minLength: boolean,
  hasUpperCase: boolean,
  hasLowerCase: boolean,
  hasSpecialChar: boolean,
  hasNumber: boolean
}

type Props = {
  props: CheckRequire
}
export default function PasswordRequired( { props } : Props) {
  const {minLength, hasUpperCase, hasLowerCase, hasSpecialChar, hasNumber} = props;
  return (
    <ul className={styles.listUnstyled}>
      <li
        className={
          minLength
            ? styles.textSuccess
            : styles.textDanger
        }
      >
        <RequirementIcon isValid={minLength} />
        Minimum 8 characters
      </li>
      <li
        className={
          hasUpperCase
            ? styles.textSuccess
            : styles.textDanger
        }
      >
        <RequirementIcon isValid={hasUpperCase} />
        One uppercase character
      </li>
      <li
        className={
          hasLowerCase
            ? styles.textSuccess
            : styles.textDanger
        }
      >
        <RequirementIcon isValid={hasLowerCase} />
        One lowercase character
      </li>
      <li
        className={
          hasSpecialChar
            ? styles.textSuccess
            : styles.textDanger
        }
      >
        <RequirementIcon isValid={hasSpecialChar} />
        One special character
      </li>
      <li
        className={
          hasNumber
            ? styles.textSuccess
            : styles.textDanger
        }
      >
        <RequirementIcon isValid={hasNumber} />
        One number
      </li>
    </ul>
  );
}
