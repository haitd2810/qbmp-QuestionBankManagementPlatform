import { useState } from "react";
import styles from "./styles.module.css";
import AdminLayout from "@/components/AdminLayouts";
import Table, { Column } from "@/components/Table";
import clsx from "clsx";

export type Account = {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Staff" | "User";
  status: "Active" | "Blocked";
};

const mockData: Account[] = [
  {
    id: 1,
    name: "Nguyen Van A",
    email: "a@gmail.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Tran Thi B",
    email: "b@gmail.com",
    role: "User",
    status: "Blocked",
  },
  {
    id: 3,
    name: "Le Van C",
    email: "c@gmail.com",
    role: "Staff",
    status: "Active",
  },
];

export default function ManageAccounts() {
  const [accounts, setAccounts] = useState<Account[]>(mockData);
  const [search, setSearch] = useState("");

  const filtered = accounts.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleStatus = (id: number) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === id
          ? { ...acc, status: acc.status === "Active" ? "Blocked" : "Active" }
          : acc,
      ),
    );
  };

  const columns: Column<Account>[] = [
    { header: "ID", accessor: "id", width: "80px" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    {
      header: "Status",
      accessor: (row) => (
        <span
          className={clsx(
            styles.badge,
            row.status === "Active"
              ? styles.activeStatus
              : styles.blockedStatus,
          )}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: (row) => (
        <div className={styles.actionsContainer}>
          <button className={clsx(styles.editBtn, styles.button)}>Edit</button>
          <button className={clsx(styles.deleteBtn, styles.button)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Account Management</h1>

      <div className={styles.topBar}>
        <input
          type="text"
          placeholder="Search name or email..."
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={styles.addBtn}>+ Add Account</button>
      </div>

      <Table<Account> data={accounts} columns={columns} keyField="id" />
    </div>
  );
}

ManageAccounts.getLayout = function getLayout(page: React.ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};
