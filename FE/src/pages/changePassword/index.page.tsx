import { ReactElement, useState } from "react";
import styles from "./styles.module.css";
import RequirementIcon from "./_components/RequirementIcon";
import InputCard from "./_components/InputCard";
import Button from "@/components/Button";
import PasswordRequired from "./_components/PasswordRequired";
import AdminLayout from "@/components/AdminLayouts";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);

  const passwordRequirements = {
    minLength: newPassword.length >= 8,
    hasUpperCase: /[A-Z]/.test(newPassword),
    hasLowerCase: /[a-z]/.test(newPassword),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword),
    hasNumber: /[0-9]/.test(newPassword),
  };

  return (
    <div className={styles.screenCard}>
      <p className={`${styles.titleContent}`}>Change Password</p>

      <div className={styles.containerContent}>
        <div className={`${styles.screenCard} ${styles.centerItem}`}>
          <div className={styles.containerForm}>
            <div className={styles.cardForm}>
              <form>
                <InputCard
                  title="Old Password"
                  showData={showOldPassword}
                  setShowData={setShowOldPassword}
                  value={oldPassword}
                  setValue={setOldPassword}
                />

                <InputCard
                  title="New Password"
                  showData={showNewPassword}
                  setShowData={setShowNewPassword}
                  value={newPassword}
                  setValue={setNewPassword}
                />

                <PasswordRequired props={passwordRequirements}/>

                <InputCard
                  title="Confirm Password"
                  showData={showConfirmNewPassword}
                  setShowData={setShowConfirmNewPassword}
                  value={confirmNewPassword}
                  setValue={setConfirmNewPassword}
                />
                <Button className={styles.btnChangePass}>
                  Change Password
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ChangePassword.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
