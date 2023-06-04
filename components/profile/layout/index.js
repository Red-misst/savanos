import { useState } from "react";
import styles from "./styles.module.scss";
import Head from "next/head";
import Header from "@/components/Header";
import Sidebar from "../sidebar";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Layout({ session, tab, children }) {
  const { expandSidebar } = useSelector((state) => ({ ...state }));

  const showSidebar = expandSidebar.expandSidebar;

  return (
    <div className={styles.layout}>
      <Head>
        <title>{session?.user?.name}</title>
      </Head>
      <Header />
      <div className={styles.layout__container}>
        <Sidebar
          data={{
            ...session,
            tab,
          }}
        />
        <div
          className={styles.layout__content}
          style={{ marginLeft: `${showSidebar ? "280px" : "80px"}` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
