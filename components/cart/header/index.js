import styles from "./styles.module.scss";
import Link from "next/link";
import { MdPlayArrow } from "react-icons/md";
export default function Header({setLoading}) {
  const handleLinkClick = () => {
    setLoading(true);
  };
  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__left}>
          <Link href="/" className="text-decoration-none text-dark fs-2"  onClick={() => handleLinkClick()}>
            saVanna
          </Link>
        </div>
        <div className={styles.header__right}>
          <Link
            className="text-decoration-none"
            href="/"
            onClick={() => handleLinkClick()}
            legacyBehavior
          >
            <a href="/browse" onClick={() => handleLinkClick()}>
              Continue Shopping
              <MdPlayArrow />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
