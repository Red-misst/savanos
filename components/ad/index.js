import Link from "next/link";
import styles from "./styles.module.scss";

export default function Ad() {

    return (
        <div className={`w-100 ${styles.ad}`}>
        <Link href="/">
        </Link>
        </div>
    );
    }