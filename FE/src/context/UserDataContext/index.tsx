import { createContext, JSX, ReactNode, useContext, useState } from "react";
import {
  DefaultType,
  Role,
  Subject,
  UserDataAction,
  UserDataType,
} from "./type";
import {
  FaQuestionCircle,
  FaUser,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";

const UserTypeContext = createContext({} as UserDataType);
const UserActionContext = createContext({} as UserDataAction);

const ROLE_CONFIG: { [key: string]: { icon: JSX.Element; label: string } } = {
  teacher: { icon: <FaUser />, label: "teacher" },
  leader: { icon: <FaUsers />, label: "leader" },
  head: { icon: <FaUserShield />, label: "head" },
  default: { icon: <FaQuestionCircle />, label: "other" },
};

export type Props = {
  children: ReactNode;
  initialDataRoles: Role[];
  initialDataSubjects: Subject[];
};

export const UserDataProvider = ({ children, initialDataRoles, initialDataSubjects }: Props) => {
  const [roles, setRoles] = useState<DefaultType[]>();
  const [subjects, setSubjects] = useState<DefaultType[]>();
  const [selectedRole, setSelectedRole] = useState<DefaultType>();
  const [selectedSubject, setSelectedSubject] = useState<DefaultType>();

  const setDataRoles = () => {
    const convertedRoles = initialDataRoles.map((item: Role) => {
      const roleKey = item.roleName.toLowerCase();

      const config = ROLE_CONFIG[roleKey] || ROLE_CONFIG["default"];

      return {
        id: item.roleId,
        label: item.roleName,
        icon: config.icon,
      };
    });
    setRoles(convertedRoles as DefaultType[]);
  };

  const setDataSubjects = () => {
    const convertedSubjects = initialDataSubjects.map((item) => ({
      id: item.subjectId,
      label: item.subjectCode,
    }));
    setSubjects(convertedSubjects as DefaultType[]);
  };

  return(
    <UserTypeContext.Provider value = {{ roles, subjects, selectedRole, selectedSubject}}>
      <UserActionContext.prototype value = {{ setDataRoles, setDataSubjects, setSelectedRole, setSelectedSubject}}>
        {children}
      </UserActionContext.prototype>
    </UserTypeContext.Provider>
  )
};

export const useUserDataState = () => {
  return useContext(UserTypeContext);
}

export const useUserDataAction = () => {
  return useContext(UserActionContext);
}