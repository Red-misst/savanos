import styles from "./styles.module.scss";
import Link from "next/link";
import { MdPlayArrow } from "react-icons/md";
export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__left}>
        <Link href="/" className="text-decoration-none text-dark fs-2">saVanna</Link>
        </div>
        <div className={styles.header__right}>
          <Link className="text-decoration-none" href="/browse" legacyBehavior>
            <a>
              Continue Shopping
              <MdPlayArrow />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
