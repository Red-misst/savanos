import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import { useSession, signIn, signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <Header />
      {session ? "you are logged in" : "you are not logged in"}
      <Footer />
    </>
  );
}
