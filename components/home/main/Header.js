import Link from "next/link";
import styles from "./styles.module.scss";

export default function Header() {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link className="text-decoration-none" href="">Store</Link>
        </li>
        <li>
          <Link className="text-decoration-none" href="">Electronics</Link>
        </li>
        <li>
          <Link className="text-decoration-none" href="">Watches</Link>
        </li>
      </ul>
    </div>
  );
}
