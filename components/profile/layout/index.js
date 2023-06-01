import { useState } from "react";
import styles from "./styles.module.scss";
import Head from "next/head";
import Header from "@/components/Header";
import Sidebar from "../sidebar";

export default function Layout({ session, tab, children }) {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{session?.user?.name}</title>
      </Head>
      <Header />
      <div className={styles.layout__container}>
        <button className={styles.collapseButton} onClick={toggleSidebar}>
          {!isSidebarCollapsed ? "Collapse Sidebar" : "Expand Sidebar"}
        </button>
        <Sidebar
          data={{
            ...session,
            tab,
          }}
          collapsed={isSidebarCollapsed}
        />
        <div className={styles.layout__content}>{children}</div>
      </div>
    </div>
  );
}
