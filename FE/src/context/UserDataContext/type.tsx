import { JSX } from "react";

export type UserDataType = {
  roles: DefaultType[] | undefined;
  subjects: DefaultType[] | undefined;
  selectedRole: DefaultType | undefined;
  selectedSubject: DefaultType | undefined;
}

export type UserDataAction = {
  setDataRoles: () => void;
  setDataSubjects: () => void;
  setSelectedRole: (data: DefaultType) => void;
  setSelectedSubject: (data: DefaultType) => void;
}

export type DefaultType = {
  id: string;
  label: string;
  icon: JSX.Element;
}

export type Subject = {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  description: string;
  role: string;
};

export type Role = {
  roleId: string;
  roleName: string;
};
