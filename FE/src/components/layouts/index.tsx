import { ReactNode } from 'react';
import Header from './headers';
import styles from "./styles.module.css"

export type Props = {
  children: ReactNode
}
export default function Layout( { children } : Props ) {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
