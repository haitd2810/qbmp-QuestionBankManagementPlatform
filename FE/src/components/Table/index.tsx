import styles from "./styles.module.css";

export type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  width?: string;
}

export type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  keyField: keyof T;
  emptyMessage?: string;
}

export default function Table<T>({
  data,
  columns,
  keyField,
  emptyMessage = "No data found",
}: TableProps<T>) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} style={{ width: col.width || "auto" }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={String(row[keyField])}>
                {columns.map((col, i) => (
                  <td key={i}>
                    {typeof col.accessor === "function"
                      ? col.accessor(row)
                      : String(row[col.accessor])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
